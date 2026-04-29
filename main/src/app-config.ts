interface listItem {
  name: string;
  url: string;
  cname:string;
  sync:boolean;
}

const list:listItem[] = [
    {
      name: 'exchange',
      url: (import.meta as any).env?.VITE_EXCHANGE_URL || 'http://localhost:9001',
      cname:'交易所',
      sync: true
    },
    // {
    //   name: 'devops',
    //   url: 'http://localhost:9002',
    //   cname:'管理系统',
    //   sync: true
    // },
    {
      name: 'bigdata',
      url: (import.meta as any).env?.VITE_BIGDATA_URL || 'http://localhost:9003',
      cname:'大数据系统',
      sync: true
    },
    {
      name: 'aisystem',
      url: (import.meta as any).env?.VITE_AISYSTEM_URL || 'http://localhost:9004',
      cname:'ai系统',
      sync: true
    }
]

export default list
