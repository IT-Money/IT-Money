import axios from 'axios'
import { ref, computed } from 'vue'

// transactions: 변수 할당
const transactions = ref([])
const error = ref(null)

// fetechTransactions: wallet_db에서 모든 거래
const fetchTransactions = async () => {
  try {
    const response = await axios.get('/transactions')
    transactions.value = response.data
    console.log(transactions.value)
  } catch (err) {
    error.value = err.message || '데이터 가져오는 중 오류발생'
    console.error('거래 fetch 중 오류발생: ', err)
  }
}

const monthlyTransactions = computed(() => {
  const group = {}
  transactions.value.forEach(trans => {
    const eachMonth = trans.dateTime.substring(0, 7)
    if (!group[eachMonth]) group[eachMonth] = []
    group[eachMonth].push(trans)
  })
  return group
})
