import './assets/main.css'
import 'virtual:uno.css'
import 'mdui/mdui.css'
import './assets/nprogress.css'

import { ViteSSG } from 'vite-ssg'
import { createPinia } from 'pinia'
import { useNProgress } from '@vueuse/integrations/useNProgress'
// @ts-expect-error
import routes from '~pages'

import App from './App.vue'

export const createApp = ViteSSG(
  // the root component
  App,
  // vue-router options
  { routes },
  // function to have custom setups
  ({ app, router, routes, isClient, initialState }) => {
    app.use(createPinia())
    if (isClient) {
      const { isLoading } = useNProgress(null, {
        showSpinner: false,
      })

      router.beforeEach(() => {
        isLoading.value = true
      })

      router.afterEach(() => {
        isLoading.value = false
      })
    }
  }
)
