export type UiLocale = 'zh-CN' | 'en-US'
export type UiTheme = 'ocean' | 'jade' | 'violet'

export interface UiPreferences {
  locale: UiLocale
  theme: UiTheme
}

export interface UiSubAppNavigationItem {
  key: string
  name: string
  path: string
}

export type UiSubAppNavigator = (item: UiSubAppNavigationItem) => void

type UiListener = (preferences: UiPreferences) => void
type UiBridge = {
  getUiPreferences?: () => UiPreferences
  subscribeUiPreferences?: (listener: UiListener) => () => void
  registerSubAppNavigation?: (
    items: UiSubAppNavigationItem[],
    activeKey: string,
    navigate: UiSubAppNavigator,
  ) => void
}

declare global {
  interface Window {
    $wujie?: {
      props?: UiBridge
    }
  }
}

export const themes: Record<UiTheme, { label: string; color: string; darkColor: string }> = {
  ocean: { label: '海蓝', color: '#356be8', darkColor: '#2c59c6' },
  jade: { label: '青玉', color: '#0f9f8f', darkColor: '#0a7d70' },
  violet: { label: '雅紫', color: '#7955d9', darkColor: '#6042b0' },
}

export const translations: Record<string, string> = {
  集成平台: 'Integration Platform',
  控制台: 'Console',
  '打开应用': 'Open App',
  '从这里进入已接入的业务应用，所有工作都从一个入口开始。': 'Open connected business applications from one place.',
  '进入数字资产交易与市场行情工作区。': 'Trade digital assets and review market activity.',
  '查看数据看板、管理资产并构建流程模型。': 'Explore dashboards, manage assets, and build workflow models.',
  '使用 AI 对话与智能能力辅助业务工作。': 'Use AI chat and intelligent tools to support your work.',
  '管理运维任务、流水线和部署状态。': 'Manage operations tasks, pipelines, and deployments.',
  '返回控制台': 'Back to Console',
  '选择一个应用开始工作。': 'Choose an application to get started.',
  '调整工作区的显示偏好，设置会同步到所有子应用。': 'Preferences are synchronized with all sub-applications.',
  '选择工作区和子应用统一使用的强调色。': 'Choose the accent color for the workspace and sub-applications.',
  '更改工作区和已接入子应用的显示语言。': 'Change the display language for the workspace and connected apps.',
  简体中文: 'Simplified Chinese',
  工作空间: 'Workspace',
  工作区: 'Workspace',
  集成工作区: 'Integration Workspace',
  系统管理员: 'System Administrator',
  工作空间账户: 'Workspace Account',
  管理员: 'Administrator',
  退出登录: 'Sign out',
  退出: 'Sign out',
  登录: 'Sign in',
  账户: 'Account',
  用户名: 'Username',
  密码: 'Password',
  请输入用户名: 'Enter username',
  请输入密码: 'Enter password',
  记住我: 'Remember me',
  忘记密码: 'Forgot password',
  欢迎回来: 'Welcome back',
  欢迎使用集成平台: 'Welcome to Integration Platform',
  登录以继续: 'Sign in to continue',
  '登 录': 'Sign in',
  '让复杂系统，': 'Make complex systems',
  '协同得更简单。': 'work better together.',
  '统一连接业务应用与数据能力，': 'Connect business apps and data capabilities',
  '在一个工作空间里，高效完成每一项工作。': 'and get more done in one workspace.',
  '如无法登录，请联系系统管理员': 'Contact your administrator if you cannot sign in.',
  正在登录: 'Signing in',
  请输入账号: 'Enter your account',
  '请输入账号!': 'Enter your account!',
  '请输入密码!': 'Enter your password!',
  安全访问: 'Secure Access',
  高效协作: 'Work Better Together',
  持续连接: 'Always Connected',
  稳定连接: 'Reliable Connections',
  即刻协作: 'Collaborate Now',
  主应用: 'Main App',
  统一入口: 'One Unified Entry',
  使用其他方式登录: 'Or sign in another way',
  'Web3钱包': 'Web3 Wallet',
  devops系统登录: 'DevOps Sign In',
  选择主题: 'Choose Theme',
  浅色主题: 'Light Theme',
  深色主题: 'Dark Theme',
  高对比度黑色主题: 'High Contrast Dark',
  选择语言: 'Choose Language',
  示例: 'Example',
  WJT数字平台: 'WJT Data Platform',
  下载: 'Download',
  刷新列表: 'Refresh List',
  '确定要删除这个文件?': 'Are you sure you want to delete this file?',
  全选: 'Select All',
  关闭菜单: 'Collapse Menu',
  剪切: 'Cut',
  回退: 'Undo',
  复制: 'Copy',
  放大: 'Zoom In',
  缩小: 'Zoom Out',
  画布操作: 'Canvas Actions',
  移除: 'Remove',
  粘贴: 'Paste',
  编辑信息: 'Edit Details',
  节点操作: 'Node Actions',
  获取信息: 'Get Details',
  下架: 'Delist',
  资产名称: 'Asset Name',
  资产状态: 'Asset Status',
  资产等级: 'Asset Tier',
  已读: 'Read',
  待办中: 'To Do',
  待办事项: 'Tasks',
  系统消息: 'System Messages',
  应用模块: 'Application Modules',
  '项目介绍': 'Project Overview',
  项目构造框架: 'Project Architecture',
  项目主要框架: 'Core Frameworks',
  技术介绍: 'Technology Overview',
  模块介绍: 'Module Overview',
  作者信息: 'About the Author',
  部署: 'Deployment',
  优化与部署: 'Optimization and Deployment',
  登录成功: 'Signed in successfully',
  '登录失败，请重试': 'Sign-in failed. Please try again.',
  买卖币: 'Buy and Sell Crypto',
  C2C快捷交易: 'C2C Quick Trade',
  使用CNY购买: 'Buy with CNY',
  我要支付: 'I Will Pay',
  我将收到: 'I Will Receive',
  参考价格: 'Reference Price',
  '如何在快捷交易使用CNY购买USDT': 'How to buy USDT with CNY using Quick Trade',
  '快速匹配 USDT 最优价格之选': 'Quickly find the best USDT price',
  使用CNY付款: 'Pay with CNY',
  接受USDT: 'Receive USDT',
  现货: 'Spot',
  合约: 'Futures',
  期权: 'Options',
  市值: 'Market Cap',
  最新价: 'Last Price',
  涨跌幅: 'Change',
  闪兑: 'Convert',
  交易数据: 'Trading Data',
  '24小时最低': '24h Low',
  '24小时最高': '24h High',
  '24小时量(BTC)': '24h Volume (BTC)',
  '24小时额(USDT)': '24h Turnover (USDT)',
  '比特币 价格': 'Bitcoin Price',
  合约持仓量及成交量: 'Futures Open Interest and Volume',
  '看涨/看跌主动买卖量': 'Taker Buy/Sell Volume',
  订单成交热力图: 'Order Book Heatmap',
  文件列表: 'File List',
  任务状态: 'Task Status',
  编辑应用: 'Edit Application',
  任务列表: 'Task List',
  新建任务: 'Create Task',
  上传: 'Upload',
  请输入文件名称: 'Enter a file name',
  请选择文件: 'Select a file',
  应用名称: 'Application Name',
  应用描述: 'Application Description',
  流水线: 'Pipeline',
  运行: 'Run',
  停止运行: 'Stop',
  配置: 'Settings',
  日志: 'Logs',
  开始时间: 'Start Time',
  结束时间: 'End Time',
  请选择日期: 'Select a date',
  请输入关键词: 'Enter a keyword',
  没有更多数据: 'No more data',
  网络错误: 'Network error',
  请求失败: 'Request failed',
  未登录: 'Not signed in',
  交易所: 'Exchange',
  大数据系统: 'Big Data',
  大数据: 'Big Data',
  ai系统: 'AI System',
  AI系统: 'AI System',
  运维管理: 'DevOps',
  应用导航: 'Applications',
  应用管理: 'Application Management',
  任务管理: 'Task Management',
  流水线管理: 'Pipeline Management',
  文件管理: 'File Management',
  首页: 'Home',
  主页: 'Dashboard',
  工作台: 'Workbench',
  数字资产: 'Digital Assets',
  数据看板: 'Analytics',
  模型构建: 'Model Builder',
  大文件上传: 'Large File Upload',
  说明文档: 'Documentation',
  空页面: 'Not Found',
  市场: 'Markets',
  买币: 'Buy Crypto',
  卖币: 'Sell Crypto',
  快捷买币: 'Quick Buy',
  快捷交易: 'Quick Trade',
  大宗交易: 'Block Trade',
  订单: 'Orders',
  订单管理: 'Order Management',
  订单历史: 'Order History',
  交易记录: 'Trade History',
  交易对: 'Trading Pair',
  价格: 'Price',
  数量: 'Amount',
  总额: 'Total',
  买入: 'Buy',
  卖出: 'Sell',
  购买: 'Buy',
  出售: 'Sell',
  '购买/出售': 'Buy/Sell',
  搜索: 'Search',
  查询: 'Search',
  重置: 'Reset',
  新增: 'Add',
  添加: 'Add',
  编辑: 'Edit',
  删除: 'Delete',
  保存: 'Save',
  取消: 'Cancel',
  确认: 'Confirm',
  提交: 'Submit',
  刷新: 'Refresh',
  返回: 'Back',
  操作: 'Actions',
  状态: 'Status',
  资产: 'Assets',
  名称: 'Name',
  描述: 'Description',
  创建时间: 'Created',
  更新时间: 'Updated',
  请选择: 'Select an option',
  请输入: 'Please enter',
  暂无数据: 'No data',
  加载中: 'Loading',
  加载失败: 'Failed to load',
  操作成功: 'Completed successfully',
  操作失败: 'Operation failed',
  处理中: 'Processing',
  成功: 'Success',
  失败: 'Failed',
  进行中: 'In progress',
  已完成: 'Completed',
  待处理: 'Pending',
  文件名称: 'File name',
  文件大小: 'File size',
  上传文件: 'Upload file',
  点击上传: 'Click to upload',
  上传成功: 'Upload successful',
  上传失败: 'Upload failed',
  数据资产: 'Data Assets',
  数据源: 'Data Source',
  数据模型: 'Data Model',
  数据集: 'Dataset',
  图表: 'Chart',
  组件: 'Components',
  画布: 'Canvas',
  节点: 'Node',
  流程: 'Workflow',
  全屏: 'Full screen',
  退出全屏: 'Exit full screen',
  请输入内容: 'Enter content',
  请输入名称: 'Enter a name',
  请输入描述: 'Enter a description',
  请先登录: 'Please sign in first',
  账号或密码错误: 'Incorrect username or password',
  用户名不能为空: 'Username is required',
  密码不能为空: 'Password is required',
  '思考中...': 'Thinking...',
  发送: 'Send',
  停止: 'Stop',
  清空: 'Clear',
  新建对话: 'New chat',
  历史对话: 'Chat history',
  请输入问题: 'Ask a question',
  '你好啊,您可以提问我一些问题(暂时只支持纯文本哦)': 'Hello! Ask me anything. Text input is currently supported.',
  多语言: 'Language',
  主题颜色: 'Theme color',
  中文: 'Chinese',
  英文: 'English',
  主题: 'Theme',
  海蓝: 'Ocean',
  青玉: 'Jade',
  雅紫: 'Violet',
  币种: 'Currencies',
  资产估值: 'Asset Valuation',
  资产总额: 'Total Assets',
  可用余额: 'Available Balance',
  冻结余额: 'Frozen Balance',
  手续费: 'Trading Fee',
  委托: 'Orders',
  委托价格: 'Order Price',
  委托数量: 'Order Amount',
  成交价: 'Execution Price',
  成交量: 'Trading Volume',
  当前委托: 'Open Orders',
  历史委托: 'Order History',
  我的资产: 'My Assets',
  资产明细: 'Asset Details',
  数据概览: 'Data Overview',
  数据分析: 'Data Analysis',
  数据统计: 'Data Statistics',
  实时数据: 'Real-time Data',
  基本信息: 'Basic Information',
  详细信息: 'Details',
  上一步: 'Previous',
  下一步: 'Next',
  上一页: 'Previous',
  下一页: 'Next',
  条记录: 'records',
  已启用: 'Enabled',
  已停用: 'Disabled',
  启用: 'Enable',
  停用: 'Disable',
  运行状态: 'Run Status',
  执行记录: 'Execution History',
  运行记录: 'Run History',
  创建应用: 'Create Application',
  编辑任务: 'Edit Task',
  任务名称: 'Task Name',
  任务描述: 'Task Description',
  应用列表: 'Application List',
  文件上传: 'File Upload',
  选择文件: 'Choose File',
  上传中: 'Uploading',
  删除成功: 'Deleted successfully',
  保存成功: 'Saved successfully',
  确认删除: 'Confirm Deletion',
  暂无记录: 'No records',
  服务异常: 'Service unavailable',
  连接成功: 'Connected',
  连接失败: 'Connection failed',
  当前价格: 'Current Price',
  价格走势: 'Price Trend',
  深度图: 'Depth Chart',
  K线图: 'Candlestick Chart',
  买入价: 'Buy Price',
  卖出价: 'Sell Price',
  平均价格: 'Average Price',
  请输入数量: 'Enter an amount',
  请输入价格: 'Enter a price',
  立即购买: 'Buy Now',
  立即出售: 'Sell Now',
  充值: 'Deposit',
  提现: 'Withdraw',
  划转: 'Transfer',
  资产记录: 'Asset History',
  流程名称: 'Workflow Name',
  流程状态: 'Workflow Status',
  节点名称: 'Node Name',
  节点类型: 'Node Type',
  画布设置: 'Canvas Settings',
  保存草稿: 'Save Draft',
  发布: 'Publish',
  预览: 'Preview',
  请输入应用名称: 'Enter an application name',
  请选择状态: 'Select a status',
  请选择类型: 'Select a type',
  复制成功: 'Copied successfully',
  请稍候: 'Please wait',
  操作确认: 'Confirm Action',
  应用设置: 'Application Settings',
  系统设置: 'System Settings',
  个人中心: 'Profile',
  账户设置: 'Account Settings',
  管理员登录: 'Administrator Sign In',
  用户登录: 'User Sign In',
  首页概览: 'Overview',
  应用数量: 'Applications',
  任务数量: 'Tasks',
  今日: 'Today',
  昨日: 'Yesterday',
  本周: 'This Week',
  本月: 'This Month',
  在线: 'Online',
  离线: 'Offline',
  待运行: 'Not Started',
  暂停: 'Pause',
  继续: 'Resume',
  交易量: 'Trading Volume',
  委托簿: 'Order Book',
  上传时间: 'Upload Time',
  上架制品: 'Published Artifact',
  上海数据中心: 'Shanghai Data Center',
  不需要登录: 'No sign-in required',
  个人账户信息: 'Personal Account Information',
  个人公钥: 'Personal Public Key',
  交易单号: 'Transaction ID',
  交易参数: 'Transaction Parameters',
  交易哈希: 'Transaction Hash',
  交易失败: 'Transaction Failed',
  交易数额: 'Transaction Amount',
  交易时间: 'Transaction Time',
  交易记录列表: 'Trade History',
  今日行情: "Today's Market",
  以太坊: 'Ethereum',
  仪表盘: 'Dashboard',
  主要资产增量: 'Top Asset Changes',
  主要区域: 'Main Area',
  云服务器: 'Cloud Server',
  运行日志: 'Run Logs',
  钱包地址: 'Wallet Address',
  连接中: 'Connecting',
  限价: 'Limit Price',
  市价: 'Market Price',
  快速购买: 'Quick Buy',
  快速出售: 'Quick Sell',
  模型管理: 'Model Management',
  模型名称: 'Model Name',
  字段名称: 'Field Name',
  字段类型: 'Field Type',
  字段列表: 'Field List',
  数据表: 'Data Table',
  表名称: 'Table Name',
  数据预览: 'Data Preview',
  预览数据: 'Preview Data',
  数据源配置: 'Data Source Configuration',
  数据中心: 'Data Center',
  新增节点: 'Add Node',
  删除节点: 'Delete Node',
  保存模型: 'Save Model',
  发布模型: 'Publish Model',
  应用模式: 'Application Mode',
  文件模式: 'File Mode',
  流水线模式: 'Pipeline Mode',
  运行成功: 'Run Successful',
  运行失败: 'Run Failed',
  开始新对话: 'Start a New Chat',
  请输入消息: 'Enter a message',
  发送消息: 'Send Message',
  联系系统管理员: 'Contact the system administrator',
  '数字资产是指企业或组织拥有或控制的、能够带来经济利益的数据资源。它通过专业化处理（如清洗、分析、建模）将原始数据转化为可量化、可交易的价值形态。': 'Digital assets are data resources owned or controlled by an organization that can generate economic benefits. Through processing such as cleaning, analysis, and modeling, raw data becomes measurable and tradable value.',
  '数据看板是通过图形化手段展示数据关系、趋势和模式的工具，旨在降低理解门槛，辅助决策。': 'A data dashboard visualizes relationships, trends, and patterns to make information easier to understand and support decision-making.',
  '模型构建是利用数学、统计学和计算机科学方法，从海量数据中提取规律并构建预测或决策模型的过程。': 'Model building uses mathematics, statistics, and computer science to find patterns in large datasets and create predictive or decision-making models.',
  '构建1个流程图模型': 'Build 1 workflow diagram model',
  '新增一条以太坊数字资产': 'Add an Ethereum digital asset',
  '提交一个标签画像的流程审批': 'Submit a tag profile workflow for approval',
  '新增一条比特币数字资产': 'Add a Bitcoin digital asset',
  '新建一条价值流泳道图': 'Create a value stream swimlane diagram',
  '新增一条采购流程图': 'Add a procurement workflow diagram',
  模型已发布: 'Model published',
  数字资产新增: 'Digital asset added',
  图表统计变化: 'Chart statistics updated',
  '快捷交易为您自动匹配当前 C2C 市场购买 USDT 的最优价格之选。': 'Quick Trade automatically finds the best available price to buy USDT in the current C2C market.',
  '选择 USDT 和 CNY ,并输入金额,C2C 快捷交易将自动匹配价格最优的委托单。': 'Select USDT and CNY and enter an amount. C2C Quick Trade will automatically match the best-priced offer.',
  '选择您首选的USDT委托单,并在规定时间 内完成付款。': 'Choose your preferred USDT offer and complete payment within the time limit.',
  '卖家确认收到付款后,您购买的USDT将 被转入您的账户。': 'After the seller confirms receipt of payment, your USDT will be transferred to your account.',
  '交易': 'Trading',
  '数据': 'Data',
  '运维': 'Operations',
  'wjt交易所': 'WJT Exchange',
  'web3(dev)': 'Web3 (Dev)',
  工具: 'Tools',
  交易历史: 'Trade History',
  订单表: 'Order Book',
  单价: 'Unit Price',
  商家: 'Merchant',
  支付方式: 'Payment Method',
  限额: 'Limit',
  剩余数量: 'Remaining Amount',
  推荐: 'Recommended',
  详情: 'Details',
  下单时间: 'Order Time',
  买币途径: 'Purchase Method',
  交易类型: 'Trade Type',
  总金额: 'Total Amount',
  我已支付: 'I Have Paid',
  订单号: 'Order ID',
  订单详情: 'Order Details',
  订单已取消: 'Order Cancelled',
  取消支付: 'Cancel Payment',
  支付成功: 'Payment Successful',
  选择付款方式: 'Choose a Payment Method',
  选择委托单: 'Choose an Offer',
  支付宝: 'Alipay',
  微信: 'WeChat Pay',
  '数量/限额': 'Amount/Limit',
  '低买高卖 / 震荡向上行情 / 断中长线': 'Buy low and sell high / upward trend / medium- to long-term',
  '信号触发 / 震荡行情 / 分批加仓': 'Signal triggered / range-bound market / scale in gradually',
  '多种智能策略,祝您轻松交易': 'Smart strategies for easier trading',
  '低:': 'Low:',
  '开:': 'Open:',
  '折线:': 'Line:',
  '收:': 'Close:',
  '时间:': 'Time:',
  '直方图:': 'Histogram:',
  '高:': 'High:',
  现货网络: 'Spot Network',
  现货跟单: 'Spot Copy Trading',
  现货马丁格尔: 'Spot Martingale',
  策略交易: 'Strategy Trading',
  了解更多: 'Learn More',
  '0手续买卖数字货币': 'Trade digital assets with zero fees',
  买币立享赚币收益: 'Buy crypto and earn rewards',
  '如何使用C2C买币/卖币': 'How to buy or sell crypto with C2C',
  欧易认证商家申请方式: 'How to apply as a verified merchant',
  '警惕C2C诈骗,守护账户安全': 'Watch out for C2C scams and protect your account',
  连接钱包以继续: 'Connect a wallet to continue',
  个人钱包信息: 'Wallet Information',
  交易数量: 'Transaction Count',
  余额: 'Balance',
  公钥: 'Public Key',
  最后更新: 'Last Updated',
  水龙头余额: 'Faucet Balance',
  水龙头公钥: 'Faucet Public Key',
  获取以太币: 'Get Ether',
  连接钱包: 'Connect Wallet',
  '登录集成平台，继续你的工作。': 'Sign in to Integration Platform to continue.',
  '登录信息不完整，请联系系统管理员': 'Your sign-in details are incomplete. Contact your administrator.',
  '登录暂时不可用，请检查网络后重试': 'Sign-in is unavailable. Check your connection and try again.',
  稳定连接即刻协作: 'Reliable connections. Better collaboration.',
  '节点状态': 'Node Status',
  'mysql(腾讯云服务器)': 'MySQL (Tencent Cloud)',
  '本项目前端使用vite+react技术栈,后台使用express+mysql技术栈,主要代码为typescript': 'This project uses Vite and React on the frontend, Express and MySQL on the backend, with most code written in TypeScript.',
  '本项目并非应用于任何盈利,仅用于学习。其中的数据全部都为假数据,仅做展示使用。': 'This project is for learning only and is not intended for commercial use. All data is fictional and for demonstration.',
  '模拟了一些大数据平台和管理系统所需要的业务场景,例如数据展示,数据看板,流程建模等。': 'This project demonstrates common scenarios for data platforms and management systems, including data exploration, dashboards, and workflow modeling.',
}

const storageKey = 'integration-ui-preferences'
const listeners = new Set<UiListener>()

const readPreferences = (): UiPreferences => {
  try {
    const saved = JSON.parse(localStorage.getItem(storageKey) ?? '{}') as Partial<UiPreferences>
    return {
      locale: saved.locale === 'en-US' ? 'en-US' : 'zh-CN',
      theme: saved.theme && saved.theme in themes ? saved.theme : 'ocean',
    }
  } catch {
    return { locale: 'zh-CN', theme: 'ocean' }
  }
}

let currentPreferences = readPreferences()

const applyTheme = (theme: UiTheme): void => {
  const { color, darkColor } = themes[theme]
  const root = document.documentElement
  root.dataset.integrationTheme = theme
  root.style.setProperty('--app-primary', color)
  root.style.setProperty('--el-color-primary', color)
  root.style.setProperty('--el-color-primary-dark-2', darkColor)
  root.style.setProperty('--ant-color-primary', color)
  root.style.setProperty('--ant-primary-color', color)

  let style = document.getElementById('integration-ui-theme') as HTMLStyleElement | null
  if (!style) {
    style = document.createElement('style')
    style.id = 'integration-ui-theme'
    document.head.append(style)
  }

  style.textContent = `
    :root { --el-color-primary: ${color}; --app-primary: ${color}; --ant-color-primary: ${color}; }
    .ant-btn-primary, .ant-switch-checked, .ant-checkbox-checked .ant-checkbox-inner,
    .ant-radio-checked .ant-radio-inner, .ant-slider-track, .ant-pagination-item-active,
    .ant-menu-item-selected, .ant-tabs-ink-bar { background-color: ${color} !important; border-color: ${color} !important; }
    .ant-btn-primary { color: #fff !important; }
    .ant-tabs-tab-active .ant-tabs-tab-btn, .ant-pagination-item-active a,
    .ant-checkbox-checked .ant-checkbox-inner, .ant-radio-checked .ant-radio-inner { color: ${color} !important; }
    .ant-menu-dark .ant-menu-item-selected, .ant-menu-dark .ant-menu-submenu-selected,
    .ant-menu-dark .ant-menu-item-selected a { color: #fff !important; }
    .ant-menu-dark .ant-menu-item:hover, .ant-menu-dark .ant-menu-submenu-title:hover { color: #fff !important; }
    .activeMenuItem, .el-menu-item.is-active { color: ${color} !important; }
    .el-menu-item.is-active { background-color: color-mix(in srgb, ${color} 15%, transparent) !important; }
    .el-button--primary { --el-button-bg-color: ${color}; --el-button-border-color: ${color}; }
  `
}

const translationEntries = Object.entries(translations)
  .filter(([source]) => source.length > 1)
  .sort(([left], [right]) => right.length - left.length)
interface TranslationCacheEntry {
  original: string
  translated: string
}

const textTranslationCache = new WeakMap<Node, TranslationCacheEntry>()
const attributeTranslationCache = new WeakMap<Element, Map<string, TranslationCacheEntry>>()

const translateValue = (value: string, locale: UiLocale): string => {
  if (locale !== 'en-US') return value

  return translationEntries.reduce((translated, [source, target]) => {
    return translated.includes(source) ? translated.split(source).join(target) : translated
  }, value)
}

const translateTextNode = (node: Node, locale: UiLocale): void => {
  const current = node.textContent ?? ''
  const cached = textTranslationCache.get(node)
  const original = cached?.translated === current ? cached.original : current
  const translated = translateValue(original, locale)
  textTranslationCache.set(node, { original, translated })
  if (translated !== current) node.textContent = translated
}

const translateAttributes = (element: Element, locale: UiLocale): void => {
  let elementCache = attributeTranslationCache.get(element)
  if (!elementCache) {
    elementCache = new Map()
    attributeTranslationCache.set(element, elementCache)
  }

  for (const attribute of ['placeholder', 'title', 'aria-label']) {
    const current = element.getAttribute(attribute)
    if (!current) continue

    const cached = elementCache.get(attribute)
    const original = cached?.translated === current ? cached.original : current
    const translated = translateValue(original, locale)
    elementCache.set(attribute, { original, translated })
    if (translated !== current) element.setAttribute(attribute, translated)
  }
}

const translateDocument = (locale: UiLocale, target: Node = document.body): void => {
  const walker = document.createTreeWalker(target, NodeFilter.SHOW_TEXT)
  let node = walker.nextNode()
  while (node) {
    const parent = node.parentElement
    if (parent && !parent.closest('script,style,textarea,code,pre,[data-i18n-skip]')) {
      translateTextNode(node, locale)
    }
    node = walker.nextNode()
  }

  if (target instanceof Element) {
    translateAttributes(target, locale)
    target.querySelectorAll<HTMLElement>('[placeholder],[title],[aria-label]').forEach((element) => {
      translateAttributes(element, locale)
    })
  }
}

const applyPreferences = (preferences: UiPreferences): void => {
  currentPreferences = {
    locale: preferences.locale === 'en-US' ? 'en-US' : 'zh-CN',
    theme: preferences.theme in themes ? preferences.theme : 'ocean',
  }
  localStorage.setItem(storageKey, JSON.stringify(currentPreferences))
  applyTheme(currentPreferences.theme)
  document.documentElement.lang = currentPreferences.locale
  translateDocument(currentPreferences.locale)
  listeners.forEach((listener) => listener({ ...currentPreferences }))
}

export const getUiPreferences = (): UiPreferences => ({ ...currentPreferences })

export const setUiPreferences = (preferences: Partial<UiPreferences>): void => {
  applyPreferences({ ...currentPreferences, ...preferences })
}

export const subscribeUiPreferences = (listener: UiListener): (() => void) => {
  listeners.add(listener)
  return () => listeners.delete(listener)
}

export const createUiBridgeProps = <T extends Record<string, unknown>>(props: T): T & UiBridge => ({
  ...props,
  getUiPreferences,
  subscribeUiPreferences,
})

export const initializeUiRuntime = (): void => {
  const bridge = window.$wujie?.props
  const initialPreferences = bridge?.getUiPreferences?.() ?? readPreferences()
  applyPreferences(initialPreferences)
  bridge?.subscribeUiPreferences?.(applyPreferences)

  const observer = new MutationObserver((records) => {
    for (const record of records) {
      if (record.type === 'attributes' && record.target instanceof Element) {
        translateAttributes(record.target, currentPreferences.locale)
      }

      if (record.type === 'characterData' && record.target.parentElement) {
        const parent = record.target.parentElement
        if (!parent.closest('script,style,textarea,code,pre,[data-i18n-skip]')) {
          translateTextNode(record.target, currentPreferences.locale)
        }
      }

      record.addedNodes.forEach((node) => {
        if (node.nodeType === Node.TEXT_NODE) {
          if (!node.parentElement?.closest('script,style,textarea,code,pre,[data-i18n-skip]')) {
            translateTextNode(node, currentPreferences.locale)
          }
        } else {
          translateDocument(currentPreferences.locale, node)
        }
      })
    }
  })
  observer.observe(document.documentElement, {
    attributes: true,
    attributeFilter: ['placeholder', 'title', 'aria-label'],
    childList: true,
    characterData: true,
    subtree: true,
  })
}
