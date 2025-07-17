import axios from 'axios'
import { ElMessage } from 'element-plus';
import router from '@/router';

const request = axios.create({
    // baseURL:'/api',
    timeout:6000
})

request.interceptors.request.use((config)=>{
    // 检查请求路径是否包含login，如果不包含则添加token
    if (!config.url?.includes('login')) {
        const token = localStorage.getItem('intergration_token');
        if (token) {
            config.headers.authorization = token;
        } else {
            // 显示未登录警告并跳转到登录页
            ElMessage.warning('未登录，请先登录');
            router.push('/login');
            // 阻止请求继续执行
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
    localStorage.removeItem('intergration_token')
    router.push('/login');
    return Promise.reject(new Error('未登录'));
   }else if(config.data.code === 7002){
    ElMessage.warning('token过期');
    localStorage.removeItem('intergration_token')
    router.push('/login');
    return Promise.reject(new Error('未登录'));
   }
})

export default request