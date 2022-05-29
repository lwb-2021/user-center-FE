import axios from "axios";
import {MessagePlugin} from "tdesign-vue-next";
import {useRouter} from "vue-router"
const router = useRouter();
axios.defaults.withCredentials = true
axios.defaults.baseURL="/"
axios.interceptors.request.use((config) =>{
    return config
})

axios.interceptors.response.use((response) => {
    if(response.status === 200){
        return response
    }else {
        // MessagePlugin.error(response.data.message, 2000)
        return Promise.reject(response)
    }
},
    (error) => {
        // 异常处理
        if(error.response.status === 401){
            MessagePlugin.error("请登录", 2000)
            router.push("/login")
            return Promise.resolve(error)
        }
        const response = error.response
        console.log(response)
        if(response.data){
            response.message = response.data.msg
        }
        console.log(response.message)
        MessagePlugin.error(response.message, 2000)
        return Promise.resolve()
    })