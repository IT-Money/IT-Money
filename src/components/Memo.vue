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
  margin-bottom: 10px;
}

label {
  display: block;
  margin-bottom: 6px;
  font-size: 13px;
  color: #555;
  font-family: 'Noto Sans', sans-serif;
  font-weight:bold;
}

.memo-input {
  width: 100%;
  padding: 10px 12px;
  border-radius: 12px;
  border: 1px solid #ccc;
  font-size: 14px;
  background-color: #fff;
  color: #333;
  resize: none;
  outline: none;
  font-family: 'Noto Sans', sans-serif; /* 날짜 선택기에서 사용하는 폰트 */
  padding: 8px;
  margin-bottom: 10px;
}
.memo-input:hover{
  border-color: #007bff;
}

</style>
