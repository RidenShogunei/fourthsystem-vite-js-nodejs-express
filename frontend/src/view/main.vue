<template>
    <a-layout>
        <a-layout-header class="header">
            <div class="title">
                通信系统
            </div>
            <a-menu theme="dark" mode="horizontal" @click="handleMenuClick">
                <a-menu-item key="TextComponent">文字</a-menu-item>
            </a-menu>
        </a-layout-header>
        <a-layout-content>
            <a-layout style="padding: 24px 0; background: #fff">
                <a-layout-sider width="200" style="background: #fff;height: 80vh;">
                    <a-menu v-model:selectedKeys="selectedKeys" v-model:openKeys="openKeys" mode="inline"
                        style="height: 100%">
                        <a-menu-item key="1">公共房间</a-menu-item>
                        <a-menu-item key="2">私人对话</a-menu-item>
                    </a-menu>
                </a-layout-sider>
                <a-layout-content :style="{ padding: '0 24px', minHeight: '280px' }">
                    <component :is="dynamic"></component>
                </a-layout-content>
            </a-layout>
        </a-layout-content>
        <a-layout-footer style="text-align: center">
            <FooterPart></FooterPart>
        </a-layout-footer>
    </a-layout>
</template>
<script setup>
import FooterPart from "../components/footerPart.vue";
const store=useStore();
const selectedKeys = ref(['1']);
const openKeys = ref(['sub1']);
const handleMenuClick = (e) => {
    dynamicContent.value = e.key;
};
const dynamicContent = ref('TextComponent'); 
const dynamic = computed(() => {
  switch (dynamicContent.value) {
    case 'TextComponent':
      return defineAsyncComponent(() => import('../view/word/index.vue'))
    case 'VideoComponent':
      return defineAsyncComponent(() => import('../components/waitPage.vue'))
    case 'AudioComponent':
      return defineAsyncComponent(() => import('../components/waitPage.vue'))
    default:
      return defineAsyncComponent(() => import('../components/waitPage.vue'))
  }
})
watch(selectedKeys,(newvalue)=>{
    store.commit("changekey",newvalue)
    console.log("key change",store.state.key)
})
</script>
<style scoped>
.header {
    display: flex;
    justify-content: flex-start;
    /* 均匀分布子元素，并在两侧留有空间 */
    align-items: center;
    /* 使元素在垂直方向上居中 */
}

.title {
    font-size: 40px;
    font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
    color: aliceblue;
}
</style>