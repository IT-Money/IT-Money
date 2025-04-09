<script setup>
import HeaderLayout from './components/HeaderLayout.vue'
import FooterNav from './components/FooterNav.vue'
</script>

<template>
  <HeaderLayout />
  <router-view></router-view>
  <FooterNav />
</template>

<style scoped></style>
