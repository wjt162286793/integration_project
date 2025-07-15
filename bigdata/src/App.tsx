

import { useRoutes} from 'react-router-dom'
import { Button, ConfigProvider, Space } from 'antd';
import RouterCom from './router';
import { GlobalContext,globalData } from '@/global/context';
function App() {
  return (
    <GlobalContext.Provider value={globalData}>
      <RouterCom></RouterCom>
    </GlobalContext.Provider>
        
  )
}

export default App
