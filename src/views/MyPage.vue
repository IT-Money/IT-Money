<script setup>
import AccountField from '@/components/AccountField.vue'
</script>

<template>
  <div class="my-page-wrapper">
    <!-- 상단 영역 -->
    <div class="top-section">
      <!-- 프로필 이미지가 파란 배경과 흰 박스 사이에 겹치도록 위치 조정 -->
      <div class="profile-image-container">
        <img src="@/icons/pig.png" alt="프로필 이미지" />
      </div>
    </div>

    <!-- 흰 박스 -->
    <div class="white-box">
      <p class="section-title"><i class="fa-solid fa-user"></i> 내 계정 관리</p>
      <!-- 여기서 AccountField에 값 겨줌-> AF에서 props로 값 받음 -->
      <AccountField label="이름" />
      <AccountField label="이메일" />
      <AccountField label="비밀번호" />
    </div>
  </div>
</template>

<style scoped>
.my-page-wrapper {
  /* 전체 페이지 파랗게 */
  background-color: var(--blue400);
  min-height: 90%;
  position: relative;
}

.top-section {
  height: 5px;
  display: flex;
  justify-content: center;
  position: relative;
}

/* 프로필 이미지 */
.profile-image-container {
  width: 130px;
  height: 130px;
  border-radius: 50%;
  overflow: hidden;
  background-color: white;
  position: absolute;
  bottom: -160px; /* 흰 박스와 절반 겹치게 */
  left: 50%;
  transform: translateX(-50%);
  z-index: 10;
}

.profile-image-container img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

/* 흰색 박스 */
.white-box {
  background-color: white;
  border-top-left-radius: 24px;
  border-top-right-radius: 24px;
  padding: 95px 24px 32px; /* 위에 이미지 공간 확보 */
  margin-top: 100px;
  min-height: 500px;
}

.section-title {
  font-size: 14px;
  margin-bottom: 8px;
}
</style>
