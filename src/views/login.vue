<template>
    <div class="main">
        <iframe class="iframe" src="https://dragonir.github.io/3d/#/olympic"></iframe>
        <img class="bingdundun" src="@/assets/images/bingdundun.png" />
        <div class="box">
            <div class="fontWeight600">请输入账号：</div>
            <n-input v-model:value="account" type="text" placeholder="请输入账号" clearable />
            <div class="fontWeight600">请输入密码</div>
            <n-input v-model:value="password" type="password" placeholder="请输入密码" clearable />
            <n-button type="primary" size="large" circle ghost @click="goLogin()">登录</n-button>
        </div>
    </div>
</template>

<script lang="ts" setup>
import { ref, reactive, onMounted, watch } from 'vue'
import { NInput, NButton, useMessage } from 'naive-ui'
import router from '@/router'
import { login, addWork } from "../api/api"

let tada = { id: 1, name: "张三" }
let res = await addWork(tada)
console.log(res, 888)

const account = ref<string>("")
const password = ref<string>("")
const message = useMessage()

async function goLogin() {
    const data = {
        account: account.value,
        password: password.value
    }
    const res = await login(data)
    if (res.data.code == 200) {
        const userInfo = {
            _id: res.data.data._id,
            userId: res.data.data.id
        }
        window.sessionStorage.setItem('userInfo', JSON.stringify(userInfo))
        router.push({ path: "/userInfo" })
        message.success(res.data.msg)
    } else {
        message.error(res.data.msg)
    }
}
</script>

<style lang="less" scoped>
@media screen and (max-width: 768px) {
    .main {
        .iframe {
            width: 90vw !important;
        }
        .bingdundun {
            width: 90vw !important;
        }
        .box {
            width: 90vw !important;
        }
    }
}
.main {
    flex: 1;
    border: 1px solid #ccc;
    border-radius: 5px;
    padding: 10px;
    padding-top: 12vh;
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    flex-wrap: wrap;
    row-gap: 12px;
    background: url("@/assets/images/3.jpg");
    background-size: 100%;
    background-position: center;
    .iframe {
        width: 25vw;
        margin: 0 auto;
    }
    .bingdundun {
        margin-top: 19vh;
        object-fit: cover;
        width: 25vw;
        transform: translateX(-3%);
        margin: 0 auto;
    }
    .box {
        width: 25vw;
        padding: 15px;
        background-color: #fff;
        border-radius: 10px;
        margin: 0 auto;
        div {
            height: 40px;
        }
        .n-input {
            height: 40px;
            background: none;
            margin-bottom: 10px;
        }
        .n-button {
            width: 100%;
        }
    }
}
.fontWeight600 {
    font-weight: 600;
}
</style>