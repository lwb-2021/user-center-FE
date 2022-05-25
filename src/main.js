import { createApp } from 'vue'
import App from './App'
import {createRouter, createWebHistory} from "vue-router"
import routes from "./router/router";
import TDesign from 'tdesign-vue-next';

// 引入axios配置器
import "./axios";

// css引入
import "tdesign-vue-next/es/style/index.css";

const app = createApp(App)

// 配置TDesign
app.use(TDesign)

// 配置router
const router = createRouter({
    history: createWebHistory(),
    routes: routes
})
app.use(router)

// 挂载
app.mount("#app")



