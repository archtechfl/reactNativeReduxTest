import C from '../constants';
import { combineReducers } from 'redux';

export const location = (state=null, action) =>

	(action.type === C.SET_LOCATION) ?
		action.payload :
		state

export default combineReducers({
  	location
})