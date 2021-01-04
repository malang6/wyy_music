import Vue from 'vue'
import App from './App.vue'
import router from "./router"

Vue.config.productionTip = false

import "./assets/my/iconfont/plus/iconfont"

new Vue({
  render: h => h(App),
  router,
}).$mount('#app')
