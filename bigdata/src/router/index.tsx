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
const FileMode = lazy(() => import("../views/fileMode/index"))


// 定义路由配置的类型
interface RouteConfig {
  name: string;
  path: string;
  cname: string;
  ename: string;
  element: React.ReactElement;
  children?: RouteConfig[]
}

// 路由配置
const routeList: RouteConfig[] = [

  {
    name: "dashBoard",
    path: "/dashBoard",
    cname: "主页",
    ename: "dashBoard",
    element: <DashBoard />,
    children: [
      {
        name: 'workbench',
        path: '/dashBoard/workbench',
        cname: '工作台',
        ename: 'workbench',
        element: <WorkBench />
      },
      {
        name: 'property',
        path: '/dashBoard/property',
        cname: '资产管理',
        ename: 'property',
        element: <Property />
      },
      {
        name: 'chart',
        path: '/dashBoard/chart',
        cname: '数据看板',
        ename: 'chart',
        element: <Chart />
      },
      {
        name: 'modeBuild',
        path: '/dashBoard/modeBuild',
        cname: '模型构建',
        ename: 'modeBuild',
        element: <ModeBuild />,
      },
      {
        name: 'fileMode',
        path: '/dashBoard/fileMode',
        cname: '大文件上传',
        ename: 'fileMode',
        element: <FileMode />,
      },
      {
        name: 'readMe',
        path: '/dashBoard/readMe',
        cname: '说明文档',
        ename: 'readMe',
        element: <ReadMe />,
      },

    ]
  },
  {
    name: "notFound",
    path: "*",
    cname: "空页面",
    ename: "notFound",
    element: <NotFound />,
  },
];

const isSubAppFlag = window.__POWERED_BY_WUJIE__
if(!isSubAppFlag){
  routeList.unshift({
    name: "login",
    path: "/login",
    cname: "登录",
    ename: "login",
    element: <Login />,
  })
}




const RouterCom: React.FC = () => {
  return (
    <Router>
      <Suspense fallback={<LoadingCom></LoadingCom>}>
        <Routes>
          <Route path="/" element={<Navigate to="/dashBoard" replace />} />
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
export { routeList };