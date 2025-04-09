<!-- views/NetIncome.vue -->
<template>
  <section class="net-income-page">
    <!-- 1. 상단 요약 컴포넌트 -->
    <NetIncomeSummary :year="year" :month="month" :netAmount="netAmount" />

    <!-- 2. 순이익 계산 영역 -->
    <NetIncomeCalc :income="totalIncome" :expense="totalExpense" />

    <!-- 3. 전달 대비 변화 텍스트 -->
    <NetIncomeChange :changeAmount="compareWithLastMonth" />

    <!-- 4. 수익 항목 -->
    <NetIncomeGroup type="수익" :wallet="incomeList" />

    <!-- 5. 지출 항목 -->
    <NetIncomeGroup type="지출" :wallet="expenseList" />
  </section>
</template>

<script setup>
import { computed } from 'vue'
import NetIncomeSummary from '@/components/NetIncomeSummary.vue'
import NetIncomeCalc from '@/components/NetIncomeCalc.vue'
import NetIncomeChange from '@/components/NetIncomeChange.vue'
import NetIncomeGroup from '@/components/NetIncomeGroup.vue'

// import { getCurrentYearMonth, getLastMonth } from '@/utils/dateUtils'
import wallet from '../../wallet_db.json' // 거래내역 JSON
console.log('wallet', wallet) // 👈

// 현재 연도와 월을 문자열로 반환 (예: "2025-04")
function getCurrentYearMonth() {
  const now = new Date()
  const year = now.getFullYear()
  const month = String(now.getMonth() + 1).padStart(2, '0') // 0~11 이기 때문에 +1
  return `${year}-${month}`
}

// ✅ 현재 연월 계산
const { year, month } = getCurrentYearMonth()

// ✅ 현재 달 거래내역 필터링
const filteredTransactions = computed(() =>
  wallet.transactions.filter(t =>
    t.dateTime.startsWith(`${year}-${String(month).padStart(2, '0')}`),
  ),
)

// ✅ 수익 / 지출 분리
const incomeList = computed(() =>
  filteredTransactions.value.filter(t => t.type === '수익'),
)
const expenseList = computed(() =>
  filteredTransactions.value.filter(t => t.type === '지출'),
)

// ✅ 총합 계산
const totalIncome = computed(() =>
  incomeList.value.reduce((acc, cur) => acc + cur.amount, 0),
)
const totalExpense = computed(() =>
  expenseList.value.reduce((acc, cur) => acc + cur.amount, 0),
)
const netAmount = computed(() => totalIncome.value - totalExpense.value)

// ✅ 전달 대비 변화 예시 (간단 비교용)
const compareWithLastMonth = computed(() => {
  // 예시: 전달 대비 총합 비교만 계산 (실제는 전달 수익/지출 데이터 필요)
  const lastMonthAmount = 13000 // mock
  const diff = netAmount.value - lastMonthAmount
  return diff
})
</script>

<style scoped>
.net-income-page {
  padding: 1.2rem;
}
</style>
