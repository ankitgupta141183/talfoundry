import axios from "axios";
import { REACT_APP_BASE_URL } from "../../constants/common";
import { applicationIsLoading } from "../AdminActions";

export function GeneralSettingAction(details){
    return{
        type:"GENERAL_SETTING",
        details
    }
}

export function GeneralSettingUpdateAction(detail){
    return{
        type :"UPDATE_SETTING",
        detail
    }
}



export function GeneralSettingGET() {
    return (dispatch) => {
      axios({
        method: "get",
        url: REACT_APP_BASE_URL + `/admins/get_company_data`,
      })
        .then((response) => {
          if (response.status !== 200) {
            console.log(response);
          }
          return response.data;
        })
        .then((details) => dispatch(
            
            GeneralSettingAction(details)    
        ))
        .catch((error) => {
          console.log(error);
          return error;
        });
    };
  }

  export function GeneralSettingUpdate(data) {
    return (dispatch) => {
        dispatch(applicationIsLoading(true))
      axios({
        method: "PATCH",
        url: REACT_APP_BASE_URL + `/admins/update_company_data`,
        data : data,
      })
        .then((response) => {
          if (response.status !== 200) {
            console.log(response);
          }
          return response.data;
        })
        .then((detail) => {
            console.log(detail);
            dispatch(GeneralSettingUpdateAction(detail))
            return detail
        } )
        .catch((error) => {
          console.log(error);
          return error;
        });
    };
  }