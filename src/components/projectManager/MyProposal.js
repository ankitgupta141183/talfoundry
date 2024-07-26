// @invites.js
// * This component contains the proposals which are archived by the Project Manager

import React, { Component } from "react";
import ProjectManagerHeader from "../miscellaneous/ProjectManagerHeader";
import Footer from '../miscellaneous/Footer';
import { getManagerInvitation } from '../../Actions/projectManagerArchiveActions';
import ArchivesManagerContainer from "../miscellaneous/ArchivesManagerContainer";
import { connect } from "react-redux";
import Loader from "react-loader-spinner";
import { isEmpty } from 'lodash';
import _ from "lodash";
import { Link } from 'react-router-dom';
import Pagination from "react-js-pagination";
import TimeAgo from "react-timeago";
import questionIcon from "../../static/images/question.png";
import PMDashboardSideBar from "./PMDashboardSideBar";
import BreadCrumb from "../miscellaneous/BreadCrumb";
import NoDataFoundMessage from "../Common/NodataFoundMessage/NoDataFoundMessage";


class MyProposal extends Component {
  constructor(props, context) {
    super(props, context)
    this.state = {
      isLoading: true,
      isActive: this.props.location.state?.activeTab || "Received_Proposals",
      isArchived: false,
      activePage: 1
    }
  }

  componentDidMount() {
    this.props.getManagerInvitation()
  }

  showASection = (event) => {
    // if (event.target.id === 'active') {
    //   this.props.getManagerInvitation("active")
    // } else {
    //   this.props.getManagerInvitation("archived")
    // }
    this.setState({
      isActive: event.target.id,
      // isArchived: event.target.id === "archived" ? true : false,
      activePage: 1
    })
  }

  handleDraftPageChange = (pageNumber) => {
    this.setState({ activePage: pageNumber })
  }

  render() {
    const { activePage, isActive } = this.state;
    const { managerInvitation } = this.props;

    const itemsCountPerPage = 10;

    let invites = (!isEmpty(managerInvitation) && managerInvitation.length > 0) ? managerInvitation : []
    let invitation = JSON.parse(JSON.stringify((invites))).splice(activePage === 1 ? 0 : ((activePage - 1) * itemsCountPerPage), itemsCountPerPage)

    return (
      <div>
        <ProjectManagerHeader history={this.props.history} />
        {/* <PMDashboardSideBar history={this.props.history}/> */}
        <div id="tf-project-manager-dashboard-root">
          <BreadCrumb step2 link="My Proposals" />
        </div>
        <div id="" className={!this.props.loginSteps.showHideSideBar ? "mains" : "main-add"}>
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
                    <div className="">
                      {/* <BreadCrumb step2 link="My Proposals" /> */}
                    </div>
                    <div className="empty-outline-box-for-project-manager-dashboard my-0 w_90_mg_auto">
                      {/* <div className="row">
                        <div className=" my-proposals-container">
                          <div className=" col-md-12 ">
                            <h3 className="text-align-left">My Proposals</h3>
                          </div>
                        </div>
                      </div> */}

                      <div className="col-md-12 px-0">
                        <div className=" tf_saved_jobs mt-0">
                          <ul className="nav tabcustom job-tab" role="tablist">
                            <li className={isActive === "Received_Proposals" ? "active" : ""}>
                              <a
                                href="#tab_default_1"
                                id="Received_Proposals"
                                onClick={this.showASection}
                                data-toggle="tab"
                              >
                                Received Proposals
                              </a>
                            </li>
                            <li className={isActive === "Invitations" ? "active" : ""}>
                              <a
                                href="#tab_default_2"
                                id="Invitations"
                                onClick={this.showASection}
                                data-toggle="tab"
                              >
                                Invitations
                              </a>
                            </li>
                          </ul>
                          {isActive === "Received_Proposals" &&
                            <ArchivesManagerContainer history={this.props.history} />
                          }
                        </div>
                      </div>

                      <div className="col-md-12 px-0">

                        <div className="invite_freelancer tf_saved_jobs mt-0">
                          <div className="">

                            <div className="tab-content" id="project-manager-archived-job-proposal">

                              <div id="tab_default_1" className="m-0">


                                {/* <div className="col-md-12">
                                <h2>
                                  Invitations ({invites.length}) {" "}
                                  <img
                                    style={{ height: "20px", width: "20px" }}
                                    data-toggle="tooltip"
                                    data-html="true"
                                    data-placement="top"
                                    title="These are the invites sent to cloud experts."
                                    src={questionIcon}
                                    alt="que"
                                  />
                                </h2>
                              </div> */}
                                {/* <div className="clearfix"></div> */}
                                {/* <hr /> */}
                                {isActive === "Invitations" &&
                                  <div className="projects__table-sec">

                                    {!isEmpty(invitation) ?
                                      <table className="table">
                                        <thead>
                                          <tr className="bg-light">
                                            <th>
                                              {/* Invitations ({invites.length}) {" "}
                                            <img
                                              style={{ height: "20px", width: "20px" }}
                                              data-toggle="tooltip"
                                              data-html="true"
                                              data-placement="top"
                                              title="These are the invites sent to cloud experts."
                                              src={questionIcon}
                                              alt="que"
                                            /> */}
                                              Job Title
                                            </th>
                                            <th>Received Date</th>
                                            <th>Cloud Expert</th>
                                            {/* <th>Country</th>
                                          <th>title</th>
                                          <th>Budget</th> */}
                                          </tr>
                                        </thead>
                                        <tbody>
                                          {invitation.map((archive, idx) => {
                                            const archiveDate = new Date(archive.status_updated_at ? archive.status_updated_at : archive.updated_at)
                                            return (
                                              <React.Fragment key={idx}>
                                                <tr style={{ cursor: "pointer" }} className="single-offer-list" onClick={() => this.props.history.push(`/invitation-details/${archive.uuid}`)}>
                                                  <td >
                                                    {/* // <Link className="" to={"/invitation-details/" + archive.uuid}> */}
                                                    <p>{archive.job_title}</p>
                                                    {/* // </Link> */}
                                                  </td>
                                                  <td>
                                                    <p>
                                                      Received on{" "}
                                                      {`${archiveDate.toLocaleString("default", {
                                                        month: "short",
                                                      })} ${archiveDate.getDate()}, ${archiveDate.getFullYear()}`}
                                                    </p>
                                                    <p style={{ display: "none" }}>
                                                      {
                                                        <TimeAgo
                                                          date={new Date(
                                                            archive.status_updated_at ? archive.status_updated_at : archive.updated_at
                                                          ).toUTCString()}
                                                        />
                                                      }
                                                    </p>
                                                  </td>
                                                  <td>
                                                    <p className="job-manager-proposal-client-name">{archive.freelancer_name}</p>
                                                  </td>
                                                </tr>
                                                {/* <div key={archive.id} className="single-offer-list">
                                            <div className="col-md-7 col-sm-6">
                                              
                                                
                                              </div>
                                            </div>
                                            <div className="col-md-3 col-sm-3">
                                              <div className="tf_pro_offers">
                                              
                                              </div>
                                            </div>
                                            <div className="col-md-2 col-sm-3">
                                              <div className="tf_pro_offers1">
                                              </div>
                                            </div>
                                            <div className="clearfix"></div>
                                            <hr />
                                          </div>

                                          <div className="clearfix"></div> */}
                                              </React.Fragment>
                                            )
                                          })}
                                        </tbody>
                                      </table>

                                      : this.props.isLoading ? (
                                        <div className="grid-loader my-feed-loader col-md-12">
                                          <Loader type="Grid" color="#00BFFF" height={100} width={100} />
                                        </div>
                                      ) :

                                        <table className="table">
                                          <tbody>
                                            <tr>
                                              <td style={{ textAlign: "center" }}>
                                                <NoDataFoundMessage 
                                                message={"No items to display."}
                                                />
                                              </td>
                                            </tr>
                                          </tbody>
                                        </table>
                                    }
                                  </div>
                                }
                                <div className="clearfix"></div>
                                {(!_.isEmpty(managerInvitation) && managerInvitation.length > 10) ? (
                                  <div className="mt-20">
                                    <Pagination
                                      activePage={this.state.activePage}
                                      itemsCountPerPage={itemsCountPerPage}
                                      totalItemsCount={managerInvitation.length}
                                      pageRangeDisplayed={4}
                                      onChange={this.handleDraftPageChange.bind(this)}
                                      prevPageText="Previous"
                                      nextPageText="Next"
                                    />
                                  </div>
                                ) : null
                                }
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
          {/* <Footer /> */}
        </div>

      </div>
    )
  }
}

const mapStateToProps = state => {
  return {
    ...state,
    managerInvitation: state.managerInvitation,
    isLoading: state.applicationIsLoading,
    // currentUser: state.currentUser
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    getManagerInvitation: (type) => dispatch(getManagerInvitation(type)),
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(MyProposal)