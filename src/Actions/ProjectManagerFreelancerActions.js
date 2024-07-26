import axios from 'axios';
import {REACT_APP_BASE_URL} from '../constants/common'
import {applicationIsLoading, applicationHasErrored} from './signUpActions';
import {applicationIsChangeLoading} from './freelancerJobActions';

export function FLToInviteFetchDataSuccess(freelancers) {
  return {
    type: 'FL_TO_FETCH_DATA_SUCCESS',
    freelancers
  }
}

export function InvitedFLFetchDataSuccess(freelancers) {
  return {
    type: 'INVITED_FL_FETCH_DATA_SUCCESS',
    freelancers
  }
}

export function FLToReviewFetchDataSuccess(freelancers) {
  return {
    type: 'REVIEW_FL_FETCH_DATA_SUCCESS',
    freelancers
  }
}

export function FLToHireFetchDataSuccess(freelancers) {
  return {
    type: 'HIRE_FL_FETCH_DATA_SUCCESS',
    freelancers
  }
}

export function getSavedFreelancerFetchDataSuccess(freelancers) {
  return {
    type: 'GET_SAVED_FREELANCER_FETCH_DATA_SUCCESS',
    freelancers
  }
}

export function getHiredFreelancerFetchDataSuccess(hireFreelancers) {
  return {
    type: 'GET_HIRED_FREELANCER_FETCH_DATA_SUCCESS',
    hireFreelancers
  }
}

export function getAllJobPostingsFetchDataSuccess(allPosts) {
  return {
    type: 'GET_ALL_JOB_POSTINGS_FETCH_DATA_SUCCESS',
    allPosts
  }
}

export function HireFreelancerDetailsFetchDataSuccess(hireFreelancer) {
  return {
    type: 'HIRE_FREELANCER_DETAILS_FETCH_DATA_SUCCESS',
    hireFreelancer
  }
}

export function getFreelancersHired(id){
  return (dispatch) => {
    dispatch(applicationIsLoading(true))
    return axios({
      method: "get",
      url: REACT_APP_BASE_URL + `/jobs/${id}/hired_freelancer`,
      headers: {
        Authorization: localStorage.getItem("accessToken"),
        "content-type": "multipart/form-data"
      }
    })
    .then(
      response => {
        if (response.status !== 200) {
          console.log(response)
        }
        return response.data
      }
    )
    .then(freelancers => {
      dispatch(applicationIsLoading(false))
      dispatch(FLToHireFetchDataSuccess(freelancers))
      return freelancers
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


export function getFreelancersToInviteForJobPage(id, search){
  return (dispatch) => {
    axios({
      method: "get",
      url: REACT_APP_BASE_URL + `/jobs/${id}/job_related_freelancer?search=${search || ""}`,
      headers: {
        Authorization: localStorage.getItem("accessToken"),
        "content-type": "multipart/form-data"
      }
    })
    .then(
      response => {
        if (response.status !== 200) {
          console.log(response)
        }
        return response.data
      }
    )
    .then(freelancers => {
      dispatch(FLToInviteFetchDataSuccess(freelancers))
    })
    .catch(
      error => {
        console.log(error)
        return error
      }
    )
  }
}

export function getFreelancersToMatcheSkills(id, search){
  return (dispatch) => {
    dispatch(applicationIsLoading(true))
    axios({
      method: "get",
      url: REACT_APP_BASE_URL + `/get_freelancer_by_skills`,
      params : {skill : search} ,
      headers: {
        Authorization: localStorage.getItem("accessToken"),
        "content-type": "multipart/form-data"
      }
    })
    .then(
      response => {
        if (response.status !== 200) {
          console.log(response)
        }
        dispatch(applicationIsLoading(false))
        return response.data
      }
    )
    .then(freelancers => {
      dispatch(FLToInviteFetchDataSuccess(freelancers))
      dispatch(applicationIsLoading(false))
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

export function getFreelancersToInvite(id, search){
  return (dispatch) => {
    dispatch(applicationIsLoading(true))
    axios({
      method: "get",
      url: REACT_APP_BASE_URL + `/jobs/${id}/job_related_freelancer?search=${search || ""}`,
      headers: {
        Authorization: localStorage.getItem("accessToken"),
        "content-type": "multipart/form-data"
      }
    })
    .then(
      response => {
        if (response.status !== 200) {
          console.log(response)
        }
        dispatch(applicationIsLoading(false))
        return response.data
      }
    )
    .then(freelancers => {
      dispatch(FLToInviteFetchDataSuccess(freelancers))
      dispatch(applicationIsLoading(false))
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

export function getFreelancersToReview(id){
  return (dispatch) => {
    axios({
      method: "get",
      url: REACT_APP_BASE_URL + `/jobs/${id}/get_job_proposals`,
      headers: {
        Authorization: localStorage.getItem("accessToken"),
        "content-type": "multipart/form-data"
      }
    })
    .then(
      response => {
        if (response.status !== 200) {
          console.log(response)
        }
        return response.data
      }
    )
    .then(freelancers => {
      dispatch(FLToReviewFetchDataSuccess(freelancers))
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

export function getSavedFreelancerForHiringmanager(){
  return (dispatch) => {
    dispatch(applicationIsLoading(true))
    return axios({
      method: "get",
      url: REACT_APP_BASE_URL + `/project_managers/favorited_freelancers`,
    })
    .then(
      response => {
        if (response.status !== 200) {
          console.log(response)
        }
        return response.data
      }
    )
    .then(freelancers => {
      dispatch(applicationIsLoading(false))
      dispatch(getSavedFreelancerFetchDataSuccess(freelancers))
      return freelancers
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

export function getHireFreelancerForHiringmanager(searchItem){
  return (dispatch) => {
    dispatch(applicationIsLoading(true))
    return axios({
      method: "get",
      url: REACT_APP_BASE_URL + `/jobs/get_all_hired_freelancers`,
    })
    .then(
      response => {
        if (response.status !== 200) {
          console.log(response)
        }
        return response.data
      }
    )
    .then(hireFreelancers => {
      dispatch(applicationIsLoading(false))
      dispatch(getHiredFreelancerFetchDataSuccess(hireFreelancers))
      return hireFreelancers
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

export function getManagerDashboardSuccess(managerDashboard) {
  return {
    type: 'GET_MANAGER_DASHBOARD_FETCH_DATA_SUCCESS',
    managerDashboard
  }
}


export function getManagerDashboard(activeTab){
  return (dispatch) => {
    dispatch(applicationIsChangeLoading(true))
    return axios({
      method: "get",
      url: REACT_APP_BASE_URL + `/jobs/manager_dashboard?status=${activeTab}`,
    })
    .then(
      response => {
        if (response.status !== 200) {
          console.log(response)
        }
        return response.data.data
      }
    )
    .then(managerDashboard => {
      dispatch(applicationIsChangeLoading(false))
      dispatch(getManagerDashboardSuccess(managerDashboard))
      return managerDashboard
    })
    .catch(
      error => {
        console.log(error)
        dispatch(applicationIsChangeLoading(false))
        dispatch(applicationHasErrored(true))
        return error
      }
    )
  }
}

export function getMyJobs(activeTab){
  return (dispatch) => {
    dispatch(applicationIsChangeLoading(true))
    return axios({
      method: "get",
      url: REACT_APP_BASE_URL + `/jobs/jobs_by_status?status=${activeTab}&filter={}`,
    })
    .then(
      response => {
        if (response.status !== 200) {
          console.log(response)
        }
        return response.data
      }
    )
    .then(managerDashboard => {
       setTimeout(function() { //Start the timer
            dispatch(applicationIsChangeLoading(false))
        }.bind(this), 1000)
      // dispatch(getManagerDashboardSuccess(managerDashboard))
      return managerDashboard
    })
    .catch(
      error => {
        console.log(error)
        dispatch(applicationIsChangeLoading(false))
        dispatch(applicationHasErrored(true))
        return error
      }
    )
  }
}

export async function getAllJobPostings(searchItem){
  return (dispatch) => {
    dispatch(applicationIsLoading(true))
    return axios({
      method: "get",
      url: REACT_APP_BASE_URL + `/jobs/get_all_jobs?search=${searchItem}`,
    })
    .then(
      response => {
        if (response.status !== 200) {
          console.log(response)
        }
        return response.data
      }
    )
    .then(allPosts => {
      dispatch(applicationIsLoading(false))
      dispatch(getAllJobPostingsFetchDataSuccess(allPosts))
      return allPosts
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

export function searchAndfilterJobPostings(searchItem,filters, page){
  return (dispatch) => {
    dispatch(applicationIsLoading(true))
    return axios({
      method: "get",
      params: {
        search: searchItem || '',
        filters: filters || {},
        page: page || 1,
      },
      url: REACT_APP_BASE_URL + `/jobs/get_all_jobs`,
    })
    .then(
      response => {
        if (response.status !== 200) {
          console.log(response)
        }
        return response.data
      }
    )
    .then(allPosts => {
      dispatch(getAllJobPostingsFetchDataSuccess(allPosts))
      dispatch(applicationIsLoading(false))
      return allPosts
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

export function getInvitedFreelancers(id){
  return (dispatch) => {
    dispatch(applicationIsLoading(true))
    axios({
      method: "get",
      url: REACT_APP_BASE_URL + `/jobs/${id}/invited_freelancer`,
      headers: {
        Authorization: localStorage.getItem("accessToken"),
        "content-type": "multipart/form-data"
      }
    })
    .then(
      response => {
        if (response.status !== 200) {
          console.log(response)
        }
        dispatch(applicationIsLoading(false))
        return response.data
      }
    )
    .then(freelancers => {
      dispatch(applicationIsLoading(false))
      dispatch(InvitedFLFetchDataSuccess(freelancers))
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

export function getHireFreelancerDetails(id, jobUuid){
  return (dispatch) => {
    dispatch(applicationIsLoading(true))
    axios({
      method: "get",
      url: REACT_APP_BASE_URL + `/hire_freelancer_details/${id}?job_uuid=${jobUuid}`,
    })
    .then(
      response => {
        if (response.status !== 200) {
          console.log(response)
        }
        return response.data
      }
    )
    .then(hireFreelancer => {
      dispatch(applicationIsLoading(false))
      dispatch(HireFreelancerDetailsFetchDataSuccess(hireFreelancer))
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

export function ActiveHireFreelancerFetchDataSuccess(freelancers) {
  return {
    type: 'ACTIVE_HIRE_FREELANCER_DETAILS_FETCH_DATA_SUCCESS',
    freelancers
  }
}

export function getActiveHiredFreelancers(id){
  return (dispatch) => {
    dispatch(applicationIsLoading(true))
    return axios({
      method: "get",
      url: REACT_APP_BASE_URL + `/jobs/${id}/get_job_active_contract`,
    })
    .then(
      response => {
        if (response.status !== 200) {
          console.log(response)
        }
        return response.data
      }
    )
    .then(freelancers => {
      dispatch(applicationIsLoading(false))
      dispatch(ActiveHireFreelancerFetchDataSuccess(freelancers))
      return freelancers
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

export function hireAFreelancer(data) {
  return (dispatch) => {
    dispatch(applicationIsLoading(true))
    return axios({
      method: "post",
      url: REACT_APP_BASE_URL + `/contract`,
      data: data
    }).then(response => {
        dispatch(applicationIsLoading(false))
        if (![200, 204].includes(response.status)) {
          console.log(response)
        }
        return response
    }).then(res => {
      return res
    }).catch((error) => {
      console.log(error)
    })
  }
}

export function HMContractsFetchDateSuccess(data) {
  return {
    type: 'HM_CONTRACTS_FETCH_DATA_SUCCESS',
    data
  }
}

export function getContractsForHiringManager(page, search, activeTab){
  return (dispatch) => {
    dispatch(applicationIsLoading(true))
  return axios({
      method: "get",
      url: REACT_APP_BASE_URL + `/manager_active_contracts?page=${page}&search=${search}&status=${activeTab}`,
      headers: {
        Authorization: localStorage.getItem("accessToken"),
        "content-type": "multipart/form-data"
      }
    })
    .then(
      response => {
        if (response.status !== 200) {
          console.log(response)
        }
        return response.data
      }
    )
    .then(data => {
      dispatch(applicationIsLoading(false))
      dispatch(HMContractsFetchDateSuccess(data))
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


export function searchContractsForHiringManager(search){
  return (dispatch) => {
    dispatch(applicationIsLoading(true))
    axios({
      method: "get",
      url: REACT_APP_BASE_URL + `/manager_active_contracts?search=${search}`,
      headers: {
        Authorization: localStorage.getItem("accessToken"),
        "content-type": "multipart/form-data"
      }
    })
    .then(
      response => {
        if (response.status !== 200) {
          console.log(response)
        }
        return response.data
      }
    )
    .then(data => {
      dispatch(applicationIsLoading(false))
      dispatch(HMContractsFetchDateSuccess(data))
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
export function ContractDetailsForHMFetchDataSuccess(contract) {
  return {
    type: 'CONTRACT_DETAILS_FOR_HM_FETCH_DATA_SUCCESS',
    contract
  }
}

export function fetchContractDetailsForHM(id) {
  return (dispatch) => {
    dispatch(applicationIsLoading(true))
    axios({
      method: "get",
      url: REACT_APP_BASE_URL + `/contract/${id}`,
      headers: {
        Authorization: localStorage.getItem("accessToken"),
        "content-type": "multipart/form-data"
      }
    })
    .then(
      response => {
        if (response.status !== 200) {
          console.log(response)
        }
        return response.data
      }
    )
    .then(contract => {
      dispatch(ContractDetailsForHMFetchDataSuccess(contract))
      dispatch(applicationIsLoading(false))
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

export function updateUser(uuid, data){
  return (dispatch) => {
    dispatch(applicationIsLoading(true))
    return axios({
      method: "put",
      url: REACT_APP_BASE_URL + `/users/${uuid}`,
      headers: {
        'content-Type': 'application/json',
        Authorization: localStorage.getItem("accessToken"),
      },
      data: data
    })
    .then(
      response => {
        // dispatch(applicationIsLoading(false))
        return response
      }
    )
    .catch(
      error => {
          console.log(error)
          // dispatch(applicationIsLoading(false))
          return error
      }
    )
  }
}

export function updatePMPassword(uuid, data){
  return (dispatch) => {
    dispatch(applicationIsLoading(true))
    return axios({
      method: "patch",
      url: REACT_APP_BASE_URL + `/update_password/${uuid}`,
      headers: {
        'content-Type': 'application/json',
        Authorization: localStorage.getItem("accessToken"),
      },
      data: data
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

export function transHistory(startDate='', endDate='', transactionType='', clientName='') {
  return dispatch => {
    dispatch(applicationIsLoading(true))
    return axios({
      method: "GET",
      url: REACT_APP_BASE_URL + `/transaction_history?start_date=${startDate}&end_date=${endDate}&transaction_type=${transactionType}&client_name=${clientName}`,
    })
    .then((response) => {
      if(response.status === 204 || response.status === 200) {
        return response.data
      } else if (response.data.status === 400) {
        return response.data
      } else {
        throw Error(response.statusText)
      }
    }).catch(function (error) {
      console.log('action error')
    })
  }
}




export function removePayMethod(account_type) {
  return dispatch => {
    dispatch(applicationIsLoading(true))
    return axios({
      method: "GET",
      url: REACT_APP_BASE_URL + `/payments/remove_payment_method?account_type=${account_type}`,
      
    })
    .then((response) => {
      
      if(response.status === 204 || response.status === 200) {
        return response
      } else if (response.data.status === 400) {
        return response.data
      } else {
        throw Error(response.statusText)
      }
    }).then((res) => {
      if (res.data.success) {
        console.log(res)
      }
      return res
    })
    .catch(function (error) {
      console.log('action error')
    })
  }
}


export function setPaymentMethod(account_type){
  return (dispatch) => {
    dispatch(applicationIsLoading(true))
    return axios({
      method: "post",
      url: REACT_APP_BASE_URL + `/payments/set_payment_method?account_type=${account_type}`,
    })
    .then(
      response => {
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


export function approvePayment(data) {
  const details = {
    requested_payments: data
  }
  return dispatch => {
    dispatch(applicationIsLoading(true))
    return axios({
      method: "post",
      url: REACT_APP_BASE_URL + `/payments/approve_payment`,
      headers: {
        Authorization: localStorage.getItem("accessToken"),
        'content-Type': 'application/json'
      },
     data: details
    })
    .then((response) => {
      dispatch(applicationIsLoading(false))
      if(response.status === 204 || response.status === 200) {
        return response
      } else if (response.data.status === 400) {
        return response.data
      } else {
        throw Error(response.statusText)
      }
    }).then((res) => {
      if (res.data.success) {
        dispatch(applicationIsLoading(false))
      }
      return res
    })
    .catch(function (error) {
      console.log('action error')
    })
  }
}


export function payContract(data) {
  return dispatch => {
    dispatch(applicationIsLoading(true))
    return axios({
      method: "post",
      url: REACT_APP_BASE_URL + `/payments/request_changes`,
      headers: {
        Authorization: localStorage.getItem("accessToken"),
        'content-Type': 'application/json'
      },
     data: data
    })
    .then((response) => {
      dispatch(applicationIsLoading(false))
      if(response.status === 204 || response.status === 200) {
        return response
      } 
      else {
        throw Error(response.statusText)
      }
    }).then((res) => {
      if (res.data.success) {
        dispatch(applicationIsLoading(false))
      }
      return res
    })
    .catch(function (error) {
      console.log('action error')
    })
  }
}




