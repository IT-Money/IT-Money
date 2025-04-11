<template>
  <div class="datepicker-wrapper">
    <label>날짜</label>

    <!-- 커스텀 input -->
    <div class="input-container">
      <input
        class="date-input"
        type="text"
        :value="formattedDate"
        readonly
        @click="toggleCalendar"
        placeholder="날짜 선택"
      />
      <span class="calendar-icon" @click.stop="toggleCalendar">📅</span>
    </div>

    <!-- 커스텀 달력 popup -->
    <div v-if="isOpen" class="datepicker-popup">
      <div class="calendar-header">
        <button @click="changeMonth(-1)" class="calendar-nave-btn">
          &#60;
        </button>
        <span class="month-year">{{ currentMonthName }} {{ currentYear }}</span>
        <button @click="changeMonth(1)">&#62;</button>
      </div>
      <div class="calendar-grid">
        <div class="calendar-day" v-for="day in weekDays" :key="day">
          {{ day }}
        </div>
        <div
          class="calendar-date"
          v-for="date in datesInCurrentMonth"
          :key="date"
          :class="{ selected: date === selectedDate }"
          @click="selectDate(date)"
        >
          {{ date }}
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'
import { useFormStore } from '@/stores/formStore'

const formStore = useFormStore()
const isOpen = ref(false)

// 현재 연도와 월
const currentYear = ref(new Date().getFullYear())
const currentMonth = ref(new Date().getMonth()) // 0부터 시작 (1월은 0)

// 선택된 날짜
const selectedDate = ref(null)

// 한 주의 요일
const weekDays = ['일', '월', '화', '수', '목', '금', '토']

// 월 이름 계산
const monthNames = [
  '1월',
  '2월',
  '3월',
  '4월',
  '5월',
  '6월',
  '7월',
  '8월',
  '9월',
  '10월',
  '11월',
  '12월',
]

const currentMonthName = computed(() => monthNames[currentMonth.value])

// 현재 월의 날짜 계산
const datesInCurrentMonth = computed(() => {
  const firstDayOfMonth = new Date(currentYear.value, currentMonth.value, 1)
  const lastDayOfMonth = new Date(currentYear.value, currentMonth.value + 1, 0)

  const dates = []
  // 첫 번째 날의 요일부터 시작
  for (let i = 1; i <= lastDayOfMonth.getDate(); i++) {
    dates.push(i)
  }
  return dates
})

// 날짜 형식
const formattedDate = computed(() => {
  if (!selectedDate.value) return ''
  const date = new Date(
    currentYear.value,
    currentMonth.value,
    selectedDate.value,
  )
  const year = date.getFullYear()
  const month = String(date.getMonth() + 1).padStart(2, '0')
  const day = String(date.getDate()).padStart(2, '0')
  const weekday = ['일', '월', '화', '수', '목', '금', '토'][date.getDay()]
  return `${year}.${month}.${day} (${weekday})`
})

// 달력 표시 toggle
const toggleCalendar = () => {
  isOpen.value = !isOpen.value
}

// 달 변경 (이전 또는 다음 월)
const changeMonth = delta => {
  currentMonth.value += delta
  if (currentMonth.value < 0) {
    currentMonth.value = 11
    currentYear.value -= 1
  } else if (currentMonth.value > 11) {
    currentMonth.value = 0
    currentYear.value += 1
  }
}

// 날짜 선택
const selectDate = date => {
  selectedDate.value = date
  formStore.date = new Date(currentYear.value, currentMonth.value, date)
  isOpen.value = false
}
</script>
<style>
/* 날짜 선택 전체 wrapper */
.datepicker-wrapper {
  position: relative;
  margin-bottom: 16px;
  border-color: #007bff;
}

/* 날짜 레이블 */
.datepicker-wrapper label {
  display: block;
  font-size: 13px;
  font-weight: bold;
  color: #333;
  margin-bottom: 6px;
  padding-left: 2px;
}

/* 입력 박스 스타일 (외곽) */
.input-container {
  display: flex;
  align-items: center;
  border: 1px solid #ccc;
  padding: 8px 12px;
  border-radius: 12px;
  background-color: white;
  cursor: pointer;
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.05);
}
.input-container:hover{
  border-color: #007bff;
}

/* 날짜 입력 필드 */
.date-input {
  flex: 1;
  font-size: 14px;
  border: none;
  padding: 0;
  background: transparent;
  outline: none;
  cursor: pointer;
  color: #333;
}

/* 달력 아이콘 */
.calendar-icon {
  margin-left: 10px;
  font-size: 18px;
  cursor: pointer;
  color: #555;
}

/* 달력 팝업 */
.datepicker-popup {
  position: absolute;
  top: 60px;
  left: 0;
  z-index: 100;
  background: white;
  border-radius: 14px;
  box-shadow: 0 6px 20px rgba(0, 0, 0, 0.1);
  padding: 10px;
  width: 100%;
  max-width: 320px;
}

/* 달력 상단 네비게이션 */
.calendar-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 18px;
}

.calendar-nav-btn {
  border: none;
  font-size: 300px;
  color: #007bff;
  cursor: pointer;
  padding: 4px 8px;
  border-radius: 6px;
  transition: background-color 0.2s;
}

.calendar-nav-btn:hover {
  background-color: #f0f0f0;
  color: #0056b3;
}

.month-year {
  font-size: 16px;
  font-weight: 600;
  color: #333;
}

/* 달력 날짜 그리드 */
.calendar-grid {
  display: grid;
  grid-template-columns: repeat(7, 1fr);
  gap: 6px;
}

/* 요일 텍스트 */
.calendar-day {
  font-size: 13px;
  font-weight: bold;
  text-align: center;
  color: #888;
}

/* 날짜 셀 */
.calendar-date {
  font-size: 14px;
  padding: 10px 0;
  border-radius: 8px;
  text-align: center;
  cursor: pointer;
  transition: background-color 0.2s;
  color: #333;
}

.calendar-date:hover {
  background-color: #f0f8ff;
  color: #007bff;
}

/* 선택된 날짜 */
.calendar-date.selected {
  background-color: #007bff;
  color: white;
  font-weight: 600;
}

/* 비활성 날짜 */
.calendar-date.disabled {
  color: #ccc;
  cursor: not-allowed;
}
</style>
