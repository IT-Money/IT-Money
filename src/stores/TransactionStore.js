import { defineStore } from 'pinia'
import { ref, computed } from 'vue'
import axios from '@/utils/axios'

export const useTransactionStore = defineStore('transaction', () => {
  // 상태(state)
  const currentDate = ref(new Date())
  const transactions = ref([])
  const error = ref(null)

  // getter
  const nowYear = computed(() => currentDate.value.getFullYear())
  const nowMonth = computed(() => currentDate.value.getMonth() + 1)
  const currentMonth = computed(
    () => `${nowYear.value}-${String(nowMonth.value).padStart(2, '0')}`,
  )
  const currentMonthStr = computed(
    () =>
      `${currentDate.value.getFullYear()}-${String(currentDate.value.getMonth() + 1).padStart(2, '0')}`,
  )

  const monthlyTransactions = computed(() => {
    return transactions.value.filter(tx =>
      tx.dateTime.startsWith(currentMonthStr.value),
    )
  })

  const monthlyExpense = computed(() => {
    return monthlyTransactions.value.filter(tx => tx.type === '1')
  })

  const monthlyIncome = computed(() => {
    return monthlyTransactions.value.filter(tx => tx.type === '2')
  })

  const monthlyCategory = computed(() => {
    const group = {}
    monthlyTransactions.value.forEach(tx => {
      const categoryId = tx.category
      if (!group[categoryId]) group[categoryId] = []
      group[categoryId].push(tx)
    })
    return group
  })

  // 액션(actions)
  function gotoPrevMonth() {
    const date = new Date(currentDate.value)
    date.setMonth(date.getMonth() - 1)
    currentDate.value = date
    fetchTransactions()
  }

  function gotoNextMonth() {
    const date = new Date(currentDate.value)
    date.setMonth(date.getMonth() + 1)
    currentDate.value = date
    fetchTransactions()
  }

  async function fetchTransactions() {
    try {
      const response = await axios.get('/transactions')
      transactions.value = response.data
      console.log('transactions fetched:', transactions.value.length)
      return transactions.value
    } catch (err) {
      error.value = err.message || '데이터 가져오는 중 오류발생'
      console.error('거래 fetch 중 오류발생: ', err)
    }
  }

  return {
    // 상태
    currentDate,
    transactions,
    error,

    // getter
    nowYear,
    nowMonth,
    currentMonth,
    currentMonthStr,
    monthlyTransactions,
    monthlyExpense,
    monthlyIncome,
    monthlyCategory,

    // 액션
    gotoPrevMonth,
    gotoNextMonth,
    fetchTransactions,
  }
})
