import { defineStore } from 'pinia'
import { useUser } from '@/api/useUser'
import { updateUserNameOnServer, updateUserEmailOnServer, updateUserPasswordOnServer } from '@/api/useUser'

export const useUserStore = defineStore('userStore', () => {
  // 상태
  const { userName, userEmail, userPassword, fetchUser } = useUser()

  const updateName = async newName => {
    const response = await updateUserNameOnServer(newName)
    userName.value = response.data.name // 상태 업데이트도 같이
  }

  const updateEmail = async newEmail => {
    const response = await updateUserEmailOnServer(newEmail)
    userEmail.value = response.data.email
  }

  const updatePassword = async newPassword => {
    const response = await updateUserPasswordOnServer(newPassword)
    userPassword.value = response.data.password
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
