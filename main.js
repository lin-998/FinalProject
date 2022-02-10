import Vue from 'vue'
import App from './App'
import { Utils } from './common/common.js'
import MinCache from './MinCache'
import store from './store/index.js';
import uView from "uview-ui";
import filters from '@/common/filters.js'
// import VueSocketIO from 'vue-socket.io'
Vue.use(MinCache)
Vue.use(uView);

 //socket
Vue.use(new VueSocketIO({
    debug: true,
    // 服务器端地址
    connection: 'http://localhost:3000',
// vuex: {
//         store,
//         actionPrefix: 'SOCKET_',
//         mutationPrefix: 'SOCKET_'
//     },
    // options: { path: "/my-app/" } //Optional options
}))
//消息提示
Vue.prototype.$toast = Utils.toast;
Vue.config.productionTip = false
// 添加全局filter
Object.keys(filters).map(v => {
    Vue.filter(v, filters[v])
})
App.mpType = 'app'

const app = new Vue({
	store,
	...App
})
app.$mount()
