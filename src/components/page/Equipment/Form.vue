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
                    label="设备串号" 
                    prop="derviceNum" 
                    width="320"
                    align="center">
                </el-table-column>
                <el-table-column     
                    label="部署地址名称" 
                    prop="deviceName" 
                    align="center">
                </el-table-column>
                <el-table-column     
                    label="是否注册" 
                    prop="status" 
                    width="80"
                    :formatter="formatterStatus"
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
                    添加设备
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
    
    import Create from './Template/Create.vue';
    import Updata from './Template/Updata.vue';
    import { FindGatDerviceInventory } from '../../../api/api.js'
    
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
          this.FindGatDerviceInventoryApi()
        },
        computed: {
          pages(){
            return this.formData.length < 1 ? 100 : this.formData.length
          },
        },
        methods: {
          // 获取设备信息
          FindGatDerviceInventoryApi(){
            FindGatDerviceInventory().then(data=>{
              this.formData = JSON.parse(data.body).list
              console.log(this.formData)
            })
          },

          formatterStatus(row){
            return row.status ? '已注册' : '未注册'
          },

          getData(data){
            data === '000' ? this.FindGatDerviceInventoryApi() : '';
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
         



          // //翻页
          // handleCurrentChange(pages){
          //   this.FindBuildingApi(pages)
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





