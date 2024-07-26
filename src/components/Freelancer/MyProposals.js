import React, { Component } from "react";
import FreelancerHeader from "../miscellaneous/FreelancerHeader";
import {
  getInvitationsForFreelancer,
  getOffersForFreelancer,
} from "../../Actions/freelancerActions";
// import Footer from "../miscellaneous/Footer";
import Loader from "react-loader-spinner";
import { connect } from "react-redux";
import TimeAgo from "react-timeago";
import { Link } from "react-router-dom";
import ReactTooltip from 'react-tooltip';
import _ from "lodash";
import questionIcon from "../../static/images/question.png";
import SubmittedProposal from "./SubmittedProposal";
import ArchivedComponent from "../miscellaneous/ArchivedComponent";
import CertificateTitle from "../../static/images/certification-required.png";
import FreelancerDashboardSideBar from "./FreelancerDashboardSideBar";
import BreadCrumb from "../miscellaneous/BreadCrumb";

class MyProposals extends Component {
  constructor(props, context) {
    super(props, context)
    this.state = {
      isActive: "Submitted_proposals",
      isArchived: false,
    }
  }

  componentDidMount() {
    this.props.getInvites()
    this.props.getOffers()
  }

  showASection = (event) => {
    this.setState({
      isActive: event.target.id
      // isArchived: event.target.id === "archive" ? true : false,
    })
  }

  render() {
    const { isActive, isArchived } = this.state;
    const {
      invitesForFreelancer,
      offersForFreelancer,
      invitationIsLoading,
      offerIsLoading,
    } = this.props;
    return (
      <div id="my-contracts-my-proposal-page">
        <div className={!this.props.loginSteps.showHideSideBar ? "mains my_proposals_page" : "main-add my_proposals_page"} id="">

          <FreelancerHeader history={this.props.history} />
          <div id="tf-cloud-expert-dashboard-root">
            <BreadCrumb step2 link="My Proposals" tab="CE" />

          </div>
          {/* <FreelancerDashboardSideBar history={this.props.history} /> */}
          {/* Start Container */}
          <div>
            <div className="row custom_row">

              <div className="col-lg-2 col-md-2 col-sm-2 col-xs-2 p-0">
                <div className="custom_sticky_container">
                  <div className="position-sticky">
                    <FreelancerDashboardSideBar history={this.props.history} />
                  </div>
                </div>
              </div>

              <div className="col-lg-10 col-md-10 col-sm-10 col-xs-10">
                <div className="pro-right-content-area rightSidecontent">
                  {/* Start Outline */}
                  <div className="project-manager-all-page-equal-top-shifting px-4">
                    <div className="col-md-12 p-0">
                      <div className=" tf_saved_jobs mt-0">
                        <div className="invitesTabBox">
                          <ul className="nav tabcustom job-tab" role="tablist">
                            <li className={isActive === "Submitted_proposals"  ? "active" : ""}>
                              <a
                                href="#tab_default_2"
                                id="Submitted_proposals"
                                onClick={this.showASection}
                                data-toggle="tab"
                              >
                                Submitted proposals
                              </a>
                            </li>
                            <li className={isActive === "Offers" && "active"}>
                              <a
                                href="#tab_default_1"
                                id="Offers"
                                onClick={this.showASection}
                                data-toggle="tab"
                              >
                                Offers
                              </a>
                            </li>
                            
                            <li className={isActive === "Invitations_to_interview" ? "active" : ""}>
                              <a
                                href="#tab_default_2"
                                id="Invitations_to_interview"
                                onClick={this.showASection}
                                data-toggle="tab"
                              >
                                Invitations to interview
                              </a>
                            </li>
                          </ul>
                          {/* <ul className="nav tabcustom job-tab" role="tablist">
                            <li className={isActive && "active"}>
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

                          <div className="tab-content" id="project-manager-archived-job-proposal">

                            <div id="tab_default_1">

                              <div className="tf_hr1">
                                {isActive === "Offers" &&
                                  <div className="">
                                    {/* <div className="col-md-12">
                                      <h2>
                                        Offers ({offersForFreelancer.length}) {" "}
                                        <a data-tip="tooltip" data-type="warning" data-place="right" data-for='offer'>
                                          <img
                                            style={{ height: "20px", width: "20px" }}
                                            src={questionIcon}
                                            alt="que"
                                          />
                                          <ReactTooltip id="offer">These are offers sent from clients.</ReactTooltip>
                                        </a>
                                      </h2>
                                    </div> */}

                                    {/* <div className="clearfix"></div> */}
                                    {/* <hr /> */}
                                    {offerIsLoading && (
                                      <div className="grid-loader">
                                        <Loader
                                          type="Grid"
                                          color="#00BFFF"
                                          height={100}
                                          width={100}
                                        />
                                      </div>
                                    )}

                                    <div className="col-md-12 p-0">
                                      <div className="projects__table-sec">
                                        <table className="table">
                                          {(!_.isEmpty(offersForFreelancer) &&
                                            <thead className="bg-light">
                                              <tr>
                                                <th>Job Title</th>
                                                <th>Received Date</th>
                                                <th>Cloud Expert</th>
                                              </tr>
                                            </thead>)}
                                          <tbody>
                                            {!_.isEmpty(offersForFreelancer) && !offerIsLoading ? (
                                              offersForFreelancer.map((offer) => {
                                                const offerDate = new Date(offer.created_at)
                                                return (
                                                  <tr key={offer.id} className="single-offer-list">
                                                    <td className="">
                                                      <div className="tf_pro_offers1">
                                                        <Link
                                                          to={{
                                                            pathname: `/offer-details/${offer.uuid}`,
                                                            state: {
                                                              isoffer: true,
                                                              offerId: offer.id,
                                                              jobUuid: offer.job_uuid,
                                                            },
                                                          }}
                                                        >
                                                          <p>
                                                            <b>
                                                              {offer.job_title}
                                                              {
                                                                offer.certified_job ?
                                                                  <img title="Certification Required" src={CertificateTitle} className="certification-required" alt="" />
                                                                  :
                                                                  ''
                                                              }
                                                            </b>
                                                          </p>
                                                        </Link>

                                                      </div>
                                                    </td>
                                                    <td className="">
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
                                                                offer.created_at
                                                              ).toUTCString()}
                                                            />
                                                          }
                                                        </p>
                                                      </div>
                                                    </td>
                                                    <td className="">
                                                      <p>{offer.client_name}</p>
                                                    </td>
                                                  </tr>
                                                )
                                              })
                                            )
                                              : (
                                                <tr>
                                                  <td colSpan='4'>
                                                    <p className="">
                                                      No offers received yet.
                                                    </p>
                                                  </td>
                                                </tr>
                                              )}
                                          </tbody>
                                        </table>
                                      </div>
                                    </div>

                                    <div className="clearfix"></div>
                                  </div>
                                }
                                {isActive === "Submitted_proposals" &&
                                  <div className="">
                                    <SubmittedProposal />
                                  </div>
                                }

                                {isActive === "Invitations_to_interview" &&
                                  <div className="">

                                    {/* <div className="col-md-12">
                                      <h2>
                                        Invitations to interview (
                                        {invitesForFreelancer.length}){" "}
                                        <a data-tip="tooltip" data-type="warning" data-place="right" data-for='invite'>
                                          <img
                                            style={{ height: "20px", width: "20px" }}
                                            src={questionIcon}
                                            alt="que"
                                          />
                                          <ReactTooltip id="invite">Clients may contact you first about a job posting. If you don't want these inquiries, you can set your profile to private.</ReactTooltip>
                                        </a>
                                      </h2>
                                    </div> */}
                                    {/* <div className="clearfix"></div> */}
                                    {/* <hr /> */}
                                    {invitationIsLoading && (
                                      <div className="grid-loader">
                                        <Loader
                                          type="Grid"
                                          color="#00BFFF"
                                          height={100}
                                          width={100}
                                        />
                                      </div>
                                    )}
                                    <div className="projects__table-sec">
                                      <table className="table">
                                        {(!_.isEmpty(invitesForFreelancer) &&
                                          <thead className="bg-light">
                                            <tr>
                                              <th>Job Title</th>
                                              <th>Received Date</th>
                                              <th>Cloud Expert</th>
                                            </tr>
                                          </thead>)}
                                        <tbody>
                                          {!_.isEmpty(invitesForFreelancer) &&
                                            !invitationIsLoading ? (
                                            invitesForFreelancer.map((invitation) => {
                                              const invitationDate = new Date(
                                                invitation.created_at
                                              )
                                              return (
                                                <tr key={invitation.id}>
                                                  <td className="">
                                                    <div className="tf_pro_offers1">
                                                      <Link
                                                        to={{
                                                          pathname: `/invitation-details/${invitation.uuid}`,
                                                          state: {
                                                            isInvitation: true,
                                                            invitationId: invitation.id,
                                                            jobUuid: invitation.job_uuid,
                                                          },
                                                        }}
                                                      >
                                                        <p>
                                                          <b>
                                                            {invitation.job_title}
                                                            {
                                                              invitation.certified_job ?
                                                                <img title="Certification Required" src={CertificateTitle} className="certification-required" alt="" />
                                                                :
                                                                ''
                                                            }
                                                          </b>
                                                        </p>
                                                      </Link>

                                                    </div>
                                                  </td>
                                                  <td className="">
                                                    <div className="tf_pro_offers">
                                                      <p>
                                                        Received on{" "}
                                                        {`${invitationDate.toLocaleString(
                                                          "default",
                                                          { month: "short" }
                                                        )} ${invitationDate.getDate()}, ${invitationDate.getFullYear()}`}
                                                      </p>
                                                      <p>
                                                        {
                                                          <TimeAgo
                                                            date={new Date(
                                                              invitation.created_at
                                                            ).toUTCString()}
                                                          />
                                                        }
                                                      </p>
                                                    </div>
                                                  </td>
                                                  <td className="">
                                                    <div className="px-10">
                                                      <p>{invitation.client_name}</p>
                                                    </div>
                                                  </td>
                                                </tr>
                                              )
                                            })
                                          ) : (
                                            <tr>
                                              <td colSpan='4'>
                                                <p className="">No invitations received yet.</p>
                                              </td>
                                            </tr>
                                          )}
                                        </tbody>
                                      </table>
                                    </div>


                                    <div className="clearfix"></div>
                                  </div>
                                }

                              </div>
                            </div>

                            {isArchived && (
                              <div id="tab_default_2">
                                <ArchivedComponent />
                              </div>
                            )}
                          </div>

                        </div>
                      </div>
                    </div>
                  </div>
                  {/* End Outline */}

                </div>
              </div>

              {/* End Container */}
            </div>
          </div>
          {/* <Footer /> */}
        </div>
      </div>

    )
  }
}

const mapStateToProps = (state) => ({
  ...state,
})

const mapDispatchToProps = (dispatch) => {
  return {
    getInvites: () => dispatch(getInvitationsForFreelancer()),
    getOffers: () => dispatch(getOffersForFreelancer()),
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(MyProposals)
