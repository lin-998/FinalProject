<template>
	<view class="">
		<view class="loginpwd">
			<view class="selbi LittleBg"><text>USDT-TRC20</text></view>
			<view class="LittleBg loginpwd-in">
				<view class="title">提币地址</view>
				<view class="phone">
					<u-input class="input" v-model="form.toAddr" placeholder="请输入或长按粘贴地址" />
				</view>
				<view class="title">数量</view>
				<view class="phone">
					<u-input class="input" type="number" v-model="form.amount" :placeholder="'最小提币数量'+withdrawalCoinNum+' USDT'" />
				</view>
				<view class="title">手续费</view>
				<view class="phone">
					<u-input class="input" :value="withdrawalCoinFee+' USDT'" disabled />
				</view>
				<view class="title">交易密码</view>
				<view class="phone">
					<u-input class="input" v-model="form.password" placeholder="请输入交易密码" type="password" />
				</view>
				<view class="title">短信验证</view>
				<view class="phone">
					<u-input class="input" v-model="form.verifyCode" placeholder="请输入短信验证码" />
					<u-button type="primary" class="code" @click="getCode" :disabled="disabled">{{codeText}}</u-button>
				</view>
				<view class="tips">最小提币数量为：{{withdrawalCoinNum}}USDT,为保障资金安全，当你的账户安全策略变更、密码修改、审核时间：12:00:00~17:59:00我们会对提币进行人工审核</view>
				<view class="account-number">
					<text>到账数量</text>
					<text>{{accountNum}}USDT</text>
				</view>
			</view>
			<u-button class="submitBtn logout" type="primary" @click="withdraw">提币</u-button>
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
				backwards:false,//倒计时
				codeText:'获取验证码',
				withdrawalCoinFee:0,//手续费
				withdrawalCoinNum:0,//最小提现额度
				// username:'11111'
			};
		},
		computed:{
			 accountNum(){
				 if(!this.form.amount||this.form.amount<this.withdrawalCoinFee){
					 return '0.0000'
				 }
				 // return (this.form.amount-this.withdrawalCoinFee)
				 return (Math.floor((this.form.amount-this.withdrawalCoinFee) * 10000) / 10000).toFixed(4)
			 }
		},
		methods: {
			getCode(){
				this.show=true
				this.img_url=apiUrl+'user/api/login/createCode?username=11111'+'&solt=' +Math.random()
			},
			//获取短信验证码
			getnoteCode(){
				mineApi.sendWithdrawSms().then(res=>{
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
						this.withdrawalCoinFee=res.data.withdrawalCoinFee
						this.withdrawalCoinNum=res.data.withdrawalCoinNum
					}
				})
			},
			withdraw(){
				if(this.form.amount<this.withdrawalCoinNum){
					return this.$toast('最低提币数量不得小于'+this.withdrawalCoinNum)
				}else if(!this.form.toAddr){
					return this.$toast('请输入提币地址')
				}else if(!this.form.password){
					return this.$toast('请输入交易密码')
				}else if(!this.form.verifyCode){
					return this.$toast('请输入短信验证码')
				}
				
				mineApi.withdrawDeposit({
					...this.form,
					tokenAddr:'USDT',
					walletType:'CCT'
				}).then(res=>{
					console.log(res);
					if(res.code==200){
						setTimeout(()=>{
							uni.navigateBack({
								delta:1
							},500)
						})
						this.$toast('提币成功')
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
		padding: 20rpx 20rpx 40rpx;
		.selbi{
			padding: 40rpx 20rpx;
			border-radius: 16rpx;
			margin-bottom: 30rpx;
			font-size: 26rpx;
			>text{
				display: block;
				width: 100%;
				background: rgba(207, 217, 222, 0.24);
				border-radius: 16rpx;
				padding: 20rpx;
				color: #B0BEC8;
			}
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
				color: #B0BEC8;
				padding: 46rpx 0;
			}
		}
		.account-number{
			display: flex;
			justify-content: space-between;
			font-size: 28rpx;
			font-weight: 600;
			padding-bottom: 40rpx;
		}
		.logout {
			// width: 562rpx;
			// height: 90rpx;
			// background: $uni-color-theme;
			// box-shadow: 0px 9px 22px rgba(152, 218, 245, 0.43);
			// border-radius: 16rpx;
			margin-top: 60rpx;
			// font-size: 32rpx;
			// &::after {
			// 	border: none;
			// }
		}
	}
</style>
