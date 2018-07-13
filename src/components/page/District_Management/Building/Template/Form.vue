<template>
    <div class="buiding_form">
       <div class="container">
            <el-table 
                :data="formData" 
                border 
                style="width: 100%" 
                ref="multipleTable">
                <el-table-column 
                    type="selection" 
                    width="55">        
                </el-table-column>
                <el-table-column 
                    prop="buiding" 
                    label="楼栋" 
                    sortable 
                    width="120" 
                    align="center">
                </el-table-column>
                <el-table-column 
                    prop="address" 
                    label="所属小区" 
                    width="260" 
                    align="center">
                </el-table-column>
                <el-table-column 
                    prop="property" 
                    label="所属物业" 
                    
                    align="center">
                </el-table-column>
                <el-table-column 
                    prop="state" 
                    label="楼栋状态" 
                    
                    width="80" 
                    align="center">
                </el-table-column>
                <el-table-column 
                    label="操作" 
                    width="180" 
                    align="center">
                    <template slot-scope="scope">
                        <el-button size="small" @click="handleEdit(scope.$index, scope.row)">编辑</el-button>
                        <el-button size="small" type="danger" @click="deleteRow(scope.$index, scope.row)">删除</el-button>
                    </template>
                </el-table-column>
            </el-table>
            <div class="pagination">
                    <el-button 
                        type="primary" 
                        @click="visible = true">
                        
                        添加楼栋
                    </el-button>
                <el-pagination 
                    @current-change="handleCurrentChange" 
                    layout="prev, pager, next" 
                    :total="formData.length">
                </el-pagination>
            </div>
        </div>


    <!-- DialogFn -->
        <!-- 添加 / 编辑 -->
        <el-dialog title="添加楼栋" :visible.sync="visible" width="30%" @close="resetForm('ruleForm')">
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
                    <el-button @click="visible = false">取 消</el-button>
                    <el-button type="primary" @click="submit('ruleForm')">确 定</el-button>
                </span>
        </el-dialog>
 
        <!-- 删除提示框 -->
        <el-dialog title="删除" :visible.sync="delVisible" width="450px" center>
            <div class="del-dialog-cnt">删除不可恢复，是否确定删除？</div>
            <span slot="footer" class="dialog-footer">
                <el-button @click="delVisible = false">取 消</el-button>
                <el-button type="primary" @click="deleteFn">确 定</el-button>
            </span>
        </el-dialog>

        
    <!-- 编辑 -->
       <!--   <el-dialog title="编辑" :visible.sync="editVisible" width="30%" @close="resetForm('editRuleForm')">
            <el-form :model="editRuleForm" :rules="rules" ref="editRuleForm" label-width="100px" class="demo-ruleForm">
                <el-form-item label="物业公司" prop="company.label">
                    <el-select 
                        v-model="editRuleForm.company.label" 
                        placeholder="请选择物业公司">
                      <el-option
                          v-for="item in editRuleForm.company"
                          :key="item.value"
                          :label="item.label"
                          :value="item.value">
                      </el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="所属小区" prop="district.label">
                        <el-select 
                            v-model="editRuleForm.district.label" 
                            placeholder="请选择所属小区">
                          <el-option
                              v-for="item in editRuleForm.district"
                              :key="item.value"
                              :label="item.label"
                              :value="item.value">
                          </el-option>
                        </el-select>
                </el-form-item>
                <el-form-item label="楼栋" prop="buidingNumber">
                    <el-input 
                        v-model="editRuleForm.buidingNumber" 
                        placeholder="请楼栋号">
                    </el-input>
                </el-form-item>
                <el-form-item label="楼栋状态">
                    <el-select 
                        v-model="editRuleForm.state[0].label" 
                        disabled
                        placeholder="全部">
                      <el-option
                          v-for="item in editRuleForm.state"
                          :key="item.value"
                          :label="item.label"
                          :value="item.value">
                      </el-option>
                    </el-select>
                </el-form-item>
            </el-form>

                <span class="submit">
                    <el-button @click="editVisible = false">取 消</el-button>
                    <el-button type="primary" @click="saveEdit('editRuleForm')">确 定</el-button>
                </span>
        </el-dialog> -->





    </div>


</template>

<script>
    // import curd from "../../../../../assets/class/CURD.js";
    import { SaveProperty, FindPropertyCompanys } from "../../../../../api/api.js";

    export default {
        name: 'buiding_form',
        data(){
            return {
                formData: [
                    {
                        buiding: '1号楼',
                        address: '金科阳光小镇',
                        property: '金科物业',
                        state: '开启',
                    },{
                        buiding: '1',
                        address: '小区1',
                        property: '物业1',
                        state: '开启',
                    },
                ],
                // dialog 信息
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
                // 验证规则
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
                // 打开/关闭 dialog
                visible: false,
                //  删除
                delVisible: false,
                // 编辑
                editVisible: false,
                // 编辑获取数据
                edit_form: '',
                // 获取编辑索引
                idx: -1,
                // editRuleForm: '',
            }
        },
        mounted(){
            // this.editRuleForm = this.ruleForm

            // let params = {
            //     propertyName: '物业公司全称',
            //     isValid: 0,
            //     page: 1,
            // }


            // FindPropertyCompanys(params).then(data=>{
            //     console.log(data)
            // })
        },
        computed: {
            editRuleForm(){
                return this.ruleForm
            }
        },
        methods: {
    // 提交
            submit(formName){
                this.$refs[formName].validate((valid) => {
                  if (valid) {
                    let params = {
                            property: this.ruleForm.company.label,
                            address: this.ruleForm.district.label,
                            buiding: this.ruleForm.buidingNumber,
                            state: this.ruleForm.state[0].label,
                        };

                    // 接口    
                    SaveProperty(params).then(data=>{
                        if(data.statusCode === '000'){
                            this.$message({
                                type: 'success',
                                message: '添加成功!'
                            });
                        }else{
                            this.$message({
                                type: 'error',
                                message: data.statusMsg,
                            });
                        }
                    })

                    this.visible = false
                  } else {
                    this.$message({
                        type: 'error',
                        message: '请填写完整信息!'
                    });
                    return false;
                  }
                });
            },
            // 删除 弹出警告
            deleteRow(index, row){
                this.rowIndex = index
                this.delVisible = true
            },
            // 确定删除
            deleteFn(){
                this.formData.splice(this.rowIndex, 1)
                this.$message.success('删除成功');
                this.delVisible = false;
            },

            // 编辑
            handleEdit(index, row) {
                this.idx = index;
                // this.formData[index] = row
                this.editVisible = true;
                // 赋值

                


                // this.ruleForm.company.label = row.property
                // this.ruleForm.district.label = row.address
                // this.ruleForm.buidingNumber = row.buiding
                // this.ruleForm.state[0].label = row.state
            },
            // 保存编辑
            saveEdit(formName) {
                


                this.edit_form = {
                    property: this.ruleForm.company.label ,
                    address: this.ruleForm.district.label,
                    buiding: this.ruleForm.buidingNumber,
                    state: this.ruleForm.state[0].label,
                };
                // console.log(this.edit_form)
    
                this.$refs[formName].validate((valid) => {
                    if (valid) {
                        this.$set(this.formData, this.idx, this.edit_form);
                        this.editVisible = false;
                        this.$message.success(`修改第 ${this.idx+1} 行成功`);
                    }else{
                        console.log('error submit!!');
                        return false;
                    }
                })
                
            },












        // 重置 表单
           resetForm(formName) {
             this.$refs[formName].resetFields();
           },

            // 格式化
           formatter(row, column) {
                return row.address;
           },
           // 分页导航
           handleCurrentChange(val) {
                this.cur_page = val;
                this.getData();
           },
        }
    }
</script>
<style lang="stylus" scoped>
.pagination
    display flex;
    justify-content space-between 
    

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