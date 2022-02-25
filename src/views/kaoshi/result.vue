<!-- 结算页面 -->
<template>
    <div class="main">
        我的成绩为：{{ score }}
        <div>
            解释说明：
            <div
                style="margin-bottom: 15px"
                v-for="(item, index) in explainArr"
            >第{{ index + 1 }}题：{{ item }}</div>
        </div>
    </div>
</template>

<script lang="ts" setup>import { onMounted, ref } from 'vue'
import { getScore } from "../../api/api"

const score = ref<number>(0)
const flag = ref<boolean>(true)
let explainArr = ref<string[]>([])
const paperId = window.sessionStorage.getItem('anwserPaperId')
const userId = JSON.parse((window.sessionStorage.getItem('userInfo') as string)).userId

async function getResult() {
    const data = {
        userId: parseInt(userId),
        paperId: paperId ? parseInt(paperId) : 0
    }
    const res = await getScore(data)
    score.value = res.data.score
    explainArr.value = res.data.arr
}
onMounted(() => {
    getResult()
})

</script>

<style lang="less" scoped>
.main {
    padding-left: 10px;
}
</style>