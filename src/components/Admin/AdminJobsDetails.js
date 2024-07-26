import React, { Component } from "react";
import { connect } from "react-redux";
// import {Link} from 'react-router-dom';
import { fetchJob } from '../../Actions/programManagerJobsActions';
import AdminHeader from "../miscellaneous/AdminHeader";
import ReadMoreAndLess from 'react-read-more-less';
import fileLogo from '../../static/images/file.png';
import TimeAgo from 'react-timeago';
import { isEmpty } from 'lodash';
import _ from 'lodash';
import Loader from "react-loader-spinner";
import Footer from '../miscellaneous/Footer';
import certification_required from "../../static/images/certification-required.png";
import ReactCountryFlag from "react-country-flag"
import AdminDashboardSidebar from "./AdminDashboardSidebar";
import CITYWITHCOUNTRY from "../../constants/cityWithCountries";
import globeSrc from "../../static/images/globe.png";
import { getJobsClientHistory } from '../../Actions/freelancerJobActions';
import loadMoreSrc from "../../static/images/loadMore.gif";
import BreadCrumb from "../miscellaneous/BreadCrumb";
import NewBreadCrumb from "../miscellaneous/BreadCrumb/NewBreadCrumb";



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

class AdminJobsDetails extends Component {
  constructor(props, context) {
    super(props, context)
    this.state = {
      isViewMore: false,
      jobsHistory: [],
      pageForHistory: 1,
      hideShowMore: false
    }
  }

  componentDidMount() {
    this.props.fetchJob(this.props.match.params.id).then((res) => {
      this.props.getJobsClientHistory(res.user.uuid, this.state.pageForHistory).then((res) => {
        this.setState({
          jobsHistory: res
        })
      })
    })
  }

  componentDidUpdate(prevProps) {
    if (this.props.match.url !== prevProps.match.url) {
      this.props.fetchJob(this.props.match.params.id).then((res) => {
        this.props.getJobsClientHistory(res.user.uuid, this.state.pageForHistory).then((res) => {
          this.setState({
            jobsHistory: res
          })
        })
      })
    }
  }

  handleViewMore = () => {
    this.setState({ isViewMore: !this.state.isViewMore })
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

  handleCamelCase = (value) => {
    return `${value.substring(0, 1).toUpperCase()}${value.substring(1, value.length)}`
  }

  handleShowMore = () => {
    let { jobsHistory } = this.state
    let newJobs = jobsHistory

    let that = this
    this.setState({ pageForHistory: this.state.pageForHistory + 1 }, () => {
      this.props.getJobsClientHistory(that.props.job.user.uuid,
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
    const { job, isLoading } = this.props
    const { jobsHistory, hideShowMore } = this.state
    const date = job && job.user ? job.user.created_at : ''
    const jobDate = job && job.user ? new Date(date) : ''
    // const requiredExpertise = job.job_expertise_required ? job.job_expertise_required : []
    const additionalExpertise = job.job_additional_expertise_required ? job.job_additional_expertise_required : []
    const speciality = job.job_speciality ? job.job_speciality : []
    const expertise = [...speciality, ...additionalExpertise,]
    const jobAttachment = (file) => {
      return (file && file.url) ? file.url.split('/')[file.url.split('/').length - 1] : ''
    }


    return (
      <div className="admin-job-details-page-root">


        <div className="tf_superadim">
          <AdminHeader history={this.props.history} />
      <div id="tf-project-manager-dashboard-root">
        {/* <BreadCrumb step={"step6"} link="Job Post" nextLink={"Job Post DEtails"} redirect="/admin-jobs" /> */}
        <NewBreadCrumb lable={"Job Post DEtails"} />
      </div>
          <div className="">
            {/* <div className={!this.props.loginSteps.showHideSideBar ? "mains" : "main-add"} id="job-details-admin-sidebar">
              <AdminDashboardSidebar />
            </div> */}

            <div className="cloud-expert-application-list-admin-side" id="">
              <div className="row d-flex">
                <div className="col-md-2 p-0">
                  <AdminDashboardSidebar />
                </div>
                <div className="col-md-10">
                  {isLoading && <div className="grid-loader my-feed-loader col-md-12">
                    <Loader type="Grid" color="#00BFFF" height={100} width={100} />
                  </div>}
                  {
                    !isLoading &&

                    <div className="job-details-right-side-box">

                      <div className="col-md-8">

                        {/*  Start First Box*/}
                        <div className="tf_freelancer_per">

                          <div className="col-md-12">
                            <div className="tf_admin_job">

                              <h4> {job.job_title}
                                {
                                  job && job.get_job_qualification &&
                                    job.get_job_qualification.qualification_group === "Yes" ?
                                    <img src={certification_required} alt="Certified" title="Certification Required" className="certification-required" />
                                    :
                                    ''
                                }
                              </h4>


                              <p className="admin-job-posted-time">Posted: <TimeAgo date={new Date(job.created_at).toUTCString()} /></p>

                            </div>
                          </div>

                          <div className="col-md-12 aws_services">
                            <h5><strong>Activity on this job</strong></h5>
                          </div>


                          {/*  */}
                          <div className="col-md-6">
                            <p>Proposals: <strong>{job.proposal_count}</strong></p>
                          </div>
                          <div className="col-md-6">
                            <p>Last viewed: <strong> <TimeAgo date={new Date(job.last_viewed_at).toUTCString()} /></strong></p>
                          </div>
                          <div className="col-md-6">
                            <p>Interviewing: <strong>0</strong></p>
                          </div>
                          <div className="col-md-6">
                            <p>Invite sent: <strong>0</strong></p>
                          </div>

                          {/*  */}
                          <div className="clearfix"> </div>

                          <div className="col-md-12">
                            {
                              job.job_description &&
                              <ReadMoreAndLess
                                className="read-more-content"
                                charLimit={300}
                                readMoreText="Read more"
                                readLessText="Read less"
                              >
                                {
                                  job.job_description
                                }
                              </ReadMoreAndLess>
                            }
                          </div>


                        </div>
                        {/*  End First Box*/}

                        {/*  Start Third Box*/}
                        <div className="tf_freelancer_per">
                          <div className="col-md-12">

                            <div className="col-md-6 nopad">
                              {/* <h5><strong>Time Requirement:</strong> {job.job_time_requirement}</h5> */}
                              <h5><strong>Payment Type:</strong> {job.job_pay_type}</h5>
                            </div>
                            {/* End Column 6  */}

                            {/* start Column 6  */}
                            <div className="col-md-6 nopad">
                              <h5><strong>Experience Level:</strong> {job.job_experience_level}</h5>

                            </div>
                            {/* End Column 6  */}
                          </div>
                        </div>
                        {/*  End third Box*/}

                        {/*  Start Fourth Box*/}
                        <div className="tf_freelancer_per">

                          <div className="col-md-12">
                            <h5><strong>Project Type </strong><span>{job.job_type}</span></h5>
                          </div>
                          <div className="clearfix"></div>

                          <div className="col-md-12">
                            <h5><strong>Attachment</strong></h5>
                            {
                              job && job.job_document ?
                                <h6 className="doc-attach-admin-details">
                                  <a href={job.job_document} target="_blank" rel="noopener noreferrer"><img src={fileLogo} alt="file" /></a> <span>{jobAttachment(job.job_document)}</span>
                                </h6>
                                :
                                <p>No attachment</p>
                            }
                            <div className="clearfix"></div>
                          </div>


                        </div>
                        {/*  End Fourth Box*/}

                        {/*  Start Fifth Box*/}
                        <div className="tf_freelancer_per">
                          <div className="col-md-12">
                            <h5><strong>Screening Questions</strong></h5>
                            {
                              !isEmpty(job) && !isEmpty(job.job_screening_questions) &&
                              <div className="col-md-12">
                                {
                                  job.job_screening_questions && job.job_screening_questions.map((questions, index) => {
                                    return (
                                      <div className="col-md-12">
                                        <ul>
                                          <h5><li>{questions.job_question}</li></h5>
                                        </ul>
                                      </div>
                                    )
                                  })
                                }
                                <div className="clearfix"></div>
                              </div>
                            }
                          </div>
                        </div>
                        {/*  End Fifth Box*/}

                        {/*  Start Sixth Box*/}
                        <div className="tf_freelancer_per aws_services">
                          <div className="col-md-12">
                            <h5><strong>Platform</strong></h5>
                            {
                              job.job_category && !isEmpty(job.job_category) ? job.job_category.map((skill, index) => {
                                return (
                                  <label className="btn btn-primary skill-set" key={index} data-toggle="tooltip" data-placement="top" title={skill}>
                                    {skill.length > 20 ? `${skill.substring(0, 15)}...` : skill}
                                  </label>
                                )
                              }) : <p className="">No items to display.</p>
                            }
                            <div className="clearfix"></div>
                          </div>

                        </div>
                        {/*  End Sixth Box*/}

                        {/*  Start seventh Box*/}
                        <div className="tf_freelancer_per aws_services">
                          <div className="col-md-12">
                            <h5><strong>Tech Stack</strong></h5>
                            {
                              expertise.map((skill, index) => {
                                return (
                                  <label className="btn btn-primary skill-set" key={index} data-toggle="tooltip" data-placement="top" title={skill}>
                                    {skill}
                                  </label>
                                )
                              })
                            }
                          </div>
                        </div>
                        {/*  End seventh Box*/}

                      </div>


                      {/* Start Column 4 */}
                      <div className="col-md-4">

                        {/* Start Box */}
                        <div className="admin-job-details-sidebar-box">
                          <h5 className="job-details-box-heading">About the Client</h5>
                          <p><strong>
                            {job.user && !isEmpty(job.user.payment_method) ?
                              ' Payment Verified'
                              : ' Payment not Verified'
                            }&nbsp;
                            <i className="fa fa-check-circle" aria-hidden="true"></i></strong></p>
                          <p><span><i className="fa fa-star"></i><i className="fa fa-star"></i><i className="fa fa-star"></i><i className="fa fa-star"></i><i className="fa fa-star"></i></span> 4.89 of 130 Reviews</p>

                          <p>{job.user && job.user.country}</p>
                          <p>{job && job.user && job.user.full_name}</p>

                          {
                            !isEmpty(job.user && job.user.created_at)
                              ?
                              <p>Member since {`${jobDate.toLocaleString('default', { month: 'short' })} ${jobDate.getDate()}, ${jobDate.getFullYear()}`}</p> : ''
                          }
                          {job && job.user &&
                            <div>

                              <p> {job.user.number_of_applicants} Applicant(s) </p>
                              <p>{job.user.number_of_jobs_posted > 0
                                ? `${job.user.number_of_jobs_posted} Job(s) Posted`
                                : ''
                              }
                              </p>
                              <p>
                                {job.user.number_of_invites > 0
                                  ? `${job.user.number_of_invites} Interview(s)`
                                  : ''
                                }
                              </p>
                              <p>
                                {job.user.number_of_active_jobs > 0 ?
                                  `${job.user.number_of_active_jobs} Open Job(s)`
                                  : ''}
                              </p>

                              <p>
                                {job.user.number_of_active_contracts > 0 ?
                                  `${job.user.number_of_active_contracts} Hire(s)` :
                                  ''}
                              </p>


                            </div>
                          }

                        </div>
                        {/* End Box */}

                        {/* Start Box */}
                        <div className="admin-job-details-sidebar-box">
                          <h5 className="job-details-box-heading">Cloud Experts Needed</h5>
                          <p className="language-name">{job.number_of_freelancer_required}</p>

                        </div>
                        {/* End Box */}


                        {/* Start Box */}
                        <div className="admin-job-details-sidebar-box">
                          <h5 className="job-details-box-heading">Preferred Qualifications</h5>
                          <p className="Location-details">Location:
                            {
                              job && job.get_job_qualification ?
                                this.returnCountryFlag(job.get_job_qualification) : ''
                            }
                            {!_.isEmpty(job.job_qualification) && job.job_qualification.location}
                          </p>
                          {!_.isEmpty(job.job_qualification) && (job.job_qualification.qualification_group && job.job_qualification.qualification_group !== "No") &&
                            <p className="Certification-details">Certification:&nbsp;
                              <strong data-toggle="tooltip" data-placement="top" title={job.job_qualification ? job.job_qualification.qualification_group : ''}>
                                {!_.isEmpty(job.job_qualification)
                                  &&
                                  this.handleCamelCase(job.job_qualification.qualification_group)
                                }
                              </strong>
                            </p>}


                        </div>
                        {/* End Box */}

                        {/* Start Box */}
                        <div className="admin-job-details-sidebar-box">
                          <h5 className="job-details-box-heading">Language Proficiency</h5>
                          <p className="language-name">{job.job_qualification && job.job_qualification.english_level}</p>

                        </div>
                        {/* End Box */}


                      </div>
                      {/* End  Column 4 */}

                      <div className="clearfix"></div>
                      <div className="mt-4 col-md-12 col-sm-12 col-xs-12">
                        <div className="tf_freelancer_pro tf_feedback">
                          <div className="col-md-12 col-sm-12 col-xs-12 tf_full_width">
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
                  }
                </div>
              </div>
            </div>


          </div>
          {/* <div className="admin-dashboard-footer">
            <Footer />
          </div> */}
        </div>

      </div>


    )
  }
}

const mapStateToProps = state => {
  return {
    ...state,
    job: state.job,
    isLoading: state.applicationIsLoading
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    fetchJob: (param) => dispatch(fetchJob(param)),
    getJobsClientHistory: (userId, page) => dispatch(getJobsClientHistory(userId, page))
  }
}


export default connect(mapStateToProps, mapDispatchToProps)(AdminJobsDetails)
