<template>
  <div class="summary-container">
    <div class="summary-content">
      <!-- 왼쪽: 텍스트 정보 -->
      <div class="text-section">
        <p class="title">{{ year }}년 {{ month }}월 순이익</p>
        <p class="amount">{{ netAmount.toLocaleString() }}원</p>
      </div>

      <!-- 오른쪽: 아이콘 -->
      <div class="icon-section">
        <img class="icon-image" src="@/icons/profit.png" alt="순이익 아이콘" />
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'NetIncomeSummary',
  props: {
    year: [Number, String],
    month: [Number, String],
    netAmount: Number, // 순이익 금액
  },
}
</script>

<style scoped>
.summary-container {
  padding: 0 16px;
  margin-top: 16px;
}

.summary-content {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.text-section {
  display: flex;
  flex-direction: column;
  gap: 8px;
}

.title {
  font-size: 14px;
  color: #3b1fe0;
  font-weight: 700;
  margin: 0;
}

.amount {
  font-size: 27px;
  font-weight: 800;
  color: #000;
  margin: 0;
}

.icon-section {
  background-color: #d2e7ff; /* 순이익에 어울리는 연한 블루 */
  border-radius: 50%;
  padding: 12px;
  width: 48px;
  height: 48px;
  display: flex;
  align-items: center;
  justify-content: center;
}

.icon-image {
  width: 48px;
  height: 48px;
}
</style>
