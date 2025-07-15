enum chartType {
  Flow = "flow", //流程图
  Mind = "mind", //思维脑图
  Organization = "organization", // 结构图
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
];

export default menuList;
