<template>
  <div class="login">
    <a-card>
      <div class="input" v-if="state === 0">
        <a-form
          :model="formState"
          name="basic"
          :label-col="{ span: 8 }"
          :wrapper-col="{ span: 24 }"
          autocomplete="off"
        >
          <a-form-item
            label="Username"
            name="username"
            :rules="[{ required: true, message: 'Please input your username!' }]"
          >
            <a-input v-model:value="formState.username" />
          </a-form-item>

          <a-form-item
            label="Password"
            name="password"
            :rules="[{ required: true, message: 'Please input your password!' }]"
          >
            <a-input-password v-model:value="formState.password" />
          </a-form-item>

          <a-form-item name="remember" :wrapper-col="{ offset: 8, span: 16 }">
            <a-checkbox v-model:checked="formState.remember">Remember me</a-checkbox>
          </a-form-item>

          <a-form-item>
            <div class="bot">
              <a-button size="large" type="primary" @click="login">login in</a-button>
              <a-button size="large" @click="register">register</a-button>
            </div>
          </a-form-item>
        </a-form>
      </div>

      <div class="input2" v-if="state === -1">
        <a-form
          :model="registerdata"
          name="basic"
          :label-col="{ span: 8 }"
          :wrapper-col="{ span: 24 }"
          autocomplete="off"
        >
          <a-form-item
            label="Username"
            name="username"
            :rules="[{ required: true, message: 'Please input your username!' }]"
          >
            <a-input v-model:value="registerdata.username" />
          </a-form-item>

          <a-form-item
            label="Password"
            name="password"
            :rules="[{ required: true, message: 'Please input your password!' }]"
          >
            <a-input-password v-model:value="registerdata.password" />
          </a-form-item>

          <a-form-item
            label="name"
            name="realname"
            :rules="[{ required: true, message: 'Please input your realname!' }]"
          >
            <a-input-password v-model:value="registerdata.name" />
          </a-form-item>

          <a-form-item>
            <div class="bot">
              <a-button size="large" @click="store.commit('changestate', 0)"
                >go back</a-button
              >
              <a-button size="large" type="primary" @click="submit">submit</a-button>
            </div>
          </a-form-item>
        </a-form>
      </div>
    </a-card>
  </div>
</template>

<script setup>
import { message } from "ant-design-vue";
import api from "../../api/login";
const store = useStore();
const router = useRouter()
const state = computed(() => {
  return store.state.state;
});
const formState = reactive({
  username: "",
  password: "",
  remember: true,
});
const registerdata = reactive({
  username: "",
  password: "",
  name: "",
});
const login = async () => {
  const result = await api.loginapi(formState);
  console.log("登录结果",result);
  if (result.data === "pass") {
    message.success("登录成功，欢迎进入");
    store.commit("changestate", 1);
    if (formState.remember === true) {
      localStorage.setItem("localstate", 1);
      localStorage.setItem("name",formState.username);
      store.commit("changename",formState.username)
    } else {
      localStorage.setItem("localstate", 0);
      store.commit("changename",formState.username)
    }
    router.push("main");
  } else {
    message.warning("登录失败，不存在此用户");
  }
};
const register = () => {
  store.commit("changestate", -1);
};

const submit = async () => {
  const result = api.registerapi(registerdata);
  if (result.data==="pass") {
    message.success("注册成功，欢迎进入");
    store.commit("changestate", 1);
    if (formState.remember === true) {
      localStorage.setItem("localstate", 1);
      localStorage.setItem("name",registerdata.username);
      store.commit("changename",registerdata.username)
    } else {
      localStorage.setItem("localstate", 0);
      store.commit("changename",registerdata.username)
    }
    router.push("./main")
  }else{
    message.warning("注册失败，存在相同用户名用户");
  }
};
</script>

<style scoped>
.login {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-image: url("../../assets/login.jpg");
  display: flex;
  justify-content: center;
  align-items: center;
}

.input {
  display: flex;
  justify-content: center;
  flex-direction: column;
  align-items: center;
}

.bot {
  display: flex;
  justify-content: space-around;
}
</style>
