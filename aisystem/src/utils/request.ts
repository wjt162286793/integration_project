import axios from 'axios'

const api_url = '/aisystemApi'
const TOKEN_KEY = 'intergration_token'
const env_mode = import.meta.env.MODE;

// 检查是否通过主应用代理访问
const isProxy = window.location.pathname.startsWith('/aisystem-sub-api');
// 检查是否在无界微前端环境中
const isSubFlag = window.__POWERED_BY_WUJIE__;
// 配置API基础路径
let baseURL = '';

if (isProxy) {
  // 通过主应用代理访问时
  baseURL = '/aisystem-sub-api/aisystemApi';
} else if (isSubFlag) {
  // 在无界微前端环境中但非代理访问
  if (env_mode === 'development') {
    baseURL = api_url;
  } else {
    baseURL = 'http://82.157.193.128:8086/aisystem-sub-api';
  }
} else {
  // 独立运行时
  baseURL = api_url;
}

const request = axios.create({
  baseURL,
  timeout: 6000
})

// 添加请求拦截器(参考exchange的token处理)
request.interceptors.request.use((config)=>{
  if (!config.url?.includes('/auth/login')) {
    const token = localStorage.getItem(TOKEN_KEY);
    if (token) {
      config.headers.authorization = `Bearer ${token}`;
    }
  }
  return config;
})

request.interceptors.response.use((config)=>{
   if ([7001, 7002, 7006].includes(config.data.code)) {
    localStorage.removeItem(TOKEN_KEY)
   }
   if(config.data.code === 200){
    return config.data
   }
   return Promise.reject(new Error(config.data.msg || '请求失败'))
})

export default request
