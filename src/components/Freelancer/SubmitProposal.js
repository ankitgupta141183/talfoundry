import React, { Component } from "react";
import FreelancerHeader from "../miscellaneous/FreelancerHeader";
import Footer from "../miscellaneous/Footer";
import { connect } from "react-redux";
import { fetchFreelancerJob } from "../../Actions/freelancerActions";
import { submitProposal } from "../../Actions/freelancerInvitationActions";
import ReadMoreAndLess from "react-read-more-less";
import TimeAgo from "react-timeago";
import { Link } from "react-router-dom";
import closeIcon from "../../static/images/close-icon.png";
import fileLogo from "../../static/images/file.png";
import Dropzone from "react-dropzone";
import { isEmpty } from "lodash";
import Loader from "react-loader-spinner";
// import inviteIcon from "../../static/images/invite.png";
import Skills from '../Common/Skills'
import FreelancerDashboardSideBar from "./FreelancerDashboardSideBar";
import BreadCrumb from "../miscellaneous/BreadCrumb";
import SuccessSweetAlert from "../CommonComponets/SweetAlert/SuccessSweetAlert";


class SubmitProposal extends Component {
  constructor(props, context) {
    super(props, context);
    this.state = {
      isResumeTypeImage: false,
      resume: "",
      screeningAns: [],
      cover_letter_error: false,
      hourly_rate_error: false,
      converLetter: "",
      hourlyRate: "",
      screeningAnsErrors: 0,
      isProposalSubmit: false,
      proposalId: "",
      projectFileArray: [],
      payType: "hourly",
    }
  }

  componentDidMount() {
    this.props.fetchFreelancerJob(this.props.match.params.id);
  }

  handleChange = (e) => {
    this.setState({
      [e.target.name]: e.target.value,
      cover_letter_error: false,
    });
  }
  removeAttachment = (e) => {
    this.setState({ resume: "", resume_name: "" });
  }

  handleResumeDrop = (files) => {
    // const target = "resume";
    let file = files[0];
    // let fileName = files[0].name;
    let projectFileArrayVar = this.state.projectFileArray;

    let isPresent = projectFileArrayVar.find((a) => a.path === file.path);

    if (!isPresent) {
      projectFileArrayVar.push(file);
      this.setState({
        projectFileArray: projectFileArrayVar,
      });
    }
  }

  handleFileRemove = (e) => {
    e.preventDefault();
    let allprojectFiles = [];
    let currentProjectFiles = this.state.projectFileArray;
    currentProjectFiles.map((proj) => {
      if (proj.name !== e.target.id) {
        allprojectFiles.push(proj);
      }
      return proj
    });
    this.setState({ projectFileArray: allprojectFiles });
  }

  handleFilesToShow = (projectFileArray) => {
    let fileToDisplay = [];
    if (projectFileArray && projectFileArray.length > 0) {
      projectFileArray.map((proj, id) => {
        fileToDisplay.push(
          <div
            className="row multi-file-upload-files-list mt-10"
            id={proj.name}
            key={`file_${id}`}
          >
            <div className="col-md-8">
              <i className="fa fa-check" aria-hidden="true"></i>{proj.name}
            </div>
            <div>
              <i
                className="fa fa-trash"
                id={proj.name}
                onClick={this.handleFileRemove}
                aria-hidden="true"
              ></i>
            </div>
          </div>
        );
        return proj
      });
    }
    return fileToDisplay;
  }

  handleAnswerValues = (e) => {
    var { screeningAns } = this.state;
    screeningAns[e.target.id] = {
      question_id: e.target.name,
      answer: e.target.value,
      question_label: e.target.dataset.question,
    }
    this.setState({ screeningAns: screeningAns });
  }

  handleRateChange = (e) => {
    if (e.target.value === 0) {
      this.setState({
        [e.target.name + "Error"]: true,
        hourly_rate_error: true,
      });
    } else if (e.target.value > 0) {
      this.setState({
        [e.target.name]: e.target.value,
        [e.target.name + "Error"]: false,
        hourly_rate_error: false,
      });
    } else {
      console.log("result");
    }
  }

  handleRateBlur = (e) => {
    this.setState({
      [e.target.name]: !isNaN(parseFloat(e.target.value).toFixed(2))
        ? parseFloat(e.target.value).toFixed(2)
        : "",
    });
  }

  fieldError(message) {
    return (
      <p id="firstName" className="error-field">
        {message ? message : "This field can't be blank."}
      </p>
    );
  }

  submitProposal = (e) => {
    e.preventDefault();
    const {
      converLetter,
      hourlyRate,
      payType,
    } = this.state;
    const { jobForFreelancer } = this.props;

    const proposal_data = {
      job_application: {
        job_id: jobForFreelancer.id,
        cover_letter: converLetter,
        price: hourlyRate,
        bidding_mode: payType,
        manager_id: jobForFreelancer.user.id
      },
    }

    let words = (converLetter.match(/\S+/g) || []).length;

    var form_data = new FormData();
    for (var key in proposal_data.job_application) {
      form_data.append(
        `job_application[${key}]`,
        proposal_data.job_application[key]
      );
    }
    this.state.projectFileArray.map((p, index) => {
      form_data.append(`job_application[documents[${index}]]`, p);
      return p
    });

    if (hourlyRate !== "" && words >= 50) {
      this.props.submitProposal(form_data).then((res) => {
        if (res.status === 200) {
          this.setState({ isProposalSubmit: true, proposalId: res.data });
        } else {
          alert("server error please try again later.");
          this.props.history.push(`/job-details/${jobForFreelancer.uuid}`);
        }
      });
    } else {
      this.setState({
        cover_letter_error: words <= 50 && true,
        hourly_rate_error: hourlyRate === "",
      });
    }
  }

  hideInvitationSuccess = () => {
    this.setState({ isProposalSubmit: false });
  }

  handlePayType = (e) => {
    this.setState({
      payType: e.target.value,
    });
  }

  render() {
    const {
      converLetter,
      resume,
      resume_name,
      isResumeTypeImage,
      resume_error,
      resume_type_error,
      screeningAns,
      hourlyRate,
      cover_letter_error,
      proposalId,
      hourly_rate_error,
      payType,
    } = this.state;
    const { jobForFreelancer, applicationIsLoading } = this.props;
    // const requiredExpertise = jobForFreelancer.job_expertise_required
    //   ? jobForFreelancer.job_expertise_required
    //   : [];
    const additionalExpertise = jobForFreelancer.job_additional_expertise_required
      ? jobForFreelancer.job_additional_expertise_required
      : [];
    const speciality =
      jobForFreelancer && jobForFreelancer.job_speciality
        ? jobForFreelancer.job_speciality
        : [];
    const expertise = [
      ...additionalExpertise,
      ...speciality,
    ];
    if (this.state.isProposalSubmit) {
      setTimeout(
        function () {
          this.setState({ isProposalSubmit: false, proposalId: proposalId });
          this.props.history.push(`/proposal-details/${proposalId}`);
        }.bind(this),
        3000
      );
    }
    return (
      <div>
        <FreelancerHeader history={this.props.history} />
        <div id='tf-cloud-expert-dashboard-root'>
          <BreadCrumb step={'step6'} link='Submit a Proposal' />
        </div>
        {/* <FreelancerDashboardSideBar history={this.props.history}/> */}
        {applicationIsLoading ? (
          <div className="grid-loader">
            <Loader type="Grid" color="#00BFFF" height={100} width={100} />
          </div>
        ) : (
        <div id="" className="submit_proposal_pages">
          <div className="d-flex">
            <div className="col-md-2 p-0">
              <FreelancerDashboardSideBar history={this.props.history}/>
            </div>
            <div className="col-md-10 pt-0">
              <div className="col-md-12 tf_pad_res">
                <div className="col-md-12">
                  <div className="tf_back_job">
                    <h2>Submit a Proposal</h2>
                  </div>
                </div>
                {this.state.isProposalSubmit && (
                  // <div className="app-pro2-swal">
                  //   <SweetAlert
                  //     title=""
                  //     onConfirm={this.hideInvitationSuccess}
                  //     showConfirm={true}
                  //   >
                  //     <img src={inviteIcon} alt="inviteIcon" />
                  //     <h4>
                  //       <strong>
                  //         Proposal Submitted. <br /> We will get back to you
                  //         shortly.
                  //       </strong>
                  //     </h4>
                  //   </SweetAlert>
                  // </div>
                  <SuccessSweetAlert
                  show={true}
                  handleConfirm={() => this.hideInvitationSuccess()}
                  message={`Proposal Submitted. 
                   We will get back to you shortly.`}
                  />
                )}
                <div className="tf_aws_1 mt-10">
                  <div className="col-lg-12">
                    <div className="margin-tops">
                      <div className="tf_freelancer_pro">
                        <div className="col-md-12">
                          <h2>Job Details</h2>
                        </div>
                        <div className="clearfix"></div>
                        <hr />
                        <div className="col-md-12 title_skill">
                          <h5 className="Job_title">
                            {jobForFreelancer.job_title}
                          </h5>
                          <div className="clearfix"></div>
                          <div className="tf_skills_1">
                            {jobForFreelancer.job_category &&
                              jobForFreelancer.job_category.map(
                                (skill, idx) => {
                                  return <h6 key={idx}>{skill}</h6>;
                                }
                              )}
                          </div>
                          <p className="m_b-1">
                            Posted{" "}
                            {
                              <TimeAgo
                                date={new Date(
                                  jobForFreelancer.created_at
                                ).toUTCString()}
                              />
                            }
                          </p>
                        </div>
                        <div className="clearfix"></div>
                        <hr />
                        <div className="col-md-12 description_submit">
                          {jobForFreelancer.job_description && (
                            <ReadMoreAndLess
                              className="read-more-content"
                              charLimit={450}
                              readMoreText="Read more"
                              readLessText="Read less"
                            >
                              {jobForFreelancer.job_description}
                            </ReadMoreAndLess>
                          )}
                          <div className="clearfix"></div>
                          <hr />
                          <h5>
                            <Link
                              to={`/job-details/${this.props.match.params.id}`}
                              className="view_job_posting"
                            >
                              View Job Posting
                            </Link>
                          </h5>
                        </div>
                        <div className="clearfix"></div>
                        <hr />
                        <div className="col-md-12 tf_exper skills_expertise">
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
                    </div>
                    <div className="margin-tops">
                      <div className="tf_freelancer_pro">
                        <div className="col-md-12  col-sm-12 col-xs-12 tf_full_width">
                          <h2>Terms</h2>
                        </div>
                        <div className="clearfix"></div>
                        <hr />
                        <div className="col-md-12 terms_section">
                          <div className="col-md-6 col-sm-12 tf_hr nopad">
                            <h3>How do you want to get paid ?</h3>
                          </div>
                          <div className="col-md-6">
                            <h3 style={{ marginTop: "14px" }}>
                              <input
                                type="radio"
                                value="hourly"
                                checked={payType === "hourly"}
                                onClick={this.handlePayType}
                              />
                              <label>&nbsp; Hourly &nbsp;</label>
                              &nbsp;&nbsp;
                              <input
                                type="radio"
                                value="fixed price"
                                checked={payType === "fixed price"}
                                onClick={this.handlePayType}
                              />
                              <label> &nbsp; Fixed Price &nbsp;</label>
                            </h3>
                          </div>

                          <div className="col-md-6 col-sm-12 tf_hr nopad">
                            <h3>
                              What is the rate you’d like to bid for this job?
                              Bid
                            </h3>
                            <p>
                              Total amount the client will see on your proposal
                            </p>
                          </div>
                          <div className="col-md-4 col-sm-8 col-xs-10 resp_nopad">
                            <div className="input-group tf_loca bid-amount">
                              <div className="input-group-addon_dollor">$</div>
                              <input
                                type="number"
                                className="form-control mn_input_4 mb-10"
                                name="hourlyRate"
                                onBlur={this.handleRateBlur}
                                onChange={this.handleRateChange}
                                value={hourlyRate}
                                placeholder="0.00"
                              />
                              {hourly_rate_error &&
                                this.fieldError(
                                  "Hourly rate must be greater than 0"
                                )}
                              <p
                                style={{
                                  fontSize: "12px",
                                  fontStyle: "italic",
                                }}
                              >
                                {payType === "fixed price"
                                  ? "One time fixed amount received by Cloud Expert"
                                  : ""}
                              </p>
                            </div>
                          </div>

                          <div className="clearfix"></div>
                          <hr />
                          <div className="col-md-12 tf_percent nopad">
                            <div className="col-md-6 col-sm-12 nopad">
                              <h5>
                                3% TalFoundry Service Fee{" "}
                                <Link>Explain this</Link>
                              </h5>
                            </div>
                            <div className="col-md-4 col-sm-8 col-xs-10 resp_nopad tf_percent_1">
                              <h5 className="TalFoundry-Service-Fee">
                                $
                                <p>
                                  {isNaN((hourlyRate * 3) / 100)
                                    ? "00"
                                    : ((hourlyRate * 3) / 100).toFixed(2)}
                                </p>
                              </h5>
                            </div>
                          </div>
                          <div className="clearfix"></div>
                          <div className="col-md-12 nopad">
                            <div className="col-md-6 col-sm-12 tf_hr nopad">
                              <h3>You’ll Receive</h3>
                              <p>
                                The estimated amount you’ll receive after
                                service fees
                              </p>
                            </div>
                            <div className="col-md-4 col-sm-8 col-xs-10 resp_nopad">
                              <div className="input-group tf_loca you-wll-receive-amount">
                                <div className="input-group-addon_dollor">
                                  $
                                </div>
                                <input
                                  type="Full Name"
                                  className="form-control mn_input_4"
                                  name="Full Name"
                                  placeholder="0.00"
                                  value={
                                    isNaN(hourlyRate - (hourlyRate * 3) / 100)
                                      ? "00"
                                      : (
                                          hourlyRate -
                                          (hourlyRate * 3) / 100
                                        ).toFixed(2)
                                  }
                                />
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="margin-tops">
                      <div className="tf_freelancer_pro">
                        <div className="col-md-12  col-sm-12 col-xs-12 tf_full_width">
                          <h2>Additional Details</h2>
                        </div>
                        <div className="clearfix"></div>
                        <hr />
                        {jobForFreelancer.job_screening_questions &&
                          !isEmpty(
                            jobForFreelancer.job_screening_questions
                          ) && (
                            <div className="col-md-12 cover_letter">
                              {jobForFreelancer.job_screening_questions.map(
                                (scrQue, idx) => {
                                  console.log(scrQue);
                                  var queId = scrQue.id;
                                  return (
                                    <div className="input-group tf_loca">
                                      <ul>
                                        <li className="sc_ques_submit_proposal">
                                          <label>{scrQue.job_question}</label>
                                        </li>
                                      </ul>
                                      <textarea
                                        className="form-control mn_input tf_loca1"
                                        data-question={scrQue.job_question}
                                        id={idx}
                                        name={queId}
                                        value={
                                          screeningAns[idx] &&
                                          screeningAns[idx].queId
                                        }
                                        onChange={this.handleAnswerValues}
                                        rows="5"
                                      ></textarea>
                                      {this.state[scrQue.id[idx]] &&
                                        this.fieldError(
                                          "You must upload an document in the given format."
                                        )}
                                    </div>
                                  );
                                }
                              )}
                            </div>
                          )}

                        <div className="col-md-12 cover_letter">
                          <div className="input-group tf_loca">
                            <br />
                            <label>Cover Letter</label>
                            <textarea
                              className="form-control mn_input tf_loca1"
                              placeholder="Cover letter should be minimum of 50 words and maximum 500 words."
                              name="converLetter"
                              value={converLetter}
                              onChange={this.handleChange}
                              rows="5"
                            ></textarea>
                            {cover_letter_error &&
                              this.fieldError(
                                "Description should be minimum of 50 words and maximum 500 words."
                              )}
                          </div>
                        </div>

                        <div className="col-md-12 attachment">
                          <div className="mn_drag">
                            <h5>Attachment</h5>
                            {resume_name && (
                              <p>
                                <strong>{resume_name}</strong>
                              </p>
                            )}
                            <div className="tf_drag_form mb-10">
                              {this.state.resume !== "" ? (
                                isResumeTypeImage ? (
                                  <img
                                    src={this.state.resume}
                                    alt="img"
                                    style={{ height: "50", width: "50" }}
                                  />
                                ) : (
                                  <a href={this.state.resume}>
                                    <img
                                      src={fileLogo}
                                      alt="img"
                                      style={{ height: "50", width: "50" }}
                                    />
                                  </a>
                                )
                              ) : (
                                <Dropzone
                                  onDrop={(acceptedFiles) =>
                                    this.handleResumeDrop(acceptedFiles)
                                  }
                                >
                                  {({ getRootProps, getInputProps }) => (
                                    <section>
                                      <div {...getRootProps()}>
                                        <input {...getInputProps()} />
                                        <p id="resume">
                                          drag or upload project images
                                        </p>
                                      </div>
                                    </section>
                                  )}
                                </Dropzone>
                              )}
                            </div>

                            {resume && (
                              <img
                                src={closeIcon}
                                alt="close"
                                onClick={this.removeAttachment}
                                id="resume"
                              />
                            )}
                            <div className="support-formats">
                              <span>
                                You may attach up to 1 files under 5 MB
                              </span>
                              <span>
                                Supports all popular formats (ppt, word, excel,
                                pdf, jpeg etc.....)
                              </span>
                            </div>
                            {resume_error &&
                              this.fieldError("resume must be present.")}
                            {resume_type_error &&
                              this.fieldError(
                                "You must upload an document in the given format."
                              )}

                            <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12 nopad mb-15">
                              {this.handleFilesToShow(
                                this.state.projectFileArray
                              )}
                            </div>
                          </div>
                        </div>

                        <div className="col-md-12 tf_exper1 exp-msg">
                          <p>*This job proposal will automatically expire in 7 days.</p>
                        </div>

                        <div className="clearfix"></div>
                        <hr />
                        <div className="col-md-12 buttons_section">
                          <Link
                            onClick={this.submitProposal}
                            className="tf_submit"
                          >
                            SUBMIT PROPOSAL
                          </Link>
                          <Link
                            to={`/job-details/${jobForFreelancer.uuid}`}
                            className="tf_cancel"
                          >
                            CANCEL
                          </Link>
                        </div>
                        <div
                          className="modal fade"
                          id="myModal1"
                          tabindex="-1"
                          role="dialog"
                          aria-labelledby="myModalLabel"
                        >
                          <div
                            className="modal-dialog tf_moderl_sent"
                            role="document"
                          >
                            <div className="modal-content tf_float">
                              <div className="modal-header">
                                <button
                                  type="button"
                                  className="close"
                                  data-dismiss="modal"
                                >
                                  <span aria-hidden="true">×</span>
                                  <span className="sr-only">Close</span>
                                </button>
                              </div>
                              <div className="modal-body" align="center">
                                <div className="col-md-12">
                                  <img src="images/invite.png" alt="" />
                                  <h5>
                                    Proposal Sent. <br /> John will get back to
                                    you shortly.
                                  </h5>
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
            </div>
          </div>
        </div>
        )}
        {/* <Footer /> */}
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  ...state,
});

const mapDispatchToProps = (dispatch) => {
  return {
    fetchFreelancerJob: (id) => dispatch(fetchFreelancerJob(id)),
    submitProposal: (data) => dispatch(submitProposal(data)),
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(SubmitProposal);
