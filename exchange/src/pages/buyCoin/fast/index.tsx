import React, { useEffect, useState } from 'react'
import { Outlet, useNavigate, useLocation } from 'react-router-dom'



const Index: React.FC = () => {

    const location = useLocation();
    const navigate = useNavigate();

    const [loadChild, setLoadChild] = useState(false)

    // 删除整个useEffect钩子
    // useEffect(()=>{
    //     console.log('进入了----,fast组件', location.pathname)
    //     const fastRootRegex = /^\/home\/buyCoin\/fast\/?$/;
    //     if (fastRootRegex.test(location.pathname)) {
    //         navigate('/home/buyCoin/fast/portal');
    //     }
    // }, [navigate]);
    // 移除location.pathname依赖，确保只在组件挂载时执行一次
    // }, [navigate]); // 仅保留navigate作为依赖

    // useEffect(()=>{
    //     console.log('进入fast组件',location)
    //     if(location.pathname === '/home/buyCoin/fast'){
    //         navigate('/home/buyCoin/fast/portal')
    //     }
    // },[])



    useEffect(() => {
        setLoadChild(true)
        console.log(location, 'location的值----fast')
        let list = location.pathname.split('/')
        if (location.pathname === '/home/buyCoin/fast') {
            navigate('/home/buyCoin/fast/portal')
        } else if (list.includes('portal')) {
            setLoadChild(true)
            navigate('/home/buyCoin/fast/portal')
        } else if (list.includes('payMethod')) {
            setLoadChild(true)
            navigate('/home/buyCoin/fast/payMethod')
        }
    }, [])

    return (
        <>
           {
            loadChild && (<Outlet></Outlet>)
           }
            
        </>

    )
}

export default Index