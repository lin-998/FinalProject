<template>
	<view class="bgImg login">
		<!-- 登录表单 -->
		<u-tabs :list="list" inactive-color='#B0BEC8' active-color='#333333' bar-width='120' :is-scroll="false" :current="current" @change="change"></u-tabs>
		<view class="from-list">
			<u-form :model="form" ref="uForm">
				<u-form-item v-if="current==1" style="margin-bottom: 10px;" prop="phone">
					<u-input v-model="form.phone" placeholder="请输入手机号码" maxlength="11" type="number" />
				</u-form-item>
				<u-form-item v-else style="margin-bottom: 10px;" prop="phone">
					<u-input v-model="form.phone" placeholder="请输入邮箱" maxlength="11" type="number" />
				</u-form-item>
				<u-form-item v-if="current==1" style="margin-bottom: 10px;" prop="verifyCode">
					<u-input v-model="form.verifyCode" type="number" placeholder="请输入短信验证码" />
					<u-button class="codeslot" type="warning" :disabled='isDisabled' @click="getCode">{{codeText}}</u-button>
				</u-form-item>
				<u-form-item v-else style="margin-bottom: 10px;" prop="verifyCode">
					<u-input v-model="form.verifyCode" type="number" placeholder="请输入邮箱验证码" />
					<u-button class="codeslot" type="warning" :disabled='isDisabled' @click="getCode">{{codeText}}</u-button>
				</u-form-item>
				<u-form-item style="margin-bottom: 10px;" prop="invitationCode">
					<u-input v-model="form.invitationCode" placeholder="请输入邀请码" />
				</u-form-item>
				<u-form-item style="margin-bottom: 10px;" prop="loginPassword">
					<u-input v-model="form.loginPassword" placeholder="请输入登录密码" type="password" maxlength="12" />
				</u-form-item>
				<u-form-item style="margin-bottom: 10px;" prop="newpwd">
					<u-input v-model="form.newpwd" placeholder="请再次输入登录密码" maxlength="12" type="password" @blur="inp" />
				</u-form-item>
			</u-form>
		</view>
		<view class="footer">
			<text class="iconfont checkbox-icon2" v-if="checked" @click="checked=false">&#xe8f5;</text>
			<text class="iconfont checkbox-icon" v-else @click="checked=true">&#xe600;</text>
			<view @click="changeClick" class="text">《注册协议》</view>
		</view>
		<u-button class="submitBtn" @click="submit">注册</u-button>
		
<!-- 		<u-mask :show="show" @click="show = false">
			<defalut-mask :username='form.username' :imgUrl='img_url' @confirm='getLoginCode'></defalut-mask>
		</u-mask> -->
	</view>
</template>

<script>
	import { apiUrl } from "@/api/app.js";
	import { JSEncrypt } from "@/common/jsencrypt.min.js";
	import {loginApi} from '@/api/myAjax.js'
	export default {
		data() {
			return {
				list: [
					{name: '邮箱注册'}, 
					{name: '手机号注册'},
				],
				current:1,
				backwards:0,
				codeText:'获取验证码',
				apiUrl:apiUrl,
				img_url:'',
				authCode: '',
				show: false, //验证码弹框
				isDisabled: false, //获取验证码的状态
				checked:false,
				form: {},
				rules: {
					phone: [{
						required: true,
						message: '请输入手机号码',
						trigger: ['blur','change']
					}],
					verifyCode: [{
						required: true,
						message: '请输入短信验证码',
						trigger: ['blur','change']
					}],
					loginPassword: [{
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
			change(index) {
				this.current = index;
			},
			//对验证码加密
			// getPublicKey(userId){
			// 	loginApi.getPublicKey({username:this.form.username}).then(res=>{
			// 		console.log(res.data);
			// 		var crypt = new JSEncrypt({
			// 		  default_key_size: 1024,
			// 		});
			// 		crypt.setPublicKey(res.data);
			// 		this.form.pwdCode = crypt.encrypt(this.form.verifyCode);
			// 		console.log(this.form.pwdCode);
			// 		this.register()
			// 	})
			// },
			//获取手机验证码
			getCode() {
				if(!this.form.phone){return this.$toast('请输入手机号码')}
				this.authCode=''
				this.img_url=this.apiUrl+'user/api/login/createCode?username=' +this.form.phone +'&solt=' +Math.random()
				this.show = true
			},
			//检测图形验证码
			confirm(){
				if(!this.authCode){return this.$toast('请输入图形验证码')}
				loginApi.checkCode({username:this.form.phone,code:this.authCode}).then(res=>{
					if(res.code==200){
						this.show = false
						//发送短信
						this.getLoginCode()
					}else{
						this.$toast(res.msg)
						this.img_url=this.apiUrl+'user/api/login/createCode?username=' +this.form.phone +'&solt=' +Math.random()
					}
				})
			},
			//获取短信验证码
			getLoginCode(){
				uni.showLoading({
					 title: '加载中'
				})
				loginApi.registerSendSms({phone:this.form.phone}).then(res=>{
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
						this.$toast(res.msg)
					}
					
				})
			},
			inp(){
				if(this.form.loginPassword.length<8){
					return this.$toast('密码长度不能少于8位数')
				}
				if(this.form.newpwd==this.form.loginPassword){return }
					this.$toast('两次密码输入不一致')
			},
			submit() {
				console.log(123465);
				this.$refs.uForm.validate(valid => {
					if (valid) {
						console.log('验证通过');
						if(!((/\d+/.test(this.form.loginPassword)) && (/[a-zA-Z]+/.test(this.form.loginPassword)))){
							return this.$toast('密码至少包含一个数字跟字母')
						}
						if(this.form.newpwd!=this.form.loginPassword){return this.$toast('两次密码输入不一致')}
						if(!this.checked){return this.$toast('请阅读并同意注册协议')}
						this.register()
					} else {
						console.log('验证失败');
					}
				});
			},
			register(){
				loginApi.registeredUser({
					loginPassword:this.form.loginPassword,
					invitationCode:this.form.invitationCode,
					verifyCode:this.form.verifyCode,
					phone:this.form.phone,
				}).then(res=>{
					console.log(res);
					if(res.code==200){
						this.$toast('注册成功，将跳转登录页面')
						setTimeout(()=>{
							uni.redirectTo({
								url:"/pages/login/login?username="+this.form.phone
							})
						},1000)
					}else{
						this.$toast(res.msg)
					}
				})
			},
			changeClick(){
				uni.navigateTo({
					url:"/pages/login/protocol"
				})
			}
		},
		onReady() {
			this.$refs.uForm.setRules(this.rules);
		}
	}
</script>

<style lang="scss" scoped>
	.login {
		padding: 30rpx 60rpx 0;
		.from-list{
			margin-top: 48rpx;
			padding: 0 50rpx;
			box-shadow: 0rpx 8rpx 37rpx rgba(176, 209, 222, 0.27);
			opacity: 1;
			border-radius: 16rpx;
			.codeslot {
				width: 164rpx;
				height: 52rpx;
				background: #279FFF;
				border-radius: 16rpx;
				font-size: 24rpx;
			}
		}
		.footer{
			margin: 140rpx 0 20rpx;
			display: flex;
			align-items: center;
			padding: 0 50rpx;
			.checkbox-icon{
				color: #B0BEC8;
			}
			.checkbox-icon2{
				color: $uni-color-theme;
			}
			.text{
				color: $uni-color-theme;
				line-height: 34rpx;
			}
		}
	}
	/deep/.u-tab-bar{
		background-color: #279FFF !important;
	}
</style>
