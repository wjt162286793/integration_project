import React, { useState, useEffect, useRef } from 'react';
import { Button, message,Table,Modal } from 'antd';
import Uppy from '@uppy/core';
import DragDrop from '@uppy/drag-drop';
import StatusBar from '@uppy/status-bar';
import Tus from '@uppy/tus';
import {fileListApi,savehashTofileApi,deleteFileApi} from '@/api/index'

// 引入样式
import '@uppy/core/dist/style.min.css';
import '@uppy/drag-drop/dist/style.min.css';
import '@uppy/status-bar/dist/style.min.css';
import './index.less'

// 1MB大小
const ONE_MB = 1024 * 1024;

const FileUploader: React.FC = () => {
  // 是否正在上传的状态
  const [isUploading, setIsUploading] = useState(true);
  // Uppy实例引用
  const uppyRef = useRef<Uppy | null>(null);
  // 拖拽区域和状态栏的DOM引用
  const dragDropRef = useRef<HTMLDivElement>(null);
  const statusBarRef = useRef<HTMLDivElement>(null);
  
  const [fileList, setFileList] = useState([]);
  const columns = [
    {
      title: '文件名',
      dataIndex: 'name',
      key: 'name',
    },
    {
      title: '文件类型',
      dataIndex: 'extension',
      key: 'extension',
    },
    {
      title: '文件hash',
      dataIndex: 'hash',
      key: 'hash',
    },
    {
      title: '文件大小',
      dataIndex: 'size',
      key: 'size',
      render:(text,record)=>{
        return `${getSize(text)}MB`
      }
    },
    {
      title: '上传时间',
      dataIndex: 'time',
      key: 'time',
    },
    {
      title: '操作',
      dataIndex: 'operation',
      key: 'operation',
      render:(text,record)=>{
        return (
          <>
          <Button onClick={()=>downLoadHandler(record)} type='text'>下载</Button>
          <Button onClick={()=>showModal(record)} type='text'>删除</Button>
          </>

        )
      }
    }
  ];
  const getSize=(size:number)=>{
    return (size / ONE_MB).toFixed(2);
  }
  const getFileList = ()=>{
    fileListApi().then(res=>{
      setFileList(res.data)
    })
 
  }


const api_url = '/bigdataApi'  
const env_mode = import.meta.env.MODE;
console.log(env_mode, 'env_mode的值');

// 检查是否通过主应用代理访问
const isProxy = window.location.pathname.startsWith('/bigdata-sub-api');

// 检查是否在无界微前端环境中
const isSubFlag = window.__POWERED_BY_WUJIE__;

// 配置API基础路径
let baseURL = '';
console.log('...==')


if (isSubFlag) {
    // 在无界微前端环境中
    baseURL = '/bigdata-sub-api';
} else {
  baseURL = import.meta.env.VITE_API_URL
}

if (isProxy) {
  // 通过主应用代理访问时
  baseURL = '/bigdata-sub-api/bigdataApi';
} else if (isSubFlag) {
  // 在无界微前端环境中但非代理访问
  if (env_mode === 'development') {
    baseURL = api_url;
  } else {
    // 使用相对路径，让主应用代理处理
    baseURL = '/bigdata-sub-api/bigdataApi';
  }
} else {
  // 独立运行时
  baseURL = api_url;
}

// 添加获取基础URL的函数
const getBaseUrl = () => {
  if (isSubFlag) {
    // 在微前端环境中
    return '/bigdata-sub-api';
  } else {
    // 独立运行时
    if (env_mode === 'development') {
      return 'http://127.0.0.1:8051';
    } else {
      return 'http://82.157.193.128:8051';
    }
  }
};

// 修改下载处理函数
const downLoadHandler = (record)=>{
  const baseUrl = getBaseUrl();
  window.open(`${baseUrl}/uploadFile/${record.hash}`);
}

const deleteHandler = (record)=>{
  deleteFileApi({
    hash:record.hash
  }).then(res=>{
    getFileList()
  })
}

  useEffect(() => {
    // 初始化Uppy
    uppyRef.current = new Uppy({
      debug: true,
      autoProceed: false,
      restrictions: {
        maxFileSize: 1000 * ONE_MB,
        maxNumberOfFiles: 5,
        allowedFileTypes: ['.jpg', '.jpeg', '.png', '.zip','rar']
      },
    });
  
    console.log(baseURL,'baseURL====')
    // 使用插件
    uppyRef.current
      .use(DragDrop, { target: dragDropRef.current!, note: `
        请将文件拖放到此处,当前仅限于jpg,jpeg,png,zip,rar文件。
        由于是个人学习服务器,性能一般,尽量不要上传太大的文件,最好在300MB到700MB之间,不超过1个G。
        `  })
      .use(StatusBar, { target: statusBarRef.current! })
      .use(Tus, {
        endpoint: `${baseURL}/fileMode`,
        limit: 5,
        chunkSize: 5 * ONE_MB,
    });

    // 监听上传完成事件
    uppyRef.current.on('complete', (result: any) => {
      let successList = result.successful
      if(successList.length>0){
        let result = successList[0]
        let hash = result.uploadURL.split('/').pop();
        savehashTofileApi({
          hash,
          name:result.name,
          extension:result.extension,
          size:result.size
        }).then(res=>{
          getFileList()
        })
      }
      if (Array.isArray(result.failed) && result.failed.length > 0) {
        message.error(`文件上传失败，${result.failed}`);
      } else {
        message.success('文件上传成功');
      }
    });

    getFileList()
    // 组件卸载时清理
    return () => {
      if (uppyRef.current) {
        uppyRef.current.close();
      }
    };
  }, []);

  // 暂停与恢复上传
  const pauseOrResume = () => {
    if (!uppyRef.current) return;

    if (isUploading) {
      uppyRef.current.pauseAll();
    } else {
      uppyRef.current.resumeAll();
    }
    setIsUploading(!isUploading);
  };

    const [isModalOpen, setIsModalOpen] = useState(false);

    const [activeRecord, setActiveRecord] = useState({});
  const showModal = (record:any) => {
    setIsModalOpen(true);
    setActiveRecord(record)
  };

  const handleOk = () => {
    deleteHandler(activeRecord)
    handleCancel()
  };

  const handleCancel = () => {
    setIsModalOpen(false);
  };

  return (
    <div className="upload-container">
      <div ref={dragDropRef} id="drag-drop-area">        
      </div>
      <div ref={statusBarRef} id="status-bar">
      </div>
      <div className='content'>
        {
          uppyRef.current && (
                  <Button type="primary" onClick={pauseOrResume} >
        {isUploading ? '暂停' : '开始'}
      </Button>
          )
        }


      <Button onClick={getFileList} style={{marginLeft:'16px'}}>刷新列表</Button>

      <Table
        style={{marginTop:'16px'}}
        columns={columns}
        dataSource={fileList}
        pagination={false}
        rowKey={'hash'}
        scroll={{y:'500px'}}
      />
      </div>
      <Modal
        title="删除"
        closable={{ 'aria-label': 'Custom Close Button' }}
        open={isModalOpen}
        onOk={handleOk}
        onCancel={handleCancel}
      >
          <p>确定要删除这个文件?</p>
      </Modal>
    </div>
  );
};

export default FileUploader;