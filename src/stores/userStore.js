import { defineStore } from 'pinia'
import { useUser } from '@/api/useUser'
import { updateUserNameOnServer } from '@/api/useUser'

export const useUserStore = defineStore('userStore', () => {
  // 상태
  const { userName, userEmail, userPassword, fetchUser } = useUser()

  const updateName = async newName => {
    const response = await updateUserNameOnServer(newName)
    userName.value = response.data.name // 상태 업데이트도 같이
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
