<template>
    <div class="title">
        <div class="title_name">新增{{ titleArr[prop.obj.type - 1] }}</div>
        <div class="title_button" v-if="prop.obj.type !== 3">
            <n-button style="margin-right: 10px" @click="showModel(0)">文字题</n-button>
            <n-button style="margin-right: 10px" @click="showModel(1)">图片题</n-button>
            <n-button @click="showModel(2)">视频题</n-button>
        </div>
    </div>
    <div v-if="prop.obj.type === 1" class="box">
        <div class="box_zhuti" v-if="imgFlag">
            <div class="box_title">添加图片：</div>
            <input type="file" @input="getImg" />
        </div>
        <div class="box_zhuti" v-if="imgFlag">
            <div class="box_title">图片名称：</div>
            <n-input v-model:value="prop.obj.url" type="text" clearable></n-input>
        </div>
        <div class="box_zhuti" v-if="videoFlag">
            <div class="box_title">添加视频：</div>
            <input type="file" @input="getVideo" />
        </div>
        <div class="box_zhuti" v-if="videoFlag">
            <div class="box_title">视频名称：</div>
            <n-input v-model:value="prop.obj.url" type="text" clearable></n-input>
        </div>
        <div class="box_zhuti">
            <div class="box_title">题目：</div>
            <n-input v-model:value="prop.obj.stem" type="text" clearable></n-input>
        </div>
        <div
            class="box_select"
            v-if="Array.isArray(prop.obj.selectArr) && prop.obj.selectArr.length > 0"
        >
            <div class="xuanxiang">
                <div class="xuanxiang_name">A选项：</div>
                <n-input v-model:value="prop.obj.selectArr[0]" type="text" clearable></n-input>
            </div>
            <div class="xuanxiang">
                <div class="xuanxiang_name">B选项：</div>
                <n-input v-model:value="prop.obj.selectArr[1]" type="text" clearable></n-input>
            </div>
            <div class="xuanxiang">
                <div class="xuanxiang_name">C选项：</div>
                <n-input v-model:value="prop.obj.selectArr[2]" type="text" clearable></n-input>
            </div>
            <div class="xuanxiang">
                <div class="xuanxiang_name">D选项：</div>
                <n-input v-model:value="prop.obj.selectArr[3]" type="text" clearable></n-input>
            </div>
        </div>
        <div class="box_zhuti">
            <div class="box_title">正确答案：</div>
            <n-input v-model:value="prop.obj.anwser" type="text" clearable></n-input>
        </div>
        <div class="box_zhuti">
            <div class="box_title">解释说明：</div>
            <n-input v-model:value="prop.obj.remark" type="text" clearable></n-input>
        </div>
    </div>
    <div v-if="prop.obj.type === 2" class="box">
    <div class="box_zhuti" v-if="imgFlag">
            <div class="box_title">添加图片：</div>
            <input type="file" @input="getImg" />
        </div>
        <div class="box_zhuti" v-if="imgFlag">
            <div class="box_title">图片名称：</div>
            <n-input v-model:value="prop.obj.url" type="text" clearable></n-input>
        </div>
        <div class="box_zhuti" v-if="videoFlag">
            <div class="box_title">添加视频：</div>
            <input type="file" @input="getVideo" />
        </div>
        <div class="box_zhuti" v-if="videoFlag">
            <div class="box_title">视频名称：</div>
            <n-input v-model:value="prop.obj.url" type="text" clearable></n-input>
        </div>
        <div class="box_zhuti">
            <div class="box_title">题目：</div>
            <n-input v-model:value="prop.obj.stem" type="text" clearable></n-input>
        </div>
        <div class="box_zhuti">
            <div class="box_title">正确答案：</div>
            <n-input v-model:value="prop.obj.anwser" type="text" clearable></n-input>
        </div>
        <div class="box_zhuti">
            <div class="box_title">解释说明：</div>
            <n-input v-model:value="prop.obj.remark" type="text" clearable></n-input>
        </div>
    </div>
    <div v-if="prop.obj.type === 3" class="box">
        <div class="box_zhuti">
            <div class="box_title">题目：</div>
            <n-input v-model:value="prop.obj.stem" type="text" clearable></n-input>
        </div>
        <div class="box_zhuti">
            <div class="box_title">正确答案：</div>
            <n-input v-model:value="prop.obj.anwser" type="text" clearable></n-input>
        </div>
        <div class="box_zhuti">
            <div class="box_title">解释说明：</div>
            <n-input v-model:value="prop.obj.remark" type="text" clearable></n-input>
        </div>
    </div>
    <div v-if="prop.obj.type === 4" class="box">
    <div class="box_zhuti" v-if="imgFlag">
            <div class="box_title">添加图片：</div>
            <input type="file" @input="getImg" />
        </div>
        <div class="box_zhuti" v-if="imgFlag">
            <div class="box_title">图片名称：</div>
            <n-input v-model:value="prop.obj.url" type="text" clearable></n-input>
        </div>
        <div class="box_zhuti" v-if="videoFlag">
            <div class="box_title">添加视频：</div>
            <input type="file" @input="getVideo" />
        </div>
        <div class="box_zhuti" v-if="videoFlag">
            <div class="box_title">视频名称：</div>
            <n-input v-model:value="prop.obj.url" type="text" clearable></n-input>
        </div>
        <div class="box_zhuti">
            <div class="box_title">题目：</div>
            <n-input v-model:value="prop.obj.stem" type="text" clearable></n-input>
        </div>
        <div class="box_zhuti">
            <div class="box_title">正确答案：</div>
            <n-input v-model:value="prop.obj.anwser" type="text" clearable></n-input>
        </div>
        <div class="box_zhuti">
            <div class="box_title">解释说明：</div>
            <n-input v-model:value="prop.obj.remark" type="text" clearable></n-input>
        </div>
    </div>
</template>

<script lang="ts" setup>
import { ref, reactive } from 'vue'
import { NInput, useMessage, NButton } from 'naive-ui'
import { addType } from './addpage'
import { addVideo, addImg } from '@/api/api'

defineEmits(["update:obj"])

const message = useMessage()
const titleArr = ["选择题", "判断题", "填空题", "问答题"]
const prop = defineProps<{
    obj: addType
}>()
const imgFlag = ref<boolean>(false)
const videoFlag = ref<boolean>(false)

prop.obj.url = ""
prop.obj.stem = ""
prop.obj.selectArr = ["", "", "", ""]
prop.obj.anwser = ""
prop.obj.remark = ""

function showModel(type: number) {
    if (type === 0) {
        prop.obj.url = ""
        imgFlag.value = false
        videoFlag.value = false
    } else if (type === 1 && !imgFlag.value) {
        prop.obj.url = ""
        imgFlag.value = true
        videoFlag.value = false
    } else if (type === 2 && !videoFlag.value) {
        imgFlag.value = false
        videoFlag.value = true
    }
}

async function getVideo(e: Event) {
    const target = e.target as any
    if (target) {
        const file = new FormData()
        file.append("file", target.files[0])
        const res = await addVideo(file)
        if (res.data.code === 200) {
            message.success(res.data.msg)
            prop.obj.url = res.data.rows
        }
    }
}

function getImg(e: Event) {
    const target = e.target as any
    if (target) {
        const reader = new FileReader()
        reader.readAsDataURL(target.files[0])
        reader.addEventListener("load", async (e) => {
            if (e.target && typeof e.target.result === "string") {
                let data = {
                    img: e.target.result
                }
                const res = await addImg(data)
                if (res.data.code === 200) {
                    message.success(res.data.msg)
                    prop.obj.url = res.data.rows
                }
            }
        })
    }
}

</script>

<style lang="less" scoped>
.title {
    display: flex;
    justify-content: space-between;
    margin-bottom: 20px;
    .title_name {
        font-size: large;
        font-weight: 600;
    }
}
.box {
    display: flex;
    justify-content: flex-start;
    flex-direction: column;
    row-gap: 10px;
    .box_zhuti {
        display: flex;
        justify-content: flex-start;
        .box_title {
            width: 80px;
            white-space: nowrap;
        }
    }
    .box_select {
        display: flex;
        justify-content: flex-start;
        flex-direction: column;
        row-gap: 10px;
        .xuanxiang {
            display: flex;
            justify-content: flex-start;
            .xuanxiang_name {
                width: 80px;
                white-space: nowrap;
            }
        }
    }
}
</style>