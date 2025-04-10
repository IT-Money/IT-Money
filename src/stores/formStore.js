// src/stores/formStore.js
import { defineStore } from 'pinia'
import { ref } from 'vue'

export const useFormStore = defineStore('form', () => {
  const type = ref('income') // 'income' or 'expense'
  // const type = ref('expense')
  const date = ref(null)
  const category = ref('')
  const amount = ref(null)
  const memo = ref('')

  const setType = value => {
    type.value = value
  }

  const resetForm = () => {
    type.value = 'income'
    date.value = null
    category.value = ''
    amount.value = null
    memo.value = ''
  }

  const reset = () => {
    date.value = null
    amount.value = ''
    memo.value = ''
    category.value = ''
    type.value = 'expense'
  }
  return {
    type,
    date,
    category,
    amount,
    memo,
    setType,
    resetForm,
    reset,
  }
})
