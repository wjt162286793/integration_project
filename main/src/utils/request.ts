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
   }else{
    // 其它业务码（如登录失败 7003）：原实现此处无返回值，导致调用方 res.code 恒为 undefined
    return config.data
   }
},(error)=>{
   // 网络错误 / 超时 / 5xx：统一提示并向下抛出，避免静默失败
   ElMessage.error(error?.message || '网络异常，请稍后重试');
   return Promise.reject(error);
})

export default request