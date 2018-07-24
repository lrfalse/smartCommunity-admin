<template>
    <div class="Page">

       <!-- 表单 -->

           <div class="container">
            <el-table 
                :data="formData" 
                border 
                style="width: 100%" 
                ref="multipleTable">
                <el-table-column     
                    label="登陆账号" 
                    prop="name" 
                    align="center">
                </el-table-column>
                <el-table-column     
                    label="昵称" 
                    prop="nickName" 
                    align="center">
                </el-table-column>
                <el-table-column     
                    label="电话" 
                    prop="mobPhone" 
                    align="center">
                </el-table-column>
                <el-table-column     
                    label="性别" 
                    prop="sex" 
                    :formatter="formatterSex"
                    align="center">
                </el-table-column>
                <el-table-column     
                    label="状态" 
                    prop="isValid" 
                    :formatter="formatterIsValid"
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
                              @click="edit(scope.$index, scope.row)">编辑</el-button>                    
                      </template>
                </el-table-column>
            </el-table>


            <div class="pagination">
                <el-button 
                    type="primary" 
                    @click="add_visible = true">    
                    添加用户
                </el-button>
                    
                <!-- <el-pagination 
                    @current-change="handleCurrentChange" 
                    layout="prev, pager, next" 
                    :total="pages">
                </el-pagination> -->
            </div>
        </div>

      <!-- 删除提示框 -->
      <!--   <el-dialog title="删除" :visible.sync="del_visible" width="450px" center>
            <div class="del-dialog-cnt">删除不可恢复，是否确定删除？</div>
            <span slot="footer" class="dialog-footer">
                <el-button @click="del_visible = false">取 消</el-button>
                <el-button type="primary" @click="deletions">确 定</el-button>
            </span>
        </el-dialog> -->

  
      <Create
       :switch="add_visible" 
       @visible="addVisibleFn"
       @createData="getData"
      ></Create>

      <Updata 
      :switch="updata_visible"
      :editData="editData"
      @visible="updataVisibleFn"
      @updataData="getData"
      ></Updata>
        
      


    </div>
</template>

<script>
    import { FindSysUser } from "../../../../api/api.js";
    import Create from './Template/Create.vue';
    import Updata from './Template/Updata.vue'
    
    export default {
        name: 'Building',
        data(){
            return {
                search: {},
                // 表单栏
                formData: [],
                add_visible: false,
                updata_visible: false,
                editData: {},

                // 验证规则
                rules: {
                    propertyId: { required: true, message: '请选择物业公司', trigger: 'change' },
                    housingEstateId: { required: true, message: '请输入小区名称', trigger: 'change' },
                    name: { required: true, message: '请输入楼栋名称', trigger: 'blur' },
                },

            }
        },
        components: {
          Create, 
          Updata,
        },
        created(){
          this.FindSysUserApi()
        },
        computed: {
          pages(){
            return this.formData.length < 1 ? 100 : this.formData.length
          },
          md5(){
            return
          },
        },
        methods: {
          // 获取 用户信息
          FindSysUserApi(){
            FindSysUser().then(data=>{
              // console.log(data)
              this.formData = JSON.parse(data.body).list
              // console.log(this.formData)
            })
          },
          getData(data){
            data === '000' ? this.FindSysUserApi() : '';
          },
          // 编辑
          edit(index, row){
            this.updata_visible = true;
            this.editData = this.formData[index]
          },





          addVisibleFn(val){
            this.add_visible = val;
          },
          updataVisibleFn(val){
            this.updata_visible = val;
          },
          formatterSex(row){
            return row.sex == 1 || row.sex == null? '男' : '女';
          },
          formatterIsValid(row){
            return row.isValid == 0 ? '启用' : '禁用';
          },


















          // // 获取小区值
          // get_pro(val){
          //   this.distict_option = [];
          //   FindHousingestate({propertyId: val}).then(data=>{
          //     let obj = JSON.parse(data.body).list
          //     for(let i of obj){
          //       this.distict_option.push({
          //         label: i.name, 
          //         value: i.id,
          //       })
          //     }
          //   })
  
          // },

          // // 查询
          // searchFn(){
          //   FindHousingestate(this.search).then(data=>{
          //     if(data.statusCode === '000'){
          //       this.formData = JSON.parse(data.body).list
          //     }
          //   })
          // },





          // // 获取小区名
          // district_changed(val){
            

          // },
          // // 获取物业公司名
          // estate_changed(val){
          //   console.log(val)
          //   this.company_option.forEach(x=>{
          //     if(x.id == val){
          //       this.propertyName = x.propertyName
          //       // console.log(this.propertyName)
          //     };

          //   })
          // },
          // handleChange_updata(){
          //   console.log(1)
          // },
          // // 查询
          // searchFn(){
          //   FindBuilding(this.search).then(data=>{
          //     this.formData = JSON.parse(data.body).list
          //   })

          // }, 
          // // 获取楼栋信息
          // FindBuildingApi(pages){
          //   FindBuilding({page: pages}).then(data=>{
          //     // console.log(data)
          //     if(data.statusCode === '000'){
          //        this.formData = JSON.parse(data.body).list
          //        console.log(this.formData)
          //     }else{
          //       this.$message({
          //           type: 'error',
          //           message: data.statusMsg,
          //       });
          //     }
          //   })
          // },
          // // 获取小区信息
          // FindHousingestateApi(){
          //   FindHousingestate().then(data=>{
          //     let map = new Map()
          //     let params = [];
          //     if(data.statusCode === '000'){
          //       params = JSON.parse(data.body).list
          //       params.forEach((item, index)=>{
          //         map.set(index, {
          //           'housingEstateId': item.id,
          //           'housingEstateName': item.name,
          //         });
          //       })

          //       for(let i of map.values()){
          //         this.district_option.push(i)
          //       };
                
          //     }else{
          //       this.$message({
          //           type: 'error',
          //           message: data.statusMsg,
          //       });
          //     }
              
          //   })
          // },

          // // 获取 物业公司
          // get_propertyName(){
          //   let params = {
          //     rows: 999,
          //     page: 1,
          //   };
          //   FindPropertyCompanys(params).then(data=>{
          //     let obj = JSON.parse(data.body).list
          //     let map = new Map()
          //     obj.map((x, index)=>{
          //       map.set(index, {
          //         'id': x.id,
          //         'propertyName': x.propertyName,
          //       });

          //     });
          //     for(let i of map.values()){
          //       this.company_option.push(i)
          //     };
              
          //   });
          // },
          // //翻页
          // handleCurrentChange(pages){
          //   this.FindBuildingApi(pages)
          // },
          // // 添加提交
          // submit_add(){
          //   this.$refs['ruleForm'].validate((valid) => {
          //       if (valid) {               
          //           let params = {
          //                propertyId:  this.add_formData.propertyId,  //是 物业公司id
          //                propertyName: this.propertyName,    //是 物业公司名称
          //                housingEstateId: this.add_formData.housingEstateId,   //是 小区id
          //                housingEstateName: this.district_name,   //是 小区名称
          //                name: this.add_formData.name,    //是 楼栋名称
          //               };

          //             SaveBuilding(params).then(data=>{
          //               console.log(data)
          //               if(data.statusCode === '000'){
          //                 this.$message({
          //                     type: 'success',
          //                     message: '添加成功!'
          //                 });

          //                 this.FindBuildingApi()
          //               }else{
          //                 this.$message({
          //                     type: 'error',
          //                     message: data.statusMsg,
          //                 });
          //               }
          //             })
      

          //       } else {
          //             this.$message({
          //                 type: 'error',
          //                 message: '请填写完整信息!'
          //             });
                  
          //             return false;
          //       };
  
          //       this.add_visible = false   
          //       this.add_formData = {}
          //     })
          // },

          // // 弹出删除框
          // delete_dialog(index, row){
          //   this.rowIndex = index
          //   this.del_visible = true

          // },

          // //  确定删除
          // deletions(){
          //   this.formData.splice(this.rowIndex, 1)
          //   this.$message.success('删除成功');
          //   this.del_visible = false;
          // },
          
          // // 编辑z
          // edit_dialog(index, row){
          //   this.rowIndex = index
            
          //   const item = this.formData[index]

          //   this.updata_form = {
          //     propertyId : item.propertyId,   //是 物业公司id ``
          //     housingEstateId : item.housingEstateId,  //是 小区名称
          //     housingEstateName: item.housingEstateName, //是 小区名称 ```
          //     name: item.name, //楼栋名称
          //     isValid: parseInt(item.isValid),
          //     id: item.id,
          //   };


          //   this.updata_visible = true
          // },

          // // 编辑提交
          // save_add(){
          //   this.$refs['ruleForm'].validate((valid) => {
          //         if (valid) {          
          //           this.company_option.forEach(x=>{
          //               if(x.id == this.updata_form.propertyId){
          //                 this.updata_form.propertyName = x.propertyName
          //               };
          //           });
          //           this.district_option.forEach(x=>{
          //               if(x.housingEstateId == this.updata_form.housingEstateId){
          //                 this.updata_form.housingEstateName = x.housingEstateName
          //               };
          //           });
                    

          //           UpdateBuilding(this.updata_form).then(data=>{
          //             console.log(data)
          //             if(data.statusCode === '000'){
          //               this.FindBuildingApi()
          //               this.$message({
          //                   type: 'success',
          //                   message: '修改成功!'
          //               });
          //             }else{
          //               this.$message({
          //                   type: 'error',
          //                   message: data.statusMsg,
          //               });
          //             }
          //           })    
                    
          //         } else {
          //           this.$message({
          //               type: 'error',
          //               message: '请填写完整信息!'
          //           });
                    
          //           return false;
          //         };

          //         this.updata_visible = false
          //       });
          // },      
          // formatState(row){
          //   return row.isValid == '0' ? '启用' : '禁用';
          // },

          // // 重置
          // resetForm(){
          //    this.search = {}
          //    this.FindBuildingApi()
          // },
           
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





