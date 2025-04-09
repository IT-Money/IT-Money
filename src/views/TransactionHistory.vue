<script setup>
import MonthlyHeader from '@/components/MonthlyHeader.vue'
// import MonthlyChart from '@/components/MonthlyChart.vue'
// import MonthlyCategory from '@/components/MonthlyCategory.vue'
import { onMounted } from 'vue'
import useTrans from '@/stores/useTrans'
const trans = useTrans()

onMounted(() => {
  trans.fetchTransactions()
  console.log('마운트됨')
})
</script>

<template>
  <MonthlyHeader />
  <!-- <MonthlyChart />
  <MonthlyCategory /> -->
</template>

<style scoped></style>
