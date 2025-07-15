import React, { useEffect,useState } from 'react'
import { Graph, Shape,Cell } from '@antv/x6'  //导入X6的核心模块
import { Stencil } from '@antv/x6-plugin-stencil'  //图例
import { Transform } from '@antv/x6-plugin-transform'  //用于缩放,旋转的插件
import { Selection } from '@antv/x6-plugin-selection'  //用于选择的插件
import { Snapline } from '@antv/x6-plugin-snapline'  //对齐线插件
import { Keyboard } from '@antv/x6-plugin-keyboard' //键盘快捷键插件
import { Clipboard } from '@antv/x6-plugin-clipboard'  //剪贴板插件
import { History } from '@antv/x6-plugin-history'  //历史记录插件
import './index.less'
import {Button} from 'antd'
import {testData} from './data'

const Index:React.FC = ()=>{

  const [graphEntiry,setGraph] = useState(null)

  const drawer = ()=>{
  const graph= new Graph({
  container: document.getElementById('graph-container')!,   //配置容器DOM
  grid: true,  //显示网格
  mousewheel: {  //鼠标滚轮操作的配置
    enabled: true,  //滚轮缩放
    zoomAtMousePosition: true,  //在鼠标的位置进行缩放
    modifiers: 'ctrl',  //按住ctrl加滚轮进行缩放
    minScale: 0.5,  //最小缩放比
    maxScale: 3,  //最大缩放比
  },
  connecting: {  //连接线配置
    router: 'manhattan',  //曼哈顿路由
    connector: {  //连接器的样式配置
      name: 'rounded', //使用圆角
      args: {
        radius: 8,   //圆角的半径
      },
    },
    anchor: 'center',  //锚点居中
    connectionPoint: 'anchor',  //连接点类型
    allowBlank: false,  //不允许连接到空白处
    snap: {  //对齐配置
      radius: 20,   //对齐半径
    },
    createEdge() {  //创建边的配置
      return new Shape.Edge({
        attrs: {
          line: {  //线
            stroke: '#A2B1C3',  //颜色
            strokeWidth: 2,  //线宽
            targetMarker: {  //线头标志
              name: 'block',  //块状箭头
              width: 12,  //宽度
              height: 8,  //高度
            },
          },
        },
        zIndex: 0,  //层级
      })
    },
    validateConnection({ targetMagnet }) {  //验证连接是否有效
      return !!targetMagnet   //连接线的终点位置必须有端点才可以
    },
  },
  highlighting: {  //高亮配置
    magnetAdsorbed: {  //节点吸附时高亮
      name: 'stroke',  //描边时高亮
      args: {
        attrs: {
          fill: '#5F95FF',   //填充颜色
          stroke: '#5F95FF',  //描边颜色
        },
      },
    },
  },
})




//使用插件
graph
  .use(
    new Transform({
      resizing: true,  //可以调整大小
      rotating: true,  //可以控制旋转
    }),
  )
  .use(
    new Selection({
      rubberband: true,  //可以使用框选
      showNodeSelectionBox: true,  //显示节点选择框(周围一堆子小四方块)
    }),
  )
  .use(new Snapline())   //对齐线
  .use(new Keyboard())   //键盘快捷键
  .use(new Clipboard())  //剪贴板功能
  .use(new History())   //启用历史记录

const stencil = new Stencil({   //左侧的图例
  title: '流程图',  //图例标题
  target: graph,  //图形类型
  stencilGraphWidth: 200,  //图例高度
  stencilGraphHeight: 180,  //图例宽度
  collapsable: true,  //可折叠
  groups: [  //图例分组
    {
      title: '基础流程图',  
      name: 'group1',
    },
    {
      title: '系统设计图',
      name: 'group2',
      graphHeight: 250,  //图形高度
      layoutOptions: {  //图形布局
        rowHeight: 70,  //行高
      },
    },
  ],
  layoutOptions: {  //布局选项
    columns: 2,  //列数
    columnWidth: 80,  //列宽
    rowHeight: 55,  //行高
  },
})

document.getElementById('stencil')!.appendChild(stencil.container)  //将图例绑定到具体容器


//键盘快捷键绑定

//复制操作
graph.bindKey(['meta+c', 'ctrl+c'], () => {  
  const cells = graph.getSelectedCells()
  if (cells.length) {
    graph.copy(cells)
  }
  return false
})

//剪切操作
graph.bindKey(['meta+x', 'ctrl+x'], () => {
  const cells = graph.getSelectedCells()
  if (cells.length) {
    graph.cut(cells)
  }
  return false
})

//粘贴操作
graph.bindKey(['meta+v', 'ctrl+v'], () => {
  if (!graph.isClipboardEmpty()) {
    const cells = graph.paste({ offset: 32 })
    graph.cleanSelection()
    graph.select(cells)
  }
  return false
})

//撤销
graph.bindKey(['meta+z', 'ctrl+z'], () => {
  if (graph.canUndo()) {
    graph.undo()
  }
  return false
})

//重做
graph.bindKey(['meta+shift+z', 'ctrl+shift+z'], () => {
  if (graph.canRedo()) {
    graph.redo()
  }
  return false
})

//全选
graph.bindKey(['meta+a', 'ctrl+a'], () => {
  const nodes = graph.getNodes()
  if (nodes) {
    graph.select(nodes)
  }
})

//删除
graph.bindKey('backspace', () => {
  const cells = graph.getSelectedCells()
  if (cells.length) {
    graph.removeCells(cells)
  }
})

//放大
graph.bindKey(['ctrl+1', 'meta+1'], () => {
  const zoom = graph.zoom()
  if (zoom < 1.5) {
    graph.zoom(0.1)
  }
})

//缩小
graph.bindKey(['ctrl+2', 'meta+2'], () => {
  const zoom = graph.zoom()
  if (zoom > 0.5) {
    graph.zoom(-0.1)
  }
})

//显示或者隐藏端口
const showPorts = (ports: NodeListOf<SVGElement>, show: boolean) => {
  for (let i = 0, len = ports.length; i < len; i += 1) {
    ports[i].style.visibility = show ? 'visible' : 'hidden'
  }
}

//鼠标移入节点显示连接端口
graph.on('node:mouseenter', () => {
  const container = document.getElementById('graph-container')!
  const ports = container.querySelectorAll(
    '.x6-port-body',
  ) as NodeListOf<SVGElement>
  showPorts(ports, true)
})

//鼠标离开节点时隐藏连接端口
graph.on('node:mouseleave', () => {
  const container = document.getElementById('graph-container')!
  const ports = container.querySelectorAll(
    '.x6-port-body',
  ) as NodeListOf<SVGElement>
  showPorts(ports, false)
})


//端口配置 
const ports = {
  groups: {
    top: {
      position: 'top',  //所在位置
      attrs: {
        circle: {  //圆形端口
          r: 4,  //半径
          magnet: true,  //可连接
          stroke: '#5F95FF',  //描边色
          strokeWidth: 1,  //描边宽度
          fill: '#fff',  //填充色
          style: {
            visibility: 'hidden',   //默认隐藏
          },
        },
      },
    },
    right: {
      position: 'right',
      attrs: {
        circle: {
          r: 4,
          magnet: true,
          stroke: '#5F95FF',
          strokeWidth: 1,
          fill: '#fff',
          style: {
            visibility: 'hidden',
          },
        },
      },
    },
    bottom: {
      position: 'bottom',
      attrs: {
        circle: {
          r: 4,
          magnet: true,
          stroke: '#5F95FF',
          strokeWidth: 1,
          fill: '#fff',
          style: {
            visibility: 'hidden',
          },
        },
      },
    },
    left: {
      position: 'left',
      attrs: {
        circle: {
          r: 4,
          magnet: true,
          stroke: '#5F95FF',
          strokeWidth: 1,
          fill: '#fff',
          style: {
            visibility: 'hidden',
          },
        },
      },
    },
  },

  //设置端口:上下左右各一个
  items: [
    {
      group: 'top',
    },
    {
      group: 'right',
    },
    {
      group: 'bottom',
    },
    {
      group: 'left',
    },
  ],
}

//定义矩形节点
Graph.registerNode(
  'custom-rect',
  {
    inherit: 'rect',  //矩形
    width: 66,
    height: 36,
    attrs: {
      body: {
        strokeWidth: 1,
        stroke: '#5F95FF',
        fill: '#EFF4FF',
      },
      text: {
        fontSize: 12,
        fill: '#262626',
      },
    },
    ports: { ...ports },
  },
  true,
)

//多边形节点
Graph.registerNode(
  'custom-polygon',
  {
    inherit: 'polygon',
    width: 66,
    height: 36,
    attrs: {
      body: {
        strokeWidth: 1,
        stroke: '#5F95FF',
        fill: '#EFF4FF',
      },
      text: {
        fontSize: 12,
        fill: '#262626',
      },
    },
    ports: {
      ...ports,
      items: [
        {
          group: 'top',
        },
        {
          group: 'bottom',
        },
      ],
    },
  },
  true,
)

//圆形节点
Graph.registerNode(
  'custom-circle',
  {
    inherit: 'circle',
    width: 45,
    height: 45,
    attrs: {
      body: {
        strokeWidth: 1,
        stroke: '#5F95FF',
        fill: '#EFF4FF',
      },
      text: {
        fontSize: 12,
        fill: '#262626',
      },
    },
    ports: { ...ports },
  },
  true,
)

//自定义图片节点
Graph.registerNode(
  'custom-image',
  {
    inherit: 'rect',
    width: 52,
    height: 52,
    markup: [
      {
        tagName: 'rect',
        selector: 'body',
      },
      {
        tagName: 'image',
      },
      {
        tagName: 'text',
        selector: 'label',
      },
    ],
    attrs: {
      body: {
        stroke: '#5F95FF',
        fill: '#5F95FF',
      },
      image: {
        width: 26,
        height: 26,
        refX: 13,
        refY: 16,
      },
      label: {
        refX: 3,
        refY: 2,
        textAnchor: 'left',
        textVerticalAnchor: 'top',
        fontSize: 12,
        fill: '#fff',
      },
    },
    ports: { ...ports },
  },
  true,
)

//定义基础流程元素节点
const r1 = graph.createNode({
  shape: 'custom-rect',
  label: '开始',
  attrs: {
    body: {
      rx: 20,
      ry: 26,
    },
  },
})
const r2 = graph.createNode({
  shape: 'custom-rect',
  label: '过程',
})
const r3 = graph.createNode({
  shape: 'custom-rect',
  attrs: {
    body: {
      rx: 6,
      ry: 6,
    },
  },
  label: '可选过程',
})
const r4 = graph.createNode({
  shape: 'custom-polygon',
  attrs: {
    body: {
      refPoints: '0,10 10,0 20,10 10,20',
    },
  },
  label: '决策',
})
const r5 = graph.createNode({
  shape: 'custom-polygon',
  attrs: {
    body: {
      refPoints: '10,0 40,0 30,20 0,20',
    },
  },
  label: '数据',
})
const r6 = graph.createNode({
  shape: 'custom-circle',
  label: '连接',
})

//挂载节点
stencil.load([r1, r2, r3, r4, r5, r6], 'group1')

const imageShapes = [
  {
    label: 'Client',
    image:
      'https://gw.alipayobjects.com/zos/bmw-prod/687b6cb9-4b97-42a6-96d0-34b3099133ac.svg',
  },
  {
    label: 'Http',
    image:
      'https://gw.alipayobjects.com/zos/bmw-prod/dc1ced06-417d-466f-927b-b4a4d3265791.svg',
  },
  {
    label: 'Api',
    image:
      'https://gw.alipayobjects.com/zos/bmw-prod/c55d7ae1-8d20-4585-bd8f-ca23653a4489.svg',
  },
  {
    label: 'Sql',
    image:
      'https://gw.alipayobjects.com/zos/bmw-prod/6eb71764-18ed-4149-b868-53ad1542c405.svg',
  },
  {
    label: 'Clound',
    image:
      'https://gw.alipayobjects.com/zos/bmw-prod/c36fe7cb-dc24-4854-aeb5-88d8dc36d52e.svg',
  },
  {
    label: 'Mq',
    image:
      'https://gw.alipayobjects.com/zos/bmw-prod/2010ac9f-40e7-49d4-8c4a-4fcf2f83033b.svg',
  },
]


//定义系统设计流程节点
const imageNodes = imageShapes.map((item) =>
  graph.createNode({
    shape: 'custom-image',
    label: item.label,
    attrs: {
      image: {
        'xlink:href': item.image,
      },
    },
  }),
)

//画布上新增一个节点
graph.on('node:added',addNodeHandler)

//画布上新增一条边(连线)
graph.on('edge:added', addEdgeHandler);

//节点左键点击操作
graph.on('node:click', clickNodeHandler);


//边左键点击操作
graph.on('edge:click', clickEdgeHandler);


//挂载节点
stencil.load(imageNodes, 'group2')
setGraph(graph)
}


useEffect(()=>{
  drawer()
},[])

const getInfo = ()=>{
   console.log(graphEntiry,'graph的实例')
   const nodes = graphEntiry.getNodes()  //获取画布上的所有节点
   const edges = graphEntiry.getEdges()  //获取画布上的所有边
   const dataJson = graphEntiry.toJSON()   //获取画布的核心数据(关键api,用于存储和回显)

   console.log(nodes,'节点信息')
   console.log(edges,'边信息')
   console.log(dataJson,'核心数据信息')

}

//点击节点的函数
const clickNodeHandler = ({node}) =>{
   console.log(node,'点击了一下node')
}

//点击边的函数
const clickEdgeHandler = ({edge}) =>{
   console.log(edge,'点击了一下边')
}

const addNodeHandler = ({node}) =>{
  console.log(node,'新增节点信息')
}

const addEdgeHandler = ({edge}) =>{
   console.log(edge,'新增边事件信息')
}


const drawData = () =>{
  const cells:Cell[] = []
   testData.forEach((item)=>{
    if(item.shape === 'edge'){
      cells.push(graphEntiry.createEdge(item))

    }else{
      cells.push(graphEntiry.createNode(item))
    }
   })
   graphEntiry.resetCells(cells)
}

  return ( 
  <div id='container'>
     <Button onClick={getInfo}>获取信息</Button>
     <Button onClick={drawData}>展示已有数据</Button>
      <div id='stencil'></div>
      <div id='graph-container'></div>
 
  </div>
  )
}

export default Index