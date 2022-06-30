<template>
  <el-row class="login-container">
    <el-col :lg="16" :md="12" class="left">
      <!-- <img src="../assets/images/log.svg" alt="" /> -->
      <div>
        <img src="../assets/images/log.svg" alt="" />
        <h2 class="H2">欢迎进入后台管理系统</h2>
      </div>
    </el-col>
    <el-col :lg="8" :md="12" class="right">
      <h1 class="H1">欢迎回来</h1>
      <span class="span">账号密码登录</span>
      <el-form ref="formRef" :model="form" :rules="rules" class="from">
        <el-form-item prop="username">
          <el-input v-model="form.username" placeholder="请输入用户名">
            <template #prefix>
              <el-icon><User /></el-icon>
            </template>
          </el-input>
        </el-form-item>
        <el-form-item prop="password">
          <el-input
            type="password"
            show-password
            v-model="form.password"
            placeholder="请输入密码"
          >
            <template #prefix>
              <el-icon><Lock /></el-icon>
            </template>
          </el-input>
        </el-form-item>
        <el-form-item>
          <el-button
            type="primary"
            class="submit"
            round="ture"
            color="#626aef"
            @click="onSubmit"
            :loading="loading"
            >登 录</el-button
          >
        </el-form-item>
      </el-form>
    </el-col>
  </el-row>
</template>
<script setup>
import { reactive, ref, onMounted, onBeforeMount } from "vue";
// import { login } from "~/api/admin";
import { toast } from "~/composables/util";
import { useRouter } from "vue-router";
import { useStore } from "vuex";
import { setToken } from "~/composables/cookies";

const store = useStore();
const router = useRouter();

// 设置引用数据类型数据响应式
const form = reactive({
  username: "",
  password: "",
});
//设置表单校验
const rules = {
  username: [
    { required: true, message: "用户名不能为空", trigger: "blur" },
    // { min: 3, max: 5, message: "用户名长度为3-5个字符", trigger: "blur" },
  ],
  password: [{ required: true, message: "密码不能为空", trigger: "blur" }],
};
const formRef = ref(null);
const loading = ref(false);

//监听回车事件
function onKeyUp(e) {
  if (e.key == "Enter") {
    onSubmit();
  }
}
// 添加键盘监听事件
onMounted(() => {
  document.addEventListener("keyup", onKeyUp);
});
onBeforeMount(() => {
  document.removeEventListener("keyup", onKeyUp);
});

//点击登录按钮触发事件
const onSubmit = () => {
  formRef.value.validate((valid) => {
    console.log(valid);
    if (!valid) {
      return false;
    }
    //验证通过之前将loading设置为true 加载中
    loading.value = true;
    // 调用登录方法实现登录
    store
      .dispatch("login", form)
      .then((res) => {
        toast("登录成功");
        router.push("/");
      })
      .finally(() => {
        loading.value = false;
      });
    // login(form.username, form.password)
    //   .then((res) => {
    //     //登录成功
    //     toast("登陆成功！");
    //     // ElNotification({
    //     //   duration: 1500,
    //     //   message: "登陆成功",
    //     //   type: "cuccess",
    //     // });
    //     //存储token以及用户的相关信息
    //     // const cookie = useCookies(); //使用vueuse 定义一个使用cookie的方法
    //     // cookie.set("admin-token", res.token); //设置cookie 将token存入cookie    res.token是因为设置了拦截器
    //     setToken(res.token);

    //     //获取用户相关信息
    //     // getInfo().then((res2) => {
    //     //   store.commit("set_userinfo", res2);
    //     //   console.log(res2);
    //     // });
    //     //登录成功放回首页
    //     router.push("/");
    //   })
    //   .finally(() => {
    //     loading.value = false;
    //   });
  });
};
</script>
<style scoped>
.login-container {
  @apply min-h-screen bg-purple-600;
}
.login-container .left {
  @apply flex flex-col items-center justify-center;
}
.login-container .right {
  @apply flex items-center justify-center bg-purple-400 flex-col;
}
.login-container .left .H2 {
  @apply font-bold text-5xl text-light-50 mb-10 -py-100 px-150 -mt-250;
}
.login-container .right .H1 {
  @apply font-bold text-5xl text-gray-800 mb-40;
}
.login-container .right .from {
  @apply w-[300px];
}
.login-container .right .span {
  @apply font-bold text-3xl mb-20 text-cool-gray-300;
}
.login-container .right .from .submit {
  @apply w-[300px];
}
</style>