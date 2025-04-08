<template>
  <CategorySummary title="2025년 4월 식비 금액" :amount="262200" date="23회" />
  <TransactionList
    :groupedTransactions="[
      { date: '4월 1일', items: [{ amount: -12000, description: '송금' }] },
      { date: '4월 2일', items: [{ amount: -15000, description: '식사' }] },
    ]"
  />
  <TransactionItem
    v-for="(item, index) in transactions"
    :key="index"
    :amount="item.amount"
    :description="item.description"
  />
  <!-- 거래 아이템 반복 출력 -->
  <TransactionItem
    v-for="(item, index) in transactions"
    :key="index"
    :amount="item.amount"
    :description="item.description"
  />
</template>

<script>
import CategorySummary from '@/components/CategorySummary.vue'
import TransactionList from '@/components/TransactionList.vue'
import TransactionItem from '@/components/TransactionItem.vue'

export default {
  components: {
    CategorySummary,
    TransactionList,
    TransactionItem,
  },
}
</script>

<style scoped></style>
