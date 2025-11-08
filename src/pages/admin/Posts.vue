<template>
  <div class="container-fluid p-4">
    <div class="d-flex justify-content-between align-items-center mb-4">
      <div>
        <h1 class="h3 text-success mb-0">Post Management</h1>
        <nav aria-label="breadcrumb">
          <ol class="breadcrumb mb-0">
            <li class="breadcrumb-item"><RouterLink to="/admin/dashboard" class="text-decoration-none">Admin</RouterLink></li>
            <li class="breadcrumb-item active" aria-current="page">Posts</li>
          </ol>
        </nav>
      </div>
      <button class="btn btn-success" data-bs-toggle="modal" data-bs-target="#addPostModal">
        <i class="bi bi-plus-circle me-2"></i>Create New Post
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
                placeholder="Search by title, content..."
              >
            </div>
          </div>
          <div class="col-md-2">
            <label class="form-label">Category</label>
            <select v-model="filterCategory" class="form-select">
              <option value="">All Categories</option>
              <option value="coffee">Coffee</option>
              <option value="tips">Tips & Tricks</option>
              <option value="review">Review</option>
              <option value="news">News</option>
            </select>
          </div>
          <div class="col-md-2">
            <label class="form-label">Status</label>
            <select v-model="filterStatus" class="form-select">
              <option value="">All Status</option>
              <option value="published">Published</option>
              <option value="draft">Draft</option>
              <option value="pending">Pending</option>
            </select>
          </div>
          <div class="col-md-2">
            <label class="form-label">Author</label>
            <select v-model="filterAuthor" class="form-select">
              <option value="">All Authors</option>
              <option value="admin">Admin</option>
              <option value="editor">Editor</option>
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

    <!-- Posts Table -->
    <div class="card border-0 shadow-sm">
      <div class="card-header bg-transparent border-bottom-0">
        <div class="d-flex justify-content-between align-items-center">
          <h6 class="mb-0">Post List ({{ filteredPosts.length }})</h6>
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
                <th>Post</th>
                <th>Author</th>
                <th>Category</th>
                <th>Status</th>
                <th>Views</th>
                <th>Created Date</th>
                <th class="text-center">Actions</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="post in paginatedPosts" :key="post.id">
                <td>
                  <input type="checkbox" class="form-check-input" v-model="selectedPosts" :value="post.id">
                </td>
                <td>
                  <div class="d-flex align-items-center">
                    <img :src="post.thumbnail" :alt="post.title" class="rounded me-3" width="60" height="40" style="object-fit: cover;">
                    <div>
                      <h6 class="mb-1 text-truncate" style="max-width: 250px;">{{ post.title }}</h6>
                      <small class="text-muted">{{ post.excerpt }}</small>
                    </div>
                  </div>
                </td>
                <td>
                  <div class="d-flex align-items-center">
                    <img :src="post.authorAvatar" :alt="post.author" class="rounded-circle me-2" width="30" height="30">
                    <span>{{ post.author }}</span>
                  </div>
                </td>
                <td>
                  <span :class="['badge', getCategoryBadgeClass(post.category)]">
                    {{ getCategoryText(post.category) }}
                  </span>
                </td>
                <td>
                  <span :class="['badge', getStatusBadgeClass(post.status)]">
                    <i :class="getStatusIcon(post.status)" class="me-1"></i>
                    {{ getStatusText(post.status) }}
                  </span>
                </td>
                <td>
                  <div class="d-flex align-items-center">
                    <i class="bi bi-eye me-1 text-muted"></i>
                    {{ post.views.toLocaleString() }}
                  </div>
                </td>
                <td>{{ formatDate(post.createdAt) }}</td>
                <td class="text-center">
                  <div class="btn-group btn-group-sm">
                    <button class="btn btn-outline-primary" @click="viewPost(post)" title="View Post">
                      <i class="bi bi-eye"></i>
                    </button>
                    <button class="btn btn-outline-warning" @click="editPost(post)" title="Edit">
                      <i class="bi bi-pencil"></i>
                    </button>
                    <div class="btn-group btn-group-sm">
                      <button class="btn btn-outline-secondary dropdown-toggle" data-bs-toggle="dropdown">
                        <i class="bi bi-three-dots"></i>
                      </button>
                      <ul class="dropdown-menu">
                        <li><a class="dropdown-item" href="#" @click="duplicatePost(post)">
                          <i class="bi bi-files me-2"></i>Duplicate
                        </a></li>
                        <li><a class="dropdown-item" href="#" @click="changeStatus(post)">
                          <i class="bi bi-toggle-on me-2"></i>Change Status
                        </a></li>
                        <li><hr class="dropdown-divider"></li>
                        <li><a class="dropdown-item text-danger" href="#" @click="deletePost(post)">
                          <i class="bi bi-trash me-2"></i>Delete Post
                        </a></li>
                      </ul>
                    </div>
                  </div>
                </td>
              </tr>
            </tbody>
          </table>
        </div>

        <!-- Grid View -->
        <div v-else class="row g-4 p-4">
          <div v-for="post in paginatedPosts" :key="post.id" class="col-xl-4 col-lg-6">
            <div class="card h-100 border-0 shadow-sm">
              <img :src="post.thumbnail" :alt="post.title" class="card-img-top" style="height: 200px; object-fit: cover;">
              <div class="card-body">
                <div class="d-flex justify-content-between align-items-start mb-2">
                  <span :class="['badge', getCategoryBadgeClass(post.category)]">
                    {{ getCategoryText(post.category) }}
                  </span>
                  <span :class="['badge', getStatusBadgeClass(post.status)]">
                    {{ getStatusText(post.status) }}
                  </span>
                </div>
                <h6 class="card-title">{{ post.title }}</h6>
                <p class="card-text text-muted small">{{ post.excerpt }}</p>
                <div class="d-flex justify-content-between align-items-center">
                  <div class="d-flex align-items-center">
                    <img :src="post.authorAvatar" :alt="post.author" class="rounded-circle me-2" width="25" height="25">
                    <small class="text-muted">{{ post.author }}</small>
                  </div>
                  <small class="text-muted">
                    <i class="bi bi-eye me-1"></i>{{ post.views.toLocaleString() }}
                  </small>
                </div>
              </div>
              <div class="card-footer bg-transparent border-top-0">
                <div class="btn-group w-100">
                  <button class="btn btn-outline-primary btn-sm" @click="viewPost(post)">
                    <i class="bi bi-eye"></i>
                  </button>
                  <button class="btn btn-outline-warning btn-sm" @click="editPost(post)">
                    <i class="bi bi-pencil"></i>
                  </button>
                  <button class="btn btn-outline-danger btn-sm" @click="deletePost(post)">
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
            Showing {{ (currentPage - 1) * itemsPerPage + 1 }} - {{ Math.min(currentPage * itemsPerPage, filteredPosts.length) }} 
            of {{ filteredPosts.length }} posts
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

    <div class="modal fade" id="addPostModal" tabindex="-1">
      <div class="modal-dialog modal-lg">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title">Create New Post</h5>
            <button type="button" class="btn-close" data-bs-dismiss="modal"></button>
          </div>
          <div class="modal-body">
            <form>
              <div class="mb-3">
                <label class="form-label">Post Title</label>
                <input type="text" class="form-control" v-model="newPost.title" placeholder="Enter post title">
              </div>
              <div class="row mb-3">
                <div class="col-md-6">
                  <label class="form-label">Category</label>
                  <select class="form-select" v-model="newPost.category">
                    <option value="coffee">Coffee</option>
                    <option value="tips">Tips & Tricks</option>
                    <option value="review">Review</option>
                    <option value="news">News</option>
                  </select>
                </div>
                <div class="col-md-6">
                  <label class="form-label">Status</label>
                  <select class="form-select" v-model="newPost.status">
                    <option value="draft">Draft</option>
                    <option value="pending">Pending Review</option>
                    <option value="published">Publish Now</option>
                  </select>
                </div>
              </div>
              <div class="mb-3">
                <label class="form-label">Short Description</label>
                <textarea class="form-control" rows="3" v-model="newPost.excerpt" placeholder="Enter short description for the post"></textarea>
              </div>
              <div class="mb-3">
                <label class="form-label">Post Content</label>
                <textarea class="form-control" rows="6" v-model="newPost.content" placeholder="Enter post content"></textarea>
              </div>
              <div class="mb-3">
                <label class="form-label">Featured Image</label>
                <input type="file" class="form-control" accept="image/*">
                <small class="text-muted">Select featured image for the post (JPG, PNG)</small>
              </div>
            </form>
          </div>
          <div class="modal-footer">
            <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Cancel</button>
            <button type="button" class="btn btn-outline-success" @click="saveAsDraft">Save as Draft</button>
            <button type="button" class="btn btn-success" @click="publishPost">Publish</button>
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
const filterCategory = ref('')
const filterStatus = ref('')
const filterAuthor = ref('')
const currentView = ref('table')
const currentPage = ref(1)
const itemsPerPage = ref(10)
const selectedPosts = ref([])

const viewModes = [
  { value: 'table', icon: 'bi bi-table' },
  { value: 'grid', icon: 'bi bi-grid-3x3-gap' }
]

const newPost = reactive({
  title: '',
  category: 'coffee',
  status: 'draft',
  excerpt: '',
  content: ''
})

const posts = ref([
  {
    id: 1,
    title: 'Complete Guide to Vietnamese Coffee Brewing',
    excerpt: 'Discover the secrets of traditional Vietnamese coffee brewing...',
    content: 'Detailed content about Vietnamese coffee brewing methods...',
    thumbnail: 'https://i.pinimg.com/736x/53/e8/4d/53e84d256bf61c233855e849c2ced36f.jpg',
    author: 'Admin',
    authorAvatar: 'https://i.pinimg.com/736x/21/24/92/21249201424022cdd93cd144f099b056.jpg',
    category: 'coffee',
    status: 'published',
    views: 12500,
    createdAt: '2024-09-15',
    updatedAt: '2024-09-20'
  },
  {
    id: 2,
    title: 'Top 10 Best Coffee Types in Vietnam',
    excerpt: 'List of the most beloved coffee types in Vietnam...',
    content: 'Details about famous Vietnamese coffee varieties...',
    thumbnail: 'https://i.pinimg.com/736x/5f/8c/14/5f8c1486ca00a8d5b245333ee0a59f3e.jpg',
    author: 'Editor',
    authorAvatar: 'https://i.pinimg.com/736x/7f/e6/b3/7fe6b34e49f964daf8803f80989276d0.jpg',
    category: 'review',
    status: 'published',
    views: 9800,
    createdAt: '2024-09-10',
    updatedAt: '2024-09-18'
  },
  {
    id: 3,
    title: 'How to Choose Coffee Machine for Home',
    excerpt: 'Guide to selecting the perfect coffee machine...',
    content: 'Important criteria when choosing a coffee machine...',
    thumbnail: 'https://i.pinimg.com/736x/64/dd/d3/64ddd3fd0b7510d7257d31f380a00095.jpg',
    author: 'Admin',
    authorAvatar: 'https://i.pinimg.com/736x/21/24/92/21249201424022cdd93cd144f099b056.jpg',
    category: 'tips',
    status: 'draft',
    views: 0,
    createdAt: '2024-10-01',
    updatedAt: '2024-10-01'
  },
  {
    id: 4,
    title: 'Latest News in Vietnamese Coffee Industry',
    excerpt: 'Updates on the latest news in coffee industry...',
    content: 'Information about the coffee industry situation...',
    thumbnail: 'https://i.pinimg.com/736x/ad/7a/fb/ad7afbf43cdd782e42065a21832d25d2.jpg',
    author: 'Editor',
    authorAvatar: 'https://i.pinimg.com/736x/7f/e6/b3/7fe6b34e49f964daf8803f80989276d0.jpg',
    category: 'news',
    status: 'pending',
    views: 0,
    createdAt: '2024-10-03',
    updatedAt: '2024-10-03'
  }
])

// Computed
const filteredPosts = computed(() => {
  return posts.value.filter(post => {
    const matchesSearch = !searchQuery.value || 
      post.title.toLowerCase().includes(searchQuery.value.toLowerCase()) ||
      post.excerpt.toLowerCase().includes(searchQuery.value.toLowerCase())
    
    const matchesCategory = !filterCategory.value || post.category === filterCategory.value
    const matchesStatus = !filterStatus.value || post.status === filterStatus.value
    const matchesAuthor = !filterAuthor.value || post.author.toLowerCase() === filterAuthor.value.toLowerCase()
    
    return matchesSearch && matchesCategory && matchesStatus && matchesAuthor
  })
})

const totalPages = computed(() => Math.ceil(filteredPosts.value.length / itemsPerPage.value))

const paginatedPosts = computed(() => {
  const start = (currentPage.value - 1) * itemsPerPage.value
  const end = start + itemsPerPage.value
  return filteredPosts.value.slice(start, end)
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
const getCategoryBadgeClass = (category) => {
  const classes = {
    coffee: 'bg-success',
    tips: 'bg-info',
    review: 'bg-warning',
    news: 'bg-primary'
  }
  return classes[category] || 'bg-secondary'
}

const getCategoryText = (category) => {
  const texts = {
    coffee: 'Coffee',
    tips: 'Tips & Tricks',
    review: 'Review',
    news: 'Tin tức'
  }
  return texts[category] || category
}

const getStatusBadgeClass = (status) => {
  const classes = {
    published: 'bg-success',
    draft: 'bg-secondary',
    pending: 'bg-warning'
  }
  return classes[status] || 'bg-secondary'
}

const getStatusText = (status) => {
  const texts = {
    published: 'Đã xuất bản',
    draft: 'Bản nháp',
    pending: 'Chờ duyệt'
  }
  return texts[status] || status
}

const getStatusIcon = (status) => {
  const icons = {
    published: 'bi bi-check-circle-fill',
    draft: 'bi bi-file-earmark-fill',
    pending: 'bi bi-clock-fill'
  }
  return icons[status] || 'bi-circle-fill'
}

const formatDate = (dateString) => {
  return new Date(dateString).toLocaleDateString('vi-VN')
}

const resetFilters = () => {
  searchQuery.value = ''
  filterCategory.value = ''
  filterStatus.value = ''
  filterAuthor.value = ''
  currentPage.value = 1
}

const toggleSelectAll = (event) => {
  if (event.target.checked) {
    selectedPosts.value = paginatedPosts.value.map(post => post.id)
  } else {
    selectedPosts.value = []
  }
}

const viewPost = (post) => {
  console.log('View post:', post)
}

const editPost = (post) => {
  console.log('Edit post:', post)
}

const deletePost = (post) => {
  if (confirm(`Are you sure you want to delete post "${post.title}"?`)) {
    const index = posts.value.findIndex(p => p.id === post.id)
    if (index > -1) {
      posts.value.splice(index, 1)
    }
  }
}

const duplicatePost = (post) => {
  console.log('Duplicate post:', post)
}

const changeStatus = (post) => {
  console.log('Change status for post:', post)
}

const saveAsDraft = () => {
  addPost('draft')
}

const publishPost = () => {
  addPost('published')
}

const addPost = (status) => {
  if (newPost.title && newPost.excerpt && newPost.content) {
    const id = Math.max(...posts.value.map(p => p.id)) + 1
    posts.value.unshift({
      id,
      title: newPost.title,
      excerpt: newPost.excerpt,
      content: newPost.content,
      thumbnail: 'https://via.placeholder.com/300x200',
      author: 'Admin',
      authorAvatar: 'https://i.pinimg.com/736x/21/24/92/21249201424022cdd93cd144f099b056.jpg',
      category: newPost.category,
      status: status || newPost.status,
      views: 0,
      createdAt: new Date().toISOString().split('T')[0],
      updatedAt: new Date().toISOString().split('T')[0]
    })
    
    // Reset form
    Object.assign(newPost, { title: '', category: 'coffee', status: 'draft', excerpt: '', content: '' })
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

.text-truncate {
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
}
</style>