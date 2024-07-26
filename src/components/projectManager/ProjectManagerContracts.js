import React, { Component } from "react";
import ProjecetManagerHeader from "../miscellaneous/ProjectManagerHeader";
import Footer from "../miscellaneous/Footer";
import { connect } from "react-redux";
import {
  getContractsForHiringManager,
  searchContractsForHiringManager,
} from "../../Actions/ProjectManagerFreelancerActions";
import ProjectManagerActiveContracts from "./ProjectManagerActiveContracts"
import ProjectManagerCompletedContracts from "./ProjectManagerCompletedContracts"
import ProjectManagerPendingContracts from "./ProjectManagerPendingContracts"
import PMDashboardSideBar from "./PMDashboardSideBar";
import Loader from "react-loader-spinner";
import BreadCrumb from "../miscellaneous/BreadCrumb";


class Contracts extends Component {
  constructor(props, context) {
    super(props, context)
    this.state = {
      isLoading: true,
      searchItem: "",
      pageNumber: 1,
      contracts: [],
      hideShowMore: false,
      activePage: 1,
      activeTab: "Pending",
    }
  }

  componentDidMount() {
    this.props.getContracts(this.state.pageNumber, this.state.searchItem, this.state.activeTab).then((res) => {
      if (res.length > 0) {
        if (res.length < 10) {
          this.setState({
            hideShowMore: true,
            contracts: res,
            isLoading: false
          })
        }
        else {
          this.setState({
            hideShowMore: false,
            contracts: res,
            isLoading: false
          })
        }
      } else {
        this.setState({
          hideShowMore: true,
          isLoading: false
        })
      }
    })
  }

  handleShowMore = () => {
    let { contracts } = this.state
    let newContracts = contracts
    this.setState({ pageNumber: this.state.pageNumber + 1 })

    this.props.getContracts(this.state.pageNumber + 1, this.state.searchItem, this.state.activeTab).then((res) => {
      if (res.length > 0) {
        newContracts.push(...res)
        if (res.length < 10) {
          this.setState({
            hideShowMore: true,
            contracts: newContracts,
            isLoading: false
          })
        }
        else {
          this.setState({
            hideShowMore: false,
            contracts: newContracts,
            isLoading: false
          })
        }
      }
    })
  }

  searchForFL = (e) => {
    e.preventDefault()
  }

  handleSearchChange = (e) => {
    if (
      e.target.value &&
      e.target.value.length === 1 &&
      e.target.value.length < this.state.searchItem.length
    ) {
      // this.props.getContracts()
    }
    this.searchContracts(e)
    this.setState({ searchItem: e.target.value })
  }

  searchContracts = async (e) => {
    console.log(e)

    await this.props.getContracts(1, e.target.value, this.state.activeTab).then((res) => {
      if (res.length > 0) {
        if (res.length < 10) {
          this.setState({
            hideShowMore: true,
            contracts: res,
            isLoading: false
          })
        }
        else {
          this.setState({
            hideShowMore: false,
            contracts: res,
            isLoading: false
          })
        }
      } else {
        this.setState({
          hideShowMore: true,
          isLoading: false
        })
      }
    })
  }

  showASection = (event) => {

    this.contractsApi(event.target.id)
    this.setState({ activeTab: event.target.id, activePage: 1, contracts: [], hideShowMore: false })
  }

  contractsApi = (activeTab) => {
    this.props.getContracts(this.state.pageNumber, this.state.searchItem, activeTab).then((res) => {
      if (res.length > 0) {
        if (res.length < 10) {
          this.setState({
            hideShowMore: true,
            contracts: res,
            isLoading: false
          })
        }
        else {
          this.setState({
            hideShowMore: false,
            contracts: res,
            isLoading: false
          })
        }
      } else {
        this.setState({
          hideShowMore: true,
          isLoading: false
        })
      }
    })
  }

  render() {
    const { contracts } = this.state;

    return (
      <div>
        <div id="tf-project-manager-dashboard-root">
          <ProjecetManagerHeader history={this.props.history} />
          <div>
            <BreadCrumb step2 link="All Contracts" />
          </div>
        </div>
        <div className={!this.props.loginSteps.showHideSideBar ? "mains" : "main-add  all-contacts-freelancer-account"}>
          <div className="mn_center">
            <div className="">

              <div className="row custom_row">

                <div className="col-lg-2 col-md-2 col-sm-2 col-xs-2 p-0">
                  <div className="custom_sticky_container">
                    <div className="position-sticky">
                      <PMDashboardSideBar history={this.props.history} />
                    </div>
                  </div>
                </div>

                <div className="col-lg-10 col-md-10 col-sm-10 col-xs-10">
                  <div className="col-md-12">
                    <div className="pro-right-content-area">
                      <div className="">
                        <div className="empty-outline-box-for-project-manager-dashboard my-0">
                          <div className="tf_aws job_desc_page">
                            <div className="clearfix"></div>
                            <div className="dashboard-all-project-status-tabs">
                              {/* <BreadCrumb step2 link="All Contracts" /> */}
                              <div className="tabbable-panel">
                                <div className="tabbable-line">
                                  <ul className="nav tabcustom">
                                    <li className="active">
                                      <a href="#Pending-data" id="Pending" data-toggle="tab" onClick={this.showASection}>
                                        Pending Contracts
                                      </a>
                                    </li>

                                    <li>
                                      <a href="#Accepted-data" id="Accepted" data-toggle="tab" onClick={this.showASection}>
                                        Active Contracts
                                      </a>
                                    </li>

                                    <li>
                                      <a href="#Completed-data" id="Completed" data-toggle="tab" onClick={this.showASection}>
                                        Completed Contracts
                                      </a>
                                    </li>
                                  </ul>

                                  <div className="tab-content">
                                    <div className="tab-pane active fade in" id="Pending-data">
                                      {this.props.issLoading &&
                                        <div className="grid-loader my-feed-loader col-md-12">
                                          <Loader type="Grid" color="#00BFFF" height={100} width={100} />
                                        </div>
                                      }
                                      <div className="">
                                        <ProjectManagerPendingContracts
                                          pendingContracts={contracts}
                                          hideShowMore={this.state.hideShowMore}
                                          handleShowMore={this.handleShowMore}
                                          handleSearchChange={this.handleSearchChange}
                                          searchItem={this.state.searchItem}
                                          isLoading={this.state.isLoading}
                                        />
                                      </div>
                                    </div>

                                    <div className="tab-pane fade" id="Accepted-data">
                                      {
                                        this.props.issLoading &&
                                        <div className="grid-loader my-feed-loader col-md-12">
                                          <Loader type="Grid" color="#00BFFF" height={100} width={100} />
                                        </div>
                                      }
                                      <ProjectManagerActiveContracts
                                        hideShowMore={this.state.hideShowMore}
                                        handleShowMore={this.handleShowMore}
                                        activeContracts={contracts}
                                        handleSearchChange={this.handleSearchChange}
                                        searchItem={this.state.searchItem}
                                        isLoading={this.state.isLoading}
                                      />
                                    </div>

                                    <div className="tab-pane fade" id="Completed-data">
                                      <div className="">
                                        {this.props.issLoading &&
                                          <div className="grid-loader my-feed-loader col-md-12">
                                            <Loader type="Grid" color="#00BFFF" height={100} width={100} />
                                          </div>
                                        }
                                        <ProjectManagerCompletedContracts
                                          completedContracts={contracts}
                                          hideShowMore={this.state.hideShowMore}
                                          handleShowMore={this.handleShowMore}
                                          handleSearchChange={this.handleSearchChange}
                                          searchItem={this.state.searchItem}
                                          isLoading={this.state.isLoading}
                                        />
                                      </div>
                                    </div>
                                  </div>
                                </div>
                              </div>
                            </div>
                            <div className="clearfix"></div>
                          </div>
                        </div>

                      </div>
                    </div>
                  </div>
                </div>

              </div>
            </div>
          </div>
          {/* <Footer /> */}
        </div>
      </div>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    ...state,
    contracts: state.contractsForHiringManager,
    issLoading: state.applicationIsLoading,
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    getContracts: (page, searchItem, activeTab) => dispatch(getContractsForHiringManager(page, searchItem, activeTab)),
    searchContracts: (query) => dispatch(searchContractsForHiringManager(query)),
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Contracts)
