<template>
	<view>
		<view class="help-list">
			<navigator class="item" :url="'/pages/consult/simulate-setting?id='+item.coinId + '&type='+ item.currencyPair+'&strategyType='+strategyType" v-for="item in mock_trading" :key='item.coinId'>
				<u-section :show-line='false' :title="item.currencyPair" color="#333" sub-title="" sub-color="#B0BEC8"></u-section>
			</navigator>
		</view>
	</view>
</template>

<script>
	import {tradingApi} from '@/api/myAjax.js'
	export default {
		data() {
			return {
				mock_trading:[],
				strategyType:'',
			};
		},
		onLoad(options) {
			this.strategyType = options.strategyType
			this.getCoin()
		},
		methods:{
			//查询可回测币对
			getCoin(){
				tradingApi.getCoin().then(res=>{
					if(res.code == 200){
						this.mock_trading = res.data || []
					}
				})
			},
		}
	}
</script>

<style lang="scss" scoped>
	.help-list{
		padding: 48rpx;
		>navigator{
			display: flex;
			justify-content: space-between;
			align-items: center;
			padding: 38rpx 0 24rpx;
			border-bottom: 1rpx rgba(176, 190, 200, 0.33) solid;
		}
	}
</style>
