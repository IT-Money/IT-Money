import { createRouter, createWebHistory } from 'vue-router'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'main',
      component: () => import('@/views/MainPage.vue'),
    },
    {
      path: '/home',
      name: 'home',
      component: () => import('@/views/HomePage.vue'),
    },
    {
      path: '/transaction-history',
      name: 'transaction-history',
      component: () => import('@/views/TransactionHistory.vue'),
    },
    {
      path: '/expense-categories',
      name: 'expense-categories',
      component: () => import('@/views/ExpenseCategories.vue'),
    },
    {
      path: '/total-income',
      name: 'total-income',
      component: () => import('@/views/TotalIncome.vue'),
    },
    {
      path: '/total-expense',
      name: 'total-expense',
      component: () => import('@/views/TotalExpense.vue'),
    },
    {
      path: '/net-income',
      name: 'net-income',
      component: () => import('@/views/NetIncome.vue'),
    },
    {
      path: '/detail/:id',
      name: 'detail',
      component: () => import('@/views/DetailView.vue'),
      props: true,
    },
    {
      path: '/edit/:id',
      name: 'edit',
      component: () => import('@/views/EditPage.vue'),
      props: true,
    },
    {
      path: '/add',
      name: 'add',
      component: () => import('@/views/AddPage.vue'),
    },
    {
      path: '/my-page',
      name: 'my-page',
      component: () => import('@/views/MyPage.vue'),
    },
    {
      path: '/edit-name',
      name: 'edit-name',
      component: () => import('@/views/EditName.vue'),
    },
    {
      path: '/edit-email',
      name: 'edit-email',
      component: () => import('@/views/EditEmail.vue'),
    },
    {
      path: '/edit-password',
      name: 'edit-password',
      component: () => import('@/views/EditPassword.vue'),
    },
  ],
})

export default router
