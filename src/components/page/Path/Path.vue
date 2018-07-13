<template>
    <div class="table">
        <div class="container">
            <el-table :data="routePath" style="width: 100%" ref="multipleTable" @selection-change="handleSelectionChange">
                <el-table-column type="expand" width="55" align="center">

                    <template slot-scope="props">
                        <el-table :data="props.row.subs" style="width: 100%">
                            <el-table-column prop="level" label="等级"  align="center">
                            </el-table-column>
                            <el-table-column prop="parent" label="上级地址"  align="center">
                            </el-table-column>
                            <el-table-column prop="title" label="标题"  align="center">
                            </el-table-column>
                            <el-table-column prop="index" label="地址"  align="center">
                            </el-table-column>

                        </el-table>
                       



                        <!-- <el-form :model label-position="left" inline class="demo-table-expand">
                          <el-form-item label="级别" width="1000px">
                            <span>二级菜单</span>
                          </el-form-item>
                          <el-form-item label="上级地址">
                            <span>{{ props.row.index }}</span>
                          </el-form-item>
                          <el-form-item label="标题">
                            <span>{{ props.row.subs.title }}</span>
                          </el-form-item>
                          <el-form-item label="店铺 ID">
                            <span>{{ props.row.shopId }}</span>
                          </el-form-item>
                          <el-form-item label="商品分类">
                            <span>{{ props.row.category }}</span>
                          </el-form-item>
                          <el-form-item label="店铺地址">
                            <span>{{ props.row.address }}</span>
                          </el-form-item>
                          <el-form-item label="商品描述">
                            <span>{{ props.row.desc }}</span>
                          </el-form-item>
                        </el-form> -->
                        
                   </template>
                </el-table-column>

                <el-table-column prop="icon" label="图标" width="120" align="center">
                </el-table-column>
                <el-table-column prop="title" label="标题" width="120" align="center">
                </el-table-column>
                <el-table-column prop="index" label="地址/索引" align="center">
                </el-table-column>
                <!-- <el-table-column label="等级" width="120" align="center">
                    
                </el-table-column> -->
               <!--  <el-table-column label="操作" width="150" align="center">
                   
                    <template slot-scope="scope">
                        <el-button size="small" @click="handleEdit(scope.$index, scope.row)">编辑</el-button>
                        <el-button size="small" type="danger" @click="handleDelete(scope.$index, scope.row)">删除</el-button>

                    
                    </template>
                </el-table-column> -->
            </el-table>
           <!--  <div class="pagination">
                <el-button type="primary" size="small" @click="addVisible = true">添加</el-button>
                <el-pagination @current-change="handleCurrentChange" layout="prev, pager, next" :total="20">
                </el-pagination>
                
            </div> -->
        </div>

        <!-- 编辑弹出框 -->
        <el-dialog :visible.sync="editVisible" width="40%">
            <el-form ref="form" :model="form" label-width="50px" :rules="rules">
                <el-form-item 
                 prop="icon" 
                label="图标">
                    <el-input v-model="form.name"></el-input>
                </el-form-item>
                <el-form-item 
                 prop="title" 
                label="标题">
                    <el-input v-model="form.name"></el-input>
                </el-form-item>
                <el-form-item 
                 prop="path"
                label="地址">
                    <el-input v-model="form.address"></el-input>
                </el-form-item>
                <el-form-item label="等级">
                    <el-select v-model="value" placeholder="请选择">
                        <el-option
                          v-for="item in options"
                          :key="item.value"
                          :label="item.label"
                          :value="item.value">
                        </el-option>
                    </el-select>
                </el-form-item>

            </el-form>
            <span slot="footer" class="dialog-footer">
                <el-button @click="editVisible = false">取 消</el-button>
                <el-button type="primary" @click="saveEdit">确 定</el-button>
            </span>
        </el-dialog>

        <!-- 删除提示框 -->
        <el-dialog title="提示" :visible.sync="delVisible" width="450px" center>
            <div class="del-dialog-cnt">删除不可恢复，是否确定删除？</div>
            <span slot="footer" class="dialog-footer">
                <el-button @click="delVisible = false">取 消</el-button>
                <el-button type="primary" @click="deleteRow">确 定</el-button>
            </span>
        </el-dialog>

        <!-- 添加 -->
        <el-dialog :visible.sync="addVisible" width="40%">
            <el-form ref="form" :model="form" label-width="50px" :rules="rules">
                <el-form-item 
                 prop="icon"
                label="图标">
                    <el-input v-model="form.name"></el-input>      
                </el-form-item>
                <el-form-item 
                prop="title"
                label="标题">
                    <el-input v-model="form.name"></el-input>
                </el-form-item>
                <el-form-item 
                prop="path"   
                label="地址">
                    <el-input v-model="form.address"></el-input>
                </el-form-item>
                <el-form-item label="等级">
                    <el-select v-model="value" placeholder="请选择">
                        <el-option
                          v-for="item in options"
                          :key="item.value"
                          :label="item.label"
                          :value="item.value">
                        </el-option>
                    </el-select>
                </el-form-item>

            </el-form>
            <span slot="footer" class="dialog-footer">
                <el-button @click="addVisible = false">取 消</el-button>
                <el-button type="primary" @click="addNewPathApi">确 定</el-button>
            </span>
        </el-dialog>
    </div>
</template>

<script>
    import routePath from '../../../assets/js/routePath.js'

    export default {
        data() {
            return {
                opened: false,    
                pathData: [],
                options: [
                    {
                        value: '1',
                        label: '等级一',
                    },
                ],
                value: '等级一',  // options.value
                rules: {
                    icon: [
                        { required: true, message: '图标不能为空', trigger: 'blur' }
                    ],
                    title: [
                        { required: true, message: '标题不能为空', trigger: 'blur' }
                    ],
                    path: [
                        { required: true, message: '地址不能为空', trigger: 'blur' }
                    ],
               
                },

                routePath: routePath,
                






                url: './static/vuetable.json',
                tableData: [],
                cur_page: 1,
                multipleSelection: [],
                select_cate: '',
                select_word: '',
                del_list: [],
                is_search: false,
                addVisible: false,
                editVisible: false,
                delVisible: false,
                form: {
                    name: '',
                    date: '',
                    address: ''
                },
                idx: -1
            }
        },
        created() {
            this.getData();
        },
        mounted(){
            // console.log(this.subs)
        },
        computed: {
            
        },
        methods: {
            sss(pas){
                console.log(pas.row.subs)
            },
            // 添加新路由
            addNewPathApi(){
                this.$message.success('添加成功');
                this.addVisible = false
            },
            // 分页导航
            handleCurrentChange(val) {
                this.cur_page = val;
                this.getData();
            },
            // 获取 easy-mock 的模拟数据
            getData() {
                // 开发环境使用 easy-mock 数据，正式环境使用 json 文件
                if (process.env.NODE_ENV === 'development') {
                    this.url = '/ms/table/list';
                };
                this.$axios.post(this.url, {
                    page: this.cur_page
                }).then((res) => {
                    this.tableData = res.data.list;
                })
            },
            search() {
                this.is_search = true;
            },
            formatter(row, column) {
                return row.address;
            },
            filterTag(value, row) {
                return row.tag === value;
            },
            handleEdit(index, row) {
                this.idx = index;
                const item = this.tableData[index];
                this.form = {
                    name: item.name,
                    date: item.date,
                    address: item.address
                }
                this.editVisible = true;
            },
            handleDelete(index, row) {
                this.idx = index;
                this.delVisible = true;
            },
            delAll() {
                const length = this.multipleSelection.length;
                let str = '';
                this.del_list = this.del_list.concat(this.multipleSelection);
                for (let i = 0; i < length; i++) {
                    str += this.multipleSelection[i].name + ' ';
                }
                this.$message.error('删除了' + str);
                this.multipleSelection = [];
            },
            handleSelectionChange(val) {
                this.multipleSelection = val;
            },
            // 保存编辑
            saveEdit() {
                this.$set(this.tableData, this.idx, this.form);
                this.editVisible = false;
                this.$message.success(`修改第 ${this.idx+1} 行成功`);
            },
            // 确定删除
            deleteRow(){
                this.tableData.splice(this.idx, 1);
                this.$message.success('删除成功');
                this.delVisible = false;
            }
        }
    }

</script>

<style scoped>
    .handle-box {
        margin-bottom: 20px;
    }

    .handle-select {
        width: 120px;
    }

    .handle-input {
        width: 300px;
        display: inline-block;
    }
    .del-dialog-cnt{
        font-size: 16px;
        text-align: center
    }
    .pagination {
        width: 100%;
        display: flex;
        align-items: center;
        justify-content: space-between;
    }
    .demo-table-expand {
        font-size: 0;
    }
    .demo-table-expand label {
        width: 90px;
        color: #99a9bf;
    }
    .demo-table-expand .el-form-item {
        margin-right: 0;
        margin-bottom: 0;
        width: 50%;
    }
</style>
