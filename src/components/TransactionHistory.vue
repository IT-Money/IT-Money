<script setup>
import { useRouter } from 'vue-router'

const router = useRouter()

const goToDetailPage = (id) => {
  sessionStorage.setItem('previousRoute', 'transaction-history') // 이전 경로 저장
  router.push({
    name: 'detail',
    params: { id },
  })
}
</script>

<template>
  <div>
    <ul>
      <li v-for="transaction in transactions" :key="transaction.id">
        <button @click="goToDetailPage(transaction.id)">
          {{ transaction.title }}
        </button>
      </li>
    </ul>
  </div>
</template>