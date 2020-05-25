import Vue from 'vue'
import VueRouter from 'vue-router'
// import store from '../store'

const Index = () => import('../pages/Index')

Vue.use(VueRouter)

export const routes = [
  { name: 'Index', path: '/', component: Index },
  { path: '*', component: Index }
]

const router = new VueRouter({
  mode: 'history',
  scrollBehavior: () => ({ y: 0 }),
  routes
})
router.beforeEach((to, from, next) => {
  // const { path } = to
  // if (path !== '/' && path !== '/login' && store.state.nickName === '') {
  //   next('/login')
  //   return
  // }
  // console.log(to);
  // console.log(store.state.nickName);
  next()
})

export default router
