<template>
    <div class="mdui-prose max-w-3xl m-auto">
        <h1>好感度查询</h1>
        <p>您可以在此查询一系列信息，包括但不限于「排名」、「好感度」、「等级」。</p>
        <mdui-divider></mdui-divider>
        <div class="grid grid-cols-2 gap-4 pt-5 pb-5">
             <mdui-text-field label="ID" placeholder="114514" clearable><mdui-icon-numbers
             slot="icon"></mdui-icon-numbers></mdui-text-field>
             <mdui-text-field label="角色名" placeholder="日富美" clearable><mdui-icon-account-circle
                    slot="icon"></mdui-icon-account-circle></mdui-text-field>
            <mdui-select placeholder="排序方式">
                <mdui-icon-filter-list slot="icon"></mdui-icon-filter-list>
                <mdui-menu-item value="rank">排名</mdui-menu-item>
                <mdui-menu-item value="favorability">好感度</mdui-menu-item>
                <mdui-menu-item value="level">等级</mdui-menu-item>
            </mdui-select>
        </div>
        <mdui-button full-width><mdui-icon-search slot="icon"></mdui-icon-search>搜索</mdui-button>
    </div>
</template>

<script setup lang="ts">
import 'mdui/components/text-field.js';
import 'mdui/components/select.js';
import 'mdui/components/menu-item.js';
import 'mdui/components/button.js';
import '@mdui/icons/account-circle.js';
import '@mdui/icons/filter-list.js';
import '@mdui/icons/search.js';
import '@mdui/icons/numbers.js';
import { useTitle } from '@vueuse/core';

useTitle("好感度面板 - 阿罗娜小助手")
</script>