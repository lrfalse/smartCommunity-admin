import Vue from 'vue';
import Router from 'vue-router';

Vue.use(Router);

export default new Router({
    mode: 'history',
    routes: [
        {
            path: '/',
            redirect: '/dashboard'
        },
        {
            path: '/',
            component: resolve => require(['../components/common/Home.vue'], resolve),
            meta: { title: '自述文件' },
            children:[
                {
                    path: '/dashboard',
                    component: resolve => require(['../components/page/Dashboard.vue'], resolve),
                    meta: { title: '系统首页' }
                },
                // 内容管理
                // {
                //     path: '/AnnouncementManagement',
                //     component: resolve => require(['../components/page/ContentManagement/AnnouncementManagement.vue'], resolve),
                //     meta: { title: '公告管理' }
                // },
                // {
                //     path: '/ActivityManagement',
                //     component: resolve => require(['../components/page/ContentManagement/ActivityManagement.vue'], resolve),
                //     meta: { title: '活动管理' }
                // },
                // // 路由管理
                // {
                //     path: '/Path',
                //     component: resolve => require(['../components/page/Path/Path.vue'], resolve),
                //     meta: { title: '路由管理' }
                // },
                // 权限管理
                // {
                //     path: '/Role',
                //     component: resolve => require(['../components/page/AuthorityManagement/Role.vue'], resolve),
                //     meta: { title: '角色管理' }
                // },




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

        // 基础管理

                // 角色管理
                {
                    path: '/Role',
                    component: resolve => require(['../components/page/Basic_Management/Role/Role.vue'], resolve),
                    meta: { title: '角色管理' }
                },
                // 用户管理
                {
                    path: '/User',
                    component: resolve => require(['../components/page/Basic_Management/User/User.vue'], resolve),
                    meta: { title: '用户管理' }
                },         

        // 通知反馈

                // 通知公告
                {
                    path: '/Notification',
                    component: resolve => require(['../components/page/Notification_Feedback/Notification/Notification.vue'], resolve),
                    meta: { title: '通知公告' }
                },
                // 报事报修
                {
                    path: '/Feedback',
                    component: resolve => require(['../components/page/Notification_Feedback/Feedback/Feedback.vue'], resolve),
                    meta: { title: '报事报修' }
                },















                {
                    path: '/table',
                    component: resolve => require(['../components/page/BaseTable.vue'], resolve),
                    meta: { title: '基础表格' }
                },
                {
                    path: '/tabs',
                    component: resolve => require(['../components/page/Tabs.vue'], resolve),
                    meta: { title: 'tab选项卡' }
                },
                {
                    path: '/form',
                    component: resolve => require(['../components/page/BaseForm.vue'], resolve),
                    meta: { title: '基本表单' }
                },
                {
                    // 富文本编辑器组件
                    path: '/editor',
                    component: resolve => require(['../components/page/VueEditor.vue'], resolve),
                    meta: { title: '富文本编辑器' }
                },
                {
                    // markdown组件
                    path: '/markdown',
                    component: resolve => require(['../components/page/Markdown.vue'], resolve),
                    meta: { title: 'markdown编辑器' }    
                },
                {
                    // 图片上传组件
                    path: '/upload',
                    component: resolve => require(['../components/page/Upload.vue'], resolve),
                    meta: { title: '文件上传' }   
                },
                {
                    // vue-schart组件
                    path: '/charts',
                    component: resolve => require(['../components/page/BaseCharts.vue'], resolve),
                    meta: { title: 'schart图表' }
                },
                {
                    // 拖拽列表组件
                    path: '/drag',
                    component: resolve => require(['../components/page/DragList.vue'], resolve),
                    meta: { title: '拖拽列表' }
                },
                {
                    // 权限页面
                    path: '/permission',
                    component: resolve => require(['../components/page/Permission.vue'], resolve),
                    meta: { title: '权限测试', permission: true }
                }
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
            path: '/403',
            component: resolve => require(['../components/page/403.vue'], resolve)
        },
        {
            path: '*',
            redirect: '/404'
        }
    ]
})
