<template>
	<view class="contain">
		社区
		<view class="moment-wrap" >
			<scroll-view   @scrolltolower="scrollTolower">
				<block v-for="(item,index) in list" :key="index" class="inter-component">
					<hMoment :item="item"  @updataLike="updata"/>
				</block>
			</scroll-view>
			
			
			
		</view>
		
	</view>
</template>

<script>
	import {mainApi} from '@/api/appApi.js'
	import  hMoment  from "./components/h-moment.vue"
	export default {
		components:{
			hMoment
		},
		data() {
			return {
			
				list:[],
			}
		},
		onShow() {
			this.getAllPost()
		},
		methods: {
			updata(){
				this.$nextTick(function(){
					this.getAllPost()
				})
				
			},
			//获取动态
			getAllPost(){
				mainApi.getAllPost().then(res=>{
					if(res.code==200){
						this.list=res.data||[]
					}else{
						this.$toast('获取内容失败')
					}
					
				})
			},
			scrollTolower(){
				
			}
					
		},
	}
</script>

<style scoped lang="scss">
	.contain{
		padding: 0 10rpx 0 10rpx;
		
	}
	.moment-wrap{
		  column-count: 2;
		  column-gap: 2rpx;
		// display: flex;
		// flex-wrap: wrap;
		
		 &:after {
		    content: '';
		    display: block;
		    flex-grow: 99999;
		  }
		  
	}

</style>
