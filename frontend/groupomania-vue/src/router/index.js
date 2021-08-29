import { createRouter, createWebHashHistory } from "vue-router";
import home from "../views/home.vue";


const routes = [
  { 
    path: "/", 
    name: "home",
    component: home, 
  },
  { 
    path: "/createAcc",
    name: "createAcc", 
    component: () =>
    import(/* webpackChunkName: "about" */ "../views/CreateAcc.vue"),
  },
  {
    path: "/login",
    name: "login",
    component: () =>
      import(/* webpackChunkName: "about" */ "../views/login.vue"),
  },
  {
    path: "/forum",
    name: "forum",
    component: () =>
      import(/* webpackChunkName: "about" */ "../views/forum.vue"),
    beforeEnter: (to, from, next) => {
      let token = localStorage.getItem("token");
      if (token) {
        next();
      } else {
        next({ name: "login" });
      }
    },
  },
  {
    path: "/profile",
    name: "profiel",
    component: () =>
      import(/* webpackChunkName: "about" */ "../views/profile.vue"),
    beforeEnter: (to, from, next) => {
      let token = localStorage.getItem("token");
      if (token) {
        next();
      } else {
        next({ name: "login" });
      }
    },
  },
  {
    path: "/onePost/:id",
    name: "onePost",
    component: () =>
      import(/* webpackChunkName: "about" */ "../components/onePost.vue"),
    beforeEnter: (to, from, next) => {
      let token = localStorage.getItem("token");
      if (token) {
        next();
      } else {
        next({ name: "login" });
      }
    },
  },
]

const router = createRouter({
  history: createWebHashHistory(),
  routes,
})

export default router;