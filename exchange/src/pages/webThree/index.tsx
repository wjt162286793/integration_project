import React, { useState,useEffect } from 'react';
import { Button } from 'antd'
import { ethers } from 'ethers';
import './index.less'
const Index: React.FC = () => {

  const [isConnected, setIsConnected] = useState(false);
  const [account, setAccount] = useState('');
  const [provider, setProvider] = useState(null);

  const checkWalletIsConnected = async () => {
    if (window.ethereum) {
      try {
        const provider = new ethers.BrowserProvider(window.ethereum);
        const accounts = await provider.listAccounts();
        
        if (accounts.length > 0) {
          setIsConnected(true);
          setAccount(accounts[0].address);
          setProvider(provider);
        }
      } catch (error) {
        console.error(error);
      }
    }
  };

  const connectWalletHandler = async () => {
    if (window.ethereum) {
      try {
        const provider = new ethers.BrowserProvider(window.ethereum);
        const accounts = await provider.send("eth_requestAccounts", []);
        
        setIsConnected(true);
        setAccount(accounts[0]);
        setProvider(provider);
      } catch (error) {
        console.error(error);
      }
    } else {
      alert('请安装MetaMask!');
    }
  };
  
  const disconnectWalletHandler = () => {
    setIsConnected(false);
    setAccount('');
    setProvider(null);
    // 可以在这里添加其他清理逻辑
  };

  useEffect(() => {
    checkWalletIsConnected();
  }, []);

  return (
    <div className='webThreeDom'>
      {
        !isConnected && (<div className="notWallet">
          <Button type='primary' className='concentBtn' onClick={connectWalletHandler}>连接钱包</Button>
        </div>)
      }
      {
        isConnected && <Button type='primary'  onClick={disconnectWalletHandler}>断开连接</Button>
        
      }

    </div>
  );
};
export default Index