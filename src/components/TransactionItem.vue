<script setup>
import { computed } from 'vue'
import { useRouter } from 'vue-router'
import { useCategoryStore } from '@/stores/category'
import educationIcon from '@/icons/education.png'
import expenceIcon from '@/icons/expence.png'
import foodIcon from '@/icons/food.png'
import hobbyIcon from '@/icons/hobby.png'
import incomeIcon from '@/icons/income.png'
import moveIcon from '@/icons/move.png'
import noneIcon from '@/icons/none.png'
import profitIcon from '@/icons/profit.png'
import shoppingIcon from '@/icons/shopping.png'

const router = useRouter()
const categoryStore = useCategoryStore()

// import한 아이콘 묶어주기
const iconMap = {
  '@/icons/food.png': foodIcon,
  '@/icons/shopping.png': shoppingIcon,
  '@/icons/education.png': educationIcon,
  '@/icons/expence.png': expenceIcon,
  '@/icons/hobby.png': hobbyIcon,
  '@/icons/income.png': incomeIcon,
  '@/icons/move.png': moveIcon,
  '@/icons/none.png': noneIcon,
  '@/icons/profit.png': profitIcon,
}
const props = defineProps({
  tx: {
    type: Object,
    required: true,
  },
  isLast: {
    type: Boolean,
    default: false,
  },
  categoryInfo: {
    type: Object,
    default: null,
  },
})

// 수입인지 지출인지 확인
const isIncome = computed(() => {
  return props.tx.type === '2' || props.tx.type === 2
})

// 카테고리 정보 가져오기
const category = computed(() => {
  // props로 받은 카테고리 정보가 있으면 사용
  if (props.categoryInfo && props.categoryInfo.id === props.tx.category) {
    return props.categoryInfo
  }

  // 아니면 categoryStore에서 찾기
  const cat = categoryStore.categories.find(c => c.id === props.tx.category)
  return (
    cat || {
      id: props.tx.category,
      categoryName: '카테고리 없음',
      image: '@/icons/none.png',
    }
  )
})

// 아이콘 경로 처리
const iconPath = computed(() => {
  const imagePath = category.value.image
  return iconMap[imagePath] || noneIcon
})

// 상세 페이지로 이동
function goToDetailView() {
  router.push({
    name: 'detail',
    params: { id: props.tx.id },
  })
}
</script>
<template>
  <div
    class="transaction-item"
    :class="{ 'last-item': isLast }"
    @click="goToDetailView"
  >
    <!-- 카테고리 아이콘 -->
    <div class="icon-wrapper">
      <img :src="iconPath" :alt="tx.memo" class="category-icon" />
    </div>

    <!-- 거래 정보 -->
    <div class="transaction-info">
      <div class="memo">{{ tx.memo }}</div>
    </div>

    <!-- 금액 정보 -->
    <div class="amount" :class="{ income: isIncome }">
      {{ isIncome ? '+' : '-' }}{{ tx.amount.toLocaleString() }}원
    </div>
  </div>
</template>

<style scoped>
.transaction-item {
  display: flex;
  align-items: center;
  padding: 12px 0;
  border-bottom: 1px solid #f0f0f0;
}

.last-item {
  border-bottom: none;
}

.icon-wrapper {
  width: 40px;
  height: 40px;
  border-radius: 10px;
  background-color: #f5f5f5;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-right: 12px;
}

.category-icon {
  width: 40px;
  height: 40px;
  object-fit: contain;
}

.transaction-info {
  flex: 1;
}

.memo {
  font-size: 15px;
  font-weight: 500;
  margin-bottom: 4px;
}

.time {
  font-size: 12px;
  color: #999;
}

.amount {
  font-weight: 600;
  color: #ff4267;
  text-align: right;
  margin-left: 12px;
}

.income {
  color: #1e90ff;
}
</style>
