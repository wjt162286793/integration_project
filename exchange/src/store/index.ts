// store构建方法
import { legacy_createStore, applyMiddleware, compose } from 'redux'
 
// 支持异步
import { thunk } from 'redux-thunk'
 
// 所有的reducers
import reducer from './reducers'
 
// 将这些方法和参数组合,形成一个全局的store,store也是redux的核心
const composeEnhancers =
  (typeof window !== 'undefined' && (window as any).__REDUX_DEVTOOLS_EXTENSION_COMPOSE__) || compose

export default legacy_createStore(reducer, composeEnhancers(applyMiddleware(thunk)))
