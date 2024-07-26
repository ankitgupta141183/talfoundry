import axios from 'axios';
// import {env} from '../constants/common';
import {REACT_APP_BASE_URL} from '../constants/common'

import {applicationIsLoading} from './freelancerActions';

export function responseToInvitation(id, data) {
  return (dispatch) => {
    dispatch(applicationIsLoading(true))
    return axios({
      method: "put",
      url: REACT_APP_BASE_URL + `/invite/${id}`,
      // headers: {
      //   Authorization: localStorage.getItem("accessToken"),
      //   "content-type": "multipart/form-data"
      // },
      data: data
    }).then(response => {
        // dispatch(signupIsLoading(false))
        dispatch(applicationIsLoading(false))
        if (![200, 204].includes(response.status)) {
          console.log(response)
        } 
        // else {
        //   dispatch(getAllFreelancers())
        //   dispatch(fetchFreelancer(id))
        // }
        return response
    }).then(res => {
      return res
    }).catch((error) => {
      dispatch(applicationIsLoading(false))
      console.log(error)
    })
  }
}

export function submitProposal(data) {
  return dispatch => {
    dispatch(applicationIsLoading(true))
    return axios({
      method: "post",
      url: REACT_APP_BASE_URL + `/job_applications`,
      // headers: {
      //   Authorization: localStorage.getItem("accessToken"),
      //   "content-type": "application/json"
      // },
      data: data
    })
    .then((response) => {
      if(response.status === 204 || response.status === 200 || response.status === 201) {
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