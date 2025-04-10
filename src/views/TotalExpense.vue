<script setup>
import ExpenseHeader from '@/components/ExpenseHeader.vue'
import ExpenseList from '@/components/ExpenseList.vue'
import useTrans from '@/stores/useTrans'
import { onMounted } from 'vue'
import { computed } from 'vue'
const trans = useTrans()

// dailyExpense: 일별 지출액
const dailyExpense = computed(() => {
  const group = {}

  const currentData = trans.monthlyExpense.value[trans.currentMonth.value]
  if (!currentData) return group

  trans.monthlyExpense.value[trans.currentMonth.value].forEach(trans => {
    const eachDate = trans.dateTime.split('T')[0]
    if (!group[eachDate]) group[eachDate] = []
    group[eachDate].push(trans)
  })
  return group
})
onMounted(async () => {
  await trans.fetchTransactions()
  console.log('expenselist 컴포넌트 실행')
  console.log('dailyExpense:', dailyExpense.value)
})
</script>

<template>
  <section class="totalexpense_page">
    <ExpenseHeader />
    <ExpenseList :dailyExpense="dailyExpense" />
  </section>
</template>

<style scoped>
.totalexpense_page {
  height: 70vh;
  overflow-y: auto;
  overflow-x: hidden;
  padding: 8px;
}
</style>
