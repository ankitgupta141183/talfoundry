import axios from 'axios';
// import {env} from '../constants/common';
import {REACT_APP_BASE_URL} from '../constants/common'
import {applicationIsLoading, applicationHasErrored} from './signUpActions';

export function FLAndProposalFetchDataSuccess(proposalDetails) {
  return {
    type: 'FL_PROPOSAL_FETCH_DATA_SUCCESS',
    proposalDetails
  }
}

export function getFreelancerAndProposalDetails(uuid, job_id){
  return (dispatch) => {
    dispatch(applicationIsLoading(true))
    axios({
      method: "get",
      url: REACT_APP_BASE_URL + `/view_job_proposal?id=${uuid}&job_id=${job_id}`,
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
    .then(proposalDetails => {
      dispatch(applicationIsLoading(false))
      dispatch(FLAndProposalFetchDataSuccess(proposalDetails))
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

export function acceptProposal(data, id, hideLoader = true) {
  return (dispatch) => {
    dispatch(applicationIsLoading(true));
    return axios({
      method: "put",
      url: REACT_APP_BASE_URL + `/job_applications/${id}`,
      headers: {
        "content-Type": "application/json",
        Authorization: localStorage.getItem("accessToken"),
      },
      data: data,
    })
      .then((response) => {
        if (hideLoader) {
          dispatch(applicationIsLoading(false))
        }

        return response;
      })
      .catch((error) => {
        console.log(error);
        dispatch(applicationIsLoading(false));
        return error;
      });
  };
}