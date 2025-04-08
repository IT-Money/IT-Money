<template>
  <div class="footer-wrapper">
    <nav class="footer-nav">
      <router-link to="/" class="nav-icon">
        <i class="fa-solid fa-house"></i>
      </router-link>

      <router-link to="/add-expense" class="add-button">
        <i class="fa-solid fa-plus"></i>
      </router-link>

      <router-link to="/mypage" class="nav-icon">
        <i class="fa-solid fa-user"></i>
      </router-link>

      <div class="bottom-bar"></div>
    </nav>
  </div>
</template>

<script setup></script>

<style scoped>
.footer-wrapper {
  position: absolute;
  bottom: 0;
  left: 0;
  width: 100%;
  z-index: 100;
}

.footer-nav {
  width: 100%;
  height: 70px;
  background-color: white;
  display: flex;
  justify-content: space-around;
  align-items: center;
  box-shadow: 0 -1px 10px rgba(0, 0, 0, 0.05);
}

.nav-icon i {
  font-size: 24px;
  color: gray;
}

.add-button {
  background-color: #3e1fc2;
  border-radius: 50%;
  width: 60px;
  height: 60px;
  margin-top: -80px;
  display: flex;
  justify-content: center;
  align-items: center;
  color: white;
  font-size: 28px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.2);
}
.bottom-bar {
  position: absolute;
  bottom: 8px;
  width: 100px;
  height: 4px;
  background-color: #ccc;
  border-radius: 5px;
}
</style>
