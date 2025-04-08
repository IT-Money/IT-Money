<template>
  <div class="item">
    <div class="amount">
      {{ amount < 0 ? '-' : '+' }}{{ Math.abs(amount).toLocaleString() }} 원
    </div>
    <!-- 금액 표시, 음수면 '-' 붙이고 절댓값 표시 -->
    <div class="desc">{{ description }}</div>
    <!-- 거래 설명 표시 -->
  </div>
</template>

<script>
export default {
  name: 'TransactionItem',
  props: {
    amount: Number, // 거래 금액
    description: String, // 거래 설명 (예: 내 카카오머니 → 송금)
  },
}
</script>

<style scoped>
.item {
  background-color: #fff;
  padding: 1rem;
  margin: 0.5rem 0;
  border-radius: 8px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.05);
}
.amount {
  font-weight: bold;
  color: #e74c3c; /* 빨간색 계열 */
}
.desc {
  font-size: 0.9rem;
  color: #666;
}
</style>
