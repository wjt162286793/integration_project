import { register } from '@antv/x6-react-shape'
import AlgoNode from './AlgoNode';
import { Graph, Node, Edge } from "@antv/x6"; //导入X6的核心模块
import { Stencil } from "@antv/x6-plugin-stencil"; //图例
import { dataInfoItemType } from './type'
import { cloneDeep } from 'lodash';





export const registerFun = () => {
  register({
    shape: '2-start-rect',
    width: 180,
    height: 36,
    component: AlgoNode,
    ports: {
      groups: {
        bottom: {
          position: 'bottom',
          attrs: {
            circle: {
              r: 4,
              magnet: true,
              stroke: '#C2C8D5',
              strokeWidth: 1,
              fill: '#fff',
              style: {
                visibility: 'hidden'
              }
            },
          },
        },
      },
      items: [
        {
          group: "bottom",
        },
      ]

    },
  })
  register({
    shape: '2-status-rect',
    width: 180,
    height: 36,
    component: AlgoNode,
    ports: {
      groups: {
        top: {
          position: 'top',
          attrs: {
            circle: {
              r: 4,
              magnet: true,
              stroke: '#C2C8D5',
              strokeWidth: 1,
              fill: '#fff',
              style: {
                visibility: 'hidden'
              }
            },
          },
        },
        bottom: {
          position: 'bottom',
          attrs: {
            circle: {
              r: 4,
              magnet: true,
              stroke: '#C2C8D5',
              strokeWidth: 1,
              fill: '#fff',
              style: {
                visibility: 'hidden'
              }
            },
          },
        },
        left: {
          position: 'left',
          attrs: {
            circle: {
              r: 4,
              magnet: true,
              stroke: '#C2C8D5',
              strokeWidth: 1,
              fill: '#fff',
              style: {
                visibility: 'hidden'
              }
            },
          },
        },
        right: {
          position: 'right',
          attrs: {
            circle: {
              r: 4,
              magnet: true,
              stroke: '#C2C8D5',
              strokeWidth: 1,
              fill: '#fff',
              style: {
                visibility: 'hidden'
              }
            },
          },
        },
      },
      items: [
        {
          group: "top",
        },
        {
          group: "right",
        },
        {
          group: "bottom",
        },
        {
          group: "left",
        },
      ]
    },
  })
  register({
    shape: '2-end-rect',
    width: 180,
    height: 36,
    component: AlgoNode,
    ports: {
      groups: {
        top: {
          position: 'top',
          attrs: {
            circle: {
              r: 4,
              magnet: true,
              stroke: '#C2C8D5',
              strokeWidth: 1,
              fill: '#fff',
              style: {
                visibility: 'hidden'
              }
            },
          },
        },
      },
      items: [
        {
          group: "top",
        },
      ]
    },
  })
  register({
    shape: '2-alone-rect',
    width: 180,
    height: 36,
    component: AlgoNode,
    ports: {
      groups: {},
    },
  })
}



//创建图例整体函数
export const createStencilHandler = (Stencil: Stencil, stencilDom: HTMLElement, graph: Graph, Graph: Graph) => {
  registerFun()
  const stencil: Stencil = createStencilLeftNav(Stencil, stencilDom, graph); //创建左侧容器

  //键盘快捷键绑定
  keyWordAddHandler(graph)

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

  createNodeAndPort(Graph)  //创建端口



  const list1 = createGroup1(graph); //创建图例组1
  const list2 = createGroup2(graph);  //创建图例组2
  const list3 = createGroup3(graph); //创建图例组3

  return {
    stencil: stencil,
    list1: list1,
    list2: list2,
    list3: list3
  }
};

//创建左侧容器
export const createStencilLeftNav = (Stencil: Stencil, stencilDom: HTMLElement, graph: Graph) => {
  const stencil = new Stencil({
    //左侧的图例
    title: "图例集合", //图例标题
    target: graph, //图形类型
    stencilGraphWidth: 200, //图例高度
    stencilGraphHeight: 180, //图例宽度
    collapsable: true, //可折叠
    groups: [
      //图例分组
      {
        title: "多边形无状态图例",
        name: "group1",
      },
      {
        title: "状态图例",
        name: "group2",
        layoutOptions: {
          //图形布局
          columns: 1, //列数
          columnWidth: 156,
          rowHeight: 40, //行高
        },
      },
      {
        title: "图案图例",
        name: "group3",
        graphHeight: 250, //图形高度
        layoutOptions: {
          //图形布局
          rowHeight: 70, //行高
        },
      },
    ],
    layoutOptions: {
      //布局选项
      columns: 2, //列数
      columnWidth: 80, //列宽
      rowHeight: 55, //行高
    },
  });

  stencilDom!.appendChild(stencil.container); //将图例绑定到具体容器

  return stencil;
};

//创建图例组1
export const createGroup1 = (graph: Graph) => {
  //定义多边形无状态图例节点
  const r1 = graph.createNode({
    shape: "1-custom-rect",
    data: {
      label: '椭圆',
      desc: '',
      status: null
    },
    label: '椭圆',
    attrs: {
      body: {
        rx: 20,
        ry: 26,
      },

    },
  });
  const r2 = graph.createNode({
    shape: "1-custom-rect",
    data: {
      label: '矩形',
      desc: '',
      status: null
    },
    label: '矩形',
  });
  const r3 = graph.createNode({
    shape: "1-custom-rect",
    attrs: {
      body: {
        rx: 6,
        ry: 6,
      },
    },
    data: {
      label: '圆角矩形',
      desc: '',
      status: null
    },
    label: '圆角矩形',
  });
  const r4 = graph.createNode({
    shape: "1-custom-polygon",
    attrs: {
      body: {
        refPoints: "0,10 10,0 20,10 10,20",
      },
    },
    data: {
      label: '菱形',
      desc: '',
      status: null
    },
    label: '菱形',
  });
  const r5 = graph.createNode({
    shape: "1-custom-polygon",
    attrs: {
      body: {
        refPoints: "10,0 40,0 30,20 0,20",
      },
    },
    data: {
      label: '平行四边',
      desc: '',
      status: null
    },
    label: '平行四边',
  });
  const r6 = graph.createNode({
    shape: "1-custom-circle",
    data: {
      label: '圆形',
      desc: '',
      status: null
    },
    label: '圆形',
  });

  return [r1, r2, r3, r4, r5, r6]
  //挂载多边形无状态图例节点

};

//创建图例组2
export const createGroup2 = (graph: Graph) => {
  const r1 = graph.createNode({
    shape: "2-start-rect",
    data: {
      label: "起点节点",
      status: "success",
      desc: ''
    }
  });
  const r2 = graph.createNode({
    shape: "2-status-rect",
    data: {
      label: "中间节点",
      status: "success",
      desc: ''
    }
  });
  const r3 = graph.createNode({
    shape: "2-end-rect",
    data: {
      label: "终点节点",
      status: "success",
      desc: ''
    }
  });
  const r4 = graph.createNode({
    shape: "2-alone-rect",
    data: {
      label: "孤立节点",
      status: "success",
      desc: ''
    }
  });

  return [r1, r2, r3, r4]

}

//创建图例组3
export const createGroup3 = (graph: Graph) => {
  //图片图例集合
  const imageShapes = [
    {
      label: "客户端",
      data: {
        label: '客户端',
        status: null,
        desc: ''
      },
      image:
        "https://gw.alipayobjects.com/zos/bmw-prod/687b6cb9-4b97-42a6-96d0-34b3099133ac.svg",
    },
    {
      label: "网络请求",
      data: {
        label: '网络请求',
        status: null,
        desc: ''
      },
      image:
        "https://gw.alipayobjects.com/zos/bmw-prod/dc1ced06-417d-466f-927b-b4a4d3265791.svg",
    },
    {
      label: "api接口",
      data: {
        label: 'api接口',
        status: null,
        desc: ''
      },
      image:
        "https://gw.alipayobjects.com/zos/bmw-prod/c55d7ae1-8d20-4585-bd8f-ca23653a4489.svg",
    },
    {
      label: "数据库",
      data: {
        label: '数据库',
        status: null,
        desc: ''
      },
      image:
        "https://gw.alipayobjects.com/zos/bmw-prod/6eb71764-18ed-4149-b868-53ad1542c405.svg",
    },
    {
      label: "云服务",
      data: {
        label: '云服务',
        status: null,
        desc: ''
      },
      image:
        "https://gw.alipayobjects.com/zos/bmw-prod/c36fe7cb-dc24-4854-aeb5-88d8dc36d52e.svg",
    },
    {
      label: "服务器",
      data: {
        label: '服务器',
        status: null,
        desc: ''
      },
      image:
        "https://gw.alipayobjects.com/zos/bmw-prod/2010ac9f-40e7-49d4-8c4a-4fcf2f83033b.svg",
    },
  ];

  //定义图片图例节点
  const imageNodes = imageShapes.map((item) =>
    graph.createNode({
      shape: "3-custom-image",
      label: item.label,
      data:item.data,
      attrs: {
        image: {
          "xlink:href": item.image,
        },
      },
    })
  );

  return imageNodes
  //挂载图片图例节点

};

//四向端口数据
export const allports = {
  groups: {
    top: {
      position: "top", //所在位置
      attrs: {
        circle: {
          //圆形端口
          r: 4, //半径
          magnet: true, //可连接
          stroke: "#5F95FF", //描边色
          strokeWidth: 1, //描边宽度
          fill: "#fff", //填充色
          style: {
            visibility: "hidden", //默认隐藏
          },
        },
      },
    },
    right: {
      position: "right",
      attrs: {
        circle: {
          r: 4,
          magnet: true,
          stroke: "#5F95FF",
          strokeWidth: 1,
          fill: "#fff",
          style: {
            visibility: "hidden",
          },
        },
      },
    },
    bottom: {
      position: "bottom",
      attrs: {
        circle: {
          r: 4,
          magnet: true,
          stroke: "#5F95FF",
          strokeWidth: 1,
          fill: "#fff",
          style: {
            visibility: "hidden",
          },
        },
      },
    },
    left: {
      position: "left",
      attrs: {
        circle: {
          r: 4,
          magnet: true,
          stroke: "#5F95FF",
          strokeWidth: 1,
          fill: "#fff",
          style: {
            visibility: "hidden",
          },
        },
      },
    },
  },

  //设置端口:上下左右各一个
  items: [
    {
      group: "top",
    },
    {
      group: "right",
    },
    {
      group: "bottom",
    },
    {
      group: "left",
    },
  ],
};


//创建节点和端口
export const createNodeAndPort = (Graph: Graph) => {
  //定义矩形(四向)节点
  Graph.registerNode(
    "1-custom-rect",
    {
      inherit: "rect", //矩形
      width: 66,
      height: 36,
      attrs: {
        body: {
          strokeWidth: 1,
          stroke: "#5F95FF",
          fill: "#EFF4FF",
        },
        text: {
          fontSize: 12,
          fill: "#262626",
        },
      },
      ports: { ...allports },
    },
    true
  );

  //多边形节点
  Graph.registerNode(
    "1-custom-polygon",
    {
      inherit: "polygon",
      width: 66,
      height: 36,
      attrs: {
        body: {
          strokeWidth: 1,
          stroke: "#5F95FF",
          fill: "#EFF4FF",
        },
        text: {
          fontSize: 12,
          fill: "#262626",
        },
      },
      ports: {
        ...allports,
        items: [
          {
            group: "top",
          },
          {
            group: "bottom",
          },
        ],
      },
    },
    true
  );

  //圆形节点
  Graph.registerNode(
    "1-custom-circle",
    {
      inherit: "circle",
      width: 45,
      height: 45,
      attrs: {
        body: {
          strokeWidth: 1,
          stroke: "#5F95FF",
          fill: "#EFF4FF",
        },
        text: {
          fontSize: 12,
          fill: "#262626",
        },
      },
      ports: { ...allports },
    },
    true
  );

  //自定义图片节点
  Graph.registerNode(
    "3-custom-image",
    {
      inherit: "rect",
      width: 52,
      height: 52,
      markup: [
        {
          tagName: "rect",
          selector: "body",
        },
        {
          tagName: "image",
        },
        {
          tagName: "text",
          selector: "label",
        },
      ],
      attrs: {
        body: {
          stroke: "#5F95FF",
          fill: "#5F95FF",
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
          textAnchor: "left",
          textVerticalAnchor: "top",
          fontSize: 12,
          fill: "#fff",
        },
      },
      ports: { ...allports },
    },
    true
  );
};

//显示或者隐藏端口
export const showPorts = (ports: NodeListOf<SVGElement>, show: boolean) => {
  for (let i = 0, len = ports.length; i < len; i += 1) {
    ports[i].style.visibility = show ? "visible" : "hidden";
  }
};

//键盘事件绑定
export const keyWordAddHandler = (graph: Graph) => {
  //复制操作
  graph.bindKey(["meta+c", "ctrl+c"], () => copyHandler(graph));

  //剪切操作
  graph.bindKey(["meta+x", "ctrl+x"], () => cutHandler(graph));

  //粘贴操作
  graph.bindKey(["meta+v", "ctrl+v"], () => pasteHandler(graph));

  //撤销
  graph.bindKey(["meta+z", "ctrl+z"], () => rollbackHandler(graph));

  //重做
  graph.bindKey(["meta+shift+z", "ctrl+shift+z"], () => resetHandler(graph));

  //全选
  graph.bindKey(["meta+a", "ctrl+a"], () => allSelectHandler(graph));

  //删除
  graph.bindKey("backspace", () => removeHandler(graph));

  //放大
  graph.bindKey(["ctrl+1", "meta+1"], () => toBigHandler(graph));

  //缩小
  graph.bindKey(["ctrl+2", "meta+2"], () => toSmallHandler(graph));
};

//复制事件
export const copyHandler = (graph: Graph) => {
  const cells = graph.getSelectedCells();
  if (cells.length) {
    graph.copy(cells);
  }
  return false;
}

//剪切事件
export const cutHandler = (graph: Graph) => {
  const cells = graph.getSelectedCells();
  if (cells.length) {
    graph.cut(cells);
  }
  return false;
}

//粘贴事件
export const pasteHandler = (graph: Graph) => {
  if (!graph.isClipboardEmpty()) {
    const cells = graph.paste({ offset: 32 });
    graph.cleanSelection();
    graph.select(cells);
  }
  return false;
}

//后退事件
export const rollbackHandler = (graph: Graph) => {
  if (graph.canUndo()) {
    graph.undo();
  }
  return false;
}

//重置事件
export const resetHandler = (graph: Graph) => {

  // if (graph.canRedo()) {
  //   graph.redo();
  // }
  graph.clearCells()
  return false;
}

//全选事件
export const allSelectHandler = (graph: Graph) => {
  const nodes = graph.getNodes();
  if (nodes) {
    graph.select(nodes);
  }
}

//移除事件
export const removeHandler = (graph: Graph) => {
  const cells = graph.getSelectedCells();

  if (cells.length) {
    graph.removeCells(cells);
  }
}

//放大事件
export const toBigHandler = (graph: Graph) => {
  const zoom = graph.zoom();
  if (zoom < 1.5) {
    graph.zoom(0.1);
  }
}

//缩小事件
export const toSmallHandler = (graph: Graph) => {
  const zoom = graph.zoom();
  if (zoom > 0.5) {
    graph.zoom(-0.1);
  }
}

// //左键点击节点的监函数
// export const clickNodeHandler = ({ node }:{node:Node},setNode,setNodeData) => {
//   setNode(node)
//   const info = dataInfo.find(item => item.id === node.id)
//   setNodeData(info)
// };

//右键点击节点的函数
export const contextmenuNodeHandler = (event, setNode, setNodeData, setNodeMenuVisible, setMenuPosition) => {
  setNode(event.node)
  // const info = dataInfo.find(item => item.id === event.node.id)
  setNodeData(event.node.data)
  setNodeMenuVisible(true)
  setMenuPosition({ x: event.e.clientX, y: event.e.clientY })

}

//左键点击边的监控函数
export const clickEdgeHandler = ({ edge }: { edge: Edge }) => {

};

//右键点击边的监控函数
export const contextmenuEdgeHandler = ({ edge }: { edge: Edge }) => {
 console.log(edge,'边')

};


//新增节点的监控函数
//这里是个坑 : 坑1
// export const addNodeHandler = ({ node }:{node:Node},dataInfo,setDataInfo) => {
//   console.log(node, dataInfo,"新增节点信息",setDataInfo);
//   let newData:dataInfoItemType | null 
//   switch(node.shape[0]){
//     case '2':  
//     newData = {
//       id: node.id,
//       data:{
//         label:node.data.label,
//         desc:'',
//         status:node.data.status
//       }
//     }
//     break
//     default:
//     newData = {
//       id: node.id,
//       data:{
//         label:node.label,
//         desc:'',
//         status:null
//       }
//     }
//   }
//   console.log(newData,'新增的节点')
//   const list = cloneDeep(dataInfo)
//   console.log(list,'新建的list')
//   list.push(newData)
//   console.log(list,'push后的list')  
//   setDataInfo(list)
// };


export const addNodeHandler = ({ node }: { node: Node }) => {
  node.label = node.data.label



  // setDataInfo(prevDataInfo => {
  //   console.log(prevDataInfo, '修改前的快照')
  //   return [...prevDataInfo, newData];
  // });
};










//新增节边的监控函数
export const addEdgeHandler = ({ edge }: { edge: Edge }) => {
  console.log(edge, "新增边事件信息");
};

