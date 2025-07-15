import React from 'react'
import { Descriptions,Col, Row,Divider, List, Typography  } from 'antd';
import type { DescriptionsProps,} from 'antd';
import './index.less'

export default function index() {



const todoList = [
  '需要构建1个流程图模型',
  '新增一条数字资产',
  '提交一个流程审批',
];

const msgList = [
  {
    title:'模型已发布',
    time:'2023-12-12',
    text:'你构建的模型已经发布完成,可以进行查看',
    by:'系统',
    type:'hasRead'
  },
  {
    title:'数字资产新增',
    time:'2023-12-12',
    text:'你新增的数字资产已经发布完成,可以进行查看',
    by:'系统',
    type:'noRead'
  },
  {
    title:'图表统计变化',
    time:'2023-12-12',
    text:'图表统计已经发生变化,可以去图表统计模块进行浏览',
    by:'系统',
    type:'noRead'
  }
]

  return (
    <div>
      <div className='modeBox'>
      <h4>应用模块</h4>
      <Row>
      <Col span={8}>
      <div className='colContent'>
        <h5>数字资产</h5>
        <p className='desc'>数字资产是指企业或组织拥有或控制的、能够带来经济利益的数据资源。它通过专业化处理（如清洗、分析、建模）将原始数据转化为可量化、可交易的价值形态。</p>
      </div>
      </Col>
      <Col span={8}>
      <div className='colContent'>
        <h5>统计图表</h5>
        <p className='desc'>统计图表是通过图形化手段展示数据关系、趋势和模式的工具，旨在降低理解门槛，辅助决策。</p>
      </div>
      </Col>
      <Col span={8}>
      <div className='colContent'>
      <h5>模型构建</h5>
        <p className='desc'>模型构建是利用数学、统计学和计算机科学方法，从海量数据中提取规律并构建预测或决策模型的过程。</p>
      </div>
      </Col>
    </Row>
      </div>
      <div className='mainBox'>
      <Row>
      <Col span={12}>
      <h5>待办事项</h5>
      <div className='todoListBox'>
      <List
      bordered
      dataSource={todoList}
      renderItem={(item) => (
        <List.Item>
           {item}
        </List.Item>
      )}
    />
      </div>

      </Col>
      <Col span={12}>
      <h5>系统消息</h5>
      <div className='msgListBox'>
        <List
        bordered
    itemLayout="horizontal"
    dataSource={msgList}
    renderItem={(item, index) => (
      <List.Item>
        <h6>{item.title}</h6>
      </List.Item>
    )}
  />
      </div>



      </Col>
    </Row>
      </div>
    </div>
  )
}
