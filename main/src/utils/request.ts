import axios from 'axios'
import { ElMessage } from 'element-plus';
import router from '@/router';

const TOKEN_KEY = 'intergration_token'
const isAuthFreeRequest = (url:string = '')=>{
    return url.includes('/auth/login') || url.includes('/portal/login')
}

const request = axios.create({
    // baseURL:'/api',
    timeout:6000
})

request.interceptors.request.use((config)=>{
    if (!isAuthFreeRequest(config.url)) {
        const token = localStorage.getItem(TOKEN_KEY);
        if (token) {
            config.headers.authorization = `Bearer ${token}`;
        } else {
            ElMessage.warning('未登录，请先登录');
            router.push('/login');
            return Promise.reject(new Error('未登录'));
        }
    }
    return config;
})

request.interceptors.response.use((config)=>{
   if(config.data.code === 200){
    return config.data
   }else if(config.data.code === 7001){
    ElMessage.warning('未登录，请先登录');
    localStorage.removeItem(TOKEN_KEY)
    router.push('/login');
    return Promise.reject(new Error('未登录'));
   }else if(config.data.code === 7002){
    ElMessage.warning('token过期');
    localStorage.removeItem(TOKEN_KEY)
    router.push('/login');
    return Promise.reject(new Error('未登录'));
   }else if(config.data.code === 7006){
    ElMessage.warning('当前账号没有权限访问该系统');
    localStorage.removeItem(TOKEN_KEY)
    router.push('/login');
    return Promise.reject(new Error('未登录'));
   }
   return Promise.reject(new Error(config.data.msg || '请求失败'))
})

export default request
