const initState = "";


export function SearchVal(state = initState, action) {
  switch (action.type) {
    case 'ADD_SEARCH_VAL':
      if(!action.payload){
        return ''
      }
      return action.payload;
    default:
      return state;
  }
}  

export function SearchJobVal(state = initState, action) {
  switch (action.type) {
    case 'ADD_SEARCH_JOB_VAL':
      return action.payload;
    default:
      return state;
  }
}  

export function SavedJobsForFreelancer(state = [], action) {
  switch (action.type) {
    case 'GET_SAVED_JOBS_FETCH_DATA_SUCCESS':
      return action.jobs;

    default:
      return state;
  }
}

