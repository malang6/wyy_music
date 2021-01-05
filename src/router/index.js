import Vue from 'vue'
import VueRouter from 'vue-router'
const Djradio = () => import('@views/djradio')
const Category = () => import('@views/category')
const push = VueRouter.prototype.push
VueRouter.prototype.push = function(location, onComplete, onAbort) {
  if (onComplete && onAbort) {
    return push.call(this, location, onComplete, onAbort)
  }
  return push.call(this, location, onComplete, () => {})
}
VueRouter.prototype.replace = function(location, onComplete, onAbort) {
  if (onComplete && onAbort) {
    return push.call(this, location, onComplete, onAbort)
  }
  return push.call(this, location, onComplete, () => {})
}
Vue.use(VueRouter)
const router = new VueRouter({
  routes: [
    {
      path: '/',
      component: Djradio,
      children: [
        {
          name: 'category',
          path: '/category',
          component: Category,
        },
      ],
    },
  ],
})
export default router
