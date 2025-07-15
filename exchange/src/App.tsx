import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'

function App() {

  const useWujieFlag = window?.__POWERED_BY_WUJIE__;
  console.log(useWujieFlag,'判断是否使用无界')
  return (
    <div>
                {
            useWujieFlag?(<div>react子应用使用无界</div>):(<div>react子应用没有使用无界</div>)
        }
    </div>
  )
}

export default App
