<template>
  <div class="box">
  </div>
</template>

<script>
export default {
  data(){
    return {
      beTouched_: false
    }
  },
  methods:{
    __beInsert__(pos,el,vueEl){//拖拽结束是否有元素进入
        alert(`拖入了元素类型:${vueEl.type}  位置: ${JSON.stringify(pos)}`)
        console.log(pos,el,vueEl);//拖入元素在本元素中的相对位置、拖入元素dom、拖入元素vue实例
    }
  },
  props: {
    msg: String
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.box{
    height:100%;
    width:100%;
    position: absolute;
    left:0;
    top:0;
}
</style>
