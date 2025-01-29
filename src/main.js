import { createApp } from 'vue';
import './style.css';
import App from './App.vue';
import router from './router';

// Bootstrap CSS
import 'bootstrap/dist/css/bootstrap.css';
// BootstrapVue 3 styles (om du använder BootstrapVue-specifika komponenter)
import 'bootstrap-vue-3/dist/bootstrap-vue-3.css';

import BootstrapVue3 from 'bootstrap-vue-3';

createApp(App).use(router).use(BootstrapVue3).mount('#app');
