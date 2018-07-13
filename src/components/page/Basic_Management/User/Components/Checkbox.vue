<template>
    <div class="Checkbox">
        <h4 class="title">权限管理</h4>
        <div class="content">
            <div class="list">
                <div class="top">
                    <el-checkbox 
                    :indeterminate="district.isIndeterminate" 
                    v-model="district.checkAll" 
                    @change="district_CheckAllChange">
                    <h3 class="tip">小区管理</h3>
                </el-checkbox>
                </div>              
                <!-- <div style="margin: 15px 0;"></div> -->
                <el-checkbox-group 
                      v-model="district.checked" 
                      @change="district_CheckedChange">
                        <el-checkbox 
                        v-for="item in district.array" 
                        :label="item" 
                        :key="item">{{item}}</el-checkbox>
                </el-checkbox-group>    
            </div>

            <div class="list">
                <div class="top">
                    <el-checkbox 
                    :indeterminate="notice.isIndeterminate" 
                    v-model="notice.checkAll" 
                    @change="notice_CheckAllChange">
                    <h3 class="tip">通知反馈</h3>
                </el-checkbox>
                </div>              
                <!-- <div style="margin: 15px 0;"></div> -->
                <el-checkbox-group 
                      v-model="notice.checked" 
                      @change="notice_CheckedChange">
                        <el-checkbox 
                        v-for="item in notice.array" 
                        :label="item" 
                        :key="item">{{item}}</el-checkbox>
                </el-checkbox-group>    
            </div>

            <div class="list">
                <div class="top">
                    <el-checkbox 
                    :indeterminate="base.isIndeterminate" 
                    v-model="base.checkAll" 
                    @change="base_CheckAllChange">
                    <h3 class="tip">基础管理</h3>
                </el-checkbox>
                </div>              
                <!-- <div style="margin: 15px 0;"></div> -->
                <el-checkbox-group 
                      v-model="base.checked" 
                      @change="base_CheckedChange">
                        <el-checkbox 
                        v-for="item in base.array" 
                        :label="item" 
                        :key="item">{{item}}</el-checkbox>
                </el-checkbox-group>    
            </div>
        </div>    
      
    </div>
</template>

<script>
   
    export default {
        name:'Checkbox',
        data(){
            return {
                district: {
                    checked:[],
                    isIndeterminate: true,
                    checkAll: false,
                    array: [
                        '物业公司管理',
                        '小区管理',
                        '楼栋管理',
                        '房号与住户管理',
                    ],
                },

                notice: {
                    checked:[],
                    isIndeterminate: true,
                    checkAll: false,
                    array: [
                        '通知公告',
                        '报事报修',
                        
                    ],
                },

                base: {
                    checked:[],
                    isIndeterminate: true,
                    checkAll: false,
                    array: [
                        '角色管理',
                        '用户管理',
                    ],
                },

                // 多选后 装入数组
                district_array: [],
                notice_array: [], 
                base_array: [],

                total_array: [],

                // 编辑 容器
                // updata_array: [],
            }
        },
        props: {
            clear_array: {
                type: Boolean,
                default: true,
            },
            updata_checked: {
                type: Array,
                default: [],
            },
        },
        created(){
            this.checked_obtain()
        },
        methods: {
            //  小区管理
            // 全选
            district_CheckAllChange(val) { 
                this.district.checked = val ? this.district.array : [];
                this.district.isIndeterminate = false;
            },
            // 单选
            district_CheckedChange(value) {
                let checkedCount = value.length;
                this.district.checkAll = checkedCount === this.district.array.length;
                this.district.isIndeterminate = checkedCount > 0 && checkedCount < this.district.array.length;

                this.district_array = value
            },

            // 通知管理
            notice_CheckAllChange(val){
                this.notice.checked = val ? this.notice.array : [];
                this.notice.isIndeterminate = false;
            },
            notice_CheckedChange(value){
                let checkedCount = value.length;
                this.notice.checkAll = checkedCount === this.notice.array.length;
                this.notice.isIndeterminate = checkedCount > 0 && checkedCount < this.notice.array.length;
                
                this.notice_array = value
            },

            // 基础管理
            base_CheckAllChange(val){
                this.base.checked = val ? this.base.array : [];
                this.base.isIndeterminate = false;
            },
            base_CheckedChange(value){
                let checkedCount = value.length;
                this.base.checkAll = checkedCount === this.base.array.length;
                this.base.isIndeterminate = checkedCount > 0 && checkedCount < this.base.array.length;

                this.base_array = value
            },  

            // 取值
            obtain(){
                let set = new Set()
                this.district_array.map(x=>{
                    set.add(x)
                });
                this.notice_array.map(x=>{
                    set.add(x)
                });
                this.base_array.map(x=>{
                    set.add(x)
                });
                this.$emit('getChecked', [...set])
            },
            // 清空 取值
            obtain_clear(){
                this.district.checked = []
                this.notice.checked = []
                this.base.checked = []
                console.log(23423434)
            },
            // 编辑时 获取权限
            checked_obtain(){
                if(this.updata_checked == []){
                    return
                }
                let a = new Set(this.district.array)
                let b = new Set(this.notice.array)
                let c = new Set(this.base.array)

                // let union = new Set([...a, ...b, ...c])

                // console.log([...union])

                // this.updata_checked.map(x=>{
                //     a.has(x) ? this.district.checked.push(x) : this.district.checked = []  
                //     console.log(this.district.checked)
                // })
                // this.updata_checked.map(x=>{
                //     b.has(x) ? this.notice.checked.push(x) : this.notice.checked = []
                //     console.log(this.notice.checked)
                // })
                console.log(this.updata_checked, 2)
                this.updata_checked.map(x=>{
                    // c.has(x) ? this.base.checked.push(x) : this.base.checked = []
                    console.log(x)
                })
            },
        },
        watch: {
            district_array(n){
                this.obtain()
            },
            notice_array(n){
                this.obtain()
            },
            base_array(){
                this.obtain()
            },
            clear_array(n){
                n ? n : this.obtain_clear()    
            },
            updata_checked(){
                this.checked_obtain()
            }
        },
    }
</script>
<style lang="stylus" scoped>
.Checkbox 
    border-top 1px solid #ddd;
    padding: 12px 0;
    .title
        font-size 24px;
        color #ff0000
    .content
        display flex
        padding 24px;
        .list
            flex 1
            display flex
            flex-direction column     
            border 1px solid #ccc;
            .top
                height 48px;
                background-color: #eee;
                display: flex
                padding-left 30px;
                align-items center
                .tip
                    font-size: 16px;
            &:nth-child(2), &:nth-child(3)
                border-left 0       
            .el-checkbox-group
                display flex    
                flex-direction column
                justify-content center
                padding-left 30px;
                label
                    // height 60px;
                    margin-left: 0;
                    flex 1
                    margin 12px 0;
                    color: #666
                
    
  
</style>