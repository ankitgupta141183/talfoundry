import axios from "axios";
// import {env} from '../constants/common';
import { REACT_APP_BASE_URL } from "../constants/common";
// import { freelancerJobsFetchDataSuccess } from "./freelancerJobActions";
import { applicationIsLoading } from "./jobCreateAndUpdateActions";

export function currentUserDetailsFetchDataSuccess(details) {
  return {
    type: "USER_DETAILS_FETCH_DATA_SUCCESS",
    details,
  };
}

export function settingUserDetailsFetchDataSuccess(settingDetails) {
  return {
    type: "SETTING_USER_DETAILS_FETCH_DATA_SUCCESS",
    settingDetails,
  };
}


export function settingIsLoading(bool) {
  return {
    type: "SETTING_IS_LOADING",
    isLoading: bool,
  };
}

export function currentUserIsLoading(bool) {
  return {
    type: "CURRENT_USER_IS_LOADING",
    isLoading: bool,
  };
}

// new create
export function currentUserDashboardDetails(detail){
  return {
    type : "USER_DASHBOARD_DETAILS",
    detail
  }
}
// end new create

export function getCurrentUserDetails() {
  return (dispatch) => {
    dispatch(currentUserIsLoading(true));
    return axios({
      method: "get",
      url: REACT_APP_BASE_URL + "/current_user_details",
    })
      .then((response) => {
        dispatch(currentUserIsLoading(false));
        if (response.status !== 200) {
          console.log(response);
        }
        return response.data;
      })
      .then((details) => {
        dispatch(currentUserIsLoading(false));
        dispatch(currentUserDetailsFetchDataSuccess(details));
        return details;
      })

      .catch((error) => {
        dispatch(currentUserIsLoading(false));
        console.log(error);
        return error;
      });
  };
}

export function getDashboardData() {
  return (dispatch) => {
    return axios({
      method: "get",
      url: REACT_APP_BASE_URL + "/dashboard_data",
    })
      .then((response) => {
        if (response.status !== 200) {
          console.log(response);
        }
        return response.data;
      })
      .then((details) => {
        // console.log("details");
        dispatch(currentUserDetailsFetchDataSuccess(details));
        return details;
      })

      .catch((error) => {
        console.log(error);
        return error;
      });
  };
}

export function getDashboardNew() {
  return (dispatch) => {
    return axios({
      method: "get",
      url: REACT_APP_BASE_URL + "/new_dashboard",
    })
      .then((response) => {
        if (response.status !== 200) {
          console.log(response);
        }
        return response.data;
      })
      .then((details) => {
        // console.log("details");
        // dispatch(currentUserDetailsFetchDataSuccess(details));
        return details;
      })

      .catch((error) => {
        console.log(error);
        return error;
      });
  };
}

export function getSettingUserDetails(id) {
  return (dispatch) => {
    dispatch(settingIsLoading(true));
    return axios({
      method: "get",
      url: REACT_APP_BASE_URL + `/users/${id}/user_details`,
    })
      .then((response) => {
        if (response.status !== 200) {
          console.log(response);
        }
        dispatch(settingIsLoading(false));
        dispatch(applicationIsLoading(false));
        return response.data;
      })
      .then((settingDetails) => {
        dispatch(settingUserDetailsFetchDataSuccess(settingDetails));
        return settingDetails;
      })
      .catch((error) => {
        dispatch(settingIsLoading(false));
        dispatch(applicationIsLoading(false));
        console.log(error);
        return error;
      });
  };
}

export function getSettingUserDetailsForFreelancer(id) {
  return (dispatch) => {
    dispatch(settingIsLoading(true));
    return axios({
      method: "get",
      url: REACT_APP_BASE_URL + `/users/${id}/user_details`,
    })
      .then((response) => {
        if (response.status !== 200) {
          console.log(response);
        }
        dispatch(settingIsLoading(false));
        dispatch(applicationIsLoading(false));
        return response.data;
      })
      .then((settingDetails) => {
        dispatch(settingUserDetailsFetchDataSuccess(settingDetails));
        return settingDetails;
      })
      .catch((error) => {
        dispatch(settingIsLoading(false));
        dispatch(applicationIsLoading(false));
        console.log(error);
        return error;
      });
  };
}

export function resendConfirmationLink(id) {
  return (dispatch) => {
    return axios({
      method: "get",
      url: REACT_APP_BASE_URL + `/resend_confirmation_email?id=${id}`,
    })
      .then((response) => {
        if (response.status !== 200) {
          console.log(response);
        }
        return response.data;
      })
      .catch((error) => {
        console.log(error);
        return error;
      });
  };
}

export function getAuthQuestion(id) {
  return (dispatch) => {
    dispatch(applicationIsLoading(true));
    return axios({
      method: "get",
      url: REACT_APP_BASE_URL + `/security_questions`,
    })
      .then((response) => {
        if (response.status !== 200) {
          console.log(response);
        }
        dispatch(applicationIsLoading(false));
        return response.data;
      })
      .catch((error) => {
        dispatch(applicationIsLoading(false));
        console.log(error);
        return error;
      });
  };
}

export function checkDeviceAuthorised(id) {
  return (dispatch) => {
    dispatch(applicationIsLoading(true));
    return axios({
      method: "get",
      url: REACT_APP_BASE_URL + `/device_authorised`,
    })
      .then((response) => {
        if (response.status !== 200) {
          console.log(response);
        }
        dispatch(applicationIsLoading(false));
        return response.data;
      })
      .catch((error) => {
        dispatch(applicationIsLoading(false));
        console.log(error);
        return error;
      });
  };
}

export function SendDeviceAuthorization() {
  return (dispatch) => {
    dispatch(applicationIsLoading(true));
    return axios({
      method: "get",
      url: REACT_APP_BASE_URL + `/update_user_activity`,
    })
      .then((response) => {
        if (response.status !== 200) {
          console.log(response);
        }
        dispatch(applicationIsLoading(false));
        return response.data;
      })
      .catch((error) => {
        dispatch(applicationIsLoading(false));
        console.log(error);
        return error;
      });
  };
}

export function talkToExpert(data) {
  return (dispatch) => {
    dispatch(applicationIsLoading(true));
    return axios({
      method: "get",
      url: REACT_APP_BASE_URL + `/contact_experts?data=${JSON.stringify(data)}`,
    })
      .then((response) => {
        if (response.status !== 200) {
          console.log(response);
        }
        return response.data;
      })
      .catch((error) => {
        console.log(error);
        dispatch(applicationIsLoading(false));
        return error;
      });
  };
}

// new create

export function getAdminDashboardNew() {
  return (dispatch) => {
    return axios({
      method: "get",
      url: `${REACT_APP_BASE_URL}/admins/admin_dashboard`,
    })
      .then((response) => {
        if (response.status !== 200) {
          console.log(response);
        }
        return response.data;
      })
      .then((details) => {
        // console.log("details" , "---details" , details);
        if(details.status === 200){
          dispatch(currentUserDashboardDetails(details.data));
        }
        return details;
      })

      .catch((error) => {
        console.log(error);
        return error;
      });
  };
}


//end new