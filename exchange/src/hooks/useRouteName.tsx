import { useLocation, matchPath } from 'react-router-dom';
import routeList from '@/router/routeList';


interface RouteConfig {
  path: string;
  element: React.ReactNode;
  key:string;
  name:string;
  children?: RouteConfig[];
}


// 递归查找当前路由的自定义名称
const findRouteName = (routes: RouteConfig[], pathname: string): string | undefined => {
  for (const route of routes) {
    // 使用matchPath精确匹配路由
    if (matchPath(route.path, pathname)) {
      return route.name;
    }
    // 递归查找子路由
    if (route.children && route.children.length > 0) {
      const childName = findRouteName(route.children, pathname);
      if (childName) return childName;
    }
  }
  return undefined;
};

// 自定义Hook
export const useRouteName = (): string | undefined => {
  const { pathname } = useLocation();
  return findRouteName(routeList, pathname);
};