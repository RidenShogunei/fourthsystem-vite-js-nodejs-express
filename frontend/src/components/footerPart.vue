<template>
    <div class="footer">
        <a href="https://beian.miit.gov.cn" target="_blank" rel="noopener noreferrer">
            {{ ICP }}</a>
    </div>
</template>

<script lang="ts" setup>
const ICP = ref('沪ICP备202405831号');
</script>

<style scoped>
.footer{
  width: 100%;
  text-align: center;
  background-color: #f8f9fa;
}
</style>