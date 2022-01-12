<template>
	<view class="community">
		<!-- <u-navbar title="社区" :background="{background:'rgba(220,38,38,0)'}" :border-bottom='false' title-color="#FFF" back-icon-color="#FFF"></u-navbar> -->
		<view class="bgimage">
			<scroll-view scroll-y="true" class="scroll">
				<view class="community-in">
					<view class="keep-pushing bgcolor">
						<image src="/static/mine/font_zhitui.png" mode="widthFix"></image>
						<view class="pushing-info">
							<view class="">
								<text class="">{{community.directPushActivation||'0'}}</text>
								<text class="">已激活</text>
							</view>
							<text></text>
							<view class="">
								<text class="">{{community.directPushNoActivation||'0'}}</text>
								<text class="">未激活</text>
							</view>
						</view>
						<view class="pushing-info">
							<view class="">
								<text class="">{{community.directPushTotalProfit||'0.0000'}}</text>
								<text class="">直推总盈利</text>
							</view>
							<text></text>
							<view class="">
								<text class="">{{community.directPushTodayTotalProfit||'0.0000'}}</text>
								<text class="">直推今日盈利</text>
							</view>
						</view>
					</view>
					<view class="keep-pushing bgcolor">
						<image src="/static/mine/font_shequ.png" mode="widthFix"></image>
						<view class="pushing-info">
							<view class="">
								<text class="">{{community.numberOfCommunityActivation||'0'}}</text>
								<text class="">已激活</text>
							</view>
							<text></text>
							<view class="">
								<text class="">{{community.numberOfCommunityNoActivation||'0'}}</text>
								<text class="">未激活</text>
							</view>
						</view>
						<view class="pushing-info">
							<view class="">
								<text class="">{{community.numberOfCommunityTotalProfit||'0.0000'}}</text>
								<text class="">社区总盈利</text>
							</view>
							<text></text>
							<view class="">
								<text class="">{{community.numberOfCommunityTodayTotalProfit||'0.0000'}}</text>
								<text class="">社区今日盈利</text>
							</view>
						</view>
					</view>
					<view class="keep-pushing bgcolor">
						<image src="/static/mine/font_kehu.png" mode="widthFix"></image>
						<view class="client-info">
							<view class="info-list list-one">
								<text>账号</text>
								<text>直推人数</text>
								<text>社区人数</text>
								<text>日盈利</text>
								<text>第几代</text>
								<text>注册时间</text>
								<text>状态</text>
							</view>
							<view class="info-list" v-for="(item,index) in community.directPushUserDataDTOList" :key="index">
								<text>{{item.userName}}</text>
								<text>{{item.directPushTotalPeople}}</text>
								<text>{{item.communityTotalPeople}}</text>
								<text>{{item.todayTotalProfit}}</text>
								<text>{{item.algebra}}</text>
								<text>{{item.createTime}}</text>
								<text>{{item.isActivation?'激活':'未激活'}}</text>
							</view>
							<view class="" v-if="community.directPushUserDataDTOList.length==0" style="color: #fff;margin: 40rpx 0;">
								暂无数据
							</view>
						</view>
					</view>
				</view>
			</scroll-view>
		</view>
	</view>
</template>

<script>
	import {mineApi} from '@/api/myAjax.js'
	export default {
		data() {
			return {
				community:{
					directPushUserDataDTOList:[]
				}
			};
		},
		methods:{
			getUserCommunity(){
				mineApi.getUserCommunity().then(res=>{
					if(res.code==200){
						this.community=res.data||{}
						this.community.directPushUserDataDTOList.map(val=>{
							val.createTime=val.createTime.split(' ')[0]
						})
					}else{
						this.$toast(res.msg)
					}
				})
			}
		},
		created() {
			this.getUserCommunity()
		}
	}
</script>

<style lang="scss" scoped>
.bgcolor{
	padding: 20rpx 20rpx 0;
	// background: #0042A5;	
	border-radius: 16rpx;
	>image{
		width: 214rpx;
		// border-left: 4rpx solid #FFD894;
		// border-right: 4rpx solid #FFD894;
		// padding: 0 20rpx;
	}
}
.community{
	.bgimage{
		width: 100vw;
		height: 100vh;
		position: fixed;
		top: 0;
		background: url(/static/mine/bg_shequ.png) no-repeat;
		background-size: 100% 100%;
		.scroll{
			height:100%;
			// margin-top: calc(88rpx + var(--status-bar-height));
		}
	}
	.community-in{
		padding: 50rpx 30rpx 20rpx;
		.keep-pushing{
			// margin-top: 24rpx;
			text-align: center;
			.pushing-info{
				margin-top: 20rpx;
				padding: 18rpx 0;
				height: 140rpx;
				background: rgba(28, 51, 168, 0.56);
				box-shadow: 0rpx 1rpx 19rpx #1C33A8;
				border-radius: 16rpx;
				display: flex;
				>view{
					flex: 1;
					display: flex;
					flex-direction: column;
					align-items: center;
					justify-content: space-between;
					>text{
						color: #fff;
						font-size: 40rpx;
						// font-family: Source Han Sans SC;
						font-weight: 600;
						&:last-child{
							font-weight: 500;
							font-size: 28rpx;
							opacity: 0.8;
						}
					}
				}
				>text{
					margin-top: 10rpx;
					height: 86rpx;
					border: 2rpx solid #97A4F8;
					opacity: 0.25;
				}
			}
			.client-info{
				margin-top: 20rpx;
				border-radius: 16rpx;
				box-shadow: 0rpx 2rpx 26rpx #153CDB;
				overflow: hidden;
				.info-list{
					background: rgba(69, 93, 235, 0.42);
					display: flex;
					padding: 30rpx 0;
					&:nth-child(2n+1){
						background:rgba(35, 60, 215, 0.56);
					}
					>text{
						color: #fff;
						display: flex;
						align-items: center;
						justify-content: center;
						width: 75rpx;
						margin-left: 20rpx;
						font-size: 24rpx;
						&:last-child{
						margin-right: 20rpx;
						}
					}
				}
				.list-one{
					opacity: 1;
					padding: 20rpx 0;
					background: rgba(35, 60, 215, 0.56);
					// margin-bottom: 30rpx;
					>text{
						color: #fff;
						font-size: 28rpx;
					}
				}
			}
		}
	}
}
</style>
