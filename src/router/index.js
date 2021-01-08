import Vue from "vue";
import VueRouter from "vue-router";
const Djradio = () => import("@views/djradio");
const Category = () => import("@views/category");
const Artist = () => import("@views/artist");
const UserHome = () => import("@views/UserHome");
const Discover = () => import("@views/discover");
const NavCont = () => import("@views/artist/navCont");
const SingerTypeCont = () => import("@views/artist/singerTypeCont");
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
      path: "/user/home",
      component: UserHome
    }
  ]
});
export default router;
