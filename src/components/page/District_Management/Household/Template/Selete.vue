<template>
    <div class="Select container">
        <el-form 
            :inline="true" 
            :model="select_form" 
            class="demo-form-inline">
            <el-form-item label="物业公司">
                <el-select 
                    v-model="select_form.state"   
                    disabled 
                    placeholder="全部">
                  <el-option
                      v-for="item in buidingState"
                      :key="item.value"
                      :label="item.label"
                      :value="item.value">
                  </el-option>
                </el-select>
            </el-form-item>

            <el-form-item label="小区名称">
                <el-select 
                    v-model="select_form.state"   
                    disabled 
                    placeholder="全部">
                  <el-option
                      v-for="item in buidingState"
                      :key="item.value"
                      :label="item.label"
                      :value="item.value">
                  </el-option>
                </el-select>
            </el-form-item>

            <el-form-item label="楼栋">
                <el-select 
                    v-model="select_form.state"   
                    disabled 
                    placeholder="全部">
                  <el-option
                      v-for="item in buidingState"
                      :key="item.value"
                      :label="item.label"
                      :value="item.value">
                  </el-option>
                </el-select>
            </el-form-item>

            <el-form-item label="门牌号">
            <el-input 
                v-model="select_form.user" 
                placeholder="请输入用户账号"></el-input>
          </el-form-item>

          <el-form-item class="button">
            <el-button type="primary">查询</el-button>
            <el-button type="primary">重置</el-button>
          </el-form-item>
        </el-form>
    </div>
</template>

<script>
    export default {
        name: 'Select',
        data(){
            return {
                select_form: {
                    user: '',
                    region: '',
                },
                buidingState: [ // 楼栋状态
                    {
                        value: '1',
                        label: '启用',
                    },{
                        value: '2',
                        label: '禁用',
                    }
                ],
                state: '启用',

            }
        },
        methods: {
           
        }
    }
</script>
<style lang="stylus" scoped>

               
</style>