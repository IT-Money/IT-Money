import axios from '@/utils/axios'
import { ref, computed } from 'vue'

export default function useTrans() {
  // 날짜짜 설정
  const currentDate = computed(() => {
    return new Date().toISOString()
  })
  const nowYear = computed(() => currentDate.value.substring(0, 4))
  const nowMonth = computed(() => currentDate.value.substring(5, 7))
  const currentMonth = computed(() => currentDate.value.substring(0, 7))

  // transactions: 변수 할당
  const transactions = ref([])
  const error = ref(null)

  // fetechTransactions: wallet_db에서 모든 거래
  const fetchTransactions = async () => {
    try {
      const response = await axios.get('/transactions')
      transactions.value = response.data
      console.log('transactions:', transactions.value)
    } catch (err) {
      error.value = err.message || '데이터 가져오는 중 오류발생'
      console.error('거래 fetch 중 오류발생: ', err)
    }
  }

  // monthlyTransactions = 월별 파싱(forEach문으로 월별거래 객체 생성성)
  const monthlyTransactions = computed(() => {
    const group = {}
    console.log('computed 실행중')

    transactions.value.forEach(trans => {
      const eachMonth = trans.dateTime.substring(0, 7)
      if (!group[eachMonth]) group[eachMonth] = []
      group[eachMonth].push(trans)
    })
    console.log('group:', group)

    return group
  })

  // monthlyExpense: 월별 지출액(for of 문으로 monthlytransactions 중 type이 1인걸 filter 해서 monthlyExpense에 할당)
  const monthlyExpense = computed(() => {
    const group = {}
    console.log('총지출 computed 실행')
    for (const [eachMonth, trans] of Object.entries(
      monthlyTransactions.value,
    )) {
      group[eachMonth] = trans.filter(tran => String(tran.type) === '1')
    }
    return group
  })

  // monthlyIncome: 월별 수입액
  const monthlyIncome = computed(() => {
    const group = {}
    console.log('총수입 computed 실행됨')
    for (const [eachMonth, trans] of Object.entries(monthlyTransactions.value))
      group[eachMonth] = trans.filter(tran => String(tran.type) === '2')
    return group
  })

  // monthlyCategory: 월별 카테고리
  // const monthlyCategory = computed(()=> )

  return {
    transactions,
    error,
    fetchTransactions,
    monthlyTransactions,
    monthlyExpense,
    monthlyIncome,
    currentMonth,
    nowMonth,
    nowYear,
    currentDate,
  }
}
