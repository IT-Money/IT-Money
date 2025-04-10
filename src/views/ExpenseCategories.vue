<script setup>
import { computed, onMounted } from 'vue'
import { useRoute } from 'vue-router'
import useTrans from '@/stores/useTrans'
import CategorySummary from '@/components/CategorySummary.vue'
import TransactionList from '@/components/TransactionList.vue'

const trans = useTrans()
const route = useRoute()

const year = Number(route.query.year)
const month = Number(route.query.month)
const categoryName = route.query.category

const categoryMap = {
  식비: 1,
  쇼핑: 2,
  취미: 3,
  교통: 4,
  교육: 5,
  카테고리없음: 6,
  월급: 7,
}
const categoryId = categoryMap[categoryName] || 6

const categories = computed(() => trans.categories?.value || [])

const transactions = computed(() => {
  const list = trans.monthlyCategory.value?.[categoryId] || []
  return list.filter(tx => String(tx.type) === '1')
})

const amount = computed(() =>
  transactions.value.reduce((sum, tx) => sum + tx.amount, 0),
)
const date = computed(() => transactions.value.length)

onMounted(async () => {
  if (!trans.transactions.value.length) {
    await trans.fetchTransactions()
  }
})
</script>
<template>
  <CategorySummary
    v-if="transactions.length"
    :year="year"
    :month="month"
    :categoryName="categoryName"
    :amount="amount"
    :date="date"
  />

  <TransactionList
    v-if="transactions.length"
    :transactions="transactions"
    :categories="categories"
  />
</template>
