<template>
	<view class="contain">
		<image :src="postUrlOne" mode="" class="main-img" @click="goDetail(item)"  ></image>
		<text >{{item.post_content}}</text>
		<view class="info" >
			<view class="user-info left">
				<image :src="item.avator" mode=""></image>
				<text>{{item.nickname}}</text>
				</view>
				<view class="click-like right" @click="clickLike(item)" >
					<u-icon v-if="heartFill||likeStatus" name="heart-fill"  color="red"  size="28"></u-icon>
					<u-icon v-else  name="heart"  size="28"></u-icon>
					<text>{{item.like_counts}}</text>
				</view>
		</view>
		
		
	</view>
</template>

<script>
	import {mainApi} from '@/api/appApi.js'
	export default{
			name:'hMoment',
			props:['item','likeStatus'],
			data(){
				return{
					heartFill:false
				}
			},
			onShow() {
				
			},
			computed:{
				postUrlOne(){
					return this.item.post_url.split(",")[0]
				}
			},
			methods:{
				clickLike(item){
					console.log(this.heartFill)
					let data={
						post_id:item.post_id,
						user_id:JSON.parse(uni.getStorageSync('user')).id
					}
					if(!this.heartFill){
						
						mainApi.postLike(data)
						.then(res=>{
							if(res.code==200){
								this.heartFill=true	
								this.$emit('updataLike')
							}
						})
					}else{
						mainApi.postUnlike(data)
						.then(res=>{
							if(res.code==200){
								this.heartFill=false
								this.$emit('updataLike')
							}
						})
					}
					
				},
				goDetail(itemData){
					// console.log(itemData)
					uni.navigateTo({
						url:'/pages/community/moment-detail?'+'momentInfo='+JSON.stringify(itemData)+'&heartFill='+this.heartFill
					})
				}
			},
		
	}
</script>

<style scoped lang="scss">
	.contain{
		width: 360rpx;
		>text{
			padding: 10rpx 20rpx 10rpx 20rpx;
			font-size: 30rpx;
		}
		.main-img{
			border-radius: 8rpx;
			  display: block;
			    width: 100%;
			    object-fit: cover;
		}
		.info{
			padding: 10rpx 20rpx 10rpx 20rpx;
			display: flex;
			align-items: center;
			justify-content: space-between;
			.user-info{
				display: flex;
				align-items: center;
				image{
					width: 50rpx;
					height: 50rpx;
					border-radius: 25rpx;
					margin-right: 10rpx;
				}
				text{
					font-size: 22rpx;
				}
			}
			.click-like{
				display: flex;
				
				>text{
					margin-left: 10rpx;
				}
			}
		}
		
	}
</style>
