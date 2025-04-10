<script setup>
import useTrans from '@/stores/useTrans'
import useCount from '@/stores/useCount'
import { computed } from 'vue'
import { onMounted } from 'vue'
import { useRouter } from 'vue-router'

const trans = useTrans()
const count = useCount()
const router = useRouter()

const categoryName = {
  1: '식비',
  2: '쇼핑',
  3: '취미',
  4: '교통',
  5: '교육',
  6: '카테고리없음',
  7: '월급',
}
const getCategoryIcon = categoryId => {
  const iconMap = {
    1: 'food.png',
    2: 'shopping.png',
    3: 'hobby.png',
    4: 'move.png',
    5: 'education.png',
    6: 'none.png',
    7: 'income.png',
  }

  const fileName = iconMap[categoryId] || 'none.png'
  return new URL(`../icons/${fileName}`, import.meta.url).href
}

const expenseCategory = computed(() => {
  const group = {}
  const currentMonthTrans = trans.monthlyCategory.value

  if (!currentMonthTrans) return []

  for (const [category, transactions] of Object.entries(currentMonthTrans)) {
    const onlyExpense = transactions.filter(tx => String(tx.type) === '1')
    if (onlyExpense.length > 0) {
      group[category] = onlyExpense
    }
  }

  return Object.entries(group)
})

const goToCategoryPage = categoryId => {
  const category = categoryName[categoryId]
  const year = trans.nowYear.value
  const month = trans.nowMonth.value

  router.push({
    name: 'expense-categories',
    query: {
      year,
      month,
      category,
    },
  })
}

onMounted(() => {
  trans.fetchTransactions()
})
</script>

<template>
  <div
    v-for="([category, transactions], index) in expenseCategory"
    :key="index"
    class="category-item"
    @click="goToCategoryPage(Number(category))"
  >
    <div class="icon-wrapper">
      <img
        :src="getCategoryIcon(category)"
        :alt="categoryName[category]"
        class="category-icon"
      />
    </div>

    <div class="category-info">
      <p class="category-name">{{ categoryName[category] }}</p>
      <p class="category-percent">
        {{
          (() => {
            const total = transactions.reduce((s, v) => s + v.amount, 0)
            const monthTotal = count.useMonthlyAmount(
              trans.monthlyExpense.value[trans.currentMonth.value] || [],
            )
            return monthTotal > 0
              ? ((total / monthTotal) * 100).toFixed(1) + '%'
              : '0%'
          })()
        }}
      </p>
    </div>

    <!-- 금액 -->
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
