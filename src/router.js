// Code for the router
import { createRouter, createWebHistory } from 'vue-router';

import ClickerGame from './views/ClickerGame.vue';
import Home from './views/Home.vue';

// Create a new router
export default createRouter({
    // Use the HTML5 history mode for cleaner URLs
    history: createWebHistory(),
    // Define the routes
    routes: [
        {
            component: Home,
            path: '/'
        },
        {
            component: ClickerGame,
            path: '/clicker-game'
        }
    ]
});
