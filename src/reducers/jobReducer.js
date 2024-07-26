export function jobs(state = [], action) {
  switch (action.type) {
    case 'JOBS_FETCH_DATA_SUCCESS':
      return action.jobs;

    default:
      return state;
  }
}

export function job(state = {}, action) {
  switch (action.type) {
    case 'JOB_FETCH_DATA_SUCCESS':
      return action.job;

    default:
      return state;
  }
}

export function rating(state = {}, action) {
  switch (action.type) {
  case 'RATING_FETCH_DATA_SUCCESS':
      return action.rating;

    default:
      return state;
  }
}

export function jobsForFreelancer(state = [], action) {
  switch (action.type) {
    case 'FREELANCER_JOBS_FETCH_DATA_SUCCESS':
      return action.jobs;

    default:
      return state;
  }
}