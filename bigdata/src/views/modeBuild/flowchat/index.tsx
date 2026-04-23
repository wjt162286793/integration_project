import React, { useEffect, useState,useContext } from "react";
import { Graph, Shape, Cell, Node, Edge } from "@antv/x6";
import { Stencil } from "@antv/x6-plugin-stencil";
import { Transform } from "@antv/x6-plugin-transform";
import { Selection } from "@antv/x6-plugin-selection";
import { Snapline } from "@antv/x6-plugin-snapline";
import { Keyboard } from "@antv/x6-plugin-keyboard";
import { Clipboard } from "@antv/x6-plugin-clipboard";
import { History } from "@antv/x6-plugin-history";
import { Button, Modal, Input, message, Select } from "antd";
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
import { useTranslation } from 'react-i18next';
import { modeBuildFlowDetailApi, modeBuildFlowSaveApi } from '@/api';
import { applyFlowNodeLabel, applyFlowNodeStyle } from './func';

const { TextArea } = Input;

interface X6EditorProps {
  id?: string | null;
}

const X6Editor: React.FC<X6EditorProps> = ({ id }) => {
  const { t } = useTranslation();
  const [graphInstance, setGraphInstance] = useState<Graph | null>(null);
  const [selectNode, setSelectNode] = useState<Node | null>(null);
  const [selectNodeData, setSelectNodeData] = useState<Partial<dataInfoItemType> | null>(null);
  const [menuPosition, setMenuPosition] = useState({ x: 0, y: 0 });
  const [nodeMenuVisible, setNodeMenuVisible] = useState(false);
  const [edgeMenuVisible, setEdgeMenuVisible] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isReady, setIsReady] = useState(false);
  const [statusSummary, setStatusSummary] = useState<Record<string, number>>({})

  const calcStatusSummary = (graph: Graph | null) => {
    if (!graph) return
    const nodes = graph.getNodes()
    const m: Record<string, number> = { default: 0, pending: 0, running: 0, success: 0, failed: 0, skipped: 0 }
    nodes.forEach((n) => {
      const d: any = n.getData ? n.getData() : (n as any).data
      const s = d && d.status ? String(d.status) : 'default'
      if (m[s] === undefined) m[s] = 0
      m[s] += 1
    })
    setStatusSummary(m)
  }

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
      Graph,
      t
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
    graph.on("node:added", ({ node }) => {
      addNodeHandler({ node })
      calcStatusSummary(graph)
    });
    graph.on("edge:added", addEdgeHandler);
    graph.on("node:removed", () => calcStatusSummary(graph));
    graph.on("node:change:data", ({ node }) => {
      const d: any = node.getData ? node.getData() : (node as any).data
      applyFlowNodeStyle(node, d && d.status ? d.status : 'default')
      calcStatusSummary(graph)
    })
    graph.on("edge:removed", () => calcStatusSummary(graph));
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
    if (!id) {
      drawData(graphInstance, []);
      calcStatusSummary(graphInstance)
      return;
    }
    modeBuildFlowDetailApi({ id }).then((res: any) => {
      if (res && res.code === 200 && res.data) {
        const graphJson = res.data.graph_json
        if (graphJson && Array.isArray(graphJson.cells)) {
          try {
            graphInstance.fromJSON(graphJson)
            graphInstance.getNodes().forEach((n) => {
              const d: any = n.getData ? n.getData() : (n as any).data
              applyFlowNodeStyle(n, d && d.status ? d.status : 'default')
              applyFlowNodeLabel(n, d && d.label ? d.label : '')
            })
            calcStatusSummary(graphInstance)
          } catch (e) {
            const data = dataLists.find(item => item.id === id)?.data || []
            drawData(graphInstance, data)
            calcStatusSummary(graphInstance)
          }
        } else {
          const data = dataLists.find(item => item.id === id)?.data || []
          drawData(graphInstance, data)
          calcStatusSummary(graphInstance)
        }
      }
    })
  }, [id, isReady, graphInstance]);

  // 获取图形信息
  const getGraphInfo = () => {
    if (!graphInstance) return;
    if (!id) {
      message.warning(t('modeBuild.emptyTitle'))
      return
    }
    const dataJson = graphInstance.toJSON();
    modeBuildFlowSaveApi({ id, graph_json: dataJson }).then((res: any) => {
      if (res && res.code === 200) {
        message.success(t('modeBuild.save'))
      }
    })
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
      message.warning(t('modeBuild.nodeNameCannotBeEmpty'));
      return;
    }

    if (selectNode && selectNodeData) {
      const next = cloneDeep(selectNodeData)
      if (!next.status) next.status = 'default'
      selectNode.setData(next);
      applyFlowNodeLabel(selectNode, next.label)
      applyFlowNodeStyle(selectNode, next.status)
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

  const setStatus = (status: string) => {
    if (!selectNode) return
    const d: any = selectNode.getData ? selectNode.getData() : (selectNode as any).data
    const next = { ...(d || {}), status }
    selectNode.setData(next)
    setSelectNodeData(next)
    applyFlowNodeStyle(selectNode, status)
    setNodeMenuVisible(false)
  }

  return (
    <div id="container" className={globalText?.isSubAppFlag?'container_subApp':'container'}>
      <div id="stencil" />
      <div id="graph-container" />

      <div className="operationDom">
        <h4 className="title">{t('modeBuild.nodeOperations')}</h4>
        <ul className="operationList">
          <li><Button className="operationBtn" type="primary" size="small" onClick={() => allSelectHandler(graphInstance)}>{t('modeBuild.selectAll')}</Button></li>
          <li><Button className="operationBtn" type="primary" size="small" onClick={() => copyHandler(graphInstance)}>{t('modeBuild.copy')}</Button></li>
          <li><Button className="operationBtn" type="primary" size="small" onClick={() => cutHandler(graphInstance)}>{t('modeBuild.cut')}</Button></li>
          <li><Button className="operationBtn" type="primary" size="small" onClick={() => pasteHandler(graphInstance)}>{t('modeBuild.paste')}</Button></li>
          <li><Button className="operationBtn" type="primary" size="small" onClick={() => removeHandler(graphInstance)}>{t('modeBuild.remove')}</Button></li>
        </ul>

        <h4 className="title">{t('modeBuild.canvasOperations')}</h4>
        <ul className="operationList">
          <li><Button className="operationBtn" type="primary" size="small" onClick={() => rollbackHandler(graphInstance)}>{t('modeBuild.undo')}</Button></li>
          <li><Button className="operationBtn" type="primary" size="small" onClick={() => toBigHandler(graphInstance)}>{t('modeBuild.zoomIn')}</Button></li>
          <li><Button className="operationBtn" type="primary" size="small" onClick={() => toSmallHandler(graphInstance)}>{t('modeBuild.zoomOut')}</Button></li>
          <li><Button className="operationBtn" type="primary" size="small" onClick={() => resetHandler(graphInstance)}>{t('modeBuild.clear')}</Button></li>
          <li><Button className="operationBtn" type="primary" size="small" onClick={getGraphInfo}>{t('modeBuild.save')}</Button></li>
        </ul>

        <h4 className="title">{t('modeBuild.statusSummary')}</h4>
        <ul className="operationList">
          <li>{t('modeBuild.statusDefault')}: {statusSummary.default || 0}</li>
          <li>{t('modeBuild.statusPending')}: {statusSummary.pending || 0}</li>
          <li>{t('modeBuild.statusRunning')}: {statusSummary.running || 0}</li>
          <li>{t('modeBuild.statusSuccess')}: {statusSummary.success || 0}</li>
          <li>{t('modeBuild.statusFailed')}: {statusSummary.failed || 0}</li>
          <li>{t('modeBuild.statusSkipped')}: {statusSummary.skipped || 0}</li>
        </ul>
        
        {/* <Button className="operationBtn" type="primary" size="small" onClick={getGraphInfo}>{t('modeBuild.getInfo')}</Button> */}
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
          <li onClick={editNodeHandler}>{t('modeBuild.editInfo')}</li>
          <li onClick={() => setStatus('pending')}>{t('modeBuild.setStatusPending')}</li>
          <li onClick={() => setStatus('running')}>{t('modeBuild.setStatusRunning')}</li>
          <li onClick={() => setStatus('success')}>{t('modeBuild.setStatusSuccess')}</li>
          <li onClick={() => setStatus('failed')}>{t('modeBuild.setStatusFailed')}</li>
          <li onClick={() => setStatus('skipped')}>{t('modeBuild.setStatusSkipped')}</li>
          <li onClick={() => setStatus('default')}>{t('modeBuild.clearStatus')}</li>
          <li onClick={removeNodeHandler}>{t('modeBuild.remove')}</li>
          <li onClick={() => setNodeMenuVisible(false)}>{t('modeBuild.closeMenu')}</li>
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
          <li onClick={removeEdgeHandler}>{t('modeBuild.remove')}</li>
          <li onClick={() => setEdgeMenuVisible(false)}>{t('modeBuild.closeMenu')}</li>
        </ul>
      )}


      <Modal
        title={t('modeBuild.nodeConfig')}
        closable={false}
        open={isModalOpen}
        footer={[
          <Button key="submit" type="primary" onClick={handleModalOk}>
            {t('modeBuild.save')}
          </Button>
        ]}
      >
        <div>
          {t('modeBuild.nodeName')}:

          <Input
            placeholder={t('modeBuild.nodeNameCannotBeEmpty')}
            value={selectNodeData?.label || ''}
            onChange={(e) => handleInputChange(e, 'label')}
          />
        </div>
        <div>
          {t('modeBuild.nodeDesc')}:
          <TextArea
            rows={4}
            value={selectNodeData?.desc || ''}
            onChange={(e) => handleInputChange(e, 'desc')}
          />
        </div>
        <div>
          {t('modeBuild.nodeStatus')}:
          <Select
            style={{ width: '100%', marginTop: 8 }}
            value={selectNodeData?.status || 'default'}
            options={[
              { value: 'default', label: t('modeBuild.statusDefault') },
              { value: 'pending', label: t('modeBuild.statusPending') },
              { value: 'running', label: t('modeBuild.statusRunning') },
              { value: 'success', label: t('modeBuild.statusSuccess') },
              { value: 'failed', label: t('modeBuild.statusFailed') },
              { value: 'skipped', label: t('modeBuild.statusSkipped') }
            ]}
            onChange={(val) => {
              if (!selectNodeData) return
              const next = cloneDeep(selectNodeData)
              next.status = val
              setSelectNodeData(next)
            }}
          />
        </div>
      </Modal>
    </div>
  );
};

export default X6Editor;
