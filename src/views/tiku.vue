<template>
    <div class="main">
        <n-card>
            <div class="typeTitle">
                选择题：
                <n-button size="tiny" @click="addTiMu(1)">添加题目</n-button>
            </div>
            <div v-for="(item, index) in arr1">
                <div>{{ index + 1 }}. 题目：{{ item.stem }} (id：{{ item.id }})</div>
                <div>/选项：A.{{ item.selectArr[0] }} B.{{ item.selectArr[1] }} C.{{ item.selectArr[2] }} D.{{ item.selectArr[3] }}</div>
                <div>/答案：{{ abcdArr[parseInt(item.anwser)] }}.{{ item.selectArr[parseInt(item.anwser)] }}</div>
            </div>
        </n-card>
        <n-card>
            <div class="typeTitle">
                判断题：
                <n-button size="tiny" @click="addTiMu(2)">添加题目</n-button>
            </div>
            <div v-for="(item, index) in arr2">
                <div>{{ index + 1 }}. 题目：{{ item.stem }} (id：{{ item.id }})</div>
                <div>/答案：{{ item.anwser == "0" ? "对" : "错" }}</div>
            </div>
        </n-card>
        <n-card>
            <div class="typeTitle">
                填空题：
                <n-button size="tiny" @click="addTiMu(3)">添加题目</n-button>
            </div>
            <div v-for="(item, index) in arr3">
                <div>{{ index + 1 }}. 题目：{{ item.stem }} (id：{{ item.id }})</div>
                <div>/答案：{{ item.anwser }}</div>
            </div>
        </n-card>
        <n-card>
            <div class="typeTitle">
                问答题：
                <n-button size="tiny" @click="addTiMu(4)">添加题目</n-button>
            </div>
            <div v-for="(item, index) in arr4">
                <div>{{ index + 1 }}. 题目：{{ item.stem }} (id：{{ item.id }})</div>
                <div>/答案：{{ item.anwser }}</div>
            </div>
        </n-card>
        <n-card>
            <div class="typeTitle">
                互动题：
            </div>
            <div v-for="(item, index) in arr5">
                <div>{{ index + 1 }}. 题目：{{ item.stem }} (id：{{ item.id }})</div>
                <div>/规则：{{ item.anwser }}</div>
            </div>
        </n-card>
        <n-card>
            <div class="typeTitle">
                试卷列表：
                <n-button class="btn_bottom" size="tiny" @click="openAddModel()">新增考卷</n-button>
            </div>
            <div style="padding: 5px 0" v-for="item in paperArr">
                {{ item.id }}、{{ item.paperName }}：{{ item.stemArr }}
                <n-button
                    size="tiny"
                    style="margin-right: 8px"
                    @click="openEditModel(item.id, item.paperName)"
                >编辑</n-button>
                <n-popconfirm @positive-click="deleteMe(item.id)" @negative-click="cancelDelete">
                    <template #trigger>
                        <n-button size="tiny">删除</n-button>
                    </template>
                    你确定删除该试卷吗？
                </n-popconfirm>
            </div>
        </n-card>
    </div>
    <n-modal v-model:show="showModal" :mask-closable="false">
        <n-card
            style="width: 600px"
            :title="title"
            :bordered="false"
            size="huge"
            role="dialog"
            aria-modal="true"
        >
            <div class="modelTop">
                <div style="width: 20%">试卷名称：</div>
                <n-input v-model:value="paperName" type="text" maxlength="30" clearable></n-input>
            </div>
            <n-transfer
                ref="transfer"
                source-title="题库"
                target-title="试卷题目"
                v-model:value="value"
                :options="options"
                size="large"
            />
            <div class="modelFooter">
                <n-button @click="updateMe(title)">{{ title === "编辑试卷" ? "编辑试卷" : "新增试卷" }}</n-button>
                <n-button @click="showModal = false">关闭</n-button>
            </div>
        </n-card>
    </n-modal>
    <n-button class="btn_bottom" size="small" @click="goUserInfo()">返回</n-button>
    <n-modal v-model:show="addModel" :mask-closable="false">
        <n-card style="width: 600px" :bordered="false" size="huge" role="dialog" aria-modal="true">
            <AddPage v-model:obj="addObj"></AddPage>
            <div class="modelFooter">
                <n-button @click="submitAddTiMU()">确定</n-button>
                <n-button @click="addModel = false">关闭</n-button>
            </div>
        </n-card>
    </n-modal>
</template>

<script lang="ts" setup>
import { ref, reactive, onMounted } from 'vue'
import AddPage from './addpage.vue'
import { NButton, NCard, NModal, NTransfer, NInput, NPopconfirm, useMessage } from 'naive-ui'
import { getList, paperList, updatePaper, addPaper, deletePaper, addSubject } from "../api/api"
import router from '@/router'
import { PaperDataList, OptionsList, DataList, AddObjType } from './tiku'

const message = useMessage()
const abcdArr = ref<Array<string>>(["A", "B", "C", "D"])
const arr1 = ref<Array<any>>([])
const arr2 = ref<Array<any>>([])
const arr3 = ref<Array<any>>([])
const arr4 = ref<Array<any>>([])
const arr5 = ref<Array<any>>([])
const showModal = ref<boolean>(false)
const addModel = ref<boolean>(false)
let title = ref<string>("")
let updateId: number | null = null
let paperArr = ref<PaperDataList[]>([])
let options = reactive<OptionsList[]>([])
let dataArr = reactive<DataList[]>([])
let value = ref<number[]>()
let paperName = ref<string>("")
let addObj = reactive<AddObjType>({
    url: "",
    stem: "",
    type: 0,
    selectArr: ["", "", "", ""],
    anwser: "",
    remark: "",
})

async function getData() {
    arr1.value = []
    arr2.value = []
    arr3.value = []
    arr4.value = []
    arr5.value = []
    const data = await getList()
    if (data.data.code == 200) {
        const arr = [arr1, arr2, arr3, arr4, arr5]
        Object.assign(dataArr, data.data.rows)
        data.data.rows.forEach((item: { type: number }) => {
            arr[item.type - 1].value.push(item)
        })
    }
}

async function getPaperList() {
    const data = await paperList()
    paperArr.value = data.data.rows
}

function openEditModel(id: number, name: string) {
    title.value = "编辑试卷"
    paperName.value = name
    updateId = id
    showModal.value = true
    options.length = 0
    dataArr.forEach(item => {
        options.push({
            label: item.id.toString() + "." + (item.stem.length >= 6) ? (item.stem.substring(0, 6) + "...") : item.stem,
            value: item.id,
            disabled: false
        })
    })
    let arr = JSON.parse(JSON.stringify(createValues(paperArr.value.find(item => item.id === id)?.stemArr)))
    value.value = arr.reverse()
}

function createValues(arr: any) {
    return arr.map((v: number, i: number) => v)
}

async function updateMe(title: string) {
    let arr = JSON.parse(JSON.stringify(value.value))
    if (title === "编辑试卷") {
        const data = {
            id: updateId,
            paperName: paperName.value,
            arr: arr?.reverse()
        }
        const res = await updatePaper(data)
        if (res.data.code == 200) {
            message.success(res.data.msg)
            getPaperList()
        }
    } else {
        if(!paperName.value) {
            message.error("试卷名称不能为空！")
            return false
        }
        if(arr.length === 0) {
            message.error("试卷题目不能为空！")
            return false
        }
        const data = {
            paperName: paperName.value,
            arr: arr?.reverse()
        }
        const res = await addPaper(data)
        if (res.data.code == 200) {
            message.success(res.data.msg)
            getPaperList()
        }
    }
    showModal.value = false
}

function goUserInfo() {
    router.push({ path: "/userInfo" })
}

function openAddModel() {
    title.value = "新增试卷"
    paperName.value = ""
    showModal.value = true
    options.length = 0
    dataArr.forEach(item => {
        options.push({
            label: item.id.toString() + "." + item.stem.substring(0, 6) + "...",
            value: item.id,
            disabled: false
        })
    })
    value.value = []
}

async function deleteMe(id: number) {
    const res = await deletePaper({ id: id })
    if (res.data.code == 200) {
        message.success(res.data.msg)
        getPaperList()
    } else {
        message.error('删除失败')
    }
}
function cancelDelete() {
    message.info('取消删除')
}

function addTiMu(type: number) {
    addObj.type = type
    addModel.value = true
}

async function submitAddTiMU() {
    if (addObj.type == 1) {
        if (addObj.anwser === "A" || addObj.anwser === "a") {
            addObj.anwser = "0"
        } else if (addObj.anwser === "B" || addObj.anwser === "b") {
            addObj.anwser = "1"
        } else if (addObj.anwser === "C" || addObj.anwser === "c") {
            addObj.anwser = "2"
        } else if (addObj.anwser === "D" || addObj.anwser === "d") {
            addObj.anwser = "3"
        }
    } else if (addObj.type == 2) {
        if (addObj.anwser === "对") {
            addObj.anwser = "0"
        } else if (addObj.anwser === "错") {
            addObj.anwser = "1"
        }
        addObj.selectArr = []
    }
    const res = await addSubject(addObj)
    if (res.data.code == 200) {
        message.success(res.data.msg)
        getData()
        getPaperList()
        addModel.value = false
    }
}

onMounted(() => {
    getData()
    getPaperList()
})

</script>

<style scoped lang="less">
.main {
    display: flex;
    justify-content: flex-start;
    flex-direction: column;
    flex-wrap: wrap;
    row-gap: 10px;
    .typeTitle {
        font-size: 18px;
        font-weight: 600;
    }
}
.modelTop {
    display: flex;
    justify-content: flex-start;
    align-items: center;
    padding: 10px 0;
}
.modelFooter {
    padding: 10px 0;
    display: flex;
    justify-content: space-between;
}
.btn_bottom {
    margin: 10px;
}
</style>