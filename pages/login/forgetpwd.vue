<template>
	<view class="bgImg login">
		<view class="title1">忘记密码</view>
		<!-- 登录表单 -->
		<view class="from-list" style="margin-bottom:200rpx;">
			<u-form :model="form" ref="uForm">
				<u-form-item style="margin-bottom: 10px;" prop="username">
					<u-input v-model="form.username" placeholder="请输入用户名" maxlength="12" />
				</u-form-item>
				<u-form-item style="margin-bottom: 10px;" prop="phone">
					<u-input v-model="form.phone" placeholder="请输入手机号码" maxlength="11" type="number" />
				</u-form-item>
				<u-form-item style="margin-bottom: 10px;" prop="passwordCode">
					<u-input v-model="form.passwordCode" type="number" placeholder="请输入短信验证码" />
					<u-button class="codeslot" type="primary" :disabled='isDisabled' @click="getCode">{{codeText}}</u-button>
				</u-form-item>
				<u-form-item style="margin-bottom: 10px;" prop="newLoginPassword">
					<u-input v-model="form.newLoginPassword" placeholder="请设置新密码" maxlength="12" type="password" />
				</u-form-item>
				<u-form-item style="margin-bottom: 10px;" prop="newpwd">
					<u-input v-model="form.newpwd" placeholder="请再次输入新密码" maxlength="12" type="password" @blur="Checkpwd" />
				</u-form-item>
			</u-form>
		</view>
		<u-button class="submitBtn" type="primary" @click="submit">重置</u-button>
		<u-mask :show="show" @click="show = false">
			<defalut-mask :username='form.username' :imgUrl='img_url' @confirm='getLoginCode'></defalut-mask>
		</u-mask>
	</view>
</template>

<script>
	import { apiUrl } from "@/api/app.js";
	import {loginApi,mineApi} from '@/api/myAjax.js'
	import { JSEncrypt } from "@/common/jsencrypt.min.js";
	export default {
		data() {
			return {
				backwards:0,
				codeText:'获取验证码',
				apiUrl:apiUrl,
				img_url:'',
				authCode: '',
				show: false, //验证码弹框
				isDisabled: false, //获取验证码的状态
				checked: false,
				form: {},
				rules: { //表单校验
					username: [{
						required: true,
						message: '请输入用户名',
						trigger: ['blur', 'change']
					}],
					phone: [{
						required: true,
						min: 11,
						message: '请输入正确的手机号码',
						trigger: ['blur', 'change']
					}],
					passwordCode: [{
						required: true,
						message: '请输入短信验证码',
						trigger: ['blur', 'change']
					}],
					newLoginPassword: [{
						required: true,
						min: 8,
						message: '密码长度不能少于8位数',
						trigger: ['blur', 'change']
					}],
					newpwd: [{
						min: 8,
						required: true,
						message: '密码长度不能少于8位数',
						trigger: ['blur', 'change']
					}]
				}
			};
		},
		methods: {
			//对验证码加密
			getPublicKey(userId){
				loginApi.getPublicKey({username:this.form.username}).then(res=>{
					console.log(res.data);
					var crypt = new JSEncrypt({
					  default_key_size: 1024,
					});
					crypt.setPublicKey(res.data);
					this.form.pwdCode = crypt.encrypt(this.form.passwordCode);
					console.log(this.form.pwdCode);
					this.forgetPassword()
				})
			},
			//重置密码
			forgetPassword(userId){
				loginApi.forgetPassword({
					username:this.form.username,
					phone:this.form.phone,
					passwordCode:this.form.pwdCode,
					newPassword:this.form.newLoginPassword,
				}).then(res=>{
					if(res.code==200){
						this.$toast('重置成功，前往登录')
						uni.setStorageSync('username',this.form.username)
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
			//获取手机验证码
			getCode() {
				if(!this.form.username){return this.$toast('请输入用户名')}
				if(!this.form.phone){return this.$toast('请输入手机号码')}
				this.img_url=this.apiUrl+'user/api/login/createCode?username=' +this.form.username +'&solt=' +Math.random()
				this.show = true
			},
			//获取短信验证码
			getLoginCode(){
				uni.showLoading({
					 title: '加载中'
				})
				loginApi.forgetPasswordSendsms({phone:this.form.phone}).then(res=>{
					this.show = false
					if(res.code==200){
						this.$toast('短信发送成功');
						this.isDisabled=true
						this.backwards=59
						let intVal=setInterval(()=>{
							this.backwards-=1
							if(this.backwards<1){
								this.isDisabled=false
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
			// 校验两次密码
			Checkpwd() {
				if(this.form.newLoginPassword.length<8){
					return this.$toast('密码长度不能少于8位数')
				}
				if (this.form.newpwd != this.form.newLoginPassword) {
					return this.$toast('两次密码输入不一致')
				}
			},
			//表单校验
			submit() {
				console.log(123465);
				this.$refs.uForm.validate(valid => {
					if (valid) {
						console.log('验证通过');
						if(!((/\d+/.test(this.form.newLoginPassword)) && (/[a-zA-Z]+/.test(this.form.newLoginPassword)))){
							return this.$toast('密码至少包含一个数字跟字母')
						}
						if (this.form.newpwd != this.form.newLoginPassword) {
							return this.$toast('两次密码输入不一致')
						}
						this.getPublicKey()
					} else {
						console.log('验证失败');
					}
				});
			}
		},
		onReady() {
			this.$refs.uForm.setRules(this.rules);
			this.img_url=this.apiUrl+'user/api/login/createCode?username=' +this.form.username +'&solt=' +Math.random()
		}
	}
</script>

<style lang="scss" scoped>
	.login {
		padding: 80rpx;
		padding-top: calc(80rpx + 88rpx + var(--status-bar-height));
		.title1 {
			font-size: 48rpx;
			font-family: Source Han Sans SC;
			font-weight: 500;
		}
		.from-list{
			margin-top: 66rpx;
			padding: 0 50rpx;
			box-shadow: 0rpx 8rpx 37rpx rgba(176, 209, 222, 0.27);
			border-radius: 16rpx;
		}
		.logoimg {
			margin: 0 auto;
			width: 180rpx;
			height: 180rpx;
			background: #1c2b44;
			border-radius: 50%;
			opacity: 0.9;

			image {
				width: 100%;
				height: 100%;
			}
		}

		.codeslot {
			width: 164rpx;
			height: 52rpx;
			background: #279FFF;
			border-radius: 16rpx;
			font-size: 24rpx;
		}
		.footer {
			display: flex;
			color: $uni-color-theme;
			justify-content: space-between;
			margin-top: 30rpx;
			padding: 0 50rpx;
		}
	}
	/deep/.uni-input-input{
		font-weight: 1000;
		padding-left: 0 !important;
	}
	.uni-input-placeholder{
		color: #B0BEC8 !important;
		padding-left: 0 !important;
		font-size: 24rpx;
	}
</style>
