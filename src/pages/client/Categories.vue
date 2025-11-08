<template>
  <div class="container mt-4">
    <!-- Header -->
    <div class="row mb-5">
      <div class="col-12 text-center">
        <h1 class="text-success mb-3">Our Categories</h1>
        <p class="text-muted lead">Discover our delicious range of beverages</p>
      </div>
    </div>

    <!-- Main Categories -->
    <div class="row g-4 mb-5">
      <!-- Coffee Category -->
      <div class="col-lg-4 col-md-6">
        <div class="card h-100 shadow-sm border-0">
          <div class="position-relative">
            <img 
              src="https://i.pinimg.com/736x/44/0c/90/440c90f0128e86448c665aba221eeadf.jpg" 
              class="card-img-top" 
              alt="Coffee"
              style="height: 300px; object-fit: cover;"
            >
            <div class="position-absolute top-0 start-0 m-3">
              <span class="badge bg-success fs-6">☕ Premium</span>
            </div>
          </div>
          <div class="card-body d-flex flex-column">
            <h3 class="card-title text-success mb-3">Coffee</h3>
            <p class="card-text text-muted mb-4">
              From rich espressos to smooth cold brews, explore our premium coffee collection sourced from the finest beans around the world.
            </p>
            
            <div class="mb-3">
              <h6 class="text-secondary">Popular Options:</h6>
              <ul class="list-unstyled">
                <li class="mb-1">• Espresso & Americano</li>
                <li class="mb-1">• Cappuccino & Latte</li>
                <li class="mb-1">• Cold Brew & Iced Coffee</li>
                <li class="mb-1">• Specialty Blends</li>
              </ul>
            </div>

            <div class="mb-3">
              <small class="text-muted">
                <strong>Price Range:</strong> <span class="text-success">$3.50 - $6.99</span>
              </small>
            </div>

            <button class="btn btn-success mt-auto" @click="viewCategory('coffee')">
              Explore Coffee Menu →
            </button>
          </div>
        </div>
      </div>

      <!-- Milk Tea Category -->
      <div class="col-lg-4 col-md-6">
        <div class="card h-100 shadow-sm border-0">
          <div class="position-relative">
            <img 
              src="https://i.pinimg.com/736x/ab/c8/06/abc80650578ef473de92a69aae13c342.jpg" 
              class="card-img-top" 
              alt="Milk Tea"
              style="height: 300px; object-fit: cover;"
            >
            <div class="position-absolute top-0 start-0 m-3">
              <span class="badge bg-info fs-6">🧋 Trending</span>
            </div>
          </div>
          <div class="card-body d-flex flex-column">
            <h3 class="card-title text-success mb-3">Milk Tea</h3>
            <p class="card-text text-muted mb-4">
              Creamy, flavorful milk teas with customizable sweetness levels and a variety of delicious toppings to choose from.
            </p>
            
            <div class="mb-3">
              <h6 class="text-secondary">Popular Options:</h6>
              <ul class="list-unstyled">
                <li class="mb-1">• Classic Milk Tea</li>
                <li class="mb-1">• Taro & Matcha</li>
                <li class="mb-1">• Fruit Tea Series</li>
                <li class="mb-1">• Bubble Tea with Toppings</li>
              </ul>
            </div>

            <div class="mb-3">
              <small class="text-muted">
                <strong>Price Range:</strong> <span class="text-success">$4.00 - $7.50</span>
              </small>
            </div>

            <button class="btn btn-success mt-auto" @click="viewCategory('milktea')">
              Explore Milk Tea Menu →
            </button>
          </div>
        </div>
      </div>

      <!-- Hot Chocolate Category -->
      <div class="col-lg-4 col-md-6">
        <div class="card h-100 shadow-sm border-0">
          <div class="position-relative">
            <img 
              src="https://i.pinimg.com/736x/1f/92/5e/1f925e6b3751d194cc96e00af710f0bc.jpg" 
              class="card-img-top" 
              alt="Hot Chocolate"
              style="height: 300px; object-fit: cover;"
            >
            <div class="position-absolute top-0 start-0 m-3">
              <span class="badge bg-warning text-dark fs-6">🍫 Comfort</span>
            </div>
          </div>
          <div class="card-body d-flex flex-column">
            <h3 class="card-title text-success mb-3">Hot Chocolate</h3>
            <p class="card-text text-muted mb-4">
              Rich, creamy hot chocolates made with premium cocoa and topped with marshmallows, whipped cream, or your favorite extras.
            </p>
            
            <div class="mb-3">
              <h6 class="text-secondary">Popular Options:</h6>
              <ul class="list-unstyled">
                <li class="mb-1">• Classic Hot Chocolate</li>
                <li class="mb-1">• Dark Chocolate Deluxe</li>
                <li class="mb-1">• White Chocolate Dream</li>
                <li class="mb-1">• Flavored Hot Chocolate</li>
              </ul>
            </div>

            <div class="mb-3">
              <small class="text-muted">
                <strong>Price Range:</strong> <span class="text-success">$3.00 - $5.99</span>
              </small>
            </div>

            <button class="btn btn-success mt-auto" @click="viewCategory('hotchocolate')">
              Explore Hot Chocolate Menu →
            </button>
          </div>
        </div>
      </div>
    </div>

    <!-- Features Section -->
    <div class="row mb-5">
      <div class="col-12">
        <div class="card bg-light border-0">
          <div class="card-body">
            <h3 class="text-center text-success mb-4">Why Choose Our Beverages?</h3>
            <div class="row text-center">
              <div class="col-md-3 col-6 mb-3">
                <div class="display-6 text-success mb-2">🌟</div>
                <h5>Premium Quality</h5>
                <small class="text-muted">Only the finest ingredients</small>
              </div>
              <div class="col-md-3 col-6 mb-3">
                <div class="display-6 text-success mb-2">🎯</div>
                <h5>Customizable</h5>
                <small class="text-muted">Adjust sweetness & toppings</small>
              </div>
              <div class="col-md-3 col-6 mb-3">
                <div class="display-6 text-success mb-2">⚡</div>
                <h5>Fresh Daily</h5>
                <small class="text-muted">Made fresh every day</small>
              </div>
              <div class="col-md-3 col-6 mb-3">
                <div class="display-6 text-success mb-2">💚</div>
                <h5>Eco-Friendly</h5>
                <small class="text-muted">Sustainable sourcing</small>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Quick Menu Navigation -->
    <div class="row mb-5">
      <div class="col-12">
        <div class="card border-success">
          <div class="card-header bg-success text-white">
            <h4 class="mb-0 text-center">Quick Menu Access</h4>
          </div>
          <div class="card-body">
            <div class="row g-3">
              <!-- Coffee Quick Menu -->
              <div class="col-md-4">
                <div class="text-center">
                  <h5 class="text-success">☕ Coffee Favorites</h5>
                  <div class="d-grid gap-2">
                    <button class="btn btn-outline-success btn-sm" @click="quickOrder('espresso')">Espresso Shot</button>
                    <button class="btn btn-outline-success btn-sm" @click="quickOrder('latte')">Caffe Latte</button>
                    <button class="btn btn-outline-success btn-sm" @click="quickOrder('cappuccino')">Cappuccino</button>
                  </div>
                </div>
              </div>

              <!-- Milk Tea Quick Menu -->
              <div class="col-md-4">
                <div class="text-center">
                  <h5 class="text-success">🧋 Milk Tea Favorites</h5>
                  <div class="d-grid gap-2">
                    <button class="btn btn-outline-info btn-sm" @click="quickOrder('classic-milk-tea')">Classic Milk Tea</button>
                    <button class="btn btn-outline-info btn-sm" @click="quickOrder('taro')">Taro Milk Tea</button>
                    <button class="btn btn-outline-info btn-sm" @click="quickOrder('matcha')">Matcha Latte</button>
                  </div>
                </div>
              </div>

              <!-- Hot Chocolate Quick Menu -->
              <div class="col-md-4">
                <div class="text-center">
                  <h5 class="text-success">🍫 Hot Chocolate Favorites</h5>
                  <div class="d-grid gap-2">
                    <button class="btn btn-outline-warning btn-sm" @click="quickOrder('classic-hot-chocolate')">Classic Hot Chocolate</button>
                    <button class="btn btn-outline-warning btn-sm" @click="quickOrder('dark-chocolate')">Dark Chocolate</button>
                    <button class="btn btn-outline-warning btn-sm" @click="quickOrder('white-chocolate')">White Chocolate</button>
                  </div>
                </div>
              </div>
            </div>

            <div class="text-center mt-4">
              <router-link to="/products" class="btn btn-success btn-lg">
                View Full Menu →
              </router-link>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Special Offers -->
    <div class="row">
      <div class="col-12">
        <div class="alert alert-success" role="alert">
          <div class="row align-items-center">
            <div class="col-md-8">
              <h4 class="alert-heading">🎉 Special Offers!</h4>
              <p class="mb-0">Buy any 2 beverages and get 10% off your order. Mix and match from any category!</p>
            </div>
            <div class="col-md-4 text-center">
              <button class="btn btn-outline-success" @click="viewOffers">View All Offers</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { useRouter } from 'vue-router'

const router = useRouter()

// Methods
const viewCategory = (category) => {
  // Navigate to products page with category filter
  router.push({
    path: '/products',
    query: { category: category }
  })
}

const quickOrder = (item) => {
  // Quick order functionality
  alert(`Quick order for ${item.replace('-', ' ')} added to cart!`)
}

const viewOffers = () => {
  // Navigate to offers/promotions page
  alert('Special offers page coming soon!')
}
</script>
