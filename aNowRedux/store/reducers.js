import C from '../constants';
import { combineReducers } from 'redux';

export const position = (state=null, action) =>

	(action.type === C.SET_LOCATION) ?
		action.payload :
		state

export default combineReducers({
  	position
})