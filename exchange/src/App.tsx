import React from 'react';
import { ConfigProvider } from 'antd';
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
