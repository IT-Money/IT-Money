<script setup>
import { useFormStore } from '@/stores/formStore'

const formStore = useFormStore()
</script>

<template>
  <!-- 금액 입력 -->
  <div class="amount-wrapper">
    <label for="amount">금액</label>
    <div class="input-icon-container">
      <input
        id="amount"
        type="number"
        class="amount-input"
        v-model="formStore.amount"
        placeholder="금액 입력"
      />
      <span class="icon">💰</span>
    </div>
  </div>
</template>

<style scoped>
.amount-wrapper {
  display: flex;
  flex-direction: column;
  margin-bottom: 16px;
  position: relative;
}
label {
  display: block;
  margin-bottom: 6px;
  font-size: 13px;
  font-weight: bold;
  color: #333;
}
.input-icon-container{
  position:relative;
  display:flex;
  align-items:center;
}
.amount-input {
  width: 100%;
  height:36px;
  padding: 10px 12px;
  border-radius: 12px;
  box-sizing:border-box;
  border: 1px solid #ddd;
  font-size: 14px;
  background-color: #fff;
  color: #333;
  appearance:none;
  outline: none;
  transition: border 0.3s ease;
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.05);
  
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

.icon{
  position:absolute;
  right:10px;
  color: #007bff;
  font-size: 18px;
  pointer-event:none;
}
</style>
