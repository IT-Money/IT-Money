<template>
  <section class="expense-category-page">
    <!-- 1. 카테고리 요약 영역 (월/카테고리명/합계/건수 표시) -->
    <CategorySummary
      :year="Number(year)"
      :month="Number(month)"
      :categoryName="selectedCategory"
      :amount="totalAmount"
      :date="totalCount"
    />

    <!-- 2. 거래 내역 리스트 -->
    <TransactionList
      :transactions="filteredTransactions"
      :categories="categories"
    />
  </section>
</template>

<script setup>
import { ref, computed } from 'vue'
import { useRoute } from 'vue-router' // ✅ 라우터 사용
import wallet from '../../wallet_db.json'
import CategorySummary from '@/components/CategorySummary.vue'
import TransactionList from '@/components/TransactionList.vue'

/**
 * 0. 기본 설정
 * - 현재 보고 있는 연도와 월, 선택된 카테고리를 ref로 선언
 */

// 1. 라우트에서 파라미터 추출 !!
const route = useRoute()
const year = ref(route.query.year || '2025')
const month = ref(route.query.month || '04')
const selectedCategory = ref(route.query.category || '식비')

const categories = ref(wallet.categories)

/**
 * 1. '식비' 카테고리이면서 '지출' 타입인 거래들을 필터링한다.
 *    - 현재 연도(year), 월(month)에 해당하는 거래만 추출
 *    - 거래의 categoryId와 typeId가 각각 '식비', '지출'에 해당하는 경우만 필터링
 */
const filteredTransactions = computed(() => {
  // '식비' 카테고리에 해당하는 카테고리 객체 찾기
  const category = wallet.categories.find(
    c => c.categoryName === selectedCategory.value,
  )

  // '지출' 타입 객체 찾기
  const type = wallet.types.find(t => t.typeName === 'expense')

  // 없으면 빈 배열 리턴
  if (!category || !type) return []

  // id를 문자열로 변환하여 비교
  const categoryId = String(category.id)
  const typeId = String(type.id)

  // 거래 목록에서 필터링
  return (
    wallet.transactions
      .filter(tx => {
        // 거래의 카테고리, 타입 추출 (category vs categoryId가 상황에 따라 다를 수 있음)
        const txCategory = tx.category ?? tx.categoryId
        const txType = tx.type ?? tx.typeId

        // 날짜를 Date 객체로 파싱하여 현재 연도/월과 비교
        const txDate = new Date(tx.dateTime)
        const txYear = txDate.getFullYear()
        const txMonth = txDate.getMonth() + 1

        const isThisMonth =
          txYear === Number(year.value) && txMonth === Number(month.value)

        // '식비' 카테고리 + '지출' 타입 + 현재 월에 해당하는 거래만 통과
        return (
          String(txCategory) === categoryId &&
          String(txType) === typeId &&
          isThisMonth
        )
      })

      // 각 거래에 categoryName을 추가로 붙여줌 (템플릿에서 사용하기 좋게 가공)
      .map(tx => {
        const cat = wallet.categories.find(
          c => String(c.id) === String(tx.category ?? tx.categoryId),
        )
        return {
          ...tx,
          categoryName: cat?.categoryName || '카테고리없음',
        }
      })
  )
})

/**
 * 2. 필터링된 거래 내역의 총 금액을 계산
 *    - 각 거래의 amount 값을 모두 더한 합계
 */
const totalAmount = computed(() =>
  filteredTransactions.value.reduce((sum, tx) => sum + tx.amount, 0),
)

/**
 * 3. 필터링된 거래 내역의 총 건수를 계산
 *    - 거래 개수 = 배열의 길이
 */
const totalCount = computed(() => filteredTransactions.value.length)
</script>

<style scoped>
.net-income-page {
  height: 70vh;
  overflow-y: auto;
  overflow-x: hidden;
  padding: 8px;
}
</style>
