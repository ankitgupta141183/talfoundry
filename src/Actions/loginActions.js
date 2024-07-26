import axios from 'axios';
// import {env} from '../constants/common';
import {REACT_APP_BASE_URL} from '../constants/common'

export function isAuthenticated(bool) {
  return {
    type: 'IS_AUTHENTICATED',
    isAuthenticated: bool
  } 
}
export function setCurrentUser(user) {
  return {
    type: 'SET_CURRENT_USER',
    currentUser: user
  }
}

export function adminLoginAction(data){
    return (dispatch) => {
      return axios.post(REACT_APP_BASE_URL + '/admin_login', data)
      .then(
        response => {
          localStorage.removeItem('accessToken')
          localStorage.setItem('accessToken', response.data.token)
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

export function loginAction(data){
    return (dispatch) => {
      return axios.post(REACT_APP_BASE_URL + '/login', data)
      .then(
        response => {
          localStorage.setItem('accessToken', response.data.token)

          if(data && data.values){
 
           if(data && data.get('rememberMe') === "true"){
            let userData = {}
            // let oldItems;

            userData = {
              email: data.get('email'),
              password: data.get('password')
            }
            if (localStorage.getItem("userData") === null) {
              localStorage.setItem('userData', JSON.stringify(userData))    
            }
            else {
              localStorage.removeItem('userData')
              localStorage.setItem('userData', JSON.stringify(userData))
            }
           }
          // dispatch(signupIsLoading(false))          
         }
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

export function firstLoginAction(data){
  return (dispatch) => {
    return axios.get(REACT_APP_BASE_URL + `/user_full_name?email=${data.email}`)
    .then(
      response => {
        return response
      }
    )
    .catch(
      error => {
        return error
      }
    )
  }
}

export function socialLoginAction(data){
    return (dispatch) => {
      return axios.post(REACT_APP_BASE_URL + '/social_login', data)
      .then(
        response => {
          console.log("--social------",response)
          // localStorage.setItem('accessToken', response.data.token)

         //  if(data && data.values){
 
         //   if(data && data.get('rememberMe') === "true"){
         //    let userData = {}
         //    // let oldItems;

         //    userData = {
         //      email: data.get('email'),
         //      password: data.get('password')
         //    }
         //    if (localStorage.getItem("userData") === null) {
         //      localStorage.setItem('userData', JSON.stringify(userData))    
         //    }
         //    else {
         //      localStorage.removeItem('userData')
         //      localStorage.setItem('userData', JSON.stringify(userData))
         //    }
         //   }
         //  // dispatch(signupIsLoading(false))          
         // }
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