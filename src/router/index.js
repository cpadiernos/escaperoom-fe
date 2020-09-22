import Vue from 'vue'
import VueRouter from 'vue-router'
import HintPortal from '../views/HintPortal.vue'
import GamemasterPortal from '../views/GamemasterPortal.vue'
import PlayerPortal from '../views/PlayerPortal.vue'
import AdminPortal from '../views/AdminPortal.vue'
import AdminGames from '../views/AdminGames.vue'
import AdminPuzzles from '../views/AdminPuzzles.vue'
import AdminHints from '../views/AdminHints.vue'
import AdminClues from '../views/AdminClues.vue'

Vue.use(VueRouter);

const routes = [
  {
    path: '/admin',
    name: 'admin-portal',
    component: AdminPortal,
    children: [
      {
        path: '',
        name: 'admin-games',
        component: AdminGames,
      },
      {
        path: 'puzzles',
        name: 'admin-puzzles',
        component: AdminPuzzles,
      },
      {
        path: 'clues',
        name: 'admin-clues',
        component: AdminClues,
      },
      {
        path: 'hints',
        name: 'admin-hints',
        component: AdminHints
      }
    ]
  },
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
  {
    path: '/player-portal',
    name: 'player-portal',
    component: PlayerPortal,
    props: true,
  },
]

const router = new VueRouter({
  mode: 'history',
  routes
})

export default router