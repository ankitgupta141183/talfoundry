import axios from 'axios';
// import {env} from '../constants/common';
import {REACT_APP_BASE_URL} from '../constants/common'
import { applicationHasErrored, applicationIsLoading } from './AdminActions';


export function GetRoleAndPermissions() {
    return dispatch => {
      dispatch(applicationIsLoading(true))
      return axios({
        method: "get",
        url: REACT_APP_BASE_URL + `/roles_and_permissions`,
      })
      .then(
        response => {
          // dispatch(signupIsLoading(false))
          if (response.status !== 200) {
            console.log(response)
          }
          return {status : response.status , data : response.data}
        }
      )
      .then(data => {
        // dispatch(applicatio (false))  
        return data
      })
      .catch(
        error => {
          dispatch(applicationIsLoading(false))
          dispatch(applicationHasErrored(true))
          return {status  : 401 , message: error.message}
        }
      )
    }
  }

  export function GetRoleAndPermissionsByID(id) {
    return dispatch => {
      dispatch(applicationIsLoading(true))
      return axios({
        method: "get",
        url: REACT_APP_BASE_URL + `/roles_and_permissions/${id}`,
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
        // dispatch(applicatio (false))  
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

  export function RolePermissionEdit(id , data){
    return dispatch => {
      dispatch(applicationIsLoading(true))
      return axios({
        method: "put",
        url: REACT_APP_BASE_URL + `/roles_and_permissions/${id}`,
        data : data
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
        // dispatch(applicatio (false))  
        console.log(data , "fetch data");
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