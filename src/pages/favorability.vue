<template>
    <div class="mdui-prose max-w-3xl m-auto">
        <h1>好感度查询</h1>
        <blockquote>字如其意，看看你和哪个学生最亲密呢？<br /><del>我不管 爱丽丝万岁~\(≧▽≦)/~</del></blockquote>
        <p>可以在这里查看各个学生的好感度以及所有用户的好感度排名……</p>
        <p>如果没有登录，默认显示全局排行榜；若登录了账号，那么此处将默认显示你已拥有的学生的好感度排行榜。</p>
        <blockquote>别催了别催了，在写了，先让我急（（（</blockquote>
        <mdui-divider></mdui-divider>
        <div class="grid grid-cols-2 gap-4 pt-5 pb-5">
            <mdui-text-field label="ID" placeholder="114514" clearable><mdui-icon-numbers
                    slot="icon"></mdui-icon-numbers></mdui-text-field>
            <mdui-text-field label="角色名" placeholder="日富美" clearable><mdui-icon-account-circle
                    slot="icon"></mdui-icon-account-circle></mdui-text-field>
            <mdui-select placeholder="排序方式">
                <mdui-icon-filter-list slot="icon"></mdui-icon-filter-list>
                <mdui-menu-item value="favorability"><mdui-icon-keyboard-double-arrow-down
                        slot="icon"></mdui-icon-keyboard-double-arrow-down>正序</mdui-menu-item>
                <mdui-menu-item value="level"><mdui-icon-keyboard-double-arrow-up
                        slot="icon"></mdui-icon-keyboard-double-arrow-up>倒序</mdui-menu-item>
            </mdui-select>
        </div>
        <mdui-button full-width><mdui-icon-search slot="icon"></mdui-icon-search>搜索</mdui-button>
    </div>
    <div class="mdui-table mdui-prose max-w-3xl m-auto mt-5">
        <table>
            <thead>
                <tr>
                    <th>排名</th>
                    <th>角色名</th>
                    <th>好感度</th>
                    <th>等级</th>
                </tr>
            </thead>
            <tbody>
                <tr>
                    <td>1</td>
                    <td>日富美</td>
                    <td>100</td>
                    <td>10</td>
                </tr>
                <tr>
                    <td>2</td>
                    <td>爱丽丝</td>
                    <td>99</td>
                    <td>9</td>
                </tr>
                <tr>
                    <td>3</td>
                    <td>莉莉娅</td>
                    <td>98</td>
                    <td>8</td>
                </tr>
            </tbody>
        </table>
    </div>
</template>

<script setup lang="ts">
import 'mdui/components/text-field.js';
import 'mdui/components/select.js';
import 'mdui/components/menu-item.js';
import 'mdui/components/button.js';
import '@mdui/icons/account-circle.js';
import '@mdui/icons/numbers.js';
import '@mdui/icons/filter-list.js';
import '@mdui/icons/search.js';
import '@mdui/icons/keyboard-double-arrow-up.js';
import '@mdui/icons/keyboard-double-arrow-down.js';
import { useTitle } from '@vueuse/core';
import { useSeoMeta } from '@unhead/vue';

useSeoMeta({
    title: '好感度面板 - 阿罗娜小助手',
    description: '字如其意，看看你和哪个学生最亲密呢？',
    ogDescription: '字如其意，看看你和哪个学生最亲密呢？',
    ogTitle: '首页 - 阿罗娜小助手',
    ogImage: 'https://arona.lihaoyu.cn/icon.webp',
    // twitterCard: 'summary_large_image',
})

useTitle("好感度面板 - 阿罗娜小助手")
</script>