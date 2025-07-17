import React, { useEffect } from 'react'
import { Col, Row, List, Badge,Tag, Button } from 'antd';


interface toItem{
    title:string
    status:string
}

interface msgItem{
    title:string
    time:string
    text:string
    by:string
    type:string
}
const ListCom: React.FC = () => {

    const todoList:toItem[] = [
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

    const msgList:msgItem[] = [
        {
            title: '模型已发布',
            time: '2023-12-12',
            text: '你构建的模型已经发布完成,可以进行查看,链接地址为:xxx',
            by: '系统',
            type: 'hasRead'
        },
        {
            title: '数字资产新增',
            time: '2023-12-12',
            text: '你新增的数字资产已经发布完成,可以进行查看,链接地址为:xxx',
            by: '系统',
            type: 'noRead'
        },
        {
            title: '图表统计变化',
            time: '2023-12-12',
            text: '图表统计已经发生变化,可以去图表统计模块进行浏览,链接地址为:xxx',
            by: '系统',
            type: 'noRead'
        }
    ]



    return (
        <div className='listBox'>
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
                    <Badge count={2} offset={[10, 8]}>
                        <h5>系统消息</h5>
                    </Badge>
                    <div className='msgListBox'>
                        <List
                            bordered
                            itemLayout="horizontal"
                            dataSource={msgList}
                            renderItem={(item, index) => (
                                <List.Item>
                                    <div className='msgItem'>
                                        <p>{item.title}</p>
                                        {
                                            item.type === 'noRead' && <Button type='link'>
                                            未读
                                        </Button>
                                        }
                                        {
                                            item.type === 'hasRead' && <Button type='link'>
                                                <a style={{color:'#97a0a6'}}>已读</a> 
                                            </Button> 
                                        }
                                    </div>
                                    
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