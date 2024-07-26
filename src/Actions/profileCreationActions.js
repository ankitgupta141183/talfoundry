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

export function createProfileAction(id, data){
  let dataToSend = data
  dataToSend.id =  id
  console.log(dataToSend ,"---dtata----");

  return (dispatch) => {
    dispatch(applicationIsLoading(true))
    return axios({
      method: "put",
      url: REACT_APP_BASE_URL + `/profiles/${id}`,
      data: dataToSend
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

export function AdminProfileEditAction(id, data){
  let dataToSend = data
  dataToSend.id =  id
  console.log(dataToSend ,"---Api hit value----");

  return (dispatch) => {
    dispatch(applicationIsLoading(true))
    return axios({
      method: "put",
      url: REACT_APP_BASE_URL + `/users/${id}`,
      data: dataToSend
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