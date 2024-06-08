<template>
  <mdui-navigation-bar v-if="isMobile" :value="currentPage" scroll-behavior="hide">
    <mdui-navigation-bar-item href="/" value="/" @click.prevent="navigateTo('/')"><mdui-icon-home
        slot="active-icon"></mdui-icon-home><mdui-icon-home--outlined slot="icon"
        alt="首页"></mdui-icon-home--outlined>首页</mdui-navigation-bar-item>
    <mdui-navigation-bar-item href="/favorability" value="/favorability"
      @click.prevent="navigateTo('/favorability')"><mdui-icon-favorite
        slot="active-icon"></mdui-icon-favorite><mdui-icon-favorite-border
        slot="icon"></mdui-icon-favorite-border>好感度</mdui-navigation-bar-item>
    <mdui-navigation-bar-item href="/settings" value="/settings"
      @click.prevent="navigateTo('/settings')"><mdui-icon-settings
        slot="active-icon"></mdui-icon-settings><mdui-icon-settings--outlined slot="icon"></mdui-icon-settings--outlined>设置</mdui-navigation-bar-item>
  </mdui-navigation-bar>
  <mdui-navigation-rail v-else divider :value="currentPage">
    <mdui-avatar src="/icon.png" slot="top"></mdui-avatar>
    <mdui-fab lowered slot="top" href="/auth/login" @click.prevent="navigateTo('/auth/login')"><mdui-icon-login
        slot="icon"></mdui-icon-login></mdui-fab>
    <mdui-navigation-rail-item href="/" value="/" @click.prevent="navigateTo('/')"><mdui-icon-home
        slot="active-icon"></mdui-icon-home><mdui-icon-home--outlined slot="icon"
        alt="首页"></mdui-icon-home--outlined>首页</mdui-navigation-rail-item>
    <mdui-navigation-rail-item href="/favorability" value="/favorability"
      @click.prevent="navigateTo('/favorability')"><mdui-icon-favorite
        slot="active-icon"></mdui-icon-favorite><mdui-icon-favorite-border
        slot="icon"></mdui-icon-favorite-border>好感度</mdui-navigation-rail-item>
    <mdui-button-icon href="https://github.com/Big-Cake-jpg/aronahelper-favorability-board" target="_blank"
      slot="bottom" alt="源代码"><mdui-tooltip placement="right"
        content="源代码"><mdui-icon-source></mdui-icon-source></mdui-tooltip></mdui-button-icon>
    <mdui-button-icon @click="toggleDark()" slot="bottom" alt="切换模式"><mdui-tooltip placement="right"
        content="切换模式"><mdui-icon-brightness-6></mdui-icon-brightness-6></mdui-tooltip></mdui-button-icon>
    <mdui-button-icon slot="bottom" alt="设置" href="/settings" @click.prevent="navigateTo('/settings')"><mdui-tooltip placement="right"
        content="设置"><mdui-icon-settings></mdui-icon-settings></mdui-tooltip></mdui-button-icon>
  </mdui-navigation-rail>
</template>

<script lang="ts">
// @ts-nocheck TS8010 why reporting error????
import 'mdui/components/navigation-rail.js';
import 'mdui/components/navigation-rail-item.js';
import 'mdui/components/button-icon.js';
import 'mdui/components/fab.js';
import 'mdui/components/avatar.js';
import 'mdui/components/navigation-bar.js';
import 'mdui/components/navigation-bar-item.js';
import 'mdui/components/tooltip.js';
import '@mdui/icons/home--outlined.js';
import '@mdui/icons/home.js';
import '@mdui/icons/settings.js';
import '@mdui/icons/menu.js';
import '@mdui/icons/login.js';
import '@mdui/icons/brightness-6.js';
import '@mdui/icons/favorite-border.js';
import '@mdui/icons/favorite.js';
import '@mdui/icons/source.js';
import '@mdui/icons/settings--outlined.js';

import { setTheme } from 'mdui/functions/setTheme.js';
import { useDark } from "@vueuse/core";
import { useToggle } from "@vueuse/shared";
import { ref, onMounted, watch, onUnmounted, computed, watchEffect } from 'vue';
import { useRoute, useRouter } from 'vue-router';

export default {
  setup() {
    const isMobile = computed(() => windowWidth.value < 768);
    const route = useRoute();
    const currentPage = ref(route.path);
    const router = useRouter();
    const windowWidth = ref(window.innerWidth);

    const updateWindowWidth = () => {
      windowWidth.value = window.innerWidth;
    };

    const isDark = useDark({
      onChanged(dark: boolean) {
        if (typeof document !== 'undefined')
          setTheme(dark ? "dark" : "light");
      },
    });
    const toggleDark = useToggle(isDark);

    function navigateTo(path) {
      router.push(path);
    }

    watch(route, (to) => {
      currentPage.value = to.path;
    });

    onMounted(() => {
      window.addEventListener('resize', updateWindowWidth);
    });

    onUnmounted(() => {
      window.removeEventListener('resize', updateWindowWidth);
    });

    watchEffect(() => {
      if (isMobile.value) {
        document.body.style.paddingLeft = '';
      } else {
        document.body.style.paddingLeft = '81px';
      }
    });

    return {
      toggleDark,
      isMobile,
      currentPage,
      navigateTo,
    };
  },
};
</script>
