import {
	CONNECT_WEBSOCKET
} from "./mutation-type";
	import {mainApi} from '@/api/appApi.js'
	import { imgUrl } from "@/api/app.js";
export default {
  // 建立长链接 
  connectSocket({ commit },products) {
		console.log(products);
    commit(CONNECT_WEBSOCKET,products);
  },
	//获取用户详细信息
	//获取用户详细信息
	getUserInfo({ commit }){
		console.log(333)
		mainApi.getUserInfo({user_id:15}).then(res=>{
			console.log(res)
			// if(res.data.avatarUrl){
			// 	res.data.avatarUrl=imgUrl+res.data.avatarUrl
			// }else{
			// 	res.data.avatarUrl=require('static/mine/user_por.jpg')
			// }
			commit('getUserInfo',res.data.userInfo)
			uni.setStorageSync('user',JSON.stringify(res.data.userInfo))
		})
	}
};
