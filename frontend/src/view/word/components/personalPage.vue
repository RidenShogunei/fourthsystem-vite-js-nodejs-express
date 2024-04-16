<template>
    <div>
        <!-- 用户列表-->
        <div class="list">
            <a-card class="card" v-for="user in userList" :key="user.username" @click="openChatWindow(user)">
                <p :style="{ fontSize: '20px', color: 'black' }">{{ user.username }}</p>
            </a-card>
        </div>
        <!-- 对话窗口 -->
        <a-modal :open="isModalVisible" :title="`Chat with ${currentChatUser.username}`" @cancel="handleCancel">
            <div class="public" ref="contRef">
                <div class="message" v-for=" message  in  messages " :key="message.id">
                    <div class="man">
                        <div class="avatar">{{ message.speaker[0] }}</div>
                        <div class="username">{{ message.speaker }}</div>
                    </div>
                    <div class="content" :class="{ myMessage: message.speaker === username }">
                        {{ message.text }}
                    </div>
                    <div class="time">{{ message.time }}</div>
                </div>
            </div>
            <template #footer>
                <div class="inputArea">
                    <a-input type="text" v-model:value="MessageContent" placeholder="Type your message here..."
                        @keydown.enter="sendMessage" />
                    <a-button type="primary" @click="sendMessage">Send</a-button>
                </div>
            </template>
        </a-modal>
    </div>
</template>

<script setup>
import api from "../../../api/getuser"
import getmes from "../../../api/person"
import { message } from "ant-design-vue";
const userList = ref([]);
let username = ref('default');
const isModalVisible = ref(false);
const contRef = ref(null);
const currentChatUser = ref({});
const messages = ref([]);
const MessageContent = ref('');
let pollingInterval = null;
const getpersonmessage = async (user) => {
    const result = await getmes.getpersonapi({ user1: username.value, user2: user });
    console.log("getperson", result.data)
    messages.value = result.data;
};
const openChatWindow = async (user) => {
    currentChatUser.value = user;
    await getpersonmessage(currentChatUser.value.username);
    isModalVisible.value = true;

    // 开始轮询
    pollingInterval = setInterval(async () => {
        await getpersonmessage(currentChatUser.value.username);
    }, 1000);  // 每5秒运行一次
};

const handleCancel = () => {
    isModalVisible.value = false;

    // 停止轮询
    clearInterval(pollingInterval);
    pollingInterval = null;
};

const sendMessage = async () => {
    const currentTime = new Date().toLocaleString("zh-CN", { timeZone: "Asia/Shanghai" });
    const newMessage = {
        user1: username.value,
        user2: currentChatUser.value.username,
        time: currentTime,
        content: MessageContent.value,
        speaker: username.value,
    };
    const result = await getmes.sendpersonapi(newMessage);
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
const scrollToBottom = () => {
    let scrollElem = contRef.value;
    scrollElem.scrollTo({ top: scrollElem.scrollHeight, behavior: "smooth" });
};
onMounted(async () => {
    const uid = localStorage.getItem('uid')
    const result = await api.getuserapi({ uid: uid });
    username.value = result.data[0].username;
    const result2 = await api.getuserapi({ uid: "all" });
    console.log("拿到的用户数据", result.data);
    userList.value = result2.data; // 用返回的数据更新userList
});
watch(messages, async (newvalue, oldvalue) => {
    if (JSON.stringify(newvalue) !== JSON.stringify(oldvalue)) {
        await nextTick();
        scrollToBottom();
    }
});
onUnmounted(() => {
    if (pollingInterval) {
        clearInterval(pollingInterval);
        pollingInterval = null;
    }
});
</script>

<style scoped>
.list {
    display: flex;
    flex-wrap: wrap;
    justify-content: flex-start;
    max-height: 62vh;
    overflow-y: auto;
}

.card {
    width: 10vw;
    height: 15vh;
    margin: 1vh 1vw;
}

.card:hover {
    box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19);
}

.public {
    display: flex;
    flex-direction: column;
    align-items: center;
    padding: 10px;
    max-height: 62vh;
    overflow-y: auto;
}

.message {
    display: flex;
    flex-direction: column;
    margin-bottom: 10px;
    width: 100%;
    height: 90%;
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
    display: flex;
    justify-content: space-between;
    width: 100%;
    padding: 0 2%;
}
</style>