import { defineStore } from 'pinia'
import { ref } from 'vue'
import axios from '@/utils/axios'

export const useTransactionStore = defineStore('transaction', () => {
  const transactions = ref([])
  const currentTransaction = ref(null)

  const fetchTransactions = async () => {
    try {
      const response = await axios.get('/transactions')
      transactions.value = response.data
    } catch (error) {
      console.error('거래 내역을 가져오는 데 실패했습니다.', error)
    }
  }

  const fetchTransactionById = async id => {
    try {
      const response = await axios.get(`/transactions/${id}`)
      currentTransaction.value = response.data
      return currentTransaction.value
    } catch (error) {
      console.error('거래 내역을 가져오는 데 실패했습니다.', error)
    }
  }

  const updateTransaction = async updatedTransaction => {
    try {
      const response = await axios.put(
        `/transactions/${updatedTransaction.id}`,
        updatedTransaction,
      )
      currentTransaction.value = response.data
      const index = transactions.value.findIndex(
        tx => tx.id === updatedTransaction.id,
      )
      if (index !== -1) {
        transactions.value[index] = response.data
      }
    } catch (error) {
      console.error('거래 내역을 수정하는 데 실패했습니다.', error)
      throw error
    }
  }

  const deleteTransaction = async id => {
    try {
      await axios.delete(`/transactions/${id}`)
      transactions.value = transactions.value.filter(
        transaction => transaction.id !== id,
      )
      console.log('거래 삭제 완료')
    } catch (error) {
      console.error('거래 삭제 실패', error)
      throw error
    }
  }

  // 반환 값
  return {
    transactions,
    currentTransaction,
    fetchTransactions,
    fetchTransactionById,
    updateTransaction,
    deleteTransaction,
  }
})
