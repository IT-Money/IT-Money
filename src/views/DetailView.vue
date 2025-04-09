<script setup>
import ButtonLayout from '@/components/ButtonLayout.vue'
import DetailContainer from '@/components/DetailContainer.vue'
</script>

<template>
  <div>
    <DetailContainer />
    <div class="button-container">
      <ButtonLayout
        text="수정하기"
        backgroundColor="var(--blue400)"
        textColor="var(--gray100)"
      />
      <ButtonLayout
        text="삭제하기"
        backgroundColor="var(--sementic-red)"
        textColor="var(--gray100)"
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
