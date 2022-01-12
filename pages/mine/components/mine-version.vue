<template>
	<view>
		<view @click="checkApp" v-if="verShow">
			<u-cell-item title="检查新版本" :value='version' :arrow='false'></u-cell-item>
		</view>
		<u-mask :show="show">
				<view class="warp">
					<view class="version">
						<view class="new-version">发现新版本</view>
						<view style="color: #fff;">v {{versionNum}}</view>
						<view class="be-updating">正在更新</view>
						<u-line-progress :percent='schedule.progress' :show-percent='false' active-color='#4B86FE' striped striped-active></u-line-progress>
						<view class="down-prog">{{schedule.totalBytesWritten}}/{{schedule.totalBytesExpectedToWrite}}</view>
						<view class="cancel" @click="cancel">取消升级</view>
					</view>
				</view>
			</u-mask>
	</view>
</template>

<script>
	import {mineApi,loginApi} from '@/api/myAjax.js'
	import filters from '@/common/filters.js'
	export default {
		props:{
			verShow:{
				type:Boolean,
				default:true
			},
			
		},
		data() {
			return {
				versionNum:'',
				schedule:{},
				show: false,
				downloadTask:null,
				time:10,
				isCheck:false
				// versionText:''
			};
		},
		computed:{
			version() {
				return getApp().globalData.version
			}
		},
		methods:{
			// 检查更新
			checkApp() {
				if(this.isCheck) return 
				this.isCheck = true
				this.checkFun()
			},
			checkFun() {
				loginApi.getVersionManage().then(res=> {
					console.log('<checkFun>', res);
					if(res.code == 200) { 
						this.isCheck = false
						this.checkJudge(res.data)
					} else {
						this.isCheck = false
					}
				})
			},
			// 版本更新判断,若版本一致,则检查是否有补丁更新,若版本不一致,则进行大版本更新
			checkJudge(data) {
				uni.getSystemInfo({
					success: (res)=> {
						// let appCheckSystemType = res.platform
						// if(data[appCheckSystemType] == null) return
						// 补丁更新
						this.checkWgtFun()
					}
				});
			},
			// 补丁更新
			checkWgtFun() {
				loginApi.getPatchManage().then(res=> {
					console.log('检查补丁更新包', res);
					console.log('<this.globalData.version>', uni.getStorageSync('appVersion'));
					if(res.code == 200) {
						let result = res.data.versionNum
						if(this.version.substr(0, 3) * 1 > result.substr(0, 3) * 1){
							if(this.verShow){
								this.$toast('当前为最新版本');
							}
							return
						} 
						if(this.version.replace(/\./g, "") * 1 >= result.replace(/\./g, "") * 1){
							if(this.verShow){
								this.$toast('当前为最新版本');
							}
							return
						}
						uni.showModal({
							title: '提示',
							content: '发现有新版本可以升级',
							cancelText: '取消更新',
							confirmText: '立即更新',
							success: res1 => {
								if (res1.confirm) {
									console.log('用户点击确定');
									console.log(res);
									// 补丁下载安装
									this.versionNum=res.data.versionNum
									this.downWgt(res.data.patchUrl)
								} else if (res1.cancel) {
									console.log('用户点击取消');
								}
							},
							fail: (err) => {
								console.log('下载失败', err);
							}
						});
					} else {
						this.isCheck = false
					}
				})
			},
			// 下载补丁
			downWgt(patchUrl) {
				let _this=this
				console.log(patchUrl);
				this.isCheck = false
				this.show = true
				this.downloadTask = uni.downloadFile({
					url:patchUrl,
					success: (downloadResult) => {
						if (downloadResult.statusCode === 200) {  
							plus.runtime.install(downloadResult.tempFilePath, {force: false}, ()=> {  
								_this.show =false
								plus.nativeUI.toast('最新版本下载完成')
								console.log('install success...');  
								plus.runtime.restart();  
							}, (e)=> {  
								_this.show =false
								plus.nativeUI.toast("补丁下载失败!")
							});  
						}
					},
					fail: (err) => {
						_this.show =false
						plus.nativeUI.toast("补丁下载失败!!")
					}
				})
				this.downloadTask.onProgressUpdate((res) => {
					
					if(this.time%10==0){
						this.schedule=res
						this.schedule.totalBytesExpectedToWrite=filters.sizeMB(res.totalBytesExpectedToWrite)
						this.schedule.totalBytesWritten=filters.sizeMB(res.totalBytesWritten)
					}
					this.time+=1
				});
			},
			// 关闭蒙层 中断下载
			cancel() {
				if(this.downloadTask) {
					this.$toast('取消下载安装!')
					this.downloadTask.abort()
					this.downloadTask = null
					this.show=false
					this.schedule={}
				}
			},
			// numFilter(size){
			// 	if(size<1024){
			// 		return size+'B'; 
			// 	}else if(size/1024>=1 && size/1024/1024<1){
			// 		return Math.floor(size/1024*100)/100+'KB';
			// 	}else if(size/1024/1024>=1){
			// 		return Math.floor(size/1024/1024*100)/100+'MB';
			// 	}
			// }
		}
	}
</script>

<style lang="scss" scoped>
.version{
	width: 521rpx;
	height: 583rpx;
	font-size: 24rpx;
	padding: 207rpx 44rpx 33rpx;
	background: url(/static/mine/gxt.png) no-repeat;
	background-size: 100% 100%;
	.new-version{
		font-size: 30rpx;
		color: #fff;
		margin-bottom: 7rpx;
		height: 45rpx;
		line-height: 45rpx;
	}
	.be-updating{
		margin-top: 96rpx;
		margin-bottom: 14rpx;
	}
	.down-prog{
		margin: 14rpx 0;
	}
	.cancel{
		text-align: right;
		color: #2CA6F8;
	}
}
</style>
