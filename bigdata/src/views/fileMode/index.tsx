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

const formatBeijingTime = (value: string | number | Date) => {
  const date = value instanceof Date ? value : new Date(value);
  if (Number.isNaN(date.getTime())) return String(value);

  return new Intl.DateTimeFormat('zh-CN', {
    timeZone: 'Asia/Shanghai',
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
    hour: '2-digit',
    minute: '2-digit',
    second: '2-digit',
    hourCycle: 'h23'
  }).format(date).replace(/\//g, '-');
};

const FileUploader: React.FC = () => {
  // 是否正在上传的状态
  const [isUploading, setIsUploading] = useState(false);
  const [isUploaderReady, setIsUploaderReady] = useState(false);
  const [selectedFileName, setSelectedFileName] = useState('');
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
      render: (time: string | number | Date) => formatBeijingTime(time),
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
    return fileListApi().then((res: any) => {
      if (res?.code !== 200 || !Array.isArray(res.data)) {
        setFileList([]);
        message.error(res?.msg || '文件列表加载失败');
        return false;
      }
      setFileList(res.data);
      return true;
    }).catch((error: any) => {
      setFileList([]);
      message.error(error?.message || '文件列表加载失败');
      return false;
    });
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
  if (env_mode === 'development' && import.meta.env.VITE_API_URL) {
    return String(import.meta.env.VITE_API_URL).replace(/\/+$/, '');
  }
  if (isSubFlag) {
    // 在微前端环境中
    return '/bigdata-sub-api';
  } else {
    // 独立运行时
    if (env_mode === 'development') {
      return 'http://127.0.0.1:8051';
    }
    return 'http://82.157.193.128:8051';
  }
};

const tusBaseUrl = env_mode === 'development'
  ? (import.meta.env.VITE_API_URL || baseURL)
  : baseURL;

// 修改下载处理函数
const downLoadHandler = (record)=>{
  const baseUrl = getBaseUrl();
  const tusId = record.tus_id || record.hash;
  window.open(`${baseUrl}/uploadFile/${encodeURIComponent(tusId)}`);
}

const deleteHandler = (record)=>{
  deleteFileApi({
    hash:record.hash
  }).then((res: any) => {
    if (res?.code !== 200) {
      message.error(res?.msg || '删除文件失败');
      return;
    }
    message.success('文件已删除');
    getFileList();
  }).catch((error: any) => {
    message.error(error?.message || '删除文件失败');
  });
}

  useEffect(() => {
    // 初始化Uppy
    uppyRef.current = new Uppy({
      debug: true,
      autoProceed: false,
      restrictions: {
        maxFileSize: 1000 * ONE_MB,
        maxNumberOfFiles: 1,
        allowedFileTypes: ['.jpg', '.jpeg', '.png', '.zip', '.rar']
      },
    });
  
    console.log(baseURL,'baseURL====')
    // 使用插件
    uppyRef.current
      .use(DragDrop, { target: dragDropRef.current!, note: `
        支持 jpg、jpeg、png、zip、rar 文件，每次只能选择一个，单个文件不超过 1GB。
        使用 Tus 分片和断点续传；相同内容会在上传完成后自动去重。
        `  })
      .use(StatusBar, {
        target: statusBarRef.current!,
        hideUploadButton: true,
        hidePauseResumeButton: true
      })
      .use(Tus, {
        endpoint: `${String(tusBaseUrl).replace(/\/+$/, '')}/fileMode`,
        limit: 1,
        chunkSize: 5 * ONE_MB,
    });

    uppyRef.current.on('file-added', (file: any) => {
      setSelectedFileName(file.name);
    });
    uppyRef.current.on('file-removed', () => {
      setSelectedFileName(uppyRef.current?.getFiles()[0]?.name || '');
    });
    uppyRef.current.on('restriction-failed', (_file: any, error: Error) => {
      message.error(error.message || '每次只能选择一个文件');
    });
    uppyRef.current.on('upload', () => setIsUploading(true));
    uppyRef.current.on('pause-all', () => setIsUploading(false));
    uppyRef.current.on('resume-all', () => setIsUploading(true));

    // 监听上传完成事件
    uppyRef.current.on('complete', (result: any) => {
      setIsUploading(false);
      const successfulFiles = Array.isArray(result.successful) ? result.successful : [];
      const failedFiles = Array.isArray(result.failed) ? result.failed : [];
      if (failedFiles.length > 0) {
        message.error(`文件上传失败，${failedFiles.length} 个文件未完成`);
      }
      if (successfulFiles.length === 0) return;

      Promise.all(successfulFiles.map((file: any) => {
        const tusId = file.uploadURL?.split('/').pop();
        return savehashTofileApi({
          tus_id: tusId,
          name: file.name,
          extension: file.extension,
          size: file.size
        }).then((res: any) => {
          if (res?.code !== 200) {
            throw new Error(res?.msg || '文件记录保存失败');
          }
          return res.data;
        });
      })).then((savedRecords) => getFileList().then((loaded) => ({ savedRecords, loaded }))).then(({ savedRecords, loaded }) => {
        if (loaded) {
          const duplicateCount = savedRecords.filter((record: any) => record?.duplicate).length;
          message.success(duplicateCount > 0
            ? `${duplicateCount} 个重复文件已识别，未重复保存`
            : '文件上传成功');
          const uppy = uppyRef.current;
          if (uppy) {
            try {
              successfulFiles.forEach((file: any) => {
                if (file?.id && uppy.getFile(file.id)) {
                  uppy.removeFile(file.id);
                }
              });
            } catch (cleanupError) {
              console.warn('Failed to remove completed files from the Uppy queue', cleanupError);
            }
          }
        } else {
          message.error('文件已上传，但文件列表刷新失败');
        }
      }).catch((error: any) => {
        message.error(`文件已上传，但记录保存失败：${error?.message || '请刷新后重试'}`);
      });
    });

    setIsUploaderReady(true);
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
      if (uppyRef.current.getFiles().length === 0) {
        message.info('请先选择文件');
        return;
      }
      const hasPausedUploads = uppyRef.current.getFiles().some(
        (file: any) => file.isPaused && !file.progress.uploadComplete
      );
      if (hasPausedUploads) {
        uppyRef.current.resumeAll();
      } else {
        uppyRef.current.upload().catch((error: any) => {
          message.error(error?.message || '无法开始上传');
        });
      }
    }
  };

  const removeSelectedFile = () => {
    const uppy = uppyRef.current;
    uppy?.getFiles().forEach((file: any) => uppy.removeFile(file.id));
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
      <div className="selected-file-name">
        <span>
          {selectedFileName ? (
            <>已选择文件：<strong title={selectedFileName}>{selectedFileName}</strong></>
          ) : '尚未选择文件'}
        </span>
        {selectedFileName && !isUploading && (
          <Button type="link" onClick={removeSelectedFile}>移除</Button>
        )}
      </div>
      <div ref={statusBarRef} id="status-bar">
      </div>
      <div className='content'>
        <Button
          type="primary"
          onClick={pauseOrResume}
          disabled={!isUploaderReady || (!isUploading && !selectedFileName)}
        >
          {isUploading ? '暂停上传' : selectedFileName ? '开始上传' : '请先选择文件'}
        </Button>


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
