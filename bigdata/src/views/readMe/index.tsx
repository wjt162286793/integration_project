import React from 'react'
import { Descriptions,Col, Row } from 'antd';
import type { DescriptionsProps } from 'antd';
import { useTranslation } from 'react-i18next';

import './index.less'


export default function index() {
  const { t } = useTranslation();
  
  const items: DescriptionsProps['items'] = [
  {
    key: '1',
    label: t('readMe.name'),
    children: '王惊涛',
  },
    {
    key: '2',
    label: t('readMe.nickname'),
    children: '青阳流月',
  },
  {
    key: '3',
    label: t('readMe.phone'),
    children: '86-15536278341  86-17300131217',
  },
  {
    key: '4',
    label: t('readMe.job'),
    children: '前端开发工程师',
  },
  {
    key: '5',
    label: t('readMe.blog'),
    children: <a className='link' onClick={()=>window.open('https://blog.csdn.net/m0_54741495?spm=1010.2135.3001.5343')}>https://blog.csdn.net/m0_54741495?spm=1010.2135.3001.5343</a> ,
  },
  {
    key: '6',
    label: t('readMe.github'),
    children: <a className='link' onClick={()=>window.open('https://github.com/wjt162286793')}>https://github.com/wjt162286793</a>
  },
];
  
  return (
    <div>
       <h2>{t('readMe.authorInfo')}</h2>
       <Descriptions items={items} />
       <h2>{t('readMe.projectIntroduction')}</h2>
       <p>{t('readMe.projectDescription1')}</p>
       <p>{t('readMe.projectDescription2')}</p>
       <h2>{t('readMe.technologyIntroduction')}</h2>
       <p>本项目前端使用vite+react技术栈,后台使用express+mysql技术栈,主要代码为typescript</p>
       <h3>{t('readMe.frontendLayer')}</h3>
      <Row>
      <Col span={3}><span className='label'>{t('readMe.projectFramework')}</span>react</Col>
      <Col span={3}><span className='label'>{t('readMe.stateManagement')}</span>redux</Col>
      <Col span={3}><span className='label'>{t('readMe.networkRequest')}</span>axios</Col>
      <Col span={3}><span className='label'>{t('readMe.uiComponent')}</span>Ant Design</Col>
      <Col span={3}><span className='label'>{t('readMe.chartComponent')}</span>Echarts & AntV G2</Col>
      <Col span={3}><span className='label'>{t('readMe.modelComponent')}</span> AntV X6</Col>
      <Col span={3}><span className='label'>{t('readMe.utilityFunctions')}</span> lodash</Col>
      <Col span={3}><span className='label'>{t('readMe.threeDModel')}</span> three.js</Col>
    </Row>
    <h3>{t('readMe.backendLayer')}</h3>
    <Row>
      <Col span={3}><span className='label'>{t('readMe.backendFramework')}</span>express</Col>
      <Col span={3}><span className='label'>{t('readMe.database')}</span>mysql2</Col>
      <Col span={3}><span className='label'>{t('readMe.passwordEncryption')}</span>bcrypt</Col>
      <Col span={3}><span className='label'>{t('readMe.dateProcessing')}</span>Momentjs</Col>
      <Col span={3}><span className='label'>{t('readMe.databaseService')}</span>mysql(腾讯云服务器)</Col>
    </Row>
    <h3>{t('readMe.optimizationDeployment')}</h3>
    <Row>
      <Col span={3}><span className='label'>{t('readMe.imageCompression')}</span>vite-plugin-imagemin</Col>
      <Col span={3}><span className='label'>{t('readMe.buildAnalysis')}</span>vite-plugin-analyzer</Col>
      <Col span={3}><span className='label'>{t('readMe.codeSplitting')}</span>manualChunks</Col>
      <Col span={3}><span className='label'>{t('readMe.testFramework')}</span>jest</Col>
      <Col span={3}><span className='label'>{t('readMe.deployment')}</span>宝塔.腾讯云</Col>
    </Row>
    <h2>{t('readMe.moduleIntroduction')}</h2>
    {t('readMe.moduleList')}
    <h3>{t('readMe.loginModule')}</h3>
    {t('readMe.loginDescription')}
    <h3>{t('readMe.workbenchModule')}</h3>
    {t('readMe.workbenchDescription')}
    <h3>{t('readMe.digitalAssetModule')}</h3>
    {t('readMe.digitalAssetModuleDescription')}
    <h3>{t('readMe.chartModule')}</h3>
    {t('readMe.chartModuleDescription')}
    <h3>{t('readMe.modelModule')}</h3>
    {t('readMe.modelModuleDescription')}
    <h3>{t('readMe.bigScreenModule')}</h3>
    {t('readMe.bigScreenModuleDescription')}
    </div>
  )
}
