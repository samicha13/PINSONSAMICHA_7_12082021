import { createWebHistory, createRouter } from "vue-router";
import Login from "@/views/Login.vue";
import Home from "@/views/home.vue";
import store from "@/store/index.js";


const routes = [
 
  { 
    name: 'login',
    path: '/login', 
    component: Login,
  },
  {
    path: '/',
    name: 'home',
    component: Home
  },
  {
    path: '/home',
    name: 'home',
    component: Home
  },
  { 
    name: 'profile',
    path: '/profile', 
    component: () =>
      import(/* webpackChunkName: "about" */ "../views/profile.vue"),
    beforeEnter: (to, from, next) => {
      if (store.state.user != null) {
        next();
      } else {
        next({ name: 'login' });
      } 
    },
  
  },
  {
    path: '/forum',
    name: 'Forum',
    component: () =>
      import(/* webpackChunkName: "about" */ "../views/forum.vue"),
    beforeEnter: (to, from, next) => {
      if (store.state.user != null) {
        next();
      } else {
        next({ name: 'login' });
      } 
    },
  },
]

const router = createRouter({
  history: createWebHistory(),
  routes,
})

export default router;