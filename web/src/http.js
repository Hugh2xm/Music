import axios from 'axios'
import Vue from  'vue'
import router from './router'

const http = axios.create({
    baseURL: 'http://localhost:3000/web/api'
})


//给所有的请求都添加请求头
http.interceptors.request.use(function (config) {
    // Do something before request is sent
    if (localStorage.token) {
        config.headers.Authorization = 'Bearer ' + (localStorage.token || '')
    }
    return config;
}, function (error) {
    // Do something with request error
    return Promise.reject(error);
});

//全局捕获错误，添加拦截器
http.interceptors.response.use(res => {
    return res
}, error => {
    if (error.response.data.message) {
        Vue.prototype.$message({
            type: 'error',
            message: error.response.data.message
        })

        //如果报错为401跳到登录界面
        if (error.response.status === 401) {
            router.push('/login')
        }
    }
    return Promise.reject(error)
})

export default http