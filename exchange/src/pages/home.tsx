import React from 'react'

const Index:React.FC = ()=>{
    const useWujieFlag = window?.__POWERED_BY_WUJIE__;

    console.log(useWujieFlag,'判断是否使用无界')

    return (
    <div>
        {
            useWujieFlag?<div>使用无界</div>:<div>没有使用无界</div>
        }
    </div>)
}

export default Index