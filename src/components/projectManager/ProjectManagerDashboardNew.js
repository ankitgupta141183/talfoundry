// @ProjectManagerDashboardNew.js
// * This component contains all the jobs posted by the current user(home page for project manager)

import React, { Component } from "react";
// import Footer from "../miscellaneous/Footer";
import { connect } from "react-redux";
import { logOutAction } from "../../Actions/logOutAction";
import ProjectManagerHeader from "../miscellaneous/ProjectManagerHeader";
import PMDashboardSideBar from "./PMDashboardSideBar";
import { getCurrentUserDetails } from "../../Actions/applicationActions";
import { getManagerDashboard } from "../../Actions/ProjectManagerFreelancerActions";
import { fetchJob, removePost } from "../../Actions/programManagerJobsActions";
import { getNotificationsForFreelancer, deleteNotification, } from "../../Actions/freelancerActions";
import { Link } from "react-router-dom";
import { includes, isEmpty } from "lodash";

// import previewGraph from "../../../src/static/images/preview-graph.png";
// import previewGraph from "../../../src/static/images/orange-theme-graph.png";
// import radialChart from "../../../src/static/images/background/radial-chart.svg";
import iconImg from "../../../src/static/images/icon.png";


// import Post_A_Job from "../../../src/static/images/hiw/Post_A_Job.svg";
// import We_Find_The_Perfect_Match from "../../../src/static/images/hiw/We_Find_The_Perfect_Match.svg";
// import Get_Work_Done from "../../../src/static/images/hiw/Get_Work_Done.svg";
// import Pay_Securely from "../../../src/static/images/hiw/Pay_Securely.svg";
// import clientP1 from "../../../src/static/images/background/client-p1.png";
// import clientP2 from "../../../src/static/images/background/client-p2.png";
// import clientP3 from "../../../src/static/images/background/client-p3.png";
// import clientP4 from "../../../src/static/images/background/client-p4.png";
import './ProjectManagerDashboardNew.css';
import BreadCrumb from "../miscellaneous/BreadCrumb";
import RecentlyPostedJobs from "./RecentlyPostedJobs";
import ProfileViewGraphdoughnut from "../Common/ProfileViewGraphdoughnut";
import ProfileViewGraph from "../Common/ProfileViewGraph";
import ArchivesManagerContainer from "../miscellaneous/ArchivesManagerContainer";

class ProjectManagerDashboardNew extends Component {
    constructor(props, context) {
        super(props, context)
        this.state = {
            activePage: 1,
            activeTab: "new",
            isSliderOpen: false,
            sliderType: "",
            isDeleted: false,
            removeModal: false,
            showNot: true,
            openModal: false,
            showModal: false,
            jobDetail: '',
            currentArrayKey: 0,
            jobs: [],
            currentUserDetails: {},
            BoxContainer : ""
        }
    }

    componentDidMount() {
        this.props.getManagerDashboard(this.state.activeTab).then((res) => {

            if (this.props.isAuthenticated) {
                this.setState({ jobs: res })
                setTimeout(
                    function () {
                        this.props.getCurrentUserDetails().then((details) => {
                            if (details.response && details.response.status === 401) {
                                // alert("Server Error, Please try again!")
                                this.props.logOut()
                            }
                        })
                    }.bind(this), 1500)

            }
        })
    }

    returnNotifications = () => {
        let { showNot, jobs } = this.state
        if (jobs && jobs.notifications_count > 0 && showNot) {
            return (
                <li className="manager-dashboard-notification-message-box" style={{ marginBottom: "5px" }}>
                    <div className="row vt-center">
                        <div className="col-md-11">
                            <Link to="/notifications" className="project-manager-dashboard-notification">
                                <i className="fa fa-bell"></i>&nbsp;({'You have new messages ' + jobs.notifications_count})
                            </Link>
                        </div>

                        <div className="col-md-1">
                            <button
                                type="button"
                                className="close"
                                data-dismiss="dropdown"
                                aria-hidden="true"
                                onClick={() => this.setState({ showNot: false })}
                            >
                                ×
                            </button>
                        </div>
                    </div>
                    <div className="clearfix"></div>
                </li>

            )
        }
    }

    handleBoxContainerClick = (e) => {
        console.log("this is clci");
        if(!this.state.BoxContainer){
            this.setState({
                BoxContainer : e.target.id
            })
        }else{
            this.setState({
                BoxContainer : ""
            })
        }
        
    }

    render() {
        const { full_name } = this.props.currentUserDetails;
        const { managerDashboard } = this.props;

        return (
            // Start Root Container
            <div id="tf-project-manager-dashboard-root">
                {/* Start Header */}
                <div id="tf-project-manager-dashboard-header-container">
                    <ProjectManagerHeader history={this.props.history} currentUserDetails={this.props.currentUser} />
                </div>
                <div>
                    <BreadCrumb step0 />
                </div>
                {/* End Header */}

                {/* Start Container */}
                <div>

                    <div className={!this.props.loginSteps.showHideSideBar ? "mains" : "main-add"}>
                        <div className="main-content container-fluid">
                            <div className="row custom_row">

                                <div className="col-lg-2 col-md-2 col-sm-2 col-xs-2 p-0">
                                    <div className="custom_sticky_container">
                                        <div className="position-sticky">
                                            <PMDashboardSideBar history={this.props.history} />
                                        </div>
                                    </div>
                                </div>

                                <div className="col-lg-10 col-md-10 col-sm-10 col-xs-10 dark_blue_sec">
                                    <div className="row">
                                        <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12">
                                            <ul style={{ listStyleType: "none" }} className="cloud-expert-dashboard-notification-list m-0">
                                                {this.returnNotifications()}
                                            </ul>
                                        </div>
                                    </div>

                                    <div className="row">
                                        <div className="col-md-12">
                                            <h3 className="manager-welcome-title">Welcome {full_name || ''}</h3>
                                        </div>
                                    </div>

                                    <div className="row">
                                        {/* Start Tabs Content Area */}
                                        <div className="tab-content" id="">

                                            {/* Start Dashboard Content */}
                                            <div id="tf-dashboard" className="tab-pane fade in active">

                                                {/* Start First Grid System  */}

                                                <div className="col-md-4">
                                                    <div className="dash-widget">
                                                        <div className="dash-info">
                                                            <div className="row">
                                                                <div className="col-md-8">
                                                                    <div className="dash-widget-info">
                                                                        Jobs Posted
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
                                                                        {!isEmpty(managerDashboard) && managerDashboard.jobs_posted}
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        </div>
                                                        <div className="dash-widget-more">
                                                            <Link to="/my-jobs" className="d-flex">View Details <i className="fa fa-arrow-right ms-auto"></i></Link>
                                                        </div>
                                                    </div>
                                                </div>
                                                <div className="col-md-4">
                                                    <div className="dash-widget">
                                                        <div className="dash-info">
                                                            <div className="row">
                                                                <div className="col-md-8">
                                                                    <div className="dash-widget-info">
                                                                        Proposals
                                                                    </div>
                                                                </div>
                                                                <div className="col-md-4">
                                                                    <div className="icon-container-2 icon-dashboard">
                                                                        <i className="fa fa-file-text"></i>
                                                                    </div>
                                                                </div>
                                                                <div className="dash-widget-count text-center curserPointer" id="Proposals" onClick={(e) => this.handleBoxContainerClick(e)}>
                                                                    {!isEmpty(managerDashboard) && managerDashboard.proposal_count}
                                                                </div>
                                                            </div>
                                                        </div>
                                                        <div className="dash-widget-more">
                                                            <Link to={{
                                                                pathname: "/my-proposals",
                                                                state: { activeTab: "Received_Proposals" }
                                                            }}
                                                                className="d-flex">View Details <i className="fa fa-arrow-right ms-auto"></i></Link>
                                                        </div>
                                                    </div>
                                                </div>
                                                <div className="col-md-4">
                                                    <div className="dash-widget">
                                                        <div className="dash-info">
                                                            <div className="row">
                                                                <div className="col-md-8">
                                                                    <div className="dash-widget-info">
                                                                        Invitations
                                                                    </div>
                                                                </div>
                                                                <div className="col-md-4">
                                                                    <div className="icon-container-3 icon-dashboard">
                                                                        <i className="fa fa-comments"></i>
                                                                    </div>
                                                                </div>
                                                                <div className="col-md-12 text-center">
                                                                    <div className="dash-widget-count">
                                                                        {!isEmpty(managerDashboard) && managerDashboard.invite_count}
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        </div>
                                                        <div className="dash-widget-more">
                                                            <Link to={{
                                                                pathname: "/my-proposals",
                                                                state: { activeTab: "Invitations" }
                                                            }}
                                                                className="d-flex">View Details <i className="fa fa-arrow-right ms-auto"></i></Link>
                                                        </div>
                                                    </div>
                                                </div>


                                            </div>
                                            {/* End Dashboard Content */}



                                            {/* Start Hire Content */}
                                            <div id="tf-hire" className="tab-pane fade">


                                                {/* Start First Grid System  */}
                                                <div className="fun-facts-container">
                                                    {/* Start Row  */}
                                                    {/* <div className="row"> */}

                                                    {/* Start Column 4  */}
                                                    {/* <div className="col-md-4 "> */}


                                                    <div className="fun-fact">
                                                        <div className="fun-fact-text">
                                                            <span>Post a Job</span>
                                                        </div>
                                                        <div className="Jobs-Posted-Icon-Container greenBackground"><i className="fa fa-paper-plane"></i></div>
                                                    </div>

                                                    {/* </div> */}
                                                    {/* End Column 4  */}


                                                    {/* Start Column 4  */}
                                                    {/* <div className="col-md-4 "> */}



                                                    <div className="fun-fact">
                                                        <div className="fun-fact-text">
                                                            <span>Job Listings</span>
                                                        </div>
                                                        <div className="Jobs-Posted-Icon-Container redBackground"><i className="fa fa-list-ul"></i></div>

                                                    </div>

                                                    {/* </div> */}
                                                    {/* End Column 4  */}


                                                    {/* Start Column 4  */}
                                                    {/* <div className="col-md-4 "> */}

                                                    <div className="fun-fact">
                                                        <div className="fun-fact-text">
                                                            <span>Find a Freelancer</span>
                                                        </div>
                                                        <div className="Jobs-Posted-Icon-Container yellowBackground"><i className="fa fa-search"></i></div>
                                                    </div>

                                                    {/* </div> */}
                                                    {/* End Column 4  */}


                                                    {/* Start Column 4  */}
                                                    {/* <div className="col-md-4 "> */}

                                                    <div className="fun-fact">
                                                        <div className="fun-fact-text">
                                                            <span>Proposals</span>
                                                        </div>
                                                        <div className="Jobs-Posted-Icon-Container purpleBackground"><i className="fa fa-sticky-note"></i></div>
                                                    </div>

                                                    {/* </div> */}
                                                    {/* End Column 4  */}


                                                    {/* </div> */}
                                                    {/* End Row  */}
                                                </div>
                                                {/* End First Grid System  */}





                                            </div>
                                            {/* End Hire Content */}

                                            {/* Start Manage Content */}
                                            <div id="tf-manage" className="tab-pane fade">
                                                {/* Start First Grid System  */}
                                                <div className="fun-facts-container">
                                                    {/* Start Row  */}
                                                    {/* <div className="row"> */}

                                                    {/* Start Column 4  */}
                                                    {/* <div className="col-md-4 "> */}

                                                    <div className="fun-fact">
                                                        <div className="fun-fact-text">
                                                            <span>My Cloud Experts</span>
                                                        </div>
                                                        <div className="Jobs-Posted-Icon-Container greenBackground"><i className="fa fa-user"></i></div>
                                                    </div>

                                                    {/* </div> */}
                                                    {/* End Column 4  */}


                                                    {/* Start Column 4  */}
                                                    {/* <div className="col-md-4 "> */}

                                                    <div className="fun-fact">
                                                        <div className="fun-fact-text">
                                                            <span><Link to="/all-contracts">All Contracts</Link></span>
                                                        </div>
                                                        <div className="Jobs-Posted-Icon-Container redBackground"><i className="fa fa-address-book"></i></div>
                                                    </div>

                                                    {/* </div> */}
                                                    {/* End Column 4  */}


                                                    {/* Start Column 4  */}
                                                    {/* <div className="col-md-4 "> */}

                                                    <div className="fun-fact">
                                                        <div className="fun-fact-text">
                                                            <span><Link to="#">My Managers</Link></span>
                                                        </div>
                                                        <div className="Jobs-Posted-Icon-Container yellowBackground"><i className="fa fa-users"></i></div>
                                                    </div>

                                                    {/* </div> */}
                                                    {/* End Column 4  */}

                                                    {/* </div> */}
                                                    {/* End Row  */}
                                                </div>
                                                {/* End First Grid System  */}


                                            </div>
                                            {/* End Manage Content */}


                                            {/* Start Payment Content */}
                                            <div id="tf-payment" className="tab-pane fade">
                                                {/* Start First Grid System  */}
                                                <div className="fun-facts-container">
                                                    {/* Start Row  */}
                                                    {/* <div className="row"> */}

                                                    {/* Start Column 4  */}
                                                    {/* <div className="col-md-4 "> */}

                                                    <div className="fun-fact">
                                                        <div className="fun-fact-text">
                                                            <span>Payment Methods</span>
                                                        </div>
                                                        <div className="Jobs-Posted-Icon-Container greenBackground"><i className="fa fa-cogs"></i></div>
                                                    </div>

                                                    {/* </div> */}
                                                    {/* End Column 4  */}


                                                    {/* Start Column 4  */}
                                                    {/* <div className="col-md-4 "> */}

                                                    <div className="fun-fact">
                                                        <div className="fun-fact-text">
                                                            <span>Invoices</span>
                                                        </div>
                                                        <div className="Jobs-Posted-Icon-Container redBackground"><i className="fa fa-file-text"></i></div>
                                                    </div>

                                                    {/* </div> */}
                                                    {/* End Column 4  */}


                                                    {/* Start Column 4  */}
                                                    {/* <div className="col-md-4 "> */}

                                                    <div className="fun-fact">
                                                        <div className="fun-fact-text">
                                                            <span>Cash Amounts</span>
                                                        </div>
                                                        <div className="Jobs-Posted-Icon-Container yellowBackground"><i className="fa fa-money"></i></div>
                                                    </div>

                                                    {/* </div> */}
                                                    {/* End Column 4  */}


                                                    {/* Start Column 4  */}
                                                    {/* <div className="col-md-4 "> */}

                                                    <div className="fun-fact">
                                                        <div className="fun-fact-text">
                                                            <span>Transactions</span>
                                                        </div>
                                                        <div className="Jobs-Posted-Icon-Container purpleBackground"><i className="fa fa-exchange"></i></div>
                                                    </div>

                                                    {/* </div> */}
                                                    {/* End Column 4  */}


                                                    {/* </div> */}
                                                    {/* End Row  */}
                                                </div>
                                                {/* End First Grid System  */}



                                            </div>
                                            {/* End Payment Content */}

                                        </div>
                                        {/* End Tabs Content Area */}
                                    </div>

                                    {/* project table starts here */}
                                    <div className="row">
                                        <div className="col-md-12 mb-4">
                                            <div>
                                                {
                                                    this.state.BoxContainer &&
                                                    <div className="row">

                                                        <div className="p-4 bg-white box-shadow">
                                                            {/* <RecentlyPostedJobs type="PM" /> */}
                                                            <ArchivesManagerContainer history={this.props.history} BoxContainer={this.state.BoxContainer} />
                                                        </div>
                                                    </div>    
                                                }
                                                
                                                <div className="row">

                                                    <div className="p-4 bg-white box-shadow">
                                                        <RecentlyPostedJobs type="PM" />
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    {/* project table ends here */}

                                    {/* profile view section starts here */}
                                    <div className="row">
                                        <div className="col-md-12">
                                            <div className="">
                                                <div className="row">

                                                    <div className="d-flex">
                                                        <div className="col-lg-8 col-md-8 col-sm-12 col-xs-12 pl-0 mb-4">
                                                            <div className="bg-white p-4 h-100 box-shadow">
                                                                <h4 className="m-0"><b>Profile Views</b></h4>
                                                                <div>
                                                                    {/* <img src={previewGraph} className="w-100" /> */}
                                                                    {managerDashboard.profile_views !== undefined && <ProfileViewGraph ProfileVIew={managerDashboard.profile_views} />}
                                                                </div>
                                                            </div>
                                                        </div>
                                                        <div className="col-lg-4 col-md-4 col-sm-12 col-xs-12 pl-0 mb-4">
                                                            <div className="bg-white p-4 h-100 box-shadow">
                                                                <h4 className="m-0"><b>Static Analysis</b></h4>
                                                                <div>
                                                                    <div className="text-center">
                                                                        <br /><br />
                                                                        {/* <img src={radialChart} className='' style={{width: '70%'}} /> */}
                                                                        {!isEmpty(managerDashboard) && <ProfileViewGraphdoughnut ProfileVIew={managerDashboard} type="PM" />}
                                                                        <br />
                                                                    </div>
                                                                    <div className="row align-items-center mb-2">
                                                                        <div className="col-lg-10 col-md-10 col-sm-10 col-xs-10">
                                                                            <p className="text-muted"><i className="fa fa-circle" style={{ color: '#7B46BE' }}></i>&nbsp;&nbsp; Jobs Posted</p>
                                                                        </div>
                                                                        <div className="col-lg-2 col-md-2 col-sm-2 col-xs-2">
                                                                            <div className="text-muted">
                                                                                {!isEmpty(managerDashboard) && managerDashboard.jobs_posted}
                                                                            </div>
                                                                        </div>
                                                                    </div>
                                                                    <div className="row align-items-center mb-2">
                                                                        <div className="col-lg-10 col-md-10 col-sm-10 col-xs-10">
                                                                            <p className="text-muted"><i className="fa fa-circle" style={{ color: '#FA6CA4' }}></i>&nbsp;&nbsp; Proposals</p>
                                                                        </div>
                                                                        <div className="col-lg-2 col-md-2 col-sm-2 col-xs-2">
                                                                            <div className="text-muted">
                                                                                {!isEmpty(managerDashboard) && managerDashboard.proposal_count}
                                                                            </div>
                                                                        </div>
                                                                    </div>
                                                                    <div className="row align-items-center mb-2">
                                                                        <div className="col-lg-10 col-md-10 col-sm-10 col-xs-10">
                                                                            <p className="text-muted"><i className="fa fa-circle" style={{ color: '#FACD3A' }}></i>&nbsp;&nbsp; Invitations</p>
                                                                        </div>
                                                                        <div className="col-lg-2 col-md-2 col-sm-2 col-xs-2">
                                                                            <div className="text-muted">
                                                                                {!isEmpty(managerDashboard) && managerDashboard.invite_count}
                                                                            </div>
                                                                        </div>
                                                                    </div>
                                                                    <div className="row align-items-center mb-2">
                                                                        <div className="col-lg-10 col-md-10 col-sm-10 col-xs-10">
                                                                            <p className="text-muted"><i className="fa fa-circle" style={{ color: '#24C0DC' }}></i>&nbsp;&nbsp; Active Jobs</p>
                                                                        </div>
                                                                        <div className="col-lg-2 col-md-2 col-sm-2 col-xs-2">
                                                                            <div className="text-muted">
                                                                                {!isEmpty(managerDashboard) && managerDashboard.my_job_count}
                                                                            </div>
                                                                        </div>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                                <div className="row">
                                                    <div className="d-flex">
                                                        <div className="col-lg-12 col-md-12 col-sm-12 p-0">
                                                            <div className="row d-flex">
                                                                <div className="col-lg-6 col-md-6 col-sm-12 col-xs-12 pl-0">
                                                                    <div className="bg-white p-4 h-100 box-shadow">
                                                                        <h4 className="m-0"><b>New Customers</b></h4>
                                                                        <hr />
                                                                        <div>
                                                                            <div className="row align-items-center">
                                                                                <div className="col-lg-2 col-md-2 col-sm-2 col-xs-2">
                                                                                    <div>
                                                                                        <img src={iconImg} />
                                                                                    </div>
                                                                                </div>
                                                                                <div className="col-lg-8 col-md-8 col-sm-8 col-xs-8">
                                                                                    <h4>Mitchell Williamson</h4>
                                                                                    <p className="text-muted">Customer ID#01223</p>
                                                                                </div>
                                                                                <div className="col-lg-2 col-md-2 col-sm-2 col-xs-2">
                                                                                    <div className="text-muted">
                                                                                        <i className="fa fa-envelope"></i>
                                                                                    </div>
                                                                                </div>
                                                                            </div>
                                                                            <div className="row align-items-center">
                                                                                <div className="col-lg-2 col-md-2 col-sm-2 col-xs-2">
                                                                                    <div>
                                                                                        <img src={iconImg} />
                                                                                    </div>
                                                                                </div>
                                                                                <div className="col-lg-8 col-md-8 col-sm-8 col-xs-8">
                                                                                    <h4>Sam Conner</h4>
                                                                                    <p className="text-muted">Customer ID#01221</p>
                                                                                </div>
                                                                                <div className="col-lg-2 col-md-2 col-sm-2 col-xs-2">
                                                                                    <div className="text-muted">
                                                                                        <i className="fa fa-envelope"></i>
                                                                                    </div>
                                                                                </div>
                                                                            </div>
                                                                            <div className="row align-items-center">
                                                                                <div className="col-lg-2 col-md-2 col-sm-2 col-xs-2">
                                                                                    <div>
                                                                                        <img src={iconImg} />
                                                                                    </div>
                                                                                </div>
                                                                                <div className="col-lg-8 col-md-8 col-sm-8 col-xs-8">
                                                                                    <h4>Christina Castro</h4>
                                                                                    <p className="text-muted">Customer ID#01222</p>
                                                                                </div>
                                                                                <div className="col-lg-2 col-md-2 col-sm-2 col-xs-2">
                                                                                    <div className="text-muted">
                                                                                        <i className="fa fa-envelope"></i>
                                                                                    </div>
                                                                                </div>
                                                                            </div>
                                                                            <div className="row align-items-center">
                                                                                <div className="col-lg-2 col-md-2 col-sm-2 col-xs-2">
                                                                                    <div>
                                                                                        <img src={iconImg} />
                                                                                    </div>
                                                                                </div>
                                                                                <div className="col-lg-8 col-md-8 col-sm-8 col-xs-8">
                                                                                    <h4>Harriett Clark</h4>
                                                                                    <p className="text-muted">Customer ID#01222</p>
                                                                                </div>
                                                                                <div className="col-lg-2 col-md-2 col-sm-2 col-xs-2">
                                                                                    <div className="text-muted">
                                                                                        <i className="fa fa-envelope"></i>
                                                                                    </div>
                                                                                </div>
                                                                            </div>
                                                                            <hr />
                                                                            <div>
                                                                                <div>
                                                                                    <span><a href="">More Insights &nbsp;<i className="fa fa-chevron-right"></i></a></span>
                                                                                </div>
                                                                            </div>
                                                                        </div>
                                                                    </div>
                                                                </div>
                                                                <div className="col-lg-6 col-md-6 col-sm-12 col-xs-12 pl-0">
                                                                    <div className="bg-white p-4 h-100 box-shadow">
                                                                        <h4 className="m-0"><b>Notifications</b></h4>
                                                                        <hr />
                                                                        <div className="job-details-container m-0">
                                                                            <div className="row mb-2">
                                                                                <div className="col-md-10 col-sm-10 col-xs-10 ">
                                                                                    <h4>Your offer "GC Test Contract" was accepted</h4>
                                                                                </div>

                                                                                <div className="col-md-2 col-sm-2 col-xs-2 ">
                                                                                    <h4> <Link to={"#"}
                                                                                    >
                                                                                        June 15</Link></h4>
                                                                                </div>
                                                                            </div>
                                                                            <hr />
                                                                            <div className="row">
                                                                                <div className="col-md-10 col-sm-10 col-xs-10 ">
                                                                                    <h4>Your offer "GC Test Contract" was accepted</h4>
                                                                                </div>

                                                                                <div className="col-md-2 col-sm-2 col-xs-2 ">
                                                                                    <h4> <Link to={"#"}
                                                                                    >
                                                                                        June 15</Link></h4>
                                                                                </div>
                                                                            </div>
                                                                            <hr />
                                                                            <div className="row">
                                                                                <div className="col-md-10 col-sm-10 col-xs-10 ">
                                                                                    <h4>Your offer "GC Test Contract" was accepted</h4>
                                                                                </div>

                                                                                <div className="col-md-2 col-sm-2 col-xs-2 ">
                                                                                    <h4> <Link to={"#"}
                                                                                    >
                                                                                        June 15</Link></h4>
                                                                                </div>
                                                                            </div>
                                                                            <hr />
                                                                            <div className="row">
                                                                                <div className="col-md-10 col-sm-10 col-xs-10 ">
                                                                                    <h4>Your offer "GC Test Contract" was accepted</h4>
                                                                                </div>

                                                                                <div className="col-md-2 col-sm-2 col-xs-2 ">
                                                                                    <h4> <Link to={"#"}
                                                                                    >
                                                                                        June 15</Link></h4>
                                                                                </div>
                                                                            </div>
                                                                        </div>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    {/* profile view section ends here */}
                                </div>

                            </div>
                        </div>
                    </div>
                </div>
                {/* End Container */}
            </div>
            // End Root Container
        )
    }
}
const mapStateToProps = (state) => ({
    ...state,
})

const mapDispatchToProps = (dispatch) => {
    return {
        logOut: () => dispatch(logOutAction()),
        getCurrentUserDetails: () => dispatch(getCurrentUserDetails()),
        getManagerDashboard: (activeTab) => dispatch(getManagerDashboard(activeTab)),
        removePost: (id) => dispatch(removePost(id)),
        fetchJob: (id) => dispatch(fetchJob(id)),
        deleteNotification: (id) => dispatch(deleteNotification(id)),
        getNotifications: () => dispatch(getNotificationsForFreelancer()),
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(ProjectManagerDashboardNew)