import { createRouter, createWebHistory } from 'vue-router'

import ClickerGame from './views/ClickerGame.vue'
import Home from './views/Home.vue'
import Notes from './views/Notes.vue'

export default createRouter({
  history: createWebHistory(),

  routes: [
    {
      component: Home,
      path: '/'
    },
    {
      component: ClickerGame,
      path: '/clicker-game'
    },
    {
      component: Notes,
      path: '/notes'
    }
  ]
})
