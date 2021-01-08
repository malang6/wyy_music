import Vue from "vue";
import VueRouter from "vue-router";
const Djradio = () => import("@views/djradio");
const Category = () => import("@views/category");
const Artist = () => import("@views/artist");
const Discover = () => import("@views/discover/Discover");
const Toplist = () => import("../views/TopList/TopList");
const NavCont = () => import("@views/artist/navCont");
const SingerTypeCont = () => import("@views/artist/singerTypeCont");
import User from "@views/User";
import UHome from "@views/User/UHome";
import UEvent from "@views/User/UEvent";
import UFollow from "@views/User/UFollow";

import SearchSong from "@views/SearchSong";
const push = VueRouter.prototype.push;
const replace = VueRouter.prototype.replace;

VueRouter.prototype.push = function(location, onComplete, onAbort) {
  if (onComplete && onAbort) {
    return push.call(this, location, onComplete, onAbort);
  }
  return push.call(this, location, onComplete, () => {});
};
VueRouter.prototype.replace = function(location, onComplete, onAbort) {
  if (onComplete && onAbort) {
    return replace.call(this, location, onComplete, onAbort);
  }
  return replace.call(this, location, onComplete, () => {});
};
Vue.use(VueRouter);
const router = new VueRouter({
  routes: [
    {
      path: "/",
      component: Discover,
      children: [
        {
          path: "discover",
          component: Discover,
          children: [
            {
              name: "djradio",
              path: "djradio",
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
              path: "artist",
              component: Artist,
              children: [
                {
                  name: "recommond",
                  path: "recommond",
                  component: NavCont
                },
                {
                  name: "signed",
                  path: "signed",
                  component: NavCont
                },
                {
                  name: "cat",
                  path: "cat",
                  component: SingerTypeCont
                },
                {
                  path: "",
                  redirect: "recommond"
                }
              ]
            },
            {
              path: "toplist",
              component: Toplist
            }
          ]
        }
      ]
    },
    {
      path: "",
      redirect: Discover
    },
    {
      path: "/user",
      component: User,
      children: [
        {
          name: "home",
          path: "home",
          component: UHome
        },
        {
          name: "event",
          path: "event",
          component: UEvent
        },
        {
          name: "follows",
          path: "follows",
          component: UFollow
        },
        {
          name: "fans",
          path: "fans",
          component: UFollow
        }
      ]
    },
    {
      path: "/search/m/",
      component: SearchSong
    }
  ],
  scrollBehavior() {
    return { x: 0, y: 0 };
  }
});
export default router;
