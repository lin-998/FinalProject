<template>
	<view class="">
		<u-modal v-model="isShow" content="尚未登录，请先进行登录" show-cancel-button @confirm="confirm" @cancel="cancel"></u-modal>
	</view>
</template>

<script>
	export default {
		props:{
			show:{
				type:Boolean,
				default:false
			}
		},
		data(){
			return {
				isShow:this.show
			}
		},
		methods:{
			confirm(){
				uni.navigateTo({
					url:'/pages/login/login'
				})
			},
			cancel(){
				uni.switchTab({
					url:'/pages/home/home'
				})
			},
		}
	}
</script>

<style>
</style>
