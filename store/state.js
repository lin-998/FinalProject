export default {
  socket: null,
  language: "zh_CN", //语言环境
	exchange:0,//交易所类型
	userId:'',//用户id
	firstLogin:false,//用户第一次登陆
	userInfo:{},//用户信息
	Account_positions:0,//账户仓位
//消息模块
firstLoad: true, //是否是第一次加载首页消息页面
robotmsg: [
	// 机器人首语
	{
		message: "hi , 欢迎与我聊天，问我问题哦！",
		user: "robot"
	}
],
msgList: [], // 消息首页列表
groupInfo: [], //群资料
groupMember: [], //群成员
toUserInfo: [], //私聊对方的资料
someOneInfo: {}, //某个用户的用户资料
addAsFriend: {
	//加为好友
	user_id: "", //请求方
	other_user_id: "" //被请求方
},
newFriend: [], //新朋友列表
myInfo: {}, //我的信息
tabTips: { //底部tab的未读提示 暂时只做好友添加请求的提示
	addFriendReq: "" //是否有好友添加请求 0没有 1有
}

};
