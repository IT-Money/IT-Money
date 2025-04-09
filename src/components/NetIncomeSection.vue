<template>
  <section class="net-income-section">
    <h2 class="section-title">{{ type }}</h2>
    <TransactionList :transactions="wallet" />
  </section>
</template>

<script setup>
import TransactionList from './TransactionList.vue'

defineProps({
  type: {
    type: String,
    required: true,
  },
  wallet: {
    type: Array,
    required: true,
  },
})
</script>

<style scoped>
.net-income-section {
  margin-top: 24px;
}

.section-title {
  font-size: 18px;
  font-weight: bold;
  margin-bottom: 12px;
  color: #333;
}
</style>
