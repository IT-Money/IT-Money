<script setup>
import { computed, onMounted } from 'vue'
import { useTransactionsStore } from '@/stores/TransactionStore'
import { useCountStore } from '@/stores/CountStore'
import { useCategoryStore } from '@/stores/category'
import { useRoute } from 'vue-router'
import NetIncomeSummary from '@/components/NetIncomeSummary.vue'
import NetIncomeCalc from '@/components/NetIncomeCalc.vue'
import NetIncomeChange from '@/components/NetIncomeChange.vue'
import NetIncomeSection from '@/components/NetIncomeSection.vue'

// Pinia 스토어 사용
const trans = useTransactionsStore()
const count = useCountStore()
const categoryStore = useCategoryStore()
const route = useRoute()

const year = computed(() => Number(route.query.year) || trans.nowYear)
const month = computed(() => Number(route.query.month) || trans.nowMonth)

// 현재 월 거래 필터링
const filteredTransactions = computed(() => {
  return trans.transactions.filter(t => {
    const txDate = new Date(t.dateTime)
    return (
      txDate.getFullYear() === year.value &&
      txDate.getMonth() + 1 === month.value
    )
  })
})

// 수입/지출 분리
const incomeList = computed(() =>
  filteredTransactions.value.filter(t => t.type === '2'),
)
const expenseList = computed(() =>
  filteredTransactions.value.filter(t => t.type === '1'),
)

// 이전 달 계산
const prevYear = computed(() => {
  if (month.value === 1) return year.value - 1
  return year.value
})
const prevMonth = computed(() => {
  if (month.value === 1) return 12
  return month.value - 1
})

// 이전 달 거래 필터링
const prevFilteredTransactions = computed(() => {
  return trans.transactions.filter(t => {
    const txDate = new Date(t.dateTime)
    return (
      txDate.getFullYear() === prevYear.value &&
      txDate.getMonth() + 1 === prevMonth.value
    )
  })
})

// 이전 달 지출
const prevExpenseList = computed(() =>
  prevFilteredTransactions.value.filter(t => t.type === '1'),
)

// 총합 계산 (CountStore 사용)
const totalIncome = computed(() => count.useMonthlyAmount(incomeList.value))
const totalExpense = computed(() => count.useMonthlyAmount(expenseList.value))
const netAmount = computed(() => totalIncome.value - totalExpense.value)

// 이전 달 지출 총합
const prevTotalExpense = computed(() =>
  count.useMonthlyAmount(prevExpenseList.value),
)

// 전달 대비 변화
const compareWithLastMonth = computed(
  () => totalExpense.value - prevTotalExpense.value,
)

onMounted(async () => {
  await Promise.all([
    trans.fetchTransactions(),
    categoryStore.fetchCategories(),
  ])
})
</script>

<template>
  <section class="net-income-page">
    <!-- 1. 상단 요약 컴포넌트 -->
    <NetIncomeSummary :year="year" :month="month" :netAmount="netAmount" />

    <!-- 2. 순이익 계산  -->
    <NetIncomeCalc :income="totalIncome" :expense="totalExpense" />

    <!-- 3. 전달 대비 -->
    <NetIncomeChange :changeAmount="compareWithLastMonth" />

    <NetIncomeSection
      type="수익"
      :transactions="incomeList"
      :categories="categoryStore.categories"
    />
    <NetIncomeSection
      type="지출"
      :transactions="expenseList"
      :categories="categoryStore.categories"
    />
  </section>
</template>

<style scoped>
.net-income-page {
  height: 100%;
  max-height: 600px;
  overflow-x: hidden;
  padding: 8px;
  padding-bottom: 80px;

  scrollbar-width: thin;
  scrollbar-color: rgba(0, 0, 0, 0.2) transparent;
}
</style>
