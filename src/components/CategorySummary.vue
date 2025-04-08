<script setup></script>

<template>
  <div
    class="bg-purple-100 p-4 rounded-xl flex items-center justify-between mb-4"
  >
    <div>
      <p class="text-sm text-gray-500">{{ month }} {{ category }} 금액</p>
      <p class="text-xl font-bold">{{ totalAmount.toLocaleString() }}원</p>
    </div>
    <img src="/icons/food.png" class="w-10 h-10" alt="카테고리 아이콘" />
  </div>
</template>

<style scoped></style>
