import axios from 'axios'

const request = axios.create({
    baseURL:'/api',
    timeout:6000
})

request.interceptors.request.use((config)=>{
    return config
})

request.interceptors.response.use((config)=>{
    return config
})

export default request