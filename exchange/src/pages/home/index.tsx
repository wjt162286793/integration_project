import React, { useEffect,useState  } from 'react'
import  Header  from '@/component/Header'
import { useNavigate , useLocation, Outlet} from 'react-router-dom'; // ✅ 正确导入
import { useRouteName } from '@/hooks/useRouteName';
const Index:React.FC = ()=>{

    const navigate = useNavigate(); 
    const location = useLocation()

    const [loadChild,setLoadChild] = useState(false)


    
    const jumpRoute = (item)=>{
       navigate(item.path)
       
    }

    useEffect(()=>{
       setLoadChild(true)

    },[])

    useEffect(()=>{
        if(loadChild){
            console.log(location,'home--loadChild')
        }
    },[loadChild])

    return (
        <div>
            <Header jumpRoute={jumpRoute}></Header>
            {
                loadChild && (
                    <Outlet></Outlet>
                )
              
            }
            
        </div>
    )
}

export default Index