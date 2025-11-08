<script setup>
import Header from  '../../components/Head.vue';
import Banner from '../client/Banner.vue';
import Footer from '../../components/Footer.vue';
</script>

<template>
  <Header></Header>
  <Banner></Banner>
  <div class="container">
    <RouterView></RouterView>
  </div>
  <Footer></Footer>
</template>