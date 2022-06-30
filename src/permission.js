import router from "~/router";
import { getToken } from '~/composables/cookies'
import { toast } from '~/composables/util'
import store from "./store";
import { getInfo } from "~/api/admin";

//全局前置守卫
router.beforeEach(async (to, from, next) => {
    const token = getToken();

    //没有登录,强制跳转回登录页面
    if (!token && to.path != '/Login') {
        toast('请先登录', 'error');
        return next({ path: '/Login' })
    }
    if (token && to.path == '/Login') {
        toast('请勿重复登录', 'error')
        return next({ path: from.path ? from.path : '/' })
    }
    //如果用户登录了，自动获取用户信息，并储存在vuex中
    if (token) {
        await store.dispatch("getInfo")
    }

    //放行
    next()
});