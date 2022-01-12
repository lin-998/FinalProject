<template>
	<view class="course">
		<view class="course-in LittleBg" v-for="(item,index) in MyBackTestResult" :key="index">
			<view class="title">
				{{item.currencyPair}}
				<text class="time">{{item.createDate}}</text>
			</view>
			<view class="simulate-msg">
				<view class="simulate-title">开仓次数</view>
				<view class="simulate-value">
					{{item.testFlag==1?'运行中':item.transactionNum +'次'}}
				</view>
			</view>
			<view class="simulate-msg">
				<view class="simulate-title">总收益额</view>
				<view class="simulate-value">
				{{item.testFlag==1?'运行中':item.totalProfit + 'USDT'}}
				</view>
			</view>
			<view class="simulate-msg">
				<view class="simulate-title">总收益率</view>
				<view class="simulate-value">
					{{item.testFlag==1?'运行中':item.profitYield +'%'}}
				</view>
			</view>

			<view class="simulate-params">
				<view class="">
					模拟参数
				</view>
				<view class="">
					{{strategyName(item.strategyKind)}}
				</view>
			</view>
			<view class="line"></view>

			<view class="simulate-msg">
				<view class="simulate-title1">开仓额度</view>
				<view class="simulate-value1">{{item.firstAmount||0}} USDT</view>
			</view>
			<view class="simulate-msg">
				<view class="simulate-title1">模拟交易所</view>
				<view class="simulate-value1">Okex</view>
			</view>
			<view class="simulate-msg">
				<view class="simulate-title1">模拟时间段</view>
				<view class="simulate-value1">{{item.timeFrame}}</view>
			</view>
			<view class="simulate-msg">
				<view class="simulate-title1">杠杆倍数</view>
				<view class="simulate-value1">{{item.leverageMultiple||0}} 倍</view>
			</view>
			<view class="simulate-msg" v-if="item.strategyKind!=1">
				<view class="simulate-title1">交易频率</view>
				<view class="simulate-value1">{{item.frequency == 2 ?'保守':item.frequency == 0 ?'高频':'稳健'}}</view>
			</view>
			<view class="simulate-msg" v-if="item.strategyKind==1">
				<view class="simulate-title1">做单数量</view>
				<view class="simulate-value1">{{item.makeNumber||0}} 单</view>
			</view>
			<view class="simulate-msg" v-if="item.strategyKind!=1">
				<view class="simulate-title1">止盈比例</view>
				<view class="simulate-value1">每 {{item.checkSurplusProportion||0}} %</view>
			</view>
			<view class="simulate-msg" v-if="item.strategyKind!=1">
				<view class="simulate-title1">卖出比例</view>
				<view class="simulate-value1">{{item.sellProportion||0}} %</view>
			</view>
			<view class="simulate-msg" v-if="item.strategyKind!=1">
				<view class="simulate-title1">交易类型</view>
				<view class="simulate-value1">{{item.strategyType==0?'单次交易':'循环交易'}}</view>
			</view>
			<view class="simulate-msg" v-if="item.strategyType == 1">
				<view class="simulate-title1">卖出间隔</view>
				<view class="simulate-value1">{{item.loopInterval||0}} 秒</view>
			</view>
		</view>

	</view>
	</view>



</template>

<script>
	import {
		homeApi,
		tradingApi
	} from '@/api/myAjax.js'
	export default {
		data() {
			return {
				form: {},
				MyBackTestResult: [],
			};
		},
		methods: {
			strategyName(num){
				let name = ''
				switch(num){
					case 0 : name = '原有的策略'
					break
					case 1 : name = 'EMA指标'
					break
					case 2 : name = 'SAR指标'
					break
					case 3 : name = '网格策略'
					break
					case 4 : name = '尾单止盈'
					break
				}
				return name
			},
			getTutorials(apitype) {
				homeApi.getTutorials({
					id: this.$store.state.userInfo.id,
					exchange: apitype
				}).then(res => {
					if (res.data) {
						this.form = res.data
						this.form.tutorialsText = res.data.tutorialsText.replace(/<img/g,
							"<img style='width:100%;height:auto;'")
					}
				})
			},
			getMyBackTestResult() {
				tradingApi.getMyBackTestResult().then(res => {
					console.log(res, '模拟数据');
					res.data.map(item=>{
						console.log(item);
						if(item.timeFrame==1) item.timeFrame = '昨日'
						if(item.timeFrame==7) item.timeFrame = '近7日'
						if(item.timeFrame==30) item.timeFrame = '近30日'
					})
					this.MyBackTestResult = res.data
					console.log(this.MyBackTestResult);
				})
			},
		},
		// onLoad(options) {
		// 	console.log(options.apiType);
		// 	if (!options.apiType) return
		// 	this.getTutorials(options.apiType)
		// }
		onShow() {
			this.getMyBackTestResult()
		}
	}
</script>

<style lang="scss" scoped>
	.course {
		padding: 20rpx 20rpx;

		.course-in {
			padding: 20rpx;
			margin-bottom: 34rpx;
		}

		.title {
			font-family: Source Han Sans SC;
			font-weight: 400;
			color: #333333;
			font-size: 32rpx;

			.time {
				margin-left: 38rpx;
			}
		}

		.simulate-msg {
			display: flex;
			margin: 20rpx 50rpx;

			.simulate-title {
				width: 157rpx;
				color: #333333;
				font-size: 28rpx;
			}

			.simulate-title1 {
				width: 173rpx;
				color: #333333;
				font-size: 28rpx;
			}

			.simulate-value1 {
				// color: #33C32D;
			}
		}

		.simulate-params {
			font-family: Source Han Sans SC;
			color: #333333;
			font-size: 30rpx;
			font-weight: 400;
			margin: 50rpx 50rpx 24rpx 50rpx;
			display: flex;
			justify-content: space-between;
		}

		.line {
			width: 100%;
			height: 2rpx;
			background-color: #707070;
			opacity: 0.19
		}
	}
</style>
