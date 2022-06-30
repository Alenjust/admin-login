import { createStore } from 'vuex'
import { login, getInfo } from "~/api/admin";
import { setToken } from "~/composables/cookies";

//Vuex状态集中管理
const store = createStore({
    // 状态
    state() {
        return {
            user: {}
        }
    },
    //记录用户信息
    mutations: {
        set_userinfo(state, user) {
            state.user = user
        }
    },
    actions: {
        //登录
        login({ commit }, { username, password }) {
            return new Promise((resolve, reject) => {
                login(username, password).then(res => {
                    setToken(res.token);
                    resolve(res)
                }).catch(err => reject(err))
            })
        },
        //获取用户当前登录信息
        getInfo({ commit }) {
            return new Promise((resolve, reject) => {
                getInfo().then(res => {
                    commit("set_userinfo", res)
                    resolve(res)
                })
            }).catch(err => reject(err))
        }
    }
})

export default store