import axios from 'axios'

const request = axios.create({
    timeout:6000
})

request.interceptors.request.use((config)=>{
    console.log(config,'请求---')
    return config
})

request.interceptors.response.use((config)=>{
    console.log(config,'响应---')
    return config.data
})

export default request