import Vue from 'vue'
import App from './App.vue'
import './styles/reset.css'
import store from '@store/'
import './plugins/element.js'

Vue.config.productionTip = false

new Vue({
  render: h => h(App),
  store
}).$mount('#app')
