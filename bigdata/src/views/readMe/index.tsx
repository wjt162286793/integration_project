import React from 'react'
import { Descriptions,Col, Row } from 'antd';
import type { DescriptionsProps } from 'antd';


import './index.less'


const items: DescriptionsProps['items'] = [
  {
    key: '1',
    label: '姓名',
    children: '王惊涛',
  },
    {
    key: '2',
    label: '昵称',
    children: '青阳流月',
  },
  {
    key: '3',
    label: '联系电话',
    children: '86-15536278341  86-17300131217',
  },
  {
    key: '4',
    label: '工作',
    children: '前端开发工程师',
  },
  {
    key: '5',
    label: '个人博客地址',
    children: <a className='link' onClick={()=>window.open('https://blog.csdn.net/m0_54741495?spm=1010.2135.3001.5343')}>https://blog.csdn.net/m0_54741495?spm=1010.2135.3001.5343</a> ,
  },
  {
    key: '6',
    label: '个人github地址',
    children: <a className='link' onClick={()=>window.open('https://github.com/wjt162286793')}>https://github.com/wjt162286793</a>
  },
];


export default function index() {
  return (
    <div>
       <h2>作者信息</h2>
       <Descriptions items={items} />
       <h2>项目介绍</h2>
       <p>本项目并非应用于任何盈利,仅用于学习。其中的数据全部都为假数据,仅做展示使用。</p>
       <p>模拟了一些大数据平台和管理系统所需要的业务场景,例如数据展示,统计图表,流程建模等。</p>
       <h2>技术介绍</h2>
       <p>本项目前端使用vite+react技术栈,后台使用express+mysql技术栈,主要代码为typescript</p>
       <h3>前端层:</h3>
      <Row>
      <Col span={3}><span className='label'>项目构造框架:</span>react</Col>
      <Col span={3}><span className='label'>统一状态管理:</span>redux</Col>
      <Col span={3}><span className='label'>网络请求工具:</span>axios</Col>
      <Col span={3}><span className='label'>主题ui组件:</span>Ant Design</Col>
      <Col span={3}><span className='label'>统计图表组件:</span>Echarts & AntV G2</Col>
      <Col span={3}><span className='label'>模型构建组件:</span> AntV X6</Col>
      <Col span={3}><span className='label'>常用函数集合:</span> lodash</Col>
      <Col span={3}><span className='label'>3D模型构建:</span> three.js</Col>
    </Row>
    <h3>服务层:</h3>
    <Row>
      <Col span={3}><span className='label'>项目主要框架:</span>express</Col>
      <Col span={3}><span className='label'>连接数据库:</span>mysql2</Col>
      <Col span={3}><span className='label'>密码加密插件:</span>bcrypt</Col>
      <Col span={3}><span className='label'>日期处理插件:</span>Momentjs</Col>
      <Col span={3}><span className='label'>数据库服务:</span>mysql(腾讯云服务器)</Col>
    </Row>
    <h3>优化与部署</h3>
    <Row>
      <Col span={3}><span className='label'>图片资源压缩:</span>vite-plugin-imagemin</Col>
      <Col span={3}><span className='label'>构建体积检测:</span>vite-plugin-analyzer</Col>
      <Col span={3}><span className='label'>分包策略:</span>manualChunks</Col>
      <Col span={3}><span className='label'>应用测试框架:</span>jest</Col>
      <Col span={3}><span className='label'>部署</span>宝塔.腾讯云</Col>
    </Row>
    <h2>模块介绍</h2>
    项目共有登录模块,工作台模块,数字资产模块,统计图表模块,模型构建模块,大屏预览模块,开发者模块,超级管理员模块
    <h3>登录</h3>
    在项目中,未配置注册功能。登录模块默认配置好三种角色,coder(开发者),admin(超级管理员),user(普通用户)。密码也已经默认配置好,无需用户输入。只有登录才可以使用系统功能。
    <h3>工作台模块</h3>
    工作台中集成了配置系统主题色,待办事项预览,个人资产预览等功能
    <h3>数字资产</h3>
    该模块是经典的CURD模块,对资产进行增删改查,并且根据用户角色配置对应的按钮操作权限
    <h3>统计图图表</h3>
    该模块主要使用了echarts和AntV G2这两种库,展示了统计图插件的使用
    <h3>模型组件构建</h3>
    该模块使用了AntV X6组件库,可以创建流程图,拓扑图,思维脑图,结构图等模型,也可以自定义模型模板。
    <h3>大屏概览</h3>
    该模块使用了echarts,three.js等技术,完成了一个经典大数据大屏预览。
    </div>
  )
}
