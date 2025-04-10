<template>
  <div class="net-income-wrapper">
    <div class="row">
      <div class="item">
        <div class="label income-label">총 수익</div>
        <div class="value income-value">{{ formatNumber(income) }}</div>
      </div>
      <div class="operator">-</div>
      <div class="item">
        <div class="label expense-label">총 지출</div>
        <div class="value expense-value">{{ formatNumber(expense) }}</div>
      </div>
    </div>
    <div class="equals">= {{ format(income - expense) }}</div>
  </div>
</template>

<script setup>
defineProps({
  income: Number,
  expense: Number,
})

function formatNumber(value) {
  return value.toLocaleString()
}

function format(value) {
  return value.toLocaleString() + ' 원'
}
</script>

<style scoped>
.net-income-wrapper {
  padding: 1rem 1rem;
  font-family: 'Pretendard', sans-serif;
}

.row {
  display: flex;
  align-items: flex-end;
  gap: 1.5rem;
  margin-bottom: 0.8rem;
}

.item {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
}

.label {
  font-size: 0.85rem;
  margin-bottom: 0.2rem;
  font-weight: 700;
}

.income-label {
  color: #06b6d4; /* 청록색 */
}

.expense-label {
  color: #ec4899; /* 핑크 */
}

.value {
  font-size: 1.7rem;
  color: #111827;
  text-align: left;
  font-weight: 500;
}

.income-value {
  color: black;
}

.expense-value {
  color: black;
}

.operator {
  font-size: 1.8rem;
  font-weight: 800;
  color: #6b7280;
  margin-bottom: 0.3rem;
}

.equals {
  font-size: 1.8rem;
  font-weight: 700;
  text-align: right;
  margin: 0.7rem 0 0.8rem;
  color: #111827;
}

.compare-text {
  font-size: 0.9rem;
  color: #6b7280;
  text-align: center;
}

.highlight {
  color: #06b6d4;
  font-weight: 700;
}
</style>
