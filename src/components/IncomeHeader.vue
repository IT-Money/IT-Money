<script setup>
import { useTransactionsStore } from '@/stores/TransactionStore'
import { useCountStore } from '@/stores/CountStore'
import { onMounted } from 'vue'

const trans = useTransactionsStore()
const count = useCountStore()

onMounted(() => {
  trans.fetchTransactions()
})
</script>

<template>
  <div class="summary-container">
    <div class="summary-content">
      <!-- 왼쪽: 텍스트 정보 -->
      <div class="text-section">
        <p class="title">{{ trans.nowYear }}년 {{ trans.nowMonth }}월 총수입</p>
        <p class="amount">
          {{ count.useMonthlyAmount(trans.monthlyIncome).toLocaleString() }}원
        </p>
        <span class="count-badge"
          >총 {{ trans.monthlyIncome?.length || 0 }}회</span
        >
      </div>

      <!-- 오른쪽: 원형 아이콘 -->
      <div class="icon-section">
        <img class="icon-image" src="@/icons/income.png" alt="아이콘" />
      </div>
    </div>
  </div>
</template>

<style scoped>
.summary-container {
  padding: 0 20px;
  margin-top: 16px;
}

.summary-content {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.text-section {
  display: flex;
  flex-direction: column;
  gap: 8px;
}

.title {
  font-size: 14px;
  color: #3b1fe0;
  font-weight: 600;
  margin: 0;
}

.amount {
  font-size: 24px;
  font-weight: bold;
  color: #000;
  margin: 0;
}

.count-badge {
  display: inline-block;
  background-color: #eee;
  color: #444;
  padding: 4px 10px;
  font-size: 12px;
  border-radius: 999px;
  width: fit-content;
}

.icon-section {
  background-color: #f76d82;
  border-radius: 50%;
  padding: 12px;
  width: 48px;
  height: 48px;
  display: flex;
  align-items: center;
  justify-content: center;
}

.icon-image {
  width: 48px;
  height: 48px;
}
</style>
