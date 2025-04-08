<template>
  <div>
    <div v-for="(group, index) in groupedTransactions" :key="index">
      <h4>{{ group.date }}</h4>
      <!-- 날짜별 구분 -->
      <TransactionItem
        v-for="(item, idx) in group.items"
        :key="idx"
        :amount="item.amount"
        :description="item.description"
      />
      <!-- 날짜별 아이템 반복 출력 -->
    </div>
  </div>
</template>

<script>
import TransactionItem from './TransactionItem.vue'

export default {
  name: 'TransactionList',
  components: {
    TransactionItem,
  },
  props: {
    groupedTransactions: Array, // [{ date: '4월 1일', items: [ { amount: -12000, description: '송금' }, ... ] }]
  },
}
</script>

<style scoped>
h4 {
  margin-top: 1rem;
  color: #444;
}
</style>
