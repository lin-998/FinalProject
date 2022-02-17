<template>
    <view class="chat-item">
        <view v-if="!me" class="otherchat">
            <!-- <a :href="href" ><image :src="image" alt="" class="image"></a> -->
           <image :src="img"  class="image" @click="lookInfo"></image>
<view class="right">
	<view class="nt"><text v-if="name">{{name}}</text><text v-if="time">{{time}}</text></view>
	<view class="msg"><text>{{msg}}</text></view>
</view>
        </view>
    
        <view v-if="me" class="mychat otherchat">
            <!-- <a :href="href"><image :src="image" alt="" class="image"></a> -->
           <view class="right">
           	<view class="nt"><text v-if="time">{{time}}</text><text v-if="name">{{name}}</text></view>
           	<view class="msg"><text>{{msg}}</text></view>
           </view>
 <image :src="img"  class="image" @click="lookInfo"></image>
        </view>
    
    
    </view>
</template>

<script>
    export default {
        name: 'chat-item',
        props: ['me', 'name', 'img', 'msg', 'time','href'],
        components: {},
        data() {
            return {};
        },
    
        computed: {},
    
        watch: {},
    
        methods: {
            lookInfo(){
                console.log('href',this.href)
                this.$router.push(`/user_info/${this.href}`)
            }
        }
    }
</script>

<style lang="scss" scoped>
    .chat-item {
			position: relative;
        width: 100%;
       padding: 10rpx 10rpx 10rpx 10rpx;
			 height: 140rpx;
        .otherchat {
            width: 100%;
          display: flex;
					align-items: center;
					position: relative;
            .image {
                width: 60rpx;
                height: 60rpx;
                border-radius: 50%;
								margin-right: 20rpx;
								// margin-top: 40rpx;
                cursor: pointer;
            }
						.right{
							 padding: 10rpx 10rpx 10rpx 10rpx;
							.nt {
							    font-size: 22rpx;
							    color: #686868;
							    >text {
							        padding-right: 8rpx;
							    }
							   :nth-child(2) {
							        font-size: 10rpx;
							    }
							}
							.msg {
								position: absolute;
							max-width: 80%;
									font-size: 28rpx;
									margin-top: 20rpx;
							    border-radius: 10rpx;
							    background-color: red;
									text-align: center;
									// line-height: 40rpx;
									 padding: 10rpx 10rpx 10rpx 10rpx;
									>text{
										white-space: nowrap;
									}
							}
						}
            
        }
				.mychat{
					display: flex;
					align-items: center;
					justify-content: flex-end;
					.right{
						
						.nt{
							
						}
						.msg{
						position: absolute;
						right: 100rpx;
							background: #4290f7;
							padding: 10rpx;
						}
					}
					
				}
       
    }
</style>