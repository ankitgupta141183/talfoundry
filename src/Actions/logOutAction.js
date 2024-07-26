import {isAuthenticated, setCurrentUser} from '../Actions/loginActions';
import {firstLoginStep} from '../Actions/loginStepsActions'
import {settingUserDetailsFetchDataSuccess} from '../Actions/applicationActions';
const initState = {}
export function logOutAction(){
  const currentUser = {}
  return (dispatch) => {
    localStorage.clear()
    dispatch(isAuthenticated(false))
    dispatch(setCurrentUser(currentUser))
    dispatch(settingUserDetailsFetchDataSuccess(currentUser))
    dispatch(firstLoginStep(initState))
    return ("success")
  }
}