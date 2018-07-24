import axios from 'axios'
import Vue from 'vue'
import router from '../router/index.js'

// this.$indicator.open();

axios.defaults.baseURL= 'http://192.168.0.101:18080';
// axios.defaults.baseURL= 'http://120.79.222.9:18080';
// axios.defaults.headers['Content-Type'] = "application/json;charset=UTF-8";
   // axios.defaults.baseURL= ENV.baseURL;
axios.defaults.withCredentials = false    // 携带cookie

// http request 拦截器

axios.defaults.timeout = 10000
axios.defaults.retry = 4;
axios.defaults.retryDelay = 1000;

axios.interceptors.request.use(
    config => {
        // if (localStorage.getItem('token')) {
        //     config.headers.authorization = localStorage.getItem('token');        
        // };
        return config;
    },
    error => {
        Vue.$message.error('网络连接请求超时！')

        // Vue.$indicator.close()
        return Promise.reject(error);
    });
//http response 拦截器
axios.interceptors.response.use(
    response => {
        // 接口判断未登录
        if(response.data.code === '000' && router.currentRoute.name!=='Login'){
            localStorage.removeItem('token');
            router.replace({path: '/Login', query: {redirect: router.currentRoute.fullPath}})
            
        }
        return response;
    },
    error => {
         Vue.$message.error('网络连接请求超时！')
        // Vue.$indicator.close()
        return Promise.reject(error.response.data)   // 返回接口返回的错误信息
    });


//用户登陆
export const Login = params => { return axios.post('/login',params).then(res => res.data);};
// 退出登陆
export const Logout = params => { return axios.post('/logout',params).then(res => res.data);};
// 修改密码 
export const UpdateSysUserPwd = params => { return axios.post('/updateSysUserPwd',params).then(res => res.data);};

// 新增物业信息接口
export const SaveProperty = params => { return axios.post('/saveProperty',params).then(res => res.data);};
// 	获取物业公司列表 / 查询
export const FindPropertyCompanys = params => { return axios.post('/findPropertyCompanys',params).then(res => res.data);};
// 修改 物业公司信息
export const UpdateProperty = params => { return axios.post('/updateProperty',params).then(res => res.data);};
// 省
export const FindProvinces = params => { return axios.post('/findProvinces',params).then(res => res.data);};
// 市
export const FindCitys = params => { return axios.post('/findCitys',params).then(res => res.data);};
// 区
export const FindAreas = params => { return axios.post('/findAreas',params).then(res => res.data);};

// 添加小区信息
export const SaveHousingestate = params => { return axios.post('/saveHousingestate',params).then(res => res.data);};
// 获取/ 查询 小区信息
export const FindHousingestate = params => { return axios.post('/findHousingestate',params).then(res => res.data);};
// 修改小区信息
export const UpdateHousingestate = params => { return axios.post('/updateHousingestate',params).then(res => res.data);};


// 添加楼栋
export const SaveBuilding = params => { return axios.post('/saveBuilding',params).then(res => res.data);};
// 获取 / 查询 楼栋信息
export const FindBuilding = params => { return axios.post('/findBuilding',params).then(res => res.data);};
// 修改楼栋
export const UpdateBuilding = params => { return axios.post('/updateBuilding',params).then(res => res.data);};

// 获取 / 查询 房号信息
export const FindRoom = params => { return axios.post('/findRoom',params).then(res => res.data);};
// 添加 房号
export const SaveRoom = params => { return axios.post('/saveRoom',params).then(res => res.data);};
// 修改 房号
export const UpdateRoom = params => { return axios.post('/updateRoom',params).then(res => res.data);};

// 获取 业主
export const FindMember = params => { return axios.post('/findMember',params).then(res => res.data);};
// 添加业主 
export const SaveMember = params => { return axios.post('/saveMember',params).then(res => res.data);};
// 编辑 业主
export const UpdateMember = params => { return axios.post('/updateMember',params).then(res => res.data);};

// 获取用户信息
export const FindSysUser = params => { return axios.post('/findSysUser',params).then(res => res.data);};
// 新增用户
export const AddSysUser = params => { return axios.post('/addSysUser',params).then(res => res.data);};
// 编辑用户
export const UpdateSysUser = params => { return axios.post('/updateSysUser',params).then(res => res.data);};

// 查询设备
export const FindGatDerviceInventory = params => { return axios.post('/findGatDerviceInventory',params).then(res => res.data);};
// 添加 设备
export const SaveGatDerviceInventory = params => { return axios.post('/saveGatDerviceInventory',params).then(res => res.data);};
//修改设备
export const UpdateGatDerviceInventory = params => { return axios.post('/updateGatDerviceInventory',params).then(res => res.data);};
