import axios from 'axios'


const request = axios.create({
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