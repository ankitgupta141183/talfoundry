// @FreelancerProposal.js
// * This component contains the proposal details sent by freelancer to project manager.

import React, {Component} from "react";
import { connect } from "react-redux";
import Footer from '../miscellaneous/Footer';
import 'react-tagsinput/react-tagsinput.css';
import fileLogo from '../../static/images/file.png';
import ReadMoreAndLess from 'react-read-more-less';
import {createConversation } from '../../Actions/conversationActions';
import {Link }from 'react-router-dom';
import ProjectManagerHeader from '../miscellaneous/ProjectManagerHeader';
import {addFavourite, removeFavourite} from '../../Actions/AdminActions';
import {isEmpty} from 'lodash';
import Loader from "react-loader-spinner"
import {addAnArchive} from '../../Actions/projectManagerArchiveActions';
import {getFreelancerAndProposalDetails, acceptProposal} from '../../Actions/propjectManagerProposalActions';
import { savedApproveManager } from "../../Actions/freelancerActions";
import faceImg from '../../static/images/profile-placeholder.png';
import Skills from "../Common/Skills"
import PMDashboardSideBar from "./PMDashboardSideBar";
import BreadCrumb from "../miscellaneous/BreadCrumb";
import SuccessSweetAlert from "../CommonComponets/SweetAlert/SuccessSweetAlert";

class FreelancerProposal extends Component {
  constructor(props, context) {
    super(props, context)
    this.state = {
      activePage: 1,
      showAllSkills: false,
      isArchivedStatus: ''
    }
  }

  componentDidMount() {
    this.props.getProposal(this.props.match.params.id, this.props.match.params.jobId)
  }

  goToHiringPage = () => {
    const { FreelancerAndProposalDetails } = this.props;
    console.log(FreelancerAndProposalDetails , "FreelancerAndProposalDetails");
    if(FreelancerAndProposalDetails.status !== 'Accepted') {
      this.props.acceptProposal({status: 'Accepted'}, this.props.match.params.id, false)
      .then((res) => {
        if(res && res.status===200){
          this.props.getProposal(this.props.match.params.id, this.props.match.params.jobId)
          this.setState({isArchived: true, isArchivedStatus: "Proposal accepted"})
        }
      }).catch((err) => {
        console.log(err)
      })
    } else {
      this.props.history.push(`/hire-a-freelancer/${this.props.FreelancerAndProposalDetails.user.uuid}/${this.props.match.params.jobId}`)
    }
  }

  addFavourite =() => {
    this.props.addFavourite(this.props.FreelancerAndProposalDetails.user.id)
    .then((res) => {
      if(res.status === 200){
        this.props.getProposal(this.props.match.params.id, this.props.match.params.jobId)
      }
    })
  }

  removeFavourite = (id) => {
    this.props.removeFavourite(id)
  }

  handleBreadcrump = () => {
    const { location, FreelancerAndProposalDetails } = this.props;

    let breakcrump = [
        {
          path: "/",
          name: "My Jobs",
        },
        {
          name: `Review Proposals`,
          path: `/job/${FreelancerAndProposalDetails.job_id}/review`,
        },
        {
          name: "Proposal",
          isActive: true,
        },
      ]

    if(location.state && location.state === "from-notifi") {
      breakcrump = [
          {
            path: "/notifications",
            name: "Notifications",
          },
          {
            name: "Proposal",
            isActive: true,
          },
        ]
    }
    return breakcrump
  }

  createConverstaion = (id) => {
    const data = {
      title: '',
      sender_id: this.props.currentUser.user_id || this.props.currentUser.id,
      recipient_id: id
    }

    this.props.createConversation(data)
    .then((res) => {
      if(res.status === 200){
        this.props.history.push("/messages")
      }
    }).catch((err) => {
      console.log(err)
    })
  }

  addArchive = (status) => {
    const {FreelancerAndProposalDetails, addAnArchive} = this.props;
    addAnArchive(FreelancerAndProposalDetails.uuid, status)
    .then((res) => {
      if(res && res.status===200){
        this.setState({isArchived: true, isArchivedStatus: (status === 'archived' ? 'Archived' : 'Unarchived')})
      }else{
        alert("server error.")
      }
    })
  }

  returnAttachements = (projectFileArray) => {
    let attachment = []
    if(projectFileArray.length > 0){
      projectFileArray.map(jobPer => {
         attachment.push(<div className="col-sm-2 no-padding">
          <a target="_blank" rel="noopener noreferrer" href={jobPer} title={jobPer.split('/')[jobPer.split('/').length - 1]}>
            <img src={fileLogo} alt="fileLogo"/>
            <span style={{fontSize: '13px'}}>&nbsp;&nbsp;{jobPer.split('/')[jobPer.split('/').length - 1]}</span>
            </a>
          </div>
          )
          return jobPer
        })

    }
    else{
      attachment = 'None'
    }
    return <div className="row"> {attachment} </div>
  }


  hideNewAlert = () => {

    this.props.history.push({
      pathname: "/my-proposals",
      state: {status: this.state.isArchivedStatus === 'Archived' ? 'archived' : 'active'}
    })

    this.setState({isArchived: false, isArchivedStatus: ''})
  }

  handleSkills = (e) => {
    e.preventDefault();
    this.props.history.push(`/user-profile/${this.props.FreelancerAndProposalDetails.user.profile.uuid}`)
  }

  getSkills = (skills) => {
    // let {showAllSkills} = this.state;
    let newSkills = Object.assign([], skills)
    let data = newSkills.splice(0,15)
    return data
  }

  handleSavedJobs = (id, event) => {
    this.props.savedApprove(id).then((res) => {
      if (res.status === 200) {
        window.location.reload()
      }
    })
  }

  render() {
    const { FreelancerAndProposalDetails, applicationIsLoading } = this.props;
    const {isArchived} = this.state;
    // let newFreelancerAndProposalDetails = Object.assign({}, FreelancerAndProposalDetails)
    return (
        <div>
          <div className="wraper">
            <ProjectManagerHeader history={this.props.history}/>
            <div id="tf-project-manager-dashboard-root">
              <BreadCrumb step={"step6"} link="Proposal Details"/>
            </div>
            {isArchived && 
            // <div className="app-pro2-swal"><SweetAlert
            //   success
            //   confirmBtnText="Ok"
            //   confirmBtnBsStyle="success"
            //   onConfirm={this.hideNewAlert}
            // >
            //   {this.state.isArchivedStatus} Successfully.
            // </SweetAlert>
            // </div>
            <SuccessSweetAlert
            handleConfirm={() => this.hideNewAlert()}
            show={true}
            message={`${this.state.isArchivedStatus} successfully!`}
          />
            }
            {
              applicationIsLoading ? (
                <div className="grid-loader my-feed-loader col-md-12">
                  <Loader type="Grid" color="#00BFFF" height={100} width={100} />
                </div>
              ) : (
                <div className="mn_center p-0">
                  {/* freelancerProposalSinglePage d-flex */}
                <div className={!this.props.loginSteps.showHideSideBar ? " mains" : "main-add d-flex"}>
                  <div className="row custom_row">
                    <div className="col-lg-2 col-md-2 p-0">
                      <div className="custom_sticky_container">
                        <div className="position-sticky">
                          <PMDashboardSideBar history={this.props.history}/>
                        </div>
                      </div>
                  </div>
                  <div className="col-md-10 m-auto pt-0">
                      <div className="dashboard-all-project-status-tabs">
                        <div className="tf_proposal1 job-details-pd">
                          <h4 className="m-0 page-title-white">Proposal Details</h4>
                          <div className="">
                            <div className="margin-tops">
                              <div className="tf_freelancer_pro">
                                {
                                  FreelancerAndProposalDetails.status === 'Accepted' ? (
                                    <React.Fragment>
                                      <div className="col-md-12">
                                        <span className="exp-msg">
                                          *You have accepted this job proposal
                                        </span>
                                      </div>
                                      <div className="clearfix" />
                                    </React.Fragment>
                                  ) : null
                                }
                                <div className="col-lg-2 col-md-2 col-sm-3 col-xs-4 tf_full_width">
                                  <div className="tf_image pm-img">
                                    {(FreelancerAndProposalDetails.user && FreelancerAndProposalDetails.user.profile.profile_picture) ?
                                      <img src={FreelancerAndProposalDetails.user.profile.profile_picture} alt=""/>:

                                      <img src={faceImg} alt=""/>
                                    }
                                  </div>
                                </div>
                                <div className="col-lg-7 col-md-7 col-sm-9 col-xs-8  tf_full_width">
                                  <div className="col-md-12">
                                    <div className="tf_free_name">
                                      <h4>{FreelancerAndProposalDetails.user && FreelancerAndProposalDetails.user.full_name}</h4>
                                      <Link href="#" className="tf_hire_button" onClick={this.createConverstaion.bind(this, FreelancerAndProposalDetails.user && FreelancerAndProposalDetails.user.id)}>MESSAGE</Link>
                                    </div>

                                    <div className="clearfix"></div>
                                    <div className="tf_f_content">
                                      <h5><strong>{FreelancerAndProposalDetails.user && FreelancerAndProposalDetails.user.profile.current_job_title}</strong></h5>
                                    </div>
                                    <div className="tf_f_content tf_proposal">
                                      <h5><strong>
                                      <i className="fa fa-map-marker" aria-hidden="true"></i>
                                          United States</strong>
                                          </h5>
                                      <h5><strong>${FreelancerAndProposalDetails.user && FreelancerAndProposalDetails.user.profile.hourly_rate} / hr
                                      </strong></h5>
                                      <h5><strong>$10k+ earned</strong></h5>
                                    </div>

                                    <div className="clearfix"></div>
                                    <div className="tf_skills_1">
                                      {
                                        FreelancerAndProposalDetails.user &&
                                          FreelancerAndProposalDetails.user &&
                                            FreelancerAndProposalDetails.user &&
                                            (<Skills
                                                  skill = {FreelancerAndProposalDetails.user.profile.skill}
                                                  id = {FreelancerAndProposalDetails.user.profile.uuid}
                                                  to={`/user-profile/${FreelancerAndProposalDetails.user.profile.uuid}/true`}
                                                  displayCount = {5}
                                                />)
                                        }
                                </div>
                                  </div>
                                </div>
                                <div className="col-lg-3 col-md-3 col-sm-12 tf_pro_btn">
                                  <div className="tf_freelancer_pro_right">
                                    {(!isEmpty(FreelancerAndProposalDetails) && !isEmpty(FreelancerAndProposalDetails.user) && !isEmpty(FreelancerAndProposalDetails.user.payment_method)) ?
                                      <Link
                                        href="#"
                                        onClick={FreelancerAndProposalDetails.contract_id ? '': this.goToHiringPage}
                                        className={FreelancerAndProposalDetails.contract_id ? 'tf_invite_disabled': 'tf_invite_button'}>
                                          {
                                            (FreelancerAndProposalDetails.status === 'Accepted') ? 'HIRE CLOUD EXPERT' : 'ACCEPT'
                                          }
                                      </Link> :
                                      <Link
                                        className={(!isEmpty(FreelancerAndProposalDetails) && !FreelancerAndProposalDetails.archived_at) ? "tf_invite_button" : "tf_invite_button"}
                                        onClick={(!isEmpty(FreelancerAndProposalDetails) && !FreelancerAndProposalDetails.archived_at) ? '' : this.goToHiringPage}
                                        to ={(!isEmpty(FreelancerAndProposalDetails) && !FreelancerAndProposalDetails.archived_at) ? {pathname: "/settings" ,state: "payMethodPresent"} : "#"}>
                                        { (FreelancerAndProposalDetails.status === 'Accepted') ? 'HIRE CLOUD EXPERT' : 'ACCEPT'}
                                      </Link>
                                    }
                                    {(!isEmpty(FreelancerAndProposalDetails) && !FreelancerAndProposalDetails.archived_at) ?
                                      <Link href="#" onClick={this.addArchive.bind(this, 'archived')} className="tf_invite_button">ARCHIVE</Link>
                                      :
                                      <Link href="#" onClick={this.addArchive.bind(this, 'unarchived')} className="tf_invite_button">UNARCHIVE</Link>
                                    }


                                    {(this.props.FreelancerAndProposalDetails && this.props.FreelancerAndProposalDetails.user && this.props.FreelancerAndProposalDetails.user.favorited_freelancer) ?
                                      (<Link href="#" className="tf_short_button">SHORTLISTED</Link>)
                                      :
                                      (<Link href="#" className="tf_invite_button"
                                        onClick={this.handleSavedJobs.bind(this, this.props.FreelancerAndProposalDetails && this.props.FreelancerAndProposalDetails.user && this.props.FreelancerAndProposalDetails.user.id)}>SHORTLIST</Link>)
                                    }


                                  </div>
                                </div>
                                <div className="clearfix"></div>
                              </div>
                            </div>

                            <div className="margin-tops">
                              <div className="tf_freelancer_pro cover-letter">
                                {
                                  FreelancerAndProposalDetails.expires_at ? (
                                      <div className="col-md-12">
                                        <span className="exp-msg">
                                          *This job proposal will expire on {" "}
                                          {`${new Date(FreelancerAndProposalDetails.expires_at).toLocaleString(
                                            "default",
                                            { month: "short" }
                                          )} ${new Date(FreelancerAndProposalDetails.expires_at).getDate()}, ${new Date(FreelancerAndProposalDetails.expires_at).getFullYear()}`}
                                        </span>
                                      </div>
                                    ) : null
                                }

                                <div className="col-md-12">
                                  <h5>{FreelancerAndProposalDetails.bidding_mode === 'fixed price' ? 'Fixed Price' : 'Hourly Rate' }</h5>
                                  {FreelancerAndProposalDetails && FreelancerAndProposalDetails.price?
                                  <h3>${FreelancerAndProposalDetails.price} {(FreelancerAndProposalDetails.bidding_mode === 'fixed price') ? null : '/ hr'}</h3>: ''
                                  }
                                  <h5>Cover Letter</h5>
                                  {FreelancerAndProposalDetails && FreelancerAndProposalDetails.cover_letter && <ReadMoreAndLess
                                  // ref={this.ReadMore}
                                  className="read-more-content"
                                  charLimit={300}
                                  readMoreText="Read more"
                                  readLessText="Read less"
                                >
                                  {FreelancerAndProposalDetails.cover_letter}
                                  </ReadMoreAndLess>}
                                  {FreelancerAndProposalDetails.job_aplication_answer && FreelancerAndProposalDetails.job_aplication_answer.map((values, idx) => {
                                    return(
                                      <div key={idx}>
                                      <h5><strong>{values.question_label}</strong></h5>
                                        <p> {values.answer}</p>
                                    </div>)
                                  })}
                                </div>
                                {FreelancerAndProposalDetails.job_application_documents ?
                                <div className="col-md-12">
                                  <h5>Attachments</h5>
                                  {this.returnAttachements(FreelancerAndProposalDetails.job_application_documents || [])}
                                  <div className="clearfix"></div>
                                </div> : null}
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  </div>
                </div>
              )
            }
          {/* <Footer /> */}
        </div>
        </div>
    )
  }
}
const mapStateToProps = state => ({
  ...state
})

const mapDispatchToProps = (dispatch) => {
  return {
    getProposal: (id, job_id) => dispatch(getFreelancerAndProposalDetails(id, job_id)),
    acceptProposal: (data, id, showLoader) => dispatch(acceptProposal(data, id, showLoader)),
    addFavourite: (id) => dispatch(addFavourite(id)),
    createConversation: (data) => dispatch(createConversation(data)),
    removeFavourite: (id) => dispatch(removeFavourite(id)),
    addAnArchive: (id,status) => dispatch(addAnArchive(id,status)),
    savedApprove: (id) => dispatch(savedApproveManager(id)),
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(FreelancerProposal)
