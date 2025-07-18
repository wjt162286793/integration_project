interface listItem {
  name: string;
  url: string;
  cname:string;
  sync:boolean;
}


const list:listItem[] = [
    {
      name: 'exchange',
      url: 'http://localhost:9001',
      cname:'交易所',
      sync: true
    },
    {
      name: 'devops',
      url: 'http://localhost:9002',
      cname:'管理系统',
      sync: true
    },
    {
      name: 'bigdata',
      // url: 'http://localhost:9003',
      url:'http://82.157.193.128:8083',
      cname:'大数据系统',
      sync: true
    },
    {
      name: 'aisystem',
      url: 'http://localhost:9004',
      cname:'ai系统',
      sync: true
    }
]

export default list