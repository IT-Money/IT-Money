<script setup>
import { useFormStore } from '@/stores/formStore'
const store = useFormStore()

const setType = value => {
  store.setType(value)
}
</script>

<template>
  <!-- 수입,지출 버튼 -->
  <div class="type-toggle">
    <button
      :class="['toggle-btn', store.type === 'income' ? 'active-income' : '']"
      @click="setType('income')"
    >
      수입
    </button>
    <button
      :class="['toggle-btn', store.type === 'expense' ? 'active-expense' : '']"
      @click="setType('expense')"
    >
      지출
    </button>
  </div>
</template>

<style scoped>
.type-toggle {
  display: flex;
  justify-content: center;
  gap: 100px;
  margin: 12px 0;
}

.toggle-btn {
  padding: 10px 22px;
  border-radius: 12px;
  background-color:#e0dff2;
  color: black;
  font-weight: 700;
  border: none;
  cursor: pointer;
  transition: all 0.2s ease;
}

.active-income {
  color: var(--sementic-sky);
  font-weight: 700;
}

.active-expense {
  color: var(--sementic-red);
  font-weight: 700;
}
</style>
