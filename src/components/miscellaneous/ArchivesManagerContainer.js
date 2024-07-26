// @HiredFreelancers.js
// * This component used as a container to display archived proposals on both freelancer and project manager side.

import React, { Component } from "react";
import { getManagerArchives } from '../../Actions/projectManagerArchiveActions';
import { connect } from "react-redux";
import TimeAgo from 'react-timeago';
import Loader from "react-loader-spinner";
import { isEmpty } from 'lodash';
import { Link } from 'react-router-dom';
import questionIcon from "../../static/images/question.png";
import NoDataFoundMessage from "../Common/NodataFoundMessage/NoDataFoundMessage";

class ArchivesManagerContainer extends Component {

  constructor(props, context) {
    super(props, context)
    this.state = {
      isActive: true,
      isArchived: false,
      activePage: 1
    }
  }

  componentDidMount() {

    if (typeof this.props.history.location.state !== 'undefined' && typeof this.props.history.location.state.status !== 'undefined') {

      this.setState({
        isActive: this.props.history.location.state.status === "active" ? true : false,
        isArchived: this.props.history.location.state.status === "archived" ? true : false
      })

      this.props.getManagerArchives(this.props.history.location.state.status)
    } else {
      this.props.getManagerArchives()
    }
  }

  // showASection = (event) => {
  //   if (event.target.id === 'active') {
  //     this.props.getManagerArchives("active")
  //   } else {
  //     this.props.getManagerArchives("archived")
  //   }
  //   this.setState({
  //     isActive: event.target.id === "active" ? true : false,
  //     isArchived: event.target.id === "archive" ? true : false,
  //     activePage: 1
  //   })
  // }

  handleDraftPageChange = (pageNumber) => {
    this.setState({ activePage: pageNumber })
  }

  render() {
    const { isActive, isArchived } = this.state;
    const { managerArchives, currentUser } = this.props;

    let archiveM = (!isEmpty(managerArchives) && managerArchives.length > 0) ? managerArchives : []

    return (
      <div className="invitesTabBox">
        {/* <ul className="nav tabcustom job-tab" role="tablist">
          <li className={isActive ? "active" : ""}>
            <a
              href="#tab_default_1"
              id="active"
              onClick={this.showASection}
              data-toggle="tab"
            >
              Active
            </a>
          </li>
          <li className={isArchived ? "active" : ""}>
            <a
              href="#tab_default_2"
              id="archive"
              onClick={this.showASection}
              data-toggle="tab"
            >
              Archived
            </a>
          </li>
        </ul> */}

        <div className="clearfix"></div>
        <div className="tab-content" id="project-manager-archived-job-proposal">
          {isActive && (
            <div id="tab_default_1">
              {/* <div className="col-md-12 ">
                <h2 style={{color:"#0058ff"}}>
                  Received Proposals ({archiveM.length}) {" "}
                  <img
                    style={{ height: "20px", width: "20px" }}
                    data-toggle="tooltip"
                    data-html="true"
                    data-placement="top"
                    title="These are the proposals sent by cloud experts."
                    src={questionIcon}
                    alt="que"
                  />
                </h2>
              </div> */}
              {/* <div className="clearfix"></div>
              <hr /> */}
              {/* this props get by dashboard only */}
              { this.props.BoxContainer &&
              <h4 className="m-0 pb-3"><b>{this.props.BoxContainer}</b></h4> 
              }
              <div className="projects__table-sec">
                {
                  !isEmpty(archiveM) ?
                    <table className="table">
                      <thead>
                        <tr className="bg-light">
                          {/* <th style={{color:"black"}}>

                            Received Proposals ({archiveM.length}) {" "}
                            <img
                              style={{ height: "20px", width: "20px" }}
                              data-toggle="tooltip"
                              data-html="true"
                              data-placement="top"
                              title="These are the proposals sent by cloud experts."
                              src={questionIcon}
                              alt="que"
                            />
                          </th> */}
                          <th>Job Title</th>
                          <th>Received Date</th>
                          {/* <th>Client name</th> */}
                          <th>Status</th>
                          <th>Archived</th>
                        </tr>
                      </thead>
                      <tbody>

                        {archiveM.map((archive, idx) => {
                          const offerDate = new Date(archive.updated_at)
                          const pathname = currentUser.role === "Project Manager" ? `/freelancer-proposal/${archive.uuid}/${archive.job_uuid}` : `/proposal-details/${archive.uuid}`;
                          return <React.Fragment key={idx}>

                            <tr style={{ cursor: "pointer" }} className="single-offer-list" onClick={() => this.props.history.push({ pathname: pathname, state: { isarchive: true, archiveId: archive.id, jobUuid: archive.job_uuid } })}>
                              <td>
                                {/* <Link className="job-manager-proposal-job-" to={{ pathname: pathname, state: { isarchive: true, archiveId: archive.id, jobUuid: archive.job_uuid } }}> */}
                                <p>{archive.job_title}</p>
                                {/* </Link> */}
                              </td>
                              <td>
                                <p>
                                  Received on{" "}
                                  {`${offerDate.toLocaleString("default", {
                                    month: "short",
                                  })} ${offerDate.getDate()}, ${offerDate.getFullYear()}`}
                                </p>
                                <p style={{ display: "none" }}>
                                  {
                                    <TimeAgo
                                      date={new Date(
                                        archive.updated_at
                                      ).toUTCString()}
                                    />
                                  }
                                </p>
                              </td>
                              {/* <td>
                                <p className="job-manager-proposal-client-name">{archive.client_name}</p>
                              </td> */}
                              <td>
                                <p className="job-manager-proposal-client-status">{archive.status === 'submitted' ? '-' : archive.status}</p>
                              </td>
                              <td>
                                <p className="job-manager-proposal-client-name">{archive.archived_at === null ? "No" : "Yes"}</p>
                              </td>
                            </tr>

                            {/* <div key={archive.id} >
                            <div className="col-md-4 col-sm-3">
                              <div className="tf_pro_offers1">
                                <Link className="job-manager-proposal-job-title" to={{ pathname: pathname, state: { isarchive: true, archiveId: archive.id, jobUuid: archive.job_uuid } }}>
                                  <h4>{archive.job_title}</h4></Link>

                              </div>
                            </div>
                            <div className="col-md-4 col-sm-3">
                              <div className="tf_pro_offers">
                                <p>
                                  Received on{" "}
                                  {`${offerDate.toLocaleString("default", {
                                    month: "short",
                                  })} ${offerDate.getDate()}, ${offerDate.getFullYear()}`}
                                </p>
                                <p>
                                  {
                                    <TimeAgo
                                      date={new Date(
                                        archive.updated_at
                                      ).toUTCString()}
                                    />
                                  }
                                </p>
                              </div>
                            </div>
                            <div className="col-md-2 col-sm-3">
                              <div className="tf_pro_offers1">

                                <p className="job-manager-proposal-client-name">{archive.client_name}</p>
                              </div>
                            </div>
                            <div className="col-md-2 col-sm-3">
                              <div className="tf_pro_offers2">

                                <p className="job-manager-proposal-client-status">{archive.status === 'submitted' ? '-' : archive.status}</p>
                              </div>
                            </div>
                            <div className="clearfix"></div>
                            <hr />
                          </div> */}

                            <div className="clearfix"></div>
                          </React.Fragment>
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
                            <td className="text-center">
                              
                             <NoDataFoundMessage 
                             message={"No items to display"}
                             />
                            </td>
                          </tr>
                        </tbody>
                      </table>
                }
              </div>
              <div className="clearfix"></div>

            </div>
          )}


          {isArchived && (
            <div id="tab_default_2">
              {/* <div className="col-md-12">
                <h2>
                  Received Proposals ({archiveM.length}) {" "}
                  <img
                    style={{ height: "20px", width: "20px" }}
                    data-toggle="tooltip"
                    data-html="true"
                    data-placement="top"
                    title="These are the proposals sent by cloud experts."
                    src={questionIcon}
                    alt="que"
                  />
                </h2>
              </div> */}
              {/* <div className="clearfix"></div>
              <hr /> */}
              <div className="projects__table-sec">
                {
                  !isEmpty(archiveM) ?
                    <table className="table">
                      <thead>
                        <tr className="bg-light">
                          <th style={{ color: "black" }}>
                            Received Proposals ({archiveM.length}) {" "}
                            <img
                              style={{ height: "20px", width: "20px" }}
                              data-toggle="tooltip"
                              data-html="true"
                              data-placement="top"
                              title="These are the proposals sent by cloud experts."
                              src={questionIcon}
                              alt="que"
                            />
                          </th>
                          <th></th>
                          <th></th>
                        </tr>
                      </thead>
                      <tbody>
                        {archiveM.map((archive, idx) => {
                          const archiveDate = new Date(archive.archived_at)
                          const pathname = currentUser.role === "Project Manager" ? `/freelancer-proposal/${archive.uuid}/${archive.job_uuid}` : `/proposal-details/${archive.uuid}`;
                          return <React.Fragment key={idx}>
                            <tr>
                              <td>
                                <Link className="job-manager-proposal-job-title" to={{ pathname: pathname, state: { isarchive: true, archiveId: archive.id, jobUuid: archive.job_uuid } }}><h4>{archive.job_title}</h4></Link>
                              </td>
                              <td>
                                <p>Archived on {`${archiveDate.toLocaleString('default', { month: 'short' })} ${archiveDate.getDate()}, ${archiveDate.getFullYear()}`}</p>
                                <p style={{ display: "none" }}>{<TimeAgo date={new Date(archive.archived_at).toUTCString()} />}</p>
                              </td>
                              <td>
                                <p className="job-manager-proposal-client-name">{archive.client_name}</p>
                              </td>
                            </tr>
                            {/* <div className="row">
                              <div className="col-md-7 col-sm-6">
                                <div className="tf_pro_offers1">
                                  <Link className="job-manager-proposal-job-title" to={{ pathname: pathname, state: { isarchive: true, archiveId: archive.id, jobUuid: archive.job_uuid } }}><h4>{archive.job_title}</h4></Link>
                                </div>
                              </div>
                              <div className="col-md-3 col-sm-3">
                                <div className="tf_pro_offers">
                                  <p>Archived on {`${archiveDate.toLocaleString('default', { month: 'short' })} ${archiveDate.getDate()}, ${archiveDate.getFullYear()}`}</p>
                                  <p>{<TimeAgo date={new Date(archive.archived_at).toUTCString()} />}</p>
                                </div>
                              </div>
                              <div className="col-md-2 col-sm-3">
                                <div className="tf_pro_offers1">
                                  <p className="job-manager-proposal-client-name">{archive.client_name}</p>
                                </div>
                              </div>
                            </div> */}

                            <div className="clearfix"></div>
                          </React.Fragment>
                        })}
                      </tbody>
                    </table>
                    : this.props.isLoading ? (
                      <div className="grid-loader my-feed-loader col-md-12">
                        <Loader type="Grid" color="#00BFFF" height={100} width={100} />
                      </div>
                    ) : <table className="table">
                      <thead>
                        <tr className="bg-light">
                          <th style={{ color: "black" }}>
                            Received Proposals ({archiveM.length}) {" "}
                            <img
                              style={{ height: "20px", width: "20px" }}
                              data-toggle="tooltip"
                              data-html="true"
                              data-placement="top"
                              title="These are the proposals sent by cloud experts."
                              src={questionIcon}
                              alt="que"
                            />
                          </th>
                        </tr>
                      </thead>
                      <tbody>
                        <tr>
                          <td style={{ textAlign: "center" }}>No items to display.</td>
                        </tr>
                      </tbody>
                    </table>
                }
              </div>

            </div>
          )}
        </div>

      </div>
    )
  }
}

const mapStateToProps = state => {
  return {
    managerArchives: state.managerArchives,
    isLoading: state.applicationIsLoading,
    currentUser: state.currentUser
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    getManagerArchives: (type) => dispatch(getManagerArchives(type)),
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(ArchivesManagerContainer)
