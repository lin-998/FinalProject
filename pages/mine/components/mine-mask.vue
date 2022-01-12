<template>
	<view>
		<u-mask :show="show">
			<view class="warp">
				<view class="rect" @tap.stop>
					<view class="title">{{title}}</view>
					<view class="sel-type">
						<text>{{selType}}</text>
						<u-input class="sel-inp" v-model="itemData.rankName" type="select" :placeholder="'请选择'+selType" :select-open='popShow' @click="selectTpye" />
						
					</view>
					<view class="codeimg">
						<text>{{inpType}}</text>
						<u-input class="input" v-model="tradePassword" type="password" :placeholder="'请输入'+inpType" />
					</view>
					<view class="puyNum" style="text-align: right;">支付：<text>{{itemData.payUsdt||0}} USDT</text></view>
					<view class="allbtn">
						<u-button class="codeBtn" type="primary" @click="$emit('onCancel')">取消</u-button>
						<u-button class="codeBtn affirmBtn" type="primary" @click="Affirm">确认</u-button>
					</view>
				</view>
			</view>
			<u-popup v-model="popShow" mode="bottom" border-radius="14" :mask='false'>
				<view :class="active==index?'active':''" class="sel-list" @click="onSelect(index)" v-for="(item,index) in allCardLog" :key='index'>{{item.rankName}}</view>
			</u-popup>
		</u-mask>
	</view>
</template>

<script>
	export default {
		props:{
			show:{
				type:Boolean,
				default:false
			},
			title:{
				type:String,
				default:''
			},
			selType:{
				type:String,
				default:''
			},
			inpType:{
				type:String,
				default:''
			},
			allCardLog:{
				type:Array,
				default:()=>{
					return []
				}
			},
		},
		data() {
			return {
				active:0,
				tradePassword:'',
				popShow:false,
				itemData:{},
			};
		},
		watch:{
			allCardLog(val){
				console.log(val);
				this.itemData={}
				this.tradePassword=''
			}
		},
		methods:{
			onSelect(index){
				this.active=index
				this.itemData=this.allCardLog[index]
				this.popShow=false
			},
			selectTpye(){
				this.popShow=!this.popShow
				console.log(this.popShow);
			},
			Affirm(){
				if(!this.tradePassword){return this.$toast('请输入交易密码')}
				if(!this.itemData.rankName){return this.$toast('请选择'+this.selType)}
				this.$emit('onAffirm',this.itemData,this.tradePassword)
			}
		},
	}
</script>

<style lang="scss" scoped>
	.sel-list{
		padding: 20rpx 0;
		text-align: center;
		border-bottom: 1rpx solid #DCEAF5;
	}
	.active{
		background-color: #279FFF;
		color: #fff;
	}
.warp {
	display: flex;
	align-items: center;
	justify-content: center;
	height: 100vh;
}
.warp .rect {
	width: 560rpx;
	background: #FFFFFF;
	border-radius: 16rpx;
	padding: 50rpx;
	.title{
		text-align: center;
	}
	.sel-type{
		padding: 0 30rpx;
		display: flex;
		align-items: center;
		margin-bottom: 10rpx;
		.sel-inp{
			border: 1rpx solid #B0BEC8;
			border-radius: 8rpx;
				padding-right: 20rpx !important;
			margin-left: 20rpx;
		}
	}
	.codeimg{
		padding: 0 30rpx;
		display: flex;
		align-items: center;
		border-bottom: 1rpx solid #DCEAF5;
		>text{
			color: #333;
		}
	}
	.puyNum{
		padding: 21rpx 0;
		>text{
			color: #279FFF;
		}
	}
	.allbtn{
		display: flex;
		.codeBtn{
			width: 201rpx;
			height: 56rpx;
			background: #FFFFFF;
			border: 1rpx solid #279FFF;
			border-radius: 16rpx;
			color: #279FFF;
		}
		.affirmBtn{
			background: #279FFF;
			color: #fff;
		}
	}
}
</style>
