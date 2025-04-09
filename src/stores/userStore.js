import { defineStore } from 'pinia'
import { useUser } from '@/api/useUser'

export const useUserStore = defineStore('userStore', () => {
  // 상태
  const { userName, userEmail, userPassword, fetchUser } = useUser()

  const updateName = newName => {
    userName.value = newName
  }

  const updateEmail = newEmail => {
    userEmail.value = newEmail
  }

  const updatePassword = newPassword => {
    userPassword.value = newPassword
  }

  return {
    userName,
    userEmail,
    userPassword,
    updateName,
    updateEmail,
    updatePassword,
    fetchUser,
  }
})
