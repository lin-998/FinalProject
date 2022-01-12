<template>
	<view class="share">
		<view class="share-bgimg">
			<mine-share :placardData='placardData' @changeUrl='(res)=>{posterUrl=res}'></mine-share>
		</view>
		<view class="Invitation-code">
			<view>邀请码：</view>
			<view>{{valCode}}</view>
			<u-button ref="fds" type="warning" class="btn" @click="cody(valCode)">点击复制</u-button>
		</view>
		<u-button type="primary" class="submitBtn btn2" @click="capture">保存</u-button>
	</view>
</template>

<script>
	import {publicFun} from '@/api/myFun.js'
	import {mineApi,loginApi} from '@/api/myAjax.js'
	import { imgUrl } from "@/api/app.js";
	export default {
		data() {
			return {
				placardData:{
					bgUrl:require('static/mine/bg_share.png'),//背景图
					// bgUrl2:require('static/mine/bg_share2.png'),//logo
					// bgUrl3:require('static/mine/bg_share3.png'),//邀请好友
					codeText:'http://47.57.2.94/quantized/home.html?invitationCode=BD4V95',//二维码内容
					valCode:'816516'
				},
				valCode:'816516',
				posterUrl:''
			};
		},
		methods:{
			cody(data) {
				publicFun.cody(data)
			},
			
			getInvitationQRCode(){
				mineApi.getInvitationQRCode({userId:this.$store.state.userInfo.id}).then(res=>{
				if(res.code==200){
					this.placardData.codeText=res.data
					this.valCode=res.data.split('=')[1]
					this.placardData.valCode=res.data.split('=')[1]
				}else{
					this.$toast(res.msg)
				}
				})
			},
			capture() {
				console.log(this.posterUrl);
			  uni.saveImageToPhotosAlbum({ //保存图片
			  	filePath: this.posterUrl,
			  	success: (res) => {
			  		uni.showToast({
			  			title: '保存成功',
			  		})
			  	},
			  	fail(r) {
			  		console.log(r)
			  	}
			  })
			},
		},
		created() {
			this.getInvitationQRCode()
				loginApi.getCommonSetUp().then(res=>{
					if(res.code==200){
						let url=res.data.backgroundImageUrl||'/static/mine/bg_share.png'
						// this.placardData.bgUrl=imgUrl+url
					}else{
						// this.placardData.bgUrl='/static/mine/bg_share.png'
					}
				})
		},
	}
</script>

<style lang="scss" scoped>
.share{
	height:100%;
	padding:100rpx 90rpx;
	text-align: center;
	.share-bgimg{
		width: 100%;
		height: 786rpx;
		overflow: hidden;
		box-shadow: 0rpx 3rpx 57rpx rgba(198, 213, 222, 0.46);
		border-radius: 16rpx;
	}
	.Invitation-code{
		margin-top: 70rpx;
		display: flex;
		text-align: center;
		justify-content: center;
		align-items: center;
	}
	.btn{
		width: 186rpx;
		height: 48rpx;
		background: #F9AF43;
		box-shadow: 0rpx 15rpx 19rpx #FFF0D9;
		border-radius: 24rpx;
		font-size: 24rpx;
		padding: 0;
		margin: 0;
		margin-left: 40rpx;
	}
	.btn2{
		margin-top: 44rpx;
	}
}
</style>
