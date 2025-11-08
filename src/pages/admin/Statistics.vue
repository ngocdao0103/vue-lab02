<template>
  <div class="container-fluid p-4">
    <div class="d-flex justify-content-between align-items-center mb-4">
      <div>
        <h1 class="h3 text-success mb-0">Statistics Overview</h1>
        <nav aria-label="breadcrumb">
          <ol class="breadcrumb mb-0">
            <li class="breadcrumb-item"><RouterLink to="/admin/dashboard" class="text-decoration-none">Admin</RouterLink></li>
            <li class="breadcrumb-item active" aria-current="page">Statistics</li>
          </ol>
        </nav>
      </div>
      <div class="btn-group" role="group">
        <button 
          v-for="period in timePeriods" 
          :key="period.value"
          @click="selectedPeriod = period.value"
          :class="['btn', selectedPeriod === period.value ? 'btn-success' : 'btn-outline-success']"
        >
          {{ period.label }}
        </button>
      </div>
    </div>

    <div class="row g-4 mb-4">
      <div class="col-xl-3 col-md-6">
        <div class="card border-0 shadow-sm h-100">
          <div class="card-body">
            <div class="d-flex align-items-center">
              <div class="flex-shrink-0">
                <div class="bg-primary bg-opacity-10 p-3 rounded-3">
                  <i class="bi bi-people-fill fs-4 text-primary"></i>
                </div>
              </div>
              <div class="flex-grow-1 ms-3">
                <h6 class="card-title text-muted mb-1">Total Users</h6>
                <div class="d-flex align-items-baseline">
                  <h3 class="mb-0 me-2">{{ statistics.totalUsers.toLocaleString() }}</h3>
                  <small :class="['badge', statistics.userGrowth >= 0 ? 'bg-success' : 'bg-danger']">
                    <i :class="['bi', statistics.userGrowth >= 0 ? 'bi-arrow-up' : 'bi-arrow-down']"></i>
                    {{ Math.abs(statistics.userGrowth) }}%
                  </small>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div class="col-xl-3 col-md-6">
        <div class="card border-0 shadow-sm h-100">
          <div class="card-body">
            <div class="d-flex align-items-center">
              <div class="flex-shrink-0">
                <div class="bg-success bg-opacity-10 p-3 rounded-3">
                  <i class="bi bi-file-earmark-text-fill fs-4 text-success"></i>
                </div>
              </div>
              <div class="flex-grow-1 ms-3">
                <h6 class="card-title text-muted mb-1">Total Posts</h6>
                <div class="d-flex align-items-baseline">
                  <h3 class="mb-0 me-2">{{ statistics.totalPosts.toLocaleString() }}</h3>
                  <small :class="['badge', statistics.postGrowth >= 0 ? 'bg-success' : 'bg-danger']">
                    <i :class="['bi', statistics.postGrowth >= 0 ? 'bi-arrow-up' : 'bi-arrow-down']"></i>
                    {{ Math.abs(statistics.postGrowth) }}%
                  </small>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div class="col-xl-3 col-md-6">
        <div class="card border-0 shadow-sm h-100">
          <div class="card-body">
            <div class="d-flex align-items-center">
              <div class="flex-shrink-0">
                <div class="bg-warning bg-opacity-10 p-3 rounded-3">
                  <i class="bi bi-chat-dots-fill fs-4 text-warning"></i>
                </div>
              </div>
              <div class="flex-grow-1 ms-3">
                <h6 class="card-title text-muted mb-1">Total Comments</h6>
                <div class="d-flex align-items-baseline">
                  <h3 class="mb-0 me-2">{{ statistics.totalComments.toLocaleString() }}</h3>
                  <small :class="['badge', statistics.commentGrowth >= 0 ? 'bg-success' : 'bg-danger']">
                    <i :class="['bi', statistics.commentGrowth >= 0 ? 'bi-arrow-up' : 'bi-arrow-down']"></i>
                    {{ Math.abs(statistics.commentGrowth) }}%
                  </small>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div class="col-xl-3 col-md-6">
        <div class="card border-0 shadow-sm h-100">
          <div class="card-body">
            <div class="d-flex align-items-center">
              <div class="flex-shrink-0">
                <div class="bg-info bg-opacity-10 p-3 rounded-3">
                  <i class="bi bi-eye-fill fs-4 text-info"></i>
                </div>
              </div>
              <div class="flex-grow-1 ms-3">
                <h6 class="card-title text-muted mb-1">Today's Views</h6>
                <div class="d-flex align-items-baseline">
                  <h3 class="mb-0 me-2">{{ statistics.todayViews.toLocaleString() }}</h3>
                  <small :class="['badge', statistics.viewGrowth >= 0 ? 'bg-success' : 'bg-danger']">
                    <i :class="['bi', statistics.viewGrowth >= 0 ? 'bi-arrow-up' : 'bi-arrow-down']"></i>
                    {{ Math.abs(statistics.viewGrowth) }}%
                  </small>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <div class="row g-4 mb-4">
      <div class="col-lg-8">
        <div class="card border-0 shadow-sm h-100">
          <div class="card-header bg-transparent border-bottom-0 pb-0">
            <div class="d-flex justify-content-between align-items-center">
              <h5 class="card-title mb-0">User Growth</h5>
              <div class="btn-group btn-group-sm">
                <button 
                  @click="changeChartType('users')"
                  :class="['btn', currentChartType === 'users' ? 'btn-primary' : 'btn-outline-secondary']"
                >
                  Users
                </button>
                <button 
                  @click="changeChartType('posts')"
                  :class="['btn', currentChartType === 'posts' ? 'btn-success' : 'btn-outline-secondary']"
                >
                  Posts
                </button>
                <button 
                  @click="changeChartType('comments')"
                  :class="['btn', currentChartType === 'comments' ? 'btn-warning' : 'btn-outline-secondary']"
                >
                  Comments
                </button>
              </div>
            </div>
          </div>
          <div class="card-body">
            <div class="chart-container" style="height: 300px;">
              <canvas ref="chartCanvas" width="400" height="200"></canvas>
            </div>
          </div>
        </div>
      </div>

      <div class="col-lg-4">
        <div class="card border-0 shadow-sm h-100">
          <div class="card-header bg-transparent border-bottom-0">
            <h5 class="card-title mb-0">Post Categories</h5>
          </div>
          <div class="card-body">
            <div class="chart-container-small mb-3" style="height: 200px;">
              <canvas ref="donutCanvas" width="200" height="200"></canvas>
            </div>
            <div class="list-group list-group-flush">
              <div v-for="post in topPosts.slice(0, 3)" :key="post.id" class="list-group-item border-0 px-0 py-2">
                <div class="d-flex justify-content-between align-items-start">
                  <div class="flex-grow-1">
                    <h6 class="mb-1 text-truncate small">{{ post.title }}</h6>
                    <p class="mb-0 text-muted small">{{ post.author }}</p>
                  </div>
                  <span class="badge bg-success rounded-pill small">{{ post.rank }}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <div class="row g-4">
      <div class="col-lg-6">
        <div class="card border-0 shadow-sm">
          <div class="card-header bg-transparent border-bottom-0">
            <h5 class="card-title mb-0">Recent Activity</h5>
          </div>
          <div class="card-body">
            <div class="timeline">
              <div v-for="activity in recentActivities" :key="activity.id" class="timeline-item d-flex mb-3">
                <div class="flex-shrink-0">
                  <div :class="['timeline-marker rounded-circle p-2', activity.type === 'user' ? 'bg-primary' : activity.type === 'post' ? 'bg-success' : 'bg-warning']">
                    <i :class="['bi text-white', activity.icon]" style="font-size: 12px;"></i>
                  </div>
                </div>
                <div class="flex-grow-1 ms-3">
                  <h6 class="mb-1">{{ activity.title }}</h6>
                  <p class="mb-1 text-muted small">{{ activity.description }}</p>
                  <small class="text-muted">{{ activity.time }}</small>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div class="col-lg-6">
        <div class="card border-0 shadow-sm">
          <div class="card-header bg-transparent border-bottom-0">
            <h5 class="card-title mb-0">Quick Stats</h5>
          </div>
          <div class="card-body">
            <div class="row g-3">
              <div class="col-6">
                <div class="text-center p-3 bg-light rounded">
                  <h4 class="text-primary mb-1">{{ statistics.activeUsers }}</h4>
                  <small class="text-muted">Active Users</small>
                </div>
              </div>
              <div class="col-6">
                <div class="text-center p-3 bg-light rounded">
                  <h4 class="text-success mb-1">{{ statistics.publishedPosts }}</h4>
                  <small class="text-muted">Published Posts</small>
                </div>
              </div>
              <div class="col-6">
                <div class="text-center p-3 bg-light rounded">
                  <h4 class="text-warning mb-1">{{ statistics.pendingComments }}</h4>
                  <small class="text-muted">Pending Comments</small>
                </div>
              </div>
              <div class="col-6">
                <div class="text-center p-3 bg-light rounded">
                  <h4 class="text-info mb-1">{{ statistics.totalViews }}</h4>
                  <small class="text-muted">Total Views</small>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, reactive, onMounted, nextTick } from 'vue'

const selectedPeriod = ref('7days')
const chartCanvas = ref(null)
const donutCanvas = ref(null)
let chart = null
let donutChart = null

const timePeriods = [
  { label: '7 days', value: '7days' },
  { label: '30 days', value: '30days' },
  { label: '3 months', value: '3months' },
  { label: 'This year', value: 'year' }
]

const statistics = reactive({
  totalUsers: 12567,
  userGrowth: 12.5,
  totalPosts: 2345,
  postGrowth: 8.3,
  totalComments: 8901,
  commentGrowth: -2.1,
  todayViews: 45678,
  viewGrowth: 15.7,
  activeUsers: 1234,
  publishedPosts: 2100,
  pendingComments: 45,
  totalViews: '2.5M'
})

const chartData = {
  users: {
    labels: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
    datasets: [{
      label: 'New Users',
      data: [120, 150, 180, 220, 160, 190, 250],
      borderColor: '#0d6efd',
      backgroundColor: 'rgba(13, 110, 253, 0.1)',
      fill: true,
      tension: 0.4
    }]
  },
  posts: {
    labels: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
    datasets: [{
      label: 'New Posts',
      data: [5, 8, 12, 7, 15, 10, 18],
      borderColor: '#198754',
      backgroundColor: 'rgba(25, 135, 84, 0.1)',
      fill: true,
      tension: 0.4
    }]
  },
  comments: {
    labels: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
    datasets: [{
      label: 'New Comments',
      data: [45, 52, 38, 67, 49, 73, 61],
      borderColor: '#ffc107',
      backgroundColor: 'rgba(255, 193, 7, 0.1)',
      fill: true,
      tension: 0.4
    }]
  }
}

const donutData = {
  labels: ['Coffee Guides', 'Equipment Reviews', 'Tips & Tricks', 'News', 'Recipes'],
  datasets: [{
    data: [35, 25, 20, 12, 8],
    backgroundColor: [
      '#198754',
      '#0d6efd', 
      '#ffc107',
      '#dc3545',
      '#6f42c1'
    ],
    borderWidth: 0
  }]
}

const createDonutChart = () => {
  const ctx = donutCanvas.value?.getContext('2d')
  if (!ctx) return

  if (donutChart) {
    donutChart.destroy()
  }

  donutChart = new Chart(ctx, {
    type: 'doughnut',
    data: donutData,
    options: {
      responsive: true,
      maintainAspectRatio: false,
      plugins: {
        legend: {
          position: 'bottom',
          labels: {
            padding: 15,
            usePointStyle: true,
            font: {
              size: 11
            }
          }
        }
      },
      cutout: '70%'
    }
  })
}

const currentChartType = ref('users')

const createChart = () => {
  const ctx = chartCanvas.value?.getContext('2d')
  if (!ctx) return

  if (chart) {
    chart.destroy()
  }

  chart = new Chart(ctx, {
    type: 'line',
    data: chartData[currentChartType.value],
    options: {
      responsive: true,
      maintainAspectRatio: false,
      plugins: {
        legend: {
          display: false
        }
      },
      scales: {
        y: {
          beginAtZero: true,
          grid: {
            color: '#e9ecef'
          }
        },
        x: {
          grid: {
            display: false
          }
        }
      },
      elements: {
        point: {
          radius: 4,
          hoverRadius: 6
        }
      }
    }
  })
}

const changeChartType = (type) => {
  currentChartType.value = type
  createChart()
}

onMounted(async () => {
  if (!window.Chart) {
    const script = document.createElement('script')
    script.src = 'https://cdn.jsdelivr.net/npm/chart.js@3.9.1/dist/chart.min.js'
    script.onload = () => {
      nextTick(() => {
        createChart()
        createDonutChart()
      })
    }
    document.head.appendChild(script)
  } else {
    await nextTick()
    createChart()
    createDonutChart()
  }
})

const topPosts = ref([
  { id: 1, title: 'Complete Guide to Vietnamese Coffee Brewing', author: 'Admin', views: 12500, rank: 1 },
  { id: 2, title: 'Top 10 Best Coffee Types in Vietnam', author: 'Barista', views: 9800, rank: 2 },
  { id: 3, title: 'How to Choose Coffee Machine for Home', author: 'Coffee Expert', views: 8200, rank: 3 },
  { id: 4, title: 'Secrets of Beautiful Latte Art', author: 'Latte Master', views: 7500, rank: 4 },
  { id: 5, title: 'Exploring Saigon Coffee Culture', author: 'Culture Writer', views: 6900, rank: 5 }
])

const recentActivities = ref([
  { 
    id: 1, 
    type: 'user', 
    icon: 'bi-person-plus-fill', 
    title: 'New User Registration',
    description: 'John Doe just created an account',
    time: '5 minutes ago'
  },
  { 
    id: 2, 
    type: 'post', 
    icon: 'bi-file-earmark-plus-fill', 
    title: 'New Post Published',
    description: 'Coffee Tips: How to Store Coffee Beans Properly',
    time: '15 minutes ago'
  },
  { 
    id: 3, 
    type: 'comment', 
    icon: 'bi-chat-fill', 
    title: 'New Comment',
    description: 'Jane Smith commented on "Coffee Brewing Guide"',
    time: '30 minutes ago'
  },
  { 
    id: 4, 
    type: 'user', 
    icon: 'bi-star-fill', 
    title: '5-Star Review',
    description: 'Michael Johnson rated Coffee Shop 5 stars',
    time: '1 hour ago'
  }
])
</script>

<style scoped>
.timeline-marker {
  width: 32px;
  height: 32px;
  display: flex;
  align-items: center;
  justify-content: center;
}

.chart-container {
  position: relative;
  background: #ffffff;
  border-radius: 8px;
  padding: 10px;
}

.chart-container canvas {
  max-height: 280px;
}

.chart-container-small {
  position: relative;
  background: #ffffff;
  border-radius: 8px;
  padding: 10px;
}

.chart-container-small canvas {
  max-height: 180px;
}

.card {
  transition: transform 0.2s ease-in-out;
}

.card:hover {
  transform: translateY(-2px);
}

.badge {
  font-size: 0.75em;
}

.timeline-item:last-child {
  margin-bottom: 0 !important;
}
</style>