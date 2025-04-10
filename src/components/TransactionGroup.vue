<script setup>
import TransactionItem from './TransactionItem.vue'
defineProps({ dateTime: String, transactions: Array })
</script>

<template>
  <div class="transaction-group">
    <p class="group-date">{{ dateTime }}</p>
    <div class="transaction-card">
      <TransactionItem
        v-for="(tx, index) in transactions"
        :key="index"
        :tx="tx"
        :isLast="index === transactions.length - 1"
      />
    </div>
  </div>
</template>

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
