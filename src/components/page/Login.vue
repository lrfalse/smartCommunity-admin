<template>
    <div class="login-wrap">
        <div class="ms-title">后台管理系统</div>
        <div class="ms-login">
            <el-form :model="ruleForm" 
            id="form"
            :rules="rules" 
            ref="ruleForm" 
            label-width="0px" 
            :status-icon='true'
            class="demo-ruleForm" >
            
                <el-form-item prop="username">
                    <el-input 
                    v-model="ruleForm.username" 
                    maxLength="24"
                    placeholder="请输入用户名">
                        
                    </el-input>
                </el-form-item>
                <el-form-item prop="password">
                    <el-input type="password" 
                    placeholder="请输入密码" 
                    minLength="6"
                    maxLength="24"
                    v-model="ruleForm.password" 
                    @keyup.enter.native="submitForm('ruleForm')">
                        
                    </el-input>
                </el-form-item>
                <el-form-item prop="code" id="formCode">
                    <div class="code">
                        <el-input
                        placeholder="请输入验证码" 
                        v-model="ruleForm.code" 
                        maxLength="3"
                        @keyup.enter.native="submitForm('ruleForm')">
                            
                        </el-input>
                    </div>
                    <div @click="createCode">
                        <identify :identifyCode="checkCode"></identify>      
                    </div>
                    
                </el-form-item>
                <div class="login-btn">
                    <el-button type="primary" @click="submitForm('ruleForm')">登录</el-button>
                </div>
            </el-form>
        </div>
    </div>
</template>

<script>
    import identify from '../common/identify.vue'
    import crypto from 'crypto'
    import { Login } from '../../api/api.js'
    import rules from '../../assets/js/rules.js'
  
    export default {
        data: function(){
            //验证规则
            const validatorCode = (rule, value, callback) =>{
                if (value.toUpperCase() != this.checkCode) {
                    callback(new Error('验证码错误'))
                }else{
                    callback()
                }
            }

            return {
                ruleForm: {
                    username: '',
                    password: '',
                    code: '',
                },
                rules: 
                {
                    username: [
                        { required: true, message: '请输入用户名', trigger: 'blur' }
                    ],
                    password: [
                        { required: true, message: '请输入密码', trigger: 'blur' },
                        { min: 6, message: '密码长度最少6位', trigger: 'blur' },
                    ],
                    code: [
                        // { required: true, message: '请输入验证码', trigger: 'blur' },
                        { validator: validatorCode, trigger: 'submit' }
                        
                    ]
                },
                checkCode: '',  //验证码图片

            }
        },
        components: {
            identify
        },
        mounted(){
            this.createCode()

        },
        methods: {
            submitForm(formName) {    
                    // localStorage.setItem('ms_username',this.ruleForm.username);
                    // this.$router.push('/');
                    // return
                // let form = document.getElementById('form')
                // let formData = new FormData(form)

                this.$refs[formName].validate((valid) => {
                    if (valid) {
                        // localStorage.setItem('ms_username',this.ruleForm.username);
                        // this.$router.push('/');   
                      let md5 = crypto.createHash('md5').update(this.ruleForm.password)                 
                      let params = { 
                            name: this.ruleForm.username,
                            pwd: md5.digest('hex')                             
                          };
                        Login(params).then(data=>{
                            if (data.statusCode === '000') {
                                let obj = JSON.parse(data.body).mobPhone
                                console.log(obj)
                                this.$message.success('登陆成功');
                                localStorage.setItem('ms_username',obj);
                                this.$router.push('/');
                            }else{
                                
                                this.$message.error('用户名或密码错误');
                                this.resetForm()
                            }
                        });
                        
                    } else {
                        // this.$message.error('用户名或密码错误');
                        return false;
                    };

                });
            },
            //重置输入框
            resetForm() {
                this.$refs['ruleForm'].resetFields();
                this.createCode()
            },

          //图片验证码
          createCode(){
            let code = "";    
            let codeLength = 3;//验证码的长度   
            let random = new Array(0,1,2,3,4,5,6,7,8,9,'A','B','C','D','E','F','G','H','I','J','K','L','M','N','O','P','Q','R',   
             'S','T','U','V','W','X','Y','Z');//随机数   
            for(let i = 0; i < codeLength; i++) {//循环操作   
                let index = Math.floor(Math.random()*36);//取得随机数的索引（0~35）   
                code += random[index];//根据索引取得随机数加到code上   
            }   
                this.checkCode = code;//把code值赋给验证码   
                console.log(this.checkCode)
          },
        }
    }
</script>

<style scoped>
    .login-wrap{
        position: relative;
        width:100%;
        height:100%;
    }
    .ms-title{
        position: absolute;
        top:50%;
        width:100%;
        margin-top: -230px;
        text-align: center;
        font-size:30px;
        color: #fff;

    }
    .ms-login{
        position: absolute;
        left:50%;
        top:50%;
        width:300px;
        height:200px;
        margin:-150px 0 0 -190px;
        padding:40px;
        border-radius: 5px;
        background: #fff;
    }
    .login-btn{
        text-align: center;
    }
    .login-btn button{
        width:100%;
        height:36px;
    }
    .code {
        width: 50%;
        float: left;
        margin-right: 36px;
    }

</style>