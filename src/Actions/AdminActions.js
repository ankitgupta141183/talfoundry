import axios from "axios";
import { REACT_APP_BASE_URL } from "../constants/common";
import _ from "lodash";


export function AllfreelancersFetchDataSuccess(freelancers) {
  return {
    type: "ALL_FREELANCERS_FETCH_DATA_SUCCESS",
    freelancers,
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
export function freelancerFetchDataSuccess(freelancer) {
  return {
    type: "FREELANCER_FETCH_DATA_SUCCESS",
    freelancer,
  };
}

export function adminJobListingFetchDataSuccess(jobListing) {
  return {
    type: "ADMIN_JOB_LISTING_FETCH_DATA_SUCCESS",
    jobListing,
  };
}

export function adminsFetchDataSuccess(admins) {
  return {
    type: "ADMINS_FETCH_DATA_SUCCESS",
    admins,
  };
}

export function adminClientListingFetchDataSuccess(clientListing) {
  return {
    type: "ADMIN_CLIENT_LISTING_FETCH_DATA_SUCCESS",
    clientListing,
  };
}

export function adminClientDetailsFetchDataSuccess(clientDetails) {
  return {
    type: "ADMIN_CLIENT_DETAILS_FETCH_DATA_SUCCESS",
    clientDetails,
  };
}

export function approveFreelancer(id) {
  return (dispatch) => {
    dispatch(applicationIsLoading(true));
    return axios({
      method: "get",
      url: REACT_APP_BASE_URL + `/admins/approve_freelancer/${id}`,
      headers: {
        Authorization: localStorage.getItem("accessToken"),
        "content-type": "multipart/form-data",
      },
    })
      .then((response) => {
        dispatch(applicationIsLoading(false));
        if (![200, 204].includes(response.status)) {
          console.log(response);
        } else {
        }
        return response.data;
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

export function addFavourite(id) {
  return (dispatch) => {
    return axios({
      method: "post",
      url: REACT_APP_BASE_URL + `/favorites?freelancer_id=${id}`,
      headers: {
        Authorization: localStorage.getItem("accessToken"),
        "content-type": "multipart/form-data",
      },
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
        console.log(error);
      });
  };
}

export function removeFavourite(id) {
  return (dispatch) => {
    return axios({
      method: "get",
      url: REACT_APP_BASE_URL + `/remove_favorited?freelancer_id=${id}`,
      headers: {
        Authorization: localStorage.getItem("accessToken"),
        "content-type": "multipart/form-data",
      },
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
        console.log(error);
      });
  };
}

export function banFreelancer(id,account_approved) {
  return (dispatch) => {
    dispatch(applicationIsLoading(true));
    return axios({
            method: "get",
            // url: REACT_APP_BASE_URL + `/admins/block_freelancer/${id}`,
            url: REACT_APP_BASE_URL + `/users/${id}/ban_user/?account_approved=${account_approved}`,
            headers: {
              Authorization: localStorage.getItem("accessToken"),
              "content-type": "multipart/form-data",
            },
          })
      .then((response) => {
        dispatch(applicationIsLoading(false));
        if (![200, 204].includes(response.status)) {
          console.log(response);
        } else {
          dispatch(fetchFreelancer(id));
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

export function fetchFreelancer(id) {
  return (dispatch) => {
    axios({
      method: "get",
      url: REACT_APP_BASE_URL + `/freelancer_details/${id}`,
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
      .then((job) => dispatch(freelancerFetchDataSuccess(job)))
      .catch((error) => {
        console.log(error);
        return error;
      });
  };
}

export function getAllFreelancers(favour,searchBy, searchItem, sortBy, sortItem, search, newSearchItem, dataType, page){
  return (dispatch) => {
    dispatch(applicationIsLoading(true));
    return axios({
      method: "get",
      // url: REACT_APP_BASE_URL + `/freelancer_index?search=${search}`,
      url: REACT_APP_BASE_URL + `/freelancer_index?page=${page}&${searchBy}=${JSON.stringify(searchItem)}&${sortBy}=${sortItem}&${search}=${newSearchItem}&${dataType}=${_.isEmpty(searchItem && sortItem) && !_.isEmpty(newSearchItem) ? true : false}`,
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
      .then((freelancers) => {
        dispatch(AllfreelancersFetchDataSuccess(freelancers));
        dispatch(applicationIsLoading(false));
        return freelancers
      })
      .catch((error) => {
        console.log(error);
        dispatch(applicationIsLoading(false));
        dispatch(applicationHasErrored(true));
        return error;
      });
  };
}

export function adminJobListing(param, page, isLoadMore) {
  return (dispatch) => {
    !isLoadMore && dispatch(applicationIsLoading(true));
    return axios({
      method: "get",
      url: REACT_APP_BASE_URL + `/jobs?job_status=${param}`,
    })
      .then((response) => {
        if (response.status !== 200) {
          console.log(response);
        }
        dispatch(applicationIsLoading(false));
        return response.data;
      })
      .then((jobListing) => {
        dispatch(adminJobListingFetchDataSuccess(jobListing));
        return jobListing;
      })
      .catch((error) => {
        console.log(error);
        dispatch(applicationIsLoading(false));
        return error;
      });
  };
}

export function getAdmins() {
  return (dispatch) => {
    axios({
      method: "get",
      url: REACT_APP_BASE_URL + `/admins`,
    })
      .then((response) => {
        if (response.status !== 200) {
          console.log(response);
        }
        return response.data;
      })
      .then((admins) => dispatch(adminsFetchDataSuccess(admins)))
      .catch((error) => {
        console.log(error);
        return error;
      });
  };
}

export function adminClientListing(search, page) {
  return (dispatch) => {
    dispatch(applicationIsLoading(true));
    return axios({
      method: "get",
      url: REACT_APP_BASE_URL + `/project_managers?page=${page}&search=${search}`,
    })
      .then((response) => {
        if (response.status !== 200) {
          console.log(response);
        }
        dispatch(applicationIsLoading(false));
        return response.data;
      })
      .then((clientListing) =>{
          dispatch(adminClientListingFetchDataSuccess(clientListing))
          return clientListing;
      })
      .catch((error) => {
          console.log(error);
          dispatch(applicationIsLoading(false));
          return error;
      });
  };
}

export function adminClientDetails(id) {
  return (dispatch) => {
    axios({
      method: "get",
    })
      .then((response) => {
        if (response.status !== 200) {
          console.log(response);
        }
        return response.data;
      })
      .then((clientDetails) =>
        dispatch(adminClientDetailsFetchDataSuccess(clientDetails))
      )
      .catch((error) => {
        console.log(error);
        return error;
      });
  };
}

export function usersListingFetchDataSuccess(usersListing) {
  return {
    type: "ADMIN_USER_LISTING_FETCH_DATA_SUCCESS",
    usersListing,
  };
}

export function usersListing(role) {
  return (dispatch) => {
    dispatch(applicationIsLoading(true));
    return axios({
      method: "get",
      url: REACT_APP_BASE_URL + `/users?role=`+role,
    })
      .then((response) => {
        if (response.status !== 200) {
          console.log(response);
        }
        dispatch(applicationIsLoading(false));
        return response.data;
      })
      .then((usersListing) =>{
        dispatch(usersListingFetchDataSuccess(usersListing))
        return usersListing;
      })
      .catch((error) => {
        console.log(error);
        dispatch(applicationIsLoading(false));
        return error;
      });
  };
}

export function removeUser(uuid) {
  return (dispatch) => {
    dispatch(applicationIsLoading(true));
    return axios({
      method: "get",
      url: REACT_APP_BASE_URL + `/admins/deactivate_user?id=${uuid}`,
    })
      .then((response) => {
        if (
          response.status === 204 ||
          response.status === 200 ||
          response.status === 201
        ) {
          dispatch(applicationIsLoading(false));
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

export function adminTransHistory(startDate='', endDate='', transactionType='', clientName='' , activeTab="") {
  return dispatch => {
    dispatch(applicationIsLoading(true))
    return axios({
      method: "GET",
      url: REACT_APP_BASE_URL + `/admins/get_transaction_history?start_date=${startDate}&end_date=${endDate}&transaction_type=${transactionType}&client_name=${clientName}&status_type=${activeTab}`,
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
