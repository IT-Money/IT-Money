<template>
  <div class="space-y-6">
    <div
      v-for="(transactions, date) in groupedTransactions"
      :key="date"
      class="space-y-3"
    >
      <!-- 날짜 헤더 -->
      <div class="text-gray-500 font-semibold text-sm px-1">
        {{ formatDate(date) }}
      </div>

      <!-- 거래 아이템 리스트 -->
      <div class="space-y-3">
        <TransactionItem v-for="tx in transactions" :key="tx.id" :tx="tx" />
      </div>
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
    transactions: {
      type: Array,
      required: true,
    },
  },

  computed: {
    groupedTransactions() {
      // 날짜별로 묶기
      return this.transactions.reduce((acc, tx) => {
        const date = tx.dateTime?.split('T')[0] || '날짜 없음'
        if (!acc[date]) acc[date] = []
        acc[date].push(tx)
        return acc
      }, {})
    },
  },
  methods: {
    formatDate(dateStr) {
      if (dateStr === '날짜 없음') return dateStr

      const date = new Date(dateStr)
      const dayNames = [
        '일요일',
        '월요일',
        '화요일',
        '수요일',
        '목요일',
        '금요일',
        '토요일',
      ]
      const month = date.getMonth() + 1
      const day = date.getDate()
      const dayName = dayNames[date.getDay()]
      return `${month}월 ${day}일 ${dayName}`
    },
  },
}
</script>

<style scoped>
h3 {
  padding-left: 0.5rem;
}
</style>
