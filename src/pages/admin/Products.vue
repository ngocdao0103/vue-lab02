<template>
  <div class="container-fluid p-4">
    <div class="d-flex justify-content-between align-items-center mb-4">
      <div>
        <h1 class="h3 text-success mb-0">Product Management</h1>
        <nav aria-label="breadcrumb">
          <ol class="breadcrumb mb-0">
            <li class="breadcrumb-item"><RouterLink to="/admin/dashboard" class="text-decoration-none">Admin</RouterLink></li>
            <li class="breadcrumb-item active" aria-current="page">Products</li>
          </ol>
        </nav>
      </div>
      <button class="btn btn-success" data-bs-toggle="modal" data-bs-target="#addProductModal">
        <i class="bi bi-plus-circle me-2"></i>Add Product
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
                placeholder="Search by name, SKU..."
              >
            </div>
          </div>
          <div class="col-md-2">
            <label class="form-label">Category</label>
            <select v-model="filterCategory" class="form-select">
              <option value="">All Categories</option>
              <option value="coffee">Coffee</option>
              <option value="tea">Tea</option>
              <option value="pastry">Pastry</option>
              <option value="equipment">Equipment</option>
            </select>
          </div>
          <div class="col-md-2">
            <label class="form-label">Status</label>
            <select v-model="filterStatus" class="form-select">
              <option value="">All Status</option>
              <option value="active">Active</option>
              <option value="inactive">Inactive</option>
              <option value="out-of-stock">Out of Stock</option>
            </select>
          </div>
          <div class="col-md-2">
            <label class="form-label">Price Range</label>
            <select v-model="filterPrice" class="form-select">
              <option value="">All Prices</option>
              <option value="0-50">$0 - $50</option>
              <option value="51-100">$51 - $100</option>
              <option value="101-200">$101 - $200</option>
              <option value="201+">$201+</option>
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
          <h6 class="mb-0">Product List ({{ filteredProducts.length }})</h6>
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
        <div v-if="currentView === 'table'" class="table-responsive">
          <table class="table table-hover mb-0">
            <thead class="table-light">
              <tr>
                <th>
                  <input type="checkbox" class="form-check-input" @change="toggleSelectAll">
                </th>
                <th>Product</th>
                <th>SKU</th>
                <th>Category</th>
                <th>Price</th>
                <th>Stock</th>
                <th>Status</th>
                <th>Created</th>
                <th class="text-center">Actions</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="product in paginatedProducts" :key="product.id">
                <td>
                  <input type="checkbox" class="form-check-input" v-model="selectedProducts" :value="product.id">
                </td>
                <td>
                  <div class="d-flex align-items-center">
                    <img :src="product.image" :alt="product.name" class="rounded me-3" width="50" height="50">
                    <div>
                      <h6 class="mb-0">{{ product.name }}</h6>
                      <small class="text-muted">{{ product.description.substring(0, 50) }}...</small>
                    </div>
                  </div>
                </td>
                <td><code>{{ product.sku }}</code></td>
                <td>
                  <span :class="['badge', getCategoryBadgeClass(product.category)]">
                    {{ getCategoryText(product.category) }}
                  </span>
                </td>
                <td class="fw-bold text-success">${{ product.price }}</td>
                <td>
                  <span :class="['badge', getStockBadgeClass(product.stock)]">
                    {{ product.stock }} units
                  </span>
                </td>
                <td>
                  <span :class="['badge', getStatusBadgeClass(product.status)]">
                    <i :class="getStatusIcon(product.status)" class="me-1"></i>
                    {{ getStatusText(product.status) }}
                  </span>
                </td>
                <td>{{ formatDate(product.createdAt) }}</td>
                <td class="text-center">
                  <div class="btn-group btn-group-sm">
                    <button class="btn btn-outline-primary" @click="viewProduct(product)" title="View Details">
                      <i class="bi bi-eye"></i>
                    </button>
                    <button class="btn btn-outline-warning" @click="editProduct(product)" title="Edit">
                      <i class="bi bi-pencil"></i>
                    </button>
                    <div class="btn-group btn-group-sm">
                      <button class="btn btn-outline-secondary dropdown-toggle" data-bs-toggle="dropdown">
                        <i class="bi bi-three-dots"></i>
                      </button>
                      <ul class="dropdown-menu">
                        <li><a class="dropdown-item" href="#" @click="duplicateProduct(product)">
                          <i class="bi bi-files me-2"></i>Duplicate
                        </a></li>
                        <li><a class="dropdown-item" href="#" @click="toggleStatus(product)">
                          <i class="bi bi-toggle-on me-2"></i>Change Status
                        </a></li>
                        <li><hr class="dropdown-divider"></li>
                        <li><a class="dropdown-item text-danger" href="#" @click="deleteProduct(product)">
                          <i class="bi bi-trash me-2"></i>Delete Product
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
          <div v-for="product in paginatedProducts" :key="product.id" class="col-xl-3 col-lg-4 col-md-6">
            <div class="card h-100 border-0 shadow-sm">
              <img :src="product.image" :alt="product.name" class="card-img-top" style="height: 200px; object-fit: cover;">
              <div class="card-body">
                <div class="d-flex justify-content-between align-items-start mb-2">
                  <h6 class="card-title mb-0">{{ product.name }}</h6>
                  <span :class="['badge', getStatusBadgeClass(product.status)]">
                    {{ getStatusText(product.status) }}
                  </span>
                </div>
                <p class="text-muted small mb-2">{{ product.description.substring(0, 80) }}...</p>
                <div class="mb-2">
                  <span :class="['badge', getCategoryBadgeClass(product.category)]" class="me-2">
                    {{ getCategoryText(product.category) }}
                  </span>
                  <small class="text-muted">SKU: {{ product.sku }}</small>
                </div>
                <div class="d-flex justify-content-between align-items-center mb-3">
                  <span class="h6 text-success mb-0">${{ product.price }}</span>
                  <span :class="['badge', getStockBadgeClass(product.stock)]">
                    {{ product.stock }} units
                  </span>
                </div>
                <div class="btn-group w-100">
                  <button class="btn btn-outline-primary btn-sm" @click="viewProduct(product)">
                    <i class="bi bi-eye"></i>
                  </button>
                  <button class="btn btn-outline-warning btn-sm" @click="editProduct(product)">
                    <i class="bi bi-pencil"></i>
                  </button>
                  <button class="btn btn-outline-danger btn-sm" @click="deleteProduct(product)">
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
            Showing {{ (currentPage - 1) * itemsPerPage + 1 }} - {{ Math.min(currentPage * itemsPerPage, filteredProducts.length) }} 
            of {{ filteredProducts.length }} products
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

    <div class="modal fade" id="addProductModal" tabindex="-1">
      <div class="modal-dialog modal-lg">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title">Add New Product</h5>
            <button type="button" class="btn-close" data-bs-dismiss="modal"></button>
          </div>
          <div class="modal-body">
            <form>
              <div class="row">
                <div class="col-md-6">
                  <div class="mb-3">
                    <label class="form-label">Product Name</label>
                    <input type="text" class="form-control" v-model="newProduct.name">
                  </div>
                </div>
                <div class="col-md-6">
                  <div class="mb-3">
                    <label class="form-label">SKU</label>
                    <input type="text" class="form-control" v-model="newProduct.sku">
                  </div>
                </div>
              </div>
              <div class="mb-3">
                <label class="form-label">Description</label>
                <textarea class="form-control" rows="3" v-model="newProduct.description"></textarea>
              </div>
              <div class="row">
                <div class="col-md-6">
                  <div class="mb-3">
                    <label class="form-label">Category</label>
                    <select class="form-select" v-model="newProduct.category">
                      <option value="coffee">Coffee</option>
                      <option value="tea">Tea</option>
                      <option value="pastry">Pastry</option>
                      <option value="equipment">Equipment</option>
                    </select>
                  </div>
                </div>
                <div class="col-md-6">
                  <div class="mb-3">
                    <label class="form-label">Status</label>
                    <select class="form-select" v-model="newProduct.status">
                      <option value="active">Active</option>
                      <option value="inactive">Inactive</option>
                    </select>
                  </div>
                </div>
              </div>
              <div class="row">
                <div class="col-md-6">
                  <div class="mb-3">
                    <label class="form-label">Price ($)</label>
                    <input type="number" class="form-control" v-model="newProduct.price" step="0.01">
                  </div>
                </div>
                <div class="col-md-6">
                  <div class="mb-3">
                    <label class="form-label">Stock Quantity</label>
                    <input type="number" class="form-control" v-model="newProduct.stock">
                  </div>
                </div>
              </div>
              <div class="mb-3">
                <label class="form-label">Product Image URL</label>
                <input type="url" class="form-control" v-model="newProduct.image">
              </div>
            </form>
          </div>
          <div class="modal-footer">
            <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Cancel</button>
            <button type="button" class="btn btn-success" @click="addProduct">Add Product</button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, reactive } from 'vue'

const searchQuery = ref('')
const filterCategory = ref('')
const filterStatus = ref('')
const filterPrice = ref('')
const currentView = ref('table')
const currentPage = ref(1)
const itemsPerPage = ref(10)
const selectedProducts = ref([])

const viewModes = [
  { value: 'table', icon: 'bi bi-table' },
  { value: 'grid', icon: 'bi bi-grid' }
]

const newProduct = reactive({
  name: '',
  sku: '',
  description: '',
  category: 'coffee',
  status: 'active',
  price: 0,
  stock: 0,
  image: ''
})

const products = ref([
  {
    id: 1,
    name: 'Espresso Classic',
    sku: 'ESP001',
    description: 'Rich and bold espresso with a perfect crema. Made from premium arabica beans.',
    category: 'coffee',
    status: 'active',
    price: 25.99,
    stock: 150,
    image: 'https://i.pinimg.com/736x/53/e8/4d/53e84d256bf61c233855e849c2ced36f.jpg',
    createdAt: '2024-01-15'
  },
  {
    id: 2,
    name: 'Green Tea Matcha',
    sku: 'TEA002',
    description: 'Premium Japanese matcha powder with authentic taste and vibrant green color.',
    category: 'tea',
    status: 'active',
    price: 35.50,
    stock: 75,
    image: 'https://i.pinimg.com/736x/5f/8c/14/5f8c1486ca00a8d5b245333ee0a59f3e.jpg',
    createdAt: '2024-02-10'
  },
  {
    id: 3,
    name: 'Chocolate Croissant',
    sku: 'PAS003',
    description: 'Buttery croissant filled with rich dark chocolate. Perfect for breakfast.',
    category: 'pastry',
    status: 'active',
    price: 4.50,
    stock: 200,
    image: 'https://i.pinimg.com/736x/64/dd/d3/64ddd3fd0b7510d7257d31f380a00095.jpg',
    createdAt: '2024-03-05'
  },
  {
    id: 4,
    name: 'Coffee Grinder Pro',
    sku: 'EQP004',
    description: 'Professional coffee grinder with multiple settings for perfect grind size.',
    category: 'equipment',
    status: 'inactive',
    price: 199.99,
    stock: 25,
    image: 'https://i.pinimg.com/736x/ad/7a/fb/ad7afbf43cdd782e42065a21832d25d2.jpg',
    createdAt: '2024-04-01'
  },
  {
    id: 5,
    name: 'Colombian Blend',
    sku: 'COF005',
    description: 'Medium roast coffee blend from Colombian highlands with fruity notes.',
    category: 'coffee',
    status: 'out-of-stock',
    price: 28.75,
    stock: 0,
    image: 'https://i.pinimg.com/736x/53/e8/4d/53e84d256bf61c233855e849c2ced36f.jpg',
    createdAt: '2024-05-12'
  }
])

const filteredProducts = computed(() => {
  return products.value.filter(product => {
    const matchesSearch = !searchQuery.value || 
      product.name.toLowerCase().includes(searchQuery.value.toLowerCase()) ||
      product.sku.toLowerCase().includes(searchQuery.value.toLowerCase())
    
    const matchesCategory = !filterCategory.value || product.category === filterCategory.value
    const matchesStatus = !filterStatus.value || product.status === filterStatus.value
    
    let matchesPrice = true
    if (filterPrice.value) {
      const price = product.price
      switch (filterPrice.value) {
        case '0-50':
          matchesPrice = price >= 0 && price <= 50
          break
        case '51-100':
          matchesPrice = price >= 51 && price <= 100
          break
        case '101-200':
          matchesPrice = price >= 101 && price <= 200
          break
        case '201+':
          matchesPrice = price > 200
          break
      }
    }
    
    return matchesSearch && matchesCategory && matchesStatus && matchesPrice
  })
})

const totalPages = computed(() => Math.ceil(filteredProducts.value.length / itemsPerPage.value))

const paginatedProducts = computed(() => {
  const start = (currentPage.value - 1) * itemsPerPage.value
  const end = start + itemsPerPage.value
  return filteredProducts.value.slice(start, end)
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

const getCategoryBadgeClass = (category) => {
  const classes = {
    coffee: 'bg-warning',
    tea: 'bg-success',
    pastry: 'bg-info',
    equipment: 'bg-secondary'
  }
  return classes[category] || 'bg-secondary'
}

const getCategoryText = (category) => {
  const texts = {
    coffee: 'Coffee',
    tea: 'Tea',
    pastry: 'Pastry',
    equipment: 'Equipment'
  }
  return texts[category] || category
}

const getStatusBadgeClass = (status) => {
  const classes = {
    active: 'bg-success',
    inactive: 'bg-secondary',
    'out-of-stock': 'bg-danger'
  }
  return classes[status] || 'bg-secondary'
}

const getStatusText = (status) => {
  const texts = {
    active: 'Active',
    inactive: 'Inactive',
    'out-of-stock': 'Out of Stock'
  }
  return texts[status] || status
}

const getStatusIcon = (status) => {
  const icons = {
    active: 'bi bi-check-circle-fill',
    inactive: 'bi bi-pause-circle-fill',
    'out-of-stock': 'bi bi-x-circle-fill'
  }
  return icons[status] || 'bi-circle-fill'
}

const getStockBadgeClass = (stock) => {
  if (stock === 0) return 'bg-danger'
  if (stock < 50) return 'bg-warning'
  return 'bg-success'
}

const formatDate = (dateString) => {
  return new Date(dateString).toLocaleDateString('en-US')
}

const resetFilters = () => {
  searchQuery.value = ''
  filterCategory.value = ''
  filterStatus.value = ''
  filterPrice.value = ''
  currentPage.value = 1
}

const toggleSelectAll = (event) => {
  if (event.target.checked) {
    selectedProducts.value = paginatedProducts.value.map(product => product.id)
  } else {
    selectedProducts.value = []
  }
}

const viewProduct = (product) => {
  console.log('View product:', product)
}

const editProduct = (product) => {
  console.log('Edit product:', product)
}

const deleteProduct = (product) => {
  if (confirm(`Are you sure you want to delete product ${product.name}?`)) {
    const index = products.value.findIndex(p => p.id === product.id)
    if (index > -1) {
      products.value.splice(index, 1)
    }
  }
}

const duplicateProduct = (product) => {
  const newProduct = { ...product }
  newProduct.id = Math.max(...products.value.map(p => p.id)) + 1
  newProduct.name = `${product.name} (Copy)`
  newProduct.sku = `${product.sku}-COPY`
  products.value.push(newProduct)
}

const toggleStatus = (product) => {
  const currentIndex = products.value.findIndex(p => p.id === product.id)
  if (currentIndex > -1) {
    const statuses = ['active', 'inactive', 'out-of-stock']
    const currentStatusIndex = statuses.indexOf(product.status)
    const nextStatusIndex = (currentStatusIndex + 1) % statuses.length
    products.value[currentIndex].status = statuses[nextStatusIndex]
  }
}

const addProduct = () => {
  if (newProduct.name && newProduct.sku && newProduct.price >= 0) {
    const id = Math.max(...products.value.map(p => p.id)) + 1
    products.value.push({
      id,
      name: newProduct.name,
      sku: newProduct.sku,
      description: newProduct.description,
      category: newProduct.category,
      status: newProduct.status,
      price: parseFloat(newProduct.price),
      stock: parseInt(newProduct.stock),
      image: newProduct.image || 'https://i.pinimg.com/736x/5f/8c/14/5f8c1486ca00a8d5b245333ee0a59f3e.jpg',
      createdAt: new Date().toISOString().split('T')[0]
    })
    
    Object.assign(newProduct, {
      name: '',
      sku: '',
      description: '',
      category: 'coffee',
      status: 'active',
      price: 0,
      stock: 0,
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

.card-img-top {
  transition: transform 0.3s ease;
}

.card:hover .card-img-top {
  transform: scale(1.05);
}
</style>