import axios from 'axios'

const instance = axios.create({
  baseURL: 'https://it-money.glitch.me',
  timeout: 5000,
})

export default instance
