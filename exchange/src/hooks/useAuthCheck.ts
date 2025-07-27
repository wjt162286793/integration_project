import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { message } from 'antd';


// 全局登录检查Hook
const useAuthCheck = () => {
  const [messageApi, contextHolder] = message.useMessage();
  const navigate = useNavigate();
  const isLoggedIn = localStorage.getItem('rx-token');
  useEffect(() => {
    // 这里假设登录状态存储在localStorage中，实际项目中可能需要从store获取
    // 如果未登录，跳转到首页
    if (!isLoggedIn) {
      alert('当前未登录,返回到主页');
      navigate('/home/buyCoin/fast/portal');

    }
  }, [navigate]);

  return isLoggedIn
};

export default useAuthCheck;