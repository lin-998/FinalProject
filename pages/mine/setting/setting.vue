<template>
	<view class="setting">
		<view class="setting-in LittleBg">
			<view @click="settingInstall(item)" v-for="(item,index) in settingList" :key="index">
				<u-cell-item :title="item.title"></u-cell-item>
			</view>
			<view @click="clearCache">
				<u-cell-item title="清除缓存"></u-cell-item>
			</view>
			<mine-version></mine-version>
		</view>
		<u-button class="logout" type="primary" @click="outIn">退出登录</u-button>
	</view>
</template>

<script>
	import {mineApi,loginApi} from '@/api/myAjax.js'
	import filters from '@/common/filters.js'
	export default {
		data() {
			return {
				settingList:[
					{title:'个人资料',url:'/pages/mine/setting/personal-data'},
					{title:'手机号码',url:'/pages/mine/setting/phone-number'},
					{title:'修改登录密码',url:'/pages/mine/setting/login-password'},
					{title:'修改交易密码',url:'/pages/mine/setting/pay-password'},
					// {title:'联系我们',url:'/pages/mine/setting/contact-us'},
				],
			};
		},
		computed:{
			version() {
				return getApp().globalData.version
			}
		},
		methods:{
			settingInstall(item){
				if(item.title=='修改登录密码'||item.title=='修改交易密码'){
					if(JSON.parse(uni.getStorageSync('user')).phone.length>11){
						return this.$toast('请先绑定手机号码')
					}
				}
				uni.navigateTo({
					url:item.url
					// +'?userInfo='+JSON.stringify(this.userInfo)
				})
			},
			clearCache(){
				let _this=this
				// #ifdef APP-PLUS
				// 删除本地已保存的文件列表。
				let cacheSize=null
				plus.cache.calculate( function ( size ) { //size是多少个字节单位是b
				
					cacheSize=filters.sizeMB(size)
					//可以询问用户是否删除
					uni.showModal({
						title:'提示',
						content:`当前所占内存为${cacheSize},确定清除缓存吗?`,
						success(res) {
							// _this.$toast('缓存清除成功')
							 // 用户确定要删除
							if(res.confirm){
								// this.$toast('缓存清除成功')
								 //使用plus.cache.clear 清除应用中的缓存数据 这里清除后还要二十几KB没有清除，达不到全部清除
								plus.cache.clear( function (res) {
									_this.$toast('缓存清除成功')
								});	
							}
						}
					})
				})
				// #endif
				// this.$toast('缓存清除成功')
			},
			outIn(){
				uni.clearStorageSync()
				uni.redirectTo({
					url:'/pages/login/login'
				})
			}
		},
		onShow() {
			if(uni.getStorageSync('user')){
				this.userInfo=JSON.parse(uni.getStorageSync('user'))
			}
		}
	}
</script>

<style lang="scss" scoped>
.setting{
	padding: 40rpx;
}
.setting-in{
	padding: 0 30rpx;
}
.logout{
	width: 562rpx;
	height: 90rpx;
	background: $uni-color-theme;
	border-radius: 66rpx;
	margin-top: 100rpx;
	&::after{
		border: none;
	}
}
.u-cell{
	padding-right: 0;
}
/deep/.u-cell_title{
	// margin-left: 10rpx !important;
}
.u-border-bottom:after{
	border: none !important;
}
</style>
