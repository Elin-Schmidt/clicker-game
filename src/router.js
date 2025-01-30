// Code for the router
import { createRouter, createWebHistory } from 'vue-router';

import ClickerGame from './views/ClickerGame.vue';
import Home from './views/Home.vue';
import Notes from './views/Notes.vue';
import TwitchCalendar from './views/TwitchCalendar.vue';

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
        },
        {
            component: Notes,
            path: '/notes'
        },
        {
            component: TwitchCalendar,
            path: '/twitch-calendar'
        }
    ]
});
