<template>
  <div class="container-fluid p-4">
    <div class="d-flex justify-content-between align-items-center mb-4">
      <div>
        <h1 class="h3 text-success mb-0">Order Management</h1>
        <nav aria-label="breadcrumb">
          <ol class="breadcrumb mb-0">
            <li class="breadcrumb-item"><RouterLink to="/admin/dashboard" class="text-decoration-none">Admin</RouterLink></li>
            <li class="breadcrumb-item active" aria-current="page">Orders</li>
          </ol>
        </nav>
      </div>
      <button class="btn btn-success" data-bs-toggle="modal" data-bs-target="#addOrderModal">
        <i class="bi bi-cart-plus me-2"></i>Create Order
      </button>
    </div>

    <div class="card border-0 shadow-sm mb-4">
      <div class="card-body">
        <div class="row g-3">
          <div class="col-md-3">
            <label class="form-label">Search</label>
            <div class="input-group">
              <span class="input-group-text"><i class="bi bi-search"></i></span>
              <input 
                v-model="searchQuery" 
                type="text" 
                class="form-control" 
                placeholder="Search by order ID, customer..."
              >
            </div>
          </div>
          <div class="col-md-2">
            <label class="form-label">Status</label>
            <select v-model="filterStatus" class="form-select">
              <option value="">All Status</option>
              <option value="pending">Pending</option>
              <option value="confirmed">Confirmed</option>
              <option value="preparing">Preparing</option>
              <option value="ready">Ready</option>
              <option value="completed">Completed</option>
              <option value="cancelled">Cancelled</option>
            </select>
          </div>
          <div class="col-md-2">
            <label class="form-label">Payment</label>
            <select v-model="filterPayment" class="form-select">
              <option value="">All Payments</option>
              <option value="paid">Paid</option>
              <option value="pending">Pending</option>
              <option value="failed">Failed</option>
              <option value="refunded">Refunded</option>
            </select>
          </div>
          <div class="col-md-2">
            <label class="form-label">Date Range</label>
            <select v-model="filterDate" class="form-select">
              <option value="">All Dates</option>
              <option value="today">Today</option>
              <option value="week">This Week</option>
              <option value="month">This Month</option>
              <option value="quarter">This Quarter</option>
            </select>
          </div>
          <div class="col-md-3 d-flex align-items-end gap-2">
            <button @click="resetFilters" class="btn btn-outline-secondary">
              <i class="bi bi-arrow-clockwise me-2"></i>Reset
            </button>
            <button @click="exportOrders" class="btn btn-outline-success">
              <i class="bi bi-download me-2"></i>Export
            </button>
          </div>
        </div>
      </div>
    </div>

    <div class="row mb-4">
      <div class="col-md-3">
        <div class="card border-0 bg-primary bg-opacity-10">
          <div class="card-body text-center">
            <i class="bi bi-cart-check fs-1 text-primary mb-2"></i>
            <h4 class="text-primary mb-0">{{ orderStats.total }}</h4>
            <small class="text-muted">Total Orders</small>
          </div>
        </div>
      </div>
      <div class="col-md-3">
        <div class="card border-0 bg-warning bg-opacity-10">
          <div class="card-body text-center">
            <i class="bi bi-clock fs-1 text-warning mb-2"></i>
            <h4 class="text-warning mb-0">{{ orderStats.pending }}</h4>
            <small class="text-muted">Pending Orders</small>
          </div>
        </div>
      </div>
      <div class="col-md-3">
        <div class="card border-0 bg-success bg-opacity-10">
          <div class="card-body text-center">
            <i class="bi bi-check-circle fs-1 text-success mb-2"></i>
            <h4 class="text-success mb-0">{{ orderStats.completed }}</h4>
            <small class="text-muted">Completed Orders</small>
          </div>
        </div>
      </div>
      <div class="col-md-3">
        <div class="card border-0 bg-info bg-opacity-10">
          <div class="card-body text-center">
            <i class="bi bi-currency-dollar fs-1 text-info mb-2"></i>
            <h4 class="text-info mb-0">${{ orderStats.revenue }}</h4>
            <small class="text-muted">Today's Revenue</small>
          </div>
        </div>
      </div>
    </div>

    <div class="card border-0 shadow-sm">
      <div class="card-header bg-transparent border-bottom-0">
        <div class="d-flex justify-content-between align-items-center">
          <h6 class="mb-0">Order List ({{ filteredOrders.length }})</h6>
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
                <th>Order ID</th>
                <th>Customer</th>
                <th>Items</th>
                <th>Total</th>
                <th>Status</th>
                <th>Payment</th>
                <th>Date</th>
                <th class="text-center">Actions</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="order in paginatedOrders" :key="order.id">
                <td>
                  <input type="checkbox" class="form-check-input" v-model="selectedOrders" :value="order.id">
                </td>
                <td>
                  <strong class="text-primary">#{{ order.orderNumber }}</strong>
                </td>
                <td>
                  <div class="d-flex align-items-center">
                    <img :src="order.customer.avatar" :alt="order.customer.name" class="rounded-circle me-3" width="40" height="40">
                    <div>
                      <h6 class="mb-0">{{ order.customer.name }}</h6>
                      <small class="text-muted">{{ order.customer.email }}</small>
                    </div>
                  </div>
                </td>
                <td>
                  <div class="d-flex align-items-center">
                    <span class="badge bg-secondary me-2">{{ order.items.length }} items</span>
                    <small class="text-muted">{{ getItemsSummary(order.items) }}</small>
                  </div>
                </td>
                <td class="fw-bold text-success">${{ order.total.toFixed(2) }}</td>
                <td>
                  <span :class="['badge', getStatusBadgeClass(order.status)]">
                    <i :class="getStatusIcon(order.status)" class="me-1"></i>
                    {{ getStatusText(order.status) }}
                  </span>
                </td>
                <td>
                  <span :class="['badge', getPaymentBadgeClass(order.paymentStatus)]">
                    <i :class="getPaymentIcon(order.paymentStatus)" class="me-1"></i>
                    {{ getPaymentText(order.paymentStatus) }}
                  </span>
                </td>
                <td>{{ formatDateTime(order.createdAt) }}</td>
                <td class="text-center">
                  <div class="btn-group btn-group-sm">
                    <button class="btn btn-outline-primary" @click="viewOrder(order)" title="View Details">
                      <i class="bi bi-eye"></i>
                    </button>
                    <button class="btn btn-outline-warning" @click="editOrder(order)" title="Edit">
                      <i class="bi bi-pencil"></i>
                    </button>
                    <div class="btn-group btn-group-sm">
                      <button class="btn btn-outline-secondary dropdown-toggle" data-bs-toggle="dropdown">
                        <i class="bi bi-three-dots"></i>
                      </button>
                      <ul class="dropdown-menu">
                        <li><a class="dropdown-item" href="#" @click="updateStatus(order)">
                          <i class="bi bi-arrow-repeat me-2"></i>Update Status
                        </a></li>
                        <li><a class="dropdown-item" href="#" @click="printReceipt(order)">
                          <i class="bi bi-printer me-2"></i>Print Receipt
                        </a></li>
                        <li><hr class="dropdown-divider"></li>
                        <li><a class="dropdown-item text-danger" href="#" @click="cancelOrder(order)">
                          <i class="bi bi-x-circle me-2"></i>Cancel Order
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
          <div v-for="order in paginatedOrders" :key="order.id" class="col-xl-4 col-lg-6">
            <div class="card h-100 border-0 shadow-sm">
              <div class="card-header bg-transparent">
                <div class="d-flex justify-content-between align-items-center">
                  <strong class="text-primary">#{{ order.orderNumber }}</strong>
                  <span :class="['badge', getStatusBadgeClass(order.status)]">
                    {{ getStatusText(order.status) }}
                  </span>
                </div>
              </div>
              <div class="card-body">
                <div class="d-flex align-items-center mb-3">
                  <img :src="order.customer.avatar" :alt="order.customer.name" class="rounded-circle me-3" width="50" height="50">
                  <div>
                    <h6 class="mb-0">{{ order.customer.name }}</h6>
                    <small class="text-muted">{{ order.customer.email }}</small>
                  </div>
                </div>
                <div class="mb-3">
                  <h6 class="mb-2">Items ({{ order.items.length }}):</h6>
                  <div class="row g-2">
                    <div v-for="item in order.items.slice(0, 3)" :key="item.id" class="col-4">
                      <img :src="item.image" :alt="item.name" class="img-fluid rounded" style="height: 50px; object-fit: cover;">
                    </div>
                    <div v-if="order.items.length > 3" class="col-4 d-flex align-items-center justify-content-center">
                      <span class="text-muted">+{{ order.items.length - 3 }} more</span>
                    </div>
                  </div>
                </div>
                <div class="d-flex justify-content-between align-items-center mb-3">
                  <span class="h5 text-success mb-0">${{ order.total.toFixed(2) }}</span>
                  <span :class="['badge', getPaymentBadgeClass(order.paymentStatus)]">
                    {{ getPaymentText(order.paymentStatus) }}
                  </span>
                </div>
                <small class="text-muted">{{ formatDateTime(order.createdAt) }}</small>
              </div>
              <div class="card-footer bg-transparent">
                <div class="btn-group w-100">
                  <button class="btn btn-outline-primary btn-sm" @click="viewOrder(order)">
                    <i class="bi bi-eye"></i>
                  </button>
                  <button class="btn btn-outline-warning btn-sm" @click="editOrder(order)">
                    <i class="bi bi-pencil"></i>
                  </button>
                  <button class="btn btn-outline-success btn-sm" @click="updateStatus(order)">
                    <i class="bi bi-arrow-repeat"></i>
                  </button>
                  <button class="btn btn-outline-danger btn-sm" @click="cancelOrder(order)">
                    <i class="bi bi-x-circle"></i>
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
            Showing {{ (currentPage - 1) * itemsPerPage + 1 }} - {{ Math.min(currentPage * itemsPerPage, filteredOrders.length) }} 
            of {{ filteredOrders.length }} orders
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

    <div class="modal fade" id="addOrderModal" tabindex="-1">
      <div class="modal-dialog modal-lg">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title">Create New Order</h5>
            <button type="button" class="btn-close" data-bs-dismiss="modal"></button>
          </div>
          <div class="modal-body">
            <form>
              <div class="row">
                <div class="col-md-6">
                  <div class="mb-3">
                    <label class="form-label">Customer Name</label>
                    <input type="text" class="form-control" v-model="newOrder.customerName">
                  </div>
                </div>
                <div class="col-md-6">
                  <div class="mb-3">
                    <label class="form-label">Customer Email</label>
                    <input type="email" class="form-control" v-model="newOrder.customerEmail">
                  </div>
                </div>
              </div>
              <div class="mb-3">
                <label class="form-label">Customer Phone</label>
                <input type="tel" class="form-control" v-model="newOrder.customerPhone">
              </div>
              <div class="mb-3">
                <label class="form-label">Order Type</label>
                <select class="form-select" v-model="newOrder.orderType">
                  <option value="dine-in">Dine In</option>
                  <option value="takeaway">Takeaway</option>
                  <option value="delivery">Delivery</option>
                </select>
              </div>
              <div class="mb-3">
                <label class="form-label">Payment Method</label>
                <select class="form-select" v-model="newOrder.paymentMethod">
                  <option value="cash">Cash</option>
                  <option value="card">Credit Card</option>
                  <option value="mobile">Mobile Payment</option>
                </select>
              </div>
              <div class="mb-3">
                <label class="form-label">Notes</label>
                <textarea class="form-control" rows="3" v-model="newOrder.notes" placeholder="Special instructions..."></textarea>
              </div>
            </form>
          </div>
          <div class="modal-footer">
            <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Cancel</button>
            <button type="button" class="btn btn-success" @click="createOrder">Create Order</button>
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
const filterPayment = ref('')
const filterDate = ref('')
const currentView = ref('table')
const currentPage = ref(1)
const itemsPerPage = ref(10)
const selectedOrders = ref([])

const viewModes = [
  { value: 'table', icon: 'bi bi-table' },
  { value: 'grid', icon: 'bi bi-grid' }
]

const newOrder = reactive({
  customerName: '',
  customerEmail: '',
  customerPhone: '',
  orderType: 'dine-in',
  paymentMethod: 'cash',
  notes: ''
})

const orderStats = ref({
  total: 1247,
  pending: 23,
  completed: 189,
  revenue: 3248.50
})

const orders = ref([
  {
    id: 1,
    orderNumber: 'ORD001',
    customer: {
      name: 'John Smith',
      email: 'john@example.com',
      avatar: 'https://i.pinimg.com/736x/ce/d4/4a/ced44a15c6f187b76d6479a03bdd773f.jpg',
      phone: '+1234567890'
    },
    items: [
      { id: 1, name: 'Espresso', quantity: 2, price: 5.99, image: 'https://i.pinimg.com/736x/53/e8/4d/53e84d256bf61c233855e849c2ced36f.jpg' },
      { id: 2, name: 'Croissant', quantity: 1, price: 4.50, image: 'https://i.pinimg.com/736x/64/dd/d3/64ddd3fd0b7510d7257d31f380a00095.jpg' }
    ],
    total: 16.48,
    status: 'preparing',
    paymentStatus: 'paid',
    paymentMethod: 'card',
    orderType: 'dine-in',
    createdAt: '2024-10-03T09:30:00',
    notes: 'Extra hot, no sugar'
  },
  {
    id: 2,
    orderNumber: 'ORD002',
    customer: {
      name: 'Emma Wilson',
      email: 'emma@example.com',
      avatar: 'https://i.pinimg.com/736x/3e/e8/38/3ee838140326cf1004815ed162f9ac96.jpg',
      phone: '+1234567891'
    },
    items: [
      { id: 3, name: 'Latte', quantity: 1, price: 6.99, image: 'https://i.pinimg.com/736x/5f/8c/14/5f8c1486ca00a8d5b245333ee0a59f3e.jpg' },
      { id: 4, name: 'Blueberry Muffin', quantity: 2, price: 3.99, image: 'https://i.pinimg.com/736x/64/dd/d3/64ddd3fd0b7510d7257d31f380a00095.jpg' }
    ],
    total: 14.97,
    status: 'ready',
    paymentStatus: 'paid',
    paymentMethod: 'mobile',
    orderType: 'takeaway',
    createdAt: '2024-10-03T10:15:00',
    notes: ''
  },
  {
    id: 3,
    orderNumber: 'ORD003',
    customer: {
      name: 'Mike Johnson',
      email: 'mike@example.com',
      avatar: 'https://i.pinimg.com/736x/6f/a3/6a/6fa36aa2c367da06b2a4c8ae1cf9ee02.jpg',
      phone: '+1234567892'
    },
    items: [
      { id: 5, name: 'Cappuccino', quantity: 3, price: 5.49, image: 'https://i.pinimg.com/736x/53/e8/4d/53e84d256bf61c233855e849c2ced36f.jpg' },
      { id: 6, name: 'Sandwich', quantity: 1, price: 8.99, image: 'https://i.pinimg.com/736x/64/dd/d3/64ddd3fd0b7510d7257d31f380a00095.jpg' }
    ],
    total: 25.46,
    status: 'completed',
    paymentStatus: 'paid',
    paymentMethod: 'cash',
    orderType: 'delivery',
    createdAt: '2024-10-03T08:45:00',
    notes: 'Delivery to office building'
  },
  {
    id: 4,
    orderNumber: 'ORD004',
    customer: {
      name: 'Sarah Davis',
      email: 'sarah@example.com',
      avatar: 'https://i.pinimg.com/736x/21/24/92/21249201424022cdd93cd144f099b056.jpg',
      phone: '+1234567893'
    },
    items: [
      { id: 7, name: 'Green Tea', quantity: 1, price: 4.99, image: 'https://i.pinimg.com/736x/5f/8c/14/5f8c1486ca00a8d5b245333ee0a59f3e.jpg' }
    ],
    total: 4.99,
    status: 'pending',
    paymentStatus: 'pending',
    paymentMethod: 'card',
    orderType: 'dine-in',
    createdAt: '2024-10-03T11:00:00',
    notes: ''
  },
  {
    id: 5,
    orderNumber: 'ORD005',
    customer: {
      name: 'Tom Brown',
      email: 'tom@example.com',
      avatar: 'https://i.pinimg.com/736x/f4/63/78/f463785304f39c136a1007f5ebd39597.jpg',
      phone: '+1234567894'
    },
    items: [
      { id: 8, name: 'Americano', quantity: 2, price: 4.99, image: 'https://i.pinimg.com/736x/53/e8/4d/53e84d256bf61c233855e849c2ced36f.jpg' },
      { id: 9, name: 'Donut', quantity: 3, price: 2.99, image: 'https://i.pinimg.com/736x/64/dd/d3/64ddd3fd0b7510d7257d31f380a00095.jpg' }
    ],
    total: 18.95,
    status: 'cancelled',
    paymentStatus: 'refunded',
    paymentMethod: 'card',
    orderType: 'takeaway',
    createdAt: '2024-10-02T16:30:00',
    notes: 'Customer cancelled - allergic reaction'
  }
])

const filteredOrders = computed(() => {
  return orders.value.filter(order => {
    const matchesSearch = !searchQuery.value || 
      order.orderNumber.toLowerCase().includes(searchQuery.value.toLowerCase()) ||
      order.customer.name.toLowerCase().includes(searchQuery.value.toLowerCase()) ||
      order.customer.email.toLowerCase().includes(searchQuery.value.toLowerCase())
    
    const matchesStatus = !filterStatus.value || order.status === filterStatus.value
    const matchesPayment = !filterPayment.value || order.paymentStatus === filterPayment.value
    
    let matchesDate = true
    if (filterDate.value) {
      const orderDate = new Date(order.createdAt)
      const today = new Date()
      
      switch (filterDate.value) {
        case 'today':
          matchesDate = orderDate.toDateString() === today.toDateString()
          break
        case 'week':
          const weekAgo = new Date(today.getTime() - 7 * 24 * 60 * 60 * 1000)
          matchesDate = orderDate >= weekAgo
          break
        case 'month':
          matchesDate = orderDate.getMonth() === today.getMonth() && orderDate.getFullYear() === today.getFullYear()
          break
        case 'quarter':
          const quarter = Math.floor(today.getMonth() / 3)
          const orderQuarter = Math.floor(orderDate.getMonth() / 3)
          matchesDate = orderQuarter === quarter && orderDate.getFullYear() === today.getFullYear()
          break
      }
    }
    
    return matchesSearch && matchesStatus && matchesPayment && matchesDate
  })
})

const totalPages = computed(() => Math.ceil(filteredOrders.value.length / itemsPerPage.value))

const paginatedOrders = computed(() => {
  const start = (currentPage.value - 1) * itemsPerPage.value
  const end = start + itemsPerPage.value
  return filteredOrders.value.slice(start, end)
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

const getStatusBadgeClass = (status) => {
  const classes = {
    pending: 'bg-warning',
    confirmed: 'bg-info',
    preparing: 'bg-primary',
    ready: 'bg-success',
    completed: 'bg-success',
    cancelled: 'bg-danger'
  }
  return classes[status] || 'bg-secondary'
}

const getStatusText = (status) => {
  const texts = {
    pending: 'Pending',
    confirmed: 'Confirmed',
    preparing: 'Preparing',
    ready: 'Ready',
    completed: 'Completed',
    cancelled: 'Cancelled'
  }
  return texts[status] || status
}

const getStatusIcon = (status) => {
  const icons = {
    pending: 'bi bi-clock-fill',
    confirmed: 'bi bi-check-circle-fill',
    preparing: 'bi bi-arrow-repeat',
    ready: 'bi bi-check2-circle',
    completed: 'bi bi-check-circle-fill',
    cancelled: 'bi bi-x-circle-fill'
  }
  return icons[status] || 'bi-circle-fill'
}

const getPaymentBadgeClass = (paymentStatus) => {
  const classes = {
    paid: 'bg-success',
    pending: 'bg-warning',
    failed: 'bg-danger',
    refunded: 'bg-secondary'
  }
  return classes[paymentStatus] || 'bg-secondary'
}

const getPaymentText = (paymentStatus) => {
  const texts = {
    paid: 'Paid',
    pending: 'Pending',
    failed: 'Failed',
    refunded: 'Refunded'
  }
  return texts[paymentStatus] || paymentStatus
}

const getPaymentIcon = (paymentStatus) => {
  const icons = {
    paid: 'bi bi-check-circle-fill',
    pending: 'bi bi-clock-fill',
    failed: 'bi bi-x-circle-fill',
    refunded: 'bi bi-arrow-return-left'
  }
  return icons[paymentStatus] || 'bi-circle-fill'
}

const getItemsSummary = (items) => {
  if (items.length <= 2) {
    return items.map(item => item.name).join(', ')
  }
  return `${items[0].name}, ${items[1].name}...`
}

const formatDateTime = (dateString) => {
  const date = new Date(dateString)
  return date.toLocaleDateString('en-US') + ' ' + date.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' })
}

const resetFilters = () => {
  searchQuery.value = ''
  filterStatus.value = ''
  filterPayment.value = ''
  filterDate.value = ''
  currentPage.value = 1
}

const toggleSelectAll = (event) => {
  if (event.target.checked) {
    selectedOrders.value = paginatedOrders.value.map(order => order.id)
  } else {
    selectedOrders.value = []
  }
}

const viewOrder = (order) => {
  console.log('View order:', order)
}

const editOrder = (order) => {
  console.log('Edit order:', order)
}

const updateStatus = (order) => {
  const statuses = ['pending', 'confirmed', 'preparing', 'ready', 'completed']
  const currentIndex = statuses.indexOf(order.status)
  
  if (currentIndex < statuses.length - 1) {
    const orderIndex = orders.value.findIndex(o => o.id === order.id)
    if (orderIndex > -1) {
      orders.value[orderIndex].status = statuses[currentIndex + 1]
    }
  }
}

const cancelOrder = (order) => {
  if (confirm(`Are you sure you want to cancel order #${order.orderNumber}?`)) {
    const orderIndex = orders.value.findIndex(o => o.id === order.id)
    if (orderIndex > -1) {
      orders.value[orderIndex].status = 'cancelled'
      orders.value[orderIndex].paymentStatus = 'refunded'
    }
  }
}

const printReceipt = (order) => {
  console.log('Print receipt for order:', order)
}

const exportOrders = () => {
  console.log('Export orders:', filteredOrders.value)
}

const createOrder = () => {
  if (newOrder.customerName && newOrder.customerEmail) {
    const id = Math.max(...orders.value.map(o => o.id)) + 1
    const orderNumber = `ORD${String(id).padStart(3, '0')}`
    
    orders.value.unshift({
      id,
      orderNumber,
      customer: {
        name: newOrder.customerName,
        email: newOrder.customerEmail,
        avatar: 'https://i.pinimg.com/736x/6f/a3/6a/6fa36aa2c367da06b2a4c8ae1cf9ee02.jpg',
        phone: newOrder.customerPhone
      },
      items: [],
      total: 0,
      status: 'pending',
      paymentStatus: 'pending',
      paymentMethod: newOrder.paymentMethod,
      orderType: newOrder.orderType,
      createdAt: new Date().toISOString(),
      notes: newOrder.notes
    })
    
    Object.assign(newOrder, {
      customerName: '',
      customerEmail: '',
      customerPhone: '',
      orderType: 'dine-in',
      paymentMethod: 'cash',
      notes: ''
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

.bg-opacity-10 {
  background-color: rgba(var(--bs-primary-rgb), 0.1) !important;
}

.text-primary {
  color: #198754 !important;
}
</style>