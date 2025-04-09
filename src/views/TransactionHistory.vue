<script setup>
// import CategoryBar from '@/components/CategoryBar.vue'
// import CategoryList from '@/components/CategoryList.vue'
import {axios} from '@/utils/axios'
import MonthlyHeader from '@/components/MonthlyHeader.vue'
import { ref, computed } from 'vue'

//  transaction:  wallet_db에서 transaction 변수 설정
const transactions = ref([])

// monthlyTransaction: 전체 transaction에서 월별로 담을 변수 설정
const monthlyTransactions = ref([])

// monthlyExpenses: monthlyTransactions에서 지출들
const monthlyExpenses = computed((tra

)
const fetchTransactions = async () => {
 try { const response = await axios.get('/transactions')
  transactions.value = response.data
  console.log(transactions);
} catch (err) {
  error.message = err.value || '데이터 가져오는 중 오류발생'
  console.error('거래 fetch 중 오류발생: ', err );
}
}

// currentMonth: 월 변수로 설정
const currentMonth = ref('2025-04')

// filterMonth: transaction 월별로 filter하는 함수
const filterMonth = computed(() => {
  transactions.value.filter(trans =>
    trans.dateTime.startsWith(currentMonth.value),
  )
})
</script>

<template>
  <MonthlyHeader />

  <CategoryBar />
  <CategoryList />
</template>

<style scoped></style>
