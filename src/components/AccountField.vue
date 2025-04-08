<script setup>
import { computed } from 'vue'
import { useRouter } from 'vue-router'

const props = defineProps({
  label: String,
  value: String,
})

const router = useRouter()
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

// 비밀번호면 *로 가리기
const displayValue = computed(() =>
  props.label === '비밀번호' ? '*'.repeat(props.value.length) : props.value,
)
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
