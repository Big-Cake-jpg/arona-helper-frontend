import './assets/main.css'
import 'virtual:uno.css'
import 'mdui/mdui.css'

import { ViteSSG } from 'vite-ssg'
import { createPinia } from 'pinia'
// @ts-expect-error
import routes from "~pages";

import App from './App.vue'

export const createApp = ViteSSG(
  // the root component
  App,
  // vue-router options
  { routes },
  // function to have custom setups
  ({ app, router, routes, isClient, initialState }) => {
    app.use(createPinia())
  }
)
