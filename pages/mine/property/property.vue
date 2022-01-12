<template>
	<view>
		<u-navbar back-icon-color="#fff" title-color="#fff" title="资产" :background="{background:'rgba(220,38,38,0)'}" :border-bottom='false'>
		</u-navbar>
		<view class="detail-header">
			<view class="total-assets">总资产折合(USDT)</view>
			<view class="total-all">{{userUsdt.availableUSDT | numFilter(4)}}</view>
			<view class="total-btn">
				<u-button type="success" class="btn btn1" @click="ChargeMoney">充币</u-button>
				<u-button type="success" class="btn btn2" @click="MentionMoney">提币</u-button>
				<u-button type="success" class="btn btn3" @click="TransfersBetween">互转</u-button>
			</view>
		</view>
		<view class="property">
			<view class="title">
				<view>
					<text class="iconfont icon">&#xe613;</text>
					<text class="subtitle">历史记录</text>
				</view>
				<text @click="showPicker=true" class="iconfont icon">&#xe616;</text>
			</view>
			<scroll-view scroll-y="true" class="sroll" @scrolltolower='scrolltolower' lower-threshold='50'>
				<view class="property-list LittleBg" v-for="(item,index) in TransactionRecord" :key="index">
					<view>
						<text>数量</text>
						<text :class="item.remark>0?'amount greentype':'amount redtype'">{{item.amount*Number(item.remark)}}</text>
					</view>
					<view>
						<text>类型</text>
						<text class="amount">{{item.transferType}}</text>
					</view>
					<view>
						<text>时间</text>
						<text class="amount">{{item.createTime}}</text>
					</view>
				</view>
				<view v-if="TransactionRecord.length==0">
					<defalut-img></defalut-img>
				</view>
			</scroll-view>
		</view>
		<u-picker mode="selector" v-model="showPicker" title="请选择" :default-selector="defSel" :range="selector" @confirm="confirm"></u-picker>
	</view>
</template>

<script>
	import {mineApi,tradingApi} from '@/api/myAjax.js'
	export default {
		data() {
			return {
				defSel:[0],
				arr:[1,2,3,4,5,6],
				isfun:false,
				istoast:0,
				showPicker:false,
				// selector: ['全部','提现','充值','扣除信用分','手续费','推荐奖','团队奖','激活码','互转','提现拒绝','付费升级'],
				selector: ['全部','提现','充值','扣除信用分','推荐奖','团队奖','激活码','互转','提现拒绝','付费升级'],
				userUsdt:{},
				TransactionRecord:[],
				pageNum:1,
				pageSize:10,
				total:0,
				transferType:'',
				userUsdtamout:0
			};
		},
		methods:{
			confirm(e){
				console.log(e);
				this.defSel=e
				this.pageSize=10
				this.transferType=e[0]>0?e[0]-1:''
				this.getTransactionRecord()
			},
			// 充币
			ChargeMoney(){
				uni.navigateTo({
					url:"/pages/mine/property/charge-money?id="+this.userUsdt.addr
				})
			},
			// 提币
			MentionMoney(){
				if(JSON.parse(uni.getStorageSync('user')).phone.length>11){
					return this.$toast('请先绑定手机号码')
				}else if(!JSON.parse(uni.getStorageSync('user')).tradePassword){
					return this.$toast('请先设置交易密码')
				}
				uni.navigateTo({
					url:"/pages/mine/property/mention-money"
				})
			},
			// 互转
			TransfersBetween(){
				if(JSON.parse(uni.getStorageSync('user')).phone.length>11){
					return this.$toast('请先绑定手机号码')
				}else if(!JSON.parse(uni.getStorageSync('user')).tradePassword){
					return this.$toast('请先设置交易密码')
				}
				uni.navigateTo({
					url:"/pages/mine/property/transfers-between"
				})
			},
			//获取用户USDT余额
			// getFreeBalance(){
			// 	tradingApi.getFreeBalance().then(res=>{
			// 		console.log(res);
			// 		if(res.code==200)
			// 		this.userUsdt=res.data
			// 	})
			// },
			// //获取用户USDT余额
			getFreeBalance(){
				tradingApi.getFreeBalance({userId:this.$store.state.userInfo.id}).then(res=>{
					console.log(res);
					if(!res.data)return this.userUsdtamout='';
					this.userUsdt=res.data
				})
			},
			//上拉触底
			scrolltolower(){
				if(this.pageSize<this.total){
					this.pageSize+=10
					this.isfun=true
					this.$toast('加载中...')
					this.getTransactionRecord()
				}else{
					this.$toast('数据已加载完')
				}
			},
			//获取历史交易记录
			getTransactionRecord(){
				mineApi.getTransactionRecord({
					pageNum:this.pageNum,
					pageSize:this.pageSize,
					transferType:this.transferType
				}).then(res=>{
					console.log(res);
					if(res.code==200){
						if(this.isfun){
							this.isfun=false
							this.$toast('加载成功')
						}
						this.TransactionRecord=res.data.rows||[]
						this.total=res.data.total
					}else{
						this.$toast(res.msg)
					}
				})
			}
		},
		onLoad() {
			// this.getaddr()
			this.getFreeBalance()
			this.getTransactionRecord()
		}
	}
</script>

<style lang="scss" scoped>
.navbar-rigth{
	margin-right: 30rpx;
	font-size: 24rpx;
}
.detail-header{
	padding: 0 40rpx;
	margin-top: calc(-95rpx - var(--status-bar-height));
	padding-top: calc(100rpx + var(--status-bar-height));
	min-height: 426rpx;
	background: url(/static/mine/pic_zichang.png) no-repeat;
	background-size: 100%;
	.total-assets{
		margin-top: 10rpx;
		font-size: 32rpx;
		color: #fff;
	}
	.total-all{
		font-size: 58rpx;
		font-weight: 600;
		margin: 20rpx 0;
		color: #fff;
	}
	.total-btn{
		display: flex;
		justify-content: space-around;
		.btn{
			width: 192rpx;
			height: 60rpx;
			border-radius: 16rpx;
			background: #6AB9FF;
			margin-left: 0;
			margin-right: 0;
			&::after{
				border: none;
			}
		}
	}
}
.property{
	padding: 40rpx 0 0;
	.title{
		margin: 0 40rpx;
		height: 40rpx;
		display: flex;
		justify-content: space-between;
		align-items: center;
		>view{
			font-size: 28rpx;
			display: flex;
			align-items: center;
			.iconfont{
				margin-right: 20rpx;
				font-size: 32rpx;
			}
		}
		.icon{
			color: #00b9ff;
			font-size: 40rpx;
		}
		.subtitle{
			font-weight: 600;
		}
	}
	.sroll{
		height: calc(100vh - 530rpx);
		margin-top: 20rpx;
	}
	.property-list{
		margin: 0 40rpx;
		margin-top: 30rpx;
		padding: 40rpx 20rpx;
		display: flex;
		justify-content: space-between;
		.amount{
			font-weight: 600;
		}
		>view{
			width: 180rpx;
			display: flex;
			flex-direction: column;
			align-items: center;
			&:last-child{
				width: 320rpx;
			}
			>text{
				font-size: 28rpx;
				opacity: 0.7;
				&:last-child{
					margin-top: 16rpx;
					opacity: 1;
				}
			}
			.greentype{
				color: #2BEC8A;
			}
			.redtype{
				color: #FB452F;
			}
		}
	}
}
</style>