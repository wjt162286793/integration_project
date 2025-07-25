import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'
import store from '@/store/index.ts'
import {Provider} from 'react-redux'


createRoot(document.getElementById('root')!).render(
    <Provider store={store}>
        <App />
    </Provider>
)
