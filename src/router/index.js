import Vue from 'vue'
import VueRouter from 'vue-router'
import HintPortal from '../views/HintPortal.vue'
import GamemasterPortal from '../views/GamemasterPortal.vue'

Vue.use(VueRouter);

const routes = [
  {
    path: '/',
    name: 'gamemaster-portal',
    component: GamemasterPortal,
  },
  {
    path: '/hint-portal',
    name: 'hint-portal',
    component: HintPortal,
    props: true,
    beforeEnter: (to, from, next) => {
      if (to.params.game) {
        next();
      } else {
        next({name: 'gamemaster-portal'})
      }
    }
  },
]

const router = new VueRouter({
  mode: 'history',
  routes
})

export default router