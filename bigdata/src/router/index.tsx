import React, { lazy, Suspense } from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import LoadingCom from '@/components/loading'

// 使用 React.lazy 动态导入组件
const Login = lazy(() => import("../views/login/index"));
const DashBoard = lazy(() => import("../views/dashboard/index"));
const NotFound = lazy(() => import("../views/404/index"));
const WorkBench = lazy(() => import("../views/workbench/index"))
const Property = lazy(() => import("../views/property/index"))
const Chart = lazy(() => import("../views/chart/index"))
const ModeBuild = lazy(() => import("../views/modeBuild/index"))
const ReadMe = lazy(() => import("../views/readMe/index"))


// 定义路由配置的类型
interface RouteConfig {
  name: string;
  path: string;
  cname: string;
  element: React.ReactElement;
  children?: RouteConfig[]
}

// 路由配置
const routeList: RouteConfig[] = [
  {
    name: "login",
    path: "/login",
    cname: "登录",
    element: <Login />,
  },
  {
    name: "dashBoard",
    path: "/dashBoard",
    cname: "主页",
    element: <DashBoard />,
    children: [
      {
        name: 'workbench',
        path: '/dashBoard/workbench',
        cname: '工作台',
        element: <WorkBench />
      },
      {
        name: 'property',
        path: '/dashBoard/property',
        cname: '数字资产',
        element: <Property />
      },
      {
        name: 'chart',
        path: '/dashBoard/chart',
        cname: '统计图表',
        element: <Chart />
      },
      {
        name: 'modeBuild',
        path: '/dashBoard/modeBuild',
        cname: '模型构建',
        element: <ModeBuild />,
      },
      {
        name: 'readMe',
        path: '/dashBoard/readMe',
        cname: '说明文档',
        element: <ReadMe />,
      },
    ]
  },
  {
    name: "notFound",
    path: "*",
    cname: "空页面",
    element: <NotFound />,
  },
];

const RouterCom: React.FC = () => {
  return (
    <Router>
      <Suspense fallback={<LoadingCom></LoadingCom>}>
        <Routes>
          <Route path="/" element={<Navigate to="/login" replace />} />
          {routeList.map((item, index) => (
            <Route key={index} path={item.path} element={item.element}>
              {item.children &&
                item.children.map((val, ind) => (
                  <Route key={ind} path={val.path} element={val.element} />
                ))}
            </Route>
          ))}
        </Routes>
      </Suspense>
    </Router>
  );
};

export default RouterCom;