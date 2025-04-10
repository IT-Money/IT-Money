<script setup>
import { useFormStore } from '@/stores/formStore'
import { useRouter } from 'vue-router'
import { saveTransaction } from '@/api/saveTransactions'
import TypeToggle from '@/components/TypeToggle.vue'
import DatePickerInput from '@/components/DatePickerInput.vue'
import CategoryInput from '@/components/CategoryInput.vue'
import Amount from '@/components/Amount.vue'
import SaveCancelButton from '@/components/SaveCancelButton.vue'
import Memo from '@/components/Memo.vue'

const formStore = useFormStore()
const router = useRouter()

const save = async () => {
  if (!formStore.date || !formStore.category || !formStore.amount) {
    return alert('❗ 날짜, 카테고리, 금액은 필수 입력 항목입니다.')
  }
  const selectedCategory = formStore.category
  const selectedDate = new Date(formStore.date)
  const now = new Date()

  // 사용자가 고른 날짜 + 현재 시간 합치기
  selectedDate.setHours(now.getHours())
  selectedDate.setMinutes(now.getMinutes())
  selectedDate.setSeconds(now.getSeconds())
  selectedDate.setMilliseconds(now.getMilliseconds())

  // YYYY-MM-DDTHH:mm:ss 포맷으로 변환
  const year = selectedDate.getFullYear()
  const month = String(selectedDate.getMonth() + 1).padStart(2, '0')
  const day = String(selectedDate.getDate()).padStart(2, '0')
  const hour = String(selectedDate.getHours()).padStart(2, '0')
  const minute = String(selectedDate.getMinutes()).padStart(2, '0')
  const second = String(selectedDate.getSeconds()).padStart(2, '0')

  const dateTime = `${year}-${month}-${day}T${hour}:${minute}:${second}`

  const dataToSubmit = {
    dateTime, // ✅ UTC 말고 로컬 기준으로 조합
    type: formStore.type === 'income' ? '2' : '1',
    category: selectedCategory,
    amount: Number(formStore.amount),
    memo: formStore.memo,
  }

  try {
    console.log('저장할 데이터 :', dataToSubmit)

    await saveTransaction(dataToSubmit)
    alert('✅ 저장 완료!')
    formStore.resetForm()
    router.go(-1)
  } catch (e) {
    alert('❌ 저장 실패')
    console.error('에러:', e)
  }
}
const cancel = () => {
  formStore.resetForm()
  router.go(-1)
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
