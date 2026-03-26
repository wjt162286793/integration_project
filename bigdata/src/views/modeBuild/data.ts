enum chartType {
  Flow = "flow",
  Mind = "mind",
  Organization = "organization",
}

interface itemType {
  id: string;
  name: string;
  cname: string;
  ename: string;
  type: chartType;
}

export interface dataType {
  name: string;
  cname: string;
  ename: string;
  type: chartType;
  children: itemType[];
}
const menuList: dataType[] = [
  {
    name: "流程图",
    cname: "流程图",
    ename: "Flow Chart",
    type: chartType.Flow,
    children: [
      {
        id: 'flow_1',
        name: "商品上架流程",
        cname: "商品上架流程",
        ename: "Product Shelf Flow",
        type: chartType.Flow,
      },
      {
        id: 'flow_2',
        name: "AI模型训练",
        cname: "AI模型训练",
        ename: "AI Model Training",
        type: chartType.Flow,
      },
      {
        id: 'flow_3',
        name: "系统部署流程图",
        cname: "系统部署流程图",
        ename: "System Deployment Flow",
        type: chartType.Flow,
      },
    ],
  },
  {
    name: "结构图",
    cname: "结构图",
    ename: "Structure Chart",
    type: chartType.Organization,
    children: [
      {
        id: 'organization_1',
        name: "组织架构图",
        cname: "组织架构图",
        ename: "Organization Chart",
        type: chartType.Organization,
      },
    ],
  },
];

export default menuList;
