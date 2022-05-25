import axios from "axios";
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
        const response = error.response
        console.log(response)
        if(response.data){
            response.message = response.data.message
        }
        console.log(response.message)
        return Promise.resolve()
    })