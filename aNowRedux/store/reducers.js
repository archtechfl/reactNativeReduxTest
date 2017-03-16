import C from '../constants';
import { combineReducers } from 'redux';

const initialState = {
    "position": {
        "latitude": 0,
        "longitude": 0
    }
}

export const position = function(state=initialState, action){

	switch (action.type) {
		case C.SET_LOCATION:
			return {
				...state,
				latitude: action.payload.latitude,
                longitude: action.payload.longitude
			}
		default:
			return state
	}

}

export default combineReducers({
  	position
})