import Vue from 'vue'
import App from './App.vue'
//引element-ui
import './plugins/element'
//引入路由
import router from './router'
Vue.config.productionTip = false


//引入图标字体
import './style/iconfont.css'

new Vue({
  render: h => h(App),
  //应用路由
  router
}).$mount('#app')
