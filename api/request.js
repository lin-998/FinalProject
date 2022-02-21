import Request from "@/utils/luch-request/index.js";
// import { Utils } from '@/common/common.js'

const getTokenStorage = () => {
	let token = "";
	try {
		token = uni.getStorageSync("userToken");

	} catch (e) {}
	return token;
};

const http = new Request();

/* 设置全局配置 */
http.setConfig((config) => {

	config.header = {
		...config.header,
	};
	config.sslVerify = false
	// 自定义的配置
	config.custom = {
		// auth: false, // 是否传token
		
	};
	return config;
});

http.interceptors.request.use(
	(config) => {
		// console.log(config,'config')
		
		if(config.url.split('api')[1]!='/market/getHomeList'&&config.url.split('api')[1]!='/start/queryPositionSet'){
			
			// #ifdef APP-PLUS
			plus.nativeUI.showWaiting()
			// #endif
		}
		// config.headers.common['Authorization'] = 'Bearer ' + getTokenStorage();
		config.header = {
			...config.header,
			// "X-Requested-Token": getTokenStorage(),
			"locale": uni.getStorageSync('language') || 'zh_CN',
			"Authorization":'Bearer ' + getTokenStorage()
		};
		// 如果token不存在，return Promise.reject(config) 会取消本次请求
		// if(!config.header.token) {
		//   console.log("token无效: ");
		//   return Promise.reject(config)
		// }
		// if (config.custom.auth) {
		//   config.header.token = '123456'
		// }

		return config;
	},
	(config) => {
		// #ifdef APP-PLUS
		plus.nativeUI.showWaiting()
		// #endif
		
		return Promise.reject(config);
	}
);

http.interceptors.response.use(
	(response) => {
		// #ifdef APP-PLUS
		plus.nativeUI.closeWaiting()
		// #endif
		/* 对响应成功做点什么 可使用async await 做异步操作*/
		if (response.data.code == 202 || response.data.code == 201||response.data.code == 500) {
			uni.showToast({
				icon:'none',
				title: response.data.msg
			})
			uni.clearStorageSync('userToken')
			uni.clearStorageSync('user')
			setTimeout(() => {
				uni.navigateTo({
					url: "/pages/login/login",
				});
			}, 1000);
			setTimeout(() => {
				uni.navigateTo({
					url: "/pages/login/login",
				});
			}, 1000);

		}
		// console.log(response);
		return response;
	},
	(err) => {
		// #ifdef APP-PLUS
		plus.nativeUI.closeWaiting()
		// #endif
		
		if(err.errMsg=='request:fail abort statusCode:-1 timeout'){
			uni.showToast({
				icon:'none',
				duration:3000,
				title: '网络请求超时，请稍后重试！'
			})
		}
		/*  对响应错误做点什么 （statusCode !== 200）*/
		return Promise.reject(err);
	}
);

export {
	http
};