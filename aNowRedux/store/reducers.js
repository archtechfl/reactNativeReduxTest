import C from '../constants';
import { combineReducers } from 'redux';

export const position = (state={"latitude": 0, "longitude": 0}, action) =>

	(action.type === C.SET_LOCATION) ?
		action.payload :
		state

export default combineReducers({
  	position
})