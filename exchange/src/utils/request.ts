import axios from 'axios'
const api_url = '/exchangeApi'
// import router from '@/router';

// 判断当前环境
const env_mode = import.meta.env.MODE;
console.log(env_mode, 'env_mode的值');

// 检查是否通过主应用代理访问
const isProxy = window.location.pathname.startsWith('/exchange-sub-api');

// 检查是否在无界微前端环境中
const isSubFlag = window.__POWERED_BY_WUJIE__;

// 配置API基础路径
let baseURL = '';

if (isProxy) {
  // 通过主应用代理访问时
  baseURL = '/exchange-sub-api/exchangeApi';
} else if (isSubFlag) {
  // 在无界微前端环境中但非代理访问
  if (env_mode === 'development') {
    baseURL = api_url;
  } else {
    baseURL = 'http://82.157.193.128:8086/exchange-sub-api';
  }
} else {
  // 独立运行时
  baseURL = api_url;
}

// 全局配置axios
const request = axios.create({
  baseURL: baseURL,
  timeout: 6000
});

// 如果需要全局设置axios.defaults.baseURL
// if (window.axios) {
//   window.axios.defaults.baseURL = baseURL;
// }

request.interceptors.request.use((config)=>{
    // 检查请求路径是否包含login，如果不包含则添加token
    if (!config.url?.includes('login')) {
        const token = isSubFlag ? localStorage.getItem('intergration_token') : localStorage.getItem('rx-token');
        if (token) {
            config.headers.authorization = token;
        } else {
            // 显示未登录警告并跳转到登录页
            // 阻止请求继续执行
            return Promise.reject(new Error('未登录'));
        }
    }
    return config;
})

request.interceptors.response.use((config)=>{
    return config.data
})

export default request