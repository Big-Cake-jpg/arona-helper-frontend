import axios from 'axios'
import { useCookies } from '@vueuse/integrations/useCookies'
// import { dialog } from 'mdui/functions/dialog.js'
import { useRouter } from 'vue-router'

const apiRoot = import.meta.env.VITE_API_ROOT

export default async function refreshToken() {
  const cookies = useCookies(['token'])
  const token = cookies.get('token')
  const router = useRouter()

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
      } /*  else {
        console.log('登录令牌已过期或无效')
        cookies.remove('token')
        dialog({
          headline: '登录状态已失效',
          closeOnEsc: true,
          closeOnOverlayClick: true,
          body: '你的登录状态已失效，请重新登录',
          actions: [
            {
              text: '重新登录',
              onClick: () => {
                router.push('/auth/login')
              }
            },
            {
              text: '我知道了'
            }
          ]
        })
      } */
    } catch (error) {
      console.error('刷新登录令牌失败：', error)
      cookies.remove('token')
    }
  }
}
