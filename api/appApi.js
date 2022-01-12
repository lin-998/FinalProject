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
		return  http.get(baseUrl+'/user_info',{params}).then(res=>res.data)
	}
}
export const mainApi=new Main()