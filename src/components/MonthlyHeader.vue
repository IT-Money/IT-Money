<script setup>
import { onMounted } from 'vue'
import useTrans from '@/stores/useTrans.js'
import useCount from '@/stores/useCount.js'

const trans = useTrans()
const count = useCount()

onMounted(() => {
  trans.fetchTransactions()
  console.log('currentMonth값', trans.currentMonth)
})
</script>

<template>
  <div>
    <i class="fa-solid fa-angle-left"></i>
    <span>{{ trans.nowMonth }}월 </span>
    <i class="fa-solid fa-angle-right"></i>
    <p>
      {{
        count.useMonthlyAmount(
          trans.monthlyExpense.value[trans.currentMonth.value],
        )
      }}
      원
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
