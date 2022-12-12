<template>
  <div id="app">
    <!-- <h1>{{msg}}</h1> -->
    <button v-if="isShow" @click="clickHandler">添加</button>
    <input ref="input789" v-else type="text">
  </div>
</template>

<script>

export default {
  name: 'App',
  data(){
    return{
      msg:"我是初始化数据",
      isShow:true
    }
  },
  mounted(){
    console.log(1,this.msg)

    this.msg="我是修改之后的数据";
    
    console.log(2,this.msg)
    // debugger
  },
  methods:{
    clickHandler(){
      this.isShow = false;

      // nextTick可以将回调函数,延迟到DOM更新之后执行
      this.$nextTick(()=>{
        this.$refs.input789.focus();
      })
    }
  }
}
</script>

<style>
</style>
