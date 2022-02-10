<template>
	<view class="contain">
		<view class="nav">
			<image :src="momentInfo.avator" mode=""></image>
			<text>{{momentInfo.nickname||"酷酷酷酷酷"}}</text>
		</view>
		<image src="../../static/1.jpg" mode="widthFix"></image>
		<view class="a-padding">
			<view class="content">

				<view class="down-text">
					<text class="title">theme</text>
					<text>{{momentInfo.content||"靠靠靠靠靠靠靠靠靠靠靠靠靠靠靠靠靠靠靠靠靠靠靠靠靠靠靠靠靠靠靠靠靠靠靠靠靠靠靠靠靠靠靠靠靠靠靠靠靠靠靠靠靠靠靠靠靠靠靠靠靠靠靠靠靠靠靠靠靠靠靠靠靠靠靠靠靠靠靠靠靠靠靠靠靠靠靠靠靠靠靠靠靠靠靠"}}</text>
					<view class="down-other">
						<text>2021</text>
						<view class="unlike">
							<u-icon name="thumb-down"></u-icon>
							<text>不喜欢</text>
						</view>
					</view>
				</view>
			</view>
			<view class="comment-wrap">
				<view class="total">
					共{{2}}条评论
				</view>
				<view class="user-comment">
					<image src="../../static/1.jpg" mode=""></image>
					<u-input placeholder="评论一下" type="text"></u-input>
				</view>
				<view class="item-comment">
					<view class="left">
						<image src="../../static/1.jpg" mode=""></image>
						<view class="comment-detail">
							<text>name</text>
							<view class="">
								<text>回复</text>
								<text>01-18</text>
							</view>
						</view>
					</view>
					<u-icon name="heart" size="40"></u-icon>
				</view>
				<view class="the-end">
					<text>-THE END-</text>
				</view>
			</view>
		</view>
		<view class="handle">
			<u-search height="84" search-icon="edit-pen" action-text=""></u-search>
			<view class="icon-like">
				<u-icon v-if="heartFill" name="heart-fill" color="red" size="60"></u-icon>
				<u-icon v-else name="heart" size="60"></u-icon>
				<text>{{6}}</text>
			</view>
			<view class="icon-star">
				<u-icon name="star" size="60"></u-icon><text>{{4}}</text>
			</view>
			<view class="icon-reply">
				<u-icon name="chat" size="60"></u-icon><text>{{4}}</text>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				heartFill:false,
				momentInfo: {},
			}
		},

		onLoad(options) {
			this.heartFill=options.heartFill
			console.log(this.heartFill)
			this.momentInfo = JSON.parse(options.momentInfo)
			console.log(this.momentInfo)
		},
		methods: {

		}
	}
</script>

<style lang="scss" scoped>
	.contain {
		.a-padding {
			padding: 0 28rpx 0 28rpx;
		}

		.nav {
			display: flex;
			align-items: center;

			image {

				width: 50rpx;
				height: 50rpx;
				border-radius: 50rpx;
			}

			>text {
				font-size: 36rpx;
			}
		}

		image {

			width: 100%;
			height: 500rpx;
		}

		.content {

			.down-text {
				padding: 10rpx 0rpx 10rpx 0rpx;
				display: flex;
				flex-direction: column;

				.title {
					font-size: 36rpx;
					margin-bottom: 20rpx;
				}
			}

			.down-other {
				margin-top: 18rpx;
				padding: 10rpx 0rpx 40rpx 0rpx;
				display: flex;
				justify-content: space-between;
				border-bottom: 1rpx #000000 solid;
				align-items: center;

				.unlike {
					width: 160rpx;
					height: 60rpx;
					border: 1rpx #000000 solid;
					border-radius: 20rpx;
					display: flex;
					align-items: center;
					justify-content: space-around;
				}
			}
		}

		.comment-wrap {
			.user-comment {
				margin-top: 10rpx;
				display: flex;
				align-items: center;

				image {
					width: 50rpx;
					height: 50rpx;
					border-radius: 50rpx;
					margin-right: 20rpx;
				}
				/deep/.u-input__input{
					background: #f2f2f2;
					height: 60rpx;
					border-radius: 30rpx;
				}
				/deep/.uni-input-placeholder {
					font-size: 32rpx;
				}
			}

			.item-comment {
				display: flex;
				align-items: center;
				justify-content: space-between;

				.left {
					display: flex;
					align-items: center;
					justify-content: center;

					image {
						width: 50rpx;
						height: 50rpx;
						border-radius: 50rpx;
					}

					.comment-detail {
						margin-left: 30rpx;
					}
				}
			}
			.the-end{
				display: flex;
				align-items: center;
				justify-content: center;
				margin-bottom: 80rpx;
			height: 150rpx;
			}
		}
		.handle{
			display: flex;
			align-items: center;
			position: fixed;
			bottom: 0;
			background: #ffffff;
			border-top: 1rpx #CCCCCC solid ;
			height: 106rpx;
			width: 100%;
			padding: 0 20rpx 0 20rpx;
	
	.u-search{

	}
	/deep/ .uni-input-placeholder{
		font-size: 34rpx;
	}
	/deep/ .u-action-active{
		width:0;
	}
	.icon-like,.icon-reply,.icon-star{
		display: flex;
		align-items: center;
		justify-content: space-around;
		width: 100rpx;
		color: #484848;
		font-weight: 200;
	}
		}
	}
	
</style>
