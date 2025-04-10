<script setup>
// import { ref } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { useTransactionStore } from '@/stores/transaction'
import ButtonLayout from '@/components/ButtonLayout.vue'
import DetailContainer from '@/components/DetailContainer.vue'

const route = useRoute()
const router = useRouter()
const transactionStore = useTransactionStore()

const transactionId = route.params.id

// // 모달 상태
// const isModalOpen = ref(false)

// // 모달 열기
// const openModal = () => {
//   isModalOpen.value = true
// }

// // 모달 닫기
// const closeModal = () => {
//   isModalOpen.value = false
// }

// 수정 페이지로 이동하기
const goToEditPage = () => {
  router.push({ name: 'edit', params: { id: transactionId } })
}

const deleteTransaction = async () => {
  try {
    await transactionStore.deleteTransaction(transactionId)
    router.back()
    alert('거래가 삭제되었습니다.')
  } catch (error) {
    alert('거래 삭제 실패:', error)
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
        @click="deleteTransaction"
      />
    </div>
  </div>
</template>

<style scoped>
.button-container {
  display: flex;
  gap: var(--space-m);
  justify-content: center;
}
</style>
