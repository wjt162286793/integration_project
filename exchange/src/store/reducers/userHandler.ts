const userInfo = {
    name:'',
    token:'',
    user_id:''
}
// 参数名改为 state，避免与外部变量冲突
const userInfoHandler = (state = userInfo, action)=>{
  const {type, data} = action  
  console.log(type, data, '操作数据的方法和对应值')
  switch(type){
    case 'setUserInfo':
        return data
    default:
        return state
  }
}

export default userInfoHandler
