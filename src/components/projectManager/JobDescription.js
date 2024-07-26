import React, { Component } from "react";
import { connect } from "react-redux";
import searchIcon from "../../static/images/Icon_Search.svg";
// import inviteIcon from "../../static/images/invite.png";
import { addFavourite, removeFavourite } from "../../Actions/AdminActions";
import _ from "lodash";
import { isEmpty } from "lodash";
import Modal from "react-modal";
import { Link } from "react-router-dom";
import faceImg from "../../static/images/profile-placeholder.png";
import { fieldError } from "../../utills/formatting";
import { getFreelancersToInvite, getFreelancersToMatcheSkills, getFreelancersToReview,  } from "../../Actions/ProjectManagerFreelancerActions";
import { getSearchedFLForHiringMan } from "../../Actions/SearchActions";
import Pagination from "react-js-pagination";
import { fetchJob, inviteToJob, setActiveJobTab } from "../../Actions/programManagerJobsActions";
import { getProfileForFreelancer } from "../../Actions/freelancerActions";
import ReadMoreAndLess from "react-read-more-less";
import ProjectManagerHeader from "../miscellaneous/ProjectManagerHeader";
import InvitedFreelancers from "../projectManager/InvitedFreelancers";
import HiredFreelancers from "../projectManager/HiredFreelancers";
import ReviewFreelancers from "../projectManager/ReviewFreelancers";
import SavedFreelancers from "../projectManager/SavedFreelancers";
import JobContainer from "./ProjectManagerJobContainer";
import Loader from "react-loader-spinner";
// import Footer from '../miscellaneous/Footer'
import COUNTRIES from '../../constants/countryListWithCodes'
import ReactCountryFlag from "react-country-flag"
import Skills from "../Common/Skills"
import CEDetailPopup from "../miscellaneous/CEDetailPopup"
import PMDashboardSideBar from "./PMDashboardSideBar";
import NODataFoundImg from "./../../static/images/noDataFound.png"
// import ErrorImg from "../../static/images/oops.png";
import BreadCrumb from "../miscellaneous/BreadCrumb";
import ErrorSweetAlert from "../CommonComponets/SweetAlert/ErrorSweetAlert";
import SuccessSweetAlert from "../CommonComponets/SweetAlert/SuccessSweetAlert";
import NoDataFoundMessage from "../Common/NodataFoundMessage/NoDataFoundMessage";


const itemsCountPerPage = 5;

const customStylesNew = {
  content: {
    top: "50%",
    left: "50%",
    right: "auto",
    bottom: "auto",
    marginRight: "-50%",
    transform: "translate(-50%, -50%)",
    padding: "0px",
  },
}

const customStyles = {
  content: {
    top: "50%",
    left: "50%",
    right: "auto",
    bottom: "auto",
    marginRight: "-50%",
    transform: "translate(-50%, -50%)",
    border: "none",
    background: "transparent"
  },
}

class JobDescription extends Component {
  constructor(props, context) {
    super(props, context)
    this.state = {
      View: false,
      Invite: false,
      Review: false,
      Hire: false,
      MatchesFound: false,
      openInvite: false,
      error: false,
      freelancerToInvite: {},
      errorMessage: "",
      inviteText: "",
      isLoading: false,
      isInvitationSent: false,
      invitedFreelancers: false,
      hiredFreelancers: false,
      savedFreelancers: false,
      isAllJobPostings: false,
      searchedFL: true,
      activeInviteFreelancerPage: 1,
      searchItem: "",
      modalIsOpen: false,
      openStatus: false,
      activePage: 1,
      openModal: false,
      profileDetail: '',
      currentArrayKey: 0,
      Cedetail: ''
    }

    this.openModal = this.openModal.bind(this)
    this.afterOpenModal = this.afterOpenModal.bind(this)
    this.closeModal = this.closeModal.bind(this)
  }
  componentDidMount() {

    if (this.props.match.params.tab === 'review') {
      this.setState({ Review: true })
    } else if (this.props.match.params.tab === 'invite') {
      this.setState({ Invite: true })
    } else {
      this.setState({ View: true })
    }
    this.props.fetchJob(this.props.match.params.id).then((res) => {
      if (res && res.response && res.response.status === 404) {
        this.setState({ error: true, errorMessage: res.response.data.error })
      }
    })
    if (this.props.location.state) {
      if (this.props.location.state === "inviteAllPosting") {
        this.props.getFreelancersToInvite(
          this.props.match.params.id || this.props.job.id,
          this.state.searchItem
        )
        this.setState({ Invite: true, View: false })
      }
      this.setState({ isAllJobPostings: this.props.location.state.isAllJobPostings })
    }
  }

  handleOPenModal = (row, i, e) => {
    e.preventDefault();
    this.setState({ openModal: true, currentArrayKey: i + 1 })
    this.props.getProfile(row.profile.uuid, "", true).then(
      (res) => {
        this.setState({ profileDetail: res, Cedetail: row })
      }
    )
  }

  closeModals = () => {
    this.setState({ profileDetail: "", openModal: false })
  }

  changeProfile = (id, type) => {
    let key = ''
    // console.log(this.state.currentArrayKey, '==',this.props.FreelancersToInvite.length)
    !isEmpty(this.props.FreelancersToInvite) && this.props.FreelancersToInvite.length > 0 && this.props.FreelancersToInvite.map((row, index) => {
      if (row.id === id) {
        if (type === 'next') {
          key = index + 1
        } else {
          key = index - 1
        }
        // console.log('key==',key)
        this.props.getProfile(this.props.FreelancersToInvite[key].profile.uuid, "", true).then(
          (res) => {
            this.setState({ profileDetail: res, currentArrayKey: key + 1 })
          }
        )
      }
      return row
    })
  }

  addFavourite = (id, event) => {
    event.preventDefault()
    event.currentTarget.firstElementChild.classList.remove("fa-heart-o")
    event.currentTarget.firstElementChild.classList.add("fa-heart")
    this.props.addFavourite(id).then((res) => {
      if (res.status === 200) {
        this.setState({ isDeleted: true, msg: "favorited Successfully" })
        this.props.getFreelancersToInvite(
          this.props.job.id || this.props.match.params.id,
          this.state.searchItem
        )
      }
    })
  }

  removeFavourite = (id, event) => {
    event.preventDefault()
    event.currentTarget.firstElementChild.classList.remove("fa-heart")
    event.currentTarget.firstElementChild.classList.add("fa-heart-o")
    this.props.removeFavourite(id).then((res) => {
      if (res.status === 200) {
        this.setState({ isDeleted: true, msg: "Unfavorited Successfully" })
        this.props.getFreelancersToInvite(
          this.props.job.id || this.props.match.params.id,
          this.state.searchItem
        )
      }
    })
  }

  hideAlert = () => {
    this.setState({ isDeleted: false, msg: "" })
  }

  componentWillReceiveProps(nextProps) {
    this.setState({ isLoading: nextProps && nextProps.applicationIsLoading })
  }

  handleSearch = (e) => {
    this.setState({ searchItem: e.target.value })
    this.searchFreelancers(e)
  }

  searchFreelancers = async (e) => {
    e.preventDefault()
    await this.props.getFreelancersToInvite(
      this.props.job.id || this.props.match.params.id,
      e.target.value //this.state.searchItem
    )
  }

  handlePageChange = (pageNumber) => {
    this.setState({ activePage: pageNumber })
    window.scrollTo(0, 0);
  }

  handleInviteClose = () => {
    this.setState({ openInvite: false, freelancerToInvite: {}, inviteText: "" })
  }

  inviteFreelancer = (freelancer, e) => {
    console.log('freelancer', freelancer)
    e.preventDefault()
    this.closeModals();
    this.setState({ openInvite: true, freelancerToInvite: freelancer, inviteText: "" })
  }

  onInviteTextChange = (e) => {
    this.setState({ inviteText: e.target.value })
  }

  handleSendInvite = (e) => {
    e.preventDefault()
    let data = {
      job_id: this.props.job.id,
      recipient_id: this.state.freelancerToInvite.id,
      message: e.target.elements[1].value,
    }
    if (e.target.elements[1].value || this.state.inviteText) {
      this.props
        .inviteToJob(data)
        .then((res) => {
          if (res.status === 200) {
            this.setState({
              openInvite: false,
              freelancerToInvite: {},
              inviteText: "",
              isInvitationSent: true,
            })
          }
        })
        .catch((err) => {
          console.log(err)
        })
    } else {
      this.setState({
        inviteTextError: true,
      })
    }
  }

  openDropDown = () => {
    const dropElement = document.getElementById("user-drop-down")
    dropElement.classList.toggle("open")
  }
  showASection = (event, tech) => {
    // console.log('e.target.id',event.target.id)
    if (event.target.id === "Invite") {
      this.props.getFreelancersToInvite(this.props.job.id || this.props.match.params.id)
      this.props.setActiveJobTab(true);
    } else if (event.target.id === "MatchesFound") {
      this.props.getFreelancersToMatcheSkills(
        this.props.match.params.id || this.props.job.id,
        [...tech]
      )
      
      this.props.setActiveJobTab(false)
    } else {
      this.props.setActiveJobTab(false)
    }

    this.setState({
      View: event.target.id === "View" ? true : false,
      MatchesFound: event.target.id === "MatchesFound" ? true : false,
      Invite: event.target.id === "Invite" ? true : false,
      Review: event.target.id === "Review" ? true : false,
      Hire: event.target.id === "Hire" ? true : false,
      invitedFreelancers: false,
      searchedFL: true,
      hiredFreelancers: false,
      savedFreelancers: false,
    })
  }
  hideAlert = () => {
    this.setState({ error: false })
    this.props.history.push("/")
  }

  hideInvitationSuccess = () => {
    this.props.getFreelancersToInvite(this.props.job.id)
    this.setState({ isInvitationSent: false, Invite: true })
  }

  showSubSection = (e) => {
    if (e.target.id === "searchFL") {
      this.props.getFreelancersToInvite(this.props.job.id || this.props.match.params.id)
    }
    this.setState({
      invitedFreelancers: e.target.id === "invited",
      searchedFL: e.target.id === "searchFL",
      hiredFreelancers: e.target.id === "hired",
      savedFreelancers: e.target.id === "saved",
    })
  }

  openModal() {
    this.setState({ modalIsOpen: true })
  }

  afterOpenModal() {
    this.subtitle.style.color = "#000";
  }

  closeModal() {
    this.setState({ modalIsOpen: false })
  }


  render() {
    const { activePage } = this.state;
    const { job, FreelancersToInvite, applicationIsLoading } = this.props;
    // console.log(job, "jobjobjobjobjobjobjobjobjobjobjobjobjobjobjob");
    // console.log(FreelancersToInvite, "FreelancersToInvite");
    // console.log("job",job)
    let freelancersInvite = JSON.parse(JSON.stringify(FreelancersToInvite)).splice(
      activePage === 1 ? 0 : (activePage - 1) * itemsCountPerPage,
      itemsCountPerPage
    )
    // const requiredExpertise = job.job_expertise_required ? job.job_expertise_required : [];
    const additionalExpertise = job.job_additional_expertise_required
      ? job.job_additional_expertise_required
      : [];
    const speciality = job && job.job_speciality ? job.job_speciality : [];
    let Totalexpertise = [...speciality, ...additionalExpertise];
    const expertiseUpperCase = Totalexpertise.map(item => item.toLocaleUpperCase())
    const expertise = Totalexpertise.filter((item , index) => expertiseUpperCase.indexOf(item.toLocaleUpperCase()) === index)
    // let expertise = [...speciality, ...additionalExpertise];
    const { View, Review, Hire, Invite, error, MatchesFound, errorMessage, freelancerToInvite } = this.state;
    return (
      <div className={!this.props.loginSteps.showHideSideBar ? "mains" : "main-add"}>
        <div className="wraper">
          <ProjectManagerHeader history={this.props.history} />
        </div>
        <div id="tf-project-manager-dashboard-root">
          <BreadCrumb step={"step6"} link="Job" />
        </div>
        {error && (
          // <div className="job-not-found-alert">
          //   {" "}
          //   <SweetAlert
          //     warning
          //     confirmBtnText="Ok"
          //     confirmBtnBsStyle="danger"
          //     // title={errorMessage}
          //     onConfirm={this.hideAlert}
          //   >

          //     <div id="EditJobSuccessMessagePopupInnerContent">
          //       <img src={ErrorImg} alt="" id="rightCheckIconImage" />
          //       <h4>
          //         <strong>
          //           {errorMessage}
          //         </strong>
          //       </h4>
          //     </div>


          //   </SweetAlert>
          // </div>

          <ErrorSweetAlert
            show={error}
            handleConfirm={() => this.hideAlert()}
            message={errorMessage}
          />
        )}

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
              handleConfirm={() => this.hideAlert()}
              show={true}
              message={this.state.msg}
            />
          )
        }
        <div className="mn_center p-0">
          <div className="" id="">
            <div className="d-flex custom_row">

              <div className="col-lg-2 col-md-2 col-sm-2 col-xs-2 p-0">
                <div className="custom_sticky_container">
                  <div className="position-sticky">
                    <PMDashboardSideBar history={this.props.history} />
                  </div>
                </div>
              </div>

              <div className="col-lg-10 col-md-10 col-sm-10 col-xs-10">
                <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12">
                  <div className="tf_aws job_desc_page m-0">

                    {this.state.isInvitationSent && (
                      // <div className="app-pro2-swal">
                      //   <SweetAlert title="" onConfirm={this.hideInvitationSuccess} showConfirm={true}>
                      //     <img src={inviteIcon} alt="" />
                      //     <h4>
                      //       <strong>
                      //         Invite sent. <br />
                      //         We will get back to you shortly.
                      //       </strong>
                      //     </h4>
                      //   </SweetAlert>
                      // </div>
                      <SuccessSweetAlert
                        handleConfirm={() => this.hideInvitationSuccess()}
                        show={true}
                        message={`Invite sent.
                                We will get back to you shortly.`}
                      />
                    )}
                    <div className="">
                      <div className="tabbable-panel">
                        <div className="tabbable-line">
                          <ul className="nav tabcustom">
                            <li className={View && "active"}>
                              <Link
                                id="View"
                                href="#tab_default_1"
                                onClick={job.posted_by_current_user ? this.showASection : ""}
                              >
                                View Job Post
                              </Link>{" "}
                            </li>
                            <li className={MatchesFound && "active"}>
                              <Link
                                id="MatchesFound"
                                href="#tab_default_5"
                                onClick={job.posted_by_current_user ? (e) => this.showASection(e, expertise) : ""}
                              >
                                Matches Found
                              </Link>{" "}
                            </li>
                            <li
                              className={!job.posted_by_current_user ? "disabled" : Invite && "active"}
                            >
                              <Link
                                id="Invite"
                                href="#tab_default_2"
                                onClick={job.posted_by_current_user ? this.showASection : ""}
                              >
                                Invite Cloud Expert
                              </Link>{" "}
                            </li>
                            <li
                              className={!job.posted_by_current_user ? "disabled" : Review && "active"}
                            >
                              <Link
                                id="Review"
                                href="#tab_default_3"
                                onClick={job.posted_by_current_user ? this.showASection : ""}
                              >
                                Review Proposals({job.proposal_count})
                              </Link>{" "}
                            </li>
                            <li className={!job.posted_by_current_user ? "disabled" : Hire && "active"}>
                              <Link
                                id="Hire"
                                href="#tab_default_4"
                                onClick={job.posted_by_current_user ? this.showASection : ""}
                              >
                                Hired({job.active_contract_count})
                              </Link>{" "}
                            </li>
                          </ul>
                          <div className="tab-content">
                            {View && (
                              <div className="tab-pane active fade in in" id="tab_default_1">
                                <JobContainer job={job} expertise={expertise} />
                              </div>
                            )}
                            {
                              MatchesFound &&
                              (
                                <div className="tab-pane active fade in in" id="tab_default_2">
                                  <div className="invite_freelancer" id="invite-cloud-expert-inner-container">
                                  
                                      <div className="tab-content">
                                        <div role="tabpanel" className="tab-pane active tab-content-top-margin" id="SEARCH">
                                          <div className="tf_search_filter">
                                            <div className="col-md-12 p-0">
                                              <div className="input-group">
                                                <div className="input-group-addon1">
                                                  <img src={searchIcon} alt="" />
                                                </div>
                                                <form>
                                                  <div className="tf_search">
                                                    <input
                                                      type="text"
                                                      onChange={this.handleSearch}
                                                      className="form-control mn_input"
                                                      placeholder="Search Cloud Experts…"
                                                      value={this.state.searchItem}
                                                    />
                                                  </div>
                                                </form>
                                              </div>
                                            </div>
                                          </div>
                                          <div className="clearfix"></div>
                                          <div className="">

                                            {applicationIsLoading && (
                                              <div className="grid-loader my-feed-loader col-md-12">
                                                <Loader type="Grid" color="#00BFFF" height={100} width={100} />
                                              </div>
                                            )
                                            }
                                            {!_.isEmpty(freelancersInvite) ? (
                                              freelancersInvite.map((freelancer, idx) => {
                                                return (


                                                  <div className="tf_main_filter list-view-strip-box" key={idx}>
                                                    <div className="col-md-12" id={freelancer && freelancer.profile && freelancer.profile.uuid}>

                                                      {/* Start Column 2 */}
                                                      <div className="col-md-2 tf_full_width">
                                                        <div className="tf_image">
                                                          <img
                                                            className=""
                                                            src={freelancer.profile.profile_picture || faceImg}
                                                            alt=""
                                                          />
                                                        </div>
                                                      </div>
                                                      {/* End Column 2 */}

                                                      {/* Start Column 8 */}
                                                      <div className="col-md-8">
                                                        {/* Start Row */}
                                                        <div className="row">
                                                          <div className="col-md-10">
                                                            <div className="row">
                                                              {/* Start Cloud Expert Name */}
                                                              <div className="col-md-6 p-0">
                                                                <Link
                                                                  onClick={this.handleOPenModal.bind(this, freelancer, idx)}
                                                                >
                                                                  <h4>
                                                                    {freelancer.full_name}
                                                                  </h4>
                                                                </Link>
                                                              </div>
                                                              <div className="col-md-6">
                                                                <div className="">
                                                                  <h5>
                                                                    <strong>
                                                                      {
                                                                        freelancer && freelancer.profile &&
                                                                        freelancer.profile.current_location_country &&
                                                                        <ReactCountryFlag
                                                                          countryCode={
                                                                            COUNTRIES.find(c => c.label ===
                                                                              freelancer.profile.current_location_country).value
                                                                            || 'US'
                                                                          }
                                                                          svg
                                                                          style={{
                                                                            width: '2em',
                                                                            height: '1.2em',
                                                                            float: 'left',
                                                                            marginLeft: '-2px',
                                                                            marginRight: '20px'
                                                                          }}
                                                                          title={'country'}
                                                                        />
                                                                      }
                                                                      {freelancer.profile &&
                                                                        freelancer.profile.current_location_country}
                                                                    </strong>
                                                                  </h5>
                                                                </div>
                                                              </div>
                                                            </div>
                                                            {/* End Cloud Expert Name */}
                                                          </div>

                                                          <div className="col-md-2">
                                                            <div className="heart-fill add-to-favourite-container">
                                                              {!freelancer.favorited_freelancer ? (
                                                                <Link
                                                                  onClick={this.addFavourite.bind(
                                                                    this,
                                                                    freelancer.id
                                                                  )}
                                                                  title="Favorited"
                                                                >
                                                                  <i
                                                                    className="fa fa-heart-o"
                                                                    aria-hidden="true"
                                                                  ></i>
                                                                </Link>
                                                              ) : (
                                                                <Link
                                                                  onClick={this.removeFavourite.bind(
                                                                    this,
                                                                    freelancer.id
                                                                  )}
                                                                  title="Favorited"
                                                                >
                                                                  <i
                                                                    className="fa fa-heart"
                                                                    aria-hidden="true"
                                                                  ></i>
                                                                </Link>
                                                              )}
                                                            </div>
                                                          </div>

                                                        </div>
                                                        {/* End Row */}

                                                        <div className="clearfix"></div>

                                                        {/* Start Row */}
                                                        <div className="row">
                                                          {/* Start Column 6 */}
                                                          <div className="col-md-6">
                                                            <div className="">
                                                              <h5>
                                                                <strong>
                                                                  {freelancer &&
                                                                    freelancer.profile &&
                                                                    freelancer.profile.current_job_title}
                                                                </strong>
                                                              </h5>
                                                            </div>
                                                          </div>


                                                        </div>
                                                        {/* End Row */}

                                                        {/* Start Description */}
                                                        <div className="row project-manager-after-login-cloud-expert-description">

                                                          <div className="col-md-12">
                                                            {freelancer.profile ? (
                                                              freelancer.profile.about_me && (
                                                                <ReadMoreAndLess
                                                                  ref={this.ReadMore}
                                                                  className="read-more-content"
                                                                  charLimit={150}
                                                                  readMoreText="Read more"
                                                                  readLessText="Read less"
                                                                >
                                                                  {freelancer.profile.about_me}
                                                                </ReadMoreAndLess>
                                                              )
                                                            ) : (
                                                              <p></p>
                                                            )}
                                                          </div>


                                                        </div>
                                                        {/*End Description  */}

                                                        {/* Start Skills */}
                                                        {
                                                          freelancer.profile.skill.length > 0 &&
                                                          <Skills
                                                            skill={freelancer.profile.skill}
                                                            to={`/user-profile/${freelancer.profile && freelancer.profile.user && freelancer.profile.user.uuid}/true`}
                                                            id={freelancer.uuid}
                                                            displayCount={5}
                                                          />
                                                        }
                                                        {/* End Skills */}

                                                      </div>
                                                      {/* End Column 8 */}

                                                      {/* Start Column 2 */}
                                                      <div className="col-md-2 text-center">

                                                        {/* Start Hourly Rate */}
                                                        <div className="">
                                                          {
                                                            freelancer.profile &&
                                                              freelancer.profile.hourly_rate ? (
                                                              <h5>
                                                                <strong>
                                                                  $
                                                                  {isNaN(freelancer.profile.hourly_rate)
                                                                    ? "00"
                                                                    : parseFloat(
                                                                      freelancer.profile.hourly_rate
                                                                    ).toFixed(2)}{" "}
                                                                  / hr
                                                                </strong>
                                                              </h5>
                                                            ) : (
                                                              <h5><strong>$0.00 / hr</strong></h5>
                                                            )}
                                                        </div>
                                                        {/* End Hourly Rate */}

                                                        {/* Start Hiring Button */}
                                                        <div className="">
                                                          {
                                                            !isEmpty(job) &&
                                                              !isEmpty(job.user) &&
                                                              !isEmpty(job.user.payment_method) ? (

                                                              <div className="hire-cloud-expert-button-search-list">
                                                                <Link to={{
                                                                  pathname: `/hire-a-freelancer/${freelancer.uuid}/${job.uuid}`,
                                                                  state: { fromManager: true },
                                                                }}
                                                                >
                                                                  Hire Cloud Expert
                                                                </Link>
                                                              </div>

                                                            )
                                                              :
                                                              (
                                                                <div className="hire-cloud-expert-button-search-list">
                                                                  <Link
                                                                    to={{
                                                                      pathname: "/settings",
                                                                      state: "payMethodPresent",
                                                                    }}
                                                                  >
                                                                    Hire Cloud Expert
                                                                  </Link>
                                                                </div>
                                                              )
                                                          }
                                                          <Modal
                                                            isOpen={this.state.modalIsOpen}
                                                            onAfterOpen={this.afterOpenModal}
                                                            onRequestClose={this.closeModal}
                                                            style={customStylesNew}
                                                            contentLabel="Example Modal"
                                                          >
                                                            <div className="add-payment-method-popup">
                                                              <div className="modal-header">
                                                                <button
                                                                  type="button"
                                                                  className="close"
                                                                  onClick={this.closeModal}
                                                                  data-dismiss="modal"
                                                                >
                                                                  <span aria-hidden="true">×</span>
                                                                  <span className="sr-only">Close</span>
                                                                </button>

                                                                <h2
                                                                  className="modal-title"
                                                                  ref={(subtitle) =>
                                                                    (this.subtitle = subtitle)
                                                                  }
                                                                >
                                                                  Payment Method
                                                                </h2>
                                                              </div>

                                                              <div className="modal-body">
                                                                <div className="row">
                                                                  <div className="col-md-12">
                                                                    <p>
                                                                      You have not added any payment method.
                                                                      Please add one by{" "}
                                                                      <a href="/settings">Clicking Here </a>
                                                                    </p>
                                                                  </div>
                                                                </div>
                                                              </div>
                                                            </div>
                                                          </Modal>
                                                        </div>
                                                        {/* End Hiring Button */}

                                                        {/* Start Invite Job */}
                                                        <div className="invite-to-job-button-search-list">
                                                          <div className="">
                                                            <Link
                                                              href="#"
                                                              onClick={this.inviteFreelancer.bind(this, freelancer)}>
                                                              Invite To Job
                                                            </Link>
                                                          </div>
                                                        </div>
                                                        {/* End Invite Job  */}

                                                        {/* Start Earning  */}
                                                        <div className="">
                                                          <div className="">
                                                            <h5><strong>${freelancer.amount_earned}k earned</strong></h5>
                                                          </div>
                                                        </div>
                                                        {/* End Earning  */}






                                                      </div>
                                                      {/* End Column 2 */}


                                                      <div className="clearfix"></div>


                                                      <div className="col-md-12 mb-10">
                                                      </div>

                                                      <div className="clearfix"></div>

                                                    </div>
                                                  </div>
                                                )
                                              })
                                            ) : !applicationIsLoading && (
                                              <NoDataFoundMessage
                                                message={"No matches found!"}
                                              />
                                              // <div className="noJobsFound">
                                              //   <img src={NODataFoundImg} alt="" />
                                              //   <p>No Active Jobs Found </p>
                                              // </div>c
                                            )}

                                            {!_.isEmpty(freelancersInvite) &&
                                              freelancersInvite.length > 0 &&
                                              FreelancersToInvite.length > 0 ? (
                                              <div className="">
                                                <div className="col-md-12">
                                                  <Pagination
                                                    activePage={this.state.activePage}
                                                    itemsCountPerPage={itemsCountPerPage}
                                                    totalItemsCount={FreelancersToInvite.length}
                                                    pageRangeDisplayed={5}
                                                    onChange={this.handlePageChange.bind(this)}
                                                    prevPageText="Previous"
                                                    nextPageText="Next"
                                                  />

                                                </div>
                                              </div>

                                            ) : null}

                                          </div>
                                        </div>
                                        <CEDetailPopup
                                          openModal={this.state.openModal}
                                          closeModals={this.closeModals}
                                          applicationIsLoading={this.props.applicationIsLoading}
                                          profileDetail={this.state.profileDetail}
                                          inviteFreelancer={this.inviteFreelancer}
                                          changeProfile={this.changeProfile}
                                          currentArrayKey={this.state.currentArrayKey}
                                          freelancer={this.state.Cedetail}
                                          allFreelancersData={this.props.FreelancersToInvite}
                                          jobUuid={job.uuid}
                                        />
                                      </div>
                                  
                                 
                                   
                                  </div>
                                </div>
                              )
                            }

                            {Invite && (
                              <div className="tab-pane active fade in in" id="tab_default_2">
                                <div className="invite_freelancer" id="invite-cloud-expert-inner-container">
                                  <ul className="nav tabcustom" role="tablist">
                                    <li
                                      role="presentation"
                                      className={this.state.searchedFL && "active"}
                                    >
                                      <Link
                                        href="#SEARCH"
                                        id="searchFL"
                                        aria-controls="SEARCH"
                                        onClick={this.showSubSection}
                                        data-toggle="tab"
                                      >
                                        Search
                                      </Link>
                                    </li>
                                    <li
                                      role="presentation"
                                      className={this.state.invitedFreelancers && "active"}
                                    >
                                      <Link
                                        href="#INVITED"
                                        aria-controls="profile"
                                        id="invited"
                                        onClick={this.showSubSection}
                                        data-toggle="tab"
                                      >
                                        Invited Cloud Experts
                                      </Link>
                                    </li>
                                    <li
                                      role="presentation"
                                      className={this.state.hiredFreelancers && "active"}
                                    >
                                      <Link
                                        href="#HIRES"
                                        aria-controls="messages"
                                        id="hired"
                                        onClick={this.showSubSection}
                                        data-toggle="tab"
                                      >
                                        Hires
                                      </Link>
                                    </li>
                                    <li
                                      role="presentation"
                                      className={this.state.savedFreelancers && "active"}
                                    >
                                      <Link
                                        href="#SAVED"
                                        onClick={this.showSubSection}
                                        id="saved"
                                        aria-controls="settings"
                                        data-toggle="tab"
                                      >
                                        Saved Cloud Expert
                                      </Link>
                                    </li>
                                  </ul>
                                  {this.state.searchedFL && (
                                    <div className="tab-content">
                                      <div role="tabpanel" className="tab-pane active tab-content-top-margin" id="SEARCH">
                                        <div className="tf_search_filter">
                                          <div className="col-md-12 p-0">
                                            <div className="input-group">
                                              <div className="input-group-addon1">
                                                <img src={searchIcon} alt="" />
                                              </div>
                                              <form>
                                                <div className="tf_search">
                                                  <input
                                                    type="text"
                                                    onChange={this.handleSearch}
                                                    className="form-control mn_input"
                                                    placeholder="Search Cloud Experts…"
                                                    value={this.state.searchItem}
                                                  />
                                                </div>
                                              </form>
                                            </div>
                                          </div>
                                        </div>
                                        <div className="clearfix"></div>
                                        <div className="">

                                          {applicationIsLoading && (
                                            <div className="grid-loader my-feed-loader col-md-12">
                                              <Loader type="Grid" color="#00BFFF" height={100} width={100} />
                                            </div>
                                          )
                                          }
                                          {!_.isEmpty(freelancersInvite) ? (
                                            freelancersInvite.map((freelancer, idx) => {
                                              return (


                                                <div className="tf_main_filter list-view-strip-box" key={idx}>
                                                  <div className="col-md-12" id={freelancer && freelancer.profile && freelancer.profile.uuid}>

                                                    {/* Start Column 2 */}
                                                    <div className="col-md-2 tf_full_width">
                                                      <div className="tf_image">
                                                        {
                                                          freelancer.profile &&
                                                            freelancer.profile.profile_picture ? (
                                                            <img
                                                              className=""
                                                              src={freelancer.profile.profile_picture}
                                                              alt=""
                                                            />
                                                          )
                                                            :
                                                            (
                                                              <img
                                                                className=""
                                                                src={faceImg}
                                                                alt=""
                                                              />
                                                            )
                                                        }
                                                      </div>
                                                    </div>
                                                    {/* End Column 2 */}

                                                    {/* Start Column 8 */}
                                                    <div className="col-md-8">
                                                      {/* Start Row */}
                                                      <div className="row">
                                                        <div className="col-md-10">
                                                          <div className="row">
                                                            {/* Start Cloud Expert Name */}
                                                            <div className="col-md-6 p-0">
                                                              <Link
                                                                onClick={this.handleOPenModal.bind(this, freelancer, idx)}
                                                              >

                                                                <h4>
                                                                  {freelancer.full_name}

                                                                  {/* { freelancer && freelancer.profile && freelancer.profile.is_certified && ( <img title="Certification Required" src={certification_required} alt="Certified" className="certification-required" /> )} */}
                                                                </h4>
                                                              </Link>
                                                            </div>
                                                            <div className="col-md-6">
                                                              <div className="">
                                                                <h5>
                                                                  <strong>
                                                                    {
                                                                      freelancer && freelancer.profile &&
                                                                      freelancer.profile.current_location_country &&
                                                                      <ReactCountryFlag
                                                                        countryCode={
                                                                          COUNTRIES.find(c => c.label ===
                                                                            freelancer.profile.current_location_country).value
                                                                          || 'US'
                                                                        }
                                                                        svg
                                                                        style={{
                                                                          width: '2em',
                                                                          height: '1.2em',
                                                                          float: 'left',
                                                                          marginLeft: '-2px',
                                                                          marginRight: '20px'
                                                                        }}
                                                                        title={'country'}
                                                                      />
                                                                    }
                                                                    {freelancer.profile &&
                                                                      freelancer.profile.current_location_country}
                                                                  </strong>
                                                                </h5>
                                                              </div>
                                                            </div>
                                                          </div>
                                                          {/* End Cloud Expert Name */}
                                                        </div>

                                                        <div className="col-md-2">
                                                          <div className="heart-fill add-to-favourite-container">
                                                            {!freelancer.favorited_freelancer ? (
                                                              <Link
                                                                onClick={this.addFavourite.bind(
                                                                  this,
                                                                  freelancer.id
                                                                )}
                                                                title="Favorited"
                                                              >
                                                                <i
                                                                  className="fa fa-heart-o"
                                                                  aria-hidden="true"
                                                                ></i>
                                                              </Link>
                                                            ) : (
                                                              <Link
                                                                onClick={this.removeFavourite.bind(
                                                                  this,
                                                                  freelancer.id
                                                                )}
                                                                title="Favorited"
                                                              >
                                                                <i
                                                                  className="fa fa-heart"
                                                                  aria-hidden="true"
                                                                ></i>
                                                              </Link>
                                                            )}
                                                          </div>
                                                        </div>

                                                      </div>
                                                      {/* End Row */}

                                                      <div className="clearfix"></div>

                                                      {/* Start Row */}
                                                      <div className="row">
                                                        {/* Start Column 6 */}
                                                        <div className="col-md-6">
                                                          <div className="">
                                                            <h5>
                                                              <strong>
                                                                {freelancer &&
                                                                  freelancer.profile &&
                                                                  freelancer.profile.current_job_title}
                                                              </strong>
                                                            </h5>
                                                          </div>
                                                        </div>
                                                        {/* End Column 6 */}

                                                        {/* Start Column 6 */}
                                                        {/* <div className="col-md-6">
                                                          <div className="">
                                                            <h5>
                                                              <strong>
                                                                {
                                                                  freelancer && freelancer.profile &&
                                                                  freelancer.profile.current_location_country &&
                                                                  <ReactCountryFlag
                                                                    countryCode={
                                                                      COUNTRIES.find(c => c.label ===
                                                                        freelancer.profile.current_location_country).value
                                                                      || 'US'
                                                                    }
                                                                    svg
                                                                    style={{
                                                                      width: '2em',
                                                                      height: '1.2em',
                                                                      float: 'left',
                                                                      marginLeft: '-2px',
                                                                      marginRight: '20px'
                                                                    }}
                                                                    title={'country'}
                                                                  />
                                                                }
                                                                {freelancer.profile &&
                                                                  freelancer.profile.current_location_country}
                                                              </strong>
                                                            </h5>
                                                          </div>


                                                        </div> */}
                                                        {/* End Column 6 */}


                                                      </div>
                                                      {/* End Row */}

                                                      {/* Start Description */}
                                                      <div className="row project-manager-after-login-cloud-expert-description">

                                                        <div className="col-md-12">
                                                          {freelancer.profile ? (
                                                            freelancer.profile.about_me && (
                                                              <ReadMoreAndLess
                                                                ref={this.ReadMore}
                                                                className="read-more-content"
                                                                charLimit={150}
                                                                readMoreText="Read more"
                                                                readLessText="Read less"
                                                              >
                                                                {freelancer.profile.about_me}
                                                              </ReadMoreAndLess>
                                                            )
                                                          ) : (
                                                            <p></p>
                                                          )}
                                                        </div>


                                                      </div>
                                                      {/*End Description  */}

                                                      {/* Start Skills */}
                                                      {
                                                        freelancer.profile.skill.length > 0 &&
                                                        <Skills
                                                          skill={freelancer.profile.skill}
                                                          to={`/user-profile/${freelancer.profile && freelancer.profile.user && freelancer.profile.user.uuid}/true`}
                                                          id={freelancer.uuid}
                                                          displayCount={5}
                                                        />
                                                      }
                                                      {/* End Skills */}

                                                    </div>
                                                    {/* End Column 8 */}

                                                    {/* Start Column 2 */}
                                                    <div className="col-md-2 text-center">

                                                      {/* Start Hourly Rate */}
                                                      <div className="">
                                                        {
                                                          freelancer.profile &&
                                                            freelancer.profile.hourly_rate ? (
                                                            <h5>
                                                              <strong>
                                                                $
                                                                {isNaN(freelancer.profile.hourly_rate)
                                                                  ? "00"
                                                                  : parseFloat(
                                                                    freelancer.profile.hourly_rate
                                                                  ).toFixed(2)}{" "}
                                                                / hr
                                                              </strong>
                                                            </h5>
                                                          ) : (
                                                            <h5><strong>$0.00 / hr</strong></h5>
                                                          )}
                                                      </div>
                                                      {/* End Hourly Rate */}

                                                      {/* Start Hiring Button */}
                                                      <div className="">
                                                        {
                                                          !isEmpty(job) &&
                                                            !isEmpty(job.user) &&
                                                            !isEmpty(job.user.payment_method) ? (

                                                            <div className="hire-cloud-expert-button-search-list">
                                                              <Link to={{
                                                                pathname: `/hire-a-freelancer/${freelancer.uuid}/${job.uuid}`,
                                                                state: { fromManager: true },
                                                              }}
                                                              >
                                                                Hire Cloud Expert
                                                              </Link>
                                                            </div>

                                                          )
                                                            :
                                                            (
                                                              <div className="hire-cloud-expert-button-search-list">
                                                                <Link
                                                                  to={{
                                                                    pathname: "/settings",
                                                                    state: "payMethodPresent",
                                                                  }}
                                                                >
                                                                  Hire Cloud Expert
                                                                </Link>
                                                              </div>
                                                            )
                                                        }
                                                        <Modal
                                                          isOpen={this.state.modalIsOpen}
                                                          onAfterOpen={this.afterOpenModal}
                                                          onRequestClose={this.closeModal}
                                                          style={customStylesNew}
                                                          contentLabel="Example Modal"
                                                        >
                                                          <div className="add-payment-method-popup">
                                                            <div className="modal-header">
                                                              <button
                                                                type="button"
                                                                className="close"
                                                                onClick={this.closeModal}
                                                                data-dismiss="modal"
                                                              >
                                                                <span aria-hidden="true">×</span>
                                                                <span className="sr-only">Close</span>
                                                              </button>

                                                              <h2
                                                                className="modal-title"
                                                                ref={(subtitle) =>
                                                                  (this.subtitle = subtitle)
                                                                }
                                                              >
                                                                Payment Method
                                                              </h2>
                                                            </div>

                                                            <div className="modal-body">
                                                              <div className="row">
                                                                <div className="col-md-12">
                                                                  <p>
                                                                    You have not added any payment method.
                                                                    Please add one by{" "}
                                                                    <a href="/settings">Clicking Here </a>
                                                                  </p>
                                                                </div>
                                                              </div>
                                                            </div>
                                                          </div>
                                                        </Modal>
                                                      </div>
                                                      {/* End Hiring Button */}

                                                      {/* Start Invite Job */}
                                                      <div className="invite-to-job-button-search-list">
                                                        <div className="">
                                                          <Link
                                                            href="#"
                                                            onClick={this.inviteFreelancer.bind(this, freelancer)}>
                                                            Invite To Job
                                                          </Link>
                                                        </div>
                                                      </div>
                                                      {/* End Invite Job  */}

                                                      {/* Start Earning  */}
                                                      <div className="">
                                                        <div className="">
                                                          <h5><strong>${freelancer.amount_earned}k earned</strong></h5>
                                                        </div>
                                                      </div>
                                                      {/* End Earning  */}






                                                    </div>
                                                    {/* End Column 2 */}


                                                    <div className="clearfix"></div>


                                                    <div className="col-md-12 mb-10">
                                                    </div>

                                                    <div className="clearfix"></div>

                                                  </div>
                                                </div>
                                              )
                                            })
                                          ) : !applicationIsLoading && (
                                            <NoDataFoundMessage
                                              message={"No Active Jobs Founds"}
                                            />
                                            // <div className="noJobsFound">
                                            //   <img src={NODataFoundImg} alt="" />
                                            //   <p>No Active Jobs Found </p>
                                            // </div>
                                          )}

                                          {!_.isEmpty(freelancersInvite) &&
                                            freelancersInvite.length > 0 &&
                                            FreelancersToInvite.length > 0 ? (
                                            <div className="">
                                              <div className="col-md-12">
                                                <Pagination
                                                  activePage={this.state.activePage}
                                                  itemsCountPerPage={itemsCountPerPage}
                                                  totalItemsCount={FreelancersToInvite.length}
                                                  pageRangeDisplayed={5}
                                                  onChange={this.handlePageChange.bind(this)}
                                                  prevPageText="Previous"
                                                  nextPageText="Next"
                                                />

                                              </div>
                                            </div>

                                          ) : null}

                                        </div>
                                      </div>
                                      <CEDetailPopup
                                        openModal={this.state.openModal}
                                        closeModals={this.closeModals}
                                        applicationIsLoading={this.props.applicationIsLoading}
                                        profileDetail={this.state.profileDetail}
                                        inviteFreelancer={this.inviteFreelancer}
                                        changeProfile={this.changeProfile}
                                        currentArrayKey={this.state.currentArrayKey}
                                        freelancer={this.state.Cedetail}
                                        allFreelancersData={this.props.FreelancersToInvite}
                                        jobUuid={job.uuid}
                                      />
                                    </div>
                                  )}
                                  {this.state.invitedFreelancers && (
                                    <div>
                                      <InvitedFreelancers
                                        history={this.props.history}
                                        jobUuid={job.uuid}
                                      />
                                    </div>
                                  )}
                                  {this.state.hiredFreelancers && (
                                    <div>
                                      <HiredFreelancers
                                        history={this.props.history}
                                        jobUuid={job.uuid}
                                        hireType="all"
                                      />
                                    </div>
                                  )}
                                  {this.state.savedFreelancers && (
                                    <div>
                                      <SavedFreelancers
                                        history={this.props.history}
                                        jobUuid={job.uuid}
                                      />
                                    </div>
                                  )}
                                </div>
                              </div>
                            )}
                            {Review && (
                              <div className="tab-pane active fade in in" id="tab_default_3">
                                {typeof job.uuid !== 'undefined' &&
                                  <ReviewFreelancers history={this.props.history} jobUuid={job.uuid} />
                                }
                              </div>
                            )}
                            {Hire && (
                              <HiredFreelancers
                                history={this.props.history}
                                jobUuid={job.uuid}
                                hireType="active"
                              />
                            )}
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


        <Modal
          isOpen={this.state.openInvite}
          style={customStyles}
          onRequestClose={this.handleInviteClose}
        >
          <div className="modal-dialog" role="document">
            <form onSubmit={this.handleSendInvite}>
              <div className="modal-content tf_float">
                <div className="modal-header">
                  <button
                    type="button"
                    className="close"
                    onClick={this.handleInviteClose}
                    data-dismiss="modal"
                  >
                    <span aria-hidden="true">×</span>
                    <span className="sr-only">Close</span>
                  </button>
                  <h4 className="modal-title" id="myModalLabel">
                    Invite to Job
                  </h4>
                </div>
                <div className="modal-body" align="center">
                  <div className="col-md-2 col-sm-2 col-xs-3 tf_full_width">
                    <div className="tf_image">
                      {freelancerToInvite.profile && freelancerToInvite.profile.profile_picture ? (
                        <img
                          src={freelancerToInvite.profile.profile_picture}
                          className="img-circle-invite mt-0"
                          alt=""
                        />
                      ) : (
                        <img src={faceImg} className="img-circle-invite mt-0" alt="" />
                      )}
                    </div>
                  </div>
                  <div className="col-md-10 col-sm-8 col-xs-9 tf_full_width">
                    <div className="tf_free_name">
                      <h4>{freelancerToInvite.full_name}</h4>
                    </div>
                    <div className="tf_f_content">
                      <h5>
                        <strong>
                          {isEmpty(freelancerToInvite)
                            ? ""
                            : freelancerToInvite.profile &&
                            freelancerToInvite.profile.current_job_title}
                        </strong>
                      </h5>
                    </div>
                  </div>
                  <div className="clearfix"></div>
                  <div className="col-md-12">
                    <div className="form-group text-left">
                      <div className="input-group">
                        <label>Message</label>
                        <textarea
                          id="status"
                          rows="5"
                          className="form-control"
                          onChange={this.onInviteTextChange}
                          placeholder="Input text"
                        >
                          {this.state.inviteText}
                        </textarea>
                        {this.state.inviteTextError && fieldError()}
                      </div>
                    </div>
                  </div>
                  <div className="clearfix"></div>
                </div>
                <div className="modal-footer tf_model_footer pull-left">
                  <div className="col-md-12">
                    <input
                      type="submit"
                      className="btn btn-fill btn-cyan btn-wd"
                      value="SEND INVITE"
                    />
                  </div>
                </div>
              </div>
            </form>
          </div>
        </Modal>
        {/* <Footer /> */}
      </div>
    )
  }
}
const mapStateToProps = (state) => ({
  ...state,
})

const mapDispatchToProps = (dispatch) => {
  return {
    fetchJob: (id) => dispatch(fetchJob(id)),
    setActiveJobTab: (tab) => dispatch(setActiveJobTab(tab)),
    inviteToJob: (data) => dispatch(inviteToJob(data)),
    addFavourite: (id) => dispatch(addFavourite(id)),
    removeFavourite: (id) => dispatch(removeFavourite(id)),
    getFreelancersToInvite: (id, search) => dispatch(getFreelancersToInvite(id, search)),
    getFreelancersToReview: (id) => dispatch(getFreelancersToReview(id)),
    getSearchedFLForHiringMan: (search) => dispatch(getSearchedFLForHiringMan(search)),
    getProfile: (id, jobId, isPublic) => dispatch(getProfileForFreelancer(id, jobId, isPublic)),
    getFreelancersToMatcheSkills : (id, skill) => dispatch(getFreelancersToMatcheSkills(id, skill)),

  }
}
export default connect(mapStateToProps, mapDispatchToProps)(JobDescription)
