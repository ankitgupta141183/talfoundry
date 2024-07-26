import {combineReducers} from 'redux';
const intitialFirst = {email: ""}
const intitialSecond = {password: ""}
const loginStep1 = (state = intitialFirst, action) => {
	switch (action.type) {
			case 'LOGIN_STEP_1':
					return action.payload	
				default:
					return state
			}
	}
    
const loginStep2 = (state = intitialSecond, action) => {
	switch (action.type) {
		case 'LOGIN_STEP_2':
			return action.payload		
		default:
			return state
	}
}

const freeLancerSideBarActive = (state = '', action) => {
	switch (action.type) {
		case 'ACTIVE_SIDERBAR_FREELANCER':
			return action.payload		
		default:
			return state
	}
}

const showHideSideBar = (state = false, action) => {
	switch (action.type) {
		case 'SIDERBAR_SHOW_HIDE':
			return action.payload		
		default:
			return state
	}
}

const loginStepsReducer =  combineReducers({loginStep1, loginStep2, freeLancerSideBarActive, showHideSideBar})
export default loginStepsReducer