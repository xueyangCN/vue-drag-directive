<template>
    <div id="app">
        <div>
            <button @click = 'out'>输出</button>
        </div>
        <div class = 'left' style = ''>
            <div :key = 'index' v-for = '(item,index) in itemModels' style = 'position: relative;height:50px;'>
                <dragItem  :type = 'item.type' :ref = '`item${item.type}`'/>
            </div>
        </div>
        <div class = 'right' style = ''>
            <div style = 'position:absolute;width:100%;z-index:9;top:-10000px;'>
                <component :type = 'item.type' v-dragme = 'item.conf'  :key = 'index' v-for = '(item,index) in itemModels' v-bind:is = 'item.component' />
            </div>
            <mains @beInsert = 'beInsert' ref = 'main' v-dragme = 'dragConfig1' :componentList = 'componentList' />
        </div>
    </div>
</template>

<script>
import HelloWorld from './components/HelloWorld.vue'
import dragItem from './components/item.vue'
import mains from './components/main.vue'
import list from './components/list.vue'
let itemModels = [
    {
        type: '1',
        conf: {
            gridX: 0,//x轴栅格
            gridY: 0,//y轴栅格
            checkTouch: true,//检测碰撞
            isBackStartPoint: true,//拖拽完成回到起点
            anchorPoint: null,
            dragPoint0: true,
            noOverLap: true,//拖拽时所有元素不重叠
        },
        component: HelloWorld
    },
    {
        type: '2',
        conf: {
            gridX: 0,//x轴栅格
            gridY: 0,//y轴栅格
            checkTouch: true,//检测碰撞
            isBackStartPoint: true,//拖拽完成回到起点
            anchorPoint: null,
            dragPoint0: true,
            noOverLap: true,//拖拽时所有元素不重叠
        },
        component: list
    }
]
export default {
  name: 'app',
  data(){
    return {
      dragConfig1: {
        gridX: 0,//x轴栅格
        gridY: 0,//y轴栅格
        checkTouch: true,//检测碰撞
        locked: true,//锁
        changePosition: false,//位置交换
        isBackStartPoint: true,//拖拽完成回到起点
        noOverLap: false,//拖拽时所有元素不重叠
        limitPar: false,//限制只在父元素中拖拽
        limitX: false,//限制只在X轴拖拽
        limitY: false,//限制只在Y轴拖拽
      },
      itemModels: [],
      mainGridW: 0,
      componentList: []
    }
  },
  mounted(){
      this.mainGridW = (this.$refs['main'].$el.offsetWidth)/20;
      setTimeout(() => {
        for(let i in itemModels){
            this.itemModels.push(itemModels[i]);
            this.$nextTick(() => {
                this.itemModels[i].conf.anchorPoint = this.$refs[`item${itemModels[i].type}`][0].$el;
                this.itemModels[i].conf.gridX = this.mainGridW;
                this.itemModels[i].conf.gridY = 20;
            })
        }
      },500)
  },
  methods:{
      out(){
          console.log(this.componentList);
      },
      beInsert(data){
          console.log(data);
          for(let i in this.itemModels){
              if(this.itemModels[i].type == data.type){
                  let conf = {...this.itemModels[i].conf};
                  conf.dragPoint0 = false;
                  conf.noOverLap = true;
                  conf.anchorPoint = null;
                  conf.isBackStartPoint = false;
                  this.componentList.push({
                      pos: data.pos,
                      type: this.itemModels[i].type,
                      conf,
                      component: this.itemModels[i].component
                  });
              }
          }
          
      }
  },
  components: {
    HelloWorld,
    dragItem,
    mains,
    list
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
    width:150px;
    float:left;
    margin: 20px;
    border:1px solid #ccc;
    position: relative;
    padding:20px;
}
.right{
    height:500px;
    border:1px solid #ccc;
    width:902px;
    float:left;
    margin: 20px;
    position: relative;
}
</style>
