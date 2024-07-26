import axios from 'axios';
// import {env} from '../constants/common';
import { REACT_APP_BASE_URL } from '../constants/common'
import { freelancerJobsFetchDataSuccess, applicationIsLoading, applicationHasErrored } from './freelancerJobActions';
import _ from "lodash";
import { AllfreelancersFetchDataSuccess } from './AdminActions';

export function SetSearchVal(value) {
  return {
    type: "ADD_SEARCH_VAL",
    payload: value
  }
}

export function SetSearchJobVal(value) {
  return {
    type: "ADD_SEARCH_JOB_VAL",
    payload: value
  }
}

export function getSavedJobsFetchDataSuccess(jobs) {
  return {
    type: 'GET_SAVED_JOBS_FETCH_DATA_SUCCESS',
    jobs
  }
}

export function getSearchedJobsForFreelancer(searchBy, searchItem, page) {
  return (dispatch) => {
    dispatch(applicationIsLoading(true))
    return axios({
      method: "get",
      url: REACT_APP_BASE_URL + `/jobs?${searchBy}=${searchItem}&page=${page}`,
      headers: {
        Authorization: localStorage.getItem("accessToken"),
        "content-type": "multipart/form-data"
      },
    })
      .then(
        response => {
          // dispatch(signupIsLoading(false))
          if (response.status !== 200) {
            console.log(response)
          }
          return response.data
        }
      )
      .then(jobs => {
        dispatch(applicationIsLoading(false))
        dispatch(freelancerJobsFetchDataSuccess(jobs))
        return jobs
      })
      .catch(
        error => {
          console.log(error)
          dispatch(applicationIsLoading(false))
          dispatch(applicationHasErrored(true))
          return error
        }
      )
  }
}


export function getSavedJobsForFreelancer() {
  return (dispatch) => {
    dispatch(applicationIsLoading(true))
    return axios({
      method: "get",
      url: REACT_APP_BASE_URL + `/get_favorited_jobs`,
      headers: {
        Authorization: localStorage.getItem("accessToken"),
        "content-type": "multipart/form-data"
      }
    })
      .then(
        response => {
          if (response.status === 204 || response.status === 200 || response.status === 201) {
            console.log(response)
          }
          return response.data
        }
      )
      .then(jobs => {
        dispatch(applicationIsLoading(false))
        dispatch(getSavedJobsFetchDataSuccess(jobs))
        return jobs
      })
      .catch(
        error => {
          console.log(error)
          dispatch(applicationIsLoading(false))
          dispatch(applicationHasErrored(true))
          return error
        }
      )
  }
}

export function getSearchedFLForHiringMan(searchBy, search) {
  return (dispatch) => {
    dispatch(applicationIsLoading(true))
    return axios({
      method: "get",
      url: REACT_APP_BASE_URL + `/freelancer_index?${searchBy}=${search}`,
      headers: {
        Authorization: localStorage.getItem("accessToken"),
        "content-type": "multipart/form-data"
      },
    })
      .then(
        response => {
          // dispatch(signupIsLoading(false))
          if (response.status !== 200) {
            console.log(response)
          }
          return response.data
        }
      )
      .then(freelancers => {
        dispatch(AllfreelancersFetchDataSuccess(freelancers))
        dispatch(applicationIsLoading(false))
        return freelancers
      })
      .catch(
        error => {
          console.log(error)
          dispatch(applicationIsLoading(false))
          dispatch(applicationHasErrored(true))
          return error
        }
      )
  }
}

export function getFilteredFLForHiringMan(favour, searchBy, searchItem, sortBy, sortItem, search, newSearchItem, dataType) {
  return (dispatch) => {
    if (favour === "" || "search") {
      dispatch(applicationIsLoading(true))
    }
    return axios({
      method: "get",
      url: REACT_APP_BASE_URL + `/find_freelancers?${searchBy}=${JSON.stringify(searchItem)}&${sortBy}=${sortItem}&${search}=${newSearchItem}&${dataType}=${_.isEmpty(searchItem && sortItem) && !_.isEmpty(newSearchItem) ? true : false}&authorize=${localStorage.accessToken ? true : false}`,
    })
      .then(
        response => {
          // dispatch(signupIsLoading(false))
          if (response.status !== 200) {
            console.log(response)
          }
          return response.data
        }
      )
      .then(data => {
        if (favour === "" || "search") {
          dispatch(applicationIsLoading(false))
        }
        searchBy === "search_jobs" ? dispatch(freelancerJobsFetchDataSuccess(data)) : dispatch(AllfreelancersFetchDataSuccess(data))
        return data
      })
      .catch(
        error => {
          console.log(error)
          dispatch(applicationIsLoading(false))
          dispatch(applicationHasErrored(true))
          return error
        }
      )
  }
}


export function getUnAuthorizedFreelancer(dataType, searchParameters = {}, sortBy, pageNumber) {
  return (dispatch) => {
    dispatch(applicationIsLoading(true))
    return axios({
      method: "get",
      url: REACT_APP_BASE_URL +
        `/welcome/find_freelancers?&page=${pageNumber}&search_freelancers=${searchParameters}&authorize=${localStorage.accessToken ? true : false}`,
    })
      .then(
        response => {
          // dispatch(signupIsLoading(false))
          if (response.status !== 200) {
            console.log(response)
          }
          return response.data
        }
      )
      .then(data => {
        dispatch(applicationIsLoading(false))
        dataType === "find_jobs" ? dispatch(freelancerJobsFetchDataSuccess(data)) : dispatch(AllfreelancersFetchDataSuccess(data))

        return data
      })
      .catch(
        error => {
          console.log(error)
          dispatch(applicationIsLoading(false))
          dispatch(applicationHasErrored(true))
          return error
        }
      )
  }
}

export function getFreelancersData(dataType, searchParameters = {}, sortBy, pageNumber, sendSearch, searchItemValue) {
  let values = {}
  if (!sendSearch) {
    values = {
      page: pageNumber,
      search_freelancers: searchParameters,
      search: searchItemValue,
      sort_by: sortBy
    }
  }
  else {
    values = {
      page: pageNumber,
      search_freelancers: searchParameters,
      search: searchItemValue,
      sort_by: sortBy

    }
  }

  return (dispatch) => {
    dispatch(applicationIsLoading(true))
    return axios({
      method: "get",
      url: REACT_APP_BASE_URL + `/find_freelancers?authorize=${localStorage.accessToken ? true : false}`,
      params: values
    }
    )
      .then(
        response => {
          // dispatch(signupIsLoading(false))
          if (response.status !== 200) {
            console.log(response)
          }
          return response.data
        }
      )
      .then(data => {
        dispatch(applicationIsLoading(false))
        dataType === "find_jobs" ? dispatch(freelancerJobsFetchDataSuccess(data)) : dispatch(AllfreelancersFetchDataSuccess(data))

        return data
      })
      .catch(
        error => {
          console.log(error)
          dispatch(applicationIsLoading(false))
          dispatch(applicationHasErrored(true))
          return error
        }
      )
  }
}


export function getJobsData(dataType, searchParameters = {}, sortBy, pageNumber, sendSearch, searchItemValue) {
  let values = {}
  if (!sendSearch) {
    values = {
      page: pageNumber,
      search_jobs: searchParameters,
      search: searchItemValue,
      sort_by: sortBy
    }
  }
  else {
    values = {
      page: pageNumber,
      search_jobs: searchParameters,
      search: searchItemValue,
      sort_by: sortBy
    }
  }

  return (dispatch) => {
    dispatch(applicationIsLoading(true))
    return axios({
      method: "get",
      url: REACT_APP_BASE_URL + `/find_jobs?authorize=${localStorage.accessToken ? true : false}`,
      params: values
    }
    )
      .then(
        response => {
          // dispatch(signupIsLoading(false))
          if (response.status !== 200) {
            console.log(response)
          }
          return response.data
        }
      )
      .then(data => {
        dispatch(applicationIsLoading(false))
        // dataType === "find_jobs" ? dispatch(freelancerJobsFetchDataSuccess(data)) : dispatch(AllfreelancersFetchDataSuccess(data))
        return data
      })
      .catch(
        error => {
          console.log(error)
          dispatch(applicationIsLoading(false))
          dispatch(applicationHasErrored(true))
          return error
        }
      )
  }
}
export function getFilteredFreelancersWithPagination(favour, searchBy, searchItem,
  sortBy, sortItem, search, newSearchItem, dataType, loadMore) {
  return (dispatch) => {
    if (favour === "" || "search") {
      dispatch(applicationIsLoading(true))
    }
    return axios({
      method: "get",
      url: REACT_APP_BASE_URL + `/welcome?page=${loadMore}&${searchBy}=${JSON.stringify(searchItem)}&${sortBy}=${sortItem}&${search}=${newSearchItem}&${dataType}=${_.isEmpty(searchItem && sortItem) && !_.isEmpty(newSearchItem) ? true : false}`,
    })
      .then(
        response => {
          // dispatch(signupIsLoading(false))
          if (response.status !== 200) {
            console.log(response)
          }
          return response.data
        }
      )
      .then(data => {
        if (favour === "" || "search") {
          dispatch(applicationIsLoading(false))
        }
        searchBy === "search_jobs" ? dispatch(freelancerJobsFetchDataSuccess(data)) : dispatch(AllfreelancersFetchDataSuccess(data))
        return data
      })
      .catch(
        error => {
          console.log(error)
          dispatch(applicationIsLoading(false))
          dispatch(applicationHasErrored(true))
          return error
        }
      )
  }
}


export function sendCategoryParams(data, dataType, sortBy, searchBy) {
  return dispatch => {
    dispatch(applicationIsLoading(true))
    return axios({
      method: "get",
      url: REACT_APP_BASE_URL + `/welcome?search_freelancers=${JSON.stringify(data)}&sort_by=${sortBy}&search=${searchBy}&find_freelancers=>"false"`,

      // data: data
    })
      .then(
        response => {
          // dispatch(signupIsLoading(false))
          if (response.status !== 200) {
            console.log(response)
          }
          return response.data
        }
      )
      .then(data => {
        dispatch(applicationIsLoading(false))
        dataType === "find_jobs" ? dispatch(freelancerJobsFetchDataSuccess(data)) : dispatch(AllfreelancersFetchDataSuccess(data))

        return data
      })
      .catch(
        error => {
          console.log(error)
          dispatch(applicationIsLoading(false))
          dispatch(applicationHasErrored(true))
          return error
        }
      )
  }
}



export function getSearchedConversations(searchItem) {
  return (dispatch) => {
    dispatch(applicationIsLoading(true))
    return axios({
      method: "get",
      url: REACT_APP_BASE_URL + `/conversations/search_conversation?search=${searchItem}`,
      headers: {
        Authorization: localStorage.getItem("accessToken"),
        "content-type": "multipart/form-data"
      },
    })
      .then(
        response => {
          // dispatch(signupIsLoading(false))
          if (response.status !== 200) {
            console.log(response)
          }
          return response.data
        }
      )
      .then(conversations => {
        return conversations
      })
      .catch(
        error => {
          console.log(error)
          dispatch(applicationIsLoading(false))
          dispatch(applicationHasErrored(true))
          return error
        }
      )
  }
}

export function getFilteredDataForJobs(favour, searchBy, searchItem, sortBy, sortItem, search, newSearchItem, dataType, page) {
  return (dispatch) => {
    if (favour === "" || "search") {
      dispatch(applicationIsLoading(true))
    }
    return axios({
      method: "get",
      url: REACT_APP_BASE_URL + `/admins/find_freelancers?page=${page}&${searchBy}=${JSON.stringify(searchItem)}&${sortBy}=${sortItem}&${search}=${newSearchItem}&${dataType}=${_.isEmpty(searchItem && sortItem) && !_.isEmpty(newSearchItem) ? true : false}`,
    })
      .then(
        response => {
          // dispatch(signupIsLoading(false))
          if (response.status !== 200) {
            console.log(response)
          }
          return response.data
        }
      )
      .then(data => {
        if (favour === "" || "search") {
          dispatch(applicationIsLoading(false))
        }
        searchBy === "search_jobs" ? dispatch(freelancerJobsFetchDataSuccess(data)) : dispatch(AllfreelancersFetchDataSuccess(data))
        // dispatch(AllfreelancersFetchDataSuccess(data))
        return data
      })
      .catch(
        error => {
          console.log(error)
          dispatch(applicationIsLoading(false))
          dispatch(applicationHasErrored(true))
          return error
        }
      )
  }
}


export function getFilteredPostJobs(favour, searchBy, searchItem, sortBy, sortItem, search, newSearchItem, dataType, page) {
  return (dispatch) => {
    if (favour === "" || "search") {
      dispatch(applicationIsLoading(true))
    }
    return axios({
      method: "get",
      url: REACT_APP_BASE_URL + `/admins/find_jobs?page=${page}&${searchBy}=${JSON.stringify(searchItem)}&${sortBy}=${sortItem}&${search}=${newSearchItem}&${dataType}=${_.isEmpty(searchItem && sortItem) && !_.isEmpty(newSearchItem) ? true : false}`,
    })
      .then(
        response => {
          // dispatch(signupIsLoading(false))
          if (response.status !== 200) {
            console.log(response)
          }
          return response.data
        }
      )
      .then(data => {
        if (favour === "" || "search") {
          dispatch(applicationIsLoading(false))
        }
        searchBy === "search_jobs" ? dispatch(freelancerJobsFetchDataSuccess(data)) : dispatch(AllfreelancersFetchDataSuccess(data))
        // dispatch(AllfreelancersFetchDataSuccess(data))
        return data
      })
      .catch(
        error => {
          console.log(error)
          dispatch(applicationIsLoading(false))
          dispatch(applicationHasErrored(true))
          return error
        }
      )
  }
}

export function getActiveJobReportPage(selectedYear) {
  return (dispatch) => {
      dispatch(applicationIsLoading(true))
    return axios({
      method: "get",
      url: REACT_APP_BASE_URL + `/admins/jobs_report/?year=${selectedYear}`,
    })
      .then(
        response => {
          // dispatch(signupIsLoading(false))
          if (response.status !== 200) {
            console.log(response)
          }
          return response.data
        }
      )
      .then(data => {

        // dispatch(AllfreelancersFetchDataSuccess(data))
        return data
      })
      .catch(
        error => {
          console.log(error)
          dispatch(applicationIsLoading(false))
          dispatch(applicationHasErrored(true))
          return error
        }
      )
  }
}


