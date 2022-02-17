import store from "@/store/index.js";
export const Utils = new(class {
	constructor() {
		this.im = store.state.im;
	}
	 toNomalTime (timestamp) {
		const date = new Date(timestamp*1000) ,
		 Y = date.getFullYear() + '-',
		M = (date.getMonth()+1 < 10 ? '0'+(date.getMonth()+1) : date.getMonth()+1) + '-',
		D = date.getDate() + ' ',
		h = date.getHours() + ':',
		m = date.getMinutes();
		return Y+M+D+h+m
	}
	toast(msg, place) {
		uni.showToast({
			title: msg,
			position: place || "bottom",
			duration: 2000,
			icon: "none",
		});
	}
	// 格式化地址
	formartValue(object, value) {
		for (let ob in object) {
			if (object.hasOwnProperty(ob)) {
				if (object[ob] === value) return ob;
			}
		}
	}
	/*融云连接 */
	connect(callback) {
		let self = this;
		let user = {
			token: uni.getStorageSync("ryToken"),
		};
		console.log(this.im, "this.im")
		//断开融云连接 连接前确保是未连接状态 
		// this.im.disconnect().then(function () {
		// console.log('断开链接成功111');
		// this.im
		// .reconnect()
		// .then(function (user) {
		//   callback && callback(); //链接成功后执行回调
		//   store.commit("isConnect", true);
		//   console.log("重新链接成功, 链接用户 id 为: ", user.id);
		// })
		// });
		// im 来自 RongIMLib.init 返回的实例，例如：var im = RongIMLib.init({ appkey: ' ' });
		// console.log(user);
		this.im
			.connect(user)
			.then(function(user) {
				console.log('555');
				callback && callback(); //链接成功后执行回调
				store.commit("isConnect", true);
				console.log("链接成功, 链接用户 id 为: ", user.id);
				// self.toast("链接成功")
			})
			.catch(function(error) {
				console.log(error);
				//断开融云连接
				this.im.disconnect().then(function() {
					console.log('断开链接成功222');
				});
				store.commit("isConnect", false);
				this.im
					.reconnect()
					.then(function(user) {
						callback && callback(); //链接成功后执行回调
						store.commit("isConnect", true);
						console.log("重新链接成功, 链接用户 id 为: ", user.id);
					})
					.catch(function(error) {
						console.log("链接失败: ", error.code, error.msg);
					});
				console.log("链接失败,正在重新连接: ", error, error.code, error.msg);
			});
	}
	/*获取消息未读数*/
	getTotalUnreadCount() {
		this.im.Conversation.getTotalUnreadCount().then(function(
			totalUnreadCount
		) {
			store.commit("unreadCount", totalUnreadCount);
			//如果没有未读数 则不显示
			if (totalUnreadCount <= 0) {
				uni.removeTabBarBadge({
					index: 3
				});
				return
			}
			//大于零小于99直接显示 否则显示...
			uni.setTabBarBadge({
				index: 3,
				text: totalUnreadCount >= 99 ? '...' : String(totalUnreadCount),
			})
			console.log("获取未读总数成功", totalUnreadCount);
		});
	}
	toolNumber(num_str) {
		num_str = num_str.toString();
		if (num_str.indexOf("+") != -1) {
			num_str = num_str.replace("+", "");
		}
		if (num_str.indexOf("E") != -1 || num_str.indexOf("e") != -1) {
			var resValue = "",
				power = "",
				result = null,
				dotIndex = 0,
				resArr = [],
				sym = "";
			var numStr = num_str.toString();
			if (numStr[0] == "-") {
				//如果为负数，转成正数处理，先去掉‘-’号，并保存‘-’.
				numStr = numStr.substr(1);
				sym = "-";
			}
			if (numStr.indexOf("E") != -1 || numStr.indexOf("e") != -1) {
				var regExp = new RegExp(
					"^(((\\d+.?\\d+)|(\\d+))[Ee]{1}((-(\\d+))|(\\d+)))$",
					"ig"
				);
				result = regExp.exec(numStr);
				if (result != null) {
					resValue = result[2];
					power = result[5];
					result = null;
				}
				if (!resValue && !power) {
					return false;
				}
				dotIndex = resValue.indexOf(".") == -1 ? 0 : resValue.indexOf(".");
				resValue = resValue.replace(".", "");
				resArr = resValue.split("");
				if (Number(power) >= 0) {
					var subres = resValue.substr(dotIndex);
					power = Number(power);
					//幂数大于小数点后面的数字位数时，后面加0
					for (var i = 0; i <= power - subres.length; i++) {
						resArr.push("0");
					}
					if (power - subres.length < 0) {
						resArr.splice(dotIndex + power, 0, ".");
					}
				} else {
					power = power.replace("-", "");
					power = Number(power);
					//幂数大于等于 小数点的index位置, 前面加0
					for (var i = 0; i < power - dotIndex; i++) {
						resArr.unshift("0");
					}
					var n = power - dotIndex >= 0 ? 1 : -(power - dotIndex);
					resArr.splice(n, 0, ".");
				}
			}
			resValue = resArr.join("");
			return sym + resValue;
		} else {
			return num_str;
		}
	}
})();
