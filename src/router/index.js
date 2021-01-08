import Vue from 'vue'
import VueRouter from 'vue-router'
Vue.use(VueRouter)
import Playlist from '../views/discover/playlist.vue'
import PlaylistID from '../views/discoverID/playlistID.vue'
import NewCD from '../views/newCD/newCD.vue'
import Newcdinfo from '../views/newcdinfo/newcdinfo.vue'
const router = new VueRouter({

    //定义路由配置
    routes: [
        {
            name: 'Playlist',
            path: '/top/playlist',
            component: Playlist
        },
        {
            mame: 'PlaylistID',
            path: '/playlist',
            component: PlaylistID
        },
        {
            name: 'NewCD',
            path: '/newcd',
            component: NewCD
        },
        {
            name: 'Newcdinfo',
            path: '/album',
            component: Newcdinfo
        }

    ]
})


export default router