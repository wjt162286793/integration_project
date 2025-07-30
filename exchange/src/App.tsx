import React, { useEffect } from 'react';
import { ConfigProvider,theme } from 'antd';
import RouterCom from './router';
import './App.css';
function App() {



  return (
    <ConfigProvider theme={{ token: { colorPrimary: '#000' } }}>
      <RouterCom />
    </ConfigProvider>
  );
}

export default App;
