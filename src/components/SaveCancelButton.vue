<script setup>
const emit = defineEmits(['save', 'cancel'])
</script>

<template>
  <div class="button-container">
    <button class="save-btn" @click="$emit('save')">저장</button>
    <button class="cancel-btn" @click="$emit('cancel')">취소</button>
  </div>
</template>

<style scoped>
/* 버튼 컨테이너 스타일 */
.button-container {
  display: flex;
  justify-content: center;
  gap: 100px;
  margin: auto;
}

/* 버튼 기본 스타일 */
button {
  padding: 10px 20px;
  border-radius: 12px;
  border: none;
  font-size: 14px;
  cursor: pointer;
  transition: background-color 0.2s ease;
}

/* 저장 버튼 스타일 */
.save-btn {
  background-color: #3b1fe0;
  color: white;
}

.save-btn:hover {
  background-color: #2e16b3;
}

/* 취소 버튼 스타일 */
.cancel-btn {
  background-color: #f2f1f9;
  color: #898989;
}

.cancel-btn:hover {
  background-color: #e0dff2;
}

/* 원형 버튼 스타일 */
.save-cancel-button {
  background-color: #007bff;
  color: white;
  border-radius: 50%;
  font-size: 20px;
  width: 60px;
  height: 60px;

  display: flex;
  justify-content: center;
  align-items: center;
  margin: 20px auto 10px auto;

  box-shadow: 0px 4px 10px rgba(0, 0, 0, 0.1);
  position: relative;
}

.save-cancel-button:hover {
  background-color: #0056b3;
}
</style>
