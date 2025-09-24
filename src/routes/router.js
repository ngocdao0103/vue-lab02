import { createWebHistory , createRouter } from 'vue-router'

import Home from '../pages/client/Home.vue'
import About from '../pages/client/About.vue'
import Contact from '../pages/client/Contact.vue'
import Product from '../pages/client/Product.vue'

const routes = [
  { path: '/', component: Home },
  { path: '/about', component: About },
  { path: '/contact', component: Contact },
  { path: '/product', component: Product },
]

export const router = createRouter({
  history: createWebHistory(),
  routes,
})