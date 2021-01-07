import Vue from "vue";
import VueRouter from "vue-router";

import Header from "@comps/Header"
import UserHome from "@views/UserHome"
import Friend from "@views/Friend"
import My from "@views/My"
import Artist from "@views/My/Artist"
import Edit from "@views/My/Edit"
import PlayList from "@views/My/PlayList"
import Radio from "@views/My/Radio"

//重写push
const push = VueRouter.prototype.push
VueRouter.prototype.push = function (localtion, ontemplate, onAbort = () => { }) {
    return push.call(this, localtion, ontemplate, onAbort)
}

Vue.use(VueRouter);
const router = new VueRouter({
    routes: [
        {
            path: "/",
            // component:Discover,
            component: Header,
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
        {
            path: "/friend",
            component: Friend
        },
        {
            path: "/my",
            component: My,
            children: [
                {
                    name: "artist",
                    path: "artist",
                    component: Artist
                },
                {
                    path: "edit",
                    component: Edit
                },
                {
                    path: "playList",
                    component: PlayList
                },
                {
                    path: "radio",
                    component: Radio
                },
                {
                    path: "",
                    redirect: "artist"
                },
            ]
        },
        {
            path: "/user/home",
            component: UserHome,
        }
    ]
})
export default router
