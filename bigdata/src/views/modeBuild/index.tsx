
import React, { useEffect, useState, useMemo } from 'react';
import menuList from './data';
import { PlusOutlined } from '@ant-design/icons';
import './index.less'
import FlowChat from './flowchat/index';
import Organization from './organization/index'
import { useTranslation } from 'react-i18next';

const EmptyDom: React.FC = () => {
  const { t } = useTranslation();
  return (
    <h4 className='emptyTitle'>
      {t('modeBuild.emptyTitle')}
    </h4>
  )
}

const Index: React.FC = () => {
  const { i18n } = useTranslation();
  const [activeKey, setActiveKey] = useState<string>('')
  const [activeCom, setActiveCom] = useState<React.ReactNode>(<EmptyDom></EmptyDom>)
  const [loading, setLoading] = useState<boolean>(false)

  const useLinkClickHandler = (id: string, type: string) => {
    setLoading(false)
    setActiveKey(id)
    switch (type) {
      case 'flow':
        setLoading(true)
        setActiveCom(<FlowChat id={id}></FlowChat>);
        break
      case 'organization':
        setLoading(true)
        setActiveCom(<Organization id={id}></Organization>);
        break
    }
  }

  const addChart = (type: string) => {
    setLoading(false)
    setActiveKey('')
    switch (type) {
      case 'flow':
        setLoading(true)
        setActiveCom(<FlowChat id={null}></FlowChat>)
        break
      case 'organization':
        setLoading(true)
        setActiveCom(<Organization id={null}></Organization>);
        break
    }
  }

  const localizedMenuList = useMemo(() => {
    return menuList.map(Item => ({
      ...Item,
      displayName: i18n.language === 'zh-CN' ? Item.cname : Item.ename,
      children: Item.children.map(item => ({
        ...item,
        displayName: i18n.language === 'zh-CN' ? item.cname : item.ename
      }))
    }));
  }, [i18n.language]);

  return (
    <div className='mainBox'>
      <div className='leftMenu'>
        {
          localizedMenuList.map(Item => {
            return (
              <div key={Item.type}>
                <h4 className='Title'>
                  <span>{Item.displayName}</span>
                  <PlusOutlined className='addIcon' onClick={() => addChart(Item.type)} />
                </h4>
                <ul>
                  {
                    Item.children.map(item => {
                      return (<li key={item.id} className={activeKey === item.id ? 'liItemActive' : 'liItem'} onClick={() => useLinkClickHandler(item.id, item.type)} >
                        {item.displayName}
                      </li>)
                    })
                  }
                </ul>

              </div>

            )

          })
        }
      </div>
      <div className='contentBox'>
        {loading && activeCom}
      </div>


    </div>


  );
};

export default Index;