<template>
	<view class="protocol">
		<view class="protocol-in">
			<view v-html="text"></view>
		</view>
	</view>
</template>

<script>
	import {loginApi} from '@/api/myAjax.js'
	export default {
		data() {
			return {
				text:''
			};
		},
		onLoad() {
			loginApi.getCommonProtocolText().then(res=>{
				console.log(res);
				if(res.data.protocolText){
					this.text=res.data.protocolText.replace(/<img/g, "<img style='width:100%;height:auto;'")
				}
			})
		}
	}
</script>

<style lang="scss" scoped>
.protocol{
	padding: 30rpx 20rpx;
	.protocol-in{
		min-height: 944rpx;
		padding:38rpx 30rpx;
	}
}
</style>
