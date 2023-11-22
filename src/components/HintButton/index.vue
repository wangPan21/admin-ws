<template>
    <div :title="title">
       <el-button  ></el-button> 
       <el-button type="primary" size="default" v-bind="$attrs" v-on="$listeners"></el-button>
       
    </div>
</template>

<script>
export default {
    name:'HintButton',
    props:["title"],
    data(){
        return {}
        // mounted(){},
    }
}
</script>

<style>
</style>