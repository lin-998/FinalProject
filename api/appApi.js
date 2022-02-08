import { baseUrl} from "./app.js";

import { http } from "./request.js";

const header = { "Content-Type": "application/x-www-form-urlencoded" };
class Main{
	constructor() {
	    
	}
	//登录
	login(data){
		return  http.post(baseUrl+'/login',data).then(res=>res.data)
	}
	//获取用户信息
	getUserInfo(params){
		return  http.get(baseUrl+'/findDataByUserId',{params}).then(res=>res.data)
	}
	//修改用户头像
	setAvator(data){
			return  http.post(baseUrl+'/setAvator',data).then(res=>res.data)
		}
	//发布动态
createPost(data){
		return  http.post(baseUrl+'/createPost',data).then(res=>res.data)
	}
	//轮播图
	getSlideshow(){
		return  http.get(baseUrl+'/get_slideshow').then(res=>res.data)
	}
	
}
export const mainApi=new Main()