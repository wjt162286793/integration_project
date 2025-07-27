import React, { useEffect, useState } from 'react'
import { Outlet, useNavigate, useLocation } from 'react-router-dom'



const Index: React.FC = () => {

    const location = useLocation();
    const navigate = useNavigate();

    const [loadChild, setLoadChild] = useState(false)




    useEffect(() => {
        setLoadChild(true)
        console.log(location, 'location的值----fast')
        // 获取当前Query参数
        const queryParams = location.search;
        let list = location.pathname.split('/')
        if (location.pathname === '/home/buyCoin/fast') {
            // 附加Query参数
            navigate(`/home/buyCoin/fast/portal${queryParams}`)
        } else if (list.includes('portal')) {
            setLoadChild(true)
            navigate(`/home/buyCoin/fast/portal${queryParams}`)
        } else if (list.includes('payMethod')) {
            setLoadChild(true)
            navigate(`/home/buyCoin/fast/payMethod${queryParams}`)
        }
    }, [location.search, navigate]) // 添加必要依赖

    return (
        <>
           {
            loadChild && (<Outlet></Outlet>)
           }
            
        </>

    )
}

export default Index