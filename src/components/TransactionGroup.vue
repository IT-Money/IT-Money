<template>
  <div class="transaction-group">
    <p class="group-date">{{ date }}</p>
    <div class="transaction-card">
      <!-- 거래 목록 반복 출력 -->
      <!-- 각각의 거래를 props로 넘겨주고, 마지막 거래인지 확인 -->
      <TransactionItem
        v-for="(tx, index) in transactions"
        :key="index"
        :tx="tx"
        :isLast="index === transactions.length - 1"
      />
    </div>
  </div>
</template>

<script>
import TransactionItem from './TransactionItem.vue'

export default {
  name: 'TransactionGroup',
  components: {
    TransactionItem,
  },

  props: {
    date: {
      type: String,
      required: true,
    },
    transactions: {
      type: Array,
      required: true, // ✅ 필수값으로 지정 (tx 전달 안 되는 오류 방지)
    },
  },
}
</script>

<style scoped>
.transaction-group {
  margin-bottom: 20px;
}

.group-date {
  font-size: 14px;
  font-weight: 600;
  color: #666;
  margin-bottom: 8px;
  padding-left: 8px;
}

.transaction-card {
  background-color: #fff;
  border-radius: 16px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.05);
  padding: 16px;
}
</style>
