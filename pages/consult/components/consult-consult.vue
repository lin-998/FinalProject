<template>
	<view>
		<view class="consult LittleBg" v-for="(item) in consultList" :key="item.id" @click="consultClick(item)">
			<view class="consult-title">
				<text>{{item.title}}</text>
				<text>{{item.modifyDate}}</text>
			</view>
		<view class="consult-img">
			<image lazy-load :src="item.imgUrl" mode="scaleToFill"></image>
		</view>
		</view>
		<view v-if="consultList.length==0">
			<defalut-img></defalut-img>
		</view>
	</view>
</template>

<script>
	import {consultApi} from '@/api/myAjax.js'
	import { imgUrl } from "@/api/app.js";
	export default {
		name:'consult-consult',
		props:{
			active:{
				type:Number,
				default:0
			},
			pageNum:{
				type:Number,
				default:0
			},
			isRefresh:{
				type:Boolean,
				default:false
			}
		},
		watch:{
			pageNum(newVal,oldVal){
				if(this.active!=1)return;
				this.searchmation(newVal)
			},
			// active(newVal,oldVal){
			// 	this.consultList=[]
			// 	this.searchmation(newVal)
			// }
		},
		
		data(){
			return {
				consultList:[],
				total:0
			}
		},
		created() {
			this.searchmation(this.pageNum)
		},
		methods:{
			//跳转详情
			consultClick(item){
				uni.navigateTo({
					url:"/pages/consult/consult-detail?id="+item.id
				})
			},
			//获取快讯数据
			searchmation(pageNum){
				if(!uni.getStorageSync('user')){return}
				consultApi.searchmation({pageNum:pageNum,pageSize:10}).then(res=>{
					if(res.code==200){
						this.$emit('onTotal',res.data.total)
						res.data.rows.map(val=>{
							if(val.imgUrl){
								val.imgUrl=val.imgUrl?imgUrl+val.imgUrl:''
							}
						})
						if(this.isRefresh){
							this.$emit('Refresh')
							uni.stopPullDownRefresh()
							this.$toast('下拉刷新成功')
							this.consultList=res.data.rows||[]
						}else{
							this.consultList=[...this.consultList,...res.data.rows]
						}
						
					}else{
						if(this.isRefresh){
							this.$emit('Refresh')
							uni.stopPullDownRefresh()
							this.$toast('下拉刷新失败')
						}else{
							this.$toast(res.msg)
						}
					}
				}).catch(()=>{
					this.$toast('网络异常，请稍后再试')
				})
			}
		}
	}
</script>

<style lang="scss" scoped>
.consult{
	padding: 20rpx 30rpx;
	border-radius: 16rpx;
	display: flex;
	justify-content: space-between;
	margin-bottom: 30rpx;
	.consult-title{
		display: flex;
		flex-direction: column;
		justify-content: space-between;
		>text{
			font-size: 28rpx;
			&:last-child{
				font-size: 24rpx;
				color: #6A7696;
			}
		}
	}
	.consult-img{
		width: 300rpx;
		height: 176rpx;
		display: flex;
		align-items: center;
		margin-left: 20rpx;
		image{
			width: 300rpx;
			height: 176rpx;
			border-radius: 10rpx;
		}
	}
}
</style>
