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
                    @change="get_pro"
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
              label="所属小区" 
              prop="housingEstateId">
                <el-select 
                    v-model="search.housingEstateId" 
                    @change="get_buiding" 
                    placeholder="请选择小区">
                  <el-option
                      v-for="item in district_option"
                      :key="item.id"
                      :label="item.districtName"
                      :value="item.id">
                  </el-option>
                </el-select>
            </el-form-item>


            <el-form-item label="楼栋">
                <el-select 
                    v-model="search.value"   
                    placeholder="全部">
                  <el-option
                      v-for="item in building_option"
                      :key="item.id"
                      :label="item.buildName"
                      :value="item.id">
                  </el-option>
                </el-select>
            </el-form-item>

            <el-form-item label="门牌号">
              <el-input 
                  v-model="search.number" 
                  placeholder="请输入小区名称"></el-input>
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
                @expand-change="getRowClass"
                ref="multipleTable">
                <el-table-column type="expand" width="50">
                  <template slot-scope="props">
                    <el-table 
                      :data="props.row.sub"
                      border
                      style="width: 100%"
                    >
                            <el-table-column     
                                label="姓名" 
                                prop="name" 
                                align="center">
                            </el-table-column>
                            <el-table-column     
                                label="电话" 
                                prop="phone" 
                                align="center">
                            </el-table-column>
                            <el-table-column     
                                label="身份" 
                                prop="relationship" 
                                :formatter="formatterRelationship"
                                align="center">
                            </el-table-column>
                            <el-table-column     
                                label="性别" 
                                prop="sex" 
                                :formatter="formatterSex"
                                align="center">
                            </el-table-column>
                            <el-table-column     
                                label="年龄" 
                                prop="age" 
                                align="center">
                            </el-table-column>
                            <el-table-column     
                                label="人脸识别" 
                                prop="isFaceRecognition" 
                                :formatter="formatterFace"
                                align="center">
                            </el-table-column>
                            <el-table-column     
                                label="操作" 
                                width="80"
                                align="center">
                                <template slot-scope="scope">
                                    <el-button 
                                        size="small" 
                                        type="success"
                                        @click="edit_user_dialog(scope.$index, scope.row)">编辑</el-button>
                                </template>   
                            </el-table-column>
                      
                    </el-table>
                  </template>
                </el-table-column>
                <el-table-column     
                    label="房号" 
                    prop="name" 
                    width="120" 
                    align="center">
                </el-table-column>
                <el-table-column     
                    label="住户人数" 
                    prop="members" 
                    width="80" 
                    align="center">
                </el-table-column>
                <el-table-column     
                    label="登记人脸数" 
                    prop="faces" 
                    width="90" 
                    align="center">
                </el-table-column>
                <el-table-column     
                    label="所属楼栋" 
                    prop="buildName" 
                    width="120" 
                    align="center">
                </el-table-column>

                <el-table-column     
                    label="所属小区" 
                    width="180" 
                    prop="housingEstateName" 
                    align="center">
                </el-table-column>

                <el-table-column     
                    label="所属物业" 
                    prop="propertyName" 
                    align="center">
                </el-table-column>
                <el-table-column     
                    label="楼栋状态" 
                    prop="isValid" 
                    width="80" 
                    :formatter="formatState"
                    align="center">
                </el-table-column>
                <el-table-column 
                      label="操作" 
                      width="180" 
                      align="center">
                      <template slot-scope="scope">
                          <el-button 
                              size="small" 
                              type="primary"
                              @click="edit_dialog(scope.$index, scope.row)">编辑</el-button>
                          <el-button 
                              size="small" 
                              type="success" 
                              @click="add_user(scope.$index, scope.row)">添加住户</el-button>
                      </template>
                  </el-table-column>
            </el-table>


            <div class="pagination">
                <el-button 
                    type="primary" 
                    @click="add_visible = true">    
                    添加房号
                </el-button>
                    
                <el-pagination 
                    @current-change="handleCurrentChange" 
                    layout="prev, pager, next" 
                    :total="pages">
                </el-pagination>
            </div>
        </div>

       <!-- 添加房号 -->
        <el-dialog title="添加房号" :visible.sync="add_visible" width="50%">
        
         <el-form 
           :model="add_formData" 
           :rules="rulesRoom" 
           :inline="true"
           ref="ruleForm" 
           label-width="100px" 
           class="demo-ruleForm">

              <el-form-item 
                label="所属物业" 
                prop="property_id">
                  <el-select 
                      v-model="add_formData.property_id"  
                      @change="get_pro"
                      placeholder="请选择物业">
                    <el-option
                        v-for="item in company_option"
                        :key="item.id"
                        :label="item.propertyName"
                        :value="item.id">
                    </el-option>
                  </el-select>
              </el-form-item>


              <el-form-item 
                label="所属小区" 
                prop="housingEstateId">
                  <el-select 
                      v-model="add_formData.housingEstateId" 
                      @change="get_buiding" 
                      placeholder="请选择小区">
                    <el-option
                        v-for="item in district_option"
                        :key="item.id"
                        :label="item.districtName"
                        :value="item.id">
                    </el-option>
                  </el-select>
              </el-form-item>

              <el-form-item 
                label="所属楼栋" 
                prop="buildingId">
                  <el-select 
                      v-model="add_formData.id" 
                      @change="get_room"
                      placeholder="请选择楼栋">
                    <el-option
                        v-for="item in building_option"
                        :key="item.id"
                        :label="item.buildName"
                        :value="item.id">
                    </el-option>
                  </el-select>
              </el-form-item>
              



              <el-form-item 
                  label="房号" 
                  prop="name">
                  <el-input 
                      v-model="add_formData.name" 
                      placeholder="请输入房号">
                  </el-input>
              </el-form-item>

              <el-form-item 
                  label="建筑面积" 
                  prop="coveredArea">
                  <el-input 
                      v-model="add_formData.coveredArea" 
                      placeholder="请输入建筑面积">
                  </el-input>
              </el-form-item>

              <el-form-item 
                  label="使用面积" 
                  prop="usableArea">
                  <el-input 
                      v-model="add_formData.usableArea" 
                      placeholder="请输入使用面积">
                  </el-input>
              </el-form-item>

              <el-form-item 
                  label="当前单价" 
                  prop="unitPrice">
                  <el-input 
                      v-model="add_formData.unitPrice" 
                      placeholder="请输入当前单价">
                  </el-input>
              </el-form-item>

              <el-form-item 
                  label="当前总价" 
                  prop="allPrice">
                  <el-input 
                      v-model="add_formData.allPrice" 
                      placeholder="请输入当前总价">
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
        <!-- 添加住户 -->
         <el-dialog title="添加住户" :visible.sync="add_user_visible" width="40%">
        
         <el-form 
           :model="add_member_form" 
           :rules="rules_member" 
           :inline="true"
           ref="ruleForm" 
           label-width="100px" 
           class="demo-ruleForm">

              <el-form-item 
                  label="姓名" 
                  prop="name">
                  <el-input 
                      v-model="add_member_form.name" 
                      maxlength="8"
                      placeholder="请输入姓名">
                  </el-input>
              </el-form-item>

              <el-form-item 
                  label="电话" 
                  prop="phone">
                  <el-input 
                      v-model="add_member_form.phone" 
                      maxlength="11"
                      placeholder="请输入电话">
                  </el-input>
              </el-form-item>

              <el-form-item 
                label="身份选择" 
                prop="relationship">
                  <el-select 
                      v-model="add_member_form.relationship"  
                      placeholder="请选择身份">
                    <el-option
                        v-for="item in relationship_option"
                        :key="item.value"
                        :label="item.label"
                        :value="item.value">
                    </el-option>
                  </el-select>
              </el-form-item>

              <el-form-item 
                label="性别" 
                prop="sex">
                  <el-select 
                      v-model="add_member_form.sex"  
                      placeholder="请选择性别">
                    <el-option
                        v-for="item in sex_option"
                        :key="item.value"
                        :label="item.label"
                        :value="item.value">
                    </el-option>
                  </el-select>
              </el-form-item>

              <el-form-item 
                  label="年龄" 
                  prop="age">
                  <el-input 
                      v-model="add_member_form.age" 
                      maxlength="3"
                      placeholder="请输入年龄">
                  </el-input>
              </el-form-item>

              <el-form-item label="是否有效">
                  <el-select 
                      v-model="add_member_form.state"   
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
                      @click="SaveMemberApi('ruleForm')">    
                      添加
                  </el-button>
                  <el-button 
                      type="primary" 
                      @click="add_user_visible = false">    
                      关闭
                  </el-button>
              </div>

          </el-form>

        </el-dialog>

        <!-- 编辑 -->


      <el-dialog title="修改房号" :visible.sync="updata_visible" width="50%">
        
         <el-form 
           :model="updata_form" 
           :rules="rulesRoom" 
           :inline="true"
           ref="ruleForm" 
           label-width="100px" 
           class="demo-ruleForm">

              <el-form-item 
                label="所属物业" 
                prop="property_id">
                  <el-select 
                      v-model="updata_form.property_id"  
                      @change="get_pro"
                      placeholder="请选择物业">
                    <el-option
                        v-for="item in company_option"
                        :key="item.id"
                        :label="item.propertyName"
                        :value="item.id">
                    </el-option>
                  </el-select>
              </el-form-item>


              <el-form-item 
                label="所属小区" 
                prop="housingEstateId">
                  <el-select 
                      v-model="updata_form.housingEstateId" 
                      @change="get_buiding" 
                      placeholder="请选择小区">
                    <el-option
                        v-for="item in district_option"
                        :key="item.id"
                        :label="item.districtName"
                        :value="item.id">
                    </el-option>
                  </el-select>
              </el-form-item>

              <el-form-item 
                label="所属楼栋" 
                prop="buildingId">
                  <el-select 
                      v-model="updata_form.buildingId"  
                      placeholder="请选择楼栋">
                    <el-option
                        v-for="item in building_option"
                        :key="item.id"
                        :label="item.buildName"
                        :value="item.id">
                    </el-option>
                  </el-select>
              </el-form-item>
              



              <el-form-item 
                  label="房号" 
                  prop="name">
                  <el-input 
                      v-model="updata_form.name" 
                      placeholder="请输入房号">
                  </el-input>
              </el-form-item>

              <el-form-item 
                  label="建筑面积" 
                  prop="coveredArea">
                  <el-input 
                      v-model="updata_form.coveredArea" 
                      placeholder="请输入建筑面积">
                  </el-input>
              </el-form-item>

              <el-form-item 
                  label="使用面积" 
                  prop="usableArea">
                  <el-input 
                      v-model="updata_form.usableArea" 
                      placeholder="请输入使用面积">
                  </el-input>
              </el-form-item>

              <el-form-item 
                  label="当前单价" 
                  prop="unitPrice">
                  <el-input 
                      v-model="updata_form.unitPrice" 
                      placeholder="请输入当前单价">
                  </el-input>
              </el-form-item>

              <el-form-item 
                  label="当前总价" 
                  prop="allPrice">
                  <el-input 
                      v-model="updata_form.allPrice" 
                      placeholder="请输入当前总价">
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

         <!-- 编辑住户 -->
         <el-dialog title="编辑住户" :visible.sync="updata_user_visible" width="40%">
        
         <el-form 
           :model="updata_member_form" 
           :rules="rules_member" 
           :inline="true"
           ref="ruleForm" 
           label-width="100px" 
           class="demo-ruleForm">

              <el-form-item 
                  label="姓名" 
                  prop="name">
                  <el-input 
                      v-model="updata_member_form.name" 
                      maxlength="8"
                      placeholder="请输入姓名">
                  </el-input>
              </el-form-item>

              <el-form-item 
                  label="电话" 
                  prop="phone">
                  <el-input 
                      v-model="updata_member_form.phone" 
                      maxlength="11"
                      placeholder="请输入电话">
                  </el-input>
              </el-form-item>

              <el-form-item 
                label="身份选择" 
                prop="relationship">
                  <el-select 
                      v-model="updata_member_form.relationship"  
                      placeholder="请选择身份">
                    <el-option
                        v-for="item in relationship_option"
                        :key="item.value"
                        :label="item.label"
                        :value="item.value">
                    </el-option>
                  </el-select>
              </el-form-item>

              <el-form-item 
                label="性别" 
                prop="sex">
                  <el-select 
                      v-model="updata_member_form.sex"  
                      placeholder="请选择性别">
                    <el-option
                        v-for="item in sex_option"
                        :key="item.value"
                        :label="item.label"
                        :value="item.value">
                    </el-option>
                  </el-select>
              </el-form-item>

              <el-form-item 
                  label="年龄" 
                  prop="age">
                  <el-input 
                      v-model="updata_member_form.age" 
                      maxlength="3"
                      placeholder="请输入年龄">
                  </el-input>
              </el-form-item>

              <el-form-item label="是否有效">
                  <el-select 
                      v-model="updata_member_form.isValid"   
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
                      @click="UpdateMemberApi('ruleForm')">    
                      保存
                  </el-button>
                  <el-button 
                      type="primary" 
                      @click="updata_user_visible = false">    
                      关闭
                  </el-button>
              </div>

          </el-form>

        </el-dialog>
    </div>
</template>

<script>
    
    import { 
        SaveBuilding, 
        FindBuilding, 
        UpdateBuilding, 
        FindRoom, 
        SaveRoom, 
        FindPropertyCompanys, 
        FindHousingestate, 
        UpdateRoom, 
        FindMember,
        SaveMember,
        UpdateMember
         } from "../../../../api/api.js";
    
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
                    label: '有效',
                    value: 0,
                    
                  },{
                    label: '无效',
                    value: 1,
                  },
                ],
                // 物业
                company_option: [],
                propertyName: '',
                // 小区
                district_option: [],
                districtName: '',
                // 楼栋
                building_option: [],
                buildingName: '',

                // 添加
                add_formData: {},
                add_state: '启用',
                add_visible: false,
                // 添加住户
                add_user_visible: false,
                sex_option: [
                  {
                    label: '男',
                    value: 1,
                  },
                  {
                    label: '女',
                    value: 2,
                  },
                ],
                relationship_option: [
                  {
                    label: '业主',
                    value: 1, 
                  },{
                    label: '家庭成员',
                    value: 2, 
                  },{
                    label: '租客',
                    value: 3, 
                  },
                ],
                add_member_form: {},

                // 修改用户
                updata_user_visible: false,
                updata_member_form: {},
                
                rowSub: [],
                // 删除
                del_visible : false,
                // 编辑
                updata_form: {},
                updata_visible: false,
                updata_item: {},
                // 单行索引
                rowIndex: -1,
                
                


                // 验证规则
                rules_member: {
                    name: [
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
                    sex: { required: true, message: '请选择性别', trigger: 'blur' },
                    relationship: { required: true, message: '请选择身份', trigger: 'blur' },

                },
                rulesRoom: {
                    allPrice: { required: true, message: '请输入总价', trigger: 'blur' },
                    unitPrice: { required: true, message: '请输入单价', trigger: 'blur' },
                    usableArea: { required: true, message: '请输入使用面积', trigger: 'blur' },
                    coveredArea: { required: true, message: '请输入建筑面积', trigger: 'blur' },
                    name: { required: true, message: '请输入房号', trigger: 'blur' },
                    property_id: { required: true, message: '请选择物业公司', trigger: 'blur' },
                    housingEstateId: { required: true, message: '请选择小区', trigger: 'blur' },
                    buildingId: { required: true, message: '请选择楼栋', trigger: 'blur' },
                },

            }
        },
        created(){
          this.get_propertyName()     
          this.FindRoomApi()
        },
        computed: {
          pages(){
            return this.formData.length < 1 ? 1 : this.formData.length
          },
        },
        methods: {

          // 获取小区值
          get_pro(val){
            this.FindHousingestateApi(val);
            this.building_option = [];
            this.add_formData.housingEstateId = '';
  
          },
          //获取楼栋值
          get_buiding(val){
            this.FindBuildingApi(val)
          },
          get_room(val){
            // this.add_formData.id = 5
            console.log(3)
          },

          // 获取 业主
          getRowClass(row, expandedRows){
            this.rowSub = row
            console.log(row)
            this.FindMemberApi(row.id)

          },


          // 获取业主信息
          FindMemberApi(id){
            FindMember({roomId: id}).then(data=>{
              let obj = JSON.parse(data.body).list
              this.formData.forEach((x, index)=>{
                if(x.id == id){
                  this.$set(this.formData[index], 'sub', obj)
                }
              });
            })
          },

          // 添加业主
          SaveMemberApi(){
            this.$refs['ruleForm'].validate((valid) => {
                if (valid) {  
                      let form = this.add_member_form
                      // console.log(this.add_member_form)
                      let item = this.formData[this.rowIndex]
                      console.log(item)

                    let params = {
                          name: form.name,//   是 姓名
                          phone: form.phone,//   是 手机号
                          sex: form.sex,//   是 性别（ 1男 2女）
                          buildName: item.buildName,//   是 楼道名称
                          relationship: form.relationship,//    是 身份（1业主 2家庭成员 3租户）
                          roomId: item.id,//    是 房号id
                          age: form.age,//   否 年龄
                        };

                        SaveMember(params).then(data=>{
                          console.log(data)
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


                } else {
                      this.$message({
                          type: 'error',
                          message: '请填写完整信息!'
                      });
                  
                      return false;
                };
  
                this.add_user_visible = false
                
                this.add_member_form = {}
              })
          },







          // 获取 房号信息
          FindRoomApi(){
            FindRoom().then(data=>{
              this.formData = JSON.parse(data.body).list
              // console.log(this.formData)
            })
          },
          handleChange_updata(){
            console.log(1)
          },
          // 查询
          searchFn(){
            // console.log(this.search)
            let params = {
              name: this.search.number,//    否 房号
              housingEstateId: this.search.housingEstateId,//   否 小区id
              propertyId: this.search.propertyId,//    否 物业公司id
            };

            FindRoom(params).then(data=>{
              console.log(data)
              this.formData = JSON.parse(data.body).list
            })
          }, 

          /*
        
            获取小区信息


          */ 
          FindHousingestateApi(val){
            this.district_option = [];
            FindHousingestate({propertyId: val}).then(data=>{
              let map = new Map() 
              if(data.statusCode === '000'){  
                let obj = JSON.parse(data.body).list
                obj.map((x, index)=>{
                   map.set(index, {
                      'id': x.id,
                      'districtName': x.name,
                   });
                })
              }else{
                this.$message({
                    type: 'error',
                    message: data.statusMsg,
                });
              }

              for(let i of map.values()){
                this.district_option.push(i)
              };
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





          // 获取楼栋
          FindBuildingApi(val){
            this.building_option = [];
            FindBuilding({housingEstateId: val}).then(data=>{
              // console.log(data)
              let obj = JSON.parse(data.body).list
              let map = new Map()
              obj.map((x, index)=>{
                map.set(index, {
                  'id': x.id,
                  'buildName': x.name,
                });

              });

              for(let i of map.values()){
                this.building_option.push(i)
              };

            })
          },



          //翻页
          handleCurrentChange(){
            console.log('翻页')
          },




          // 添加提交
          submit_add(){
            this.$refs['ruleForm'].validate((valid) => {
                if (valid) {  
                    let housingEstateName = '';
                    let buildName = '';

                    this.district_option.forEach((x, index)=>{
                      if(x.id == this.add_formData.housingEstateId){
                        housingEstateName = x.districtName
                      }
                    });

                    this.building_option.forEach(x=>{
                      if(x.id == this.add_formData.buildingId){
                        buildName = x.buildName
                      }
                    })

                    
                    let params = {
                          housingEstateId: this.add_formData.housingEstateId,    //是 小区id
                          housingEstateName: housingEstateName,   //是 小区名称
                          buildingId: this.add_formData.buildingId,    //是 楼道id
                          buildName: buildName,   //是 楼道名称
                          name: this.add_formData.name,    //是 房号
                          coveredArea: this.add_formData.coveredArea,//   是 建筑面积
                          usableArea: this.add_formData.usableArea,//    是 使用面积
                          unitPrice: this.add_formData.unitPrice,//   是 当前单价
                          allPrice: this.add_formData.allPrice,//    是 当前总价
                        };

                        SaveRoom(params).then(data=>{
                          console.log(data)
                          if(data.statusCode === '000'){
                            this.$message({
                                type: 'success',
                                message: '添加成功!'
                            });
                            this.FindRoomApi()
                          }else{
                            this.$message({
                                type: 'error',
                                message: data.statusMsg,
                            });
                          }
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
          
          // 编辑z
          edit_dialog(index, row){
            this.rowIndex = index
            const item = this.formData[index]
            console.log(item)


            
            this.updata_form = {
              // propertyId
                property_id: item.propertyId,
                housingEstateId: item.housingEstateName,//   是 小区id
                housingEstateName: item.housingEstateName,//   是 小区名称
                buildingId: item.buildName,//    是 楼道id
                buildName: item.buildName,//   是 楼道名称
                name: item.name,//    是 房号
                coveredArea: item.coveredArea,//   是 建筑面积
                usableArea: item.usableArea,//    是 使用面积
                unitPrice: item.unitPrice,//   是 当前单价
                allPrice: item.allPrice,//    是 当前总价
                id: item.id,//    是 房号id
            };

            this.updata_visible = true
          },

          // 编辑提交
          save_add(){
            this.$refs['ruleForm'].validate((valid) => {
                  if (valid) {               

                    UpdateRoom(this.updata_form).then(data=>{
                      console.log(data)
                      if(data.statusCode === '000'){
                        this.FindRoomApi()
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
          // 添加住户
          add_user(index, row){
            // console.log(index, row)
            this.rowIndex = index
            this.add_user_visible = true
          },
          formatState(){
            return this.formData.isValid ? '禁用' : '启用'
          },
          formatterSex(row){
            return row.sex == 1 ? '男' : '女' 
          },
          formatterRelationship(row){
            return row.relationship == 1 ? '业主' : (row.relationship == 2 ? '家庭成员' : '租客' )
          },
          formatterFace(row){
            return row.faces != '0' ? '是': '否'
          },

          // 编辑 用户
          edit_user_dialog(index, row){
            this.updata_user_visible = true
            let item = this.rowSub.sub[index]
            let parent = this.rowSub
            console.log(item)

            this.updata_member_form = {
              name: item.name,//    是 姓名
              phone: item.phone,//   是 手机号
              sex: parseInt(item.sex),//   是 性别（ 1男 2女）
              buildName: parent.buildName,//   是 楼道名称
              relationship: parseInt(item.relationship),//    是 身份（ 1业主 2家庭成员 3租户）
              roomId: parent.id,//    是 房号id
              age: item.age,//    否 age
              id: item.id,//    是 业主id
              isValid: item.isValid,
            }

          },

          // 提交 编辑 用户
          UpdateMemberApi(){
            // console.log(this.updata_member_form)
            UpdateMember(this.updata_member_form).then(data=>{
              console.log(data)
              if(data.statusCode === '000'){
                this.$message({
                      type: 'success',
                      message: '修改成功!'
                 });
              }else{
                this.$message({
                    type: 'error',
                    message: data.statusMsg,
                });
                return false;
              }
            })

            this.updata_user_visible = false
          },


          // 重置
          resetForm(){
             this.search = {}
             this.FindRoomApi()
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





