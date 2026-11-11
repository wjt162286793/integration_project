import React, { useEffect, useState } from 'react';
import { ConfigProvider } from 'antd';
import RouterCom from './router';
import './App.css';
import { getUiPreferences, subscribeUiPreferences, themes } from '../../shared/ui-runtime';
import type { UiPreferences } from '../../shared/ui-runtime';

function App() {
  const [uiPreferences, setUiPreferences] = useState<UiPreferences>(getUiPreferences);

  useEffect(() => subscribeUiPreferences(setUiPreferences), []);

  return (
    <ConfigProvider theme={{ token: { colorPrimary: themes[uiPreferences.theme].color } }}>
      <RouterCom />
    </ConfigProvider>
  );
}

export default App;
