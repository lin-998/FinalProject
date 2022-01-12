<template>
	<view class='canvas'>
		<!-- <u-mask :show="show" @click="onMask"> -->
				<!-- <view class="mask" v-if="show"> -->
					<!-- <view class="mask-in" @tap.stop> -->
					<l-painter :board="base" isRenderImage @success='onSuccess'/>
						<!-- <button type="primary" class="btn" @click='bcFn'>保存图片</button> -->
					<!-- </view> -->
				<!-- </view> -->
			<!-- </u-mask> -->
	</view>
</template>
<script>
	import lPainter from '@/pages/home/electronic-bill/components/lime-painter'
	export default {
		components: {
			lPainter
		},
		props:{
			showCode:{
				type:Boolean,
				default:true
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
					width: '589rpx',
					height:'786rpx',
					views: [
						{
							type: 'image',
							url: this.placardData.bgUrl,
							css: {
								width: '589rpx',
								height:'786rpx',
							}
						},
						{
							type: 'image',
							url: this.placardData.bgUrl2,
							css: {
								width: '334rpx',
								height:'75rpx',
								top: '58rpx',
								left:'50%',
								marginLeft:'-167rpx'
							}
						},
						// {
						// 	type: 'text',
						// 	text: '好收益 看得见',
						// 	css: {
						// 		top: '152rpx',
						// 		fontSize: '24rpx',
						// 		width: '589rpx',
						// 		textAlign:'center',
						// 		color:'#fff',
						// 		fontWeight:'bold'
						// 	}
						// },
						{
							type: 'text',
							text: '稳健盈利之王，你的智能量化交易专家!',
							css: {
								top: '136rpx',
								fontSize: '20rpx',
								width: '589rpx',
								textAlign:'center',
								color:'#fff',
							}
						},
						{
							type: 'image',
							url: this.placardData.bgUrl3,
							css: {
								width: '245.42rpx',
								height:'46.67rpx',
								top: '236rpx',
								left:'50%',
								marginLeft:'-118.35rpx'
							}
						},
						{
							type: 'qrcode',
							text: this.placardData.codeText,
							css: {
								width: '174rpx',
								height:'174rpx',
								top: '333rpx',
								left:'50%',
								marginLeft:'-87rpx',
								background:'#fff',
								border:'10rpx solid #fff'
							}
						},
						{
							type: 'text',
							text: '邀请码：'+this.placardData.valCode,
							css: {
								top: '554rpx',
								fontSize: '26rpx',
								width: '589rpx',
								textAlign:'center',
								color:'#fff',
							}
						},
						{
							type: 'text',
							text: '风险提示：数字资产交易风险高、价格波动大，需用\n户自行理性判断、谨慎操作!',
							css: {
								top: '692rpx',
								fontSize: '18rpx',
								width: '589rpx',
								textAlign:'center',
								color:'#fff',
							}
						},
						
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
					
					this.base={
					width: '589rpx',
					height:'786rpx',
					views: [
						{
							type: 'image',
							url: newVal.bgUrl,
							css: {
								width: '589rpx',
								height:'786rpx',
							}
						},
						{
							type: 'image',
							url: newVal.bgUrl2,
							css: {
								width: '334rpx',
								height:'75rpx',
								top: '58rpx',
								left:'50%',
								marginLeft:'-167rpx'
							}
						},
						// {
						// 	type: 'text',
						// 	text: '好收益 看得见',
						// 	css: {
						// 		top: '152rpx',
						// 		fontSize: '24rpx',
						// 		width: '589rpx',
						// 		textAlign:'center',
						// 		color:'#fff',
						// 		fontWeight:'bold'
						// 	}
						// },
						{
							type: 'text',
							text: '稳健盈利之王，你的智能量化交易专家!',
							css: {
								top: '136rpx',
								fontSize: '20rpx',
								width: '589rpx',
								textAlign:'center',
								color:'#fff',
							}
						},
						{
							type: 'image',
							url: newVal.bgUrl3,
							css: {
								width: '245.42rpx',
								height:'46.67rpx',
								top: '236rpx',
								left:'50%',
								marginLeft:'-118.35rpx'
							}
						},
						{
							type: 'qrcode',
							text: newVal.codeText,
							css: {
								width: '174rpx',
								height:'174rpx',
								top: '333rpx',
								left:'50%',
								marginLeft:'-87rpx',
								background:'#fff',
								border:'10rpx solid #fff'
							}
						},
						{
							type: 'text',
							text: '邀请码：'+newVal.valCode,
							css: {
								top: '554rpx',
								fontSize: '26rpx',
								width: '589rpx',
								textAlign:'center',
								color:'#fff',
							}
						},
						{
							type: 'text',
							text: '风险提示：数字资产交易风险高、价格波动大，需用\n户自行理性判断、谨慎操作!',
							css: {
								top: '692rpx',
								fontSize: '18rpx',
								width: '589rpx',
								textAlign:'center',
								color:'#fff',
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
				console.log(url);
				this.$emit('changeUrl',url)
				// this.posterUrl=url
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
						console.log(r)
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
