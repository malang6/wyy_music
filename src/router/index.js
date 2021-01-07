import Vue from 'vue'
import VueRouter from 'vue-router'
const Discover = () => import('@views/Discover/Discover/Discover')
const Toplist = () => import('@views/Discover/Toplist/Toplist')
Vue.use(VueRouter)

// 重写push
const push = VueRouter.prototype.push
VueRouter.prototype.push = function (location, onComplete) {
  return push.call(this, location, onComplete, () => { })
}
// 重写replace
const replace = VueRouter.prototype.replace
VueRouter.prototype.replace = function (location, onComplete) {
  return replace.call(this, location, onComplete, () => { })
}

const router = new VueRouter({
  routes: [
    {
      path: '/',
      component: Discover
    },
    {
      path: '/toplist',
      component: Toplist
    }
  ],
  scrollBehavior () {
    return { x: 0, y: 0 }
  }
})
export default router