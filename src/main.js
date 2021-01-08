import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "@store";
import "./styles/reset.css";
import "./styles/iconfont.css";
import "./plugins/element.js";
import "./assets/my/iconfont/plus/iconfont"
import "./styles/main/main.stylus"

Vue.config.productionTip = false;
//引入图标字体
import './style/iconfont.css'

new Vue({
  render: h => h(App),
  router,
  store
}).$mount("#app");
