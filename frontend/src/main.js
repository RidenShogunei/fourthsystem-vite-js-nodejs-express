import { createApp } from 'vue'
import App from './App.vue'
import Antd from 'ant-design-vue';
import router from './router'
import store from './store' 
const app = createApp(App)
app.use(router).use(store).use(Antd).mount('#app')
document.title = "四系统";
