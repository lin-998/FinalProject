<template>
	<view class="banxin" style="padding-top: 20rpx;">
		<view class="LittleBg authorization" @click="authorization(0)">
			<view class="authorization-in">
				<image src="/static/home/icon_huobi.png" mode="widthFix"></image>
				<text>Okex</text>
			</view>
			<u-icon name="more-dot-fill" color="#B0BEC8" size="40"></u-icon>
		</view>
		<!-- <view class="LittleBg authorization" @click="authorization(1)">
			<view class="authorization-in">
				<image src="/static/home/ba.png" mode="widthFix"></image>
				<text>币安</text>
			</view>
			<u-icon name="more-dot-fill" color="#B0BEC8" size="40"></u-icon>
		</view> -->
		<u-mask :show="show">
			<view class="warp">
				<view class="rect LittleBg">
					<navigator @click="show=false" :url="'/pages/home/authorization/huobi?type=0&&apiType='+apiType" class="title">查看API Key</navigator>
					<view class="title" @click="remove">从服务器删除</view>
					<view class="title titlelast" @click="reset">重置</view>
				</view>
				<u-button class="codebtn" type="primary" @click="show = false">取消</u-button>
			</view>
		</u-mask>
		<u-action-sheet :list="list" v-model="actionShow" @click="actionBtn"></u-action-sheet>
	</view>
</template>

<script>
	import {homeApi} from '@/api/myAjax.js'
	export default {
		data() {
			return {
				list: [{
					text: '查看API KEY',
				}, {
					text: '从服务器删除'
				}, {
					text: '重置' 
				}],
				actionShow: false,
				show: false,
				userInfo:{},
				apiType:2
			};
		},
		methods: {
			actionBtn(index){
				console.log(index);
				if(index==1){
					this.remove()
				}else{
					let type=index==0?0:1
					uni.navigateTo({
						 url:`/pages/home/authorization/huobi?type=${type}&&apiType=${this.apiType}`
					})
				}
			},
			authorization(type){
				this.apiType=2
				// if(!uni.getStorageSync('userToken')){
				// 	return this.$toast('请先进行登录')
				// }else{
				// 	if(!JSON.parse(uni.getStorageSync('user')).activeStatus){
				// 		return this.$toast('用户未激活无法进行操作')
				// 	}
					this.actionShow=true
				// }
			},
			reset(){
				this.show=false
				uni.navigateTo({
					 url:"/pages/home/authorization/huobi?type=1&&apiType="+this.apiType
				})
			},
			remove(){
				homeApi.delUserHouBi({exchange:this.apiType}).then(res=>{
					this.show=false
					if(res.code==200){
						return this.$toast('删除成功')
					}
					this.$toast(res.msg)
					
				})
			},
			
		},
		onLoad() {
			if(uni.getStorageSync('user')){
				this.userInfo=JSON.parse(uni.getStorageSync('user'))
			}
		}
	}
</script>

<style lang="scss" scoped>
	.authorization {
		display: flex;
		justify-content: space-between;
		align-items: center;
		padding: 40rpx;
		margin-bottom: 20rpx;
		.authorization-in {
			display: flex;
			align-items: center;
			font-weight: 1000;
			>image {
				width: 92rpx;
			}

			>text {
				margin-left: 30rpx;
				font-size: 28rpx;
			}
		}
	}

	.warp {
		display: flex;
		align-items: center;
		flex-direction: column;
		justify-content: center;
		height: 100%;
	}

	.rect {
		width: 482rpx;
		border-radius: 16rpx;
		padding: 0 54rpx;
		.title {
			padding: 30rpx 0;
			text-align: center;
			border-bottom: 1rpx solid rgba(10, 46, 111, 0.5);
			font-size: 28rpx;
		}
		.titlelast{
			border-bottom: none;
		}

		.input {
			width: 100%;
			border-bottom: 2rpx solid $uni-color-bd;
			border-color: $uni-color-bd !important;
			margin-bottom: 20rpx;
		}

		.codeimg {
			display: flex;
			align-items: center;

			image {
				width: 120rpx;
				height: 54rpx;
				background: #333;
			}

			text {
				margin-left: 20rpx;
				color: $uni-color-theme;
			}
		}
	}
	.codebtn {
		width: 322rpx;
		height: 70rpx;
		margin-top: 60rpx;
		background: $uni-color-theme;
		border-radius: 44rpx;
	}
</style>
