<template>
	<view class="trading overBg" id="containerId">
		<!-- <view class="status_bar1">
		</view>
		<view class="status_bar">
		</view> -->
		<view class="currencytype">
	<view @click="currencyCoinType(2)" :class="currencyCoin==2?'active':''" class="okex">Okex</view>
	<!-- <view @click="currencyCoinType(0)" :class="currencyCoin==0?'active':''" class="huobi">Huobi</view> -->
	</view>
		<view class="trading-header">
			<view class="select">
				<!-- <navigator url="/pages/trading/trading">
					<u-icon class="iconfont" name="arrow-down-fill" color="#666872" size="20"></u-icon>
				</navigator> -->
				<u-search placeholder="搜索币种名称" color="#000" bg-color="#f3f4f7" :show-action="false" v-model="keyword"
					@search="onSearch"></u-search>
			</view>
		</view>
		<view class="balance">
			<view class="balance-item balance-left"><!-- jryl.png -->
				<view class="item-top">
					当前账户余额
				</view>
				<view class="item-btm">
					{{$store.state.Account_positions|numFilter(4)||0}}
				</view>
			</view>
			<view class="balance-item balance-right"><!-- ljyl.png -->
				<view class="item-top">
					当前持仓额度
				</view>
				<view class="item-btm">
					{{PositionValue|numFilter(4)||0}}
				</view>
			</view>
		</view>
		<view class="">
			<!-- 市场交易 -->
			<view class=" bazaar">
				<!-- <view class="volume-set">
					<text>当前账户剩余USDT： {{$store.state.Account_positions|numFilter(4)}}</text>
					<text class="text" v-if="volumeSet" @click="checkAll">{{isCheckall?'全不选':'全选'}}</text>
					<text class="text" v-if="volumeSet" @click="showVolume">批量设置</text>
				</view> -->
				<!-- <view class="currency-type">
					<view @click="currencyChange(0)" :class="{active:currencyCurrent==0}">火币</view>
					<view @click="currencyChange(1)" :class="{active:currencyCurrent==1}">币安</view>
				</view> -->
				<u-tabs v-if="strategyType!=1" :list="list" :is-scroll="false" font-size="28" active-color='#333333' inactive-color="#B0BEC8"
					bg-color="transparent" :current="current" @change="change" bar-width="140"></u-tabs>
				<view class="banxin">
					<scroll-view :class="['scroll-view',strategyType!=1?'scroll-height1':'scroll-height2']" scroll-y="true" @scrolltolower="scrollTolower"
						v-if="tradeInfo.length>0">
						<!-- <view class="LittleBg bazaar" v-if="tradeInfo.length"> -->
						<view v-if="current == 0">
							<block v-for="(item,index) in tradeInfo" :key="index">
								<view class="list-type" v-show="(item.currencyPair==keyword)||seletPair">
									<text class="iconfont checkbox-icon" v-show="checkedList[index].checked"
										@click="checkedList[index].checked=false">&#xe8f5;</text>
									<text class="iconfont checkbox-icon2" v-show="!checkedList[index].checked"
										@click="checkedList[index].checked=true">&#xe685;</text>

									<home-transaction ref="child" :item='item' :type='typelist[current]'
										:index='currencyCurrent' :strategyType="strategyType"></home-transaction>
								</view>
							</block>
						</view>
						<view v-if="current == 1">
							<block v-for="(item,index) in tradeInfo" :key="index">
								<view class="list-type" v-show="(item.currencyPair==keyword)||seletPair">
									<text class="iconfont checkbox-icon" v-show="checkedList[index].checked"
										@click="checkedList[index].checked=false">&#xe8f5;</text>
									<text class="iconfont checkbox-icon2" v-show="!checkedList[index].checked"
										@click="checkedList[index].checked=true">&#xe685;</text>
									<home-transaction ref="child" :item='item' :type='typelist[current]'
										:index='currencyCurrent' :strategyType="strategyType"></home-transaction>
								</view>
							</block>
						</view>
						<view v-if="current == 2">
							<block v-for="(item,index) in tradeInfo" :key="index">
								<view class="list-type" v-show="(item.currencyPair==keyword)||seletPair">
									<text class="iconfont checkbox-icon" v-show="checkedList[index].checked"
										@click="checkedList[index].checked=false">&#xe8f5;</text>
									<text class="iconfont checkbox-icon2" v-show="!checkedList[index].checked"
										@click="checkedList[index].checked=true">&#xe685;</text>
									<home-transaction ref="child" :item='item' :type='typelist[current]'
										:index='currencyCurrent' :strategyType="strategyType"></home-transaction>
								</view>
							</block>
						</view>
						<view v-if="current == 3">
							<block v-for="(item,index) in tradeInfo" :key="index">
								<view class="list-type" v-show="(item.currencyPair==keyword)||seletPair">
									<text class="iconfont checkbox-icon" v-show="checkedList[index].checked"
										@click="checkedList[index].checked=false">&#xe8f5;</text>
									<text class="iconfont checkbox-icon2" v-show="!checkedList[index].checked"
										@click="checkedList[index].checked=true">&#xe685;</text>
									<home-transaction ref="child" :item='item' :type='typelist[current]'
										:index='currencyCurrent' :strategyType="strategyType"></home-transaction>
								</view>
							</block>
						</view>
						<!-- </view> -->
					</scroll-view>
				</view>
			</view>
			<view v-if="tradeInfo.length==0">
				<defalut-img></defalut-img>
			</view>
		</view>
		<view class="set-box">
			<view class="left">
				<text class="iconfont checkbox-icon" v-if="isCheckall"
					@click="checkAll">&#xe8f5;</text>
				<text class="iconfont checkbox-icon2" v-if="!isCheckall"
					@click="checkAll">&#xe685;</text>
				<text class="text" @click="checkAll">{{isCheckall?'全不选':'全选'}}</text>		
			</view>
			<text class="text" @click="showVolume">批量设置</text>
		</view>
		<trading-mask :title='maskTitle' :content='maskContent' :show='Show' @cancel="Show=false" @affirm="Affirm">
		</trading-mask>
		<view v-if="loginShow">
			<mine-login :show='loginShow'></mine-login>
		</view>
		<u-popup v-model="isVolume" mode="bottom" border-radius='16'>
			<view class="trading-footer LittleBg">
				<view class="trading-oper">
					<view class="tips">
						<text class="iconfont">&#xe61c;</text>
						<text>仅针对已经勾选的所有币种进行操作</text>
					</view>
					<view class="currency-oper">
						<!-- 交易循环 -->
						<!-- <block v-if="tradingStr">
							<view @click="tranCycle" v-if="tranCycleType">
								<image src="/static/home/icon_jiaoyixunhuan.png" mode="widthFix"></image>
								<text>交易循环</text>
							</view>
							<view @click="tranCycle" v-else>
								<image src="/static/trading/icon_dancijiaoyi.png" mode="widthFix"></image>
								<text>单次交易</text>
							</view>
						</block> -->
						<!-- 交易设置 -->
						<view @click="circulationSet" v-if="current !=2" v-show="strategyType==0">
							<image src="/static/home/icon_jiaoyixunhuan.png" mode="widthFix"></image>
							<text>交易循环</text>
						</view>
						<view @click="circulationSet" v-else v-show="strategyType==0">
							<image src="/static/home/icon_jiaoyixunhuan.png" mode="widthFix"></image>
							<text>单次交易</text>
						</view>
						<view @click="tradeSetting">
							<image src="/static/home/icon_jiaoyishezhi.png" mode="widthFix"></image>
							<text>交易设置</text>
						</view>
						<!-- 清仓卖出 -->
						<view @click="clearanceale">
							<image src="/static/home/icon_qingcangmaichu.png" mode="widthFix"></image>
							<text>清仓卖出</text>
						</view>
					</view>
				</view>
			</view>
		</u-popup>
		<!-- 批量交易循环设置 -->
		<u-mask :show="repairShow" @click="repairShow = false">
			<view class="warp">
				<view class="rect LittleBg" @tap.stop>
					<view class="title">{{ current != 2 ? "循环模式" : '单次循环' }}</view>
					<view class="title" style="font-size: 24rpx;" v-if="current != 2" >请设置间隔时间</view>
					<view class="inputCode"   v-if="current != 2" >
						<!-- <view>数量：</view> -->
						<u-input class="input" v-model="setTime" type="number" :placeholder="'请输入间隔时间'"/> 秒
					</view>
					<view class="rect-btn">
						<u-button class="cancelbtn" @click="repairShow = false">取消</u-button>
						<u-button class="affirmbtn" @click="confirm">确认</u-button>
					</view>
				</view>
			</view>
		</u-mask>
	</view>
</template>

<script>
	import {
		tradingApi,
		homeApi
	} from '@/api/myAjax.js'
	export default {
		data() {
			return {
				currencyCoin:2,
				exchange:2,
				checkedList: [{
					checked: false
				}],
				tradingStr: false,
				volumeSet: true,
				loginShow: false,
				typelist: ['all', 'single', 'repeat', 'stop'],
				seletPair: true,
				isVolume: false,
				repairShow: false,
				keyword: '',
				currencyCurrent: 0,
				setTime:'',
				currencyList: [{
						name: '火币'
					},
					{
						name: '币安'
					}
				],
				list: [{
						name: '全部'
					},
					{
						name: '单次交易'
					},
					{
						name: '交易循环'
					},
					{
						name: '停止补单'
					},
				],
				current: 0,
				tradeInfo: [],
				searchIntval: null,
				maskTitle: '',
				maskContent: '',
				Show: false,
				userId: '',
				userUsdtamout: '',
				tranCycleType: true,
				enterNumber: 0,
				coinList: [],
				pageNum: 1,
				pageSize: 10,
				total: 0,
				DownRefresh: false,
				keywordFun: '',
				strategyType:'',
				PositionValue:0,//持仓余额
				listCoin:[{
						name: 'Okex'
					},
					{
						name: 'huobi'
					},],
			};
		},
		computed: {
			isCheckall: {
				get() {
					if (this.checkedList.length == 0) return;
					let index = true
					this.checkedList.map(val => {
						if (!val.checked) {
							index = false
						}
					})
					return index
				},
				set(val) {
					return val
				}
			}
		},
		watch:{
			repairShow(type){
				if(!type) this.setTime = ''
			},
		},
		onLoad(options) {
			this.strategyType = options.type
		},
		onShow() {
			this.currencyChange(2)
			this.tradeInfo = []
			this.coinList = []
			if (uni.getStorageSync('user')) {
				this.getFreeBalance()
				this.getTradeCoinList()
			} else {
				this.loginShow = true
			}
		},
		onHide() {
			this.keyword = ''
			this.keywordFun = ''
			this.loginShow = false
			if (this.$store.state.socket) {
				this.$store.state.socket.close()
			}
			clearTimeout(this.searchIntval)
		},
		beforeDestroy() {
			/* uni.clearStorage('coinList') */
			this.keyword = ''
			this.keywordFun = ''
			this.loginShow = false
			if (this.$store.state.socket) {
				this.$store.state.socket.close()
			}
			clearTimeout(this.searchIntval)
		},
		onPullDownRefresh() {
			this.pageSize = 10
			this.DownRefresh = true
			this.getTradeCoinList()
		},
		methods: {
			//切换okex/huobi
			currencyCoinType(cur){
				console.log(cur)
				this.currencyCoin=cur
				this.exchange=cur
					this.getTradeCoinList()
			},
			showVolume(){
				
				this.isVolume = !this.isVolume
			},
			
			//批量设置循环
			confirm() {
				let coinIds = this.coinList.join("=")
				coinIds = coinIds.split('=')
				tradingApi.updateAllStrategyMode({
					coinId:coinIds,
					userId: this.$store.state.userInfo.id,
					// strategy: this.TradeCoin_List.strategyType ? 0 : 1,
					strategy: this.current == 2 ? 0 : 1,
					time: this.setTime
				}).then(res=>{
					this.$toast(res.msg)
					this.getTradeCoinList()
					this.repairShow = false
				})

			},



			//全选全不选
			checkAll() {
				let isCheckall = this.isCheckall
				this.checkedList.map(val => {
					if (isCheckall) {
						val.checked = false
					} else {
						val.checked = true
					}

				})
				this.isCheckall = !this.isCheckall
			},
			//切换交易所
			currencyChange(index) {
				this.currencyCurrent = index
				this.$store.commit('exchangeSelect', index)
				this.getTradeCoinList()
				this.getFreeBalance()
			},
			//搜索栏回车
			onSearch() {
				if (this.keyword) {
					this.keywordFun = this.keyword.split('usdt')[0]
				} else {
					this.keywordFun = ''
				}
				this.getTradeCoinList()
			},
			//获取用户USDT余额
			getFreeBalance() {
				tradingApi.getWalletAssetsd({
					userId: this.$store.state.userInfo.id,
					exchange: this.exchange,
				}).then(res => {
					if (res.code == 200) {
						return this.userUsdtamout = res.data
					}
					this.userUsdtamout = '';
				})
			},
			//tabs标签栏
			change(index) {
				this.pageSize = 10
				this.tradeInfo = []
				this.current = index
				this.tradingStr = true
				if (index == 1 || index == 2) {
					this.tranCycleType = index == 1 ? true : false
				} else if (index == 3) {
					this.isVolume = false
				} else {
					this.tradingStr = false
				}
				this.getTradeCoinList()
			},
			//切换长连接
			connection() {
				if (this.$store.state.socket) return this.$store.state.socket.close();
				let user = this.$store.state.userInfo.id
				this.$store.dispatch('connectSocket', {
					id: user,
					type: this.typelist[this.current]
				})
			},
			// 上拉触底加载刷新
			scrollTolower() {
				if (this.pageNum * this.pageSize > this.total) return this.$toast('数据已经加载完了')
				this.pageSize += 10
				this.getTradeCoinList()
			},
			//复选框改变
			changeClick(index) {
				let coinId = this.tradeInfo[index].coinId
				if (this.coinList.indexOf(coinId) > -1) {
					this.coinList.splice(this.coinList.indexOf(coinId), 1);
				} else {
					this.coinList.push(coinId)
				}
			},
			//交易循环
			tranCycle() {
				if (!JSON.parse(uni.getStorageSync('user')).activeStatus) {
					return this.$toast('用户未激活无法进行操作')
				}
				this.coinList = []
				this.checkedList.map((val, index) => {
					if (val.checked) {
						this.coinList.push(val.id)
					}
				})
				//执行方法前判断是否有勾选数据
				if (this.coinList.length == 0) {
					return this.$toast('请先勾选要操作的币对')
				}
				this.isVolume = false
				tradingApi.updateAllStrategyMode({
					coinId: this.coinList,
					strategy: this.tranCycleType ? 1 : 0,
					userId: this.$store.state.userInfo.id
				}).then(res => {
					this.isVolume = false
					if (res.code == 200) {
						this.getFreeBalance()
						this.getTradeCoinList()
						this.$toast('操作成功')
					} else {
						this.$toast(res.msg)
					}
				})
			},
			//交易循环
			circulationSet() {
				if (!JSON.parse(uni.getStorageSync('user')).activeStatus) {
					return this.$toast('用户未激活无法进行操作')
				}
				this.isVolume = false;
				this.coinList = []
				this.checkedList.map((val, index) => {
					if (val.checked) {
						this.coinList.push(val.id)
					}
				})
				if (this.coinList.length == 0) {
					return this.$toast('请先勾选要操作的币对')
				}
				this.repairShow = true;
				console.log(this.coinList);
			},
			//交易设置
			tradeSetting() {
				if (!JSON.parse(uni.getStorageSync('user')).activeStatus) {
					return this.$toast('用户未激活无法进行操作')
				}
				console.log('cccccccc',this.checkedList);
				if(this.checkedList[0].checked && this.checkedList[0].flagStart == 1){
					this.$toast('勾选的币对交易中，无法设置策略')
					return
				}
				if(this.checkedList[1].checked && this.checkedList[1].flagStart == 1){
					this.$toast('勾选的币对交易中，无法设置策略')
					return
				}
				this.coinList = []
				this.idList = []
				let currencyPairList = []
				this.checkedList.map((val, index) => {
					if (val.checked) {
						console.log(val);
						this.coinList.push(val.id)
						this.idList.push(val.CLid)
						currencyPairList.push(val.currencyPair)
					}
				})
				//执行方法前判断是否有勾选数据
				if (this.coinList.length == 0) {
					return this.$toast('请先勾选要操作的币对')
				}
				this.isVolume = false
				uni.setStorageSync('coinList', this.coinList.join("="))
				// this.isVolume=false
				uni.navigateTo({
					url: "/pages/trading/trade-setting?strategyType="+this.strategyType+"&id=" + this.coinList.join("=") + '&CLid=' + this.idList.join('=') + '&currencyPair=' + currencyPairList.join('=')
				})

			},
			//清仓卖出
			clearanceale() {
				// if (!JSON.parse(uni.getStorageSync('user')).activeStatus) {
				// 	return this.$toast('用户未激活无法进行操作')
				// }
				this.coinList = []
				console.log(this.checkedList);
				this.checkedList.map((val, index) => {
					if (val.checked) {
						console.log(val);
						this.coinList.push(val.CLid)
					}
				})
				console.log(this.coinList.join("="));
				if (this.coinList.length == 0) {
					return this.$toast('请先勾选要操作的币对')
				}
				this.isVolume = false
				//执行方法前判断是否有勾选数据
				this.maskTitle = '清仓卖出'
				this.maskContent = '按照当前价格，卖出所有资产，确定清仓吗？'
				this.Show = true
			},
			Affirm() {
				// this.$toast('清仓卖出');
				console.log(this.coinList);
				if(this.strategyType==0){
					tradingApi.saleAll({
						// userId: this.$store.state.userInfo.id,
						// coinId: this.coinList
						type:this.strategyType==3?4:this.strategyType==4?5:1,
						strategyIdList: this.coinList,
					}).then(res => {
						if (res.code == 200) {
							this.getTradeCoinList()
							this.$toast('操作成功')
							this.currencyChange(2)
						} else {
							this.coinList = []
							this.getTradeCoinList()
							// this.tradeInfo.map(val=>{
							// 	val.checked=false
							// })
							this.$toast(res.msg)
						}
					})
				}else{
					let currencyPairList = []
					this.checkedList.map((val, index) => {
						if (val.checked) {
							currencyPairList.push(val.currencyPair)
						}
					})
					tradingApi.stopUserStrategyBatch({currencyList:currencyPairList.toString()}).then(res=>{
						if (res.code == 200) {
							this.getTradeCoinList()
							this.$toast('操作成功')
							this.currencyChange(2)
						} else {
							this.coinList = []
							this.getTradeCoinList()
							this.$toast(res.msg)
						}
					})
				}
				this.Show = false
			},
			//获取
			getFreeBalanceusdt(){
				tradingApi.getFreeBalanceOkey().then(res=>{
					if(res.code == 200){
						console.log(res);
						this.$store.commit('getAccount_positions',res.data)
					}
				})
				tradingApi.getPositionValue({type:Number(this.strategyType) + 1}).then(res=>{
					console.log("=====>",res);
					if(res.code == 200 ){
						this.PositionValue = res.data
					}
				})
			},
			//获取用户的币对
			getTradeCoinList() {
				let current = null
				if (this.current) {
					current = this.current - 1
				}
				let ketVal = this.keywordFun
				if (this.keywordFun) {
					ketVal = this.keywordFun.toUpperCase()
				}
				let obj = {
					mark: current,
					coinName: ketVal,
					pageNum: this.pageNum,
					pageSize: this.pageSize,
					exchange: this.exchange,
					type : Number(this.strategyType)+1
				}
				// if(!ketVal){
				// 	delete obj.coinName
				// }
				tradingApi.getTradeCoinList(obj).then(res => {
					console.log(res,'eeeeeeeeeeeeeeeeeeeee');
					this.coinList = []
					if (res.code != 200) {
						return this.$toast(res.msg)
					}
					this.getFreeBalanceusdt()
					if (this.DownRefresh) {
						this.DownRefresh = false
						this.$toast('下拉刷新成功')
						uni.stopPullDownRefresh()
					}
					/* let newtrade = [] */
					res.data.map(item=>{
						return item.currencyPair = item.coinName.split('USDT')[0]+'-USDT'
						/* if(item.coinName == "BTCUSDT") item.currencyPair = 'BTC-USDT'
						if(item.coinName == "ETHUSDT") item.currencyPair = 'ETH-USDT' */
						/* if(item.userStrategyBase.strategyType == 0||item.userStrategyBase.strategyType == (Number(this.strategyType)+1)){
							newtrade.push(item)		
						} */
					})
					//this.tradeInfo = newtrade || []
					//console.log(this.tradeInfo);
					this.tradeInfo = res.data || []
					// console.log(this.tradeInfo);
					this.checkedList = []
					// if(this.tradeInfo.length==0){this.volumeSet=false}
					this.volumeSet = this.tradeInfo.length == 0 ? false : true
					this.volumeSet = current == 3 ? false : this.volumeSet
					for (let i = 0; i < this.tradeInfo.length; i++) {
						if(this.strategyType==3){
							this.checkedList.push({
								checked: false,
								id: this.tradeInfo[i].gridStrategy.coinId,
								CLid:this.tradeInfo[i].gridStrategy.id,
								strategy:res.data[i].strategy,
								flagStart:this.tradeInfo[i].gridStrategy.flagStart,
								currencyPair:this.tradeInfo[i].coinName,
							})
						} else if(this.strategyType==4){
							this.checkedList.push({
								checked: false,
								id: this.tradeInfo[i].stopProfitStrategy.coinId,
								CLid:this.tradeInfo[i].stopProfitStrategy.id,
								strategy:res.data[i].strategy,
								flagStart:this.tradeInfo[i].stopProfitStrategy.flagStart,
								currencyPair:this.tradeInfo[i].coinName,
							})
						} else{
							this.checkedList.push({
								checked: false,
								id: this.tradeInfo[i].userStrategyBase.coinId,
								CLid:this.tradeInfo[i].userStrategyBase.id,
								strategy:res.data[i].strategy,
								flagStart:this.tradeInfo[i].userStrategyBase.flagStart,
								currencyPair:this.tradeInfo[i].coinName,
							})
						}
					}
					console.log("1111========>",this.tradeInfo);
					// this.total = res.data.total
					if (this.$store.state.socket) {
						this.$store.state.socket.close()
					}
					let user = '111111'
					if (uni.getStorageSync('user')) {
						user = this.$store.state.userInfo.id
					}
					setTimeout(() => {
					this.$store.dispatch('connectSocket',{id:user,type:this.typelist[this.current]})
						// this.Again()
					}, 5000)
					
				})
			},
			getTradeCoinList_Again(){
				let current = null
				if (this.current) {
					current = this.current - 1
				}
				let ketVal = this.keywordFun
				if (this.keywordFun) {
					ketVal = this.keywordFun.toUpperCase()
				}
				let obj = {
					mark: current,
					coinName: ketVal,
					pageNum: this.pageNum,
					pageSize: this.pageSize,
					exchange: this.exchange,	
					type : Number(this.strategyType)+1
				}
				
				tradingApi.getTradeCoinList(obj).then(res => {
					this.coinList = []
					if (res.code != 200) {
						return this.$toast(res.msg)
					}
					if (this.DownRefresh) {
						this.DownRefresh = false
						this.$toast('下拉刷新成功')
						uni.stopPullDownRefresh()
					}
					let newtrade = []
					res.data.map(item=>{
						newtrade.push(item)
					})
					this.tradeInfo = newtrade || []
					// console.log(this.tradeInfo);
					// if(this.tradeInfo.length==0){this.volumeSet=false}
					this.volumeSet = this.tradeInfo.length == 0 ? false : true
					this.volumeSet = current == 3 ? false : this.volumeSet
					// for (let i = 0; i < this.tradeInfo.length; i++) {
					// 	this.checkedList.push({
					// 		checked: false,
					// 		id: this.tradeInfo[i].userStrategyBase.coinId,
					// 		CLid:this.tradeInfo[i].userStrategyBase.id,
					// 		strategy:res.data[i].strategy,
					// 	})
					// }
				})
			},
			Again(){
				this.searchIntval = setInterval(() => {
					this.getTradeCoinList_Again()
				}, 8000)
			},
			
		},
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
	.trading-header {
		padding: 10rpx 30rpx 5rpx;
		border-radius: 0;

		.select {
			height: 66rpx;
			background: #f3f4f7;
			border-radius: 66rpx;
			display: flex;
			align-items: center;
			padding: 12rpx 0;
			margin-bottom: 20rpx;



			.iconfont {
				margin: 0 12rpx;
			}
		}
	}
	.balance{
		display: flex;
		justify-content: space-between;
		padding: 0 44rpx;
		.balance-item{
			width: 322rpx;
			height: 158rpx;
			padding: 35rpx 0 30rpx 21rpx;
			display: flex;
			justify-content: space-between;
			flex-direction: column;
			.item-top{
				font-size: 24rpx;
				color: #fff;
				letter-spacing: 2rpx;
			}
			.item-btm{
				font-size: 30rpx;
				color: #fff;
				letter-spacing: 2rpx;
			}
		}
		.balance-left{
			background-image: url(/static/trading/jryl.png);
			background-size: 322rpx 158rpx;
		}
		.balance-right{
			background-image: url(/static/trading/ljyl.png);
			background-size: 322rpx 158rpx;
		}
	}
	.bazaar {
		margin: 30rpx 20rpx 0;
		border-radius: 16px;

		// padding: 0 30rpx;
		.volume-set {
			border-radius: 16px 16px 0 0;
			display: flex;
			align-items: center;
			justify-content: space-between;
			background: #e7f2fc;
			padding: 0 20rpx;

			>text {
				padding: 14rpx 0;
				color: #279FFF;
			}

			.text {
				color: #279FFF;
			}
		}
		.scroll-height1{
			height: calc(100vh - 627rpx - var(--status-bar-height));
		}
		.scroll-height2{
			height: calc(100vh - 474rpx - var(--status-bar-height))
		}
		.scroll-view {
			.list-type {
				display: flex;
				align-items: center;
				.checkbox-icon {
					color: #279FFF;
					margin-right: 10rpx;
				}
				.checkbox-icon2 {
					color: #818181;
					margin-right: 10rpx;
				}
			}

		}
	}
	.set-box{
		width: 750rpx;
		height: 87rpx;
		background: rgba(204, 240, 255, 0.43);
		position: fixed;
		left: 0;
		bottom: var(--window-bottom);
		display: flex;
		justify-content: space-between;
		align-items: center;
		padding: 0 34rpx;
		.left{
			display: flex;
			align-items: center;
		}
		.checkbox-icon {
			color: #279FFF;
			margin-right: 10rpx;
		}
		
		.checkbox-icon2 {
			color: #818181;
			margin-right: 10rpx;
		}
		.text {
			color: #279FFF;
		}
	}
	.trading-footer {
		width: 100%;

		// height: 400rpx;
		// position: absolute;
		// bottom: 0;
		// left: 0;
		// border-radius: 0;
		.trading-oper {
			padding: 40rpx 50rpx 50rpx;
			background: #FFFFFF;
			box-shadow: 0rpx -32rpx 61rpx rgba(167, 185, 194, 0.41);
			border-radius: 16rpx 16rpx 0rpx 0rpx;

			.tips {
				height: 40rpx;
				font-size: 28rpx;
				color: #FF513B;
				display: flex;
				align-items: center;

				.iconfont {
					margin-right: 20rpx;
					font-size: 25rpx;
					height: 25rpx;
				}
			}

			.currency-oper {
				display: flex;
				margin-top: 60rpx;

				>view {
					flex: 1;
					display: flex;
					flex-direction: column;
					align-items: center;

					image {
						width: 100rpx;
						margin-bottom: 30rpx;
						box-shadow: 2px 2px 20px rgba(167, 185, 194, 0.41);
					}
				}
			}
		}
	}

	/deep/.uicon-search:before {
		display: none;
	}

	/deep/.u-checkbox__icon-wrap {
		border: 2rpx solid #00B9FF;
	}

	/deep/.u-tab-bar {
		background-color: #279FFF !important;
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
</style>
