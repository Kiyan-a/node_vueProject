import Vue from "vue";
import VueRouter from "vue-router";
import Index from "../views/Index.vue";
import Register from "../views/Register.vue";
import Login from "../views/Login.vue";

Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    redirect: "/index/subpage",
  },
  {
    path: "/index",
    name: "index",
    component: Index,
    children: [
      {
        path: "subpage",
        name: "subpage",
        component: () => import("../views/viewAge/indexSubpage.vue"),
      },
      {
        path: "dataman",
        name: "DataMan",
        component: () => import("../views/viewAge/DataMan.vue"),
      },
      {
        path: "information",
        name: "InforMation",
        component: () => import("../views/viewAge/inforMation.vue"),
      },
      {
        path: "setup",
        name: "SetUp",
        component: () => import("../views/viewAge/setUp.vue"),
      },
    ],
  },
  {
    path: "/register",
    name: "register",
    component: Register,
  },
  {
    path: "/login",
    name: "Login",
    component: Login,
  },
  {
    path: "*",
    name: "notfound",
    component: () => import("../views/404.vue"),
  },
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes,
});
// 路由守卫;
router.beforeEach((to, from, next) => {
  const isLogin = localStorage.eleToken ? true : false;
  if (to.path == "/login" || to.path == "/register") {
    next();
  } else {
    isLogin ? next() : next("/login");
  }
});

export default router;
