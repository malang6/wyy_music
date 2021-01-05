import Vue from "vue";
import VueRouter from "vue-router";
const Djradio = () => import("@views/djradio");
const Category = () => import("@views/category");
const Artist = () => import("@views/artist");
Vue.use(VueRouter);
const router = new VueRouter({
  routes: [
    {
      path: "/",
      component: Djradio,
      children: [
        {
          name: "category",
          path: "/category",
          component: Category
        },
        {
          name: "artist",
          path: "/artist",
          component: Artist
        }
      ]
    }
  ]
});
export default router;
