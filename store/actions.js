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
		
		mainApi.getUserInfo().then(res=>{
		console.log(res.data)
			if(!res.data.avator){
				res.data.avator=require('static/mine/user_por.jpg')
				}
			commit('getUserInfo',res.data[0])
			uni.setStorageSync('user',JSON.stringify(res.data[0]))
		})
	}
};
