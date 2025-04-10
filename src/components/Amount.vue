<script setup>
import { useFormStore } from '@/stores/formStore'

const formStore = useFormStore()
</script>

<template>
  <!-- 금액 입력 -->
  <div class="amount-wrapper">
    <label for="amount">금액</label>
    <input
      id="amount"
      type="number"
      class="amount-input"
      v-model="formStore.amount"
      placeholder="금액 입력"
    />
  </div>
</template>

<style scoped>
.amount-wrapper {
  margin-bottom: 16px;
}

label {
  display: block;
  margin-bottom: 6px;
  font-size: 13px;
  font-family: 'Roboto', sans-serif;
  font-weight: bold;
  color: #333;
}

.amount-input {
  width: 100%;
  padding: 12px 16px;
  border-radius: 12px;
  border: 1px solid #ddd;
  font-size: 14px;
  background-color: #fff;
  color: #333;
  outline: none;
  transition: border 0.3s ease;
}

/* 숫자 입력 시 스피너 버튼 제거 */
.amount-input::-webkit-outer-spin-button,
.amount-input::-webkit-inner-spin-button {
  -webkit-appearance: none;
  margin: 0;
}

/* 입력 필드에 마우스 호버 시 테두리 색상 변경 */
.amount-input:hover {
  border-color: #007bff;
}

/* 입력 필드에 포커스 시 테두리 색상과 그림자 효과 */
.amount-input:focus {
  border-color: #0056b3;
  box-shadow: 0 0 5px rgba(0, 91, 179, 0.2);
}
</style>
