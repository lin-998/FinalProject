<template>
	<view class="home overBg" id="containerId">
		<!-- 这里是状态栏 -->
		<view class="status_bar1"></view>
		<view class="status_bar"></view>
		<!-- 大轮播图 -->
		<view class="home-swiper">
			<swiper autoplay circular height="400">
				<swiper-item v-for="(item,index) in swiperImg" :key="index">
					<view class="swiper-list">
						<image :src="item.imgUrl" mode="widthFix"></image>
					</view>
				</swiper-item>
				<swiper-item v-if="swiperImg.length==0">
					<view class="swiper-list">
						<image src="/static/home/banner.png" mode="widthFix"></image>
					</view>
				</swiper-item>
			</swiper>
		</view>		
		<!-- 社区 -->
		<view class="society-btn">
			<u-button :ripple="true" ripple-bg-color="#909399" type="primary">之约</u-button>
			<u-button :ripple="true" ripple-bg-color="#909399" type="primary">之约</u-button>
			<u-button :ripple="true" ripple-bg-color="#909399" type="primary">之约</u-button>
			<u-button :ripple="true" ripple-bg-color="#909399" type="primary">之约</u-button>
		</view>
		<view><defalut-img></defalut-img></view>
		<u-back-top :scroll-top="isGotoTop" top="1500"></u-back-top>
	</view>
</template>

<script>
		import {mainApi} from '@/api/appApi.js'
	export default {
		data() {
			return {
				isGotoTop:0,
				swiperImg:[],//轮播图
			}
		},
		onShow() {
			this.getSlideshow()
		},
		methods: {
			getSlideshow(){
				mainApi.getSlideshow().then(res=>{
					this.swiperImg=res.data.imgList
				})
			},
		}
	}
</script>

<style lang="scss" scoped >
// 轮播图
	.home-swiper {
		padding: 20rpx 20rpx;
		border-radius: 16rpx;
		overflow: hidden;
		height: 400rpx;
		uni-swiper {
			height: 100%;
		}

		.swiper-list {
			image {
				height: 257rpx !important;
				width: 100%;
				border-radius: 16rpx;
			}
		}
	}
	.society-btn{
		display: flex;
		
	}
</style>
