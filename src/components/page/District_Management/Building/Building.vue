<template>
    <div class="Page">
       <div class="search container">
           <el-form 
            :inline="true" 
            :model="search" 
            class="demo-form-inline">
         
            <el-form-item label="物业公司">
                <el-select 
                    v-model="search.propertyId"   
                    placeholder="全部">
                  <el-option
                      v-for="item in company_option"
                      :key="item.id"
                      :label="item.propertyName"
                      :value="item.id">
                  </el-option>
                </el-select>
            </el-form-item>

            <el-form-item label="小区名称">
                <el-select 
                    v-model="search.housingEstateId"   
                    placeholder="全部">
                  <el-option
                      v-for="item in district_option"
                      :key="item.housingEstateId"
                      :label="item.housingEstateName"
                      :value="item.housingEstateId">
                  </el-option>
                </el-select>
            </el-form-item>

            <el-form-item label="楼栋状态">
                <el-select 
                    v-model="state_option[1].value"   
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

            

          <el-form-item class="button">
            <el-button type="primary" @click="searchFn">查询</el-button>
            <el-button type="primary" @click="resetForm">重置</el-button>
          </el-form-item>
        </el-form>
       </div>

       <!-- 表单 -->

           <div class="container">
            <el-table 
                :data="formData" 
                border 
                style="width: 100%" 
                ref="multipleTable">
                <el-table-column     
                    label="楼栋" 
                    prop="name" 
                    width="120" 
                    align="center">
                </el-table-column>
                <el-table-column     
                    label="所属小区" 
                    prop="housingEstateName" 
                    width="320" 
                    align="center">
                </el-table-column>
                <el-table-column     
                    label="所属物业" 
                    prop="propertyName" 
                    align="center">
                </el-table-column>
                
                <el-table-column     
                    label="小区状态" 
                    prop="isValid" 
                    width="80" 
                    align="center">
                </el-table-column>
                <el-table-column 
                      label="操作" 
                      width="80" 
                      align="center">
                      <template slot-scope="scope">
                          <el-button 
                              size="small" 
                              type="primary"
                              @click="edit_dialog(scope.$index, scope.row)">编辑</el-button>
                          <!-- <el-button 
                              size="small" 
                              type="success" 
                              @click="del_dialog(scope.$index, scope.row)">删除</el-button> -->
                      </template>
                  </el-table-column>
            </el-table>


            <div class="pagination">
                <el-button 
                    type="primary" 
                    @click="add_visible = true">    
                    添加楼栋
                </el-button>
                    
                <el-pagination 
                    @current-change="handleCurrentChange" 
                    layout="prev, pager, next" 
                    :total="pages">
                </el-pagination>
            </div>
        </div>

       <!-- 添加 -->

    <el-dialog title="添加楼栋" :visible.sync="add_visible" width="40%">
        
         <el-form 
         :model="add_formData" 
         :rules="rules" 
         :inline="true"
         ref="ruleForm" 
         label-width="100px" 
         class="demo-ruleForm">
            <el-form-item label="物业公司" prop="property_id">
                <el-select 
                    v-model="add_formData.property_id"   
                    @change="estate_changed"     
                    placeholder="全部">
                  <el-option
                      v-for="item in company_option"
                      :key="item.id"
                      :label="item.propertyName"
                      :value="item.id">
                  </el-option>
                </el-select>
            </el-form-item>

            <el-form-item label="小区名称" prop="housingEstateId">
                <el-select 
                    v-model="add_formData.housingEstateId"   
                    @change="district_changed" 
                    placeholder="全部">
                  <el-option
                      v-for="item in district_option"
                      :key="item.housingEstateId"
                      :label="item.housingEstateName"
                      :value="item.housingEstateId">
                  </el-option>
                </el-select>
            </el-form-item>

            <el-form-item 
                label="楼栋名称" 
                prop="name">
                <el-input 
                    v-model="add_formData.name" 
                    placeholder="请输入楼栋名称">
                </el-input>
            </el-form-item>

            <el-form-item label="楼栋状态">
                <el-select 
                    v-model="state_option[1].value"   
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
            
            <!-- 添加 submit -->
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

    <el-dialog title="添加小区" :visible.sync="updata_visible" width="40%">
        
         <el-form 
         :model="updata_form" 
         :rules="rules" 
         :inline="true"
         ref="ruleForm" 
         label-width="100px" 
         class="demo-ruleForm">

          <el-form-item label="物业公司" prop="property_id">
                <el-select 
                    v-model="updata_form.property_id"   
                    @change="estate_changed"     
                    placeholder="全部">
                  <el-option
                      v-for="item in company_option"
                      :key="item.id"
                      :label="item.propertyName"
                      :value="item.id">
                  </el-option>
                </el-select>
            </el-form-item>

            <el-form-item label="小区名称" prop="housingEstateId">
                <el-select 
                    v-model="updata_form.housingEstateId"   
                    @change="district_changed" 
                    placeholder="全部">
                  <el-option
                      v-for="item in district_option"
                      :key="item.housingEstateId"
                      :label="item.housingEstateName"
                      :value="item.housingEstateId">
                  </el-option>
                </el-select>
            </el-form-item>

            <el-form-item 
                label="楼栋名称" 
                prop="name">
                <el-input 
                    v-model="updata_form.name" 
                    placeholder="请输入楼栋名称">
                </el-input>
            </el-form-item>

            <el-form-item label="楼栋状态">
                <el-select 
                    v-model="state_option[1].value"   
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
           
            <!-- 添加 submit -->
            <div class="submit">
                <el-button 
                    type="primary" 
                    @click="save_add('ruleForm')">    
                    修改
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

    import { SaveBuilding, 
              FindBuilding, 
              UpdateBuilding, 
              FindPropertyCompanys, 
              FindHousingestate } from "../../../../api/api.js";
    
    export default {
        name: 'Building',
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
                // 物业
                company_option: [],
                propertyName: '',
                // 小区
                district_option: [],
                district_name: '',
                // 城市
                city_options: [],
                city_selected: [],
                city_name: [],
                sss: {
                  label:1,
                  label:2,
                },
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
                    property_id: { required: true, message: '请选择物业公司', trigger: 'change' },
                    housingEstateId: { required: true, message: '请输入小区名称', trigger: 'change' },
                    name: { required: true, message: '请输入楼栋名称', trigger: 'blur' },
                },

            }
        },
        created(){
          this.get_propertyName() // 获取物业
          this.FindHousingestateApi()  //获取小区
          this.FindBuildingApi() // 获取楼栋
        },
        computed: {
          pages(){
            return this.formData.length < 1 ? 100 : this.formData.length
          },
        },
        methods: {
          // 获取小区名
          district_changed(val){
            this.district_option.forEach(x=>{
              if(x.housingEstateId == val){
                this.district_name = x.housingEstateName
                console.log(this.district_name)
              };
              
            })

          },
          // 获取物业公司名
          estate_changed(val){
            console.log(val)
            this.company_option.forEach(x=>{
              if(x.id == val){
                this.propertyName = x.propertyName
                console.log(this.propertyName)
              };

            })
          },
          handleChange_updata(){
            console.log(1)
          },
          // 查询
          searchFn(){
            console.log(this.search)
            this.FindBuildingApi(this.search)

          }, 
          // 获取楼栋信息
          FindBuildingApi(params){
            FindBuilding(params).then(data=>{
              // console.log(data)
              if(data.statusCode === '000'){
                 this.formData = JSON.parse(data.body).list
                 console.log(this.formData)
              }else{
                this.$message({
                    type: 'error',
                    message: data.statusMsg,
                });
              }
            })
          },
          // 获取小区信息
          FindHousingestateApi(){
            FindHousingestate().then(data=>{
              let map = new Map()
              let params = [];
              if(data.statusCode === '000'){
                params = JSON.parse(data.body).list
                params.forEach((item, index)=>{
                  map.set(index, {
                    'housingEstateId': item.id,
                    'housingEstateName': item.name,
                  });
                })

                for(let i of map.values()){
                  this.district_option.push(i)
                };

                console.log(this.district_option)
                
              }else{
                this.$message({
                    type: 'error',
                    message: data.statusMsg,
                });
              }
              
            })
          },

          // 获取 物业公司
          get_propertyName(){
            let params = {
              rows: 999,
              page: 1,
            };
            FindPropertyCompanys(params).then(data=>{
              let obj = JSON.parse(data.body).list
              let map = new Map()
              obj.map((x, index)=>{
                map.set(index, {
                  'id': x.id,
                  'propertyName': x.propertyName,
                });

              });
              for(let i of map.values()){
                this.company_option.push(i)
              };
              console.log(this.company_option)
            });
          },
          //翻页
          handleCurrentChange(value){
            console.log(value)
          },
          // 添加提交
          submit_add(){
            this.$refs['ruleForm'].validate((valid) => {
                if (valid) {               
                    let params = {
                         propertyId:  this.add_formData.property_id,  //是 物业公司id
                         propertyName: this.propertyName,    //是 物业公司名称
                         housingEstateId: this.add_formData.housingEstateId,   //是 小区id
                         housingEstateName: this.district_name,   //是 小区名称
                         name: this.add_formData.name,    //是 楼栋名称
                        };

                      SaveBuilding(params).then(data=>{
                        console.log(data)
                        if(data.statusCode === '000'){
                          this.$message({
                              type: 'success',
                              message: '添加成功!'
                          });

                          this.FindBuildingApi()
                        }else{
                          this.$message({
                              type: 'error',
                              message: data.statusMsg,
                          });
                        }
                      })
      

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
          
          // 编辑z
          edit_dialog(index, row){
            this.rowIndex = index
            const item = this.formData[index]

            this.updata_form = {
              property_id : item.propertyId,   //是 物业公司id
              propertyName :  item.propertyName,  //是 物业公司名称
              housingEstateId : item.housingEstateId,  //是 小区名称
              name: item.name, //楼栋名称
              id: item.id,
            };


            this.updata_visible = true
          },

          // 编辑提交
          save_add(){
            this.$refs['ruleForm'].validate((valid) => {
                  if (valid) {          
                    

                    UpdateBuilding(this.updata_form).then(data=>{
                      console.log(data)
                      if(data.statusCode === '000'){
                        this.FindBuildingApi()
                        this.$message({
                            type: 'success',
                            message: '修改成功!'
                        });
                      }else{
                        this.$message({
                            type: 'error',
                            message: data.statusMsg,
                        });
                      }
                    })    
                    
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

          // 重置
          resetForm(){
             this.search = {}
             this.FindBuildingApi()
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





