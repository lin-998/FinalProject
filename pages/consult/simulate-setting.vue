<template>
	<view class="banxin setting">
		<view class="LittleBg first">
			<view>{{params.type}}</view>
			<view class="first-line">
				<text>开仓额度</text>
				<input class="myinput" placeholder="请输入" v-model="tarading_list.firstAmount" />
				<text>USDT</text>
			</view>
		</view>
		<view class="LittleBg setting-in" v-if="tacticsType!=3&&tacticsType!=4 ">
			<view class="setting-list">
				<text>模拟时间的</text>
				<view class="btns">
					<button class="btn-item" size="mini" v-for="(item,index) in times" :key='index'
						@click="clickTime(index)"
						:style=" checked_time == index? 'background-color:#279fff;color:#fff' : 'background-color:#fff' ">{{item}}
					</button>
				</view>
			</view>
			<view class="click-time">
				<text>已选时间段:{{beforeTime}} — {{nowTime}}</text>
			</view>
			<view class="setting-list">
				<text>杠杆倍数</text>
				<view class="btns">
					<button class="btn-item-s" size="mini" v-for="(item,index) in btns" :key='index'
						@click="clickBtn(index)"
						:style=" checked == index? 'background-color:#279fff;color:#fff' : 'background-color:#fff' ">{{item}}
					</button>
				</view>
			</view>
			<view class="setting-list" v-if="tacticsType==0">
				<text>交易频率</text>
				<view>
					<u-subsection mode="subsection" active-color="#279fff" :list="tradeFrequency" :current="1"
						@change="frequency"></u-subsection>
				</view>
			</view>
			<view class="setting-list" v-if="tacticsType==1">
				<text>做单数量</text>
				<view style="margin: 0 20rpx;">
					<u-input style="width: 200rpx;" v-model="tarading_list.makeNumber" />
				</view>
			</view>
			<view class="setting-list" v-if="tacticsType==0||tacticsType==2">
				<text>开启高级设置</text>
				<u-switch size='40' v-model="Advanced" :disabled="policyType!=1" active-color="#279fff"></u-switch>
			</view>
			<view class="setting-list" v-show="Advanced" v-if="tacticsType==0||tacticsType==2">
				<text>止盈比例</text>
				每<view style="margin: 0 20rpx;">
					<input class="myinput" placeholder="请输入" v-model="tarading_list.checkSurplusProportion" />
				</view>%
			</view>
			<view class="setting-list" v-show="Advanced" v-if="tacticsType==0||tacticsType==2">
				<text>卖出比例</text>
				<view style="margin: 0 20rpx;">
					<input class="myinput" placeholder="请输入" v-model="tarading_list.sellProportion" />
				</view>%
			</view>
			<view class="setting-list" v-if="tacticsType==0||tacticsType==2">
				<text>开启循环交易</text>
				<u-switch size='40' v-model="tailSingle" :disabled="policyType!=1" active-color="#279fff"
					@change="open_circulation"></u-switch>
			</view>
			<view class="setting-list" v-show="tailSingle" v-if="tacticsType==0||tacticsType==2">
				<text>循环卖出间隔</text>
				<view style="margin: 0 20rpx;">
					<u-input style="width: 200rpx;" v-model="tarading_list.loopInterval" />
				</view>秒
			</view>
			<view class="setting-list" v-show="windControl">
				<text>限制买入最高价</text>
				<view class="input">
					<u-input v-model="form.maxAmount" type="number" :clearable="false" @focus="form.maxAmount=''"
						:disabled="policyType!=1" />

				</view>
			</view>
			<view class="setting-list" v-show="windControl">
				<text>限制买入最低价</text>
				<view class="input">
					<u-input v-model="form.minAmount" type="number" :clearable="false" @focus="form.minAmount=''"
						:disabled="policyType!=1" />
				</view>
			</view>
		</view>
		<!-- 网格模拟 -->
		<view class="LittleBg setting-in" v-if="tacticsType==3">
			<view class="setting-list">
				<text>模拟时间的</text>
				<view class="btns">
					<button class="btn-item" size="mini" v-for="(item,index) in times" :key='index'
						@click="clickTime(index)"
						:style=" checked_time == index? 'background-color:#279fff;color:#fff' : 'background-color:#fff' ">{{item}}
					</button>
				</view>
			</view>
			<view class="click-time">
				<text>已选时间段:{{beforeTime}} — {{nowTime}}</text>
			</view>
			<view class="setting-list" v-if="tacticsType==3">
				<text>网格高度</text>
				<view style="margin: 0 20rpx;">
					<input class="myinput" placeholder="请输入" v-model="tarading_list.gridHigh" />
				</view>
			</view>
			<view class="setting-list" v-if="tacticsType==3">
				<text>杠杆倍数</text>
				<view class="btns">
					<button class="btn-item-s" size="mini" v-for="(item,index) in btns" :key='index'
						@click="clickBtn(index)"
						:style=" checked== index? 'background-color:#279fff;color:#fff' : 'background-color:#fff' ">
						{{item}}
					</button>
				</view>
			</view>
			<view class="setting-list" v-if="tacticsType==3">
				<text>补仓次数</text>
				<view style="margin: 0 20rpx;">
					<input class="myinput" placeholder="请输入" v-model="tarading_list.makeNumber" />
				</view>
			</view>
			<view class="setting-list" v-if="tacticsType==3">
				<text>风险控制</text>
				<u-switch size='40' v-model="windControl" :disabled="policyType!=1" active-color="#279fff"
					@change="open_wind"></u-switch>
			</view>
			<view class="setting-list" v-if="tacticsType==3" v-show="windControl">
				<text>价格上限</text>
				<view style="margin: 0 20rpx;">
					<input class="myinput" placeholder="请输入" v-model="tarading_list.priceHigh" />
				</view>
			</view>
			<view class="setting-list" v-if="tacticsType==3" v-show="windControl">
				<text>价格下限</text>
				<view style="margin: 0 20rpx;">
					<input class="myinput" placeholder="请输入" v-model="tarading_list.priceLow" />
				</view>
			</view>
		</view>
		<!-- 网格模拟 -->
		<!-- 尾单模拟开始 -->
		<view class="LittleBg setting-in" v-if="tacticsType==4">
			<view class="setting-list">
				<text>模拟时间的</text>
				<view class="btns">
					<button class="btn-item" size="mini" v-for="(item,index) in times" :key='index'
						@click="clickTime(index)"
						:style=" checked_time == index? 'background-color:#279fff;color:#fff' : 'background-color:#fff' ">{{item}}
					</button>
				</view>
			</view>
			<view class="click-time">
				<text>已选时间段:{{beforeTime}} — {{nowTime}}</text>
			</view>
			<view class="setting-list">
				<text>杠杆倍数</text>
				<view class="btns">
					<button class="btn-item-s" size="mini" v-for="(item,index) in btns" :key='index'
						@click="clickBtn(index)"
						:style=" checked== index? 'background-color:#279fff;color:#fff' : 'background-color:#fff' ">
						{{item}}
					</button>
				</view>
			</view>
			<view class="setting-list">
				<text>做单数量</text>
				<view style="margin: 0 20rpx;">
					<input class="myinput" placeholder="请输入" v-model="tarading_list.makeNumber" />
				</view>
			</view>
			<view class="setting-list">
				<text>止盈比例</text>
				<view style="margin: 0 20rpx;">
					<input class="myinput" placeholder="请输入" v-model="tarading_list.checkSurplusProportion" />
				</view>%
			</view>
			<view class="setting-list">
				<text>止盈回调</text>
				<view style="margin: 0 20rpx;">
					<input class="myinput" placeholder="请输入" v-model="tarading_list.checkSurplusCallBack" />
				</view>%
			</view>
			<view class="setting-list" @click="popShowClick(1)">
				<text>补仓配置</text>
				<view style="margin: 0 20rpx;">
					<text v-if="textShowSet1">已设置</text>
					<text v-else>未设置</text>
				</view>
			</view>
			<view class="setting-list" @click="popShowClick(2)">
				<text>补仓回调</text>
				<view style="margin: 0 20rpx;">
					<text v-if="textShowSet2">已设置</text>
					<text v-else>未设置</text>
				</view>
			</view>
			<view class="setting-list">
				<text>开启尾单止盈</text>
				<u-switch size='40' v-model="tailCheck" :disabled="policyType!=1" active-color="#279fff"
					@change="open_tailCheck"></u-switch>
			</view>
			<view class="setting-list" v-show="tailCheck">
				<text>尾单止盈开启单数</text>
				第<view style="margin: 0 20rpx;">
					<input class="myinput" placeholder="请输入" v-model="tarading_list.singleNum" />
				</view>单
			</view>
			<view class="setting-list">
				<text>开启循环交易</text>
				<u-switch size='40' v-model="tailSingle" :disabled="policyType!=1" active-color="#279fff"
					@change="open_circulation"></u-switch>
			</view>
			<view class="setting-list" v-show="tailSingle">
				<text>循环卖出间隔</text>
				<view style="margin: 0 20rpx;">
					<u-input class="myinput" v-model="tarading_list.loopInterval" />
				</view>秒
			</view>

		</view>
		<!-- 尾单模拟结束-->
		<u-popup v-model="popShow" mode="bottom" border-radius="14">
			<trading-popup :showType='showType' :policyType='policyType' :arrlist='Number(tarading_list.makeNumber)'
				:data='tarading_list.addPosSet' @onSelect='onSelect' @onCancelClick='popShow=false'
				@onCaonfirmClick='onCaonfirmClick'>
			</trading-popup>
		</u-popup>
	</view>
</template>

<script>
	import {
		tradingApi
	} from '@/api/myAjax.js'
	// import tradingPopup from '../trading/components/trading-popup.vue'
	export default {
		// 		component:{
		// tradingPopup
		// 		},
		data() {
			return {
				textShowSet1: false,
				textShowSet2: false,
				tailSingle: false,
				tailCheck: false,
				windControl: false,
				showType: 1,
				popShow: false,
				doubling: false,
				tailSingle: false,
				Advanced: false,
				diefuList: [],
				marginSettings: false,
				// value:'',
				coinId: null,
				form: {
					marginDeclines: [],
					windControl: false,
					marginMultiples: [],
					marginCallbacks: []
				},
				userId: '',
				trandType: false,
				doSinglearr: [],
				policyType: 1,
				policyList: ['自定义', '保守', '稳健', '激进'],
				times: ['昨日', '近7天', '近30天'],
				btns: ['1x', '2x', '3x', '5x', '10x'],
				checked: 0,
				checked_time: 0,
				params: {},
				tarading_list: [],
				tarading_list: {
					coinId: '',
					currencyPair: '',
					userId: '',
					firstAmount: "", //开仓额度
					leverageMultiple: "1", //杠杆倍数
					checkSurplusProportion: "", //止盈比例
					sellProportion: "", //卖出比例
					strategyType: "0", //开启循环交易，0单次，1循环
					exchange: "2", //写死2
					loopInterval: "", //循环间隔
					frequency: 1, //交易频率
					// 网格
					gridHigh: '', //网格高度
					makeNumber: '', //补仓次数
					priceHigh: '', //价格上限
					priceLow: '', //价格下限
					windControl: '', //风险控制
					//尾单
					makeNumber: '', //做单数量
					checkSurplusProportion: '', //止盈比例
					checkSurplusCallBack: '', //止盈回调
					single: '', //开启尾单止盈
					singleNum: '', //尾单止盈开启单数
					strategyType: '', //开启循环交易
					loopInterval: '', //循环间隔
					addPosSet: [{
							addPosFall: '',
							addPosCallback: '',
							addPosMiltiply: ''
						},
						{
							addPosFall: '',
							addPosCallback: '',
							addPosMiltiply: ''
						},
						{
							addPosFall: '',
							addPosCallback: '',
							addPosMiltiply: ''
						},
						{
							addPosFall: '',
							addPosCallback: '',
							addPosMiltiply: ''
						},
						{
							addPosFall: '',
							addPosCallback: '',
							addPosMiltiply: ''
						},
						{
							addPosFall: '',
							addPosCallback: '',
							addPosMiltiply: ''
						},
						{
							addPosFall: '',
							addPosCallback: '',
							addPosMiltiply: ''
						},
						{
							addPosFall: '',
							addPosCallback: '',
							addPosMiltiply: ''
						},
						{
							addPosFall: '',
							addPosCallback: '',
							addPosMiltiply: ''
						},
					], //补仓配置
				},
				period: '1', //模拟时间
				nowTime: '',
				beforeTime: '',
				tacticsType: '', //策略
				tradeFrequency: [{
						name: '高频',
						value: '1H'
					},
					{
						name: '稳健',
						value: '1D'
					},
					{
						name: '保守',
						value: '1W'
					}
				],
			};
		},
		// onLoad(options) {
		// 	this.userId=this.$store.state.userInfo.id
		// 	if(options.id.indexOf('=')>-1){
		// 		this.trandType=true
		// 		this.coinId=options.id.split('=')
		// 	}else{
		// 		this.coinId=options.id
		// 		this.UserTradeCoin()
		// 	}
		// },
		onLoad(option) {
			console.log(option);
			this.params = option
			console.log(this.params);
			this.tarading_list.coinId = option.id
			this.tarading_list.currencyPair = option.type
			this.tacticsType = option.strategyType
			this.clickTime(0)
			console.log(this.$store);
		},
		onShow() {
			this.stopProfitStrategyDefault()
		},
		methods: {
			//开启循环交易
			open_circulation() {
				e ? this.tarading_list.strategyType = 1 : this.tarading_list.strategyType = 0
			},
			//开启尾单止盈
			open_tailCheck(e) {
				e ? this.tarading_list.single = 1 : this.tarading_list.single = 0
			},
			//获取默认尾单
			stopProfitStrategyDefault() {
				tradingApi.stopProfitStrategyDefault().then(res => {
					console.log(res)
				})
			},
			//开启风险控制
			open_wind(e) {
				e ? this.tarading_list.windControl = 1 : this.tarading_list.windControl = 0
			},
			frequency(index) {
				this.tarading_list.frequency = index
			},
			popShowClick(type) {
				this.showType = type
				this.popShow = !this.popShow
			},
			// 参数设置
			onCaonfirmClick(item) {
				console.log(item);
				this.popShow = false
				if (this.showType == 1) {
					item.every(x => {
						if (x.addPosFall > 0 && x.addPosMiltiply > 0) {
							this.textShowSet1 = true
						} else {
							this.$toast('补仓参数不能为空且大于0')
							this.textShowSet1 = false
						}
					})
					this.tarading_list.addPosSet = JSON.parse(JSON.stringify(item))
				} else if (this.showType == 2) {
					// 补仓回调
					item.every(x => {
						if (x.addPosCallback > 0) {
							this.textShowSet2 = true
						} else {
							this.$toast('补仓参数不能为空且大于0')
							this.textShowSet2 = false
						}
					})
					this.tarading_list.addPosSet = JSON.parse(JSON.stringify(item))
				} else if (this.showType == 3) {
					// 分仓止盈比例
					this.form.checkSurplusProportions = JSON.parse(JSON.stringify(item.checkSurplusProportions))
				}
			},
			//选择策略类型
			onSelect(type) {
				this.policyType = type
				this.popShow = false
				this.UserTradeCoin()
			},
			// 获取焦点
			focus(index) {
				this.form.marginDeclines[index] = ''
				this.$forceUpdate()
			},
			// 失去焦点
			blur(index) {
				if (!this.form.marginDeclines[index]) {
					this.form.marginDeclines[index] = 0
					this.$forceUpdate()
				} else {
					this.form.marginDeclines[index] = Number(this.form.marginDeclines[index])
				}
			},
			//获取交易设置
			UserTradeCoin() {
				tradingApi.UserTradeCoin({
					type: this.policyType,
					userId: this.userId,
					coinId: this.coinId,
					exchange: this.$store.state.exchange
				}).then(res => {
					console.log(res);
					this.form = res.data.transactionStrategy || {}
					this.form.marginDeclines = this.form.marginDeclines || []
					this.doSinglearr = JSON.parse(JSON.stringify(this.form.marginDeclines))
					this.doubling = this.form.doubling ? (this.form.doubling <= 1 ? false : true) : false
					this.tailSingle = this.form.tailSingle ? (this.form.tailSingle <= 1 ? false : true) : false
					this.windControl = this.form.windControl == 1 ? true : false
					// this.policyType=this.form.type
				})
			},
			//单个交易对设置
			single() {
				delete this.form.id
				tradingApi.addTradeCoin({
					...this.form,
					coinId: this.coinId,
					userId: this.userId,
					exchange: this.$store.state.exchange
				}).then(res => {
					if (res.code == 200) {
						this.$toast('设置成功')
						setTimeout(() => {
							uni.navigateBack({
								delta: 1
							})
						}, 1000)
					} else {
						this.$toast(res.msg)
					}
				})
			},
			//批量交易对设置
			More() {
				let arr = []
				this.coinId.map(val => {
					arr.push({
						...this.form,
						coinId: val,
						userId: this.userId,
						exchange: this.$store.state.exchange
					})
				})
				tradingApi.updateOrAddUserTradeCoinAll(arr).then(res => {
					if (res.code == 200) {
						this.$toast('设置成功')
						setTimeout(() => {
							uni.navigateBack({
								delta: 1
							})
						}, 1000)
					} else {
						this.$toast(res.msg)
					}
				})
			},
			clickBtn(type) {
				this.checked = type
				if (type == 0) this.tarading_list.leverageMultiple = 1
				if (type == 1) this.tarading_list.leverageMultiple = 2
				if (type == 2) this.tarading_list.leverageMultiple = 3
				if (type == 3) this.tarading_list.leverageMultiple = 5
				if (type == 4) this.tarading_list.leverageMultiple = 10
			},
			clickTime(type) {
				this.checked_time = type
				if (type == 0) this.period = 1
				if (type == 1) this.period = 7
				if (type == 2) this.period = 30
				this.getDay()
				this.before_getDay(this.period * (-1))
			},
			getDay() {
				let today = new Date();
				let tYear = today.getFullYear();
				let tMonth = today.getMonth();
				let tDate = today.getDate();
				let tHours = today.getHours();
				let tMinute = today.getMinutes();
				tMonth = this.doHandleMonth(tMonth + 1);
				tHours = this.doHandleMonth(tHours);
				tDate = this.doHandleMonth(tDate);
				// let nowTime = tYear + "-" + tMonth + "-" + tDate + " " + tHours + ":" + tMinute
				let nowTime = tYear + "-" + tMonth + "-" + tDate + " " + '00' + ":" + '00'
				this.nowTime = nowTime
				// console.log(tYear + "-" + tMonth + "-" + tDate+ " " + tMinute + ":" + tSecond);
			},
			before_getDay(day) {
				let today = new Date();
				// console.log(new Date(new Date().toLocaleDateString()).getTime());
				let todayZero = new Date(new Date().toLocaleDateString()).getTime()
				// let targetday_milliseconds = today.getTime() + 1000 * 60 * 60 * 24 * day;
				let targetday_milliseconds = todayZero + 1000 * 60 * 60 * 24 * day;
				today.setTime(targetday_milliseconds); //注意，这行是关键代码
				let tYear = today.getFullYear();
				let tMonth = today.getMonth();
				let tDate = today.getDate();
				let tHours = today.getHours();
				let tMinute = today.getMinutes();
				tMonth = this.doHandleMonth(tMonth + 1);
				tHours = this.doHandleMonth(tHours);
				tDate = this.doHandleMonth(tDate);
				tMinute = this.doHandleMonth(tMinute);
				this.beforeTime = (tYear + "-" + tMonth + "-" + tDate + " " + tHours + ":" + tMinute)
			},
			doHandleMonth(month) {
				let m = month;
				if (month.toString().length == 1) {
					m = "0" + month;
				}
				return m;
			},

			open_circulation(e) {
				e ? this.tarading_list.strategyType = 1 : this.tarading_list.strategyType = 0
			}
		},

		//确定提交
		onNavigationBarButtonTap() {
			this.tarading_list.userId = this.$store.state.userInfo.id
			console.log(this.tarading_list);
			if (this.tacticsType == 0 || this.tacticsType == 2) {
				if (!this.tarading_list.firstAmount || this.tarading_list.firstAmount <= 0) {
					this.$toast('开仓额度不能小于0');
					return
				}
				if (this.tarading_list.checkSurplusProportion < 0) {
					this.$toast('止盈比例不能小于0');
					return
				}
				if (this.tarading_list.sellProportion < 0) {
					this.$toast('卖出比例不能小于0');
					return
				}
				if (this.tarading_list.strategyType == 1) {
					if (this.tarading_list.loopInterval < 0) {
						this.$toast('循环间隔不能小于0');
						return
					}
				}
				if (!this.Advanced) {
					this.tarading_list.checkSurplusProportion = 0
					this.tarading_list.sellProportion = 0
				}
				this.tarading_list.strategyKind = this.tacticsType
				tradingApi.start(this.tarading_list, this.period).then(res => {
					this.$toast(res.msg)
					if (res.code == 200) {
						uni.navigateTo({
							url: '/pages/consult/my-simulate'
						})
					}
				})
			} else if (this.tacticsType == 1) {
				if (this.tarading_list.firstAmount <= 0) return this.$toast('开仓额度需大于零');
				if (this.tarading_list.makeNumber <= 0) return this.$toast('做单数量需大于零');
				let data = {
					coinId: this.tarading_list.coinId,
					currencyPair: this.tarading_list.currencyPair,
					userId: this.tarading_list.userId,
					firstAmount: this.tarading_list.firstAmount,
					leverageMultiple: this.tarading_list.leverageMultiple,
					strategyKind: 1,
					exchange: 2,
					makeNumber: this.tarading_list.makeNumber,
					timeNumber: 4,
					timeType: 'HOUR',
				}
				tradingApi.emaStart(data, this.period).then(res => {
					this.$toast(res.msg)
					if (res.code == 200) {
						uni.navigateTo({
							url: '/pages/consult/my-simulate'
						})
					}
				})
			} else if (this.tacticsType == 3) {
				if (this.tarading_list.firstAmount <= 0) return this.$toast('开仓额度需大于零');
				if (this.tarading_list.makeNumber <= 0) return this.$toast('补仓次数需大于零');
				if (this.tarading_list.gridHigh <= 0) return this.$toast('网格高度需大于零');
				let data = {
					coinId: this.tarading_list.coinId,
					currencyPair: this.tarading_list.currencyPair,
					userId: this.tarading_list.userId,
					timeFrame: this.period,
					firstAmount: this.tarading_list.firstAmount,
					leverageMultiple: this.tarading_list.leverageMultiple,
					exchange: 2,
					strategyKind: 3,
					gridHigh: this.tarading_list.gridHigh / 100, //网格高度
					makeNumber: this.tarading_list.makeNumber, //补仓次数
					priceHigh: this.tarading_list.priceHigh, //价格上限
					priceLow: this.tarading_list.priceLow, //价格下限
					windControl: this.tarading_list.windControl, //风险控制
				}
				tradingApi.gridStart(data, this.period).then(res => {
					this.$toast(res.msg)
					if (res.code == 200) {
						uni.navigateTo({
							url: '/pages/consult/my-simulate'
						})
					}
				})
			} else if (this.tacticsType == 4) {
				if (!this.tarading_list.firstAmount || this.tarading_list.firstAmount <= 0) {
					this.$toast('开仓额度不能小于0');
					return
				}
				if (this.tarading_list.checkSurplusProportion < 0) {
					this.$toast('止盈比例不能小于0');
					return
				}
				if (this.tarading_list.checkSurplusCallBack < 0) {
					this.$toast('止盈回调不能小于0');
					return
				}
				if (this.tarading_list.makeNumber < 0) {
					this.$toast('做单数量不能小于0');
					return
				}
				if (this.tarading_list.single == 1) {
					if (this.tarading_list.singleNum < 0) {
						this.$toast('开启尾单数不能小于0');
						return
					}
				}
				if (this.tarading_list.strategyType == 1) {
					if (this.tarading_list.loopInterval < 0) {
						this.$toast('循环间隔不能小于0');
						return
					}
				}
				let data = {
					coinId: this.tarading_list.coinId,
					currencyPair: this.tarading_list.currencyPair,
					userId: this.tarading_list.userId,
					timeFrame: this.period,
					firstAmount: this.tarading_list.firstAmount,
					leverageMultiple: this.tarading_list.leverageMultiple,
					exchange: 2,
					strategyKind: 4,
					makeNumber: this.tarading_list.makeNumber,
					checkSurplusProportion: this.tarading_list.checkSurplusProportion/100,
					checkSurplusCallBack: this.tarading_list.checkSurplusCallBack/100,
					single: this.tarading_list.single,
					singleNum: this.tarading_list.singleNum,
					strategyType: this.tarading_list.strategyType,
					loopInterval: this.tarading_list.loopInterval,
				}
				data.addPosSet= this.tarading_list.addPosSet.map(item=>{
					item.addPosCallback=item.addPosCallback/100
					item.addPosFall=item.addPosFall /100
					return item
					})
					data.addPosSet=data.addPosSet.slice(0,this.tarading_list.makeNumber)
				tradingApi.singleStart(data, this.period).then(res => {
					this.$toast(res.msg)
					if (res.code == 200) {
						uni.navigateTo({
							url: '/pages/consult/my-simulate'
						})
					}
				})

			}




			// if(this.tailSingle){
			// 	if(this.form.tailSingle<2){
			// 		return this.$toast('尾单止盈开始单数要大于1');
			// 	}
			// }else{
			// 	this.form.tailSingle=0
			// }
			// if(this.form.doSingleNumber < 1) return this.$toast('做单数量不能设置为1');
			// if(this.form.checkSurplusProportion == 0) return this.$toast('全仓止盈比例不能设置为0'); 
			// if(this.form.profitCallback == 0) return this.$toast('全仓止盈回调不能设置为0');
			// // if(this.form.coverTheCallback == 0) return this.$toast('补仓回调不能设置为0');
			// if(!JSON.parse(uni.getStorageSync('user')).activeStatus) return this.$toast('用户未激活无法进行操作');
			// if(this.$store.state.exchange==1){
			// 	if(this.form.firstSingleLines<10) return this.$toast('首单额度不能低于最低额度10USDT');
			// }else{
			// 	if(this.form.firstSingleLines<6) return this.$toast('首单额度不能低于最低额度6USDT');
			// }

			// // let arr=[]
			// // for (let i = 0; i < this.form.doSingleNumber; i++) {
			// // 	arr[i]=this.form.marginDeclines[i]
			// // }
			// // this.form.marginDeclines=arr
			// this.form.doubling=this.doubling?this.form.doubling:0
			// this.form.windControl=this.windControl?1:0
			// this.form.type=this.policyType
			// this.form.marginDeclines=this.form.marginDeclines.slice(0,this.form.doSingleNumber)
			// this.form.marginMultiples=this.form.marginMultiples.slice(0,this.form.doSingleNumber)
			// this.form.marginCallbacks=this.form.marginCallbacks.slice(0,this.form.doSingleNumber)
			// if(this.trandType){
			// 	this.More()
			// }else{
			// 	this.single()
			// }

		}
	}
</script>


<style lang="scss" scoped>
	.setting {
		padding-top: 30rpx;

		.first {
			padding: 30rpx;
			margin-bottom: 20rpx;

			.setting-tips {
				display: block;
				color: #B0BEC8;
				font-size: 22rpx;
			}

			.tips {
				font-size: 22rpx;
				color: #E4545E;
			}

			.first-line {
				display: flex;
				width: 400rpx;
				height: 50rpx;
				align-items: center;
				// justify-content: space-between;
				margin-top: 10rpx;

				>text {
					display: block;
					width: 140rpx;
					font-size: 28rpx;
				}

				.myinput {
					width: 80px;
					// height: 50rpx;
					// background-color: rgba(192, 222, 238, 0.24);
					// line-height: 50rpx;
				}
			}
		}

		.setting-in {
			padding: 0 30rpx;
			margin-bottom: 20rpx;

			.click-time {
				font-size: 16rpx;
				color: #666;
				margin-top: -20rpx;
				text-align: right;
			}

			.setting-list {
				display: flex;
				align-items: center;
				justify-content: space-between;
				padding: 23rpx 0;

				/deep/ .u-item-text {
					width: 100rpx;
					text-align: center;
					justify-content: center;
				}

				.myinput {
					width: 100rpx;
					// background-color: rgba(192, 222, 238, 0.24);
				}

				>text {
					display: block;
					flex: 3;
					font-size: 28rpx;
				}

				.input {
					flex: 2;
					display: flex;
					align-items: center;

					>text {
						font-size: 28rpx;
						width: 86rpx;
						display: inline-block;
						text-align: right;
					}
				}

				.icon {
					font-size: 26rpx;
					margin-right: 18rpx;
				}

				.margin-settings {
					background: #FFFFFF;
					border: 1rpx solid #B0BEC8;
					border-radius: 10rpx;
					font-size: 24rpx;
					padding: 10rpx 10rpx 10rpx 40rpx;

					.icon {
						font-size: 30rpx;
						margin-right: 0;
						margin-left: 15rpx;
					}
				}

				.cancelBtn {
					background-color: rgba(255, 118, 0, 0.66);
					padding: 9rpx 15rpx;
				}

				.btns {
					.btn-item {
						width: 110rpx;
						height: 50rpx;
						font-size: 13rpx;
						line-height: 50rpx;
						margin-left: 8rpx;
						padding: 0;
					}

					.btn-item-s {
						width: 80rpx;
						height: 50rpx;
						font-size: 13rpx;
						line-height: 50rpx;
						margin-left: 8rpx;
						padding: 0;
					}
				}
			}

			.setting-list-bottom {
				border-bottom: 1rpx solid #0A2E6F;
			}

			.setting-list-one {
				border-top: none;
				// padding-bottom: 0;
			}

			.settingBtn {
				width: 368rpx;
				height: 90rpx;
				border-radius: 8rpx;
				color: #FFFFFF;
				background: $uni-color-theme;
				margin-top: 55rpx;

				&::after {
					border: none;
				}
			}
		}

		.margin-in {
			padding-bottom: 55rpx;
		}
	}

	/deep/.uni-input-input {
		color: #279FFF !important;
		text-align: center;
	}
</style>
