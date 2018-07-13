<template>
    <div class="Page">
       <div class="Select">
           <Select />
       </div>
       <div class="Form">
           <Form />
       </div>

    </div>
</template>

<script>
    import Form from "./Template/Form.vue";
    import Select from "./Template/Selete.vue";
    // import {FindProvinces, FindCitys, FindAreas} from "../../../../api/api.js";

    export default {
        name: 'Estate',
        data(){
            return {
                data: [],
            }
        },
        components: {
            Form,
            Select,
        },
        created(){
          // FindProvinces().then(data=>{
          //   console.log(data)
           
          //   let aa = JSON.parse(data.body)
          //   console.log(aa)
          //   this.FindCitysFn(aa.list[1].code)
          // })
        },
        methods: {
           FindCitysFn(value){
            
            let aa = parseInt(value)
            let params = {
              provincesId: aa
            }
            console.log(aa)
            FindCitys(params).then(data=>{
              console.log(data)
              let bb = JSON.parse(data.body)
              // console.log(bb.list[0].code)
              this.FindAreasFn(bb.list[0].code)

            })
           },
           FindAreasFn(value){
            let aa = parseInt(value)
            let params = {
              cityId: aa
            }
            FindAreas(params).then(data=>{
              console.log(data)
            })
           }
        }
    }
</script>
<style lang="stylus" scoped>
.Form 
    margin-top 12px;
</style>