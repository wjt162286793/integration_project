import React, { Suspense } from 'react';
import {  BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';

import routeList from './routeList'
import LoadingCom from '@/component/loading'
// 路由组件（新增，格式与bigdata项目一致）
const RouterCom: React.FC = () => {


          const renderRoutes = (routes: any[]) => {
            return routes.map((route, index) => (
              <Route
                key={route.path || index}
                path={route.path}
                element={route.element}
              >
                {/* 递归渲染子路由 */}
                {route.children && renderRoutes(route.children)}
              </Route>
            ));
          };

  return (
    <Router>
      <Suspense fallback={<LoadingCom></LoadingCom>}>
        <Routes>

          {/* 使用递归函数替代原来的嵌套map */}
          {renderRoutes(routeList)}
          <Route path="/" element={<Navigate to="/home" replace />} />
        </Routes>
      </Suspense>
    </Router>
  );
};

export default RouterCom;
