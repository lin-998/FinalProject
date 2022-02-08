<template>
	<view>
		<view class="status_bar1"></view>
		<view class="status_bar"></view>
		<view class="nav-list">
			<view class="">text3</view>
			<view class="" @click="instructor=!instructor">text56</view>
		</view>
		<view class="top-box">
			<view class="top-item" v-for="(v,i) in topList" :key="i" @click="goPages(v.type)">
				<image class="top-img" :src="v.image" mode=""></image>
				<view>{{v.name}}</view>
			</view>
		</view>
		<view class="msg-list">
			<view class="msg-item">
				<view class="portrait">
					<u-badge  type="error" count="7" ></u-badge>					
					<u-image width="106" height="106" src="/static/message/gfxzs.png" shape="circle"></u-image>
				</view>
				<view class="msg-right">
					<view class="msg-content">
						<view class="msg-name-time">
							<view class="msg-name">官方小助手</view><view class="msg-time">03-19</view>
						</view>
						<view class="msg-text">恭喜你抽中1个月会员试用卡，快点击进入恭喜你抽中1个月会员试用卡，快点击进入</view>					
					</view>
					
				</view>
			</view>
			<view class="msg-item" v-for="(v,i) in msgList" :key="i">
				<view class="portrait">
					<u-badge  type="error" :count="7+i" ></u-badge>					
					<u-image width="106" height="106" src="/static/message/dz.png" shape="circle"></u-image>
				</view>
				<view class="msg-right">
					<view class="msg-content">
						<view class="msg-name-time">
							<view class="msg-name">官方小助手</view><view class="msg-time">03-19</view>
						</view>
						<view class="msg-text">恭喜你抽中1个月会员试用卡，快点击进入恭喜你抽中1个月会员试用卡，快点击进入</view>					
					</view>
					
				</view>
			</view>
		</view>
<!-- 		<u-popup v-model="instructor" mode="center">
			<view class="pup-box">
				<view class="pup-title"></view>
				<view class="pup-text">Se E(U5BBB)</view>
				<view class="pup-btn">
					<view class="btn-mod cel-btn" @click="instructor=false">LANGUAGE.Home.text10</view>
					<view class="btn-mod rgt-btn">LANGUAGE.Forum.text63</view>
				</view>
			</view>
		</u-popup> -->
		<!-- <defalut-tabbar :barList="barList" :index="3"></defalut-tabbar> -->
	</view>
</template>

<script>
	import { Utils } from "@/common/common.js"
	export default {
		data() {
			return {
				instructor:false,
				barList:[],
				topList:[],
				msgList:[
					{},
					{},
					{},
					{},
					{},
					{},
					{},
					{},
				]
			}
		},
		onShow() {
			this.barList = [
				'hhhu',
				'hhhu',
				'hhhu',
				'hhhu',
				'hhhu',
			]
			this.topList = [
				{image:require('static/message/dz.png'),name:'ss',type:"like"},
				{image:require('static/message/pl.png'),name:'ss',type:"comment"},
				{image:require('static/message/ql.png'),name:'gg',type:"myGroup"},
			]
		},
		methods: {
			goPages(type){
				// uni.navigateTo({
				// 	url:Utils.SwithRouter(type)
				// })
			},
		}
	}
</script>

<style lang="scss" scoped>
.nav-list{
	width: 100%;
	padding:  24rpx;
	display: flex;
	align-items: center;
	justify-content: space-between;
}
.top-box{
	display: flex;
	align-items: center;
	justify-content: space-between;	
	padding: 30rpx 96rpx 25rpx;
	.top-item{
		display: flex;
		align-items: center;
		flex-direction: column;
		.top-img{
			width: 106rpx;
			height: 106rpx;
			margin-bottom: 29rpx;
			
		}
	}
}
.msg-list{
	padding-bottom: 150rpx;
	.msg-item{
		display: flex;
		.portrait{
			width: 160rpx;
			height: 150rpx;
			display: flex;
			align-items: center;
			justify-content: center;
			position:relative
		}
		.msg-right{
			flex: 1;
			// border-bottom: 1rpx solid #47505D;
			display: flex;
			align-items: center;
			.msg-content{
				width: 100%;
				.msg-name-time{
					display: flex;
					align-items: center;
					justify-content: space-between;
				}
				.msg-name{
					color: #222222;
					font-size: 26rpx;
					margin-bottom: 7rpx;
					font-weight: 700;
				}
				.msg-text{
					width: 465rpx;
					overflow: hidden;
					text-overflow:ellipsis;
					white-space: nowrap;
					color: #858F99;
					font-size: 24rpx;
				}
			}
			.msg-time{
				width: 124rpx;
				display: flex;
				align-items: center;
				justify-content: center;
				color: #5C6270;
				font-size: 20rpx;
			}
		}
	}
}
.pup-box{
	width: 560rpx;
	background-color: #29313C;
	border-radius: 16rpx;
	padding: 30rpx 0 45rpx;
	display: flex;
	flex-direction: column;
	align-items: center;
	.pup-title{
		color: #FFFFFF;
		font-size: 30rpx;
		line-height: 50rpx;
		margin-bottom: 33rpx;
	}
	.pup-text{
		color: #FFFFFF;
		font-size: 26rpx;
		line-height: 37rpx;
		margin-bottom: 49rpx;
	}
	.pup-btn{
		width: 100%;
		padding: 0 49rpx;
		display: flex;
		justify-content: space-between;
		.btn-mod{
			width: 212rpx;
			height: 70rpx;
			border-radius: 35rpx;
			display: flex;
			align-items: center;
			justify-content: center;
			font-size: 26rpx;
		}
		.cel-btn{
			background-color: #4F586A;
			color: #FFF;
		}
		.rgt-btn{
			background-color: #FED30A;
			color: #171E28;
		}
	}
}
/deep/.u-mode-center-box{
	background-color: transparent;
}
</style>
