<template>
  <div class="container mt-4">
    <!-- Header Section -->
    <div class="row mb-5">
      <div class="col-12 text-center">
        <h1 class="text-success mb-3">Get In Touch</h1>
        <p class="lead text-muted">We'd love to hear from you. Send us a message and we'll respond as soon as possible.</p>
      </div>
    </div>

    <!-- Contact Cards Section -->
    <div class="row g-4 mb-5">
      <!-- Visit Us Card -->
      <div class="col-lg-4 col-md-6">
        <div class="card h-100 shadow-sm border-0 text-center">
          <div class="card-body">
            <div class="bg-success bg-opacity-10 rounded-circle d-inline-flex align-items-center justify-content-center mb-3" style="width: 60px; height: 60px;">
              <i class="bi bi-geo-alt-fill text-success fs-4"></i>
            </div>
            <h5 class="card-title text-success">Visit Our Store</h5>
            <p class="card-text text-muted">123 Coffee Street<br>Can Tho City, Vietnam</p>
            <p class="small text-muted">Mon - Fri: 7:00 AM - 9:00 PM<br>Sat - Sun: 8:00 AM - 10:00 PM</p>
          </div>
        </div>
      </div>

      <!-- Call Us Card -->
      <div class="col-lg-4 col-md-6">
        <div class="card h-100 shadow-sm border-0 text-center">
          <div class="card-body">
            <div class="bg-success bg-opacity-10 rounded-circle d-inline-flex align-items-center justify-content-center mb-3" style="width: 60px; height: 60px;">
              <i class="bi bi-telephone-fill text-success fs-4"></i>
            </div>
            <h5 class="card-title text-success">Call Us</h5>
            <p class="card-text text-muted">+84 123 456 789</p>
            <p class="small text-muted">Available 24/7 for orders<br>Customer service: 8AM - 6PM</p>
          </div>
        </div>
      </div>

      <!-- Email Us Card -->
      <div class="col-lg-4 col-md-6">
        <div class="card h-100 shadow-sm border-0 text-center">
          <div class="card-body">
            <div class="bg-success bg-opacity-10 rounded-circle d-inline-flex align-items-center justify-content-center mb-3" style="width: 60px; height: 60px;">
              <i class="bi bi-envelope-fill text-success fs-4"></i>
            </div>
            <h5 class="card-title text-success">Email Us</h5>
            <p class="card-text text-muted">info@nhutduycoffee.com</p>
            <p class="small text-muted">We'll respond within 24 hours<br>Business inquiries welcome</p>
          </div>
        </div>
      </div>
    </div>

    <!-- Main Contact Section -->
    <div class="row">
      <!-- Contact Form -->
      <div class="col-lg-8 mb-4">
        <div class="card shadow-sm border-0">
          <div class="card-body p-4">
            <h3 class="text-success mb-4">Send Us a Message</h3>
            <form @submit.prevent="submitForm">
              <div class="row">
                <div class="col-md-6 mb-3">
                  <label for="firstName" class="form-label">First Name *</label>
                  <input 
                    type="text" 
                    class="form-control" 
                    id="firstName" 
                    v-model="form.firstName"
                    placeholder="Enter your first name" 
                    required
                  >
                </div>
                <div class="col-md-6 mb-3">
                  <label for="lastName" class="form-label">Last Name *</label>
                  <input 
                    type="text" 
                    class="form-control" 
                    id="lastName" 
                    v-model="form.lastName"
                    placeholder="Enter your last name" 
                    required
                  >
                </div>
              </div>

              <div class="row">
                <div class="col-md-6 mb-3">
                  <label for="email" class="form-label">Email Address *</label>
                  <input 
                    type="email" 
                    class="form-control" 
                    id="email" 
                    v-model="form.email"
                    placeholder="Enter your email" 
                    required
                  >
                </div>
                <div class="col-md-6 mb-3">
                  <label for="phone" class="form-label">Phone Number</label>
                  <input 
                    type="tel" 
                    class="form-control" 
                    id="phone" 
                    v-model="form.phone"
                    placeholder="Enter your phone number"
                  >
                </div>
              </div>

              <div class="mb-3">
                <label for="subject" class="form-label">Subject *</label>
                <select class="form-select" id="subject" v-model="form.subject" required>
                  <option value="">Choose a subject</option>
                  <option value="general">General Inquiry</option>
                  <option value="order">Order Support</option>
                  <option value="feedback">Feedback</option>
                  <option value="partnership">Business Partnership</option>
                  <option value="other">Other</option>
                </select>
              </div>

              <div class="mb-4">
                <label for="message" class="form-label">Message *</label>
                <textarea 
                  class="form-control" 
                  id="message" 
                  rows="5" 
                  v-model="form.message"
                  placeholder="Tell us how we can help you..." 
                  required
                ></textarea>
              </div>

              <div class="mb-3">
                <div class="form-check">
                  <input class="form-check-input" type="checkbox" id="newsletter" v-model="form.newsletter">
                  <label class="form-check-label" for="newsletter">
                    Subscribe to our newsletter for updates and special offers
                  </label>
                </div>
              </div>

              <button type="submit" class="btn btn-success btn-lg" :disabled="isSubmitting">
                <span v-if="isSubmitting" class="spinner-border spinner-border-sm me-2" role="status"></span>
                {{ isSubmitting ? 'Sending...' : 'Send Message' }}
              </button>
            </form>
          </div>
        </div>
      </div>

      <!-- Contact Info & Map -->
      <div class="col-lg-4">
        <!-- Contact Info -->
        <div class="card shadow-sm border-0 mb-4">
          <div class="card-body">
            <h5 class="text-success mb-3">Contact Information</h5>
            
            <div class="d-flex align-items-start mb-3">
              <i class="bi bi-geo-alt-fill text-success me-3 mt-1"></i>
              <div>
                <strong>Address</strong><br>
                <span class="text-muted">123 Coffee Street<br>District 1, Can Tho City<br>Vietnam</span>
              </div>
            </div>

            <div class="d-flex align-items-start mb-3">
              <i class="bi bi-clock-fill text-success me-3 mt-1"></i>
              <div>
                <strong>Business Hours</strong><br>
                <span class="text-muted">
                  Mon - Fri: 7:00 AM - 9:00 PM<br>
                  Sat - Sun: 8:00 AM - 10:00 PM
                </span>
              </div>
            </div>

            <div class="d-flex align-items-start mb-3">
              <i class="bi bi-telephone-fill text-success me-3 mt-1"></i>
              <div>
                <strong>Phone</strong><br>
                <a href="tel:+84123456789" class="text-decoration-none text-muted">+84 123 456 789</a>
              </div>
            </div>

            <div class="d-flex align-items-start">
              <i class="bi bi-envelope-fill text-success me-3 mt-1"></i>
              <div>
                <strong>Email</strong><br>
                <a href="mailto:info@nhutduycoffee.com" class="text-decoration-none text-muted">info@nhutduycoffee.com</a>
              </div>
            </div>
          </div>
        </div>

        <!-- Social Media -->
        <div class="card shadow-sm border-0 mb-4">
          <div class="card-body text-center">
            <h5 class="text-success mb-3">Follow Us</h5>
            <div class="d-flex justify-content-center gap-3">
              <a href="#" class="btn btn-outline-success rounded-circle" style="width: 50px; height: 50px;">
                <i class="bi bi-facebook"></i>
              </a>
              <a href="#" class="btn btn-outline-success rounded-circle" style="width: 50px; height: 50px;">
                <i class="bi bi-instagram"></i>
              </a>
              <a href="#" class="btn btn-outline-success rounded-circle" style="width: 50px; height: 50px;">
                <i class="bi bi-twitter"></i>
              </a>
              <a href="#" class="btn btn-outline-success rounded-circle" style="width: 50px; height: 50px;">
                <i class="bi bi-youtube"></i>
              </a>
            </div>
          </div>
        </div>

        <!-- Quick Links -->
        <div class="card shadow-sm border-0">
          <div class="card-body">
            <h5 class="text-success mb-3">Quick Links</h5>
            <div class="d-grid gap-2">
              <router-link to="/products" class="btn btn-outline-success btn-sm">View Menu</router-link>
              <router-link to="/categories" class="btn btn-outline-success btn-sm">Browse Categories</router-link>
              <router-link to="/about" class="btn btn-outline-success btn-sm">About Us</router-link>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- FAQ Section -->
    <div class="row mt-5">
      <div class="col-12">
        <div class="card shadow-sm border-0">
          <div class="card-body">
            <h3 class="text-success text-center mb-4">Frequently Asked Questions</h3>
            <div class="row">
              <div class="col-md-6 mb-3">
                <h6 class="text-success">What are your delivery hours?</h6>
                <p class="text-muted small">We deliver from 8:00 AM to 8:00 PM, Monday through Sunday. Orders placed after 7:00 PM will be delivered the next day.</p>
              </div>
              <div class="col-md-6 mb-3">
                <h6 class="text-success">Do you offer catering services?</h6>
                <p class="text-muted small">Yes! We provide catering for events, meetings, and special occasions. Contact us at least 24 hours in advance.</p>
              </div>
              <div class="col-md-6 mb-3">
                <h6 class="text-success">Can I customize my drink?</h6>
                <p class="text-muted small">Absolutely! We offer various customization options including sweetness levels, milk alternatives, and extra shots.</p>
              </div>
              <div class="col-md-6 mb-3">
                <h6 class="text-success">Do you have WiFi?</h6>
                <p class="text-muted small">Yes, we provide free high-speed WiFi for all customers. Perfect for work, study, or casual browsing.</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'

// Form data
const form = ref({
  firstName: '',
  lastName: '',
  email: '',
  phone: '',
  subject: '',
  message: '',
  newsletter: false
})

const isSubmitting = ref(false)

// Methods
const submitForm = async () => {
  isSubmitting.value = true
  
  // Simulate form submission
  setTimeout(() => {
    alert('Thank you for your message! We will get back to you within 24 hours.')
    
    // Reset form
    form.value = {
      firstName: '',
      lastName: '',
      email: '',
      phone: '',
      subject: '',
      message: '',
      newsletter: false
    }
    
    isSubmitting.value = false
  }, 2000)
}
</script>


