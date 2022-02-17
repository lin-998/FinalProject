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

		</view>
		<view><defalut-img></defalut-img></view>
<view class="mylike_post">
	<u-waterfall v-model="flowList" ref="uWaterfall">
				<template v-slot:left="{leftList}">
					<view class="demo-warter" v-for="(item, index) in leftList" :key="index">
						<h-moment :item="item"  @updataLike="updata" :heartFill="true" />
					</view>
				</template>
				<template v-slot:right="{rightList}">
					<view class="demo-warter" v-for="(item, index) in rightList" :key="index">
							<h-moment :item="item"  @updataLike="updata":heartFill="true"/>
					</view>
				</template>
			</u-waterfall>
</view>
	
		

		
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
				flowList:[],
				list:[],
			}
		},
		onShow() {
			this.getSlideshow()
			this.getUserPostLike()
		},
		methods: {
			getSlideshow(){
				mainApi.getSlideshow().then(res=>{
					this.swiperImg=res.data.imgList
				})
			},
			getUserPostLike(){
				mainApi.getUserPostLike({user_id:JSON.parse(uni.getStorageSync('user')).id})
				.then(res=>{
					this.list=res.data
					this.addRandomData()
				})
			},
		addRandomData() {
						for(let i = 0; i < 10; i++) {
							let index = this.$u.random(0, this.list.length - 1);
							// 先转成字符串再转成对象，避免数组对象引用导致数据混乱
							let item = JSON.parse(JSON.stringify(this.list[index]))
							item.id = this.$u.guid();
							this.flowList.push(item);
						}
					},
		},
	
		
	}
</script>

<style lang="scss" scoped >
.mylike_post{
	padding: 20rpx 20rpx;
}
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
