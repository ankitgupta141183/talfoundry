import React, { Component } from "react";
import FreelancerHeader from "../miscellaneous/FreelancerHeader";
import Footer from "../miscellaneous/Footer";
import fileLogo from "../../static/images/file.png";
import { logOutAction } from "../../Actions/logOutAction";
import { connect } from "react-redux";
import ReadMoreAndLess from "react-read-more-less";
import { fetchJobInvitation, savedApproveFreelancer, removeJobsFreelancer } from "../../Actions/freelancerActions";
import { getJobsClientHistory } from '../../Actions/freelancerJobActions';
import TimeAgo from "react-timeago";
import _ from "lodash";
import { responseToInvitation } from "../../Actions/freelancerInvitationActions";
import Loader from "react-loader-spinner";
import { Link } from "react-router-dom";
import { isEmpty } from "lodash";
import loadMoreSrc from "../../static/images/loadMore.gif";
import Skills from '../Common/Skills'
import FreelancerDashboardSideBar from "./FreelancerDashboardSideBar";
import BreadCrumb from "../miscellaneous/BreadCrumb";
import ErrorSweetAlert from "../CommonComponets/SweetAlert/ErrorSweetAlert";
import SuccessSweetAlert from "../CommonComponets/SweetAlert/SuccessSweetAlert";


function formatDateToEnglish(date) {
  const monthNames = ["Jan", "Feb", "Mar", "Apr", "May", "Jun",
   "Jul", "Aug", "Sept", "Oct", "Nov", "Dec"
  ];
      var d = new Date(date),
          month = '' + (monthNames[d.getMonth()]),
          day = '' + d.getDate(),
          year = d.getFullYear();

      if (month.length < 2)
          month = '0' + month;
      if (day.length < 2)
          day = '0' + day;
      return [month,year].join(' ');
}


class InvitationDetails extends Component {
  constructor(props, context) {
    super(props, context)
    this.state = {
      isInvitation: false,
      invitationId: "",
      jobUuid: "",
      isInviteDeclined: false,
      isInviteAccepted: false,
      pageForHistory: 1,
      isLoading: false,
      loading: false,
      hideShowMore: false,
      jobsHistory: []
    }
  }

  componentDidMount() {
    // this.props.fetchJobInvitation(this.props.match.params.id)
    this.props.fetchJobInvitation(this.props.match.params.id).then(
      (res) =>{
       this.props.getJobsClientHistory(res.invitation.job.user.uuid,this.state.pageForHistory).then((res)=>{
         this.setState({
           jobsHistory: res
         })
       })
    }).catch(err => {
      console.log('1')
    })
  }

  componentWillReceiveProps(nextProps) {
    // console.log("nextProps",nextProps)


    this.setState({
      invitationId: this.props.invitationJobForFreelancer && this.props.invitationJobForFreelancer.id,
      jobUuid: nextProps.invitationJobForFreelancer.job && nextProps.invitationJobForFreelancer.job.uuid,
      isLoading: nextProps && nextProps.applicationIsLoading,
    })
    if (this.props.location.pathname !== nextProps.location.pathname) {
      this.props.fetchJobInvitation(nextProps.match.params.id).then(
          (res) =>{
           this.props.getJobsClientHistory(res.invitation.job.user.uuid,this.state.pageForHistory).then((res)=>{
             this.setState({
               jobsHistory: res
             })
           })
        }).catch(err => {
          console.log('1')
        })
    }
  }

  invitationResponse = (e) => {
    const { jobUuid } = this.state;
    const invitationId = this.props.match.params.id || this.state.invitationId;
    const data = {
      invite: {
        status: e.target.id,
      },
    }
    if (e.target.id === "Accepted") {
      this.props.responseToInvitation(invitationId, data).then((res) => {
        if (res.status === 200) {
          this.setState({ isInviteAccepted: true, jobUuid: jobUuid })
        }
      })
    } else {
      this.props.responseToInvitation(invitationId, data).then((res) => {
        if (res.status === 200) {
          this.setState({ isInviteDeclined: true })
        }
      })
    }
  }

  handleSavedJobs = (id, event) => {
    if(event.currentTarget.firstElementChild.classList.contains('fa-heart-o')) {
      event.currentTarget.firstElementChild.classList.remove("fa-heart-o")
      event.currentTarget.firstElementChild.classList.add("fa-heart")
      this.props.savedApprove(id)
    } else {
      event.currentTarget.firstElementChild.classList.remove("fa-heart")
      event.currentTarget.firstElementChild.classList.add("fa-heart-o")
      this.props.removeJobs(id)
    }
  }

  hideInviteAcceptAlert = () => {
    const jobUuid = this.state.jobUuid;
    this.setState({ isInviteAccepted: false, jobUuid: jobUuid })
    this.props.history.push(`/submit-proposal/${jobUuid}`)
  }

  hideInvitedeclineAlert = () => {
    this.setState({ isInviteDeclined: false })
    this.props.history.push(`/my-proposals`)
  }

  returnAttachements = (job_documents) => {
    let attachment = []
    job_documents.map(jobPer => {
       attachment.push(<div className="">
        <a target="_blank" rel="noopener noreferrer" href={jobPer} title={jobPer.split('/')[jobPer.split('/').length - 1]}>
          <img src={fileLogo} alt="fileLogo"/>
          <span style={{fontSize: '13px'}}>&nbsp;&nbsp;{jobPer.split('/')[jobPer.split('/').length - 1]} </span>
        </a>
        </div>
        )
        return jobPer
      })
    return <div className="row"> {attachment} </div>
  }

  handleShowMore = () => {
    let {jobsHistory} = this.state
    let newJobs = jobsHistory
    // const {jobForFreelancer} = this.props;
    let that = this
    this.setState({pageForHistory: this.state.pageForHistory + 1},() => {
      this.props.getJobsClientHistory(that.props.invitationJobForFreelancer.job.user.uuid,
        this.state.pageForHistory).then((res)=>{
          newJobs.push(...res)
          // console.log('newJobs',newJobs)
          if(res.length < 5){
            this.setState({
              hideShowMore: true,
              jobsHistory: newJobs
           })
          }
          else{
            this.setState({
              jobsHistory: newJobs
           })

          }

      })
    })

  }

  returnJobHistory = () => {
    let jobhistoryArr = []
    let today = new Date()
    today.setHours(0,0,0,0)

    this.state.jobsHistory.map((job, idx) => {
      let expDate =  new Date(job.job_expiration_date)
      expDate.setHours(0,0,0,0)
      jobhistoryArr.push(<div key={idx}>
        <div className="tf_aws_service">
          <div className="col-md-9 col-sm-9 col-xs-9 tf_full_width">
            <h3 className = "clients_history">{job.job_title}</h3>
            {job.job_description && <ReadMoreAndLess
                ref={this.ReadMore}
                className="read-more-content"
                charLimit={250}
                readMoreText="Read more"
                readLessText="Read less"
              >
                  {job.job_description}
              </ReadMoreAndLess>}
          </div>
          <div className="col-md-3 col-sm-3  col-xs-3 tf_full_width tf_hours">
            <p>
             {expDate < today ?
             'In Progress'
             :
             `${formatDateToEnglish(job.created_at)}
               -
               ${formatDateToEnglish(job.job_expiration_date)}`
             }
            </p>
          </div>
          <div className="clearfix"></div>
        </div>
        <div className="clearfix"></div>
      </div>)
      return job
    })
    return jobhistoryArr
  }

  render() {
    const jobForFreelancer =
      !_.isEmpty(this.props.invitationJobForFreelancer) &&
      this.props.invitationJobForFreelancer.job;
    // const requiredExpertise = jobForFreelancer.job_expertise_required
    //   ? jobForFreelancer.job_expertise_required
    //   : [];
    const additionalExpertise = jobForFreelancer.job_additional_expertise_required
      ? jobForFreelancer.job_additional_expertise_required
      : [];
    const speciality = jobForFreelancer && jobForFreelancer.job_speciality ? jobForFreelancer.job_speciality : [];
    const expertise = [...additionalExpertise, ...speciality];
    const { isLoading, isInviteAccepted, isInviteDeclined, jobsHistory, hideShowMore } = this.state;

    const date = jobForFreelancer && jobForFreelancer.user ? jobForFreelancer.user.created_at : "";
    const proposalDate = jobForFreelancer && jobForFreelancer.user ? new Date(date) : "";

    return (
      <div>
        <FreelancerHeader history={this.props.history}/>
        {isInviteDeclined && (
          // <div className="invite-response">
          //   <SweetAlert
          //     danger
          //     confirmBtnText="Ok"
          //     confirmBtnBsStyle="danger"
          //     // title="Invitation declined."
          //     onConfirm={this.hideInvitedeclineAlert}
          //   >
          //     <div id="EditJobSuccessMessagePopupInnerContent">
          //       <img src={ErrorImg} alt="" id="rightCheckIconImage" />
          //       <h4>
          //         <strong>
          //           Invitation declined.
          //         </strong>
          //       </h4>
          //     </div>
          //   </SweetAlert>
          // </div>
          <ErrorSweetAlert 
          show={true}
          handleConfirm={this.hideInvitedeclineAlert}
          message={"Invitation declined."}
          />
        )}
        {isInviteAccepted && (
          // <div className="invite-response">
          //   <SweetAlert
          //     succss
          //     confirmBtnText="Ok"
          //     confirmBtnBsStyle="success"
          //     onConfirm={this.hideInviteAcceptAlert}
          //   >
          //   <div id="EditJobSuccessMessagePopupInnerContent">

          //     <img src={inviteIcon} alt="" id="rightCheckIconImage" />
          //     <h4>
          //       <strong>
          //       Invitation Accepted.<br />
          //       </strong>
          //     </h4>
          //   </div>

          //   </SweetAlert>
          // </div>
          <SuccessSweetAlert 
          show={true}
          handleConfirm={this.hideInviteAcceptAlert}
          message={"Invitation Accepted."}
          />
        )}
        <div id="tf-cloud-expert-dashboard-root" className="">
          {/* <FreelancerDashboardSideBar history={this.props.history}/> */}
          <BreadCrumb step={"step6"} link="Job Details"/>
          <div className="d-flex">
            <div className="col-md-2 p-0">
              <FreelancerDashboardSideBar history={this.props.history}/>
            </div>
            <div className="col-md-10 pt-2">
            <div className="col-md-12 tf_pad_res job-details-pd">
              <div className="col-md-6">
                  <h2 className="m-0 page-title-white">Job Details</h2>
              </div>
              <div className="col-md-6">
                {/*<h2 className="page-title-white"><Link href="#"><i className="fa fa-angle-left"></i> Back</Link></h2>*/}
              </div>

              <div className="tf_aws_1">
                {isLoading && (
                  <div className="grid-loader my-feed-loader col-md-8">
                    <Loader type="Grid" color="#00BFFF" height={100} width={100} />
                  </div>
                )}
                {!isLoading && (
                  <div className="col-lg-9 col-md-8 invitation_page_spacing">
                    <div className="margin-tops">
                      <div className="tf_freelancer_pro ">

                        <div className="col-md-12 title_head">
                          <h2>{jobForFreelancer.job_title}</h2>
                          <h6>
                            Posted{" "}
                            <TimeAgo date={new Date(jobForFreelancer.created_at).toUTCString()} />
                          </h6>
                        </div>
                        <div className="clearfix"></div>
                        <hr />

                        <div className="col-md-12">
                            <h5><strong>Activity on this job</strong></h5>
                          </div>
                        <div className="clearfix"></div>

                        <div className="row">
                            <div className="col-md-2">
                              Proposals: <strong>{jobForFreelancer.proposal_count}</strong>
                            </div>
                            <div className="col-md-4">
                              Interviewing: <strong>&nbsp;1 day ago</strong>
                            </div>
                            <div className="col-md-3">
                              Invite sent: <strong>0</strong>
                            </div>
                            <div className="col-md-3">
                              Unanswered invites: <strong>0</strong>
                            </div>
                          </div>
                          <div className="clearfix"></div>
                        <hr />

                        <div className="col-md-12 description p-3">
                          {jobForFreelancer.job_description && (
                            <ReadMoreAndLess
                              // ref={this.ReadMore}
                              className="read-more-content"
                              charLimit={300}
                              readMoreText="Read more"
                              readLessText="Read less"
                            >
                              {jobForFreelancer.job_description}
                            </ReadMoreAndLess>
                          )}
                        </div>
                        <div className="clearfix"></div>
                      </div>
                    </div>

                    <div className="margin-tops">
                      <div className="tf_freelancer_pro">
                        <div className="col-md-12">
                          <div className="col-md-6 nopad">
                            {jobForFreelancer && jobForFreelancer.job_pay_value && (
                              <p>
                                {" "}
                                Budget: $
                                {isNaN(jobForFreelancer.job_pay_value)
                                  ? "00"
                                  : parseFloat(jobForFreelancer.job_pay_value).toFixed(2)}
                              </p>
                            )}

                            <p>{jobForFreelancer.job_pay_type}</p>
                          </div>
                          <div className="col-md-6 nopad">
                            <p><strong>{jobForFreelancer.job_experience_level}</strong></p>
                            <p>I am looking for a mix of experience and value</p>
                          </div>
                        </div>
                        <div className="clearfix"></div>
                        <hr />


                        <div className="col-md-12  project_type">
                          <p>
                            <strong>Project Type: </strong>
                            {jobForFreelancer.job_type}
                          </p>
                          <p>
                            <strong>Attachments: </strong>
                          </p>
                          {jobForFreelancer &&
                          !isEmpty(jobForFreelancer.job_documents) &&
                          jobForFreelancer.job_documents ? this.returnAttachements(jobForFreelancer.job_documents) : (
                            <p> No Attachment</p>
                          )}
                        </div>
                        <div className="clearfix"></div>
                      </div>
                    </div>
                    <div className="margin-tops">
                      <div className="tf_freelancer_pro">
                        <div className="col-md-12">
                          <h5>Platform</h5>
                          {jobForFreelancer.job_category &&
                            jobForFreelancer.job_category.map((category, idx) => {
                              return (
                                <div key={idx} className="tf_skills">
                                  <h6>{(category.includes("IBM") ? "IBM Cloud" : category)}</h6>
                                </div>
                              )
                            })}
                        </div>
                        <div className="clearfix"></div>

                        <div className="col-md-12 tf_exper">
                          <h5>Tech Stack</h5>
                          {expertise.length > 0 &&
                            <Skills
                              skill = {expertise}
                              to="#"
                              id={0}
                              displayCount = {expertise.length}
                            />
                          }
                        </div>
                        <div className="clearfix"></div>


                        <div className="col-md-12">
                          <div className="col-md-6 nopad">
                            <h5>Preferred Qualifications</h5>
                            <p>
                              Language Proficiency:{" "}
                              <strong>
                                {!_.isEmpty(jobForFreelancer.job_qualification) &&
                                  jobForFreelancer.job_qualification.english_level}
                              </strong>{" "}
                              <i className="fa fa-check-circle" aria-hidden="true"></i>
                            </p>
                            <p>
                              Location:{" "}
                              <strong>
                                {!_.isEmpty(jobForFreelancer.job_qualification) &&
                                  jobForFreelancer.job_qualification.location}
                              </strong>{" "}
                              <i className="fa fa-check-circle" aria-hidden="true"></i>
                            </p>
                          </div>
                        </div>
                        <div className="clearfix"></div>
                      </div>
                    </div>

                    <div className="margin-tops">
                        <div className="tf_freelancer_pro tf_feedback">
                          <div className="col-md-12  col-sm-12 col-xs-12 tf_full_width">
                            <h2>Client’s recent history
                              ({jobsHistory.length})</h2>
                          </div>
                          <div className="clearfix"></div>
                          <hr/>


                          {jobsHistory.length > 0 ?
                            this.returnJobHistory() : <p>No items to display</p>
                            }

                             {!hideShowMore &&  <button
                              className="load_more_btn_find_work mt-20"
                              onClick={this.handleShowMore}
                              >
                              Show More
                              </button>
                              }
                              {this.props.applicationIsChangeLoading &&
                                <img src={loadMoreSrc} alt="loader" />
                               }
                        </div>
                      </div>



                    <div className="margin-tops">
                      <div className="tf_freelancer_pro tf_feedback">
                        <div className="col-md-12">
                          <h5>Original message from client</h5>
                        </div>
                        <hr />
                        <div className="clearfix"></div>
                        <div className="col-md-12">
                          <div className="tf_employe">
                            {/* <h5>AWS Services</h5> */}
                            <span>{this.props.invitationJobForFreelancer.message || ""}</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                )}
                <div className="col-lg-3 col-md-4">
                  <div className="tf_freelancer_pro_right">
                    <div>
                      <Link
                        href="#"
                        id="Accepted"
                        onClick={
                          this.props.invitationJobForFreelancer &&
                          this.props.invitationJobForFreelancer.status === "Open" &&
                          this.invitationResponse
                        }
                        className={
                          this.props.invitationJobForFreelancer &&
                          this.props.invitationJobForFreelancer.status === "Open"
                            ? "tf_invite_button"
                            : "tf_invite_disabled"
                        }
                        data-toggle="modal"
                        data-target="#myModal"
                      >
                        ACCEPT INTERVIEW
                      </Link>
                      <Link
                        href="#"
                        id="Declined"
                        onClick={
                          this.props.invitationJobForFreelancer &&
                          this.props.invitationJobForFreelancer.status === "Open" &&
                          this.invitationResponse
                        }
                        className={
                          this.props.invitationJobForFreelancer &&
                          this.props.invitationJobForFreelancer.status === "Open"
                            ? "tf_invite_button"
                            : "tf_invite_disabled"
                        }
                        data-toggle="modal"
                        data-target="#myModal"
                      >
                        DECLINE
                      </Link>
                    </div>
                    {/* } */}
                    {
                      (this.props.invitationJobForFreelancer && this.props.invitationJobForFreelancer.job) ? (
                          <Link href="#" onClick = {this.handleSavedJobs.bind(this, this.props.invitationJobForFreelancer.job.id)} className="tf_invite_button" title="Favorited">
                            <i className={ this.props.invitationJobForFreelancer.job.favorited_job ? "fa fa-heart" :  "fa fa-heart-o"}></i> SAVE JOB
                          </Link>
                        ) : null
                    }
                  </div>

                  <div className="clearfix"></div>

                  <div className="tf_freelancer_pro_right">
                    <h5>About the client</h5>
                    <p>
                      <i className="fa fa-check-circle" aria-hidden="true"></i> Payment Verified
                    </p>
                    <p>
                      <span>
                        <i className="fa fa-star"></i>
                        <i className="fa fa-star"></i>
                        <i className="fa fa-star"></i>
                        <i className="fa fa-star"></i>
                        <i className="fa fa-star"></i>
                      </span>{" "}
                      4.89 of 130 reviews
                    </p>
                    <h6>{jobForFreelancer.user && jobForFreelancer.user.country}</h6>
                    <p>{jobForFreelancer.user && jobForFreelancer.user.full_name} 07:13 pm</p>
                    <h6>
                      {jobForFreelancer.user && jobForFreelancer.user.number_of_jobs_posted} jobs
                      posted
                    </h6>
                    <p>65% hire rate, 11 open jobs</p>
                    <h6>$12.21/hr avg hourly rate paid</h6>
                    <p>1,300 hours</p>
                    {!isEmpty(jobForFreelancer.user && jobForFreelancer.user.created_at) ? (
                      <em>
                        Member since{" "}
                        {`${proposalDate.toLocaleString("default", {
                          month: "short",
                        })} ${proposalDate.getDate()}, ${proposalDate.getFullYear()}`}
                      </em>
                    ) : (
                      ""
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>
            </div>
        </div>
        <Footer />
      </div>
    )
  }
}

const mapStateToProps = (state) => ({
  ...state,
})

const mapDispatchToProps = (dispatch) => {
  return {
    logOut: () => dispatch(logOutAction()),
    savedApprove: (id) => dispatch(savedApproveFreelancer(id)),
    removeJobs: (id) => dispatch(removeJobsFreelancer(id)),
    fetchJobInvitation: (id) => dispatch(fetchJobInvitation(id)),
    responseToInvitation: (id, data) => dispatch(responseToInvitation(id, data)),
    getJobsClientHistory: (userId,page) => dispatch(getJobsClientHistory(userId,page))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(InvitationDetails)
