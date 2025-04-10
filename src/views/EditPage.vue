<script setup>
import { ref, onMounted, computed } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { useTransactionStore } from '@/stores/transaction'
import { useCategoryStore } from '@/stores/category'
import { useFormStore } from '@/stores/formStore'
import { typeMap, reverseTypeMap } from '@/utils/typeMap'
import ButtonLayout from '@/components/ButtonLayout.vue'
import TypeToggle from '@/components/TypeToggle.vue'

const route = useRoute()
const router = useRouter()
const transactionStore = useTransactionStore()
const categoryStore = useCategoryStore()
const store = useFormStore()

const transaction = ref({
  id: null,
  dateTime: '',
  amount: 0,
  memo: '',
  category: null,
  type: null,
})

const updateTransaction = async () => {
  try {
    transaction.value.type = reverseTypeMap[store.type]
    await transactionStore.updateTransaction(transaction.value)
    router.push({ name: 'detail', params: { id: transaction.value.id } })
    alert('거래가 수정되었습니다.')
  } catch (error) {
    alert('거래 수정 실패', error)
  }
}

onMounted(async () => {
  await categoryStore.fetchCategories()
  const id = route.params.id
  const fetchedTransaction = await transactionStore.fetchTransactionById(id)
  if (fetchedTransaction) {
    transaction.value = { ...fetchedTransaction }
    store.setType(typeMap[transaction.value.type])
  }
})

const filteredCategories = computed(() => {
  return categoryStore.categories
})
</script>

<template>
  <div>
    <TypeToggle class="typeToggle" />

    <div class="form-container">
      <div class="form-group">
        <label for="amount">금액</label>
        <input
          type="number"
          v-model="transaction.amount"
          id="amount"
          placeholder="금액 입력"
        />
      </div>

      <div class="form-group">
        <label for="dateTime">일시</label>
        <input
          type="datetime-local"
          v-model="transaction.dateTime"
          id="dateTime"
        />
      </div>

      <div class="form-group">
        <label for="category">카테고리</label>
        <select v-model="transaction.category" id="category">
          <option
            v-for="category in filteredCategories"
            :key="category.id"
            :value="category.id"
          >
            {{ category.categoryName }}
          </option>
        </select>
      </div>

      <div class="form-group">
        <label for="memo">메모</label>
        <textarea
          v-model="transaction.memo"
          id="memo"
          placeholder="메모 입력"
        ></textarea>
      </div>
    </div>

    <div class="button-container">
      <ButtonLayout
        text="저장"
        backgroundColor="var(--blue400)"
        textColor="var(--gray100)"
        @click="updateTransaction"
      />
      <ButtonLayout
        text="취소"
        backgroundColor="var(--gray400)"
        textColor="var(--gray100)"
        @click="router.push({ name: 'detail', params: { id: transaction.id } })"
      />
    </div>
  </div>
</template>

<style scoped>
.typeToggle {
  margin: var(--space-m);
}

.form-container {
  width: 80%;
  margin: 0 auto;
  padding: var(--space-s) var(--space-m) var(--space-m);
  background-color: #ffffff;
  box-shadow:
    3px 3px 15px 0px rgb(243, 242, 243),
    -1px 3px 20px 0px rgb(250, 250, 250);
  border-radius: var(--space-m);
}

.form-group {
  margin-bottom: var(--space-m);
}
.form-group:last-of-type {
  margin-bottom: 0;
}

.form-group label {
  display: block;
  font-weight: bold;
  color: var(--gray500);
}

.form-group input,
.form-group textarea,
.form-group select {
  width: 100%;
  padding: var(--space-s);
  font-size: 1rem;
  border-radius: var(--space-s);
  border: 1px solid var(--gray300);
}

.form-group textarea {
  height: 80px;
  resize: none;
}

.button-container {
  display: flex;
  gap: var(--space-m);
  justify-content: center;
  margin-top: var(--space-m);
}
</style>
