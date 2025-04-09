<template>
  <div class="calc-box">
    <span class="amount income">+{{ format(income) }}</span>
    <span class="operator">-</span>
    <span class="amount expense">-{{ format(expense) }}</span>
    <span class="operator">=</span>
    <span class="amount result">{{ format(income - expense) }}</span>
  </div>
</template>

<script setup>
defineProps({
  income: Number,
  expense: Number,
})

function format(value) {
  return value.toLocaleString() + '원'
}
</script>

<style scoped>
.calc-box {
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 1.2rem;
  background-color: #f9f9f9;
  border-radius: 10px;
  padding: 1rem;
  margin-bottom: 1.5rem;
  box-shadow: 0 2px 6px rgba(0, 0, 0, 0.08);
  font-weight: 600;
}

.amount {
  min-width: 100px;
  text-align: right;
  padding: 0 0.5rem;
}

.income {
  color: #22c55e; /* 초록 */
}
.expense {
  color: #ef4444; /* 빨강 */
}
.result {
  color: #3b82f6; /* 파랑 */
}
.operator {
  padding: 0 0.5rem;
}
</style>
