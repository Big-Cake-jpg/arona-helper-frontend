<template>
  <div class="mdui-prose max-w-3xl m-auto">
    <h1>设置</h1>
    <blockquote>
      <h3>这里的东西都没写好，可以先看看样子……</h3>
    </blockquote>
    <mdui-card class="p-5 w-100% my-2.5">
      <h3>账户</h3>
      <div v-if="isLoggedIn">
        <h4>信息</h4>
        <div class="flex items-stretch">
          <mdui-avatar :src="`${apiRoot}/account/avatar?uid=${uid}`"></mdui-avatar>
          <div class="self-center ml-3">
            <h4>{{ nickName || '未设置昵称' }}</h4>
          </div>
        </div>
        <p class="text-gray">UID：{{ uid }}</p>
        <h4>操作</h4>
        <div>
          <mdui-button variant="text" @click="editNickName"
            ><mdui-icon-edit slot="icon"></mdui-icon-edit>修改昵称</mdui-button
          ><mdui-button variant="text" @click="logOut"
            ><mdui-icon-logout slot="icon"></mdui-icon-logout>退出登录</mdui-button
          >
        </div>
      </div>
      <div v-else>
        <h4>您尚未登录</h4>
        <RouterLink to="/auth/login"
          ><mdui-button
            >立刻登录<mdui-icon-account-circle slot="icon"></mdui-icon-account-circle
            ><mdui-icon-arrow-forward slot="end-icon"></mdui-icon-arrow-forward></mdui-button
        ></RouterLink>
      </div>
    </mdui-card>
    <mdui-card class="p-5 w-100% my-2.5">
      <h3>界面</h3>
      <div class="flex items-stretch justify-between">
        <div class="self-center">
          <h4>深色模式</h4>
        </div>
        <mdui-switch></mdui-switch>
      </div>
      <div class="flex items-stretch justify-between">
        <div class="self-center">
          <h4>显示 UID</h4>
        </div>
        <mdui-switch checked></mdui-switch>
      </div>
      <div class="flex items-stretch justify-between">
        <div class="self-center">
          <h4>使用备选字段</h4>
        </div>
        <mdui-switch></mdui-switch>
      </div>
      <mdui-divider class="mt-3"></mdui-divider>
      <h3>类别</h3>
      <h4>设置项</h4>
      <h4>设置项</h4>
      <mdui-divider class="mt-3"></mdui-divider>
      <h3>类别</h3>
      <h4>设置项</h4>
      <h4>设置项</h4>
      <mdui-divider class="mt-3"></mdui-divider>
    </mdui-card>
    <mdui-card class="p-5 w-100% my-2.5">
      <h3>关于</h3>
      <h4>阿罗娜小助手 配套前端服务</h4>
      <p>{{ appVersion }}</p>
      <p>Made with ❤️ by Big_Cake & GitHub Copilot.</p>
      <h4>相关链接</h4>
      <a
        href="https://qm.qq.com/cgi-bin/qm/qr?_wv=1027&k=52ZKih_plrIdrn0X8OTaXnKPp9LgtqVs&authKey=yK1u5GClhphiEZ2LrERghmwXUiu%2B5K3zBYc%2FnFuYE%2FwPWYnhNIyawF1Aj26bLJZn&noverify=0&group_code=584380963"
        target="_blank"
        >交流反馈 QQ 群</a
      >
      |
      <a href="https://github.com/Big-Cake-jpg/arona-helper-frontend" target="_blank"
        >GitHub 仓库</a
      >
      <mdui-divider class="my-3"></mdui-divider>
      <a href="https://beian.miit.gov.cn" target="_blank">晋 ICP 备 2024031556 号 - 1</a>
    </mdui-card>
  </div>
</template>

<script lang="ts">
import getTokenInfo from '@/utils/getTokenInfo'
import '@mdui/icons/account-circle.js'
import '@mdui/icons/arrow-forward.js'
import '@mdui/icons/edit.js'
import '@mdui/icons/logout.js'
import { useHead, useSeoMeta } from '@unhead/vue'
import { useCookies } from '@vueuse/integrations/useCookies'
import axios from 'axios'
import 'mdui/components/avatar.js'
import 'mdui/components/button.js'
import 'mdui/components/card.js'
import 'mdui/components/collapse-item.js'
import 'mdui/components/collapse.js'
import 'mdui/components/switch.js'
import { confirm } from 'mdui/functions/confirm.js'
import { prompt } from 'mdui/functions/prompt.js'
import { snackbar } from 'mdui/functions/snackbar.js'
import { ref } from 'vue'
import { useRouter, type RouteLocationRaw } from 'vue-router'
import { version } from '../../package.json'

const apiRoot = import.meta.env.VITE_API_ROOT
const uid = ref('')
const isLoggedIn = ref(false)
const nickName = ref('')
const errmsg = ref('')

useSeoMeta({
  title: '设置 - 阿罗娜小助手',
  description: '有关前端服务的各项设置',
  ogDescription: '有关前端服务的各项设置',
  ogTitle: '设置 - 阿罗娜小助手',
  ogImage: 'https://arona.lihaoyu.cn/icon.webp'
  // twitterCard: 'summary_large_image',
})

useHead({ title: '设置 - 阿罗娜小助手' })

export default {
  data() {
    return {
      appVersion: `Ver.CN${version}`
    }
  },

  setup() {
    const cookies = useCookies(['token'])
    const token = cookies.get('token')
    const router = useRouter()

    if (token) {
      getTokenInfo()
        .then((res) => {
          if (res) {
            uid.value = res.user_id
            isLoggedIn.value = true
          } else {
            isLoggedIn.value = false
          }
        })
        .then(() => {
          getNickName()
        })
    }

    const getNickName = async () => {
      try {
        nickName.value = '加载中……'
        const response = await axios.get(`${apiRoot}/nick`, {
          params: {
            uid: uid.value
          }
        })
        nickName.value = response.data.data?.nick
      } catch (error) {
        console.error('获取用户昵称时出现错误：', error)
      }
    }

    const editNickName = async () => {
      prompt({
        headline: '修改昵称',
        description:
          '请输入新的昵称。警告：如果您使用违规昵称，导致机器人出现任何问题，您需要承担相应的后果。',
        confirmText: '提交',
        cancelText: '取消',
        onConfirm: async (value) => {
          console.log('新的昵称：' + value)
          try {
            const response = await axios.put(
              `${apiRoot}/nick?nick=${value}`,
              {},
              {
                headers: { Authorization: `Bearer ${token}` }
              }
            )
            if (response.status === 200) {
              snackbar({
                message: '昵称修改成功',
                closeable: true
              })
              nickName.value = value
            } else if (response.status === 403) {
              snackbar({
                message: '昵称违规，请选择其他昵称',
                closeable: true
              })
            }
            if (response.data?.msg) {
              errmsg.value = response.data.msg
            }
          } catch (error) {
            console.error('修改昵称时出现错误：', error)
            snackbar({
              message: '修改昵称失败，详细信息：' + error,
              closeable: true
            })
          }
        },
        onCancel: () => console.log('已取消昵称修改操作'),
        textFieldOptions: {
          label: '新的昵称',
          placeholder: '野兽先辈',
          required: true
        }
      })
    }

    const logOut = () => {
      confirm({
        headline: '退出登录',
        description: '确定要退出登录吗？',
        confirmText: '退出登录',
        cancelText: '手滑了',
        onConfirm: () => {
          cookies.remove('token')
          snackbar({
            message: '已退出登录',
            closeable: true
          })
          setTimeout(() => window.location.reload(), 2000)
        },
        onCancel: () => console.log('已取消退出登录操作')
      }).catch((error) => {})
    }

    function navigateTo(path: RouteLocationRaw) {
      router.push(path)
    }

    return {
      apiRoot,
      uid,
      isLoggedIn,
      nickName,
      editNickName,
      logOut,
      navigateTo
    }
  }
}
</script>
