import React from 'react'
import { LoadingOutlined} from '@ant-design/icons';
import './loading.less'

export default function loading() {
  return (
    <div className='loadingPage'>
        <LoadingOutlined className='loadimg'/>
    </div>
  )
}
