import Vue from "vue";
import VueRouter from "vue-router";

// import Header from "@comps/Header"
// import UserHome from "@views/UserHome"
import User from "@views/User"
import UHome from "@views/User/UHome"
import UEvent from "@views/User/UEvent"
import UFollow from "@views/User/UFollow"

import SearchSong from "@views/SearchSong"
import Discover from '@views/Discover'
//重写$router的push和replace方法(解决编程式导航重复点击时报错问题)
const push = VueRouter.prototype.push;
VueRouter.prototype.push = function (location, onComplate, onAbort) {
    if (onComplate && onAbort) {
        return push.call(this, location, onComplate, onAbort)
    }
    return push.call(this, location, () => { }, () => { })
}

const replace = VueRouter.prototype.replace;
VueRouter.prototype.replace = function (location, onComplate, onAbort) {
    if (onComplate && onAbort) {
        return replace.call(this, location, onComplate, onAbort)
    }
    return replace.call(this, location, () => { }, () => { })
}

Vue.use(VueRouter);
const router = new VueRouter({
    routes: [
        {
            path: "/",
            component: Discover,
        },
        {
            path: "/user",
            component: User,
            children:[
                {
                    name:'home',
                    path:'home',
                    component:UHome
                },
                {
                    name:'event',
                    path:'event',
                    component:UEvent
                },
                {
                    name:'follows',
                    path:'follows',
                    component:UFollow
                },
                {
                    name:'fans',
                    path:'fans',
                    component:UFollow
                }
            ]
          
        },
        {
            path: "/search/m/",
            component: SearchSong
        }
    ],
    scrollBehavior() {
        return { x: 0, y: 0 }
    }
})
export default router