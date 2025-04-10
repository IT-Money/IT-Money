<script setup>
import MonthlyHeader from '@/components/MonthlyHeader.vue'
// import MonthlyChart from '@/components/MonthlyChart.vue'
// import MonthlyCategory from '@/components/MonthlyCategory.vue'
import { onMounted } from 'vue'
import useTrans from '@/stores/useTrans'
const trans = useTrans()

onMounted(async () => {
  await trans.fetchTransactions()
  console.log('마운트됨')
  // console.log('monthlyCategory:', trans.monthlyCategory.value)
})
</script>

<template>
  <MonthlyHeader />
  <!-- <MonthlyChart /> -->
  <!-- <MonthlyCategory /> -->
</template>

<style scoped>
* {
  background-color: var(--blue400);
}
</style>
