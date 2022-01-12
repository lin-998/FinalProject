<template>
	<view class="">
		<view class="loginpwd">
			<view class="LittleBg loginpwd-in">
				<view class="title">接收账号</view>
				<view class="phone">
					<u-input class="input" v-model="form.toUserName" placeholder="请输入接收账号" />
				</view>
				<view class="title">转出数量</view>
				<view class="phone">
					<u-input class="input" type="number" v-model="form.amount" placeholder="请输入转出数量" />
				</view>
				<view class="title">手续费</view>
				<view class="phone">
					<u-input class="input" :value="transferFee+'%'" disabled />
				</view>
				<view class="title">交易密码</view>
				<view class="phone">
					<u-input class="input" type="password" v-model="form.password" placeholder="请输入交易密码" />
				</view>
				<view class="title">短信验证</view>
				<view class="phone">
					<u-input class="input" v-model="form.verifyCode" placeholder="请输入短信验证码" />
					<u-button type="primary" class="code" @click="getCode" :disabled="disabled">{{codeText}}</u-button>
				</view>
				<view class="tips"></view>
			</view>
			<u-button class="submitBtn logout" type="primary" @click="withdraw">确认</u-button>
		</view>
		<u-mask :show="show" @click="show = false">
			<defalut-mask :username='form.username' :imgUrl='img_url' @confirm='getnoteCode'></defalut-mask>
		</u-mask>
	</view>
</template>

<script>
	import {mineApi,loginApi} from '@/api/myAjax.js'
	import {apiUrl} from '@/api/app.js'
	export default {
		data() {
			return {
				img_url:'',
				show: false,
				form:{},
				disabled:false,//验证码状态
				backwards:false,//验证码倒计时
				codeText:'获取验证码',
				transferFee:0,//手续费
				// username:'11111'
			};
		},
		methods: {
			getCode(){
				this.show=true
				this.img_url=apiUrl+'user/api/login/createCode?username=11111'+'&solt=' +Math.random()
			},
			//获取验证码
			getnoteCode(){
				mineApi.sendInsideTransferSms().then(res=>{
					this.show=false
					if(res.code==200){
						this.disabled=true
						this.$toast('短信发送成功');
						this.backwards=59
						let intVal=setInterval(()=>{
							this.backwards-=1
							if(this.backwards<1){
								this.disabled=false
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
			//手续费
			getCommonSetUp(){
				loginApi.getCommonSetUp().then(res=>{
					if(res.code==200){
						this.transferFee=res.data.transferFee||0
					}
				})
			},
			withdraw(){
				if(!this.form.amount){
					return this.$toast('请输入转出数量')
				}else if(!this.form.toUserName){
					return this.$toast('请输入接收账号')
				}else if(!this.form.password){
					return this.$toast('请输入交易密码')
				}else if(!this.form.verifyCode){
					return this.$toast('请输入短信验证码')
				}
				mineApi.insideTransfer({
					...this.form,
				}).then(res=>{
					console.log(res);
					if(res.code==200){
						setTimeout(()=>{
							uni.navigateBack({
								delta:1
							},500)
						})
						this.$toast('互转成功')
					}else{
						this.$toast(res.msg)
					}
				})
			}
		},
		onLoad() {
			this.getCommonSetUp()
		}
	}
</script>

<style lang="scss" scoped>
	.loginpwd {
		padding: 40rpx;
		.selbi{
			padding: 24rpx 50rpx;
			border-radius: 52rpx;
			margin-bottom: 30rpx;
			font-size: 32rpx;
		}
		.loginpwd-in {
			padding: 20rpx 30rpx 0;
			margin-bottom: 20rpx;
			.title {
				font-size: 28rpx;
				margin-bottom: 30rpx;
				margin-top: 40rpx;
			}

			.phone {
				display: flex;
				align-items: center;
				background: rgba(207, 217, 222, 0.24);
				border-radius: 16rpx;

				>text {
					font-size: 28rpx;
					margin-right: 32rpx;
					opacity: 0.7;
				}

				.code {
					opacity: 1;
					width: 164rpx;
					height: 52rpx;
					background: #279FFF;
					font-size: 24rpx;
					border-radius: 16rpx;
					text-align: center;
					line-height: 52rpx;
					margin-right: 10rpx;
				}
			}
			.tips{
				font-size: 24rpx;
				color: #6A7696;
				padding: 46rpx 0;
			}
		}
		.account-number{
			display: flex;
			justify-content: space-between;
			font-size: 24rpx;
		}
		.logout {
			// width: 562rpx;
			// height: 90rpx;
			// background: $uni-color-theme;
			// border-radius: 16rpx;
			margin-top: 50rpx;
			// font-size: 32rpx;

			&::after {
				border: none;
			}
		}
	}
</style>
