import _ from 'lodash';
import React from 'react';  

export function getUserRedirection(user) {
    var pathToRedirect;
    var isRedirect = false;
    if(!_.isEmpty(user) && !user.professional_profile_created) {
        pathToRedirect = '/get-started';
        isRedirect= true
    } else if (!_.isEmpty(user) && user.professional_profile_created && !user.is_security_ques_added) {
        pathToRedirect = '/freelancer-success';
        isRedirect= true
    } else if(!_.isEmpty(user) && user.professional_profile_created && user.is_security_ques_added){
        pathToRedirect = '/';
        isRedirect = true;
    }

    // if(!_.isEmpty(user) && !user.profile_created) {
    //   pathToRedirect = '/get-started';
    //   isRedirect= true
    // }

    // else if(!_.isEmpty(user) && user.profile_created && !user.is_security_ques_added){

    //  pathToRedirect = '/security-questions';
    //  isRedirect= true
    // }
    // // else if(!_.isEmpty(user) && user.call_schedule && !user.account_approved) {
    // //   pathToRedirect = '/interview-scheduled';
    // //   isRedirect=true;
    // // }

    // else if(!_.isEmpty(user) && !user.professional_profile_created){
    //  pathToRedirect = '/freelancer-success';
    //  isRedirect= true
    // }
    // else if(!_.isEmpty(user) && user.professional_profile_created){
    //  pathToRedirect = '/';
    //  isRedirect= true
    // }
    // else if(!_.isEmpty(user) && user.is_security_ques_added){
    //  pathToRedirect = '/';
    //  isRedirect = true;
    // }
    // else{
    //  pathToRedirect="/"
    //  isRedirect=true
    // }

    return {
        hasRedirection: isRedirect,
        path: pathToRedirect
    }
}

export function getProjectManagerRedirection(user) {
    var pathToRedirect;
    var isRedirect = false;
    // console.log(user)
    if(!_.isEmpty(user) && !user.is_security_ques_added){
        pathToRedirect = '/security-questions';
        isRedirect= true
    }else{
        pathToRedirect="/"
        isRedirect=false
    }
    return {
        hasRedirection: isRedirect,
        path: pathToRedirect
    }
}

export function fieldError( message) {
    return (<p id = "firstName" className="error-field" >{message ? message : "This field can't be blank."}</p>)
}
