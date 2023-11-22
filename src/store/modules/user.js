import { login, logout, getInfo } from '@/api/user'
import { getToken, setToken, removeToken } from '@/utils/auth'
import { resetRouter, asyncRoutes, constantRoutes, anyRoutes } from '@/router'
import router from '@/router';

const getDefaultState = () => {
    return {
        //获取token
        token: getToken(),
        //存储用户名
        name: '',
        //存储用户头像
        avatar: '',
        //菜单
        routes: [],
        //角色
        roles: {},
        //按钮
        buttons: [],
        //对比之后【项目中已有的异步路由，与服务器返回的标记信息进行对比最终需要展示的路由】
        resultAsyncRoutes: [],
        //用户最终需要展示全部路由
        resultAllRoutes: [],
    }
}

const state = getDefaultState()

const mutations = {
    //重置state
    RESET_STATE: (state) => {
        Object.assign(state, getDefaultState())
    },
    //存储token
    SET_TOKEN: (state, token) => {
        state.token = token
    },
    //存储用户信息
    SET_USERINFO: (state, userInfo) => {
        // 存储用户名
        state.name = userInfo.name;
        // 存储头像
        state.actions = userInfo.actions;
        //菜单权限标记
        state.routes = userInfo.routes;
        //按钮权限标记
        state.buttons = userInfo.buttons;
        //角色
        state.roles = userInfo.roles;
    },
    //最终计算出的异步路由
    SET_RESULTASYNCROUTES: (state, asyncRoutes) => {
        //vuex保存当前用户的异步路由，注意：一个用户需要展示完整的路由包括：常量、异步、任意路由
        state.resultAsyncRoutes = asyncRoutes;
        //计算出当前用户需要展示的路由
        state.resultAllRoutes = constantRoutes.concat(state.resultAsyncRoutes, anyRoutes);
        //给路由器添加新的路由
        router.addRoutes(state.resultAllRoutes);
    },
}

const actions = {
    // 登录业务
    async login({ commit }, userInfo) {
        //解构出用户名与密码
        const { username, password } = userInfo
        let result = await login({ username: username.trim(), password: password });
        if (result.code == 20000) {
            commit('SET_TOKEN', result.data.token)
            setToken(result.data.token);
        } else {
            return Promise.reject(new Error("faile"))
        }
    },

    // get user info
    getInfo({ commit, state }) {
        return new Promise((resolve, reject) => {
            getInfo(state.token).then(response => {
                //获取用户的信息
                const { data } = response;
                //vuex存储用户的全部信息
                commit('SET_USERINFO', data)
                commit('SET_RESULTASYNCROUTES', computedAsyncRountes(asyncRoutes, data.routes))
                resolve(data)
            }).catch(error => {
                reject(error)
            })
        })
    },

    // user logout
    logout({ commit, state }) {
        return new Promise((resolve, reject) => {
            logout(state.token).then(() => {
                removeToken() // must remove  token  first
                resetRouter()
                commit('RESET_STATE')
                resolve()
            }).catch(error => {
                reject(error)
            })
        })
    },

    // remove token
    resetToken({ commit }) {
        return new Promise(resolve => {
            removeToken() // must remove  token  first
            commit('RESET_STATE')
            resolve()
        })
    }
}

//定义一个函数：两个数组进行对比，对比出当前用户到底显示哪些异步路由
const computedAsyncRountes = (asyncRoutes, routes) => {
    //过滤出当前用户【超级管理员|普通员工】需要展示的异步路由
    return asyncRoutes.filter(item => {
        //数组当中没有这个元素返回索引-1，如果有则一定不会返回-1
        if (routes.indexOf(item.name) != -1) {
            //递归：可能还会有2、3 ~级路由
            if (item.children && item.children.length) {
                item.children = computedAsyncRountes(item.children, routes);
            }
            return true;
        }
    })
}

export default {
    namespaced: true,
    state,
    mutations,
    actions
}