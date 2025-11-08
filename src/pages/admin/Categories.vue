<template>
  <div class="container-fluid p-4">
    <div class="d-flex justify-content-between align-items-center mb-4">
      <div>
        <h1 class="h3 text-success mb-0">Category Management</h1>
        <nav aria-label="breadcrumb">
          <ol class="breadcrumb mb-0">
            <li class="breadcrumb-item"><RouterLink to="/admin/dashboard" class="text-decoration-none">Admin</RouterLink></li>
            <li class="breadcrumb-item active" aria-current="page">Categories</li>
          </ol>
        </nav>
      </div>
      <button class="btn btn-success" data-bs-toggle="modal" data-bs-target="#addCategoryModal">
        <i class="bi bi-folder-plus me-2"></i>Add Category
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
                placeholder="Search by name, description..."
              >
            </div>
          </div>
          <div class="col-md-3">
            <label class="form-label">Status</label>
            <select v-model="filterStatus" class="form-select">
              <option value="">All Status</option>
              <option value="active">Active</option>
              <option value="inactive">Inactive</option>
            </select>
          </div>
          <div class="col-md-3">
            <label class="form-label">Type</label>
            <select v-model="filterType" class="form-select">
              <option value="">All Types</option>
              <option value="parent">Parent Category</option>
              <option value="subcategory">Subcategory</option>
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

    <div class="row mb-4">
      <div class="col-md-3">
        <div class="card border-0 bg-primary bg-opacity-10">
          <div class="card-body text-center">
            <i class="bi bi-folder fs-1 text-primary mb-2"></i>
            <h4 class="text-primary mb-0">{{ categoryStats.total }}</h4>
            <small class="text-muted">Total Categories</small>
          </div>
        </div>
      </div>
      <div class="col-md-3">
        <div class="card border-0 bg-success bg-opacity-10">
          <div class="card-body text-center">
            <i class="bi bi-check-circle fs-1 text-success mb-2"></i>
            <h4 class="text-success mb-0">{{ categoryStats.active }}</h4>
            <small class="text-muted">Active Categories</small>
          </div>
        </div>
      </div>
      <div class="col-md-3">
        <div class="card border-0 bg-warning bg-opacity-10">
          <div class="card-body text-center">
            <i class="bi bi-folder2-open fs-1 text-warning mb-2"></i>
            <h4 class="text-warning mb-0">{{ categoryStats.parent }}</h4>
            <small class="text-muted">Parent Categories</small>
          </div>
        </div>
      </div>
      <div class="col-md-3">
        <div class="card border-0 bg-info bg-opacity-10">
          <div class="card-body text-center">
            <i class="bi bi-boxes fs-1 text-info mb-2"></i>
            <h4 class="text-info mb-0">{{ categoryStats.products }}</h4>
            <small class="text-muted">Total Products</small>
          </div>
        </div>
      </div>
    </div>

    <div class="card border-0 shadow-sm">
      <div class="card-header bg-transparent border-bottom-0">
        <div class="d-flex justify-content-between align-items-center">
          <h6 class="mb-0">Category List ({{ filteredCategories.length }})</h6>
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
        <div v-if="currentView === 'tree'" class="p-4">
          <div v-for="category in parentCategories" :key="category.id" class="mb-4">
            <div class="card border-start border-4 border-success">
              <div class="card-body">
                <div class="d-flex justify-content-between align-items-start">
                  <div class="d-flex align-items-center">
                    <img :src="category.image" :alt="category.name" class="rounded me-3" width="50" height="50">
                    <div>
                      <h6 class="mb-1">{{ category.name }}</h6>
                      <p class="text-muted small mb-1">{{ category.description }}</p>
                      <div class="d-flex align-items-center gap-2">
                        <span :class="['badge', getStatusBadgeClass(category.status)]">
                          {{ getStatusText(category.status) }}
                        </span>
                        <span class="badge bg-secondary">{{ category.productCount }} products</span>
                        <span class="badge bg-info">{{ getSubcategories(category.id).length }} subcategories</span>
                      </div>
                    </div>
                  </div>
                  <div class="btn-group btn-group-sm">
                    <button class="btn btn-outline-primary" @click="viewCategory(category)" title="View Details">
                      <i class="bi bi-eye"></i>
                    </button>
                    <button class="btn btn-outline-warning" @click="editCategory(category)" title="Edit">
                      <i class="bi bi-pencil"></i>
                    </button>
                    <button class="btn btn-outline-success" @click="addSubcategory(category)" title="Add Subcategory">
                      <i class="bi bi-folder-plus"></i>
                    </button>
                    <button class="btn btn-outline-danger" @click="deleteCategory(category)" title="Delete">
                      <i class="bi bi-trash"></i>
                    </button>
                  </div>
                </div>
                
                <div v-if="getSubcategories(category.id).length > 0" class="mt-3">
                  <div class="row g-3">
                    <div v-for="subcategory in getSubcategories(category.id)" :key="subcategory.id" class="col-md-6">
                      <div class="card border-0 bg-light">
                        <div class="card-body p-3">
                          <div class="d-flex justify-content-between align-items-start">
                            <div class="d-flex align-items-center">
                              <img :src="subcategory.image" :alt="subcategory.name" class="rounded me-2" width="30" height="30">
                              <div>
                                <h6 class="mb-0 small">{{ subcategory.name }}</h6>
                                <small class="text-muted">{{ subcategory.productCount }} products</small>
                              </div>
                            </div>
                            <div class="btn-group btn-group-sm">
                              <button class="btn btn-outline-primary btn-sm" @click="editCategory(subcategory)">
                                <i class="bi bi-pencil"></i>
                              </button>
                              <button class="btn btn-outline-danger btn-sm" @click="deleteCategory(subcategory)">
                                <i class="bi bi-trash"></i>
                              </button>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div v-else-if="currentView === 'table'" class="table-responsive">
          <table class="table table-hover mb-0">
            <thead class="table-light">
              <tr>
                <th>
                  <input type="checkbox" class="form-check-input" @change="toggleSelectAll">
                </th>
                <th>Category</th>
                <th>Parent</th>
                <th>Products</th>
                <th>Status</th>
                <th>Created</th>
                <th>Updated</th>
                <th class="text-center">Actions</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="category in paginatedCategories" :key="category.id">
                <td>
                  <input type="checkbox" class="form-check-input" v-model="selectedCategories" :value="category.id">
                </td>
                <td>
                  <div class="d-flex align-items-center">
                    <img :src="category.image" :alt="category.name" class="rounded me-3" width="40" height="40">
                    <div>
                      <h6 class="mb-0">{{ category.name }}</h6>
                      <small class="text-muted">{{ category.description.substring(0, 50) }}...</small>
                    </div>
                  </div>
                </td>
                <td>
                  <span v-if="category.parentId" class="badge bg-secondary">
                    {{ getParentName(category.parentId) }}
                  </span>
                  <span v-else class="text-muted">—</span>
                </td>
                <td>
                  <span class="badge bg-info">{{ category.productCount }} products</span>
                </td>
                <td>
                  <span :class="['badge', getStatusBadgeClass(category.status)]">
                    <i :class="getStatusIcon(category.status)" class="me-1"></i>
                    {{ getStatusText(category.status) }}
                  </span>
                </td>
                <td>{{ formatDate(category.createdAt) }}</td>
                <td>{{ formatDate(category.updatedAt) }}</td>
                <td class="text-center">
                  <div class="btn-group btn-group-sm">
                    <button class="btn btn-outline-primary" @click="viewCategory(category)" title="View Details">
                      <i class="bi bi-eye"></i>
                    </button>
                    <button class="btn btn-outline-warning" @click="editCategory(category)" title="Edit">
                      <i class="bi bi-pencil"></i>
                    </button>
                    <div class="btn-group btn-group-sm">
                      <button class="btn btn-outline-secondary dropdown-toggle" data-bs-toggle="dropdown">
                        <i class="bi bi-three-dots"></i>
                      </button>
                      <ul class="dropdown-menu">
                        <li><a class="dropdown-item" href="#" @click="addSubcategory(category)">
                          <i class="bi bi-folder-plus me-2"></i>Add Subcategory
                        </a></li>
                        <li><a class="dropdown-item" href="#" @click="toggleStatus(category)">
                          <i class="bi bi-toggle-on me-2"></i>Toggle Status
                        </a></li>
                        <li><hr class="dropdown-divider"></li>
                        <li><a class="dropdown-item text-danger" href="#" @click="deleteCategory(category)">
                          <i class="bi bi-trash me-2"></i>Delete Category
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
          <div v-for="category in paginatedCategories" :key="category.id" class="col-xl-3 col-lg-4 col-md-6">
            <div class="card h-100 border-0 shadow-sm">
              <img :src="category.image" :alt="category.name" class="card-img-top" style="height: 150px; object-fit: cover;">
              <div class="card-body">
                <div class="d-flex justify-content-between align-items-start mb-2">
                  <h6 class="card-title mb-0">{{ category.name }}</h6>
                  <span :class="['badge', getStatusBadgeClass(category.status)]">
                    {{ getStatusText(category.status) }}
                  </span>
                </div>
                <p class="text-muted small mb-2">{{ category.description.substring(0, 80) }}...</p>
                <div class="mb-3">
                  <span v-if="category.parentId" class="badge bg-secondary me-2">
                    {{ getParentName(category.parentId) }}
                  </span>
                  <span class="badge bg-info">{{ category.productCount }} products</span>
                </div>
                <small class="text-muted">Updated: {{ formatDate(category.updatedAt) }}</small>
              </div>
              <div class="card-footer bg-transparent">
                <div class="btn-group w-100">
                  <button class="btn btn-outline-primary btn-sm" @click="viewCategory(category)">
                    <i class="bi bi-eye"></i>
                  </button>
                  <button class="btn btn-outline-warning btn-sm" @click="editCategory(category)">
                    <i class="bi bi-pencil"></i>
                  </button>
                  <button class="btn btn-outline-success btn-sm" @click="addSubcategory(category)">
                    <i class="bi bi-folder-plus"></i>
                  </button>
                  <button class="btn btn-outline-danger btn-sm" @click="deleteCategory(category)">
                    <i class="bi bi-trash"></i>
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div class="card-footer bg-transparent">
        <div class="d-flex justify-content-between align-items-center">
          <div class="text-muted">
            Showing {{ (currentPage - 1) * itemsPerPage + 1 }} - {{ Math.min(currentPage * itemsPerPage, filteredCategories.length) }} 
            of {{ filteredCategories.length }} categories
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

    <div class="modal fade" id="addCategoryModal" tabindex="-1">
      <div class="modal-dialog">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title">Add New Category</h5>
            <button type="button" class="btn-close" data-bs-dismiss="modal"></button>
          </div>
          <div class="modal-body">
            <form>
              <div class="mb-3">
                <label class="form-label">Category Name</label>
                <input type="text" class="form-control" v-model="newCategory.name">
              </div>
              <div class="mb-3">
                <label class="form-label">Description</label>
                <textarea class="form-control" rows="3" v-model="newCategory.description"></textarea>
              </div>
              <div class="mb-3">
                <label class="form-label">Parent Category</label>
                <select class="form-select" v-model="newCategory.parentId">
                  <option value="">None (Parent Category)</option>
                  <option v-for="parent in parentCategories" :key="parent.id" :value="parent.id">
                    {{ parent.name }}
                  </option>
                </select>
              </div>
              <div class="mb-3">
                <label class="form-label">Status</label>
                <select class="form-select" v-model="newCategory.status">
                  <option value="active">Active</option>
                  <option value="inactive">Inactive</option>
                </select>
              </div>
              <div class="mb-3">
                <label class="form-label">Category Image URL</label>
                <input type="url" class="form-control" v-model="newCategory.image">
              </div>
            </form>
          </div>
          <div class="modal-footer">
            <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Cancel</button>
            <button type="button" class="btn btn-success" @click="addCategory">Add Category</button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, reactive } from 'vue'

const searchQuery = ref('')
const filterStatus = ref('')
const filterType = ref('')
const currentView = ref('tree')
const currentPage = ref(1)
const itemsPerPage = ref(12)
const selectedCategories = ref([])

const viewModes = [
  { value: 'tree', icon: 'bi bi-diagram-3' },
  { value: 'table', icon: 'bi bi-table' },
  { value: 'grid', icon: 'bi bi-grid' }
]

const newCategory = reactive({
  name: '',
  description: '',
  parentId: '',
  status: 'active',
  image: ''
})

const categoryStats = ref({
  total: 24,
  active: 20,
  parent: 8,
  products: 156
})

const categories = ref([
  {
    id: 1,
    name: 'Coffee',
    description: 'All types of coffee products including beans, grounds, and instant coffee.',
    parentId: null,
    status: 'active',
    productCount: 45,
    image: 'https://i.pinimg.com/736x/53/e8/4d/53e84d256bf61c233855e849c2ced36f.jpg',
    createdAt: '2024-01-15',
    updatedAt: '2024-10-01'
  },
  {
    id: 2,
    name: 'Espresso',
    description: 'Rich and bold espresso varieties and blends.',
    parentId: 1,
    status: 'active',
    productCount: 12,
    image: 'https://i.pinimg.com/736x/53/e8/4d/53e84d256bf61c233855e849c2ced36f.jpg',
    createdAt: '2024-01-20',
    updatedAt: '2024-09-28'
  },
  {
    id: 3,
    name: 'Cold Brew',
    description: 'Cold brew coffee products and concentrates.',
    parentId: 1,
    status: 'active',
    productCount: 8,
    image: 'https://i.pinimg.com/736x/ad/7a/fb/ad7afbf43cdd782e42065a21832d25d2.jpg',
    createdAt: '2024-02-01',
    updatedAt: '2024-09-25'
  },
  {
    id: 4,
    name: 'Tea',
    description: 'Premium tea selection including green, black, herbal, and specialty teas.',
    parentId: null,
    status: 'active',
    productCount: 32,
    image: 'https://i.pinimg.com/736x/5f/8c/14/5f8c1486ca00a8d5b245333ee0a59f3e.jpg',
    createdAt: '2024-01-18',
    updatedAt: '2024-10-02'
  },
  {
    id: 5,
    name: 'Green Tea',
    description: 'Organic green tea varieties and matcha products.',
    parentId: 4,
    status: 'active',
    productCount: 15,
    image: 'https://i.pinimg.com/736x/5f/8c/14/5f8c1486ca00a8d5b245333ee0a59f3e.jpg',
    createdAt: '2024-02-05',
    updatedAt: '2024-09-30'
  },
  {
    id: 6,
    name: 'Herbal Tea',
    description: 'Caffeine-free herbal tea blends and wellness teas.',
    parentId: 4,
    status: 'active',
    productCount: 10,
    image: 'https://i.pinimg.com/736x/5f/8c/14/5f8c1486ca00a8d5b245333ee0a59f3e.jpg',
    createdAt: '2024-02-10',
    updatedAt: '2024-09-27'
  },
  {
    id: 7,
    name: 'Pastries & Bakery',
    description: 'Fresh pastries, cakes, muffins, and baked goods.',
    parentId: null,
    status: 'active',
    productCount: 28,
    image: 'https://i.pinimg.com/736x/64/dd/d3/64ddd3fd0b7510d7257d31f380a00095.jpg',
    createdAt: '2024-01-22',
    updatedAt: '2024-10-03'
  },
  {
    id: 8,
    name: 'Croissants',
    description: 'Buttery croissants with various fillings.',
    parentId: 7,
    status: 'active',
    productCount: 8,
    image: 'https://i.pinimg.com/736x/64/dd/d3/64ddd3fd0b7510d7257d31f380a00095.jpg',
    createdAt: '2024-02-15',
    updatedAt: '2024-09-29'
  },
  {
    id: 9,
    name: 'Muffins',
    description: 'Freshly baked muffins in different flavors.',
    parentId: 7,
    status: 'active',
    productCount: 12,
    image: 'https://i.pinimg.com/736x/64/dd/d3/64ddd3fd0b7510d7257d31f380a00095.jpg',
    createdAt: '2024-02-20',
    updatedAt: '2024-09-26'
  },
  {
    id: 10,
    name: 'Equipment',
    description: 'Coffee brewing equipment and accessories.',
    parentId: null,
    status: 'active',
    productCount: 18,
    image: 'https://i.pinimg.com/736x/ad/7a/fb/ad7afbf43cdd782e42065a21832d25d2.jpg',
    createdAt: '2024-03-01',
    updatedAt: '2024-10-01'
  },
  {
    id: 11,
    name: 'Grinders',
    description: 'Coffee grinders for home and commercial use.',
    parentId: 10,
    status: 'active',
    productCount: 6,
    image: 'https://i.pinimg.com/736x/ad/7a/fb/ad7afbf43cdd782e42065a21832d25d2.jpg',
    createdAt: '2024-03-05',
    updatedAt: '2024-09-28'
  },
  {
    id: 12,
    name: 'Brewing Machines',
    description: 'Espresso machines and brewing equipment.',
    parentId: 10,
    status: 'inactive',
    productCount: 4,
    image: 'https://i.pinimg.com/736x/ad/7a/fb/ad7afbf43cdd782e42065a21832d25d2.jpg',
    createdAt: '2024-03-10',
    updatedAt: '2024-09-20'
  }
])

const filteredCategories = computed(() => {
  return categories.value.filter(category => {
    const matchesSearch = !searchQuery.value || 
      category.name.toLowerCase().includes(searchQuery.value.toLowerCase()) ||
      category.description.toLowerCase().includes(searchQuery.value.toLowerCase())
    
    const matchesStatus = !filterStatus.value || category.status === filterStatus.value
    
    let matchesType = true
    if (filterType.value === 'parent') {
      matchesType = !category.parentId
    } else if (filterType.value === 'subcategory') {
      matchesType = !!category.parentId
    }
    
    return matchesSearch && matchesStatus && matchesType
  })
})

const parentCategories = computed(() => {
  return categories.value.filter(category => !category.parentId)
})

const totalPages = computed(() => Math.ceil(filteredCategories.value.length / itemsPerPage.value))

const paginatedCategories = computed(() => {
  const start = (currentPage.value - 1) * itemsPerPage.value
  const end = start + itemsPerPage.value
  return filteredCategories.value.slice(start, end)
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

const getSubcategories = (parentId) => {
  return categories.value.filter(category => category.parentId === parentId)
}

const getParentName = (parentId) => {
  const parent = categories.value.find(category => category.id === parentId)
  return parent ? parent.name : ''
}

const getStatusBadgeClass = (status) => {
  const classes = {
    active: 'bg-success',
    inactive: 'bg-secondary'
  }
  return classes[status] || 'bg-secondary'
}

const getStatusText = (status) => {
  const texts = {
    active: 'Active',
    inactive: 'Inactive'
  }
  return texts[status] || status
}

const getStatusIcon = (status) => {
  const icons = {
    active: 'bi bi-check-circle-fill',
    inactive: 'bi bi-pause-circle-fill'
  }
  return icons[status] || 'bi-circle-fill'
}

const formatDate = (dateString) => {
  return new Date(dateString).toLocaleDateString('en-US')
}

const resetFilters = () => {
  searchQuery.value = ''
  filterStatus.value = ''
  filterType.value = ''
  currentPage.value = 1
}

const toggleSelectAll = (event) => {
  if (event.target.checked) {
    selectedCategories.value = paginatedCategories.value.map(category => category.id)
  } else {
    selectedCategories.value = []
  }
}

const viewCategory = (category) => {
  console.log('View category:', category)
}

const editCategory = (category) => {
  console.log('Edit category:', category)
}

const deleteCategory = (category) => {
  if (confirm(`Are you sure you want to delete category "${category.name}"?`)) {
    const hasSubcategories = categories.value.some(cat => cat.parentId === category.id)
    if (hasSubcategories) {
      alert('Cannot delete category with subcategories. Please delete subcategories first.')
      return
    }
    
    const index = categories.value.findIndex(c => c.id === category.id)
    if (index > -1) {
      categories.value.splice(index, 1)
    }
  }
}

const addSubcategory = (parentCategory) => {
  newCategory.parentId = parentCategory.id
  console.log('Add subcategory to:', parentCategory)
}

const toggleStatus = (category) => {
  const index = categories.value.findIndex(c => c.id === category.id)
  if (index > -1) {
    categories.value[index].status = category.status === 'active' ? 'inactive' : 'active'
    categories.value[index].updatedAt = new Date().toISOString().split('T')[0]
  }
}

const addCategory = () => {
  if (newCategory.name && newCategory.description) {
    const id = Math.max(...categories.value.map(c => c.id)) + 1
    categories.value.push({
      id,
      name: newCategory.name,
      description: newCategory.description,
      parentId: newCategory.parentId || null,
      status: newCategory.status,
      productCount: 0,
      image: newCategory.image || 'https://i.pinimg.com/736x/53/e8/4d/53e84d256bf61c233855e849c2ced36f.jpg',
      createdAt: new Date().toISOString().split('T')[0],
      updatedAt: new Date().toISOString().split('T')[0]
    })
    
    Object.assign(newCategory, {
      name: '',
      description: '',
      parentId: '',
      status: 'active',
      image: ''
    })
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

.border-start {
  border-left-width: 4px !important;
}

.bg-opacity-10 {
  background-color: rgba(var(--bs-primary-rgb), 0.1) !important;
}

.card-img-top {
  transition: transform 0.3s ease;
}

.card:hover .card-img-top {
  transform: scale(1.05);
}
</style>