<template>
  <div class="footer-wrapper">
    <nav class="footer-nav">
      <router-link to="/home" class="nav-icon">
        <i class="fa-solid fa-house"></i>
      </router-link>
      <router-link to="/my-page" class="nav-icon">
        <i class="fa-solid fa-user"></i>
      </router-link>
    </nav>
    <router-link to="/add" class="add-button">
      <i class="fa-solid fa-plus"></i>
    </router-link>
  </div>
</template>

<script setup></script>

<style scoped>
.footer-wrapper {
  position: absolute;
  left: 50%;
  top: 280px;
  transform: translate(-50%, 335px);
  width: 100%;
  max-width: 360px;
  height: 85px;
  background-color: white;
  box-shadow: 0 -2px 15px rgba(16, 11, 62, 0.1);
  z-index: 1000;
}

.footer-nav {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0 36px;
  height: 100%;
  box-sizing: border-box;
  position: relative;
}

.nav-icon {
  display: flex;
  justify-content: center;
  align-items: center;
  width: 80px;
  height: 48px;
}

.nav-icon i {
  font-size: 35px;
  color: gray;
}

.add-button {
  position: absolute;
  top: -30px;
  left: 50%;
  transform: translateX(-50%);
  width: 55px;
  height: 55px;
  background-color: var(--blue400);
  border-radius: 50%;
  display: flex;
  justify-content: center;
  align-items: center;
  color: white;
  font-size: 40px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.2);
  z-index: 1001;
}
</style>
