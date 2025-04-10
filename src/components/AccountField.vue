<script setup>
import { computed, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import { useUserStore } from '@/stores/userStore'

const props = defineProps({
  label: String,
  // value: String,
})

const router = useRouter()
const userStore = useUserStore()

onMounted(() => {
  userStore.fetchUser()
})

const goToEditPage = () => {
  switch (props.label) {
    case '이름':
      router.push('/edit-name')
      break
    case '이메일':
      router.push('/edit-email')
      break
    case '비밀번호':
      router.push('/edit-password')
      break
  }
}

// label에 따라 store에서 값 불러오기
const displayValue = computed(() => {
  switch (props.label) {
    case '이름':
      return userStore.userName
    case '이메일':
      return userStore.userEmail
    case '비밀번호':
      return userStore.userPassword
      // 비밀번호 안보이게
        ? '*'.repeat(userStore.userPassword.length)
        : ''
    default:
      return ''
  }
})
</script>

<template>
  <div class="account-field">
    <div class="info-text">
      <!-- '이름', '이메일', '비밀번호' -->
      <p class="label">{{ label }}</p>
      <!-- 각각 값 받아오기 -->
      <p class="value">{{ displayValue }}</p>
    </div>
    <button class="edit-button" @click="goToEditPage">수정</button>
  </div>
</template>

<style scoped>
.account-field {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 10px 0;
  border-bottom: 1px solid #e5e5e5;
}

.info-text {
  display: flex;
  flex-direction: column;
}

.label {
  font-size: 12px;
  color: #888;
  margin-bottom: 4px;
}

.value {
  font-size: 16px;
  color: #333;
}

.edit-button {
  background-color: #9e7cf3;
  color: white;
  border: none;
  border-radius: 20px;
  padding: 6px 16px;
  font-size: 14px;
  cursor: pointer;
}
</style>
