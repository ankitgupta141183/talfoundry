export function freelancerProfile(state = {}, action) {
    switch (action.type) {
      case 'FREELANCER_PROFILE_FETCH_DATA_SUCCESS':
        return action.profile;
  
      default:
        return state;
    }
  }

export function jobForFreelancer(state = {}, action) {
  switch (action.type) {
    case 'FREELANCER_JOB_FETCH_DATA_SUCCESS':
      return action.job;
    default:
      return state;
  }
}

export function proposalDetailsForFreelancer(state = {}, action) {
  switch (action.type) {
    case 'PROPOSAL_DETAILS_FETCH_DATA_SUCCESS':
      return action.job;
    default:
      return state;
  }
}

export function invitationJobForFreelancer(state = {}, action) {
  switch (action.type) {
    case 'JOB_INVITATION_FETCH_DATA_SUCCESS':
      return action.invitation;
    default:
      return state;
  }
}

export function dashboardDataSucess(state = {}, action) {
  switch (action.type) {
    case 'DASHBOARD_DATA_SUCCESS':
      return action.data;
    default:
      return state;
  }
}



export function offerDetails(state = {}, action) {
  switch (action.type) {
    case 'JOB_OFFER_FETCH_DATA_SUCCESS':
      return action.offer;
    default:
      return state;
  }
}

export function invitesForFreelancer(state = [], action) {
  switch (action.type) {
    case 'FL_INVITES_FETCH_DATA_SUCCESS':
      return action.data;
    default:
      return state;
  }
}  

export function offersForFreelancer(state = [], action) {
  switch (action.type) {
    case 'FL_OFFERS_FETCH_DATA_SUCCESS':
      return action.data;
    default:
      return state;
  }
}  

export function contractsForFreelancer(state = [], action) {
  switch (action.type) {
    case 'FL_CONTRACTS_FETCH_DATA_SUCCESS':
      return action.data;
    default:
      return state;
  }
}  

export function contractDetails(state = {}, action) {
  switch (action.type) {
    case 'CONTRACT_DETAILS_FETCH_DATA_SUCCESS':
      return action.contract;
    default:
      return state;
  }
}
export function submittedProposals(state = [], action) {
  switch (action.type) {
    case 'FL_PROPOSALS_FETCH_DATA_SUCCESS':
      return action.data;
    default:
      return state;
  }
}    

export function freelancerNotifications(state = [], action) {
  switch (action.type) {
    case 'FL_NOTIFICATIONS_FETCH_DATA_SUCCESS':
      return action.notifications;
    default:
      return state;
  }
}   