import axios from 'axios'
import Vue from 'vue'
import router from '../router/index.js'

// this.$indicator.open();

axios.defaults.baseURL= 'http://192.168.0.101:18080';
// axios.defaults.headers['Content-Type'] = "application/json;charset=UTF-8";
   // axios.defaults.baseURL= ENV.baseURL;
axios.defaults.withCredentials = false    // 携带cookie

// http request 拦截器

// axios.defaults.timeout = 10000
// axios.defaults.retry = 4;
// axios.defaults.retryDelay = 1000;

// axios.interceptors.request.use(
//     config => {
//         if (localStorage.getItem('token')) {
//             config.headers.authorization = localStorage.getItem('token');        
//         };
//         return config;
//     },
//     error => {
//         Vue.$toast({
//             message: '网络连接请求超时！',
//             position: 'bottom',
//             duration: 2000
//         });
//         Vue.$indicator.close()
//         return Promise.reject(error);
//     });
// //http response 拦截器
// axios.interceptors.response.use(
//     response => {
//         // 接口判断未登录
//         if(response.data.code ==401 && router.currentRoute.name!=='Login'){
//             localStorage.removeItem('token');
//             router.replace({path: '/Login', query: {redirect: router.currentRoute.fullPath}})
//             Vue.$toast(response.data.msg)
//         }
//         return response;
//     },
//     error => {
//          Vue.$toast({
//             message: '网络连接请求超时！',
//             position: 'bottom',
//             duration: 2000
//         });
//         Vue.$indicator.close()
//         return Promise.reject(error.response.data)   // 返回接口返回的错误信息
//     });


//用户登陆
export const Login = params => { return axios.post('/login',params).then(res => res.data);};
//新增系统用户
export const AddSysUser = params => { return axios.post('/addSysUser',params).then(res => res.data);};
// 新增物业信息接口
export const SaveProperty = params => { return axios.post('/saveProperty',params).then(res => res.data);};
// 	获取业务公司列表
export const FindPropertyCompanys = params => { return axios.post('/findPropertyCompanys',params).then(res => res.data);};
// 省
export const FindProvinces = params => { return axios.post('/findProvinces',params).then(res => res.data);};
// 市
export const FindCitys = params => { return axios.post('/findCitys',params).then(res => res.data);};
// 区
export const FindAreas = params => { return axios.post('/findAreas',params).then(res => res.data);};