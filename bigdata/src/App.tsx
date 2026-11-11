import { useEffect, useState } from 'react';
import { ConfigProvider } from 'antd';
import RouterCom from './router';
import { GlobalContext,globalData } from '@/global/context';
import { getUiPreferences, subscribeUiPreferences, themes } from '../../shared/ui-runtime';
import type { UiPreferences } from '../../shared/ui-runtime';

function App() {
  const [uiPreferences, setUiPreferences] = useState<UiPreferences>(getUiPreferences);

  useEffect(() => subscribeUiPreferences(setUiPreferences), []);

  return (
    <ConfigProvider theme={{ token: { colorPrimary: themes[uiPreferences.theme].color } }}>
      <GlobalContext.Provider value={globalData}>
        <RouterCom />
      </GlobalContext.Provider>
    </ConfigProvider>
        
  )
}

export default App
