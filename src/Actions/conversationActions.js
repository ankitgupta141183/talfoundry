import axios from 'axios';
// import {env} from '../constants/common';
import {REACT_APP_BASE_URL} from '../constants/common'

import { applicationIsLoading } from './jobCreateAndUpdateActions';

export function createConversation(data) {
  return dispatch => {
    dispatch(applicationIsLoading(true))
    return axios({
      method: "post",
      url: REACT_APP_BASE_URL + `/conversations`,
      headers: {
        Authorization: localStorage.getItem("accessToken"),
        "content-type": "application/json"
      },
      data: {conversation: data}
    })
    .then((response) => {
      if(response.status === 204 || response.status === 200 || response.status === 201) {
        dispatch(applicationIsLoading(false))
        // dispatch(getSavedJobsForFreelancer())
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

export function conversationsFetchDataSuccess(data) {
  return {
    type: 'CONVERSATION_FETCH_DATA_SUCCESS',
    data
  }
}

export function getConversations(){
  return (dispatch) => {
    // dispatch(applicationIsLoading(true))
    return axios({
      method: "get",
      url: REACT_APP_BASE_URL + `/conversations`,
      headers: {
        Authorization: localStorage.getItem("accessToken"),
        "content-type": "multipart/form-data"
      }
    })
    .then(
      response => {
        dispatch(applicationIsLoading(false))
        return response.data
      }
    )
    .then(data => {
      dispatch(conversationsFetchDataSuccess(data))
      return data
    })
    .catch(
      error => {
        dispatch(applicationIsLoading(false))
        return error
      }
    )
  }
}

export function createMessage(data) {
  return dispatch => {
    dispatch(applicationIsLoading(true))
    return axios({
      method: "post",
      url: REACT_APP_BASE_URL + `/messages`,
      // headers: {
      //   Authorization: localStorage.getItem("accessToken"),
      //   "content-type": "application/json"
      // },
      data: {message: data}
    })
    .then((response) => {
      if(response.status === 204 || response.status === 200 || response.status === 201) {
        dispatch(applicationIsLoading(false))
        // dispatch(getSavedJobsForFreelancer())
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
}}

export function updateConversation(id) {
  return (dispatch) => {
    dispatch(applicationIsLoading(true))
    return axios({
      method: "put",
      url: REACT_APP_BASE_URL + `/conversations/${id}`,
      // headers: {
      //   'content-Type': 'application/json',
      //   Authorization: localStorage.getItem("accessToken"),
      // },
      // data: data
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

export function getConversation(id){
  return (dispatch) => {
    dispatch(applicationIsLoading(true))
    return axios({
      method: "get",
      url: REACT_APP_BASE_URL +  `/conversations/get_conversation?id=${id}`,
      headers: {
        Authorization: localStorage.getItem("accessToken"),
        "content-type": "multipart/form-data"
      }
    })
    .then(
      response => {
        // dispatch(signupIsLoading(false))
        if (response.status !== 200) {
          // console.log(response)
        }
        return response.data
      }
    )
    .then(data => {
      dispatch(applicationIsLoading(false))
      dispatch(conversationsFetchDataSuccess(data))
      return data
    })
    .catch(
      error => {
        console.log(error)
        dispatch(applicationIsLoading(false))
        // dispatch(applicationHasErrored(true))
        return error
      }
    )
  }
}
