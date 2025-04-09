<script setup>
import { ref, computed, onMounted, watch } from 'vue'
import { useFormStore } from '@/stores/formStore'
import Datepicker from 'vue3-datepicker'

const formStore = useFormStore()
const isOpen = ref(false)

// 날짜 형식
const formattedDate = computed(() => {
  if (!formStore.date) return ''
  const date = new Date(formStore.date)
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

// 날짜 선택 시 store 저장 + 달력 닫기
const handleDateChange = val => {
  formStore.date = val
  isOpen.value = false
}
</script>

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
      <Datepicker
        v-model="formStore.date"
        :inline="true"
        :auto-apply="true"
        :enable-time-picker="false"
        :teleport="false"
        @update:modelValue="handleDateChange"
      />
    </div>
  </div>
</template>

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
}
</style>
