import { useEffect, useState } from 'react'
import './index.less';
import { Menu,Button, Space } from 'antd';
import { menuListType } from './type';
import { Outlet, useNavigate, useLocation } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import LanguageSwitcher from '@/components/LanguageSwitcher';

export default function Dashboard() {
  const navigate = useNavigate();
  const Location = useLocation()
  const { t } = useTranslation();

  const menuList: menuListType[] = [
    {
      key: 'workbench',
      label: t('common.workbench'),
    },
    {
      key: 'property',
      label: t('common.property'),
    },
    {
      key: 'chart',
      label: t('common.chart'),
    },
    {
      key: 'modeBuild',
      label: t('common.modeBuild'),
    },
    {
      key: 'fileMode',
      label: t('common.fileMode'),
    },
    // {
    //   key: 'readMe',
    //   label: t('common.readMe'),
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
    if(Location.pathname === '/dashBoard'){
      navigate('/dashBoard/workbench')
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
              <h1 className="legoWord">{t('common.platformName')}</h1>
              <Menu
                theme="dark"
                mode="horizontal"
                selectedKeys={selectedKeys}
                items={menuList}
                style={{ flex: 1, minWidth: 0 }}
                onClick={menuItemHandler}
              />
              <Space style={{marginTop:'16px',marginRight:'16px'}}>
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