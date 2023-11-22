import Vue from 'vue'

import 'normalize.css/normalize.css' // A modern alternative to CSS resets
import axios from 'axios'
import VueAxios from 'vue-axios'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import locale from 'element-ui/lib/locale/lang/en' // lang i18n

import '@/styles/index.scss' // global css

import App from './App'
import store from './store'
import router from './router'

import API from "@/api";
//将api挂载在vue原型上,任何组件可以使用API相关的接口

import '@/icons' // icon
import '@/permission' // permission control

// 引入三级联动组件
import CategorySelect from '@/components/CategorySelect'
Vue.component(CategorySelect.name, CategorySelect);

//引入按钮
// import HintButton from "@/components/HintButton";
// Vue.component(HintButton.name, HintButton)

Vue.prototype.$API = API;
Vue.use(VueAxios, axios)
if (process.env.NODE_ENV === 'production') {
    const { mockXHR } = require('../mock')
    mockXHR()
}

// set ElementUI lang to EN
// Vue.use(ElementUI, { locale })
// 如果想要中文版 element-ui，按如下方式声明
Vue.use(ElementUI)

Vue.config.productionTip = false

new Vue({
    el: '#app',
    router,
    store,
    render: h => h(App)
})