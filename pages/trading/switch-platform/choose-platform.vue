<template>
	<view class="banxin choose-platform">
		<view class="LittleBg choose">
			<view class="choose-in" @click="checked=!checked">
				<view class="img">
					<image src="/static/home/icon_huobi.png" mode="widthFix"></image>
					<text>火币</text>
				</view>
				<u-checkbox v-model="checked" shape="circle" size='42'></u-checkbox>
			</view>
			<view class="choose-in" @click="checked=!checked">
				<view class="img">
					<image src="/static/home/ba.png" mode="widthFix"></image>
					<text>币安</text>
				</view>
				<u-checkbox v-model="checked" shape="circle" size='42'></u-checkbox>
			</view>
		</view>
		<u-button class="submitBtn confirmBtn" @click="confirm">确认</u-button>
	</view>
</template>

<script>
	import {tradingApi} from '@/api/myAjax.js'
	export default {
		data() {
			return {
				checked:true
			};
		},
		methods:{
			confirm(){
				this.$toast('切换成功')
				setTimeout(()=>{
					uni.navigateBack({
						delta:1
					})
				},1000)
			}
		}
	}
</script>

<style lang="scss" scoped>
.choose-platform{
	padding-top: 30rpx;
	.choose{
		padding: 48rpx 40rpx 10rpx;
		.choose-in{
			display: flex;
			justify-content: space-between;
			align-items: center;
			margin-bottom: 30rpx;
			.img{
				display: flex;
				align-items: center;
				>image{
					width: 92rpx;
				}
				>text{
					font-size: 28rpx;
					margin-left: 30rpx;
				}
			}
		}
	}
	.confirmBtn{
		position: fixed;
		bottom: 100rpx;
		width: 562rpx;
		height: 90rpx;
		left: 50%;
		margin-left: -281rpx;
		background: $uni-color-theme;
		// border-radius: 66rpx;
		color: #fff;
		&::after{
			border: none;
		}
	}
}
/deep/.u-checkbox__icon-wrap{
	border: 2rpx solid #00B9FF;
}

</style>
