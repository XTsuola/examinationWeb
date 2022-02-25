<!-- 选择题 -->
<template>
  <div class="main">
    <div class="main_title">
      <div class="main_title_admin">
        <n-button v-if="_id === '61dfbac47076000085006144'" size="small" @click="goWhere('tiku')">题库</n-button>
        <n-button
          v-if="_id === '61dfbac47076000085006144'"
          size="small"
          @click="goWhere('students')"
        >学生管理</n-button>
      </div>
      <n-button size="small" @click="exit()">退出</n-button>
    </div>
    <n-card title="用户信息">
      <div class="card">
        <div class="card_left">
          <div
            style="position: relative;width: 70px; height: 70px; border-radius: 50%; overflow: hidden;"
          >
            <img style="width: 100%;height: 100%;" :src="imgValue" />
            <input
              style="opacity: 0;position: absolute;width: 100%;height: 100%;left: 0;top: 0;"
              type="file"
              @input="getImg"
            />
          </div>
        </div>
        <div class="card_right">
          <div>考生姓名：{{ userInfo.name }}</div>
          <div>考生年龄：{{ userInfo.age }}</div>
          <div>联系方式：{{ userInfo.phone }}</div>
          <div>其他备注：{{ userInfo.remark ? userInfo.remark : "/" }}</div>
        </div>
      </div>
    </n-card>
    <n-card title="试卷信息">
      <n-data-table :columns="(columns as any)" :data="tableData" />
    </n-card>
  </div>
</template>


<script lang="ts" setup>
import { h, ref, reactive, onMounted } from 'vue'
import { NButton, NCard, NDataTable, useMessage } from 'naive-ui'
import { getUserInfo, getUserPaper, updateImg } from "../api/api"
import router from '@/router'
import { PaperItem, PaperTableItem, UserInfo } from './userInfo';
import imgBase from '@/assets/images/2.jpg'
import { networkConfig } from "@/utils/networkConfig"

const message = useMessage()
const _id = ref<string>(JSON.parse(window.sessionStorage.getItem('userInfo') as string)._id)
const userId = JSON.parse(window.sessionStorage.getItem('userInfo') as string).userId
const userInfo = ref<UserInfo>({
  id: 0,
  name: "",
  age: 0,
  phone: "",
  remark: ""
})
const columns = ref([
  {
    title: '试卷名称',
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
        NButton,
        {
          size: 'small',
          onClick: () => sendMail(row)
        },
        { default: () => row.flag ? "开始考试" : "查看结果" }
      )
    }
  },
])
const tableData = ref<PaperTableItem[]>([{
  key: "",
  paperId: 0,
  paperName: "",
  score: "",
  flag: true
}])
const imgValue = ref<string>("")

function goWhere(name: string) {
  const userInfo = window.sessionStorage.getItem('userInfo')
  if (name === "tiku") {
    if (userInfo && JSON.parse(userInfo)._id == "61dfbac47076000085006144") {
      router.push({ path: "/tiku" })
    } else {
      message.warning("只有管理员才能进入题库！")
    }
  } else if (name === "students") {
    if (userInfo && JSON.parse(userInfo)._id == "61dfbac47076000085006144") {
      router.push({ path: "/students" })
    } else {
      message.warning("只有管理员才能进入题库！")
    }
  }
}

async function getUserList() {
  const data = {
    _id: _id.value
  }
  const res = await getUserInfo(data)
  if (res.data.code == 200) {
    const row = res.data.rows
    userInfo.value = {
      id: row.id,
      name: row.name,
      age: row.age,
      phone: row.phone,
      remark: row.remark
    }
    if (row.img) {
      imgValue.value = networkConfig.serverUrl + "img/" + row.img
    } else {
      imgValue.value = imgBase
    }
  }
}

async function getPaperList() {
  const data = {
    userId: userId
  }
  const res = await getUserPaper(data)
  if (res.data.code == 200) {
    tableData.value = res.data.rows.map((item: PaperItem) => {
      return {
        key: item._id,
        paperId: item.paperId,
        paperName: item.paperName,
        score: item.score ? item.score : "/",
        flag: item.flag
      }
    })
  }
}

function sendMail(rowData: any) {
  if (rowData.flag) {
    message.info("开始考试")
    window.sessionStorage.setItem('paperId', rowData.paperId)
    router.push({ path: "/kaoshi" })
  } else {
    window.sessionStorage.setItem('anwserPaperId', rowData.paperId)
    router.push({ path: "/result" })
  }
}

function getImg(e: Event) {
  const target = e.target as any
  if (target) {
    const reader = new FileReader()
    reader.readAsDataURL(target.files[0])
    reader.addEventListener("load", async (e) => {
      if (e.target && typeof e.target.result === "string") {
        imgValue.value = e.target.result
        let data = {
          id: userId,
          img: imgValue.value
        }
        const res = await updateImg(data)
      }
    })
  }
}

function exit() {
  sessionStorage.clear()
  router.push({ path: "/login" })
}

onMounted(() => {
  getUserList()
  getPaperList()
})

</script>

<style lang="less" scoped>
.main {
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 20px;
  row-gap: 20px;
  .main_title {
    width: 100%;
    display: flex;
    .main_title_admin {
      margin: 0 auto;
      display: flex;
      column-gap: 20px;
    }
  }
}
.card {
  display: flex;
  justify-content: space-around;
  align-items: center;
  .card_left {
    width: 80px;
  }
  .card_right {
    flex: 1;
  }
}
</style>