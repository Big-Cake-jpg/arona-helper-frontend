import axios from 'axios'
import { useCookies } from '@vueuse/integrations/useCookies'

const apiRoot = import.meta.env.VITE_API_ROOT

export default async function refreshToken() {
  const cookies = useCookies(['token'])
  const token = cookies.get('token')
  if (token) {
    try {
      const response = await axios.post(
        `${apiRoot}/account/login/refresh`,
        {},
        { headers: { Authorization: `Bearer ${token}` } }
      )

      if (response.status === 200) {
        cookies.set('token', response.data.data?.token, {
          path: '/',
          expires: new Date(response.data.data?.expire_on * 1000)
        })
      }
    } catch (error) {
      console.error('刷新登录令牌失败：', error)
    }
  }
}
