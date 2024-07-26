import axios from 'axios';
// import {env} from '../constants/common';
import {REACT_APP_BASE_URL} from '../constants/common'

const qs = require('qs')

const url = 'https://api.sandbox.paypal.com/v1/oauth2/token';

const data = {
  
  grant_type: 'client_credentials'
  
}

export function applicationIsLoading(bool) {
  return {
    type: 'APPLICATION_IS_LOADING',
    isLoading: bool
  }
}

const auth = {
  username: 'AaoSdKbFYINPkbfC5WxyZ-divtkF1PxlI7EEbk_4pD4nglrZFLuFWHBMSHe_ZCONH6CcjzTMHO2wpaCB',
  password: 'EInK_jy-KQ8yYizJNUt554w4nDS3ROfcdddOhkAZX9d3qY1efHfCqbxvqT4m9-6EB9h3QEdcVfIYwMZZ'
}

const options = {

  method: 'post',
  headers: {
    'content-type': 'application/x-www-form-urlencoded',
    'Access-Control-Allow-Credentials':true
  },
  data: qs.stringify(data),
  auth: auth,
  url,
}


export function getPayPalToken() {
  return (dispatch) => {
    return axios(options).then((response) => {
      if(response.status === 200){
        return response.data.access_token
      }
    })
    .then((token) => {
      return axios({
        method: "get",
        url: 'https://api.sandbox.paypal.com/v1/identity/oauth2/userinfo?schema=paypalv1.1',
        headers: {
          Authorization: `Bearer ${token}`,
          'content-type': 'application/x-www-form-urlencoded'
        },
      })
    })
    .catch((err) => {
      console.log(err)})
  }
}

export function getAuthPayPalToken(code, id) {
  return (dispatch) => {
    dispatch(applicationIsLoading(true))
    return axios({
      method: "get",
      url: REACT_APP_BASE_URL + `/payments/authenticate_payment_method?code=${code}&id=${id}`,
    })
    .then(
      response => {
        if(response.status === 200) {
          return response
        } 
       console.log(response)
       dispatch(applicationIsLoading(false))
      }
    )
    .catch(
      error => {
        dispatch(applicationIsLoading(false))
          console.log(error)
      }
    )
  }
}

export function postPaymentDetails(details, data) {
  return (dispatch) => {
    dispatch(applicationIsLoading(true))
    return axios({
      method: "post",
      url: REACT_APP_BASE_URL + `/payments`,
      data: {details: details, data: data}
    })
    .then(
      response => {
        if(response.status === 200) {
          return response
        } 
       console.log(response)
       dispatch(applicationIsLoading(false))
      }
    )
    .catch(
      error => {
        dispatch(applicationIsLoading(false))
          console.log(error)
      }
    )
  }
}

export function submitWork(data) {
  return dispatch => {
    dispatch(applicationIsLoading(true))
    return axios({
      method: "post",
      url: REACT_APP_BASE_URL + `/payments/request_payment`,
      // headers: {
      //   Authorization: localStorage.getItem("accessToken"),
      //   "content-type": "application/json"
      // },
      data: data
    })
    .then((response) => {
      if(response.status === 204 || response.status === 200 || response.status === 201) {
        dispatch(applicationIsLoading(false))
        // dispatch(getSavedJobsForFreelancer())
        return response
      } else if (response.data.status === 400) {
        dispatch(applicationIsLoading(false))
        return response.data
      } else {
        dispatch(applicationIsLoading(false))
        throw Error(response.statusText)
      }
    })
    .catch(function (error) {
      console.log('action error')
      dispatch(applicationIsLoading(false))
      return error
      // dispatch(applicationHasErrored(true))
    })
  }
}

export function SendStripePaymentId(data) {
  return axios({
    method: "post",
    // params: {payment_method_id : data?.paymentMethod?.id},
    url: REACT_APP_BASE_URL + `/payments/intent`,

    data: data
  }).then(response => {
    return response.data
  }).catch((err) => {
    console.log(err , "payment intent error");
  })
}