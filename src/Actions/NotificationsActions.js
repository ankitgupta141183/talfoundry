
import axios from 'axios';
// import {env} from '../constants/common';
import {REACT_APP_BASE_URL} from '../constants/common'

export function applicationIsLoading(bool) {
  return {
    type: 'APPLICATION_IS_LOADING',
    isLoading: bool
  }
}

export function getNotificationSettingsDetails(id) {
    return (dispatch) => {
      return axios({
        method: "get",
        url: REACT_APP_BASE_URL + `/notification_settings/${id}`,
      })
      .then(
        response => {
          if(response.status === 200) {
            return response
          } 
          if(response.status === 404){
            return 'Error'
          }
         console.log(response)         
        }
      )
      .catch(
        error => {
            return alert('error',error) 
            
        }
      )
    }
  }

  export function updateNotificationSettings(id = '00',data) {
    return (dispatch) => {
      dispatch(applicationIsLoading(true))
      return axios({
        method: "put",
        url: REACT_APP_BASE_URL + `/notification_settings/${id}`,
        headers: {
          'content-Type': 'application/json',
          Authorization: localStorage.getItem("accessToken"),
        },
        data: {notification_setting : data }
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
  

  