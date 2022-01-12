<template>
	<view class="charge-money">
		<view class="LittleBg" style="padding: 30rpx 20rpx;">
			<view class="selbi" @click="showPicker=true">{{name}}</view>
			<view class="chain-type">链类型：<text>TRC20</text></view>
			<view class="address">
				<view class="qrcode-img">
					<tki-qrcode :showLoading="false" cid="qrcode1" ref="qrcode" :val="val" :size="sizeImg" :unit="unit"
						:icon="icon" :iconSize="iconsize" :lv="lv" :onval="onval" :loadMake="loadMake"
						:usingComponents="true" :src="src" />
				</view>
				<view class="currency-address">充币地址</view>
				<view class="address-link">{{val}}</view>
				<u-button type="primary" class="btn" @click="cody(val)"><text class="iconfont">&#xe60e;</text>复制地址
				</u-button>
			</view>
			<view class="tips">请勿向上述地址充值任何非USDT-TRC20资产，<br>否则资产将不可退回</view>
		</view>

	</view>
</template>

<script>
	import {
		publicFun
	} from '@/api/myFun.js'
	import {
		tradingApi
	} from '@/api/myAjax.js'
	import tkiQrcode from "@/utils/tki-qrcode/tki-qrcode.vue";
	export default {
		components: {
			tkiQrcode,
		},
		data() {
			return {
				showPicker: false,
				selector: ['USDT', 'TGF', 'CTST', 'TGF', 'CTST', 'TGF', 'CTST', 'TGF', 'CTST', 'TGF', 'CTST'],
				name: 'USDT',
				index: [0],
				val: '地址正在创建当中', // 要生成的二维码值
				sizeImg: 260, // 二维码大小
				unit: "upx", // 单位
				icon: "", // 二维码图标
				iconsize: 40, // 二维码图标大小
				lv: 3, // 二维码容错级别 ， 一般不用设置，默认就行
				onval: true, // val值变化时自动重新生成二维码
				loadMake: true, // 组件加载完成后自动生成二维码
				src: "", // 二维码生成后的图片地址或base64
			};
		},
		methods: {
			confirm(name) {
				let str = JSON.stringify(name)
				this.name = str.substring(1, str.length - 1)
				this.index = [this.name]
			},
			cody(data) {
				publicFun.cody(data)
			}
		},
		onLoad(options) {
			console.log(options);
					this.val = options.id
			//获取用户钱包地址
			// tradingApi.getFreeBalance().then(res => {
			// 	console.log(res);
			// 	if (res.code == 200)
			// })
		}
	}
</script>

<style lang="scss" scoped>
	.charge-money {
		padding: 30rpx 40rpx;
		.selbi {
			padding: 17rpx 20rpx;
			// margin: 0 20rpx;
			border-radius: 16rpx;
			background: rgba(207, 217, 222, 0.24);
			color: #B0BEC8;
		}

		.chain-type {
			margin: 30rpx 0 22rpx;
			display: flex;
			flex-direction: column;
			>text {
				margin-top: 14rpx;
				width: 145rpx;
				font-size: 26rpx;
				padding: 7rpx 30rpx;
				color: #fff;
				background-color: #279FFF;
				border-radius: 16rpx;
			}
		}

		.address {
			// height: 944rpx;
			text-align: center;
			padding: 90rpx 30rpx 60rpx;
			background-color: rgba(207, 217, 222, 0.24);
			border-radius: 16rpx;
			.currency-address {
				padding: 42rpx 0 30rpx;
			}

			.address-link {
				margin: 0 auto;
				width: 400rpx;
				margin-bottom: 106rpx;
			}

			.qrcode-img {
				width: 300rpx;
				padding: 20rpx;
				background: #fff;
				margin: 0 auto;
				border-radius: 20rpx;

				>image {
					width: 100%;
				}
			}

			.btn {
				width: 246rpx;
				height: 60rpx;
				background: $uni-color-theme;
				opacity: 1;
				border-radius: 16rpx;

				>text {
					margin-right: 16rpx;
					color: #fff;
				}

				&::after {
					border: none;
				}
			}
		}
		.tips {
			color: #B0BEC8;
			margin-top: 33rpx;
			font-size: 24rpx;
			text-align: center;
		}
	}
</style>
