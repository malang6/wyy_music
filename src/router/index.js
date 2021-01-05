import Vue from "vue";
import VueRouter from "vue-router";
const Djradio = () => import("@views/djradio");
const Category = () => import("@views/category");
const Artist = () => import("@views/artist");
const UserHome = () => import("@views/UserHome");
const push = VueRouter.prototype.push;
VueRouter.prototype.push = function(location, onComplete, onAbort) {
  if (onComplete && onAbort) {
    return push.call(this, location, onComplete, onAbort);
  }
  return push.call(this, location, onComplete, () => {});
};
VueRouter.prototype.replace = function(location, onComplete, onAbort) {
  if (onComplete && onAbort) {
    return push.call(this, location, onComplete, onAbort);
  }
  return push.call(this, location, onComplete, () => {});
};
Vue.use(VueRouter);
const router = new VueRouter({
  routes: [
    {
      path: "/",
      // component:Discover,
      // component:Header,
      children: [
        {
          path: "/djradio",
          component: Djradio,
          children: [
            {
              name: "category",
              path: "category",
              component: Category
            }
          ]
        },
        {
          name: "artist",
          path: "/artist",
          component: Artist
        }
        // {
        //     path: '/album',
        //     component: Album,
        // }
      ]
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
      path: "/user/home",
      component: UserHome
    }
  ]
});
export default router;
