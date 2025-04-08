<script setup></script>

<template>
  <div class="edit-name-container">
    <div class="input-group">
      <label for="current-name">현재 이름</label>
      <input id="current-name" type="text" />
    </div>

    <div class="input-group">
      <label for="new-name">새 이름</label>
      <input id="new-name" type="text" placeholder="New name" />
    </div>

    <button class="change-name-button">이름 변경</button>
  </div>
</template>

<style scoped>
.edit-name-container {
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
  font-size: 16px;
}

.change-name-button {
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

.change-name-button:enabled {
  /* 새 이름까지 쓰면 enable하게 */
  cursor: pointer;
}

.change-name-button:enabled:hover {
  background-color: var(--blue400); /* blue */
  color: var(--gray100);
}
</style>
