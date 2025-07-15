interface listItem {
  name: string;
  url: string;
  cname:string;
  sync:boolean;
}


const list:listItem[] = [
    {
      name: 'chart',
      url: 'http://localhost:9001',
      cname:'图表系统',
      sync: true
    },
    {
      name: 'admin',
      url: 'http://localhost:9002',
      cname:'管理系统',
      sync: true
    },
    {
      name: 'bigdata',
      url: 'http://localhost:9003',
      cname:'大数据系统',
      sync: true
    }
]

export default list