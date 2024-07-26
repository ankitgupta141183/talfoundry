import React, {Component} from "react";
import FreelancerHeader from "../miscellaneous/FreelancerHeader";
import {fetchProposalDetails, updateTermsforContract} from '../../Actions/freelancerActions';
import Footer from '../miscellaneous/Footer';
import { connect } from "react-redux";
import ReadMoreAndLess from 'react-read-more-less';
import TimeAgo from 'react-timeago';
import {Link} from 'react-router-dom';
import {isEmpty}  from 'lodash';
import fileLogo from '../../static/images/file.png';
import dollarIcon from '../../static/images/$.svg';
import Modal from 'react-modal';
import Skills from '../Common/Skills'
import FreelancerDashboardSideBar from "./FreelancerDashboardSideBar";
import BreadCrumb from "../miscellaneous/BreadCrumb";
import SuccessSweetAlert from "../CommonComponets/SweetAlert/SuccessSweetAlert";

const customStyles = {
  content : {
    top                   : '50%',
    left                  : '50%',
    right                 : 'auto',
    bottom                : 'auto',
    marginRight           : '-50%',
    transform             : 'translate(-50%, -50%)',
    border                : 'none',
    background            : 'transparent',
    width                 : '60%',
  }
}

class MyProposals extends Component {

  constructor(props){
    super(props)
    this.state = {
      termsEditable: false,
      amountInput: '',
      disableIfNoInput: true,
      removeModal: false,
      submitSuccess: false,
      statusForJob: ''
    }
  }

  handleChangeTerms = () => {
    this.setState({termsEditable: !this.state.termsEditable,submitSuccess: false})
  }


  closeModal = () => {
    this.setState({removeModal: false})
  }

  handleSubmitTerms = () => {
    let jobId = this.props.proposalDetailsForFreelancer.uuid;
    this.props.updateTermsforContract(jobId,this.state.amountInput,'terms changed').then(() => {
      this.fetchDetails()
      this.setState({termsEditable: !this.state.termsEditable,disableIfNoInput:true,submitSuccess:true})
    })
  }


  returnAttachements = () => {
    const {proposalDetailsForFreelancer} = this.props;
    let attachment = []

    // console.log('proposalDetailsForFreelancer',proposalDetailsForFreelancer)

    if(proposalDetailsForFreelancer && proposalDetailsForFreelancer.job_application_documents && proposalDetailsForFreelancer.job_application_documents.length > 0){
      proposalDetailsForFreelancer.job_application_documents.map(jobPer => {
         attachment.push(<div className="col-sm-4 mt-10 mb-10">
          <a target="_blank" rel="noopener noreferrer" href={jobPer} title={jobPer.split('/')[jobPer.split('/').length - 1]}>
            <img src={fileLogo} alt="fileLogo"/>
            <span style={{fontSize: '13px'}}>&nbsp;&nbsp;{jobPer.split('/')[jobPer.split('/').length - 1]} </span>
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

  handleWithDrawl = ()  => {
    this.setState({removeModal: true})
  }

  proposalwithdrawlhandler = () => {
    let jobId = this.props.proposalDetailsForFreelancer.uuid;
    this.props.updateTermsforContract(jobId,null,'withdrawal').then(() => {
      this.fetchDetails()
      this.setState({removeModal:false})
    })

  }

  handleInputChange = (e) => {
    let bol = e.target.value.length === 0 ? true : false
    // console.log('---------',e.target.value)
    this.setState({
      amountInput: isNaN(e.target.value) ? '00' : parseFloat(e.target.value).toFixed(2),
      disableIfNoInput:  bol})

  }

  fetchDetails = () => {
    this.props.fetchProposalDetails(this.props.match.params.id).then(() => {
      let hourlyRate = this.props.proposalDetailsForFreelancer.price
      this.setState({
        amountInput: isNaN(hourlyRate) ? '00' : parseFloat(hourlyRate).toFixed(2),
        statusForJob: this.props.proposalDetailsForFreelancer.status
      })
    })
  }

  componentDidMount(){
    this.fetchDetails()
  }

  render() {
    const {proposalDetailsForFreelancer} = this.props;
    const {termsEditable,removeModal,statusForJob, amountInput} = this.state
    const jobForFreelancer =!isEmpty(proposalDetailsForFreelancer) && proposalDetailsForFreelancer.job
    // const requiredExpertise = jobForFreelancer.job_expertise_required ? jobForFreelancer.job_expertise_required : [];
    const additionalExpertise = jobForFreelancer.job_additional_expertise_required ? jobForFreelancer.job_additional_expertise_required : [];
    const speciality = jobForFreelancer && jobForFreelancer.job_speciality ? jobForFreelancer.job_speciality : [];
    const expertise = [...additionalExpertise, ...speciality];
    const hourlyRate = proposalDetailsForFreelancer && proposalDetailsForFreelancer.price;
    const date = proposalDetailsForFreelancer && proposalDetailsForFreelancer.job && proposalDetailsForFreelancer.job.user
      ? proposalDetailsForFreelancer.job.user.created_at : '';

    const proposalDate = proposalDetailsForFreelancer && proposalDetailsForFreelancer.job ? new Date(date) : '';
    return (
      <div id="proposal-details-header-section">
        <FreelancerHeader history={this.props.history} />
        <div className={!this.props.loginSteps.showHideSideBar ? "mains" : "main-add"}>
          <div id="tf-project-manager-dashboard-root" className="">
            <BreadCrumb  step={"step6"} link="Proposal Details"/>
            <div className="row custom_row">
              <div className="col-lg-2 p-0">
                <div className="custom_sticky_container">
                  <div className="position-sticky">
                    <FreelancerDashboardSideBar history={this.props.history}/>
                  </div>
                </div>
              </div>
              <div className="col-md-10 m-auto pt-0">
              <div className="col-md-12 tf_pad_res">
                <div className="col-md-12">
                  <div className="tf_back_job">
                  <h2 className="">Proposal Details</h2>
                    <h4 style={{color: 'red'}}> {statusForJob === 'withdrawal' ? 'Proposal is  withdrawn': ''} </h4>
                  </div>
                </div>

                <div className="clearfix"></div>

                <div className="col-md-9 proposal_details_left_box">
                  <div className="">


                    <div className="margin-tops tf_client">
                      <div className="col-lg-12 nopad">

                        <div className="col-md-12">
                          <div className="tf_myfind_aws tf-border-right">
                            <div className="col-md-12 nopad">
                              <h5>{jobForFreelancer.job_title}</h5>
                            </div>
                            <div className="clearfix"></div>

                            <div className="tf_skills_1">
                              {jobForFreelancer.job_category && jobForFreelancer.job_category.map((skill, idx) => {
                                return  <h6 key={idx}>{skill}</h6>
                              })}
                            </div>
                            <div className="col-lg-8 col-md-7 col-sm-8 tf_myfind_hour nopad">
                              <p>Posted {<TimeAgo date={new Date(jobForFreelancer.created_at).toUTCString()}/>}</p>
                            </div>
                            <div className="clearfix"></div>
                            <div className="col-md-12 tf_myfind_conten1 nopad">
                              {jobForFreelancer.job_description && <ReadMoreAndLess
                                // ref={this.ReadMore}
                                className="read-more-content"
                                charLimit={300}
                                readMoreText="Read more"
                                readLessText="Read less"
                              >
                                {jobForFreelancer.job_description}
                              </ReadMoreAndLess>}
                            </div>
                            <div className="col-md-12 tf_proposal nopad">
                              <p><Link to={`/job-details/${!isEmpty(proposalDetailsForFreelancer) && proposalDetailsForFreelancer.job.uuid}`}>View Job Posting</Link></p>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>

                    <div className="clearfix"></div>
                    <div className="margin-tops tf_client">
                      <div className="col-md-12 tf_exper mb-10">
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
                    </div>
                    <div className="clearfix"></div>

                    <div className="margin-tops tf_client">
                      <div className="col-md-12 tf_exper1 exp-msg">
                        <p>*This job proposal will automatically expire in 7 days.</p>
                      </div>
                    </div>

                    <div className="margin-tops tf_client">
                      <div className="col-md-12 tf_exper1">
                      <h5>Your proposed terms <span>  { (proposalDetailsForFreelancer && proposalDetailsForFreelancer.job && proposalDetailsForFreelancer.job.job_pay_value) ? `Client’s Budget: $${(proposalDetailsForFreelancer.job.job_pay_value !== 'null') ? proposalDetailsForFreelancer.job.job_pay_value : 0} USD` : '' }</span></h5>
                        <p><strong>How do you want to be paid?</strong></p>
                        <p>{proposalDetailsForFreelancer.bidding_mode === 'fixed price' ? 'Fixed Price' : 'Hourly' } </p>
                        <p><strong>Bid/Budget</strong></p>
                          <p>Total amount the client will see on your proposal</p>
                          {termsEditable ?
                            <div className="bid-budget-input-container">
                              <div className="input-group">
                                <input
                                  type="number"
                                  className="form-control mn_input"
                                  placeholder={isNaN(hourlyRate) ? '00' : parseFloat(hourlyRate).toFixed(2)}
                                  value={isNaN(amountInput) ? '00' : amountInput}
                                  onChange={this.handleInputChange}/>
                                <span className="input-group-addon3 add-on hourly-rate-edit"><img src={dollarIcon} alt="icon"/></span>
                              </div>
                            </div>
                          :
                          ''}
                        {
                        !termsEditable ?
                          <p>{proposalDetailsForFreelancer.bidding_mode === 'fixed price' ? 'Fixed Price:' : 'Hourly Rate:' } $<strong>{isNaN(hourlyRate) ? '00' : parseFloat(hourlyRate).toFixed(2)}</strong></p>
                        :
                        ''}

                      </div>
                    </div>
                    <div className="clearfix"></div>

                    <div className="margin-tops tf_client">
                      <div className="col-md-12 tf_exper1">
                        <p><strong>You’ll Receive</strong></p>
                        <p>The estimated amount you’ll receive after service fees</p>
                        <p><strong>${isNaN(hourlyRate - hourlyRate * 3/100) ? "00" : (hourlyRate - hourlyRate * 3/100).toFixed(2)}</strong></p>
                      </div>
                    </div>
                    <div className="clearfix"></div>



                        {statusForJob === 'withdrawal' ? '' :
                        !termsEditable?
                        <div className="margin-tops tf_client">
                        <div className="col-md-12 tf_exper1">
                          <React.Fragment>
                              <Link to="#" className="tf_invite_button1" onClick={(e) => {e.preventDefault(); this.handleChangeTerms()}}>CHANGE TERMS</Link>
                              <Link to="#" className="tf_short_button1" onClick={(e) => {e.preventDefault();this.handleWithDrawl()}}>WITHDRAW PROPOSAL</Link>
                          </React.Fragment>
                          </div>
                          </div>
                          :
                        <div className="margin-tops tf_client">
                        <div className="col-md-12 tf_exper1">
                          <React.Fragment>
                              <Link
                                  to="#"
                                  className="tf_invite_button1"
                                  style={{background: !this.state.disableIfNoInput ?  '#0DA4DE':  'rgb(148, 153, 155)'}}
                                  onClick={!this.state.disableIfNoInput ? this.handleSubmitTerms : ''}>
                                    SUBMIT</Link>
                              <Link to="#" className="tf_short_button1" onClick={(e) => {e.preventDefault();this.handleChangeTerms()}}>CANCEL</Link>
                          </React.Fragment>
                        </div>
                        </div>
                        }



                    <div className="margin-tops tf_client">
                      <div className="col-lg-12 nopad">
                        <div className="tf_freelancer_pro tf_feedback">
                          <div
                          className="col-md-12">
                            <h2>Cover Letter</h2>
                          </div>
                        </div>
                        <div className="clearfix"></div>
                        <hr/>
                        <div className="col-md-12 tf_myfind_conten2 cover-letter">
                        {proposalDetailsForFreelancer && proposalDetailsForFreelancer.cover_letter && <ReadMoreAndLess
                              // ref={this.ReadMore}
                              className="read-more-content"
                              charLimit={250}
                              readMoreText="Read more"
                              readLessText="Read less"
                            >
                              {proposalDetailsForFreelancer.cover_letter}
                              </ReadMoreAndLess>}
                              {proposalDetailsForFreelancer.job_aplication_answer && proposalDetailsForFreelancer.job_aplication_answer.map((values, idx) => {
                                return(
                                  <div key={idx}>
                                  <h5><strong>{values.question_label}</strong></h5>
                                    <p> {values.answer}</p>
                                </div>)
                              })}
                              {proposalDetailsForFreelancer && proposalDetailsForFreelancer.job_application_document?
                                <a href={proposalDetailsForFreelancer && proposalDetailsForFreelancer.job_application_document} title="open attachment" target="_blank" rel="noopener noreferrer" className="open-attachment-link">
                                <img src={fileLogo} alt="" /></a>:
                              ''}



                        </div>
                      </div>
                    </div>


                    <div className="margin-tops tf_client mt-10 mb-10">
                      <div className="col-md-12 tf_exper">
                        <h5>Attachments</h5>
                        {this.returnAttachements()}
                      </div>
                    </div>

                    {this.state.submitSuccess && 
                    // <div className="app-pro2-swal">
                    //         <SweetAlert
                    //           success
                    //           title="Success!"
                    //           onConfirm={() => this.setState({submitSuccess: false})}
                    //         >
                    //           Proposal updated successfully.
                    //         </SweetAlert>
                    //         </div>
                    <SuccessSweetAlert 
                    show={true}
                    handleConfirm={() => this.setState({submitSuccess: false})}
                    message={"Proposal updated successfully."}
                    />
                             }


                    <Modal isOpen={removeModal} style={customStyles} onRequestClose={this.closeModal}>
                      <div className="modal-dialog" id="remove-payment-method-popup">
                        <div className="modal-content">

                          <div className="modal-header">
                            <button type="button" className="close" onClick={this.closeModal} ><span
                                aria-hidden="true">×</span><span className="sr-only">Close</span></button>
                              <h4 className="modal-title"> Withdraw Proposal</h4>
                            </div>
                            <div className="modal-body">
                                <p className="are-you-sure-message">Are you sure you want to withdraw this proposal ?</p>
                                <div className="yes-no-button-container">
                                  <button onClick={this.proposalwithdrawlhandler} type="button" className="btn btn-ban">Yes</button>
                                  <button onClick={this.closeModal} type="button" className="btn btn-not-ban">No</button>
                                </div>
                            </div>
                        </div>
                      </div>
                    </Modal>

                  </div>
                </div>
                <div className="col-md-3 proposal_details_box">
                  <div className="">
                    <h5 className="about_the_client">About the Client</h5>

                    <p><strong>Payment Verified <i className="fa fa-check-circle" aria-hidden="true"></i> </strong></p>
                    <p><span><i className="fa fa-star"></i><i className="fa fa-star"></i><i className="fa fa-star"></i><i className="fa fa-star"></i><i className="fa fa-star"></i> </span> 4.89 of 130 reviews</p>
                    <p>{proposalDetailsForFreelancer.job && proposalDetailsForFreelancer.job.user.country}</p>
                    <p>{proposalDetailsForFreelancer && proposalDetailsForFreelancer.job && proposalDetailsForFreelancer.job.user ?proposalDetailsForFreelancer.job.user.full_name : ''}</p>
                    {proposalDetailsForFreelancer && proposalDetailsForFreelancer.job && proposalDetailsForFreelancer.job.created_at ?
                    <p><span>Member Since &nbsp;
                        { `${proposalDate.toLocaleString('default', { month: 'short' })}
                        ${proposalDate.getDate()}, ${proposalDate.getFullYear()}`}</span></p>
                      : '' }
                    <p>
                        {proposalDetailsForFreelancer && proposalDetailsForFreelancer.job && proposalDetailsForFreelancer.job.user && proposalDetailsForFreelancer.job.user.number_of_applicants} applicant(s)
                    </p>
                    <p>
                        {proposalDetailsForFreelancer.job && proposalDetailsForFreelancer.job.user.number_of_jobs_posted} job(s) posted
                    </p>
                    <p>
                        {proposalDetailsForFreelancer && proposalDetailsForFreelancer.job &&proposalDetailsForFreelancer.job.user && proposalDetailsForFreelancer.job.user.number_of_invites} interview(s)
                    </p>

                    <p>
                        {proposalDetailsForFreelancer && proposalDetailsForFreelancer.job &&proposalDetailsForFreelancer.job.user && proposalDetailsForFreelancer.job.user.number_of_active_jobs} open job(s)
                    </p>
                    <p>
                        {proposalDetailsForFreelancer && proposalDetailsForFreelancer.job && proposalDetailsForFreelancer.job.user && proposalDetailsForFreelancer.job.user.number_of_active_contracts} hire(s)
                    </p>

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
    fetchProposalDetails: (id) => dispatch(fetchProposalDetails(id)),
    updateTermsforContract: (jobId,price,status) => dispatch(updateTermsforContract(jobId,price,status))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(MyProposals)
// proposalDetailsForFreelancer.job.job_screening_questions
