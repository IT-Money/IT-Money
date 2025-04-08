<script setup>
import { ref, computed } from 'vue'
import { onMounted } from 'vue'
import axios from '@/utils/axios'
const transactions = ref([])
const monthlyTransactions = ref([])
const error = ref(null)
const monthlyExpense = async () => {
  try {
    const response = await axios.get('/transactions')
    transactions.value = response.data
    monthlyTransactions.value = transactions.value.filter(trans =>
      trans.dateTime.startsWith('2025-04'),
    )
    console.log(transactions)
  } catch (err) {
    error.value = err.message || '거래시간 출력 중 오류 '
    console.error('오류 발생:', error)
  }
}
const totalAmount = computed(() =>
  monthlyTransactions.value.reduce((sum, item) => (sum += item.amount), 0),
)
onMounted(() => {
  monthlyExpense()
})
</script>

<template>
  <i class="fa-solid fa-angle-left"></i><span>{{}}월 </span>
  <i class="fa-solid fa-angle-right"></i>
  <p>{{ totalAmount }} 원</p>
</template>

<style scoped></style>
