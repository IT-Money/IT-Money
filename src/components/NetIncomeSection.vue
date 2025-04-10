<template>
  <section class="net-income-section">
    <h2 class="section-title">{{ type }}</h2>
    <div v-if="transactions.length === 0" class="empty-message">
      {{ type }} 내역이 없습니다.
    </div>
    <div v-else class="transaction-list">
      <div v-for="tx in transactions" :key="tx.id" class="transaction-item">
        <div class="icon-wrapper">
          <img
            :src="getCategoryIcon(tx.category)"
            :alt="getCategoryName(tx.category)"
            class="category-icon"
          />
        </div>
        <div class="transaction-info">
          <div class="transaction-memo">{{ tx.memo }}</div>
          <div class="transaction-date">{{ formatDate(tx.dateTime) }}</div>
        </div>
        <div class="transaction-amount">
          {{ Number(tx.amount).toLocaleString() }}원
        </div>
      </div>
    </div>
  </section>
</template>

<script setup>
import { defineProps } from 'vue'
import educationIcon from '@/icons/education.png'
import expenceIcon from '@/icons/expence.png'
import foodIcon from '@/icons/food.png'
import hobbyIcon from '@/icons/hobby.png'
import incomeIcon from '@/icons/income.png'
import moveIcon from '@/icons/move.png'
import noneIcon from '@/icons/none.png'
import profitIcon from '@/icons/profit.png'
import shoppingIcon from '@/icons/shopping.png'

// 아이콘 매핑
const iconMap = {
  'education.png': educationIcon,
  'expence.png': expenceIcon,
  'food.png': foodIcon,
  'hobby.png': hobbyIcon,
  'income.png': incomeIcon,
  'move.png': moveIcon,
  'none.png': noneIcon,
  'profit.png': profitIcon,
  'shopping.png': shoppingIcon,
}

const props = defineProps({
  type: {
    type: String,
    required: true,
  },
  transactions: {
    type: Array,
    required: true,
  },
  categories: {
    type: Array,
    required: true,
  },
})

// 카테고리 이름 가져오기
const getCategoryName = categoryId => {
  const category = props.categories.find(c => c.id === categoryId)
  return category ? category.categoryName : '카테고리 없음'
}

// 카테고리 아이콘 가져오기
const getCategoryIcon = categoryId => {
  const category = props.categories.find(c => c.id === categoryId)
  if (!category) return noneIcon

  const fileName = category.image.split('/').pop()
  return iconMap[fileName] || noneIcon
}

// 날짜 포맷팅
const formatDate = dateTime => {
  const date = new Date(dateTime)
  const year = date.getFullYear()
  const month = date.getMonth() + 1
  const day = date.getDate()
  return `${year}년 ${month}월 ${day}일`
}
</script>

<style scoped>
.net-income-section {
  margin-top: 24px;
}

.section-title {
  font-size: 18px;
  font-weight: bold;
  margin-bottom: 12px;
  color: #333;
}

.empty-message {
  text-align: center;
  padding: 20px;
  color: #888;
  background-color: #f7f7f7;
  border-radius: 8px;
}

.transaction-list {
  background-color: #fff;
  border-radius: 12px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.05);
  overflow: hidden;
}

.transaction-item {
  display: flex;
  align-items: center;
  padding: 12px 16px;
  border-bottom: 1px solid #f0f0f0;
}

.transaction-item:last-child {
  border-bottom: none;
}

.icon-wrapper {
  width: 40px;
  height: 40px;
  border-radius: 8px;
  background-color: #f5f5f5;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-right: 12px;
}

.category-icon {
  width: 24px;
  height: 24px;
}

.transaction-info {
  flex: 1;
}

.transaction-memo {
  font-weight: 500;
  margin-bottom: 4px;
}

.transaction-date {
  font-size: 12px;
  color: #888;
}

.transaction-amount {
  font-weight: bold;
  text-align: right;
}
</style>
