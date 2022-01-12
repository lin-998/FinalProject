<template>
	<view class="course">
		<view class="course-in LittleBg">
			<view v-if="!form.tutorialsTitle" style="text-align: center;">
				暂无教程
			</view>
			<view class="title">{{form.tutorialsTitle}}</view>
			<view class="time">{{form.modifyDate}}</view>
			<rich-text :nodes="form.tutorialsText"></rich-text>
			</view>
		</view>
	</view>
</template>

<script>
	import {homeApi} from '@/api/myAjax.js'
	export default {
		data() {
			return {
				form:{}
			};
		},
		methods:{
			getTutorials(apitype){
				homeApi.getTutorials({id:this.$store.state.userInfo.id,exchange:2}).then(res=>{
					if(res.data){
						this.form=res.data
						this.form.tutorialsText=res.data.tutorialsText.replace(/<img/g, "<img style='width:100%;height:auto;'")
					}
				})
			},
		},
		onLoad(options) {
			console.log(options.apiType);
			if(!options.apiType)return
			this.getTutorials(options.apiType)
		}
	}
</script>

<style lang="scss" scoped>
.course{
	padding: 30rpx 20rpx;
	.course-in{
		padding: 20rpx;
	}
	.title{
		font-family: Source Han Sans SC;
		font-weight: 400;
		// text-align: center;
		font-size: 32rpx;
	}
	.time{
		font-family: Source Han Sans SC;
		font-weight: 400;
		// text-align: center;
		color: #B0BEC8;
		margin: 12rpx 0 30rpx;
		font-size: 24rpx;
		letter-spacing: 2rpx;
	}
}
</style>
