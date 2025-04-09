<template>
  <div
    class="bg-white shadow-md rounded-2xl px-4 py-3 flex items-center space-x-4"
  >
    <!-- 아이콘 -->
    <img :src="iconSrc" alt="icon" class="w-10 h-10 rounded-full" />

    <!-- 거래 내용 -->
    <div class="flex-1">
      <div class="text-gray-900 font-semibold text-base">
        -{{ tx.amount.toLocaleString() }} 원
      </div>
      <div class="text-gray-500 text-sm">
        {{ tx.memo || ' ' }}
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'TransactionItem',
  props: {
    tx: {
      type: Object,
    },
  },
  computed: {
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
      const fileName = iconMap[category] || 'none.png'

      return new URL(`../icons/${fileName}`, import.meta.url).href
    },

    memoText() {
      return this.tx?.memo?.trim() !== '' ? this.tx.memo : ' '
    },
  },
}
</script>
