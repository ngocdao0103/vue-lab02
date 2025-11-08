<template>
  <div class="container mt-4">
    <!-- Header -->
    <div class="row mb-4">
      <div class="col-12">
        <div class="d-flex justify-content-between align-items-center">
          <h2 class="text-success">Our Coffee Collection</h2>
          <div class="d-flex align-items-center gap-3">
            <small class="text-muted">{{ filteredProducts.length }} products</small>
            <select class="form-select form-select-sm" style="width: 200px;" v-model="sortBy">
              <option value="name">Sort by Name</option>
              <option value="price-low">Price: Low to High</option>
              <option value="price-high">Price: High to Low</option>
            </select>
          </div>
        </div>
      </div>
    </div>

    <div class="row">
      <!-- Sidebar -->
      <div class="col-lg-3 mb-4">
        <!-- Search -->
        <div class="card mb-3">
          <div class="card-header bg-success text-white">
            <h6 class="mb-0">🔍 Search</h6>
          </div>
          <div class="card-body">
            <input 
              type="text" 
              class="form-control" 
              placeholder="Search coffee..." 
              v-model="searchQuery"
            >
          </div>
        </div>

        <!-- Categories -->
        <div class="card mb-3">
          <div class="card-header bg-success text-white">
            <h6 class="mb-0">📁 Categories</h6>
          </div>
          <div class="card-body">
            <div class="form-check mb-2" v-for="category in categories" :key="category">
              <input 
                class="form-check-input" 
                type="checkbox" 
                :value="category" 
                :id="category"
                v-model="selectedCategories"
              >
              <label class="form-check-label" :for="category">
                {{ category }}
              </label>
            </div>
          </div>
        </div>

        <!-- Price -->
        <div class="card mb-3">
          <div class="card-header bg-success text-white">
            <h6 class="mb-0">💰 Price</h6>
          </div>
          <div class="card-body">
            <div class="row g-2">
              <div class="col-6">
                <input 
                  type="number" 
                  class="form-control form-control-sm" 
                  placeholder="Min" 
                  v-model="priceRange.min"
                >
              </div>
              <div class="col-6">
                <input 
                  type="number" 
                  class="form-control form-control-sm" 
                  placeholder="Max" 
                  v-model="priceRange.max"
                >
              </div>
            </div>
          </div>
        </div>

        <button class="btn btn-outline-secondary w-100" @click="clearFilters">
          Clear Filters
        </button>
      </div>

      <!-- Products -->
      <div class="col-lg-9">
        <div class="row" v-if="paginatedProducts.length > 0">
          <div 
            class="col-xl-4 col-lg-6 col-md-6 mb-4" 
            v-for="product in paginatedProducts" 
            :key="product.id"
          >
            <div class="card h-100 shadow-sm">
              <div class="position-relative">
                <img 
                  :src="product.image" 
                  class="card-img-top" 
                  :alt="product.name"
                  style="height: 250px; object-fit: cover; cursor: pointer;"
                  data-bs-toggle="modal" 
                  data-bs-target="#productModal"
                  @click="showProductDetail(product)"
                >
                <div class="position-absolute top-0 end-0 m-2">
                  <span v-if="product.discount" class="badge bg-danger">-{{ product.discount }}%</span>
                  <span v-if="product.isNew" class="badge bg-primary ms-1">New</span>
                </div>
              </div>
              <div class="card-body d-flex flex-column">
                <span class="badge bg-light text-dark mb-2 align-self-start">{{ product.category }}</span>
                <h5 class="card-title">{{ product.name }}</h5>
                <p class="card-text text-muted small" style="height: 2.5rem; overflow: hidden;">
                  {{ product.description }}
                </p>
                
                <!-- Rating -->
                <div class="mb-2">
                  <span v-for="i in 5" :key="i" class="text-warning">
                    {{ i <= Math.floor(product.rating) ? '★' : '☆' }}
                  </span>
                  <small class="text-muted ms-1">({{ product.reviews }})</small>
                </div>

                <!-- Price -->
                <div class="mb-3">
                  <span v-if="product.originalPrice" 
                        class="text-muted text-decoration-line-through me-2">${{ product.originalPrice }}</span>
                  <span class="fw-bold text-success h5">${{ product.price }}</span>
                </div>

                <button 
                  class="btn btn-outline-success mt-auto"
                  @click="addToCart(product)"
                  :disabled="!product.inStock"
                >
                  {{ product.inStock ? '🛒 Add to Cart' : 'Out of Stock' }}
                </button>
              </div>
            </div>
          </div>
        </div>

        <!-- No Products -->
        <div v-else class="text-center py-5">
          <h4 class="text-muted">No products found</h4>
          <p class="text-muted">Try adjusting your filters</p>
          <button class="btn btn-success" @click="clearFilters">Clear Filters</button>
        </div>

        <!-- Pagination -->
        <nav v-if="totalPages > 1" class="mt-4">
          <ul class="pagination justify-content-center">
            <li class="page-item" :class="{ disabled: currentPage === 1 }">
              <button class="page-link" @click="changePage(currentPage - 1)">Previous</button>
            </li>
            <li 
              class="page-item" 
              v-for="page in visiblePages" 
              :key="page"
              :class="{ active: page === currentPage }"
            >
              <button class="page-link" @click="changePage(page)">{{ page }}</button>
            </li>
            <li class="page-item" :class="{ disabled: currentPage === totalPages }">
              <button class="page-link" @click="changePage(currentPage + 1)">Next</button>
            </li>
          </ul>
        </nav>
      </div>
    </div>

    <!-- Modal -->
    <div class="modal fade" id="productModal" tabindex="-1">
      <div class="modal-dialog modal-lg">
        <div class="modal-content" v-if="selectedProduct">
          <div class="modal-header">
            <h5 class="modal-title">{{ selectedProduct.name }}</h5>
            <button type="button" class="btn-close" data-bs-dismiss="modal"></button>
          </div>
          <div class="modal-body">
            <div class="row">
              <div class="col-md-6">
                <img 
                  :src="selectedProduct.image" 
                  class="img-fluid rounded" 
                  :alt="selectedProduct.name"
                >
              </div>
              <div class="col-md-6">
                <span class="badge bg-success mb-3">{{ selectedProduct.category }}</span>
                
                <div class="mb-3">
                  <span v-for="i in 5" :key="i" class="text-warning">
                    {{ i <= Math.floor(selectedProduct.rating) ? '★' : '☆' }}
                  </span>
                  <small class="text-muted ms-1">({{ selectedProduct.reviews }} reviews)</small>
                </div>

                <p class="mb-3">{{ selectedProduct.description }}</p>
                
                <div class="mb-3" v-if="selectedProduct.features">
                  <h6>Features:</h6>
                  <ul class="list-unstyled">
                    <li v-for="feature in selectedProduct.features" :key="feature">
                      ✅ {{ feature }}
                    </li>
                  </ul>
                </div>

                <div class="mb-3">
                  <span v-if="selectedProduct.originalPrice" 
                        class="text-muted text-decoration-line-through me-2 h5">${{ selectedProduct.originalPrice }}</span>
                  <span class="fw-bold text-success h3">${{ selectedProduct.price }}</span>
                </div>

                <div class="mb-3">
                  <label class="form-label">Quantity:</label>
                  <div class="input-group" style="width: 150px;">
                    <button class="btn btn-outline-secondary" @click="decreaseQuantity">-</button>
                    <input type="number" class="form-control text-center" v-model="quantity" min="1">
                    <button class="btn btn-outline-secondary" @click="increaseQuantity">+</button>
                  </div>
                  <small class="text-muted">{{ selectedProduct.stock }} available</small>
                </div>
              </div>
            </div>
          </div>
          <div class="modal-footer">
            <button 
              type="button" 
              class="btn btn-success"
              @click="addToCart(selectedProduct, quantity)"
              :disabled="!selectedProduct.inStock"
            >
              🛒 Add {{ quantity }} to Cart
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, watch } from 'vue'

// Data
const searchQuery = ref('')
const selectedCategories = ref([])
const priceRange = ref({ min: '', max: '' })
const sortBy = ref('name')
const currentPage = ref(1)
const itemsPerPage = ref(9)
const selectedProduct = ref(null)
const quantity = ref(1)

const categories = ref(['Dark Roast', 'Medium Roast', 'Light Roast', 'Espresso', 'Decaf', 'Single Origin', 'Flavored'])

const products = ref([
  {
    id: 1,
    name: 'Morning Kick',
    description: 'A bold and vibrant dark roast, perfect for a powerful start to your day.',
    image: 'https://i.pinimg.com/1200x/b2/2b/4c/b22b4c4341dc0514ba5126c917839ba7.jpg',
    category: 'Dark Roast',
    price: 24.99,
    originalPrice: 29.99,
    rating: 4.5,
    reviews: 127,
    inStock: true,
    stock: 50,
    discount: 17,
    features: ['100% Arabica', 'Fair Trade', 'Full Body', 'Low Acidity']
  },
  {
    id: 2,
    name: 'Velvet Espresso',
    description: 'A rich and smooth blend with notes of chocolate and caramel, creating a luxurious espresso shot.',
    image: 'https://i.pinimg.com/736x/ab/c8/06/abc80650578ef473de92a69aae13c342.jpg',
    category: 'Espresso',
    price: 32.99,
    rating: 4.8,
    reviews: 203,
    inStock: true,
    stock: 35,
    isNew: true,
    features: ['Premium Blend', 'Chocolate Notes', 'Smooth Finish', 'Perfect Crema']
  },
  {
    id: 3,
    name: 'House Blend',
    description: 'Our signature, medium-roast coffee, offering a perfectly balanced and consistent flavor.',
    image: 'https://i.pinimg.com/736x/9f/f8/d4/9ff8d46793a445dbf8781756aed736f4.jpg',
    category: 'Medium Roast',
    price: 19.99,
    rating: 4.3,
    reviews: 89,
    inStock: true,
    stock: 75,
    features: ['Balanced Flavor', 'Consistent Quality', 'Medium Body', 'Versatile']
  },
  {
    id: 4,
    name: 'Mountain Peak',
    description: 'A bright and clean single-origin coffee from the highlands, featuring a crisp, refreshing finish.',
    image: 'https://i.pinimg.com/736x/8a/3e/ef/8a3eeffd8e8311e24c4f2bae68d57434.jpg',
    category: 'Single Origin',
    price: 28.99,
    rating: 4.6,
    reviews: 156,
    inStock: true,
    stock: 42,
    features: ['Single Origin', 'High Altitude', 'Bright Acidity', 'Floral Notes']
  },
  {
    id: 5,
    name: 'Caramel Craze',
    description: 'A delightfully sweet and creamy coffee infused with a rich, buttery caramel flavor.',
    image: 'https://i.pinimg.com/736x/1f/92/5e/1f925e6b3751d194cc96e00af710f0bc.jpg',
    category: 'Flavored',
    price: 22.99,
    rating: 4.2,
    reviews: 94,
    inStock: true,
    stock: 60,
    features: ['Caramel Flavored', 'Sweet Profile', 'Smooth Texture', 'Dessert Coffee']
  },
  {
    id: 6,
    name: 'Dark Knight Roast',
    description: 'A powerful, smoky-flavored coffee with low acidity and a long, lingering finish.',
    image: 'https://i.pinimg.com/736x/44/0c/90/440c90f0128e86448c665aba221eeadf.jpg',
    category: 'Dark Roast',
    price: 26.99,
    rating: 4.7,
    reviews: 178,
    inStock: true,
    stock: 28,
    features: ['Dark Roast', 'Smoky Flavor', 'Low Acidity', 'Bold Taste']
  },
  {
    id: 7,
    name: 'Sunset Decaf',
    description: 'All the rich flavor of a classic roast, without the caffeine, for a relaxing evening cup.',
    image: 'https://i.pinimg.com/1200x/df/da/10/dfda10570d58c4d39a850516327ceb38.jpg',
    category: 'Decaf',
    price: 21.99,
    rating: 4.1,
    reviews: 67,
    inStock: true,
    stock: 45,
    features: ['Decaffeinated', 'Rich Flavor', 'Evening Coffee', 'Swiss Water Process']
  },
  {
    id: 8,
    name: 'Ethiopian Highlands',
    description: 'A fruity and wine-like coffee with bright acidity and complex flavor notes.',
    image: 'https://i.pinimg.com/1200x/d8/8d/f8/d88df83811a4aa1f61c87c0d2b7a79c0.jpg',
    category: 'Light Roast',
    price: 35.99,
    rating: 4.9,
    reviews: 245,
    inStock: false,
    stock: 0,
    isNew: true,
    features: ['Ethiopian Origin', 'Fruity Notes', 'Wine-like', 'Complex Flavor']
  },
  {
    id: 9,
    name: 'Breakfast Blend',
    description: 'A light, bright coffee perfect for starting your morning with energy and clarity.',
    image: 'https://i.pinimg.com/736x/99/4c/96/994c9643db6b543abd7a476f7a6e3e4f.jpg',
    category: 'Light Roast',
    price: 18.99,
    rating: 4.0,
    reviews: 112,
    inStock: true,
    stock: 88,
    features: ['Light Roast', 'Bright Flavor', 'Morning Coffee', 'High Caffeine']
  }
])

// Computed
const filteredProducts = computed(() => {
  let filtered = products.value

  if (searchQuery.value) {
    filtered = filtered.filter(product =>
      product.name.toLowerCase().includes(searchQuery.value.toLowerCase()) ||
      product.description.toLowerCase().includes(searchQuery.value.toLowerCase())
    )
  }

  if (selectedCategories.value.length > 0) {
    filtered = filtered.filter(product =>
      selectedCategories.value.includes(product.category)
    )
  }

  if (priceRange.value.min || priceRange.value.max) {
    filtered = filtered.filter(product => {
      const min = priceRange.value.min ? Number(priceRange.value.min) : 0
      const max = priceRange.value.max ? Number(priceRange.value.max) : Infinity
      return product.price >= min && product.price <= max
    })
  }

  return filtered
})

const sortedProducts = computed(() => {
  const sorted = [...filteredProducts.value]
  
  switch (sortBy.value) {
    case 'price-low':
      return sorted.sort((a, b) => a.price - b.price)
    case 'price-high':
      return sorted.sort((a, b) => b.price - a.price)
    case 'name':
    default:
      return sorted.sort((a, b) => a.name.localeCompare(b.name))
  }
})

const totalPages = computed(() => {
  return Math.ceil(sortedProducts.value.length / itemsPerPage.value)
})

const paginatedProducts = computed(() => {
  const start = (currentPage.value - 1) * itemsPerPage.value
  const end = start + itemsPerPage.value
  return sortedProducts.value.slice(start, end)
})

const visiblePages = computed(() => {
  const pages = []
  const total = totalPages.value
  const current = currentPage.value
  
  for (let i = Math.max(1, current - 2); i <= Math.min(total, current + 2); i++) {
    pages.push(i)
  }
  
  return pages
})

// Methods
const clearFilters = () => {
  searchQuery.value = ''
  selectedCategories.value = []
  priceRange.value = { min: '', max: '' }
  currentPage.value = 1
}

const changePage = (page) => {
  if (page >= 1 && page <= totalPages.value) {
    currentPage.value = page
  }
}

const showProductDetail = (product) => {
  selectedProduct.value = product
  quantity.value = 1
}

const addToCart = (product, qty = 1) => {
  if (!product.inStock) return
  alert(`${qty} x ${product.name} added to cart!`)
}

const increaseQuantity = () => {
  if (quantity.value < selectedProduct.value.stock) {
    quantity.value++
  }
}

const decreaseQuantity = () => {
  if (quantity.value > 1) {
    quantity.value--
  }
}

// Watchers
watch([searchQuery, selectedCategories, priceRange], () => {
  currentPage.value = 1
}, { deep: true })
</script>
