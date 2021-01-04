import Vue from "vue"
import Vuex from "vuex"

Vue.use(Vuex)

import modules from "./modules"

const store = new Vue.Store({
    modules
})

export default store
