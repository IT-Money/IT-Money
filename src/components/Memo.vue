<script setup>
import { useFormStore } from '@/stores/formStore'

const formStore = useFormStore()
</script>

<template>
  <div class="memo-wrapper">
    <label for="memo">메모</label>
    <textarea
      id="memo"
      v-model="formStore.memo"
      placeholder="메모를 입력하세요"
      class="memo-input"
      rows="3"
    />
  </div>
</template>

<style scoped>
.memo-wrapper {
  margin-bottom: 16px;
}

label {
  display: block;
  margin-bottom: 6px;
  font-size: 13px;
  color: #555;
}

.memo-input {
  width: 100%;
  padding: 10px 12px;
  border-radius: 12px;
  border: 1px solid #ddd;
  font-size: 14px;
  background-color: #fff;
  color: #333;
  resize: none;
  outline: none;
}
</style>
