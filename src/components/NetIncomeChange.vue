<script setup>
import { computed } from 'vue'

const props = defineProps({
  changeAmount: {
    type: Number,
    required: true,
  },
})

const isPositive = computed(() => props.changeAmount >= 0)

const formattedAmount = computed(() => {
  const amount = Math.abs(props.changeAmount)
  return Math.floor(amount / 10000).toLocaleString() + '만원'
})
</script>
<template>
  <div class="net-income-change">
    <p class="change-text">
      지난달보다
      <span :class="isPositive ? 'up' : 'down'">{{ formattedAmount }}</span>
      {{ isPositive ? ' 더 쓰는 중' : ' 덜 쓰는 중' }}
    </p>
  </div>
</template>

<style scoped>
.net-income-change {
  padding: 12px 16px;
  margin-top: 12px;
  border-radius: 8px;
  font-weight: 500;
  font-size: 14px;
  color: #666;
  background-color: #fafafa;
}

.change-text {
  margin: 0;
}

.up {
  color: red;
  font-weight: bold;
}

.down {
  color: #007aff; /* 파란색임 */
  font-weight: bold;
}
</style>
