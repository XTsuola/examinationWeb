<template>
    <div class="title">
        <n-button
            v-if="_id === '61dfbac47076000085006144'"
            size="small"
            @click="openAddStudent()"
        >新增考生</n-button>
    </div>
    <n-card title="学生信息">
        <n-data-table :columns="(columnsStudent as any)" :data="tableDataStudent" />
    </n-card>
    <n-card title="题库试卷" v-if="flag">
        <n-data-table :columns="(columnsPaper as any)" :data="tableDataPaper" />
    </n-card>
    <n-card v-else>
        <div style="display: flex;justify-content: space-between;margin-bottom: 15px;">
            <div style="font-size: 18px;">{{ studentPaperTitle }}的考卷</div>
            <n-button @click="closeDetail">关闭详情</n-button>
        </div>
        <n-data-table :columns="(columnsStundentPaper as any)" :data="tableStudentPaper" />
    </n-card>
    <n-button class="btn_bottom" size="small" @click="goUserInfo()">返回</n-button>
    <n-modal v-model:show="showModal" :mask-closable="false">
        <n-card
            style="width: 600px"
            title="添加考卷"
            :bordered="false"
            size="huge"
            role="dialog"
            aria-modal="true"
        >
            <n-transfer
                ref="transfer"
                source-title="试卷库"
                target-title="添加的试卷"
                v-model:value="value"
                :options="options"
                size="large"
            />
            <div class="modelFooter">
                <n-button @click="addMe()">新增试卷</n-button>
                <n-button @click="showModal = false">关闭</n-button>
            </div>
        </n-card>
    </n-modal>
    <n-modal v-model:show="addModal" :mask-closable="false">
        <n-card
            style="width: 600px"
            title="新增考生"
            :bordered="false"
            size="huge"
            role="dialog"
            aria-modal="true"
        >
            <n-form :label-width="80" :model="formValue" :rules="rules" size="medium" ref="formRef">
                <n-form-item label="账号" path="account">
                    <n-input v-model:value="formValue.account" placeholder="输入账号" />
                </n-form-item>
                <n-form-item label="密码" path="password">
                    <n-input v-model:value="formValue.password" placeholder="输入密码" />
                </n-form-item>
                <n-form-item label="姓名" path="name">
                    <n-input v-model:value="formValue.name" placeholder="输入姓名" />
                </n-form-item>
                <n-form-item label="年龄" path="age">
                    <n-input v-model:value="formValue.age" placeholder="输入年龄" />
                </n-form-item>
                <n-form-item label="电话号码" path="phone">
                    <n-input v-model:value="formValue.phone" placeholder="电话号码" />
                </n-form-item>
                <n-form-item label="备注" path="remark">
                    <n-input v-model:value="formValue.remark" placeholder="输入备注" />
                </n-form-item>
                <!-- <n-form-item>
                    <n-button @click="handleValidateClick" attr-type="button">验证</n-button>
                </n-form-item>-->
            </n-form>
            <div class="modelFooter">
                <n-button @click="addme2()">{{ nameType === "新增" ? "新增" : "修改" }}</n-button>
                <n-button @click="addModal = false">关闭</n-button>
            </div>
        </n-card>
    </n-modal>
</template>

<script lang="ts" setup>
import { ref, reactive, h } from 'vue'
import { NDataTable, NCard, NButton, NModal, NTransfer, useMessage, NForm, NFormItem, NInput, NPopconfirm } from 'naive-ui'
import { studentsPaperList, paperList, getUserPaper, getOtherPaper, addUserPaper, addStudent, updateStudent, deleteReport } from "../api/api"
import router from '@/router'
import { PaperTableItem, optionsList, PaperDataList, ReportType, itemType, StudentTableItem, StundentDataList, PaperType, StudentInfo, Paper, StudentPaperItem } from './students'

const studentPaperTitle = ref<string>("")
const flag = ref<boolean>(true)
const message = useMessage()
const userId = ref<number>(0)
const _id = ref<string>(JSON.parse(window.sessionStorage.getItem('userInfo') as string)._id)
const columnsStudent = ref([
    {
        title: '账号',
        key: 'account',
        align: 'center',
    },
    {
        title: '密码',
        key: 'password',
        align: 'center',
    },
    {
        title: '姓名',
        key: 'name',
        align: 'center',
    },
    {
        title: '年龄',
        key: 'age',
        align: 'center',
    },
    {
        title: '联系方式',
        key: 'phone',
        align: 'center',
        //width: 180
    },
    {
        title: '拥有试卷',
        key: 'paperStr',
        align: 'left'
    },
    {
        title: '操作',
        key: 'actions',
        render(row: any) {
            const nameList = ["修改信息", "添加考卷", "详情"]
            const btns = nameList.map((item) => {
                return h(
                    NButton,
                    {
                        style: {
                            marginRight: '6px'
                        },
                        size: 'small',
                        onClick: () => openView(item, row),
                    },
                    {
                        default: () => item
                    }
                )
            })
            return btns
        }
    }
])
const tableDataStudent = ref<StudentTableItem[]>([{
    id: 0,
    account: "",
    password: "",
    name: "",
    age: 0,
    phone: "",
    
    paperList: [],
    paperStr: ""
}])
const columnsPaper = ref([
    {
        title: '试卷ID',
        key: 'id',
        align: 'center',
        width: 100
    },
    {
        title: '试卷名称',
        key: 'paperName',
        align: 'center'
    }
])
const tableDataPaper = ref<PaperTableItem[]>([{
    id: 0,
    paperName: ""
}])
const columnsStundentPaper = ref([
    {
        title: '名称',
        key: 'paperName',
        align: 'center'
    },
    {
        title: '分数',
        key: 'score',
        align: 'center'
    },
    {
        title: '操作',
        key: 'actions',
        render(row: any) {
            return h(
                NPopconfirm,
                {
                    onPositiveClick: () => deletePaper(row)
                },
                {
                    default: () => "确定要删除吗？",
                    trigger: () => h(NButton, {
                        size: 'small',
                    }, { default: () => "删除" })
                }
            )
        }
    }
])
const tableStudentPaper = ref<StudentPaperItem[]>([{
    id: "",
    userId: 0,
    paperId: 0,
    paperName: "",
    score: ""
}])
const showModal = ref<boolean>(false)
let options = reactive<optionsList[]>([])
const value = ref<number[]>()
const addModal = ref<boolean>(false)
const formRef = ref()
const formValue = reactive<StudentInfo>({
    account: "",
    password: "",
    name: "",
    age: "",
    phone: "",
    remark: ""
})
const rules = {
    account: {
        required: true,
        message: '请输入账号',
        trigger: ['input', 'blur']
    },
    password: {
        required: true,
        message: '请输入密码',
        trigger: ['input', 'blur']
    },
    name: {
        required: true,
        message: '请输入姓名',
        trigger: ['input', 'blur']
    },
    age: {
        required: true,
        message: '请输入年龄',
        trigger: ['input', 'blur']
    }
}
const nameType = ref<string>("")

async function getStudentsPaper() {
    const res = await studentsPaperList()
    tableDataStudent.value = res.data.rows.map((item: StundentDataList) => {
        let paperList: Paper[] = []
        const paperStr = item.paperList.map((item2: PaperType) => {
            paperList.push({
                paperId: item2.paperId,
                paperName: item2.paperName
            })
            return `(ID:${item2.paperId})${item2.paperName}`
        }).join(",")
        return {
            userId: item.id,
            account: item.account,
            password: item.password,
            name: item.name,
            age: item.age.toString(),
            phone: item.phone,
            remark: item.remark,
            paperList: paperList,
            paperStr: paperStr
        }
    })
}
getStudentsPaper()

async function getPaperList() {
    const res = await paperList()
    tableDataPaper.value = res.data.rows.map((item: PaperDataList) => {
        return {
            id: item.id,
            paperName: item.paperName
        }
    })
}
getPaperList()

async function openView(item: string, rowData: any) {
    if (item === "修改信息") {
        addModal.value = true
        nameType.value = "修改"
        userId.value = rowData.userId
        formValue.account = rowData.account
        formValue.password = rowData.password
        formValue.name = rowData.name
        formValue.age = rowData.age
        formValue.phone = rowData.phone
        formValue.remark = rowData.remark
    } else if (item === "添加考卷") {
        const data = {
            userId: rowData.userId
        }
        userId.value = rowData.userId
        const res = await getUserPaper(data)
        if (res.data.code == 200) {
            let arr: number[] = []
            res.data.rows.forEach((item: ReportType) => {
                arr.push(item.paperId)
            })
            const result = await getOtherPaper({
                dataArr: arr
            })
            options.length = 0
            result.data.rows.forEach((item: itemType) => {
                options.push({
                    label: item.id.toString() + "." + (item.paperName.length >= 6) ? (item.paperName.substring(0, 6) + "...") : item.paperName,
                    value: item.id,
                    disabled: false
                })
            })
            value.value = []
            showModal.value = true
        }
    } else if (item === "详情") {
        flag.value = false
        studentPaperTitle.value = rowData.name
        const data = {
            userId: rowData.userId
        }
        const res = await getUserPaper(data)
        if (res.data.code == 200) {
            tableStudentPaper.value = res.data.rows.map((item: ReportType) => {
                return {
                    id: item._id,
                    userId: item.userId,
                    paperId: item.paperId,
                    paperName: item.paperName,
                    score: item.flag ? "/" : item.score
                }
            })
        }
    }
}

async function addMe() {
    if (value.value) {
        if (value.value.length === 0) {
            message.warning("请添加考卷")
        } else if (value.value.length > 1) {
            message.warning("每次只能添加一条")
        } else {
            let data = {
                userId: userId.value,
                paperId: value.value[0]
            }
            const res = await addUserPaper(data)
            if (res.data.code == 200) {
                showModal.value = false
                closeDetail()
                getStudentsPaper()
            }
        }
    }
}

function goUserInfo() {
    router.push({ path: "/userInfo" })
}

function openAddStudent() {
    addModal.value = true
    nameType.value = "新增"
    formValue.account = ""
    formValue.password = ""
    formValue.name = ""
    formValue.age = ""
    formValue.phone = ""
    formValue.remark = ""
}

function addme2() {
    if (formRef.value) {
        formRef.value.validate(async (errors: any) => {
            if (!errors) {
                if (nameType.value === "修改") {
                    let data = {
                        id: userId.value,
                        account: formValue.account,
                        password: formValue.password,
                        name: formValue.name,
                        age: formValue.age,
                        phone: formValue.phone,
                        remark: formValue.remark
                    }
                    const res = await updateStudent(data)
                    if (res.data.code == 200) {
                        addModal.value = false
                        getStudentsPaper()
                    }
                } else if (nameType.value === "新增") {
                    let data = {
                        account: formValue.account,
                        password: formValue.password,
                        name: formValue.name,
                        age: formValue.age,
                        phone: formValue.phone,
                        remark: formValue.remark
                    }
                    const res = await addStudent(data)
                    if (res.data.code == 200) {
                        addModal.value = false
                        getStudentsPaper()
                    }
                }

            } else {

            }
        })
    }
}

function closeDetail() {
    flag.value = true
    tableStudentPaper.value = [{
        id: "",
        userId: 0,
        paperId: 0,
        paperName: "",
        score: ""
    }]
    studentPaperTitle.value = ""
}

async function deletePaper(item: StudentPaperItem) {
    await deleteReport({ id: item.id })
    const data = {
        userId: item.userId
    }
    const res = await getUserPaper(data)
    if (res.data.code == 200) {
        tableStudentPaper.value = res.data.rows.map((item: ReportType) => {
            return {
                id: item._id,
                userId: item.userId,
                paperId: item.paperId,
                paperName: item.paperName,
                score: item.flag ? "/" : item.score
            }
        })
    }
    getStudentsPaper()
}

function cancelDelete() {
    message.info('取消删除')
}

</script>

<style lang="less" scoped>
.title {
    padding: 10px;
    display: flex;
    justify-content: center;
}
.btn_bottom {
    margin: 10px;
}
.modelFooter {
    padding: 10px 0;
    display: flex;
    justify-content: space-between;
}
table {
    border-collapse: collapse;
    table-layout: fixed;
    border-radius: 5px;
    overflow: hidden;
    margin: 10px auto;
    border: 2px solid #ccc;
    color: #000;
}
table td,
th {
    text-align: center;
    border: 1px solid #ccc;
    vertical-align: middle;
    width: 80%;
}
</style>