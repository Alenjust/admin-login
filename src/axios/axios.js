import axios from "axios";
import { toast } from "~/composables/util";
import { getToken } from "~/composables/cookies";

//使用axios配置基础Url
const service = axios.create({
    baseURL: '/api',
    timeout: 3000
})
// 添加请求拦截器
service.interceptors.request.use(function (config) {
    // 在发送请求之前做些什么
    //往header头自动添加 token 设置好后，以后在别的请求参数中需要将token值上传到header上时就不需要重复上传token到header
    const token = getToken();//使用封装的方法完成token的写入请求头
    // const cookie = useCookies();
    // const token = cookie.get('admin-token');
    if (token) {
        config.headers['token'] = token
    }
    return config;
}, function (error) {
    // 对请求错误做些什么
    return Promise.reject(error);
});

// 添加响应拦截器
service.interceptors.response.use(function (response) {
    // 2xx 范围内的状态码都会触发该函数。
    // 对响应数据做点什么
    return response.data.data;
}, function (error) {
    // 超出 2xx 范围的状态码都会触发该函数。
    // 对响应错误做点什么
    toast(error.response.data.msg || "请重新登录！", "error");//使用封装的方法传递参数完成登录失败弹窗
    // ElNotification({
    //     duration: 2000,
    //     message: error.response.data.msg || "请重新登录",
    //     type: "error",
    // });
    return Promise.reject(error);
});
export default service