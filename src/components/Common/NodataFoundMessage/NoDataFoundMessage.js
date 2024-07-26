import React from "react";
import NODataFoundImg from "./../../../static/images/noDataFound.png"


function NoDataFoundMessage({message}){
 return (
    <div className="tf_all_aws tf_my_aws noJobsFound">
    <img src={NODataFoundImg} alt="" />
    <p className="text-center all-job-posting-center">{message}</p>
  </div>
 )
}

export default NoDataFoundMessage