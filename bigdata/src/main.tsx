import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import './index.css'
import './utils/reset.css'
import { initializeUiRuntime } from '../../shared/ui-runtime'

initializeUiRuntime()

ReactDOM.createRoot(document.getElementById('root')!).render(
    <App />
)
