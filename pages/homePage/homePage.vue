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
		<!-- //瀑布流 -->
		 <view id="box">
		        <view class="item item-1">1</view>
		        <view class="item item-2">2</view>
		        <view class="item item-3">3</view>
		        <view class="item item-4">4</view>
		        <view class="item item-5">5</view>
		        <view class="item item-6">6</view>
		        <view class="item item-7">7</view>
		        <view class="item item-8">8</view>
		        <view class="item item-9">9</view>
		        <view class="item item-10">10</view>
		        <view class="item item-11">11</view>
		        <view class="item item-12">12</view>
		        <view class="item item-13">13</view>
		        <view class="item item-14">14</view>
		        <view class="item item-15">15</view>
		        <view class="item item-16">16</view>
		        <view class="item item-17">17</view>
		        <view class="item item-18">18</view>
		        <view class="item item-19">19</view>
		        <view class="item item-20">20</view>
		        <view class="item item-21">21</view>
		        <view class="item item-22">22</view>        
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
			}
		},
		onShow() {
			this.getSlideshow()
			this.waterFall()
		},
		methods: {
			getSlideshow(){
				mainApi.getSlideshow().then(res=>{
					this.swiperImg=res.data.imgList
				})
			},
			//瀑布流
			waterFall(){
	// 			uni.createSelectorQuery().selectViewport().scrollOffset(res => {
	// 			  console.log("竖直滚动位置" + res.scrollTop);
	// 			}).exec();
 
 // let view = uni.createSelectorQuery().in(this).select(".item-1");
 // view.fields({
 //   size: true,
 //   scrollOffset: true
 // }, data => {
 //   console.log("得到节点信息" + JSON.stringify(data));
 //   console.log("节点的宽为" + data.width);
 // }).exec();

	 
			},
		}
	}
</script>

<style lang="scss" scoped >
	 .item {
	            float: left;
	            display: flex;
	            justify-content: center;
	            align-items: center;
	            font-size: 30px;
	            font-weight: 700;
	            color: aliceblue;
	            margin-right: 15px;
	            margin-bottom: 15px;
	            width: 300rpx;
	            position: absolute;
	        }
	        .item-1 {
	            background-color: rgb(206, 169, 169);
	            height: 300px;
	        }.item-2 {
	            background-color: rgb(131, 226, 174);
	            height: 150px;
	        }.item-3 {
	            background-color: rgb(77, 30, 30);
	            height: 350px;
	        }.item-4 {
	            background-color: rgb(49, 62, 134);
	            height: 300px;
	        }.item-5 {
	            background-color: rgb(230, 99, 99);
	            height: 200px;
	        }.item-6 {
	            background-color: rgb(206, 169, 169);
	            height: 300px;
	        }.item-7 {
	            background-color: rgb(124, 126, 145);
	            height: 400px;
	        }.item-8 {
	            background-color: rgb(169, 199, 38);
	            height: 230px;
	        }.item-9 {
	            background-color: rgb(114, 128, 53);
	            height: 300px;
	        }.item-10 {
	            background-color: rgb(48, 54, 18);
	            height: 260px;
	        }.item-11 {
	            background-color: rgb(118, 122, 96);
	            height: 230px;
	        }.item-12 {
	            background-color: rgb(118, 122, 96);
	            height: 240px;
	        }.item-13 {
	            background-color: rgb(118, 122, 96);
	            height: 250px;
	        }.item-14 {
	            background-color: rgb(118, 122, 96);
	            height: 270px;
	        }.item-15 {
	            background-color: rgb(118, 122, 96);
	            height: 330px;
	        }.item-16 {
	            background-color: rgb(118, 122, 96);
	            height: 200px;
	        }.item-17 {
	            background-color: rgb(118, 122, 96);
	            height: 100px;
	        }.item-18 {
	            background-color: rgb(118, 122, 96);
	            height: 400px;
	        }.item-19 {
	            background-color: rgb(118, 122, 96);
	            height: 340px;
	        }.item-20 {
	            background-color: rgb(118, 122, 96);
	            height: 350px;
	        }.item-21 {
	            background-color: rgb(118, 122, 96);
	            height: 360px;
	        }.item-22 {
	            background-color: rgb(118, 122, 96);
	            height: 370px;
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
