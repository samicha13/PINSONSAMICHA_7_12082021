import { createWebHistory, createRouter } from "vue-router";
import Login from "@/views/Login.vue";
import Profile from "@/views/profile.vue";
import Home from "@/views/home.vue";
import Forum from '../views/forum';

const routes = [
  {
    path: '/',
    name: 'home',
    component: Home
  },
  { 
    name: 'login',
    path: '/', 
    component: Login,
  },
  { 
    name: 'profile',
    path: '/profile', 
    component: Profile, 
    props:true 
  },
  {
    path: '/forum',
    name: 'Forum',
    component: Forum
  }
]

const router = createRouter({
  history: createWebHistory(),
  routes,
})

export default router;