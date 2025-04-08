<template>
  <div class="flex items-center gap-4 p-3 bg-white rounded-xl shadow-sm">
    <div
      class="w-10 h-10 flex items-center justify-center bg-rose-100 rounded-full"
    >
      <img class="w-5 h-5" :src="iconSrc" alt="아이콘" />
    </div>
    <div class="flex-1">
      <p class="text-base font-semibold text-gray-900">
        -{{ tx.amount.toLocaleString() }} 원
      </p>
      <p class="text-sm text-gray-500">{{ memoText }}</p>
    </div>
  </div>
</template>

<script>
export default {
  name: 'TransactionItem',
  props: {
    tx: Object,
  },
  computed: {
    iconSrc() {
      // 카테고리 기반으로 확장도 가능하게 구조화
      const iconMap = {
        식비: 'food.png',
        교통: 'transport.png',
        문화: 'culture.png',
        // 필요시 더 추가
      }
      const fileName = iconMap[this.tx.categoryName] || 'default.png'
      return new URL(`../assets/icons/${fileName}`, import.meta.url).href
    },
    memoText() {
      return this.tx.memo && this.tx.memo.trim() !== ''
        ? this.tx.memo
        : '내 카카오페이 → 송금'
    },
  },
}
</script>
