import React, { useState } from 'react';
import { Space, Table, Tag, Input, Select, Button } from 'antd';
import type { TableProps } from 'antd';
import { useTranslation } from 'react-i18next';
import { DataType, queryType, optionsType } from './type'
import './index.less'




const Index: React.FC = () => {
  const { t } = useTranslation();

  const columns: TableProps<DataType>['columns'] = [
    {
      title: t('property.name'),
      dataIndex: 'name',
      key: 'name',
      render: (text) => <a>{text}</a>,
    },
    {
      title: t('property.price'),
      dataIndex: 'price',
      key: 'price',
    },
    {
      title: t('property.source'),
      dataIndex: 'source',
      key: 'source',
    },
    {
      title: t('property.type'),
      dataIndex: 'type',
      key: 'type',
    },
    {
      title: t('property.level'),
      dataIndex: 'level',
      key: 'level',
    },
    {
      title: t('property.tags'),
      key: 'tags',
      dataIndex: 'tags',
      render: (_, { tags }) => (
        <>
          {tags.map((tag) => {
            let color = tag.length > 5 ? 'geekblue' : 'green';
            if (tag === 'loser') {
              color = 'volcano';
            }
            return (
              <Tag color={color} key={tag}>
                {tag.toUpperCase()}
              </Tag>
            );
          })}
        </>
      ),
    },
    {
      title: t('property.status'),
      dataIndex: 'status',
      key: 'status',
    },
    {
      title: t('property.liableName'),
      dataIndex: 'liable_name',
      key: 'liable_name',
    },
    {
      title: t('property.createTime'),
      dataIndex: 'create_time',
      key: 'create_time',
    },
    {
      title: t('property.updateTime'),
      dataIndex: 'update_time',
      key: 'update_time',
    },
    // {
    //   title: 'Action',
    //   key: 'action',
    //   render: (_, record) => (
    //     <Space size="middle">
    //       <a>编辑</a>
    //       <a>下架</a>
    //     </Space>
    //   ),
    // },
  ];

  const data: DataType[] = [
    {
      id: 1,
      name: t('property.aiModel'),
      price: 100000,
      source: t('property.smartHatchingBase'),
      tags: [t('property.bigModel'), t('property.aiResearch')],
      status: t('property.inUse'),
      type: t('property.aiAsset'),
      level: 2,
      liable_name: '王惊涛',
      create_time: '2022-02-11',
      update_time: '2024-05-20'
    },
    {
      id: 2,
      name: t('property.bigWaterCoin'),
      price: 450000,
      source: t('property.cryptoAssetManagement'),
      tags: [t('property.cryptoCurrency'), t('property.virtualCurrency')],
      status: t('property.closed'),
      type: t('property.virtualAsset'),
      level: 3,
      liable_name: '王惊涛',
      create_time: '2024-01-01',
      update_time: '2025-6-16'
    }

  ];

  const [query, setQuery] = useState<queryType>({
    name: '',
    level: null,
    status: '应用中'
  })

  const changeLevel = (value) => {
    console.log(value, 'value的值')
  }

  const changeStatus = (value) => {

  }

  const levelOptions: optionsType[] = [
    {
      label: '1',
      value: 1
    },
    {
      label: '2',
      value: 2
    },
    {
      label: '3',
      value: 3
    }
  ]

  const statusOptions: optionsType[] = [
    {
      label: '应用中',
      value: 1
    },
    {
      label: '封闭中',
      value: 2
    },
    {
      label: '已下架',
      value: 3
    }
  ]

  return (<>
    <div className='searchBox'>
      <span className='searchLabel'>{t('property.searchAssetName')}</span>
      <Input placeholder={t('property.enterAssetName')} value={query.name} className='searchItem' />
      {/* <span className='searchLabel'>资产等级:</span>
      <Select value={query.level} options={levelOptions} onChange={changeLevel} className='searchItem' />
      <span className='searchLabel'>资产状态:</span>
      <Select value={query.status} options={statusOptions} onChange={changeStatus} className='searchItem' /> */}
      <Button className='searchBtn' type='primary'>{t('property.search')}</Button>
    </div>
    <div className='tableBox'>
      <Table<DataType> columns={columns} dataSource={data} rowKey='id' />
    </div>
  </>)
}




export default Index;