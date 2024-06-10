<template>
    <div class="grid grid-cols-2 gap-4 pt-5 pb-5">
        <!--<mdui-text-field label="ID" placeholder="114514" clearable><mdui-icon-numbers
                slot="icon"></mdui-icon-numbers></mdui-text-field>
        <mdui-text-field label="角色名" placeholder="日富美" clearable><mdui-icon-account-circle
                slot="icon"></mdui-icon-account-circle></mdui-text-field> -->
        <mdui-text-field label="页码" type="number" @input="currentPage = $event.target.value" :value="currentPage"
            min="1" :max="total_pages" minlength="1" required>
            <mdui-icon-menu-book slot="icon"></mdui-icon-menu-book>
            <span slot="suffix" class="text-nowrap">/ {{ total_pages }}</span>
        </mdui-text-field>
        <mdui-checkbox @input="reverse = $event.target.value" :checked="reverse">倒序排序</mdui-checkbox>
    </div>
    <mdui-button full-width @click="queryRank" :disabled="queryButtonDisabled"><mdui-icon-search slot="icon"></mdui-icon-search>搜索</mdui-button>
    <h2>排行榜</h2>
    <div class="mdui-table mdui-prose max-w-3xl m-auto mt-5" v-if="isRankFetched">
        <table>
            <thead>
                <tr>
                    <th>UID</th>
                    <th>昵称</th>
                    <th>学生</th>
                    <th>好感度经验</th>
                    <th>好感度等级</th>
                </tr>
            </thead>
            <tbody>
                <tr v-for="item in data" :key="item.uid">
                    <td>{{ item.uid }}</td>
                    <td>{{ item.nick }}</td>
                    <td>{{ item.stu }}</td>
                    <td>{{ item.level }}</td>
                    <td>{{ item.grade }}</td>
                </tr>
            </tbody>
        </table>
    </div>
    <div class="text-center mt-5 h-xl" v-else>
        <h3>正在获取数据</h3>
        <p>别着急，坐和放宽</p>
        <mdui-linear-progress></mdui-linear-progress>
    </div>
</template>

<script setup lang="ts">
import 'mdui/components/checkbox.js';
import 'mdui/components/linear-progress.js';
import 'mdui/components/text-field.js';
import 'mdui/components/button.js';
import '@mdui/icons/account-circle.js';
import '@mdui/icons/numbers.js';
import '@mdui/icons/filter-list.js';
import '@mdui/icons/search.js';
import '@mdui/icons/menu-book.js';
import { ref, onMounted, computed } from 'vue';
import { snackbar } from 'mdui/functions/snackbar.js'
import axios from 'axios';

const data = ref([]);
const currentPage = ref(1);
const numPerPage = ref(10);
const reverse = ref(false);
let isRankFetched = ref(false);
const queryButtonDisabled = ref(false);
const apiRoot = import.meta.env.VITE_API_ROOT
const total_pages = ref(0)

const fetchData = async () => {
    try {
        const response = await axios.get(`${apiRoot}/favor`, {
            params: {
                page: currentPage.value,
                num: numPerPage.value,
                reverse: reverse.value,
            },
        });
        if (response.data.status === 200) {
            console.log(`total page => ${response.data.data?.total_page} / total count => ${response.data.data?.total_count}`)
            data.value = response.data.data?.data;
            total_pages.value = response.data.data?.total_page;
            isRankFetched.value = true
        }
    } catch (error) {
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
        fetchData()
    } catch (error) {
        console.error('获取排行榜数据失败，错误信息：', error)
    }
}

onMounted(fetchData);
</script>