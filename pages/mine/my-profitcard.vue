<template>
	<view class="my-code">
		<block v-if="AllCardLog.length>0">
			<view class="unpurchased overdue">
				<view class="unpurchased-title">不分润卡时限：半年卡<text>已到期</text></view>
				<view class="time-buying">购买时间：2020-12-03  08:30:12</view>
				<view class="time-buying">到期时间：2020-12-03  08:30:12</view>
			</view>
			<view class="unpurchased">
				<view class="unpurchased-title">不分润卡时限：半年卡</view>
				<view class="time-buying">购买时间：2020-12-03  08:30:12</view>
				<view class="time-buying">到期时间：2020-12-03  08:30:12</view>
			</view>
		</block>
		<view class="unpurchased2" v-else>
			<!-- <image src="/static/mine/jhcg2.png" mode="widthFix"></image> -->
			<text>暂无不分润卡</text>
		</view>
			<mine-mask 
			title='购买不分润卡'
			selType='购买时限'
			inpType='交易密码'
			:allCardLog='AllCardLog'
			:show='show' @onCancel='show=false' @onAffirm='onAffirm'></mine-mask>
	</view>
</template>

<script>
	import {publicFun} from '@/api/myFun.js'
	import {mineApi,loginApi} from '@/api/myAjax.js'
	import { JSEncrypt } from "@/common/jsencrypt.min.js";
	export default {
		data() {
			return {
				timeType:{
					5:'五分钟卡',
					2:'月卡',
					3:'半年卡',
					4:'年卡'
				},
				show: false,
				AllCardLog: [{},{}],
				tradePassword: '',
				Password:'',
				userInfo:{},
				active:0,
				CardCost:[{cost:0}],
				pageSize:10,
				total:0
			}
		},
		methods: {
			onAffirm(item){
				console.log(item);
			},
			purchase(){
				if(!this.userInfo.tradePassword){
					return this.$toast('检测到还未设置交易密码，请先前往设置')
				}
				this.show=true
			},
			cody(data) {
				publicFun.cody(data)
			},
			buyCard() {
				mineApi.buyCard({
					cardId: this.CardCost[this.active].id,
					payPassword:this.tradePassword
				}).then(res => {
					this.show = false
					this.tradePassword=''
					if (res.code == 200) {
						this.$toast('购买成功')
						this.$store.dispatch('getUserInfo')
						this.getAllCardLog()
					}else{
						this.$toast(res.msg)
					}
				})
			},
			getAllCardLog() {
				mineApi.getAllCardLog({
					cardType: 1,
					pageNum:1,
					pageSize:this.pageSize
				}).then(res => {
					if (res.code == 200) {
						this.AllCardLog = res.data.rows||[]
						this.total=res.data.total
					} else {
						this.$toast(res.msg)
					}
				})
			},
			getAllCardCost(){
				mineApi.getAllCardCost({cardType:1}).then(res=>{
					this.CardCost=res.data
				})
			}
			},

		onLoad() {
			return 
			this.userInfo=JSON.parse(uni.getStorageSync('user'))
			this.getAllCardLog()
			this.getAllCardCost()
		},
		onNavigationBarButtonTap(){
			// if(!this.userInfo.tradePassword){
			// 	return this.$toast('检测到还未设置交易密码，请先前往设置')
			// }
			this.show=true
		},
		onReachBottom(){
			if(this.pageSize>this.total)return this.$toast('数据已经加载完了')
			this.pageSize+=10
			this.getAllCardLog()
		},
		onPullDownRefresh() {
			this.pageSize=10
			mineApi.getAllCardLog({cardType: 1}).then(res=>{
				uni.stopPullDownRefresh()
				if(res.data){
					this.$toast('下拉刷新成功')
					console.log(res);
					this.AllCardLog = res.data.rows||[]
					this.total=res.data.total
				}else{
					this.$toast('下拉刷新失败')
				}
			}).catch(()=>{
				uni.stopPullDownRefresh()
				this.$toast('网络异常，请稍后再试')
			})
			
		}
	}
</script>

<style lang="scss" scoped>
	.my-code {
		padding: 50rpx 0 0;
		.unpurchased{
			margin: 0 auto 40rpx;
			width: 528rpx;
			height: 248rpx;
			background: url(/static/mine/jhcg.png) no-repeat;
			background-size: 100% 100%;
			padding: 46rpx 0 0 46rpx;
			color: #fff;
			.unpurchased-title{
				display: flex;
				justify-content: space-between;
				align-items: center;
				font-size: 30rpx;
				>text{
					margin-top: -40rpx;
					background-color: #52555B;
					opacity: .5;
					font-size: 24rpx;
					padding: 4rpx 20rpx;
					border-radius: 8px 0px 0px 8px;
				}
			}
			.time-buying{
				margin-top: 20rpx;
				opacity: 0.8;
			}
		}
		.overdue{
			background: url(/static/mine/jhcg2.png) no-repeat;
			background-size: 100% 100%;
		}
		.unpurchased2{
			text-align: center;
			margin: 0 auto;
			width: 528rpx;
			height: 248rpx;
			background: url(/static/mine/jhcg2.png) no-repeat;
			background-size: 100% 100%;
			text{
				font-size: 36rpx;
				color: #FFFFFF;
				line-height: 248rpx;
			}
		}
	}
</style>
