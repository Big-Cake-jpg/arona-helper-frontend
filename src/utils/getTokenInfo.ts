import { useJwt } from '@vueuse/integrations/useJwt'
import { useCookies } from '@vueuse/integrations/useCookies'

interface TokenPayload {
    user_id: string
    openid: string
    nickname: string
    iat: number
    exp: number
}

export default async function getTokenInfo() {
    const cookies = useCookies(['token'])
    const token = cookies.get('token')
    if (!token) return null
    const { header, payload } = useJwt(token)
    console.log(header.value)
    try {
        return payload.value as TokenPayload
    } catch (e) {
        console.error(e)
        return null
    }
}