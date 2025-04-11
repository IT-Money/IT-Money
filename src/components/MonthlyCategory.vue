<script setup>
import { useTransactionsStore } from '@/stores/TransactionStore'
import { useCountStore } from '@/stores/CountStore'
import { useCategoryStore } from '@/stores/category'
import { computed } from 'vue'
import { onMounted } from 'vue'
import { useRouter } from 'vue-router'
import { watch } from 'vue'

const trans = useTransactionsStore()
const count = useCountStore()
const router = useRouter()
const categoryStore = useCategoryStore()

// 카테고리 이름 가져오기
const getCategoryName = categoryId => {
  const category = categoryStore.categories.find(c => c.id === categoryId)
  return category ? category.categoryName : '카테고리 없음'
}

// 카테고리 아이콘 가져오기
const getCategoryIcon = categoryId => {
  const category = categoryStore.categories.find(c => c.id === categoryId)
  if (!category) return new URL(`../icons/none.png`, import.meta.url).href

  const imagePath = category.image
  const fileName = imagePath.split('/').pop()
  return new URL(`../icons/${fileName}`, import.meta.url).href
}

const expenseCategory = computed(() => {
  const group = {}
  const currentMonthTrans = trans.monthlyCategory
  if (!currentMonthTrans) return []
  for (const [category, transactions] of Object.entries(currentMonthTrans)) {
    const onlyExpense = transactions.filter(tx => String(tx.type) === '1')
    if (onlyExpense.length > 0) {
      group[category] = onlyExpense
    }
  }
  return Object.entries(group)
})
// 카테고리 페이지로 이동
const goToCategoryPage = categoryId => {
  const category = getCategoryName(categoryId)
  const year = trans.nowYear
  const month = trans.nowMonth

  router.push({
    name: 'expense-categories',
    query: {
      year,
      month,
      category,
      categoryId,
    },
  })
}

onMounted(async () => {
  await Promise.all([
    trans.fetchTransactions(),
    categoryStore.fetchCategories(),
  ])
})

watch(
  () => trans.currentMonth,
  async () => {
    await trans.fetchTransactions()
  },
)
</script>

<template>
  <div
    v-for="([category, transactions], index) in expenseCategory"
    :key="index"
    class="category-item"
    @click="goToCategoryPage(category)"
  >
    <!-- 카테고리 아이콘 -->
    <div class="icon-wrapper">
      <img
        :src="getCategoryIcon(category)"
        :alt="getCategoryIcon(category)"
        class="category-icon"
      />
    </div>
    <div class="category-info">
      <!-- 카테고리 이름름 -->
      <p class="category-name">{{ getCategoryName(category) }}</p>
      <!-- 카테고리별 비율 -->
      <p class="category-percent">
        {{
          (() => {
            const total = transactions.reduce((s, v) => s + v.amount, 0)
            const monthTotal = count.useMonthlyAmount(
              trans.monthlyExpense || [],
            )
            return monthTotal > 0
              ? ((total / monthTotal) * 100).toFixed(1) + '%'
              : '0%'
          })()
        }}
      </p>
    </div>
    <!-- 카테고리별 총액 -->
    <div class="category-amount">
      {{ transactions.reduce((s, v) => (s += v.amount), 0).toLocaleString() }}원
    </div>
  </div>
</template>

<style scoped>
.category-item {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 12px 20px;
  border-bottom: 1px solid #eee;
  cursor: pointer;
}

.icon-wrapper {
  width: 40px;
  height: 40px;
  border-radius: 50%;
  background-color: #f2f2f2;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-right: 12px;
  flex-shrink: 0;
}

.icon-wrapper img {
  width: 40px;
  height: 40px;
  margin-left: 12px;
  object-fit: contain;
}

.category-info {
  flex: 1;
  display: flex;
  flex-direction: column;
}

.category-name {
  font-size: 15px;
  font-weight: bold;
  color: #333;
  margin: 0;
}

.category-percent {
  font-size: 13px;
  color: #999;
  margin: 0;
}

.category-amount {
  font-size: 14px;
  font-weight: bold;
  color: #3366ff;
  white-space: nowrap;
  padding-left: 12px;
}
.category-icon {
  width: 24px;
  height: 24px;
  margin-right: 12px;
}
</style>
