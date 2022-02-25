<template>
    <div class="main">
        <div class="main_top">
            <div>试卷名称：</div>
            <p>{{ titleName }}</p>
            <n-button size="small" class="btn_submit" @click="submitMe()">交卷</n-button>
        </div>
        <div class="center main_center">
            <div class="main_center_left">
                <n-button size="small" @click="reduce">上一题</n-button>
            </div>
            <div v-if="flag" class="main_center_content">
                <component
                    v-if="dataArr.length > 0"
                    v-model:obj="dataArr[index]"
                    :is="getComponent(dataArr[index].type)"
                ></component>
            </div>
            <div class="main_center_right">
                <n-button size="small" @click="add">下一题</n-button>
            </div>
        </div>

        <div class="main_bottom">
            <div>逢考必过：考的都会，蒙的都对</div>
        </div>
    </div>
</template>

<script lang="ts" setup>
import { ref, reactive, onMounted, nextTick } from 'vue'
import { NButton } from 'naive-ui'
import Tixing1 from './tixing/tixing1.vue'
import Tixing2 from './tixing/tixing2.vue'
import Tixing3 from './tixing/tixing3.vue'
import Tixing4 from './tixing/tixing4.vue'
import Tixing5 from './tixing/tixing5.vue'
import router from '@/router'
import { getPaper, updateUserPaper } from "../../api/api"
import { dataList } from './kaoshi'

const index = ref<number>(0)
const paperId = ref<string | number>(window.sessionStorage.getItem('paperId') as string)
const dataArr = ref<dataList[]>([])
const titleName = ref<string>("")
const flag = ref<boolean>(true)

async function getData(id: number | string) {
    const data = await getPaper({ id: id })
    titleName.value = data.data.paperName
    dataArr.value = data.data.rows.map((item: dataList, index: number) => {
        item.anwser = ""
        item.index = index + 1
        return item
    })
}
getData(paperId.value)

async function submitMe() {
    const userId = JSON.parse(sessionStorage.getItem("userInfo")  as string).userId
    const data = { dataArr: JSON.stringify(dataArr.value), paperId: paperId.value, userId: userId }
    let res = await updateUserPaper(data)
    if(res.data.code == 200){
        router.push({ path: "/userInfo" })
    }
}

function getComponent(type: number) {
    const arr = [Tixing1, Tixing2, Tixing3, Tixing4, Tixing5]
    return arr[type - 1]
}

function reduce() {
    if (index.value > 0) {
        flag.value = false
        index.value--
        nextTick(() => {
            flag.value = true
        })  
    }
}

function add() {
    if (index.value < dataArr.value.length - 1) {
        flag.value = false
        index.value++
        nextTick(() => {
            flag.value = true
        })     
    }
}

</script>

<style scoped lang="less">
.main {
    flex: 1;
    width: 100%;
    height: 100%;
    display: flex;
    justify-content: space-between;
    flex-direction: column;
    row-gap: 20px;
    padding: 10px;
    .main_top {
        display: flex;
        justify-content: space-between;
        align-items: center;
    }
    .main_center {
        display: flex;
        justify-content: space-between;
        align-items: center;
        .main_center_left,
        .main_center_right {
            display: flex;
            justify-content: center;
            width: 80px;
        }
        .main_center_content {
            margin: 0 10px;
        }
    }
    .main_bottom {
        font-size: 12px;
        display: flex;
        justify-content: center;
        align-items: center;
        flex-wrap: wrap;
        flex-direction: column;
    }
}
</style>