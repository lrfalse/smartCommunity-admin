<template>
    <div class="header">
        <!-- 折叠按钮 -->
        <div class="collapse-btn" @click="collapseChage">
            <i class="el-icon-menu"></i>
        </div>
        <div class="logo">后台管理系统</div>
        <div class="header-right">
            <div class="header-user-con">
                <!-- 用户头像 -->
                <div class="user-avator"><img src="static/img/img.jpg"></div>
                <!-- 用户名下拉菜单 -->
                <el-dropdown class="user-name" trigger="click" @command="handleCommand">
                    <span class="el-dropdown-link">
                        {{obj.name}} <i class="el-icon-caret-bottom"></i>
                    </span>
                    <el-dropdown-menu slot="dropdown">
                        
                        <el-dropdown-item divided  command="savePassword">修改密码</el-dropdown-item>
                        <el-dropdown-item divided  command="loginout">退出登录</el-dropdown-item>
                    </el-dropdown-menu>
                </el-dropdown>
            </div>
        </div>

        <el-dialog title="修改密码" :visible.sync="show2" width="40%">
            <el-form 
                :inline="true" 
                :model="form" 
                :rules="rules"
                ref="ruleForm"
                class="demo-form-inline">

            <!--       <el-form-item 
                      label="原密码" 
                      label-width="100px"
                      prop="oldPwd">
                      <el-input 
                          v-model="form.oldPwd" 
                          maxlength="16"
                          placeholder="请输入真实姓名">
                      </el-input>
                  </el-form-item> -->

                  <el-form-item 
                      label="新密码" 
                      label-width="100px"
                      prop="pwd">
                      <el-input 
                          type="password"
                          v-model="form.pwd" 
                          maxlength="16"
                          placeholder="请输入真实姓名">
                      </el-input>
                  </el-form-item>

                  <el-form-item 
                      label="确认密码" 
                      label-width="100px"
                      prop="confirmPwd">
                      <el-input 
                          type="password"
                          v-model="form.confirmPwd" 
                          maxlength="16"
                          placeholder="请输入真实姓名">
                      </el-input>
                  </el-form-item>

                  <div class="submit">
                        <el-button 
                            type="primary" 
                            @click="saveSubmit">    
                            保存
                        </el-button>  
                        <el-button 
                            type="primary" 
                            @click="show2 = false">    
                            关闭
                        </el-button>
                  </div>
            </el-form>
        </el-dialog>
    </div>
</template>
<script>
    import bus from '../common/bus';
    import { Logout, UpdateSysUserPwd } from '../../api/api.js'

     

    export default {
        data() {
            const validatePass1 = (rule, value, callback) => {
                if (value === '') {
                  callback(new Error('请输入新密码'));
                } else {
                  if (this.form.pwd !== '') {
                    this.$refs.ruleForm.validateField('confirmPwd');
                  }
                  callback();
                }
            };
            const validatePass2 = (rule, value, callback) => {
                if (value === '') {
                  callback(new Error('请再次输入密码'));
                } else if (value !== this.form.pwd) {
                  callback(new Error('两次输入密码不一致!'));
                } else {
                  callback();
                }
            };  

            return {
                collapse: false,
                fullscreen: false,
                obj: JSON.parse(localStorage.getItem('ms_username')),
                message: 2,
                show2: false,
                form: {
                    pwd: '',
                    confirmPwd: '',
                },

                rules: {
                    // oldPwd: [
                    //     { required: true, message: '请输入密码', trigger: 'blur' },
                    //     { min: 6, message: '密码长度最少6位', trigger: 'blur' },
                    // ],
                    pwd: [
                        { required: true, validator: validatePass1, trigger: 'blur' },
                        { min: 6, message: '密码长度最少6位', trigger: 'blur' },
                    ],
                    confirmPwd: [
                        { required: true, validator: validatePass2, trigger: 'blur' },
                        { min: 6, message: '密码长度最少6位', trigger: 'blur' },
                    ],
                         
                    
                },
            }
        },
        created(){
            // this.FindSysUserApi()
        },
        methods:{
            // 获取用户信息
            savePassword(){
                // FindSysUser().then(data=>{
                //     console.log(data)
                //    let obj = JSON.parse(data.body).list
                //    console.log(obj)
                // })

                let id = localStorage.getItem('ms_username')

            },
            // 用户名下拉菜单选择事件
            handleCommand(command) {
                if(command == 'loginout'){
                    let phone = localStorage.getItem('ms_username')
                    Logout({phone:phone}).then(data=>{
                        this.$message.success('退出成功')
                    });

                    localStorage.removeItem('ms_username')
                    this.$router.push('/login');
                 
                };
                if(command == 'savePassword'){
                    this.show2 = true  
                };
            },
            saveSubmit(){
                let params = {
                    id:  this.obj.id,
                    pwd: this.form.pwd,
                };
                UpdateSysUserPwd(params).then(data=>{
                        console.log(data)
                        if(data.statusCode == '000'){
                            this.$message.success('修改成功')
                        }else{
                            this.$message.success(data.statusMsg)
                        };

                        this.show2 = false
                    })
            },
            // 侧边栏折叠
            collapseChage(){
                this.collapse = !this.collapse;
                bus.$emit('collapse', this.collapse);
            },

        }
    }
</script>
<style scoped>
    .header {
        position: relative;
        box-sizing: border-box;
        width: 100%;
        height: 70px;
        font-size: 22px;
        color: #fff;
    }
    .collapse-btn{
        float: left;
        padding: 0 21px;
        cursor: pointer;
        line-height: 70px;
    }
    .header .logo{
        float: left;
        width:250px;
        line-height: 70px;
    }
    .header-right{
        float: right;
        padding-right: 50px;
    }
    .header-user-con{
        display: flex;
        height: 70px;
        align-items: center;
    }
    .btn-fullscreen{
        transform: rotate(45deg);
        margin-right: 5px;
        font-size: 24px;
    }
    .btn-bell, .btn-fullscreen{
        position: relative;
        width: 30px;
        height: 30px;
        text-align: center;
        border-radius: 15px;
        cursor: pointer;
    }
    .btn-bell-badge{
        position: absolute;
        right: 0;
        top: -2px;
        width: 8px;
        height: 8px;
        border-radius: 4px;
        background: #f56c6c;
        color: #fff;
    }
    .btn-bell .el-icon-bell{
        color: #fff;
    }
    .user-name{
        margin-left: 10px;
    }
    .user-avator{
        margin-left: 20px;
    }
    .user-avator img{
        display: block;
        width:40px;
        height:40px;
        border-radius: 50%;
    }
    .el-dropdown-link{
        color: #fff;
        cursor: pointer;
    }
    .el-dropdown-menu__item{
        text-align: center;
    }
    .submit {
        margin: 24px; 
    }
</style>
