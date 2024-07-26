import React, { Component } from "react";
import { connect } from "react-redux";
import Footer from "../miscellaneous/Footer";
import Modal from "react-modal";
import _ from "lodash";
import { isEmpty } from "lodash";
import FreelancerHeader from "../miscellaneous/FreelancerHeader";
import { getMyJobsForFreelancer } from "../../Actions/freelancerJobActions";
import { fetchJob } from "../../Actions/programManagerJobsActions";
import Loader from "react-loader-spinner";
import Pagination from "react-js-pagination";
import TimeAgo from "react-timeago";
import pay_dark_color from "../../static/images/pay_dark_color.png";
import Skills from "../Common/Skills"
import CITYWITHCOUNTRY from "../../constants/cityWithCountries";
import ReactCountryFlag from "react-country-flag"
import globeSrc from "../../static/images/globe.png";
import CertificateTitle from "../../static/images/certification-required.png";
import FreelancerDashboardSideBar from "./FreelancerDashboardSideBar";
import NODataFoundImg from "./../../static/images/noDataFound.png"
import BreadCrumb from "../miscellaneous/BreadCrumb";
import NoDataFoundMessage from "../Common/NodataFoundMessage/NoDataFoundMessage";


const customStyles = {
  content: {
    top: "50%",
    left: "50%",
    right: "auto",
    bottom: "auto",
    marginRight: "-50%",
    transform: "translate(-50%, -50%)",
    border: "none",
    background: "transparent",
  },
}

class MyJobsFreelancer extends Component {
  constructor(props, context) {
    super(props, context)
    this.state = {
      isLoading: true,
      activePage: 1,
      activeTab: "new",
      isSliderOpen: false,
      sliderType: "",
      isDeleted: false,
      removeModal: false,
      showNot: true,
      openModal: false,
      showModal: false,
      jobDetail: '',
      currentArrayKey: 0,
      jobs: [],
      searchItem: ""
    }
  }

  componentDidMount() {
    this.props.getMyJobsForFreelancer(1, this.state.searchItem).then((jobs) => {
      this.setState({ jobs, isLoading: false })
    })
  }


  handleOPenModal = (row, i) => {
    // console.log("row--",row)
    this.props.history.push(`/job-details/${row.uuid}`)

    return false;

    this.setState({ openModal: true, currentArrayKey: i + 1 })
    this.props.fetchJob(row.uuid).then((res) => {
      // console.log("res",res)
      if (res) {
        this.setState({ jobDetail: res })
      }
    })
  }

  closeModals = () => {
    this.setState({ jobDetail: '', openModal: false })
  }

  changeProfile = (id, type) => {
    let key = ''
    // console.log(this.state.currentArrayKey, '==',this.state.jobs.length)
    this.state.jobs.map((row, index) => {
      if (row.id === id) {
        if (type === 'next') {
          key = index + 1
        } else {
          key = index - 1
        }
        // console.log('key==',key)
        this.props.fetchJob(this.state.jobs[key].uuid, true).then(
          (res) => {
            this.setState({ jobDetail: res, currentArrayKey: key + 1 })
          }
        )
      }
      return row
    })
  }



  handleDraftPageChange = (pageNumber) => {
    this.setState({ activePage: pageNumber })
  }



  returnStars = (value) => {
    let stars = [];
    for (let i = 0; i < 5; i++) {
      stars.push(<i
        className="fa fa-star first"
        style={{ color: i + 1 > value ? '#8080806e' : '#0DA4DE', fontSize: '18px' }}
        key={i}
      >
      </i>)
    }
    return stars;
  }


  checkEst = (value) => {
    if (value.substr(0, 9) === "Less than") {
      return "< " + value.substr(9)
    } else if (value.substr(0, 9) === "More than") {
      return "> " + value.substr(9)
    }
    return value
  }

  returnCountryFlag1 = (qual) => {
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
            float: "left",
            marginTop: '3px',
            marginLeft: "0px",
            marginRight: "12px",
          }}
          title={"country"}
        />
      }
      else {
        data = <span> <img
          src={globeSrc}
          style={{ height: '24px', width: '24px', marginRight: '-10px', marginTop: '-2px' }} alt=""
        />
        </span>
      }
    }

    else {
      data = <span> <img
        src={globeSrc}
        style={{ height: '24px', width: '24px', marginRight: '-10px', marginTop: '-2px' }} alt=""
      />
      </span>
    }
    return data
  }

  handleSearch = async (e) => {
    this.setState({ searchItem: e.target.value })

    await this.props.getMyJobsForFreelancer(1, e.target.value).then((jobs) => {
      this.setState({ jobs, isLoading: false })
    })
  }

  render() {
    const searchIcon = require("../../static/images/Icon_Search.svg")
    const itemsCountPerPage = 4;
    const { activePage, jobs } = this.state;

    let newJobs = (!isEmpty(jobs) && jobs.length > 0) ? jobs : []
    let onlyNewJobs = JSON.parse(JSON.stringify((newJobs))).splice(activePage === 1 ? 0 : ((activePage - 1) * itemsCountPerPage), itemsCountPerPage)

    return (
      // Start Root Container
      <div className="" id="cloud-expert-find-work-my-jobs-list-page">
         {/* Start Header */}
          <div id="tf-project-manager-dashboard-root">
            {/* <FreelancerHeader history={this.props.history} currentUserDetails={this.props.currentUser} /> */}
          </div>
          <div>
            <BreadCrumb step4 tab={"CE"} link="My Jobs" />
          </div>
          {/* End Header */}
        <div className={!this.props.loginSteps.showHideSideBar ? "mains project-manager-dashboard-root-container" : "main-add project-manager-dashboard-root-container"} id="" style={{ margin: '0 !important' }}>
          <div className="">
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
                  <div id="project-manager-dashboard-grid-system" className="project-manager-all-page-equal-top-shifting">
                    <div className="empty-outline-box-for-project-manager-dashboard">
                      {/* Start section shifting */}
                      <div className="">
                        <div className="tf_all_search_filter" id="tf_all_search_filter-all-job-posting">
                          <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12">
                            <div className="input-group">
                              <div className="input-group-addon1"><img src={searchIcon} alt="search-img" />
                              </div>
                              <form>
                                <div className="tf_search">
                                  <input type="text" className="form-control mn_input"
                                    onChange={this.handleSearch} placeholder="Search Job Posting" />
                                </div>
                              </form>
                            </div>
                          </div>
                        </div>
                      </div>
                      {/* Start Column Right Side  */}
                      <div className="col-md-12">
                        {/* Start Custom Container of Tabs CSS */}
                        <div className="dashboard-all-project-status-tabs">

                          {/*Start Tab Panel */}
                          <div className="tabbable-panel">

                            {/* Start Tab List and Content */}
                            <div className="tabbable-line">


                              <div className="tab-content" id="project-manager-dashboard-jobs-types-tabs-content" >
                                {/* Start Tab 1st Content */}

                                <div className="tab-pane active fade in" id="tab-new">
                                  <div className="mt-10">
                                    {(this.state.isLoading || this.props.applicationIsLoading) ?
                                      (
                                        <div className="grid-loader my-feed-loader col-md-12">
                                          <Loader
                                            type="Grid"
                                            color="#00BFFF"
                                            height={100}
                                            width={100}
                                          />
                                        </div>
                                      )
                                      :
                                      (

                                        <div className="row">
                                          {/* Start Column 6  */}
                                          {onlyNewJobs.length > 0 ? onlyNewJobs.map((row, idx) => {
                                            // const requiredExpertise = row.job_expertise_required
                                            //   ? row.job_expertise_required
                                            //   : [];
                                            const additionalExpertise = row.job_additional_expertise_required
                                              ? row.job_additional_expertise_required
                                              : [];
                                            const speciality = row && row.job_speciality ? row.job_speciality : [];
                                            const expertise = [...additionalExpertise, ...speciality];

                                            return (
                                              <div className="col-md-12 nopad" key={idx}>
                                                <div className="project-manager-dashboard-active-jobs-single-box">


                                                  <div className="project-manager-dashboard-active-jobs-single-box-container">
                                                    <div className={"project-manager-dashboard-active-jobs-single-box-title-description " + row.job_visibility + "-list-row"}>

                                                      {/* Start Row */}
                                                      <div className="row">
                                                        {/* Start Column 11 */}
                                                        <div className="col-md-12 col-sm-11 col-xs-10 nopad">
                                                          <div className="col-md-12">
                                                            <p onClick={this.handleOPenModal.bind(this, row, idx)} className="project-title">{`${row.job_title.substring(0, 200)}`}
                                                              {
                                                                !(row && row.get_job_qualification && row.get_job_qualification.qualification_group === "No")
                                                                  ?
                                                                  <img
                                                                    src={CertificateTitle} title="Certification Required" className="certification-required all-job-postings-logo" alt="" />
                                                                  :
                                                                  ''
                                                              }
                                                              {
                                                                <span className={"job-preference-custom-tags-" + row.job_visibility.toLowerCase()}>{row.job_visibility}</span>
                                                              }
                                                            </p>

                                                          </div>

                                                        </div>
                                                        {/* End Column 11 */}

                                                      </div>
                                                      {/* End Row */}


                                                      {/* Start Row */}
                                                      <div className="row">

                                                        <div className="col-md-12">
                                                          <div className="project-statistics">

                                                            <div className="project-statistics-box"><strong>Pay Type:</strong>&nbsp;{row.job_pay_type}</div>
                                                            <div className="project-statistics-box"><strong>Exp. Level:</strong>&nbsp; {row.job_experience_level}</div>
                                                            <div className="project-statistics-box"><strong>Est. Time: </strong>&nbsp; {this.checkEst(row.job_duration)}</div>
                                                            <div className="project-statistics-box"><strong>Time Req.: </strong>&nbsp; {this.checkEst(row.job_time_requirement)}</div>
                                                            <div className="project-statistics-box"><strong>Posted:</strong>&nbsp; <TimeAgo date={new Date(row.created_at).toUTCString()} /></div>

                                                          </div>
                                                        </div>
                                                      </div>
                                                      {/* End Row */}

                                                      {/* Start Row */}
                                                      <div className="row">
                                                        <div className="col-md-12">
                                                          <p className="project-description">{`${row.job_description.substring(0, 250)}...`}{" "}</p>
                                                        </div>
                                                      </div>
                                                      {/* End Row*/}

                                                      {/* Start Row */}
                                                      <div className="row">
                                                        <div className="col-md-12">

                                                          {expertise.length > 0 &&
                                                            <Skills
                                                              skill={expertise}
                                                              id=""
                                                              to=""
                                                              displayCount={3}
                                                              cursorDisabled={true}
                                                            />
                                                          }
                                                        </div>
                                                      </div>
                                                      {/* End Row*/}

                                                      {/* Start Row */}
                                                      <div className="row mt-10">
                                                        <div className="col-md-3">
                                                          <p className=""><strong>Proposals:</strong> {row.proposal_count}</p>
                                                        </div>

                                                        <div className="col-md-3 custom-start">
                                                          {this.returnStars(row && row.maximum_rating)}
                                                        </div>

                                                        <div className="col-md-3">
                                                          <p className="">
                                                            <strong>
                                                              {row.amount_spent}k+ Spent
                                                            </strong>
                                                          </p>
                                                        </div>

                                                        <div className="col-md-3 tf_payment_fail">
                                                          <p className="">
                                                            <strong>
                                                              {
                                                                row && row.get_job_qualification ?
                                                                  this.returnCountryFlag1(row.get_job_qualification) : ''
                                                              }

                                                              {
                                                                row
                                                                &&
                                                                row.get_job_qualification
                                                                &&
                                                                (row.get_job_qualification.location || 'Anywhere')}
                                                            </strong>
                                                          </p>
                                                        </div>

                                                      </div>
                                                      {/* End Row*/}

                                                    </div>



                                                  </div>
                                                </div>
                                              </div>
                                            )

                                          }) : !this.state.isLoading && (
                                            // <div className="tf_all_aws tf_my_aws noJobsFound">
                                            //   <img src={NODataFoundImg} alt="" />
                                            //   <p className="text-center all-job-posting-center">No Jobs Found.</p>
                                            // </div>
                                            <NoDataFoundMessage 
                                            message={jobs?.message || "No Jobs Found."}
                                            />
                                          )
                                          }
                                          {/* End Column 6  */}
                                        </div>
                                      )
                                    }
                                  </div>
                                </div>
                                {/* End Tab 1st Content */}


                              </div>
                              {/* End Tab Content */}

                            </div>
                            {/* End Tab List and Content */}

                          </div>
                          {/*End Tab Panel */}

                        </div>
                        {/* End Custom Container of Tabs CSS */}

                        {/* Start Row  */}
                        <div className="row">
                          {/* Start Column 12  */}
                          <div className="col-md-12">

                            {
                              (!_.isEmpty(newJobs) && newJobs.length > 0) ? (
                                <Pagination
                                  activePage={this.state.activePage}
                                  itemsCountPerPage={itemsCountPerPage}
                                  totalItemsCount={newJobs.length}
                                  pageRangeDisplayed={4}
                                  onChange={this.handleDraftPageChange.bind(this)}
                                  prevPageText="Previous"
                                  nextPageText="Next"
                                />
                              ) : null
                            }
                          </div>
                          {/* End Column 12  */}
                        </div>
                        {/* End Row  */}

                      </div>
                      {/* End Column Right Side  */}

                      {/* Start Slider Row */}

                      <Modal isOpen={this.state.openModal} style={customStyles} onRequestClose={this.closeModals}>
                        <div className="modal-dialog project-manager-dashboard-grid-project-popup">
                          {this.props.applicationIsLoading &&
                            (
                              <div className="grid-loader my-feed-loader col-md-12">
                                <Loader
                                  type="Grid"
                                  color="#00BFFF"
                                  height={100}
                                  width={100}
                                />
                              </div>
                            )
                          }
                          {!this.props.applicationIsLoading && !isEmpty(this.state.jobDetail) &&
                            <div className="modal-content">
                              <div className="modal-header">
                                <div className="row">
                                  <div className="col-md-11">
                                    <h3 className="job-title-in-popup">{this.state.jobDetail.job_title}</h3>
                                  </div>

                                  <div className="col-md-1">
                                    <button type="button" className="close" onClick={this.closeModals}>
                                      <span aria-hidden="true">×</span>
                                      <span className="sr-only">Close</span>
                                    </button>
                                  </div>
                                </div>
                              </div>
                              <div className="clearfix"></div>

                              <div className="modal-body">

                                <div className="col-md-6">
                                  <p className="developer-and-job-expiration-date-in-popup"><strong>Visibility:</strong> <span className={"job-preference-custom-tags-" + this.state.jobDetail.job_visibility.toLowerCase()}>{this.state.jobDetail.job_visibility}</span></p>
                                </div>
                                <div className="col-md-6">
                                  <p className="developer-and-job-expiration-date-in-popup"><strong>Job Expiration Date: </strong>{new Date(new Date(this.state.jobDetail.job_expiration_date).toUTCString()).getDate() + "/" + (new Date(new Date(this.state.jobDetail.job_expiration_date).toUTCString()).getMonth() + 1) +
                                    "/" + new Date(new Date(this.state.jobDetail.job_expiration_date).toUTCString()).getFullYear()}</p>
                                </div>

                                <div className="clearfix"></div>

                                <div className="col-md-6">
                                  <p className="developer-and-job-expiration-date-in-popup"><strong>Posted :</strong> <TimeAgo date={new Date(this.state.jobDetail.created_at).toUTCString()} /></p>
                                </div>
                                <div className="col-md-6">
                                  <p className="developer-and-job-expiration-date-in-popup"><img src={pay_dark_color} alt="" /></p>
                                </div>

                                <div className="clearfix"></div>

                                <div className="col-md-12">
                                  <hr className="popup-hr-divider-for-grid" />
                                </div>

                                <div className="col-md-12">
                                  <h5 className="job-description-in-popup"><strong>Job Description:</strong> {`${this.state.jobDetail.job_description.substring(0, 300)}...`}</h5>
                                </div>

                                <div className="clearfix"></div>

                                <div className="col-md-12">
                                  <hr className="popup-hr-divider-for-grid" />
                                </div>

                                <div className="clearfix"></div>

                                <div className="col-md-3">
                                  <h5 className="job-category-in-popup"><strong>Tech Stack: </strong>
                                  </h5>
                                </div>

                                <div className="col-md-9 nopad">
                                  {(this.state.jobDetail.job_speciality || []) &&
                                    <Skills
                                      skill={this.state.jobDetail.job_speciality}
                                      id=""
                                      to=""
                                      displayCount={2}
                                      wordCount={true}
                                    />
                                  }
                                </div>

                                <div className="clearfix"></div>

                                <div className="col-md-12">
                                  <hr className="popup-hr-divider-for-grid" />
                                </div>

                                <div className="clearfix"></div>

                                <div className="col-md-6">
                                  <p className="project-status-counter"><strong>Proposals:</strong> {this.state.jobDetail.proposal_count}</p>
                                </div>
                                <div className="col-md-6">
                                  <p className="project-status-counter"><strong>Last Viewed:</strong> 0</p>
                                </div>
                                <div className="clearfix"></div>

                                <div className="col-md-12">
                                  <hr className="popup-hr-divider-for-grid" />
                                </div>

                                <div className="clearfix"></div>

                                <div className="col-md-6">
                                  <p className="project-status-counter"><strong>Interviewing:</strong> 0</p>
                                </div>
                                <div className="col-md-6">
                                  <p className="project-status-counter"><strong>Invite sent:</strong> 0</p>
                                </div>

                                <div className="clearfix"></div>

                                <div className="col-md-12">
                                  <hr className="popup-hr-divider-for-grid" />
                                </div>

                                <div className="clearfix"></div>

                                <div className="col-md-12">
                                  <p className="project-status-counter"><strong>Project Type:</strong> {this.state.jobDetail.job_type}</p>
                                </div>


                                <div className="clearfix"></div>

                                <div className="col-md-12">
                                  <hr className="popup-hr-divider-for-grid" />
                                </div>

                                <div className="clearfix"></div>


                                <div className="col-md-12">
                                  <p className="project-status-counter"><strong>Project Length:</strong> {this.state.jobDetail.job_duration}</p>
                                </div>

                                <div className="clearfix"></div>

                                <div className="col-md-12">
                                  <hr className="popup-hr-divider-for-grid" />
                                </div>

                                <div className="clearfix"></div>

                                <div className="col-md-12">
                                  <p className="project-status-counter"><strong>Experience Level:</strong> {this.state.jobDetail.job_experience_level}</p>
                                </div>

                                <div className="clearfix"></div>

                                <div className="col-md-12">
                                  <hr className="popup-hr-divider-for-grid" />
                                </div>

                                <div className="clearfix"></div>

                                <div className="col-md-12">
                                  <p className="project-status-counter"><strong>Time Requirement:</strong> {this.state.jobDetail.job_time_requirement}</p>
                                </div>

                                <div className="clearfix"></div>

                                <div className="col-md-12">
                                  <hr className="popup-hr-divider-for-grid" />
                                </div>

                                <div className="clearfix"></div>

                                <div className="col-md-12">
                                  <p className="project-status-counter"><strong>Pay by:</strong> {this.state.jobDetail.job_pay_type}</p>
                                </div>

                                <div className="clearfix"></div>

                                <div className="col-md-12">
                                  <hr className="popup-hr-divider-for-grid" />
                                </div>

                                <div className="clearfix"></div>
                                {this.state.jobDetail.job_pay_type !== "Pay by hour" &&
                                  <React.Fragment>
                                    <div className="col-md-12">
                                      <p className="project-status-counter"><strong>Budget:</strong> ${this.state.jobDetail.job_pay_value}</p>
                                    </div>
                                    <div className="clearfix"></div>
                                    <div className="col-md-12">
                                      <hr className="popup-hr-divider-for-grid" />
                                    </div>
                                  </React.Fragment>
                                }

                                <div className="clearfix"></div>

                                <div className="col-md-12">
                                  <div className="clearfix"></div>
                                  <div className="popup-view-posting-button-container">
                                    <a className="popup-view-posting-button" href={`/job-details/${this.state.jobDetail.uuid || this.state.jobDetail.id}`}>View Posting</a>
                                  </div>
                                </div>
                                <div className="clearfix"></div>
                                {
                                  1 < this.state.currentArrayKey &&
                                  (<a href="javascript:void(0)" className="previous-link" onClick={this.changeProfile.bind(this, this.state.jobDetail.id, 'previous')}> <i className="fa fa-chevron-left" aria-hidden="true"></i></a>)
                                }

                                {this.state.currentArrayKey < newJobs.length &&
                                  (<a href="javascript:void(0)" className="next-link" onClick={this.changeProfile.bind(this, this.state.jobDetail.id, 'next')}> <i className="fa fa-chevron-right" aria-hidden="true"></i></a>)
                                }
                              </div>
                            </div>
                          }
                        </div>
                      </Modal>

                    </div>
                    {/* End section shifting */}
                  </div>

                </div>
              </div>
            </div>
            {/* End Container */}
          </div>
        </div>

      </div>
      // End Root Container
    )
  }
}
const mapStateToProps = (state) => ({
  ...state,
})

const mapDispatchToProps = (dispatch) => {
  return {
    getMyJobsForFreelancer: (page, searchItem) => dispatch(getMyJobsForFreelancer(page, searchItem)),
    fetchJob: (id) => dispatch(fetchJob(id)),
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(MyJobsFreelancer)
