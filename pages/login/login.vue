<template>
	<view class="bgImg login">
		<view class="logoimg">
			<image src="/static/img/6.jpg" mode="widthFix"></image>
		</view>
		<!-- 登录表单 -->
		<view class="login-form">
			<u-form :model="form" ref="uForm" style="margin-bottom:137rpx;">
				<!-- <text class="form-title">手机号</text>
				<u-form-item style="margin-bottom: 20rpx;" prop="phone">
					<u-input v-model="form.phone" placeholder="请输入手机号码或邮箱" @blur="img_url=apiUrl+'user/api/login/createCode?username=' +form.phone +'&solt=' +Math.random()" />
				</u-form-item> -->
				<text class="form-title">用户名</text>
				<u-form-item style="margin-bottom: 20rpx;" prop="username">
					<u-input v-model="form.username" placeholder="请输入用户名" @blur="img_url=apiUrl+'user/api/login/createCode?username=' +form.username +'&solt=' +Math.random()" />
				</u-form-item>
				<text class="form-title">登录密码</text>
				<u-form-item style="margin-bottom: 20rpx;" prop="password">
					<u-input v-model="form.password" placeholder="请输入登录密码" maxlength="12" type="password" />
					<navigator url="/pages/login/forgetpwd" class="forget-pwd">忘记密码</navigator>
				</u-form-item>
			
			
			</u-form>
			<u-button :loading="loading" class="submitBtn iconfont" @click="submit">&#xe67b;</u-button>
		</view>
		<view class="footer">
			<text @click="toRegister">免费注册</text>
		</view>
	</view>
</template>

<script>
	import { apiUrl } from "@/api/app.js";
	import { JSEncrypt } from "@/common/jsencrypt.min.js";
	import {loginApi} from '@/api/myAjax.js'
	import {mainApi} from '@/api/appApi.js'
	export default {
		sockets:{
			
		},
		data() {
			return {
				loading:false,
				img_url:'',
				apiUrl:apiUrl,
				form: {},
				// rules: {
				// 	username: [{
				// 		required: true,
				// 		message: '请输入用户名',
				// 		trigger: ['blur']
				// 	}],
				// 	password: [{
				// 		required: true,
				// 		message: '请输入密码',
				// 		trigger: ['blur']
				// 	}],
				// 	code: [{
				// 		required: true,
				// 		message: '请输入验证码',
				// 		trigger: ['blur']
				// 	}]
				// }
			};
		},
		methods: {
			toRegister(){
				uni.navigateTo({url:'/pages/login/register'})
			},
			submit() {
				if(!this.form.username){
					return this.$toast('请输入手机号码或邮箱')
				}else if(!this.form.password){
					return this.$toast('请输入密码')
				}
			
						this.loading=true
						// console.log('验证通过');
						this.login()
			},
			// 获取公钥进行密码加密
			// getPublicKey(){
			// 	loginApi.checkCode({username:this.form.username,code:this.form.code}).then(res1=>{
					
			// 		if(res1.code==200){
			// 			loginApi.getPublicKey({username:this.form.username}).then(res=>{
			// 				var crypt = new JSEncrypt({
			// 				  default_key_size: 1024,
			// 				});
			// 				crypt.setPublicKey(res.data);
			// 				this.form.newpassword = crypt.encrypt(this.form.password);
			// 				// this.form.newpassword =this.form.password
			// 				console.log(this.form.newpassword);
			// 				this.login()
			// 			}).catch(()=>{
			// 		this.loading=false
			// 		this.$toast('系统异常，请稍后重试！')
			// 	})
			// 		}else{
			// 			this.loading=false
			// 			this.$toast(res1.msg)
			// 			this.img_url=this.apiUrl+'user/api/login/createCode?username=' +this.form.username +'&solt=' +Math.random()
			// 		}
			// 	}).catch(()=>{
			// 		this.loading=false
			// 		this.$toast('系统异常，请稍后重试！')
			// 	})
			// },
			login(){
				mainApi.login({name:this.form.username,password:this.form.password}).then(res=>{
					console.log(res);
					this.loading=false
					if(res.code==200){
						console.log(222)
						// if(res.data.id!=this.$store.state.userId){
						// 	this.$store.commit('userLoginStatus',res.data.id)
						// }
						this.$toast('登录成功')
						this.$socket.emit('login',res.userInfo.user_id );
						uni.setStorageSync("userToken",res.token)
						uni.setStorageSync("user",res.userInfo)
						this.$store.dispatch('getUserInfo')
						setTimeout(()=>{
							uni.switchTab({
								url:"/pages/homePage/homePage"
							})
						},1000)
					}else{
						this.$toast(res.msg)
					}
				}).catch(()=>{
					this.loading=false
					this.$toast('系统异常，请稍后重试！')
				})
			}
		},
		onReady() {
			// this.$refs.uForm.setRules(this.rules);
			this.img_url=this.apiUrl+'user/api/login/createCode?username=' +this.form.username +'&solt=' +Math.random()
		},
		onLoad(options) {
			if(options.username)this.form.username=options.username
		}
	}
</script>

<style lang="scss" scoped>
	.login {
		
		// padding-top: calc(80rpx + 88rpx + var(--status-bar-height));
		.title {
			text-align: center;
			font-size: 64rpx;
			color: #FFFFFF;
			margin-bottom: 70rpx;
		}
.login-form{
	padding: 80rpx;
	border-radius: 16rpx;
	
}
		.logoimg {
			margin: 0 auto;
			margin-bottom: 30rpx;
			width: 100%;
			height: 400rpx;
			border-radius: 0 0 16rpx 16rpx;
			overflow: hidden;
			opacity: 0.9;
			image {
				width: 100%;
				height: 100%;
			}
		}
		.codeslot{
			width: 120rpx;
			height: 54rpx;
			background: rgba(0, 0, 0, 0);
			image{
				width: 100%;
				height: 30px;
				background: #333;
			}
		}
		.footer{
			text-align: right;
			color: $uni-color-theme;
			margin-top: 30rpx;
			padding: 0 50rpx;
		}
		
	}
	.forget-pwd{
		color: $uni-color-theme;
		padding: 0 20rpx;
	}
	.codeslot{
		margin-right: 20rpx;
	}
	.u-border-bottom:after{
		border-bottom: none;
		box-shadow: 0px 8px 37px rgba(176, 209, 222, 0.27);
		border-radius: 20px;
	}
</style>
