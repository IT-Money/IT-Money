<script setup>
import { computed } from 'vue'

const props = defineProps({
  income: {
    type: Number,
    required: true,
  },
  expense: {
    type: Number,
    required: true,
  },
})

const netProfit = computed(() => props.income - props.expense)
</script>
<template>
  <div class="calc-container">
    <div class="calc-row">
      <div class="calc-label">총수익</div>
      <div class="calc-value income">{{ income.toLocaleString() }}원</div>
    </div>
    <div class="calc-row">
      <div class="calc-label">총지출</div>
      <div class="calc-value expense">- {{ expense.toLocaleString() }}원</div>
    </div>
    <div class="calc-divider"></div>
    <div class="calc-row result">
      <div class="calc-label">순이익</div>
      <div class="calc-value">{{ netProfit.toLocaleString() }}원</div>
    </div>
  </div>
</template>

<style scoped>
.calc-container {
  background-color: #f7f7f7;
  border-radius: 12px;
  padding: 14px;
  margin-top: 12px;
}

.calc-row {
  display: flex;
  justify-content: space-between;
  margin-bottom: 12px;
}

.calc-row.result {
  margin-top: 16px;
  margin-bottom: 0;
  font-weight: bold;
  font-size: 18px;
}

.calc-label {
  color: #555;
}

.calc-value.income {
  color: #1e90ff;
}

.calc-value.expense {
  color: #ff4267;
}

.calc-divider {
  height: 1px;
  background-color: #ddd;
  margin: 8px 0;
}
</style>
