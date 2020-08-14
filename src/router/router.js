import Vue from 'vue'
import VueRouter from 'vue-router'
import login from '../views/login'
import { checktoken } from '@/api/apis'
Vue.use(VueRouter)
const router = new VueRouter({
    routes: [
        {
            path: '/',
            name: 'default',
            component: login
        },
        {
            path: '/main',
            name: 'main',
            component: () => import('../views/main.vue'),
            children: [
                {
                    path: '/main/Index',
                    name: 'Index',
                    component: () => import('../views/main/Index'),
                    meta: { breadlist: ['后台首页'] },
                },
                {
                    path: '/main/Productadd',
                    name: 'Productadd',
                    component: () => import('../views/main/Productadd'),
                    meta: { breadlist: ['商品管理','商品添加'] },
                },

                {
                    path: '/main/Productlist',
                    name: 'Productlist',
                    component: () => import('../views/main/Productlist'),
                    meta: { breadlist: ['商品管理','商品列表'] },
                },
                {
                    path: '/main/Productselect',
                    name: 'Productselect',
                    component: () => import('../views/main/Productselect'),
                    meta: { breadlist: ['商品管理','商品分类'] },
                },
                {
                    path: '/main/Addacc',
                    name: 'Addacc',
                    component: () => import('../views/main/Addacc'),
                    meta: { breadlist: ['账号管理','添加账号'] },
                },
                {
                    path: '/main/Changepwd',
                    name: 'Changepwd',
                    component: () => import('../views/main/Changepwd'),
                    meta: { breadlist: ['账号管理','修改密码'] },
                },
                {
                    path: '/main/Numlist',
                    name: 'Numlist',
                    component: () => import('../views/main/Numlist'),
                    meta: { breadlist: ['账号管理','账号列表'] },
                },
                {
                    path: '/main/Stat',
                    name: 'Stat',
                    component: () => import('../views/main/Stat'),
                    meta: { breadlist: ['销售统计','商品统计'] },
                },
                {
                    path: '/main/Order',
                    name: 'Order',
                    component: () => import('../views/main/Order'),
                    meta: { breadlist: ['销售统计','订单统计'] },
                },
                {
                    path: '/main/Shop',
                    name: 'Shop',
                    component: () => import('../views/main/Shop'),
                    meta: { breadlist: ['店铺管理'] },
                },
                {
                    path: '/main/Manage',
                    name: 'Manage',
                    component: () => import('../views/main/Manage'),
                    meta: { breadlist: ['订单管理'] },
                },
                {
                    path: '/main/Message',
                    name: 'Message',
                    component: () => import('../views/main/Message'),
                    meta: { breadlist: ['个人中心'] },
                }
            ]
        },
    ]
})
router.beforeEach((to, from, next) => {
    //beforeEach 路由发生改变前
    //to要跳转的页面
    //from 来自哪个页面
    //next 通行证
    if (to.path != '/') {
        checktoken(localStorage.token).then(res => {
            if (res.data.code == 0) {
                next()
            } else {
                next('/')
            }
        })
    } else {
        next()
    }
})
export default router