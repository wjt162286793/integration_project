
import React, { useEffect, useState, useMemo } from 'react';
import { PlusOutlined } from '@ant-design/icons';
import { Modal, Input, message } from 'antd';
import './index.less'
import FlowChat from './flowchat/index';
import Organization from './organization/index'
import { useTranslation } from 'react-i18next';
import { modeBuildFlowListApi, modeBuildOrgListApi, modeBuildFlowCreateApi, modeBuildOrgCreateApi, modeBuildFlowDeleteApi, modeBuildOrgDeleteApi } from '@/api';

const EmptyDom: React.FC = () => {
  const { t } = useTranslation();
  return (
    <h4 className='emptyTitle'>
      {t('modeBuild.emptyTitle')}
    </h4>
  )
}

type MenuItem = {
  id: string
  name: string
  cname: string
  ename: string
  type: 'flow' | 'organization'
}

type MenuGroup = {
  name: string
  cname: string
  ename: string
  type: 'flow' | 'organization'
  children: MenuItem[]
}

const Index: React.FC = () => {
  const { i18n, t } = useTranslation();
  const [activeKey, setActiveKey] = useState<string>('')
  const [activeCom, setActiveCom] = useState<React.ReactNode>(<EmptyDom></EmptyDom>)
  const [loading, setLoading] = useState<boolean>(false)
  const [flowList, setFlowList] = useState<MenuItem[]>([])
  const [orgList, setOrgList] = useState<MenuItem[]>([])
  const [createOpen, setCreateOpen] = useState(false)
  const [createType, setCreateType] = useState<'flow' | 'organization'>('flow')
  const [createName, setCreateName] = useState('')

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

  const openCreateModal = (type: 'flow' | 'organization') => {
    setCreateType(type)
    setCreateName('')
    setCreateOpen(true)
  }

  const handleCreateOk = () => {
    const name = createName.trim()
    if (!name) {
      message.warning(t('modeBuild.modelNameCannotBeEmpty'))
      return
    }
    const payload = { user_id: '00001', name, cname: name, ename: name }
    if (createType === 'flow') {
      modeBuildFlowCreateApi(payload).then((res: any) => {
        if (res && res.code === 200 && res.data) {
          const item: MenuItem = {
            id: res.data.id,
            name: res.data.name,
            cname: res.data.cname,
            ename: res.data.ename,
            type: 'flow'
          }
          setFlowList((prev) => [item, ...prev])
          setCreateOpen(false)
          useLinkClickHandler(item.id, 'flow')
        }
      })
      return
    }
    modeBuildOrgCreateApi(payload).then((res: any) => {
      if (res && res.code === 200 && res.data) {
        const item: MenuItem = {
          id: res.data.id,
          name: res.data.name,
          cname: res.data.cname,
          ename: res.data.ename,
          type: 'organization'
        }
        setOrgList((prev) => [item, ...prev])
        setCreateOpen(false)
        useLinkClickHandler(item.id, 'organization')
      }
    })
  }

  const handleDelete = (item: any) => {
    Modal.confirm({
      content: t('modeBuild.confirmDeleteModel', { name: item.displayName || item.name || '' }),
      okText: t('common.confirm'),
      cancelText: t('common.cancel'),
      onOk: async () => {
        const id = item.id
        if (item.type === 'flow') {
          const res: any = await modeBuildFlowDeleteApi({ id })
          if (res && res.code === 200) {
            setFlowList((prev) => prev.filter((x) => x.id !== id))
          }
        } else {
          const res: any = await modeBuildOrgDeleteApi({ id })
          if (res && res.code === 200) {
            setOrgList((prev) => prev.filter((x) => x.id !== id))
          }
        }
        if (activeKey === id) {
          setActiveKey('')
          setLoading(false)
          setActiveCom(<EmptyDom></EmptyDom>)
        }
      }
    })
  }

  useEffect(() => {
    modeBuildFlowListApi({ user_id: '00001' }).then((res: any) => {
      if (res && res.code === 200 && Array.isArray(res.data)) {
        setFlowList(
          res.data.map((item: any) => ({
            id: String(item.id),
            name: String(item.name || ''),
            cname: String(item.cname || item.name || ''),
            ename: String(item.ename || item.name || ''),
            type: 'flow'
          }))
        )
      }
    })
    modeBuildOrgListApi({ user_id: '00001' }).then((res: any) => {
      if (res && res.code === 200 && Array.isArray(res.data)) {
        setOrgList(
          res.data.map((item: any) => ({
            id: String(item.id),
            name: String(item.name || ''),
            cname: String(item.cname || item.name || ''),
            ename: String(item.ename || item.name || ''),
            type: 'organization'
          }))
        )
      }
    })
  }, [])

  const localizedMenuList = useMemo(() => {
    const menuList: MenuGroup[] = [
      {
        name: '流程图',
        cname: '流程图',
        ename: 'Flow Chart',
        type: 'flow',
        children: flowList
      },
      {
        name: '结构图',
        cname: '结构图',
        ename: 'Structure Chart',
        type: 'organization',
        children: orgList
      }
    ]
    return menuList.map(Item => ({
      ...Item,
      displayName: i18n.language === 'zh-CN' ? Item.cname : Item.ename,
      children: Item.children.map(item => ({
        ...item,
        displayName: i18n.language === 'zh-CN' ? item.cname : item.ename
      }))
    }));
  }, [i18n.language, flowList, orgList]);

  return (
    <div className='mainBox'>
      <div className='leftMenu'>
        {
          localizedMenuList.map(Item => {
            return (
              <div key={Item.type}>
                <h4 className='Title'>
                  <span>{Item.displayName}</span>
                  <PlusOutlined className='addIcon' onClick={() => openCreateModal(Item.type)} />
                </h4>
                <ul>
                  {
                    Item.children.map(item => {
                      return (<li key={item.id} className={activeKey === item.id ? 'liItemActive' : 'liItem'} onClick={() => useLinkClickHandler(item.id, item.type)} >
                        <span className='menuItemName'>{item.displayName}</span>
                        <span className='deleteBtn' onClick={(e) => { e.stopPropagation(); handleDelete(item) }}>{t('common.delete')}</span>
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

      <Modal
        title={t('modeBuild.createModelTitle')}
        open={createOpen}
        onOk={handleCreateOk}
        onCancel={() => setCreateOpen(false)}
        okText={t('common.confirm')}
        cancelText={t('common.cancel')}
      >
        <div className='createRow'>
          <div className='createLabel'>{t('modeBuild.modelName')}</div>
          <Input
            value={createName}
            placeholder={t('modeBuild.pleaseEnterModelName')}
            onChange={(e) => setCreateName(e.target.value)}
          />
        </div>
      </Modal>

    </div>


  );
};

export default Index;
