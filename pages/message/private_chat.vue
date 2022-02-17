<template>
  <!--  私聊 -->
  <view class="wrapper">
    <!-- <view class="ul">
      <view class="li" v-for="(item, index) in privateDetail" :key="index">
        <ChatItem
          v-if="fromUserInfo.id === item.from_user"
          :href="item.from_user"
          :img="item.avator"
          me="true"
          :msg="item.message"
          :name="item.name"
          :time="item.time"
        ></ChatItem>
        <ChatItem
          v-else
          :img="item.avator"
          :msg="item.message"
          :href="item.from_user"
          :name="item.name"
          :time="item.time"
        ></ChatItem>
      </view>
    </view> -->
		<scroll-view class="msg-list" scroll-y="true" >
						<!-- 加载历史数据waitingUI -->
						<view class="loading" v-if="isHistoryLoading">
							<view class="spinner">
								<view class="rect1"></view>
								<view class="rect2"></view>
								<view class="rect3"></view>
								<view class="rect4"></view>
								<view class="rect5"></view>
							</view>
						</view>
						<view class="row" v-for="(item,index) in privateDetail" :key="index" :id="item.ID">
							<!-- 用户消息 -->
							<block>
								<!-- 自己发出的消息 -->
								<view class="my" v-if="fromUserInfo.id === item.from_user">
									<!-- 左-消息 -->
									<view class="left">
										<!-- 文字消息 -->
										<view class="bubble">
											<rich-text :nodes="item.message"></rich-text>
										</view>
									</view>
									<!-- 右-头像 -->
									<view class="right">
										<image :src="item.avator"></image>
									</view>
								</view>
								<!-- 别人发出的消息 -->
								<view class="other" v-else>
									<!-- 左-头像 -->
									<view class="left">
										<image :src="item.avator"></image>
									</view>
									<!-- 右-用户名称-时间-消息 -->
									<view class="right">
										<view class="username">
											<view class="name">{{item.name}}</view>
											<view class="time">{{item.time}}</view>
										</view>
										<!-- 文字消息 -->
										<view  class="bubble">
											<rich-text :nodes="item.message"></rich-text>
										</view>
									</view>
								</view>
							</block>
						</view>
					</scroll-view>
					<!-- 底部输入栏 -->
    <view class="input-msg">
      <input
        v-model="inputMsg"
        @keydown.enter.prevent="sendMessage"
        ref="message"
      ></input>
	  <!-- 表情 -->
			<!-- <swiper class="emoji-swiper" :class="{hidden:hideEmoji}" indicator-dots="true" duration="150">
				<swiper-item v-for="(page,pid) in emojiList" :key="pid">
					<view v-for="(em,eid) in page" :key="eid" @tap="addEmoji(em)">
						<image mode="widthFix" :src="'/static/img/emoji/'+em.url"></image>
					</view>
				</swiper-item>
			</swiper> -->
			<!-- 发送按钮 -->
      <view
        class="btn"
        :class="{ enable: inputMsg != '' }"
        @click="sendMessage"
        >{{ btnInfo }}</view
      >
    </view>
  </view>
</template>

<script>
import { mainApi } from "@/api/appApi.js";
import ChatItem from "./components/ChatItem.vue";
import { Utils } from "@/common/common.js";


import { mapGetters } from "vuex";
export default {
  components: {
    ChatItem,
  },
  props: {},
  data() {
    return {
      inputMsg: "",
      privateDetail: [], //私聊相关
      toUserInfo: {
        //被私聊者
        to_user: "",
        avator: "",
        sex: "",
        place: "",
        status: "",
      },
      isMyFriend: false, //他是否是我的好友
      isHisFriend: false, //我是否是他的好友
      fromUserInfo: {}, //用户自己
      btnInfo: "发送",
			//
			isHistoryLoading:false,
			emojiList:this.$commen.emojiList,
			hideEmoji:false
    };
  },

  computed: {
    ...mapGetters(["someOneInfoGetter"]),
  },

  watch: {
    privateDetail() {
      this.refresh();
    },
  },
  onLoad(options) {
	 
    this.toUserInfo.to_user = options.to_userId;
		
  },
	onShow() {
	
		uni.setNavigationBarTitle({
			title:this.$store.getters.someOneInfoGetter.name
		})
	},
  created() {
    this.fromUserInfo = JSON.parse(uni.getStorageSync('user'));
    // this.isFriend();
    this.resetUnred();
    this.getPrivateMsg();
    this.getMsgBySocket();
    this.$store.dispatch("someOneInfoAction", this.toUserInfo.to_user);
  },
  methods: {
	  	//添加表情
			addEmoji(em){
				this.inputMsg+=em.alt;
			},
    //获取数据库的消息
    getPrivateMsg() {
      mainApi
        .getPrivateMsg({
          to_user: this.toUserInfo.to_user,
        })
        .then((res) => {
          console.log("res222", res);
          if (res.success) {
            this.privateDetail = res.data.privateDetail;
            if (this.privateDetail.length == 0) return;
            this.privateDetail.forEach((element) => {
              element.time = Utils.toNomalTime(element.time);
              element.message = element.message.split(":")[1];
            });
			console.log('222',this.privateDetail)
          }
        })
        .catch((err) => {
          const errorMsg = err.response.data.error;
          this.$message({
            message: errorMsg,
            type: "error",
          });
        });
    },
    //发送信息
    sendMessage() {
      if (this.inputMsg.trim() == "") return;
      // if (!this.isMyFriend) {
      // 	console.log('isnotMyFriend')
      // 	this.$message({
      // 		message: 'ta不是您的好友，请先加ta为好友',
      // 		type: "error"
      // 	});
      // 	return
      // }
      // if (!this.isHisFriend) {
      // 	console.log('isnoHisFriend')
      // 	this.$message({
      // 		message: '您不是ta的好友，请先加ta为好友',
      // 		type: "error"
      // 	});
      // 	return
      // }
      this.sendMsgBySocket();
      this.saveMsgByDB();
    },
    //用socket发消息
    sendMsgBySocket() {
      const data = {
        from_user: this.fromUserInfo.id, //自己的id
        to_user: this.toUserInfo.to_user, //对方id
        name: this.fromUserInfo.name, //自己的昵称
        avator: this.fromUserInfo.avator, //自己的头像
        message: this.inputMsg, //消息内容
        type: "private",
        status: "1", //是否在线 0为不在线 1为在线
        time: Date.parse(new Date()) / 1000, //时间
      };
      this.$socket.emit("sendPrivateMsg", data);
      this.$store.commit("updateListMutation", data);
    },
    //用数据库存消息
    saveMsgByDB() {
      const data = {
        from_user: this.fromUserInfo.id, //自己的id
        to_user: this.toUserInfo.to_user, //对方的id
        name: this.fromUserInfo.name, //自己的昵称
        avator: this.fromUserInfo.avator, //自己的头像
        message: this.inputMsg, //消息内容
        status: "1", //是否在线 0为不在线 1为在线
        time: Date.parse(new Date()) / 1000, //时间
      };
      // 存此条私聊信息到数据库
       mainApi.saveMsgByDB(data).then((res) => {
        this.inputMsg = "";
        // 存此条私聊信息到本地
        data.time = Utils.toNomalTime(data.time);
        console.log("saveMsgByDBdata", data);
        this.privateDetail.push(data);
      });
    },
    // 获取socket消息
    getMsgBySocket() {
      this.$socket.removeAllListeners("getPrivateMsg");
      this.$socket.on("getPrivateMsg", (data) => {
        console.log("聊天内获取私聊消息", data);
        //如果收到的soket信息不是发给自己的 放弃这条soket 没必要了 因为私聊是点对点发送的
        // if(data.to_user != this.fromUserInfo.user_id) return
        //如果收到的soket信息不是来自当前聊天者 写入首页信息列表 并return

        // console.log(data.from_user, '!=', this.toUserInfo.to_user)
        // 	//soket信息不是来自当前聊天者 vuex添加此条信息 有未读提示
        if (data.from_user != this.toUserInfo.to_user) {
          console.log(data, "updateListMutationdata");
          data.chatOfNow = false;
          this.$store.commit("updateListMutation", data);
          return;
        } else {
          //soket信息来自当前聊天者 vuex添加此条信息 没未读提示
          data.chatOfNow = true;
          this.$store.commit("updateListMutation", data);
        }
        //本地添加此条信息
        this.privateDetail.push(data);
      });
    },
    // 查询此用户与我的关系
    isFriend() {
      axios
        .get("/api/v1/is_friend", {
          params: {
            // user_id: this.fromUserInfo.user_id,
            other_user_id: this.toUserInfo.to_user,
          },
        })
        .then((res) => {
          this.isMyFriend =
            res.data.data.isMyFriend.length !== 0 ? true : false;
          this.isHisFriend =
            res.data.data.isHisFriend.length !== 0 ? true : false;
        })
        .catch((err) => {
          const errorMsg = err.response.data.error;
          this.$message({
            message: errorMsg,
            type: "error",
          });
        });
    },
    //将未读信息归零
    resetUnred() {
      this.$store.commit("resetUnredMutation", this.toUserInfo.to_user);
    },
    // 消息置底
    refresh() {
      setTimeout(() => {
        window.scrollTo(0, document.body.scrollHeight + 10000);
      }, 0);
    },
  },
};
</script>
<style lang="scss" scoped>
.emoji-swiper{
		height: 80rpx;
		width: 80rpx;
		swiper-item{
			flex: 1;
			display: flex;
			align-content: flex-start;
			flex-wrap: wrap;
			view{
				width: 12rpx;
				height: 12rpx;
				display: flex;
				justify-content: center;
				align-items: center;
				image{
					width: 10rpx;
					height: 10rpx;
				}
			}
		}
	}
	.msg-list{
			width: 96%;
			padding: 0 2%;
			position: absolute;
			top: 0;
			bottom: 100upx;
			.loading{
				//loading动画
				display: flex;
				justify-content: center;
				@keyframes stretchdelay {
					0%, 40%, 100% {
						transform: scaleY(0.6);
					}
					20% {
						transform: scaleY(1.0);
					}
				}
				.spinner {
					margin: 20upx 0;
					width: 60upx;
					height: 100upx;
					display: flex;
					align-items: center;
					justify-content: space-between;
					view {
						background-color: #f06c7a;
						height: 50upx;
						width: 6upx;
						border-radius: 6upx;
						animation: stretchdelay 1.2s infinite ease-in-out;
					}
					.rect2 {
					  animation-delay: -1.1s;
					}
					.rect3 {
					  animation-delay: -1.0s;
					}
					.rect4 {
					  animation-delay: -0.9s;
					}
					.rect5 {
					  animation-delay: -0.8s;
					}
				}
			}
			.row{
				.system{
					display: flex;
					justify-content: center;
					view{
						padding: 0 30upx;
						height: 50upx;
						display: flex;
						justify-content: center;
						align-items: center;
						background-color: #c9c9c9;
						color: #fff;
						font-size: 24upx;
						border-radius: 40upx;
					}
					.red-envelope{
						image{
							margin-right: 5upx;
							width: 30upx;
							height: 30upx;
						}
					}
				}
				&:first-child{
					margin-top: 20upx;
				}
				padding: 20upx 0;
				.my .left,.other .right{
					width: 100%;
					display: flex;
					.bubble{
						max-width: 70%;
						min-height: 50upx;
						border-radius: 10upx;
						padding: 15upx 20upx;
						display: flex;
						align-items: center;
						font-size: 32upx;
						word-break: break-word;
						&.img{
							background-color: transparent;
							padding:0;
							overflow: hidden;
							image{
								max-width: 350upx;
								max-height: 350upx;
							}
						}
						&.red-envelope{
							background-color: transparent;
							padding:0;
							overflow: hidden;
							position: relative;
							justify-content: center;
							align-items: flex-start;
							image{
								width: 250upx;
								height: 313upx;
							}
							.tis{
								position: absolute;
								top: 6%;
								font-size: 26upx;
								color: #9c1712;
							}
							.blessing{
								position: absolute;
								bottom: 14%;
								color: #e9b874;
								width: 80%;
								text-align: center;
								overflow: hidden;
								// 最多两行
								display: -webkit-box;-webkit-box-orient: vertical;-webkit-line-clamp: 2;
							}
						}
						&.voice{
							.icon{
								font-size: 40upx;
								display: flex;
								align-items: center;
							}
							.icon:after
							{
								content:" ";
								width: 53upx;
								height: 53upx;
								border-radius: 100%;
								position: absolute;
								box-sizing: border-box;
							}
							.length{
								font-size: 28upx;
							}
						}
					}
				}
				.my .right,.other .left{
					flex-shrink: 0;
					width: 80upx;
					height: 80upx;
					image{
						width: 80upx;
						height: 80upx;
						border-radius: 10upx;
					}
				}
				.my{
					width: 100%;
					display: flex;
					justify-content: flex-end;
					.left{
						min-height: 80upx;
						
						align-items: center;
						justify-content: flex-end;
						.bubble{
							background-color: #f06c7a;
							color: #fff;
							
							&.voice{
								.icon{
									color: #fff;
								}
								.length{
									margin-right: 20upx;
								}
							}
							&.play{
								@keyframes my-play {
									0% {
										transform: translateX(80%);
									}
									100% {
										transform: translateX(0%);
									}
								}
								.icon:after
								{
									border-left: solid 10upx rgba(240,108,122,.5);
									animation: my-play 1s linear infinite;
								}
							}
						}
					}
					.right{
						margin-left: 15upx;
					}
				}
				.other{
					width: 100%;
					display: flex;
					.left{
						margin-right: 15upx;
					}
					.right{
						flex-wrap: wrap;
						.username{
							width: 100%;
							height: 45upx;
							font-size: 24upx;
							color: #999;
							display: flex;
							.name{
								margin-right: 50upx;
							}
						}
						.bubble{
							background-color: #fff;
							color: #333;
							&.voice{
								.icon{
									color: #333;
									
								}
								.length{
									margin-left: 20upx;
								}
							}
							&.play{
								@keyframes other-play {
									0% {
										transform: translateX(-80%);
									}
									100% {
										transform: translateX(0%);
									}
								}
								.icon:after
								{
									border-right: solid 10upx rgba(255,255,255,.8);
									
									animation: other-play 1s linear infinite;
								}
							}
						}
					}
				}
			}
		}
	</style>
<style lang="scss" scoped>
.wrapper {
	
  // height: 100vh;
  padding-top: 0.6rpx;
  z-index: 1;

  .ul {
    width: 100%;
    padding-bottom: 1.6rpx;
    display: flex;
    display: -webkit-flex;
    flex-direction: column;

    .li {
      list-style-type: none;
    }
  }

  .input-msg {
    height: 70rpx;
    position: fixed;
    bottom: 0rpx;
    display: flex;
    display: -webkit-flex;
    /* Safari */
    width: 100%;
    z-index: 999;

    input {
      width: 87.8%;
			height: 100%;

      // margin: 0 0.06rpx;
      // padding-top: 0.07rpx;
      // padding-left: 0.06rpx;
      // border-radius: 0.02rpx;
      outline: none;
      resize: none;
      border: none;
      overflow-y: hidden;
      font: 0.16rpx/0.18rpx "Microsoft Yahei";
			/deep/.uni-input-input{
				font-size: 32rpx;
			}
    }
    .btn {
      font-size: 24rpx;
      display: flex;
      display: -webkit-flex;
      /* Safari */
      align-items: center;
      justify-content: center;
      text-align: center;
      // margin-right: 0.06rpx;
      height: 100%;
      flex: 1;
      background: #ccc;
      color: white;
      border-radius: 8rpx;
      cursor: not-allowed;
      font-family: "Microsoft Yahei";

      &.enable {
        background: #1e90ff;
        cursor: pointer;
      }
    }
  }
}
</style>
