import { createRouter, createWebHashHistory } from "vue-router";
import api from '../api/getuser';
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
router.beforeEach(async (to, from, next) => {
  const uid =  localStorage.getItem("uid");

  // 使用uid调用你的API来验证用户身份
  try {
    if (uid) {
      let user = await api.getuserapi({ uid: uid }); // 调用getuserapi
      if (user.code === 200&&to.path !== '/') { // 假设code为200表示用户存在
        console.log("前置路由拿到", uid);
        store.commit("changename", { name: user.data.name });
        next();
      }else if(to.path === '/'&&user.code === 200){
        store.commit("changename", { name: user.data.name });
        next('/main');
      } else {
        throw new Error('User does not exist');
      }
    } else {
      throw new Error('UID not found in local storage');
    }
  } catch (error) {
    console.error(error);
    if (to.path !== '/') {
      next("/"); // 如果用户不存在，则跳转到登录页，除非已经在登录页
    } else {
      next(); // 如果已经在登录页，不重定向，直接放行
    }
  }
});

export default router;
