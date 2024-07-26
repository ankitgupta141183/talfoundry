import axios from "axios";
// import {env} from '../constants/common';
import { REACT_APP_BASE_URL } from "../constants/common";

import { getSavedJobsForFreelancer } from "./SearchActions";
import { findLastIndex } from "lodash";
import { logOutAction } from "./logOutAction";

export function freelancerProfileFetchDataSuccess(profile) {
  return {
    type: "FREELANCER_PROFILE_FETCH_DATA_SUCCESS",
    profile,
  };
}
export function applicationIsLoading(bool) {
  return {
    type: "APPLICATION_IS_LOADING",
    isLoading: bool,
  };
}
export function applicationHasErrored(bool) {
  return {
    type: "APPLICATION_HAS_ERRORED",
    hasErrored: bool,
  };
}

export function deleteProfileEmployment(id, profileId) {
  return (dispatch) => {
    dispatch(applicationIsLoading(true));
    return axios({
      method: "delete",
      url: REACT_APP_BASE_URL + `/employments/${id}`,
      headers: {
        Authorization: localStorage.getItem("accessToken"),
        "content-type": "multipart/form-data",
      },
    })
      .then((response) => {
        if (response.status === 204 || response.status === 200) {
          return response;
        } else if (response.data.status === 400) {
          return response.data;
        } else {
          throw Error(response.statusText);
        }
      })
      .then((res) => {
        if (res.data.success) {
          dispatch(getProfileForFreelancer(profileId));
        }
        return res;
      })
      .catch(function (error) {
        console.log("action error");
      });
  };
}

export function getOtherFreelancers(id, profileId) {
  return (dispatch) => {
    dispatch(applicationIsLoading(true));
    return axios({
      method: "get",
      url: REACT_APP_BASE_URL + `/get_one_user_of_each_category`,
      headers: {
        Authorization: localStorage.getItem("accessToken"),
        "content-type": "application/json",
      },
    })
      .then((response) => {
        dispatch(applicationIsLoading(false));
        if (response.status === 204 || response.status === 200) {
          return response;
        } else if (response.data.status === 400) {
          return response.data;
        } else {
          throw Error(response.statusText);
        }
      })
      .then((res) => {
        return res;
      })
      .catch(function (error) {
        dispatch(applicationIsLoading(false));
        console.log("action error");
      });
  };
}

export function deleteProfileEducation(id, profileId) {
  return (dispatch) => {
    dispatch(applicationIsLoading(true));
    return axios({
      method: "delete",
      url: REACT_APP_BASE_URL + `/educations/${id}`,
      headers: {
        Authorization: localStorage.getItem("accessToken"),
        "content-type": "multipart/form-data",
      },
    })
      .then((response) => {
        if (response.status === 204 || response.status === 200) {
          return response;
        } else if (response.data.status === 400) {
          return response.data;
        } else {
          throw Error(response.statusText);
        }
      })
      .then((res) => {
        if (res.data.success) {
          dispatch(getProfileForFreelancer(profileId));
        }
        return res;
      })
      .catch(function (error) {
        console.log("action error");
      });
  };
}

export function updateEmployment(data, id) {
  return (dispatch) => {
    dispatch(applicationIsLoading(true));
    return axios({
      method: "put",
      url: REACT_APP_BASE_URL + `/employments/${id}`,
      headers: {
        "content-Type": "application/json",
        Authorization: localStorage.getItem("accessToken"),
      },
      data: data,
    })
      .then((response) => {
        dispatch(applicationIsLoading(false));
        return response;
      })
      .catch((error) => {
        console.log(error);
        dispatch(applicationIsLoading(false));
        return error;
      });
  };
}

export function updateCertificate(data, id) {
  return (dispatch) => {
    dispatch(applicationIsLoading(true));
    return axios({
      method: "put",
      url: REACT_APP_BASE_URL + `/certifications/${id}`,
      headers: {
        "content-Type": "application/json",
        Authorization: localStorage.getItem("accessToken"),
      },
      data: data,
    })
      .then((response) => {
        dispatch(applicationIsLoading(false));
        return response;
      })
      .catch((error) => {
        console.log(error);
        dispatch(applicationIsLoading(false));
        return error;
      });
  };
}

export function updateEducation(data, id) {
  return (dispatch) => {
    dispatch(applicationIsLoading(true));
    return axios({
      method: "put",
      url: REACT_APP_BASE_URL + `/educations/${id}`,
      headers: {
        "content-Type": "application/json",
        Authorization: localStorage.getItem("accessToken"),
      },
      data: data,
    })
      .then((response) => {
        dispatch(applicationIsLoading(false));
        return response;
      })
      .catch((error) => {
        console.log(error);
        dispatch(applicationIsLoading(false));
        return error;
      });
  };
}

export function updateNotification(id) {
  return (dispatch) => {
    dispatch(applicationIsLoading(true));
    return axios({
      method: "put",
      url: REACT_APP_BASE_URL + `/notifications/${id}`,
    })
      .then((response) => {
        dispatch(applicationIsLoading(false));
        return response;
      })
      .catch((error) => {
        console.log(error);
        dispatch(applicationIsLoading(false));
        return error;
      });
  };
}

export function deleteNotification(id) {
  return (dispatch) => {
    // dispatch(applicationIsLoading(true));
    return axios({
      method: "delete",
      url: REACT_APP_BASE_URL + `/notifications/${id}`,
      // headers: {
      //   'content-Type': 'application/json',
      //   Authorization: localStorage.getItem("accessToken"),
      // },
      // data: data
    })
      .then((response) => {
        // dispatch(applicationIsLoading(false));
        return response;
      })
      .catch((error) => {
        console.log(error);
        // dispatch(applicationIsLoading(false));
        return error;
      });
  };
}

export function deleteProfileCertification(id, profileId) {
  return (dispatch) => {
    dispatch(applicationIsLoading(true));
    return axios({
      method: "delete",
      url: REACT_APP_BASE_URL + `/certifications/${id}`,
      headers: {
        Authorization: localStorage.getItem("accessToken"),
        "content-type": "multipart/form-data",
      },
    })
      .then((response) => {
        if (response.status === 204 || response.status === 200) {
          return response;
        } else if (response.data.status === 400) {
          return response.data;
        } else {
          throw Error(response.statusText);
        }
      })
      .then((res) => {
        if (res.data.success) {
          dispatch(getProfileForFreelancer(profileId));
        }
        return res;
      })
      .catch(function (error) {
        console.log("action error");
      });
  };
}

export function getProfileForFreelancer(id, jobId, isPulic) {
  const decisiveURL = isPulic
    ? REACT_APP_BASE_URL + `/welcome/${id}?freelancer=${true}`
    : REACT_APP_BASE_URL + `/profiles/${id}?job_uuid=${jobId}`;
  return (dispatch) => {
    dispatch(applicationIsLoading(true));
    return axios({
      method: "get",
      url: decisiveURL,
      headers: {
        Authorization: localStorage.getItem("accessToken"),
        "content-type": "multipart/form-data",
      },
    })
      .then((response) => {
        if (response.status !== 200) {
          console.log(response);
        }
        return response.data;
      })
      .then((profile) => {
        dispatch(applicationIsLoading(false));
        dispatch(freelancerProfileFetchDataSuccess(profile));
        return profile;
      })
      .catch((error) => {
        console.log(error);
        dispatch(applicationIsLoading(false));
        return error;
      });
  };
}

export function savedApproveManager(id) {
  return (dispatch) => {
    dispatch(applicationIsLoading(true));
    return axios({
      method: "post",
      url: REACT_APP_BASE_URL + `/favorites?freelancer_id=${id}`,
      // headers: {
      //   Authorization: localStorage.getItem("accessToken"),
      //   "content-type": "application/json"
      // },
      id: id,
    })
      .then((response) => {
        if (
          response.status === 204 ||
          response.status === 200 ||
          response.status === 201
        ) {
          dispatch(applicationIsLoading(false));
          // dispatch(getSavedJobsForFreelancer())
          return response;
        } else if (response.data.status === 400) {
          dispatch(applicationIsLoading(false));
          return response.data;
        } else {
          dispatch(applicationIsLoading(false));
          throw Error(response.statusText);
        }
      })
      .catch(function (error) {
        console.log("action error");
        dispatch(applicationIsLoading(false));
        return error;
        // dispatch(applicationHasErrored(true))
      });
  };
}

export function savedApproveFreelancer(id) {
  return (dispatch) => {
    dispatch(applicationIsLoading(true));
    return axios({
      method: "post",
      url: REACT_APP_BASE_URL + `/favorites?job_id=${id}`,
      // headers: {
      //   Authorization: localStorage.getItem("accessToken"),
      //   "content-type": "application/json"
      // },
      id: id,
    })
      .then((response) => {
        if (
          response.status === 204 ||
          response.status === 200 ||
          response.status === 201
        ) {
          dispatch(applicationIsLoading(false));
          // dispatch(getSavedJobsForFreelancer())
          return response;
        } else if (response.data.status === 400) {
          dispatch(applicationIsLoading(false));
          return response.data;
        } else {
          dispatch(applicationIsLoading(false));
          throw Error(response.statusText);
        }
      })
      .catch(function (error) {
        console.log("action error");
        dispatch(applicationIsLoading(false));
        return error;
        // dispatch(applicationHasErrored(true))
      });
  };
}

export function removeJobsFreelancer(id) {
  return (dispatch) => {
    dispatch(applicationIsLoading(true));
    return axios({
      method: "get",
      url: REACT_APP_BASE_URL + `/remove_favorited?job_id=${id}`,
      // headers: {
      //   Authorization: localStorage.getItem("accessToken"),
      //   "content-type": "application/json"
      // },
      id: id,
    })
      .then((response) => {
        if (
          response.status === 204 ||
          response.status === 200 ||
          response.status === 201
        ) {
          dispatch(applicationIsLoading(false));
          dispatch(getSavedJobsForFreelancer());
          return response;
        } else if (response.data.status === 400) {
          dispatch(applicationIsLoading(false));
          return response.data;
        } else {
          dispatch(applicationIsLoading(false));
          throw Error(response.statusText);
        }
      })
      .catch(function (error) {
        console.log("action error");
        dispatch(applicationIsLoading(false));
        return error;
        // dispatch(applicationHasErrored(true))
      });
  };
}

export function FreelancerJobFetchDataSuccess(job) {
  return {
    type: "FREELANCER_JOB_FETCH_DATA_SUCCESS",
    job,
  };
}

export function JobInvitationFetchDataSuccess(invitation) {
  return {
    type: "JOB_INVITATION_FETCH_DATA_SUCCESS",
    invitation,
  };
}

export function ProposalDetailsFetchDataSuccess(job) {
  return {
    type: "PROPOSAL_DETAILS_FETCH_DATA_SUCCESS",
    job,
  };
}

export function fetchFreelancerJob(id, isPulic) {
  const decisiveURL = isPulic
    ? REACT_APP_BASE_URL + `/welcome/${id}?job=${true}`
    : REACT_APP_BASE_URL + `/jobs/${id}`;
  return (dispatch) => {
    dispatch(applicationIsLoading(true));
    return axios({
      method: "get",
      url: decisiveURL,
      headers: {
        Authorization: localStorage.getItem("accessToken"),
        "content-type": "multipart/form-data",
      },
    })
      .then((response) => {
        dispatch(applicationIsLoading(false));
        if (response.status !== 200) {
          console.log(response);
        }
        return response.data;
      })
      .then((job) => dispatch(FreelancerJobFetchDataSuccess(job)))
      .catch((error) => {
        dispatch(applicationIsLoading(false));
        console.log(error);
        return error;
      });
  };
}

export function fetchProposalDetails(id) {
  return (dispatch) => {
    return axios({
      method: "get",
      url: REACT_APP_BASE_URL + `/job_applications/${id}`,
      headers: {
        Authorization: localStorage.getItem("accessToken"),
        "content-type": "multipart/form-data",
      },
    })
      .then((response) => {
        // dispatch(signupIsLoading(false))
        if (response.status !== 200) {
          console.log(response);
        }
        return response.data;
      })
      .then((job) => dispatch(ProposalDetailsFetchDataSuccess(job)))
      .catch((error) => {
        console.log(error);
        return error;
      });
  };
}

export function fetchJobInvitation(id) {
  return (dispatch) => {
   return axios({
      method: "get",
      url: REACT_APP_BASE_URL + `/invite/${id}`,
      headers: {
        Authorization: localStorage.getItem("accessToken"),
        "content-type": "multipart/form-data",
      },
    })
      .then((response) => {
        // dispatch(signupIsLoading(false))
        if (response.status !== 200) {
          console.log(response);
        }
        return response.data;
      })
      .then((invitation) => dispatch(JobInvitationFetchDataSuccess(invitation)))
      .catch((error) => {
        console.log(error);
        return error;
      });
  };
}

export function JobOfferFetchDataSuccess(offer) {
  return {
    type: "JOB_OFFER_FETCH_DATA_SUCCESS",
    offer,
  };
}

export function fetchJobOffer(id) {
  return (dispatch) => {
    axios({
      method: "get",
      url: REACT_APP_BASE_URL + `/contract/${id}`,
      headers: {
        Authorization: localStorage.getItem("accessToken"),
        "content-type": "multipart/form-data",
      },
    })
      .then((response) => {
        // dispatch(signupIsLoading(false))
        if (response.status !== 200) {
          console.log(response);
        }
        return response.data;
      })
      .then((offer) => dispatch(JobOfferFetchDataSuccess(offer)))
      .catch((error) => {
        console.log(error);
        return error;
      });
  };
}

export function FLInvitesFetchDataSuccess(data) {
  return {
    type: "FL_INVITES_FETCH_DATA_SUCCESS",
    data,
  };
}

export function invitationIsLoading(bool) {
  return {
    type: "INVITATION_IS_LOADING",
    isLoading: bool,
  };
}

export function getInvitationsForFreelancer() {
  return (dispatch) => {
    dispatch(invitationIsLoading(true));
    axios({
      method: "get",
      // url: REACT_APP_BASE_URL + `/get_all_proposals`,
      url: REACT_APP_BASE_URL + `/get_invites`,
      headers: {
        Authorization: localStorage.getItem("accessToken"),
        "content-type": "multipart/form-data",
      },
    })
      .then((response) => {
        // dispatch(signupIsLoading(false))
        if (response.status !== 200) {
          console.log(response);
        }
        return response.data;
      })
      .then((data) => {
        dispatch(invitationIsLoading(false));
        dispatch(FLInvitesFetchDataSuccess(data));
      })
      .catch((error) => {
        console.log(error);
        dispatch(invitationIsLoading(false));
        dispatch(applicationHasErrored(true));
        return error;
      });
  };
}

export function FLSubmittedProposalsFetchDataSuccess(data) {
  return {
    type: "FL_PROPOSALS_FETCH_DATA_SUCCESS",
    data,
  };
}

export function proposalIsLoading(bool) {
  return {
    type: "PROPOSAL_IS_LOADING",
    isLoading: bool,
  };
}

export function getSubmittedProposalsForFreelancer() {
  return (dispatch) => {
    dispatch(proposalIsLoading(true));
    axios({
      method: "get",
      url: REACT_APP_BASE_URL + `/get_submitted_proposals`,
      headers: {
        Authorization: localStorage.getItem("accessToken"),
        "content-type": "multipart/form-data",
      },
    })
      .then((response) => {
        // dispatch(signupIsLoading(false))
        if (response.status !== 200) {
          console.log(response);
        }
        return response.data;
      })
      .then((data) => {
        dispatch(proposalIsLoading(false));
        dispatch(FLSubmittedProposalsFetchDataSuccess(data));
      })
      .catch((error) => {
        console.log(error);
        dispatch(proposalIsLoading(false));
        dispatch(applicationHasErrored(true));
        return error;
      });
  };
}

export function FLOffersFetchDataSuccess(data) {
  return {
    type: "FL_OFFERS_FETCH_DATA_SUCCESS",
    data,
  };
}

export function offerIsLoading(bool) {
  return {
    type: "OFFER_IS_LOADING",
    isLoading: bool,
  };
}

export function getOffersForFreelancer() {
  return (dispatch) => {
    dispatch(offerIsLoading(true));
    axios({
      method: "get",
      url: REACT_APP_BASE_URL + `/get_offers`,
      headers: {
        Authorization: localStorage.getItem("accessToken"),
        "content-type": "multipart/form-data",
      },
    })
      .then((response) => {
        // dispatch(signupIsLoading(false))
        if (response.status !== 200) {
          console.log(response);
        }
        return response.data;
      })
      .then((data) => {
        dispatch(offerIsLoading(false));
        dispatch(FLOffersFetchDataSuccess(data));
      })
      .catch((error) => {
        console.log(error);
        dispatch(offerIsLoading(false));
        dispatch(applicationHasErrored(true));
        return error;
      });
  };
}

export function FLContractsFetchDateSuccess(data) {
  return {
    type: "FL_CONTRACTS_FETCH_DATA_SUCCESS",
    data,
  };
}


export function getContractsForFreelancer(page, search) {
  return (dispatch) => {
    dispatch(applicationIsLoading(true));
    return axios({
      method: "get",
      url: REACT_APP_BASE_URL + `/active_contracts?page=` + page + `&search=` + search,
      headers: {
        Authorization: localStorage.getItem("accessToken"),
        "content-type": "multipart/form-data",
      },
    })
      .then((response) => {
        // dispatch(signupIsLoading(false))
        if (response.status !== 200) {
          console.log(response);
        }
        return response.data;
      })
      .then((data) => {
        dispatch(applicationIsLoading(false));
        dispatch(FLContractsFetchDateSuccess(data));
        return data
      })
      .catch((error) => {
        console.log(error);
        dispatch(applicationIsLoading(false));
        dispatch(applicationHasErrored(true));
        return error;
      });
  };
}

export function searchContractsForFreelancer(search) {
  return (dispatch) => {
    dispatch(applicationIsLoading(true));
    axios({
      method: "get",
      url: REACT_APP_BASE_URL + `/active_contracts?search=${search}`,
      headers: {
        Authorization: localStorage.getItem("accessToken"),
        "content-type": "multipart/form-data",
      },
    })
      .then((response) => {
        // dispatch(signupIsLoading(false))
        if (response.status !== 200) {
          console.log(response);
        }
        return response.data;
      })
      .then((data) => {
        dispatch(applicationIsLoading(false));
        dispatch(FLContractsFetchDateSuccess(data));
      })
      .catch((error) => {
        console.log(error);
        dispatch(applicationIsLoading(false));
        dispatch(applicationHasErrored(true));
        return error;
      });
  };
}

export function ContractDetailsFetchDataSuccess(contract) {
  return {
    type: "CONTRACT_DETAILS_FETCH_DATA_SUCCESS",
    contract,
  };
}

export function fetchContractDetails(id) {
  return (dispatch) => {
    dispatch(applicationIsLoading(true));
    axios({
      method: "get",
      url: REACT_APP_BASE_URL + `/contract/${id}`,
      headers: {
        Authorization: localStorage.getItem("accessToken"),
        "content-type": "multipart/form-data",
      },
    })
      .then((response) => {
        // dispatch(signupIsLoading(false))
        if (response.status !== 200) {
          console.log(response);
        }
        return response.data;
      })
      .then((contract) => {
        dispatch(ContractDetailsFetchDataSuccess(contract));
        dispatch(applicationIsLoading(false));
      })
      .catch((error) => {
        console.log(error);
        dispatch(applicationIsLoading(false));
        return error;
      });
  };
}

export function responseToOffer(id, data) {
  return (dispatch) => {
    dispatch(applicationIsLoading(true));
    return axios({
      method: "put",
      url: REACT_APP_BASE_URL + `/contract/${id}`,
      data: data,
    })
      .then((response) => {
        dispatch(applicationIsLoading(false));
        if (![200, 204].includes(response.status)) {
          console.log(response);
        }
        return response;
      })
      .then((res) => {
        return res;
      })
      .catch((error) => {
        dispatch(applicationIsLoading(false));
        console.log(error);
      });
  };
}

export function FLNotificationsFetchDataSuccess(notifications) {
  return {
    type: "FL_NOTIFICATIONS_FETCH_DATA_SUCCESS",
    notifications,
  };
}

export function getNotificationsForFreelancer(unread) {
  let url = ``
  if(unread){
    url = '/notifications?only_unread=true'

  }
  else {
    url = '/notifications'
  }
  return (dispatch) => {
    return axios({
      method: "get",
      url: REACT_APP_BASE_URL+`${url}`,
      headers: {
        Authorization: localStorage.getItem("accessToken"),
        "content-type": "multipart/form-data",
      },
    })
      .then((response) => {
        if (response.status !== 200) {
          console.log(response , "hhelllll");
        }
        return response.data;
      })
      .then((notifications) => {        
        dispatch(FLNotificationsFetchDataSuccess(notifications));
        return notifications
      })
      .catch((error) => {
        // dispatch(logOutAction())
        // console.log(error.toJSON() , "error.response");
        console.log(error , "error");
        return error
      });
  };
}


export function getNotificationsForFreelancerMainPage(unread) {
  let url = ``
  if(unread){
    if(unread === 'unread'){
      url = '/notifications?only_unread=true'
    }else{
      url = '/notifications?page='+unread
    }
  }
  else {
    url = '/notifications'
  }
  return (dispatch) => {
    dispatch(applicationIsLoading(true));
    return axios({
      method: "get",
      url: REACT_APP_BASE_URL+`${url}`,
      headers: {
        Authorization: localStorage.getItem("accessToken"),
        "content-type": "multipart/form-data",
      },
    })
      .then((response) => {
        if (response.status !== 200) {
          console.log(response);
        }
        dispatch(applicationIsLoading(false));
        return response.data;
      })
      .then((notifications) => {        
        dispatch(FLNotificationsFetchDataSuccess(notifications));
        dispatch(applicationIsLoading(false));
        return notifications
      })
      .catch((error) => {
        console.log('error-->>',error);
        dispatch(applicationIsLoading(false));
        return error;
      });
  };
}


export function updateTermsforContract(jobId, amount, status) {
  let data = {};

  if (status === "terms changed") {
    data = {
      job_application: {
        id: jobId,
        status: "terms changed",
        price: amount,
      },
    };
  } else if (status === "withdrawal") {
    data = {
      job_application: {
        uuid: jobId,
        status: "withdrawal",
      },
    };
  }

  return (dispatch) => {
    dispatch(applicationIsLoading(true));
    return axios({
      method: "put",
      url: REACT_APP_BASE_URL + `/job_applications/${jobId}`,
      data: data,
    })
      .then((response) => {
        dispatch(applicationIsLoading(false));
        if (![200, 204].includes(response.status)) {
          console.log(response);
        }
        return response;
      })
      .catch((error) => {
        dispatch(applicationIsLoading(false));
        console.log(error);
      });
  };
}
