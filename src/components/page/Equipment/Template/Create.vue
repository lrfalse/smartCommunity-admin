<template>
    <div class="Dialog">
      <el-dialog title="添加用户" :visible.sync="addVisible" width="40%">
        <el-form 
            :inline="true" 
            :model="form" 
            :rules="rules"
            ref="ruleForm"
            class="demo-form-inline">

              <el-form-item 
                  label="设备串号" 
                  label-width="100px"
                  prop="derviceNum">
                  <el-input 
                      v-model="form.derviceNum" 
                      maxlength="48"
                      placeholder="请输入设备串号">
                  </el-input>
              </el-form-item>

              <el-form-item 
                  label="部署地址" 
                  label-width="100px"
                  prop="deviceName">
                  <el-input 
                      v-model="form.deviceName" 
                      maxlength="32"
                      placeholder="请输入部署地址">
                  </el-input>
              </el-form-item>

              <el-form-item 
                  label="是否注册" 
                  label-width="100px"
                  prop="status">
                  <el-select 
                    v-model="form.status"   
                    placeholder="请选择">
                    <el-option
                        v-for="item in statusOption"
                        :key="item.value"
                        :label="item.label"
                        :value="item.value">
                    </el-option>
                  </el-select>
              </el-form-item>


            <div class="submit">
                <el-button 
                    type="primary" 
                    @click="addSubmit">    
                    添加
                </el-button>  
                <el-button 
                    type="primary" 
                    @click="addVisible = false">    
                    关闭
                </el-button>
            </div>
        </el-form>
      </el-dialog>

    </div>
</template>

<script>
    import { SaveGatDerviceInventory } from "../../../../api/api.js";

    
    export default {
        name: 'Building',
        data(){
            return {
                addVisible: false,
                form: {},
                statusOption: [
                  {
                    label: '未注册',
                    value: 0,
                  },{
                    label: '已注册',
                    value: 1,
                  },
                ],


                // 验证规则
                rules: {
                    derviceNum: { required: true, message: '请输入设备串号', trigger: 'blur' },
                    deviceName: { required: true, message: '请输入部署地址', trigger: 'blur' },
                    status: { required: true, message: '请选择状态', trigger: 'blur' },
                },

            }
        },
        props: {
          switch: {
            type: Boolean,
            default: false,
          },
        },
        methods: {
          // 添加提交
           addSubmit(){
               
               this.$refs['ruleForm'].validate((valid) => {
                if (valid) {  
                 
                    SaveGatDerviceInventory(this.form).then(data=>{
                      console.log(data)
                      if(data.statusCode === '000'){
                        this.$message({
                            type: 'success',
                            message: '添加成功'
                        });
                        this.$emit('createData', data.statusCode);
                      }else{
                        this.$message({
                            type: 'error',
                            message: data.statusMsg,
                        });
                      };
                    });
                } else {
                    this.$message({
                        type: 'error',
                        message: '请填写完整信息!'
                    });
                  
                    return false;
                };
                this.addVisible = false
                this.form = {}
              })
           },
        },
        watch: {
          switch(n){
            this.addVisible = n
          },
          addVisible(n){
            this.$emit('visible', n)
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





