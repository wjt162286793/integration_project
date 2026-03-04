import React, { useEffect } from 'react'
import { Col, Row, List, Badge,Tag, Button } from 'antd';
import { useTranslation } from 'react-i18next';


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
    const { t } = useTranslation();

    const todoList:toItem[] = [
        {
            title: t('workbench.buildFlowChartModel'),
            status: 'todo'
        },
        {
            title: t('workbench.addEthereumDigitalAsset'),
            status: 'todo'
        },
        {
            title: t('workbench.submitLabelPortraitApproval'),
            status: 'todo'
        },
        {
            title: t('workbench.addBitcoinDigitalAsset'),
            status: 'doing'
        },
        {
            title: t('workbench.createValueStreamSwimlane'),
            status: 'doing'
        },
        {
            title: t('workbench.addProcurementFlowChart'),
            status: 'done'
        },

    ];

    const msgList:msgItem[] = [
        {
            title: t('workbench.modelPublished'),
            time: '2023-12-12',
            text: t('workbench.modelPublishedText'),
            by: t('workbench.system'),
            type: 'hasRead'
        },
        {
            title: t('workbench.digitalAssetAdded'),
            time: '2023-12-12',
            text: t('workbench.digitalAssetAddedText'),
            by: t('workbench.system'),
            type: 'noRead'
        },
        {
            title: t('workbench.chartStatisticsChanged'),
            time: '2023-12-12',
            text: t('workbench.chartStatisticsChangedText'),
            by: t('workbench.system'),
            type: 'noRead'
        }
    ]



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
                                            item.status === 'todo' && <Tag color="#2db7f5" className='todoTag'>{t('workbench.todo')}</Tag> 
                                        }
                                        {
                                            item.status === 'doing' && <Tag color="#108ee9" className='todoTag'>{t('workbench.doing')}</Tag> 
                                        }
                                        {
                                            item.status === 'done' && <Tag color="#87d068" className='todoTag'>{t('workbench.done')}</Tag> 
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
                                            item.type === 'noRead' && <Button type='link'>
                                            {t('workbench.unread')}
                                        </Button>
                                        }
                                        {
                                            item.type === 'hasRead' && <Button type='link'>
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