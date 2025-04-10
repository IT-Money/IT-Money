<script setup>
import useTrans from '@/stores/useTrans'
import useCount from '@/stores/useCount'
import { computed } from 'vue'
import { onMounted } from 'vue'

const trans = useTrans()
const count = useCount()
const expenseCategory = computed(() => {
  if (!trans.monthlyCategory.value) return []
  return Object.entries(trans.monthlyCategory.value)
})
const categoryName = {
  1: '식비',
  2: '쇼핑',
  3: '취미',
  4: '교통',
  5: '교육',
  6: '카테고리없음',
  7: '월급',
}
onMounted(() => {
  trans.fetchTransactions()
})
</script>

<template>
  <div
    v-for="([category, transactions], index) in expenseCategory"
    :key="index"
  >
    <img src="" alt="" />
    <div>
      {{ categoryName[category] }}
      <br />
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
    </div>
    <p>
      {{ transactions.reduce((s, v) => (s += v.amount), 0).toLocaleString() }}
      원
    </p>
  </div>
</template>

<style scoped></style>
