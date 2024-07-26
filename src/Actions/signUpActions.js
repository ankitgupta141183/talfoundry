import axios from 'axios';
// import {env} from '../constants/common';
import {REACT_APP_BASE_URL} from '../constants/common'

export const userLoginAction = payload => dispatch => {
  dispatch({
    type: "USER_LOGIN_ACTION",
    payload: payload
  })
}

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


export function signUpAction(data) {
  return dispatch => {
    dispatch(applicationIsLoading(true))
    return axios.post(REACT_APP_BASE_URL + '/signup', data)
    .then((response) => {
      if(response.status === 204 || response.status === 200 || response.status === 201) {
        dispatch(applicationIsLoading(false))
        return response
      } else if (response.data.status === 400) {
        return response.data
      } else {
        throw Error(response.statusText)
      }
    })
    .catch(function (error) {
      console.log('action error')
      dispatch(applicationIsLoading(false))
      return error
      // dispatch(applicationHasErrored(true))
    })
  }
}

export function submitOTP(data) {
  return dispatch => {
    dispatch(applicationIsLoading(true))
    return axios.post(REACT_APP_BASE_URL + '/phone_verifications/verify_user_from_otp', data)
    .then((response) => {
      if(response.status === 204 || response.status === 200 || response.status === 201) {
        dispatch(applicationIsLoading(false))
        return response
      } else if (response.data.status === 400) {
        return response.data
      } else {
        throw Error(response.statusText)
      }
    })
    .catch(function (error) {
      console.log('action error')
      dispatch(applicationIsLoading(false))
      return error
      // dispatch(applicationHasErrored(true))
    })
  }
}

export function sendOTP(data) {
  return dispatch => {
    dispatch(applicationIsLoading(true))
    return axios.post(REACT_APP_BASE_URL + '/phone_verifications/send_otp', data)
    .then((response) => {
      if(response.status === 204 || response.status === 200 || response.status === 201) {
        dispatch(applicationIsLoading(false))
        return response
      } else if (response.data.status === 400) {
        return response.data
      } else {
        throw Error(response.statusText)
      }
    })
    .catch(function (error) {
      console.log('action error')
      dispatch(applicationIsLoading(false))
      return error
      // dispatch(applicationHasErrored(true))
    })
  }
}

  

