import { createWebHistory, createRouter } from 'vue-router'
import Home from '../pages/client/Home.vue'
import About from '../pages/client/About.vue'
import Product from '../pages/client/Product.vue'
import Categories from '../pages/client/Categories.vue'
import DefaultLayout from '../pages/client/DefaultLayout.vue'
import AdminLayout from '../pages/admin/AdminLayout.vue'
import Dashboard from '../pages/admin/Dasboard.vue'
import Statistics from '../pages/admin/Statistics.vue'
import Users from '../pages/admin/Users.vue'
import Posts from '../pages/admin/Posts.vue'
import Comments from '../pages/admin/Comments.vue'
import Products from '../pages/admin/Products.vue'
import Orders from '../pages/admin/Orders.vue'
import AdminCategories from '../pages/admin/Categories.vue'


const routes = [
  {
    path: '/',
    component: DefaultLayout,
    children: [ 
      { path: '', component: Home },
      { path: '/about', component: About },
      { path: '/products', component: Product },
      { path: '/categories', component: Categories },
      { path: '/contact', component: () => import('../pages/client/Contact.vue') },
    ]  
  },
  {
    path: '/quantri',
    component: AdminLayout,
    children: [
      { path: '/admin/dashboard', component: Statistics },
      { path: '/admin/users', component: Users },
      { path: '/admin/posts', component: Posts },
      { path: '/admin/comments', component: Comments },
      { path: '/admin/products', component: Products },
      { path: '/admin/orders', component: Orders },
      { path: '/admin/categories', component: AdminCategories },
    ]
  }
]


export const router = createRouter({
  history: createWebHistory(),
  routes,
})