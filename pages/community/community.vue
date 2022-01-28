<template>
	<view>
		社区
		<u-upload ref="uUpload" :action="action" :auto-upload="true" ></u-upload>
				<u-button @click="submit">提交</u-button>
	</view>
</template>

<script>
	import {mainApi} from '@/api/appApi.js'
	export default {
		data() {
			return {
					action: 'http://localhost:3000/api/v1/upload',
								fileArr: []
			}
		},
		methods: {
			submit() {
							let files = [];
							// 通过filter，筛选出上传进度为100的文件(因为某些上传失败的文件，进度值不为100，这个是可选的操作)
							files = this.$refs.uUpload.lists.filter(val => {
								return val.progress == 100;
							})
							files.forEach(item=>{
								this.fileArr.push(item.response.data[0])
							})
							// 如果您不需要进行太多的处理，直接如下即可
							// files = this.$refs.uUpload.lists;
							console.log(files)
							console.log(JSON.stringify(this.fileArr))
							let data={
								content:'333',
								id:'3333',
								fileArr:JSON.stringify(this.fileArr)
							}
								mainApi.createPost(data).then(res=>{
									console.log(res)
									
								})
						},
					
		}
	}
</script>

<style>

</style>
