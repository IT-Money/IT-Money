import { defineStore } from 'pinia'
import { ref } from 'vue'
import axios from '@/utils/axios'

export const useCategoryStore = defineStore('category', () => {
  const categories = ref([])

  const fetchCategories = async () => {
    try {
      const res = await axios.get('/categories')
      categories.value = res.data
    } catch (err) {
      console.error('카테고리 불러오기 실패:', err)
    }
  }

  return { categories, fetchCategories }
})
