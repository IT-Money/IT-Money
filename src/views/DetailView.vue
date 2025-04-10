<script setup>
import { ref } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { useTransactionStore } from '@/stores/transaction'
import ButtonLayout from '@/components/ButtonLayout.vue'
import DetailContainer from '@/components/DetailContainer.vue'

const route = useRoute()
const router = useRouter()
const transactionStore = useTransactionStore()

const transactionId = route.params.id

// // 모달 상태
const isModalOpen = ref(false)

// // 모달 열기
const openModal = () => {
  isModalOpen.value = true
}

// // 모달 닫기
const closeModal = () => {
  isModalOpen.value = false
}

// 수정 페이지로 이동하기
const goToEditPage = () => {
  router.push({ name: 'edit', params: { id: transactionId } })
}

const confirmDelete = async () => {
  try {
    await transactionStore.deleteTransaction(transactionId)
    closeModal()
    router.push({ name: 'home' })
    alert('거래가 삭제되었습니다.')
  } catch (error) {
    alert('거래 삭제 실패: ' + error)
  }
}

</script>

<template>
  <div>
    <DetailContainer />
    <div class="button-container">
      <ButtonLayout
        text="수정하기"
        backgroundColor="var(--blue400)"
        textColor="var(--gray100)"
        @click="goToEditPage"
      />
      <ButtonLayout
        text="삭제하기"
        backgroundColor="var(--sementic-red)"
        textColor="var(--gray100)"
        @click="openModal"
      />

      <div v-if="isModalOpen" class="modal-overlay">
        <div class="modal">
          <p>정말 삭제하시겠습니까?</p>
          <div class="modal-buttons">
            <button @click="confirmDelete">예</button>
            <button @click="closeModal">아니오</button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.button-container {
  display: flex;
  gap: var(--space-m);
  justify-content: center;
}
.modal-overlay {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0,0,0,0.5);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 999;
}

/* 모달 박스 */
.modal {
  background: white;
  border-radius: 16px;
  padding: 24px;
  text-align: center;
  width: 280px;
  box-shadow: 0 10px 30px rgba(0,0,0,0.2);
}

.modal p {
  margin-bottom: 20px;
  font-size: 16px;
  font-weight: bold;
}

.modal-buttons {
  display: flex;
  justify-content: space-around;
  gap: 12px;
}

.modal-buttons button {
  padding: 10px 20px;
  border: none;
  border-radius: 8px;
  font-weight: bold;
  cursor: pointer;
  width: 80px;
}

.modal-buttons button:first-child {
  background-color: #f66;
  color: white;
}

.modal-buttons button:last-child {
  background-color: #ddd;
}
</style>
