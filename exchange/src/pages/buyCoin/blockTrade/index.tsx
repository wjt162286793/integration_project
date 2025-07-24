import React , {useState,useEffect} from 'react'
import { Carousel, Row, Col, Tabs } from 'antd';
import blockImg1 from '@/assets/img/blockImg1.png'
import blockImg2 from '@/assets/img/blockImg2.png'
import blockImg3 from '@/assets/img/blockImg3.png'
import blockImg4 from '@/assets/img/blockImg4.png'
import './index.less'
import { Outlet , useNavigate, useLocation} from 'react-router-dom';

const items = [
  {
    key: 'buyList',
    label: '购买',
  },
  {
    key: 'sellList',
    label: '出售',
  },
  {
    key: 'betList',
    label: '盘口模式',
  },
];


const Index: React.FC = () => {

    const location = useLocation();
    const navigate = useNavigate();
    const [loadChild, setLoadChild] = useState(false)

    const [activeKey,setActiveKey] = useState('buyList');
    const onChange = (key:string)=>{
        setActiveKey(key)
        navigate(`/home/buyCoin/blockTrade/${key}`)
    }

        useEffect(() => {
        setLoadChild(true)

    }, [])

    useEffect(()=>{
        if(loadChild){
           console.log(location, 'location的值----blockTrade')
        let list = location.pathname.split('/')
        if (location.pathname === '/home/buyCoin/blockTrade') {
            navigate('/home/buyCoin/blockTrade/buyList')
        } else if (list.includes('buyList')) {
            setActiveKey('sellList')
            navigate('/home/buyCoin/blockTrade/buyList')
        } else if (list.includes('sellList')) {
            setActiveKey('buyList')
            navigate('/home/buyCoin/blockTrade/sellList')
        }
        else if (list.includes('betList')) {
            setActiveKey('betList')
            navigate('/home/buyCoin/blockTrade/betList')
        }
        }

    },[loadChild])

    //     useEffect(()=>{
    //     console.log('进入blockTrade组件',location)
    //     if(location.pathname === '/home/buyCoin/blockTrade'){
    //         navigate('/home/buyCoin/blockTrade/buyList')
    //     }
    //     let list = location.pathname.split('/')
    //     if(list.includes('buyList')){
    //         setActiveKey('buyList')
    //     }else if(list.includes('sellList')){
    //         setActiveKey('sellList')
    //     }else if(list.includes('betList')){
    //         setActiveKey('betList')
    //     }
    // },[])

    return (
        <div>
            <p className='tipP'>0手续买卖数字货币</p>
            <Row className='imgList'>
                <Col span={6} className='colItem'>
                    <img src={blockImg1} alt="" />
                    <p className='itemP'>警惕C2C诈骗,守护账户安全</p>
                    <p className='moreP'>了解更多</p>
                </Col>
                <Col span={6} className='colItem'>
                    <img src={blockImg2} alt="" />
                    <p className='itemP'>买币立享赚币收益</p>
                    <p className='moreP'>了解更多</p>
                </Col>
                <Col span={6} className='colItem'>
                    <img src={blockImg3} alt="" />
                    <p className='itemP'>如何使用C2C买币/卖币</p>
                    <p className='moreP'>了解更多</p>
                </Col>
                <Col span={6} className='colItem'>
                    <img src={blockImg4} alt="" />
                    <p className='itemP'>欧易认证商家申请方式</p>
                    <p className='moreP'>了解更多</p>
                </Col>
            </Row>

            <div className='content'>
             <Tabs activeKey={activeKey} items={items} onChange={onChange} />
            </div>
            {
                loadChild && (
                   <Outlet />
                )
            }
           
        </div>
    )
}

export default Index