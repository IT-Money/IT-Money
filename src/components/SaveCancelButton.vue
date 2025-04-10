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
.button-container {
  display: flex;
  justify-content: center;
  gap: 100px;
  margin: 20px 0;
}

button {
  padding: 10px 20px;
  border-radius: 12px;
  border: none;
  font-size: 14px;
  cursor: pointer;
  transition: background-color 0.2s ease;
  row-gap: 50px;
}

.save-btn {
  background-color: #3b1fe0;
  color: white;
}

.save-btn:hover {
  background-color: #2e16b3;
}

.cancel-btn {
  background-color: #f2f1f9;
  color: #898989;
}

.cancel-btn:hover {
  background-color: #e0dff2;
}
</style>
