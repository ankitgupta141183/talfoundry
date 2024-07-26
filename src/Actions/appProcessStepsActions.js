import axios from 'axios';
// import {env} from '../constants/common';
import {REACT_APP_BASE_URL} from '../constants/common'
import {setCurrentUser} from '../Actions/loginActions'; 
import jwtdecode from 'jwt-decode';

export function addAppProcessStep1(value) {
  return {
      type: "ADD_PROCESS_1",
      payload: value
  }
}

export function addAppProcessStep2(value) {
  return {
      type: "ADD_PROCESS_2",
      payload: value
  }
}

export function addDataCategoryDescription(value) {
  return {
      type: "ADD_DATA_CATEGORY_DESCRIPTION",
      payload: value
  }
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


export function submitAppForCall(data) {
  return dispatch => {
    dispatch(applicationIsLoading(true))
    return axios({
      method: "post",
      url: REACT_APP_BASE_URL + `/profiles`,
      headers: {
        Authorization: localStorage.getItem("accessToken"),
        "content-type": "application/json"
      },
      data: data
    })
    .then((response) => {
      if(response.status === 204 || response.status === 200 || response.status === 201) {
        if(response.data.token) {
          localStorage.removeItem('accessToken')
          localStorage.setItem('accessToken', response.data.token)
          dispatch(setCurrentUser(jwtdecode(response.data.token)))
        }

        dispatch(applicationIsLoading(false))
        return response
      } else if (response.data.status === 400) {
        dispatch(applicationIsLoading(false))
        return response.data
      } else {
        dispatch(applicationIsLoading(false))
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

export function scheduleACall(data) {
  return dispatch => {
    dispatch(applicationIsLoading(true))
    return axios({
      method: "post",
      url: REACT_APP_BASE_URL + `/interview_call_schedule`,
      headers: {
        Authorization: localStorage.getItem("accessToken"),
        "content-type": "multipart/form-data"
      },
      data: data
    })
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

export function submitSecurityQuestions(data) {
  return dispatch => {
    dispatch(applicationIsLoading(true))
    return axios({
      method: "post", 
      url: REACT_APP_BASE_URL + `/users/create_security_questions`,
      // headers: {
      //   Authorization: localStorage.getItem("accessToken"),
      //   "content-type": "multipart/form-data"
      // },
      data: data
    })
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