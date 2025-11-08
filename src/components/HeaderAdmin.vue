<template>
  <nav class="navbar navbar-expand-lg navbar-dark bg-dark shadow">
    <div class="container-fluid">
      <RouterLink class="navbar-brand fw-bold fs-4" to="/admin/dashboard">
        <i class="bi bi-cup-hot-fill text-success me-2"></i>
        NhutDuy Admin
      </RouterLink>

      <button 
        class="navbar-toggler" 
        type="button" 
        data-bs-toggle="collapse" 
        data-bs-target="#adminNavbar"
        aria-controls="adminNavbar" 
        aria-expanded="false" 
        aria-label="Toggle navigation"
      >
        <span class="navbar-toggler-icon"></span>
      </button>

      <div class="collapse navbar-collapse" id="adminNavbar">
        <ul class="navbar-nav me-auto mb-2 mb-lg-0">
          <li class="nav-item">
            <RouterLink class="nav-link" to="/admin/dashboard">
              <i class="bi bi-speedometer2 me-1"></i>Dashboard
            </RouterLink>
          </li>
          <li class="nav-item">
            <RouterLink class="nav-link" to="/admin/users">
              <i class="bi bi-people me-1"></i>User Management
            </RouterLink>
          </li>
          <li class="nav-item">
            <RouterLink class="nav-link" to="/admin/posts">
              <i class="bi bi-file-earmark-text me-1"></i>Post Management
            </RouterLink>
          </li>
          <li class="nav-item">
            <RouterLink class="nav-link" to="/admin/comments">
              <i class="bi bi-chat-dots me-1"></i>Comment Management
            </RouterLink>
          </li>
          <li class="nav-item dropdown">
            <a class="nav-link dropdown-toggle" href="#" role="button" data-bs-toggle="dropdown">
              <i class="bi bi-cup-hot me-1"></i>Coffee Shop
            </a>
            <ul class="dropdown-menu">
              <li><RouterLink class="dropdown-item" to="/admin/products"><i class="bi bi-box-seam me-2"></i>Product Management</RouterLink></li>
              <li><RouterLink class="dropdown-item" to="/admin/orders"><i class="bi bi-cart me-2"></i>Order Management</RouterLink></li>
              <li><RouterLink class="dropdown-item" to="/admin/categories"><i class="bi bi-tags me-2"></i>Category Management</RouterLink></li>
              <li><hr class="dropdown-divider"></li>
              <li><RouterLink class="dropdown-item" to="/admin/settings"><i class="bi bi-gear me-2"></i>Settings</RouterLink></li>
            </ul>
          </li>
        </ul>
        <ul class="navbar-nav">
          <li class="nav-item me-3">
            <form class="d-flex" @submit.prevent="handleSearch">
              <div class="input-group input-group-sm">
                <input 
                  class="form-control" 
                  type="search" 
                  placeholder="Search..." 
                  v-model="searchQuery"
                  style="width: 200px;"
                >
                <button class="btn btn-outline-success" type="submit">
                  <i class="bi bi-search"></i>
                </button>
              </div>
            </form>
          </li>

          <li class="nav-item dropdown me-3">
            <a class="nav-link position-relative" href="#" role="button" data-bs-toggle="dropdown">
              <i class="bi bi-bell fs-5"></i>
              <span class="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger" style="font-size: 0.7em;">
                {{ notifications.length }}
              </span>
            </a>
            <ul class="dropdown-menu dropdown-menu-end" style="width: 300px;">
              <li><h6 class="dropdown-header">Notifications</h6></li>
              <li v-for="notification in notifications" :key="notification.id">
                <a class="dropdown-item" href="#">
                  <div class="d-flex">
                    <div class="flex-shrink-0">
                      <i :class="notification.icon" class="text-success"></i>
                    </div>
                    <div class="flex-grow-1 ms-2">
                      <h6 class="mb-1 small">{{ notification.title }}</h6>
                      <p class="mb-1 small text-muted">{{ notification.message }}</p>
                      <small class="text-muted">{{ notification.time }}</small>
                    </div>
                  </div>
                </a>
              </li>
              <li><hr class="dropdown-divider"></li>
              <li><a class="dropdown-item text-center" href="#">View all notifications</a></li>
            </ul>
          </li>

          <li class="nav-item dropdown">
            <a class="nav-link dropdown-toggle" href="#" role="button" data-bs-toggle="dropdown">
              <img 
                :src="user.avatar" 
                alt="User Avatar" 
                class="rounded-circle me-2" 
                width="32" 
                height="32"
              >
              {{ user.name }}
            </a>
            <ul class="dropdown-menu dropdown-menu-end">
              <li><h6 class="dropdown-header">{{ user.role }}</h6></li>
              <li><a class="dropdown-item" href="#"><i class="bi bi-person me-2"></i>Profile</a></li>
              <li><a class="dropdown-item" href="#"><i class="bi bi-gear me-2"></i>Settings</a></li>
              <li><a class="dropdown-item" href="#"><i class="bi bi-question-circle me-2"></i>Help</a></li>
              <li><hr class="dropdown-divider"></li>
              <li><RouterLink class="dropdown-item" to="/"><i class="bi bi-house me-2"></i>View Store</RouterLink></li>
              <li><a class="dropdown-item text-danger" href="#" @click="handleLogout"><i class="bi bi-box-arrow-right me-2"></i>Logout</a></li>
            </ul>
          </li>
        </ul>
      </div>
    </div>
  </nav>

  <nav aria-label="breadcrumb" class="bg-light py-2">
    <div class="container-fluid">
      <ol class="breadcrumb mb-0">
        <li class="breadcrumb-item">
          <RouterLink to="/admin/dashboard" class="text-decoration-none">
            <i class="bi bi-house me-1"></i>Dashboard
          </RouterLink>
        </li>
        <li v-for="(crumb, index) in breadcrumbs" :key="index" class="breadcrumb-item" :class="{ active: index === breadcrumbs.length - 1 }">
          <RouterLink v-if="index !== breadcrumbs.length - 1" :to="crumb.path" class="text-decoration-none">
            {{ crumb.name }}
          </RouterLink>
          <span v-else>{{ crumb.name }}</span>
        </li>
      </ol>
    </div>
  </nav>
</template>

<script setup>
import { ref } from 'vue'
import { RouterLink } from 'vue-router'

const searchQuery = ref('')

const user = ref({
  name: 'Admin User',
  role: 'Administrator',
  avatar: 'https://ui-avatars.com/api/?name=Admin+User&background=198754&color=fff'
})

const notifications = ref([
  {
    id: 1,
    title: 'New Order',
    message: 'Order #1234 has been placed',
    time: '2 minutes ago',
    icon: 'bi bi-cart-plus text-success'
  },
  {
    id: 2,
    title: 'Low Stock Alert',
    message: 'Ethiopian Coffee is running low',
    time: '15 minutes ago',
    icon: 'bi bi-exclamation-triangle text-warning'
  },
  {
    id: 3,
    title: 'Customer Review',
    message: 'New 5-star review received',
    time: '1 hour ago',
    icon: 'bi bi-star-fill text-warning'
  }
])

const breadcrumbs = ref([])

const handleSearch = () => {
  if (searchQuery.value.trim()) {
    console.log('Searching for:', searchQuery.value)
  }
}

const handleLogout = () => {
  if (confirm('Are you sure you want to logout?')) {
    console.log('Logging out...')
  }
}
</script>

<style scoped>
.navbar-nav .nav-link {
  transition: all 0.3s ease;
}

.navbar-nav .nav-link:hover {
  background-color: rgba(255, 255, 255, 0.1);
  border-radius: 0.375rem;
}

.dropdown-menu {
  border: none;
  box-shadow: 0 0.5rem 1rem rgba(0, 0, 0, 0.15);
}

.badge {
  font-size: 0.6em;
}

.breadcrumb-item + .breadcrumb-item::before {
  content: var(--bs-breadcrumb-divider, ">") !important;
}
</style>