// @PMDashboard.js
// * This component contains all the jobs posted by the current user(home page for project manager)

import React, { Component } from "react";
import { connect } from "react-redux";
import Footer from "../miscellaneous/Footer";
import Modal from "react-modal";
import { Link } from "react-router-dom";
import { logOutAction } from "../../Actions/logOutAction";
import "react-tagsinput/react-tagsinput.css";
import _ from "lodash";
import { isEmpty } from "lodash";
import ProjectManagerHeader from "../miscellaneous/ProjectManagerHeader";
import PMDashboardSideBar from "./PMDashboardSideBar";
import { getCurrentUserDetails } from "../../Actions/applicationActions";
import TemplateSlider from "./JobTemplateSliders/TemplateSlider";
import Loader from "react-loader-spinner";
import { getMyJobs } from "../../Actions/ProjectManagerFreelancerActions";
import { fetchJob, removePost } from "../../Actions/programManagerJobsActions";
import { getNotificationsForFreelancer, deleteNotification, } from "../../Actions/freelancerActions";
import Pagination from "react-js-pagination";
import TimeAgo from "react-timeago";
import pay_dark_color from "../../static/images/pay_dark_color.png";
import Skills from "../Common/Skills"
import MoreIcon from '../../static/images/Icon_More_Filled.svg';
import CITYWITHCOUNTRY from "../../constants/cityWithCountries";
import ReactCountryFlag from "react-country-flag"
import globeSrc from "../../static/images/globe.png";
import CertificateTitle from "../../static/images/certification-required.png";
import BreakCrumb from "../miscellaneous/BreadCrumb";
import NoDataFoundMessage from "../Common/NodataFoundMessage/NoDataFoundMessage";
// import inviteIcon from "../../static/images/invite.png";
import SuccessSweetAlert from "../CommonComponets/SweetAlert/SuccessSweetAlert";




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

class MyJobs extends Component {
  constructor(props, context) {
    super(props, context)
    this.state = {
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
      jobs: []
    }
  }

  componentDidMount() {
    this.props.getMyJobs(this.state.activeTab).then((res) => {
      // console.log('---',res)
      this.setState({ jobs: res })
    })
  }


  handleOPenModal = (row, i) => {

    this.props.history.push(`/job/${row.uuid}/1`)
    return false;
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

  showCurentTransData = (data, event) => {
    event.preventDefault();
    this.setState({
      currentTransData: data,
      showModal: true
    }, () => {
      this.returnModalData()
    })
  }

  closeModalIn = () => {
    this.setState({ showModal: false })
  }

  handleDraftPageChange = (pageNumber) => {
    this.setState({ activePage: pageNumber })
  }

  handleEdit = (e) => {
    this.props.history.push(`/edit-a-job-progress/${e.currentTarget.id}`)
  }

  handleRemove = (id, idx) => {
    this.setState({ removeModal: true, methodId: id, methodIdx: idx })
  }

  removeHandler = (id, idx) => {
    this.handleRemove(id, idx)
  }

  deleteNotifi = (id) => {
    this.props.deleteNotification(id).then((res) => {
      if (res.status === 200) {
        this.props.getNotifications()
      }
    })
  }

  removeAccount = (id) => {
    this.setState({ removeModal: false })

    this.props.removePost(this.state.methodId).then((res) => {
      if (res.status === 200) {
        this.setState({ isDeleted: true })
        const jobs = this.state.jobs;
        jobs.splice(this.state.methodIdx, 1);
        this.setState({ jobs });
      }
    })
    this.showOptions(this.state.methodIdx)
  }

  showOptions = (idx) => {
    this.setState({ [`isOptions${idx}`]: !this.state[`isOptions${idx}`] })
  }

  onCloseSlider = () => {
    this.setState({ isSliderOpen: false })
  }

  openSlider = (e) => {
    this.setState({ isSliderOpen: true, sliderType: e.currentTarget.firstElementChild.id })
  }

  hideAlert = () => {
    this.setState({ isDeleted: false })
  }

  closeModal = () => {
    this.setState({ removeModal: false })
  }

  showASection = (event) => {

    if (event.target.id === "new") {
      this.dashboardAPI(event.target.id)
    } else if (event.target.id === "active") {
      this.dashboardAPI(event.target.id)
    } else {
      this.dashboardAPI(event.target.id)
    }
    this.setState({ activeTab: event.target.id, activePage: 1 })
  }

  dashboardAPI = (id) => {
    this.props.getMyJobs(id).then((res) => {
      this.setState({ jobs: res })
    })
  }

  handleDraftPageChange = (pageNumber) => {
    this.setState({ activePage: pageNumber })
    // window.scrollTo(0, 0);
  }

  returnNotifications = () => {
    let { freelancerNotifications } = this.props
    let { showNot } = this.state

    if (freelancerNotifications && freelancerNotifications[0] && freelancerNotifications[0].notification_count > 0 && showNot) {
      return (
        <li style={{ marginBottom: '5px', padding: '10px', background: '#fff', textAlign: 'center' }}>
          <div className="row ">
            <div className="col-md-11">
              <Link to="/notifications" className="project-manager-dashboard-notification">
                <i className="fa fa-bell"></i>({'You have new messages ' + freelancerNotifications[0].notification_count})
              </Link>

            </div>

            <div className="col-md-1">
              <button
                type="button"
                className="close"
                data-dismiss="dropdown"
                aria-hidden="true"
                onClick={() => this.setState({ showNot: false })}
              >
                ×
              </button>
            </div>
          </div>
          <div className="clearfix"></div>
        </li>

      )
    }
  }

  returnStars = (value) => {
    let stars = [];
    for (let i = 0; i < 5; i++) {
      stars.push(<i
        className="fa fa-star first"
        style={{ color: i + 1 > value ? '#8080806e' : '#0DA4DE', fontSize: '18px' }}
      >
      </i>)
    }
    return stars;
  }

  returnModalData = () => {
    let data = []
    let { currentTransData } = this.state
    currentTransData && data.push(
      <tr>
        <td width="50%" className="popup-left-column">Reference ID</td>
        <td width="50%" className="popup-right-column"><Link>{currentTransData.reference_id}</Link></td>
      </tr>
      ,
      <tr>
        <td width="50%" className="popup-left-column">Date</td>
        <td width="50%" className="popup-right-column">{currentTransData.created_at.slice(0, 10)} {" "}</td>
      </tr>
      ,
      <tr>
        <td width="50%" className="popup-left-column">Amount</td>
        <td width="50%" className="popup-right-column">${currentTransData.amount}</td>
      </tr>
      ,
      <tr>
        <td width="50%" className="popup-left-column">Type</td>
        <td width="50%" className="popup-right-column">{currentTransData.transaction_type}</td>
      </tr>
      ,
      <tr>
        <td width="50%" className="popup-left-column">Cloud Expert</td>
        <td width="50%" className="popup-right-column">{`${this.props.currentUser.first_name} ${this.props.currentUser.last_name}`}</td>
      </tr>
    )

    return data
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
  render() {
    const itemsCountPerPage = 4;

    const { removeModal, activePage, jobs } = this.state;

    let newJobs = (!isEmpty(jobs) && jobs.length > 0) ? jobs : []
    let onlyNewJobs = JSON.parse(JSON.stringify((newJobs))).splice(activePage === 1 ? 0 : ((activePage - 1) * itemsCountPerPage), itemsCountPerPage)

    return (
      // Start Root Container
      <div id="tf-project-manager-dashboard-root">
        {/* Start Header */}
        <div id="project-manager-dashboard-header-light-theme">
          <ProjectManagerHeader history={this.props.history} currentUserDetails={this.props.currentUser} />
        </div>
        <div>
          <BreakCrumb step1 link="My Jobs" />
        </div>
        {/* End Header */}
        <div className={!this.props.loginSteps.showHideSideBar ? "mains  project-manager-dashboard-root-container" : "main-add  project-manager-dashboard-root-container"} id="">
          {/* Start Container */}
          <div className="">
            <div className="row custom_row">
              <div className="col-lg-2 col-md-2 col-sm-2 col-xs-2 p-0">
                <div className="custom_sticky_container">
                  <div className="position-sticky">
                    <PMDashboardSideBar history={this.props.history} />
                  </div>
                </div>
              </div>
              <div className="col-lg-10 col-md-10 col-sm-10 col-xs-10">
                <div className="pro-right-content-area">
                  <div className="" id="project-manager-dashboard-grid-system">

                    <div className="empty-outline-box-for-project-manager-dashboard">


                      {/* Start section shifting */}
                      <div className="">
                        {
                          this.state.isDeleted &&
                          (
                            // <div className="app-pro2-swal">
                            //   <SweetAlert title="" onConfirm={() => this.hideAlert()} showConfirm={true}>
                            //     <img src={inviteIcon} alt="" />
                            //     <h4>
                            //       <strong>
                            //         Your job has been deleted successfully. <br />
                            //       </strong>
                            //     </h4>
                            //   </SweetAlert>
                            // </div>
                            <SuccessSweetAlert
                              handleConfirm={this.hideAlert.bind()}
                              show={true}
                              message={"Your job has been deleted successfully."}
                            />
                          )
                        }


                        {/* Start remove this job popup */}
                        <Modal isOpen={removeModal} style={customStyles} onRequestClose={this.closeModal}>
                          <div className="modal-dialog" id="remove-payment-method-popup">
                            <div className="modal-content">
                              <div className="modal-header">
                                <button type="button" className="close" onClick={this.closeModal}>
                                  <span aria-hidden="true">×</span>
                                  <span className="sr-only">Close</span>
                                </button>
                                <h4 className="modal-title"> Job Post</h4>
                              </div>
                              <div className="modal-body">
                                <p className="are-you-sure-message">
                                  Are you sure you want to remove this job?
                                </p>
                                <div className="yes-no-button-container">
                                  <button
                                    onClick={() => this.removeAccount()}
                                    type="button"
                                    className="btn btn-ban"
                                  >
                                    Yes
                                  </button>
                                  <button onClick={this.closeModal} type="button" className="btn btn-not-ban">
                                    No
                                  </button>
                                </div>
                              </div>
                            </div>
                          </div>
                        </Modal>
                        {/* End remove this job popup */}

                        {/* Start Column Right Side  */}
                        <div className="col-md-12">
                          {/* Start Custom Container of Tabs CSS */}


                          <div className="dashboard-all-project-status-tabs">

                            {/*Start Tab Panel */}
                            <div className="tabbable-panel">


                              {/* Start Tab List and Content */}
                              <div className="tabbable-line">


                                {/* Start Tab List */}
                                <ul className="nav tabcustom job-tab" id="">
                                  <li className="active" >
                                    {" "}
                                    <a href="#tab-new" id="new" data-toggle="tab" onClick={this.showASection}>
                                      All Jobs </a>
                                    {" "}
                                  </li>

                                  <li>
                                    {" "}
                                    <a href="#tab-active" id="active" data-toggle="tab" onClick={this.showASection}>
                                      Active Jobs </a>
                                    {" "}
                                  </li>

                                  <li>
                                    {" "}
                                    <a href="#tab-completed" id="completed" data-toggle="tab" onClick={this.showASection}>
                                      Completed Jobs </a>
                                    {" "}
                                  </li>

                                  {/* <li>
                                                                {" "}
                                                                    <a href="#tab_cloud_expert" data-toggle="tab" onClick={this.showASection}> My Cloud Experts </a>
                                                                {" "}
                                                                </li> */}
                                </ul>
                                {/* End Tab List */}


                                <div className="tab-content" id="project-manager-dashboard-jobs-types-tabs-content" >
                                  {/* Start Tab 1st Content */}

                                  <div className="tab-pane active fade in jobNewPostSectionList" id="tab-new">
                                    <div className="mt-10">
                                      {(this.state.isLoading || this.props.applicationIsChangeLoading) ?
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
                                                <div className="col-md-12 nopad">
                                                  <div className="project-manager-dashboard-active-jobs-single-box">


                                                    <div className="project-manager-dashboard-active-jobs-single-box-container">
                                                      <div className={"project-manager-dashboard-active-jobs-single-box-title-description " + row.job_visibility + "-list-row"}>

                                                        {/* Start Row */}
                                                        <div className="row">
                                                          {/* Start Column 11 */}
                                                          <div className="col-md-11 col-sm-11 col-xs-10 nopad">
                                                            <div className="col-md-12">

                                                              <h5 onClick={this.handleOPenModal.bind(this, row, idx)} className="project-title">{`${row.job_title.substring(0, 200)}`}
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
                                                              </h5>

                                                            </div>

                                                          </div>
                                                          {/* End Column 11 */}

                                                          {/* Start Column 1  */}

                                                          <div className="col-md-1 col-sm-1 col-xs-2">
                                                            <div className="post-edit-dropdown">
                                                              <Link className="my-post-more-icon" onClick={(e) => { e.preventDefault(); this.showOptions(idx) }}><img src={MoreIcon} alt="" /></Link>
                                                              {(this.state[`isOptions${idx}`]) &&
                                                                <ul className="job-options job-post-more-option">
                                                                  <li
                                                                    className="edit-a-job-progress"
                                                                    data-for="edit-vertical"
                                                                    id={row.uuid || row.id}
                                                                    onClick={this.handleEdit}>
                                                                    Edit Job Post
                                                                  </li>
                                                                  <li className="view-job-post"><Link to={`/job/${row.uuid || row.id}/1`} >View Job Post</Link></li>
                                                                  <li className="remove-job-post"
                                                                    id={row.uuid || row.id}
                                                                    onClick={this.handleRemove.bind(this, row.uuid || row.id, idx)}>
                                                                    Remove Job Post
                                                                  </li>
                                                                </ul>
                                                              }
                                                            </div>
                                                          </div>
                                                          {/* End Column 1 */}
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
                                                        <div className="row">
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

                                            }) : (
                                              // <div className="noJobsFound">
                                              //   <img src={NODataFoundImg} alt="" />
                                              //   <p>No New Jobs Found </p>
                                              // </div>
                                              <NoDataFoundMessage
                                                message={jobs?.message ||  "No New Jobs Found"}
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

                                  {/* Start Tab 2nd Content */}
                                  <div className="tab-pane fade mt-20" id="tab-active">
                                    <div className="mt-10">
                                      {
                                        this.props.applicationIsChangeLoading ?
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
                                                  <div className="col-md-12 nopad">
                                                    <div className="project-manager-dashboard-active-jobs-single-box">


                                                      <div className="project-manager-dashboard-active-jobs-single-box-container">
                                                        <div className={"project-manager-dashboard-active-jobs-single-box-title-description " + row.job_visibility + "-list-row"}>

                                                          {/* Start Row */}
                                                          <div className="row">
                                                            {/* Start Column 11 */}
                                                            <div className="col-md-11 col-sm-11 col-xs-10 nopad">
                                                              <div className="col-md-12">
                                                                <h5 onClick={this.handleOPenModal.bind(this, row, idx)} className="project-title">{`${row.job_title.substring(0, 200)}`}
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
                                                                </h5>

                                                              </div>

                                                            </div>
                                                            {/* End Column 11 */}

                                                            {/* Start Column 1  */}

                                                            <div className="col-md-1 col-sm-1 col-xs-2">
                                                              <div className="post-edit-dropdown">
                                                                <Link className="my-post-more-icon" onClick={(e) => { e.preventDefault(); this.showOptions(idx) }}><img src={MoreIcon} alt="" /></Link>
                                                                {(this.state[`isOptions${idx}`]) &&
                                                                  <ul className="job-options job-post-more-option">
                                                                    <li
                                                                      className="edit-a-job-progress"
                                                                      data-for="edit-vertical"
                                                                      id={row.uuid || row.id}
                                                                      onClick={this.handleEdit}>
                                                                      Edit Job Post
                                                                    </li>
                                                                    <li className="view-job-post"><Link to={`/job/${row.uuid || row.id}/1`} >View Job Post</Link></li>
                                                                    <li className="remove-job-post"
                                                                      id={row.uuid || row.id}
                                                                      onClick={this.handleRemove.bind(this, row.uuid || row.id, idx)}>
                                                                      Remove Job Post
                                                                    </li>
                                                                  </ul>
                                                                }
                                                              </div>
                                                            </div>
                                                            {/* End Column 1 */}
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
                                                          <div className="row">
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

                                              }) : (
                                                // <div className="noJobsFound">
                                                //   <img src={NODataFoundImg} alt="" />
                                                //   <p>No Active Jobs Found </p>
                                                // </div>
                                                <NoDataFoundMessage
                                                  message={jobs?.message || "No Active Jobs Found"}
                                                />
                                              )
                                              }
                                              {/* End Column 6  */}
                                            </div>
                                          )
                                      }
                                    </div>
                                  </div>
                                  {/* End Tab 2nd Content */}

                                  {/* Start Tab 3rd Content */}
                                  <div className="tab-pane fade mt-20" id="tab-completed">
                                    <div className="mt-10">
                                      {
                                        this.props.applicationIsChangeLoading ?
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
                                                  <div className="col-md-12 nopad">
                                                    <div className="project-manager-dashboard-active-jobs-single-box">


                                                      <div className="project-manager-dashboard-active-jobs-single-box-container">
                                                        <div className={"project-manager-dashboard-active-jobs-single-box-title-description " + row.job_visibility + "-list-row"}>

                                                          {/* Start Row */}
                                                          <div className="row">
                                                            {/* Start Column 11 */}
                                                            <div className="col-md-11 col-sm-11 col-xs-10 nopad">
                                                              <div className="col-md-12">
                                                                <h5 onClick={this.handleOPenModal.bind(this, row, idx)} className="project-title">{`${row.job_title.substring(0, 200)}`}
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
                                                                </h5>

                                                              </div>

                                                            </div>
                                                            {/* End Column 11 */}

                                                            {/* Start Column 1  */}

                                                            <div className="col-md-1 col-sm-1 col-xs-2">
                                                              <div className="post-edit-dropdown">
                                                                <Link className="my-post-more-icon" onClick={(e) => { e.preventDefault(); this.showOptions(idx) }}><img src={MoreIcon} alt="" /></Link>
                                                                {(this.state[`isOptions${idx}`]) &&
                                                                  <ul className="job-options job-post-more-option">
                                                                    <li
                                                                      className="edit-a-job-progress"
                                                                      data-for="edit-vertical"
                                                                      id={row.uuid || row.id}
                                                                      onClick={this.handleEdit}>
                                                                      Edit Job Post
                                                                    </li>
                                                                    <li className="view-job-post"><Link to={`/job/${row.uuid || row.id}/1`} >View Job Post</Link></li>
                                                                    <li className="remove-job-post"
                                                                      id={row.uuid || row.id}
                                                                      onClick={this.handleRemove.bind(this, row.uuid || row.id, idx)}>
                                                                      Remove Job Post
                                                                    </li>
                                                                  </ul>
                                                                }
                                                              </div>
                                                            </div>
                                                            {/* End Column 1 */}
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
                                                          <div className="row">
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

                                              }) : (
                                                // <div className="noJobsFound">
                                                //   <img src={NODataFoundImg} alt="" />
                                                //   <p>No Completed Jobs Found </p>
                                                // </div>
                                                <NoDataFoundMessage
                                                  message={ jobs?.message  ||"No Completed Jobs Found."}
                                                />
                                              )
                                              }
                                              {/* End Column 6  */}
                                            </div>
                                          )
                                      }
                                    </div>
                                  </div>
                                  {/* End Tab 3rd Content */}

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
                        <div>
                          <TemplateSlider
                            isSliderOpen={this.state.isSliderOpen}
                            history={this.props.history}
                            sliderType={this.state.sliderType}
                            onCloseSlider={this.onCloseSlider}
                          />
                        </div>
                        {/* End Slider Row */}
                        <Modal isOpen={this.state.showModal} style={customStyles} >
                          <div className="modal-header transaction-details-popup-header">
                            <button type="button" className="close">
                              <i
                                className="fa fa-times"
                                onClick={this.closeModalIn}
                                aria-hidden="true"
                                style={{
                                  fontSize: '20px'
                                }}>

                              </i>
                            </button>
                            <h4 className="modal-title" id="myModalLabel">Transaction Details</h4>
                          </div>

                          <div className="modal-body admin-applicant-pop-up transaction-details-popup" style={{ background: '#fff' }}>
                            <div className="">
                              <table className="table">
                                <tbody>
                                  {this.returnModalData()}
                                </tbody>
                              </table>
                            </div>
                          </div>
                        </Modal>

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
                                      <a className="popup-view-posting-button" href={`/job/${this.state.jobDetail.uuid || this.state.jobDetail.id}/1`}>View Posting</a>
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
            </div>
          </div>
          {/* End Container */}
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
    logOut: () => dispatch(logOutAction()),
    getCurrentUserDetails: () => dispatch(getCurrentUserDetails()),
    getMyJobs: (activeTab) => dispatch(getMyJobs(activeTab)),
    removePost: (id) => dispatch(removePost(id)),
    fetchJob: (id) => dispatch(fetchJob(id)),
    deleteNotification: (id) => dispatch(deleteNotification(id)),
    getNotifications: () => dispatch(getNotificationsForFreelancer()),
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(MyJobs)
