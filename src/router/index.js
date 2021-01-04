import Vue from "vue"
import VueRouter from "vue-router"

import My from "./My"

Vue.use(VueRouter)

export default new VueRouter({
    routes: [
        ...My
    ]
})