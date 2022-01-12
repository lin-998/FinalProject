<template>
	<view class="electronic-bill banxin">
		<view class="earnings LittleBg">
			<view class="today" @click="selectEarnings(1)">
				<text>今日盈利(USDT)</text>
				<text>{{Earnings.todayProfit|numFilter(4)}}</text>
			</view>
			<view class="cumulative" @click="selectEarnings(2)">
				<text>累计盈利(USDT)</text>
				<text>{{Earnings.totalProfit|numFilter(4)}}</text>
			</view>
			
		</view>
		<view class="earnings-list LittleBg" v-if="earningsList.length!=0">
			<view v-for="(item,index) in earningsList" :key="index">
				<view class="list-detail">交易所：<text>Okex</text></view>
				<view class="list-detail">订单编号：<text>{{item.orderId}}</text></view>
				<view class="list-detail">卖出币种：<text>{{item.coinName}}</text></view>
				<view class="list-detail">卖出时间：<text>{{item.sellTime}}</text></view>
				<view class="profit-quota">盈利额度：<text>{{item.money||'0.0000'}} USDT</text></view>
			</view>
		</view>
		<view class="earnings-list LittleBg" v-if="allEarnings.length!=0">
			<view v-for="(item,index) in allEarnings" :key="index">
				<view class="list-allEarnings">
					<text>盈利</text>
					<text :class="item.money>0?'profit':'loss'">{{item.money}}</text>
					<text>{{item.sellTime}}</text>
				</view>
			</view>
		</view>
		<view v-if="earningsList.length==0&&allEarnings.length==0">
			<defalut-img></defalut-img>
		</view>
		<home-canvas 
		:showCode='showCode'
		:placardData='placardObj'
		@onHide='showCode=false'></home-canvas>
		<u-back-top :scroll-top="scrollTop" top="1500"></u-back-top>
	</view>
</template>
<script>
	import {homeApi,loginApi,mineApi} from '@/api/myAjax.js'
	import {imgUrl} from '@/api/app.js'
	export default {
		data() {
			return {
				placardObj:{
					bgUrl:require('static/home/ylhb.png'),//海报背景图
					// bgUrl2:require('static/home/jrsy2.png'),//海报状态
					profitYield:'+9.00%',//盈利率
					profitTime:'2020-11-12',//盈利时间
					codeText:'http://47.57.2.94/quantized/home.html?invitationCode=BD4V95',//二维码内容
					profitLoss:require('static/home/sz.png'),//盈亏指标  sz
					background: '#E5FBD1',//盈利背景色  #E5FBD1   #FBD1D1
					color:'#1DB727',//盈利颜色  #1DB727   #FF4141
				},
				showCode:false,//显示隐藏海报
				scrollTop:0,//显示回到顶部按钮
				Earnings: {},
				earningsList: [],//今日账单列表
				allEarnings:[],//累计账单列表
				pageNum:1,
				pageSize:10,
				total:0,
				DownRefresh:false,//是否为下拉刷新
				EarningsType:1,//盈利类型1今日2累计
			};
		},
		methods: {
			selectEarnings(index){
				console.log(this.EarningsType);
				if(this.EarningsType==index){return}
				this.EarningsType=index
				this.pageNum=1
				this.getEarnings()
			},
			getProfitData(){
				homeApi.getProfitData().then(res=>{
					this.Earnings=res.data||{}
				})
			},
			getEarnings(){
				if(this.EarningsType==1){
					this.getProfitStatement()
				}else{
					this.getTotalProfitRecord()
				}
			},
			getProfitStatement(){
				this.allEarnings=[]
				homeApi.getProfitStatement({pageNum:this.pageNum,pageSize:this.pageSize}).then(res=>{
					if(res.code==200){
						if(!res.data)return uni.stopPullDownRefresh();
						this.total=res.data.total
						if(this.DownRefresh){
							this.DownRefresh=false
							this.earningsList=res.data.rows||[]
							this.$toast('下拉刷新成功')
							uni.stopPullDownRefresh()
						}else{
							this.earningsList=[...this.earningsList,...res.data.rows]
							
						}
					}else{
						uni.stopPullDownRefresh()
						this.$toast(res.msg)
					}
					// console.log(res);
				})
			},
			getTotalProfitRecord(){
				this.earningsList=[]
				homeApi.getTotalProfitRecord({pageNum:this.pageNum,pageSize:this.pageSize}).then(res=>{
					if(res.code==200){
						if(!res.data)return uni.stopPullDownRefresh();
						this.total=res.data.total
						if(this.DownRefresh){
							this.DownRefresh=false
							this.allEarnings=res.data.rows||[]
							this.allEarnings.map(val=>{
								val.sellTime=val.sellTime.split(' ')[0]
							})
							this.$toast('下拉刷新成功')
							uni.stopPullDownRefresh()
						}else{
							this.allEarnings=[...this.earningsList,...res.data.rows]
							this.allEarnings.map(val=>{
								val.sellTime=val.sellTime.split(' ')[0]
							})
							// this.allEarnings=[]
						}
					}else{
						uni.stopPullDownRefresh()
						this.$toast(res.msg)
					}
				})
			},
		},
		created() {
			this.getProfitData()
			this.getEarnings()
		},
		onReachBottom(){
			if(this.pageNum*this.pageSize>this.total)return this.$toast('数据已经加载完了')
			this.pageNum+=1
			this.getEarnings()
			// console.log(123456);
		},
		onPullDownRefresh() {
			this.pageNum=1
			this.DownRefresh=true
			this.getEarnings()
		},
		 onPageScroll(res) {
			 this.scrollTop=res.scrollTop
		},
		onNavigationBarButtonTap() {
			// return this.showCode=true;
			//二维码内容
			let promise1=new Promise((resolve,reject)=>{
				mineApi.getInvitationQRCode({userId:this.$store.state.userInfo.id}).then(res=>{
					if(res.code!=200){this.$toast(res.msg)}
					resolve(res)
				})
			})
			//海报背景图
			let promise2=new Promise((resolve,reject)=>{
				loginApi.getCommonSetUp().then(res=>{
					console.log(res);
					if(res.code!=200){this.$toast(res.msg)}
					resolve(res)
				})
			})
			//盈利
			let promise3=new Promise((resolve,reject)=>{
				homeApi.getProfitYield({}).then(res=>{
					// console.log(res.data.profitYield);
					let newprofitYield = (res.data.profitYield).split('%')[0]
					res.data.profitYield = Number(newprofitYield).toFixed(2)
					if(res.code!=200){this.$toast(res.msg)}
					resolve(res)
				})
			})
			Promise.all([promise1,promise2,promise3]).then((res)=>{
				this.placardObj.codeText=res[0].data//二维码内容
				// this.placardObj.bgUrl=imgUrl+res[1].data.posterImageUrl//海报背景图
				this.placardObj.profitYield=res[2].data.profitYield//盈利率
				// this.placardObj.profitYield = '-10%'
				console.log(this.placardObj.profitYield.indexOf('-'));
				console.log(this.placardObj.profitYield);
				if(this.placardObj.profitYield.indexOf('-')==-1&&this.placardObj.profitYield!='0%'){
					this.placardObj.profitYield='+'+this.placardObj.profitYield
					this.placardObj.profitLoss=require('static/home/sz.png')//上涨
					this.placardObj.bgUrl2=require('static/home/jrsy2.png')
					this.placardObj.bgUrl=require('static/home/ylhb.png')//海报背景图
					this.placardObj.background = '#E5FBD1'//盈利背景色
					this.placardObj.color = '#1DB727'//盈利颜色
				}else if(this.placardObj.profitYield=='0%'){
					this.placardObj.profitYield='0.00%'
					this.placardObj.background = '#DDE0E8'//盈利背景色
					this.placardObj.color = '#999999'//盈利颜色
				}else {
					this.placardObj.background = '#FBD1D1'//盈利背景色
					this.placardObj.color = '#FF4141'//盈利颜色
					this.placardObj.profitLoss=require('static/home/xd.png')//下跌
				}
				this.placardObj.profitTime=res[2].data.sellTime//时间
				this.showCode=true
			}).catch((error)=>{
				console.log(error)
			})
		}
	}
</script>

<style lang="scss" scoped>
	.electronic-bill {
		padding:20rpx;
		.earnings {
			display: flex;
			align-items: center;
			justify-content: space-around;
			margin-bottom: 20rpx;
			padding: 20rpx;
			.today,
			.cumulative {
				width: 322rpx;
				height: 158rpx;
				background: url(/static/home/card1.png) no-repeat;
				background-size:100% ;
				padding: 26rpx;
				display: flex;
				flex-direction: column;
				color: #fff;
				>text {
					letter-spacing:4rpx;
					&:last-child {
						margin-top: 8rpx;
						font-size: 36rpx;
						overflow: hidden;
						text-overflow: ellipsis;
						white-space: nowrap;
					}
				}
			}
			.cumulative{
				background: url(/static/home/card2.png) no-repeat;
				background-size:100% ;
			}
		}

		.earnings-list {
			padding: 40rpx;
			.list-detail,.profit-quota {
				padding-bottom: 26rpx;
				color: #333333;
				>text {
					margin-left: 10rpx;
					color: #3AC764;
				}
			}
			.list-allEarnings{
				display: flex;
				justify-content: space-between;
				padding-bottom: 40rpx;
				border-bottom: 1rpx solid #C6DDE6;
			}
			.profit-quota {
				padding-bottom: 22rpx;
				border-bottom: 1rpx solid #C6DDE6;
			}
			>view{
				margin-bottom: 40rpx;
				&:last-child{
					margin-bottom: 0;
					.profit-quota {
						border-bottom: none;
					}
				}
			}
		}
	}

</style>
