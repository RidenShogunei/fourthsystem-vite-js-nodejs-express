import { createApp } from 'vue'
import App from './App.vue'
import Antd from 'ant-design-vue';
import router from './router'
import store from './store' 
const app = createApp(App)
if (localStorage.getItem("localstate") === "1") {
    store.commit("changestate", Number(localStorage.getItem("localstate")));
}
app.use(router).use(store).use(Antd).mount('#app')
document.title = "四系统";
