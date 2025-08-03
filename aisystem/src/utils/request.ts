import axios from 'axios'

const api_url = '/aisysApi'


// 判断当前环境
const env_mode = import.meta.env.MODE;
console.log(env_mode, 'env_mode的值');

// 检查是否通过主应用代理访问
const isProxy = window.location.pathname.startsWith('/aisystem-sub-api');

// 检查是否在无界微前端环境中
const isSubFlag = window.__POWERED_BY_WUJIE__;

// 配置API基础路径
let baseURL = '';

if (isProxy) {
  // 通过主应用代理访问时
  baseURL = '/aisystem-sub-api/aisysApi';
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
    baseURL: baseURL,
    timeout:6000
})

request.interceptors.request.use((config)=>{
    return config;
})

request.interceptors.response.use((config)=>{
   if(config.data.code === 200){
    return config.data
   }
})

export default request