import userInfoHandler from './userHandler'
import loginModalFlagHandler from './loginModalFlag'
import {combineReducers} from 'redux'

export default combineReducers({
    userInfoHandler,
    loginModalFlagHandler
})
