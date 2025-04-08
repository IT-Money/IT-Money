<script setup>
import FooterNav from './components/FooterNav.vue'
</script>

<template>
  <div id="app_container">
    <router-view />
    <FooterNav />
  </div>
</template>

<style scoped>
#app_container {
  position: relative;
  width: 360px;
  height: 670px;
  margin: 50px auto;
  background-color: white;
  border-radius: 12px;
  box-shadow: 9px 11px 5px 0px rgba(125, 124, 125, 1);
  overflow: hidden;
}
</style>
