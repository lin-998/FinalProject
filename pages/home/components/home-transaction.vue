<template>
	<navigator class="tradeinfo"
		:url="'/pages/trading/trading-detail?id='+JSON.stringify(item.userStrategyBase)+'&strategyType='+strategyType+'&currencyPair='+obj.coinName">
		<!-- <block v-for="(item,index) in obj" :key="index"> -->
		<view class="trade-name">
			<text>{{obj.coinName||'XXX/USDT'}}永续</text>
			<text v-if="obj.userDealContractInfo">数量 {{obj.userDealContractInfo.profitCallback|numFilter(4)}}</text>
			<text v-else>数量 {{obj.userDealContractInfo|numFilter(4)}}</text>
		</view>
		<view class="trade-type" v-if="strategyType!=1">
			<view v-if="objType!=1">
				<text class="Transcycle" v-if="strategyModel==1">策略循环</text>

				<text class="Transcycle" v-else style="background: #6DBEFF;">单次交易</text>
				<!-- <text class="box"></text> -->
			</view>
			<view>
				<text style="margin-right: 20rpx;font-size: 24rpx;">收益</text>
				<text style="font-size: 24rpx;">{{obj.profit|numFilter(4)}}</text>
			</view>

			<!-- <view> -->
			<!-- <text class="Transcycle">{{item.checkSurplusProportion||0}}次补仓</text> -->
			<!-- <text class="box"></text>
							<text>{{obj.floatingDeficit|numFilter(4)}}</text>
						</view> -->

		</view>
		<view v-if="obj.userDealContractInfo" class="allBtn"
			:class="parseFloat(obj.rose)>0?'profitBtn':parseFloat(obj.rose)<0?'lossBtn':'balanceBtn'">
			<view>{{obj.rose}}</view>
		</view>
		<view v-else class="balanceBtn allBtn">
			<view>0.00%</view>
		</view>
		<!-- </block> -->
	</navigator>
</template>

<script>
	import {
		tradingApi
	} from '@/api/myAjax.js'
	export default {
		name:'homeTransaction',
		props: ['item', 'type', 'index','strategyType'],
		data() {
			return {
				obj: this.item,
				Interval: null,
				objType: {
					"repeat": '交易循环',
					"single": '单次交易',
				},
			};
		},
		computed: {
			// tradingType(){
			// let obj={
			// 	"market": '',
			// 	"repeat": 'repeat',
			// 	"single": 'single',
			// 	"stop": 'stop',
			// }
			// return this.type
			// }
			strategyModel(){
				let num = ''
				if(this.item.userDealContractInfo){
						switch(this.item.userDealContractInfo.strategyKind){
							case "base" : num = 'userStrategyBase'
							break
							case "sar" : num = 'userStrategySar'
							break
						}				
					}
					if(num){		
						return this.item[num].strategyType
					}
				}
			
		},
		watch: {
			item(val) {
				this.obj = val
			}
		},
		mounted() {
			console.log(this.obj);
		},
		methods: {
			cancel() {
				this.Interval = setInterval(() => {
					if (this.$store.state.socket) {
						clearInterval(this.Interval)
						let strategy = this.item.strategy == 1 ? 'repeat' : 'single'
						this.$store.state.socket.on(
							`/topic/market-${this.type}/${this.obj.currencyPair}/${this.index}`,
						topicMarket => {
							if (topicMarket.type != "stop") {
								return
							}
							if (!topicMarket.holdNumber) {
								return
							}
							this.obj.userDealContractInfo.profitCallback = topicMarket.holdNumber
							this.obj.profit = topicMarket.floatingDeficit
							this.obj.rose = topicMarket.percent
						})
					}
				}, 1000)
			},
		},
		created() {
			this.cancel()
		}
	}
</script>

<style lang="scss" scoped>
	.tradeinfo {
		width: 100%;
		display: flex;
		justify-content: space-between;
		border-bottom: 1rpx solid $uni-color-bd;
		padding: 30rpx 0;
		align-items: center;

		.trade-name {
			width: 240rpx;
		}

		.trade-type {
			flex: 1;
			display: flex;
			flex-direction: column;

			>view {
				// display: flex;
			}
		}

		&:nth-child(1) {
			margin-top: 0;
		}

		>view {
			// width: 39%;
			display: flex;
			flex-direction: column;

			.Transcycle {
				font-size: 24rpx;
				width: 122rpx;
				height: 38rpx;
				background: #FEAB3F;
				color: #fff;
				text-align: center;
				line-height: 38rpx;
				border-radius: 10rpx;
				text-align: center;
				padding: 0 10rpx;
			}

			.box {
				height: 38rpx;
			}

			&:last-child {
				width: 120rpx;
				flex-direction: row;
				justify-content: center;
				align-items: center;
				border-radius: 12rpx;

			}

			&:nth-child(2) {
				// text-align: right;
			}

			>text {
				font-size: 28rpx;
				height: 34rpx;
				line-height: 34rpx;
				color: #003333;

				&:nth-child(1) {
					font-family: Source Han Sans SC;
					font-weight: 800;
				}

				&:nth-child(2) {
					font-size: 24rpx;
					margin-top: 4rpx;
				}
			}
		}
	}

	.allBtn {
		height: 60rpx;
	}
</style>
