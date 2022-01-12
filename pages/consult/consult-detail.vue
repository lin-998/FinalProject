<template>
	<view class="consult-detail">
		<view class="">
			<view class="title">{{consultDetail.title}}</view>
			<view class="time">{{consultDetail.modifyDate}}</view>
			<rich-text :nodes="consultDetail.information"></rich-text>
		</view>
	</view>
</template>

<script>
	import {consultApi} from '@/api/myAjax.js'
	export default {
		data() {
			return {
				consultDetail:{
					title:'行业咨讯',
					modifyDate:'2020-12-18  18:45:45',
					information:'【摘要】2018年，庞大数量的项目将致力于增加训练数据、改进最新研究算法和提供大量计算资源。'
				}
			}
		},
		methods: {
			getmationInfo(id){
				consultApi.getmationInfo({id}).then(res=>{

					this.consultDetail=res.data
					this.consultDetail.information=res.data.information.replace(/<img/g, "<img style='width:100%;height:auto;'")
					
				})
			}
		},
		onLoad(options) {
			// console.log(options);
			// options.id='1363732686227939330'
			if(!options.id){return}
			this.getmationInfo(options.id)
		}
	}
</script>

<style lang="scss" scoped>
.consult-detail{
	padding: 40rpx 54rpx 0;
	font-family: PingFang SC;
	font-weight: 400;
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
	.img{
		width: 554rpx;
		text-align: center;
		margin: 40rpx 0 20rpx;
	}
	.imgtext{
		color: #6A7696;
		text-align: center;
		margin-bottom: 40rpx;
	}
}
</style>
