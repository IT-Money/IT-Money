<script setup>
import { ref, onMounted } from 'vue'
import { useUserStore } from '@/stores/userStore'

const userStore = useUserStore()
const newEmail = ref('')

onMounted(() => {
  userStore.fetchUser()
})

const changeEmail = async () => {
  if (!newEmail.value) return
  await userStore.updateEmail(newEmail.value) // 서버 + 상태 변경
  newEmail.value = ''
}
</script>

<template>
  <div class="edit-email-container">
    <div class="input-group">
      <label for="current-email">현재 이메일</label>
      <input
        id="current-email"
        type="text"
        :value="userStore.userEmail"
        readonly
      />
      <!-- 현재 이메일 저장소에서 가져오고 수정불가하게 만들기 -->
    </div>

    <div class="input-group">
      <label for="new-email">새 이메일</label>
      <input
        id="new-email"
        type="text"
        v-model="newEmail"
        placeholder="새 이메일 입력"
      />
    </div>

    <button class="change-email-button" @click="changeEmail">
      이메일 변경
    </button>
  </div>
</template>

<style scoped>
.edit-email-container {
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

.change-email-button {
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

.change-email-button:enabled {
  /* 새 이름까지 쓰면 enable하게 */
  cursor: pointer;
}

.change-email-button:enabled:hover {
  background-color: var(--blue400); /* blue */
  color: var(--gray100);
}
</style>
