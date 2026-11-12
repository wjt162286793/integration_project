enum chartType {
  Flow = "flow", //流程图
  Mind = "mind", //思维脑图
  Organization = "organization", // 结构图
  Pipeline = "pipeline", // 数据管道
  Topology = "topology", // 服务拓扑
}

interface itemType {
  id: string;
  name: string;
  type: chartType;
}

export interface dataType {
  name: string;
  type: chartType;
  children: itemType[];
}
const menuList: dataType[] = [
  {
    name: "流程图",
    type: chartType.Flow,
    children: [
      {
        id: 'flow_1',
        name: "商品上架流程",
        type: chartType.Flow,
      },
      {
        id: 'flow_2',
        name: "AI模型训练",
        type: chartType.Flow,
      },
            {
        id: 'flow_3',
        name: "系统部署流程图",
        type: chartType.Flow,
      },
    ],
  },
  {
    name: "结构图",
    type: chartType.Organization,
    children: [
      {
        id: 'organization_1',
        name: "组织架构图",
        type: chartType.Organization,
      },
    ],
  },
  {
    name: "分析图",
    type: chartType.Mind,
    children: [
      { id: 'mind_1', name: "用户画像分析", type: chartType.Mind },
      { id: 'pipeline_1', name: "实时数据管道", type: chartType.Pipeline },
      { id: 'topology_1', name: "平台服务拓扑", type: chartType.Topology },
    ],
  },
];

export default menuList;
