<template>
  <div class="hello">
      <div  class = 'el2'>组件{{type}}</div>
  </div>
</template>

<script>
export default {
  data(){
    return {
      beTouched_: false,
    }
  },
  methods:{
  },
  props: {
    type: String
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.hello{
  height:100px;
  width:100px;
  position:relative;;
  left:0;
  top:0;
  cursor:pointer;
}
.el1{
    width:100px;
    height:35px;
    text-align:center;
    line-height: 35px;
    border:1px solid #ccc;
    position:relative;
}
.el2{
    width:100px;
    height:35px;
    text-align:center;
    line-height: 35px;
    border:1px solid #eee;
    position: absolute;
    top:0;
    left:0;
    z-index:1;
}
</style>
