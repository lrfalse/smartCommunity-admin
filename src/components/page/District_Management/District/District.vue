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
                    label="小区名称" 
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
                         <!--  <el-button 
                              size="small" 
                              type="danger" 
                              @click="delete_dialog(scope.$index, scope.row)">删除</el-button> -->
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

    <el-dialog title="添加小区" :visible.sync="add_visible" width="40%">
        
         <el-form 
         :model="add_formData" 
         :rules="rules" 
         :inline="true"
         ref="ruleForm" 
         label-width="100px" 
         class="demo-ruleForm">
            <el-form-item 
                label="城市" 
                prop="city_selected">
                <el-cascader
                  :options="city_options"
                  v-model="add_formData.city_selected"
                  @change="handleChange">
                </el-cascader>


            </el-form-item>
            <el-form-item 
                label="小区名称" 
                prop="name">
                <el-input 
                    v-model="add_formData.name" 
                    placeholder="请输入小区名称">
                </el-input>
            </el-form-item>

            <el-form-item 
              label="所属物业" 
              prop="property_id">
                <el-select 
                    v-model="add_formData.property_id"  
                    placeholder="全部">
                  <el-option
                      v-for="item in company_option"
                      :key="item.id"
                      :label="item.propertyName"
                      :value="item.id">
                  </el-option>
                </el-select>
            </el-form-item>

            <el-form-item 
                label="联系人姓名" 
                prop="contacts">
                <el-input 
                    v-model="add_formData.contacts" 
                    placeholder="请输入联系人姓名">
                </el-input>
            </el-form-item>
            <el-form-item 
                label="联系人电话" 
                prop="phone">
                <el-input 
                    v-model="add_formData.phone" 
                    maxlength="11"
                    placeholder="请输入联系人电话">
                </el-input>
            </el-form-item>
            <el-form-item label="小区状态">
                <el-select 
                    v-model="add_formData.state"   
                    disabled 
                    placeholder="启用">
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
            <el-form-item 
                label="城市" 
                prop="city_selected">
                <el-cascader
                  :options="city_options"
                  v-model="updata_form.city_selected"
                  @change="handleChange_updata">
                </el-cascader>


            </el-form-item>
            <el-form-item 
                label="小区名称" 
                prop="name">
                <el-input 
                    v-model="updata_form.name" 
                    placeholder="请输入小区名称">
                </el-input>
            </el-form-item>

            <el-form-item 
              label="所属物业" 
              prop="property_id">
                <el-select 
                    v-model="updata_form.property_id"  
                    placeholder="全部">
                  <el-option
                      v-for="item in company_option"
                      :key="item.id"
                      :label="item.propertyName"
                      :value="item.id">
                  </el-option>
                </el-select>
            </el-form-item>

            <el-form-item 
                label="联系人姓名" 
                prop="contacts">
                <el-input 
                    v-model="updata_form.contacts" 
                    placeholder="请输入联系人姓名">
                </el-input>
            </el-form-item>
            <el-form-item 
                label="联系人电话" 
                prop="phone">
                <el-input 
                    v-model="updata_form.phone" 
                    maxlength="11"
                    placeholder="请输入联系人电话">
                </el-input>
            </el-form-item>
            <el-form-item label="小区状态">
                <el-select 
                    v-model="updata_form.state"   
                    disabled 
                    placeholder="启用">
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

    import { FindPropertyCompanys, 
      FindProvinces, 
      FindCitys, 
      SaveHousingestate, 
      FindAreas, 
      FindHousingestate, 
      UpdateHousingestate, } from "../../../../api/api.js";

    export default {
        name: 'District',
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
          this.get_propertyName()
          this.FindHousingestateApi()
        },
        mounted(){
          this.$nextTick(()=>{
            this.FindProvincesApi()
          })
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
          // 获取 省/市/区
          FindProvincesApi(){
            FindProvinces().then(data=>{
              let pro = JSON.parse(data.body).list
              pro.map((x, index)=>{
                this.$set(x, 'value', x.code)
                this.$set(x, 'label', x.name)
                this.$set(x, 'children', [])
                this.$set(x, 'index', index)

                FindCitys({provincesId: x.code}).then(data=>{
                  let city = JSON.parse(data.body).list
                    city.map((item, cityIndex)=>{
                    this.$set(item, 'value', item.code)
                    this.$set(item, 'label', item.name)
                    this.$set(item, 'children', [])
                    pro[index].children.push(item)

                    // console.log(item.code)
                    FindAreas({cityId:item.code}).then(data=>{
                      let area = JSON.parse(data.body).list
                      area.map(area=>{
                        this.$set(area, 'value', area.code)
                        this.$set(area, 'label', area.name)
                        pro[index].children[cityIndex].children.push(area)
                      })
                    })
                  })
                })

              });

              this.$nextTick(()=>{
                this.city_options = pro
             
              });
              
            })
          },
          
          // 选择城市
          handleChange(value){
            this.city_selected = value

            this.city_options.forEach((item, index)=>{
              if(item.code == value[0]){
                this.city_name.push(item.label)
              };
              item.children.forEach((cityName, cityIndex)=>{
                if(cityName.code == value[1]){
                  this.city_name.push(cityName.label)
                };   
                cityName.children.forEach((area, areaIndex)=>{
                  if(area.code == value[2]){
                    this.city_name.push(area.label) 

                    console.log(this.city_name)
                  };
                  
                })

              })
            });
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





