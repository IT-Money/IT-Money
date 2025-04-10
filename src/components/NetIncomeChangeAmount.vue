<script setup>
import { computed } from 'vue'
import NetIncomeChange from './NetIncomeChange.vue'

// props or db에서 받은 전체 거래 데이터
const props = defineProps({
  transactions: {
    type: Array,
    required: true,
  },
  currentYear: {
    type: Number,
    required: true,
  },
  currentMonth: {
    type: Number,
    required: true,
  },
})

// 지출 데이터만 추려냄 (type: "1"인 항목)
const expenses = computed(() =>
  props.transactions.filter(tx => String(tx.type) === '1'),
)

// 이번달 지출 계산
const thisMonthExpense = computed(() => {
  return expenses.value
    .filter(tx => {
      const date = new Date(tx.dateTime)
      return (
        date.getFullYear() === props.currentYear &&
        date.getMonth() === props.currentMonth - 1 // JS 기준 0~11월
      )
    })
    .reduce((sum, tx) => sum + tx.amount, 0)
})

// 전달 지출 계산
const lastMonthExpense = computed(() => {
  const lastMonth = props.currentMonth - 2 < 0 ? 11 : props.currentMonth - 2
  const year =
    props.currentMonth === 1 ? props.currentYear - 1 : props.currentYear

  return expenses.value
    .filter(tx => {
      const date = new Date(tx.dateTime)
      return date.getFullYear() === year && date.getMonth() === lastMonth
    })
    .reduce((sum, tx) => sum + tx.amount, 0)
})

// 변화량 계산
const compareWithLastMonth = computed(() => {
  return thisMonthExpense.value - lastMonthExpense.value
})
</script>

<template>
  <!-- ✅ 전달 대비 변화량 컴포넌트에 전달 -->
  <NetIncomeChange :changeAmount="compareWithLastMonth" />
</template>
