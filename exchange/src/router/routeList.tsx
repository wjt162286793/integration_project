import React, { lazy } from 'react';
// 懒加载组件（保持原有导入路径）
const Home = lazy(() => import('@/pages/home/index.tsx'));
const Bazaar = lazy(() => import('@/pages/bazaar/index.tsx'));
const BuyCoin = lazy(() => import('@/pages/buyCoin/index.tsx'));
const WebThree = lazy(() => import('@/pages/webThree/index.tsx'));
const BlockTrade = lazy(() => import('@/pages/buyCoin/blockTrade/index.tsx'));
const Fast = lazy(() => import('@/pages/buyCoin/fast/index.tsx'));
const FastTradePortal = lazy(() => import('@/pages/buyCoin/fast/portal.tsx'));
const FastPayMethod = lazy(() => import('@/pages/buyCoin/fast/payMethod.tsx'));
const BuyList = lazy(() => import('@/pages/buyCoin/blockTrade/buyList.tsx'));
const SellList = lazy(() => import('@/pages/buyCoin/blockTrade/sellList.tsx'));
const BetList = lazy(() => import('@/pages/buyCoin/blockTrade/betList.tsx'));
const Currency = lazy(() => import('@/pages/bazaar/currency/index.tsx'));
const TradingData = lazy(() => import('@/pages/bazaar/tradingData/index.tsx'));
const TradingView = lazy(() => import('@/pages/bazaar/tradingView/index.tsx'));

// 路由配置接口（新增）
interface RouteConfig {
  path: string;
  element: React.ReactNode;
  key: string;
  name: string;
  children?: RouteConfig[];
  index?: boolean;
}

// 路由配置数组（保持原有路径和配置）
const routeList: RouteConfig[] = [
  {
    path: 'home',
    element: <Home />,
    key: 'home',
    name: 'home',
    children: [
      {
        path: 'bazaar',
        element: <Bazaar />,
        key: 'bazaar',
        name: 'bazaar',
        children:[
          {
            path:'currency',
            element:<Currency/>,
            key:'currency',
            name:'currency',
          },
          {
            path:'tradingData',
            element:<TradingData/>,
            key:'tradingData',
            name:'tradingData',
          },
          {
            path:'tradingView',
            element:<TradingView/>,
            key:'tradingView',
            name:'tradingView',
          }
        ]
      },
      {
        path: 'buyCoin',
        element: <BuyCoin />,
        key: 'buyCoin',
        name: 'buyCoin',
        children: [
          {
            path: 'blockTrade', // 已修正为相对路径
            element: <BlockTrade />,
            key: 'blockTrade',
            name: 'blockTrade',
            children: [
              {
                path: 'buyList',
                element: <BuyList />,
                key: 'buyList',
                name: 'buyList',
              },
              {
                path: 'sellList',
                element: <SellList />,
                key: 'sellList',
                name: 'sellList'
              },
              {
                path: 'betList',
                element: <BetList />,
                key: 'betList',
                name: 'betList'
              }
            ]
          },
          {
            path: 'fast', // 修改：将 '/home/buyCoin/fast' 改为 'fast'
            element: <Fast />,
            key: 'fast',
            name: 'fast',
            children: [
              {
                path: 'portal',
                element: <FastTradePortal />,
                key: 'portal',
                name: 'portal',
              },
              {
                path: 'payMethod',
                element: <FastPayMethod />,
                key: 'payMethod',
                name: 'payMethod',
              }
            ]
          },
        ]
      },
      {
        path: 'webThree',
        element: <WebThree />,
        key: 'webThree',
        name: 'webThree',
      },
    ]
  },
];

export default routeList