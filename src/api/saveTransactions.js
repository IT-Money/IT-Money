import axios from '@/utils/axios'

export const saveTransaction = async payload => {
  try {
    const response = await axios.post('/transactions', payload)
    return response
  } catch (error) {
    console.error('Error saving transaction:', error)
    throw error
  }
}
