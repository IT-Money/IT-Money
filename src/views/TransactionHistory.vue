<script setup>
import MonthlyHeader from '@/components/MonthlyHeader'
import MonthlyChart from '@/components/MonthlyChart'
import MonthlyCategory from '@/compoenets/MonthlyCategory'
import { onMounted } from 'vue'
import { useTrans } from '@/mine/useTrans'
const counter = useTrans()
const currentMonth = new Date().toISOString().substring(0, 7)

onMounted(() => {
  counter.fetchTransactions()
  console.log('마운트됨')
})
</script>

<template>
  <MonthlyHeader />
  <MonthlyChart />
  <MonthlyCategory />
  {{ currentMonth }}
</template>

<style scoped></style>
