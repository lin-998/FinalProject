<template>
	<view class="banxin setting">
		<view class="LittleBg first">
			<view v-if="coinName">{{coinName||xxx-USDT}}</view>
			<view class="first-line">
				<text>账户仓位</text>
				<view class="input">
					<text class="num">{{$store.state.Account_positions || 0}}</text>
					<text>USDT</text>
				</view>
			</view>
		</view>
		<!-- 网格 开始-->
		<view class="LittleBg setting-in" v-if="tacticsType==3" >
			<view class="setting-list"  v-if="tacticsType==3">
					<text>开仓方式</text>
					<view style="">
						<u-radio-group shape="square" active-color="#279fff" v-model="TradeCoin_List.fristPositionType">
							<u-radio  :name="1">开仓比例</u-radio>
							<u-radio :name="2">开仓金额</u-radio>
						</u-radio-group>
					</view>
					</view>
					<view class="setting-list" v-if="TradeCoin_List.fristPositionType==1">
						<text>开仓比例</text>
						<view style="margin: 0 20rpx;">
							<input class="myinput" placeholder="请输入" v-model="TradeCoin_List.firstPositionProportion" />
						</view>%
					</view>
					<view class="setting-list" v-if="TradeCoin_List.fristPositionType==2">
						<text>开仓数量</text>
						<view style="margin: 0 20rpx;">
							<input class="myinput" placeholder="请输入" v-model="TradeCoin_List.firstPositionNumber" />
						</view>
					</view>
					
					<view class="setting-list"  v-if="tacticsType==3">
						<text>网格高度</text>
					<view style="margin: 0 20rpx;">
						<input class="myinput" placeholder="请输入" v-model="TradeCoin_List.gridHigh" />
					</view>
					</view>
					<view class="setting-list"  v-if="tacticsType==3">
					<text>杠杆倍数</text>
									<view class="btns">
										<button class="btn-item-s" size="mini" v-for="(item,index) in btns" :key='index'
											@click="clickBtn(index)"
											:style=" checked== index? 'background-color:#279fff;color:#fff' : 'background-color:#fff' ">
											{{item}}
										</button>
										</view>
					</view>
					<view class="setting-list"  v-if="tacticsType==3">
					<text>补仓方式</text>
					<view style="">
						<!-- <input class="myinput" placeholder="请输入" v-model="TradeCoin_List.fristPositionType" /> -->
						<u-radio-group shape="square" active-color="#279fff" v-model="TradeCoin_List.addPositionType">
							<u-radio  :name="1">补仓比例</u-radio>
							<u-radio :name="2">补仓金额</u-radio>
						</u-radio-group>
					</view>
					</view>
					<view class="setting-list"  v-if="TradeCoin_List.addPositionType==1">
					<text>补仓比例</text>
					<view style="margin: 0 20rpx;">
						<input class="myinput" placeholder="请输入" v-model="TradeCoin_List.addPositionProportion" />
					</view>
					</view>
					<view class="setting-list"  v-if="TradeCoin_List.addPositionType==2">
					<text>补仓金额</text>
					<view style="margin: 0 20rpx;">
						<input class="myinput" placeholder="请输入" v-model="TradeCoin_List.addPositionAmount" />
					</view>
					</view>
					
					<view class="setting-list"  v-if="tacticsType==3">
					<text>补仓次数</text>
					<view style="margin: 0 20rpx;">
						<input class="myinput" placeholder="请输入" v-model="TradeCoin_List.addPositionCount" />
					</view>
					</view>
					<view class="setting-list"  v-if="tacticsType==3">
					<text>风险控制</text>
					<u-switch size='40' v-model="windControl" :disabled="policyType!=1" active-color="#279fff"
						@change="open_wind"></u-switch>
					</view>
					<view class="setting-list"  v-if="tacticsType==3"  v-show="windControl">
					<text>价格上限</text>
					<view style="margin: 0 20rpx;">
						<input class="myinput" placeholder="请输入" v-model="TradeCoin_List.priceHigh"/>
					</view>
					</view>
					<view class="setting-list"  v-if="tacticsType==3" v-show="windControl">
					<text>价格下限</text>
					<view style="margin: 0 20rpx;">
						<input class="myinput" placeholder="请输入" v-model="TradeCoin_List.priceLow" />
					</view>
					</view>
			</view>
			<!-- 网格 结束-->
			<!-- 尾单 开始-->
			<view class="LittleBg setting-in" v-if="tacticsType==4" >
				<view class="setting-list"  >
						<text>开仓方式</text>
						<view style="">
							<u-radio-group shape="square" active-color="#279fff" v-model="TradeCoin_List.firstPositionType">
								<u-radio  :name="1">开仓比例</u-radio>
								<u-radio :name="2">开仓金额</u-radio>
							</u-radio-group>
						</view>
						</view>
						<view class="setting-list" v-if="TradeCoin_List.firstPositionType==1">
							<text>开仓比例</text>
							<view style="margin: 0 20rpx;">
								<input class="myinput" placeholder="请输入" v-model="TradeCoin_List.firstPositionProportion" />
							</view>%
						</view>
						<view class="setting-list" v-if="TradeCoin_List.firstPositionType==2">
							<text>开仓数量</text>
							<view style="margin: 0 20rpx;">
								<input class="myinput" placeholder="请输入" v-model="TradeCoin_List.firstPositionNumber" />
							</view>
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
				<view class="setting-list" >
					<text>做单数量</text>
					<view style="margin: 0 20rpx;">
						<input class="myinput" placeholder="请输入" v-model="TradeCoin_List.addPosCount" />
					</view>
				</view>
				<view class="setting-list" >
					<text>止盈比例</text>
					<view style="margin: 0 20rpx;">
						<input class="myinput" placeholder="请输入" v-model="TradeCoin_List.surplusProportion" />
					</view>%
				</view>
				<view class="setting-list" >
					<text>止盈回调</text>
					<view style="margin: 0 20rpx;">
						<input class="myinput" placeholder="请输入" v-model="TradeCoin_List.callbackProportion" />
					</view>%
				</view>
				<view class="setting-list" @click="popShowClick(1)" >
					<text>补仓配置</text>
					<view style="margin: 0 20rpx;">
					<text v-if="textShowSet1">已设置</text>
						<text v-else>未设置</text>
					</view>
				</view>
				<view class="setting-list" @click="popShowClick(2)" >
					<text>补仓回调</text>
					<view style="margin: 0 20rpx;">
					<text v-if="textShowSet2">已设置</text>
					<text v-else >未设置</text>
					</view>
				</view>
				<view class="setting-list" >
					<text>开启尾单止盈</text>
					<u-switch size='40' v-model="tailCheck" :disabled="policyType!=1" active-color="#279fff"
						@change="open_tailCheck"></u-switch>
				</view>
				<view class="setting-list"  v-show="tailCheck">
					<text>尾单止盈开启单数</text>
						第<view style="margin: 0 20rpx;">
					<input class="myinput" placeholder="请输入" v-model="TradeCoin_List.lastStopProfitValue" />
					</view>单
				</view>
				<view class="setting-list" >
					<text>开启循环交易</text>
					<u-switch size='40' v-model="tailSingle" :disabled="policyType!=1" active-color="#279fff"
						@change="open_circulation"></u-switch>
				</view>
				<view class="setting-list" v-show="tailSingle" >
					<text>循环卖出间隔</text>
					<view style="margin: 0 20rpx;">
						<u-input class="myinput" v-model="TradeCoin_List.loopInterval" />
					</view>秒
				</view>
				
				</view>
				<!-- 尾单结束-->
		<view class="LittleBg setting-in" v-if="tacticsType!=3&&tacticsType!=4" >
			<view class="setting-list" v-if="tacticsType!=1">
				<text>开仓类型</text>
				<view style="">
					<!-- <input class="myinput" placeholder="请输入" v-model="TradeCoin_List.fristPositionType" /> -->
					<u-radio-group shape="square" active-color="#279fff" v-model="TradeCoin_List.fristPositionType">
						<u-radio  :name="1">开仓比例</u-radio>
						<u-radio :name="2">开仓数量</u-radio>
					</u-radio-group>
				</view>
			</view>
			<view class="setting-list" v-if="tacticsType!=1&&TradeCoin_List.fristPositionType==1">
				<text>开仓比例</text>
				<view style="margin: 0 20rpx;">
					<input class="myinput" placeholder="请输入" v-model="TradeCoin_List.fristPositionProportion" />
				</view>%
			</view>
			<view class="setting-list" v-if="tacticsType!=1&&TradeCoin_List.fristPositionType==2">
				<text>开仓数量</text>
				<view style="margin: 0 20rpx;">
					<input class="myinput" placeholder="请输入" v-model="TradeCoin_List.fristPositionNumber" />
				</view>
			</view>
			<view class="setting-list" v-if="tacticsType==1">
				<text>买入金额</text>
				<view style="margin: 0 20rpx;">
					<input class="myinput" placeholder="请输入" v-model="TradeCoin_List.amount" />
				</view>
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
			<view class="setting-list"  v-if="tacticsType==0">
				<text>交易频率</text>
				<view >
					<u-subsection mode="subsection" active-color="#279fff" :list="tradeFrequency" :current="current" @change="frequency"></u-subsection>
				</view>
			</view>
			<view class="setting-list" v-if="tacticsType==1">
				<text>做单数量</text>
				<view style="margin: 0 20rpx;">
					<input class="myinput" placeholder="请输入" v-model="TradeCoin_List.orderNum" />
				</view>
			</view>
			<view class="setting-list" v-if="tacticsType!=1">
				<text>开启高级设置</text>
				<u-switch size='40' v-model="Advanced" :disabled="policyType!=1" active-color="#279fff"></u-switch>
			</view>
			<view class="setting-list" v-show="Advanced" v-if="tacticsType!=1">
				<text>止盈比例</text>
				每<view style="margin: 0 20rpx;">
					<input class="myinput" placeholder="请输入" v-model="TradeCoin_List.checkSurplusProportion" />
				</view>%
			</view>
			<view class="setting-list" v-show="Advanced" v-if="tacticsType!=1">
				<text>卖出比例</text>
				<view style="margin: 0 20rpx;">
					<input class="myinput" placeholder="请输入" v-model="TradeCoin_List.sellProportion" />
				</view>%
			</view>
			<view class="setting-list" v-if="tacticsType!=1">
				<text>开启循环交易</text>
				<u-switch size='40' v-model="tailSingle" :disabled="policyType!=1" active-color="#279fff"
					@change="open_circulation"></u-switch>
			</view>
			<view class="setting-list" v-show="tailSingle" v-if="tacticsType!=1">
				<text>循环卖出间隔</text>
				<view style="margin: 0 20rpx;">
					<u-input class="myinput" v-model="TradeCoin_List.loopInterval" />
				</view>秒
			</view>
	
		</view>

		<u-popup v-model="popShow" mode="bottom" border-radius="14">
			<trading-popup :showType='showType' :policyType='policyType' :arrlist='Number(TradeCoin_List.addPosCount)'
				:data='TradeCoin_List.addPosSet' @onSelect='onSelect' @onCancelClick='popShow=false' @onCaonfirmClick='onCaonfirmClick'>
			</trading-popup>
		</u-popup>
	</view>
</template>

<script>
	import {tradingApi} from '@/api/myAjax.js'
	export default {
		data() {
			return {
				textShowSet1:false,
				textShowSet2:false,
				windControl: false,
				showType: 1,
				popShow: false,
				doubling: false,
				tailSingle: false,
				tailCheck:false,
				Advanced: false,
				diefuList: [],
				marginSettings: false,
				// value:'',
				coinId: null,
				clId:null,
				coinName:'',
				form: {
					marginDeclines: [],
					windControl: false,
					marginMultiples: [],
					marginCallbacks: []
				},
				addform:[],
				userId: '',
				trandType: false,
				doSinglearr: [],
				policyType: 1,
				policyList: ['自定义', '保守', '稳健', '激进'],

				btns: ['1x','2x','3x', '5x', '10x'],
				checked: 0,
				TradeCoin_List: {
					// coinId: '',
					userId: '',
					leverageMultiple: "1", //杠杆倍数
					checkSurplusProportion: "", //止盈比例
					sellProportion: "", //卖出比例
					strategyType: "0", //开启循环交易，0单次，1循环
					exchange: "2", //写死2
					loopInterval: "", //循环间隔
					fristPositionProportion: '',
				},
				division_TradeCoin_List :{},
				tacticsType:'',//策略类型 0=>原策略 1=>EMA
				currencyPair:'',
				currencyPairList:"",
				tradeFrequency: [
					{
						name: '高频',
						value:'1H'
					}, 
					{
						name: '稳健',
						value:'1D'
					}, 
					{
						name: '保守',
						value:'1W'
					}
				],
				current: 0,
			};
		},
		onLoad(options) {
			console.log(111111111111111,options);
			this.userId = this.$store.state.userInfo.id
			this.tacticsType = options.strategyType
			console.log(this.tacticsType)
			if (options.id.indexOf('=') > -1) {
				this.trandType = true
				this.coinId = options.id.split('=')[0]
				this.currencyPairList = options.currencyPair.split('=')
				this.clId = options.CLid
				this.coinName = ''
				this.UserTradeCoin()
				console.log(111);
			} else {
				console.log(222);
				this.coinId = options.id
				this.coinName = options.coinName
				this.currencyPair = options.coinName.split('USDT')[0] + '-USDT'
				// this.TradeCoin_List.coinId = options.id
				this.TradeCoin_List.userId = this.$store.state.userInfo.id
				this.UserTradeCoin()
			}
			
		},
		onShow() {
			
		},
		methods: {
			//单个设置尾单止盈
			setStopProfitStrategy(){
				if(!this.TradeCoin_List.firstPositionProportion||this.TradeCoin_List.firstPositionProportion<0){
					this.$toast('开仓比例不能小于0')
					return
				}
				if(this.TradeCoin_List.surplusProportion<0){
					this.$toast('止盈比例不能小于0')
					return
				}
				if(this.TradeCoin_List.callbackProportion<0){
										this.$toast('止盈回调不能小于0')
										return
									}	
									if (this.TradeCoin_List.startLastStopProfit == 1) {
										if (this.TradeCoin_List.lastStopProfitValue < 0) {
											this.$toast('循环间隔不能小于0');
											return
										}
									}
														console.log(22)
							if (this.TradeCoin_List.strategyType == 1) {
								if (this.TradeCoin_List.loopInterval < 0) {
									this.$toast('循环间隔不能小于0');
									return
								}
							}
				this.division_TradeCoin_List.firstPositionProportion = this.division_TradeCoin_List.firstPositionProportion/100
				this.division_TradeCoin_List.surplusProportion = this.division_TradeCoin_List.surplusProportion/100
				this.division_TradeCoin_List.callbackProportion = this.division_TradeCoin_List.callbackProportion/100
				this.division_TradeCoin_List.addPosSet= this.division_TradeCoin_List.addPosSet.map(item=>{
					item.addPosCallback=item.addPosCallback/100
					item.addPosFall=item.addPosFall /100
					return item
					})
				tradingApi.setStopProfitStrategy(this.division_TradeCoin_List).then(res=>{
					if (res.code == 200) {
						this.$toast('设置成功')
						setTimeout(() => {
							uni.navigateBack({
								delta: 1
							})
						}, 1000)
					} else {
						this.UserTradeCoin()
						this.$toast(res.msg)
					}
				})
			},
			//批量设置尾单止盈
			setStopProfitStrategyBatch(){
				let arr = []
				delete this.division_TradeCoin_List.id
				delete this.division_TradeCoin_List.coinId
				let newClid = this.clId.split('=')
				this.division_TradeCoin_List.firstPositionProportion = this.division_TradeCoin_List.firstPositionProportion/100
				this.division_TradeCoin_List.surplusProportion = this.division_TradeCoin_List.surplusProportion/100
				this.division_TradeCoin_List.callbackProportion = this.division_TradeCoin_List.callbackProportion/100
				this.division_TradeCoin_List.addPosSet= this.division_TradeCoin_List.addPosSet.map(item=>{
					item.addPosCallback=item.addPosCallback/100
					item.addPosFall=item.addPosFall /100
					return item
					})
					// !this.division_TradeCoin_List.fristPositionProportion||
					if(this.division_TradeCoin_List.firstPositionProportion<0||!this.division_TradeCoin_List.firstPositionProportion){
						this.$toast('开仓比例不能小于0')
						return
					}
				if(!this.TradeCoin_List.firstPositionProportion||this.TradeCoin_List.firstPositionProportion<0){
					this.$toast('开仓比例不能小于0')
					return
				}
				if(this.TradeCoin_List.surplusProportion<0){
					this.$toast('止盈比例不能小于0')
					return
				}
				if(this.TradeCoin_List.callbackProportion<0){
										this.$toast('止盈回调不能小于0')
										return
									}	
									if (this.TradeCoin_List.startLastStopProfit == 1) {
										if (this.TradeCoin_List.lastStopProfitValue < 0) {
											this.$toast('循环间隔不能小于0');
											return
										}
									}
														console.log(22)
							if (this.TradeCoin_List.strategyType == 1) {
								if (this.TradeCoin_List.loopInterval < 0) {
									this.$toast('循环间隔不能小于0');
									return
								}
							}	
				this.coinId.map((val,index) => {
					arr.push({
						...this.division_TradeCoin_List,
						coinId: val,
					   id:newClid[index]?newClid[index]:null,
						userId: this.$store.state.userInfo.id,
						exchange: '2',
					})
				})
				tradingApi.setStopProfitStrategyBatch(arr).then(res=>{
					if (res.code == 200) {
						this.$toast('设置成功')
						setTimeout(() => {
							uni.navigateBack({
								delta: 1
							})
						}, 1000)
					} else {
						this.UserTradeCoin()
						this.$toast(res.msg)
					}
				})
			},
			//批量网格设置
			setGridStrategyBatch(){
				let arr = []
				delete this.division_TradeCoin_List.id
				delete this.division_TradeCoin_List.coinId
				let newClid = this.clId.split('=')
				this.division_TradeCoin_List.firstPositionProportion =this.division_TradeCoin_List.firstPositionProportion/100
				this.division_TradeCoin_List.addPositionProportion =this.division_TradeCoin_List.addPositionProportion/100
				if(this.division_TradeCoin_List.firstPositionProportion >1&&this.division_TradeCoin_List.addPositionType==2) {
					this.$toast('开仓比例不能大于100')
					this.UserTradeCoin()
					return
				}
				this.coinId.map((val,index) => {
					arr.push({
						coinId: val,
						id:newClid[index],
						...this.division_TradeCoin_List,
						userId: this.$store.state.userInfo.id,
						exchange: '2',
					})
				})
				console.log('pi',arr)
				tradingApi.setGridStrategyBatch(arr).then(res=>{
					if (res.code == 200) {
						this.$toast('设置成功')
						setTimeout(() => {
							uni.navigateBack({
								delta: 1
							})
						}, 1000)
					} else {
						this.UserTradeCoin()
						this.$toast(res.msg)
					}
				})
			},
			//单个网格设置
			setGridStrategy(){

				this.division_TradeCoin_List.firstPositionProportion =this.division_TradeCoin_List.firstPositionProportion/100
				this.division_TradeCoin_List.addPositionProportion =this.division_TradeCoin_List.addPositionProportion/100
				if(this.division_TradeCoin_List.firstPositionProportion >1&&this.division_TradeCoin_List.addPositionType==2) {
					this.$toast('开仓比例不能大于100')
					this.UserTradeCoin()
					return
				}
				tradingApi.setGridStrategy(this.division_TradeCoin_List).then(res=>{
					if (res.code == 200) {
						this.$toast('设置成功')
						setTimeout(() => {
							uni.navigateBack({
								delta: 1
							})
						}, 1000)
					} else {
						this.UserTradeCoin()
						this.$toast(res.msg)
					}
					
				})
			},
			//获取网格
			getGridStrategy(){
				let param={
					userId: JSON.parse(uni.getStorageSync('user')).id,
					coinId: this.coinId,
				}
				tradingApi.getGridStrategy(param).then(res=>{
					if (res.data.leverageMultiple == 1) this.clickBtn(0)
					if (res.data.leverageMultiple == 2) this.clickBtn(1)
					if (res.data.leverageMultiple == 3) this.clickBtn(2)
					if (res.data.leverageMultiple == 5) this.clickBtn(3)
					if (res.data.leverageMultiple == 10) this.clickBtn(4)
					res.data.firstPositionProportion = (res.data.firstPositionProportion * 1000000)/10000
					res.data.addPositionProportion = (res.data.addPositionProportion * 1000000)/10000

					this.windControl = res.data.windControl ? (res.data.windControl < 1 ? false : true) : false
					this.TradeCoin_List=res.data
				})
			},
			//获取尾单
			getStopProfitStrategy(){
				tradingApi.getStopProfitStrategy({userId:this.userId,coinId: this.coinId}).then(res=>{
					if (res.data.leverageMultiple == 1) this.clickBtn(0)
					if (res.data.leverageMultiple == 2) this.clickBtn(1)
					if (res.data.leverageMultiple == 3) this.clickBtn(2)
					if (res.data.leverageMultiple == 5) this.clickBtn(3)
					if (res.data.leverageMultiple == 10) this.clickBtn(4)
					res.data.firstPositionProportion = (res.data.firstPositionProportion * 1000000)/10000
					res.data.surplusProportion = (res.data.surplusProportion * 1000000)/10000
					res.data.callbackProportion = (res.data.callbackProportion * 1000000)/10000
	        res.data.addPosSet= res.data.addPosSet.map(item=>{
		      item.addPosCallback=item.addPosCallback * 1000000/10000
		      item.addPosFall=item.addPosFall * 1000000/10000
		return item
	})
					this.tailSingle = res.data.strategyType ? (res.data.strategyType < 1 ? false : true) : false
					this.tailCheck = res.data.startLastStopProfit ? (res.data.startLastStopProfit < 1 ? false : true) : false
					this.TradeCoin_List=res.data
					this.addform=res.data.addPosSet
					console.log('888888',this.addform)
				})
			},
			frequency(index){
				this.TradeCoin_List.tradeFrequency = this.tradeFrequency[index].value
				console.log(this.TradeCoin_List.tradeFrequency);
			},
			popShowClick(type) {
				this.showType = type
				this.popShow = !this.popShow
			},
			// 参数设置
			onCaonfirmClick(item) {
				console.log(item)
				this.popShow = false
				if (this.showType == 1) {
					item.every(x=>{
						if(x.addPosFall>0&&x.addPosMiltiply>0){
							this.textShowSet1=true
						}else{
							this.$toast('补仓参数不能为空且大于0')
							this.textShowSet1=false
						}
					})
					this.TradeCoin_List.addPosSet=JSON.parse(JSON.stringify(item))
				}else if (this.showType == 2) {
					// 补仓回调
					item.every(x=>{
						if(x.addPosCallback>0){
							this.textShowSet2=true
						}else{
							this.$toast('补仓参数不能为空且大于0')
							this.textShowSet2=false
						}
					})
					this.TradeCoin_List.addPosSet=JSON.parse(JSON.stringify(item))
				}
				 else if (this.showType == 3) {
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
			//开启循环交易
			open_circulation(e) {
				e ? this.TradeCoin_List.strategyType = 1 : this.TradeCoin_List.strategyType = 0
				console.log(this.TradeCoin_List.strategyType);
				console.log(e);
			},
			//开启风险控制
			open_wind(e){
			e ? this.TradeCoin_List.windControl = 1 : this.TradeCoin_List.windControl = 0
			},
			//开启尾单止盈
			open_tailCheck(e){
					e ? this.TradeCoin_List.startLastStopProfit  = 1 : this.TradeCoin_List.startLastStopProfit  = 0
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
				if(this.tacticsType==0||this.tacticsType==2){
					tradingApi.UserTradeCoin({
						type: Number(this.tacticsType)+1,
						userId: this.userId,
						coinId: this.coinId,
					}).then(res => {
						console.log(res, '获取交易设置');
						if (res.data.leverageMultiple == 1) this.clickBtn(0)
						if (res.data.leverageMultiple == 2) this.clickBtn(1)
						if (res.data.leverageMultiple == 3) this.clickBtn(2)
						if (res.data.leverageMultiple == 5) this.clickBtn(3)
						if (res.data.leverageMultiple == 10) this.clickBtn(4)
						console.log(res.data.strategyType);
						this.tailSingle = res.data.strategyType ? (res.data.strategyType < 1 ? false : true) : false
						console.log(this.tailSingle);
						if (res.code == 200) {
							res.data.checkSurplusProportion = (res.data.checkSurplusProportion * 1000000)/10000
							res.data.fristPositionProportion = (res.data.fristPositionProportion * 1000000)/10000
							res.data.sellProportion = (res.data.sellProportion * 1000000)/10000
							res.data.tradeFrequency == '1D' ? this.current = 1 : res.data.tradeFrequency == '1W' ? this.current = 2 : this.current = 0
							this.TradeCoin_List = res.data
							if(this.TradeCoin_List.checkSurplusProportion>0||this.TradeCoin_List.sellProportion>0){
								this.Advanced = true
							}else{
								this.Advanced = false
							}
						}
					})
				}else if(this.tacticsType==1){
					tradingApi.getUserStrategy({currencyPair:this.currencyPair}).then(res=>{
						console.log('获取EMA',res);
						this.TradeCoin_List = res.data
						if (res.data.leverageMultiple == 1) this.clickBtn(0)
						if (res.data.leverageMultiple == 2) this.clickBtn(1)
						if (res.data.leverageMultiple == 3) this.clickBtn(2)
						if (res.data.leverageMultiple == 5) this.clickBtn(3)
						if (res.data.leverageMultiple == 10) this.clickBtn(4)
					})
				}else if(this.tacticsType==3){
					this.getGridStrategy()
				}else if(this.tacticsType==4){
					this.getStopProfitStrategy()
				}
			},
			//批量设置用户EMA策略
			tacticsMore(){
				let arr = this.currencyPairList.map(v=>{
					return v.split('USDT')[0] + "-USDT"
				})
				let data = {
					currencyList:arr.toString(),
					amount:this.TradeCoin_List.amount,
					orderNum:this.TradeCoin_List.orderNum,
					leverageMultiple:this.TradeCoin_List.leverageMultiple,
				}
				tradingApi.setUserStrategyBatch(data).then(res=>{
					/* if (res.code == 200) {
						this.$toast('设置成功')
						setTimeout(() => {
							uni.navigateBack()
						}, 1000)
					} else {
						this.$toast(res.msg)
					} */
				})
			},
			//单个交易对设置=>EMA
			tacticsSingle(){
				let data = {
					currencyPair:this.currencyPair,
					amount:this.TradeCoin_List.amount,
					orderNum:this.TradeCoin_List.orderNum,
					leverageMultiple:this.TradeCoin_List.leverageMultiple,
				}
				tradingApi.setUserStrat(data).then(res=>{
					if (res.code == 200) {
						this.$toast('设置成功')
						setTimeout(() => {
							uni.navigateBack()
						}, 1000)
					} else {
						this.UserTradeCoin()
						this.$toast(res.msg)
					}
				})
			},
			//单个交易对设置
			single() {
				// delete this.form.id
				if(this.division_TradeCoin_List.fristPositionProportion >1) {
					this.$toast('开仓比例不能大于100')
					this.UserTradeCoin()
					return
				}
				if(!this.Advanced){
					this.division_TradeCoin_List.checkSurplusProportion=0
					this.division_TradeCoin_List.sellProportion=0
				}
				tradingApi.addTradeCoin(this.division_TradeCoin_List).then(res => {
					if (res.code == 200) {
						this.$toast('设置成功')
						setTimeout(() => {
							uni.navigateBack({
								delta: 1
							})
						}, 1000)
					} else {
						this.UserTradeCoin()
						this.$toast(res.msg)
					}
				})
			},
			//批量交易对设置 //------
			More() {
				if(this.division_TradeCoin_List.fristPositionProportion >1) {
					this.$toast('开仓比例不能大于100')
					this.UserTradeCoin()
					return
				}
				if(!this.Advanced){
					this.division_TradeCoin_List.checkSurplusProportion=0
					this.division_TradeCoin_List.sellProportion=0
				}
				let arr = []
				delete this.division_TradeCoin_List.id
				delete this.division_TradeCoin_List.coinId
				let newClid = this.clId.split('=')
				this.coinId.map((val,index) => {
					arr.push({
						coinId: val,
						id:newClid[index],
						...this.division_TradeCoin_List,
						userId: this.$store.state.userInfo.id,
						exchange: '2',
						flagStart: '0'
					})
				})
				console.log(arr);
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
				console.log(type);
				if (type == 0) this.TradeCoin_List.leverageMultiple = 1
				if (type == 1) this.TradeCoin_List.leverageMultiple = 2
				if (type == 2) this.TradeCoin_List.leverageMultiple = 3
				if (type == 3) this.TradeCoin_List.leverageMultiple = 5
				if (type == 4) this.TradeCoin_List.leverageMultiple = 10
				this.checked = type
			}
		},

		//确定提交
		onNavigationBarButtonTap() {
			if(this.tacticsType==0||this.tacticsType==2){
				if (!this.TradeCoin_List.fristPositionProportion || this.TradeCoin_List.fristPositionProportion <= 0) {
					this.$toast('开仓比例不能小于0');
					return
				}
				if (this.TradeCoin_List.checkSurplusProportion < 0) {
					this.$toast('止盈比例不能小于0');
					return
				}
				if (this.TradeCoin_List.sellProportion < 0) {
					this.$toast('卖出比例不能小于0');
					return
				}
				if (this.TradeCoin_List.strategyType == 1) {
					if (this.TradeCoin_List.loopInterval < 0) {
						this.$toast('循环间隔不能小于0');
						return
					}
				}
				let coinIds = uni.getStorageSync('coinList')
				this.coinId = coinIds.split('=')
				this.division_TradeCoin_List = JSON.stringify(this.TradeCoin_List)
				this.division_TradeCoin_List = JSON.parse(this.division_TradeCoin_List)
				this.division_TradeCoin_List.checkSurplusProportion = this.division_TradeCoin_List.checkSurplusProportion / 100
				this.division_TradeCoin_List.fristPositionProportion = this.division_TradeCoin_List.fristPositionProportion / 100
				this.division_TradeCoin_List.sellProportion = this.division_TradeCoin_List.sellProportion / 100
				if (this.coinId.length > 1) {
					console.log(11123);
					this.More()
					uni.setStorageSync('coinList', '')
				} else {
					console.log(11122);
					this.single()
				}
					this.coinId=null
			}else if(this.tacticsType==1){
				let coinIds = uni.getStorageSync('coinList')
				this.coinId = coinIds.split('=')
				if (this.TradeCoin_List.amount <= 0) return this.$toast('买入需大于0')
				if (this.TradeCoin_List.orderNum <= 0) return this.$toast('做单数量需大于0')
				if (this.coinId.length > 1) {
					console.log(11123);
					this.tacticsMore()
					uni.setStorageSync('coinList', '')
				} else {
					console.log(11123);
					this.tacticsSingle()
				}
					this.coinId=null
			}else if(this.tacticsType==3){
				if (!this.TradeCoin_List.firstPositionProportion || this.TradeCoin_List.firstPositionProportion <= 0) {
					this.$toast('开仓比例不能小于0');
					return
				}
				if (this.TradeCoin_List.gridHigh < 0) {
					this.$toast('网格高度不能小于0');
					return
				}
				if (!this.TradeCoin_List.addPositionProportion || this.TradeCoin_List.addPositionProportion <= 0) {
					this.$toast('补仓比例不能小于0');
					return
				}
				if (this.TradeCoin_List.addPositionCount < 0) {
					this.$toast('补仓次数不能小于0');
					return
				}
				if (this.TradeCoin_List.priceHigh < this.TradeCoin_List.priceLow) {
					this.$toast('价格上限不能小于价格下限');
					return
				}
				let coinIds = uni.getStorageSync('coinList')
				this.coinId = coinIds.split('=')
				this.division_TradeCoin_List = JSON.stringify(this.TradeCoin_List)
				this.division_TradeCoin_List = JSON.parse(this.division_TradeCoin_List)
				console.log( "idddd", this.coinId)
				if (this.coinId.length > 1) {
				this.setGridStrategyBatch()	
					uni.setStorageSync('coinList', '')
				} 
				this.setGridStrategy()
					
			}
			else if(this.tacticsType==4){
				let coinIds = uni.getStorageSync('coinList')
				this.coinId = coinIds.split('=')
				this.division_TradeCoin_List = JSON.stringify(this.TradeCoin_List)
				this.division_TradeCoin_List = JSON.parse(this.division_TradeCoin_List)
				
				console.log('ssssh',this.coinId)
				if (this.coinId.length > 1) {
					console.log("p尾单")
				this.setStopProfitStrategyBatch()	
					uni.setStorageSync('coinList', '')
				} else {
					console.log("单个尾单")
					this.setStopProfitStrategy()
				
				}
			}
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
				// align-items: center;
				// justify-content: space-between;
				margin-top: 10rpx;

				>text {
					display: block;
					flex: 3;
					font-size: 28rpx;
				}

				.input {
					flex: 2;
					display: flex;
					align-items: center;
					width: 100rpx;
					margin-left: -640rpx;

					>text {
						font-size: 28rpx;
						// width: 86rpx;
						display: inline-block;
						// text-align: right;
					}

					.num {
						background: rgba(192, 222, 238, 0.24);
						color: #279FFF;
						padding: 0 10rpx;
					}
				}
			}
		}

		.setting-in {
			padding: 0 30rpx;
			margin-bottom: 20rpx;

			.setting-list {
				display: flex;
				align-items: center;
				justify-content: space-between;
				padding: 23rpx 0;
				/deep/ .u-item-text{
					width: 100rpx;
					text-align: center;
					justify-content: center;
				}
				.myinput {
					width: 150rpx;
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
