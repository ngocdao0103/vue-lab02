<template>
  <div class="container-fluid p-4">
    <div class="d-flex justify-content-between align-items-center mb-4">
      <div>
        <h1 class="h3 text-success mb-0">Comment Management</h1>
        <nav aria-label="breadcrumb">
          <ol class="breadcrumb mb-0">
            <li class="breadcrumb-item"><RouterLink to="/admin/dashboard" class="text-decoration-none">Admin</RouterLink></li>
            <li class="breadcrumb-item active" aria-current="page">Comments</li>
          </ol>
        </nav>
      </div>
      <div class="btn-group">
        <button class="btn btn-outline-success" @click="moderateAll">
          <i class="bi bi-check-all me-2"></i>Approve All
        </button>
        <button class="btn btn-outline-danger" @click="deleteSelected" :disabled="selectedComments.length === 0">
          <i class="bi bi-trash me-2"></i>Delete Selected
        </button>
      </div>
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
                placeholder="Search by content, author..."
              >
            </div>
          </div>
          <div class="col-md-2">
            <label class="form-label">Status</label>
            <select v-model="filterStatus" class="form-select">
              <option value="">All Status</option>
              <option value="approved">Approved</option>
              <option value="pending">Pending</option>
              <option value="rejected">Rejected</option>
              <option value="spam">Spam</option>
            </select>
          </div>
          <div class="col-md-3">
            <label class="form-label">Post</label>
            <select v-model="filterPost" class="form-select">
              <option value="">All Posts</option>
              <option v-for="post in uniquePosts" :key="post" :value="post">{{ post }}</option>
            </select>
          </div>
          <div class="col-md-2">
            <label class="form-label">Time</label>
            <select v-model="filterTime" class="form-select">
              <option value="">All Time</option>
              <option value="today">Today</option>
              <option value="week">This Week</option>
              <option value="month">This Month</option>
            </select>
          </div>
          <div class="col-md-1 d-flex align-items-end">
            <button @click="resetFilters" class="btn btn-outline-secondary w-100">
              <i class="bi bi-arrow-clockwise"></i>
            </button>
          </div>
        </div>
      </div>
    </div>

    <div class="row g-4 mb-4">
      <div class="col-lg-3 col-md-6">
        <div class="card border-0 shadow-sm text-center">
          <div class="card-body">
            <div class="text-primary mb-2">
              <i class="bi bi-chat-dots-fill fs-1"></i>
            </div>
            <h4 class="text-primary">{{ statistics.total }}</h4>
            <small class="text-muted">Total Comments</small>
          </div>
        </div>
      </div>
      <div class="col-lg-3 col-md-6">
        <div class="card border-0 shadow-sm text-center">
          <div class="card-body">
            <div class="text-warning mb-2">
              <i class="bi bi-clock-fill fs-1"></i>
            </div>
            <h4 class="text-warning">{{ statistics.pending }}</h4>
            <small class="text-muted">Pending Review</small>
          </div>
        </div>
      </div>
      <div class="col-lg-3 col-md-6">
        <div class="card border-0 shadow-sm text-center">
          <div class="card-body">
            <div class="text-success mb-2">
              <i class="bi bi-check-circle-fill fs-1"></i>
            </div>
            <h4 class="text-success">{{ statistics.approved }}</h4>
            <small class="text-muted">Approved</small>
          </div>
        </div>
      </div>
      <div class="col-lg-3 col-md-6">
        <div class="card border-0 shadow-sm text-center">
          <div class="card-body">
            <div class="text-danger mb-2">
              <i class="bi bi-exclamation-triangle-fill fs-1"></i>
            </div>
            <h4 class="text-danger">{{ statistics.spam }}</h4>
            <small class="text-muted">Spam/Rejected</small>
          </div>
        </div>
      </div>
    </div>

    <div class="card border-0 shadow-sm">
      <div class="card-header bg-transparent border-bottom-0">
        <div class="d-flex justify-content-between align-items-center">
          <h6 class="mb-0">Comment List ({{ filteredComments.length }})</h6>
          <div class="btn-group btn-group-sm">
            <button 
              v-for="sort in sortOptions" 
              :key="sort.value"
              @click="currentSort = sort.value"
              :class="['btn', currentSort === sort.value ? 'btn-success' : 'btn-outline-success']"
            >
              {{ sort.label }}
            </button>
          </div>
        </div>
      </div>
      <div class="card-body p-0">
        <div class="table-responsive">
          <table class="table table-hover mb-0">
            <thead class="table-light">
              <tr>
                <th style="width: 50px;">
                  <input type="checkbox" class="form-check-input" @change="toggleSelectAll">
                </th>
                <th>Comment</th>
                <th style="width: 150px;">Status</th>
                <th style="width: 100px;">Rating</th>
                <th style="width: 150px;">Actions</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="comment in paginatedComments" :key="comment.id">
                <td>
                  <input type="checkbox" class="form-check-input" v-model="selectedComments" :value="comment.id">
                </td>
                <td>
                  <div class="comment-content">
                    <div class="d-flex justify-content-between align-items-start mb-2">
                      <div class="d-flex align-items-center">
                        <img :src="comment.authorAvatar" :alt="comment.author" class="rounded-circle me-3" width="40" height="40">
                        <div>
                          <h6 class="mb-0">{{ comment.author }}</h6>
                          <small class="text-muted">{{ comment.email }}</small>
                        </div>
                      </div>
                      <small class="text-muted">{{ formatDate(comment.createdAt) }}</small>
                    </div>
                    
                    <div class="mb-2">
                      <p class="mb-1" :class="{ 'text-muted': comment.status === 'rejected' }">{{ comment.content }}</p>
                      <small class="text-muted">
                        <i class="bi bi-file-earmark-text me-1"></i>
                        Post: <strong>{{ comment.postTitle }}</strong>
                      </small>
                    </div>

                    <div class="d-flex align-items-center text-muted small">
                      <span class="me-3">
                        <i class="bi bi-geo-alt me-1"></i>{{ comment.location }}
                      </span>
                      <span class="me-3">
                        <i class="bi bi-device-tablet me-1"></i>{{ comment.device }}
                      </span>
                      <span v-if="comment.parentId" class="me-3">
                        <i class="bi bi-reply me-1"></i>Reply
                      </span>
                    </div>
                  </div>
                </td>
                <td>
                  <span :class="['badge', 'fs-6', getStatusBadgeClass(comment.status)]">
                    <i :class="getStatusIcon(comment.status)" class="me-1"></i>
                    {{ getStatusText(comment.status) }}
                  </span>
                  <div v-if="comment.moderatedBy" class="text-muted small mt-1">
                    Bởi: {{ comment.moderatedBy }}
                  </div>
                </td>
                <td class="text-center">
                  <div class="d-flex align-items-center justify-content-center">
                    <div class="rating">
                      <i 
                        v-for="star in 5" 
                        :key="star"
                        :class="[
                          'bi', 
                          star <= comment.rating ? 'bi-star-fill text-warning' : 'bi-star text-muted'
                        ]"
                      ></i>
                    </div>
                  </div>
                  <small class="text-muted">{{ comment.rating }}/5</small>
                </td>
                <td>
                  <div class="btn-group-vertical btn-group-sm w-100">
                    <button 
                      v-if="comment.status === 'pending'"
                      @click="approveComment(comment)" 
                      class="btn btn-outline-success btn-sm"
                      title="Approve comment"
                    >
                      <i class="bi bi-check me-1"></i>Approve
                    </button>
                    <button 
                      v-if="comment.status === 'pending'"
                      @click="rejectComment(comment)" 
                      class="btn btn-outline-danger btn-sm"
                      title="Reject"
                    >
                      <i class="bi bi-x me-1"></i>Reject
                    </button>
                    <div class="btn-group btn-group-sm">
                      <button class="btn btn-outline-secondary dropdown-toggle" data-bs-toggle="dropdown">
                        <i class="bi bi-three-dots"></i>
                      </button>
                      <ul class="dropdown-menu">
                        <li><a class="dropdown-item" href="#" @click="viewComment(comment)">
                          <i class="bi bi-eye me-2"></i>View Details
                        </a></li>
                        <li><a class="dropdown-item" href="#" @click="replyComment(comment)">
                          <i class="bi bi-reply me-2"></i>Reply
                        </a></li>
                        <li><a class="dropdown-item" href="#" @click="markAsSpam(comment)">
                          <i class="bi bi-exclamation-triangle me-2"></i>Mark as Spam
                        </a></li>
                        <li><hr class="dropdown-divider"></li>
                        <li><a class="dropdown-item text-danger" href="#" @click="deleteComment(comment)">
                          <i class="bi bi-trash me-2"></i>Delete Permanently
                        </a></li>
                      </ul>
                    </div>
                  </div>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>

      <!-- Pagination -->
      <div class="card-footer bg-transparent">
        <div class="d-flex justify-content-between align-items-center">
          <div class="text-muted">
            Showing {{ (currentPage - 1) * itemsPerPage + 1 }} - {{ Math.min(currentPage * itemsPerPage, filteredComments.length) }} 
            of {{ filteredComments.length }} comments
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
  </div>
</template>

<script setup>
import { ref, computed, reactive } from 'vue'

// Data
const searchQuery = ref('')
const filterStatus = ref('')
const filterPost = ref('')
const filterTime = ref('')
const currentSort = ref('newest')
const currentPage = ref(1)
const itemsPerPage = ref(10)
const selectedComments = ref([])

const sortOptions = [
  { label: 'Newest', value: 'newest' },
  { label: 'Oldest', value: 'oldest' },
  { label: 'Top Rated', value: 'rating' }
]

const statistics = reactive({
  total: 245,
  pending: 18,
  approved: 210,
  spam: 17
})

const comments = ref([
  {
    id: 1,
    author: 'John Smith',
    email: 'john@email.com',
    authorAvatar: 'https://i.pinimg.com/736x/ce/d4/4a/ced44a15c6f187b76d6479a03bdd773f.jpg',
    content: 'Great article and very helpful! I tried following the guide and the coffee really tastes amazing. Thanks admin for sharing.',
    postTitle: 'Complete Guide to Vietnamese Coffee Brewing',
    status: 'approved',
    rating: 5,
    createdAt: '2024-10-03T10:30:00',
    location: 'Ho Chi Minh City',
    device: 'Mobile',
    moderatedBy: 'Admin',
    parentId: null
  },
  {
    id: 2,
    author: 'Jane Doe',
    email: 'jane@email.com',
    authorAvatar: 'https://i.pinimg.com/736x/3e/e8/38/3ee838140326cf1004815ed162f9ac96.jpg',
    content: 'I think the brewing method is a bit different from the traditional way. Could you explain more?',
    postTitle: 'Complete Guide to Vietnamese Coffee Brewing',
    status: 'pending',
    rating: 4,
    createdAt: '2024-10-03T09:15:00',
    location: 'Hanoi',
    device: 'Desktop',
    moderatedBy: null,
    parentId: null
  },
  {
    id: 3,
    author: 'Spammer Bot',
    email: 'spam@email.com',
    authorAvatar: 'https://i.pinimg.com/736x/f4/63/78/f463785304f39c136a1007f5ebd39597.jpg',
    content: 'Spam content here. This is not related to coffee at all!',
    postTitle: 'Top 10 Best Coffee Types',
    status: 'spam',
    rating: 1,
    createdAt: '2024-10-03T08:45:00',
    location: 'Da Nang',
    device: 'Mobile',
    moderatedBy: 'Moderator',
    parentId: null
  },
  {
    id: 4,
    author: 'Coffee Lover',
    email: 'coffee@email.com',
    authorAvatar: 'https://i.pinimg.com/736x/6f/a3/6a/6fa36aa2c367da06b2a4c8ae1cf9ee02.jpg',
    content: 'Thanks @John Smith for sharing. I also tried it and it was very successful!',
    postTitle: 'Complete Guide to Vietnamese Coffee Brewing',
    status: 'approved',
    rating: 5,
    createdAt: '2024-10-03T11:20:00',
    location: 'Can Tho',
    device: 'Tablet',
    moderatedBy: 'Admin',
    parentId: 1
  },
  {
    id: 5,
    author: 'Negative User',
    email: 'negative@email.com',
    authorAvatar: 'https://i.pinimg.com/736x/21/24/92/21249201424022cdd93cd144f099b056.jpg',
    content: 'This article is not helpful at all. Waste of time.',
    postTitle: 'How to Choose Coffee Machine',
    status: 'rejected',
    rating: 2,
    createdAt: '2024-10-02T16:30:00',
    location: 'Hai Phong',
    device: 'Mobile',
    moderatedBy: 'Moderator',
    parentId: null
  }
])

// Computed
const uniquePosts = computed(() => {
  return [...new Set(comments.value.map(comment => comment.postTitle))]
})

const filteredComments = computed(() => {
  let filtered = comments.value.filter(comment => {
    const matchesSearch = !searchQuery.value || 
      comment.content.toLowerCase().includes(searchQuery.value.toLowerCase()) ||
      comment.author.toLowerCase().includes(searchQuery.value.toLowerCase())
    
    const matchesStatus = !filterStatus.value || comment.status === filterStatus.value
    const matchesPost = !filterPost.value || comment.postTitle === filterPost.value
    
    // Time filter logic would go here
    const matchesTime = true // Simplified for demo
    
    return matchesSearch && matchesStatus && matchesPost && matchesTime
  })

  // Sort logic
  if (currentSort.value === 'newest') {
    filtered.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
  } else if (currentSort.value === 'oldest') {
    filtered.sort((a, b) => new Date(a.createdAt) - new Date(b.createdAt))
  } else if (currentSort.value === 'rating') {
    filtered.sort((a, b) => b.rating - a.rating)
  }

  return filtered
})

const totalPages = computed(() => Math.ceil(filteredComments.value.length / itemsPerPage.value))

const paginatedComments = computed(() => {
  const start = (currentPage.value - 1) * itemsPerPage.value
  const end = start + itemsPerPage.value
  return filteredComments.value.slice(start, end)
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
const getStatusBadgeClass = (status) => {
  const classes = {
    approved: 'bg-success',
    pending: 'bg-warning',
    rejected: 'bg-danger',
    spam: 'bg-dark'
  }
  return classes[status] || 'bg-secondary'
}

const getStatusText = (status) => {
  const texts = {
    approved: 'Approved',
    pending: 'Pending Review',
    rejected: 'Rejected',
    spam: 'Spam'
  }
  return texts[status] || status
}

const getStatusIcon = (status) => {
  const icons = {
    approved: 'bi bi-check-circle-fill',
    pending: 'bi bi-clock-fill',
    rejected: 'bi bi-x-circle-fill',
    spam: 'bi bi-exclamation-triangle-fill'
  }
  return icons[status] || 'bi-circle-fill'
}

const formatDate = (dateString) => {
  const date = new Date(dateString)
  return date.toLocaleDateString('vi-VN') + ' ' + date.toLocaleTimeString('vi-VN', { hour: '2-digit', minute: '2-digit' })
}

const resetFilters = () => {
  searchQuery.value = ''
  filterStatus.value = ''
  filterPost.value = ''
  filterTime.value = ''
  currentPage.value = 1
}

const toggleSelectAll = (event) => {
  if (event.target.checked) {
    selectedComments.value = paginatedComments.value.map(comment => comment.id)
  } else {
    selectedComments.value = []
  }
}

const approveComment = (comment) => {
  comment.status = 'approved'
  comment.moderatedBy = 'Admin'
  statistics.pending--
  statistics.approved++
}

const rejectComment = (comment) => {
  comment.status = 'rejected'
  comment.moderatedBy = 'Admin'
  statistics.pending--
}

const markAsSpam = (comment) => {
  comment.status = 'spam'
  comment.moderatedBy = 'Admin'
  if (comment.status === 'pending') statistics.pending--
  if (comment.status === 'approved') statistics.approved--
  statistics.spam++
}

const deleteComment = (comment) => {
  if (confirm(`Bạn có chắc chắn muốn xóa vĩnh viễn bình luận này?`)) {
    const index = comments.value.findIndex(c => c.id === comment.id)
    if (index > -1) {
      comments.value.splice(index, 1)
      statistics.total--
      if (comment.status === 'pending') statistics.pending--
      if (comment.status === 'approved') statistics.approved--
      if (comment.status === 'spam') statistics.spam--
    }
  }
}

const viewComment = (comment) => {
  console.log('View comment:', comment)
}

const replyComment = (comment) => {
  console.log('Reply to comment:', comment)
}

const moderateAll = () => {
  const pendingComments = comments.value.filter(c => c.status === 'pending')
  pendingComments.forEach(comment => {
    comment.status = 'approved'
    comment.moderatedBy = 'Admin'
  })
  statistics.approved += statistics.pending
  statistics.pending = 0
}

const deleteSelected = () => {
  if (selectedComments.value.length > 0 && confirm(`Bạn có chắc chắn muốn xóa ${selectedComments.value.length} bình luận đã chọn?`)) {
    selectedComments.value.forEach(id => {
      const index = comments.value.findIndex(c => c.id === id)
      if (index > -1) {
        const comment = comments.value[index]
        comments.value.splice(index, 1)
        statistics.total--
        if (comment.status === 'pending') statistics.pending--
        if (comment.status === 'approved') statistics.approved--
        if (comment.status === 'spam') statistics.spam--
      }
    })
    selectedComments.value = []
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

.comment-content {
  max-width: 600px;
}

.rating .bi {
  font-size: 0.875rem;
}

.btn-group-vertical .btn {
  margin-bottom: 2px;
}

.btn-group-vertical .btn:last-child {
  margin-bottom: 0;
}

.pagination .page-link {
  border: none;
  color: #198754;
}

.pagination .page-item.active .page-link {
  background-color: #198754;
  border-color: #198754;
}

.dropdown-menu {
  box-shadow: 0 0.5rem 1rem rgba(0, 0, 0, 0.15);
}

.card:hover {
  transform: translateY(-1px);
  transition: transform 0.2s ease-in-out;
}
</style>