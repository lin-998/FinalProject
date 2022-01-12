<template>
	<view class="switch-platform banxin">
		<view class="LittleBg current-latform">
			<view class="platform">
				<text class="iconfont">&#xe613;</text>
				<text>当前执行平台</text>
			</view>
			<view class="give-up">
				<image src="/static/home/icon_huobi.png" mode="widthFix"></image>
				<text>火币</text>
			</view>
			<!-- <u-button class="shut-robot" type="primary" @click="robot">关闭机器人</u-button> -->
			<view class="currency">执行交易币种：USDT</view>
		</view>
		<text class="tips">注：请先关闭机器人，再切换平台</text>
		<view class="LittleBg huobi">
			<view class="platform">
				<text class="iconfont">&#xe613;</text>
				<text>切换平台</text>
			</view>
			<view class="switch-in">
				<navigator class="switch" url="/pages/trading/switch-platform/choose-platform">
					<image src="/static/home/icon_huobi.png" mode="widthFix"></image>
					<text>火币</text>
				</navigator>
				<navigator class="switch" url="/pages/trading/switch-platform/choose-platform">
					<image src="/static/home/ba.png" mode="widthFix"></image>
					<text>币安</text>
				</navigator>
			</view>
		</view>
	</view>
</template>

<script>
	import {tradingApi} from '@/api/myAjax.js'
	export default {
		data() {
			return {
				
			};
		},
		methods:{
			robot(){
				this.$toast('功能尚未接通')
			}
		}
	}
</script>

<style lang="scss" scoped>
.switch-platform{
	padding-top: 48rpx;
	
	.current-latform{
		padding: 30rpx;
		.give-up{
			display: flex;
			align-items: center;
			margin-bottom: 10rpx;
			>image{
				width: 92rpx;
				margin-right: 30rpx;
			}
		}
		.currency{
			font-size: 28rpx;
			color: #B0BEC8;
		}
		.shut-robot{
			width: 178rpx;
			height: 58rpx;
			margin-top: 30rpx;
			background: $uni-color-theme;
			border-radius: 66rpx;
			font-size: 24rpx;
		}
	}
	.platform{
		display: flex;
		align-items: center;
		margin-bottom: 26rpx;
		>text{
			font-size: 28rpx;
			font-family: Source Han Sans SC;
			font-weight: 500;
		}
		.iconfont{
			color: #279FFF;
			font-size: 30rpx;
			margin-right: 12rpx;
		}
	}
	.tips{
		font-family: PingFang SC;
		font-weight: 400;
		display: block;
		color: #B0BEC8;
		margin: 30rpx 0 30rpx;
	}
	.huobi{
		padding: 30rpx 40rpx 30rpx;
	}
	.switch-in{
		display: flex;
		align-items: center;
	}
	.switch{
		display: flex;
		flex-direction: column;
		align-items: center;
		margin-right: 60rpx;
		image{
			width: 92rpx;
			margin-bottom: 17rpx;
		}
		text{
			font-size: 28rpx;
		}
	}
}
</style>
