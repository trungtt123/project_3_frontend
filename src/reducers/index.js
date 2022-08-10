import { combineReducers } from 'redux'
import statusModal from './statusModal'
import token from './token'
import userData from './userData'
import listGroups from './listGroups'
export default combineReducers({
    statusModal,
    token,
    userData,
    listGroups
})