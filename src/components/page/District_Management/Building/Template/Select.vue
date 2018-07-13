<template>
    <div class="Select container">
        <div class="row">
            <div class="list">
                <label class="title">
                    物业公司
                </label>
                <el-select 
                    v-model="company.label" 
                    placeholder="全部">
                  <el-option
                      v-for="item in company"
                      :key="item.value"
                      :label="item.label"
                      :value="item.value">
                  </el-option>
                </el-select>
            </div>
            <div class="list">
                <label class="title">
                    小区名称
                </label>
                <el-select 
                    v-model="district.label" 
                    placeholder="全部">
                  <el-option
                      v-for="item in district"
                      :key="item.value"
                      :label="item.label"
                      :value="item.value">
                  </el-option>
                </el-select>
            </div>
            <div class="list">
                <label class="title">
                    楼栋状态
                </label>
                <el-select 
                    v-model="buidingState.label" 
                    placeholder="全部">
                  <el-option
                      v-for="item in buidingState"
                      :key="item.value"
                      :label="item.label"
                      :value="item.value">
                  </el-option>
                </el-select>
            </div>
        </div>

        <div class="row">
            <el-button type="primary">查询</el-button>
            <el-button type="primary">重置</el-button>
        </div>

    </div>
</template>

<script>
    export default {
        name: 'Select',
        data(){
            return {
                company: [ // 物业公司
                    {
                        value: '1',
                        label: '物业1',
                    },{
                        value: '2',
                        label: '物业2',
                    },
                    
                ],
                district: [ // 小区名称
                    {
                        value: '1',
                        label: '小区1',
                    },{
                        value: '2',
                        label: '小区2',
                    }
                ],
                buidingState: [ // 楼栋状态
                    {
                        value: '1',
                        label: '开启',
                    },{
                        value: '2',
                        label: '关闭',
                    }
                ],

            }
        },
        methods: {
           
        }
    }
</script>
<style lang="stylus" scoped>
.Select
    display flex;
    flex-direction column
    .row
        flex 1;
        display flex;
        justify-content center
        align-items center
        .list
            flex 1
            .title 
                color #666
                margin-right 12px;
        &:last-child
            margin-top 24px;        
            .el-button
                width: 100px;
                margin: 0 24px;
                    
  
</style>