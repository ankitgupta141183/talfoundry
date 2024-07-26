import {combineReducers} from 'redux';

const signUpStep1 = (state = {}, action) => {
	switch (action.type) {
			case 'ADD_STEP_1':
					return action.payload	
				default:
					return state
			}
	}
    
const signUpStep2 = (state = {}, action) => {
	switch (action.type) {
		case 'ADD_STEP_2':
			return action.payload		
		default:
			return state
	}
}
const signUpStepsReducer =  combineReducers({signUpStep1, signUpStep2})
export default signUpStepsReducer