import React, { Component } from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import {
    getCurrentUserDetails,
    getDashboardNew,
} from "../../Actions/applicationActions";
import FreelancerHeader from "../miscellaneous/FreelancerHeader";
// import Footer from "../miscellaneous/Footer";
import { isEmpty } from 'lodash';
import FreelancerDashboardSideBar from "./FreelancerDashboardSideBar";
import iconImg from "../../../src/static/images/icon.png";
// import Get_Work_Done from "../../../src/static/images/hiw/start_work.png";
// import We_Find_The_Perfect_Match from "../../../src/static/images/hiw/find_projects.png";
// import Post_A_Job from "../../../src/static/images/hiw/create_profile.png";
// import Pay_Securely from "../../../src/static/images/hiw/get_pay.png";
import './CloudExpertDashboardNew.css';
// import { showHideSideBar } from "../../Actions/loginStepsActions";
import BreadCrumb from "../miscellaneous/BreadCrumb";
import RecentlyPostedJobs from "../projectManager/RecentlyPostedJobs";
import ProfileViewGraph from "../Common/ProfileViewGraph";
import ProfileViewGraphdoughnut from "../Common/ProfileViewGraphdoughnut";
import JobContainer from "../Common/JobContainer";
import { getContractsForFreelancer } from "../../Actions/freelancerActions";
import FreelancerCompletedContracts from "./FreelancerCompletedContracts";
import NoDataFoundMessage from "../Common/NodataFoundMessage/NoDataFoundMessage";
import { getManagerArchives } from "../../Actions/projectManagerArchiveActions";
import SubmittedProposal from "./SubmittedProposal";

class CloudExpertDashboardNew extends Component {
    constructor(props, context) {
        super(props, context);
        this.state = {
            currentUserData: {},
            currentUserDetails: {},
            showNot: true,
            completedContracts: []
        }
    }
    componentDidMount() {
        if (this.props.isAuthenticated && this.props.currentUser.professional_profile_created) {
            this.props.getDashboardNew().then((res) => {
                if (res.status === 200) {
                    this.setState({

                        currentUserData: res.data
                    });
                    this.props.getCurrentUserDetails().then((res) => {
                        this.setState({ currentUserDetails: res })
                    })
                } else {
                    this.props.history.push("/login")
                    // localStorage.removeItem('accessToken')

                }
            });

        }
    }

    returnNotifications = () => {
        let { currentUserData, showNot } = this.state;
        if (currentUserData && currentUserData.notifications_count > 0 && showNot) {
            return (
                <li className="cloud-expert-dashboard-notification-message-box">
                    <div className="row ">
                        <div className="col-md-11">
                            <Link to="/notifications" className="project-manager-dashboard-notification">
                                <i className="fa fa-bell"></i>({'You have new messages ' + currentUserData.notifications_count})
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
            );
        }
    }

    HandleJobContainerClick = (type) => {
        console.log(type, "HandleJobContainerClick");
        if (type === "all-contracts") {
            // this.props.getContracts(1, "").then((res) => {

            //     this.setState({
            //         tableType: type,
            //         completedContracts: res.length > 0 ? res.filter(con => con.status === "Completed") : []
            //     })
            // })
        }
        if (type === "my-proposals") {
            this.setState({
                tableType: type
            })
            // this.props.getManagerArchives("")
        }

    }

    render() {
        const {
            currentUserData,
            currentUserDetails,
            tableType,
            completedContracts
        } = this.state;

        const { managerArchives } = this.props

        return (
            // Start Root Container
            <div id="tf-cloud-expert-dashboard-root">
                {/* Start Header */}
                <div id="tf-cloud-expert-dashboard-header-container">
                    <FreelancerHeader history={this.props.history} currentUser={this.props.currentUserDetails} />
                </div>
                <div>
                    <BreadCrumb step0 />
                </div>
                <div className={!this.props.loginSteps.showHideSideBar ? "mains" : "main-add"} id="">
                    <div className="cloud-expert-right-content-area">
                        <div className="main-content container-fluid">
                            {/* both-column-container */}
                            <div className="row custom_row">
                                <div className="col-lg-2 col-md-2 col-sm-2 col-xs-2 p-0">
                                    <div className="position-sticky">
                                        <div className="custom_sticky_container">
                                            <FreelancerDashboardSideBar history={this.props.history} />
                                        </div>
                                    </div>
                                </div>
                                <div className="col-lg-10 col-md-10 col-sm-10 col-xs-10 dark_blue_sec" id="tf_all_search_filter-all-job-posting">
                                    <div className="row">
                                        <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12">
                                            <ul style={{ listStyleType: "none" }} className="cloud-expert-dashboard-notification-list alert-danger m-0">
                                                {!isEmpty(currentUserDetails) && !currentUserDetails.account_approved ?
                                                    <li style={{ marginBottom: "5px", padding: "10px" }}>
                                                        <div className="row ">
                                                            <div className="col-md-11 p-0">
                                                                <Link to="#" style={{ color: "red" }}>
                                                                    <i className="fa fa-bell" style={{ color: '#d34f1f' }}></i>  Your account is set to private until it is approved by admin
                                                                </Link>
                                                            </div>
                                                        </div>
                                                        <div className="clearfix"></div>
                                                    </li>
                                                    :
                                                    this.returnNotifications()
                                                }
                                            </ul>
                                        </div>
                                    </div>
                                    <div className="row">
                                        <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12">
                                            <h3 className="cloud-expert-welcome-title">Welcome {this.props.currentUserDetails.full_name}</h3>
                                        </div>
                                    </div>


                                    {/* Start Tabs Content Area */}
                                    <div className="tab-content" id="">

                                        {/* Start Dashboard Content */}
                                        <div id="tf-dashboard" className="tab-pane fade in active">
                                            <div className="">
                                                <div className="row">
                                                    <div className="col-md-3">
                                                        {currentUserData && <JobContainer
                                                            title={"Active Jobs"}
                                                            data_count={currentUserData.my_jobs_count}
                                                            link="/my-jobs"
                                                            container_number={1}
                                                            type="twitch"
                                                        />}
                                                    </div>
                                                    <div className="col-md-3">
                                                        {currentUserData && <JobContainer
                                                            title={"Completed Jobs"}
                                                            data_count={currentUserData.proposal_count}
                                                            link="/all-contracts/completed"
                                                            container_number={2}
                                                            type="file-text"
                                                            // handleClick={true}
                                                            HandleJobContainerClick={() => this.HandleJobContainerClick("all-contracts")}

                                                        />}
                                                    </div>
                                                    <div className="col-md-3">

                                                        {currentUserData && <JobContainer
                                                            title={"Proposals"}
                                                            data_count={currentUserData.proposal_count}
                                                            link="/my-proposals"
                                                            container_number={3}
                                                            type="gift"
                                                            handleClick={true}
                                                            HandleJobContainerClick={() => this.HandleJobContainerClick("my-proposals")}

                                                        />}
                                                    </div>
                                                    <div className="col-md-3">
                                                        {currentUserData && <JobContainer
                                                            title={"Payments"}
                                                            data_count={currentUserData.proposal_count}
                                                            link="/transactions"
                                                            container_number={4}
                                                            type="dollar"
                                                        />}
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="row">
                                                <div className="col-md-12">
                                                    <div>
                                                        <div className="row">
                                                            <div className="p-4 bg-white box-shadow">
                                                                {
                                                                    tableType === "all-contracts" &&
                                                                    <div className="">
                                                                        {/* <h4 className=""><b>Completed contracts</b></h4> */}
                                                                        {
                                                                            completedContracts.length > 0 ?
                                                                                <FreelancerCompletedContracts
                                                                                    completedContracts={completedContracts}

                                                                                    searchTab={true}
                                                                                />
                                                                                : <NoDataFoundMessage
                                                                                    message={"No Contract found"}
                                                                                />
                                                                        }
                                                                    </div>
                                                                }
                                                                {

                                                                    tableType === "my-proposals" &&
                                                                    <div className="">
                                                                        <h4 className="m-0 pb-3"><b>All Proposals</b></h4>
                                                                        <SubmittedProposal />
                                                                    </div>
                                                                }
                                                            </div>

                                                        </div>
                                                        <div className="row">

                                                            <div className="p-4 bg-white box-shadow">
                                                                <RecentlyPostedJobs type="CE" />
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                            {/* project table ends here */}

                                            <br />

                                            {/* profile view section starts here */}
                                            <div className="row">
                                                <div className="col-md-12">
                                                    <div className="">
                                                        <div className="row">

                                                            <div className="d-flex">
                                                                <div className="col-lg-8 col-md-8 col-sm-12 col-xs-12 pl-0 mb-4">
                                                                    <div className="bg-white p-4 h-100 box-shadow">
                                                                        <h4 className="m-0"><b>Your Profile View</b></h4>
                                                                        <div>
                                                                            {currentUserData.profile_views && <ProfileViewGraph ProfileVIew={currentUserData.profile_views} />}
                                                                        </div>
                                                                    </div>
                                                                </div>
                                                                <div className="col-lg-4 col-md-4 col-sm-12 col-xs-12 pl-0 mb-4">
                                                                    <div className="bg-white p-4 h-100 box-shadow">
                                                                        <h4 className="m-0"><b>Static Analysis</b></h4>
                                                                        <div>
                                                                            <div className="text-center">
                                                                                <br /><br />
                                                                                {currentUserData.offer_count !== undefined && <ProfileViewGraphdoughnut ProfileVIew={currentUserData} type="CE" />}
                                                                                <br />
                                                                            </div>
                                                                            <div className="row align-items-center mb-2">
                                                                                <div className="col-lg-10 col-md-10 col-sm-10 col-xs-10">
                                                                                    <p className="text-muted"><i className="fa fa-circle" style={{ color: '#7B46BE' }}></i>&nbsp;&nbsp; Invites</p>
                                                                                </div>
                                                                                <div className="col-lg-2 col-md-2 col-sm-2 col-xs-2">
                                                                                    <div className="text-muted">
                                                                                        {currentUserData.invite_count}
                                                                                    </div>
                                                                                </div>
                                                                            </div>
                                                                            <div className="row align-items-center mb-2">
                                                                                <div className="col-lg-10 col-md-10 col-sm-10 col-xs-10">
                                                                                    <p className="text-muted"><i className="fa fa-circle" style={{ color: '#FA6CA4' }}></i>&nbsp;&nbsp; Proposals</p>
                                                                                </div>
                                                                                <div className="col-lg-2 col-md-2 col-sm-2 col-xs-2">
                                                                                    <div className="text-muted">
                                                                                        {currentUserData.proposal_count}
                                                                                    </div>
                                                                                </div>
                                                                            </div>
                                                                            <div className="row align-items-center mb-2">
                                                                                <div className="col-lg-10 col-md-10 col-sm-10 col-xs-10">
                                                                                    <p className="text-muted"><i className="fa fa-circle" style={{ color: '#FACD3A' }}></i>&nbsp;&nbsp; Offers</p>
                                                                                </div>
                                                                                <div className="col-lg-2 col-md-2 col-sm-2 col-xs-2">
                                                                                    <div className="text-muted">
                                                                                        {currentUserData.offer_count}
                                                                                    </div>
                                                                                </div>
                                                                            </div>
                                                                            <div className="row align-items-center mb-2">
                                                                                <div className="col-lg-10 col-md-10 col-sm-10 col-xs-10">
                                                                                    <p className="text-muted"><i className="fa fa-circle" style={{ color: '#24C0DC' }}></i>&nbsp;&nbsp; Applied Jobs</p>
                                                                                </div>
                                                                                <div className="col-lg-2 col-md-2 col-sm-2 col-xs-2">
                                                                                    <div className="text-muted">
                                                                                        {currentUserData.my_jobs_count}
                                                                                    </div>
                                                                                </div>
                                                                            </div>
                                                                        </div>
                                                                    </div>
                                                                </div>
                                                                <div className="d-flex">
                                                                    <div className="col-lg-12 col-md-12 col-sm-12 p-0">
                                                                        <div className="row d-flex">
                                                                            <div className="col-lg-6 col-md-6 col-sm-12 col-xs-12 pl-0">
                                                                                <div className="bg-white p-4 h-100 box-shadow">
                                                                                    <h4 className="m-0"><b>New Customers</b></h4>
                                                                                    <hr />
                                                                                    <div>
                                                                                        <div className="row align-items-center">
                                                                                            <div className="col-lg-2">
                                                                                                <div>
                                                                                                    <img src={iconImg} />
                                                                                                </div>
                                                                                            </div>
                                                                                            <div className="col-lg-8">
                                                                                                <h4>Mitchell Williamson</h4>
                                                                                                <p className="text-muted">Customer ID#01223</p>
                                                                                            </div>
                                                                                            <div className="col-lg-2">
                                                                                                <div className="text-muted">
                                                                                                    <i className="fa fa-envelope"></i>
                                                                                                </div>
                                                                                            </div>
                                                                                        </div>
                                                                                        <div className="row align-items-center">
                                                                                            <div className="col-lg-2">
                                                                                                <div>
                                                                                                    <img src={iconImg} />
                                                                                                </div>
                                                                                            </div>
                                                                                            <div className="col-lg-8">
                                                                                                <h4>Sam Conner</h4>
                                                                                                <p className="text-muted">Customer ID#01221</p>
                                                                                            </div>
                                                                                            <div className="col-lg-2">
                                                                                                <div className="text-muted">
                                                                                                    <i className="fa fa-envelope"></i>
                                                                                                </div>
                                                                                            </div>
                                                                                        </div>
                                                                                        <div className="row align-items-center">
                                                                                            <div className="col-lg-2">
                                                                                                <div>
                                                                                                    <img src={iconImg} />
                                                                                                </div>
                                                                                            </div>
                                                                                            <div className="col-lg-8">
                                                                                                <h4>Christina Castro</h4>
                                                                                                <p className="text-muted">Customer ID#01222</p>
                                                                                            </div>
                                                                                            <div className="col-lg-2">
                                                                                                <div className="text-muted">
                                                                                                    <i className="fa fa-envelope"></i>
                                                                                                </div>
                                                                                            </div>
                                                                                        </div>
                                                                                        <div className="row align-items-center">
                                                                                            <div className="col-lg-2">
                                                                                                <div>
                                                                                                    <img src={iconImg} />
                                                                                                </div>
                                                                                            </div>
                                                                                            <div className="col-lg-8">
                                                                                                <h4>Harriett Clark</h4>
                                                                                                <p className="text-muted">Customer ID#01222</p>
                                                                                            </div>
                                                                                            <div className="col-lg-2">
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
                                            </div>
                                            {/* profile view section ends here */}

                                            <br />

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

                            </div>
                            {/* Start Footer */}
                            {/* <div id="cloud-expert-dashboard-footer-dark-theme">
                                <Footer />
                            </div> */}
                            {/* End Footer */}
                        </div>
                    </div>
                </div>
                {/* End Container */}


            </div>
            // End Root Container
        );
    }
}
const mapStateToProps = (state) => ({
    ...state,
});

const mapDispatchToProps = (dispatch) => {
    return {
        getCurrentUserDetails: () => dispatch(getCurrentUserDetails()),
        getDashboardNew: () => dispatch(getDashboardNew()),
        getContracts: (num, search) => dispatch(getContractsForFreelancer(num, search)),
        getManagerArchives: (type) => dispatch(getManagerArchives(type))

    }
}

export default connect(mapStateToProps, mapDispatchToProps)(CloudExpertDashboardNew);