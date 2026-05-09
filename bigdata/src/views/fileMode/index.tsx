import React, { useState, useEffect, useRef } from 'react';
import { Button, message,Table,Modal } from 'antd';
import Uppy from '@uppy/core';
import DragDrop from '@uppy/drag-drop';
import StatusBar from '@uppy/status-bar';
import XHRUpload from '@uppy/xhr-upload';
import { useTranslation } from 'react-i18next';
import {fileListApi,deleteFileApi,fileCheckApi} from '@/api/index'

// 引入样式
import '@uppy/core/dist/style.min.css';
import '@uppy/drag-drop/dist/style.min.css';
import '@uppy/status-bar/dist/style.min.css';
import './index.less'

// 1MB大小
const ONE_MB = 1024 * 1024;
const MAX_UPLOAD_MB = Number(import.meta.env.VITE_MAX_UPLOAD_MB || 1024)
const MAX_FILE_SIZE = (Number.isFinite(MAX_UPLOAD_MB) && MAX_UPLOAD_MB > 0 ? MAX_UPLOAD_MB : 1024) * ONE_MB;

const toHex = (buffer: ArrayBuffer) => {
  const bytes = new Uint8Array(buffer);
  let hex = '';
  for (let i = 0; i < bytes.length; i += 1) {
    hex += bytes[i].toString(16).padStart(2, '0');
  }
  return hex;
}

const sha256File = async (file: File | Blob) => {
  const arrayBuffer = await file.arrayBuffer();
  const hashBuffer = await crypto.subtle.digest('SHA-256', arrayBuffer);
  return toHex(hashBuffer);
}

const buildFallbackHash = (file: any) => {
  const name = String(file?.name || '')
  const size = String(file?.size || 0)
  const mtime = String(file?.data?.lastModified || '')
  return `upload_${Date.now()}_${size}_${name}_${mtime}`
}

const FileUploader: React.FC = () => {
  // 是否正在上传的状态
  const [isUploading, setIsUploading] = useState(true);
  // Uppy实例引用
  const uppyRef = useRef<Uppy | null>(null);
  // 拖拽区域和状态栏的DOM引用
  const dragDropRef = useRef<HTMLDivElement>(null);
  const statusBarRef = useRef<HTMLDivElement>(null);
  // 国际化钩子
  const { t } = useTranslation();
  
  const [fileList, setFileList] = useState([]);
  const columns = [
    {
      title: t('fileMode.fileName'),
      dataIndex: 'name',
      key: 'name',
    },
    {
      title: t('fileMode.fileType'),
      dataIndex: 'extension',
      key: 'extension',
    },
    {
      title: t('fileMode.fileHash'),
      dataIndex: 'hash',
      key: 'hash',
    },
    {
      title: t('fileMode.fileSize'),
      dataIndex: 'size',
      key: 'size',
      render:(text,record)=>{
        return `${getSize(text)}MB`
      }
    },
    {
      title: t('fileMode.uploadTime'),
      dataIndex: 'time',
      key: 'time',
    },
    {
      title: t('fileMode.operation'),
      dataIndex: 'operation',
      key: 'operation',
      render:(text,record)=>{
        return (
          <>
          <Button onClick={()=>downLoadHandler(record)} type='text'>{t('fileMode.download')}</Button>
          <Button onClick={()=>showModal(record)} type='text'>{t('fileMode.delete')}</Button>
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


const env_mode = import.meta.env.MODE;
console.log(env_mode, 'env_mode');

// 检查是否在无界微前端环境中
const isSubFlag = window.__POWERED_BY_WUJIE__;

// 检查是否通过主应用代理访问
const isProxy = window.location.pathname.startsWith('/bigdata-sub-api');

// 配置API基础路径
let baseURL = '';

if (isSubFlag) {
  baseURL = '/bigdata-sub-api';
} else if (env_mode === 'development') {
  baseURL = '/bigdataApi';
} else {
  baseURL = import.meta.env.VITE_API_URL || '/bigdata-sub-api';
}

// 确保baseURL不以斜杠结尾
baseURL = baseURL.replace(/\/$/, '');
console.log('Final baseURL:', baseURL);

// 添加获取基础URL的函数
const getBaseUrl = () => {
  if (env_mode === 'development' && !isSubFlag) {
    return import.meta.env.VITE_API_URL || 'http://127.0.0.1:8051';
  }
  return `${window.location.origin}/bigdata-sub-api`;
};

// 修改下载处理函数
const downLoadHandler = (record)=>{
  const baseUrl = getBaseUrl();
  window.open(`${baseUrl}/uploadFile/${record.tus_id || record.hash}`);
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
      debug: false,
      autoProceed: false,
      restrictions: {
        maxFileSize: MAX_FILE_SIZE,
        maxNumberOfFiles: 5,
        allowedFileTypes: ['.jpg', '.jpeg', '.png', '.zip', '.rar']
      },
    });
  
    console.log(baseURL,'baseURL')
    // 使用插件
    uppyRef.current
      .use(DragDrop, { target: dragDropRef.current!, note: t('fileMode.dragDropHint') })
      .use(StatusBar, { target: statusBarRef.current! })
      .use(XHRUpload, {
        endpoint: `${baseURL}/fileMode/upload`,
        formData: true,
        fieldName: 'file',
        bundle: false,
        limit: 5,
        allowedMetaFields: ['hash','name','extension','size','filename','filetype','type']
      });

    ;(uppyRef.current as any).addPreProcessor(async (fileIDs: string[]) => {
      const uppy = uppyRef.current
      if (!uppy) return
      try {
        message.loading({ content: t('fileMode.hashing'), key: 'hashing', duration: 0 })
        for (let i = 0; i < fileIDs.length; i += 1) {
          const file = uppy.getFile(fileIDs[i])
          if (!file) continue
          if (typeof file.size === 'number' && file.size > MAX_FILE_SIZE) {
            message.error(t('fileMode.maxSizeTip'))
            uppy.removeFile(file.id)
            continue
          }
          const shouldSkipHash = typeof file.size === 'number' && file.size >= 200 * ONE_MB
          const hash = shouldSkipHash ? buildFallbackHash(file) : await sha256File(file.data)
          uppy.setFileMeta(file.id, {
            hash,
            name: file.name,
            filename: file.name,
            type: file.type || '',
            filetype: file.type || '',
            extension: file.extension || '',
            size: String(file.size || 0)
          })
          if (!shouldSkipHash) {
            const checkRes: any = await fileCheckApi({ hash })
            if (checkRes && checkRes.code === 200 && checkRes.data && checkRes.data.exists) {
              uppy.removeFile(file.id)
              message.success(t('fileMode.instantUploadSuccess'))
            }
          }
        }
        message.destroy('hashing')
      } catch (e) {
        message.destroy('hashing')
      }
    })

    // 监听上传完成事件
    uppyRef.current.on('complete', (result: any) => {
      if (Array.isArray(result.failed) && result.failed.length > 0) {
        message.error(t('fileMode.uploadFailed'));
      } else {
        message.success(t('fileMode.uploadSuccess'));
      }
      getFileList()
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
        {isUploading ? t('fileMode.pause') : t('fileMode.start')}
      </Button>
          )
        }


      <Button onClick={getFileList} style={{marginLeft:'16px'}}>{t('fileMode.refreshList')}</Button>

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
        title={t('fileMode.delete')}
        closable={{ 'aria-label': 'Custom Close Button' }}
        open={isModalOpen}
        onOk={handleOk}
        onCancel={handleCancel}
      >
          <p>{t('fileMode.confirmDelete')}</p>
      </Modal>
    </div>
  );
};

export default FileUploader;
