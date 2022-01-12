<template>
	<view>
		<u-tabs :list="list" inactive-color='#B0BEC8' active-color='#333333' bar-width='200' :is-scroll="false" :current="current" @change="change"></u-tabs>
		<view class="ranking-list">
			<view class="top-three" v-if="rankingList[1]">
				<image lazy-load :src="rankingList[1].avatarUrl"></image>
				<text><!-- {{rankingList[1].userName}} --></text>
				<!-- <text>{{current==0?'今日':'本月'}}：{{rankingList[1].todayProfit | numFilter(4)}}</text>
				<text>总：{{rankingList[1].allProfit | numFilter(4)}}</text> -->
			</view>
			<view class="top-three ranking-first" v-if="rankingList[0]"
				:style="rankingList[1]?'':'margin: -75rpx auto 0;'">
				<image lazy-load :src="rankingList[0].avatarUrl"></image>
				<text><!-- {{rankingList[0].userName}} --></text>
				<!-- <text>{{current==0?'今日':'本月'}}：{{rankingList[0].todayProfit | numFilter(4)}}</text>
				<text>总：{{rankingList[0].allProfit | numFilter(4)}}</text> -->
			</view>
			<view class="top-three ranking-third" v-if="rankingList[2]">
				<image lazy-load :src="rankingList[2].avatarUrl"></image>
				<text><!-- {{rankingList[2].userName}} --></text>
				<!-- <text>{{current==0?'今日':'本月'}}：{{rankingList[2].todayProfit | numFilter(4)}}</text>
				<text>总：{{rankingList[2].allProfit | numFilter(4)}}</text> -->
			</view>
		</view>
		<view class="ranking-ten">
			<!-- <view class="ranking-ten-list" v-for="(item,index) in rankingList.slice(3,rankingList.length)" :key='index'>
				<text>{{index+4}}</text>
				<image lazy-load :src="item.avatarUrl" mode="widthFix"></image>
				<text>{{item.userName}}</text>
				<text></text>
				<text></text>
				<text>{{current==0?'今':'本'}}：{{item.todayProfit | numFilter(4)}}</text>
				<text>总：{{item.allProfit | numFilter(4)}}</text>
			</view> -->
		</view>
		<view v-if="rankingList.length==0">
			<defalut-img></defalut-img>
		</view>
	</view>
</template>

<script>
	import {consultApi} from '@/api/myAjax.js'
	import { imgUrl } from "@/api/app.js";
	export default {
		name:'consult-list',
		props:{
			active:{
				type:Number,
				default:0,
			},
			isRefresh:{
				type:Boolean,
				default:false
			}
		},
		data(){
			return {
				list:[
					{name: '今日收益排行榜'},
					{name: '本月收益排行榜'},
				],
				current:0,
				rankingList:[],
			}
		},
		created() {
			this.getProfitTop()
		},
		methods:{
			change(index){
				this.current=index
				this.getProfitTop()
			},
			// 获取排行榜
			getProfitTop(){
				if(!uni.getStorageSync('user')){return}
				if(this.current==0){
					this.getTodayProfitTop()
				}else{
					this.getMonthProfitTop()
				}
			},
			//获取今日排行榜
			getTodayProfitTop(){
				consultApi.getTodayProfitTop({pageSize:10,pageNum:1}).then(res=>{
					if(res.code==200){
						if(this.isRefresh){
							uni.stopPullDownRefresh()
							this.$toast('下拉刷新成功')
							this.$emit('Refresh')
						}
						res.data.rows.map(val=>{
							val.avatarUrl=imgUrl+val.avatarUrl
						})
						this.rankingList=res.data.rows||[]
					}else{
						if(this.isRefresh){
							uni.stopPullDownRefresh()
							this.$toast('下拉刷新失败')
							this.$emit('Refresh')
						}else{
							this.$toast(res.msg)
						}
						
					}
				})
			},
			//获取本月排行榜
			getMonthProfitTop(){
				consultApi.getMonthProfitTop({pageSize:10,pageNum:1}).then(res=>{
					if(res.code==200){
						if(this.isRefresh){
							uni.stopPullDownRefresh()
							this.$toast('下拉刷新成功')
							this.$emit('Refresh')
						}
						res.data.rows.map(val=>{
							val.avatarUrl=imgUrl+val.avatarUrl
						})
						this.rankingList=res.data.rows||[]
					}else{
						if(this.isRefresh){
							uni.stopPullDownRefresh()
							this.$toast('下拉刷新失败')
							this.$emit('Refresh')
						}else{
							this.$toast(res.msg)
						}
					}
				})
			},
		}
	}
</script>

<style lang="scss" scoped>
	.ranking-list {
		margin-top: 150rpx;
		display: flex;
		.top-three {
			padding: 0 10rpx;
			width: 206rpx;
			height: 237rpx;
			display: flex;
			flex-direction: column;
			align-items: center;
			background: url(/static/home/dem.png) no-repeat;
			background-size: 100%;

			>text {
				text-align: center;
				color: #fff;
				margin-top: 10rpx;
				font-weight: 600;
				font-size: 24rpx;

				&:nth-child(2) {
					font-size: 28rpx;
				}
			}

			image {
				margin-top: -50rpx;
				width: 90rpx;
				height: 90rpx;
				border: 6rpx solid #fff;
				border-radius: 50%;
			}
		}

		.ranking-first {
			width: 243rpx;
			height: 280rpx;
			margin: 0 28rpx;
			margin-top: -75rpx;
			background: url(/static/home/gj.png) no-repeat;
			background-size: 100%;

			image {
				width: 106rpx;
				height: 106rpx;
			}
		}

		.ranking-third {
			background: url(/static/home/dsm.png) no-repeat;
			background-size: 100%;
		}
	}
	.ranking-ten{
		padding: 0 20rpx;
		margin-top: 50rpx;
		.ranking-ten-list{
			display: flex;
			justify-content: space-between;
			align-items: center;
			padding: 20rpx 0;
			>text{
				text-align: center;
				padding: 0 10rpx;
				width: 200rpx;
				word-break: break-all;
				color: #B0BEC8;
				// padding: 0 10rpx;
				&:nth-child(1){
					color: #333;
					font-size: 32rpx;
					padding: 0;
					font-weight: 600;
					width: 50rpx;
				}
				&:nth-child(3){
					font-size: 24rpx;
					color: #333;
				}
			}
			image{
				width: 66rpx;
				height: 66rpx;
				border-radius: 50%;
				// margin: 0 20rpx;
			}
		}
	}
</style>
