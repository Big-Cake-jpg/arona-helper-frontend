<template>
    <mdui-navigation-rail :value="value" divider>
        <mdui-avatar src="/icon.png" slot="top"></mdui-avatar>
        <mdui-fab lowered slot="top" href="/auth/login"><mdui-icon-login slot="icon"></mdui-icon-login></mdui-fab>
        <mdui-navigation-rail-item href="/" value="home"><mdui-icon-home
                slot="active-icon"></mdui-icon-home><mdui-icon-home--outlined slot="icon"
                alt="首页"></mdui-icon-home--outlined>首页</mdui-navigation-rail-item>
        <mdui-navigation-rail-item href="/favorability" value="favorability"><mdui-icon-favorite
                slot="active-icon"></mdui-icon-favorite><mdui-icon-favorite-border
                slot="icon"></mdui-icon-favorite-border>好感度</mdui-navigation-rail-item>
        <mdui-button-icon @click="toggleDark()" slot="bottom" alt="切换模式"><mdui-icon-brightness-6></mdui-icon-brightness-6></mdui-button-icon>
        <mdui-button-icon slot="bottom" alt="设置"><mdui-icon-settings></mdui-icon-settings></mdui-button-icon>
    </mdui-navigation-rail>
</template>

<script lang="ts">
import 'mdui/components/navigation-rail.js';
import 'mdui/components/navigation-rail-item.js';
import 'mdui/components/button-icon.js';
import 'mdui/components/fab.js';

import '@mdui/icons/home--outlined.js';
import '@mdui/icons/home.js';
import '@mdui/icons/settings.js';
import '@mdui/icons/menu.js';
import '@mdui/icons/login.js';
import '@mdui/icons/brightness-6.js';
import '@mdui/icons/favorite-border.js';
import '@mdui/icons/favorite.js';

import { setTheme } from 'mdui/functions/setTheme.js';
import { useDark } from "@vueuse/core";
import { useToggle } from "@vueuse/shared";

export default {
  setup() {
    const isDark = useDark({
      onChanged(dark: boolean) {
        if (typeof document !== 'undefined')
          setTheme(dark ? "dark" : "light");
      },
    });
    const toggleDark = useToggle(isDark);

    return {
      toggleDark,
    };
  },
};
</script>