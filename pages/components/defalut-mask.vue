<template>
	<view class="warp">
		<view class="rect" @tap.stop>
			<view class="title">请你填写一下验证码</view>
			<view class="inp-img">
				<u-input class="input" v-model="authCode" type="number" placeholder="请输入图片中的字符" />
				<view class="codeimg">
					<image :src="img_url" mode=""></image>
					<text @click="img_url=apiUrl+'user/api/login/createCode?username=' +username +'&solt=' +Math.random()">点击换一张</text>
				</view>
			</view>
			<u-button class="codebtn" type="primary" @click="confirm">确认</u-button>
		</view>
	</view>
</template>

<script>
	import { apiUrl } from "@/api/app.js";
	import {loginApi,mineApi} from '@/api/myAjax.js'
	export default {
		props:{
			username:{
				type:String,
				default:''
			},
			imgUrl:{
				type:String,
				default:''
			}
		},
		data() {
			return {
				apiUrl:apiUrl,
				img_url:this.imgUrl,
				authCode: '',
			}
		},
		watch:{
			imgUrl(newVal,oldVal){
				this.img_url=newVal
			}
		},
		methods:{
			confirm(){
				if(!this.authCode)return this.$toast('请输入图形验证码')
				loginApi.checkCode({username:this.username,code:this.authCode}).then(res=>{
					this.authCode=''
					if(res.code==200){
						this.show = false
						//发送短信
						this.$emit('confirm')
					}else{
						this.$toast(res.msg)
						this.img_url=this.apiUrl+'user/api/login/createCode?username=' +this.username +'&solt=' +Math.random()
					}
				})
				
			},
		}
	}
</script>

<style>
</style>
