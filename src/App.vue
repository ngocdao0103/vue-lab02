<script setup>
import Header from './components/Header.vue';
import Home from './pages/client/Home.vue';
import Banner from './pages/client/Banner.vue';
import Footer from './components/Footer.vue';
</script>

<template>
  <Header></Header>
  <Banner></Banner>
  <div class="container mt-5">
    <Home></Home>
  </div>
  <Footer></Footer>
</template>
