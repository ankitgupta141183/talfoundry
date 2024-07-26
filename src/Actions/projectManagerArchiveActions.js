import axios from 'axios';
// import {env} from '../constants/common';
import {REACT_APP_BASE_URL} from '../constants/common'
import {applicationIsLoading} from './signUpActions';

export function addAnArchive(id,status) {
  let param = {job_application: {archived_at: null, unarchived_at: new Date(), status: status}}
  if(status === 'archived'){
    param = {job_application: {archived_at: new Date(), unarchived_at: null, status: status}}
  }
  return (dispatch) => {
    dispatch(applicationIsLoading(true))
    return axios({
      method: "put",
      url: REACT_APP_BASE_URL + `/job_applications/${id}`,
      data: param
    }).then(response => {
        dispatch(applicationIsLoading(false))
        if (![200, 204].includes(response.status)) {
          console.log(response)
        }
        return response
    }).catch((error) => {
      dispatch(applicationIsLoading(false))
      console.log(error)
    })
  }
}

export function archiveDetailsFetchDataSuccess(archives) {
  return {
    type: 'ARCHIVE_DETAILS_FETCH_DATA_SUCCESS',
    archives
  }
}

export function getArchives(){
  return (dispatch) => {
    dispatch(applicationIsLoading(true))
    axios({
      method: "get",
      url: REACT_APP_BASE_URL + `/get_archived_proposals`,
      headers: {
        Authorization: localStorage.getItem("accessToken"),
        "content-type": "multipart/form-data"
      }
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
    .then(archives => {
      dispatch(applicationIsLoading(false))
      dispatch(archiveDetailsFetchDataSuccess(archives))
    })
    .catch(
      error => {
        console.log(error)
        dispatch(applicationIsLoading(false))
        return error
      }
    )
  }
}

export function archiveMDetailsFetchDataSuccess(managerArchives) {
  return {
    type: 'ARCHIVE_MANAGER_DETAILS_FETCH_DATA_SUCCESS',
    managerArchives
  }
}


export function getManagerArchives(type){
  let url = REACT_APP_BASE_URL + `/get_all_proposals`
  if(type !== ''){
    url = REACT_APP_BASE_URL + `/get_all_proposals`
    //?proposal=${type}
  }
  return (dispatch) => {
    dispatch(applicationIsLoading(true))
    axios({
      method: "get",
      url: url,
      headers: {
        Authorization: localStorage.getItem("accessToken"),
        "content-type": "multipart/form-data"
      }
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
    .then(managerArchives => {
      dispatch(applicationIsLoading(false))
      dispatch(archiveMDetailsFetchDataSuccess(managerArchives))
    })
    .catch(
      error => {
        console.log(error)
        dispatch(applicationIsLoading(false))
        return error
      }
    )
  }
}

export function invitationMDetailsFetchDataSuccess(managerInvitation) {
  return {
    type: 'INVITATION_MANAGER_DETAILS_FETCH_DATA_SUCCESS',
    managerInvitation
  }
}


export function getManagerInvitation(type){
  let url = REACT_APP_BASE_URL + `/project_managers/sent_invitations`
  
  return (dispatch) => {
    dispatch(applicationIsLoading(true))
    return axios({
      method: "get",
      url: url,
      headers: {
        Authorization: localStorage.getItem("accessToken"),
        "content-type": "multipart/form-data"
      }
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
    .then(managerInvitation => {
      dispatch(applicationIsLoading(false))
      dispatch(invitationMDetailsFetchDataSuccess(managerInvitation))
      return managerInvitation
    })
    .catch(
      error => {
        console.log(error)
        dispatch(applicationIsLoading(false))
        return error
      }
    )
  }
}