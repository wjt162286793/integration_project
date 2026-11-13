
import React, { useMemo, useState } from 'react';
import menuList from './data';
import { ArrowLeftOutlined, EditOutlined, ExpandOutlined, EyeOutlined, PlusOutlined } from '@ant-design/icons';
import { Button, Card, Empty, Space, Tag } from 'antd';
import './index.less'
import FlowChat from './flowchat/index';
import Organization from './organization/index'
import Preview from './preview'

const typeMeta: Record<string, { title: string; description: string; color: string }> = {
  flow: { title: '流程图', description: '梳理业务步骤、状态流转和自动化任务。', color: '#1769ff' },
  organization: { title: '结构图', description: '编辑组织、层级和上下级关系。', color: '#16a673' },
  mind: { title: '思维导图', description: '围绕主题拆解分析维度和行动分支。', color: '#7a63eb' },
  pipeline: { title: '数据管道', description: '展示数据源、加工任务和数据仓库链路。', color: '#e29b31' },
  topology: { title: '服务拓扑', description: '描述服务、接口和基础设施的依赖关系。', color: '#0f9fa8' },
}

const Index: React.FC = () => {
  const [editor, setEditor] = useState<{ id?: string; type: string; title: string; readOnly: boolean } | null>(null)
  const [fullscreen, setFullscreen] = useState(false)
  const instances = useMemo(() => menuList.flatMap((group) => group.children), [])

  const openEditor = (type: string, title: string, id?: string, readOnly = false) => setEditor({ type, title, id, readOnly })
  const renderEditor = () => {
    if (!editor) return null
    if (editor.type === 'flow') return <FlowChat id={editor.id} readOnly={editor.readOnly} />
    if (editor.type === 'organization') return <Organization id={editor.id} readOnly={editor.readOnly} />
    return <Preview id={editor.id} title={editor.title} readOnly={editor.readOnly} type={editor.type as 'mind' | 'pipeline' | 'topology'} />
  }

  if (editor) {
    return <div className={`model-editor-shell ${fullscreen ? 'model-editor-fullscreen' : ''}`}>
      <div className="model-editor-header">
        <Space>
          <Button icon={<ArrowLeftOutlined />} onClick={() => setEditor(null)}>返回模型库</Button>
          <Tag color={typeMeta[editor.type]?.color}>{typeMeta[editor.type]?.title}</Tag>
          <strong>{editor.title}</strong>
        </Space>
        {!editor.readOnly && <Button icon={<ExpandOutlined />} onClick={() => setFullscreen((value) => !value)}>
          {fullscreen ? '退出全屏' : '画布全屏'}
        </Button>}
      </div>
      <div className="model-editor-content">{renderEditor()}</div>
    </div>
  }

  return <div className="model-library">
    <div className="model-library-heading">
      <div><span className="eyebrow">MODEL STUDIO</span><h2>模型构建</h2><p>先选择图形类型，再查看已有实例或创建新的可编辑模型。</p></div>
    </div>
    <div className="model-type-grid">
      {Object.entries(typeMeta).map(([type, meta]) => <Card key={type} className="model-type-card" hoverable>
        <span className="model-type-icon" style={{ background: meta.color }}>{meta.title.slice(0, 1)}</span>
        <div><h3>{meta.title}</h3><p>{meta.description}</p></div>
        <Button type="primary" icon={<PlusOutlined />} onClick={() => openEditor(type, `新建${meta.title}`)}>新建模型</Button>
      </Card>)}
    </div>
    <Card className="model-instance-card" title="已构建实例" extra={<span className="muted">{instances.length} 个实例</span>}>
      {instances.length ? <div className="model-instance-grid">{instances.map((item) => {
        const meta = typeMeta[item.type]
        return <div className="model-instance-row" key={item.id}>
          <span className="model-type-icon small" style={{ background: meta.color }}>{meta.title.slice(0, 1)}</span>
          <div className="model-instance-info"><strong>{item.name}</strong><span>{meta.title} · 可继续编辑节点和连线</span></div>
          <Space><Button type="link" icon={<EyeOutlined />} onClick={() => openEditor(item.type, item.name, item.id, true)}>查看</Button><Button type="link" icon={<EditOutlined />} onClick={() => openEditor(item.type, item.name, item.id, false)}>编辑</Button></Space>
        </div>
      })}</div> : <Empty description="还没有构建实例" />}
    </Card>
  </div>
}

export default Index;
