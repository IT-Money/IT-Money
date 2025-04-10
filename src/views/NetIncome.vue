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

    <NetIncomeSection
      type="수익"
      :wallet="incomeList"
      :categories="wallet.categories"
    />
    <NetIncomeSection
      type="지출"
      :wallet="expenseList"
      :categories="wallet.categories"
    />
  </section>
</template>

<script setup>
import { ref, computed } from 'vue'
import { useRoute } from 'vue-router' // ✅ 라우터 사용
import NetIncomeSummary from '@/components/NetIncomeSummary.vue'
import NetIncomeCalc from '@/components/NetIncomeCalc.vue'
import NetIncomeChange from '@/components/NetIncomeChange.vue'
import NetIncomeSection from '@/components/NetIncomeSection.vue'
import wallet from '../../wallet_db.json' // 거래내역 JSON
console.log('wallet', wallet) // 👈

// 1. 라우트에서 파라미터 추출 !!
const route = useRoute()
const year = ref(route.query.year || '2025')
const month = ref(route.query.month || '04')

// ✅ 현재 연/월에 해당하는 거래만 필터링
const filteredTransactions = computed(() =>
  wallet.transactions.filter(t =>
    t.dateTime.startsWith(`${year.value}-${month.value}`),
  ),
)

// ✅ 전달 연/월 구하기
const prevYear = computed(() => {
  if (month.value === '01') return String(Number(year.value) - 1)
  return year.value
})
const prevMonth = computed(() => {
  if (month.value === '01') return '12'
  return String(Number(month.value) - 1).padStart(2, '0')
})

// ✅ 전달 거래 필터링
const prevFilteredTransactions = computed(() =>
  wallet.transactions.filter(t =>
    t.dateTime.startsWith(`${prevYear.value}-${prevMonth.value}`),
  ),
)

// ✅ 현재 월의 수익/지출 분리
const incomeList = computed(() =>
  filteredTransactions.value.filter(t => t.type === '2'),
)
const expenseList = computed(() =>
  filteredTransactions.value.filter(t => t.type === '1'),
)

// ✅ 전달 월의 지출만 필터링
const prevExpenseList = computed(() =>
  prevFilteredTransactions.value.filter(t => t.type === '1'),
)

// ✅ 총합 계산
const totalIncome = computed(() =>
  incomeList.value.reduce((acc, cur) => acc + cur.amount, 0),
)
const totalExpense = computed(() =>
  expenseList.value.reduce((acc, cur) => acc + cur.amount, 0),
)
const netAmount = computed(() => totalIncome.value - totalExpense.value)

// ✅ 전달 지출 총합 계산
const prevTotalExpense = computed(() =>
  prevExpenseList.value.reduce((acc, cur) => acc + cur.amount, 0),
)

// ✅ 전달 대비 지출 변화 계산
const compareWithLastMonth = computed(
  () => totalExpense.value - prevTotalExpense.value,
)

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
  height: 70vh;
  overflow-y: auto;
  overflow-x: hidden;
  padding: 8px;
}
</style>
