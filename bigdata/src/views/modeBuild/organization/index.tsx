import React, { useEffect, useLayoutEffect, useState,useContext } from 'react'
import { Graph, Node, Point, Shape, Cell } from '@antv/x6'
import './index.less'
import { Modal,Input, Button } from 'antd'
import {cloneDeep} from 'lodash'
import dataList from './data'
import { GlobalContext } from '@/global/context';
export default function index(props) {

    

    const initFun = () => {
        Graph.registerNode(
            'org-node',
            {
                width: 180,
                height: 60,
                // component: nodeCom,
                markup: [
                    {
                        tagName: 'rect',
                        selector: 'body',
                    },
                    {
                        tagName: 'image',
                        selector: 'avatar',
                    },
                    {
                        tagName: 'text',
                        selector: 'rank',
                    },
                    {
                        tagName: 'text',
                        selector: 'name',
                    },
                ],
                attrs: {
                    body: {
                        refWidth: '100%',
                        refHeight: '100%',
                        fill: '#5F95FF',
                        stroke: '#5F95FF',
                        strokeWidth: 1,
                        rx: 10,
                        ry: 10,
                        pointerEvents: 'visiblePainted',
                    },
                    avatar: {
                        width: 48,
                        height: 48,
                        refX: 8,
                        refY: 6,
                    },
                    rank: {
                        refX: 0.9,
                        refY: 0.2,
                        fill: '#fff',
                        fontFamily: 'Courier New',
                        fontSize: 14,
                        textAnchor: 'end',
                        textDecoration: 'underline',
                    },
                    name: {
                        refX: 0.9,
                        refY: 0.6,
                        fill: '#fff',
                        fontFamily: 'Courier New',
                        fontSize: 14,
                        fontWeight: '800',
                        textAnchor: 'end',
                    },
                },
                ports: {
                    groups: {
                        top: {
                            position: 'top',
                            attrs: {
                                circle: {
                                    r: 4,
                                    magnet: true,
                                    stroke: '#5f95ff',
                                    strokeWidth: 1,
                                    fill: '#fff',
                                },
                            },
                        },
                        bottom: {
                            position: 'bottom',
                            attrs: {
                                circle: {
                                    r: 4,
                                    magnet: true,
                                    stroke: '#5f95ff',
                                    strokeWidth: 1,
                                    fill: '#fff',
                                },
                            },
                        },
                        left: {
                            position: 'left',
                            attrs: {
                                circle: {
                                    r: 4,
                                    magnet: true,
                                    stroke: '#5f95ff',
                                    strokeWidth: 1,
                                    fill: '#fff',
                                },
                            },
                        },
                        right: {
                            position: 'right',
                            attrs: {
                                circle: {
                                    r: 4,
                                    magnet: true,
                                    stroke: '#5f95ff',
                                    strokeWidth: 1,
                                    fill: '#fff',
                                },
                            },
                        },
                    },
                    items: [
                        {
                            group: 'top',
                        },
                        {
                            group: 'bottom',
                        },
                        {
                            group: 'left',
                        },
                        {
                            group: 'right',
                        },
                    ],
                },
            }, true

        )
    }

    initFun()

    const [graphEntity, setGraphEntity] = useState<Cell | null>(null)

    const createGraph = () => {
        const graph = new Graph({
            container: document.getElementById('container'),
            connecting: {
                anchor: 'orth',
                router: 'manhattan',
                createEdge() {
                    return new Shape.Edge({
                        attrs: {
                            line: {
                                stroke: '#A2B1C3',
                                strokeWidth: 2,
                                targetMarker: {
                                    name: 'block',
                                    width: 12,
                                    height: 8,
                                },
                            },
                        },
                        zIndex: 0,
                    })
                }
            },
        })
        graph.on("node:contextmenu",(event)=>{
            event.e.stopPropagation()
            setMenuVisible2(true)
            setSelectNode(event.node)
            setMenuPosition({ x: event.e.clientX, y: event.e.clientY });
        })

        graph.on("edge:contextmenu",(event)=>{
            event.e.stopPropagation()
            setMenuVisible3(true)
            setSelectEdge(event.edge)
            setMenuPosition({ x: event.e.clientX, y: event.e.clientY });
        })

        graph.on("edge:mouseleave",(event)=>{
            event.e.stopPropagation()
            let edgeItem = event.edge
            if(!edgeItem.target.port){
                graph.removeCell(edgeItem)
            }
            
            return false
        })

        setGraphEntity(graph)
    }



    const [menuVisible1, setMenuVisible1] = useState<boolean>(false)
    const [menuVisible2, setMenuVisible2] = useState<boolean>(false)
    const [menuVisible3, setMenuVisible3] = useState<boolean>(false)
    const [menuPosition, setMenuPosition] = useState<{ x: number, y: number } | null>(null)
    const [selectNode,setSelectNode] = useState<Cell | null>(null)
    const [selectNodeData,setSelectNodeData] = useState(null)
    const [editVisible,setEditVisible] = useState<boolean>(false)
    const [modeId,setModeId] = useState<string | null>(null)
    const [selectEdge,setSelectEdge] = useState<Cell | null>(null)
 
    useEffect(() => {
        createGraph()
    }, [])


    useLayoutEffect(()=>{
        setModeId(props.id)
    })


    useEffect(()=>{
       if(modeId){
         console.log(modeId,'modeId有值')
         if(graphEntity){
            
            drawerGraph()
         }
       }else{
          console.log(modeId,'modeId无值')
          clearGraph()
       }
    },[modeId,graphEntity])


    const male =
        'https://gw.alipayobjects.com/mdn/rms_43231b/afts/img/A*kUy8SrEDp6YAAAAAAAAAAAAAARQnAQ'
    const female =
        'https://gw.alipayobjects.com/mdn/rms_43231b/afts/img/A*f6hhT75YjkIAAAAAAAAAAAAAARQnAQ'

    const member = (
        x: number,
        y: number,
        rank: string,
        name: string,
        image: string,
    ) => {
        console.log('新增',x,y)
        setMenuVisible1(false)
        return graphEntity.addNode({
            x:x,
            y:y,
            shape: 'org-node',
            attrs: {
                avatar: {
                    opacity: 0.7,
                    'xlink:href': image,
                },
                rank: {
                    text: rank,
                    wordSpacing: '-5px',
                    letterSpacing: 0,
                },
                name: {
                    text: name,
                    fontSize: 13,
                    fontFamily: 'Arial',
                    letterSpacing: 0,
                },
            },
        })
    }
    const link = (source: Node, target: Node, vertices: Point.PointLike[]) => {
        return graphEntity.addEdge({
            vertices,
            source: {
                cell: source,
            },
            target: {
                cell: target,
            },
            shape: 'org-edge',
        })
    }

    const graphContextMenuHandler = (event) => {
        console.log(event, '???')
        event.preventDefault();
        setMenuVisible1(true)
        let params = globalText.isSubAppFlag ? {x: event.clientX-272-200, y: event.clientY-76 } : {x: event.clientX-272, y: event.clientY-76 }
        setMenuPosition(params);
    }

    const closeMenuHandler1 = () => {
        setMenuVisible1(false)
    }
    const closeMenuHandler2 = () => {
        setMenuVisible2(false)
    }

    const addNodeHandler = () => {
        member(menuPosition?.x,menuPosition?.y,'职务','姓名',male)
        
        console.log(graphEntity,'???===')
    }
    
    const getInfo = ()=>{
        const dataJson = graphEntity.toJSON();
        console.log(dataJson,'dataJson===')
        setMenuVisible1(false)
    }

    const openEditHandler = ()=>{
         setEditVisible(true)
         setMenuVisible2(false)
         console.log(selectNode,'打开编辑')
         setSelectNodeData(selectNode?.attrs)
    }

    const changeInput = (event,prop) =>{
        console.log(selectNodeData,event.target.value,prop,'??')
        const newAttrs = cloneDeep(selectNodeData)
        newAttrs[prop].text = event.target.value
        setSelectNodeData(newAttrs)

    }
    const handleModalOk = ()=>{
         setEditVisible(false)
         selectNode?.setAttrs(selectNodeData)
    }

    const clearGraph = ()=>{
        graphEntity?.clearCells()
        setMenuVisible1(false)
    }
    const removeNodeHandler = ()=>{
        graphEntity.removeCell(selectNode)
        setMenuVisible2(false)
    }

    const removeEdgeHandler = ()=>{
        graphEntity.removeCell(selectEdge)
        setMenuVisible3(false)
    }
    const closeMenuHandler3 = ()=>{
        setMenuVisible3(false)
    }

const drawerGraph = () => {
    const dataInfo = dataList.find(item => item.name === modeId);
    console.log(dataInfo, '数据信息');
    const cells = [];
    graphEntity.clearCells();
 
    // 存储所有创建的节点，以便后续创建边时使用
    const nodeMap = new Map();
 
    // 创建节点
    dataInfo?.data.forEach(item => {
        if (item.shape === 'org-node') {
            let nodeItem = member(
                item.position?.x,
                item.position?.y,
                item.attrs.rank?.text,
                item.attrs.name?.text,
                item.attrs.avatar['xlink:href']
            );
            nodeMap.set(item.id, nodeItem); // 将节点存储到 Map 中
            cells.push(nodeItem);
        }
    });
 
    // 创建边
    dataInfo?.data.forEach(item => {
        if (item.shape === 'edge') {
            const sourceNode = nodeMap.get(item.source.cell);
            const targetNode = nodeMap.get(item.target.cell);
 
            if (sourceNode && targetNode) {
                const edge = graphEntity.addEdge({
                    source: {
                        cell: sourceNode,
                        port: item.source.port
                    },
                    target: {
                        cell: targetNode,
                        port: item.target.port
                    },
                    attrs: item.attrs,
                    zIndex: item.zIndex,
                    id: item.id
                });
                cells.push(edge);
            }
        }
    });
};

const globalText = useContext(GlobalContext)
    return (
        <>
        <div id='container' className={globalText?.isSubAppFlag?'container_subApp':'container'} onContextMenu={graphContextMenuHandler}>
            {menuVisible1 && (
                <ul
                    className='menu'
                    style={{
                        position: 'absolute',
                        left: menuPosition?.x,
                        top: menuPosition?.y,

                    }}
                >
                    <li onClick={addNodeHandler}>
                        新增成员
                    </li>
                    <li onClick={clearGraph}>
                        清空画布
                    </li>
                    <li onClick={getInfo}>
                        保存
                    </li>
                    <li onClick={closeMenuHandler1}>
                        关闭菜单
                    </li>
                </ul>
            )}
            {menuVisible2 && (
                <ul
                    className='menu'
                    style={{
                        position: 'fixed',
                        left: menuPosition?.x,
                        top: menuPosition?.y,

                    }}
                >
                    <li onClick={openEditHandler}>
                        编辑
                    </li>
                    <li onClick={removeNodeHandler}>
                        移除
                    </li>
                    <li onClick={closeMenuHandler2}>
                        关闭菜单
                    </li>
                </ul>
            )}
                        {menuVisible3 && (
                <ul
                    className='menu'
                    style={{
                        position: 'fixed',
                        left: menuPosition?.x,
                        top: menuPosition?.y,

                    }}
                >
                    <li onClick={removeEdgeHandler}>
                        移除
                    </li>
                    <li onClick={closeMenuHandler3}>
                        关闭菜单
                    </li>
                </ul>
            )}
        </div>
              <Modal
        title="节点信息编辑"
        open={editVisible}
        closable={false}
        footer={[
          <Button key="submit" type="primary" onClick={handleModalOk}>
            保存
          </Button>
        ]}

      >
        <div>
            <div>
                职务: <Input placeholder="请输入职务" value={selectNodeData?.rank?.text} onChange={(event)=>changeInput(event,'rank')}/>
            </div>
            <div>
                姓名: <Input placeholder="请输入姓名" value={selectNodeData?.name?.text} onChange={(event)=>changeInput(event,'name')}/>
            </div>
        </div>
      </Modal>
        </>


    )
}
