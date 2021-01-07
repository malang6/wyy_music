import Vue from 'vue'
import App from './App.vue'
import store from '@store/'
import router from './router'
import './styles/reset.css'
import './plugins/element.js'

Vue.config.productionTip = false

new Vue({
  render: h => h(App),
  store,
  router
}).$mount('#app')
