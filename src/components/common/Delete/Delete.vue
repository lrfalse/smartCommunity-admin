<template>
    <div class="Delete">
        <!-- 删除提示框 -->
        <el-dialog title="删除" :visible.sync="del_visible" width="450px" center>
            <div class="del-dialog-cnt">删除不可恢复，是否确定删除？</div>
            <span slot="footer" class="dialog-footer">
                <el-button @click="del_visible = false">取 消</el-button>
                <el-button type="primary" @click="deletions">确 定</el-button>
            </span>
        </el-dialog>
    </div>
</template>

<script>
    export default {
        name: 'Delete',
        data(){
            return {
                del_visible: false,
            }
        },
        props: {
            prop_delVisible: {
                type: Boolean,
                default: false,
            },
        },
        methods: {
           deletions(){
              this.$emit('deletions', true)
           }
        },
        watch: {
            prop_delVisible(n){
                this.del_visible = n
            },
            del_visible(n){
                this.$emit('del_close', n)
            },
        },
    }
</script>
<style lang="stylus" scoped>

</style>