<template>
	<view class="banxin consult-in" id="containerId">
		<view class="consult-header">
			<view @click='onSel(0)' :class="active==0?'active':''">榜单</view>
			<view @click='onSel(1)' :class="active==1?'active':''">快讯</view>
			<view @click='onSel(2)' :class="active==2?'active':''">帮助中心</view>
			<view @click='onSel(3)' :class="active==3?'active':''">模拟交易</view>
		</view>
		<view v-show="active==0">
			<consult-ranking ref='ranking' :isRefresh='pullRefresh' :active='active' @Refresh='pullRefresh=false'></consult-ranking>
		</view>
		<view v-show="active==1">
			<consult-consult ref="consult" :isRefresh='pullRefresh' :active='active' :pageNum='pageNum' @Refresh='pullRefresh=false' @onTotal='changeTotal'></consult-consult>
		</view>
		<view v-show="active==2">
			<view class="help-title" v-if="helpList.length!=0">热点问题</view>
			<view class="help-list">
				<navigator :url="'/pages/consult/help-detail?id='+item.id" v-for="item in helpList" :key='item.id'>
					<u-section :show-line='false' :title="item.title" :bold='false' color="#333" sub-title=""></u-section>
				</navigator>
			</view>
			<view v-if="helpList.length==0">
				<defalut-img></defalut-img>
			</view>
		</view>
		<view class="strategy" v-show="active==3">
			<view class="list-item" v-for="(item,index) in strategyList" :key="index" @click="goCoin(item.strategy)">
				<image :src="item.icon" mode=""></image>
				<view class="item-right">
					<view class="right-title">{{item.title}}</view>
					<view class="right-explain">{{item.explain}}</view>
				</view>
			</view>
			<!-- <view class="help-list">
				<navigator :url="'/pages/consult/simulate-setting?id='+item.coinId + '&type='+ item.currencyPair" v-for="item in mock_trading" :key='item.coinId'>
					<u-section :show-line='false' :title="item.currencyPair" :bold='false' color="#333" sub-title=""></u-section>
				</navigator>
			</view> -->
			<!-- <view v-if="helpList.length==0">
				<defalut-img></defalut-img>
			</view> -->
			<navigator url="/pages/consult/my-simulate" class="my-simulate">我的模拟</navigator>
		</view>
		<view v-if="show">
			<mine-login :show='show'></mine-login>
		</view>
	</view>
</template>

<script>
	import {consultApi,tradingApi} from '@/api/myAjax.js'
	import { imgUrl } from "@/api/app.js";
	export default {
		data() {
			return {
				show:false,
				active:0,
				enterNumber:0,
				pageNum:1,
				pullRefresh:false,
				helpList:[],
				mock_trading:[],
				total:0,
				strategyList:[{
					icon:require('static/trading/yycl.png'),
					title:'原有的策略',
					explain:'低频交易,稳健收益',
					strategy:0,
				},{
					icon:require('static/trading/ema.png'),
					title:'EMA指标',
					explain:'利用EMA指标自动建仓换仓',
					strategy:1,
				},{
					icon:require('static/trading/sarzb.png'),
					title:'SAR指标',
					explain:'利用SAR指标监控进行自动建仓与换仓',
					strategy:2,
				},{
					icon:require('static/trading/wg.png'),
					title:'网格策略',
					explain:'网格策略进行合约交易，收益稳健',
					strategy:3,
			},
			{
					icon:require('static/trading/wdzy.png'),
					title:'尾单止盈策略',
					explain:'尾部资金单独解套，提高资金利用效率',
					strategy:4,
				},
				]
			};
		},
		methods:{
			goCoin(strategy){
				uni.navigateTo({
					url:'/pages/consult/currency?strategyType='+strategy
				})
			},
			changeTotal(item){
				this.total=item
			},
			onSel(index){
				console.log(index);
				this.active=index
				this.pageNum=1
				if(index==2){
					//获取帮助中心数据
					this.getHelpCenter()
				}else if(index==3){
					this.getCoin()
				}
			},
			//查询可回测币对
			getCoin(){
				tradingApi.getCoin().then(res=>{
					if(res.code == 200){
						if(this.pullRefresh){
							this.pullRefresh=false
							uni.stopPullDownRefresh()
							this.$toast('下拉刷新成功')
						}
						this.mock_trading = res.data || []
					}
				})
			},
			
			
			//获取帮助中心数据
			getHelpCenter(){
				consultApi.heplpList({pageNum:this.pageNum,pageSize:10}).then(res=>{
					if(res.code==200){
						if(this.pullRefresh){
							this.pullRefresh=false
							uni.stopPullDownRefresh()
							this.$toast('下拉刷新成功')
						}
						this.helpList=res.data.rows||[]
					}else{
						if(this.pullRefresh){
							this.pullRefresh=false
							uni.stopPullDownRefresh()
							this.$toast('下拉刷新失败')
						}else{
							this.$toast(res.msg)
						}
					}
				})
			},
		},
		onReachBottom(){
			if(this.active==0){return}
			if(this.pageNum*10>this.total)return this.$toast('数据已经加载完了')
			this.pageNum+=1
			if(this.active==2){
				this.getHelpCenter()
			}
		},
		onPullDownRefresh() {
			this.pageNum=1
			this.pullRefresh=true
			if(this.active==0){
				//排行榜
				this.$refs.ranking.getProfitTop()
			}else if(this.active==1){
				//快讯
				this.$refs.consult.searchmation(this.pageNum)
			}else if(this.active==2){
				//帮助中心
				this.getHelpCenter()
			}else if(this.active==3){
				//模拟交易
				this.getCoin()
			}
		},
		onShow(){
			if(!uni.getStorageSync('user')){
				return this.show=true
			}
			
			if(uni.getStorageSync('index')==0){
				this.active=Number(uni.getStorageSync('index'))
				uni.setStorageSync('index',1)
			}
			// #ifdef  APP-PLUS
			this.enterNumber=this.enterNumber+1
			if(this.enterNumber<2){return}
			uni.getSystemInfo({
				success: (res) => {
					console.log(res.platform);
					if (res.platform == 'ios') {
						const query = uni.createSelectorQuery().in(this);
						var isRecovery = true;
						query.select('#containerId').boundingClientRect(data => {
							isRecovery = false;
						}).exec();
						
						var timer = setTimeout(() => {
							if (isRecovery) {
								uni.reLaunch({
									url:'/pages/consult/consult'
								})
								clearTimeout(timer);
								timer = null;
							}
						}, 500)
					}	
				},
			})
			// #endif
		},
		onHide() {
			this.show=false
		}
	}
</script>

<style lang="scss" scoped>
.consult-in{
	// padding-top: 30rpx;
	padding: 30rpx 20rpx 0;
	.consult-header{
		display: flex;
		justify-content: space-between;
		margin-bottom: 30rpx;
		background-color: #fff;
		>view{
			// width: 200rpx;
			text-align: center;
			height: 54rpx;
			line-height: 54rpx;
			color: #B0BEC8;
			border-radius: 27rpx;
			font-size: 32rpx;
			padding: 0 30rpx;
		}
		.active{
			background: #CBE8FF;
			color: #279FFF;
		}
	}
	.help-title{
		font-size: 28rpx;
		font-weight: 600;
		color: #333;
	}
	.help-list{
		padding: 22rpx;
		>navigator{
			display: flex;
			justify-content: space-between;
			align-items: center;
			padding: 20rpx 0;
			.iconfont{
				color: #B0BEC8;
			}
			/deep/.u-section__title{
				width: 580rpx !important;
				font-size: 26rpx !important;
			}
		}
	}
	.my-simulate{
		margin: 129rpx auto 0;
		width: 206rpx;
		height: 54rpx;
		border-radius: 27rpx;
		background-color: #CBE8FF;
		text-align: center;
		line-height: 54rpx;
		color: #279FFF;
		font-size: 32rpx;
	}
}
.strategy{
	margin: 56rpx 23rpx 0;
}
	.list-item{
		display: flex;
		align-items: center;
		margin-bottom: 52rpx;
		image{
			width: 62rpx;
			height: 62rpx;
			margin-right: 29rpx;
		}
		.item-right{
			flex: 1;
			.right-title{
				color: #333;
				font-weight: 600;
				font-size: 28rpx;
				margin-bottom: 8rpx;
			}
			.right-explain{
				color: #999;
				font-size: 24rpx;
			}
		}
	}
/deep/.u-tab-bar{
		background-color: #279FFF !important;
	}
</style>
