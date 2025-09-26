import { createWebHistory, createRouter } from 'vue-router'

import Home from '../pages/client/Home.vue'
import About from '../pages/client/About.vue'
import Contact from '../pages/client/Contact.vue'
import Product from '../pages/client/Product.vue'
import Layout from '../pages/admin/Layout.vue'
import Dashboard from '../pages/admin/Dashboard.vue'
import DefaultLayout from '../pages/client/DefaultLayout.vue'

const routes = [
  {
    path: '/',
    component: DefaultLayout,
    children: [
      { path: '/', component: Home },
      { path: '/about', component: About },
      { path: '/contact', component: Contact },
      { path: '/product', component: Product },
    ]
  },
  {
    path: '/admin',
    component: Layout,
    children: [
      { path: '/dashboard', component: Dashboard }
    ]
  }
]

export const router = createRouter({
  history: createWebHistory(),
  routes,
})