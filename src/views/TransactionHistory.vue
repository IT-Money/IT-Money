<!-- <script setup>
// import CategoryBar from '@/components/CategoryBar.vue'
// import CategoryList from '@/components/CategoryList.vue'
import MonthlyHeader from '@/components/MonthlyHeader.vue'
import { ref } from 'vue'
const currentMonth = ref('2025-04')
const filterMonth = computed(() => {
  transactions.value.filter((trans)=> trans.dateTime.startsWith(currentMonth.value))
})
</script>

<template>
  <MonthlyHeader />

  <CategoryBar />
  <CategoryList />
</template>

<style scoped></style> -->
