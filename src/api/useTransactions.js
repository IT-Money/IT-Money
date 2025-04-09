import axios from '@/utils/axios'
import { ref } from 'vue'

export const useTransactions = () => {
  const transactions = ref([])
  const categories = ref([])
  const types = ref([])
  const loading = ref(false)
  const error = ref(null)

  const fetchTransactions = async () => {
    try {
      const categoryResponse = await axios.get('/categories')
      const typeResponse = await axios.get('/types')
      categories.value = categoryResponse.data
      types.value = typeResponse.data

      const transactionResponse = await axios.get('/transactions')
      transactions.value = transactionResponse.data
    } catch (err) {
      error.value = err
    } finally {
      loading.value = false
    }
  }

  return { transactions, categories, types, loading, error, fetchTransactions }
}
