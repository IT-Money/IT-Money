<template>
  <CategorySummary
    title="2025년 4월 식비 금액"
    :amount="totalAmount"
    :date="totalCount"
  />
  <TransactionList :transactions="filteredTransactions" />
</template>

<script>
import wallet from '../../wallet_db.json'
import CategorySummary from '@/components/CategorySummary.vue'
import TransactionList from '@/components/TransactionList.vue'

export default {
  name: 'ExpenseCategories',
  components: {
    CategorySummary,
    TransactionList,
  },
  computed: {
    filteredTransactions() {
      const 식비 = wallet.categories.find(c => c.categoryName === '식비')
      const 지출 = wallet.types.find(t => t.typeName === 'expense')

      console.log('📦 카테고리(식비):', 식비)
      console.log('📦 타입(지출):', 지출)

      if (!식비 || !지출) return []

      const now = new Date()
      const currentYear = now.getFullYear()
      const currentMonth = now.getMonth() + 1

      const 식비Id = String(식비.id)
      const 지출Id = String(지출.id)

      const result = wallet.transactions.filter(tx => {
        const txCategory = tx.category ?? tx.categoryId
        const txType = tx.type ?? tx.typeId

        const txDate = new Date(tx.dateTime)
        const txYear = txDate.getFullYear()
        const txMonth = txDate.getMonth() + 1

        const isThisMonth = txYear === currentYear && txMonth === currentMonth

        return (
          String(txCategory) === 식비Id &&
          String(txType) === 지출Id &&
          isThisMonth
        )
      })

      console.log('🍱 4월 식비 지출 내역:', result)
      return result
    },

    totalAmount() {
      const sum = this.filteredTransactions.reduce(
        (acc, tx) => acc + tx.amount,
        0,
      )
      console.log('💰 총 식비 금액:', sum)
      return sum
    },

    totalCount() {
      const count = this.filteredTransactions.length
      console.log('🧾 총 건수:', count)
      return count
    },
  },
}
</script>
