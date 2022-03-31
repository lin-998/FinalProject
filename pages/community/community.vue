<template>
	<view class="contain">
		<view class="moment-wrap" >
			<!-- <scroll-view   @scrolltolower="scrollTolower">
				<block v-for="(item,index) in list" :key="index" class="inter-component">
					<hMoment :item="item"  @updataLike="updata"/>
				</block>
			</scroll-view> -->
			<u-waterfall v-model="flowList" ref="uWaterfall">
						<template v-slot:left="{leftList}">
							<view class="demo-warter" v-for="(item, index) in leftList" :key="index">
								<hMoment :item="item"  @updataLike="updata"/>
							</view>
						</template>
						<template v-slot:right="{rightList}">
							<view class="demo-warter" v-for="(item, index) in rightList" :key="index">
									<hMoment :item="item"  @updataLike="updata"  />
							</view>
						</template>
					</u-waterfall>
					<u-loadmore bg-color="rgb(240, 240, 240)" :status="loadStatus" @loadmore="addRandomData"></u-loadmore>
			
			
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
			loadStatus: 'loadmore',
							flowList: [],
				list:[],
			}
		},
		onLoad() {
			
		},
		onShow() {
			this.getAllPost()
			
		},
		// onReachBottom() {
		// 			this.loadStatus = 'loading';
		// 			// 模拟数据加载
		// 			setTimeout(() => {
		// 				this.addRandomData();
		// 				this.loadStatus = 'loadmore';
		// 			}, 1000)
		// 		},
		methods: {
			addRandomData() {
							for(let i = 0; i < 10; i++) {
								let index = this.$u.random(0, this.list.length - 1);
								// 先转成字符串再转成对象，避免数组对象引用导致数据混乱
								let item = JSON.parse(JSON.stringify(this.list[index]))
								item.id = this.$u.guid();
								this.flowList.push(item);
							}
						},
						remove(id) {
							this.$refs.uWaterfall.remove(id);
						},
						clear() {
							this.$refs.uWaterfall.clear();
						},
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
						this.addRandomData()
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
