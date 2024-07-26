import axios from 'axios';
// import {env} from '../constants/common';
import {REACT_APP_BASE_URL} from '../constants/common'
import { logOutAction } from './logOutAction';

export function freelancerJobsFetchDataSuccess(jobs) {
  return {
    type: 'FREELANCER_JOBS_FETCH_DATA_SUCCESS',
    jobs
  }
}
export function applicationIsLoading(bool) {
  return {
    type: 'APPLICATION_IS_LOADING',
    isLoading: bool
  }
}

export function applicationIsChangeLoading(bool) {
  return {
    type: 'APPLICATION_IS_LOADING_CHANGE',
    isLoading: bool
  }
}

export function applicationHasErrored(bool) {
  return {
    type: 'APPLICATION_HAS_ERRORED',
    hasErrored: bool
  }
}

export function getJobsForFreelancer(page, searchItem){
  return (dispatch) => {
    dispatch(applicationIsLoading(true))
    return axios({
      method: "get",
      url: REACT_APP_BASE_URL + `/jobs/fetch_all_jobs?page=${page}&search=${searchItem}&filters={}&per_page=50`,
      headers: {
        Authorization: localStorage.getItem("accessToken"),
        "content-type": "multipart/form-data"
      }
    })
    .then(
      response => {
        dispatch(applicationIsLoading(false))
        if (response.status !== 200) {
          console.log(response)
        }
        return response.data
      }
    )
    .then(jobs => {
      dispatch(applicationIsLoading(false))
      dispatch(freelancerJobsFetchDataSuccess(jobs))
      dispatch(applicationHasErrored(false))
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


export function getMyJobsForFreelancer(page, searchItem){
  return (dispatch) => {
    dispatch(applicationIsLoading(true))
    return axios({
      method: "get",
      url: REACT_APP_BASE_URL + `/freelancer_active_jobs?page=${page}&search=${searchItem}`,
      headers: {
        Authorization: localStorage.getItem("accessToken"),
        "content-type": "multipart/form-data"
      }
    })
    .then(
      response => {
        dispatch(applicationIsLoading(false))
        if (response.status !== 200) {
          console.log(response)
        }
        return response.data
      }
    )
    .then(jobs => {
      dispatch(applicationIsLoading(false))
      dispatch(freelancerJobsFetchDataSuccess(jobs))
      dispatch(applicationHasErrored(false))
      return jobs
    })
    .catch(
      error => {
        dispatch(logOutAction())
        console.log(error)
        dispatch(applicationIsLoading(false))
        dispatch(applicationHasErrored(true))
        return error
      }
    )
  }
}


export function getJobsClientHistory(userId,page){
  return (dispatch) => {
    dispatch(applicationIsChangeLoading(true))
    return axios({
      method: "get",
      url: REACT_APP_BASE_URL + `/client_history/?user_id=${userId}&page=${page}&authorize=false`,
      headers: {
        Authorization: localStorage.getItem("accessToken"),
        "content-type": "multipart/form-data"
      }
    })
    .then(
      response => {
        dispatch(applicationIsChangeLoading(false))
        if (response.status !== 200) {
          console.log(response)
        }
        return response.data
      }
    )
    .then(jobs => {
      dispatch(applicationIsChangeLoading(false))
      dispatch(freelancerJobsFetchDataSuccess(jobs))
      dispatch(applicationHasErrored(false))
      return jobs
    })
    .catch(
      error => {
        console.log(error)
        dispatch(applicationIsChangeLoading(false))
        dispatch(applicationHasErrored(true))
        return error
      }
    )
  }
}
