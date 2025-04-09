<script setup>
import { onMounted } from 'vue'
import useTrans from '@/mine/useTrans.js'
import useCount from '@/mine/useCount.js'

const trans = useTrans()
const count = useCount()
const currentMonth = new Date().toISOString().substring(0, 7) //"2025-04"
const nowMonth = currentMonth.substring(6)

onMounted(() => {
  trans.fetchTransactions()
  console.log(trans.monthlyExpense[currentMonth])
})
</script>

<template>
  <div>
    <i class="fa-solid fa-angle-left"></i>
    <span>{{ nowMonth }}월 </span>
    <i class="fa-solid fa-angle-right"></i>
    <p>
      {{ count.useMonthlyAmount(trans.monthlyExpense.value[currentMonth]) }} 원
    </p>
  </div>
</template>

<style scoped>
* {
  background-color: aqua;
}
div > * {
  margin: var(--space-s);
}
div {
  margin-top: var(--space-l);
  margin-left: var(--space-l);
}
.fa-solid {
  color: white;
}
</style>
