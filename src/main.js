// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import FastClick from 'fastclick'
import VueRouter from 'vue-router'
import App from './App'
import Room from './components/Room'
import Order from './components/Order'
import Address from './components/AddressList'
import EditAddress from './components/EditAddress'
import OrderSuccess from './components/OrderSuccess'
import MyOrderList from './components/MyOrder'
import Index from './components/Index'
import Auth from './components/Auth'
import RoomTemplate from './components/RoomTemplate'
import RoomNew from './components/RoomNews'
import RoomTest from './components/RoomTeset'
import IndexNew from './components/IndexNew'
import axios from 'axios'
import VueWechatTitle from 'vue-wechat-title'
import VueScroller  from 'vue-scroller'


import  { AlertPlugin ,LoadingPlugin ,ToastPlugin, cookie } from 'vux'

import { WechatPlugin } from 'vux'
/*import VConsole from 'vconsole'
const vConsole = new VConsole();*/


Vue.use(VueRouter);
Vue.use(AlertPlugin);
Vue.use(LoadingPlugin);
Vue.use(ToastPlugin, {position: 'middle'});
Vue.use(WechatPlugin);
Vue.use(VueWechatTitle)
Vue.use(VueScroller)

axios.defaults.baseURL = document.domain == 'localhost' ? 'http://www.yc.com/rest/v1/' : location.protocol + '//' + document.domain+'/rest/v1/';
//axios.defaults.baseURL = document.domain == 'localhost' ? 'https://yc.adaxiang.com/rest/v1/' : location.protocol + '//' + document.domain+'/rest/v1/';

Vue.prototype.DEBUG = 1;
Vue.debug_openid = "omIqUv9pP6EaM3tqd4UoAs4J4Ncw";
Vue.prototype.$axios = axios;
if (Vue.prototype.DEBUG != 1) {
    axios.interceptors.response.use(response => {
        if (response.code === 4007 || response.code == 4008) { // token过期
            // window.localStorage.removeItem('auth');
            router.replace({
                path: '/auth',
                query: {
                    redirect: router.currentRoute.fullPath
                }
            })
        }
        return response
    }, error => {
        return Promise.reject(error)
    });
}

Vue.prototype.axiosPost = function (url, data = {}) {
    if(data.length == 0){
        data = new FormData();
    }

    data.append('openid', cookie.get('auth'));
    return new Promise((resolve, reject) => {
        axios.post(url, data).then(
            response => {
                resolve(response.data);
            },
            err => {
                reject(err);
            }
        )
    })
};
Vue.prototype.axiosGet = function (url) {
    return new Promise((resolve, reject) => {
        axios.get(url).then(response => {
                resolve(response.data);
            }
        ).catch(err => {
            reject(err)
        })
    })
};



const routes = [
  {
    path: '/detail',
    component: RoomNew,
    meta: { title: '直播间-新版' },
  },
  {
    path: '/indexNew',
    component: IndexNew,
    meta: { title: '溯源直播' },
  },
    {
        path: '/room',
        component: RoomTemplate,
        meta: { title: '直播间' },
    },
    {
        path: '/order',
        component: Order,
        meta: { title: '订单' },
    },
    {
        path: '/order/mylist',
        component: MyOrderList,
        meta: { title: '我的订单' },
    },
    {
        path: '/order/success',
        component: OrderSuccess,
        meta: { title: '下单成功' },
    },
    {
        path: '/addr',
        component: Address,
        meta: { title: '地址管理' },
    },
    {
        path: '/addr/edit',
        component: EditAddress,
        meta: { title: '地址管理' },
    },
    {
        path: '/auth',
        component: Auth,
        meta: { title: '微信授权' },
    },
    {
        path: '/',
        component: Index,
        meta: { title: '直播间列表' },
    },
]


const router = new VueRouter({
    mode:'hash',
  routes
})



router.beforeEach((to, from, next) => {
    if (to.meta.title) {
        document.title = to.meta.title
    }

    var auth_code = cookie.get('auth');
    if(Vue.prototype.DEBUG){
        cookie.set('auth', Vue.debug_openid);
    }

    if(auth_code){
        if(!localStorage.getItem('openid')){
            localStorage.setItem('openid', auth_code);
        }
        next();
    } else {
        if(to.path.indexOf('/auth') == -1){
            cookie.set('refer', to.fullPath, {
                path: '/',
                expires: 7200
            });
        }

        if(to.path.indexOf('auth') > -1){ //如果是登录页面路径，就直接next()
            next();
        } else { //不然就跳转到登录；
            next('/auth');
            // next();
        }
    }
});

FastClick.attach(document.body)

Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
  router,
  render: h => h(App)
}).$mount('#app-box')
