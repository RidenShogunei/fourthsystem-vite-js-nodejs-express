import { createRouter, createWebHashHistory } from "vue-router";
import Cookies from 'js-cookie';

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
  const loggedIn = Cookies.get('SESSIONID');
  if (to.path !== "/" && !loggedIn) {
    console.log("前置路由拿到",typeof(loggedIn),loggedIn)
    next("/");
  } else if(to.path === "/" && loggedIn ) {
    console.log("前置路由拿到",typeof(loggedIn),loggedIn)
    next("/main");
  }else{
    console.log("前置路由拿到",typeof(loggedIn),loggedIn)
    next();
  }
});
export default router;