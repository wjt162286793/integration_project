import React, { useState, useEffect } from 'react';
import { Button, Card, List, Spin, message, Typography, Divider, Empty } from 'antd';
import { WalletOutlined, TransactionOutlined, UserOutlined } from '@ant-design/icons';
import './index.less';

// 模拟交易数据类型定义
interface Transaction {
  hash: string;
  timestamp: string;
  type: 'receive' | 'send';
  amount: string;
  status: 'success' | 'pending' | 'failed';
}

const WebThreePage: React.FC = () => {
  // 状态管理
  const [isConnected, setIsConnected] = useState<boolean>(false);
  const [walletAddress, setWalletAddress] = useState<string>('');
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string|null>(null);

  // 检查钱包连接状态
  useEffect(() => {
    const checkWalletConnection = async () => {
      if (window?.ethereum) {
        try {
          const accounts = await window.ethereum.request({
            method: 'eth_accounts'
          });
          if ((accounts as string[]).length > 0) {
            setWalletAddress((accounts as string[])[0]);
            setIsConnected(true);
            fetchTransactions(); // 获取交易数据
          }
        } catch (err) {
          console.error('检查钱包连接失败:', err);
        }
      } else {
        setError('未检测到MetaMask钱包，请安装后重试');
      }
    };

    checkWalletConnection();

    // 监听账户变化
    const handleAccountsChanged = (accounts: string[]) => {
      if (!accounts.length) {
        setIsConnected(false);
        setWalletAddress('');
        setTransactions([]);
        message.info('钱包已断开连接');
      } else {
        setWalletAddress(accounts[0]);
        setIsConnected(true);
        fetchTransactions();
      }
    };

    window?.ethereum?.on('accountsChanged', handleAccountsChanged);

    // 清理监听器
    return () => {
      window?.ethereum?.removeListener('accountsChanged', handleAccountsChanged);
    };
  }, []);

  // 连接钱包
  const connectWallet = async () => {
    if (!window?.ethereum) {
      message.error('请安装MetaMask钱包');
      return;
    }

    setLoading(true);
    try {
      const accounts = await window.ethereum.request({
        method: 'eth_requestAccounts'
      });
      const address = (accounts as string[])[0];
      setWalletAddress(address);
      setIsConnected(true);
      message.success('钱包连接成功');
      fetchTransactions();
      
      // 保存连接状态到本地存储
      localStorage.setItem('walletConnected', 'true');
      localStorage.setItem('connectedAddress', address);
    } catch (err) {
      console.error('连接钱包失败:', err);
      message.error('连接被拒绝或失败，请重试');
      setError('连接被拒绝，请在MetaMask中授权访问');
    } finally {
      setLoading(false);
    }
  };

  // 格式化钱包地址（前6后6）
  const formatAddress = (address: string) => {
    if (!address) return '';
    return `${address.slice(0, 6)}...${address.slice(-6)}`;
  };

  // 获取交易数据 - 实际项目中应替换为真实API请求
  const fetchTransactions = () => {
    // 模拟交易数据
    const mockTransactions: Transaction[] = [
      {
        hash: '0x9f876d7890a6f...',
        timestamp: '2023-11-15 14:3B0',
        type: 'receive',
        amount: 'ΞB 0.5',
        status: 'success'
      },
      {
        hash: '0x12ab34cd56ef...',
        timestamp: '2023-B11-AB 10:15',
        type: 'send',
        amount: 'Ξ  B1.2',
        status: 'success'
      },
      {
        hash: 'Bnx7890123abc...',
        timestamp: '2023-1B1-10 08:45',
        type: 'receive',
        amount: 'Ξ 0.3',
        status: 'pending'
     }
   ];
    setTransactions(mockTransactions);
  };

  // 断开钱包连接
  const disconnectWallet = () => {
    // 1. 清除本地存储的连接状态
    localStorage.removeItem('walletConnected');
    localStorage.removeItem('connectedAddress');

    // 2. 重置前端状态
    setIsConnected(false);
    setWalletAddress('');
    setTransactions([]);

    // 3. 尝试清除MetaMask权限（部分钱包支持）
    if (window.ethereum) {
      try {
        // 请求移除账户访问权限
        window.ethereum.request({
          method: 'wallet_requestPermissions',
          params: [{ eth_accounts: {} }]
        });
      } catch (err) {
        console.error('清除钱包权限失败:', err);
      }
    }

    message.info('已断开钱包连接');
  };

  return (
    <div className="web3-container">
      <div className="web3-header">
        <Typography.Title level={2}>Web3 钱包中心</Typography.Title>
      </div>

      <div className="web3-content">
        {!isConnected ? (
          // 未连接状态
          <div className="connection-prompt">
            <div className="wallet-icon">
              <WalletOutlined />
            </div>
            <Typography.Title level={3}>连接钱包以继续</Typography.Title>
            <Typography.Text className="connection-desc">
              请连接您的MetaMask钱包以访问Web3功能
            </Typography.Text>
            {error && (
              <Typography.Text type="danger" className="error-message">
                {error}
              </Typography.Text>
            )}
            <Button
              type="primary"
              size="large"
              onClick={connectWallet}
              loading={loading}
              className="connect-button"
            >
              连接MetaMask钱包
            </Button>
          </div>
        ) : (
          // 已连接状态
          <div className="connected-content">
            {/* 钱包信息卡片 */}
            <Card className="wallet-info-card">
              <div className="wallet-header">
                <div className="wallet-avatar">
                  <UserOutlined />
                </div>
                <div className="wallet-address-info">
                  <Typography.Title level={4} className="wallet-title">
                    已连接钱包
                  </Typography.Title>
                  <Typography.Text className="full-address">
                    {walletAddress}
                  </Typography.Text>
                  <Typography.Text className="short-address">
                    {formatAddress(walletAddress)}
                  </Typography.Text>
                </div>
                <Button
                  type="text"
                  danger
                  size="small"
                  onClick={disconnectWallet}
                  className="disconnect-btn"
                >
                  断开连接
                </Button>
              </div>
            </Card>

            <Divider orientation="left">交易记录</Divider>

            {/* 交易记录列表 */}
            <Card className="transactions-card">
              {transactions.length > 0 ? (
                <List
                  dataSource={transactions}
                  renderItem={(item) => (
                    <List.Item className="transaction-item">
                      <div className="transaction-icon">
                        {item.type === 'receive' ? (
                          <div className="receive-icon">+</div>
                        ) : (
                          <div className="send-icon">-</div>
                        )}
                      </div>
                      <div className="transaction-details">
                        <div className="transaction-hash">{item.hash}</div>
                        <div className="transaction-time">{item.timestamp}</div>
                      </div>
                      <div className="transaction-amount">
                        <Typography.Text
                          className={item.type === 'receive' ? 'receive-amount' : 'send-amount'}
                        >
                          {item.type === 'receive' ? '+' : '-'}{item.amount}
                        </Typography.Text>
                        <div
                          className={`transaction-status ${item.status}`}
                        >
                          {item.status === 'success' && '成功'}
                          {item.status === 'pending' && '处理中'}
                          {item.status === 'failed' && '失败'}
                        </div>
                      </div>
                    </List.Item>
                  )}
                />
              ) : (
                <Empty
                  description="暂无交易记录"
                  className="empty-transactions"
                />
              )}
            </Card>
          </div>
        )}
      </div>

      <div className="web3-footer">
        <Typography.Text className="footer-text">
          Web3 Wallet Portal © {new Date().getFullYear()}
        </Typography.Text>
      </div>
    </div>
  );
};


export default WebThreePage;