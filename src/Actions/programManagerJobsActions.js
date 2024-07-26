import axios from "axios";
import { REACT_APP_BASE_URL } from "../constants/common";
import { applicationIsLoading } from "./jobCreateAndUpdateActions";

export function jobsFetchDataSuccess(jobs) {
  return {
    type: "JOBS_FETCH_DATA_SUCCESS",
    jobs,
  };
}

export function jobFetchDataSuccess(job) {
  return {
    type: "JOB_FETCH_DATA_SUCCESS",
    job,
  };
}

export function ratingDataSuccess(rating) {
  return {
    type: "RATING_FETCH_DATA_SUCCESS",
    rating,
  };
}

export function fetchJob(id) {
  return (dispatch) => {
    dispatch(applicationIsLoading(true));
    return axios({
      method: "get",
      url: REACT_APP_BASE_URL + `/jobs/${id}`,
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
      .then((job) => {
          dispatch(jobFetchDataSuccess(job))
          return job
        }
      )
      .catch((error) => {
        console.log(error);
        dispatch(applicationIsLoading(false));
        return error;
      });
  };
}

export function getJobs() {
  return (dispatch) => {
    return axios({
      method: "get",
      url: REACT_APP_BASE_URL + "/jobs/jobs_by_user",
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
      .then((jobs) => dispatch(jobsFetchDataSuccess(jobs)))
      .catch((error) => {
        console.log(error);
        return error;
      });
  };
}

export function deleteScreening(questionId) {
  return (dispatch) => {
    dispatch(applicationIsLoading(true));
    return axios({
      method: "delete",
      url: REACT_APP_BASE_URL + `/job_screening_questions/${questionId}`,
      headers: {
        "content-Type": "application/json",
        Authorization: localStorage.getItem("accessToken"),
      },
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

export function inviteToJob(data) {
  return (dispatch) => {
    dispatch(applicationIsLoading(true));
    return axios({
      method: "post",
      url: REACT_APP_BASE_URL + `/send_invitation`,
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

export function getTemplatesDetails(template) {
  return (dispatch) => {
    return axios({
      method: "get",
      url:
        REACT_APP_BASE_URL + `/get_template_details?template_name=${template}`,
    })
      .then((response) => {
        if (response.status !== 200) {
          console.log(response);
        }
        return response;
      })
      .catch((error) => {
        console.log(error);
        return error;
      });
  };
}

export function removePost(id) {
  return (dispatch) => {
    dispatch(applicationIsLoading(true));
    return axios({
      method: "delete",
      url: REACT_APP_BASE_URL + `/jobs/${id}`,
      headers: {
        Authorization: localStorage.getItem("accessToken"),
        "content-type": "multipart/form-data",
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
        if (res.data.success) {
          dispatch(applicationIsLoading(false));
          dispatch(getJobs());
        }
        return res;
      })
      .catch(function (error) {
        console.log("action error");
      });
  };
}

export function submitRating(data) {
  return (dispatch) => {
    dispatch(applicationIsLoading(true));
    return axios({
      method: "post",
      url: REACT_APP_BASE_URL + `/ratings`,
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

export function getRatingData(
  rating_id,
  manager_rating_id,
  freelancer_rating_id
) {
  return (dispatch) => {
    return axios({
      method: "get",
      url:
        REACT_APP_BASE_URL +
        `/ratings/${rating_id}?manager_rating_id=${manager_rating_id}&freelancer_rating_id=${freelancer_rating_id}`,
    })
      .then((response) => {
        if (response.status !== 200) {
        }
        dispatch(ratingDataSuccess(response.data));
        return response;
      })
      .catch((error) => {
        console.log(error);
        return error;
      });
  };
}


export function setActiveJobTab(active) {
    return {
        type: "ACTIVE_JOB_TAB",
        tab: active
    }
}


export function GETTECHNOLOGIES(){
  return axios({
    method: "get",
    url:
      REACT_APP_BASE_URL + `/jobs/get_tech_skill`,
  })
    .then((response) => {
      if (response.status !== 200) {

      }
      // dispatch(ratingDataSuccess(response.data));
      return {skills : response?.data?.skills , status : 200}
    })
    .catch((error) => {
      console.log(error.message);
      return {message :  error?.message , status : 400};
    });
}

