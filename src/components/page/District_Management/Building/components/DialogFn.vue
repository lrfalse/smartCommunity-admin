<template>
    <div class="dialogFn">
       <el-dialog title="添加楼栋" :visible.sync="display" width="30%" :show-close="false" @close="resetForm('ruleForm')">

        <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="100px" class="demo-ruleForm">
            <el-form-item label="物业公司" prop="company.label">
                <el-select 
                    v-model="ruleForm.company.label" 
                    placeholder="请选择物业公司">
                  <el-option
                      v-for="item in ruleForm.company"
                      :key="item.value"
                      :label="item.label"
                      :value="item.value">
                  </el-option>
                </el-select>
            </el-form-item>
            <el-form-item label="所属小区" prop="district.label">
                    <el-select 
                        v-model="ruleForm.district.label" 
                        placeholder="请选择所属小区">
                      <el-option
                          v-for="item in ruleForm.district"
                          :key="item.value"
                          :label="item.label"
                          :value="item.value">
                      </el-option>
                    </el-select>
            </el-form-item>
            <el-form-item label="楼栋" prop="buidingNumber">
                <el-input 
                    v-model="ruleForm.buidingNumber" 
                    placeholder="请楼栋号">
                </el-input>
            </el-form-item>
            <el-form-item label="楼栋状态">
                <el-select 
                    v-model="ruleForm.state[0].label" 
                    disabled
                    placeholder="全部">
                  <el-option
                      v-for="item in ruleForm.state"
                      :key="item.value"
                      :label="item.label"
                      :value="item.value">
                  </el-option>
                </el-select>
            </el-form-item>
        </el-form>

            <span class="submit">
                <el-button @click="close">取 消</el-button>
                <el-button type="primary" @click="submit('ruleForm')">确 定</el-button>
            </span>
        </el-dialog>
    </div>
</template>

<script>
    export default {
        name:'dialogFn',
        data(){
            return {
                ruleForm: {
                    company: [ // 物业公司
                        {
                            value: '物业1',
                            label: '物业1',
                        },{
                            value: '物业2',
                            label: '物业2',
                        },
                        
                    ],
                    district: [ // 小区
                        {
                            value: '小区1',
                            label: '小区1',
                        },{
                            value: '小区2',
                            label: '小区2',
                        },
                    ],
                    buidingNumber: '', //楼栋号
                    state: [ //状态
                        {
                            value: '开启',
                            label: '开启',
                        },{
                            value: '关闭',
                            label: '关闭',
                        },
                    ],
                },
                
                rules: {
                    'company.label': [
                        { required: true, message: '请选择物业公司', trigger: 'blur' },
                        // { min: 3, max: 5, message: '长度在 3 到 5 个字符', trigger: 'blur' }
                    ],
                    'district.label': [
                        { required: true, message: '请选择所属小区', trigger: 'blur' },
                    ],
                    buidingNumber: [
                        { required: true, message: '请输入楼栋号', trigger: 'blur' },
                    ],
                },
                params: '',
                

            }
        },
        props: {
            visible: {
                type: Boolean,
                default: false,
            },
        },
        methods: {
            // 取消
           close(){
                this.$emit('close', false)
                // this.resetForm('ruleForm')
           },
           // 确定
           submit(formName){
            this.$refs[formName].validate((valid) => {
              if (valid) {
                this.params = {
                    property: this.ruleForm.company.label,
                    address: this.ruleForm.district.label,
                    buiding: this.ruleForm.buidingNumber,
                    state: this.ruleForm.state[0].label,
                    close: false,
                };
                this.$emit('submit', this.params)

                // this.resetForm(formName)
              } else {
                this.$message({
                    type: 'error',
                    message: '请填写完整信息!'
                });
                return false;
              }
            });
           },
           // 重置
           resetForm(formName) {
             this.$refs[formName].resetFields();
           },

        }
    }
</script>
<style lang="stylus" scoped>
.el-form-item
    margin 24px 0
.el-input, .el-select
    width: 80%;
    min-width: 215px;
        
.submit
    width: 100%
    height 80px;
    display flex
    align-items center
    justify-content flex-end   
    .el-button
        margin 0 12px; 
</style>