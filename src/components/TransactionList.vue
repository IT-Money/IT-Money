<template>
  <div class="transaction-list" style="margin-top: 16px">
    <TransactionGroup
      v-for="(transactions, date) in groupedTransactions"
      :key="date"
      :date="formatDate(date)"
      :transactions="transactions"
    />
  </div>
</template>

<script>
import TransactionGroup from './TransactionGroup.vue'

export default {
  name: 'TransactionList',
  components: {
    TransactionGroup,
  },
  props: {
    transactions: {
      type: Array,
      required: true,
    },
  },

  computed: {
    groupedTransactions() {
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
.transaction-list {
  display: flex;
  flex-direction: column;
  gap: 20px;
}
</style>
