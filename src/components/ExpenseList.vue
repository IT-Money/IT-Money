<script setup>
import TranscationGroup from './TransactionGroup.vue'

defineProps({
  dailyExpense: Object,
})

function formatDate(dateTime) {
  if (!dateTime) return '날짜 없음'
  const [year, month, day] = dateTime.split('-').map(Number)
  const date = new Date(year, month - 1, day)
  const dayNames = [
    '일요일',
    '월요일',
    '화요일',
    '수요일',
    '목요일',
    '금요일',
    '토요일',
  ]
  const dayName = dayNames[date.getDay()]
  return `${month}월 ${day}일 ${dayName}`
}
</script>

<template>
  <div class="expense-list" style="margin-top: 16px">
    <TranscationGroup
      v-for="(transactions, dateTime) in dailyExpense"
      :key="dateTime"
      :dateTime="formatDate(dateTime)"
      :transactions="transactions"
    />
  </div>
</template>

<style scoped>
.expense-list {
  display: flex;
  flex-direction: column;
  gap: 20px;
}
</style>
