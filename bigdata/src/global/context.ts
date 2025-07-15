import {createContext} from 'react'

export const GlobalContext = createContext()

export const globalData = {
    isSubAppFlag: window.__POWERED_BY_WUJIE__
}