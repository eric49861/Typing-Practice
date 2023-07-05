import { createRouter, createWebHashHistory } from 'vue-router';
const routes = [
  {
    path: '/',
    name: 'HomePage',
    component: () => import(/* webpackChunkName: "HomePage" */ '../views/home/HomePage.vue'),
  },
  {
    path: '/typing/:language/:id',
    name: 'Typeing',
    component: () => import(/* webpackChunkName: "TypeMoudle" */ '../views/typeing/Typeing.vue'),
  },
  {
    path: '/finger/practise',
    name: 'Practise',
    component: () => import('../views/typeing/Practise.vue')
  }
]

const router = createRouter({
  history: createWebHashHistory(),
  routes
})

export default router
