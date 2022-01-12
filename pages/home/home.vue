<template>
	<view class="home overBg" id="containerId">
		<!-- 这里是状态栏 -->
		<view class="status_bar1"></view>
		<view class="status_bar"></view>
		<!-- 大轮播图 -->
		<view class="home-swiper">
			<swiper autoplay circular>
				<swiper-item v-for="(item,index) in swiperImg" :key="index">
					<view class="swiper-list">
						<image :src="item.imageUrl" mode="widthFix"></image>
					</view>
				</swiper-item>
				<swiper-item v-if="swiperImg.length==0">
					<view class="swiper-list">
						<image src="/static/home/banner.png" mode="widthFix"></image>
					</view>
				</swiper-item>
			</swiper>
		</view>
		<view class="banxin">
			<!-- 公告滚动 -->
			<view class="announcement LittleBg">
				<view class="roll">
					<u-notice-bar bg-color="#ebf6fe" color="#000" mode="vertical" :list="Noticelist" border-radius="50" font-size="24" @click="affiche"></u-notice-bar>
					<navigator url="/pages/home/affiche/affiche"><u-icon class="icon" name="list" color="#999" size="40"></u-icon></navigator>
				</view>
				<view class="disimg">
					<view @click="navClick(true)">
						<view class="navbar">
						</view>
					</view>
					<view>
						<view class="navbar2" @click="navClick(false)"></view>
						<view class="navbar3" @click="navClick(5)"></view>
					</view>
				</view>
			</view>
			<!-- 总交易 -->
			<view class="LittleBg trade">
				<view class="counterparty" v-for="(item,index) in counterparty" :key="index">
					<text>{{item.currencyPair}}</text>
					<text :class="item.percent>0?'profit':'loss'">{{item.amount|numFilter(8)}}</text>
					<text :class="item.percent>0?'profit':'loss'">{{item.percent}}%</text>
				</view>
			</view>
			<view class="upde-version">
				<mine-version ref='updeVersion' :verShow='false'></mine-version>
			</view>
			<!-- 市场交易列表 -->
			<view class="LittleBg bazaar">
				<view class="currency-type">
					<!-- <view @click="currencyChange(0)" :class="{active:currencyCurrent==0}">火币</view>
					<view @click="currencyChange(1)" :class="{active:currencyCurrent==1}">币安</view> -->
				</view>
				<view v-if="tradeInfo.length">
						<block v-for="(item,index) in tradeInfo" :key="index">
							<view>
								<home-transaction :item='item' type='all' :index='2' :strategyType="strategy(item)"></home-transaction>
							</view>
						</block>
				</view>
				<view v-else><defalut-img></defalut-img></view>
			</view>
		</view>
		<u-back-top :scroll-top="isGotoTop" top="1500"></u-back-top>
	</view>
</template>

<script>
	import {homeApi,tradingApi,loginApi} from '@/api/myAjax.js'
	import { imgUrl, socketUrl } from "@/api/app.js";
	// import { numFilter } from "@/common/radix-point.js"
	export default {

		data() {
			return {
				currencyCurrent:0,
				isGotoTop:0,
				swiperImg:[],
				Noticelist: ['暂未公告'],
				enterNumber:0,
				NoticeId: [],
				counterparty:[],
				tradeInfo:[],
				socket:null,
				countIntVal:null,
				total:0,
				DownRefresh:false,
				userUsdtamout:0,
				minEarnestMoney:0,
				pageNum:1
			};
		},
		onLoad() {
			this.getShufflingFigure()
			this.getNotice()
			// this.getQuote()
			
			if(this.$store.state.firstLogin){
				this.getFreeBalance()
				this.$store.commit('userLoginStatus',false)
			}			
		},
		mounted() {
			// #ifdef APP-PLUS
			this.$refs.updeVersion.checkApp()
			// this.checkApp()
			// #endif
		},
		methods:{
			strategy(item){
				let num = -1
				if(item.userDealContractInfo){
					switch(item.userDealContractInfo.strategyKind){
						case "base" : num = 0
						break
						case "ema" : num = 1
						break
						case "sar" : num = 2
						break
						case "grid": num = 3
						break
						case "lastStopProfit": num = 4
						break
					}				
				}else{
					num = item.userDto.state==1 ? 1 : 0
				}
				return num
			},
			currencyChange(index){
				this.currencyCurrent=index
				this.tradeInfo=[]
				this.getQuote()
			},
			getFreeBalance(){
				tradingApi.getFreeBalance().then(res=>{
					if(res.code==200){
						console.log(res);
						this.$store.commit('getAccount_positions',res.data)
						console.log(this.$store.state.Account_positions);
						// this.userUsdtamout=res.data.availableUSDT
						this.userUsdtamout=res.data
					}else{
						this.userUsdtamout=0;
					}
					loginApi.getCommonSetUp().then(res=>{
						if(res.code==200){
							if(this.userUsdtamout<res.data.minEarnestMoney){
								this.$toast(`您当前的USDT低于保证金${res.data.minEarnestMoney}USDT，请及时充值`)
							}
						}
					})					
				})
			},
			//回到顶部
			gotoTop(){
				uni.pageScrollTo({
				scrollTop: 0,
				duration: 100
				});
			},
			navClick(type){
				if(type==5){
					uni.setStorageSync('index',0)
					uni.switchTab({
						url:'/pages/consult/consult'
					})
				}else{
					if(!uni.getStorageSync('userToken')){
						return this.$toast('请先进行登录')
					}
					let url=''
					if(type){
						url="/pages/home/authorization/authorization"
					}else{
						url='/pages/home/electronic-bill/electronic-bill'
					}
					uni.navigateTo({
						url:url
					})
				}
			},
			affiche(index){
				console.log(index);
				uni.navigateTo({
					 url:'/pages/home/affiche/affiche-detail?id='+this.NoticeId[index].id
				})
			},
			getQuote(){
					tradingApi.getTradeCoinList({
						mark:'',
						coinName:'',
						pageNum:this.pageNum,
						pageSize:10,
						exchange:2,
					}).then(res=>{
						if(res.code==200){
							console.log(res,6668);
							console.log(this.DownRefresh);
							// if(this.DownRefresh){
								this.DownRefresh=false
								// this.$toast('下拉刷新成功')
								uni.stopPullDownRefresh()
								
								let newtrade = []
								res.data.map(item=>{
										item.currencyPair = item.coinName.split('USDT')[0] + '-USDT'
										newtrade.push(item)
								})
								console.log(newtrade,999);
								this.tradeInfo = newtrade || []
								// this.tradeInfo=res.data.rows||[]
							// }else{
							// 	this.tradeInfo=[...this.tradeInfo,...res.data.rows]
							// 	// this.tradeInfo.map()
							// 	// numFilter
							// }
							this.total=res.data.total
						}
						
						
						if(this.$store.state.socket){
							this.$store.state.socket.close()
						}
						if(this.tradeInfo.length==0)return;
						let user=this.$store.state.userInfo.id
						this.$store.dispatch('connectSocket',{id:user,type:'all'})
					})
				
			},
			getHomeList(){
				homeApi.getHomeList().then(res=>{
					this.counterparty=res.data||[]
					this.counterparty.map(val=>{
						val.percent=(Math.floor(val.percent * 10000) / 100).toFixed(2)
					})
					this.countIntVal=setTimeout(()=>{
						this.getHomeList()
					},5000)
				})
			},
			getShufflingFigure(){
				homeApi.getShufflingFigure().then(res=>{
					if(res.data){
						this.swiperImg=res.data.rows||[]
						this.swiperImg.map(val=>{
							val.imageUrl=imgUrl+val.imageUrl
						})
					}
				})
			},
			//获取公告
			getNotice(){
				homeApi.getNotice().then(res=>{
					if(res.data){
						this.NoticeId=res.data.rows||[]
						this.Noticelist=[]
						this.NoticeId.map(val=>{
							this.Noticelist.push(val.title)
						})
						if(this.NoticeId.length==0){
							this.Noticelist.push('暂无公告')
						}
					}
				})
			},
		},
		onShow() {
			// this.getQuote()
			if(uni.getStorageSync('user')){
				this.getQuote()
			}
			this.getHomeList()
			// #ifdef  APP-PLUS
			this.enterNumber=this.enterNumber+1
			if(this.enterNumber<2){return}
			uni.getSystemInfo({
				success: (res) => {
					console.log(res.platform);
					if (res.platform == 'ios') {
						const query = uni.createSelectorQuery().in(this);
						var isRecovery = true;
						query.select('#containerId').boundingClientRect(data => {
							isRecovery = false;
						}).exec();
						
						var timer = setTimeout(() => {
							if (isRecovery) {
								uni.reLaunch({
									url:'/pages/home/home'
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
		onHide() {
			this.tradeInfo=[]
			clearTimeout(this.countIntVal)
			if(this.$store.state.socket){
				this.$store.state.socket.close()
			}
		},
		// 上拉触底加载刷新
		onReachBottom() {
			if(this.pageNum*10>this.total)return this.$toast('数据已经加载完了')
			this.pageNum+=1
			this.getQuote()
		},
		onPullDownRefresh() {
			this.pageNum=1
			this.DownRefresh=true
			this.getQuote()
			this.getNotice()
		},
		onPageScroll(res) {
			 this.isGotoTop=res.scrollTop
		},
	}
</script>

<style lang="scss" scoped>
	// 轮播图
	.home-swiper {
		padding: 20rpx 20rpx;
		border-radius: 16rpx;
		overflow: hidden;
		height: 300rpx;
		uni-swiper {
			height: 100%;
		}

		.swiper-list {
			image {
				height: 257rpx !important;
				width: 100%;
				border-radius: 16rpx;
			}
		}
	}

	.announcement {
		padding: 20rpx;
		.roll {
			display: flex;
			width: 100%;
			background: #ebf6fe;
			border-radius: 33rpx;
			align-items: center;
			.icon{
				// margin-left: 24rpx;
				// margin-top: 4rpx;
				margin-right: 23rpx;
			}
		}
		.disimg{
			margin-top: 22rpx;
			display: flex;
			justify-content: space-between;
			.navbar{
				width: 315rpx;
				height: 187rpx;
				background: url(/static/home/pic_api.png) no-repeat;
				background-size: 100%;
				>view{
					font-size: 32rpx;
					margin-bottom: 4rpx;
				}
				>text{
					font-size: 20rpx;
				}
			}
			.navbar2{
				width: 314rpx;
				height: 87rpx;
				background: url(/static/home/pic_dianzi.png) no-repeat;
				background-size: 100% 100%;
			}
			.navbar3{
				margin-top: 13rpx;
				width: 314rpx;
				height: 87rpx;
				background: url(/static/home/pic_paihang.png) no-repeat;
				background-size: 100% 100%;
			}
		}
	}
	.u-notice-bar-wrap{
	  width: 100%;
		/deep/.u-notice-bar{
			padding: 12rpx 18rpx !important;
		}
	}
	.trade{
		margin-top: 26rpx;
		display: flex;
		padding: 36rpx;
		justify-content: space-between;
		.counterparty{
			flex: 1;
			display: flex;
			flex-direction: column;
			align-items: center;
			>text{
				font-family: Source Han Sans SC;
				font-weight: 800;
				flex: 1;
				padding: 0 10rpx;
				word-break: break-all;
				&:nth-child(1){
					color: #003333;
				}
				&:nth-child(2){
					margin: 16rpx 0;
					font-size: 36rpx;
				}
			}
		}
	}
	.bazaar{
		margin: 26rpx 0;
		padding: 20rpx;
		.tradeinfo{
			display: flex;
			justify-content: space-between;
			// margin-top: 46rpx;
			&:nth-child(1){
				margin-top: 0;
			}
			>view{
				width: 32%;
				display: flex;
				flex-direction: column;
				.Transcycle{
					font-size: 24rpx;
					width: 122rpx;
					height: 38rpx;
					background: #FF6C00;
					color: #17204D;
					text-align: center;
					line-height: 38rpx;
					border-radius: 10rpx;
				}
				&:last-child{
					width: 150rpx;
					flex-direction: row;
					justify-content: center;
					align-items: center;
					border-radius: 12rpx;
					
				}
				&:nth-child(2){
					// text-align: right;
				}
				
				>text{
					font-size: 28rpx;
					height: 34rpx;
					line-height: 34rpx;
					&:nth-child(2){
						font-size: 24rpx;
						margin-top: 4rpx;
					}
				}
			}
		}
	}
	/deep/.uicon-volume-fill:before {
	   color: #1391fe;
	}
	.gotoTop{
		position: fixed;
		bottom: 80rpx;
		right: 20rpx;
		width: 80rpx;
		line-height: 80rpx;
		border-radius: 50%;
		background: rgba(000,000,000,0.5);
		text-align: center;
	}
	/deep/.u-tab-bar{
		background-color: #279FFF !important;
	}
.upde-version{
	// position: fixed;
	// bottom: -1000rpx;
	// margin-bottom:-10000rpx;
	// visibility: hidden;
}
</style>
