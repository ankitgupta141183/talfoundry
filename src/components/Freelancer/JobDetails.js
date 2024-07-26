import React, { Component } from "react";
import LandingPageHeader from '../miscellaneous/LandingPageHeader';
import ProjectManagerHeader from '../../components/miscellaneous/ProjectManagerHeader';
import FreelancerHeader from "../miscellaneous/FreelancerHeader";
import { connect } from "react-redux";
import ReadMoreAndLess from 'react-read-more-less';
import TimeAgo from 'react-timeago';
import { savedApproveFreelancer, removeJobsFreelancer, fetchFreelancerJob } from '../../Actions/freelancerActions';
import { getJobsClientHistory } from '../../Actions/freelancerJobActions';
import { responseToInvitation } from '../../Actions/freelancerInvitationActions';
import { logOutAction } from "../../Actions/logOutAction";
import _ from 'lodash';
import fileLogo from '../../static/images/file.png';
import { Link } from 'react-router-dom';
import { isEmpty } from 'lodash';
import { getCurrentUserDetails } from '../../Actions/applicationActions';
// import Footer from '../miscellaneous/Footer';
import certification_required from "../../static/images/certification-required.png";
import CITYWITHCOUNTRY from "../../constants/cityWithCountries";
import ReactCountryFlag from "react-country-flag"
import globeSrc from "../../static/images/globe.png";
import SignUpPopUpNew from "../miscellaneous/SignUpPopUpNew";
import loadMoreSrc from "../../static/images/loadMore.gif";
import Skills from '../Common/Skills'
import FreelancerDashboardSideBar from "./FreelancerDashboardSideBar";
import BreadCrumb from "../miscellaneous/BreadCrumb";
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
  return [month, year].join(' ');
}

class JobDetails extends Component {
  constructor(props, context) {
    super(props, context)
    this.state = {
      isInvitation: false,
      invitationId: "",
      jobUuid: "",
      fromDashboard: false,
      isSearchJobNew: false,
      isInviteDeclined: false,
      isInviteAccepted: false,
      jobsHistory: [],
      pageForHistory: 1,
      hideShowMore: false,
      isDeleted: false,
    }
  }

  componentDidMount() {
    const { location } = this.props;
    if (this.props.location.state) {
      this.setState({ fromDashboard: location.state.isDashboard, isSearchJobNew: location.state.isSearchJobNew })
    }
    this.props.fetchFreelancerJob(this.props.match.params.id, this.props.match.params.isPublic).then(
      (res) => {
        this.props.getJobsClientHistory(res.job.user.uuid, this.state.pageForHistory).then((res) => {
          this.setState({
            jobsHistory: res
          })
        })
      }).catch(err => {
        console.log('1')
      })

    this.props.getCurrentUserDetails()
  }

  componentWillReceiveProps(nextProps) {
    this.setState({
      isInvitation: this.props.history.location.state && this.props.history.location.state.isInvitation,
      invitationId: this.props.history.location.state && this.props.history.location.state.invitationId,
      jobUuid: this.props.history.location.state && this.props.history.location.state.jobUuid
    })
  }

  invitationResponse = (e) => {
    const { jobUuid } = this.state;
    const data = {
      invite: {
        status: e.target.id
      }
    }
    if (e.target.id === "Accept") {
      this.props.responseToInvitation(this.state.invitationId, data)
        .then((res) => {
          if (res.status === 200) {
            this.setState({ isInviteAccepted: true, jobUuid: jobUuid })
          }
        })
    } else {
      this.props.responseToInvitation(this.state.invitationId, data)
        .then((res) => {
          if (res.status === 200) {
            this.setState({ isInviteDeclined: true })
          }
        })
    }
  }

  handleSavedJobs = (id) => {
    this.props.savedApprove(id)
      .then((res) => {
        if (res.status === 200) {
          this.setState({ isDeleted: true, msg: "Job saved Successfully" })
          this.props.fetchFreelancerJob(this.props.match.params.id)
        }
      })
  }

  handleRemovedJobs = (id) => {
    this.props.removeJobs(id)
      .then((res) => {
        if (res.status === 200) {
          this.setState({ isDeleted: true, msg: "Job unsaved successfully" })
          this.props.fetchFreelancerJob(this.props.match.params.id)
        }
      })
  }
  hideAlert = () => {
    this.setState({ isDeleted: false, msg: "" })
  }

  handleCamelCase = (value) => {
    return `${value.substring(0, 1).toUpperCase()}${value.substring(1, value.length)}`
  }

  returnCountryFlag = (qual) => {
    let data;

    if (qual && qual.location) {
      let codeObj = CITYWITHCOUNTRY.find(c => c.city === qual.location)

      if (codeObj && codeObj.code) {
        data = <ReactCountryFlag
          countryCode={codeObj.code}
          svg
          style={{
            width: "1.8em",
            height: "1.0em",
            float: "",
            marginTop: '-4px',
            marginLeft: "5px",
            marginRight: "2px",
          }}
          title={"country"}
        />
      }
      else {
        data = <span> <img
          src={globeSrc}
          style={{ height: '16px', width: '16px', marginRight: '5px', marginTop: '-2px' }} alt=""
        />
        </span>
      }
    }

    else {
      data = <span> <img
        src={globeSrc}
        style={{ height: '16px', width: '16px', marginRight: '5px', marginTop: '-2px' }} alt=""
      />
        Anywhere
      </span>
    }
    return data
  }


  closeModal = () => {
    this.setState({ openLoginModal: false });
  }

  returnAttachements = () => {
    const { jobForFreelancer } = this.props;
    let attachment = []

    if (jobForFreelancer && jobForFreelancer.job_documents && jobForFreelancer.job_documents.length > 0) {
      jobForFreelancer.job_documents.map(jobPer => {
        attachment.push(<p className="col-sm-2" style={{ width: '30%' }}>
          <a target="_blank" rel="noopener noreferrer" href={jobPer} title={jobPer.split('/')[jobPer.split('/').length - 1]}>
            <img src={fileLogo} alt="fileLogo" />
            <span style={{ fontSize: '13px' }}>&nbsp;&nbsp;{jobPer.split('/')[jobPer.split('/').length - 1]} </span>
          </a>
        </p>)
        return jobPer
      })

    }
    else {
      attachment = 'None'
    }
    return <div className="row"> {attachment} </div>
  }

  handleShowMore = () => {
    let { jobsHistory } = this.state
    let newJobs = jobsHistory
    // const {jobForFreelancer} = this.props;
    let that = this
    this.setState({ pageForHistory: this.state.pageForHistory + 1 }, () => {
      this.props.getJobsClientHistory(that.props.jobForFreelancer.user.uuid,
        this.state.pageForHistory).then((res) => {
          newJobs.push(...res)
          // console.log('newJobs',newJobs)
          if (res.length < 5) {
            this.setState({
              hideShowMore: true,
              jobsHistory: newJobs
            })
          }
          else {
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
    today.setHours(0, 0, 0, 0)

    this.state.jobsHistory.map((job, idx) => {
      let expDate = new Date(job.job_expiration_date)
      expDate.setHours(0, 0, 0, 0)
      jobhistoryArr.push(<div key={idx}>
        <div className="tf_aws_service">
          <div className="col-md-9 col-sm-9 col-xs-9 tf_full_width">
            <h3 className="clients_history">{job.job_title}</h3>
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
    const { jobForFreelancer } = this.props;
    // console.log("this.props",this.props.currentUser)
    const { jobsHistory, hideShowMore } = this.state;
    // const requiredExpertise = jobForFreelancer.job_expertise_required ? jobForFreelancer.job_expertise_required : [];
    const additionalExpertise = jobForFreelancer.job_additional_expertise_required ? jobForFreelancer.job_additional_expertise_required : [];
    const speciality = jobForFreelancer && jobForFreelancer.job_speciality ? jobForFreelancer.job_speciality : []
    const expertise = [...additionalExpertise, ...speciality]
    const date = jobForFreelancer && jobForFreelancer.user ? jobForFreelancer.user.created_at : '';
    const proposalDate = jobForFreelancer && jobForFreelancer.user ? new Date(date) : '';

    return (


      <div>
        {!_.isEmpty(this.props.currentUser) ? this.props.currentUser.role === "Project Manager" ?
          <ProjectManagerHeader history={this.props.history} /> :
          <FreelancerHeader history={this.props.history} /> : <LandingPageHeader history={this.props.history} />}
          <div id="tf-project-manager-dashboard-root">
            {!_.isEmpty(this.props.currentUser) ? this.props.currentUser.role === "Project Manager" ?
              <BreadCrumb step={"step6"} link="Job Details" /> :
              <BreadCrumb step={"step6"} link="Job Details" /> : null}
          </div>
        <div className="mt-0" id="">
          {/* job-details-header-section */}

          <div className={!this.props.loginSteps.showHideSideBar ? "job-details-header-section mains p-0" : "job-details-header-section main-add"}>
            <div className="row custom_row">
              <div className="col-lg-2 col-md-2 col-sm-2 col-xs-2 p-0">
                {!_.isEmpty(this.props.currentUser) && this.props.currentUser.role === "Freelancer" &&
                  <div className="custom_sticky_container">
                    <div className="position-sticky">
                    <FreelancerDashboardSideBar history={this.props.history} />
                    </div>
                  </div>
                }
              </div>
              <div className={!_.isEmpty(this.props.currentUser) ? "col-lg-10 col-md-10 col-sm-10 col-xs-10 m-auto" : "col-lg-12 col-md-12 col-sm-12 col-xs-12 jobDetailsContent"} >
                {
                  this.state.isDeleted &&
                  (
                    // <div className="app-pro2-swal">
                    //   <SweetAlert onConfirm={() => this.hideAlert()}>

                    //     <div id="EditJobSuccessMessagePopupInnerContent">
                    //       <img src={inviteIcon} alt="" id="rightCheckIconImage" />
                    //       <h4>
                    //         {" "}
                    //         <strong>
                    //           {this.state.msg}.
                    //         </strong>
                    //       </h4>
                    //     </div>
                    //   </SweetAlert>
                    // </div>
                    <SuccessSweetAlert 
                    show={true}
                    handleConfirm={this.hideAlert}
                    message={this.state.msg}
                    />
                  )
                }

                <div className="">
                  {(!isEmpty(jobForFreelancer.job_application_status) && jobForFreelancer.job_application_status !== 'withdrawal') &&
                    <div className="col-md-12">
                      <div className="">
                        <div className="tf_freelancer_pro tf_attach">
                          <div className="col-md-12"><p>You have already submitted a proposal</p><Link to={`/proposal-details/${jobForFreelancer.job_application_id}`}>View Proposal</Link>
                          </div>
                        </div>
                      </div>
                    </div>}
                  <div className="tf_aws_1 m-0">
                    <div className="col-lg-9 col-md-8">
                      <div className="">

                        <div className="">

                          <div className="margin-tops m-0">
                            <div className="row">
                              <div className="col-md-12">
                                <h2 className="job-details-job-heading">
                                  {jobForFreelancer.job_title}

                                  {
                                    !(jobForFreelancer
                                      && jobForFreelancer.get_job_qualification &&
                                      jobForFreelancer.get_job_qualification.qualification_group === "No")
                                      ?
                                      <img title="Certification Required" src={certification_required} alt="Certified" className="certification-required" />
                                      :
                                      ''
                                  }
                                </h2>
                                <h6>Posted
                                  <TimeAgo date={new Date(jobForFreelancer.created_at).toUTCString()} /></h6>
                              </div>
                            </div>


                            <div className="clearfix"></div>

                            <div className="row">
                              <div className="col-md-12">
                                <h5><strong>Activity on this job</strong></h5>
                              </div>

                              <div className="clearfix"></div>

                              <div className="col-md-3">
                                Proposals: <strong>{jobForFreelancer.proposal_count}</strong>
                              </div>
                              <div className="col-md-4">
                                Last Viewed: <strong>&nbsp;<TimeAgo date={new Date(jobForFreelancer.last_viewed_at).toUTCString()} /></strong>
                              </div>
                              <div className="col-md-3">
                                Interviewing: <strong>0</strong>
                              </div>
                              <div className="col-md-2">
                                Invite sent: <strong>0</strong>
                              </div>
                            </div>


                            <div className="clearfix"></div>
                            <div className="col-md-12 job-description-section">

                              {jobForFreelancer.job_description && <ReadMoreAndLess
                                className="read-more-content"
                                charLimit={450}
                                readMoreText="Read more"
                                readLessText="Read less"
                              >
                                {jobForFreelancer.job_description}
                              </ReadMoreAndLess>}
                            </div>
                          </div>

                          <div className="clearfix"></div>

                          <div className="margin-tops">
                            <div className="col-md-12 Payment-Type-Section">

                              <div className="col-md-6 nopad">
                                {jobForFreelancer && jobForFreelancer.job_pay_value ?
                                  <p><strong>Budget:</strong> ${jobForFreelancer && jobForFreelancer.job_pay_value ? isNaN(jobForFreelancer.job_pay_value) ? '00' : parseFloat(jobForFreelancer.job_pay_value).toFixed(2) : ''}</p> : ''
                                }
                                <p><strong> Payment Type: </strong>{jobForFreelancer.job_pay_type}</p>
                              </div>

                              <div className="col-md-6 nopad">
                                <p><strong> Experience Level: </strong>{jobForFreelancer.job_experience_level}</p>
                              </div>
                            </div>
                          </div>

                          <div className="clearfix"></div>

                          <div className="margin-tops">
                            <div className="col-md-12 Project-Type-Section">
                              <p><strong>Project Type: </strong>{jobForFreelancer.job_type}</p>
                              <h5 className="p-attached-file"><strong>Attachment:</strong></h5>
                              {this.returnAttachements()}
                            </div>
                          </div>



                          <div className="clearfix"></div>


                          <div className="margin-tops">
                            <div className="col-md-12">
                              <h5> <strong> Screening Questions </strong></h5>

                              {jobForFreelancer.job_screening_questions && jobForFreelancer.job_screening_questions.length === 0 ?
                                jobForFreelancer.job_screening_questions.map((questions, index) => {
                                  return (
                                    <div className="col-md-12">
                                      <ul>
                                        <li>{questions.job_question}</li>
                                      </ul>
                                    </div>
                                  )
                                }) : (<div className="mt-10 mb-10">
                                  No Screening Questions
                                </div>)
                              }
                            </div>
                          </div>

                          <div className="clearfix"></div>

                          <div className="margin-tops">
                            <div className="col-md-12 tf_exper">
                              <h5> <strong> Platform </strong></h5>
                              {jobForFreelancer.job_category && jobForFreelancer.job_category.map((category, idx) => {
                                return <div key={idx} className="tf_skills">
                                  <h6>{(category.includes("IBM") ? "IBM Cloud" : category).length > 30 ? `${(category.includes("IBM") ? "IBM Cloud" : category).substring(0, 35)}` : (category.includes("IBM") ? "IBM Cloud" : category)}</h6>
                                </div>
                              })}
                            </div>
                          </div>

                          <div className="clearfix"></div>

                          <div className="margin-tops">
                            <div className="col-md-12 Skills-And-Expertise mb-10">
                              <h5><strong>Tech Stack </strong></h5>
                              {expertise.length > 0 &&
                                <Skills
                                  skill={expertise}
                                  to="#"
                                  id={0}
                                  displayCount={expertise.length}
                                />
                              }
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
                          <hr />


                          {jobsHistory.length > 0 ?
                            this.returnJobHistory() : <p>No items to display</p>
                          }
                          {!hideShowMore && <button
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
                    </div>


                    <div className="col-lg-3 col-md-4 job_details_box_freelancer m-0">
                      <div className="job-details-sidebar-topbox margin-tops">
                        {!_.isEmpty(this.props.currentUser) ? <div className="tf_freelancer_pro_right">
                          {(isEmpty(jobForFreelancer.job_application_status) || jobForFreelancer.job_application_status === 'withdrawal') && this.props.currentUserDetails.account_approved ?
                            <Link to={`/submit-proposal/${jobForFreelancer.uuid}`} className="tf_invite_button">SUBMIT PROPOSAL</Link> :
                            <Link href="#" className="tf_disabled_button" disabled>SUBMIT PROPOSAL</Link>
                          }
                          {!jobForFreelancer.favorited_job ? <Link href="#" className="tf_invite_button" onClick={this.handleSavedJobs.bind(this, jobForFreelancer.id)}><i className="fa fa-heart-o"></i> SAVE JOB</Link> :
                            <Link href="#" className="tf_invite_button" onClick={this.handleRemovedJobs.bind(this, jobForFreelancer.id)}><i className="fa fa-heart"></i> SAVED JOB</Link>}
                        </div> :
                          <div className="tf_freelancer_pro_right">
                            <Link className="tf_invite_button apply" onClick={() => this.setState({ openLoginModal: true })}>
                              APPLY
                            </Link>
                          </div>
                        }
                        <div className="tf_freelancer_pro_right">
                          <h5 className="about_the_client">About the Client</h5>
                          <p>
                            <strong>
                              {jobForFreelancer.user && !isEmpty(jobForFreelancer.user.payment_method) ?
                                ' Payment Verified'
                                : ' Payment not Verified'
                              }&nbsp;
                              <i className="fa fa-check-circle" aria-hidden="true"></i>
                            </strong>
                          </p>

                          <p>
                            <span><i className="fa fa-star"></i><i className="fa fa-star"></i><i className="fa fa-star"></i>
                              <i className="fa fa-star"></i><i className="fa fa-star"></i>
                            </span>
                            4.89 of 130 Reviews
                          </p>

                          <p>{jobForFreelancer.user && jobForFreelancer.user.country}</p>
                          <p>{jobForFreelancer.user && jobForFreelancer.user.full_name} </p>

                          {jobForFreelancer && jobForFreelancer.user &&
                            <div>
                              {jobForFreelancer.user.created_at ?
                                <p><span>Member Since {`${proposalDate.toLocaleString('default', { month: 'short' })}
                                        ${proposalDate.getDate()}, ${proposalDate.getFullYear()}`}</span></p> : ''}

                              <p> {jobForFreelancer.user.number_of_applicants} Applicant(s) </p>
                              <p>{jobForFreelancer.user.number_of_jobs_posted > 0
                                ? `${jobForFreelancer.user.number_of_jobs_posted} Job(s) Posted`
                                : ''
                              }
                              </p>
                              <p>
                                {jobForFreelancer.user.number_of_invites > 0
                                  ? `${jobForFreelancer.user.number_of_invites} Interview(s)`
                                  : ''
                                }
                              </p>
                              <p>
                                {jobForFreelancer.user.number_of_active_jobs > 0 ?
                                  `${jobForFreelancer.user.number_of_active_jobs} Open Job(s)`
                                  : ''}
                              </p>

                              <p>
                                {jobForFreelancer.user.number_of_active_contracts > 0 ?
                                  `${jobForFreelancer.user.number_of_active_contracts} Hire(s)` :
                                  ''}
                              </p>


                            </div>
                          }
                        </div>

                      </div>

                      <div className="clearfix"></div>

                      <div className="job-details-sidebar-bottombox">
                        <div className="margin-tops">
                          <div className="col-md-12 right_section_for_freelancer mt-10">
                            <p className="kok"> Cloud Experts Needed </p>
                            <div className="col-md-12 right_section_for_freelancer nopad">
                              <p className="language-name">{!_.isEmpty(jobForFreelancer.number_of_freelancer_required)
                                && jobForFreelancer.number_of_freelancer_required}
                              </p>
                            </div>
                          </div>
                        </div>
                      </div>

                      <div className="job-details-sidebar-bottombox">
                        {/* Preferred Qualifications start */}
                        <div className="margin-tops">
                          <div className="col-md-12 right_section_for_freelancer mt-10">
                            <p className="kok"> <strong>  Preferred Qualifications  </strong></p>

                            <p className="Location-details">
                              Location:
                              {
                                jobForFreelancer && jobForFreelancer.get_job_qualification ?
                                  this.returnCountryFlag(jobForFreelancer.get_job_qualification) : ''
                              }
                              {!_.isEmpty(jobForFreelancer.job_qualification) && jobForFreelancer.job_qualification.location}

                            </p>

                            {!_.isEmpty(jobForFreelancer.job_qualification) && (jobForFreelancer.job_qualification.qualification_group && jobForFreelancer.job_qualification.qualification_group !== "No") &&
                              <p className="Certification-details">Certification:&nbsp;
                                <strong data-toggle="tooltip" data-placement="top" title={jobForFreelancer.job_qualification ? jobForFreelancer.job_qualification.qualification_group : ''}>
                                  {!_.isEmpty(jobForFreelancer.job_qualification)
                                    &&
                                    this.handleCamelCase(jobForFreelancer.job_qualification.qualification_group)
                                  }
                                </strong>
                              </p>}

                          </div>
                        </div>
                        {/* Preferred Qualifications End */}
                      </div>

                      <div className="job-details-sidebar-bottombox">
                        <div className="margin-tops">
                          <div className="col-md-12 right_section_for_freelancer mt-10">
                            <p className="kok"> Language Proficiency </p>
                            <div className="col-md-12 right_section_for_freelancer nopad">
                              <p className="language-name">{!_.isEmpty(jobForFreelancer.job_qualification)
                                && jobForFreelancer.job_qualification.english_level}
                              </p>
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

    )
  }
}

const mapStateToProps = state => ({
  ...state
})

const mapDispatchToProps = (dispatch) => {
  return {
    logOut: () => dispatch(logOutAction()),
    fetchFreelancerJob: (id, isPublic) => dispatch(fetchFreelancerJob(id, isPublic)),
    responseToInvitation: (id, data) => dispatch(responseToInvitation(id, data)),
    savedApprove: (id) => dispatch(savedApproveFreelancer(id)),
    removeJobs: (id) => dispatch(removeJobsFreelancer(id)),
    getJobsClientHistory: (userId, page) => dispatch(getJobsClientHistory(userId, page)),
    getCurrentUserDetails: () => dispatch(getCurrentUserDetails())
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(JobDetails)
