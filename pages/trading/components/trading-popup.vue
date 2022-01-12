<template>
	<view>
		<view class="popup">
			
				<block v-if="showType==1">
					<view class="cover-configuration">
						<view class="cover-title">
							<view>补仓次数</view>
							<view>补仓跌幅%</view>
							<view>补仓倍数<br><text>（以首单为基础）</text></view>
						</view>
						<scroll-view scroll-y="true" style="height: 600rpx;">
							<view class="cover-input" v-for="(item,index) in arrlist" :key="index">
								<view>第{{index+1}}次分仓</view>
								<view><u-input v-model="formData[index].addPosFall" type="number" :clearable="false"  :disabled="policyType!=1" /></view>
								<view><u-input v-model="formData[index].addPosMiltiply" type="number" :clearable="false" :disabled="policyType!=1" /></view>
								<!-- <view><u-input  v-model="formData.marginDeclines[index]" type="number" :clearable="false" @blur="onBlur(LANGUAGE.Trading.text2,formData.marginDeclines[index])" :disabled="policyType!=0&&policyType!=21" /></view>
								<view><u-input  v-model="formData.marginMultiples[index]" type="number" :clearable="false" :disabled="policyType!=0&&policyType!=21" /></view> -->
							</view>
						</scroll-view>
					</view>
					
				</block>
				<block v-if="showType==2">
					<view class="popup-title">
						<text>补仓回调次数</text>
						<text>补仓回调比例（%）</text>
					</view>
					<scroll-view scroll-y="true" style="height: 600rpx;">
						<view class="popup-input" v-for="(item,index) in arrlist" :key="index">
							<text>第{{index+1}}次补单</text>
								<!-- <u-input  v-model="formData.marginCallbacks[index]" type="number" :clearable="false" :disabled="policyType!=0&&policyType!=21" />% -->
							<u-input v-model="formData[index].addPosCallback" type="number" :clearable="false" :disabled="policyType!=1" />%
						</view>
					</scroll-view>
				</block>
				<block v-if="showType==3">
					<view class="popup-title">分仓止盈比例</view>
					<scroll-view scroll-y="true" style="height: 600rpx;">
						<view class="popup-input" v-for="(item,index) in arrlist" :key="index">
							<text>第{{index+1}}次分仓（%）</text>
							<u-input v-model="formData.checkSurplusProportions[index]" type="number" :clearable="false" :disabled="policyType!=1" />
						</view>
					</scroll-view>
				</block>
				<block v-if="showType==4">
					<view class="type-title">
						<view @click="$emit('onSelect',1)" :class="policyType==1?'active':''">自定义</view>
						<view @click="$emit('onSelect',2)" :class="policyType==2?'active':''">保守</view>
						<view @click="$emit('onSelect',3)" :class="policyType==3?'active':''">稳健</view>
						<view @click="$emit('onSelect',4)" :class="policyType==4?'active':''">激进</view>
					</view>
			</block>
			
		</view>
		<view class="popup-Btn" v-if="showType!=4">
			<u-button class="settingBtn cancel" @click="$emit('onCancelClick')">取消</u-button>
			<u-button class="settingBtn" @click="confirmClick">确定</u-button>
		</view>
	</view>
</template>

<script>
	export default {
		props:{
			showType:{
				type:Number,
				default:1
			},
			policyType:{
				type:Number,
				default:0
			},
			arrlist:{
				type:Number,
				default:0
			},
			data:{
				type:Array,
				default:()=>{
					return []
				}
			}
		},
		data() {
			return {
				// formData:{
				// 	marginDeclines:[],
				// 	marginMultiples:[],
				// 	marginCallbacks:[],
				// 	checkSurplusProportions:[],
				// }
				formData:[
					{addPosFall:'',addPosCallback:'',addPosMiltiply:''},
					{addPosFall:'',addPosCallback:'',addPosMiltiply:''},
					{addPosFall:'',addPosCallback:'',addPosMiltiply:''},
					{addPosFall:'',addPosCallback:'',addPosMiltiply:''},
					{addPosFall:'',addPosCallback:'',addPosMiltiply:''},
					{addPosFall:'',addPosCallback:'',addPosMiltiply:''},
					{addPosFall:'',addPosCallback:'',addPosMiltiply:''},
					{addPosFall:'',addPosCallback:'',addPosMiltiply:''},
					{addPosFall:'',addPosCallback:'',addPosMiltiply:''},
				],
				// formData:{},
			}
		},
		created() {
			
		},
		computed: {
			newOptionss(){
				this.formData = JSON.parse(JSON.stringify(this.data))
				
				return this.arrlist;
			}
		},
		watch:{
			newOptionss:{
				handler(newValue, oldValue) {
				},
　　　　 deep: true
			}
		},
		methods:{
			onBlur(type,value){
				if(!(value>0)){
					this.$toast(type+'参数必须大于0')
				}
			},
			confirmClick(){
				let index=0
				if(this.showType==1||this.showType==2){
					console.log(this.formData)
				
					// this.formData.marginDeclines=this.formData.marginDeclines.map(val=>{
					// 	if(!(val>0)){
					// 		index+=1
					// 		return val=0.01
					// 	};
					// 	return val=Number(val)
					// })
					// this.formData.marginMultiples=this.formData.marginMultiples.map(val=>{
					// 	if(!(val>0)){
					// 		index+=1
					// 		return val=0.01
					// 	};
					// 	return val=Number(val)
					// })
					
				}
				// if(index>0){
				// 	return this.$toast('设置的参数不能为空且须大于0')
				// }
				// console.log(this.formData.marginCallbacks);
				console.log('emit')
				this.$emit('onCaonfirmClick',this.formData)
			}
		}
	}
</script>

<style lang="scss" scoped>
	.popup{
		padding: 30rpx 60rpx 0;
		.popup-title{
			display: flex;
			justify-content: space-between;
			font-size: 26rpx;
			font-family: Source Han Sans SC;
			font-weight: 600;
			margin-bottom: 26rpx;
		}
		.popup-input{
			padding: 20rpx 30rpx;
			border-top: 1rpx solid rgba(176, 190, 200, 0.33);
			display: flex;
			align-items: center;
			>text{
				color: #999999;
				flex: 2;
			}
		}
		.cover-configuration{
			.cover-title{
				display: flex;
				margin-bottom: 10rpx;
				font-weight: 600;
				>view{
					flex: 1;
					text-align: center;
					align-items: center;
					>text{
						font-size: 24rpx;
						color: #B0BEC8;
					}
				}
			}
			.cover-input{
				display: flex;
				align-items: center;
				padding: 30rpx 0;
				border-top: 1rpx solid rgba(176, 190, 200, 0.33);
				>view{
					flex: 1;
					text-align: center;
					align-items: center;
					color: #999999;
				}
				input{
					border: 1px solid #B0BEC8;
				}
			}
		}
		.type-title{
			text-align: center;
			>view{
				padding: 20rpx 0;
				border-bottom: 1rpx solid $uni-color-bd;
				&:last-child{
					border-bottom: none;
				}
			}
			.active{
				background-color: #279FFF;
				color: #fff;
				border-radius: 10rpx;
			}
		}
	}
	.popup-Btn{
		display: flex;
		.settingBtn{
			flex: 1;
			color: #fff;
			background: #279FFF;
			border-radius: 0;
			font-weight: 600;
			&::after{
				border: none;
			}
		}
		.cancel{
			background-color: rgba(39, 159, 255, 0.48);
		}
	}
</style>
