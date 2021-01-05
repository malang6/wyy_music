import Vue from "vue";
import App from "./App.vue";
import "./styles/reset.css";
import router from "./router";
import store from "./store";

import VueLazyLoad from "vue-lazyload";
import "./plugins/element.js";
import './styles/iconfont.css'
Vue.use(VueLazyLoad);
Vue.config.productionTip = false;
new Vue({
  render: h => h(App),
  router,
  store
}).$mount("#app");
