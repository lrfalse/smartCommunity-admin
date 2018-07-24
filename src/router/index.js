import Vue from 'vue';
import Router from 'vue-router';

Vue.use(Router);

export default new Router({
    // mode: 'history',
    routes: [
        {
            path: '/',
            redirect: '/Estate'
        },
        {
            path: '/',
            component: resolve => require(['../components/common/Home.vue'], resolve),
            meta: { title: '自述文件' },
            children:[
                
        // 小区管理

                // 物业管理
                {
                    path: '/Estate',
                    component: resolve => require(['../components/page/District_Management/Estate/Estate.vue'], resolve),
                    meta: { title: '物业管理' }
                },
                // 小区管理
                {
                    path: '/District',
                    component: resolve => require(['../components/page/District_Management/District/District.vue'], resolve),
                    meta: { title: '小区管理' }
                },
                // 楼栋管理
                {
                    path: '/Building',
                    component: resolve => require(['../components/page/District_Management/Building/Building.vue'], resolve),
                    meta: { title: '楼栋管理' }
                },
                // 房号与住户管理
                {
                    path: '/Household',
                    component: resolve => require(['../components/page/District_Management/Household/Household.vue'], resolve),
                    meta: { title: '房号与住户管理' }
                },
                // 用户管理
                {
                    path: '/admin',
                    component: resolve => require(['../components/page/User/Admin/Form.vue'], resolve),
                    meta: { title: '用户管理' }
                },
                //设备管理
                {
                    path: '/Equipment',
                    component: resolve => require(['../components/page/Equipment/Form.vue'], resolve),
                    meta: { title: '设备管理' }
                },


            ]
        },
        {
            path: '/login',
            component: resolve => require(['../components/page/Login.vue'], resolve)
        },
        {
            path: '/404',
            component: resolve => require(['../components/page/404.vue'], resolve)
        },
        {
            path: '*',
            redirect: '/404'
        }
    ]
})
