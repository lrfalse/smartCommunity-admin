const rules = {

	nickName: [ // 昵称
        { required: true, message: '请输入昵称', trigger: 'blur' }
    ],
    loginName: [ // 登录名
        { required: true, message: '请输入登陆名', trigger: 'blur' }
    ],
    password: [ //密码
        { required: true, message: '请输入密码', trigger: 'blur' },
        { min: 6, message: '密码长度最少6位', trigger: 'blur' },
    ],
    phone: [  //电话号码
        { required: true, message: '请输入电话号码', trigger: 'blur' }
    ],
}

export default rules
    

