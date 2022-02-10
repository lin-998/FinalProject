
<script>
	import {loginApi,tradingApi} from '@/api/myAjax.js'
	export default {
		globalData: {
			version: "1.0.7",
		},
		methods:{
			// 检查更新
			checkApp() {
				// if(this.isCheck) return 
				// #ifdef APP-PLUS
				plus.nativeUI.showWaiting()
				// #endif
				// this.isCheck = true
				this.checkFun()
			},
			checkFun() {
				loginApi.getVersionManage().then(res=> {
					console.log('<checkFun>', res);
					if(res.code == 200) { 
						// this.isCheck = false
						this.checkJudge(res.data)
					} else {
						// this.isCheck = false
						// #ifdef APP-PLUS
						plus.nativeUI.closeWaiting()
						// #endif
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
					// #ifdef APP-PLUS
					plus.nativeUI.closeWaiting()
					// #endif
					console.log('检查补丁更新包', res);
					console.log('<this.globalData.version>', uni.getStorageSync('appVersion'));
					if(res.code == 200) {
						let result = res.data.versionNum
						if(getApp().globalData.version.substr(0, 3) * 1 > result.substr(0, 3) * 1) return
						if(getApp().globalData.version.replace(/\./g, "") * 1 >= result.replace(/\./g, "") * 1) return
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
						// this.isCheck = false
					}
				})
			},
			// 下载补丁
			downWgt(patchUrl) {
				console.log(patchUrl);
				// this.isCheck = false
				// this.show = true
				let downloadTask = uni.downloadFile({
					url:patchUrl,
					success: (downloadResult) => {
						if (downloadResult.statusCode === 200) {  
							plus.runtime.install(downloadResult.tempFilePath, {force: false}, ()=> {  
								// this.isShow =false
								plus.nativeUI.toast('最新版本下载完成')
								console.log('install success...');  
								plus.runtime.restart();  
							}, (e)=> {  
								// this.isShow =false
								plus.nativeUI.toast("补丁下载失败")
								this.$toast(e)
								console.error('install fail...', e);  
							});  
						}
					},
					fail: (err) => {
						plus.nativeUI.toast("补丁下载失败")
						console.log(err);
					}
				})
				downloadTask.onProgressUpdate((res) => {
					this.percent = res.progress
				});
			},
			// 关闭蒙层 中断下载
			// close() {
			// 	if(this.downloadTask) {
			// 		this.$toast('取消下载安装!')
			// 		this.downloadTask.abort()
			// 		this.downloadTask = null
			// 	}
			// }
			// getFreeBalance(){
			// 	tradingApi.getFreeBalanceOkey().then(res=>{
			// 		if(res.code == 200){
			// 			console.log(res);
			// 			this.$store.commit('getAccount_positions',res.data)
			// 		}
			// 	})
			// },
		},
		onLaunch: function() {
			// 保存 app 版本信息
			// #ifdef APP-PLUS
			plus.runtime.getProperty(plus.runtime.appid, (widgetInfo)=> {
				// console.log('widgetInfo', widgetInfo);
				getApp().globalData.version = widgetInfo.version;
				uni.setStorageSync('appVersion', getApp().globalData.version)
				// this.checkApp()
			});
			// #endif
			// let user = '1364867272597045249'
			// if(uni.getStorageSync('user')){
			// 	user=this.$store.state.userInfo.id
			// }
			// this.$store.dispatch('connectSocket',{id:user,type:'all'})
			console.log('App Launch')
		},
		onShow: function() {
			console.log('App Show')
			if(uni.getStorageSync('user')) {
				this.$store.dispatch('getUserInfo')
				// this.getFreeBalance()
			}
		},
		onHide: function() {
			console.log('App Hide')
		}
	}
</script>

<style lang="scss">
	/* #ifndef APP-PLUS-NVUE */
	@import "./common/css/base.css";
	@import "./uview-ui/index.scss";
	@import "./utils/iconfont/iconfont.css";
	/* #endif*/
</style>
