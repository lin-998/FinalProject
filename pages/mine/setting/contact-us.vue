<template>
	<view class="contact">
		<view class="img">
			<image src="/static/mine/pic_chukou.png" mode="widthFix"></image>
			<view class="qrcode">
				<image :src="qrCodeUrl" mode=""></image>
				<view class="service">扫码联系客服</view>
			</view>
		</view>
	</view>
</template>

<script>
	import {loginApi} from '@/api/myAjax.js'
	import { imgUrl } from "@/api/app.js";
	export default {
		data() {
			return {
				qrCodeUrl:''
			};
		},
		created() {
			loginApi.getCommonSetUp().then(res=>{
				this.qrCodeUrl=imgUrl+res.data.qrCodeUrl
			})
		}
	}
</script>

<style lang="scss" scoped>
.contact{
	padding: 210rpx 80rpx 0;
	.img{
		width: 100%;
		>image{
			width: 100%;
		}
		.qrcode{
			margin: 0 43rpx;
			margin-top: -20rpx;
			// height: 636rpx;
			background: linear-gradient(180deg, #00285D 0%, #0048A7 100%);
			padding: 100rpx 70rpx 0;
			image{
				width: 100%;
			}
			.service{
				font-size: 32rpx;
				text-align: center;
				padding: 20rpx 0;
			}
		}
	}
}
</style>
