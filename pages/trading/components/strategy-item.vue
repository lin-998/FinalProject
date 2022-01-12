<template name="strategyItem">
	<view class="list-item" @click="goDetail">
		<view class="item-top">
			<view class="top-title">{{strategyName()}}</view>
			<view class="top-type" v-if="(item.userDealContractInfo&&item.userDealContractInfo.strategyType==1)">
				{{item.userStrategyBase.strategyType == 0 ? '单次交易':'交易循环'}}</view>
		</view>
		<!-- <strategy-item :item="item"></strategy-item> -->
		<view class="item-btm">
			<view class="btm-detail">
				<view class="detail-name">{{obj.coinName}}永续</view>
				<!-- <view class="detail-num">持仓数量:1100.0000</view> -->
				<text class="detail-num" v-if="obj.userDealContractInfo">持仓数量:
					{{obj.userDealContractInfo.profitCallback|numFilter(4)}}</text>
				<text class="detail-num" v-else>持仓数量: {{obj.userDealContractInfo|numFilter(4)}}</text>
				<view class="detail-num">盈亏: {{obj.profit|numFilter(4)}}</view>
			</view>
			<!-- <view class="btm-change">
				+1.42%
			</view> -->
			<view v-if="obj.userDealContractInfo" class="btm-change"
				:class="parseFloat(obj.rose)>0?'profitBtn':parseFloat(obj.rose)<0?'lossBtn':'balanceBtn'">
				<view>{{obj.rose}}</view>
			</view>
			<view v-else class="btm-change balanceBtn">
				<view>0.00%</view>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		name: "strategyItem",
		props: ['item'],
		data() {
			return {
				obj: this.item,
			};
		},
		computed: {
			strategyType() {
				let num = -1
				if (this.item.userDealContractInfo) {
					switch (this.item.userDealContractInfo.strategyKind) {
						case "base":
							num = 0
							break
						case "ema":
							num = 1
							break
						case "sar":
							num = 2
							break
						case "grid":
							num = 3
							break
						case "lastStopProfit":
							num = 4
							break
					}

				} else {
					num = this.item.userDto.state == 1 ? 1 : 0
				}
				return num
			}
		},
		methods: {
			strategyName() {
				let name = ''
				if (this.item.userDealContractInfo) {
					switch (this.item.userDealContractInfo.strategyKind) {
						case "base":
							name = '原有的策略'
							break
						case "ema":
							name = 'EMA指标'
							break
						case "sar":
							name = 'SAR指标'
							break
						case "grid":
							name = '网格'
							break
						case "lastStopProfit":
							name = '尾单止盈'
							break
					}
				} else {
					name = this.obj.userDto.state == 1 ? 'EMA指标' : '原有的策略'
				}
				return name
			},
			goDetail() {
				console.log(this.strategyType)
				//let strategyType = this.obj.userDto.state==1 ? 1 : 0
				uni.navigateTo({
					// url: "/pages/trading/trade-setting?strategyType="+this.strategyType+"&id=" + this.coinList.join("=") + '&CLid=' + this.idList.join('=') + '&currencyPair=' + currencyPairList.join('=')
					url: '/pages/trading/trading-detail?id=' + JSON.stringify(this.obj.userStrategyBase) +
						'&strategyType=' + this.strategyType + '&currencyPair=' + this.obj.coinName
				})
			},
			cancel() {
				this.obj.currencyPair = this.obj.coinName.split('USDT')[0] + "-USDT"
				console.log("订阅", `/topic/market-all/${this.obj.currencyPair}/2`);
				this.Interval = setInterval(() => {
					if (this.$store.state.socket) {
						clearInterval(this.Interval)
						let strategy = this.item.strategy == 1 ? 'repeat' : 'single'
						this.$store.state.socket.on(
							`/topic/market-all/${this.obj.currencyPair}/2`,
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
	.list-item {
		margin-bottom: 24rpx;
		padding: 22rpx 40rpx;
		box-shadow: 0px 4px 45px #EEEEEE;
		border-radius: 8px;

		.item-top {
			display: flex;
			justify-content: space-between;
			align-items: center;
			margin-bottom: 34rpx;

			.top-title {
				font-size: 28rpx;
				color: #333333;
				font-weight: 600;
			}

			.top-type {
				color: #999;
				font-size: 24rpx;
			}
		}

		.item-btm {
			display: flex;
			justify-content: space-between;
			align-items: center;

			.btm-detail {
				flex: 1;

				.detail-name {
					color: #333333;
					font-weight: 600;
					font-size: 28rpx;
					margin-bottom: 8rpx;
				}

				.detail-num {
					font-size: 20rpx;
					color: #999;
					letter-spacing: 2rpx;
				}
			}

			.btm-change {
				width: 150rpx;
				height: 60rpx;
				/* background: #DFF6EA;
				color: #3AC764; */
				border-radius: 8rpx;
				font-weight: 600;
				text-align: center;
				line-height: 60rpx;
			}
		}
	}

	/* .item-btm{
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
				border-radius: 8rpx;
				font-weight: 600;
				text-align: center;
				line-height: 60rpx;
			}
		} */
</style>
