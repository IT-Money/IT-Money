import axios from '@/utils/axios'
import { ref } from 'vue'

export const useUser = () => {
  const userName = ref('사용자')
  const userEmail = ref('')
  const userPassword = ref('')

  const fetchUser = async () => {
    try {
      const response = await axios.get('/user')
      const user = response.data[0]
      userName.value = user.name
      userEmail.value = user.email
      userPassword.value = user.password
    } catch (err) {
      console.error('사용자 데이터를 가져오는 중 오류 발생:', err)
    }
  }

  return { userName, userEmail, userPassword, fetchUser }
}

export const updateUserNameOnServer = async newName => {
  const response = await axios.patch('/user/1', {
    name: newName,
  })
  return response
}
