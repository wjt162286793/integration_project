const loginModalFlag = false
// 参数名改为 state，避免与外部变量冲突
const loginModalFlagHandler = (state = loginModalFlag, action: { type: string, data: boolean }) => {
    const {type, data} = action  
    console.log(type, data, '操作数据的方法和对应值')
    switch(type){
        case 'setLoginModalFlag':
            // 将直接返回data改为合并到现有状态
            return data
        default:
            return state
    }
}

export default loginModalFlagHandler
