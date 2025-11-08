<template>
  <div class="container-fluid p-4">
    <div class="d-flex justify-content-between align-items-center mb-4">
      <div>
        <h1 class="h3 text-success mb-0">User Management</h1>
        <nav aria-label="breadcrumb">
          <ol class="breadcrumb mb-0">
            <li class="breadcrumb-item"><RouterLink to="/admin/dashboard" class="text-decoration-none">Admin</RouterLink></li>
            <li class="breadcrumb-item active" aria-current="page">Users</li>
          </ol>
        </nav>
      </div>
      <button class="btn btn-success" data-bs-toggle="modal" data-bs-target="#addUserModal">
        <i class="bi bi-person-plus me-2"></i>Add User
      </button>
    </div>

    <div class="card border-0 shadow-sm mb-4">
      <div class="card-body">
        <div class="row g-3">
          <div class="col-md-4">
            <label class="form-label">Search</label>
            <div class="input-group">
              <span class="input-group-text"><i class="bi bi-search"></i></span>
              <input 
                v-model="searchQuery" 
                type="text" 
                class="form-control" 
                placeholder="Search by name, email..."
              >
            </div>
          </div>
          <div class="col-md-3">
            <label class="form-label">Role</label>
            <select v-model="filterRole" class="form-select">
              <option value="">All Roles</option>
              <option value="admin">Admin</option>
              <option value="editor">Editor</option>
              <option value="user">User</option>
            </select>
          </div>
          <div class="col-md-3">
            <label class="form-label">Status</label>
            <select v-model="filterStatus" class="form-select">
              <option value="">All Status</option>
              <option value="active">Active</option>
              <option value="inactive">Inactive</option>
              <option value="banned">Banned</option>
            </select>
          </div>
          <div class="col-md-2 d-flex align-items-end">
            <button @click="resetFilters" class="btn btn-outline-secondary w-100">
              <i class="bi bi-arrow-clockwise me-2"></i>Reset
            </button>
          </div>
        </div>
      </div>
    </div>
    <div class="card border-0 shadow-sm">
      <div class="card-header bg-transparent border-bottom-0">
        <div class="d-flex justify-content-between align-items-center">
          <h6 class="mb-0">User List ({{ filteredUsers.length }})</h6>
          <div class="btn-group btn-group-sm">
            <button 
              v-for="view in viewModes" 
              :key="view.value"
              @click="currentView = view.value"
              :class="['btn', currentView === view.value ? 'btn-success' : 'btn-outline-success']"
            >
              <i :class="view.icon"></i>
            </button>
          </div>
        </div>
      </div>
      <div class="card-body p-0">
        <!-- Table View -->
        <div v-if="currentView === 'table'" class="table-responsive">
          <table class="table table-hover mb-0">
            <thead class="table-light">
              <tr>
                <th>
                  <input type="checkbox" class="form-check-input" @change="toggleSelectAll">
                </th>
                <th>User</th>
                <th>Email</th>
                <th>Role</th>
                <th>Status</th>
                <th>Join Date</th>
                <th>Last Active</th>
                <th class="text-center">Actions</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="user in paginatedUsers" :key="user.id">
                <td>
                  <input type="checkbox" class="form-check-input" v-model="selectedUsers" :value="user.id">
                </td>
                <td>
                  <div class="d-flex align-items-center">
                    <img :src="user.avatar" :alt="user.name" class="rounded-circle me-3" width="40" height="40">
                    <div>
                      <h6 class="mb-0">{{ user.name }}</h6>
                      <small class="text-muted">ID: {{ user.id }}</small>
                    </div>
                  </div>
                </td>
                <td>{{ user.email }}</td>
                <td>
                  <span :class="['badge', getRoleBadgeClass(user.role)]">
                    {{ getRoleText(user.role) }}
                  </span>
                </td>
                <td>
                  <span :class="['badge', getStatusBadgeClass(user.status)]">
                    <i :class="getStatusIcon(user.status)" class="me-1"></i>
                    {{ getStatusText(user.status) }}
                  </span>
                </td>
                <td>{{ formatDate(user.joinDate) }}</td>
                <td>{{ formatDate(user.lastActive) }}</td>
                <td class="text-center">
                  <div class="btn-group btn-group-sm">
                    <button class="btn btn-outline-primary" @click="viewUser(user)" title="View Details">
                      <i class="bi bi-eye"></i>
                    </button>
                    <button class="btn btn-outline-warning" @click="editUser(user)" title="Edit">
                      <i class="bi bi-pencil"></i>
                    </button>
                    <div class="btn-group btn-group-sm">
                      <button class="btn btn-outline-secondary dropdown-toggle" data-bs-toggle="dropdown">
                        <i class="bi bi-three-dots"></i>
                      </button>
                      <ul class="dropdown-menu">
                        <li><a class="dropdown-item" href="#" @click="changeRole(user)">
                          <i class="bi bi-shield me-2"></i>Change Role
                        </a></li>
                        <li><a class="dropdown-item" href="#" @click="toggleStatus(user)">
                          <i class="bi bi-toggle-on me-2"></i>Change Status
                        </a></li>
                        <li><hr class="dropdown-divider"></li>
                        <li><a class="dropdown-item text-danger" href="#" @click="deleteUser(user)">
                          <i class="bi bi-trash me-2"></i>Delete User
                        </a></li>
                      </ul>
                    </div>
                  </div>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
        <div v-else class="row g-4 p-4">
          <div v-for="user in paginatedUsers" :key="user.id" class="col-xl-3 col-lg-4 col-md-6">
            <div class="card h-100 border-0 shadow-sm">
              <div class="card-body text-center">
                <img :src="user.avatar" :alt="user.name" class="rounded-circle mb-3" width="80" height="80">
                <h6 class="card-title mb-1">{{ user.name }}</h6>
                <p class="text-muted small mb-2">{{ user.email }}</p>
                <div class="mb-3">
                  <span :class="['badge', getRoleBadgeClass(user.role)]" class="me-2">
                    {{ getRoleText(user.role) }}
                  </span>
                  <span :class="['badge', getStatusBadgeClass(user.status)]">
                    {{ getStatusText(user.status) }}
                  </span>
                </div>
                <div class="btn-group w-100">
                  <button class="btn btn-outline-primary btn-sm" @click="viewUser(user)">
                    <i class="bi bi-eye"></i>
                  </button>
                  <button class="btn btn-outline-warning btn-sm" @click="editUser(user)">
                    <i class="bi bi-pencil"></i>
                  </button>
                  <button class="btn btn-outline-danger btn-sm" @click="deleteUser(user)">
                    <i class="bi bi-trash"></i>
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- Pagination -->
      <div class="card-footer bg-transparent">
        <div class="d-flex justify-content-between align-items-center">
          <div class="text-muted">
            Showing {{ (currentPage - 1) * itemsPerPage + 1 }} - {{ Math.min(currentPage * itemsPerPage, filteredUsers.length) }} 
            of {{ filteredUsers.length }} users
          </div>
          <nav>
            <ul class="pagination pagination-sm mb-0">
              <li class="page-item" :class="{ disabled: currentPage === 1 }">
                <button class="page-link" @click="currentPage = currentPage - 1" :disabled="currentPage === 1">
                  <i class="bi bi-chevron-left"></i>
                </button>
              </li>
              <li 
                v-for="page in visiblePages" 
                :key="page" 
                class="page-item" 
                :class="{ active: page === currentPage }"
              >
                <button class="page-link" @click="currentPage = page">{{ page }}</button>
              </li>
              <li class="page-item" :class="{ disabled: currentPage === totalPages }">
                <button class="page-link" @click="currentPage = currentPage + 1" :disabled="currentPage === totalPages">
                  <i class="bi bi-chevron-right"></i>
                </button>
              </li>
            </ul>
          </nav>
        </div>
      </div>
    </div>

    <div class="modal fade" id="addUserModal" tabindex="-1">
      <div class="modal-dialog">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title">Add New User</h5>
            <button type="button" class="btn-close" data-bs-dismiss="modal"></button>
          </div>
          <div class="modal-body">
            <form>
              <div class="mb-3">
                <label class="form-label">Full Name</label>
                <input type="text" class="form-control" v-model="newUser.name">
              </div>
              <div class="mb-3">
                <label class="form-label">Email</label>
                <input type="email" class="form-control" v-model="newUser.email">
              </div>
              <div class="mb-3">
                <label class="form-label">Password</label>
                <input type="password" class="form-control" v-model="newUser.password">
              </div>
              <div class="mb-3">
                <label class="form-label">Role</label>
                <select class="form-select" v-model="newUser.role">
                  <option value="user">User</option>
                  <option value="editor">Editor</option>
                  <option value="admin">Admin</option>
                </select>
              </div>
            </form>
          </div>
          <div class="modal-footer">
            <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Cancel</button>
            <button type="button" class="btn btn-success" @click="addUser">Add User</button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, reactive } from 'vue'

// Data
const searchQuery = ref('')
const filterRole = ref('')
const filterStatus = ref('')
const currentView = ref('table')
const currentPage = ref(1)
const itemsPerPage = ref(10)
const selectedUsers = ref([])

const viewModes = [
  { value: 'table', icon: 'bi bi-table' },
  { value: 'grid', icon: 'bi bi-grid' }
]

const newUser = reactive({
  name: '',
  email: '',
  password: '',
  role: 'user'
})

const users = ref([
  {
    id: 1,
    name: 'Admin User',
    email: 'admin@coffee.com',
    avatar: 'https://i.pinimg.com/736x/6f/a3/6a/6fa36aa2c367da06b2a4c8ae1cf9ee02.jpg',
    role: 'admin',
    status: 'active',
    joinDate: '2024-01-15',
    lastActive: '2024-10-03'
  },
  {
    id: 2,
    name: 'Editor Smith',
    email: 'editor@coffee.com',
    avatar: 'https://i.pinimg.com/736x/21/24/92/21249201424022cdd93cd144f099b056.jpg',
    role: 'editor',
    status: 'active',
    joinDate: '2024-02-20',
    lastActive: '2024-10-02'
  },
  {
    id: 3,
    name: 'John Doe',
    email: 'user@coffee.com',
    avatar: 'https://i.pinimg.com/736x/ce/d4/4a/ced44a15c6f187b76d6479a03bdd773f.jpg',
    role: 'user',
    status: 'active',
    joinDate: '2024-03-10',
    lastActive: '2024-10-01'
  },
  {
    id: 4,
    name: 'Jane Banned',
    email: 'banned@coffee.com',
    avatar: 'https://i.pinimg.com/736x/3e/e8/38/3ee838140326cf1004815ed162f9ac96.jpg',
    role: 'user',
    status: 'banned',
    joinDate: '2024-04-05',
    lastActive: '2024-09-15'
  },
  {
    id: 5,
    name: 'Bob Inactive',
    email: 'inactive@coffee.com',
    avatar: 'https://i.pinimg.com/736x/f4/63/78/f463785304f39c136a1007f5ebd39597.jpg',
    role: 'user',
    status: 'inactive',
    joinDate: '2024-05-12',
    lastActive: '2024-08-20'
  }
])

// Computed
const filteredUsers = computed(() => {
  return users.value.filter(user => {
    const matchesSearch = !searchQuery.value || 
      user.name.toLowerCase().includes(searchQuery.value.toLowerCase()) ||
      user.email.toLowerCase().includes(searchQuery.value.toLowerCase())
    
    const matchesRole = !filterRole.value || user.role === filterRole.value
    const matchesStatus = !filterStatus.value || user.status === filterStatus.value
    
    return matchesSearch && matchesRole && matchesStatus
  })
})

const totalPages = computed(() => Math.ceil(filteredUsers.value.length / itemsPerPage.value))

const paginatedUsers = computed(() => {
  const start = (currentPage.value - 1) * itemsPerPage.value
  const end = start + itemsPerPage.value
  return filteredUsers.value.slice(start, end)
})

const visiblePages = computed(() => {
  const pages = []
  const start = Math.max(1, currentPage.value - 2)
  const end = Math.min(totalPages.value, currentPage.value + 2)
  
  for (let i = start; i <= end; i++) {
    pages.push(i)
  }
  return pages
})

// Methods
const getRoleBadgeClass = (role) => {
  const classes = {
    admin: 'bg-danger',
    editor: 'bg-warning',
    user: 'bg-primary'
  }
  return classes[role] || 'bg-secondary'
}

const getRoleText = (role) => {
  const texts = {
    admin: 'Admin',
    editor: 'Editor',
    user: 'User'
  }
  return texts[role] || role
}

const getStatusBadgeClass = (status) => {
  const classes = {
    active: 'bg-success',
    inactive: 'bg-secondary',
    banned: 'bg-danger'
  }
  return classes[status] || 'bg-secondary'
}

const getStatusText = (status) => {
  const texts = {
    active: 'Active',
    inactive: 'Inactive',
    banned: 'Banned'
  }
  return texts[status] || status
}

const getStatusIcon = (status) => {
  const icons = {
    active: 'bi bi-check-circle-fill',
    inactive: 'bi bi-pause-circle-fill',
    banned: 'bi bi-x-circle-fill'
  }
  return icons[status] || 'bi-circle-fill'
}

const formatDate = (dateString) => {
  return new Date(dateString).toLocaleDateString('vi-VN')
}

const resetFilters = () => {
  searchQuery.value = ''
  filterRole.value = ''
  filterStatus.value = ''
  currentPage.value = 1
}

const toggleSelectAll = (event) => {
  if (event.target.checked) {
    selectedUsers.value = paginatedUsers.value.map(user => user.id)
  } else {
    selectedUsers.value = []
  }
}

const viewUser = (user) => {
  console.log('View user:', user)
}

const editUser = (user) => {
  console.log('Edit user:', user)
}

const deleteUser = (user) => {
  if (confirm(`Are you sure you want to delete user ${user.name}?`)) {
    const index = users.value.findIndex(u => u.id === user.id)
    if (index > -1) {
      users.value.splice(index, 1)
    }
  }
}

const changeRole = (user) => {
  console.log('Change role for user:', user)
}

const toggleStatus = (user) => {
  console.log('Toggle status for user:', user)
}

const addUser = () => {
  if (newUser.name && newUser.email && newUser.password) {
    const id = Math.max(...users.value.map(u => u.id)) + 1
    users.value.push({
      id,
      name: newUser.name,
      email: newUser.email,
      avatar: 'https://i.pinimg.com/736x/f4/63/78/f463785304f39c136a1007f5ebd39597.jpg',
      role: newUser.role,
      status: 'active',
      joinDate: new Date().toISOString().split('T')[0],
      lastActive: new Date().toISOString().split('T')[0]
    })
    
    // Reset form
    Object.assign(newUser, { name: '', email: '', password: '', role: 'user' })
  }
}
</script>

<style scoped>
.table th {
  border-top: none;
  font-weight: 600;
  color: #495057;
}

.badge {
  font-size: 0.75em;
}

.avatar {
  object-fit: cover;
}

.card:hover {
  transform: translateY(-2px);
  transition: transform 0.2s ease-in-out;
}

.btn-group .dropdown-toggle::after {
  display: none;
}

.pagination .page-link {
  border: none;
  color: #198754;
}

.pagination .page-item.active .page-link {
  background-color: #198754;
  border-color: #198754;
}

.modal-content {
  border: none;
  box-shadow: 0 10px 25px rgba(0,0,0,0.1);
}
</style>