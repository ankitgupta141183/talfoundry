import {combineReducers} from 'redux';

const appProcessStep1 = (state = {}, action) => {
	switch (action.type) {
			case 'ADD_PROCESS_1':
					return action.payload	
				default:
					return state
			}
	}

	const step2InitialState = {
		current_company_name: "",
		current_job_title: "",
		about_me: "",
		worked_as_freelancer: "",
		// freelancing_pros_cons: ""
	}
const appProcessStep2 = (state = step2InitialState, action) => {
	switch (action.type) {
		case 'ADD_PROCESS_2':
			return action.payload		
		default:
			return state
	}
}

const appProcessCategoryData = (state = {}, action) => {
	switch (action.type) {
		case 'ADD_DATA_CATEGORY_DESCRIPTION':
			return action.payload		
		default:
			return state
	}
}
const appProcessReducer =  combineReducers({appProcessStep1, appProcessStep2, appProcessCategoryData})
export default appProcessReducer