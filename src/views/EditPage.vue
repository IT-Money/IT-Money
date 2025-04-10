<script setup>
import { ref, onMounted } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { useTransactionStore } from '@/stores/transaction'
import ButtonLayout from '@/components/ButtonLayout.vue'

const route = useRoute()
const router = useRouter()
const transactionStore = useTransactionStore()

// 거래 데이터 관리
const transaction = ref({
  id: null,
  dateTime: '',
  amount: 0,
  memo: '',
  categoryId: null,
})

// 거래 수정 메소드
const updateTransaction = async () => {
  try {
    await transactionStore.updateTransaction(transaction.value)
    router.push({ name: 'detail', params: { id: transaction.value.id } }) // 수정 완료 후 상세 페이지로 이동
    alert('거래가 수정되었습니다.')
  } catch (error) {
    alert('거래 수정 실패', error)
  }
}

// 거래 ID로 해당 거래 정보를 불러오기
onMounted(async () => {
  const id = route.params.id
  const fetchedTransaction = await transactionStore.fetchTransactionById(id)
  if (fetchedTransaction) {
    transaction.value = { ...fetchedTransaction } // 수정 가능한 형태로 데이터 할당
  }
})
</script>

<template>
  <div>
    <h2>거래 수정</h2>

    <!-- 거래 수정 폼 -->
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
        <label for="memo">메모</label>
        <textarea
          v-model="transaction.memo"
          id="memo"
          placeholder="메모 입력"
        ></textarea>
      </div>

      <!-- 카테고리 선택 -->
      <div class="form-group">
        <label for="category">카테고리</label>
        <select v-model="transaction.categoryId" id="category">
          <option
            v-for="category in transactionStore.categories"
            :key="category.id"
            :value="category.id"
          >
            {{ category.categoryName }}
          </option>
        </select>
      </div>

      <ButtonLayout
        text="수정 완료"
        backgroundColor="var(--blue400)"
        textColor="var(--gray100)"
        @click="updateTransaction"
      />
    </div>

    <div class="button-container">
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
.form-container {
  width: 80%;
  margin: 30px auto;
  padding: var(--space-m);
  background-color: #ffffff;
  box-shadow:
    3px 3px 15px 0px rgb(243, 242, 243),
    -1px 3px 20px 0px rgb(250, 250, 250);
  border-radius: var(--space-m);
}

.form-group {
  margin-bottom: var(--space-m);
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
  height: 100px;
  resize: none;
}

.button-container {
  display: flex;
  gap: var(--space-m);
  justify-content: center;
  margin-top: var(--space-m);
}
</style>
