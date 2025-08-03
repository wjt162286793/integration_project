import { useEffect, useState } from 'react'
import './index.less';
import { Menu,Button } from 'antd';
import { menuListType } from './type';
import { Outlet, useNavigate, useLocation } from 'react-router-dom';

export default function Dashboard() {
  const navigate = useNavigate();
  const Location = useLocation()

  const menuList: menuListType[] = [
    {
      key: 'workbench',
      label: '工作台',
    },
    {
      key: 'property',
      label: '数字资产',
    },
    {
      key: 'chart',
      label: '数据看板',
    },
    {
      key: 'modeBuild',
      label: '模型构建',
    },
    {
      key: 'fileMode',
      label: '大文件上传',
    },
    // {
    //   key: 'readMe',
    //   label: '说明文档',
    // },
  ];

  const [selectedKeys, changeSelectedKeys] = useState<string[]>(['workbench'])

  const menuItemHandler = (menuItem: { key: string }) => {
    navigate(`/dashBoard/${menuItem.key}`);
    changeSelectedKeys([menuItem.key])
  };

  const initActiveKey = () => {
    console.log(Location, '当前路由信息')
    const pathList = Location.pathname.split('/')
    const routeName: string = pathList[pathList.length - 1]
    
    if (menuList.find(item => item.key === routeName)) {
      console.log('进来了', routeName)
      changeSelectedKeys([routeName])
    }
    if(Location.pathname === '/dashboard'){
      navigate('/dashboard/workbench')
    }
    // const defaultSelectedKeys: string[] = ['workbench'];
  }

  const isSubAppFlag = window.__POWERED_BY_WUJIE__

  const logoutHandler = () => {
    localStorage.removeItem('bigdata_token')
    navigate('/login')
  }
  // 
  useEffect(() => {
    if(!isSubAppFlag){
      let token = localStorage.getItem('bigdata_token')
      if(!token){
        navigate('/login')
      }
    }
    initActiveKey()
  }, [])

  return (
    <div className='appBox'>
      {
        !isSubAppFlag && (
          <div>
            <header className="headerDom">
              <h1 className="legoWord">WJT数字平台</h1>
              <Menu
                theme="dark"
                mode="horizontal"
                selectedKeys={selectedKeys}
                items={menuList}
                style={{ flex: 1, minWidth: 0 }}
                onClick={menuItemHandler}
              />
              <Button style={{color:'#fff',marginTop:'16px',marginRight:'16px'}} type='text' onClick={logoutHandler}>退出登录</Button>
            </header>
            <div className="contentDom">
              <Outlet />
            </div>
          </div>

        )
      }
      {
        isSubAppFlag && (
          <div className='subAppBox'>
            <div className='menu_subApp'>
              <Menu
            theme="dark"
            onClick={menuItemHandler}
            style={{ width: 200 }}
            selectedKeys={selectedKeys}
            mode="inline"
            items={menuList}
          />
            </div>
            <div className="contentDom">
              <Outlet />
            </div>
          </div>

        )
      }


    </div>
  );
}