<script setup lang="ts">
// This starter template is using Vue 3 <script setup> SFCs
// Check out https://v3.vuejs.org/api/sfc-script-setup.html#sfc-script-setup
import { defineComponent, ref, createApp } from 'vue'
import { zhCN, dateZhCN, NConfigProvider, NMessageProvider } from 'naive-ui'

const locale = ref(zhCN)
const dateLocale = ref(dateZhCN)
</script>

<template>
  <n-config-provider :locale="locale" :date-locale="dateLocale">
    <n-message-provider>
      <router-view></router-view>
    </n-message-provider>
  </n-config-provider>
  <!--   <img alt="Vue logo" src="./assets/logo.png" /> -->
</template>

<style>
@import "@/assets/base.css";
#app {
  flex: 1;
  display: flex;
  flex-direction: column;
  width: 100%;
  height: 100%;
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
}
.n-config-provider{
  flex: 1;
  display: flex;
  flex-direction: column;
}
.n-message-provider{
  flex: 1;
  display: flex;
  flex-direction: column;
}
</style>
