import { useEffect, useState, useMemo } from 'react'
import './index.less';
import { Menu,Button, Space } from 'antd';
import { menuListType } from './type';
import { Outlet, useNavigate, useLocation } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import LanguageSwitcher from '@/components/LanguageSwitcher';
import { routeList } from '@/router/index';

export default function Dashboard() {
  const navigate = useNavigate();
  const Location = useLocation()
  const { t, i18n } = useTranslation();

  const menuList: menuListType[] = useMemo(() => {
    const dashBoardRoute = routeList.find(item => item.name === 'dashBoard');
    const children = dashBoardRoute?.children || [];
    const visibleRoutes = children.filter(child => child.name !== 'readMe');
    return visibleRoutes.map(child => ({
      key: child.name,
      label: i18n.language === 'zh-CN' ? child.cname : child.ename,
    }));
  }, [i18n.language]);

  const [selectedKeys, changeSelectedKeys] = useState<string[]>(['workbench'])

  const menuItemHandler = (menuItem: { key: string }) => {
    navigate(`/dashBoard/${menuItem.key}`);
    changeSelectedKeys([menuItem.key])
  };

  const initActiveKey = () => {
    const pathList = Location.pathname.split('/')
    const routeName: string = pathList[pathList.length - 1]
    
    if (menuList.find(item => item.key === routeName)) {
      changeSelectedKeys([routeName])
    }
    if(Location.pathname === '/dashBoard'){
      navigate('/dashBoard/workbench')
    }
    // const defaultSelectedKeys: string[] = ['workbench'];
  }

  const isSubAppFlag = window.__POWERED_BY_WUJIE__

  const logoutHandler = () => {
    localStorage.removeItem('intergration_token')
    navigate('/login')
  }
  // 
  useEffect(() => {
    if(!isSubAppFlag){
      let token = localStorage.getItem('intergration_token')
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
              <h1 className="legoWord">{t('common.platformName')}</h1>
              <Menu
                theme="dark"
                mode="horizontal"
                selectedKeys={selectedKeys}
                items={menuList}
                style={{ flex: 1, minWidth: 0 }}
                onClick={menuItemHandler}
              />
              <Space style={{marginRight:'16px'}}>
                <LanguageSwitcher />
                <Button style={{color:'#fff'}} type='text' onClick={logoutHandler}>{t('common.logout')}</Button>
              </Space>
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
