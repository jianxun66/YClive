// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import FastClick from 'fastclick'
import VueRouter from 'vue-router'
import App from './App'
import Home from './components/Home'
import Index from './components/Home'
import LiveRoom from './components/LiveRoom'
import Order from './components/Order'
import Address from './components/Address'
import EditAddress from './components/EditAddress'
import OrderSuccess from './components/OrderSuccess'
import MyOrder from './components/OrderSuccess'
import axios from 'axios'


Vue.use(VueRouter);

axios.defaults.baseURL = document.domain == 'localhost' ? 'http://www.yc.com/rest/v1/' : location.protocol + '//' + document.domain+'/rest/v1/';


Vue.prototype.$axios = axios;
Vue.prototype.axiosPost = function (url, data = {}) {
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
        path: '/',
        component: Index,
        meta: { title: '直播间' },
    },
    {
        path: '/home',
        component: Home,
        meta: { title: '直播间' },
    },
    {
        path: '/order',
        component: Order,
        meta: { title: '订单' },
    },
    {
        path: '/order/my',
        component: MyOrder,
        meta: { title: '我的订单' },
    },
    {
        path: '/order/success',
        component: OrderSuccess,
        meta: { title: '下单成功' },
    },
    {
        path: '/room',
        component: LiveRoom,
        meta: { title: '直播间' },
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
]


const router = new VueRouter({
  routes
})


router.beforeEach((to, from, next) => {
    if (to.meta.title) {
        document.title = to.meta.title
    }

    next();
});

FastClick.attach(document.body)

Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
  router,
  render: h => h(App)
}).$mount('#app-box')
