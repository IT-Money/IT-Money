<script setup>
import ExpenseHeader from '@/components/ExpenseHeader.vue'
import ExpenseList from '@/components/ExpenseList.vue'
import { useTransactionsStore } from '@/stores/TransactionStore'
import { onMounted, computed } from 'vue'
import { onActivated } from 'vue'

const trans = useTransactionsStore()

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
onActivated(() => {
  trans.fetchTransactions()
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
  /* 기존 스타일 유지하면서 수정 */
  height: 100%;
  max-height: 600px; /* #app의 높이(670px)보다 작게 설정 */
  overflow-y: auto;
  overflow-x: hidden;
  padding: 8px;
  padding-bottom: 80px; /* 하단 여백 추가 */

  /* 스크롤바 스타일링 (옵션) */
  scrollbar-width: thin;
  scrollbar-color: rgba(0, 0, 0, 0.2) transparent;
}
</style>
