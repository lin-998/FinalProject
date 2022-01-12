import {
	SET_USER_INFO,
	SET_USER_TOKEN,
	REMOVE_USER_INFO,
	CONNECT_WEBSOCKET
} from "./mutation-type";
import { socketUrl } from "../api/app.js";
import io from '@/common/uni-socket.io.js';
export default {
	// 建立长链接 币币 
  [CONNECT_WEBSOCKET](state,user) {
		if(state.socket){
			state.socket.close()
		}
  	const S = io(socketUrl,  {
			path: '/currency/websocket/socket.io/',
			// path: '/api/v5/public/price-limit',
  		query: {
				userId:user.id,
				type:user.type //all全部 single单次 repeat循环 stop停止
			},
  		transports: ['websocket'],
  		timeout: 5000
  	})
  	// 监听连接
  	S.on('connect', () => {
  		console.log('socket已连接')
  		state.socket = S
  		// 监听行情改变信息
			// S.on('/topic/market',topicMarket)
			// 监听合约行情改变信息
  		// S.on('/contract/market',contractMarket)
  	})
  	// 移除监听事件
  	const removeListener = () => {
  		if (S) {
				S.removeListener()
			}
  	}
		// 监听失败
		S.on('error',()=>{
			removeListener()
			state.socket = null
			console.log('socket连接失败')
		})
  	// 连接错误
  	S.on('connect_error', d => {
			removeListener()
			state.socket = null
  		console.log('socket连接失败', d);
  	});
  	// 连接超时
  	S.on('connect_timeout', d => {
			state.socket = null
  		console.log('socket连接超时', d);
  	});
  	// 断开连接
  	S.on('disconnect', reason => {
			removeListener()
			state.socket = null
  		console.log('socket断开连接', reason);
  	});
  	// 重新连接
  	S.on('reconnect', attemptNumber => {
  		console.log('socket成功重连', attemptNumber);
  	});
  	// 连接失败
  	S.on('reconnect_failed', () => {
			state.socket = null
  		console.log('socket重连失败');
  	});
  	// 尝试重新连接
  	S.on('reconnect_attempt', () => {
  		console.log('socket尝试重新重连');
  	});
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
