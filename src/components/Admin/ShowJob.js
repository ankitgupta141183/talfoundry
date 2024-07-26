import React, { useEffect, useState } from "react"
import { async } from "react-country-flag"
import { useDispatch } from "react-redux"
import { Link, useHistory } from "react-router-dom"
import { getAdminDashboardNew } from "../../Actions/applicationActions"
// import { REACT_APP_BASE_URL } from '../../constants/common'
const ShowJobs = () => {
    const [jobs, setJobs] = useState("")
    const history = useHistory()
    const dispatch = useDispatch()
    useEffect(() => {
        dispatch(getAdminDashboardNew()).then((res) => {
            if (res) {
                // console.log(res.data ,"----res---showjobs---");
                setJobs(res.data)
            }
        })


    }, [])

  
    return (
        <div className="">
            {/* Start Dashboard Content */}
            <div id="tf-dashboard" className="tab-pane fade in active">

                {/* Start First Grid System  */}
                <div className="">
                    {jobs !== "" &&
                        <div className="row">
                            <div className="col-md-3">
                                <div className="dash-widget">
                                    <div className="dash-info">
                                        <div className="row">
                                            <div className="col-md-8">
                                                <div className="dash-widget-info">
                                                    Users
                                                </div>
                                                {/* <div className="dash-widget-count">
                                                          {!isEmpty(managerDashboard) && managerDashboard.jobs_posted}
                                                      </div> */}
                                            </div>
                                            <div className="col-md-4">
                                                <div className="icon-container-1 icon-dashboard">
                                                    <i className="fa fa-address-card-o"></i>
                                                </div>
                                            </div>
                                            <div className="col-md-12 text-center">
                                                <div className="dash-widget-count">
                                                    {jobs?.total_cloud_experts_user}
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="dash-widget-more">
                                        <Link to="/cloud-experts" className="d-flex">View Details <i className="fa fa-arrow-right ms-auto"></i></Link>
                                    </div>
                                </div>
                            </div>
                            <div className="col-md-3">
                                <div className="dash-widget">
                                    <div className="dash-info">
                                        <div className="row">
                                            <div className="col-md-8">
                                                <div className="dash-widget-info">
                                                    Completed Jobs
                                                </div>
                                            </div>
                                            <div className="col-md-4">
                                                <div className="icon-container-2 icon-dashboard">
                                                    <i className="fa fa-file-text"></i>
                                                </div>
                                            </div>
                                            <div className="col-md-12 text-center">
                                                <div className="dash-widget-count">
                                                    {jobs?.completed_jobs}
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="dash-widget-more">
                                        <Link to={{
                                            pathname: '/admin-jobs',
                                            state: { activeTab: "completed"}
                                        }} className="d-flex">View Details <i className="fa fa-arrow-right ms-auto"></i></Link>
                                    </div>
                                </div>
                            </div>
                            <div className="col-md-3">
                                <div className="dash-widget">
                                    <div className="dash-info">
                                        <div className="row">
                                            <div className="col-md-8">
                                                <div className="dash-widget-info">
                                                    Active Jobs
                                                </div>
                                            </div>
                                            <div className="col-md-4">
                                                <div className="icon-container-3 icon-dashboard">
                                                    <i className="fa fa-comments"></i>
                                                </div>
                                            </div>
                                            <div className="col-md-12 text-center">
                                                <div className="dash-widget-count">
                                                    {jobs?.active_jobs}
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="dash-widget-more">
                                        <Link to={{
                                            pathname: '/admin-jobs',
                                            state: { activeTab: "active"}
                                        }}  className="d-flex">View Details <i className="fa fa-arrow-right ms-auto"></i></Link>
                                    </div>
                                </div>
                            </div>
                            <div className="col-md-3">
                                <div className="dash-widget">
                                    <div className="dash-info">
                                        <div className="row">
                                            <div className="col-md-8">
                                                <div className="dash-widget-info">
                                                    Payments
                                                </div>
                                            </div>
                                            <div className="col-md-4">
                                                <div className="icon-container-4 icon-dashboard">
                                                    <i className="fa fa-dollar"></i>
                                                </div>
                                            </div>
                                            <div className="col-md-12 text-center">
                                                <div className="dash-widget-count">
                                                    {jobs?.total_payment}
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="dash-widget-more">
                                        <Link to="/transactions" className="d-flex">View Details <i className="fa fa-arrow-right ms-auto"></i></Link>
                                    </div>
                                </div>
                            </div>
                        </div>
                    }
                </div>
                {/* <div className="fun-facts-container">

                              <Link to="/my-jobs" className="fun-fact fun-fact-jobs-posted">
                                  <div className="fun-fact-text">
                                      <span>Jobs Posted</span>
                                      <h4>{!isEmpty(managerDashboard) && managerDashboard.jobs_posted}</h4>
                                  </div>
                                  <div className="Jobs-Posted-Icon-Container icon-container-1"><i className="fa fa-address-card-o"></i></div>
                              </Link>

                              <Link to="/my-proposals" className="fun-fact fun-fact-proposals">
                                  <div className="fun-fact-text">
                                      <span>Proposals</span>
                                      <h4>{!isEmpty(managerDashboard) && managerDashboard.proposal_count}</h4>
                                  </div>
                                  <div className="Jobs-Posted-Icon-Container icon-container-2"><i className="fa fa-file-text"></i></div>
                              </Link>

                              <Link to="/my-proposals" className="fun-fact fun-fact-offers">
                                  <div className="fun-fact-text">
                                      <span>Invitations    </span>
                                      <h4>{!isEmpty(managerDashboard) && managerDashboard.invite_count}</h4>
                                  </div>
                                  <div className="Jobs-Posted-Icon-Container icon-container-3"><i className="fa fa-comments"></i></div>
                              </Link>
                          </div> */}
                {/* End First Grid System  */}



            </div>
            {/* End Dashboard Content */}
        </div>
    )
}

export default ShowJobs