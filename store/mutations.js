import { Utils } from "@/common/common.js";
export default {
	// 建立长链接 币币 
 	//是否是第一次加载首页消息页面
	 firstLoadMutation(state, data) {
		state.firstLoad = data;
	},
	//机器人消息
	robotMsgMutation(state, data) {
		state.robotmsg.push(data);
	},
	//我的信息
	myInfoMutation(state, data) {
		state.myInfo = data;
	},
	//首页消息列表
	msgListMutation(state, data) {
		console.log(data)
		state.msgList = data;
	},
	//未读信息归零
	resetUnredMutation(state, id) {
		state.msgList.forEach(ele => {
			if (ele.id == id) {
				ele.unread = null
			}
		})
	},
	//是否有好友添加请求
	friendReqTipsMutation(state, data) {
		if (data) {
			state.tabTips.addFriendReq = "tips";
		} else {
			state.tabTips.addFriendReq = "";
		}

	},
	//更新首页消息列表
	updateListMutation(state, data) {
		let unread = 0;
		data.time = Utils.toNomalTime(data.time);
		//添加
		if (data.action === "push") {
			data.unread = unread + 1;
			state.msgList.push(data);
			return
		}
		//删除
		if (data.action === "delete") {
			for (var i = 0; i < state.msgList.length; i++) {
				if (state.msgList[i].id == data.id) {
					state.msgList.splice(i, 1);
				};
			}
			return
		}
		//替换更新
		if (data.type === "private") {
			//在请求添加好友的情况下
			let haveThisEle = state.msgList.filter(ele => ele.other_user_id == data.from_user);
			if (haveThisEle.length === 0 && data.action === "request") {
				data.unread = unread + 1;
				data.other_user_id = data.from_user;
				data.id = data.from_user;
				delete data.from_user;
				delete data.to_user;
				state.msgList.push(data);
				return
			}
			//正常私聊情况下
			state.msgList.forEach(ele => {
				//判断是哪个人  对方发的
				if (ele.other_user_id == data.from_user) {
					ele.message = data.name + ' : ' + data.message;
					ele.time = data.time;
					ele.name = data.name;
					ele.avator = data.avator;
					//如果是当前的聊天，没必要加未读标识了
					if (data.chatOfNow) return
					//增加未读消息数
					if (!ele.unread) {
						ele.unread = unread + 1;
					} else {
						ele.unread += 1;
					}
				} else if (ele.other_user_id == data.to_user) { //自己发的
					ele.message = data.name + ' : ' + data.message;
					ele.time = data.time;
				}
			});
		} else if (data.type === "group") {
			state.msgList.forEach(ele => {
				//判断是哪个群
				if (ele.group_id == data.groupId) {
					ele.message = data.name + ' : ' + data.message;
					ele.time = data.time;
					ele.group_name = data.group_name;
					ele.group_avator = data.group_avator;
					ele.id = data.groupId;
					//增加未读消息数
					if (data.chatOfNow) {
						ele.unread = null;
					} else {
						if (!ele.unread) {
							ele.unread = unread + 1;
						} else {
							ele.unread += 1;
						}
					}
				} else {

				}
			});
		}
		// }
	},
	//群资料
	groupInfoMutation(state, data) {
		state.groupInfo = data;
	},
	//群成员
	groupMemberMutation(state, data) {
		state.groupMember = data;
	},
	//私聊对方的用户资料
	toUserInfoMutation(state, data) {
		state.toUserInfo = data;
	},
	//用户资料
	someOneInfoMutation(state, data) {
		state.someOneInfo = data;
	},
	//添加好友
	addAsFriendMutation(state, data) {
		state.addAsFriend = data;
	},
	//新朋友列表
	newFriendMutation(state, data) {
		state.newFriend = data;
	},

 //  // 保存用户登录信息
	// [SET_USER_INFO](state, userInfo) {
	// 	state.userInfo = userInfo; 
	// 	uni.setStorageSync("userInfo",userInfo);	
	// },
	// // 保存用户登录凭证
	// [SET_USER_TOKEN](state,token) { 
	// 	state.userToken = token; 
	// 	uni.setStorageSync("userToken",token);	
	// },
	// // 删除用户登录信息
	// [REMOVE_USER_INFO](state) { 
	// 	uni.removeStorageSync('userInfo');
	// 	uni.removeStorageSync('userToken');
	// 	state.userInfo = null;
	// 	state.userToken = '';
	// },
	exchangeSelect(state,type) { 
		state.exchange = type; 
	},
	getUserInfo(state,data){
		state.userInfo = data; 
	},
	userLoginStatus(state,data){
		if(data){
			state.userId = data; 
		}
		state.userId = data?false:true; 
	},
	getAccount_positions(state,data){
		state.Account_positions = data
	},
};
