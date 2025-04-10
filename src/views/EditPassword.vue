<script setup>
import { ref, onMounted } from 'vue'
import { useUserStore } from '@/stores/userStore'

const userStore = useUserStore()
const currentPasswordInput = ref('')
const newPassword = ref('')
const confirmPassword = ref('')


onMounted(() => {
  userStore.fetchUser()
})

// const changePassword = () => {
//   if (!newPassword.value) return
//   userStore.updatePassword(newPassword.value)
//   newPassword.value = ' '
// }

const changePassword = () => {
  const storedPassword = userStore.userPassword

  if (currentPasswordInput.value !== storedPassword) {
    alert('현재 비밀번호가 일치하지 않습니다.')
    return
  }

  if (!newPassword.value) {
    alert('새 비밀번호를 입력해주세요.')
    return
  }

  if (newPassword.value !== confirmPassword.value) {
    alert('새 비밀번호가 서로 일치하지 않습니다.')
    return
  }

  userStore.updatePassword(newPassword.value)
  // db에 상태 업데이트
  alert('비밀번호가 변경되었습니다.')

  // 입력값 초기화
  currentPasswordInput.value = ''
  newPassword.value = ''
  confirmPassword.value = ''
}

</script>

<template>
  <div class="edit-password-container">
    <div class="input-group">
      <label for="current-password">현재 비밀번호</label>
      <!-- 현재 비번 입력하게 만들기 -->
       <!--type password로 만들기 -->
      <input id="current-password" type="text" v-model="currentPasswordInput" placeholder="현재 비밀번호 입력"/>
    </div>

    <div class="input-group">
      <label for="new-password">새 비밀번호</label>
      <input
        id="new-password"
        type="text"
        v-model="newPassword"
        placeholder="새 비밀번호 입력"
      />
    </div>

    <div class="input-group">
      <label for="confirm-password">새 비밀번호 확인</label>
      <input
        id="confirm-password"
        type="text"
        v-model="confirmPassword"
        placeholder="새 비밀번호 재입력"
      />
    </div>

    <button class="change-password-button" @click="changePassword">
      비밀번호 변경
    </button>
  </div>
</template>

<style scoped>
.edit-password-container {
  margin: 20px;
  padding: 20px;
  background-color: var(--gray100);
  border-radius: 16px;
  box-shadow: 0 0 8px rgba(0, 0, 0, 0.08);
}

.input-group {
  margin-bottom: 20px;
}

.input-group label {
  display: block;
  margin-bottom: 8px;
  font-weight: 600;
  color: var(--gray400);
  font-size: 13px;
}

.input-group input {
  width: 100%;
  padding: 10px 12px;
  border: 1px solid var(--gray200);
  border-radius: 10px;
  font-size: 14px;
}

.change-password-button {
  width: 100%;
  padding: 12px;
  background-color: var(--gray200);
  color: var(--gray100);
  font-weight: 600;
  border: none;
  border-radius: 12px;
  cursor: not-allowed;
  transition: background-color 0.3s;
}

.change-password-button:enabled {
  /* 새 이름까지 쓰면 enable하게 */
  cursor: pointer;
}

.change-password-button:enabled:hover {
  background-color: var(--blue400); /* blue */
  color: var(--gray100);
}
</style>
