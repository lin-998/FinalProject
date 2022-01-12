<template>
	<view class="huobi">
		<view class="tips">1、获取到Okex的API Key；用于同步持仓和交易数据</view>
		<view class="tips">2、输入或者复制黏贴你的API Key</view>
		<view class="huobi-detail">
			<view class="apikey">API Key</view>
			<u-input :disabled="inpType" class="input" placeholder="请输入API Key" v-model="objKey.apiKey" type="text" />
			<view class="apikey">Secret Key</view>
			<u-input :disabled="inpType" class="input" placeholder="请输入Secret Key" v-model="objKey.secretKey" type="text" />
			<view class="apikey">Passphrase</view>
			<u-input :disabled="inpType" class="input" placeholder="请输入Passphrase" v-model="objKey.passphrase" type="text" />
			<view v-if="!inpType" style="margin-top: 480rpx;">
				<u-button class="submitBtn" type="primary" @click="addKey" v-if="type">导入</u-button>
				<u-button class="submitBtn" type="primary" @click="addKey" v-else>修改</u-button>
			</view>
		</view>
	</view>
</template>

<script>
	import {homeApi} from '@/api/myAjax.js'
	export default {
		data() {
			return {
				objKey:{
					apiKey:'',
					secretKey:''
				},
				type:true,
				inpType:false,
				apiType:2
			};
		},
		methods:{
			getUserHouBi(){
				homeApi.getUserHouBi({userId:this.$store.state.userInfo.id,exchange:2}).then(res=>{
					if(res.data){
						this.type=false
						this.objKey=res.data
					}
				})
			},
			addKey(){
				if(!this.objKey.apiKey){
					return this.$toast('请输入apiKey');
				}else if(!this.objKey.secretKey){
					return this.$toast('请输入secretKey');
				}
				this.objKey.userId=this.$store.state.userInfo.id
				this.objKey.exchange=2
				console.log(this.objKey);
				homeApi.addOrUpdateUserHouBi(this.objKey).then(res=>{
					if(res.code==200){
						if(!this.type){
							this.$toast('修改成功');
						}else{
							this.$toast('导入成功')
						}
						setTimeout(()=>{
							uni.navigateBack({
								delta:1
							})
						},1000)
					}else{
						this.$toast(res.msg)
					}
				})
			}
		},
		onLoad(options) {
			this.apiType=options.apiType
			console.log(this.apiType);
			if(options.type=='0'){
				this.inpType=true
			}
			this.getUserHouBi()
			uni.setNavigationBarTitle({
				title: this.apiType='Okex'
			})
		},
		onNavigationBarButtonTap(){
			uni.navigateTo({
				url:"/pages/home/authorization/course?apiType="+this.apiType
			})
		}
	}
</script>

<style lang="scss" scoped>
.huobi{
	padding-top: 20rpx;
	.tips{
		margin-left: 100rpx;
		color: #333333;
		margin-top: 20rpx;
		font-size: 24rpx;
	}
	.huobi-detail{
		padding: 20rpx 40rpx 40rpx;
		margin-top: 40rpx;
		box-shadow: 0 0rpx 49px rgba(180, 191, 197, 0.24);
		.apikey{
			margin-top: 54rpx;
			margin-bottom: 10rpx;
			font-size: 28rpx;
		}
		.input{
			margin-top: 17rpx;
			background: rgba(232, 240, 252, .42);
			border-radius: 16rpx;
		}
		.tolead{
			width: 562rpx;
			height: 90rpx;
			background: $uni-color-theme;
			border-radius: 66rpx;
			margin-top: 280rpx;
		}
	}
}
</style>
