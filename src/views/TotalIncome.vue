<script setup>
import IncomeHeader from '@/components/IncomeHeader.vue'
import IncomeList from '@/components/IncomeList.vue'
import { useTransactionStore } from '@/stores/TransactionStore'
import { onMounted } from 'vue'
import { computed } from 'vue'
const trans = useTransactionStore()

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
</script>

<template>
  <IncomeHeader />
  <IncomeList :daily-income="dailyIncome" />
</template>

<style scoped></style>
