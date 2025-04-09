<script setup>
import { ref, computed } from 'vue'

const currentYear = new Date().getFullYear()
const startYear = 2025
const endYear = currentYear + 10

const selectedYear = ref(currentYear)
const selectedMonth = ref(new Date().getMonth() + 1)

const years = Array.from(
  { length: endYear - startYear + 1 },
  (_, i) => startYear + i,
)
const months = Array.from({ length: 12 }, (_, i) => i + 1)

const dataByMonth = {
  '2025-04': { income: 100000, expense: 50000 },
}
const currentData = computed(() => {
  const key = `${selectedYear.value}-${String(selectedMonth.value).padStart(2, '0')}`
  return dataByMonth[key] || { income: 0, expense: 0 }
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

    <!-- 최근 지출 -->
    <div class="recent-transactions">
      <div class="title-row">
        <h2 class="title">최근 지출 내역</h2>
        <router-link :to="`/detail/${someId}`" class="link-icon">
          <i class="fa-solid fa-location-arrow"></i>
        </router-link>
      </div>

      <div class="transaction-list">
        <div class="transaction-item" v-for="n in 4" :key="n">
          <div class="icon-box"></div>
          <div class="transaction-info">
            <div class="label">이름</div>
            <div class="amount">가격</div>
          </div>
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

.card.income {
  color: #000000;
}

.card.expense {
  color: #000000;
}

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
  padding: 20px;
  margin-top: -45px;
  background-color: white;
}

.title-row {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-top: 10px;
  margin-bottom: 10px;
}

.title-row .title {
  font-weight: bold;
  font-size: 18px;
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
  padding: 10px 12px;
  border-radius: 12px;
  background-color: white;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.05);
  margin-bottom: -10px;
}

.icon-box {
  width: 48px;
  height: 48px;
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
</style>
