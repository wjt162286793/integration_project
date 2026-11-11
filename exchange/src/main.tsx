import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'
import store from '@/store/index.ts'
import {Provider} from 'react-redux'
import { initializeUiRuntime } from '../../shared/ui-runtime'

initializeUiRuntime()

createRoot(document.getElementById('root')!).render(
    <Provider store={store}>
        <App />
    </Provider>
)
