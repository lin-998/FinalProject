<template>
	<view class="setting">
		<view class="setting-in LittleBg">
			<view class="setting-list" @click="chooseAvatar">
				<view class="setting-info">
					<!-- <text class="iconfont" style="font-size: 40rpx;">&#xe607;</text> -->
					<text>头像</text>
				</view>
				<view class="portrait">
					<view class="image">
						<image :src="$store.state.userInfo.avatarUrl" mode="widthFix"></image>
					</view>
					<u-icon name="arrow-right" color="#cfcfd4" size="30"></u-icon>
				</view>
			</view>
			<navigator class="setting-list" url="/pages/mine/setting/nickname">
				<view class="setting-info">
					<!-- <text class="iconfont" style="font-size: 40rpx;">&#xe7d8;</text> -->
					<text>昵称</text>
				</view>
				<view class="portrait">
						<text style="margin-right: 10rpx;">{{$store.state.userInfo.username}}</text>
					<u-icon name="arrow-right" color="#cfcfd4" size="30"></u-icon>
				</view>
			</navigator>
		</view>
	</view>
</template>

<script>
	import {imgUrl} from '@/api/app.js'
	import {mineApi,UploadApi} from '@/api/myAjax.js'
	export default {
		data() {
			return {
				sss:false
			};
		},
		methods: {
			chooseAvatar() {
				this.sss=true
				// 此为uView的跳转方法，详见"文档-JS"部分，也可以用uni的uni.navigateTo
				this.$u.route({
					// 关于此路径，请见下方"注意事项"
					url: '/uview-ui/components/u-avatar-cropper/u-avatar-cropper',
					// 内部已设置以下默认参数值，可不传这些参数
					params: {
						// 输出图片宽度，高等于宽，单位px
						destWidth: 300,
						// 裁剪框宽度，高等于宽，单位px
						rectWidth: 200,
						// 输出的图片类型，如果'png'类型发现裁剪的图片太大，改成"jpg"即可
						fileType: 'jpg',
					}
				})
			},
		},
		created() {
			// 监听从裁剪页发布的事件，获得裁剪结果
			uni.$on('uAvatarCropper', path => {
				this.avatarUrl = path;
				// 可以在此上传到服务端
				if(this.sss){
					this.sss=false
				uni.uploadFile({
					url: UploadApi,
					filePath: path,
					name: 'file',
					header:{"X-Requested-Token": uni.getStorageSync('userToken')},
					success: (res) => {
						this.sss=false
						mineApi.editUserInfo({
							id:this.$store.state.userInfo.id,
							avatarUrl:JSON.parse(res.data).data,
							username:this.$store.state.userInfo.username
							}).then(res=>{
							if(res.code==200){
								this.$toast('修改成功')
								this.$store.dispatch('getUserInfo')
							}else{
								this.$toast(res.msg)
							}
						})
					}
				});
				}
			})
		}
	}
</script>

<style lang="scss" scoped>
	.setting {
		padding: 40rpx;
	}

	.setting-in {
		padding: 0 30rpx 30rpx;
		// height: 980rpx;

		.setting-list {
			display: flex;
			align-items: center;
			justify-content: space-between;
			padding: 40rpx 0;
			// border-bottom: 1rpx solid rgba(10, 46, 111, 0.5);

			// margin-bottom: 40rpx;
			.setting-info {
				display: flex;
				align-items: center;

				>text {
					font-size: 28rpx;
					margin-left: 30rpx;
				}
			}

			.portrait {
				display: flex;

				.image {
					height: 80rpx;
					width: 80rpx;
					background: #333;
					border-radius: 50%;
					margin-right: 10rpx;
					overflow: hidden;

					image {
						width: 100%;
						height: 100%;
					}
				}
			}
		}
	}

	.logout {
		width: 562rpx;
		height: 90rpx;
		background: $uni-color-theme;
		border-radius: 66rpx;
		margin-top: 80rpx;

		&::after {
			border: none;
		}
	}
</style>
