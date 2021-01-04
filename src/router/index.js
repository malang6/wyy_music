import Vue from "vue";
import VueRouter from "vue-router";

Vue.use(VueRouter);
const router = new VueRouter({
    routes:[
        {
            path:"/",
            component:Discover,
            children: [
                {
                  path: '/discover',
                  component: Discover,
                },
                {
                    path: '/toplist',
                    component: Toplist,
                },
                {
                    path: '/playlist',
                    component: Playlist,
                },
                {
                    path: '/playlist',
                    component: Playlist,
                },
                {
                    path: '/djradio',
                    component: Djradio,
                },
                {
                    path: '/artist',
                    component: Artist,
                },
                {
                    path: '/album',
                    component: Album,
                }
            ]
        },
        {
            path:"/my/m/music/playlist",
            component:MyMusic
        },
        {
            path:"/friend",
            component:Friend
        },
        {
            path:"/user/home",
            component:UserHome
        }
    ]
})