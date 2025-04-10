<script setup>
import ExpenseHeader from '@/components/ExpenseHeader.vue'
import ExpenseList from '@/components/ExpenseList.vue'
import { useTransactionStore } from '@/stores/TransactionStore'
import { onMounted, computed } from 'vue'

const trans = useTransactionStore()

// dailyExpense: 일별 지출액
const dailyExpense = computed(() => {
  const group = {}

  // trans.monthlyExpense는 이미 현재 월의 지출 거래만 담고 있는 배열
  const currentData = trans.monthlyExpense
  if (!currentData || currentData.length === 0) return group

  // 각 거래를 날짜별로 그룹화
  currentData.forEach(transaction => {
    const eachDate = transaction.dateTime.split('T')[0]
    if (!group[eachDate]) group[eachDate] = []
    group[eachDate].push(transaction)
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
