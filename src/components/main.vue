<template>
  <div class="box">
      <component :pos = 'item.pos' v-dragme = 'item.conf'  :key = 'index' v-for = '(item,index) in componentList' v-bind:is = 'item.component' />
  </div>
</template>

<script>
export default {
  data(){
    return {
      beTouched_: false
    }
  },
  updated() {
    console.log(this.componentList);
  },
  methods:{
    __beInsert__(pos,el,vueEl){//拖拽结束是否有元素进入
      this.$emit('beInsert',{
        pos,
        el,
        vueEl,
        type: vueEl.type
      })
        // alert(`拖入了元素类型:${vueEl.type}  位置: ${JSON.stringify(pos)}`)
        // console.log(pos,el,vueEl);//拖入元素在本元素中的相对位置、拖入元素dom、拖入元素vue实例
    }
  },
  components: {
  },
  props: {
    componentList: Array
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.box{
    height:100%;
    width:100%;
    position: relative;
    left:0;
    top:0;
    overflow-y: auto;
}
</style>
