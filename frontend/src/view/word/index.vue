<template>
  <div class="public">
  <a-card class="content">
  <div v-if="key==='1'">
  <publicPage></publicPage>
  </div>
  <div v-else-if="key==='2'">
  <personPage></personPage>
  </div>
  <div v-else>
  待施工
  </div>
  </a-card>
  </div>
</template>

<script setup>
const store=useStore();
import publicPage from "./components/publicPage.vue"
import personPage from "./components/personalPage.vue"
const key=computed(()=>{
  console.log("key change",store.state.key[0])
  return store.state.key[0];
})
</script>

<style scoped>
.public{
  display:flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 100%;
  background-color: rgb(255, 255, 255); 
}
.content{
  width: 90%;
  height: 90%;
}
</style>
