interface listItem {
  name: string;
  url: string;
  cname: string;
  sync: boolean;
  symbol: string;
  description: string;
}

const list:listItem[] = [
    {
      name: 'exchange',
      url: 'http://localhost:9001',
      cname: '交易所',
      sync: true,
      symbol: '交',
      description: '进入数字资产交易与市场行情工作区。'
    },
    // {
    //   name: 'devops',
    //   url: 'http://localhost:9002',
    //   cname:'管理系统',
    //   sync: true
    // },
    {
      name: 'bigdata',
      url: 'http://localhost:9003',
      // url:'http://82.157.193.128:8083',
      cname: '大数据系统',
      sync: true,
      symbol: '数',
      description: '查看数据看板、管理资产并构建流程模型。'
    },
    {
      name: 'aisystem',
      url: 'http://localhost:9004',
      cname: 'ai系统',
      sync: true,
      symbol: 'AI',
      description: '使用 AI 对话与智能能力辅助业务工作。'
    },
    {
      name: 'devops',
      url: 'http://localhost:9002',
      cname: '运维管理',
      sync: true,
      symbol: '运',
      description: '管理运维任务、流水线和部署状态。'
    }
]

export default list
