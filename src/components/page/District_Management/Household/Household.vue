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
              <el-input 
                  v-model="search.name" 
                  placeholder="请输入小区名称"></el-input>
            </el-form-item>
            <el-form-item label="小区状态">
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
                    label="item" 
                    prop="name" 
                    width="180" 
                    align="center">
                </el-table-column>
                <el-table-column     
                    label="楼栋数量" 
                    prop="buildings" 
                    width="80" 
                    align="center">
                </el-table-column>
                <el-table-column     
                    label="所属物业" 
                    prop="propertyName" 
                    align="center">
                </el-table-column>
                <el-table-column     
                    label="联系人姓名" 
                    prop="contacts" 
                    width="120" 
                    align="center">
                </el-table-column>
                <el-table-column     
                    label="联系人手机" 
                    width="150" 
                    prop="phone" 
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
                    添加小区
                </el-button>
                    
                <el-pagination 
                    @current-change="handleCurrentChange" 
                    layout="prev, pager, next" 
                    :total="pages">
                </el-pagination>
            </div>
        </div>

       <!-- 添加 -->


    </div>
</template>

<script>
    
    import { SaveBuilding, FindBuilding, UpdateBuilding } from "../../../../api/api.js";
    
    export default {
        name: 'Household',
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
                    city_selected: { required: true, message: '请选择城市', trigger: 'blur' },
                    property_id: { required: true, message: '请选择物业公司', trigger: 'blur' },
                    name: { required: true, message: '请输入小区名称', trigger: 'blur' },
                    contacts: [
                      { required: true, message: '请输入联系人姓名', trigger: 'blur' },
                      { min: 2, message: '请输入正确的姓名', trigger: 'blur' },
                      { pattern: /^[\u4E00-\u9FA5]+$/, message: '用户名只能为中文', trigger: 'blur' },
                    ],
                    phone: [
                      { required: true, message: '请输入联系人电话', trigger: 'blur' },
                      {validator:function(rule,value,callback){
                          if(/^1[34578]\d{9}$/.test(value) == false){
                              callback(new Error("请输入正确的手机号"));
                          }else{
                              callback();
                          }
                      }, trigger: 'blur'},
                    ],
                },

            }
        },
        created(){
          // this.get_propertyName()
          // this.FindHousingestateApi()
        },
        computed: {
          pages(){
            return this.formData.length < 1 ? 1 : this.formData.length
          },
        },
        methods: {
          handleChange_updata(){
            console.log(1)
          },
          // 查询
          searchFn(){
            FindHousingestate(this.search).then(data=>{
              if(data.statusCode === '000'){
                this.formData = JSON.parse(data.body).list
                this.formData.map(x=>{
                  x.isValid ? x.isValid = '启用' : x.isValid = '禁用';
                })
              }
            })
          }, 
          // 获取楼栋信息
          FindBuildingApi(){
            FindBuilding().then(data=>{
              console.log(data)
            })
          },
          // 获取小区信息
          FindHousingestateApi(){
            FindHousingestate().then(data=>{
              console.log(data)
              if(data.statusCode === '000'){
                this.formData = JSON.parse(data.body).list
                this.formData.map(x=>{
                  x.isValid ? x.isValid = '启用' : x.isValid = '禁用';
                })
                
              }else{
                console.log(data)
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
            });
          },
          //翻页
          handleCurrentChange(){
            console.log('翻页')
          },
          // 添加提交
          submit_add(){
            this.$refs['ruleForm'].validate((valid) => {
                if (valid) {  
                    let propertyName = ''
                    this.company_option.forEach(item=>{
                      if(item.id == this.add_formData.property_id){
                         propertyName = item.propertyName
                      }
                    });
                    
                    let params = {
                          propertyId : this.add_formData.property_id,   //是 物业公司id
                          propertyName :  propertyName,  //是 物业公司名称
                          provincesId : this.city_selected[0],  //是 省份id
                          provincesName : this.city_name[0],  //是 省份名称
                          cityId : this.city_selected[1],   //是 城市id
                          cityName : this.city_name[1],   //是 城市名称
                          areasId : this.city_selected[2],  //是 区域id
                          areasName : this.city_name[2],  //是 区县名称
                          name : this.add_formData.name,  //是 小区名称
                          phone : this.add_formData.phone,  //是 联系电话
                          contacts : this.add_formData.contacts,   //是 联系人
                        };

                      SaveHousingestate(params).then(data=>{
                        console.log(data)
                        if(data.statusCode === '000'){
                          this.$message({
                              type: 'success',
                              message: '添加成功!'
                          });

                          this.FindHousingestateApi()
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
            console.log(item)
            let provincesId = item.provincesId + ''
            let cityId = item.cityId + ''
            let areasId = item.areasId + ''

            
            this.updata_form = {
              city_selected: [provincesId, cityId, areasId],
              property_id : item.propertyId,   //是 物业公司id
              propertyName :  item.propertyName,  //是 物业公司名称
              name : item.name,  //是 小区名称
              phone : item.phone,  //是 联系电话
              contacts : item.contacts,   //是 联系人
              city_name: [item.provincesName, item.cityName, item.areasName],
              id: item.id,
            };

            this.updata_visible = true
          },

          // 编辑提交
          save_add(){
            this.$refs['ruleForm'].validate((valid) => {
                  if (valid) {          
                    
                    let propertyName = ''
                    this.company_option.forEach(item=>{
                          if(item.id == this.updata_form.property_id){
                             propertyName = item.propertyName
                        };
                    });

                    let params = {

                        id :  this.updata_form.id,   //是 小区id
                        propertyId : this.updata_form.property_id,   //是 物业公司id
                        propertyName :  propertyName,  //是 物业公司名称
                        provincesId : this.updata_form.city_selected[0],  //是 省份id
                        provincesName : this.updata_form.city_name[0],  //是 省份名称 
                        cityId : this.updata_form.city_selected[1],   //是 城市id
                        cityName : this.updata_form.city_name[1],   //是 城市名称
                        areasId : this.updata_form.city_selected[2],  //是 区域id
                        areasName : this.updata_form.city_name[2],  //是 区县名称
                        name : this.updata_form.name,  //是 小区名称
                        phone : this.updata_form.phone,  //是 联系电话
                        contacts : this.updata_form.contacts,   //是 联系人
                    };

                    UpdateHousingestate(params).then(data=>{
                      console.log(data)
                      if(data.statusCode === '000'){
                        this.FindHousingestateApi()
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





