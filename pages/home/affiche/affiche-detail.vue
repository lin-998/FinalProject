<template>
	<view class="affiche-detail banxin">
		<view class="affiche-info LittleBg">
			<view class="title">{{afficheDetail.title}}</view>
			<view class="time">{{afficheDetail.modifyDate}}</view>
			<rich-text :nodes="afficheDetail.announcement"></rich-text>
		</view>
	</view>
</template>

<script>
	import {homeApi} from '@/api/myAjax.js'
	export default {
		
		data() {
			return {
				afficheDetail:{
					title:'暂无公告详情',}
			}
		},
		methods: {
			getNoticeInfo(id){
				homeApi.getNoticeInfo({id}).then(res=>{
					this.afficheDetail=res.data
					this.afficheDetail.announcement=res.data.announcement.replace(/<img/g, "<img style='width:100%;height:auto;'")
				})
			}
		},
		onLoad(options) {
			console.log(options);
			if(!options.id){return}
			this.getNoticeInfo(options.id)
		}
	}
</script>

<style lang="scss" scoped>
.affiche-detail{
	padding-top: 30rpx;
	font-family: PingFang SC;
	font-weight: 400;
	.affiche-info{
		padding: 40rpx 30rpx;
		min-height: 1108rpx;
		border-radius: 16rpx;
	}
	.title{
		font-size: 32rpx;
		text-align: center;
	}
	.time{
		color: #6A7696;
		text-align: center;
		margin: 12rpx 0 30rpx;
	}
	.subtitle{
		font-size: 28rpx;
		line-height: 48rpx;
		font-weight: 300;
	}
}
</style>
