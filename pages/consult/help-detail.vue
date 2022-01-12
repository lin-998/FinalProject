<template>
	<view class="consult-detail">
		<view class="" v-if="consultDetail.title">
			<view class="title">{{consultDetail.title}}</view>
			<rich-text :nodes="consultDetail.content"></rich-text>
		</view>
	</view>
</template>

<script>
	import {consultApi} from '@/api/myAjax.js'
	export default {
		data() {
			return {
				consultDetail:{
					title:'',
					content:'',
				}
			}
		},
		methods: {
			getmationInfo(id){
				console.log(165153);
				consultApi.heplpDetail({id}).then(res=>{
					this.consultDetail=res.data
					this.consultDetail.content=res.data.content.replace(/<img/g, "<img style='width:100%;height:auto;'")
					
				})
			}
		},
		onLoad(options) {
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
		font-size: 28rpx;
		font-weight: 600;
		padding-bottom: 27rpx;
		margin-bottom: 26rpx;
		border-bottom: 1px solid #279FFF;
	}
	.subtitle{
		font-size: 28rpx;
		line-height: 48rpx;
		font-weight: 300;
	}
}
</style>
