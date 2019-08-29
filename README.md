参数
```javascript
dragConfig: {
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
  anchorPoint: null,//锚点(原生 dom对象)
  dragPoint0: false,//锚点拖拽时，位置跟踪鼠标
}
```
例子 demo.vue
```javascript
<template>
  <div>
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
        anchorPoint: null,//锚点
        dragPoint0: false,//锚点拖拽时，位置跟踪鼠标
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
        anchorPoint: null,//锚点
        dragPoint0: false,//锚点拖拽时，位置跟踪鼠标
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
.__beTouched__{
  /* border:2px solid #000; */
}
</style>

```
HelloWorld.vue

```javascript
<template>
  <div class="hello">
    <span v-if = 'beTouched_'>被碰撞了</span>
  </div>
</template>

<script>
export default {
  data(){
    return {
      num: '',
      beTouched_: false
    }
  },
  methods:{
    __beInsert__(pos,el,vueEl){//拖拽结束是否有元素进入
      console.log(pos,el,vueEl);//拖入元素在本元素中的相对位置、拖入元素dom、拖入元素vue实例
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

```
