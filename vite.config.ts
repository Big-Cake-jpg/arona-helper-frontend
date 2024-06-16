import { fileURLToPath, URL } from 'node:url'
import UnoCSS from 'unocss/vite'

import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import VueDevTools from 'vite-plugin-vue-devtools'
import VitePages from 'vite-plugin-pages'
import ViteMarkdown from 'vite-plugin-md'
import AutoImport from 'unplugin-auto-import/vite'
import Components from 'unplugin-vue-components/vite'
import { unheadComposablesImports } from 'unhead'
import { compression } from 'vite-plugin-compression2'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    vue({
      template: {
        compilerOptions: {
          // 所有以 mdui- 开头的标签名都是 mdui 组件
          isCustomElement: (tag) => tag.startsWith('mdui-')
        }
      }
    }),
    VueDevTools(),
    UnoCSS(),
    VitePages({
      extensions: ['vue', 'md'],
      exclude: ['**/components/*.vue']
    }),
    ViteMarkdown(),
    AutoImport({
      imports: ['vue', unheadComposablesImports[0]]
    }),
    Components({
      extensions: ['vue', 'md']
    }),
    compression()
  ],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url))
    }
  }
})
