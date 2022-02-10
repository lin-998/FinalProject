<template>
	<view class="contain">
		<view class="moment-wrap">
			<block v-for="(item ,index) in list" :key="index" class="moment-item">
				<h-moment :item="item"></h-moment>
			</block>
		</view>
		
	</view>
</template>

<script>
	import {mainApi} from '@/api/appApi.js'
	
	export default {
		data() {
			return {
				list:[],
			}
		},
		onShow() {
			this.getUserPostLike()
		},
		methods: {
			getUserPostLike(){
				mainApi.getUserPostLike({user_id:JSON.parse(uni.getStorageSync('user')).id})
				.then(res=>{
					this.list=res.data
				})
			}
		}
	}
</script>

<style scoped lang="scss">
.contain{
	padding: 0 10rpx 0 10rpx;
	
	.moment-wrap{
		display: flex;
		flex-wrap: wrap;
	}
	.moment-item{
		
	}
}
</style>
