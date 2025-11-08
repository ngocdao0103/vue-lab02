<template>
  <footer class="bg-dark text-light py-4 mt-auto">
    <div class="container-fluid">
      <div class="row g-4">
        <div class="col-lg-3 col-md-6">
          <div class="d-flex align-items-center mb-3">
            <i class="bi bi-cup-hot-fill fs-3 text-success me-2"></i>
            <h5 class="mb-0 text-white">Coffee Admin</h5>
          </div>
          <p class="text-light small mb-3">
            Comprehensive management system for Coffee Shop. Easily manage products, orders, customers and content.
          </p>
          <div class="d-flex">
            <a href="#" class="text-muted me-3" title="Facebook">
              <i class="bi bi-facebook fs-5"></i>
            </a>
            <a href="#" class="text-muted me-3" title="Instagram">
              <i class="bi bi-instagram fs-5"></i>
            </a>
            <a href="#" class="text-muted me-3" title="Twitter">
              <i class="bi bi-twitter fs-5"></i>
            </a>
            <a href="#" class="text-muted" title="LinkedIn">
              <i class="bi bi-linkedin fs-5"></i>
            </a>
          </div>
        </div>

        <div class="col-lg-2 col-md-6">
          <h6 class="text-white mb-3">
            <i class="bi bi-link-45deg me-2"></i>Quick Links
          </h6>
          <ul class="list-unstyled">
            <li class="mb-2">
              <RouterLink to="/admin/dashboard" class="text-light text-decoration-none small hover-link">
                <i class="bi bi-speedometer2 me-2 text-success"></i>Dashboard
              </RouterLink>
            </li>
            <li class="mb-2">
              <RouterLink to="/admin/users" class="text-light text-decoration-none small hover-link">
                <i class="bi bi-people me-2 text-success"></i>Users
              </RouterLink>
            </li>
            <li class="mb-2">
              <RouterLink to="/admin/posts" class="text-light text-decoration-none small hover-link">
                <i class="bi bi-file-earmark-text me-2 text-success"></i>Posts
              </RouterLink>
            </li>
            <li class="mb-2">
              <RouterLink to="/admin/comments" class="text-light text-decoration-none small hover-link">
                <i class="bi bi-chat-dots me-2 text-success"></i>Comments
              </RouterLink>
            </li>
          </ul>
        </div>

        <div class="col-lg-2 col-md-6">
          <h6 class="text-white mb-3">
            <i class="bi bi-shop me-2"></i>Coffee Shop
          </h6>
          <ul class="list-unstyled">
            <li class="mb-2">
              <RouterLink to="/admin/products" class="text-light text-decoration-none small hover-link">
                <i class="bi bi-box-seam me-2 text-success"></i>Products
              </RouterLink>
            </li>
            <li class="mb-2">
              <RouterLink to="/admin/orders" class="text-light text-decoration-none small hover-link">
                <i class="bi bi-cart me-2 text-success"></i>Orders
              </RouterLink>
            </li>
            <li class="mb-2">
              <RouterLink to="/admin/categories" class="text-light text-decoration-none small hover-link">
                <i class="bi bi-tags me-2 text-success"></i>Categories
              </RouterLink>
            </li>
          </ul>
        </div>

        <div class="col-lg-2 col-md-6">
          <h6 class="text-white mb-3">
            <i class="bi bi-question-circle me-2"></i>Support
          </h6>
          <ul class="list-unstyled">
            <li class="mb-2">
              <a href="#" class="text-light text-decoration-none small hover-link">
                <i class="bi bi-book me-2 text-success"></i>Documentation
              </a>
            </li>
            <li class="mb-2">
              <a href="#" class="text-light text-decoration-none small hover-link">
                <i class="bi bi-life-preserver me-2 text-success"></i>Help Center
              </a>
            </li>
            <li class="mb-2">
              <a href="#" class="text-light text-decoration-none small hover-link">
                <i class="bi bi-headset me-2 text-success"></i>Contact
              </a>
            </li>
            <li class="mb-2">
              <a href="#" class="text-light text-decoration-none small hover-link">
                <i class="bi bi-bug me-2 text-success"></i>Report Bug
              </a>
            </li>
          </ul>
        </div>

        <div class="col-lg-3 col-md-12">
          <h6 class="text-white mb-3">
            <i class="bi bi-info-circle me-2"></i>System Information
          </h6>
          <div class="row g-2 text-center">
            <div class="col-6">
              <div class="bg-success bg-opacity-10 p-2 rounded">
                <div class="text-success fw-bold">{{ systemStats.uptime }}</div>
                <small class="text-light">Uptime</small>
              </div>
            </div>
            <div class="col-6">
              <div class="bg-info bg-opacity-10 p-2 rounded">
                <div class="text-info fw-bold">{{ systemStats.version }}</div>
                <small class="text-light">Version</small>
              </div>
            </div>
            <div class="col-6">
              <div class="bg-warning bg-opacity-10 p-2 rounded">
                <div class="text-warning fw-bold">{{ systemStats.users }}</div>
                <small class="text-light">Online</small>
              </div>
            </div>
            <div class="col-6">
              <div class="bg-danger bg-opacity-10 p-2 rounded">
                <div class="text-danger fw-bold">{{ systemStats.storage }}</div>
                <small class="text-light">Storage</small>
              </div>
            </div>
          </div>
          
          <div class="mt-3">
            <small class="text-light d-block mb-2">Quick Actions:</small>
            <div class="btn-group btn-group-sm w-100">
              <button class="btn btn-outline-light" title="Backup data">
                <i class="bi bi-download"></i> Backup
              </button>
              <button class="btn btn-outline-light" title="System settings">
                <i class="bi bi-gear"></i> Settings
              </button>
              <button class="btn btn-outline-light" title="View logs">
                <i class="bi bi-file-earmark-text"></i> Logs
              </button>
              <button class="btn btn-outline-light" title="Help">
                <i class="bi bi-question-circle"></i> Help
              </button>
            </div>
          </div>
        </div>
      </div>

      <hr class="my-4 border-secondary">
      <div class="row align-items-center">
        <div class="col-md-6">
          <div class="d-flex align-items-center">
            <span class="text-light small">
              © {{ currentYear }} Coffee Admin Dashboard. 
            </span>
            <div class="ms-3">
              <a href="#" class="text-light text-decoration-none small me-3 hover-link">Privacy Policy</a>
              <a href="#" class="text-light text-decoration-none small me-3 hover-link">Terms of Service</a>
              <a href="#" class="text-light text-decoration-none small hover-link">License</a>
            </div>
          </div>
        </div>
        <div class="col-md-6 text-md-end">
          <div class="d-flex align-items-center justify-content-md-end">
            <small class="text-light me-3">
              <i class="bi bi-heart-fill text-danger me-1"></i>
              Made with love for Coffee Lovers
            </small>
            <div class="btn-group btn-group-sm">
              <button 
                @click="toggleTheme" 
                class="btn btn-outline-secondary" 
                title="Toggle theme"
              >
                <i :class="['bi', isDarkMode ? 'bi-sun' : 'bi-moon']"></i>
              </button>
              <button 
                @click="scrollToTop" 
                class="btn btn-outline-secondary" 
                title="Back to top"
              >
                <i class="bi bi-arrow-up"></i>
              </button>
            </div>
          </div>
        </div>
      </div>

      <div class="row mt-3">
        <div class="col-12">
          <div class="bg-dark bg-opacity-50 p-2 rounded small">
            <div class="row text-center">
              <div class="col-md-3">
                <span class="text-light">Server Status: </span>
                <span class="text-success">
                  <i class="bi bi-circle-fill"></i> Online
                </span>
              </div>
              <div class="col-md-3">
                <span class="text-light">Database: </span>
                <span class="text-success">
                  <i class="bi bi-check-circle-fill"></i> Connected
                </span>
              </div>
              <div class="col-md-3">
                <span class="text-light">Last Backup: </span>
                <span class="text-info">{{ lastBackup }}</span>
              </div>
              <div class="col-md-3">
                <span class="text-light">Admin: </span>
                <span class="text-warning">{{ currentAdmin }}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </footer>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue'

const isDarkMode = ref(false)
const currentAdmin = ref('Admin User')
const lastBackup = ref('2024-10-03 10:30')

const systemStats = ref({
  uptime: '24h',
  version: 'v2.1.0',
  users: '12',
  storage: '75%'
})

const currentYear = computed(() => new Date().getFullYear())

const toggleTheme = () => {
  isDarkMode.value = !isDarkMode.value
  console.log('Toggle theme:', isDarkMode.value ? 'Dark' : 'Light')
}

const scrollToTop = () => {
  window.scrollTo({ top: 0, behavior: 'smooth' })
}

onMounted(() => {
  setInterval(() => {
  }, 60000)
})
</script>

<style scoped>
.hover-link {
  transition: all 0.3s ease;
  opacity: 1 !important;
}

.hover-link:hover {
  color: #198754 !important;
  transform: translateX(5px);
}

.btn-outline-light {
  color: #fff !important;
  border-color: rgba(255, 255, 255, 0.5);
}

.btn-outline-light:hover {
  background-color: #198754;
  border-color: #198754;
  color: #fff !important;
}

.text-success {
  color: #198754 !important;
}

.text-light {
  color: #f8f9fa !important;
  opacity: 1 !important;
}

.btn-group-sm .btn {
  padding: 0.25rem 0.8rem;
  font-size: 0.875rem;
  font-weight: 500;
}

.text-muted {
  color: #dee2e6 !important;
}

.btn, .hover-link, .d-flex a {
  transition: all 0.3s ease;
}

.d-flex a:hover {
  color: #198754 !important;
  transform: translateY(-2px);
}

.bg-opacity-10 {
  transition: all 0.3s ease;
  cursor: pointer;
  background-color: rgba(var(--bs-success-rgb), 0.1) !important;
}

.bg-opacity-10:hover {
  transform: translateY(-2px);
  box-shadow: 0 4px 8px rgba(0,0,0,0.2);
}

::-webkit-scrollbar {
  width: 8px;
}

::-webkit-scrollbar-track {
  background: #2d3748;
}

::-webkit-scrollbar-thumb {
  background: #198754;
  border-radius: 4px;
}

::-webkit-scrollbar-thumb:hover {
  background: #146c43;
}

@media (max-width: 768px) {
  .row.text-center > div {
    margin-bottom: 1rem;
  }
  
  .btn-group {
    width: 100%;
    flex-direction: column;
  }
  
  .btn-group .btn {
    border-radius: 0.375rem !important;
    margin-bottom: 0.5rem;
  }
  
  .d-flex.align-items-center {
    flex-direction: column;
    align-items: flex-start !important;
  }
  
  .justify-content-md-end {
    justify-content: flex-start !important;
  }
}
</style>