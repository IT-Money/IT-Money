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
    /**
     * 🔍 1. '식비' 카테고리이면서 '지출' 타입인 거래들을 필터링한다.
     * 현재 월 기준으로만 필터링
     */

    filteredTransactions() {
      const 식비 = wallet.categories.find(c => c.categoryName === '식비')
      const 지출 = wallet.types.find(t => t.typeName === 'expense')

      console.log('📦 카테고리(식비):', 식비)
      console.log('📦 타입(지출):', 지출)

      if (!식비 || !지출) return []

      // 현재 연도, 월
      const now = new Date()
      const currentYear = now.getFullYear()
      const currentMonth = now.getMonth() + 1 // 0부터 시작하므로 +1 필요

      // id 모두 문자열로 변환
      const 식비Id = String(식비.id)
      const 지출Id = String(지출.id)

      // 거래 내역 필터링
      const result = wallet.transactions
        .filter(tx => {
          // 카테고리와 타입이 문자열로 변환된 id와 일치하는지 확인
          const txCategory = tx.category ?? tx.categoryId
          const txType = tx.type ?? tx.typeId

          // 날짜 파싱 후 현재 연/월과 비교
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

        .map(tx => {
          // categoryName 추가
          const categoryId = String(tx.category ?? tx.categoryId)
          const category = wallet.categories.find(
            c => String(c.id) === categoryId,
          )

          return {
            ...tx,
            categoryName: category?.categoryName || '카테고리없음',
          }
        })

      console.log('🍱 4월 식비 지출 내역:', result)
      return result
    },

    /**
     * 2. 필터링된 거래 내역의 총 금액과 건수를 계산
     * - 금액: 거래 내역의 amount 속성의 합계
     * - 건수: 거래 내역의 개수
     */
    totalAmount() {
      const sum = this.filteredTransactions.reduce(
        (acc, tx) => acc + tx.amount,
        0,
      )
      console.log('💰 총 식비 금액:', sum)
      return sum
    },
    /**
     *  3. 필터링된 거래 내역의 총 건수를 계산
     * - 건수: 거래 내역의 개수
     */

    totalCount() {
      const count = this.filteredTransactions.length
      console.log('🧾 총 건수:', count)
      return count
    },
  },
}
</script>
