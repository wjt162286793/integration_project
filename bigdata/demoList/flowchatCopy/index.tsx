import React, { useEffect } from 'react'
import { Graph, Path, Cell } from '@antv/x6'
import { Selection } from '@antv/x6-plugin-selection'
import { register } from '@antv/x6-react-shape'
import AlgoNode from './AlgoNode'
import {NodeStatus} from './type'
import {Button} from 'antd'



const FlowChat:React.FC = ()=> {
  
  //节点的上下连接端点的属性配置,节点的长度和高度
  register({
  shape: 'dag-node',   //图类型
  width: 180,  //节点宽度
  height: 36,  //节点高度
  component: AlgoNode,  //节点的组件:里面是节点的内容
  ports: {  //端口配置
    groups: {   //节点连接口的配置
      top: {  //上节点的配置
        position: 'top',
        attrs: {  //属性
          circle: {  //圆形节点
            r: 4,  //圆的尺寸
            magnet: true,   //吸附效果,方便操作
            stroke: '#C2C8D5',  //外圈颜色
            strokeWidth: 1,  //圆的粗细
            fill: '#fff',  //圆的填充色 
          },
        },
      },
      bottom: {   //下节点,与上面的配置方式一样
        position: 'bottom',
        attrs: {
          circle: {
            r: 4,
            magnet: true,
            stroke: '#C2C8D5',
            strokeWidth: 1,
            fill: '#fff',
          },
        },
      },
    },
  },
})

 //连接线的样式的属性配置
Graph.registerEdge(
  'dag-edge',  
  {
    inherit: 'edge',  
    attrs: {
      line: {
        stroke: '#C2C8D5',
        strokeWidth: 1,
        targetMarker: null,
      },
    },
  },
  true,
)


//定义连接行为
Graph.registerConnector(
  'algo-connector',
  (s, e) => {
    const offset = 4
    const deltaY = Math.abs(e.y - s.y)
    const control = Math.floor((deltaY / 3) * 2)

    const v1 = { x: s.x, y: s.y + offset + control }
    const v2 = { x: e.x, y: e.y - offset - control }

    return Path.normalize(
      `M ${s.x} ${s.y}
       L ${s.x} ${s.y + offset}
       C ${v1.x} ${v1.y} ${v2.x} ${v2.y} ${e.x} ${e.y - offset}
       L ${e.x} ${e.y}
      `,
    )
  },
  true,
)


//测试数据
const testData = [
  {
    "id": "1",
    "shape": "dag-node",   //节点
    "x": 290,
    "y": 110,
    "data": {
      "label": "读数据",
      "status": "success"
    },
    "ports": [
      {
        "id": "1-1",
        "group": "bottom"
      }
    ]
  },
  {
    "id": "2",
    "shape": "dag-node",
    "x": 290,
    "y": 225,
    "data": {
      "label": "逻辑回归",
      "status": "success"
    },
    "ports": [
      {
        "id": "2-1",
        "group": "top"
      },
      {
        "id": "2-2",
        "group": "bottom"
      },
      {
        "id": "2-3",
        "group": "bottom"
      }
    ]
  },
  {
    "id": "3",
    "shape": "dag-node",
    "x": 170,
    "y": 350,
    "data": {
      "label": "模型预测",
      "status": "success"
    },
    "ports": [
      {
        "id": "3-1",
        "group": "top"
      },
      {
        "id": "3-2",
        "group": "bottom"
      }
    ]
  },
  {
    "id": "4",
    "shape": "dag-node",
    "x": 450,
    "y": 350,
    "data": {
      "label": "读取参数",
      "status": "success"
    },
    "ports": [
      {
        "id": "4-1",
        "group": "top"
      },
      {
        "id": "4-2",
        "group": "bottom"
      }
    ]
  },
  {
    "id": "5",
    "shape": "dag-edge",  //连线
    "source": {
      "cell": "1",
      "port": "1-1"
    },
    "target": {
      "cell": "2",
      "port": "2-1"
    },
    "zIndex": 0
  },
  {
    "id": "6",
    "shape": "dag-edge",
    "source": {
      "cell": "2",
      "port": "2-2"
    },
    "target": {
      "cell": "3",
      "port": "3-1"
    },
    "zIndex": 0
  },
  {
    "id": "7",
    "shape": "dag-edge",
    "source": {
      "cell": "2",
      "port": "2-3"
    },
    "target": {
      "cell": "4",
      "port": "4-1"
    },
    "zIndex": 0
  }
]


useEffect(()=>{
//  renderChart()
},[])

//渲染图形的函数
const renderChart =()=>{
  const nodeStatusList = [   //假定的四种状态模式,这里一般等着后台返回的数据来控制状态的切换
  [
    {
      id: '1',
      status: 'running',
    },
    {
      id: '2',
      status: 'default',
    },
    {
      id: '3',
      status: 'default',
    },
    {
      id: '4',
      status: 'default',
    },
  ],
  [
    {
      id: '1',
      status: 'success',
    },
    {
      id: '2',
      status: 'running',
    },
    {
      id: '3',
      status: 'default',
    },
    {
      id: '4',
      status: 'default',
    },
  ],
  [
    {
      id: '1',
      status: 'success',
    },
    {
      id: '2',
      status: 'success',
    },
    {
      id: '3',
      status: 'running',
    },
    {
      id: '4',
      status: 'running',
    },
  ],
  [
    {
      id: '1',
      status: 'success',
    },
    {
      id: '2',
      status: 'success',
    },
    {
      id: '3',
      status: 'success',
    },
    {
      id: '4',
      status: 'failed',
    },
  ],
]

const graph: Graph = new Graph({  //创建图形的实例
  container: document.getElementById('container')!,  //渲染依赖的真实DOM节点
  panning: {  //操作方式,左键按下拖动
    enabled: true,  //是否可拖拽
    eventTypes: ['leftMouseDown', 'mouseWheel'], 
  },
  mousewheel: {
    enabled: true,  //是否可缩放
    modifiers: 'ctrl', //操作方式,按住ctrl键
    factor: 1.0,  //每次缩放的刻度值
    maxScale: 1.5,   //最大比例
    minScale: 0.5,  //最小比例
  },
  highlighting: {  //高亮
    magnetAdsorbed: {
      name: 'stroke',
      args: {
        attrs: {
          fill: '#fff',
          stroke: '#31d0c6',
          strokeWidth: 4,
        },
      },
    },
  }, 
  connecting: {    //连接配置
    snap: true,
    allowBlank: false,
    allowLoop: false,
    highlight: true,
    connector: 'algo-connector',
    connectionPoint: 'anchor',
    anchor: 'center',
    validateMagnet({ magnet }) {
      return magnet.getAttribute('port-group') !== 'top'
    },
    createEdge() {
      return graph.createEdge({
        shape: 'dag-edge',
        attrs: {
          line: {
            strokeDasharray: '5 5',
          },
        },
        zIndex: -1,
      })
    },
  },
})
graph.use(
  new Selection({
    multiple: true,
    rubberEdge: true,
    rubberNode: true,
    modifiers: 'shift',
    rubberband: true,
  }),
)

graph.on('edge:connected', ({ edge }) => {
  edge.attr({
    line: {
      strokeDasharray: '',
    },
  })
})

graph.on('node:change:data', ({ node }) => {
  const edges = graph.getIncomingEdges(node)
  const { status } = node.getData() as NodeStatus
  edges?.forEach((edge) => {
    if (status === 'running') {
      edge.attr('line/strokeDasharray', 5)
      edge.attr('line/style/animation', 'running-line 30s infinite linear')
    } else {
      edge.attr('line/strokeDasharray', '')
      edge.attr('line/style/animation', '')
    }
  })
})

// 初始化节点/边
const init = (data: Cell.Metadata[]) => {
  const cells: Cell[] = []
  data.forEach((item) => {
    if (item.shape === 'dag-node') {
      cells.push(graph.createNode(item))
    } else {
      cells.push(graph.createEdge(item))
    }
  })
  graph.resetCells(cells)
}

// 显示节点状态
const showNodeStatus = async (statusList: NodeStatus[][]) => {
  const status = statusList.shift()
  status?.forEach((item) => {
    const { id, status } = item
    const node = graph.getCellById(id)
    const data = node.getData() as NodeStatus
    node.setData({
      ...data,
      status,
    })
  })
  setTimeout(() => {
    showNodeStatus(statusList)  //每隔3秒,切换状态
  }, 3000)
}



    init(testData)
    showNodeStatus(nodeStatusList)
    graph.centerContent()
}


  return (
    <div>
        <Button onClick={renderChart}>创建一个流程图</Button>
    <div id='container' className='container'>
      
    </div>
    </div>

  )
}

export default FlowChat;
