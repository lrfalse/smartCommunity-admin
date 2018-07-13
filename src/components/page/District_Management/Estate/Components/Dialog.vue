<template>
    <div class="DialogFn">
      <el-dialog title="添加用户" :visible.sync="visible" width="40%">
        <!-- <h4 class="title">角色信息</h4> -->
         <el-form 
         :model="formData" 
         :rules="rules" 
         :inline="true"
         ref="ruleForm" 
         label-width="100px" 
         class="demo-ruleForm">
            <el-form-item 
                label="公司全称" 
                prop="propertyName">
                <el-input 
                    v-model="formData.propertyName" 
                    placeholder="请输入用户姓名">
                </el-input>
            </el-form-item>
            <el-form-item 
                label="公司简称" 
                prop="propertyShortname">
                <el-input 
                    v-model="formData.propertyShortname" 
                    placeholder="请输入用户电话">
                </el-input>
            </el-form-item>
            <el-form-item 
                label="联系人姓名" 
                prop="name">
                <el-input 
                    v-model="formData.name" 
                    placeholder="请输入用户账号">
                </el-input>
            </el-form-item>
            <el-form-item 
                label="联系人电话" 
                prop="phone">
                <el-input 
                    v-model="formData.phone" 
                    placeholder="请输入用户密码">
                </el-input>
            </el-form-item>
            <el-form-item label="小区状态">
                <el-select 
                    v-model="formData.state"   
                    disabled 
                    placeholder="全部">
                  <el-option
                      v-for="item in state_option"
                      :key="item.value"
                      :label="item.label"
                      :value="item.value">
                  </el-option>
                </el-select>
            </el-form-item>
<!-- disabled -->
            <!-- <Checkbox
            @getChecked="getChecked"
            :clear_array="clear_array"
            :updata_checked="updata_checked"
             /> -->
            
            <!-- 添加角色 submit -->
            <div class="pagination" v-if="button_switch">
                <el-button 
                    type="primary" 
                    @click="submit_add('ruleForm')">    
                    添加保存
                </el-button>
                <el-button 
                    type="primary" 
                    @click="visible = false">    
                    关闭
                </el-button>
            </div>

            <!-- 修改角色 submit -->
            <div class="pagination" v-else>
                <el-button 
                    type="primary" 
                    @click="submit_edit('ruleForm')">    
                    修改保存
                </el-button>
                <el-button 
                    type="primary" 
                    @click="visible = false">    
                    关闭
                </el-button>
            </div>
        </el-form>

      </el-dialog>
    
    </div>
</template>

<script>
    // import Checkbox from "./Checkbox.vue";

    export default {
        name: 'DialogFn',
        data(){
            return {
                visible: false,
                button_switch: true,
                clear_array: false,
                updata_checked: [],  // 编辑 传入的 多选
                formData: {},
                updataForm: {},
                company_option: [
                    {
                        label: '启用',
                        value: '启用',
                    },{
                        label: '禁用',
                        value: '禁用',
                    }
                ],
                buiding_option: [
                    {
                        label: '启用',
                        value: '启用',
                    },{
                        label: '禁用',
                        value: '禁用',
                    }
                ],
                state_option: [
                    {
                        label: '启用',
                        value: '启用',
                    },{
                        label: '禁用',
                        value: '禁用',
                    }
                ],
                // 验证规则
                rules: {
                    user_name: { required: true, message: '请输入用户姓名', trigger: 'blur' },
                    user_phone: { required: true, message: '请输入用户手机号', trigger: 'blur' },
                    user_number: { required: true, message: '请输入用户账号', trigger: 'blur' },
                    user_password: { required: true, message: '请输入用户账号', trigger: 'blur' },
                    'formData.company': { required: true, message: '请输入用户账号', trigger: 'blur' }
                },
            }
        },
        props: {
            prop_visible: {
                type: Boolean,
                default: false,
            },
            pror_updata: {
                type: Array,
                default: [],
            }
        },
        components: {
            // Checkbox,
        },
        methods: {
            // 添加 提交
            submit_add(formName){
                this.$refs[formName].validate((valid) => {
                  if (valid) {          
            
                        // 参数
                        let params = {
                            role_name: this.formData.role_name,
                            role_des: this.formData.role_des,
                            state: this.formData.state,
                            obtain: this.formData.obtain == "" ? [] : this.formData.obtain,
                        };

                        this.$message({
                            type: 'success',
                            message: '添加成功!'
                        });

                        this.$emit('add_callback', params)

                  } else {
                        this.$message({
                            type: 'error',
                            message: '请填写完整信息!'
                        });
                    
                        return false;
                  };

                  this.visible = false
                });
            },
            // 修改 提交
            submit_edit(formName){
               this.$refs[formName].validate((valid) => {
                  if (valid) {          

                     this.$message({
                        type: 'success',
                        message: '修改成功!'
                    });

                     this.updataForm = this.formData
                    
                    this.$emit('updata_allback', this.updataForm)

                  } else {
                    this.$message({
                        type: 'error',
                        message: '请填写完整信息!'
                    });
                    
                    return false;
                  };

                  this.visible = false
                });
            },
            // 重置
            resetForm() {
                 this.$refs['ruleForm'].resetFields();
            },

            // 编辑
            updata_row(){
                this.button_switch = false
                this.formData = this.pror_updata[0]
            },
            // 获取 多选
            getChecked(val){
                this.formData.obtain = val
            },

        },
        watch: {
            prop_visible(n){
                this.visible = n
                this.clear_array = !this.clear_array
                // for(let i in this.formData){
                //     if(i != 'state'){
                //         this.formData[i] = ''
                //     } 
                // };
                // this.formData.state = this.state_option[0].value
            },
            visible(n){
                this.$emit('close_mask', n)
                this.button_switch = true
            },
            pror_updata(n){
                this.updata_row() 
            }
        },
    }
</script>
<style lang="stylus" scoped>
.title
    font-size 24px;
    color #ff0000
    margin-bottom 24px;
.el-button
    width: 100px; 
    margin-right: 24px;   

</style>