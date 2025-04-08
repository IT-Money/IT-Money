import { defineStore } from 'pinia'
import { ref } from 'vue'

export const useUserStore = defineStore('userStore', () => {
  // 상태
  const name = ref('홍길동')
  const email = ref('abcde@gmail.com')
  const password = ref('rlfehd0408')

  const updateName = newName => {
    name.value = newName
  }

  const updateEmail = newEmail => {
    email.value = newEmail
  }

  const updatePassword = newPassword => {
    password.value = newPassword
  }

  return {
    name,
    email,
    password,
    updateName,
    updateEmail,
    updatePassword,
  }
})
