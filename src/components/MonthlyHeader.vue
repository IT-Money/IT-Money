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
  <div class="header_con">
    <div class="header_top">
      <i class="fa-solid fa-angle-left"></i>
      <span>{{ trans.nowMonth }}월 </span>
      <i class="fa-solid fa-angle-right"></i>
    </div>
    <p class="header_btm">
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
.header_con {
  background-color: var(--blue400);
  padding: 16px 24px;
  color: white;
  display: flex;
  flex-direction: column;
}

.header_top {
  display: flex;
  align-items: center;
  gap: 6px;
}

.header_btm {
  font-size: 24px;
  font-weight: bold;
  margin-top: 8px;
  margin-left: 8px;
}
</style>
