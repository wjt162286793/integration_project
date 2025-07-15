import React from 'react';
import {NodeStatus} from './type'
import {DeploymentUnitOutlined,CheckCircleOutlined,CloseCircleOutlined,LoadingOutlined } from '@ant-design/icons';
import './index.less'
interface AlgoNodeProps {
  node: {
    getData: () => NodeStatus;
  };
}

const AlgoNode:React.FC<AlgoNodeProps> = (props) => {
  const { node } = props
  const data = node?.getData() as NodeStatus
  const { label, status = 'default' } = data

  return (
    <div className={`node ${status}`}>
      <DeploymentUnitOutlined />
      <span className="label">{label}</span>
      <span className="status">
        {status === 'success' && <CheckCircleOutlined />}
        {status === 'failed' && <CloseCircleOutlined />}
        {status === 'running' && <LoadingOutlined />}
      </span>
    </div>
  )
}

export default AlgoNode;