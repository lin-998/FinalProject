<template>
	<u-mask :show="show">
		<view class="warp">
			<view class="rect LittleBg">
				<view class="rect-title">{{title}}</view>
				<view class="rect-subtitle">{{content}}</view>
				<view class="rect-btn">
					<u-button class="cancelbtn" @click="$emit('cancel')">取消</u-button>
					<u-button class="affirmbtn" @click="$emit('affirm')">确认</u-button>
				</view>
			</view>
		</view>
	</u-mask>
</template>

<script>
	import {tradingApi} from '@/api/myAjax.js'
	export default {
		props: ['title', 'content', 'show'],
		data() {
			return {
				isOpen: true,
				saleShow: true,
				beginShow: false
			};
		},
		methods: {
			cancel() {
				this.$emit('cancel')
			},
			affirm() {
				this.$emit('affirm')
			}
		}
	}
</script>

<style lang="scss" scoped>
	.warp {
		display: flex;
		align-items: center;
		flex-direction: column;
		justify-content: center;
		height: 100%;

		.rect {
			width: 520rpx;
			padding: 30rpx 56rpx;

			.rect-title {
				font-size: 32rpx;
				text-align: center;
			}

			.rect-subtitle {
				line-height: 48rpx;
				font-size: 28rpx;
				text-align: center;
				margin: 30rpx 0 34rpx;
				color: #323436;
			}

			.rect-btn {
				display: flex;
				justify-content: space-around;

				.cancelbtn,
				.affirmbtn {
					width: 180rpx;
					height: 60rpx;
					font-size: 28rpx;
					border-radius: 44rpx;

					&::after {
						border: none;
					}
				}

				.cancelbtn {
					border: 1rpx solid #279FFF;
					color: #279FFF;
					border-radius: 16rpx;
				}

				.affirmbtn {
					background: $uni-color-theme;
					color: #fff;
					border-radius: 16rpx;
				}
			}
		}
	}

</style>
