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
    redirect: '/admin/games',
    name: 'admin-portal',
    component: AdminPortal,
    children: [
      {
        path: 'games',
        name: 'admin-games',
        component: AdminGames,
      },
      {
        path: 'games/:itemId/puzzles',
        name: 'admin-game-puzzles',
        component: AdminPuzzles,
        props: route => ({
            itemId: route.params.itemId,
            itemName: route.params.itemName,
            itemTypeProp: route.params.itemType
          })
      },
      {
        path: 'puzzles',
        name: 'admin-puzzles',
        component: AdminPuzzles,
      },
      {
        path: 'puzzles/:itemId/clues',
        name: 'admin-puzzle-clues',
        component: AdminClues,
        props: route => ({
            itemId: route.params.itemId,
            itemName: route.params.itemName,
            itemTypeProp: route.params.itemType
          })
      },
      {
        path: 'puzzles/:itemId/hints',
        name: 'admin-puzzle-hints',
        component: AdminHints,
        props: route => ({
            itemId: route.params.itemId,
            itemName: route.params.itemName,
            itemTypeProp: route.params.itemType
          })
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
    redirect: '/gamemaster-portal',
  },
  {
    path: '/gamemaster-portal',
    name: 'gamemaster-portal',
    component: GamemasterPortal,
  },
  {
    path: '/hint-portal',
    name: 'hint-portal',
    component: HintPortal,
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