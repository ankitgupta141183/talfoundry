import {combineReducers} from 'redux';
const intitialFirst = {email: ""}
const intitialSecond = {password: "", confirmPassword: ""}
const forgetStep = (state = intitialFirst, action) => {
	switch (action.type) {
			case 'FORGET_STEP':
					return action.payload	
				default:
					return state
			}
	}
    
const resetStep = (state = intitialSecond, action) => {
	switch (action.type) {
		case 'RESET_STEP':
			return action.payload		
		default:
			return state
	}
}
const forgetAndPasswordReducer =  combineReducers({forgetStep, resetStep})
export default forgetAndPasswordReducer;