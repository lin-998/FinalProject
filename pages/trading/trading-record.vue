<template>
	<view class="trading-record">
		<view class="LittleBg trading-record-in" v-for="(item) in tradeRecord" :key="item.orderId">
			<image src="/static/login/logo.png" mode="widthFix"></image>
			<view class="trading-record-right">
				<view class="right-top">
					<!-- <view class="business" :class="orderType[item.orderType]?'sale':''">{{orderType[item.orderType]||'卖出'}}<text>{{item.currencyPair}}</text></view> -->
					<view class="business" v-if="item.type == 0">买入</view>
					<view class="sale" v-if="item.type == 1">卖出</view>
					<view class="business" v-if="item.type == 2">资金费</view>
					<view class="currency">{{item.symbol.toUpperCase()}}</view>
					<view class="exchange">
						<text>{{exchangeLabel}}</text>
					</view>
				</view>
				<view class="right-tips">时间: <text>{{item.createdAt||'2021-05-31 20:18:56'}}</text></view>
				<view class="order-info" v-if="item.type != 2">
					<view>订单编号: </view><text>{{item.id||'订单编号生成失败'}}</text>
				</view>
				<view class="order-info" v-if="item.type != 2">
					<view>订单类型: </view><text>{{item.direction?'做空':'做多'}}</text>
				</view>
				<view class="order-info" v-if="item.typeOf == 0">
					<view>下单金额: </view><text>{{item.orderAmount||'0'}}</text>
				</view>
				<view class="order-info" v-if="item.typeOf == 0">
					<view>下单倍数: </view><text>{{item.leverageMultipl}}</text>
				</view>
				<view class="order-info" v-if="item.typeOf == 0">
					<view>持仓量: </view><text>{{item.positionNumber||'0'}}</text>
				</view>
				<view class="order-info" v-if="item.typeOf == 0">
					<view>开仓均价: </view><text>{{item.state!='add'?item.openPrice:item.placingLimit||'0.000'}}</text>
				</view>


				<view class="order-info" v-if="item.typeOf == 1">
					<view>成本均价: </view><text>{{item.placingLimit||'0.000'}}</text>
				</view>
				<view class="order-info" v-if="item.typeOf == 1">
					<view>平仓均价: </view><text>{{item.unwindAverage||'0.000'}}</text>
				</view>
				<view class="order-info" v-if="item.typeOf == 1">
					<view>平仓收益额: </view><text>{{item.unwindEarnings||'0.000'}}</text>
				</view>

				<view class="order-info" v-if="item.type != 2">
					<view>手续费: </view><text>{{item.fees||'0.000'}}</text>
				</view>
				<view class="order-info" v-if="item.typeOf == 1">
					<view>盈利: </view><text>{{item.profit||'0.000'}}</text>
				</view>

				<view class="order-info" v-if="item.typeOf == 0&&item.state!='add'">
					<view>初始保证金: </view><text>{{item.earnestMoney||'0.000'}}</text>
				</view>
				<view class="order-info" v-if="item.type == 2">
					<view>资金费: </view><text>{{ item.capitalCost * (-1)||'0' }}</text>
				</view>
			</view>
		</view>
		<u-mask :show="show" @click="show = false">
			<view class="screen-top LittleBg" @tap.stop>
				<text class="title-info">订单状态</text>
				<view class="info-state">
					<text @click="active=0" :class="active==0?'active':''">全部</text>
					<text @click="active=1" :class="active==1?'active':''">买入</text>
					<text @click="active=2" :class="active==2?'active':''">卖出</text>
				</view>

				<!-- <text class="title-info">交易所</text>
				<view class="info-state">
					<text @click="exchange=null" :class="exchange==null?'active':''">全部</text>
					<text @click="exchange=0" :class="exchange==0?'active':''">火币</text>
					<text @click="exchange=1" :class="exchange==1?'active':''">币安</text> -->
				<!-- <text style="visibility:hidden"></text> -->
				<!-- </view> -->

				<!-- <view class="info-state input">
					<u-input class="input" disabled v-model="value" placeholder="HUOBI" :clearable="false"/>
				</view> -->
				<text class="title-info">交易币对查询</text>
				<view class="info-state input">
					<u-input class="input" v-model="currencyPair" placeholder="请输入交易币对" :clearable="false" />
				</view>
				<view class="screen-tips">如：查询BTC/USDT,请填写btcusdt</view>
				<text class="title-info">交易所</text>
				<view class="info-state exchange">
					<u-input v-model="exchangeLabel" type="select" @click="showPick=true"  />
					<u-select v-model="showPick" mode="single-column" :list="list" @confirm="confirm"></u-select>
					 <!-- <u-picker :show="showPick"  :columns="columns" @confirm="confirm" ></u-picker> -->
				</view>
				<text class="title-info">时间</text>
				<view class="info-state time">
					<text @click="beginTimeShow=true">{{startTime}}</text>
					<text>至</text>
					<text @click="overTimeShow=true">{{endTime}}</text>
				</view>
				<view class="btn-info">
					<text @click="replacement">重置</text>
					<text @click="getTradeRecord">确认</text>
				</view>
			</view>
		</u-mask>
		<u-picker confirm-color="#0A61FC" :default-time="defaStartTime" title="请选择" @confirm="beginConfirmTime"
			mode="time" v-model="beginTimeShow" :params="paramsTime"></u-picker>
		<u-picker confirm-color="#0A61FC" :default-time="defaendTime" title="请选择" @confirm="overConfirmTime" mode="time"
			v-model="overTimeShow" :params="paramsTime"></u-picker>
		<view class="gotoTop" @click="gotoTop" v-show="isGotoTop">
			<u-icon name="arrow-upward" size="40" color="#fff"></u-icon>
		</view>
		<view v-if="tradeRecord.length==0">
			<defalut-img></defalut-img>
		</view>
	</view>
</template>

<script>
	import {
		tradingApi
	} from '@/api/myAjax.js'
	export default {
		data() {
			return {
				exchange: 2,
				exchangeLabel:'Okex',
				isGotoTop: false,
				orderType: {
					"buy-market": '买入'
				},
				isSale: false,
				show: false,
				active: 0,
				value: '',
				currencyPair: '',
				tradeRecord: [],
				formData: {},
				beginTimeShow: false,
				overTimeShow: false,
				defaStartTime: '',
				defaendTime: '',
				startTime: '',
				endTime: '',
				paramsTime: {
					year: true,
					month: true,
					day: true,
					hour: true,
					minute: true,
					second: true
				},
				pageSize: 10,
				total: 0,
				showPick:false,
			list: [
								{
									value: '2',
									label: 'Okex'
								},
								{
									value: '0',
									label: 'Huobi'
								}
							],
      
			};
		},
		methods: {
			changeHandler(){
				
			},
			confirm(item){
				this.exchange=item[0].value;
				this.exchangeLabel=item[0].label
			},
			//回到顶部
			gotoTop() {
				uni.pageScrollTo({
					scrollTop: 0,
					duration: 100
				});
			},
			// 重置
			replacement() {
				this.startTime = ''
				this.endTime = ''
				this.active = 0
				this.currencyPair = ''
				this.exchange = null
			},
			// 选择开始时间
			beginConfirmTime(data) {
				this.startTime = data.year + '-' + data.month + '-' + data.day + ' ' + data.hour + ':' + data.minute +
					':' + data.second
				this.defaStartTime = this.startTime
			},
			// 选择结束时间
			overConfirmTime(data) {
				this.endTime = data.year + '-' + data.month + '-' + data.day + ' ' + data.hour + ':' + data.minute + ':' +
					data.second
				this.defaendTime = this.endTime
			},
			// 获取用户交易对记录
			getTradeRecord() {
				tradingApi.getTradeRecord({
					pageNum: 1,
					pageSize: this.pageSize
				}, {
					userId: this.$store.state.userInfo.id,
					type: this.active <= 0 ? '' : this.active - 1,
					currencyPair: this.currencyPair,
					startTime: this.startTime,
					endTime: this.endTime,
					exchange: this.exchange
				}).then(res => {
					this.show = false
					// console.log(res);
					if (res.code == 200) {
						res.data.rows.map(item => {
							// console.log(item.type);
							// console.log(item.direction);
							if ((item.type == 0 && item.direction == 0) || ((item.type == 1 && item
									.direction == 1))) {
								item.typeOf = 0
							}
							if ((item.type == 1 && item.direction == 0) || ((item.type == 0 && item
									.direction == 1))) {
								item.typeOf = 1
							}
							if(item.symbol == 'btcusdt') item.symbol = 'BTCUSDT'
							if(item.symbol == 'ethusdt') item.symbol = 'ETHUSDT'
						})
						this.tradeRecord = res.data.rows
						this.total = res.data.total
					} else {
						this.$toast(res.msg)
					}
				})
			}
		},
		onReady() {
			let Time = new Date()
			let year = Time.getFullYear()
			let month = Time.getMonth() + 1
			let day = Time.getDate()
			let hh = Time.getHours()
			let mm = Time.getMinutes()
			let ss = Time.getSeconds()
			console.log(year + '-' + month + '-' + day + ' ' + hh + ':' + mm + ':' + ss);
			this.defaStartTime = year + '-' + month + '-' + day + ' ' + hh + ':' + mm + ':' + ss
			this.defaendTime = year + '-' + month + '-' + day + ' ' + hh + ':' + mm + ':' + ss
		},
		onLoad(options) {
			console.log(options);
			if (options.type) {
				this.currencyPair = options.type;
			}
			this.getTradeRecord()
		},
		onNavigationBarButtonTap() {
			this.show = !this.show
			// this.$toast('点击导航栏筛选按钮')
		},
		onReachBottom() {
			if (this.pageSize > this.total) return this.$toast('数据已经加载完了')
			this.pageSize += 10
			this.getTradeRecord()
			// console.log(this.pageSize);
		},
		onPullDownRefresh() {
			this.pageSize = 10
			tradingApi.getTradeRecord({
				pageNum: 1,
				pageSize: this.pageSize
			}, {
				userId: this.$store.state.userInfo.id,
				type: this.active <= 0 ? '' : this.active - 1,
				currencyPair: this.currencyPair,
				startTime: this.startTime,
				endTime: this.endTime,
				exchange: 2
			}).then(res => {
				uni.stopPullDownRefresh()
				if (res.code == 200) {
					this.$toast('下拉刷新成功')
					res.data.rows.map(item => {
						// console.log(item.type);
						// console.log(item.direction);
						if ((item.type == 0 && item.direction == 0) || ((item.type == 1 && item
								.direction == 1))) {
							item.typeOf = 0
						}
						if ((item.type == 1 && item.direction == 0) || ((item.type == 0 && item
								.direction == 1))) {
							item.typeOf = 1
						}
					})
					this.tradeRecord = res.data.rows
					this.total = res.data.total
				} else {
					this.$toast(res.msg)
				}
			}).catch(() => {
				uni.stopPullDownRefresh()
				this.$toast('网络异常，请稍后再试')
			})

		},
		onPageScroll(res) {
			if (res.scrollTop > 2000) {
				this.isGotoTop = true
			} else {
				this.isGotoTop = false
			}
		},
	}
</script>

<style lang="scss">
	.trading-record {
		padding: 30rpx 20rpx 0;

		.trading-record-in {
			padding: 40rpx 30rpx;
			margin-bottom: 40rpx;
			display: flex;

			image {
				width: 120rpx;
				margin-right: 28rpx;
				border-radius: 50%;
			}

			.trading-record-right {
				margin-top: 16rpx;
				width: 100%;

				.right-top {
					display: flex;
					justify-content: space-between;
					align-items: center;

					.business {
						color: #2BEC8A;
						font-size: 32rpx;
						display: flex;
						align-items: center;

						>text {
							font-size: 28rpx;
							margin-left: 18rpx;
						}
					}

					.sale {
						color: #FB452F;
						font-size: 32rpx;
					}

					.currency {
						color: #00B9FF;
					}
				}

				.right-tips {
					padding: 12rpx 0;
					// border-bottom: 2px solid rgba(10, 46, 111, 0.2);
					color: #6A7696;

					>text {
						color: #707070;
						margin-left: 16rpx;
					}
				}

				.order-info {
					margin-top: 20rpx;
					display: flex;

					>view {
						width: 102rpx;
						font-size: 24rpx;
						color: #333333;
					}

					>text {
						font-size: 28rpx;
						margin-left: 20rpx;
						color: #3AC764;
					}
				}
			}
		}
	}

	.screen-top {
		padding: 0 50rpx 40rpx;
		margin-top: 20rpx;
		position: fixed;
		top: 0;
		left: 0;
		width: 100%;
		border-radius: 16rpx 16rpx 0 0;

		.title-info {
			display: block;
			font-size: 28rpx;
			margin-bottom: 30rpx;
			margin-top: 40rpx;
		}

		.info-state {
			display: flex;
			justify-content: space-between;

			>text {
				width: 200rpx;
				height: 60rpx;
				font-size: 28rpx;
				border-radius: 8rpx;
				line-height: 60rpx;
				text-align: center;
				background: #F5F9FE;
				color: #B0BEC8;
			}

			.active {
				background: #279FFF;
				color: #fff;
			}
		}

		.input {
			width: 670rpx;
			height: 72rpx;
			padding-left: 30rpx;
			background: #F5F9FE;
			border-radius: 8rpx;
			color: #B0BEC8 !important;
		}

		.screen-tips {
			margin-left: 30rpx;
			margin-top: 20rpx;
			font-size: 24rpx;
			color: #B0BEC8;
		}

		.time {
			display: flex;

			>text {
				width: 300rpx;
				height: 72rpx;
				line-height: 72rpx;
				background: #F5F9FE;
				border-radius: 8rpx;

				&:nth-child(2) {
					font-size: 28rpx;
					font-family: PingFang SC;
					font-weight: 300;
					margin: 0 20rpx;
					width: 28rpx;
					background: rgba(255, 255, 255, 0);
				}
			}
		}

		.btn-info {
			display: flex;
			justify-content: center;
			margin-top: 54rpx;
			margin-left: -50rpx;
			margin-right: -50rpx;
			margin-bottom: -40rpx;
			font-size: 28rpx;

			>text {
				width: 50%;
				height: 76rpx;
				background: rgba(39, 159, 255, 0.48);
				line-height: 76rpx;
				text-align: center;
				font-size: 28rpx;
				color: #FFFFFF;

				&:last-child {
					background: $uni-color-theme;
				}
			}
		}
	}

	.gotoTop {
		position: fixed;
		bottom: 80rpx;
		right: 20rpx;
		width: 80rpx;
		line-height: 80rpx;
		border-radius: 50%;
		background: rgba(000, 000, 000, 0.5);
		text-align: center;
	}
</style>
