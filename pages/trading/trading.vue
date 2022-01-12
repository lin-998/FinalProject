<template>
	<view >
	<!-- 	<view class="currencytype" v-if="current==1">
		<view @click="currencyCoinType(2)" :class="currencyCoin==2?'active':''" class="okex">Okex</view>
		<view @click="currencyCoinType(0)" :class="currencyCoin==0?'active':''" class="huobi">Huobi</view>
		</view> -->
		<u-search placeholder="搜索币种名称" color="#000" bg-color="#f3f4f7" :show-action="false" v-model="keyword"
			@search="onSearch" v-if="current==1"></u-search>
		<u-tabs :list="list" :is-scroll="false" active-color="#279FFF" inactive-color="#999" bar-width="240" :current="current" @change="change"></u-tabs>

		<view class="strategy-list" v-if="current==0">
			<view class="list-item" v-for="(item,index) in strategyList" :key="index" @click="goCoin(item.strategy)">
				<image :src="item.icon" mode=""></image>
				<view class="item-right">
					<view class="right-title">{{item.title}}</view>
					<view class="right-explain">{{item.explain}}</view>
				</view>
			</view>
		</view>
		<view class="trading-list" v-if="current==1">
			<!-- <view class="list-item" v-for="(item,index) in tradingList" :key="index">
				<view class="item-top">
					<view class="top-title">{{(item.userDealContractInfo&&item.userDealContractInfo.strategyType==1)? '原有的策略':'EMA指标'}}</view>
					<view class="top-type" v-if="(item.userDealContractInfo&&item.userDealContractInfo.strategyType==1)">{{item.userStrategyBase.strategyType == 0 ? '单次交易':'交易循环'}}</view>
				</view>
			</view> -->
				<strategy-item :item="item" v-for="(item,index) in tradingList" :key="index"></strategy-item>
			
			<!-- <view class="list-item">
				<view class="item-top">
					<view class="top-title">EMA指标</view>
					<view class="top-type">交易循环</view>
				</view>
				<strategy-item></strategy-item>
			</view> -->
		</view>
		<view v-if="loginShow">
			<mine-login :show='loginShow'></mine-login>
		</view>
	</view>
</template>

<script>
	import strategyItem from "@/pages/trading/components/strategy-item.vue"
	import {	tradingApi,	homeApi} from '@/api/myAjax.js'
	export default {
			components:{
				strategyItem
			},
		data() {
			return {
				list: [{
					name: '策略库'
				}, {
					name: '进行中'
				}],
				tradingList:[],
				current: 0,
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
				},{
					icon:require('static/trading/wdzy.png'),
					title:'尾单止盈策略',
					explain:'尾部资金单独解套，提高资金利用效率',
					strategy:4,
				}],
				loginShow:false,
				enterNumber:0,
				pageNum: 1,
				pageSize: 10,
				currencyCoin:2,
				keyword:'',
			}
		},
		onHide() {
			if (this.$store.state.socket) {
				this.$store.state.socket.close()
			}
			clearTimeout(this.searchIntval)
		},
		onShow() {
			if (uni.getStorageSync('user')) {
				this.connectSocket()
				this.getItemList()
			} else {
				this.loginShow = true
			}
			// #ifdef  APP-PLUS
			this.enterNumber = this.enterNumber + 1
			if (this.enterNumber < 2) {
				return
			}
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
									url: '/pages/trading/trading'
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
		methods: {
			currencyCoinType(cur){
					this.currencyCoin=cur
			},
			onSearch(){
				
			},
			getItemList(){
				let obj = {
					mark: '',
					coinName: '',
					pageNum: this.pageNum,
					pageSize: this.pageSize,
					exchange: 2,
					type : 0
				}
				tradingApi.getTradeCoinList(obj).then(res => {
					this.tradingList = res.data
				})
			},
			goCoin(num){
				uni.navigateTo({
					url:'/pages/trading/strategy?type='+num
				})
			},
			change(index) {
				this.current = index;
				this.getItemList()
			},
			connectSocket(){
				let user = '111111'
				if (uni.getStorageSync('user')) {
					user = this.$store.state.userInfo.id
				}
				console.log("uuuuuu",user);
				setTimeout(() => {
				this.$store.dispatch('connectSocket',{id:user,type:'all'})
					// this.Again()
				}, 5000)
			}
		}
	}
</script>

<style lang="scss" scoped>
	.currencytype {
		display: flex;
		width: 750rpx;
		background-color: #fff;
		padding: 24rpx 45rpx;
		font-weight: 600;
		font-size: 30rpx;
		color: #333333;
		.okex{
			
		}
		.huobi{
			margin-left: 20rpx;
		}
		.active{
			color:#279fff ;
			border-bottom: 1rpx solid #279fff;
		}
	}
	.containerId{
		height: 100%;
	}
.strategy-list{
	margin: 82rpx 42rpx 0;
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
}
.trading-list{
	margin: 33rpx 20rpx 0;
	.list-item{
		margin-bottom: 24rpx;
		padding: 22rpx 40rpx;
		box-shadow: 0px 4px 45px #EEEEEE;
		border-radius: 8px;
		.item-top{
			display: flex;
			justify-content: space-between;
			align-items: center;
			margin-bottom: 34rpx;
			.top-title{
				font-size: 28rpx;
				color: #333333;
				font-weight: 600;
			}
			.top-type{
				color: #999;
				font-size: 24rpx;
			}
		}
		.item-btm{
			display: flex;
			justify-content: space-between;
			align-items: center;
			.btm-detail{
				flex: 1;
				.detail-name{
					color: #333333;
					font-weight: 600;
					font-size: 28rpx;
					margin-bottom: 8rpx;
				}
				.detail-num{
					font-size: 20rpx;
					color: #999;
					letter-spacing: 2rpx;
				}
			}
			.btm-change{
				width: 150rpx;
				height: 60rpx;
				background: #DFF6EA;
				border-radius: 8rpx;
				color: #3AC764;
				font-weight: 600;
				text-align: center;
				line-height: 60rpx;
			}
		}
	}
}
</style>