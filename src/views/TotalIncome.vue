<script setup>
import IncomeHeader from '@/components/IncomeHeader.vue'
import IncomeList from '@/components/IncomeList.vue'
import useTrans from '@/stores/useTrans'
import { onMounted } from 'vue'
import { computed } from 'vue'
const trans = useTrans()

// dailyIncome: 일별 수입액
const dailyIncome = computed(() => {
  const group = {}

  const currentData = trans.monthlyIncome.value[trans.currentMonth.value]
  if (!currentData) return group

  trans.monthlyIncome.value[trans.currentMonth.value].forEach(trans => {
    const eachDate = trans.dateTime.split('T')[0]
    if (!group[eachDate]) group[eachDate] = []
    group[eachDate].push(trans)
  })
  return group
})
onMounted(async () => {
  await trans.fetchTransactions()
  console.log('expenselist 컴포넌트 실행')
  console.log('dailyIncome:', dailyIncome.value)
})
</script>

<template>
  <IncomeHeader />
  <IncomeList :daily-income="dailyIncome" />
</template>

<style scoped></style>
