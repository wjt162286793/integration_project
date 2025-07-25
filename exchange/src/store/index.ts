// store构建方法
import {legacy_createStore,applyMiddleware} from 'redux'
 
// 支持异步
import {thunk} from 'redux-thunk'
 
// 开发工具
import {composeWithDevTools} from 'redux-devtools-extension'
 
// 所有的reducers
import reducer from './reducers'
 
// 将这些方法和参数组合,形成一个全局的store,store也是redux的核心
export default legacy_createStore(reducer,composeWithDevTools(applyMiddleware(thunk)))
