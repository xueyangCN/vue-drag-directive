<template>
  <div class="hello">
    {{num}}
  </div>
</template>

<script>
export default {
  data(){
    return {
      num: ''
    }
  },
  methods:{
    __beInsert__(el,vueEl){//拖拽结束是否有元素进入
      console.log(el,vueEl);
    },
    __onBeTouchedEnd__(e){//其他元素拖拽结束，碰撞本元素触发
      console.log(e)
    },
    __onBeTouched__(e){//其他元素拖拽过程中，碰撞本元素触发
      console.log(e)
    },
    __onTouched__(nodeList){//本元素碰撞其他元素触发，返回所有发生接触的元素数组
      // console.log(nodeList)
    },
    __onDrugDone__(data){//本元素一次拖拽完成时触发
      console.log(data);//发生接触元素数组、元素当前位置、元素起始位置
    }
  },
  props: {
    msg: String
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.hello{
  height:100px;
  width:100px;
  position:absolute;
  left:0;
  top:0;
  background: red;
  cursor:pointer;
}
</style>
