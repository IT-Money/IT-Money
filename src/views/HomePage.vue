<script setup>
import { ref, computed, onMounted } from 'vue'
import axios from 'axios'

// 📌 현재 연도 기준 설정
const currentYear = new Date().getFullYear()
const startYear = 2023
const endYear = currentYear + 2

const selectedYear = ref(currentYear)
const selectedMonth = ref(new Date().getMonth() + 1)

const years = Array.from(
  { length: endYear - startYear + 1 },
  (_, i) => startYear + i,
)
const months = Array.from({ length: 12 }, (_, i) => i + 1)

// 📌 월별 수입/지출 요약 데이터 예시
const dataByMonth = {
  '2025-04': { income: 100000, expense: 50000 },
}

const currentData = computed(() => {
  const key = `${selectedYear.value}-${String(selectedMonth.value).padStart(2, '0')}`
  return dataByMonth[key] || { income: 0, expense: 0 }
})

const recentExpenses = ref([])

onMounted(async () => {
  try {
    const [txRes, catRes] = await Promise.all([
      axios.get(
        'http://localhost:5001/transactions?type=1&_sort=dateTime&_order=desc&_limit=4',
      ),
      axios.get('http://localhost:5001/categories'),
    ])

    // catRes와 txRes의 데이터가 올바른지 체크
    if (!txRes.data || !catRes.data) {
      throw new Error('필수 데이터가 응답되지 않았습니다.')
    }

    const categories = catRes.data
    const latest = txRes.data

    // 데이터 가공 부분 (아이콘 경로만 수정)
    recentExpenses.value = latest.map(tx => {
      // categoryId 또는 category가 일치하는 카테고리를 찾음
      const category = categories.find(
        c => c.id === tx.categoryId || c.id === tx.category,
      )

      // 카테고리가 없다면 기본값 설정
      const categoryName = category ? category.categoryName : '(카테고리 없음)'
      const categoryImage = category ? category.image : 'none.png'

      return {
        ...tx,
        categoryName,
        categoryImage,
        // 날짜 포맷 설정
        date: new Date(tx.dateTime).toLocaleDateString('ko-KR', {
          year: 'numeric',
          month: 'long',
          day: 'numeric',
        }),
        isIncome: false,
      }
    })

    console.log('✅ recentExpenses', recentExpenses.value)
  } catch (err) {
    console.error(
      '❌ 최근 지출 데이터를 불러오지 못했습니다:',
      err.message || err,
    )
  }
})
</script>

<template>
  <div class="homepage">
    <div class="summary-wrapper">
      <!-- 연도/월 셀렉트 -->
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

      <!-- 요약 카드 -->
      <div class="summary-cards">
        <div class="card income">
          <img src="@/icons/income.png" alt="총수입아이콘" class="card-icon" />
          <div>총수입</div>
          <div class="value-column">
            <span>{{ currentData.income.toLocaleString() }}원</span>
          </div>
        </div>
        <div class="card expense">
          <img src="@/icons/expence.png" alt="총지출아이콘" class="card-icon" />
          <div>총지출</div>
          <div class="value-column">
            <span>{{ currentData.expense.toLocaleString() }}원</span>
          </div>
        </div>
        <div class="card net">
          <img src="@/icons/profit.png" alt="순이익아이콘" class="card-icon" />
          <div>순이익</div>
          <div class="value-column">
            <span
              >{{
                (currentData.income - currentData.expense).toLocaleString()
              }}원</span
            >
          </div>
        </div>
      </div>
    </div>

    <!-- ✅ 최근 지출 -->
    <div v-for="item in recentExpenses" :key="item.id" class="transaction-item">
      <div class="icon-box">
        <img
          :src="`@/icons/${item.categoryImage}`"
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
          :style="{ color: item.isIncome ? '#1e90ff' : '#d11d1d' }"
        >
          {{ item.isIncome ? '+' : '-' }}{{ item.amount.toLocaleString() }}원
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.homepage {
  background-color: #281c9d;
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
  margin-top: -10px;
  margin-bottom: 15px;
  margin-left: -10px;
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
  gap: 29px;
}

.card {
  flex: 0 0 90px;
  padding: 10px;
  background-color: #f7f7f7;
  border-radius: 12px;
  text-align: center;
  font-size: 14px;
  font-family: 'Pretendard-Regular';
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
  margin-bottom: 0px;
}

.title-row .title {
  font-weight: bold;
  font-size: 20px;
  margin: 0;
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
  top: 20px;
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
