<template>
  <div id="app">
    <HelloWorld style = 'height:150px;width:150px;background:green;' v-dragme = 'dragConfig1' msg="Welcome to Your Vue.js App"/>
    <HelloWorld style = 'left:300px;' v-dragme = 'dragConfig2' msg="Welcome to Your Vue.js App"/>
    <div style = 'margin-top:300px;margin-left:100px;background:#eee;position:relative;'>
      <div v-dragme style = 'height:100px;width:100px;background:yellow;position:absolute;left:300px;border:1px solid #ccc;'>1</div>
      <div v-dragme style = 'height:100px;width:100px;background:yellow;position:absolute;left:400px;border:1px solid #ccc;'>2</div>
      <div v-dragme = 'dragConfig1' style = 'height:100px;width:100px;background:yellow;position:absolute;left:500px;border:1px solid #ccc;'>3</div>
      <div v-dragme = 'dragConfig1' style = 'height:100px;width:100px;background:yellow;position:absolute;left:600px;border:1px solid #ccc;'>4</div>
    </div>
  </div>
</template>

<script>
import HelloWorld from './components/HelloWorld.vue'

export default {
  name: 'app',
  data(){
    return {
      dragConfig1: {
        gridX: 0,//x轴栅格
        gridY: 0,//y轴栅格
        checkTouch: true,//检测碰撞
        locked: false,//锁
        changePosition: false,//位置交换
        isBackStartPoint: false,//拖拽完成回到起点
        noOverLap: true,//拖拽时所有元素不重叠
        limitPar: false,//限制只在父元素中拖拽
        limitX: false,//限制只在X轴拖拽
        limitY: false,//限制只在Y轴拖拽
      },
      dragConfig2: {
        gridX: 50,//x轴栅格
        gridY: 50,//y轴栅格
        checkTouch: true,//检测碰撞
        locked: false,//锁
        changePosition: false,//位置交换
        isBackStartPoint: false,//拖拽完成回到起点
        noOverLap: true,//拖拽时所有元素不重叠
        limitPar: true,//限制只在父元素中拖拽
        limitX: false,//限制只在X轴拖拽
        limitY: false,//限制只在Y轴拖拽
      }
    }
  },
  mounted(){
    setTimeout(() => {
      // alert(1);
      // this.dragConfig2.locked = true;
    },5000)
  },
  methods:{
      
  },
  components: {
    HelloWorld
  }
}
</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
  position:relative;
  height:300px;
  border:1px solid #ccc;
}
.__beTouched__{
  /* border:2px solid #000; */
}
</style>
