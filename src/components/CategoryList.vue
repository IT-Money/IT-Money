<!-- <script setup>
import { ref,computed } from 'vue'
import axios from 'axios'


const fetchCategory = async () => {
  try {
    const response = await axios.get(`base}`)
    categoryLists.value = response.data
    console.log(categoryLists.value)
  } catch (err) {
    error.message = err.value || '카테고리 필터 중 오류 발생'
    console.error(err)
  }
}
const
</script>

<template>
  <div
    class="categoryItem"
    v-for="(categoryList, i) in categoryLists"
    :keys="categoryList.id"
  >
    <img src="" alt="" />
    <div class="category-name">
      <p>{{ categoryList.category }}</p>

      <p>비율</p>
    </div>
    <div class="category_amount">{{categoryList.amount 원}}</div>
  </div>
</template>

<style scoped>
.categoryItem {
  display: flex;
}
</style> -->
