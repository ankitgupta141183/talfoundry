import jwtdecode from 'jwt-decode';
export function applicationHasErrored(state = false, action) {
  switch (action.type) {
    case 'APPLICATION_HAS_ERRORED':
      return action.hasErrored;

    default:
      return state;
  }
}
export function applicationIsLoading(state = false, action) {
  switch (action.type) {
    case 'APPLICATION_IS_LOADING':
      return action.isLoading;

    default:
      return state;
  }
}
export function applicationIsChangeLoading(state = false, action) {
  switch (action.type) {
    case 'APPLICATION_IS_LOADING_CHANGE':
      return action.isLoading;

    default:
      return state;
  }
}

export function settingIsLoading(state = false, action) {
  switch (action.type) {
    case 'SETTING_IS_LOADING':
      return action.isLoading;

    default:
      return state;
  }
}

export function currentUserIsLoading(state = false, action) {
  switch (action.type) {
    case 'CURRENT_USER_IS_LOADING':
      return action.isLoading;

    default:
      return state;
  }
}
export function isAuthenticated(state = localStorage.accessToken ? true : false, action) {
  switch(action.type) {
    case 'IS_AUTHENTICATED':
      return action.isAuthenticated

    default:
      return state;
  }
}

export function currentUser(state = localStorage.accessToken ? jwtdecode(localStorage.accessToken) : {}, action) {
  switch(action.type) {
    case 'SET_CURRENT_USER':
      return action.currentUser

    default:
      return state;
  }
}

export function currentUserDetails(state = {}, action) {
  switch(action.type) {
    case 'USER_DETAILS_FETCH_DATA_SUCCESS':
      return action.details

    default:
      return state;
  }
}


// new create
export function UserDashboardDetails(state = {}, action) {
  switch(action.type) {
    case 'USER_DASHBOARD_DETAILS':
      return action.detail
    default:
      return state;
  }
}

//end create

// export function currentUser(state = {}, action) {
//   switch (action.type) {
//     case 'SET_CURRENT_USER':
//       return action.currentUser;

//     default:
//       return state;
//   }
// }

export function invitationIsLoading(state = false, action) {
  switch (action.type) {
    case 'INVITATION_IS_LOADING':
      return action.isLoading;

    default:
      return state;
  }
}

export function offerIsLoading(state = false, action) {
  switch (action.type) {
    case 'OFFER_IS_LOADING':
      return action.isLoading;

    default:
      return state;
  }
}

export function proposalIsLoading(state = false, action) {
  switch (action.type) {
    case 'PROPOSAL_IS_LOADING':
      return action.isLoading;

    default:
      return state;
  }
}


export function settingUserDetails(state = {}, action) {
  switch (action.type) {
    case 'SETTING_USER_DETAILS_FETCH_DATA_SUCCESS':
      return action.settingDetails;

    default:
      return state;
  }
}


  