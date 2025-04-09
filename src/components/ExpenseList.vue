<script setup>
import ExpenseGroup from './ExpenseGroup.vue'
import useTrans from '@/stores/useTrans'
import { onMounted } from 'vue'
import { computed } from 'vue'

const trans = useTrans()

// dailyExpense: 일별 지출액
const dailyExpense = computed(() => {
  const group = {}
  trans.monthlyExpense.value[trans.currentMonth.value].forEach(trans => {
    const eachDate = trans.dateTime.split('T')[0]
    if (!group[eachDate]) group[eachDate] = []
    group[eachDate].push(trans)
  })
  return group
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

onMounted(() => {
  trans.fetchTransactions()
})
</script>

<template>
  <div class="transaction-list" style="margin-top: 16px">
    <ExpenseGroup
      v-for="(transactions, dateTime) in dailyExpense"
      :key="dateTime"
      :dateTime="formatDate(dateTime)"
      :transactions="transactions"
    />
  </div>
</template>

<style scoped>
.transaction-list {
  display: flex;
  flex-direction: column;
  gap: 20px;
}
</style>
