import Vue from "vue";
import VueRouter from "vue-router";

import Header from "@comps/Header"
import UserHome from "@views/UserHome"
Vue.use(VueRouter);
const router = new VueRouter({
    routes:[
        {
            path:"/",
            // component:Discover,
            component:Header,
            // children: [
            //     {
            //       path: '/discover',
            //       component: Discover,
            //     },
            //     {
            //         path: '/toplist',
            //         component: Toplist,
            //     },
            //     {
            //         path: '/playlist',
            //         component: Playlist,
            //     },
            //     {
            //         path: '/playlist',
            //         component: Playlist,
            //     },
            //     {
            //         path: '/djradio',
            //         component: Djradio,
            //     },
            //     {
            //         path: '/artist',
            //         component: Artist,
            //     },
            //     {
            //         path: '/album',
            //         component: Album,
            //     }
            // ]
        },
        // {
        //     path:"/my/m/music/playlist",
        //     component:MyMusic
        // },
        // {
        //     path:"/friend",
        //     component:Friend
        // },
        {
            path:"/user/home",
            component:UserHome,
        }
    ]
})
export default router