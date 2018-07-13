<template>
    <div class="DialogFn">
      <el-dialog title="添加通知公告" :visible.sync="visible" width="40%">
        <!-- <h4 class="title">角色信息</h4> -->
         <div class="contain">
                <div class="list">
                    <div class="content">
                        <el-col :span="4">
                            <div class="name">
                                通知内容
                            </div>
                        </el-col>
                        <el-col :span="20">
                            <div class="dec">
                                内容
                            </div>    
                        </el-col>
                    </div>

                    <div class="state">
                        <el-col :span="4">
                            <div class="name">
                                接受对象
                            </div>
                        </el-col>
                        <el-col :span="20">
                            <div class="dec">
                                <el-select v-model="state_value" placeholder="请选择">
                                    <el-option
                                      v-for="item in state_option"
                                      :key="item.value"
                                      :label="item.label"
                                      :value="item.value">
                                    </el-option>
                                </el-select>
                            </div>    
                        </el-col>
                    </div>    
                    
                </div>

            </div>
            <!-- 添加角色 submit -->
            <div class="pagination" v-if="button_switch">
                <el-button 
                    type="primary" 
                    @click="submit_add('ruleForm')">    
                    发布
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
                formData: {
                    user_number: '账号',
                    user_password: '213213',
                    user_name: '姓名',
                    user_phone: '手机',
                    user_role: '角色名称',
                    company: '公司',
                    buiding: '小区',
                    state: '禁用',
                },
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

                state_value: '',
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

                    let params = {
                        role_name: this.formData.role_name,
                        role_des: this.formData.role_des,
                        state: this.formData.state,

                    };

                     this.$message({
                        type: 'success',
                        message: '修改成功!'
                    });
                    
                    this.$emit('updata_allback', params)

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
                let updata = this.pror_updata[0]
                // 插入数据
                this.formData = {
                    role_name : updata.role_name,
                    role_des : updata.role_des,
                    state : updata.state,
                };
                //  权限
                this.updata_checked = updata.obtain  
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
                for(let i in this.formData){
                    if(i != 'state'){
                        this.formData[i] = ''
                    } 
                };
                this.formData.state = this.state_option[0].value
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
.list
    width: 100%
    min-height 240px; 
    .content
        min-height: 120px;
        padding: 24px 0;
        .name
            height 100%
            padding: 12px;
        .dec
            border 1px solid #ddd 
            padding 12px;
            min-height: 80px;    

</style>