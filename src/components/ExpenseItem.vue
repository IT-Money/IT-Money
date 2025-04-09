<script setup>
// import { computed } from 'vue'
defineProps({
  tx: { type: Object, required: true },
  isLast: { type: Boolean, required: false },
})

// const iconSrc = computed(() => {
//   const iconMap = {
//     식비: 'food.png',
//     교통: 'move.png',
//     쇼핑: 'shopping.png',
//     취미: 'hobby.png',
//     교육: 'education.png',
//     월급: 'income.png',
//     카테고리없음: 'none.png',
//   }
//   const category = props.tx?.category || '카테고리 없음'
//   const filename = iconMap[category] || 'none.png'

//   return new URL(`../icons/${filename}`, import.meta.url).href
// })
</script>

<template>
  <div class="transaction-item" :class="{ 'no-divider': isLast }">
    <img :src="iconSrc" class="icon" alt="category icon" />
    <div class="info">
      <p class="amount">-{{ tx.amount.toLocaleString() }} 원</p>
      <p class="memo">{{ tx.memo || ' ' }}</p>
    </div>
  </div>
</template>

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
  width: 32px;
  height: 32px;
  border-radius: 999px;
  background-color: #f76d82;
  padding: 6px;
  margin-right: 12px;
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
