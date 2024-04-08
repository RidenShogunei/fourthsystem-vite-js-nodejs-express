<template>
  <div class="public" ref="contRef">
    <div class="message" v-for="message in messages" :key="message.id">
      <div class="man">
        <div class="avatar">{{ message.user[0] }}</div>
        <div class="username">{{ message.user }}</div>
      </div>
      <div class="content" :class="{ myMessage: message.user === username }">
        {{ message.text }}
      </div>
      <div class="time">{{ message.time }}</div>
    </div>
    <div class="inputArea">
      <a-input type="text" v-model:value="MessageContent" placeholder="Type your message here..."
        @keydown.enter="sendMessage" />
      <a-button type="primary" @click="sendMessage">Send</a-button>
    </div>
  </div>
</template>
<script setup>
import api from "../../../api/public";
import { message } from "ant-design-vue";
import get from "../../../api/getuser"
const messages = ref([]);
const MessageContent = ref('');
const contRef = ref(null);
let username = ref('default');
const time = ref(new Date().toLocaleString("zh-CN", { timeZone: "Asia/Shanghai" }));

const getdata = async () => {
  const result = await api.getpublicapi();
  messages.value = result.data;
};

const sendMessage = async () => {
  const newMessage = {
    username: username.value,
    time: time.value,
    content: MessageContent.value,
  };
  const result = await api.sendpublicapi(newMessage);
  console.log("发出的信息", newMessage);
  console.log("发出信息结果", result);
  if (result.message === "Insertion failed") {
    message.error("发送失败");
  } else if (result.message === "Insertion successful") {
    message.success("发送成功");
    MessageContent.value = '';
    await nextTick();  // 带入nextTick确保DOM更新后进行滚动
    scrollToBottom();
  } else {
    message.warn("网络有问题");
  }
};
let pollingInterval = null; // 这里我们需要将定时器保存在一个变量中，这样我们可以在需要的时候清除它
onMounted(async () => {
  const uid = localStorage.getItem('uid')
  const result = await get.getuserapi({ uid: uid });
  username.value = result.data[0].username;
  // 在组件被挂载后开始轮询
  pollingInterval = setInterval(getdata, 1000);
});
const scrollToBottom = () => {
  let scrollElem = contRef.value;
  scrollElem.scrollTo({ top: scrollElem.scrollHeight, behavior: "smooth" });
};
onBeforeUnmount(() => {
  // 在组件被卸载前清除定时器
  if (pollingInterval) {
    clearInterval(pollingInterval);
    pollingInterval = null;
  }
});

watch(messages, async (newvalue, oldvalue) => {
  if (JSON.stringify(newvalue) !== JSON.stringify(oldvalue)) {
    await nextTick();
    scrollToBottom();
  }
});
</script>

<style scoped>
.public {
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 10px;
  max-height: 60vh;
  overflow-y: auto;
}

.message {
  display: flex;
  flex-direction: column;
  margin-bottom: 10px;
  width: 100%;
  height: 100%;
}

.man {
  display: flex;
  align-items: center;
}

.content {
  border: 3px solid #0e0d0d;
  /* 设置边框宽度为3px，样式为dashed，颜色为红色 */
  padding: 10px;
  border-radius: 5px;
  /* 设置边框圆角 */
  font-family: "Lucida Sans", "Lucida Sans Regular", "Lucida Grande",
    "Lucida Sans Unicode", Geneva, Verdana, sans-serif;
  font-size: 20px;
}

.myMessage {
  border: 3px solid #e10000;
  /* 设置自己的信息边框颜色为红色 */
}

.username {
  font-family: Impact, Haettenschweiler, "Arial Narrow Bold", sans-serif;
  font-size: 20px;
}

.avatar {
  width: 32px;
  height: 32px;
  border-radius: 15px;
  background-color: #ccc;
  display: flex;
  justify-content: center;
  align-items: center;
  margin-right: 10px;
  font-family: Impact, Haettenschweiler, "Arial Narrow Bold", sans-serif;
  font-size: 20px;
}

.time {
  color: #ccc;
  font-family: Impact, Haettenschweiler, "Arial Narrow Bold", sans-serif;
  font-size: 15px;
}

.inputArea {
  position: absolute;
  bottom: 1%;
  display: flex;
  justify-content: space-between;
  width: 100%;
  padding: 0 2%;
}
</style>
