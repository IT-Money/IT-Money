<!-- views/NetIncome.vue -->
<template>
  <section class="net-income-page">
    <!-- 1. 상단 요약 컴포넌트 -->
    <NetIncomeSummary
      :year="Number(year)"
      :month="Number(month)"
      :netAmount="netAmount"
    />

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
import { ref, computed } from 'vue'
import NetIncomeSummary from '@/components/NetIncomeSummary.vue'
import NetIncomeCalc from '@/components/NetIncomeCalc.vue'
import NetIncomeChange from '@/components/NetIncomeChange.vue'
import NetIncomeGroup from '@/components/NetIncomeSection.vue'
import wallet from '../../wallet_db.json' // 거래내역 JSON
console.log('wallet', wallet) // 👈

// ✅ 현재 선택 중인 연/월
const year = ref('2025')
const month = ref('04')

// ✅ 거래내역 필터링
const filteredTransactions = computed(() =>
  wallet.transactions.filter(t =>
    t.dateTime.startsWith(`${year.value}-${month.value}`),
  ),
)

// ✅ 수익/지출 분리
const incomeList = computed(
  () => filteredTransactions.value.filter(t => t.type === '2'), // '2'가 수익
)
const expenseList = computed(
  () => filteredTransactions.value.filter(t => t.type === '1'), // '1'이 지출
)

// ✅ 총합
const totalIncome = computed(() =>
  incomeList.value.reduce((acc, cur) => acc + cur.amount, 0),
)
const totalExpense = computed(() =>
  expenseList.value.reduce((acc, cur) => acc + cur.amount, 0),
)
const netAmount = computed(() => totalIncome.value - totalExpense.value)

// ✅ 전달 비교 (간단 예시)
const compareWithLastMonth = computed(() => {
  const lastMonthAmount = 13000 // mock
  return netAmount.value - lastMonthAmount
})
console.log('✅ 현재 연도:', year.value)
console.log('✅ 현재 월:', month.value)
console.log('✅ 필터 조건:', `${year.value}-${month.value}`)
console.log('✅ 전체 거래 개수:', wallet.transactions.length)

console.log('✅ 필터링된 거래:', filteredTransactions.value)
console.log('✅ 수입:', incomeList.value)
console.log('✅ 지출:', expenseList.value)
</script>

<style scoped>
.net-income-page {
  height: 70vh; /* max-height 대신 명확하게 */
  overflow-y: auto;
  overflow-x: hidden;
  padding: 8px;
}
</style>
