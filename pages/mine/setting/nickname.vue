<template>
	<view class="nickname">
		<view class="LittleBg nickname-in">
			<view class="title1">昵称</view>
			<u-input class="input" v-model="nickName" placeholder="请输入昵称" />
		</view>
		<u-button class="logout submitBtn" type="primary" @click="editUserInfo">保存</u-button>
	</view>
</template>

<script>
	import {mineApi} from '@/api/myAjax.js'
	export default {
		data() {
			return {
				nickName:''
			};
		},
		methods:{
			editUserInfo(){
				if(this.nickName.length<6||this.nickName.length>12){
					return this.$toast('昵称长度保持在6-12位数之间')
				}
				mineApi.editUserInfo({id:this.$store.state.userInfo.id,username:this.nickName}).then(res=>{
					if(res.code==200){
						this.$toast('保存成功')
						this.$store.dispatch('getUserInfo')
						setTimeout(()=>{
							uni.navigateBack({
								delta:1
							})
						},1000)
					}else{
						this.$toast(res.msg)
					}
				})
			}
		}
	}
</script>

<style lang="scss" scoped>
.nickname{
	padding: 40rpx;
	.nickname-in{
		padding: 60rpx 30rpx;
		height: 844rpx;
		.title1 {
			font-weight: 600;
			font-size: 28rpx;
			margin-bottom: 30rpx;
		}
		.input{
			padding-bottom: 20rpx !important;
			border-bottom: 1rpx solid rgba(176, 190, 200, .5) !important;
		}
	}
	.logout{
		margin-top: 80rpx;
	}
}
</style>
