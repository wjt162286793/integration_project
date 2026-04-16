import React, { useEffect, useState } from 'react'
import { Col, Row, List, Badge,Tag, Button } from 'antd';
import { useTranslation } from 'react-i18next';
import { getTodoListApi,getSysMsgListApi } from '@/api'
import { v4 as uuidv4 } from 'uuid'

// 生成uuid
const uuid = uuidv4()
console.log(uuid,'调用===')



interface toItem{
    title:string
    status:string
}

interface msgItem{
    id:string
    create_at:string
    update_at:string
    user_id:string
    title:string
    detail:string
    msg_status:number
    level:number

}
const ListCom: React.FC = () => {
    const { t } = useTranslation();
    const [todoList,setTodoList] = useState<toItem[]>([])
    const [msgList,setMsgList] = useState<msgItem[]>([])

    const fetchTodoList = async ()=>{
        const res:any = await getTodoListApi({ user_id: '00001' })
        if(res && res.code === 200 && Array.isArray(res.data)){
            setTodoList(res.data)
        }
    }
    const fetchSysMsgList = async ()=>{
        const res:any = await getSysMsgListApi({ user_id: '00001' })
        if(res && res.code === 200 && Array.isArray(res.data)){
            setMsgList(res.data)
        }
    }

    useEffect(()=>{
        fetchTodoList()
        fetchSysMsgList()
    },[])



    return (
        <div className='listBox'>
            <Row>
                <Col span={12}>
                    <Badge count={todoList.length} offset={[10, 8]}>
                        <h5>{t('workbench.todoItems')}</h5>
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
                                            item.status === 'pending' && <Tag color="#2db7f5" className='todoTag'>{t('workbench.pending')}</Tag>
                                        }
                                        {
                                            item.status === 'doing' && <Tag color="#108ee9" className='todoTag'>{t('workbench.doing')}</Tag>
                                        }
                                        {
                                            item.status === 'end' && <Tag color="#87d068" className='todoTag'>{t('workbench.end')}</Tag>
                                        }

                                    </div>

                                </List.Item>
                            )}
                        />
                    </div>

                </Col>
                <Col span={12}>
                    <Badge count={2} offset={[10, 8]}>
                        <h5>{t('workbench.systemMessages')}</h5>
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
                                            item.msg_status === 1 && <Button type='link'>
                                                {t('workbench.unread')}
                                            </Button>
                                        }
                                        {
                                            item.msg_status === 0 && <Button type='link'>
                                                <a style={{color:'#97a0a6'}}>{t('workbench.read')}</a>
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
