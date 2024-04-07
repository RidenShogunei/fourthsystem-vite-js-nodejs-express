import { createRouter, createWebHashHistory } from "vue-router";
import store from '../store' 
const routes = [
  {
    path: "/",
    component: () => import("../view/login/loginPage.vue"),
  },
  {
    path: "/main",
    name: "main",
    component: () => import("../view/main.vue"),
  },
];

const router = createRouter({
  history: createWebHashHistory(),
  routes,
});

router.beforeEach((to, from, next) => {
  const loggedIn = store.state.state;
  if (to.path !== "/" && loggedIn !== 1) {
    console.log("前置路由拿到",typeof(loggedIn),loggedIn)
    next("/");
  } else if(to.path === "/"&&loggedIn === 1) {
    console.log("前置路由拿到",typeof(loggedIn),loggedIn)
    store.commit("changename",localStorage.getItem("name"))
    next("/main");
  }else{
    console.log("前置路由拿到",typeof(loggedIn),loggedIn)
    next();
  }
});
export default router;
