<template>
	<view class="about-us">
		<text v-html="aboutUs"></text>
	</view>
</template>

<script>
	import {loginApi} from '@/api/myAjax.js'
	export default {
		data() {
			return {
				aboutUs:''
			};
		},
		created() {
			// let systemSetup= uni.getStorageSync('systemSetup')
			// if(systemSetup){
			// 	this.aboutUs=JSON.parse(systemSetup).aboutUs.replace(/<img/g, "<img style='width:100%;height:auto;'")
			// }else{
				loginApi.getCommonSetUp().then(res=>{
					if(res.code==200){
						// uni.setStorageSync('systemSetup',JSON.stringify(res.data))
						this.aboutUs=res.data.aboutUs.replace(/<img/g, "<img style='width:100%;height:auto;'")
					}
				})
			// }
			
		}
	}
</script>

<style lang="scss" scoped>
.about-us{
	padding: 70rpx 50rpx 0;
	image{
		margin-top: 40rpx;
		width: 100%;
	}
}
</style>
