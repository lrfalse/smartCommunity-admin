<template>
    <div class="Page">
       <div class="search container">
           <el-form 
              :inline="true" 
              :model="search" 
              class="demo-form-inline">
            <el-form-item label="公司名称">
              <el-input 
                  v-model="search.user" 
                  placeholder="请输入用户账号"></el-input>
            </el-form-item>
           
            
              <el-form-item label="公司状态">
                  <el-select 
                      v-model="state_option.value"   
                      
                      placeholder="全部">
                    <el-option
                        v-for="item in state_option"
                        :key="item.value"
                        :label="item.label"
                        :value="item.value">
                    </el-option>
                  </el-select>
              </el-form-item>

            <el-form-item class="button">
              <el-button type="primary">查询</el-button>
              <el-button type="primary">重置</el-button>
            </el-form-item>

          </el-form>
       </div>


           <div class="container">
              <el-table 
                  :data="formData" 
                  border 
                  style="width: 100%" 
                  ref="multipleTable">
                  <el-table-column     
                      label="公司全称" 
                      prop="propertyName" 
                      align="center">
                  </el-table-column>
                  <el-table-column     
                      label="公司简称" 
                      prop="propertyshortName" 
                      width="240" 
                      align="center">
                  </el-table-column>
                  <el-table-column     
                      label="联系人姓名" 
                      prop="name" 
                      width="150" 
                      align="center">
                  </el-table-column>
                  <el-table-column     
                      label="联系人电话" 
                      prop="phone" 
                      width="150" 
                      align="center">
                  </el-table-column>
                  <el-table-column     
                      label="公司状态" 
                      prop="isValid" 
                      width="80" 
                      align="center">
                  </el-table-column>
                  <el-table-column 
                      label="操作" 
                      width="180" 
                      align="center">
                      <template slot-scope="scope">
                          <el-button 
                              size="small" 
                              @click="edit_dialog(scope.$index, scope.row)">编辑</el-button>
                          <el-button 
                              size="small" 
                              type="danger" 
                              @click="delete_dialog(scope.$index, scope.row)">删除</el-button>
                      </template>
                  </el-table-column>
              </el-table>
              <div class="pagination">
                  <el-button 
                      type="primary" 
                      @click="add_visible = true">    
                      添加用户
                  </el-button>
                  <el-pagination 
                      @current-change="handleCurrentChange" 
                      layout="prev, pager, next" 
                      :total="pages">
                  </el-pagination>
              </div>
        
       </div>

       <!-- 添加 -->

    <el-dialog title="添加用户" :visible.sync="add_visible" width="40%">
        
         <el-form 
           :model="add_formData" 
           :rules="rules" 
           :inline="true"
           ref="ruleForm" 
           label-width="100px" 
           class="demo-ruleForm">
              <el-form-item 
                  label="公司全称" 
                  prop="propertyName">
                  <el-input 
                      v-model="add_formData.propertyName" 
                      placeholder="请输入公司全称">
                  </el-input>
              </el-form-item>
              <el-form-item 
                  label="公司简称" 
                  prop="propertyshortName">
                  <el-input 
                      v-model="add_formData.propertyshortName" 
                      placeholder="请输入公司简称">
                  </el-input>
              </el-form-item>
              <el-form-item 
                  label="联系人姓名" 
                  prop="name">
                  <el-input 
                      v-model="add_formData.name" 
                      placeholder="请输入联系人姓名">
                  </el-input>
              </el-form-item>
              <el-form-item 
                  label="联系人电话" 
                  prop="phone">
                  <el-input 
                      v-model="add_formData.phone" 
                      placeholder="请输入联系人电话">
                  </el-input>
              </el-form-item>
              <el-form-item label="小区状态">
                  <el-select 
                      v-model="state_option[1].label"  
                      disabled 
                      no-data-text="启用"
                      placeholder="全部">
                    <el-option
                        v-for="item in state_option"
                        :key="item.value"
                        :label="item.label"
                        :value="item.value">
                    </el-option>
                  </el-select>
              </el-form-item>

              
              <!-- 添加角色 submit -->
              <div class="submit">
                  <el-button 
                      type="primary" 
                      @click="submit_add('ruleForm')">    
                      添加
                  </el-button>
                  <el-button 
                      type="primary" 
                      @click="add_visible = false">    
                      关闭
                  </el-button>
              </div>

          </el-form>

      </el-dialog>


      <!-- 删除提示框 -->
        <el-dialog title="删除" :visible.sync="del_visible" width="450px" center>
            <div class="del-dialog-cnt">删除不可恢复，是否确定删除？</div>
            <span slot="footer" class="dialog-footer">
                <el-button @click="del_visible = false">取 消</el-button>
                <el-button type="primary" @click="deletions">确 定</el-button>
            </span>
        </el-dialog>


  <!-- 编辑 -->

    <el-dialog title="添加用户" :visible.sync="updata_visible" width="40%">
        
         <el-form 
           :model="updata_form" 
           :rules="rules" 
           :inline="true"
           ref="ruleForm" 
           label-width="100px" 
           class="demo-ruleForm">
              <el-form-item 
                  label="公司全称" 
                  prop="propertyName">
                  <el-input 
                      v-model="updata_form.propertyName" 
                      placeholder="请输入公司全称">
                  </el-input>
              </el-form-item>
              <el-form-item 
                  label="公司简称" 
                  prop="propertyshortName">
                  <el-input 
                      v-model="updata_form.propertyshortName" 
                      placeholder="请输入公司简称">
                  </el-input>
              </el-form-item>
              <el-form-item 
                  label="联系人姓名" 
                  prop="name">
                  <el-input 
                      v-model="updata_form.name" 
                      placeholder="请输入联系人姓名">
                  </el-input>
              </el-form-item>
              <el-form-item 
                  label="联系人电话" 
                  prop="phone">
                  <el-input 
                      v-model="updata_form.phone" 
                      placeholder="请输入联系人电话">
                  </el-input>
              </el-form-item>
              <el-form-item label="小区状态">
                  <el-select 
                      v-model="state_option[1].label"  
                      disabled 
                      no-data-text="启用"
                      placeholder="全部">
                    <el-option
                        v-for="item in state_option"
                        :key="item.value"
                        :label="item.label"
                        :value="item.value">
                    </el-option>
                  </el-select>
              </el-form-item>   

              <!-- 编辑 submit -->
              <div class="submit">
                  <el-button 
                      type="primary" 
                      @click="save_add('ruleForm')">    
                      保存
                  </el-button>
                  <el-button 
                      type="primary" 
                      @click="updata_visible = false">    
                      关闭
                  </el-button>
              </div>

            </el-form>
          </el-dialog>






    </div>
</template>

<script>
   
    // import {FindProvinces, FindCitys, FindAreas} from "../../../../api/api.js";

    export default {
        name: 'Estate',
        data(){
            return {
                search: {},
                // 表单栏
                formData: [],
                // 状态选择  
                state_option: [
                  {
                    label: '禁用',
                    value: 0,
                    
                  },{
                    label: '启用',
                    value: 1,
                  },
                ],

                // 添加
                add_formData: {},
                add_state: '启用',
                add_visible: false,

                // 删除
                del_visible : false,
                // 编辑
                updata_form: {},
                updata_visible: false,
                updata_item: {},
                // 单行索引
                rowIndex: -1,

                // 验证规则
                rules: {
                    propertyName: { required: true, message: '请输入公司全称', trigger: 'blur' },
                    propertyshortName: { required: true, message: '请输入公司简称', trigger: 'blur' },
                    name: { required: true, message: '请输入联系人姓名', trigger: 'blur' },
                    phone: { required: true, message: '请输入联系人电话', trigger: 'blur' },
                },
            }
        },
        created(){
          
        },
        computed: {
          pages(){
            return this.formData.length < 1 ? 1 : this.formData.length
          },
        },
        methods: {
          //翻页
          handleCurrentChange(){
            console.log('翻页')
          },
          // 添加提交
          submit_add(){
            this.$refs['ruleForm'].validate((valid) => {
                if (valid) {  

                      this.$set(this.add_formData, 'isValid', 1)
                      console.log(this.add_formData.isValid)
                      
                      this.formData.push(this.add_formData)


                      for(let i = 0; i < this.formData.length; i++){
                        this.formData[i].isValid == 0? 
                        this.formData[i].isValid = '禁用' : 
                        this.formData[i].isValid = '启用'
                      }

                      this.$message({
                          type: 'success',
                          message: '添加成功!'
                      });

                } else {
                      this.$message({
                          type: 'error',
                          message: '请填写完整信息!'
                      });
                  
                      return false;
                };
  
                this.add_visible = false
                
                this.add_formData = {}
              })
          },

          // 弹出删除框
          delete_dialog(index, row){
            this.rowIndex = index
            this.del_visible = true

          },

          //  确定删除
          deletions(){
            this.formData.splice(this.rowIndex, 1)
            this.$message.success('删除成功');
            this.del_visible = false;
          },
          
          // 编辑
          edit_dialog(index, row){
            this.rowIndex = index
            console.log(row)
            this.updata_form = {
              propertyName: row.propertyName,
              propertyshortName: row.propertyshortName,
              name: row.name,
              phone: row.phone,
              isValid: row.isValid,
            };
            this.updata_visible = true
          },

          // 编辑提交
          save_add(){
            this.$refs['ruleForm'].validate((valid) => {
                  if (valid) {          

                    this.$set(this.formData, this.rowIndex, this.updata_form)

                     this.$message({
                        type: 'success',
                        message: '修改成功!'
                    });
                    
                  } else {
                    this.$message({
                        type: 'error',
                        message: '请填写完整信息!'
                    });
                    
                    return false;
                  };

                  this.updata_visible = false
                });
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





