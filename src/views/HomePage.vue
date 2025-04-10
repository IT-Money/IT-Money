<script setup>
import { ref, computed, onMounted } from 'vue'
import axios from 'axios'
import useTrans from '@/stores/useTrans'
import education from '@/icons/education.png'
import expence from '@/icons/expence.png'
import food from '@/icons/food.png'
import hobby from '@/icons/hobby.png'
import income from '@/icons/income.png'
import move from '@/icons/move.png'
import none from '@/icons/none.png'
import profit from '@/icons/profit.png'
import shopping from '@/icons/shopping.png'

const imageMap = {
  'education.png': education,
  'expence.png': expence,
  'food.png': food,
  'hobby.png': hobby,
  'income.png': income,
  'move.png': move,
  'none.png': none,
  'profit.png': profit,
  'shopping.png': shopping,
}
const trans = useTrans()

onMounted(() => {
  trans.fetchTransactions()
})

const selectedYear = ref(new Date().getFullYear())
const selectedMonth = ref(new Date().getMonth() + 1)

const recentExpenses = ref([])
const categories = ref([])

const years = Array.from({ length: 5 }, (_, i) => 2023 + i)
const months = Array.from({ length: 12 }, (_, i) => i + 1)

// 'YYYY-MM' 형태로 변환
const selectedMonthKey = computed(() => {
  return `${selectedYear.value}-${String(selectedMonth.value).padStart(2, '0')}`
})

// 해당 월의 지출/수입 데이터 필터링
const selectedExpense = computed(() => {
  return trans.monthlyExpense.value[selectedMonthKey.value] || []
})

const selectedIncome = computed(() => {
  return trans.monthlyIncome.value[selectedMonthKey.value] || []
})

// 총합 계산
const totalExpense = computed(() => {
  return selectedExpense.value.reduce(
    (sum, item) => sum + Number(item.amount),
    0,
  )
})

const totalIncome = computed(() => {
  return selectedIncome.value.reduce(
    (sum, item) => sum + Number(item.amount),
    0,
  )
})

const netProfit = computed(() => {
  return totalIncome.value - totalExpense.value
})

function resolveCategoryImage(imagePath = '@/icons/none.png') {
  const key = imagePath.split('/').pop()
  const image = imageMap[key]
  if (!image) {
    console.warn('⚠️ 이미지 매핑 실패:', key)
  }
  return image || none
}

onMounted(async () => {
  try {
    const [txRes, catRes] = await Promise.all([
      axios.get('http://localhost:5001/transactions?type=1'),
      axios.get('http://localhost:5001/categories'),
    ])
    categories.value = catRes.data
    console.log('✅ 카테고리 로딩 성공:', categories.value)

    const sortedTx = txRes.data
      .sort((a, b) => new Date(b.dateTime) - new Date(a.dateTime))
      .slice(0, 4)

    recentExpenses.value = sortedTx.map(tx => {
      const categoryId = Number(tx.category) // tx.category가 숫자든 문자열이든 숫자로 만듦
      const matchedCategory = categories.value.find(
        c => Number(c.id) === categoryId,
      )

      console.log(
        '🔍 모든 카테고리 id:',
        categories.value.map(c => c.id),
      )
      console.log(
        '🔍 tx.category:',
        tx.category,
        '→ Number:',
        Number(tx.category),
      )

      if (!catRes.data || !catRes.data.length) {
        console.error('❌ categories 데이터 없음')
        return
      }

      const imagePath = matchedCategory?.image || '@/icons/none.png'
      const categoryImage = resolveCategoryImage(imagePath)

      return {
        ...tx,
        categoryName: matchedCategory?.categoryName || '(카테고리 없음)',
        categoryImage,
        date: new Date(tx.dateTime).toLocaleDateString('ko-KR'),
        isIncome: tx.type === '2' || tx.type === 2,
      }
    })
  } catch (e) {
    console.error('🚨 오류 발생:', e)
  }
})
</script>

<template>
  <div class="homepage">
    <!-- ✅ 연/월 선택 -->
    <div class="select-group">
      <select v-model="selectedYear">
        <option v-for="year in years" :key="year" :value="year">
          {{ year }}년
        </option>
      </select>

      <select v-model="selectedMonth">
        <option v-for="month in months" :key="month" :value="month">
          {{ month }}월
        </option>
      </select>
    </div>

    <!-- ✅ 요약 카드 -->
    <div class="summary-cards">
      <div class="card income">
        <router-link to="/total-income" class="link-icon">
          <img src="@/icons/income.png" alt="총수입" class="card-icon" />
        </router-link>
        <div>총수입</div>
        <div class="value-column">
          <span>{{ totalIncome.toLocaleString() }}원</span>
        </div>
      </div>

      <div class="card expense">
        <router-link to="/total-expense" class="link-icon">
          <img src="@/icons/expence.png" alt="총지출" class="card-icon" />
        </router-link>
        <div>총지출</div>
        <div class="value-column">
          <span>{{ totalExpense.toLocaleString() }}원</span>
        </div>
      </div>

      <div class="card net">
        <router-link to="/net-income" class="link-icon">
          <img src="@/icons/profit.png" alt="순이익" class="card-icon" />
        </router-link>
        <div>순이익</div>
        <div class="value-column">
          <span>{{ netProfit.toLocaleString() }}원</span>
        </div>
      </div>
    </div>

    <!-- 최근 지출 내역 -->
    <div class="bottom-section">
      <div class="recent-transactions">
        <div class="title-row">
          <h2 class="title">최근 지출 내역</h2>
          <router-link to="/transaction-history" class="link-icon">
            <i class="fa-solid fa-angle-right"></i>
          </router-link>
        </div>

        <div
          v-for="item in recentExpenses"
          :key="item.id"
          class="transaction-item"
        >
          <div class="icon-box">
            <img
              :src="item.categoryImage"
              alt="카테고리 아이콘"
              class="icon-img"
            />
          </div>

          <div class="transaction-info">
            <div class="label">
              {{ item.categoryName }}<br />
              <small>{{ item.date }}</small>
            </div>
            <div
              class="amount"
              :style="{ color: item.isIncome ? '#1e90ff' : '#ff4267' }"
            >
              {{ item.isIncome ? '+' : '-'
              }}{{ item.amount.toLocaleString() }}원
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.homepage {
  background-color: #ffffff;
}
.summary-wrapper {
  margin-top: -1px;
  padding: 30px;
  background-color: #ffffff;
  border-radius: 16px 16px 0 0;
}

.select-group {
  display: flex;
  gap: 12px;
  margin-top: 20px;
  margin-bottom: 15px;
  margin-left: 10px;
}

select {
  padding: 6px 12px;
  font-size: 16px;
  border-radius: 6px;
  border: 1px solid #ccc;
  background-color: #fff;
}

.summary-cards {
  display: flex;
  justify-content: center;
  gap: 20px;
}

.card {
  width: 95px;
  height: 120px;
  padding: 10px;
  background-color: #f7f7f7;
  border-radius: 12px;
  text-align: center;
  font-size: 14px;
  font-family: 'Pretendard-Regular';
  margin-bottom: 10px;
}

.card.income,
.card.expense,
.card.net {
  color: #000000;
}

.value-column {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 6px;
  margin-top: 6px;
}

.card-icon {
  width: 40px;
  height: 40px;
}
.bottom-section {
  background-color: #ffffff;
}
.recent-transactions {
  padding: 10px;
  margin-top: -30px;
  background-color: rgb(255, 255, 255);
}

.title-row {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-top: 20px;
  margin-bottom: 20px;
}

.title-row .title {
  font-weight: bold;
  font-size: 20px;
  margin: 0;
  background-color: #ffffff;
}

.transaction-list {
  display: flex;
  flex-direction: column;
  gap: 1px;
}

.transaction-item {
  display: flex;
  align-items: center;
  padding: 8px 10px;
  border-radius: 8px;
  background-color: white;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.05);
  margin-bottom: 0px;
  position: relative;
  top: -10px;
}

.icon-box {
  width: 45px;
  height: 45px;
  border-radius: 12px;
  background-color: #eee;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-right: 12px;
  flex-shrink: 0;
}

.transaction-info {
  flex: 1;
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.label {
  font-size: 16px;
}

.amount {
  font-weight: bold;
  font-size: 16px;
}

.link-icon {
  font-size: 20px;
  color: #000000;
  cursor: pointer;
}

.icon-img {
  width: 24px;
  height: 24px;
  object-fit: contain;
}
</style>
