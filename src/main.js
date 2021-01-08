import { createApp } from 'vue';
import App from './App.vue';
import router from './router';
import 'bootstrap/dist/css/bootstrap.min.css';

document.title = 'MEVN';
createApp(App)
  .use(router)
  .mount('#app');
