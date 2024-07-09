import { createRouter, createWebHistory } from 'vue-router';
import MainTrackSearch from '../components/main/MainTrackSearch.vue';
import NotFound from '../components/main/NotFound.vue';

const routes = [
  {
      path: '/',
      redirect: '/music-match'
  },
  {
    path: '/music-match/',
    name: 'Home',
    component: MainTrackSearch
  },
  {
     path: "/notFound",
     name: "notFound",
     component: NotFound
   },
   {
     path: "/:pathMatch(.*)*",
     redirect: "/notFound"
   }
];

const router = createRouter({
  history: createWebHistory(),
  routes
});

export default router;