import Vue from "vue"
import VueRouter from "vue-router"

import My from "./my"
import Friend from "./friend"

Vue.use(VueRouter)

export default new VueRouter({
        routes: [
                ...My,
                ...Friend
        ]
})