<script setup>
import { useCountStore } from '@/stores/CountStore'
import { computed } from 'vue'

const count = useCountStore()

const props = defineProps({
  categoryInfo: {
    type: Object,
    required: true,
  },
  transactions: {
    type: Array,
    default: () => [],
  },
  year: {
    type: [String, Number],
    required: true,
  },
  month: {
    type: [String, Number],
    required: true,
  },
})

// 총 지출액 계산
const totalAmount = computed(() => {
  return count.useMonthlyAmount(props.transactions)
})

// 아이콘 경로 처리
const iconPath = computed(() => {
  const imagePath = props.categoryInfo.image
  if (imagePath.startsWith('@/')) {
    return imagePath.replace('@', '..')
  }
  return imagePath
})
</script>

<template>
  <div class="summary-container">
    <div class="summary-content">
      <!-- 왼쪽: 텍스트 정보 -->
      <div class="text-section">
        <p class="title">
          {{ year }}년 {{ month }}월 {{ categoryInfo.categoryName }} 지출
        </p>
        <p class="amount">{{ totalAmount.toLocaleString() }}원</p>
        <span class="count-badge">총 {{ transactions.length }}회</span>
      </div>

      <!-- 오른쪽: 카테고리 아이콘 -->
      <div class="icon-section">
        <img
          class="icon-image"
          :src="iconPath"
          :alt="categoryInfo.categoryName"
        />
      </div>
    </div>
  </div>
</template>

<style scoped>
.summary-container {
  padding: 0 20px;
  margin-top: 16px;
}

.summary-content {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.text-section {
  display: flex;
  flex-direction: column;
  gap: 8px;
}

.title {
  font-size: 14px;
  color: #3b1fe0;
  font-weight: 600;
  margin: 0;
}

.amount {
  font-size: 24px;
  font-weight: bold;
  color: #000;
  margin: 0;
}

.count-badge {
  display: inline-block;
  background-color: #eee;
  color: #444;
  padding: 4px 10px;
  font-size: 12px;
  border-radius: 999px;
  width: fit-content;
}

.icon-section {
  background-color: #f76d82;
  border-radius: 50%;
  padding: 12px;
  width: 48px;
  height: 48px;
  display: flex;
  align-items: center;
  justify-content: center;
}

.icon-image {
  width: 32px;
  height: 32px;
  object-fit: contain;
}
</style>
