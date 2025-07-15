import React, { useEffect, useState,useContext } from "react";
import { Graph, Shape, Cell, Node, Edge } from "@antv/x6";
import { Stencil } from "@antv/x6-plugin-stencil";
import { Transform } from "@antv/x6-plugin-transform";
import { Selection } from "@antv/x6-plugin-selection";
import { Snapline } from "@antv/x6-plugin-snapline";
import { Keyboard } from "@antv/x6-plugin-keyboard";
import { Clipboard } from "@antv/x6-plugin-clipboard";
import { History } from "@antv/x6-plugin-history";
import { Button, Modal, Input, message } from "antd";
import { cloneDeep } from 'lodash';
import { dataLists } from "./data";
import {
  createStencilHandler,
  addNodeHandler,
  addEdgeHandler,
  copyHandler,
  cutHandler,
  pasteHandler,
  rollbackHandler,
  resetHandler,
  allSelectHandler,
  removeHandler,
  toBigHandler,
  toSmallHandler,
  contextmenuNodeHandler,
  contextmenuEdgeHandler
} from "./func";
import { dataInfoItemType } from './type';
import "./index.less";
import { GlobalContext } from '@/global/context';

const { TextArea } = Input;

interface X6EditorProps {
  id?: string;
}

const X6Editor: React.FC<X6EditorProps> = ({ id }) => {
  const [graphInstance, setGraphInstance] = useState<Graph | null>(null);
  const [selectNode, setSelectNode] = useState<Node | null>(null);
  const [selectNodeData, setSelectNodeData] = useState<Partial<dataInfoItemType> | null>(null);
  const [menuPosition, setMenuPosition] = useState({ x: 0, y: 0 });
  const [nodeMenuVisible, setNodeMenuVisible] = useState(false);
  const [edgeMenuVisible, setEdgeMenuVisible] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isReady, setIsReady] = useState(false);

  // 初始化图形实例
  const initGraph = (): Graph => {
    const graph = new Graph({
      container: document.getElementById("graph-container")!,
      grid: true,
      mousewheel: {
        enabled: true,
        zoomAtMousePosition: true,
        modifiers: "ctrl",
        minScale: 0.5,
        maxScale: 3,
      },
      connecting: {
        router: "manhattan",
        connector: {
          name: "rounded",
          args: { radius: 8 },
        },
        anchor: "center",
        connectionPoint: "anchor",
        allowBlank: false,
        snap: { radius: 20 },
        createEdge() {
          return new Shape.Edge({
            attrs: {
              line: {
                stroke: "#A2B1C3",
                strokeWidth: 2,
                targetMarker: {
                  name: "block",
                  width: 12,
                  height: 8,
                },
              },
            },
            zIndex: 0,
          });
        },
        validateConnection: ({ sourceCell, targetCell }) => {
          const sourceShape = sourceCell.shape;
          const targetShape = targetCell.shape;
          return !(sourceShape === 'end-rect' || targetShape === 'start-rect');
        }
      },
      highlighting: {
        magnetAdsorbed: {
          name: "stroke",
          args: {
            attrs: {
              fill: "#5F95FF",
              stroke: "#5F95FF",
            },
          },
        },
      },
    });

    // 注册插件
    graph
      .use(new Transform({ resizing: true, rotating: true }))
      .use(new Selection({ rubberband: true, showNodeSelectionBox: true }))
      .use(new Snapline())
      .use(new Keyboard())
      .use(new Clipboard())
      .use(new History());

    return graph;
  };

  // 初始化图例
  const initStencil = (graph: Graph) => {
    const stencilContainer = document.getElementById("stencil");
    if (!stencilContainer) return;

    const { stencil, list1, list2, list3 } = createStencilHandler(
      Stencil,
      stencilContainer,
      graph,
      Graph
    );
    stencil.load(list1, "group1");
    stencil.load(list2, "group2");
    stencil.load(list3, "group3");
  };

  // 加载数据
  const drawData = (graph: Graph, data?: any[]) => {
    if (!data || data.length === 0) {
      graph.clearCells();
      return;
    }

    const cells: Cell[] = data.map(item =>
      item.shape === "edge"
        ? graph.createEdge(item)
        : graph.createNode(item)
    );
    try {
      graph.resetCells(cells);
    } catch (error) {
      console.log(error)
    }

  };

  // 初始化效果
  useEffect(() => {
    if (typeof window === 'undefined') return;

    const graph = initGraph();
    initStencil(graph);

    // 注册事件
    graph.on("node:added", ({ node }) => addNodeHandler({ node }));
    graph.on("edge:added", addEdgeHandler);
    graph.on("node:contextmenu", (event) => {
      setEdgeMenuVisible(false)
      contextmenuNodeHandler(
        event,
        setSelectNode,
        setSelectNodeData,
        setNodeMenuVisible,
        setMenuPosition
      )
    }

    );

    graph.on("edge:contextmenu", (event) => {
      setSelectNode(event.edge)
      setNodeMenuVisible(false)
      setEdgeMenuVisible(true)
      setMenuPosition({ x: event.e.clientX, y: event.e.clientY })
    }

    );


    setGraphInstance(graph);
    setIsReady(true);

    return () => {
      graph.dispose();
    };
  }, []);

  // 数据加载效果
  useEffect(() => {
    if (!isReady || !graphInstance) return;

    const data = id
      ? dataLists.find(item => item.id === id)?.data
      : [];
    drawData(graphInstance, data);
  }, [id, isReady, graphInstance]);

  // 获取图形信息
  const getGraphInfo = () => {
    if (!graphInstance) return;

    const nodes = graphInstance.getNodes();
    const edges = graphInstance.getEdges();
    const dataJson = graphInstance.toJSON();

    console.log("图形信息:", { nodes, edges, dataJson });
    message.success("图形信息已输出到控制台");
  };

  // 节点操作
  const editNodeHandler = () => {
    setNodeMenuVisible(false);
    setIsModalOpen(true);
  };

  //删除点
  const removeNodeHandler = () => {
    if (graphInstance && selectNode) {
      graphInstance.removeCell(selectNode);
      setNodeMenuVisible(false);
    }
  };

  //删除边
  const removeEdgeHandler = () => {
    if (graphInstance && selectNode) {
      graphInstance.removeCell(selectNode);
      setEdgeMenuVisible(false)
    }
  };


  const handleModalOk = () => {
    if (!selectNodeData?.label?.trim()) {
      message.warning('节点名称不能为空');
      return;
    }

    if (selectNode && selectNodeData) {
      selectNode.setData(selectNodeData);
      setIsModalOpen(false);
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>, propName: string) => {
    if (!selectNodeData) return;

    const newData = cloneDeep(selectNodeData);
    newData[propName] = e.target.value;
    setSelectNodeData(newData);
  };
const globalText = useContext(GlobalContext)
  return (
    <div id="container" className={globalText?.isSubAppFlag?'container_subApp':'container'}>
      <div id="stencil" />
      <div id="graph-container" />

      <div className="operationDom">
        <h4 className="title">节点操作</h4>
        <ul className="operationList">
          <li><Button type="primary" size="small" onClick={() => allSelectHandler(graphInstance)}>全选</Button></li>
          <li><Button type="primary" size="small" onClick={() => copyHandler(graphInstance)}>复制</Button></li>
          <li><Button type="primary" size="small" onClick={() => cutHandler(graphInstance)}>剪切</Button></li>
          <li><Button type="primary" size="small" onClick={() => pasteHandler(graphInstance)}>粘贴</Button></li>
          <li><Button type="primary" size="small" onClick={() => removeHandler(graphInstance)}>移除</Button></li>
        </ul>

        <h4 className="title">画布操作</h4>
        <ul className="operationList">
          <li><Button type="primary" size="small" onClick={() => rollbackHandler(graphInstance)}>回退</Button></li>
          <li><Button type="primary" size="small" onClick={() => toBigHandler(graphInstance)}>放大</Button></li>
          <li><Button type="primary" size="small" onClick={() => toSmallHandler(graphInstance)}>缩小</Button></li>
          <li><Button type="primary" size="small" onClick={() => resetHandler(graphInstance)}>清空</Button></li>
          <li><Button type="primary" size="small" onClick={getGraphInfo}>保存</Button></li>
        </ul>

        <Button type="primary" size="small" onClick={getGraphInfo}>获取信息</Button>
      </div>

      {nodeMenuVisible && (
        <ul
          className="contextMenuList"
          style={{
            position: 'absolute',
            left: menuPosition.x,
            top: menuPosition.y,
          }}
        >
          <li onClick={editNodeHandler}>编辑信息</li>
          <li onClick={removeNodeHandler}>移除</li>
          <li onClick={() => setNodeMenuVisible(false)}>关闭菜单</li>
        </ul>
      )}
      {edgeMenuVisible && (
        <ul
          className="contextMenuList"
          style={{
            position: 'absolute',
            left: menuPosition.x,
            top: menuPosition.y,
          }}
        >
          <li onClick={removeEdgeHandler}>移除</li>
          <li onClick={() => setEdgeMenuVisible(false)}>关闭菜单</li>
        </ul>
      )}


      <Modal
        title="节点配置"
        closable={false}
        open={isModalOpen}
        footer={[
          <Button key="submit" type="primary" onClick={handleModalOk}>
            保存
          </Button>
        ]}
      >
        <div>
          节点名称:

          <Input
            disabled={selectNode?.shape ? selectNode.shape[0] === '3' : false}
            placeholder="节点名称不能为空"
            value={selectNodeData?.label || ''}
            onChange={(e) => handleInputChange(e, 'label')}
          />
        </div>
        <div>
          节点简介:
          <TextArea
            rows={4}
            value={selectNodeData?.desc || ''}
            onChange={(e) => handleInputChange(e, 'desc')}
          />
        </div>
        {selectNodeData?.status && (
          <div>节点状态: {selectNodeData.status}</div>
        )}
      </Modal>
    </div>
  );
};

export default X6Editor;