<template>
    <div class="grid grid-cols-2 gap-4 pt-5 pb-5">
        <mdui-text-field v-if="token" label="ID" @input="searchUID = $event.target.value" placeholder="815797"
            clearable><mdui-icon-numbers slot="icon"></mdui-icon-numbers></mdui-text-field>
        <mdui-text-field v-if="token" label="角色名" @input="searchStudent = $event.target.value" placeholder="爱丽丝"
            clearable><mdui-icon-account-circle slot="icon"></mdui-icon-account-circle></mdui-text-field>
        <mdui-text-field label="页码" type="number" @input="currentPage = $event.target.value" :value="currentPage"
            min="1" :max="total_pages" minlength="1" required>
            <mdui-icon-menu-book slot="icon"></mdui-icon-menu-book>
            <span slot="suffix" class="text-nowrap">/ {{ total_pages }}</span>
        </mdui-text-field>
        <mdui-checkbox @change="reverse = $event.target.checked" :checked="reverse">倒序排序</mdui-checkbox>
    </div>
    <mdui-button full-width @click="queryRank" :disabled="queryButtonDisabled"
        :loading="queryButtonDisabled"><mdui-icon-search slot="icon"></mdui-icon-search>搜索</mdui-button>
    <h2>排行榜</h2>
    <div class="text-center mt-5 h-xl" v-if="isRankFetchedFailed">
        <h3>获取排行榜数据失败</h3>
        <p>或许可以重试一下捏？</p>
        <mdui-button variant="elevated" @click="queryRank" :disabled="queryButtonDisabled"
            :loading="queryButtonDisabled"><mdui-icon-search slot="icon"></mdui-icon-search>重新搜索</mdui-button>
    </div>
    <div v-else-if="isRankFetched" class="text-center">
        <div class="mdui-table mdui-prose max-w-3xl m-auto mt-5">
            <table>
                <thead>
                    <tr>
                        <th>排名</th>
                        <th>UID</th>
                        <td>头像</td>
                        <th>昵称</th>
                        <th>学生</th>
                        <th>好感度经验</th>
                        <th>好感度等级</th>
                    </tr>
                </thead>
                <tbody>
                    <tr v-for="item in data" :key="item.uid">
                        <td>{{ item.rank }}</td>
                        <td>{{ item.uid }}</td>
                        <td class="align-middle"><mdui-avatar :src="`${apiRoot}/account/avatar?uid=${item.uid}`"
                                fit="scale-down" label="User Avatar"></mdui-avatar></td>
                        <td>{{ item.nick }}</td>
                        <td>{{ item.stu }}</td>
                        <td>{{ item.level }}</td>
                        <td>{{ item.grade }}</td>
                    </tr>
                </tbody>
            </table>
        </div>
        <p>第 {{ currentPage }} 页，共 {{ total_pages }} 页</p>
        <p>若要翻页，请回到顶部</p>
    </div>
    <div class="text-center mt-5 h-xl" v-else>
        <h3>正在获取数据</h3>
        <p>别着急，坐和放宽</p>
        <mdui-linear-progress></mdui-linear-progress>
    </div>
</template>

<script setup lang="ts">
import 'mdui/components/avatar.js';
import 'mdui/components/checkbox.js';
import 'mdui/components/linear-progress.js';
import 'mdui/components/text-field.js';
import 'mdui/components/button.js';
import '@mdui/icons/account-circle.js';
import '@mdui/icons/numbers.js';
import '@mdui/icons/filter-list.js';
import '@mdui/icons/search.js';
import '@mdui/icons/menu-book.js';
import '@mdui/icons/people-alt.js';
import { ref, onMounted } from 'vue';
import { snackbar } from 'mdui/functions/snackbar.js'
import { useCookies } from '@vueuse/integrations/useCookies.mjs';
import axios from 'axios';

interface DataItem {
    rank: number;
    uid: string;
    nick: string;
    stu: any[]; // 根据您的需求，这里可以进一步定义数组内部的类型
    level: number;
    grade: number;
}

const data = ref<DataItem[]>([]);
const searchUID = ref('');
const searchStudent = ref('');
const currentPage = ref(1);
const numPerPage = ref(10);
const reverse = ref(false);
let isRankFetched = ref(false);
let isRankFetchedFailed = ref(false);
const queryButtonDisabled = ref(false);
const apiRoot = import.meta.env.VITE_API_ROOT
const total_pages = ref(0)

const cookies = useCookies(['token']);
const token = cookies.get('token');

const fetchData = async () => {
    try {
        const response = await axios.get(`${apiRoot}/favor`, {
            params: {
                uid: searchUID.value,
                char: searchStudent.value,
                page: currentPage.value,
                num: numPerPage.value,
                reverse: reverse.value,
            },
        });
        if (response.data.status === 200) {
            data.value = response.data.data?.data;
            total_pages.value = response.data.data?.total_page;
            isRankFetched.value = true
            queryButtonDisabled.value = false
            isRankFetchedFailed.value = false
        }
    } catch (error) {
        queryButtonDisabled.value = false
        isRankFetchedFailed.value = true
        console.error('获取排行榜数据失败，错误信息：', error);
        snackbar({
            message: '获取排行榜数据失败，请检查网络连接',
            closeable: true,
        })
    }
};

const queryRank = async () => {
    try {
        isRankFetched.value = false
        queryButtonDisabled.value = true
        fetchData()
    } catch (error) {
        queryButtonDisabled.value = false
        isRankFetchedFailed.value = true
        console.error('获取排行榜数据失败，错误信息：', error)
        snackbar({
            message: '获取排行榜数据失败，请检查网络连接',
            closeable: true,
        })
    }
}

const checkLogin = async () => {
    // TODO
    queryRank()
}

onMounted(async () => {
    checkLogin()
}
);
</script>
