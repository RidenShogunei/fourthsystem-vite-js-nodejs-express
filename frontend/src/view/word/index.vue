<template>
  <div class="public">
    <div class="message" v-for="message in messages" :key="message.id">
      <div class="avatar">{{ message.username[0] }}</div>
      <div class="username">{{ message.username }}</div>
      <div class="content">{{ message.content }}</div>
    </div>
    <div class="inputArea">
      <a-input type="text" v-model="newMessage" placeholder="Type your message here..." />
      <a-button type="primary" @click="sendMessage">Send</a-button>
    </div>
  </div>
</template>

<script setup>
import { ref } from "vue";
import api from "../../api/public";
import { message } from "ant-design-vue";
const store = useStore();
const messages = ref([]);
const newMessageContent = ref("");
const username = computed(() => {
  return store.state.name;
}); // 需要将'Username'替换为实际的用户名
const time = ref(new Date().toISOString()); // 决定时间的形式是否适合你的后端

const getdata = async () => {
  const result = await api.getpublicapi();
  messages.value = result;
};

const sendMessage = async () => {
  const newMessage = {
    username: username.value,
    time: time.value,
    content: newMessageContent.value,
  };
  const result=await api.sendpublicapi(newMessage);
  console("发出信息结果",result);
  if(result.data==="Insertion failed"){
    message.error("发送成功")
  }else if(result.data==="Insertion successful"){
    message.success("发送成功")
  }else{
    message.warn("网络有问题")
  }
};
getdata();
</script>

<style scoped>
.public {
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 10px;
}

.message {
  display: flex;
  align-items: center;
  margin-bottom: 10px;
}

.avatar {
  width: 30px;
  height: 30px;
  border-radius: 15px;
  background-color: #ccc;
  display: flex;
  justify-content: center;
  align-items: center;
  margin-right: 10px;
}

.inputArea {
  display: flex;
  justify-content: space-between;
  width: 100%;
}
</style>
