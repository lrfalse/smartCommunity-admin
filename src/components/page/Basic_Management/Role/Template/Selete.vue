<template>
    <div class="Select container">
        <div class="row">
            <div class="list">
                <label class="title">
                    角色名称
                </label>
                <el-input />   
            </div>
            <div class="list">
                <label class="title">
                    角色状态
                </label>
                <el-select 
                    v-model="state" 
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
.Select
    display flex;
    // flex-direction column
    .row
        flex 1;
        display flex;  
        align-items center
        padding: 12px 0;
        &:last-child
            justify-content center
        .list
            width: 300px;
            display flex
            align-items center
            text-align center
            .title 
                width: 120px;
                color #666
                margin-right 12px;
        .el-button
            width: 100px;
            margin: 0 24px;                     
</style>