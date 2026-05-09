import axios from 'axios'
const TOKEN_KEY = 'intergration_token'

// 判断当前环境
const env_mode = import.meta.env.MODE;
console.log(env_mode, '当前环境');

// 检查是否在无界微前端环境中
const isSubFlag = window.__POWERED_BY_WUJIE__;

// 配置API基础路径
let baseURL = '';

if (isSubFlag) {
  baseURL = '/bigdata-sub-api/bigdataApi';
} else if (env_mode === 'development') {
  baseURL = '/bigdataApi';
} else {
  const apiPrefix = (import.meta.env.VITE_API_URL || '/bigdata-sub-api').replace(/\/$/, '');
  baseURL = `${apiPrefix}/bigdataApi`;
}


const request = axios.create({
    baseURL: baseURL,
    timeout:6000
})

request.interceptors.request.use((config)=>{
    if (!config.url?.includes('/auth/login')) {
      const token = localStorage.getItem(TOKEN_KEY)
      if (token) {
        config.headers.authorization = `Bearer ${token}`
      }
    }
    return config
})

request.interceptors.response.use((config)=>{
    if ([7001, 7002, 7006].includes(config.data.code)) {
      localStorage.removeItem(TOKEN_KEY)
    }
    return config.data
})

export default request
