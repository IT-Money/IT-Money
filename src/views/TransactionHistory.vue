<script setup>
import MonthlyHeader from '@/components/MonthlyHeader.vue'
import MonthlyCategory from '@/components/MonthlyCategory.vue'
import { onMounted } from 'vue'
import { useTransactionsStore } from '@/stores/TransactionStore'

const trans = useTransactionsStore()

onMounted(async () => {
  await trans.fetchTransactions()
  console.log('마운트됨')
})
</script>

<template>
  <MonthlyHeader />
  <MonthlyCategory />
</template>

<style scoped>
* {
  background-color: var(--blue400);
}
</style>
