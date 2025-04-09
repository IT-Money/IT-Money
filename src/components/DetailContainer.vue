<script setup>
import { ref, onMounted, computed } from 'vue'
import { useRoute } from 'vue-router'
import { useTransactions } from '@/api/useTransactions'

const { transactions, categories, loading, error, fetchTransactions } =
  useTransactions()
const route = useRoute()
const transaction = ref(null)
const category = ref('기타')

onMounted(async () => {
  await fetchTransactions()
  const id = parseInt(route.params.id)
  transaction.value = transactions.value.find(tx => tx.id === id)
  category.value = categories.value.find(
    category => String(category.id) === String(transaction.value.category),
  )
})

const formattedType = computed(() => {
  if (transaction.value) {
    return transaction.value.type === '1' ? '-' : '+'
  }
  return ''
})

const formattedAmount = computed(() => {
  if (transaction.value) {
    return transaction.value.amount.toLocaleString()
  }
  return ''
})

const formattedDate = computed(() => {
  if (transaction.value) {
    const date = new Date(transaction.value.dateTime)
    return `${date.getFullYear()}년 ${date.getMonth() + 1}월 ${date.getDate()}일 ${date.getHours()}:${String(date.getMinutes()).padStart(2, '0')}`
  }
  return ''
})

const categoryName = computed(() => {
  if (transaction.value) {
    return category.value.categoryName
  }
  return ''
})

const memo = computed(() => {
  if (transaction.value) {
    return transaction.value.memo
  }
  return ''
})
</script>

<template>
  <div v-if="loading">Loading...</div>
  <div v-else-if="error" class="error">Error: {{ error }}</div>
  <div v-else class="DetailContainer">
    <div class="amount">{{ formattedType }}{{ formattedAmount }} 원</div>
    <div class="line"></div>
    <div class="info">
      <span class="title">일시</span>
      <span>{{ formattedDate }}</span>
    </div>
    <div class="line"></div>
    <div class="info">
      <span class="title">카테고리</span>
      <span>{{ categoryName }}</span>
    </div>
    <div class="line"></div>
    <div class="info">
      <span class="title">메모</span>
      <div class="memo">{{ memo }}</div>
    </div>
  </div>
</template>

<style scoped>
.DetailContainer {
  width: 85%;
  height: 360px;
  margin: 30px auto;
  padding: var(--space-m);
  background-color: #ffffff;
  box-shadow:
    3px 3px 15px 0px rgb(243, 242, 243),
    -1px 3px 20px 0px rgb(250, 250, 250);
  border-radius: var(--space-m);
}
.DetailContainer .amount {
  font-size: 2rem;
  font-weight: bold;
  padding-bottom: var(--space-m);
}
.DetailContainer .line {
  border-bottom: 1px solid var(--gray200);
}
.DetailContainer .info {
  padding: var(--space-m) 0;
  display: flex;
  justify-content: space-between;
  font-weight: bold;
}
.DetailContainer .info > .title {
  color: var(--gray500);
}
.DetailContainer .info:last-of-type {
  flex-direction: column;
  gap: var(--space-m);
}
.DetailContainer .info > .memo {
  background-color: var(--gray200);
  width: 100%;
  height: 90px;
  border-radius: var(--space-m);
  padding: var(--space-m);
  font-weight: 400;
}
</style>
