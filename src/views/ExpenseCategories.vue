<script setup>
import CategorySummary from '@/components/CategorySummary.vue'
import TransactionList from '@/components/TransactionList.vue'
import { useTransactionStore } from '@/stores/TransactionStore'
import { useCategoryStore } from '@/stores/category'
import { useRoute } from 'vue-router'
import { computed, onMounted } from 'vue'

const route = useRoute()
const trans = useTransactionStore()
const categoryStore = useCategoryStore()

// 라우트 파라미터 가져오기
const categoryName = computed(() => route.query.category || '카테고리')
const categoryId = computed(() => {
  const id = route.query.categoryId
  return id ? String(id) : null
})
const year = computed(() => Number(route.query.year) || trans.nowYear)
const month = computed(() => Number(route.query.month) || trans.nowMonth)

// 현재 선택된 카테고리 정보
const categoryInfo = computed(() => {
  return (
    categoryStore.categories.find(c => c.id === categoryId.value) || {
      id: categoryId.value,
      categoryName: categoryName.value,
      image: '@/icons/none.png',
    }
  )
})

// 해당 카테고리의 거래만 필터링
const categoryTransactions = computed(() => {
  if (!trans.transactions.length) return []

  return trans.transactions.filter(tx => {
    // 날짜 필터링
    const txDate = new Date(tx.dateTime)
    const isMatchYear = txDate.getFullYear() === Number(year.value)
    const isMatchMonth = txDate.getMonth() + 1 === Number(month.value)

    // 카테고리 필터링
    const isMatchCategory = String(tx.category) === String(categoryId.value)

    return isMatchYear && isMatchMonth && isMatchCategory && tx.type === '1'
  })
})

// 날짜별로 그룹화
const dailyTransactions = computed(() => {
  const group = {}

  categoryTransactions.value.forEach(tx => {
    const date = tx.dateTime.split('T')[0]
    if (!group[date]) group[date] = []
    group[date].push(tx)
  })

  return group
})

onMounted(async () => {
  await Promise.all([
    trans.fetchTransactions(),
    categoryStore.fetchCategories(),
  ])
})
</script>

<template>
  <section class="expense-category-page">
    <!-- CategorySummary에 필요한 정보 전달 -->
    <CategorySummary
      :categoryInfo="categoryInfo"
      :transactions="categoryTransactions"
      :year="year"
      :month="month"
    />

    <!-- TransactionList에 필터링된 거래 데이터와 카테고리 정보 전달 -->
    <TransactionList
      :dailyExpense="dailyTransactions"
      :categoryInfo="categoryInfo"
    />
  </section>
</template>

<style scoped>
.expense-category-page {
  height: 70vh;
  overflow-y: auto;
  overflow-x: hidden;
  padding: 8px;
}
</style>
