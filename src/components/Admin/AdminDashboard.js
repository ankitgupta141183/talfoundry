import React, { Component } from "react";
import { connect } from "react-redux";
import { getFilteredDataForJobs } from '../../Actions/SearchActions';

import Loader from "react-loader-spinner";
import CloudExpertList from "./CloudExpertList";
import ShowJobs from "./ShowJob";
import AdminLineGraph from "./AdminLineGraph";
import { Link } from "react-router-dom";
import CommonHeaderSidebar from "./AdminCommanComponents/AdminCommanHearderSideBar";

class AdminDashboard extends Component {
    constructor(props, context) {
        super(props, context)
        this.state = {
            activeTab: 'approved',
            freelancers: [],
            activePage: 1,
            searchItem: '',
            value: '',
            filterData: {
                category: []
            },
            sortItem: '',
            favour: '',
            newSearchItem: '',
        }
    }

    componentDidMount() {
        let location = this.props.history.location;
        if (
            location.state &&
            location.state.category &&
            location.state.category.length > 0
        ) {
            let { filterData } = this.state;
            if (!filterData.category.includes(location.state.category)) {
                filterData.category[0] = this.props.history.location.state.category;
                this.setState({ filterData: filterData }, () => {
                    this.getFreelancersDataApiCall("fromDidMount", this.state.activeTab);
                });
            }
        }

        if (
            location &&
            location.state &&
            location.state.search &&
            location.state.search.length > 0
        ) {
            this.setState({ searchItem: this.props.location.state.search }, () => {
                this.getFreelancersDataApiCall("fromDidMount", this.state.activeTab ?  "approved" :"unapproved");
            });
        } else {
            this.getFreelancersDataApiCall("fromDidMount", this.state.activeTab ?  "approved" :"unapproved" );
        }
    }


    showASection = (event) => {
        this.setState({ activeTab: event.target.id })

        this.getFreelancersDataApiCall("fromDidMount", event.target.id);
    }

    getFreelancersDataApiCall = (type, tab) => {
        this.setState({
            freelancers: []
        })
        const isAllFreelancers = (tab === 'approved')

        this.props.getAdminFilter(this.state.favour, "search_freelancers", this.state.filterData, "status", tab , "search", this.state.newSearchItem, "find_freelancers", this.state.activePage).then((res) => {
            this.setState({
                freelancers: res
            })
        })
    }
    checkEst = (value) => {
        if (value.substr(0, 9) === "Less than") {
            return "< " + value.substr(9)
        } else if (value.substr(0, 9) === "More than") {
            return "> " + value.substr(9)
        }
        return value
    }

    render() {
        let { freelancers, activeTab } = this.state;
        const { applicationIsLoading, UserDashboardDetails , currentUser } = this.props;
        return (
            <CommonHeaderSidebar lable="Home" >
                {applicationIsLoading ? <div className="grid-loader my-feed-loader col-md-12">
                    <Loader type="Grid" color="#00BFFF" height={100} width={100} />
                </div> :
                    <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12 m-auto">
                        <div className="row">

                            <div className="col-md-12">
                                <h3 className="manager-welcome-title"><b>Welcome {currentUser?.first_name}</b></h3>
                            </div>

                            <ShowJobs history={this.props.history} />
                        </div>


                        <div className="col-md-12 col-sm-12">
                            <div className="p-4 bg-white box-shadow mb-4">
                                {/* Start Row */}
                                <div className="row" id="tabs--search-box-container">
                                    <div className="col-md-12">
                                        {/* Start Tabs */}
                                        <div className="super-admin-cloud-expert-tabs mb-4">
                                            <h4>Cloud Experts</h4>
                                        </div>
                                        <div className="super-admin-cloud-expert-tabs mb-4">
                                            <div className="col-md-6 col-sm-12 col-xs-12 p-0">
                                                <ul className="nav tabcustom">
                                                    <li role="presentation" className={activeTab === "approved" ? "active" : " "}><a href="#APPROVED" id="approved" onClick={this.showASection} data-toggle="tab">Approved</a></li>
                                                    <li role="presentation" className={activeTab === "unapproved"  ? "active" : " "}><a href="#UNAPPROVED" id="unapproved" onClick={this.showASection} data-toggle="tab">Unapproved</a></li>
                                                </ul>
                                            </div>
                                        </div>
                                        {/* End Tabs */}
                                    </div>
                                </div>
                                {/* End Row  */}
                                <div className="row">
                                    <div className="">
                                        <div className="card">
                                            <div className="card-body projects__table-sec">
                                                <CloudExpertList Freelancer={freelancers} checkEst={this.checkEst} />
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>


                        <div className="mt-20">
                            <div className="col-md-12 col-sm-12">
                                <div className="d-flex">
                                    <div className="col-lg-8 col-sm-12 col-xs-12 p-0">
                                        <div className="box-shadow p-4 bg-white mb-4 h-100">
                                            <h4>Users Overview</h4>
                                            {UserDashboardDetails.total_cloud_experts !== undefined && <AdminLineGraph ProfileVIew={UserDashboardDetails} />}
                                        </div>
                                    </div>
                                    <div className="col-lg-4 col-sm-12 col-xs-12 col-sm-12 pr-0">
                                        <div className="box-shadow p-4 bg-white mb-4 h-100">
                                            {/* <div className="row">
                                                                <div className="col-md-10 col-sm-10">
                                                                    <h4>Welcome back,</h4>
                                                                    <p><Link>Super Admin</Link></p>
                                                                </div>
                                                                <div className="col-md-2 col-sm-2">
                                                                    <div>
                                                                        <img src={faceImg} alt="" />
                                                                    </div>
                                                                </div>
                                                            </div>
                                                            <hr /> */}
                                            <div className="row text-center">
                                                <div className="col-md-12 col-sm-12">
                                                    <div className="dash-widget-info">Account balance</div>
                                                    <div className="dash-widget-count">$50,000,00</div>
                                                </div>
                                            </div>
                                            <hr />
                                            <div className="row">
                                                <div className="col-md-12 col-sm-12">
                                                    <p><Link>Payments</Link></p>
                                                    <div>
                                                        <div className="projects__table-sec">
                                                            <div className="table-responsive">
                                                                <table className="table">
                                                                    <thead>
                                                                        <tr>
                                                                            <th>Client or Freelancer</th>
                                                                            <th>Amount</th>
                                                                            <th>Status</th>
                                                                        </tr>
                                                                    </thead>
                                                                    <tbody>
                                                                        <tr>
                                                                            <td>Sakib Khan</td>
                                                                            <td>$2222</td>
                                                                            <td>Completed</td>
                                                                        </tr>
                                                                        <tr>
                                                                            <td>Pixel Inc Ltd</td>
                                                                            <td>$750</td>
                                                                            <td>Completed</td>
                                                                        </tr>
                                                                        <tr>
                                                                            <td>Pixel Inc Ltd</td>
                                                                            <td>$750</td>
                                                                            <td>Completed</td>
                                                                        </tr>
                                                                        <tr>
                                                                            <td>Pixel Inc Ltd</td>
                                                                            <td>$750</td>
                                                                            <td>Completed</td>
                                                                        </tr>
                                                                    </tbody>
                                                                </table>
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
                }
            </CommonHeaderSidebar>


        )
    }
}
const mapStateToProps = state => ({
    ...state
})

const mapDispatchToProps = (dispatch) => {
    return {
        getAdminFilter: (favour, searchBy, searchItem, sortBy, sortItem, search, newSearchItem, dataType, page) => dispatch(getFilteredDataForJobs(favour, searchBy, searchItem, sortBy, sortItem, search, newSearchItem, dataType, page)),
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(AdminDashboard)
