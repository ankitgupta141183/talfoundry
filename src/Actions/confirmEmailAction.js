import axios from 'axios';
import {REACT_APP_BASE_URL} from '../constants/common'


export function confirmEmailAciton(data){
  return (dispatch) => {
    return axios.get(REACT_APP_BASE_URL + `/confirm_email?confirmation_token=${data}`)
    .then(
      response => {
        return response
      }
    )
    .catch(
      error => {
          return error
      }
    )
  }
}