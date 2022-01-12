<template>
	<view class='page'>
		<canvas canvas-id="myCanvas" id='sss'></canvas>
		<u-mask :show="show" @click="show = false">
				<view class="mask">
					<view class="mask-in" @tap.stop>
						<image :src="base64" mode="widthFix" v-if="base64"></image>
						<button type="primary" class="btn" @click='bcFn'>保存图片</button>
					</view>
				</view>
			</u-mask>
	</view>
</template>
<script>
	export default {
		data() {
			return {
				show:false,
				base64: '',
				system_info: [], //系统信息
			}
		},
		methods: {
			//点击生成海报
			/**
				*  @bg_img      背景图 
				*  @qr_code     二维码 
				*  @reacteTime  时间 
				*  @yieldRate   盈利 
				*  @status      状态 
			*/
			downloadImg(bg_img,qr_code,reacteTime,yieldRate,status){
				this.system_info = uni.getSystemInfoSync(); //屏幕宽高
				var that = this;
				
				//这里等promise执行，避免拿不到图片临时路径
				// const promise1 = new Promise((resolve, reject) => {
					//将线上图片转换成本地图片，获取本地图片路径
					// uni.downloadFile({
						// url: bg_img,
						// success: (res) => {
							// resolve(res)
							
						// }
					// })
				// });
				// const promise2 = new Promise((resolve, reject) => {
				// 	uni.downloadFile({
				// 		url: qr_code,
				// 		success: (res) => {
				// 			resolve(res)
				// 		}
				// 	})
				// });
				// Promise.all([promise1, promise2]).then((values) => {
					// console.log(values);
					that.make_canvas(bg_img,qr_code,reacteTime,yieldRate,status);
				// });
			},
			make_canvas(bg_img,qr_code,reacteTime,yieldRate,status) {
				let ww = this.system_info.windowWidth; //屏幕宽
				let hh = this.system_info.windowHeight;//屏幕高

				var ctx = uni.createCanvasContext('myCanvas') //绑定画布
				ctx.setFillStyle('#fff')
				// ctx.fillRect(0, 0, ww,hh)
				ctx.drawImage(bg_img, 0, 0, ww, 500); //填充进图片
				ctx.setTextAlign('center') //设置对于坐标点的对齐方式 

				ctx.setFillStyle("#333333") //设置内容2的文字样式
				ctx.setFontSize(15);
				ctx.fillText('今日收益率', ww / 2, 310)

				ctx.setFillStyle('#333')
				ctx.setFontSize(10);
				ctx.fillText(reacteTime, ww / 2, 327)//日期
				
				// context.save()
				ctx.setLineCap('round')
				ctx.setLineWidth(40)
				ctx.moveTo(ww / 2 - 75, 355)
				ctx.lineTo(ww / 2 + 75, 358)
				if(yieldRate.indexOf('-')!=-1){
					ctx.strokeStyle = '#FDE1E0'
				}else{
					ctx.strokeStyle = '#DFF6EA'
				}
				
				ctx.stroke()
				
				ctx.save()
				ctx.beginPath()
				ctx.setLineWidth(57)
				ctx.moveTo(0, 458)
				ctx.lineTo(ww, 458)
				ctx.strokeStyle = '#d5ecff'
				ctx.stroke()

				// ctx.setFillStyle('#333')
				// ctx.setFontSize(15);
				// ctx.fillText(status, ww / 2, 405)//状态

				ctx.setFillStyle('#333')
				ctx.setFontSize(10);
				ctx.fillText('汉链量化系统', 115, 450)

				ctx.setFillStyle('#333')
				ctx.setFontSize(10);
				ctx.fillText('口号口号口号口号口号', 135, 470)
				
				
				if(yieldRate.indexOf('-')!=-1){
					ctx.setFillStyle('#FF513B')
					ctx.drawImage('/static/home/xd.png', 215, 350, 30, 15); //盈亏下跌
				}else{
					ctx.setFillStyle('#2BEC8A')
					ctx.drawImage('/static/home/xd.png', 215, 350, 30, 15); //盈亏下跌
				}
				
				ctx.font = 'normal bold 24px Arial,sans-serif'
				ctx.fillText(yieldRate||'0.00%', ww / 2 - 20, 365)//利益
				ctx.drawImage('/static/login/logo.png', 20, 436, 40, 40)//logo
				ctx.drawImage(qr_code, ww - 70, 436, 40, 40)//二维码

				ctx.draw(); //输出到画布中
				uni.showLoading({ //增加loading等待效果
				mask:true
				})
				setTimeout(() => { //不加延迟的话，base64有时候会赋予undefined
					uni.canvasToTempFilePath({
						canvasId: 'myCanvas',
						success: (res) => {
							this.base64 = res.tempFilePath
							this.show=true
						}
					})
					uni.hideLoading();
				}, 1200)



			},
			bcFn() {
				uni.saveImageToPhotosAlbum({ //保存图片
					filePath: this.base64,
					success: (res) => {
						uni.showToast({
							title: '保存成功',
						})
					},
					fail(r) {
						console.log(r)
					}
				})
			}
		},
	}
</script>
<style lang="scss" scoped>
	#sss {
		position: absolute;
		width: 750rpx;
		height: 1006rpx;
		top: -99999899rpx;
		left: -99999899rpx;
		z-index: 9999;
	}
	.mask {
			display: flex;
			align-items: center;
			justify-content: center;
			height: 100%;
			.mask-in {
				display: flex;
				flex-direction: column;
				align-items: center;
				border-radius: 20rpx;
				image{
					width: 480rpx;
					border-radius: 20rpx;
				}
				.btn{
					margin-top: 130rpx;
					width: 574rpx !important;
					height: 90rpx !important;
					background: #279FFF;
					border-radius: 16rpx;
					font-size: 36rpx !important;
				}
			}
		}
</style>
