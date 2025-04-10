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
  color: #555;
}

.amount-input {
  width: 100%;
  padding: 10px 12px;
  border-radius: 12px;
  border: 1px solid #ddd;
  font-size: 14px;
  background-color: #fff;
  color: #333;
  outline: none;
}
.amount-input::-webkit-outer-spin-button,
.amount-input::-webkit-inner-spin-button {
  -webkit-appearance: none;
  margin: 0;
}
</style>
