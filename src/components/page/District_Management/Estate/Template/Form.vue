<template>
    <div class="buiding_form">
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
                    prop="propertyShortname" 
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
                    prop="state" 
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
                        @click="visible = true">    
                        添加用户
                    </el-button>
                <el-pagination 
                    @current-change="handleCurrentChange" 
                    layout="prev, pager, next" 
                    :total="formData.length">
                </el-pagination>
            </div>
        </div>
        
        <!-- 弹出 添加/编辑 角色 -->
        <DialogTemplate 
        @close_mask="close_mask"
        @add_callback="get_add"
        @updata_allback="get_updata"

        :pror_updata="updataRow"
        :prop_visible="visible">  
        </DialogTemplate>
        
        <!-- 弹出 删除单个 -->
        <DeleteTemplate
        :prop_delVisible="del_visible"
        @del_close="del_closed"
        @deletions="deletions"
         ></DeleteTemplate>

    </div>


</template>

<script>
    import DialogTemplate from "../Components/Dialog.vue";
    import DeleteTemplate from "../../../../common/Delete/Delete.vue";

    import { FindPropertyCompanys, SaveProperty } from "../../../../../api/api.js";

    export default {
        name: 'buiding_form',
        data(){
            return {
                // 打开/关闭 dialog
                visible: false,
                // 初始 表单数据
                formData: [],

                //  删除 弹窗 开关
                del_visible: false, 
                //编辑 容器
                updataRow: [],
                // 获取 索引
                rowIndex: -1, 

                company_option: [], 
          
            }
        },
        components: {
            DialogTemplate,
            DeleteTemplate,
        },
        created(){
            this.FindPropertyCompanysApi()
        },
        computed: {

        },
        methods: {
            // 获取物业公司
            FindPropertyCompanysApi(){
                let params = {
                    page: 1,
                };
                FindPropertyCompanys(params).then(data=>{
                    this.formData = JSON.parse(data.body).list

                    this.formData.map(x=>{    
                        if(x.isValid){
                            this.$set(x, 'state', '启用')
                        }else{
                            this.$set(x, 'state', '禁用')
                        }
                    })
                })
            },
            // 关闭 添加角色弹窗
            close_mask(val){
                this.visible = val
                
            },
            // 关闭 删除弹窗
            del_closed(val){
                this.del_visible = val
            },
            // 弹出 删除提示
            delete_dialog(index, row){
                this.rowIndex = index
                this.del_visible = true
            },
            // 确定删除
            deletions(val){     
                if(val){
                    this.formData.splice(this.rowIndex, 1)
                    this.$message.success('删除成功');
                    this.del_visible = false;
                };   
            },
            // 弹出 编辑
            edit_dialog(index, row){
                this.visible = true 
                this.updataRow = []
                this.rowIndex = index
                this.updataRow.push(row)
            },
            // 获取 添加数据
            get_add(data){
                this.formData.push(data)
                SaveProperty(data).then(data=>{
                    console.log(data)
                    this.$message.error(data.statusMsg);
                })
            },
            // 获取 修改数据
            get_updata(data){
                this.$set(this.formData, this.rowIndex, data)
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