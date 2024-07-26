import axios from 'axios';
// import {env} from '../constants/common';
import {REACT_APP_BASE_URL} from '../constants/common'

export function applicationIsLoading(bool) {
  return {
    type: 'APPLICATION_IS_LOADING',
    isLoading: bool
  }
}
export function applicationHasErrored(bool) {
  return {
    type: 'APPLICATION_HAS_ERRORED',
    hasErrored: bool
  }
}
export function createJobAction(data){
  return (dispatch) => {
    dispatch(applicationIsLoading(true))
    return axios({
      method: "post",
      url: REACT_APP_BASE_URL + '/jobs',
      headers: {
        'content-Type': 'application/json',
        Authorization: localStorage.getItem("accessToken"),
      },
      data: data
    }).then(
      response => {
        dispatch(applicationIsLoading(false))
        return response
      }
    )
    .catch(
      error => {
          console.log(error)
          dispatch(applicationIsLoading(false))
          return error
      }
    )
  }
}

export function updateJobAction(uuid, data){
  return (dispatch) => {
    dispatch(applicationIsLoading(true))
    return axios({
      method: "put",
      url: REACT_APP_BASE_URL + `/jobs/${uuid}`,
      headers: {
        'content-Type': 'application/json',
        Authorization: localStorage.getItem("accessToken"),
      },
      data: data
    })
    .then(
      response => {
        dispatch(applicationIsLoading(false))
        return response
      }
    )
    .catch(
      error => {
          console.log(error)
          dispatch(applicationIsLoading(false))
          return error
      }
    )
  }
}