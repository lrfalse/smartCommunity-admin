<template>
    <div class="Dialog">
      <el-dialog title="添加用户" :visible.sync="updataVisible" width="40%">
        <el-form 
            :inline="true" 
            :model="form" 
            :rules="rules"
            ref="ruleForm"
            class="demo-form-inline">

              <el-form-item 
                  label="真实姓名" 
                  label-width="100px"
                  prop="name">
                  <el-input 
                      v-model="form.name" 
                      maxlength="8"
                      placeholder="请输入真实姓名">
                  </el-input>
              </el-form-item>

              <el-form-item 
                  label="昵称" 
                  label-width="100px"
                  prop="nickName">
                  <el-input 
                      v-model="form.nickName" 
                      maxlength="12"
                      placeholder="请输入昵称">
                  </el-input>
              </el-form-item>

              <el-form-item 
                  label="电话号码" 
                  label-width="100px"
                  prop="mobPhone">
                  <el-input 
                      v-model="form.mobPhone" 
                      maxlength="11"
                      placeholder="请输入电话号码">
                  </el-input>
              </el-form-item>

              <el-form-item 
                  label="性别" 
                  label-width="100px"
                  prop="sex">
                  <el-select 
                    v-model="form.sex"   
                    placeholder="全部">
                    <el-option
                        v-for="item in sexOption"
                        :key="item.value"
                        :label="item.label"
                        :value="item.value">
                    </el-option>
                  </el-select>
              </el-form-item>

              <el-form-item 
                  label="身份证号" 
                  label-width="100px"     
                  prop="identityCode">
                  <el-input 
                      v-model="form.identityCode" 
                      maxlength="18"
                      placeholder="请输入身份证号">
                  </el-input>
              </el-form-item>

              <el-form-item 
                  label="电子邮件" 
                  label-width="100px"
                  prop="email">
                  <el-input 
                      v-model="form.email" 
                      placeholder="请输入电子邮件">
                  </el-input>
              </el-form-item>

              <el-form-item 
                  label="状态" 
                  label-width="100px"
                  prop="isValid">
                  <el-select 
                    v-model="form.isValid"  
                    disabled 
                    placeholder="全部">
                    <el-option
                        v-for="item in isValidOption"
                        :key="item.value"
                        :label="item.label"
                        :value="item.value">
                    </el-option>
                  </el-select>
              </el-form-item>


            <div class="submit">
                <el-button 
                    type="primary" 
                    @click="saveSubmit">    
                    保存
                </el-button>  
                <el-button 
                    type="primary" 
                    @click="updataVisible = false">    
                    关闭
                </el-button>
            </div>
        </el-form>
      </el-dialog>

    </div>
</template>

<script>
    import { UpdateSysUser } from "../../../../../api/api.js";
    
    export default {
        name: 'Building',
        data(){
            return {
                updataVisible: false,
                form: {
                  isValid: 0,
                },
                sexOption: [
                  {
                    label: '男',
                    value: '1',
                  },{
                    label: '女',
                    value: '2',
                  },
                ],
                isValidOption: [
                  {
                    label: '有效',
                    value: 0,
                  },{
                    label: '无效',
                    value: 1,
                  },
                ],

                // 验证规则
                rules: {
                    name: [
                      { required: true, message: '请输入联系人姓名', trigger: 'blur' },
                      { min: 2, message: '请输入正确的姓名', trigger: 'blur' },
                      { pattern: /^[\u4E00-\u9FA5]+$/, message: '用户名只能为中文', trigger: 'blur' },
                    ],
                    nickName: { required: true, message: '请输入昵称', trigger: 'blur' },
                    pwd: [
                        { required: true, message: '请输入密码', trigger: 'blur' },
                        { min: 6, message: '密码长度最少6位', trigger: 'blur' },
                    ],
                    mobPhone: [
                        { required: true, message: '请输入联系人电话', trigger: 'blur' },
                        {validator:function(rule,value,callback){
                            if(/^1[34578]\d{9}$/.test(value) == false){
                                callback(new Error("请输入正确的手机号"));
                            }else{
                                callback();
                            }
                        }, trigger: 'blur'},
                    ],
                    sex: { required: true, message: '请选择性别', trigger: 'blur' },
                    identityCode: [
                        { required: true, message: '请输入身份证号', trigger: 'blur' },
                        { pattern:/(^\d{15}$)|(^\d{18}$)|(^\d{17}(\d|X|x)$)/, message: '你的身份证格式不正确', trigger: 'blur'},         
                    ],
                },

            }
        },
        props: {
          switch: {
            type: Boolean,
            default: false,
          },
          editData: {
            type: Object,
            default: null,
          },
        },
        methods: {

          //修改提交
           saveSubmit(){
               this.$refs['ruleForm'].validate((valid) => {
                if (valid) {  
                    // let md5 = crypto.createHash('md5').update(this.form.pwd)      
                    // this.form.pwd = md5.digest('hex')     

                    UpdateSysUser(this.form).then(data=>{
                      // console.log(data)
                      if(data.statusCode === '000'){
                        this.$message({
                            type: 'success',
                            message: '添加成功'
                        });
                        this.$emit('updataData', data.statusCode);
                      }else{
                        this.$message({
                            type: 'error',
                            message: data.statusMsg,
                        });
                      };
                    });
                } else {
                    this.$message({
                        type: 'error',
                        message: '请填写完整信息!'
                    });
                  
                    return false;
                };
                this.updataVisible = false
                this.form = {}
              })
           },
           editDataFn(){
              this.form = JSON.parse(JSON.stringify(this.editData));
           },
        },
        watch: {
          switch(n){
            this.updataVisible = n ;
            n ? this.editDataFn() : '';
          },
          updataVisible(n){
            this.$emit('visible', n)
          },
        },

    };
</script>
<style lang="stylus" scoped>
.search  
  margin-bottom 24px;  
.pagination
  display flex  
  justify-content space-between
.submit
  margin 24px  
  .el-button 
    width 80px;
    margin-right: 24px;
  
</style>





