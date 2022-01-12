<template>
	<view class="banxin title" id="containerId">
		<view>
			<!-- <view class="" v-for="(item,index) in diaryList" :key="index"> -->
			<view class="LittleBg journal" v-if="diaryList.length!=0">
				<!-- 日志列表 -->
				<view class="journal-list" v-for="(item) in diaryList" :key="item.id">
					<view class="img">
						<image v-if="item.type==1" src="/static/home/icon_shangchuan.png" mode="widthFix"></image>
						<image v-else src="/static/home/icon_download.png" mode="widthFix"></image>
					</view>
					<view class="data-state">
						<view class="journal-state">
							<text class="currencyName">{{item.symbol.toUpperCase() || 'xxx-USDT'}}</text>
							<text>{{item.state }}</text>，
							<text>类型:{{item.direction ? '做空' :'做多' }}</text><br />
							<text>数量:{{item.accFillSz |numFilter(8)}}</text>，
							<!-- <text>价格:{{item.openPrice |numFilter(8)}}</text> -->
							<text>价格:{{ retrunPrice(item)|numFilter(8)}}</text>

							<!-- 	<text v-if="item.type==0">
									<text v-if="item.handleType==0">首单买进 - 金额：{{item.price|numFilter(8)}}</text>
									<text v-if="item.handleType==1">加仓买进 - 数量：{{item.amount|numFilter(8)}}，金额：{{item.price|numFilter(8)}}</text>
									<text v-if="item.handleType==2">买进成功 - 成交金额：{{item.price|numFilter(8)}}</text>
									<text v-if="item.handleType==4">达到补仓价格 - 当前最低价： {{item.price|numFilter(8)}}</text>
								</text> -->

							<!-- <text v-if="item.type==1">
									<text v-if="item.handleType==1">清仓卖出 - 数量：{{item.amount|numFilter(8)}}，金额：{{item.price|numFilter(8)}}</text>
									<text v-if="item.handleType==2">卖出成功 - 数量：{{item.amount|numFilter(8)}}，成交金额：{{item.price|numFilter(8)}}</text>
									<text v-if="item.handleType==3">达到止盈价格 - 当前最高价： {{item.price|numFilter(8)}}</text>
								</text> -->

							<!-- 	<text v-if="item.type==2">
									<text>取消补仓-上涨超出补仓价格，重置最低价格</text>
								</text> -->
						</view>

						<text class="subtext">{{item.createdAt}}</text>
					</view>
				</view>
			</view>
			<!-- </view> -->
		</view>
		<u-mask :show="show" @click="show=false">
			<view class="screen-top" @tap.stop>
				<text class="title-info">信息状态</text>
				<view class="info-state">
					<text @click="active=0" :class="active==0?'active':''">全部</text>
					<text @click="active=1" :class="active==1?'active':''">买入</text>
					<text @click="active=2" :class="active==2?'active':''">卖出</text>
					<!-- <text @click="active=2" :class="active==2?'active':''">取消补仓</text> -->
				</view>
				<!-- <text>交易所</text>
				<view class="info-state info-state2">
					<text @click="exchange=null" :class="exchange==null?'active':''">全部</text>
					<text @click="exchange=0" :class="exchange==0?'active':''">火币</text>
					<text @click="exchange=1" :class="exchange==1?'active':''">币安</text>
				</view> -->
				<view class="btn-info">
					<text @click="reset">重置</text>
					<text @click="confirm">确认</text>
				</view>
			</view>
		</u-mask>
		<u-back-top :scroll-top="isGotoTop" top="1500"></u-back-top>
		<view v-if="diaryList.length==0">
			<defalut-img></defalut-img>
		</view>
		<view>
			<view v-if="modalShow">
				<mine-login :show='modalShow'></mine-login>
			</view>
		</view>
	</view>
</template>

<script>
	import {
		recordApi,
		tradingApi
	} from '@/api/myAjax.js'
	export default {
		data() {
			return {
				modalShow: false,
				active: '',
				show: false,
				diaryList: [],
				enterNumber: 0,
				pageSize: 20,
				pageNum: 1,
				total: 0,
				isGotoTop: 0,
				exchange: null
			};
		},
		methods: {
			retrunPrice(item){
				/* item.state == '开启策略' || item.state == '策略开仓' ? item.openPrice : item.unwindAverage */
				let num = 0
				switch(item.state){
					case '开启策略' : num = item.openPrice
					break
					case '策略开仓' : num = item.openPrice
					break
					case '做单' : num = item.placingLimit
					break
					case '自动清仓' : num = item.unwindAverage
					break
					case '自动开仓' : num = item.openPrice
					break
					default : num = item.unwindAverage
				}
				return num
			},
			//确认
			confirm() {
				this.pageNum = 1
				this.diaryList = []
				this.show = false
				this.getTradeRecord()
			},
			//重置
			reset() {
				this.active = 0
			},
			// getTradeLog(){
			// 	tradingApi.getTradeRecord({
			// 		userId: this.$store.state.userInfo.id,
			// 		orderType: this.active,
			// 		currencyPair: this.currencyPair,
			// 		startTime: this.startTime,
			// 		endTime: this.endTime,
			// 		pageNum: 1,
			// 		pageSize: this.pageSize,
			// 	}).then(res=>{
			// 		if(res.code==200){
			// 			this.total=res.data.total
			// 			this.diaryList=[...this.diaryList,...res.data.rows]
			// 		}else{
			// 			this.$toast(res.msg)
			// 		}
			// 	})
			// }
			// 获取用户交易对记录
			getTradeRecord() {
				console.log(this.active);
				tradingApi.getTradeRecord({
					pageNum: this.pageNum,
					pageSize: this.pageSize,
					isLog:'log',
				}, {
					userId: this.$store.state.userInfo.id,
					type: this.active - 1 < 0 ? '' : this.active - 1,
					currencyPair: this.currencyPair,
					startTime: this.startTime,
					endTime: this.endTime,
					// pageNum: 1,
					// pageSize: this.pageSize,
					exchange: 2
				}).then(res => {
					this.show = false
					console.log(res);
					if (res.code == 200) {
						res.data.rows.map(item => {
							if (item.state == 'start') item.state = '开启策略'
							if (item.state == 'clear') item.state = '手动卖出'
							if (item.state == 'stop_profit') item.state = '达到止盈比例卖出'
							if (item.state == 'stop_loss') item.state = '达到止损价格卖出'
							if (item.state == 'str_start') item.state = '策略开仓'
							if (item.state == 'enforce') item.state = '强制平仓'
							if (item.state == 'add') item.state = '做单'
							if (item.state == 'remove') item.state = '自动清仓'
							if (item.state == 'restart') item.state = '自动开仓'
							if (item.state == 'manual_add') item.state = '手动补仓'
							if (item.state == 'live') item.state = '订单委托中'
							/* item.symbol = item.symbol.toUpperCase()
							if (item.symbol == 'btcusdt') item.symbol = 'BTCUSDT'
							if (item.symbol == 'ethusdt') item.symbol = 'ETHUSDT' */
						})
						this.diaryList = this.diaryList.concat(res.data.rows)
						this.total = res.data.total
					} else {
						this.$toast(res.msg)
					}
				})
			}
		},
		onShow() {
			if (uni.getStorageSync('user')) {
				this.diaryList = []
				this.getTradeRecord()
			} else {
				this.modalShow = true
				//跳转到登陆页面
			}
			// #ifdef  APP-PLUS
			this.enterNumber = this.enterNumber + 1
			if (this.enterNumber < 2) {
				return
			}
			uni.getSystemInfo({
				success: (res) => {
					if (res.platform == 'ios') {
						const query = uni.createSelectorQuery().in(this);
						var isRecovery = true;
						query.select('#containerId').boundingClientRect(data => {
							isRecovery = false;
						}).exec();
						var timer = setTimeout(() => {
							if (isRecovery) {
								uni.reLaunch({
									url: '/pages/record/record'
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
		onNavigationBarButtonTap() {
			this.show = !this.show
			// this.$toast('点击导航栏按钮')
		},
		//上拉加载数据
		onReachBottom() {
			this.$toast('加载中...')
			if (this.pageNum * 20 > this.total) return this.$toast('数据已经加载完了')
			this.pageNum += 1
			this.getTradeRecord()
			// console.log(this.pageSize);
		},
		// 下拉刷新重置数据
		onPullDownRefresh() {
			this.pageNum = 1
			tradingApi.getTradeRecord({
				pageNum: 1,
				pageSize: this.pageSize,
				isLog:'log',
			}, {
				userId: this.$store.state.userInfo.id,
				type: this.active - 1 < 0 ? '' : this.active - 1,
				currencyPair: this.currencyPair,
				startTime: this.startTime,
				endTime: this.endTime,
				exchange: 2
			}).then(res => {
				this.show = false
				uni.stopPullDownRefresh()
				if (res.code == 200) {
					res.data.rows.map(item => {
						if (item.state == 'start') item.state = '开启策略'
						if (item.state == 'clear') item.state = '手动卖出'
						if (item.state == 'stop_profit') item.state = '达到止盈比例卖出'
						if (item.state == 'stop_loss') item.state = '达到止损价格卖出'
						if (item.state == 'str_start') item.state = '策略开仓'
						if (item.state == 'enforce') item.state = '强制平仓'
						
						/* if (item.symbol == 'btcusdt') item.symbol = 'BTCUSDT'
						if (item.symbol == 'ethusdt') item.symbol = 'ETHUSDT' */
					})
					this.$toast('下拉刷新成功')
					this.diaryList = res.data.rows
					this.total = res.data.total
				} else {
					this.$toast('下拉刷新失败')
				}
			}).catch(() => {
				uni.stopPullDownRefresh()
				this.$toast('网络异常，请稍后再试')
			})

			// recordApi.getTradeLog({
			// 	type:this.active==4?'':this.active,
			// 	pageNum:this.pageNum,
			// 	pageSize:this.pageSize,
			// 	exchange:2
			// }).then(res=>{
			// 	uni.stopPullDownRefresh()
			// 	if(res.data){
			// 		this.$toast('下拉刷新成功')
			// 		this.diaryList=res.data.rows
			// 		this.total=res.data.total
			// 	}else{
			// 		this.$toast('下拉刷新失败')
			// 	}
			// }).catch(()=>{
			// 	uni.stopPullDownRefresh()
			// 	this.$toast('网络异常，请稍后再试')
			// })

		},
		onPageScroll(res) {
			this.isGotoTop = res.scrollTop
		},
		onHide() {
			this.modalShow = false
		}
	}
</script>

<style lang="scss" scoped>
	.title {
		display: block;
		// color: #6A7696;
		padding-top: 20rpx;
	}

	.journal {
		padding: 20rpx 30rpx;

		.journal-list {
			display: flex;
			align-items: center;
			padding-top: 20rpx;
			padding-bottom: 4rpx;
			padding-left: 44rpx;
			margin-left: 36rpx;

			&:nth-child(1) {
				padding-top: 0;
			}

			.img {
				margin-left: -70rpx;
				margin-right: 20rpx;
				width: 90rpx;

				image {
					width: 100%;
				}
			}

			.data-state {
				flex: 1;

				.journal-state {
					font-size: 28rpx;
					word-break: break-all;
					margin-bottom: 8rpx;

					.currencyName {
						margin-right: 20rpx;
					}
				}

				.subtext {
					color: #6A7696;
				}
			}

		}

	}

	.screen-top {
		padding: 0 50rpx 40rpx;
		position: fixed;
		top: 0;
		left: 0;
		width: 100%;
		background: #fff;
		border-radius: 0 0 16px 32rpx;
		overflow: hidden;

		.title-info {
			color: #333333;
			display: block;
			font-size: 28rpx;
			margin-bottom: 56rpx;
			margin-top: 20rpx;
		}

		.info-state {
			display: flex;
			justify-content: space-between;
			margin-bottom: 20rpx;

			>text {
				width: 152rpx;
				height: 60rpx;
				font-size: 28rpx;
				border-radius: 8rpx;
				line-height: 60rpx;
				text-align: center;
				background: rgba(207, 217, 222, 0.24);
				color: #B0BEC8;
			}

			.active {
				background: #279FFF;
				color: #fff;
			}
		}

		.info-state2 {
			margin-top: 10rpx;
		}

		.btn-info {
			display: flex;
			justify-content: center;
			margin-top: 66rpx;
			font-size: 28rpx;
			margin: 66rpx -50rpx -40rpx;

			>text {
				width: 50%;
				height: 80rpx;
				background: rgba(39, 159, 255, .48);
				line-height: 80rpx;
				text-align: center;
				color: #fff;

				&:last-child {
					background: $uni-color-theme;
				}
			}
		}
	}
</style>
