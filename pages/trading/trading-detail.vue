<template>
	<view>
		<u-navbar back-icon-color="#fff" :background="{background:'rgba(220,38,38,0)'}" :border-bottom='false'>
			<template #right>
				<view class="navbar-rigth" @click="NavigationBarButton">交易记录</view>
			</template>
		</u-navbar>
		<view class="detail-header">
			<view class="header-title">{{form.coinName||'xxx-USDT' }}永续
				<!-- <text v-if="form.userTransactionStrategy.tradeType">{{form.userTransactionStrategy.tradeType?'交易循环':'单次交易'}}</text> -->
				<!-- <text v-else>{{tradeType?'交易循环':'单次交易'}}</text> -->
				<text v-if="strategyType!=1">{{ TradeCoin_List.strategyType ? '循环策略':'单次策略'}}</text>
			</view>
			<view class="money-usdt">
				<view class="money-list">
					<view class="list-top">
						<text>{{form.userDealContractInfo? form.userDealContractInfo.profitCallback : '0.0000' |numFilter(8)}}</text>
						<text>持仓量</text>
					</view>
					<view class="list-top">
						<text>{{form.userDealContractInfo? form.userDealContractInfo.doSingleNumber : '0.0000'  |numFilter(8)}}</text>
						<text>开仓均价</text>
					</view>

					<view class="list-top">
						<text>{{form.currentPrice || '0.0000' |numFilter(8)}}</text>
						<!-- <text>{{form.userDealInfo.checkSurplusProportion || '0'}}</text> -->
						<text>当前价格</text>
					</view>
				</view>
				<view class="money-list">
					<view class="list-top">
						<text>{{form.positionValue || '0.0000' |numFilter(8)}}</text>
						<text>持仓价值</text>
					</view>
					<view class="list-top">
						<text>{{form.profit || '0.0000' |numFilter(8)}}</text>
						<text>收益(USDT)</text>
					</view>
					<view class="list-top">
						<text>{{form.rose || '0.00%'}}</text>
						<text>涨幅</text>
					</view>
				</view>
				<!-- <view class="money-list">
					<view class="list-top">
						<text>{{form.userTransactionStrategy.tailSingle || '0'}}</text>
						<text>尾单止盈开始单数</text>
					</view>
					<view class="list-top">
						<text>{{form.tailSingleAvgPrice || '0.00'}}</text>
						<text>尾单止盈均价</text>
					</view>
				</view> -->
			</view>
		</view>
		<view class="detail-content">
			<view class="LittleBg">
				<view class="trade-related">
					<view class="trade-title">
						<text class="iconfont">&#xe613;</text>
						<text>交易相关</text><text class="zhucang">
						<!-- {{ strategyType==0?'原有的策略':strategyType==1?'EMA':strategyType==2?'SAR':strategyType==3?'网格策略':strategyType==4?'尾单止盈':''}} -->
						{{ TradeCoin_List.strategyKind ? TradeCoin_List.strategyKind.toUpperCase() : 'EMA'}}
						</text>
						<text class="single-check" v-if="form.userTransactionStrategy.tailSingle>0">尾单止盈</text>
					</view>
				</view>
				<view class="related">
					<view class="related-info"  v-if="strategyType!='1'">账户仓位
						<text>{{$store.state.Account_positions || '0'|numFilter(4)}}</text>
					</view>
					<view class="related-info"  v-if="strategyType!='1'&&strategyType!='3'&&TradeCoin_List.fristPositionType==1">开仓比例<text>{{TradeCoin_List.fristPositionProportion || '0'}}%</text></view>
					<view class="related-info"  v-if="strategyType!='1'&&TradeCoin_List.fristPositionType==2">开仓数量<text>{{TradeCoin_List.fristPositionNumber || '0'}}</text></view>	
					<view class="related-info" >杠杆倍数 <text>{{TradeCoin_List.leverageMultiple || '0'}}</text></view>
					<view class="related-info" v-if="strategyType=='1'">买入金额 <text>{{TradeCoin_List.amount || '0'}}</text></view>
					<view class="related-info" v-if="strategyType=='1'">做单次数 <text>{{TradeCoin_List.orderNum || '0'}}</text></view>
					<view class="related-info" v-if="strategyType!='1'">交易类型 <text>{{form.userDealContractInfo ? 
					form.userDealContractInfo.orderType ? '做空' : '做多' : '--'}}</text>
					</view>
					<view class="related-info"  v-if="strategyType!='1'&&strategyType!='3'">止盈比例 <text>{{strategyType=='4'?TradeCoin_List.surplusProportion:TradeCoin_List.checkSurplusProportion || '0'}}%</text>
					</view>
					<view class="related-info"  v-if="strategyType=='0'||strategyType=='2'">卖出比例 <text>{{TradeCoin_List.sellProportion || '0'}}%</text></view>
					<view class="related-info" v-if="TradeCoin_List.strategyType">循环间隔
						<text>{{TradeCoin_List.loopInterval || '0'}} 秒</text>
					</view>
					<!-- <view class="related-info" v-if="strategyType!='1'">循环时间 <text>{{TradeCoin_List.checkSurplusProportion || '0'}}秒</text>
					</view> -->
					<view class="related-info" v-if="strategyType=='4'" >补仓次数
						<text>{{TradeCoin_List.addPosCount || '0'}} </text>
					</view>
					<view class="related-info" v-if="strategyType=='4'" >补仓跌幅
						<text>{{addPosFall|| '0'}}% </text>
					</view>
					<view class="related-info" v-if="strategyType=='4'" >补仓回调
						<text>{{addPosCallback|| '0'}}% </text>
					</view>
					
					<view class="related-info" v-if="strategyType=='3'" >网格高度
						<text>{{TradeCoin_List.gridHigh*100 || '0'}} %</text>
					</view>

				</view>
			</view>
			<view class="LittleBg">
				<view class="trade-related">
					<view class="trade-title">
						<text class="iconfont">&#xe613;</text>
						<text>交易操作</text>
						<u-button class="submitBtn btnall" v-if="strategyType!=1" v-show="TradeCoin_List.flagStart == 1 &&  TradeCoin_List.strategyType == 1 " @click="maskShow('循环模式')">停止交易</u-button>
						<u-button class="submitBtn btnall" v-if="strategyType==1" v-show="TradeCoin_List.state==1" @click="maskShow('停止')">停止交易</u-button>
					</view>
					<!-- <view>
						<text v-if="this.flagStart==1" class="stop" @click="maskShow('停止补单')">停止补单</text>
						<text v-if="this.flagStart==2" class="open" @click="maskShow('开启补单')">开启补单</text>
					</view> -->
				</view>
				<view class="operation">
					<!-- <view class="operation-info" v-if="tradeType" @click="updateStrategyMode">
						<image src="/static/trading/icon_dancijiaoyi.png" mode="widthFix"></image><text>单次交易</text>
					</view> -->
					<view class="operation-info" @click="maskShow('循环模式')" v-if="strategyType!='1'&&strategyType!='3'">
						<image src="/static/trading/xunhuan.png" mode="widthFix"></image>
						<text>{{TradeCoin_List.strategyType ? '单次交易' : '循环模式'}}</text>
					</view>
					<!-- <view class="operation-info" v-else @click="updateStrategyMode">
						<image src="/static/home/icon_jiaoyixunhuan.png" mode="widthFix"></image><text>交易循环</text>
					</view> -->
					
					<view class="operation-info" @click="maskShow('清仓卖出')">
						<image src="/static/trading/icon_qingcangmaichu.png" mode="widthFix"></image><text>清仓卖出</text>
					</view>
					
					<view class="operation-info"  v-if="strategyType!=1" v-show="TradeCoin_List.flagStart == 1"  @click="manualShow=!manualShow">
						<image src="/static/trading/yijianbucang.png" mode="widthFix"></image><text>手动补仓</text>
					</view>
				</view>
			</view>

			<view class="Btn">
				<u-button class="submitBtn btnall" @click="setting">交易设置</u-button>
				<u-button class="submitBtn btnall" @click="maskShow('开始')" v-if="strategyType!=1"	v-show="TradeCoin_List.flagStart != 1">开始</u-button>
				<u-button class="submitBtn btnall" @click="maskShow('开始')" v-if="strategyType==1"	v-show="TradeCoin_List.state != 1">开始</u-button>
			</view>
		</view>
		<trading-mask :title='maskTitle' :content='maskContent' :show='Show' @cancel="Show=false" @affirm="Affirm">
		</trading-mask>
		<u-mask :show="repairShow" @click="repairShow = false">
			<view class="warp">
				<view class="rect LittleBg" @tap.stop>
					<view class="title" v-if="TradeCoin_List.strategyType">单次交易</view>
					<view class="title" v-else>循环模式</view>
					<view class="title" style="font-size: 24rpx;" v-if="!TradeCoin_List.strategyType">请设置间隔时间</view>
					<view class="inputCode" v-if="!TradeCoin_List.strategyType">
						<!-- <view>数量：</view> -->
						<u-input class="input" v-model="setTime" type="number" :placeholder="'请输入间隔时间'" /> 秒
					</view>
					<view class="rect-btn">
						<u-button class="cancelbtn" @click="repairShow = false">取消</u-button>
						<u-button class="affirmbtn" @click="confirm">确认</u-button>
					</view>
				</view>
			</view>
		</u-mask>
		<u-popup v-model="manualShow" mode="bottom" border-radius="24">
			<view class="manual-box">
				<view class="manual-title">
					手动补仓
				</view>
				<view class="manual-item">
					<view class="manual-left">当前价格(USDT)</view>
					<view class="manual-right">{{form.currentPrice || '0.0000' |numFilter(8)}}</view>
				</view>
				<view class="manual-item">
					<view class="manual-left">账户余额</view>
					<view class="manual-right">{{userFee|numFilter(4)||0}}</view>
				</view>
				<view class="num-title">金额</view>
				<view class="num-input">
					<input type="number" v-model="coverAmount"  />
					<view class="num-text">USDT</view>
				</view>
				<view class="manual-bili">
					<view :class="['bili-item',item.ifcheck ? 'bili-check' :'']" @click="proportionNum(item,index)"
						v-for="(item,index) in proportionList" :key="index" >{{item.text}}</view>
					<!-- <view class="bili-item ">25%</view>
					<view class="bili-item">25%</view>
					<view class="bili-item">25%</view> -->
				</view>
				<view class="manual-btn" @click="addPosition">
					确认
				</view>
			</view>
		</u-popup>
	</view>
</template>

<script>
	import {
		tradingApi
	} from '@/api/myAjax.js'
	export default {
		data() {
			return {
				proportionList:[
					{text:'25%',num:0.25,ifcheck:false},
					{text:'50%',num:0.50,ifcheck:false},
					{text:'75%',num:0.75,ifcheck:false},
					{text:'100%',num:1,ifcheck:false}
				],
				coverAmount:'',
				userFee:0,
				repairShow: false,
				repairNum: '',
				coinName: 'XXX',
				tradeType: false,
				coinType: ['单次交易', '交易循环', '补单'],
				isOpen: true,
				Show: false,
				maskType: '',
				maskTitle: '',
				maskContent: '',
				form: {
					userDealInfo: {},
					userTransactionStrategy: {
						flagStart: 0
					}
				},
				coin: {},
				TradeCoin: {},
				flagStart: 0,
				Interval: null,
				TradeCoin_List: [],
				setTime: '', //设置循环时间
				strategyType:'',//策略类型 0=>原策略 1=>EMA 2=> SAR 3=>网格 4=>尾单
				currencyPair:'',
				manualShow:false,//手动补仓弹窗
				addPosCallback:'',//补仓回调
				addPosFall:''//补仓跌幅
			};
		},
		watch:{
			repairShow(type){
				if(!type) this.setTime = ''
			}
		},
		onLoad(options) {
			if (!uni.getStorageSync('userToken')) {
				let obj = JSON.parse(options.id)
				this.form.userDealInfo = {}
				this.form.userTransactionStrategy = {}
				this.form.coinName = obj.currencyPair
				this.coinName = this.form.coinName.split('-')[0]
				this.form.currentPrice = obj.amount
				this.form.rose = obj.lowest
				return
			}
			console.log('22222',options);
			this.currencyPair = options.currencyPair.split('USDT')[0] + '-USDT'
			this.coin = JSON.parse(options.id)
			this.strategyType = options.strategyType
		},
		onShow() {
			this.queryUserPosition()
			this.getUserFee()
			
			if(this.strategyType==0&&this.strategyType==2){
				this.UserTradeCoin()
			}else if(this.strategyType==1){
				this.emaUserTradeCoin()
			} 
			else if(this.strategyType==3){
				this.getGridStrategy()
			} 
			else if(this.strategyType==4){
				this.getStopProfitStrategy()
			} 
		
		},
		onUnload() {
			clearTimeout(this.Interval)
		},
		onHide() {
			clearTimeout(this.Interval)
		},
		methods: {
			//获取网格
			getGridStrategy(){
				let param={
					userId: JSON.parse(uni.getStorageSync('user')).id,
					coinId: this.coin.coinId,
				}
				tradingApi.getGridStrategy(param).then(res=>{
					res.data.firstPositionProportion = (res.data.firstPositionProportion * 1000000)/10000
					res.data.addPositionProportion = (res.data.addPositionProportion * 1000000)/10000
					this.TradeCoin_List=res.data
				})
			},
			//获取尾单
			getStopProfitStrategy(){
				let param={
					userId: JSON.parse(uni.getStorageSync('user')).id,
					coinId: this.coin.coinId,
				}
				tradingApi.getStopProfitStrategy(param).then(res=>{
						res.data.firstPositionProportion = (res.data.firstPositionProportion * 1000000)/10000
										res.data.surplusProportion = (res.data.surplusProportion * 1000000)/10000
										res.data.callbackProportion = (res.data.callbackProportion * 1000000)/10000
						        res.data.addPosSet= res.data.addPosSet.map(item=>{
							      item.addPosCallback=item.addPosCallback * 1000000/10000
							      item.addPosFall=item.addPosFall * 1000000/10000
							      return item
						})
					this.TradeCoin_List=res.data
					this.addPosCallback=this.TradeCoin_List.addPosSet[Number(this.TradeCoin_List.addPosCount)-1].addPosCallback
					this.addPosFall=this.TradeCoin_List.addPosSet[Number(this.TradeCoin_List.addPosCount)-1].addPosFall
		
					
				})
			},
			//获取账户余额
			getUserFee(){
				tradingApi.getFreeBalanceOkey().then(res=>{
					if(res.code == 200){
						console.log(res);
						this.userFee = res.data
						this.$store.commit('getAccount_positions',res.data)
					}
				})
			},
			//手动补仓
			addPosition(){
				if(this.coverAmount<=0)return this.$toast('请输入补仓金额')
				console.log(this.coverAmount,this.userFee,Number(this.coverAmount)>Number(this.userFee));
				if(Number(this.coverAmount)>Number(this.userFee))return this.$toast('补仓金额大于账户余额')
				tradingApi.addPosition({
					number:this.coverAmount,
					strategyId:this.form.userTransactionStrategy.id,
					type:this.strategyType==3?4:this.strategyType==4?5:1
				}).then(res=>{
					console.log('手动补仓回调',res)
					this.getUserFee()
					if(res.code == 200){
						this.$toast('操作成功')
						this.manualShow = false
					}else{
						this.$toast(res.msg)
					}
				})
			},
			//选择比例
			proportionNum(item,index){
				if(this.proportionList[index].ifcheck){
					this.proportionList[index].ifcheck = false
					this.coverAmount = ''
				}else{				
					this.coverAmount = (this.userFee * item.num).toFixed(4)
					this.proportionList.map((v,i)=>{
						return v.ifcheck = index == i
					})
				}
			},
			//设置循环模式
			confirm() {
				console.log('设置循环模式');
				this.updateStrategyMode();
			},
			//弹框
			maskShow(type) {
				// if(!uni.getStorageSync('userToken')){
				// 	return this.$toast('请先进行登录')
				// }
				// if (!JSON.parse(uni.getStorageSync('user')).activeStatus) {
				// 	return this.$toast('用户未激活无法进行操作')
				// }
				this.maskTitle = type
				if (type == '清仓卖出') {
					if(this.form.userDealContractInfo&&this.form.userDealContractInfo.profitCallback>0){
						this.maskContent = '按照当前价格，卖出所有资产，确定清仓吗？'
						this.Show = true				
					}else{
						this.$toast('持仓量不足')
					}
				} else if (type == '停止补单') {
					this.maskContent = `您确定停止补单吗？`
					this.Show = true
				} else if (type == '开始') {
					if(this.form.userDealContractInfo&&this.form.userDealContractInfo.profitCallback>0){
						this.$toast('交易已经开始')
					}else{
						console.log(1);
						this.maskContent = `您确定开始吗？`
						this.Show = true	
					}
				} else if (type == '停止') {
					this.maskContent = `您确定停止吗？`
					this.Show = true
				} else if (type == '开启补单') {
					this.maskContent = `您确定开启补单吗？`
					this.Show = true
				} else if (type == '循环模式') {
					return this.repairShow = true
				} else if (type == '停止交易') {
					return this.repairShow = true
				}
			},
			//确认
			Affirm() {
				this.Show = false
				if (this.maskTitle == '开始') {
					if(this.strategyType==0||this.strategyType==2){
						//原策略
						this.startTradingStart()						
					}else if(this.strategyType==1){
						//EMA
						this.emaStartTradingStart()
					}else if(this.strategyType==3){
						this.startGridOrder()
					}
					else if(this.strategyType==4){
						this.startLastStopLastOrder()
					}
					
				} else if (this.maskTitle == '清仓卖出') {
					this.saleAll()
					// this.$toast('调用清仓卖出接口')
				} else if (this.maskTitle == '停止补单') {
					// this.flagStart=2
					this.updateFlagStart(2)
					// this.$toast('调用停止补单接口')
				} else if (this.maskTitle == '开启补单') {
					// this.flagStart=1
					this.updateFlagStart(1)
					// this.$toast('调用开启补单接口')
				} else if (this.maskTitle == '停止') {
					if(this.strategyType!=1){
						//原策略
						this.updateFlagStart(5)					
					}else{
						//EMA
						this.emaStartTradingStart()
					}
				}
			},
			//尾单交易启动
			startLastStopLastOrder(){
				if (!this.form.userTransactionStrategy.id) return this.$toast('无法开始交易，请先设置交易策略')
				tradingApi.startLastStopLastOrder(
				{
					strategyId:this.form.userTransactionStrategy.id,
				 userId:this.$store.state.userInfo.id,
				}).then(res=>{
					if (res.code == 200) {
						this.$toast('操作成功')
						setTimeout(() => {
							uni.navigateBack({
								delta: 1
							})
						}, 1000)
					} else {
						if (res.msg.substring(0, 4) == '下单出错') {
							return this.$toast('账户余额不足，无法启动交易，请及时充值')
						}
						this.$toast(res.msg)
					}
				})
			},
			//网格交易启动
			startGridOrder(){
				if (!this.form.userTransactionStrategy.id) return this.$toast('无法开始交易，请先设置交易策略')
				tradingApi.startGridOrder({
					strategyId: this.form.userTransactionStrategy.id,
				 userId:this.$store.state.userInfo.id,
				}).then(res=>{
					if (res.code == 200) {
						this.$toast('操作成功')
						setTimeout(() => {
							uni.navigateBack({
								delta: 1
							})
						}, 1000)
					} else {
						if (res.msg.substring(0, 4) == '下单出错') {
							return this.$toast('账户余额不足，无法启动交易，请及时充值')
						}
						this.$toast(res.msg)
					}
				})
			},
			updateFlagStart(flagStart) {
				tradingApi.updateFlagStart({
					strategyId: this.form.userTransactionStrategy.id,
					// userId:this.$store.state.userInfo.id,
					// coinId:this.coin.coinId,
					flagStart: flagStart,
					// exchange:this.$store.state.exchange
				}).then(res => {
					if (res.code == 200) {
						this.flagStart = this.flagStart == 1 ? 2 : 1
						this.$toast('操作成功')
						if (this.maskTitle == '停止') {
							uni.navigateBack({
								delta: 1
							})
						}
					} else {
						if (res.msg.substring(0, 4) == '下单出错') {
							if (this.maskTitle == '停止') {
								return this.$toast('账户余额不足，无法停止交易，请及时充值')
							}
							return this.$toast(`账户余额不足，无法${this.maskTitle}，请及时充值`)
						}
						this.$toast(res.msg)
					}
				})
			},
			//交易开始/停止=>EMA
			emaStartTradingStart(){
				tradingApi.stopUserStrategy({currencyPair:this.currencyPair}).then(res=>{
					console.log('ema开关',res);
					if(res.code == 200){
						this.$toast('操作成功')
						this.emaUserTradeCoin()
					}else{
						this.$toast(res.msg)
					}
				})
			},
			//交易开始
			startTradingStart() {
				if (!this.form.userTransactionStrategy.id) return this.$toast('无法开始交易，请先设置交易策略')
				tradingApi.startTradingStart({
					// userId:this.$store.state.userInfo.id,
					strategyId: this.form.userTransactionStrategy.id,
					// exchange:this.$store.state.exchange
				}).then(res => {
					if (res.code == 200) {
						this.$toast('操作成功')
						setTimeout(() => {
							uni.navigateBack({
								delta: 1
							})
						}, 1000)
					} else {
						if (res.msg.substring(0, 4) == '下单出错') {
							return this.$toast('账户余额不足，无法启动交易，请及时充值')
						}
						this.$toast(res.msg)
					}
				})
			},
			//清仓卖出
			saleAll() {
				console.log(this.form.userTransactionStrategy.id)
				tradingApi.saleOne({
					// userId: this.$store.state.userInfo.id,
					strategyId: this.form.userTransactionStrategy.id,
					// exchange: 2
					type:this.strategyType==3?4:this.strategyType==4?5:1
				}).then(res => {
					if (res.code == 200) {
						this.$toast('操作成功')
						setTimeout(() => {
							uni.navigateBack({
								delta: 1
							})
						}, 1000)
					} else {
						if (res.msg.substring(0, 4) == '下单出错') {
							return this.$toast('账户余额不足，无法清仓卖出，请及时充值')
						}
						this.$toast(res.msg)
					}
				})
			},
			//交易设置
			setting() {
				if (!uni.getStorageSync('userToken')) {
					return this.$toast('请先进行登录')
				}
				uni.navigateTo({
					url: "/pages/trading/trade-setting?id=" + this.coin.coinId + '&coinName=' + this.form.coinName + '&strategyType=' + this.strategyType
				})
			},

			//交易记录
			NavigationBarButton() {
				if (!uni.getStorageSync('userToken')) {
					return this.$toast('请先进行登录')
				}
				// let type = this.form.coinName.split('-')[0] + this.form.coinName.split('-')[1]
				let type = this.form.coinName
				type = type.toLocaleLowerCase()
				console.log(type);
				uni.navigateTo({
					url: "/pages/trading/trading-record?type=" + type
				})
				// this.$toast('点击导航栏交易记录按钮')
			},
			//修改币种交易设置模式
			updateStrategyMode() {
				if (!uni.getStorageSync('userToken')) {
					return this.$toast('请先进行登录')
				}
				// if (!JSON.parse(uni.getStorageSync('user')).activeStatus) {
				// 	return this.$toast('用户未激活无法进行操作')
				// }
				if (!this.TradeCoin_List.strategyType) {
					if (this.setTime < 1) {
						return this.$toast('循环时间不能小于0')
					}
				}
				console.log(this.setTime);
				console.log(this.TradeCoin_List.strategyType);
				tradingApi.updateStrategyMode({
					userId: this.$store.state.userInfo.id,
					coinId: this.coin.coinId,
					// strategy: this.tradeType ? 0 : 1
					strategy: this.TradeCoin_List.strategyType ? 0 : 1,
					type: Number(this.strategyType)+1,
					loopInterval: this.setTime
				}).then(res => {
					if (res.code == 200) {
						this.$toast('切换成功')
						this.repairShow = false
						this.UserTradeCoin()
					} else {
						this.$toast(res.msg)
					}
				})
			},
			//获取持仓数据
			queryUserPosition() {
				tradingApi.queryUserPosition({
					// userId:this.$store.state.userInfo.id,
					userId: JSON.parse(uni.getStorageSync('user')).id,
					coinId: this.coin.coinId,
					type: Number(this.strategyType)+1,
					exchange: 2
				}).then(res => {
					 console.log(res, '获取持仓数据');
					if (res.data) {
						let key = this.strategyType == 0 ? 'userStrategyBase' : 
						this.strategyType == 1 ? 'userDto' : 
						this.strategyType == 2 ? 'userStrategySar' : this.strategyType == 3?'gridStrategy':
						this.strategyType == 4?'stopProfitStrategy':''
						console.log("222222",key)
						this.form = res.data
						this.form.userDealInfo = res.data.userDealInfo || {}
						this.form.userTransactionStrategy = res.data[key] || {
							flagStart: 0
						}
						console.log(this.form.userTransactionStrategy.id)
						//this.flagStart = this.form[key].flagStart
						this.coinName = this.form.coinName.split('-')[0]
						this.tradeType = res.data.strategy ? true : false
						this.currencyPair = this.form.coinName.split('USDT')[0] + '-USDT'
					}
					this.Interval = setTimeout(() => {
						this.queryUserPosition()
					}, 5000)
				})
			},
			//获取交易设置=>EMA
			emaUserTradeCoin(){
				tradingApi.getUserStrategy({currencyPair:this.currencyPair}).then(res=>{
					if(res.code==200){
						this.TradeCoin_List = res.data
					}else{
						this.$toast(res.msg)
					}
				})
			},
			//获取交易设置
			UserTradeCoin() {
				tradingApi.UserTradeCoin({
					userId: JSON.parse(uni.getStorageSync('user')).id,
					coinId: this.coin.coinId,
					type: Number(this.strategyType)+1,
				}).then(res => {
						console.log(111111111111111,res);
					if(res.code == 200 && res.data.id){
						this.TradeCoin_List = res.data
						uni.setStorageSync('coinList', res.data.coinId)
						this.TradeCoin_List.checkSurplusProportion = (this.TradeCoin_List.checkSurplusProportion * 1000000)/10000
						this.TradeCoin_List.fristPositionProportion = (this.TradeCoin_List.fristPositionProportion * 1000000)/10000
						this.TradeCoin_List.sellProportion = (this.TradeCoin_List.sellProportion * 1000000)/10000
					}
				})
			},
		},

	}
</script>

<style lang="scss" scoped>
	.navbar-rigth {
		margin-right: 30rpx;
		font-size: 24rpx;
		color: #fff;
	}

	.detail-header {
		color: #fff;
		padding: 0 38rpx;
		margin-top: calc(-90rpx - var(--status-bar-height));
		padding-top: calc(100rpx + var(--status-bar-height));
		padding-bottom: 40rpx;
		min-height: 540rpx;
		background: url(/static/trading/pic_jiaoyixiangqing.png) no-repeat;
		background-size: 100% 100%;

		.header-title {
			width: 100%;
			display: flex;
			align-items: center;
			font-size: 46rpx;
			font-family: Source Han Sans SC;
			font-weight: 500;

			>text {
				margin-left: 30rpx;
				padding: 4rpx 15rpx;
				background: #FF9327;
				border-radius: 10rpx;
				color: #fff;
				font-size: 24rpx;
			}
		}

		.money-usdt {
			margin-top: 44rpx;

			.money-list {
				display: flex;
				justify-content: space-between;
				text-align: center;
				background: rgba(255, 255, 255, .1);
				padding: 20rpx;
				border-radius: 16rpx;
				margin-bottom: 22rpx;

				.list-top {
					flex: 1;
					display: flex;
					flex-direction: column;
					align-items: center;

					>text {
						font-size: 34rpx;
						font-family: Source Han Sans SC;
						font-weight: 500;

						&:last-child {
							margin-top: 5rpx;
							font-size: 24rpx;
							font-weight: 300;
							color: rgba(255, 255, 255, .8);
						}
					}
				}
			}
		}
	}

	.detail-content {
		padding: 26rpx 21rpx;

		.trade-related {
			padding: 55rpx 20rpx 0;
			// padding-top: 55rpx;
			// height: 40rpx;
			// line-height: 40rpx;
			font-size: 28rpx;
			// margin-bottom: 24rpx;
			display: flex;
			justify-content: space-between;

			.trade-title {
				display: flex;
				align-items: center;

				.iconfont {
					font-size: 32rpx;
					margin-right: 20rpx;
					color: #279FFF;
				}

				.single-check {
					margin-left: 25rpx;
					padding: 1rpx 12rpx;
					border: 1rpx solid #FF9327;
					color: #FF9327;
					border-radius: 10rpx;
				}
				.btnall{
					width: 200rpx;
					height: 50rpx !important;
					// border-radius: 66rpx;
					color: #FFFFFF;
					margin-left: 280rpx;
				}
			}

			.open,
			.stop {
				padding: 8rpx 30rpx;
				border-radius: 8rpx;
				color: #fff;
			}

			.open {
				background: #00B9FF;
			}

			.stop {
				background: #3F63F5;
			}
		}

		.related {
			margin-bottom: 26rpx;
			padding: 12rpx 0 40rpx;
			padding-left: 80rpx;
			display: flex;
			flex-wrap: wrap;

			.related-info {
				width: 50%;
				margin-top: 28rpx;
				display: flex;

				>text {
					flex: 1;
					word-break: break-all;
					margin-left: 20rpx;
					color: #279FFF;
				}
			}
		}

		.operation {
			padding: 40rpx;
			display: flex;
			justify-content: space-around;

			.operation-info {
				display: flex;
				flex-direction: column;
				align-items: center;
				justify-content: center;

				>image {
					width: 120rpx;
					margin-bottom: 30rpx;
					box-shadow: 3rpx 3rpx 61rpx rgba(180, 191, 197, 0.24);
				}
			}
		}

		.zhucang {
			display: inline-block;
			// width: 122rpx;
			height: 38rpx;
			color: #FF9327;
			font-size: 24rpx;
			margin-left: 25rpx;
			border: 1rpx solid #FF9327;
			border-radius: 8rpx;
			padding: 0 20rpx;
		}
	}

	.Btn {
		display: flex;
		justify-content: space-around;
		margin-top: 44rpx;

		.btnall {
			width: 276rpx;
			height: 70rpx !important;
			// border-radius: 66rpx;
			color: #FFFFFF;

			&::after {
				border: none;
			}
		}

		.settingBtn {
			background: $uni-color-theme;
		}

		.beginBtn {
			background: #FC7B0A;
		}
	}

	.warp {
		display: flex;
		align-items: center;
		flex-direction: column;
		justify-content: center;
		height: 100%;

		.rect {
			width: 600rpx;
			// height: 328rpx;
			padding: 40rpx 50rpx;

			.title {
				font-size: 30rpx;
				text-align: center;
				margin: 0 auto 9rpx;
			}

			.inputCode {
				display: flex;
				align-items: center;

				// margin: 20rpx 0 60rpx;
				.input {
					// border-bottom: 1rpx solid $uni-color-bd !important;
					background: rgba(207, 217, 222, 0.24);
					border-radius: 16rpx;
					margin: 11rpx 10rpx 0;
				}
			}

			.rect-subtitle {
				line-height: 48rpx;
				font-size: 28rpx;
				text-align: center;
				margin: 30rpx 0 34rpx;
				color: #000;
			}

			.rect-btn {
				display: flex;
				justify-content: space-around;
				margin-top: 40rpx;

				.cancelbtn,
				.affirmbtn {
					width: 180rpx;
					height: 60rpx;
					font-size: 28rpx;
					border-radius: 44rpx;

					&::after {
						border: none;
					}
				}

				.cancelbtn {
					border: 1rpx solid #279FFF;
					color: #279FFF;
					border-radius: 16rpx;
				}

				.affirmbtn {
					background: $uni-color-theme;
					color: #fff;
					border-radius: 16rpx;
				}
			}
		}
	}
	.manual-box{
		padding: 35rpx 40rpx 40rpx;
		color: #333333;
		font-size: 24rpx;
		.manual-title{
			font-size: 32rpx;
			font-weight: 600;
			line-height: 45rpx;
			margin-bottom: 18rpx;
		}
		.manual-item{
			display: flex;
			align-items: center;
			justify-content: space-between;
			margin-bottom: 18rpx;
		}
		.num-title{
			font-size: 26rpx;
			font-weight: 600;
			margin-bottom: 18rpx;
			margin-top: 35rpx;
		}
		.num-input{
			height: 60rpx;
			background: #F6F6F6;
			border-radius: 8rpx;
			display: flex;
			align-items: center;
			justify-content: space-between;
			margin-bottom: 32rpx;
			/deep/ .uni-input-input{
				font-weight: 400;
				font-size: 24rpx;
				color: #999999;
			}
			.num-text{
				margin-right: 30rpx;
			}
		}
		.manual-bili{	
			display: flex;
			align-items: center;
			justify-content: space-between;
			.bili-item{
				width: 148rpx;
				height: 60rpx;
				border-radius: 8rpx;
				border: 1rpx solid #6AB9FF;			
				display: flex;
				align-items: center;
				justify-content: center;
				margin-bottom: 42rpx;
			}
			.bili-check{
				border: none;
				background: #6AB9FF;
				color: #fff;
			}
		}
		.manual-predict{
			color: #FF513B;
			margin-bottom: 36rpx;
		}
		.manual-btn{
			width: 574rpx;
			height: 80rpx;
			margin: 0 auto;
			background: #279FFF;
			box-shadow: 0 9rpx 6rpx rgba(152, 218, 245, 0.43);
			border-radius: 8rpx;
			display: flex;
			align-items: center;
			justify-content: center;
			font-size: 30rpx;
			color: #ffffff;
		}
	}
</style>
