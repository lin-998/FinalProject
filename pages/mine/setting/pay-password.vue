<template>
	<view class="">
		<view class="LittleBg" style="border-radius: 0;">
<!-- 			<u-tabs :list="list" :bold="false" :is-scroll="false" font-size="28" active-color='#00B9FF' inactive-color="#999"
			 bg-color="transparent" :current="current" @change="change" bar-width="140"></u-tabs> -->
		</view>
		<view class="loginpwd">
			<view class="LittleBg loginpwd-in">
				<view class="title1">短信验证</view>
				<view class="phone">
					<u-input class="input" v-model="loginCode" placeholder="请输入短信验证码" />
					<text class="code" @click="getCode" type="number" :style="backwards>0?'background:#999':''">{{codeText}}</text>
				</view>
				<view class="title1">设置密码</view>
				<view class="phone">
					<u-input class="input" v-model="loginPwd" placeholder="请输入密码" type="password" />
				</view>
				<view class="title1" v-show="current==1">确认密码</view>
				<view class="phone" v-show="current==1">
					<u-input class="input" v-model="newloginPwd" placeholder="请再次输入密码" type="password" />
				</view>
			</view>
			<u-button class="logout submitBtn" type="primary" v-show="current==0" @click="verificationCode">确认</u-button>
			<u-button class="logout submitBtn" type="primary" v-show="current==1" @click="verificationCode">重置密码</u-button>
		</view>
		<u-mask :show="show" @click="show = false">
			<defalut-mask :username='userInfo.username' :imgUrl='img_url' @confirm='getLoginCode'></defalut-mask>
		</u-mask>
	</view>
</template>

<script>
	import {mineApi,loginApi} from '@/api/myAjax.js'
	import { JSEncrypt } from "@/common/jsencrypt.min.js";
	import { apiUrl } from "@/api/app.js";
	export default {
		data() {
			return {
				userInfo:{},
				loginPwd:'',
				loginCode:'',
				img_url:'',
				newloginPwd: '',
				current: 0,
				list: [{
						name: '设置'
					},
					{
						name: '修改'
					}
				],
				show: false,
				authCode: '',
				backwards:0,
				codeText:'获取验证码',
				passwordCode:'',
			};
		},
		methods: {
			// 获取公钥加密验证码
			verificationCode(){
				if(!this.loginCode){
					return this.$toast('请输入短信验证码')
				}else if(!this.loginPwd){
					return this.$toast('请设置密码')
				}else if(this.loginPwd.length<6){
					return this.$toast('密码长度不得小于6位数')
				}else if((this.current==1)&&(this.loginPwd!=this.newloginPwd)){
					return this.$toast('两次密码不一致，请重新输入')
				}
				loginApi.getPublicKey({username:this.userInfo.username}).then(res=>{
					console.log(res.data);
					var crypt = new JSEncrypt({
					  default_key_size: 1024,
					});
					crypt.setPublicKey(res.data);
					this.passwordCode = crypt.encrypt(this.loginCode);
					console.log(this.passwordCode);
					this.updetaPwd()
				})
			},
			//重置密码
			updetaPwd(){
				mineApi.updateTradePwd({
					userId:this.userInfo.id,
					phone:this.userInfo.phone,
					newTradePassword:this.loginPwd,
					passwordCode:this.passwordCode,
				}).then(res=>{
					if(res.code==200){
						this.$toast('重置密码成功')
						this.$store.dispatch('getUserInfo')
						setTimeout(()=>{
							uni.navigateBack({
								delta:1
							})
						},1000)
					}else{
						this.$toast(res.msg)
					}
				})
			},
			//获取验证码
			getLoginCode(){
				uni.showLoading({
					 title: '加载中'
				})
				mineApi.TradePwdSms({phone:this.userInfo.phone}).then(res=>{
					if(res.code==200){
						this.show = false
						this.$toast('短信发送成功');
						this.backwards=59
						let intVal=setInterval(()=>{
							this.backwards-=1
							if(this.backwards<1){
								this.codeText='重新获取'
								clearInterval(intVal)
							}else{
								this.codeText=this.backwards+'秒后重发'
							}
							
						},1000)
					}else{
						this.$toast('发送失败，请稍后重试')
					}
					
				})
			},
			//获取图形验证码
			getCode(){
				if(this.backwards>0){
					return
				}
				this.show=true
				this.img_url=apiUrl+'user/api/login/createCode?username='+this.userInfo.username+'&solt=' +Math.random()
			},
			change(index) {
				this.current = index
			},
			confirm() {
				loginApi.checkCode({username:this.userInfo.username,code:this.authCode}).then(res=>{
					if(res.code==200){
						//获取验证码
						this.show=false
						this.getLoginCode()
						
					}else{
						this.$toast(res.msg)
						this.getCode()
					}
				})
				
			}
		},
		onLoad(options) {
			
			this.userInfo=JSON.parse(options.userInfo)||{}
			if(this.userInfo.tradePassword)
			this.current=1
			
			// this.userInfo=JSON.parse(uni.getStorageSync('user'))||{}
			
		}
	}
</script>

<style lang="scss" scoped>
	.loginpwd {
		padding: 40rpx;

		.loginpwd-in {
			padding: 20rpx 30rpx 0;
			height: 844rpx;

			.title1 {
				font-weight: 600;
				font-size: 28rpx;
				margin-bottom: 30rpx;
				margin-top: 40rpx;
			}

			.phone {
				display: flex;
				align-items: center;
				border-bottom: 1rpx solid rgba(176, 190, 200, 0.5) !important;

				>text {
					font-size: 28rpx;
					margin-right: 32rpx;
				}

				.code {
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

		.logout {
			margin-top: 80rpx;
		}
	}
</style>
