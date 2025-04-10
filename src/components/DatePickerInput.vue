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
        <button @click="changeMonth(-1)">&#60;</button>
        <span>{{ currentMonthName }} {{ currentYear }}</span>
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

<style scoped>
.datepicker-wrapper {
  position: relative;
  margin-bottom: 16px;
}

.input-container {
  display: flex;
  align-items: center;
  border: 1px solid #ccc;
  padding: 8px 12px;
  border-radius: 12px;
  background-color: white;
  cursor: pointer;
}

.date-input {
  flex: 1;
  border: none;
  background: transparent;
  font-size: 14px;
  outline: none;
  cursor: pointer;
}

.calendar-icon {
  margin-left: 8px;
  font-size: 18px;
}

.datepicker-popup {
  position: absolute;
  top: 60px;
  left: 0;
  z-index: 100;
  background: white;
  border-radius: 12px;
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1);
  padding: 10px;
  width: 230px;
}

.calendar-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 10px;
}

.calendar-grid {
  display: grid;
  grid-template-columns: repeat(7, 1fr);
  grid-gap: 5px;
}

.calendar-day,
.calendar-date {
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 5px;
  border-radius: 5px;
  cursor: pointer;
}

.calendar-date.selected {
  background-color: #007bff;
  color: white;
}
</style>
