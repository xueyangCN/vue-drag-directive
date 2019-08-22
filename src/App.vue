<template>
  <div id="app">
    <HelloWorld style = 'height:150px;width:150px;background:green;' v-dragme = 'dragConfig1' msg="Welcome to Your Vue.js App"/>
    <HelloWorld style = 'left:300px;' v-dragme = 'dragConfig2' msg="Welcome to Your Vue.js App"/>
    <div style = 'margin-top:300px;margin-left:100px;background:#eee;position:relative;'>
      <div id = 'os' v-dragme style = 'height:100px;width:100px;background:yellow;position:absolute;left:300px;'></div>
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
      },
      dragConfig2: {
        gridX: 50,//x轴栅格
        gridY: 50,//y轴栅格
        checkTouch: true,//检测碰撞
        locked: false,//锁
        changePosition: false,//位置交换
        isBackStartPoint: true,//拖拽完成回到起点
      }
    }
  },
  mounted(){
    setTimeout(() => {
      // alert(1);
      this.dragConfig1.locked = true;
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
  border:2px solid #000;
}
</style>
