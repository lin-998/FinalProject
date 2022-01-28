<template>
	<view id="containerId">
		<view class="mine-header">
			<view class="icon">
				<text @click="toRouter" class="iconfont">&#xe6da;</text>
			</view>
			<view class="user-info">
				<view class="info-img" @click="chooseAvatar">
					<image v-if="$store.state.userInfo.avatarUrl" :src="$store.state.userInfo.avatarUrl"></image>
					<image v-else src="/static/mine/user_por.jpg"></image>
				</view>
				<navigator class="info-detail" url="/pages/mine/setting/personal-data">
					
					<view class="info-id">{{$store.state.userInfo.username}}</view>
					<view class="info-name"><text>{{$store.state.userInfo.activeStatus?$store.state.userInfo.userRankName:'未激活会员'}}</text>
					</view>
				</navigator>
				<!-- <view class="upgrade-user" @click="Upgrade" v-if="AllCardLog.length!=0&&$store.state.userInfo.activeStatus!=0"> -->
				<view class="upgrade-user" @click="Upgrade" v-if="AllCardLog.length">
					<image src="/static/mine/hg.png" mode=""></image>
					升级
				</view>
			</view>
			<view class="img">
				
			<!-- <image class="img" src="/static/mine/bl.png" mode="widthFix"></image> -->
			</view>
		</view>
		<view class="mine-nav-in">
			<view class="mine-nav LittleBg">
				<view @click="urlTo(item.url)" class="nav-list" v-for="(item,index) in navList" :key="index">
					<view class="">
						<image :src="item.img" mode="widthFix"></image>
						<text>{{item.name}}</text>
					</view>
					<text class="iconfont">&#xe665;</text>
				</view>
			</view>
		</view>
		<view>
			<view v-if="show">
				<mine-login :show='show'></mine-login>
			</view>
			<u-modal v-model="deficiency" content="余额不足,是否前往充值" show-cancel-button @confirm="Recharge" @cancel="deficiency=false"></u-modal>
		</view>
			<mine-mask
			title='付费升级'
			selType='升级等级'
			inpType='交易密码'
			:allCardLog='AllCardLog'
			:show='upgradeShow' @onCancel='upgradeShow=false' @onAffirm='confirmUpgrade'></mine-mask>
	</view>
</template>

<script>
	import { apiUrl,imgUrl } from "@/api/app.js";
	import {mineApi,UploadApi,loginApi} from '@/api/myAjax.js'
	import {mainApi} from '@/api/appApi.js'
	import { JSEncrypt } from "@/common/jsencrypt.min.js";
	export default {
		data() {
			return {
				show:false,
				avatarUrl:'',
				deficiency:false,
				upgradeShow:false,
				apiUrl:apiUrl,
				navList: [
					{name:'我的激活码',img:require('static/mine/icon_jihuoma.png'),url:'/pages/mine/my-activecode'},
					// {name:'我的不分润卡',img:require('static/mine/wdbfrk.png'),url:'/pages/trading/my-profitcard'},
					{name:'交易记录',img:require('static/mine/icon_jiaoyijilu.png'),url:'/pages/trading/trading-record'},
					{name:'资产',img:require('static/mine/icon_zichang.png'),url:'/pages/mine/property/property'},
					{name:'分享',img:require('static/mine/icon_fenxiang.png'),url:'/pages/mine/share'},
					{name:'社区',img:require('static/mine/icon_shequ.png'),url:'/pages/mine/community'},
					{name:'关于我们',img:require('static/mine/icon_about.png'),url:'/pages/mine/about-us'},
					// {name:'联系我们',img:require('static/mine/lxwm.png'),url:'/pages/mine/about-us'},
				],
				sss:false,
				enterNumber:0,
				AllCardLog:[]
			};
		},
		onShow() {
			// if(!uni.getStorageSync('user')) {
			// 	return this.show=true
			// 	//跳转到登陆页面
			// }
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
									url:'/pages/minePage/minePage'
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
			this.show=false
		},
		created() {
			console.log(this.$store.state.userInfo.id)
			// if(!uni.getStorageSync('user')){return}
			// this.$store.dispatch('getUserInfo')
			// 监听从裁剪页发布的事件，获得裁剪结果
			uni.$on('uAvatarCropper', path => {
				this.avatarUrl = path;
				// console.log(path);
				console.log(this.sss);
				// 可以在此上传到服务端
				if(this.sss){
					this.sss=false
					uni.uploadFile({
						url: 'http://localhost:3000/api/v1/upload',
						filePath: path,
						name: 'file',
						// header:{"X-Requested-Token": uni.getStorageSync('userToken')},
						success: (res) => {
							if(JSON.parse(res.data).code!=200){return this.$toast('修改头像失败')}
							this.sss=false
							mainApi.setAvator({
								id:this.$store.state.userInfo.id,
								avator:JSON.parse(res.data).data,
								// username:this.$store.state.userInfo.username
								}).then(res=>{
									this.sss=false
								if(res.code==200){
									this.$toast('修改成功')
									this.$store.dispatch('getUserInfo')
								}else{
									this.$toast(res.msg)
								}
							})
						}
					});
				}
			})
		},
	
	
		methods:{
			
			confirmUpgrade(item,tradePassword){
				console.log(item);
				loginApi.getPublicKey({username:this.$store.state.userInfo.id}).then(res=>{
					var crypt = new JSEncrypt({
					  default_key_size: 1024,
					});
					crypt.setPublicKey(res.data);
					let password = crypt.encrypt(tradePassword);
					mineApi.buyRank({
						money:item.payUsdt,
						serialNumber:item.id,
						tradePassword:password
					}).then(res=>{
						if(res.code==200){
							this.$toast('升级成功')
							this.$store.dispatch('getUserInfo')
							this.getBuyRank()
							this.upgradeShow=false
						}else{
							if(res.code==1125){
								this.upgradeShow=false
								this.deficiency=true
							}else{
								this.$toast(res.msg)
							}
						}
					})
				})
			},
			//跳转充值页面
			Recharge(){
				this.deficiency=false
				uni.navigateTo({
					url:'/pages/mine/property/charge-money'
				})
			},
			//升级
			Upgrade(){
				if(!JSON.parse(uni.getStorageSync('user')).tradePassword){
					return this.$toast('请先设置交易密码')
				}
				
				this.upgradeShow=true
			},
			urlTo(url){
				if(this.$store.state.userInfo.activeStatus==0 && url=='/pages/mine/share'){
					return this.$toast('用户会员未激活，无法推荐分享')
				}
				uni.navigateTo({
					url:url
				})
			},
			toRouter(){
				uni.navigateTo({
					url:"/pages/mine/setting/setting"
				})
			},
			chooseAvatar() {
				this.sss=true
				// 此为uView的跳转方法，详见"文档-JS"部分，也可以用uni的uni.navigateTo
				this.$u.route({
					// 关于此路径，请见下方"注意事项"
					url: '/uview-ui/components/u-avatar-cropper/u-avatar-cropper',
					// 内部已设置以下默认参数值，可不传这些参数
					params: {
						// 输出图片宽度，高等于宽，单位px
						destWidth: 300,
						// 裁剪框宽度，高等于宽，单位px
						rectWidth: 200,
						// 输出的图片类型，如果'png'类型发现裁剪的图片太大，改成"jpg"即可
						fileType: 'jpg',
					}
				})
			},
		},
	}
</script>

<style lang="scss" scoped>
#containerId{
	height: 100%;
}
.mine-header{
	padding: 80rpx 30rpx 50rpx;
	background-color: #FFFFFF;
	position: relative;
	height: 460rpx;
	.img{
		width: 100vw;
		height: 186rpx;
		position: absolute;
		bottom: 0;
		right: 0;
		background: url(/static/mine/bl.png);
		background-size: 100%;
		// background-image: linear-gradient(to bottom,rgb(244, 195, 77), transparent);
	}
	.icon{
		text-align: right;
		margin-bottom: 23rpx;
		.iconfont{
			font-size: 40rpx;
			color: #999;
		}
	}
	.user-info{
		position: relative;
		margin: 0 40rpx;
		height: 260rpx;
		padding-left: 50rpx;
		background: url(/static/mine/pic_my.png) no-repeat;
		background-size: 100%;
		display: flex;
		// align-items: center;
		.info-img{
			width: 96rpx;
			height: 96rpx;
			border-radius: 50%;
			margin-right: 36rpx;
			margin-top: 50rpx;
			overflow: hidden;
			display: flex;
			align-items: center;
			justify-content: center;
			image{
				width: 96rpx;
				height: 96rpx;
			}
		}
		.info-detail{
			.info-name{
				font-family: PingFang SC;
				font-weight: 400;
				font-size: 32rpx;
				>text{
					color: #fff;
					font-family: PingFang SC;
					font-weight: 400;
					padding: 6rpx 12rpx;
					border: 1rpx solid #FFFFFF;
					border-radius: 22rpx;
					font-size: 20rpx;
				}
			}
			.info-id{
				color: #fff;
				margin-top: 50rpx;
				margin-bottom: 16rpx;
				font-size: 44rpx;
				font-family: Segoe UI;
				font-weight: 400;
			}
		}
		.upgrade-user{
			color: #fff;
			padding: 11rpx;
			display: flex;
			align-items: center;
			justify-content: center;
			position: absolute;
			top: 0;
			right: 0;
			width: 179rpx;
			background: linear-gradient(131deg, #FFE374 0%, #FF8113 100%);
			border-radius: 0rpx 16rpx 0rpx 16rpx;
			image{
				width:35.19rpx;
				height: 27.66rpx;
				margin-right: 8rpx;
			}
		}
	}
}
.mine-nav-in{
	margin-top: 20rpx;
	padding: 0 40rpx;
	padding-top: 20rpx;
	// height: 100%;
	height: calc(100% - 460rpx);
	background: linear-gradient(180deg, #FFFFFF 10%, #94BFFF 100%);
}
.mine-nav{
	display: flex;
	flex-direction: column;
	.nav-list{
		display: flex;
		justify-content: space-between;
		font-size: 28rpx;
		align-items: center;
		padding: 30rpx 40rpx;
		>view{
			display: flex;
			align-items: center;
			>image{
				width: 38rpx;
				margin-right: 26rpx;
			}
		}
		.iconfont{
			color: #99D0FC;
			font-size: 38rpx;
		}
	}
}
</style>
