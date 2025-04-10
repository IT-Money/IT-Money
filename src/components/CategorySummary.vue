<template>
  <div class="summary-container">
    <div class="summary-content">
      <!-- 왼쪽: 텍스트 정보 -->
      <div class="text-section">
        <p class="title">{{ year }}년 {{ month }}월 {{ categoryName }} 금액</p>
        <p class="amount">{{ amount.toLocaleString() }}원</p>
        <span class="count-badge">총 {{ date }}회</span>
      </div>

      <!-- 오른쪽: 원형 아이콘 -->
      <div class="icon-section">
        <img class="icon-image" :src="iconPath" :alt="categoryName" />
        <!-- <img class="icon-image" src="@/icons/food.png" alt="아이콘" /> -->
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'CategorySummary',
  props: {
    year: Number,
    month: Number,
    categoryName: String, // 예: "식비"
    amount: Number,
    date: Number, // 거래 횟수
  },
  computed: {
    iconPath() {
      try {
        return new URL(`@/icons/${this.categoryName}.png`, import.meta.url).href
      } catch {
        return new URL(`@/icons/${this.categoryName}.png`, import.meta.url).href
      }
    },
  },
}
</script>

<style scoped>
.summary-container {
  padding: 0 20px;
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
  font-weight: 600;
  margin: 0;
}

.amount {
  font-size: 24px;
  font-weight: bold;
  color: #000;
  margin: 0;
}

.count-badge {
  display: inline-block;
  background-color: #eee;
  color: #444;
  padding: 4px 10px;
  font-size: 12px;
  border-radius: 999px;
  width: fit-content;
}

.icon-section {
  background-color: #f76d82;
  border-radius: 50%;
  padding: 12px;
  width: 48px;
  height: 48px;
  display: flex;
  align-items: center;
  justify-content: center;
}

.icon-image {
  width: 24px;
  height: 24px;
}
</style>
