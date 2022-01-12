<template>
	<view class="my-code">
		<view class="unpurchased overdue" v-if="purchased">
			<view>已激活成功</view>
			<view>{{activationCode.createTime}}</view>
		</view>
		<view class="unpurchased" v-else>
			<text>暂无激活码</text>
		</view>
		<u-mask :show="show" @click="show = false">
			<view class="warp">
				<view class="rect" @tap.stop>
					<view class="title">购买激活码</view>
					<view class="codeimg">
						<text>交易密码：</text>
						<u-input class="input" v-model="tradePassword" type="password" placeholder="请输入密码" />
					</view>
					<view class="puyNum">购买价格：<text>{{activationCodeFee}} USDT</text></view>
					<view class="sel-btn">
						<u-button class="codebtn" type="primary" @click="show = false;tradePassword=''">取消</u-button>
						<u-button class="codebtn affirmbtn" type="primary" @click="getPublicKey">确认</u-button>
					</view>
				</view>
			</view>
		</u-mask>
	</view>
</template>

<script>
	import {publicFun} from '@/api/myFun.js'
	import {mineApi,loginApi} from '@/api/myAjax.js'
	import { JSEncrypt } from "@/common/jsencrypt.min.js";
	export default {
		data() {
			return {
				show: false,
				purchased: false,
				activationCode: {},
				tradePassword: '',
				Password:'',
				userInfo:{},
				activationCodeFee:''
			}
		},
		methods: {
			purchase(){
				if(!this.userInfo.tradePassword){
					return this.$toast('检测到还未设置交易密码，请先前往设置')
				}
				this.show=true
			},
			//对交易密码加密
			getPublicKey(){
				loginApi.getPublicKey({username:this.userInfo.id}).then(res=>{
					var crypt = new JSEncrypt({
					  default_key_size: 1024,
					});
					crypt.setPublicKey(res.data);
					this.Password = crypt.encrypt(this.tradePassword);
					this.buyActiveCode()
				})
			},
			cody(data) {
				publicFun.cody(data)
			},
			buyActiveCode() {
				mineApi.buyActiveCode({
					userId: this.userInfo.id,
					tradePassword:this.Password,
				}).then(res => {
					if (res.code == 200) {
						this.$toast('购买成功')
						this.tradePassword = ''
						this.$store.dispatch('getUserInfo')
						this.getActiveCode()
						this.show = false
					}else{
						this.$toast(res.msg)
					}
				})
			},
			getActiveCode() {
				mineApi.getActiveCode({
					userId: this.userInfo.id
				}).then(res => {
					if (res.code == 200) {
						this.activationCode = res.data
						this.purchased=true
					} else {
						// this.$toast(res.msg)
					}
				})
			}
		},

		onLoad() {
			this.userInfo=JSON.parse(uni.getStorageSync('user'))
			this.getActiveCode()
			loginApi.getCommonSetUp().then(res=>{
				if(res.code==200){
					// uni.setStorageSync('systemSetup',JSON.stringify(res.data))
					this.activationCodeFee=res.data.activationCodeFee
				}
			})
		},
		onNavigationBarButtonTap(){
			if(!this.userInfo.tradePassword){
				return this.$toast('检测到还未设置交易密码，请先前往设置')
			}
			// if(this.purchased){
			// 	return this.$toast('请勿重复购买激活码')
			// }
			this.show=true
		},
	}
</script>

<style lang="scss" scoped>
	.my-code {
		padding: 90rpx 80rpx 0;
	}

	.unpurchased{
		// display: flex;
		text-align: center;
		margin: 0 auto;
		width: 528rpx;
		height: 248rpx;
		background: url(/static/mine/jhcg2.png) no-repeat;
		background-size: 100% 100%;
		text{
			font-size: 36rpx;
			color: #FFFFFF;
			line-height: 248rpx;
		}
	}
	.overdue{
		color: #FFFFFF;
		background: url(/static/mine/jhcg.png) no-repeat;
		background-size: 100% 100%;
		padding-top: 45rpx;
		>view{
			margin-top: 24rpx;
			font-size: 36rpx;
			&:last-child{
				font-size: 24rpx;
			}
		}
	}

	.warp {
		// display: flex;
		// align-items: center;
		// justify-content: center;
		// height: 100%;


		.rect {
			// width: 482rpx;
			// background: #14162F;
			// border-radius: 16rpx;
			// padding: 50rpx 56rpx;

			.title {
				
				font-size: 28rpx;
				text-align: center;
				font-weight: 600;
			}
			.puyNum{
				padding:  0 40rpx;
				text-align: right;
			// 	font-size: 24rpx;
			// 	margin: 10rpx 0;
			// 	color: #ccc;
				>text{
					color: $uni-color-theme;
				}
			}
			// .input {
				// width: 100%;
				// font-size: 28rpx;
				// border-bottom: 2rpx solid $uni-color-bd;
				// border-color: $uni-color-bd !important;
				// margin-bottom: 20rpx;
			// }
			.codeimg {
				margin: 0 40rpx 20rpx;
				display: flex;
				align-items: center;
				border-bottom: 2rpx solid #DCEAF5;
				// border-color: #DCEAF5 !important;
				// text {
				// 	font-size: 28rpx;
				// }
			}
			.sel-btn{
				display: flex;
				margin-bottom: 30rpx;
				.codebtn{
					width: 201rpx;
					height: 56rpx;
					background: #FFFFFF;
					border: 1rpx solid #279FFF;
					color: #279FFF;
					border-radius: 16rpx;
				}
				.affirmbtn{
					background: #279FFF;
					color: #fff;
				}
			}
			// .codebtn {
			// 	width: 180rpx;
			// 	height: 60rpx;
			// 	margin-top: 40rpx;
			// 	background: $uni-color-theme;
			// 	border-radius: 44rpx;
			// }
		}
	}
</style>
