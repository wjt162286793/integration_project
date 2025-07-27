const userInfo = {
    name:'',
    token:'',
    user_id:''
}
// 参数名改为 state，避免与外部变量冲突
const userInfoHandler = (state = userInfo, action)=>{
    const {type, data} = action  

    switch(type){
        case 'setUserInfo':
            // 将直接返回data改为合并到现有状态
            return {...state, ...data};
        default:
            return state
    }
}

export default userInfoHandler
