<script setup>
import { onMounted } from 'vue'
import { useTransactionsStore } from '@/stores/TransactionStore'
import { useCountStore } from '@/stores/CountStore'

const trans = useTransactionsStore()
const count = useCountStore()

onMounted(() => {
  trans.fetchTransactions().then(() => {
    console.log('📦 monthlyExpense:', trans.monthlyExpense.length)
  })
})
</script>

<template>
  <div class="header_con">
    <div class="header_top">
      <i class="fa-solid fa-angle-left" @click="trans.gotoPrevMonth"></i>
      <span>{{ trans.nowMonth }}월 </span>
      <i class="fa-solid fa-angle-right" @click="trans.gotoNextMonth"></i>
    </div>
    <p class="header_btm">
      {{ count.useMonthlyAmount(trans.monthlyExpense).toLocaleString() }}
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
