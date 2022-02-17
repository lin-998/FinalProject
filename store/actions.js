import {
	CONNECT_WEBSOCKET
} from "./mutation-type";
	import {mainApi} from '@/api/appApi.js'
	
	import { Utils } from '@/common/common.js'
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
		// console.log(res.data)
			if(!res.data.avator){
				res.data.avator=require('static/mine/user_por.jpg')
				}
			commit('getUserInfo',res.data)
			uni.setStorageSync('user',JSON.stringify(res.data))
		})
	},
	//消息模块
		//机器人
		robatMsgAction({
			commit
		}, data) {
			// console.log(data + "  robatMsgAction");
			
				
				mainApi.getRobatMsg(data).then(res => {
					if (res) {
						if (res.data.data.code === 100000) {
							commit("robotMsgMutation", {
								message: res.data.data.text,
								user: "robot"
							});
						} else if (res.data.data.code === 200000) {
							let data = res.data.data.text + res.data.data.url;
							commit("robotMsgMutation", {
								message: data,
								user: "robot"
							});
						} else if (res.data.data.code === 302000) {
							commit("robotMsgMutation", {
								message: "暂不支持此类对话",
								user: "robot"
							});
						} else {
							commit("robotMsgMutation", {
								message: "暂不支持此类对话",
								user: "robot"
							});
						}
					}
				})
				.catch(err => {
					console.log(err);
				});
		},
		// 消息首页列表
		async msgListAction({
			commit
		}) {
			
		await mainApi.msgListAction().then(res=>{
			console.log("res", res);
			if (res.data.success) {
				const groupList = res.data.data.groupList;
				const privateList = res.data.data.privateList;
				groupList.forEach(element => {
					element.type = "group";
					// element.time = element.time ? toNomalTime(element.time) : toNomalTime(element.creater_time);
					element.id = element.group_id;
				});
				privateList.forEach(element => {
					element.type = "private";
					element.time = element.time ? Utils.toNomalTime(element.time) : Utils.toNomalTime(element.be_friend_time);
					element.id = element.other_user_id;
					// element.unread = 0;
				});
				const allMsgList = groupList.concat(privateList);
				allMsgList.sort((a, b) => {
					return b.time - a.time;
				});
				
				commit("msgListMutation", allMsgList);
			}
			
		})
			
		},
		//某个用户的用户资料
		async someOneInfoAction({
			commit
		}, user_id) {
			// console.log("user_id666", user_id);
			mainApi.someOneInfo({user_id: user_id}).then(res=>{
				console.log(res)
				commit("someOneInfoMutation", res.data.userInfo[0]);
			})
			
		
		},
		//获取新朋友列表
		async newFriendAction({
			commit
		}, user_id) {
			// console.log("user_id666", user_id);
			const res = await axios.get("/api/v1/get_newfriends");
			// console.log('newFriendAction', res)
			commit("newFriendMutation", res.data.data.newFriends);
		}
};
