<template>
    <div id="app">
        <div class = 'left'>
            <div style = 'position: relative;height:50px;'>
                <dragItem v-dragme = 'dragConfig1' type = '1'/>
            </div>
            <div style = 'position: relative;height:50px;'>
                <dragItem v-dragme = 'dragConfig1' type = '2'/>
            </div>
        </div>
        <div class = 'right'>
            <mains v-dragme = 'dragConfig2' />
        </div>
    </div>
</template>

<script>
import HelloWorld from './components/HelloWorld.vue'
import dragItem from './components/item.vue'
import mains from './components/main.vue'

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
        isBackStartPoint: true,//拖拽完成回到起点
        noOverLap: false,//拖拽时所有元素不重叠
        limitPar: false,//限制只在父元素中拖拽
        limitX: false,//限制只在X轴拖拽
        limitY: false,//限制只在Y轴拖拽
      },
      dragConfig2: {
        checkTouch: true,//检测碰撞
        locked: true,//锁
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
    HelloWorld,
    dragItem,
    mains
  }
}
</script>

<style scoped>
*{
    box-sizing: border-box;
}
#app{
    height:100%;
}
.left{
    height:500px;
    width:300px;
    float:left;
    margin: 50px;
    border:1px solid #ccc;
    position: relative;
    padding:20px;
}
.right{
    height:500px;
    border:1px solid #ccc;
    width:600px;
    float:left;
    margin: 50px;
    position: relative;
}
</style>
