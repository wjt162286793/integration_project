import React, { useEffect, useRef, useState } from 'react'
import { Button, Card, Input, Modal, Radio, Space, Tag, message } from 'antd'
import { PlusOutlined, SaveOutlined, UndoOutlined } from '@ant-design/icons'
import { Graph, Shape, Node } from '@antv/x6'
import './preview.less'

type PreviewType = 'mind' | 'pipeline' | 'topology'

const previewNodePorts = {
  groups: {
    top: {
      position: 'top',
      attrs: {
        circle: {
          r: 3,
          magnet: true,
          stroke: '#9aa9bd',
          strokeWidth: 1.2,
          fill: '#fff',
        },
      },
    },
    right: {
      position: 'right',
      attrs: {
        circle: {
          r: 3,
          magnet: true,
          stroke: '#9aa9bd',
          strokeWidth: 1.2,
          fill: '#fff',
        },
      },
    },
    bottom: {
      position: 'bottom',
      attrs: {
        circle: {
          r: 3,
          magnet: true,
          stroke: '#9aa9bd',
          strokeWidth: 1.2,
          fill: '#fff',
        },
      },
    },
    left: {
      position: 'left',
      attrs: {
        circle: {
          r: 3,
          magnet: true,
          stroke: '#9aa9bd',
          strokeWidth: 1.2,
          fill: '#fff',
        },
      },
    },
  },
  items: [
    { group: 'top' },
    { group: 'right' },
    { group: 'bottom' },
    { group: 'left' },
  ],
}

const Preview: React.FC<{ type: PreviewType; id?: string; title?: string; readOnly?: boolean }> = ({ type, id, title: providedTitle, readOnly = false }) => {
  const [messageApi, contextHolder] = message.useMessage()
  const title = providedTitle || (type === 'mind' ? '用户画像分析' : type === 'pipeline' ? '实时数据管道' : '平台服务拓扑')
  const containerRef = useRef<HTMLDivElement>(null)
  const graphRef = useRef<Graph | null>(null)
  const [selectedNode, setSelectedNode] = useState<Node | null>(null)
  const [nodeLabel, setNodeLabel] = useState('')
  const [nodeStatus, setNodeStatus] = useState('default')
  const [nodeColor, setNodeColor] = useState('#1769ff')

  useEffect(() => {
    if (!containerRef.current) return
    const graph = new Graph({
      container: containerRef.current,
      grid: { size: 10, visible: true },
      interacting: !readOnly,
      panning: !readOnly,
      mousewheel: { enabled: !readOnly, modifiers: ['ctrl', 'meta'] },
      connecting: {
        allowBlank: false,
        snap: { radius: 20 },
        allowMulti: true,
        createEdge: () => new Shape.Edge({ attrs: { line: { stroke: '#9bb0ce', strokeWidth: 2, targetMarker: 'block' } } }),
      },
      selecting: { enabled: !readOnly, rubberband: true },
    })
    const colors = { mind: '#7a63eb', pipeline: '#e29b31', topology: '#0f9fa8' }
    const node = (id: string, label: string, x: number, y: number, shape: string = 'rect') => graph.addNode({
      id, x, y, width: 150, height: 54, shape, label,
      ports: previewNodePorts,
      data: { status: 'default', color: colors[type] },
      attrs: {
        body: { fill: '#fff', stroke: colors[type], strokeWidth: 2, rx: 12, ry: 12 },
        label: { fill: '#243247', fontSize: 14, fontWeight: 600 },
      },
    })
    const nodes = id
      ? type === 'mind'
        ? [node('root', '用户画像', 390, 230, 'ellipse'), node('profile', '基础属性', 120, 100), node('preference', '消费偏好', 660, 100), node('active', '活跃度', 120, 360), node('strategy', '营销策略', 660, 360)]
        : type === 'pipeline'
          ? [node('source', 'Kafka 埋点', 90, 230), node('clean', '清洗转换', 360, 230), node('feature', '特征加工', 630, 230), node('warehouse', '数据仓库', 900, 230)]
          : [node('gateway', 'API 网关', 390, 80), node('service', '数据服务', 180, 280), node('model', '模型服务', 600, 280), node('store', '数据存储', 390, 460)]
      : []
    const links = id
      ? type === 'mind'
        ? [['root', 'profile'], ['root', 'preference'], ['root', 'active'], ['root', 'strategy']]
        : type === 'pipeline'
          ? [['source', 'clean'], ['clean', 'feature'], ['feature', 'warehouse']]
          : [['gateway', 'service'], ['gateway', 'model'], ['service', 'store'], ['model', 'store']]
      : []
    links.forEach(([source, target]) => graph.addEdge({ source, target, attrs: { line: { stroke: '#9bb0ce', strokeWidth: 2, targetMarker: 'block' } } }))
    let handleNativeContextMenu: ((event: MouseEvent) => void) | null = null
    if (!readOnly) {
      graph.on('node:contextmenu', ({ node: currentNode, e }) => {
        e.preventDefault()
        setSelectedNode(currentNode)
        setNodeLabel(String(currentNode.attr('label/text') || '新增节点'))
        setNodeStatus(currentNode.getData()?.status || 'default')
        setNodeColor(currentNode.getData()?.color || colors[type])
      })
      handleNativeContextMenu = (event: MouseEvent) => {
        const target = event.target as Element | null
        const cellElement = target?.closest?.('[data-cell-id]')
        const cellId = cellElement?.getAttribute('data-cell-id')
        const currentNode = cellId ? graph.getCellById(cellId) : null
        if (currentNode?.isNode()) {
          event.preventDefault()
          setSelectedNode(currentNode)
          setNodeLabel(String(currentNode.attr('label/text') || '新增节点'))
          setNodeStatus(currentNode.getData()?.status || 'default')
          setNodeColor(currentNode.getData()?.color || colors[type])
        }
      }
      containerRef.current.addEventListener('contextmenu', handleNativeContextMenu)
    }
    graphRef.current = graph
    return () => {
      if (handleNativeContextMenu) containerRef.current?.removeEventListener('contextmenu', handleNativeContextMenu)
      graph.dispose()
      graphRef.current = null
    }
  }, [id, type, readOnly])

  const saveNode = () => {
    if (!nodeLabel.trim()) {
      messageApi.warning('节点名称不能为空')
      return
    }
    if (!selectedNode) return

    selectedNode.attr('label/text', nodeLabel.trim())
    selectedNode.setData({ ...selectedNode.getData(), status: nodeStatus, color: nodeColor })
    selectedNode.setAttrs({ body: { stroke: nodeColor }, label: { fill: nodeColor } })
    setSelectedNode(null)
  }

  const addNode = () => {
    graphRef.current?.addNode({
      x: 260, y: 120, width: 150, height: 54, shape: 'rect', label: '新节点',
      ports: previewNodePorts,
      data: { status: 'default', color: '#1769ff' },
      attrs: { body: { fill: '#fff', stroke: '#1769ff', strokeWidth: 2, rx: 12, ry: 12 }, label: { fill: '#243247', fontSize: 14 } },
    })
  }

  return <div className="preview-editor">{contextHolder}<div className="preview-toolbar"><div><Tag color="blue">{type === 'mind' ? '思维导图' : type === 'pipeline' ? '数据管道' : '服务拓扑'}</Tag><strong>{title}</strong><span className="preview-hint">{readOnly ? '查看模式' : '拖拽节点、连线或右键编辑'}</span></div>{!readOnly && <Space><Button icon={<PlusOutlined />} onClick={addNode}>添加节点</Button><Button icon={<UndoOutlined />} onClick={() => graphRef.current?.cleanSelection()}>取消选择</Button><Button type="primary" icon={<SaveOutlined />} onClick={() => messageApi.success('图形草稿已保存')}>保存草稿</Button></Space>}</div><div ref={containerRef} className="x6-preview-canvas" /><Card className="preview-info"><span>{readOnly ? '当前为只读查看模式' : '图形可编辑 · 支持拖拽、连线、右键配置名称、状态和颜色'}</span></Card>{!readOnly && <Modal title="编辑节点" open={Boolean(selectedNode)} onCancel={() => setSelectedNode(null)} onOk={saveNode} okText="保存" cancelText="取消"><div className="preview-node-field"><label>节点名称 <span>*</span></label><Input value={nodeLabel || '新增节点'} onChange={(event) => setNodeLabel(event.target.value)} placeholder="请输入节点名称" /></div><div className="preview-node-field"><label>节点状态</label><Radio.Group optionType="button" buttonStyle="solid" value={nodeStatus} options={[{ value: 'default', label: '未开始' }, { value: 'running', label: '进行中' }, { value: 'success', label: '已完成' }, { value: 'failed', label: '异常' }]} onChange={(event) => setNodeStatus(event.target.value)} /></div><div className="preview-node-field"><label>节点颜色</label><div className="preview-color-picker"><Input type="color" value={nodeColor} onChange={(event) => setNodeColor(event.target.value)} /><span>{nodeColor}</span></div></div></Modal>}</div>
}
export default Preview
