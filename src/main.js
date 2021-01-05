import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import './styles/reset.css'
import './plugins/element'
import VueLazyLoad from 'vue-lazyload'
import './plugins/element.js'
Vue.use(VueLazyLoad)
Vue.config.productionTip = false

new Vue({
  render: (h) => h(App),
  router,
  store,
}).$mount('#app')
