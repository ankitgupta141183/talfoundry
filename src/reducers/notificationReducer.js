let initalState = {
    notiifcationSettings: {}
}

export function allNotifications(state = initalState, action) {
    switch (action.type) {
      case 'ALL_NOTITFICATIONS_FETCH_DATA_SUCCESS':
        console.log('111111111111111111',action)

        return initalState = action.freelancers;
  
      default:
        return state;
    }
  }