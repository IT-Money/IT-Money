<template>
  <div class="transaction-item" :class="{ 'no-divider': isLast }">
    <div class="icon">
      <img :src="iconSrc" alt="category icon" />
    </div>
    <div class="info">
      <p class="amount">
        {{ tx.type === 1 ? '-' : '' }}{{ tx.amount.toLocaleString() }} 원
      </p>
      <p class="memo">{{ memoText || '' }}</p>
    </div>
  </div>
</template>

<script setup>
import { computed } from 'vue'

// ✅ props 받아서 변수로 저장
const props = defineProps({
  tx: {
    type: Object,
    required: true,
  },
  isLast: {
    type: Boolean,
    default: false,
  },
})

// ✅ computed 내부에서 props.tx로 접근해야 함
const iconSrc = computed(() => {
  const iconMap = {
    식비: 'food.png',
    교통: 'move.png',
    쇼핑: 'shopping.png',
    취미: 'hobby.png',
    교육: 'education.png',
    월급: 'income.png',
    카테고리없음: 'none.png',
  }

  const category = props.tx?.categoryName || '카테고리없음'
  console.log('✅ iconSrc 진입:', props.tx)
  console.log('✅ categoryName:', category)

  const fileName = iconMap[category] || 'none.png'
  return new URL(`../icons/${fileName}`, import.meta.url).href
})

const memoText = computed(() => {
  return props.tx?.memo?.trim() !== '' ? props.tx.memo : ' '
})
</script>

<style scoped>
.transaction-item {
  display: flex;
  align-items: center;
  padding: 12px 0;
  border-bottom: 1px solid #eee;
}

.transaction-item.no-divider {
  border-bottom: none;
}

.icon {
  width: 45px;
  height: 45px;
  border-radius: 999px;
  background-color: #f76d82;
  display: flex;
  padding: 6px;
  align-items: center;
  justify-content: center;
  margin-right: 12px;
}

.icon img {
  width: 48px;
  height: 48px;
  object-fit: contain;
}

.info {
  display: flex;
  flex-direction: column;
  gap: 4px;
}

.amount {
  font-size: 16px;
  font-weight: bold;
  color: #000;
  margin: 0;
}

.memo {
  font-size: 13px;
  color: #888;
  margin: 0;
}
</style>
