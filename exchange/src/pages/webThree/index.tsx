import React, { useState, useEffect } from 'react';
import { Button, message, Table, Card } from 'antd'
import { ethers} from 'ethers';
import { addressTokeyList, waterMap } from './data'
import { CopyOutlined,RedoOutlined } from '@ant-design/icons';
import './index.less'





const Index: React.FC = () => {
  const isSubAppFlag = window.__POWERED_BY_WUJIE__
  const rawWindow = isSubAppFlag?window.__WUJIE_RAW_WINDOW__:window;
  console.log(isSubAppFlag,rawWindow,'===---是啥')

  const [messageApi, contextHolder] = message.useMessage();


  //判断是否连接钱包
  const [isConnected, setIsConnected] = useState(false);
  //个人公钥
  const [account, setAccount] = useState(null);


  const [provider, setProvider] = useState(null);
  //个人账户信息
  const [myInfo, setMyInfo] = useState({
    address: '',
    balance: '',
    transactionCount: '',
    lastUpdated: ''
  })

  useEffect(()=>{
    getHistoryList()
  },[myInfo])

  //水龙头
  const [waterAccount, setWaterAccount] = useState({
    address: '',
    balance: '',
    transactionCount: '',
    lastUpdated: ''
  })

  //获取个人信息
  useEffect(() => {
    setTimeout(() => {
      getMyInfo()
    })

  }, [provider])


  //表格表头1
  const columns1 = [
    {
      title: '公钥',
      dataIndex: 'address',
      key: 'address',
    },
    {
      title: '余额',
      dataIndex: 'balance',
      key: 'balance',
    },
    {
      title: '购买商品',

      render: (text, row) => {

        return (
          <div>
            {
              row.commodity.map((item) => {
                return (
                  <Button type='primary' onClick={()=>buyHandler(row,item)} style={{marginRight:'16px'}} key={item.name}>{item.name}</Button>
                )
              })
            }
          </div>
        )


      }
    }
  ]

  const columns2 = [
         {
      title: '交易hash',
      dataIndex: 'hash',
      key: 'hash',
    },
             {
      title: '区块高度',
      dataIndex: 'blockNumber',
      key: 'blockNumber',
    },
             {
      title: '支付方',
      dataIndex: 'from',
      key: 'from',
    },
             {
      title: '接收方',
      dataIndex: 'to',
      key: 'to',
    },
             {
      title: 'gas价格',
      dataIndex: 'gasPrice',
      key: 'gasPrice',
    },
             {
      title: 'gas使用量',
      dataIndex: 'gasUsed',
      key: 'gasUsed',
    },
             {
      title: '交易结果',
      dataIndex: 'status',
      key: 'status',
    },
             {
      title: '交易数额',
      dataIndex: 'value',
      key: 'value',
    },
             {
      title: '交易时间',
      dataIndex: 'timestamp',
      key: 'timestamp',
    },
  ]
  //检查钱包是否连接
  const checkWalletIsConnected = async () => {
    if (rawWindow.ethereum) {
      try {
        console.log(ethers, '====检查')
        const provider = new ethers.BrowserProvider(rawWindow.ethereum);
        const accounts = await provider.send('eth_accounts', []);
        console.log(accounts, '个人账户')
        if (accounts.length > 0) {
          setIsConnected(true);
          setAccount(accounts[0]);
          setProvider(provider);

          getTestAccount()

        }
      } catch (error) {
        console.error(error);
      }
    }
  };


  //连接钱包
  const connectWalletHandler = async () => {
    if (rawWindow.ethereum || (isSubAppFlag && rawWindow)) {
      try {
        console.log(ethers,'??===ether')
        const provider = new ethers.BrowserProvider(rawWindow.ethereum);
        await provider.send('eth_requestAccounts', []);
        const accounts = await provider.send('eth_accounts', []);
        console.log(accounts, '个人账户')
        setIsConnected(true);
        setAccount(accounts[0]);
        setProvider(provider);

        getTestAccount()
      } catch (error) {
        console.error(error);
      }
    } else {
      alert('请安装MetaMask!');
    }



  };

  //测试账号(只用5个)
  const [testAccount, setTestAccount] = useState([]);

  //获取测试账号
  const getTestAccount = async () => {
    // 获取http://127.0.0.1:8545/下所有的账户 (v5语法)
    try {
      // 1. 创建JsonRpcProvider (v5通过providers属性访问)
          const provider = new ethers.JsonRpcProvider('http://127.0.0.1:8545/');

      // 2. 获取所有账户地址 (v5使用listAccounts方法)
      const accounts = await provider.send('eth_accounts', []);

      // 3. 获取并格式化账户余额 (v5使用ethers.utils.formatEther)
      const accountsWithBalance = await Promise.all(
        accounts.map(async (address) => {
          const balanceWei = await provider.getBalance(address);
          return {
            address,
            balance: ethers.formatEther(balanceWei), // v5需通过utils访问格式化方法
            balanceWei
          };
        })
      );

      console.log('Hardhat模拟账户信息:', accountsWithBalance);
      //accountsWithBalance共有20个账号,获取前5个账号就可以
      const list = accountsWithBalance.slice(0, 5)
      const filterList = list.map(Val =>{
          let Item = addressTokeyList.find(val => Val.address === val.address)
          return {
            ...Val,
            commodity:Item.commodity
          }
      })
      setTestAccount(filterList)

      const water = accountsWithBalance[5]
      setWaterAccount(water)

    } catch (error) {
      console.error('获取账户信息失败:', error);

    }
  };
  
  //断开连接(还需要用户从钱包处操作)
  const disconnectWalletHandler = () => {
    setIsConnected(false);
    setAccount('');
    setProvider(null);
    // 可以在这里添加其他清理逻辑
  };

  //个人账户获取以太币
  const sendToMe = async () => {
    try {
      let privateKey = null
      let addressItem = waterMap
      if (addressItem) {
        privateKey = addressItem.privateKey
      }

      // 修复：创建正确的Provider实例（使用Hardhat节点地址）
      const provider = new ethers.JsonRpcProvider('http://127.0.0.1:8545/');

      console.log(privateKey, provider, '???===公私钥和Provider实例')
      const senderSigner = new ethers.Wallet(privateKey, provider);

      // 4. 构建交易参数（100 ETH = 100 * 10^18 wei）
      console.log(provider,'===provider')
      const tx = {
        to: account,
        value: ethers.parseEther('10.0'),
        gasLimit: ethers.toBeHex(21000),// 简单转账固定gasLimit
        gasPrice: '0x2540be400'
      };

      // 5. 发送交易并等待确认
      console.log('开始转账...', tx);
      const txResponse = await senderSigner.sendTransaction(tx);
      console.log('交易哈希:', txResponse.hash);
      const receipt = await txResponse.wait();
      console.log('转账成功，区块号:', receipt.blockNumber);
      messageApi.success('转账成功！交易哈希: ' + txResponse.hash);

      setTimeout(() => {
        getMyInfo()
        getTestAccount()
        getHistoryList()
      },1000)



    } catch (error) {
      console.error('转账失败:', error);
      messageApi.error('转账失败: ' + error.message);
    }
  };

  //获取个人账户信息
  const getMyInfo = async () => {
    try {
      // 1. 验证钱包连接状态
      if (!isConnected || !provider || !account) {
        return;
      }

      // 2. 获取公钥（当前连接地址）
      const publicKey = account;

      // 3. 获取余额（ethers v5语法）
      const balanceWei = await provider.getBalance(publicKey);
      const balanceEth = ethers.formatEther(balanceWei);

      // 4. 获取交易数量（简化版交易历史计数）
      const transactionCount = await provider.getTransactionCount(publicKey);

      // 5. 组装钱包信息
      const walletInfo = {
        address: publicKey,
        balance: `${balanceEth} ETH`,
        transactionCount: `${transactionCount} 笔`,
        lastUpdated: new Date().toLocaleString()
      };

      console.log('当前钱包信息:', walletInfo);
      setMyInfo(walletInfo)
      // 可选：设置状态变量用于UI展示
      // setWalletInfo(walletInfo);

    } catch (error) {
      console.error('获取钱包信息失败:', error);
      messageApi.error('获取失败: ' + (error as Error).message);
    }
  };


  //复制
  const copyHandler = (text) => {
    navigator.clipboard.writeText(text);
    messageApi.success('复制成功');
  }

const buyHandler = async (row, item) => {
  try {
    // 1. 验证钱包连接状态和参数有效性
    if (!account) {
      // messageApi.error('请先连接钱包');
      return;
    }
    if (!row?.address || !item?.price) {
      messageApi.error('参数错误：缺少商家地址或商品价格');
      return;
    }

    // 2. 使用MetaMask提供的Provider（关键修复）
   const provider = new ethers.BrowserProvider(rawWindow.ethereum);
    await provider.send('eth_requestAccounts', []);

    // 3. 获取MetaMask签名者（确保使用用户钱包账户）
        const signer = await provider.getSigner();
        console.log(signer,'===signer')
    const signerAddress = signer.address;

        // 验证签名者地址与myInfo.address一致
    if (signerAddress.toLowerCase() !== myInfo.address.toLowerCase()) {
      messageApi.error('签名者地址与钱包地址不一致');
      console.log(`签名者地址: ${signerAddress}, 钱包地址: ${myInfo.address}`);
      return;
    }

    // 4. 解析商品价格（字符串转数字后转wei）
    const priceInEther = parseFloat(item.price);
    if (isNaN(priceInEther) || priceInEther <= 0) {
      messageApi.error('无效的商品价格');
      return;
    }
    const value = ethers.parseEther(priceInEther.toString());

    // 5. 检查余额是否充足
    const balance = await provider.getBalance(account);
    console.log(ethers,'===ethers===')
    const gasPrice = ethers.getBigInt('0x2540be400'); // 转换为BigNumber类型
    
    const gasLimit = ethers.toBeHex(21000); // 简单转账固定gasLimit
    console.log(value,'===value.add is not a function')
    const totalCost = value + (gasPrice * BigInt(gasLimit));
    console.log(balance,'???')
    if (balance<totalCost) {
      messageApi.error('余额不足，无法完成购买');
      console.log(`当前余额: ${ethers.formatEther(balance)} ETH, 所需: ${ethers.formatEther(totalCost)} ETH`);
      return;
    }

    // 6. 构建交易参数
    const tx = {
      to: row.address,
      value: value,
      gasLimit: gasLimit,
      gasPrice: gasPrice
    };

    // 7. 发送交易并等待确认
    messageApi.loading('正在处理交易...');
    console.log('开始购买商品，交易参数:', tx);
    const txResponse = await signer.sendTransaction(tx);
    console.log('交易哈希:', txResponse.hash);
    const receipt = await txResponse.wait();

    if (receipt.status === 1) {
      messageApi.success(`购买成功！交易哈希: ${txResponse.hash}`);
      // 8. 刷新余额和商家信息
      setTimeout(() => {
        getMyInfo();
        getTestAccount();
        getHistoryList()
      }, 2000);
    } else {
      messageApi.error('交易失败，请重试');
    }

  } catch (error) {
    console.error('购买失败:', error);
    // 区分用户拒绝和其他错误
    if (error.message.includes('User rejected')) {
      messageApi.info('用户已取消交易');
    } else {
      messageApi.error(`购买失败: ${error.message}`);
    }
  }
};

const [transactionHistory, setTransactionHistory] = useState([]);

const getHistoryList = async () => {
  try {
    if (!myInfo.address || !rawWindow.ethereum) {
      // messageApi.error('请先连接钱包');
      return;
    }
    // 使用MetaMask提供的Provider
    const provider = new ethers.BrowserProvider(rawWindow.ethereum);
    const address = myInfo.address;

    // 1. 获取交易总数
    const transactionCount = await provider.getTransactionCount(address);
    console.log(`找到 ${transactionCount} 笔交易`);

    if (transactionCount === 0) {
      setTransactionHistory([]);
      return;
    }

    // 2. 批量获取交易详情（从最新交易开始）
    const historyPromises = [];
    // 最多获取最近50笔交易，避免性能问题
    const txCount = await provider.getTransactionCount(address);
    const startIndex = Math.max(0, txCount - 50);

    // 正确实现：通过区块遍历获取交易历史
    const latestBlock = await provider.getBlockNumber();
    // 遍历最近100个区块（可根据需要调整）
    for (let blockNumber = latestBlock; blockNumber > Math.max(0, latestBlock - 100); blockNumber--) {
      const block = await provider.getBlock(blockNumber, { includeTransactions: true });
      if (block && block.transactions) {
        // block.transactions.forEach(tx => {
        //   // 筛选与当前地址相关的交易（发送或接收）
        //   console.log(tx,'???tx')
        //   if (tx.from.toLowerCase() === address.toLowerCase() || tx.to?.toLowerCase() === address.toLowerCase()) {
        //     historyPromises.push(Promise.resolve(tx));
        //   }
        // });
            for (const txHash of block.transactions) {
      try {
        const tx = await provider.getTransaction(txHash);
        if (tx && (tx.from.toLowerCase() === address.toLowerCase() || tx.to?.toLowerCase() === address.toLowerCase())) {
          historyPromises.push(tx);
        }
      } catch (error) {
        console.error('获取交易详情失败:', error);
      }
    }
      }
    }

    const transactions = await Promise.all(historyPromises);
    console.log(transactions,'???===')

    // 修改为异步处理并获取交易收据
    let newList = await Promise.all(transactions.map(async (Item) => {
    // 获取交易收据
    const receipt = await provider.getTransactionReceipt(Item.hash);
    
    return {
    hash:Item.hash,
    from: Item.from,
    to: Item.to,
    value: ethers.formatEther(Item.value),
    gasPrice: ethers.formatUnits(Item.gasPrice, 'gwei'),
    gasUsed: Item.gasUsed?.toString() || '0',
    blockNumber: Item.blockNumber,
    timestamp: Item.blockNumber ? new Date((await provider.getBlock(Item.blockNumber)).timestamp * 1000).toLocaleString() : '未确认',
    // 从收据中获取状态
    status: receipt ? receipt.status === 1 ? '成功' : '失败' : '未知'
    };
    }));

    setTransactionHistory(newList);


  } catch (error) {
    console.error('获取交易历史失败:', error);
  } finally {
  }
};

  //初始化检查钱包
  useEffect(() => {
    checkWalletIsConnected();
  }, []);

  return (
    <div className='webThreeDom'>
      {
        contextHolder
      }
      {
        !isConnected && (<div className="notWallet">
          <Button type='primary' className='concentBtn' onClick={connectWalletHandler}>连接钱包</Button>
        </div>)
      }
      {
        isConnected &&
        <div className='ConnectedDom'>
          <Card title={
            <span>个人钱包信息 <RedoOutlined onClick={getMyInfo} title='刷新'/></span>
            
            } extra={<Button type='primary' onClick={() => sendToMe()}>获取以太币</Button>} style={{ maxHeight: '500px', overflow: 'auto', marginTop: '24px' }}>
            <div className='cardDom'>
              <ul>
                <li>
                  <span className='label'>公钥：</span>
                  <span className='value'>{myInfo.address} <CopyOutlined onClick={() => copyHandler(myInfo.address)} /></span>
                </li>
                <li>
                  <span className='label'>余额：</span>
                  <span className='value'>{myInfo.balance}</span>
                </li>
                <li>
                  <span className='label'>交易数量：</span>
                  <span className='value'>{myInfo.transactionCount}</span>
                </li>
                <li>
                  <span className='label'>最后更新：</span>
                  <span className='value'>{myInfo.lastUpdated}</span>
                </li>
              </ul>
              <ul>
                <li>
                  <span className='label'>水龙头公钥：</span>
                  <span className='value'>{waterAccount.address} <CopyOutlined onClick={() => copyHandler(waterAccount.address)} /></span>
                </li>
                <li>
                  <span className='label'>水龙头余额：</span>
                  <span className='value'>{waterAccount.balance}</span>
                </li>
              </ul>
            </div>



          </Card>



          {
            (testAccount && testAccount.length > 0) && (
              <Card title="商家账号"  extra={<a onClick={getTestAccount}>刷新</a>} style={{ maxHeight: '500px', overflow: 'auto', marginTop: '24px' }}>
                <Table columns={columns1} dataSource={testAccount} rowKey="address" pagination={false}></Table>
              </Card>

            )
          }
           {
            (transactionHistory && transactionHistory.length > 0) && (
              <Card title="交易历史"  extra={<a onClick={getHistoryList}>刷新</a>} >
                <Table scroll={{ x: 'max-content' }} style={{ marginTop: '24px' }} columns={columns2} dataSource={transactionHistory} rowKey="hash" pagination={false}></Table>
              </Card>

            )
          }
  
        </div>


      }

    </div>
  );
};
export default Index
