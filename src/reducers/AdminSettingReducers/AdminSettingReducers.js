const initialState = {
    GENERALSETTING : "",
    UpdateValue : ""
}

export function AdminSettingState(state = initialState , action) {
    switch (action.type) {
      case 'GENERAL_SETTING':
        return {...state, GENERALSETTING: action.details};
   case "UPDATE_SETTING" : 
   return {...state, UpdateValue : action.detail}
      default:
        return state;
    }
  }