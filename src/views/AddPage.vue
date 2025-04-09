<script setup>
import { useFormStore } from '@/stores/formStore'
import Amount from '@/components/Amount.vue'
import CategoryInput from '@/components/CategoryInput.vue'
import DatePickerInput from '@/components/DatePickerInput.vue'
import Memo from '@/components/Memo.vue'
import SaveCancelButton from '@/components/SaveCancelButton.vue'
import TypeToggle from '@/components/TypeToggle.vue'

const formStore = useFormStore()

const save = () => {
  if (!formStore.date) return alert('❗ 날짜를 선택해주세요.')

  // 👉 필요한 모든 값은 formStore에서 가져옴
  const dataToSubmit = {
    type: formStore.type,
    date: formStore.date,
    category: formStore.category,
    amount: formStore.amount,
    memo: formStore.memo,
  }

  console.log('✅ 저장할 데이터:', dataToSubmit)

  // 예: axios.post('/api/transactions', dataToSubmit)
  formStore.resetForm()
}

const cancel = () => {
  formStore.resetForm()
}
</script>
<template>
  <div class="add-page">
    <h2>추가 거래 내역</h2>
    <TypeToggle />
    <DatePickerInput />
    <CategoryInput />
    <Amount />
    <Memo />
    <SaveCancelButton @save="save" @cancel="cancel" />
  </div>
</template>

<style scoped>
.add-page {
  padding: 24px;
  max-width: 420px;
  margin: auto;
}

h2 {
  text-align: center;
  font-size: 20px;
  margin-bottom: 20px;
}
</style>
