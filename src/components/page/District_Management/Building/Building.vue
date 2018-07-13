<template>
    <div class="Building">
       <div class="search">
           <Select />
       </div>
       <div class="Form">
           <Form />
       </div>

    </div>
</template>

<script>
    import Form from "./Template/Form.vue";
    import Select from "./Template/Select.vue";

    export default {
        name: 'Building',
        data(){
            return {
                data: [],
            }
        },
        components: {
            Form,
            Select,
        },
        methods: {
           
        }
    }
</script>
<style lang="stylus" scoped>
.Form 
    margin-top 12px;
</style>