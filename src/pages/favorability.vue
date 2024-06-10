<template>
    <div class="mdui-prose max-w-3xl m-auto">
        <h1>好感度查询</h1>
        <h2>说明</h2>
        <blockquote>字如其意，看看你和哪个学生最亲密呢？<br /><del>我不管 爱丽丝万岁~\(≧▽≦)/~</del></blockquote>
        <p>可以在这里查看各个学生的好感度以及所有用户的好感度排名……</p>
        <p>如果没有登录，默认显示全局排行榜；若登录了账号，那么此处将默认只显示自己的好感度排行榜。</p>
        <blockquote>别催了别催了，在写了，先让我急（（（</blockquote>
        <blockquote>登录相关的东西还没做，还有些小问题，不过最起码能查询全局排行榜了。</blockquote>
        <mdui-divider></mdui-divider>
        <RankTable />
    </div>
    
</template>

<script setup lang="ts">
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