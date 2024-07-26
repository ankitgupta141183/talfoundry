import axios from 'axios';
// import {env} from '../constants/common';
import {REACT_APP_BASE_URL} from '../constants/common'

export function forgetStep(value) {
  return {
      type: "FORGET_STEP",
      payload: value
  }
}

export function resetStep(value) {
  return {
      type: "RESET_STEP",
      payload: value
  }
}

export function applicationIsLoading(bool) {
  return {
    type: 'APPLICATION_IS_LOADING',
    isLoading: bool
  }
}

export function sendConfrimationLink(data){
  return (dispatch) => {
    return axios.post(REACT_APP_BASE_URL + '/forgot_password', data)
    .then(
      response => {
        // dispatch(signupIsLoading(false))
        return response
      }
    )
    .catch(
      error => {
          console.log(error)
          return error
      }
    )
  }
}

export function resetPasswordAction(data){
  return (dispatch) => {
    return axios.post(REACT_APP_BASE_URL + '/reset_password', data)
    .then(
      response => {
        // dispatch(signupIsLoading(false))
        return response
      }
    )
    .catch(
      error => {
          console.log(error)
          return error
      }
    )
  }
}


export function sendVerificationEmail(){
  return (dispatch) => {
    return axios.get(REACT_APP_BASE_URL + '/send_verification_email')
    .then(
      response => {
        // dispatch(signupIsLoading(false))
        return response
      }
    )
    .catch(
      error => {
          console.log(error)
          return error
      }
    )
  }
}


export function verifyCode(code){
  return (dispatch) => {
    return axios.get(REACT_APP_BASE_URL + `/verify_code?code=${code}`)
    .then(
      response => {
        if(response.status === 200){
          return {
            verified: true, 
            message:  ''
          }  
        }
        if(response.status === 401) {
          return {
            verified: false,
          }
        }

        
      }
    )
    .catch(
      error => {
          console.log(error)
          return {
            verified: false, 
          }
      }
    )
  }
}
    


export function resetQuestion(data){
  return (dispatch) => {
    dispatch(applicationIsLoading(true))
    return axios({
      method: "post",
      url: REACT_APP_BASE_URL + '/reset_security_question',
      headers: {
        'content-Type': 'application/json',
        Authorization: localStorage.getItem("accessToken"),
      },
      data: data
    })
    .then(
      response => {
        dispatch(applicationIsLoading(false))
        if(response.status === 200) {
          return {
            error: false
          }

        }
        else {
          return {
            error: true
          }

        }

      }
    )
    .catch(
      error => {
          console.log(error)
          dispatch(applicationIsLoading(false))
          return {
            error: true
          }
      }
    )
  }
}