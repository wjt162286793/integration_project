import React, { useEffect } from 'react'
import { Col, Row, List, Badge,Tag } from 'antd';


const ListCom: React.FC = () => {

    const todoList = [
        {
            title: '构建1个流程图模型',
            status: 'todo'
        },
        {
            title: '新增一条以太坊数字资产',
            status: 'todo'
        },
        {
            title: '提交一个标签画像的流程审批',
            status: 'todo'
        },
        {
            title: '新增一条比特币数字资产',
            status: 'doing'
        },
        {
            title: '新建一条价值流泳道图',
            status: 'doing'
        },
        {
            title: '新增一条采购流程图',
            status: 'done'
        },

    ];

    const msgList = [
        {
            title: '模型已发布',
            time: '2023-12-12',
            text: '你构建的模型已经发布完成,可以进行查看',
            by: '系统',
            type: 'hasRead'
        },
        {
            title: '数字资产新增',
            time: '2023-12-12',
            text: '你新增的数字资产已经发布完成,可以进行查看',
            by: '系统',
            type: 'noRead'
        },
        {
            title: '图表统计变化',
            time: '2023-12-12',
            text: '图表统计已经发生变化,可以去图表统计模块进行浏览',
            by: '系统',
            type: 'noRead'
        }
    ]



    return (
        <div className='mainBox'>
            <Row>
                <Col span={12}>
                    <Badge count={todoList.length} offset={[10, 8]}>
                        <h5>待办事项</h5>
                    </Badge>

                    <div className='todoListBox'>
                        <List
                            bordered
                            dataSource={todoList}
                            renderItem={(item) => (
                                <List.Item>
                                    <div className='todoItem'>
                                        <p>{item.title}</p>
                                        {
                                            item.status === 'todo' && <Tag color="#2db7f5" className='todoTag'>待办中</Tag> 
                                        }
                                        {
                                            item.status === 'doing' && <Tag color="#108ee9" className='todoTag'>进行中</Tag> 
                                        }
                                        {
                                            item.status === 'done' && <Tag color="#87d068" className='todoTag'>已完成</Tag> 
                                        }
                                         
                                    </div>

                                </List.Item>
                            )}
                        />
                    </div>

                </Col>
                <Col span={12}>
                    <Badge count={todoList.length} offset={[10, 8]}>
                        <h5>系统消息</h5>
                    </Badge>
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
    )
}
export default ListCom