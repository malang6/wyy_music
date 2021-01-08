import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "@store";
import "./styles/reset.css";
import "./styles/iconfont.css";
import "./plugins/element.js";

Vue.config.productionTip = false;

import VueLazyLoad from "vue-lazyload";
import "./plugins/element.js";
import "./styles/iconfont.css";
Vue.use(VueLazyLoad);
Vue.config.productionTip = false;
new Vue({
  render: h => h(App),
  router,
  store
}).$mount("#app");
