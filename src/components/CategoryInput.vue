<script setup>
import { useFormStore } from '@/stores/formStore'
import { ref, computed, watch } from 'vue'
import education from '@/icons/education.png'
import food from '@/icons/food.png'
import hobby from '@/icons/hobby.png'
import move from '@/icons/move.png'
import shopping from '@/icons/shopping.png'
import none from '@/icons/none.png'
import income from '@/icons/income.png'

const store = useFormStore()

const search = ref('')
const isOpen = ref(false)

const expenseCategories = [
  { name: '교육', icon: education },
  { name: '식비', icon: food },
  { name: '취미', icon: hobby },
  { name: '여행', icon: move },
  { name: '기타', icon: none },
  { name: '쇼핑', icon: shopping },
]
const incomeCategories = [{ name: '월급', icon: income }]

// store.type이 바뀌면 자동으로 검색어 초기화
watch(
  () => store.type,
  () => {
    search.value = ''
    store.category = ''
  },
)

// 수입/지출에 따라 리스트 분기
const categoryList = computed(() =>
  store.type === 'expense' ? expenseCategories : incomeCategories,
)

// 검색 필터링된 리스트
const filteredList = computed(() =>
  categoryList.value.filter(item => item.name.includes(search.value)),
)

const selectCategory = value => {
  store.category = value
  isOpen.value = false
  search.value = ''
}
</script>

<template>
  <div class="category-wrapper">
    <label>카테고리</label>

    <!-- 검색창 -->
    <div class="input-box" @click="isOpen = !isOpen">
      <input
        type="text"
        :value="store.category"
        placeholder="카테고리 검색"
        @focus="isOpen = true"
        readonly
      />
      <span class="icon">🔍</span>
    </div>

    <!-- 드롭다운 -->
    <div v-if="isOpen" class="dropdown">
      <div
        v-for="item in filteredList"
        :key="item.name"
        class="dropdown-item"
        @click="selectCategory(item.name)"
      >
        <img :src="item.icon" alt="icon" class="category-icon" />
        {{ item.name }}
      </div>
    </div>
  </div>
</template>

<style scoped>
.category-wrapper {
  margin-bottom: 16px;
}

label {
  display: block;
  margin-bottom: 6px;
  font-size: 13px;
  color: #555;
}

.input-box {
  position: relative;
  display: flex;
  align-items: center;
}

.input-box input {
  width: 100%;
  padding: 10px 36px 10px 12px;
  border-radius: 12px;
  border: 1px solid #ddd;
  font-size: 14px;
  outline: none;
  cursor: pointer;
  background-color: #fff;
}

.input-box .icon {
  position: absolute;
  right: 12px;
  font-size: 16px;
}
.dropdown {
  margin-top: 8px;
  background-color: #fff;
  border-radius: 12px;
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.05);
  padding: 8px 0;
  display: flex;
  flex-direction: column; /* 세로 정렬 */
  gap: 4px;
  max-height: 200px;
  overflow-y: auto;
}
.dropdown-item {
  display: flex;
  align-items: center;
  padding: 10px 16px;
  font-size: 14px;
  color: #333;
  cursor: pointer;
  transition: background-color 0.2s;
  border-radius: 8px;
}

.dropdown-item:hover {
  background-color: #f5f5f5;
}
.category-icon {
  width: 20px;
  height: 20px;
  margin-right: 8px;
  flex-shrink: 0;
}
</style>
