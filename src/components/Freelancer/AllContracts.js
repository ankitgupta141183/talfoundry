
import React, { Component } from "react";
import FreelancerHeader from "../miscellaneous/FreelancerHeader";
import Footer from "../miscellaneous/Footer";
import { connect } from "react-redux";
import {
  getContractsForFreelancer,
  searchContractsForFreelancer,
} from "../../Actions/freelancerActions";
import { Link } from "react-router-dom";
import FreelancerDashboardSideBar from "../Freelancer/FreelancerDashboardSideBar";
import iconMoreFilled from "../../static/images/Icon_More_Filled.svg";

import FreelancerActiveContracts from "./FreelancerActiveContracts";
import FreelancerPaymentRequestContracts from "./FreelancerPaymentRequestContracts";
import FreelancerCompletedContracts from "./FreelancerCompletedContracts";
import FreelancerHourlyContracts from "./FreelancerHourlyContracts";
import BreadCrumb from "../miscellaneous/BreadCrumb";


class AllContracts extends Component {
  constructor(props, context) {
    super(props, context)
    this.state = {
      isLoading: true,
      searchItem: "",
      pageNumber: 1,
      contracts: [],
      hideShowMore: false,
      activeTab: "active"
    }
  }

  componentDidMount() {
    this.setState({ activeTab: this.props.match.params.tab })
    this.props.getContracts(this.state.pageNumber, this.state.searchItem).then((res) => {

      this.setState({
        contracts: res, isLoading: false
      })
    })
  }

  componentDidUpdate(prevProps) {
    if (prevProps.match.params.tab !== this.props.match.params.tab) {
      this.setState({ activeTab: this.props.match.params.tab })
      this.props.getContracts(this.state.pageNumber, this.state.searchItem).then((res) => {
        this.setState({
          contracts: res, isLoading: false
        })
      })
    }
  }

  searchForContracts = async (e) => {
    this.setState({ searchItem: e.target.value })

    await this.props.getContracts(1, e.target.value).then((res) => {
      this.setState({
        contracts: res, isLoading: false
      })
    })
  }

  handleShowMore = () => {
    let { contracts } = this.state
    let newContracts = contracts
    this.setState({ pageNumber: this.state.pageNumber + 1 })
    this.props.getContracts(this.state.pageNumber + 1, this.state.searchItem).then((res) => {
      if (res.length > 0) {
        newContracts.push(...res)
        if (res.length < 5) {
          this.setState({
            hideShowMore: true,
            contracts: newContracts,
            isLoading: false
          })
        }
        else {
          this.setState({
            contracts: newContracts,
            isLoading: false
          })

        }
      }
    })
  }

  showAsection = (e) => {
    this.setState({ activeTab: e.target.id })
  }


  render() {
    const { issLoading } = this.props
    const { contracts, activeTab } = this.state;

    let activeContracts = contracts.length > 0 ? contracts.filter(con => ["Accepted", "Payment Requested", "Changes Requested"].includes(con.status)) : []
    let completedContracts = contracts.length > 0 ? contracts.filter(con => con.status === "Completed") : []
    let changesRequestedContracts = contracts.length > 0 ? contracts.filter(con => con.status === "Changes Requested") : []
    let paymentRequestContracts = contracts.length > 0 ? contracts.filter(con => con.status === 'Payment Requested') : []


    return (
      <div className="all-contacts-freelancer-account">
        <FreelancerHeader history={this.props.history} />

        <div>
          {
            this.props.match.params.tab === "payment" ?
              <BreadCrumb step3 link="Payment Requests" />
              : <BreadCrumb step2 link="All Contracts" tab="CE" />
          }
        </div>
        <div className={!this.props.loginSteps.showHideSideBar ? "mains tf_all_cont" : "main-add tf_all_cont"} id="all-contacts-category-tabs">

          {/* StartContainer */}
          <div className="">
            {/* <div className="pro-left-sidebar">
            <FreelancerDashboardSideBar history={this.props.history}/>
          </div> */}
            <div className="row custom_row">
              <div className="col-lg-2 col-md-2 col-sm-2 col-xs-2 p-0">
                <div className="custom_sticky_container">
                  <div className="position-sticky">
                    <FreelancerDashboardSideBar history={this.props.history} />
                  </div>
                </div>
              </div>
              <div className="col-lg-10 col-md-10 col-sm-10 col-xs-10">
                <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12">
                  <div className="pro-right-content-area rightSidecontent">
                    <div className="all-contacts-category-tabs-container" >
                      {/* Start Outline Container */}
                      <div className="">
                        <div className="earnings-available-now-container">
                          <div className="row">
                            <div className="col-md-4">
                              <h3 className="text-align-left">All Contracts</h3>
                            </div>
                            <div className="col-md-8 rte">
                              <h3> Earnings available now: <span>$100.00</span>{" "} <Link to={`#`}> <img src={iconMoreFilled} alt="icon" /> </Link> </h3>
                            </div>
                          </div>
                        </div>
                        <div className="">
                          <div className="tabbable-panel">
                            <div className="tabbable-line">
                              <ul className="nav nav-tabs tabtop tabsetting">
                                <li className={activeTab === "active" ? "active" : ""}>
                                  <a href="#tab_default_1" data-toggle="tab" onClick={this.showAsection} id="active">
                                    Active Contracts ({activeContracts.length})
                                  </a>
                                </li>

                                <li className={activeTab === "changes" ? "active" : ""}>
                                  <a href="#tab_default_2" data-toggle="tab" onClick={this.showAsection} id="changes">
                                    Changes Requested ({changesRequestedContracts.length})
                                  </a>
                                </li>

                                <li className={activeTab === "completed" ? "active" : ""}>
                                  <a href="#tab_default_3" data-toggle="tab" onClick={this.showAsection} id="completed">
                                    Completed Contracts ({completedContracts.length})
                                  </a>
                                </li>

                                <li className={activeTab === "payment" ? "active" : ""}>
                                  <a href="#tab_default_4" data-toggle="tab" onClick={this.showAsection} id="payment">
                                    Payment Requests ({paymentRequestContracts.length})
                                  </a>
                                </li>
                              </ul>

                              <div className="tab-content ">

                                <div className={activeTab === "active" ? "tab-pane active fade in" : "tab-pane fade"} id="tab_default_1">
                                  {
                                    activeContracts.length > 0 ?
                                      <FreelancerActiveContracts
                                        hideShowMore={this.state.hideShowMore}
                                        handleShowMore={this.handleShowMore}
                                        activeContracts={activeContracts}
                                        issLoading={issLoading}
                                        searchForContracts={this.searchForContracts}
                                        searchItem={this.state.searchItem}
                                      />
                                      : !this.state.isLoading && <p className="text-center mt-20 mb-15" id="no-items-to-display"> No Contracts Found. </p>
                                  }
                                </div>

                                <div className={activeTab === "changes" ? "tab-pane active fade in" : "tab-pane fade"} id="tab_default_2">
                                  <div className="">
                                    {
                                      changesRequestedContracts.length > 0 ?
                                        <FreelancerHourlyContracts
                                          hourlyContracts={changesRequestedContracts}
                                          searchForContracts={this.searchForContracts}
                                          searchItem={this.state.searchItem}
                                        />
                                        : !this.state.isLoading && <p className="text-center mt-20 mb-15" id="no-items-to-display"> No Contracts Found. </p>
                                    }
                                  </div>
                                </div>

                                <div className={activeTab === "completed" ? "tab-pane active fade in" : "tab-pane fade"} id="tab_default_3">
                                  <div className="">
                                    {
                                      completedContracts.length > 0 ?
                                        <FreelancerCompletedContracts
                                          completedContracts={completedContracts}
                                          searchForContracts={this.searchForContracts}
                                          searchItem={this.state.searchItem}
                                        />
                                        : !this.state.isLoading && <p className="text-center mt-20 mb-15" id="no-items-to-display"> No Contracts Found. </p>
                                    }
                                  </div>
                                </div>

                                <div className={activeTab === "payment" ? "tab-pane active fade in" : "tab-pane fade"} id="tab_default_4">
                                  <div className="">
                                    {
                                      paymentRequestContracts.length > 0 ?
                                        <FreelancerPaymentRequestContracts
                                          paymentRequestContracts={paymentRequestContracts}
                                          searchForContracts={this.searchForContracts}
                                          searchItem={this.state.searchItem}
                                        />
                                        : !this.state.isLoading && <p className="text-center mt-20 mb-15" id="no-items-to-display"> No Contracts Found. </p>
                                    }

                                  </div>
                                </div>

                              </div>
                            </div>
                          </div>
                        </div>

                      </div>

                    </div>
                    {/* End Outline Container */}
                  </div>
                </div>
              </div>
            </div>
          </div>
          {/* End Container */}

          {/* <Footer /> */}
        </div>



      </div>
    )

  }
}

const mapStateToProps = (state) => {
  return {
    ...state,
    contracts: state.contractsForFreelancer,
    issLoading: state.applicationIsLoading,
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    getContracts: (pageNumber, search) => dispatch(getContractsForFreelancer(pageNumber, search)),
    searchFlContracts: (param) => dispatch(searchContractsForFreelancer(param)),
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(AllContracts)
