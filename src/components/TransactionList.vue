<template>
  <div class="transaction-list" style="margin-top: 16px">
    <TransactionGroup
      v-for="(transactions, date) in groupedTransactions"
      :key="date"
      :date="formatDate(date)"
      :transactions="transactions"
    />
  </div>
</template>

<script setup>
import { computed } from 'vue'
import TransactionGroup from './TransactionGroup.vue'

// ✅ defineProps로 props 선언 (Composition API 방식)
const props = defineProps({
  transactions: {
    type: Array,
    required: true,
  },
  categories: {
    type: Array,
    required: true,
  },
})

// ✅ 거래 내역을 날짜별로 묶고, categoryName도 함께 붙이기
const groupedTransactions = computed(() => {
  return props.transactions
    .map(tx => {
      // 거래의 category ID에 맞는 카테고리명 찾기
      const cat = props.categories.find(
        c => String(c.id) === String(tx.category ?? tx.categoryId),
      )
      return {
        ...tx,
        categoryName: cat?.categoryName || '카테고리없음',
      }
    })
    .reduce((acc, tx) => {
      // 날짜별로 그룹화
      const date = tx.dateTime?.split('T')[0] || '날짜 없음'
      if (!acc[date]) acc[date] = []
      acc[date].push(tx)
      return acc
    }, {})
})

// ✅ 날짜 포맷 함수 ("2025-04-04" → "4월 4일 금요일")
function formatDate(dateStr) {
  if (dateStr === '날짜 없음') return dateStr

  const date = new Date(dateStr)
  const dayNames = [
    '일요일',
    '월요일',
    '화요일',
    '수요일',
    '목요일',
    '금요일',
    '토요일',
  ]
  const month = date.getMonth() + 1
  const day = date.getDate()
  const dayName = dayNames[date.getDay()]
  return `${month}월 ${day}일 ${dayName}`
}
</script>

<style scoped>
.transaction-list {
  display: flex;
  flex-direction: column;
  gap: 20px;
}
</style>
