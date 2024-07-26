import axios from 'axios';
// import {env} from '../constants/common';
import {REACT_APP_BASE_URL} from '../constants/common'
import { applicationHasErrored, applicationIsLoading } from './AdminActions';



export function Fetch_Platform(platform) {
    return dispatch => {
      dispatch(applicationIsLoading(true))
      return axios({
        method: "get",
        url: REACT_APP_BASE_URL + `/platforms/?type=${platform}`,
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


  export function AdminTechDelete(id){
    return dispatch => {
      dispatch(applicationIsLoading(true))
      return axios({
        method: "delete",
        url: REACT_APP_BASE_URL + `/platforms/${id}`,

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
  

  export function AdminTechEdit(id , data){
    return dispatch => {
      dispatch(applicationIsLoading(true))
      return axios({
        method: "put",
        url: REACT_APP_BASE_URL + `/platforms/${id}`,
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

  export function AdminTechCreate(data){
    return dispatch => {
      dispatch(applicationIsLoading(true))
      return axios({
        method: "post",
        url: REACT_APP_BASE_URL + `/platforms`,
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