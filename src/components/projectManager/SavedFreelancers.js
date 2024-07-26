import React, { Component } from "react";
import { connect } from "react-redux";
import Modal from "react-modal";
import { removeFavourite } from "../../Actions/AdminActions";
import { isEmpty } from "lodash";
import Pagination from "react-js-pagination";
import { Link } from "react-router-dom";
import ReadMoreAndLess from "react-read-more-less";
import { Multiselect } from 'multiselect-react-dropdown';
import { inviteToJob } from "../../Actions/programManagerJobsActions";
import inviteIcon from "../../static/images/invite.png";
import faceImg from "../../static/images/profile-placeholder.png";
import { getProfileForFreelancer } from "../../Actions/freelancerActions";
import { getSavedFreelancerForHiringmanager } from "../../Actions/ProjectManagerFreelancerActions";
import Loader from "react-loader-spinner";
import certification_required from "../../static/images/certification-required.png";
import COUNTRIES from '../../constants/countryListWithCodes'
import ReactCountryFlag from "react-country-flag"
import Skills from "../Common/Skills"
import NODataFoundImg from "./../../static/images/noDataFound.png"
import SuccessSweetAlert from "../CommonComponets/SweetAlert/SuccessSweetAlert";



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
    background: "transparent",
    width: "700px",
  },
}

class SavedFreelancers extends Component {
  constructor(props, context) {
    super(props, context)
    this.state = {
      freelancerToInvite: {},
      errors: {},
      activePage: 1,
      openHire: false,
      freelancerToHire: {},
      modalIsOpen: false,
      hireJobIdError: false,
      openStatus: false,
      hireJobId: "",
      SavedFreelancersForHM: [],
      isDeleted: false,
      msg: "",
      inviteJobId: '',
      openModal: false,
      profileDetail: '',
      currentArrayKey: 0
    }
  }
  componentDidMount() {
    this.props.getSavedFreelancers().then((res) => {
      if (res.length > 0) {
        this.setState({ SavedFreelancersForHM: res })
      }
    })
  }

  handleOPenModal = (row, i, e) => {
    e.preventDefault();
    this.setState({ openModal: true, currentArrayKey: i + 1 })
    this.props.getProfile(row.uuid, "", true).then(
      (res) => {
        this.setState({ profileDetail: res })
      }
    )
  }

  closeModals = () => {
    this.setState({ profileDetail: "", openModal: false })
  }

  changeProfile = (id, type) => {
    let key = ''
    console.log(this.state.currentArrayKey, '==', this.state.SavedFreelancersForHM.length)
    !isEmpty(this.state.SavedFreelancersForHM) && this.state.SavedFreelancersForHM.length > 0 && this.state.SavedFreelancersForHM.map((row, index) => {
      if (row.id === id) {
        if (type === 'next') {
          key = index + 1
        } else {
          key = index - 1
        }
        // console.log('key==',key)
        this.props.getProfile(this.state.SavedFreelancersForHM[key].profile.uuid, "", true).then(
          (res) => {
            this.setState({ profileDetail: res, currentArrayKey: key + 1 })
          }
        )
      }
      return row
    })
  }

  handleRateType = (e) => {
    this.setState({ rateType: e.target.value })
  }

  handlePageChange = (pageNumber) => {
    console.log(`active page is ${pageNumber}`)
    this.setState({ activePage: pageNumber })
    window.scrollTo(0, 0);
  }

  removeFavourite = (id, idx, e) => {
    e.preventDefault();
    let SavedFreelancersForHM = Object.assign(this.state.SavedFreelancersForHM); // Pull the entire SavedFreelancersForHM object out. Using object.assign is a good idea for objects.
    SavedFreelancersForHM.splice(idx, 1);
    this.setState({ SavedFreelancersForHM });
    this.props.removeFavourite(id).then((res) => {
      if (res.status === 200) {
        this.setState({ isDeleted: true, msg: "Unfavorited Successfully" })
      }
    })
  }

  onSelect = (selectedList, selectedItem) => {
    // console.log(selectedList, '-------' ,selectedItem)
    let { errors } = this.state;
    if (!isEmpty(selectedItem)) {
      errors["inviteJobId"] = "";
    }

    this.setState({
      errors: errors,
      inviteJobId: selectedItem.id,
      hireJobId: selectedItem.id
    });
  }

  inviteFreelancer = (freelancer, e) => {
    e.preventDefault();
    console.log(freelancer)
    this.setState({ openInvite: true, freelancerToInvite: freelancer, inviteText: "" })
  }

  onInviteTextChange = (e) => {
    this.setState({ inviteText: e.target.value, errors: [] })
  }

  hideInvitationSuccess = () => {
    this.setState({ isInvitationSent: false, Invite: true })
  }

  handleInviteClose = () => {
    this.setState({ openInvite: false, freelancerToInvite: {}, inviteText: "" })
  }

  validateInputInputs = () => {
    let { inviteJobId } = this.state;
    let errors = {}

    if (inviteJobId === '') {
      errors["inviteJobId"] = "Please select job.";
    }
    if (!this.state.inviteText) {
      errors["inviteText"] = "This field can't be blank.";
    }
    if (!isEmpty(errors)) {
      this.setState({ errors: errors })
    }

    return {
      isValid: isEmpty(errors),
    }
  }

  handleSendInvite = (e) => {
    e.preventDefault()
    let { isValid } = this.validateInputInputs()
    console.log(this)
    if (isValid) {
      let data = {
        job_id: this.state.inviteJobId,
        recipient_id: this.state.freelancerToInvite.id,
        message: this.state.inviteText,
      }
      this.props
        .inviteToJob(data)
        .then((res) => {
          if (res.status === 200) {
            this.setState({
              openInvite: false,
              inviteText: "",
              inviteJobId: "",
              isInvitationSent: true,
            })
          }
        })
        .catch((err) => {
          console.log(err)
        })
    }
  }

  selectJobCategory = (e) => {
    this.setState({ hireJobCategory: e.target.value })
  }

  hireFreelancer = (freelancer, id, e) => {
    e.preventDefault();
    // console.log(freelancer)
    this.setState({
      openHire: true,
      freelancerToHire: freelancer,
      hireText: "",
      freelancerIdToHire: id,
    })
  }

  handleHireClose = () => {
    this.setState({ openHire: false, hireText: "", hireJobId: "" })
  }


  goToHiringPage = (e) => {
    if (this.state.hireJobId) {
      this.props.history.push({
        pathname: `/hire-a-freelancer/${this.state.freelancerIdToHire}/${this.state.hireJobId}`,
        state: { rateType: this.state.rateType },
      })
      this.setState({ openHire: false })
    } else {
      this.setState({ hireJobIdError: true })
    }
  }

  openModal = () => {
    this.setState({ modalIsOpen: true })
  }

  afterOpenModal = () => {
    this.subtitle.style.color = "#000";
  }

  closeModal = () => {
    this.setState({ modalIsOpen: false })
  }

  hideAlert = () => {
    this.setState({ isDeleted: false, msg: "" })
  }

  fieldError = (message) => {
    return (
      <p id="firstName" className="error-field">
        {message ? message : "This field can't be blank."}
      </p>
    )
  }


  render() {
    const { applicationIsLoading } = this.props;
    const {
      activePage,
      freelancerToInvite,
      rateType,
      freelancerToHire,
      hireJobIdError,
      errors,
      SavedFreelancersForHM
    } = this.state;
    let freelancers = JSON.parse(JSON.stringify(SavedFreelancersForHM)).splice(
      activePage === 1 ? 0 : (activePage - 1) * itemsCountPerPage,
      itemsCountPerPage
    )
    console.log(applicationIsLoading)
    if (this.state.isInvitationSent) {
      setTimeout(
        function () {
          this.setState({ isInvitationSent: false })
          this.props.getSavedFreelancers()
        }.bind(this),
        3000
      )
    }


    return (
      <div role="tabpanel" id="SAVED" className="tab-content-top-margin">
        {applicationIsLoading && (
          <div className="grid-loader my-feed-loader col-md-12">
            <Loader type="Grid" color="#00BFFF" height={100} width={100} />
          </div>
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
        {this.state.isInvitationSent && (
          // <div className="app-pro2-swal">
          //   <SweetAlert title="" onConfirm={this.hideInvitationSuccess} showConfirm={true}>
          //     <img src={inviteIcon} alt="invite-icon" />
          //     <h4>
          //       <strong>
          //         Invite sent. <br />
          //         We will get back to you shortly.
          //       </strong>
          //     </h4>
          //   </SweetAlert>
          // </div>
          <SuccessSweetAlert
            handleConfirm={this.hideInvitationSuccess}
            show={true}
            message={`Invite sent.
                    We will get back to you shortly.`}
          />
        )}
        <div className="clearfix"></div>
        {!applicationIsLoading && !isEmpty(freelancers) ? (
          freelancers.map((freelancer, idx) => {
            return (
              <div className="tf_main_filter list-view-strip-box" key={freelancer.profile.uuid}>
                {" "}
                <div className="col-md-12" id={freelancer.profile.uuid}>

                  <div className="col-md-2 tf_full_width">
                    {/* Start Profile Image */}
                    {!freelancer.user_picture ? (
                      <div className="tf_image">
                        <img src={faceImg} alt="" />
                      </div>
                    ) : (
                      <div className="tf_image">
                        <img src={freelancer.user_picture} alt="" />
                      </div>
                    )}
                    {/* End Profile Image */}
                  </div>

                  <div className="col-md-8">
                    {/* Start Row */}
                    <div className="row">
                      {/* Start Column 11 */}
                      <div className="col-md-10">
                        <div className="col-md-6 p-0">
                          {/* Start Freelancer Name */}
                          <Link
                            to={{
                              pathname: `/user-profile/${freelancer.profile && freelancer.profile.uuid}`,
                              state: {
                                FindFreelancers: true,
                                fromManager: true,
                                tab: 'saved'
                              }
                            }}

                          >
                            <h4>
                              {freelancer.full_name}{" "}
                              {freelancer.profile.is_certified && (
                                <img title="Certification Required" src={certification_required} alt="Certified" className="certification-required" />
                              )}
                            </h4>
                          </Link>
                          {/* End Freelancer Name */}
                        </div>
                        <div className="col-md-6">
                          <div className="">
                            <h5>
                              <ReactCountryFlag
                                countryCode={
                                  COUNTRIES.find(c => c.label === freelancer.profile.current_location_country).value
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
                              {freelancer.profile && freelancer.profile.current_location_country}
                            </h5>
                          </div>
                        </div>


                      </div>
                      {/* End Column 11 */}
                      <div className="2">
                        <div className="add-to-favourite-container">
                          <Link onClick={this.removeFavourite.bind(this, freelancer.id, idx)} title="Favorited">
                            <i className="fa fa-heart" aria-hidden="true"></i>
                          </Link>
                        </div>

                      </div>
                    </div>
                    {/* End Row */}

                    {/* Start Row */}
                    <div className="row">
                      <div className="col-md-6">
                        <h5>
                          <strong>
                            {freelancer.profile && freelancer.profile.current_job_title}
                          </strong>
                        </h5>
                      </div>
                      <div className="col-md-6">
                        {/* <div className="">
                          <h5>
                            <ReactCountryFlag
                              countryCode={
                                COUNTRIES.find(c => c.label === freelancer.profile.current_location_country).value
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
                            {freelancer.profile && freelancer.profile.current_location_country}
                          </h5>
                        </div> */}


                      </div>

                    </div>
                    {/* End Row */}


                    {/* Start Row */}
                    <div className="row project-manager-after-login-cloud-expert-description">
                      <div className="col-md-12">
                        {/* Start Description  */}
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
                        {/* End Description */}
                      </div>
                    </div>
                    {/* End Row */}


                    {/* Start Skills */}
                    <div className="row">
                      <div className="">
                        {freelancer.profile.skill.length > 0 &&
                          <Skills
                            skill={freelancer.profile.skill}
                            to={`/user-profile/${freelancer.profile && freelancer.profile.user && freelancer.profile.user.uuid}/true`}
                            displayCount={5}
                            id={freelancer.uuid}
                          />
                        }
                      </div>
                    </div>
                    {/* End Skills */}

                  </div>


                  <div className="col-md-2 text-center">

                    {/* Start Cloud Expert Rate */}
                    <div className="">
                      {freelancer.profile && freelancer.profile.hourly_rate ? (
                        <h5>
                          $
                          {isNaN(freelancer.profile.hourly_rate)
                            ? "00"
                            : parseFloat(freelancer.profile.hourly_rate).toFixed(2)}{" "}
                          / hr
                        </h5>
                      ) : (
                        <h5>$0.00 / hr</h5>
                      )}
                    </div>
                    {/* End Cloud Expert Rate */}

                    {/* Start Hire Cloud Expert */}
                    <div className="">
                      {(!isEmpty(freelancer) && !isEmpty(freelancer.payment_method)) ? (
                        <div className="hire-cloud-expert-button-search-list">
                          <Link
                            href="hire_freelancer.html"
                            onClick={this.hireFreelancer.bind(this, freelancer, freelancer.uuid)}
                          >
                            Hire Cloud Expert
                          </Link>
                        </div>
                      ) : (
                        <div className="hire-cloud-expert-button-search-list">
                          <Link to={{ pathname: "/settings", state: "payMethodPresent" }}>
                            Hire Cloud Expert
                          </Link>
                        </div>
                      )}

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
                              ref={(subtitle) => (this.subtitle = subtitle)}
                            >
                              Payment Method
                            </h2>
                          </div>
                          <div className="modal-body">
                            <div className="row">
                              <div className="col-md-12">
                                <p>
                                  You have not added any payment method. Please add one by{" "}
                                  <a href="/settings">Clicking Here </a>
                                </p>
                              </div>
                            </div>
                          </div>
                        </div>
                      </Modal>
                    </div>
                    {/* End Hire Cloud Expert */}

                    {/* Start Invite To Job */}
                    <div className="invite-to-job-button-search-list">
                      <Link onClick={this.inviteFreelancer.bind(this, freelancer)}>
                        Invite To Job
                      </Link>
                    </div>
                    {/* End Invite To Job */}

                    {/* Start Total Earn */}
                    <div className="">
                      <h5>${freelancer.amount_earned}k earned</h5>
                    </div>
                    {/* End Total Earn */}

                  </div>

                  <div className="clearfix"></div>

                  <div className="col-md-12 mb-10">
                  </div>

                  <div className="clearfix"></div>

                </div>
              </div>
            )
          })
        ) : (
          <div className="noJobsFound">
            <img src={NODataFoundImg} alt="" />
            <p>No Cloud Experts Found. </p>
          </div>
        )}

        {!isEmpty(freelancers) && freelancers.length > 0 ? (
          <div className="">
            <div className="col-md-12">
              <Pagination
                activePage={activePage}
                itemsCountPerPage={itemsCountPerPage}
                totalItemsCount={SavedFreelancersForHM.length}
                pageRangeDisplayed={5}
                onChange={this.handlePageChange.bind(this)}
                prevPageText="Previous"
                nextPageText="Next"
              />
            </div>
          </div>
        ) : null}

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
              <h2 className="modal-title" ref={(subtitle) => (this.subtitle = subtitle)}>
                Payment Method
              </h2>
            </div>
            <div className="modal-body">
              <div className="row">
                <div className="col-md-12">
                  <p>
                    You have not added any payment method. Please add one by{" "}
                    <a href="/settings">Clicking Here </a>
                  </p>
                </div>
              </div>
            </div>
          </div>
        </Modal>
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
                      {
                        freelancerToInvite.profile && freelancerToInvite.profile.profile_picture ? (
                          <img
                            src={freelancerToInvite.profile.profile_picture}
                            className="img-circle-invite mt-0"
                            alt=""
                          />
                        ) : (
                          <img src={faceImg} className="img-circle-invite mt-0" alt="" />
                        )
                      }
                    </div>
                  </div>
                  <div className="col-md-10 col-sm-8 col-xs-9 tf_full_width">
                    <div className="tf_free_name">
                      <h4>{freelancerToInvite.name}</h4>
                    </div>
                    <div className="tf_f_content">
                      <h5>
                        <strong>
                          {isEmpty(freelancerToInvite)
                            ? ""
                            : freelancerToInvite.profile.current_job_title}
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
                        <p className="form-error">{errors["inviteText"]}</p>
                      </div>
                    </div>
                  </div>
                  <div className="col-md-12">
                    <div className="form-group">
                      <div className="input-group">
                        <label>Choose a job</label>
                        <div className="selectedwrap">
                          {
                            !isEmpty(freelancerToInvite) && !isEmpty(freelancerToInvite.profile.available_jobs) &&
                            <Multiselect
                              options={freelancerToInvite.profile.available_jobs}
                              singleSelect
                              displayValue="title"
                              onSelect={this.onSelect}
                              selectedValues={this.state.selectedValue}
                              className="form-control mn_input"
                              placeholder="Select Job."
                            />
                          }
                          <p className="form-error">{errors["inviteJobId"]}</p>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="clearfix" />
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
        <Modal
          isOpen={this.state.openHire}
          style={customStyles}
          onRequestClose={this.handleHireClose}
        >
          <div className="modal-dialog tf_z_index find-freelancer-popup" role="document">
            <div className="modal-content tf_float">
              <div className="modal-header">
                <button
                  type="button"
                  className="close"
                  onClick={this.handleHireClose}
                  data-dismiss="modal"
                >
                  <span aria-hidden="true">×</span>
                  <span className="sr-only">Close</span>
                </button>
                <h4 className="modal-title" id="myModalLabel">
                  Hire {freelancerToHire.full_name}
                </h4>
              </div>
              <div className="modal-body" align="center">
                <div className="col-md-12">
                  <div className="form-group">
                    <div className="input-group">
                      <label>Link this offer to an open job post</label>
                      <div className="selectedwrap">
                        {
                          !isEmpty(freelancerToHire) && !isEmpty(freelancerToHire.profile.available_jobs_for_contract) &&
                          <Multiselect
                            options={freelancerToHire.profile.available_jobs_for_contract}
                            singleSelect
                            displayValue="title"
                            onSelect={this.onSelect}
                            selectedValues={this.state.selectedValue}
                            className="form-control mn_input"
                            placeholder="Select Job."
                          />
                        }
                        {hireJobIdError && this.fieldError("Please select a job.")}
                      </div>
                    </div>
                  </div>
                </div>
                <div className="clearfix"></div>

                <div className="clearfix"></div>
                <div className="col-md-12 col-sm-12 col-xs-12">
                  <div className="form-group">
                    <label className="labeltext">Job Type</label>
                    <br />
                    <div className="form-check-inline" onChange={this.handleRateType}>
                      <label className="customradio">
                        <span className="radiotextsty">Hourly</span>
                        <input
                          type="radio"
                          checked={rateType === "hourly"}
                          name="radio"
                          value="hourly"
                        />
                        <span className="checkmark"></span>
                      </label>{" "}

                      <label className="customradio">
                        <span className="radiotextsty">Fixed - Price</span>
                        <input
                          type="radio"
                          value="fixed price"
                          checked={rateType === "fixed price"}
                          name="radio"
                        />
                        <span className="checkmark"></span>
                      </label>
                    </div>
                  </div>
                </div>
              </div>
              <div className="clearfix"></div>
              <div className="modal-footer tf_model_footer1">
                <div className="col-md-12 nopad">
                  <div className="col-md-3 col-sm-4 col-xs-6">
                    <button
                      onClick={this.goToHiringPage}
                      type="button"
                      className="btn btn-fill btn-cyan btn-wd"
                    >
                      Continue
                    </button>
                  </div>
                  <div className="col-md-3 col-sm-4 col-xs-6">
                    <button
                      onClick={this.handleHireClose}
                      type="button"
                      className="btn btn-fill btn-elegant btn-wd"
                      data-dismiss="modal"
                    >
                      Cancel
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </Modal>
      </div>
    )
  }
}
const mapStateToProps = (state) => ({
  ...state,
})

const mapDispatchToProps = (dispatch) => {
  return {
    inviteToJob: (data) => dispatch(inviteToJob(data)),
    removeFavourite: (id) => dispatch(removeFavourite(id)),
    getSavedFreelancers: () => dispatch(getSavedFreelancerForHiringmanager()),
    getProfile: (id, jobId, isPublic) => dispatch(getProfileForFreelancer(id, jobId, isPublic)),
  }
}
export default connect(mapStateToProps, mapDispatchToProps)(SavedFreelancers)
