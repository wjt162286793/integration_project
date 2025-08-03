import axios from 'axios'

const api_url = '/aisystemApi'

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

// 添加请求拦截器(参考exchange的token处理)
request.interceptors.request.use((config)=>{
  // 检查请求路径是否包含login，如果不包含则添加token
  if (!config.url?.includes('login')) {
    const token = isSubFlag ? localStorage.getItem('intergration_token') : localStorage.getItem('aisys-token');
    if (token) {
      config.headers.authorization = token;
    }
  }
  return config;
})

request.interceptors.response.use((config)=>{
   if(config.data.code === 200){
    return config.data
   }
})

export default request