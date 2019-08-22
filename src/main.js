import Vue from 'vue'
import App from './App.vue'
import drag from './directive/drag.js';

Vue.use(drag);

Vue.config.productionTip = false

new Vue({
  render: h => h(App),
}).$mount('#app')
