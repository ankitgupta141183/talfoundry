export function FreelancersToInvite(state = [], action) {
  switch (action.type) {
    case 'FL_TO_FETCH_DATA_SUCCESS':
      return action.freelancers;

    default:
      return state;
  }
}

export function FreelancersToHire(state = [], action) {
  switch (action.type) {
    case 'HIRE_FL_FETCH_DATA_SUCCESS':
      return action.freelancers;

    default:
      return state;
  }
}

export function AllJobPostings(state= [], action) {
  switch (action.type){
    case 'GET_ALL_JOB_POSTINGS_FETCH_DATA_SUCCESS' :
      return action.allPosts;

    default:
      return state;
  }
}

export function managerDashboard(state= [], action) {
  switch (action.type){
    case 'GET_MANAGER_DASHBOARD_FETCH_DATA_SUCCESS' :
      return action.managerDashboard;

    default:
      return state;
  }
}

export function AllHiredFreelancers(state= [], action) {
  switch (action.type){
    case 'GET_HIRED_FREELANCER_FETCH_DATA_SUCCESS' :
      return action.hireFreelancers;

    default:
      return state;
  }
}

export function archives(state= [], action) {
  switch (action.type){
    case 'ARCHIVE_DETAILS_FETCH_DATA_SUCCESS' :
      return action.archives;

    default:
      return state;
  }
}

export function managerArchives(state= [], action) {
  switch (action.type){
    case 'ARCHIVE_MANAGER_DETAILS_FETCH_DATA_SUCCESS' :
      return action.managerArchives;

    default:
      return state;
  }
}

export function managerInvitation(state= [], action) {
  switch (action.type){
    case 'INVITATION_MANAGER_DETAILS_FETCH_DATA_SUCCESS' :
      return action.managerInvitation;

    default:
      return state;
  }
}

// export function TemplatesDetails(state = [], action) {
//   switch (action.type) {
//     case 'TEMPLATES_DETAILS_FETCH_DATA_SUCCESS':
//       return action.templates;

//     default:
//       return state;
//   }
// }

export function FreelancersToReview(state = [], action) {
  switch (action.type) {
    case 'REVIEW_FL_FETCH_DATA_SUCCESS':
      return action.freelancers;

    default:
      return state;
  }
}

export function InvitedFreelancers(state = [], action) {
  switch (action.type) {
    case 'INVITED_FL_FETCH_DATA_SUCCESS':
      return action.freelancers;

    default:
      return state;
  }
}
export function SavedFreelancersForHM(state = [], action) {
  switch (action.type) {
    case 'GET_SAVED_FREELANCER_FETCH_DATA_SUCCESS':
      return action.freelancers;

    default:
      return state;
  }
}

export function FreelancerAndProposalDetails(state = [], action) {
  switch (action.type) {
    case 'FL_PROPOSAL_FETCH_DATA_SUCCESS':
      return action.proposalDetails;

    default:
      return state;
  }
}
export function FreelancerToHire(state = [], action) {
  switch (action.type) {
    case 'HIRE_FREELANCER_DETAILS_FETCH_DATA_SUCCESS':
      return action.hireFreelancer;

    default:
      return state;
  }
}

export function HiredFreelancers(state = [], action) {
  switch (action.type) {
    case 'ACTIVE_HIRE_FREELANCER_DETAILS_FETCH_DATA_SUCCESS':
      return action.freelancers;

    default:
      return state;
  }
}

export function contractsForHiringManager(state = [], action) {
  switch (action.type) {
    case 'HM_CONTRACTS_FETCH_DATA_SUCCESS':
      return action.data;

    default:
      return state;
  }
}

export function contractDetailsForHiringManager(state = [], action) {
  switch (action.type) {
    case 'CONTRACT_DETAILS_FOR_HM_FETCH_DATA_SUCCESS':
      return action.contract;

    default:
      return state;
  }
}

export function getActiveJobTab(state = false, action) {
  switch (action.type) {
    case 'ACTIVE_JOB_TAB':
      return action.tab;

    default:
      return state;
  }
}
