import {combineReducers} from 'redux';
const intitialFirst = {
  editTitle: false,
  editDesc: false,
  editHourlyRate: false,
  editSkills: false,
  editEducation: false,
  editCertification: false,
  editEmployment: false,
  editCategory: false
}

const profileStates = (state = intitialFirst, action) => {
  switch (action.type) {
      case 'PROFILE_EDIT_IS_OPEN':
          return action.payload
        default:
          return state
      }
  }
    
const profileEditReducer =  combineReducers({profileStates})

export default profileEditReducer