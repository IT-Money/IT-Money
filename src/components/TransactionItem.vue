<template>
  <div class="transaction-item" :class="{ 'no-divider': isLast }">
    <img :src="iconSrc" class="icon" alt="category icon" />
    <div class="info">
      <!-- 금액 (부호 포함) -->
      <p class="amount">
        {{ tx.type === 1 ? '-' : '' }}{{ tx.amount.toLocaleString() }} 원
      </p>
      <p class="memo">{{ tx.memo || ' ' }}</p>
    </div>
  </div>
</template>

<script>
export default {
  name: 'TransactionItem',
  props: {
    tx: {
      type: Object,
      required: true,
    },
    isLast: {
      type: Boolean,
      default: false, // 기본값은 false로
    },
  },
  computed: {
    // 아이콘 경로
    iconSrc() {
      const iconMap = {
        식비: 'food.png',
        교통: 'move.png',
        쇼핑: 'shopping.png',
        취미: 'hobby.png',
        교육: 'education.png',
        월급: 'income.png',
        카테고리없음: 'none.png',
      }

      const category = this.tx?.categoryName || '카테고리없음'
      console.log('✅ iconSrc 진입:', this.tx) // tx 로그
      console.log('✅ categoryName:', category) // 카테고리 로그

      const fileName = iconMap[category] || 'none.png'

      // ✅ 이미지 동적으로 불러오기
      return new URL(`../icons/${fileName}`, import.meta.url).href
    },

    memoText() {
      return this.tx?.memo?.trim() !== '' ? this.tx.memo : ' '
    },
  },
}
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
