<<<<<<< HEAD
import Vue from 'vue'
import App from './App.vue'
import './styles/reset.css'
<<<<<<< HEAD
=======
import './styles/iconfont.css'
>>>>>>> malang
=======
import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "@store";
import "./styles/reset.css";
import "./styles/iconfont.css";
import "./plugins/element.js";
import "./assets/my/iconfont/plus/iconfont";
import "./styles/main/main.stylus";
>>>>>>> malang

Vue.config.productionTip = false;

new Vue({
  render: h => h(App),
  router,
  store
}).$mount("#app");
