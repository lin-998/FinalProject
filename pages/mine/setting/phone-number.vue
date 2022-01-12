<template>
	<view class="nickname">
		
		<view class="LittleBg nickname-in">
			<view class="title1">手机号码</view>
			<view class="phone">
				<text>中国大陆</text>
				<u-input class="input" v-model="formPhone.newPhone" type="number" placeholder="请输入手机号码" maxlength="11" />
			</view>
			<view class="title1">短信验证</view>
			<view class="phone">
				<u-input class="input" v-model="formPhone.code" placeholder="请输入短信验证码" />
				<u-button class="code" :disabled="disabled" @click="getCode" type="primary">{{codeText}}</u-button>
			</view>
			
		</view>
		<u-button class="logout submitBtn" type="primary" @click="pinless" v-if="userInfo.phone.length>11">确认绑定</u-button>
		<u-button class="logout submitBtn" type="primary" @click="pinless" v-else>确认修改</u-button>
		<u-mask :show="show" @click="show = false">
			<defalut-mask :username='formPhone.username' :imgUrl='img_url' @confirm='confirm'></defalut-mask>
		</u-mask>
	</view>
</template>

<script>
	import {mineApi,loginApi} from '@/api/myAjax.js'
	import { apiUrl } from "@/api/app.js";
	export default {
		data() {
			return {
				img_url:'',
				authCode:'',
				show:false,
				userInfo:{phone:''},
				formPhone:{},
				codeText:'获取验证码',
				disabled:false,
				backwards:0,
				code:''
			};
		},
		methods:{
			confirm(){
				// if(!this.formPhone.newPhone || this.formPhone.newPhone.length<11){
				// 	return this.$toast('请输入正确的手机号码')
				// }
				// uni.showLoading({
				// 	 title: '加载中'
				// })
				// loginApi.checkCode({username:'111111',code:this.authCode}).then(res=>{
				// 	if(res.code==200){
				// 		//获取验证码
				// 		this.show=false
						mineApi.modifySendSms({phone:this.formPhone.newPhone}).then(res=>{
							this.show=false
							if(res.code==200){
								this.disabled=true
								this.backwards=59
								let intVal=setInterval(()=>{
									this.backwards-=1
									if(this.backwards==0){
										this.disabled=false
										this.codeText='重新获取'
										clearInterval(intVal)
									}else{
										this.codeText=this.backwards+'秒后重发'
									}
								},1000)
								this.$toast('短信发送成功')
							}else{
								this.$toast(res.msg)
							}
						})
				// 	}else{
				// 		this.$toast(res.msg)
				// 		this.img_url=apiUrl+'user/api/login/createCode?username=111111&solt=' +Math.random()
				// 	}
				// })
				
				
			},
			//绑定
			pinless(){
				if(!this.formPhone.newPhone || this.formPhone.newPhone.length<11){
					return this.$toast('请输入正确的手机号码')
				}else if(!this.formPhone.code){
					return this.$toast('请输入验证码')
				}
				mineApi.modifyPhone(this.formPhone).then(res=>{
					if(res.code==200){
						if(this.userInfo.phone.length>11){
							this.$toast('绑定成功')
						}else{
							this.$toast('修改成功')
						}
						this.$store.dispatch('getUserInfo')
						setTimeout(()=>{
							uni.navigateBack()
						},1000)
					}else{
						this.$toast(res.msg)
					}
				})
			},
			//获取验证码
			getCode(){
				if(!this.formPhone.newPhone || this.formPhone.newPhone.length<11){
					return this.$toast('请输入正确的手机号码')
				}
				this.show=true
				this.img_url=apiUrl+'user/api/login/createCode?username=111111&solt=' +Math.random()
				// this.confirm()
			}
		},
		onLoad(options) {
			return 
			this.userInfo=JSON.parse(options.userInfo)||{}
			console.log(this.userInfo);
		}
	}
</script>

<style lang="scss" scoped>
.nickname{
	padding: 40rpx;
	.nickname-in{
		padding: 20rpx 30rpx 0;
		height: 844rpx;
		.title1{
			font-size: 28rpx;
			margin-bottom: 30rpx;
			margin-top: 40rpx;
			font-weight: 600;
		}
		.phone{
			display: flex;
			align-items: center;
			border-bottom: 1rpx solid rgba(176, 190, 200, .5) !important;
			>text{
				font-size: 28rpx;
				margin-right: 32rpx;
				opacity: 0.7;
			}
			.code{
				opacity: 1;
				color: #fff;
				width: 164rpx;
				height: 52rpx;
				background: #279FFF;
				font-size: 24rpx;
				border-radius: 16rpx;
				text-align: center;
				line-height: 52rpx;
				margin-bottom: 10rpx;
			}
		}
	}
	.logout{
		margin-top: 80rpx;
	}
}
</style>
