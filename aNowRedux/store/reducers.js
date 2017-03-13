import C from '../constants';
import { combineReducers } from 'redux';

export const latitude = (state=null, action) =>

	(action.type === C.SET_LATITUDE) ?
		action.payload :
		state

export const longitude = (state=null, action) =>

	(action.type === C.SET_LONGITUDE) ?
		action.payload :
		state

export default combineReducers({
  	location
})