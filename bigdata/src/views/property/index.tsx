import React, { useState } from 'react';
import { Space, Table, Tag, Input, Select, Button } from 'antd';
import type { TableProps } from 'antd';
import { DataType, queryType, optionsType } from './type'
import './index.less'




const Index: React.FC = () => {

  const columns: TableProps<DataType>['columns'] = [
    {
      title: '名称',
      dataIndex: 'name',
      key: 'name',
      render: (text) => <a>{text}</a>,
    },
    {
      title: '价值',
      dataIndex: 'price',
      key: 'price',
    },
    {
      title: '归属',
      dataIndex: 'source',
      key: 'source',
    },
    {
      title: '分类',
      dataIndex: 'type',
      key: 'type',
    },
    {
      title: '级别',
      dataIndex: 'level',
      key: 'level',
    },
    {
      title: '标签',
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
      title: '状态',
      dataIndex: 'status',
      key: 'status',
    },
    {
      title: '负责人',
      dataIndex: 'liable_name',
      key: 'liable_name',
    },
    {
      title: '创建时间',
      dataIndex: 'create_time',
      key: 'create_time',
    },
    {
      title: '更新时间',
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
      name: 'AI模型',
      price: 100000,
      source: '智能孵化基地',
      tags: ['大模型', 'AI研发'],
      status: '应用中',
      type: 'AI资产',
      level: 2,
      liable_name: '王惊涛',
      create_time: '2022-02-11',
      update_time: '2024-05-20'
    },
    {
      id: 2,
      name: '大水币',
      price: 450000,
      source: '加密资产管理部',
      tags: ['加密货币', '虚拟货币'],
      status: '封闭中',
      type: '虚拟资产',
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
      <span className='searchLabel'>资产名称:</span>
      <Input placeholder="请输入资产名称" value={query.name} className='searchItem' />
      {/* <span className='searchLabel'>资产等级:</span>
      <Select value={query.level} options={levelOptions} onChange={changeLevel} className='searchItem' />
      <span className='searchLabel'>资产状态:</span>
      <Select value={query.status} options={statusOptions} onChange={changeStatus} className='searchItem' /> */}
      <Button className='searchBtn' type='primary'>查询</Button>
    </div>
    <div className='tableBox'>
      <Table<DataType> columns={columns} dataSource={data} rowKey='id' />
    </div>
  </>)
}




export default Index;