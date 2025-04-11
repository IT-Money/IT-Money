<script setup>
import IncomeHeader from '@/components/IncomeHeader.vue'
import IncomeList from '@/components/IncomeList.vue'
import { useTransactionsStore } from '@/stores/TransactionStore'
import { onMounted } from 'vue'
import { computed } from 'vue'
import { onActivated } from 'vue'
const trans = useTransactionsStore()

// dailyIncome: 일별 수입액
const dailyIncome = computed(() => {
  const group = {}

  const currentData = trans.monthlyIncome
  if (!currentData || currentData.length === 0) return group

  currentData.forEach(transaction => {
    const eachDate = transaction.dateTime.split('T')[0]
    if (!group[eachDate]) group[eachDate] = []
    group[eachDate].push(transaction)
  })
  return group
})
onMounted(async () => {
  await trans.fetchTransactions()
  console.log('dailyIncome:', dailyIncome.value)
})
onActivated(() => {
  trans.fetchTransactions()
})
</script>

<template>
  <div class="totalincome_page">
    <IncomeHeader />
    <IncomeList :daily-income="dailyIncome" />
  </div>
</template>

<style scoped>
.totalincome_page {
  height: 100%;
  max-height: 600px;
  overflow-y: auto;
  overflow-x: hidden;
  padding: 8px;
  padding-bottom: 80px;

  scrollbar-width: thin;
  scrollbar-color: rgba(0, 0, 0, 0.2) transparent;
}
</style>
