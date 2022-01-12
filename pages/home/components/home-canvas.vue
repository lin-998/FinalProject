<template>
	<view class='canvas'>
		<u-mask :show="show" @click="onMask">
				<view class="mask" v-if="show">
					<view class="mask-in" @tap.stop>
					<l-painter :board="base" isRenderImage @success='onSuccess'/>
						<button type="primary" class="btn" @click='bcFn'>保存图片</button>
					</view>
				</view>
			</u-mask>
	</view>
</template>
<script>
	import lPainter from '../electronic-bill/components/lime-painter/'
	export default {
		components: {
			lPainter
		},
		props:{
			showCode:{
				type:Boolean,
				default:false
			},
			placardData:{
				type:Object,
				default:()=>{
					return {}
				}
			}
		},
		data() {
			return {
				show:false,
				posterUrl:'',
				base: {
					width: '500rpx',
					height:'889rpx',
					background:'#fff',
					views: [
						{
							type: 'image',
							url: this.placardData.bgUrl,
							css: {
								width: '500rpx',
								// height:'768.6rpx'
								height:'889rpx'
							}
						},
						// {
						// 	type: 'image',
						// 	url: this.placardData.bgUrl2,
						// 	css: {
						// 		top:'146rpx',
						// 		left:'160.5rpx',
						// 		width: '179rpx',
						// 		height:'86.4rpx'
						// 	}
						// },
						{
							type: 'text',
							text: '今日收益率',
							css: {
								top: '260rpx',
								fontSize: '28rpx',
								width: '500rpx',
								textAlign:'center',
								color:'#fff',
							}
						},
						{
							type: 'text',
							text: this.placardData.profitYield,
							css: {
								left:'107.5rpx',
								top: '310rpx',
								fontSize: '34rpx',
								width: '285rpx',
								height: '58.6rpx',
								background: this.placardData.background,
								borderRadius: '20rpx',
								lineHeight:'58.6rpx',
								paddingLeft:'40rpx',
								color:this.placardData.color,
								fontWeight: 'bold',
							}
						},
						{
							type: 'image',
							url: this.placardData.profitLoss,
							css: {
								left:'320rpx',
								width: '42rpx',
								height: '30rpx',
								top: '320rpx',
							}
						},
						// {
						// 	type: 'text',
						// 	text: '风险提示：数字资产交易风险高、价格波动大，需用',
						// 	css: {
						// 		top: '720rpx',
						// 		fontSize: '15rpx',
						// 		width: '500rpx',
						// 		textAlign:'center',
						// 		color:'#fff',
						// 	}
						// },
						// {
						// 	type: 'text',
						// 	text: '户自行理性判断、谨慎操作!',
						// 	css: {
						// 		top: '740rpx',
						// 		fontSize: '15rpx',
						// 		width: '500rpx',
						// 		textAlign:'center',
						// 		color:'#fff',
						// 	}
						// },
						{
							type: 'image',
							url: '../../../static/home/hblogo.png',
							css: {
								top:'790rpx',
								left:'25rpx',
								width: '214.5rpx',
								height: '50rpx',
							}
						},
						
						// {
						// 	type: 'text',
						// 	text: '汉链量化系统!',
						// 	css: {
						// 		top:'790rpx',
						// 		left:'25rpx',
						// 		fontSize: '24rpx',
						// 		color:'#279FFF'
						// 	}
						// },
						// {
						// 	type: 'text',
						// 	text: '稳健盈利之王，您的智能量化交易专家!',
						// 	css: {
						// 		top:'840rpx',
						// 		left:'25rpx',
						// 		fontSize: '20rpx',
						// 		color:'#999999'
						// 	}
						// },
						// {
						// 	type: 'qrcode',
						// 	text: this.placardData.codeText,
						// 	css: {
						// 		top: '785rpx',
						// 		left: '391rpx',
						// 		width: '84rpx',
						// 		height: '84rpx',
						// 	}
						// },
					]
				}
			}
		},
		watch:{
			showCode(newValue,oldValue){
				this.show=newValue
			},
			placardData: {
				handler: function (newVal,ojdVal) {
					console.log(newVal,ojdVal);
					
					this.base={
					width: '500rpx',
					height:'889rpx',
					background:'#fff',
					views: [
						{
							type: 'image',
							url: newVal.bgUrl,
							css: {
								width: '500rpx',
								// height:'768.6rpx',
								height:'889rpx'
							}
						},
						// {
						// 	type: 'image',
						// 	url: newVal.bgUrl2,
						// 	css: {
						// 		top:'146rpx',
						// 		left:'160.5rpx',
						// 		width: '179rpx',
						// 		height:'86.4rpx'
						// 	}
						// },
						{
							type: 'text',
							text: '今日收益率',
							css: {
								top: '520rpx',
								fontSize: '32rpx',
								width: '500rpx',
								textAlign:'center',
								color:'#333333',
							}
						},
						{
							type: 'text',
							text: newVal.profitTime,
							css: {
								top: '570rpx',
								fontSize: '24rpx',
								width: '500rpx',
								textAlign:'center',
								color:'#333333',
							}
						},
						{
							type: 'text',
							text: newVal.profitYield,
							css: {
								left:'107.5rpx',
								top: '620rpx',
								fontSize: '34rpx',
								width: '285rpx',
								height: '58.6rpx',
								background: newVal.background,
								borderRadius: '20rpx',
								lineHeight:'58.6rpx',
								paddingLeft:'80rpx',
								color:newVal.color,
								fontWeight: 'bold',
							}
						},
						{
							type: 'image',
							url: newVal.profitLoss,
							css: {
								left:'290rpx',
								width: '42rpx',
								height: '30rpx',
								top: '635rpx',
							}
						},
						{
							type: 'text',
							text: '求安慰~',
							css: {
								top: '700rpx',
								fontSize: '28rpx',
								width: '500rpx',
								textAlign:'center',
								color:'#333333',
							}
						},
						// {
						// 	type: 'text',
						// 	text: '风险提示：数字资产交易风险高、价格波动大，需用',
						// 	css: {
						// 		top: '720rpx',
						// 		fontSize: '15rpx',
						// 		width: '500rpx',
						// 		textAlign:'center',
						// 		color:'#fff',
						// 	}
						// },
						// {
						// 	type: 'text',
						// 	text: '户自行理性判断、谨慎操作!',
						// 	css: {
						// 		top: '740rpx',
						// 		fontSize: '15rpx',
						// 		width: '500rpx',
						// 		textAlign:'center',
						// 		color:'#fff',
						// 	}
						// },
						{
							type: 'image',
							url: '../../../static/home/icon_shangchuan.png',
							css: {
								top:'765rpx',
								left:'0rpx',
								width: '160rpx',
								height: '160rpx',
							}
						},
						
						{
							type: 'text',
							text: '旺典',
							css: {
								top:'790rpx',
								left:'155rpx',
								fontSize: '24rpx',
								color:'#333333'
							}
						},
						{
							type: 'text',
							text: '稳健盈利之王',
							css: {
								top:'830rpx',
								left:'155rpx',
								fontSize: '24rpx',
								color:'#333333'
							}
						},
						{
							type: 'qrcode',
							text: newVal.codeText,
							css: {
								top: '785rpx',
								left: '391rpx',
								width: '84rpx',
								height: '84rpx',
							}
						},
					]
				}
					return newVal
				},
				// 开启深度监听：只要obj中的任何一个属性发生改变，都会触发相应的代码
				deep: true
			}
		},
		methods: {
			//关闭弹窗
			onMask(){
				this.show=false
				this.$emit('onHide')
			},
			//获取海报生成的图片
			onSuccess(url){
				// console.log(url);
				this.posterUrl=url
			},
			bcFn(){
				uni.saveImageToPhotosAlbum({ //保存图片
					filePath: this.posterUrl,
					success: (res) => {
						uni.showToast({
							title: '保存成功',
						})
					},
					fail(r) {
						// console.log(r)
					}
				})
			}
		}
	}
</script>
<style lang="scss" scoped>
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
