export function allFreelancers(state = [], action) {
  switch (action.type) {
    case 'ALL_FREELANCERS_FETCH_DATA_SUCCESS':
      return action.freelancers;

    default:
      return state;
  }
}
export function freelancer(state = {}, action) {
  switch (action.type) {
    case 'FREELANCER_FETCH_DATA_SUCCESS':
      return action.freelancer;

    default:
      return state;
  }
}

export function adminJobListing(state = [], action) {
  switch (action.type) {
    case 'ADMIN_JOB_LISTING_FETCH_DATA_SUCCESS':
      return action.jobListing;

    default:
      return state;
  }
}

export function adminJobsListing(state = [], action) {
  switch (action.type) {
    case 'ADMIN_JOBS_LISTING_FETCH_DATA_SUCCESS':
      return action.jobListing;

    default:
      return state;
  }
}

export function admins(state = [], action) {
  switch (action.type) {
    case 'ADMINS_FETCH_DATA_SUCCESS':
      return action.admins;

    default:
      return state;
  }
}

export function adminClientListing(state = {}, action) {
  switch (action.type) {
    case 'ADMIN_CLIENT_LISTING_FETCH_DATA_SUCCESS':
      return action.clientListing;

    default:
      return state;
  }
}

export function adminClientDetails(state = {}, action) {
  switch (action.type) {
    case 'ADMIN_CLIENT_DETAILS_FETCH_DATA_SUCCESS':
      return action.clientDetails;

    default:
      return state;
  }
}

export function adminUsersListing(state = {}, action) {
  switch (action.type) {
    case 'ADMIN_USER_LISTING_FETCH_DATA_SUCCESS':
      return action.usersListing;

    default:
      return state;
  }
}

