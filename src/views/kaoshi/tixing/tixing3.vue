<!-- 填空题 -->
<template>
    <div class="type">填空题</div>
    <div class="main">
        <div class="title">
            {{ prop.obj.index }}、
            <div class="stem">
                <div>{{ prop.obj.stem.split('_')[0] }}</div>
                <div>
                    <n-input class="input" v-model:value="prop.obj.anwser" type="text" placeholder="" />
                </div>
                <div>{{ prop.obj.stem.split('_')[1] }}</div>
            </div>
        </div>
    </div>
</template>

<script lang="ts" setup>
import { ref, reactive, onMounted } from 'vue'
import { NInput } from 'naive-ui'
import { test3 } from './tixing'

const emit = defineEmits(["update:obj"])
const prop = defineProps<{
    obj: test3
}>()

</script>

<style lang="less" scoped>
.type {
    color: darkgreen;
}
.main {
    display: flex;
    justify-content: center;
    flex-wrap: wrap;
    div {
        width: 100%;
    }
    .title {
        display: flex;
        justify-content: flex-start;
        .stem {
            display: flex;
            justify-content: flex-start;
            flex-wrap: wrap;
            .input {
                width: 100px;
            }
        }
    }
}
</style>