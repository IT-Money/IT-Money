<script setup>
import { computed, onMounted } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { useUser } from '@/api/useUser'

const route = useRoute()
const router = useRouter()

const { userName, fetchUser } = useUser()
const greetingMessage = computed(() => `${userName.value}님 안녕하세요!`)

const isHomePage = computed(() => route.name === 'home')

const pageTitle = computed(() => {
  const routeName = route.name

  switch (routeName) {
    case 'home':
      return '홈'
    case 'transaction-history':
      return '전체 거래 내역'
    case 'expense-categories':
      return '소비 카테고리'
    case 'total-income':
      return '총수입'
    case 'total-expense':
      return '총지출'
    case 'net-income':
      return '순이익'
    case 'detail':
      return '상세내역'
    case 'edit':
      return '수정하기'
    case 'add':
      return '추가하기'
    case 'my-page':
      return '마이페이지'
    case 'edit-name':
      return '이름 수정'
    case 'edit-email':
      return '이메일 수정'
    case 'edit-password':
      return '비밀번호 수정'
    default:
      return '페이지 제목'
  }
})

const headerClass = computed(() => {
  const routeName = route.name
  const bluePages = [
    'home',
    'transaction-history',
    'expense-categories',
    'total-income',
    'total-expense',
    'net-income',
    'my-page',
  ]
  return bluePages.includes(routeName) ? 'blue-header' : ''
})

const goBack = () => {
  router.back()
}

onMounted(() => {
  fetchUser()
})
</script>

<template>
  <header :class="headerClass">
    <div v-if="isHomePage">
      <img src="@/icons/pig.png" alt="로고" />
      <h1>{{ greetingMessage }}</h1>
    </div>
    <div v-else>
      <i class="fa-solid fa-angle-left" @click="goBack"></i>
      <h1>{{ pageTitle }}</h1>
    </div>
  </header>
</template>

<style scoped>
header div {
  display: flex;
  align-items: center;
  gap: var(--space-m);
  padding: var(--space-m);
}
header i {
  font-size: 1.3rem;
  cursor: pointer;
}
header h1 {
  font-size: 1.3rem;
}
header img {
  width: 45px;
  height: 45px;
}
.blue-header {
  background-color: var(--blue400);
  color: var(--gray100);
}
</style>
