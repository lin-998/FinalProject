<template>
	<view class="banxin" style="padding-top: 30rpx;">
		<view class="affiche" v-if="afficheList.length">
			<navigator :url="'/pages/home/affiche/affiche-detail?id='+item.id" class="affiche-list LittleBg" v-for="(item,index) in afficheList" :key="index">
				<view class="affiche-info">
					<text>{{item.title}}</text>
					<text>{{item.modifyDate}}</text>
				</view>
				<u-icon name="arrow-right" color="#cfcfd4" size="30"></u-icon>
			</navigator>
		</view>
		<view class="affiche-nodata LittleBg" v-else>暂无公告</view>
	</view>
</template>

<script>
	import {homeApi} from '@/api/myAjax.js'
	export default {
		data() {
			return {
				afficheList:[],
				pageNum:1,
				pageSize:10
			};
		},
		methods:{
			//获取公告
			getNotice(){
				homeApi.getNotice({
					pageNum: this.pageNum,
					pageSize: this.pageSize,
				}).then(res=>{
					if(res.data){
						this.afficheList=[...this.afficheList,...res.data.rows]
					}else{
						this.$toast(res.msg)
					}
				}).catch(()=>{
					this.$toast('网络异常，请稍后再试')
				})
			}
		},
		onLoad() {
			this.getNotice()
		},
		onReachBottom(){
			if(this.pageNum*this.pageSize>this.total)return this.$toast('数据已经加载完了')
			this.pageNum+=1
			this.getNotice()
		},
		onPullDownRefresh() {
			this.pageNum=1
			homeApi.getNotice({pageNum:this.pageNum,pageSize:this.pageSize}).then(res=>{
				uni.stopPullDownRefresh()
				if(res.data){
					this.$toast('下拉刷新成功')
					this.afficheList=res.data.rows||[]
				}else{
					this.$toast('下拉刷新失败')
				}
			}).catch(()=>{
				uni.stopPullDownRefresh()
				this.$toast('网络异常，请稍后再试')
			})
			
		}
	}
</script>

<style lang="scss" scoped>
.affiche{
	// padding-top: 20rpx;
	.affiche-list{
		display: flex;
		align-items: center;
		justify-content: space-between;
		padding: 28rpx 35rpx;
		margin-bottom: 20rpx;
		.affiche-info{
			display: flex;
			flex-direction: column;
			>text{
				font-size: 28rpx;
				&:last-child{
					color: #6A7696;
					margin-top: 20rpx;
					font-size: 24rpx;
				}
			}
		}
	}
}
.affiche-nodata{
	padding: 20rpx;
	text-align: center;
}
</style>
