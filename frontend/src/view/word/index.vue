<template>
  <div class="public">
  <a-card class="content">
  <div v-if="key==='1'">
  <publicPage></publicPage>
  </div>
  </a-card>
  </div>
</template>

<script setup>
const store=useStore();
import publicPage from "./components/publicPage.vue"
const key=computed(()=>{
  return store.state.key;
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
