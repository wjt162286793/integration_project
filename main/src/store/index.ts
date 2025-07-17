import {ref} from 'vue'
import {defineStore} from 'pinia'




export const userStore = defineStore('userInfo',{
  state:()=>{
    return {
      user:{} 
    }
  },
  actions:{
    setUser(user:any){
      this.user = user
    }
  }
})