import React, { Component } from "react";
import FreelancerHeader from "../miscellaneous/FreelancerHeader";
// import Footer from "../miscellaneous/Footer";
import { Link } from "react-router-dom";
import Loader from "react-loader-spinner";
import { connect } from "react-redux";
import editImg from "../../static/images/outline-edit-24px.svg";
import { createProfileAction } from "../../Actions/profileCreationActions";
import {
  getSettingUserDetails,
  getCurrentUserDetails,
  getSettingUserDetailsForFreelancer,
} from "../../Actions/applicationActions";
import paypalImg from "../../static/images/pay_6.png";
import payoneerImg from "../../static/images/pay_1.png";
import skrillImg from "../../static/images/pay_2.png";
import directBankImg from "../../static/images/pay_3.png";
import userLogo from "../../static/images/user.svg";
import emailLogo from "../../static/images/email.svg";
import { getProfileForFreelancer } from "../../Actions/freelancerActions";
import {
  updateUser,
  updatePMPassword,
  removePayMethod,
} from "../../Actions/ProjectManagerFreelancerActions";
import passIcon from "../../static/images/password.svg";
import EditCategory from "../ProfileEditModels/EditCategory";
import EditSkills from "../ProfileEditModels/EditSkills";
import { isEmpty } from "lodash";
import Modal from "react-modal";
import AddPaymentModal from "../Payment/AddPaymentModal";
import UpdateSecQus from "../authentication/UpdateSecQus";
import NotificationSetting from "./NotificationSetting";
import Avatar from "react-avatar";
import faceImg from "../../static/images/profile-placeholder.png";
import FreelancerDashboardSideBar from "../Freelancer/FreelancerDashboardSideBar";
import BreadCrumb from "./BreadCrumb";
import SuccessSweetAlert from "../CommonComponets/SweetAlert/SuccessSweetAlert";
import ErrorSweetAlert from "../CommonComponets/SweetAlert/ErrorSweetAlert";

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
    width: "60%",
  },
}

class FreelancerSettingPage extends Component {
  constructor(props, context) {
    super(props, context)
    this.state = {
      info: false,
      billing: false,
      taxInfo: false,
      myProfile: false,
      profilesetting: true,
      getPaid: false,
      password: false,
      myTerms: false,
      notification: false,
      membership: false,
      emailError: false,
      emailPolicy: true,
      currentPassword: "",
      firstName: "",
      lastName: "",
      email: "",
      newPassword: "",
      confirmPassword: "",
      currentPasswordError: false,
      confirmPasswordError: false,
      newPasswordError: false,
      passwordPolicy: true,
      isPassMatch: true,
      categoryPopup: false,
      isEditCategory: false,

      skillPopup: false,
      isEditSkill: false,

      isUsernameTaken: false,
      usernameErrorMessage: "",
      experienceLevel: "",
      searchEnginePrivacy: "",
      earningPrivacy: "",
      profileUpdate: false,
      experienceUpdate: false,
      fullName: "",
      isAddMethodModal: false,
      isDeleted: false,
      isAuthorized: false,
      isAccountRemove: false,
      removeModal: false,
      isSecQuePopup: false,
      profileId: "",
      userImg: "",
      activeTab: 'profilesetting'
    }
  }

  componentDidMount() {
    this.props.getSettingUserDetailsForFreelancer(
      this.props.currentUser.uuid || this.props.currentUser.user_id
    )

    console.log("---this.props.currentUser---", this.state.activeTab);
    if (this.props.ProfileactiveTab === "freelancerprofile") {
      this.setState({ profilesetting: true, info: false, getPaid: false })
    } else if (this.props.location.state) {
      this.setState({ info: false, getPaid: true })
    }
    else if (this.props.location.state === "getPaidPay") {
      this.setState({ info: false, getPaid: true })
    }

    // console.log(this.props.history.location)
    if (this.props.history.location) {
      var newPath = 'profilesetting'
      if (this.props.history.location.search === '') {
        newPath = 'profilesetting'
      } else {
        newPath = this.props.history.location.search.slice(
          1,
          this.props.history.location.search.length)
      }
      // console.log('====>>>>>>',newPath)
      this.setState({ activeTab: newPath })
      this.props.getCurrentUserDetails().then((details) => {
        if (newPath === 'profilesetting') {
          this.props.getProfile(details.user_profile.freelancer_uuid)
        }
      });
    }
  }

  getUserProfile = () => {
    const profile_id = this.props.currentUser.user_id || this.props.currentUser.id;
    // const profile_uuid = this.props.currentUser.profile_uuid;
    const profile_uuid = this.props.currentUserDetails.user_profile.freelancer_uuid;
    this.props.getProfile(profile_uuid || profile_id)
  }

  componentDidUpdate(prevState, prevProps) {
    if (prevState.history.location.search !== '') {
      // console.log('did',prevState.history.location)
      let newPath = prevState.history.location.search.slice(
        1,
        prevState.history.location.search.length)
      if (this.state.activeTab !== newPath) {
        this.setState({ activeTab: newPath })
        this.props.getCurrentUserDetails().then((details) => {
          if (newPath === 'profilesetting') {
            this.props.getProfile(details.user_profile.freelancer_uuid)
          }
        });
      }
    }
  }

  componentWillReceiveProps(nextProps) {
    this.setState({
      firstName: nextProps.settingUserDetails.first_name,
      lastName: nextProps.settingUserDetails.last_name,
      email: nextProps.settingUserDetails.email,
      username: nextProps.settingUserDetails.user_name,
      userImg:
        nextProps.currentUserDetails &&
        nextProps.currentUserDetails.user_profile &&
        nextProps.currentUserDetails.user_profile.freelancer_image,
      profileId:
        nextProps.currentUserDetails &&
        nextProps.currentUserDetails.user_profile &&
        nextProps.currentUserDetails.user_profile.profile_id,
      UserUuid: nextProps.currentUser.user_id || nextProps.currentUser.id || nextProps.currentUser.profile_uuid,
      companyDetails: nextProps.settingUserDetails.company,
      companyName:
        nextProps.settingUserDetails.company && nextProps.settingUserDetails.company.name,
      companyLogo:
        nextProps.settingUserDetails.company && nextProps.settingUserDetails.company.image_url,
      ownerName: nextProps.settingUserDetails.company && nextProps.settingUserDetails.company.owner,
      fullName:
        nextProps.settingUserDetails.first_name + " " + nextProps.settingUserDetails.last_name,
      phone: nextProps.settingUserDetails.company && nextProps.settingUserDetails.company.phone,
      vatId: nextProps.settingUserDetails.company && nextProps.settingUserDetails.company.vat_id,
      companyAddress:
        nextProps.settingUserDetails.company && nextProps.settingUserDetails.company.address,
      timeZone:
        nextProps.settingUserDetails.company && nextProps.settingUserDetails.company.time_zone,
    })
  }

  showASection = (event) => {
    if (event.target.id === "profilesetting") {
      this.getUserProfile()
    }
    this.setState({
      // info: event.target.id === "info" ? true : false,
      billing: event.target.id === "billing" ? true : false,
      taxInfo: event.target.id === "taxInfo" ? true : false,
      myProfile: event.target.id === "myProfile" ? true : false,
      profilesetting: event.target.id === "profilesetting" ? true : false,
      getPaid: event.target.id === "getPaid" ? true : false,
      myTerms: event.target.id === "myTerms" ? true : false,
      password: event.target.id === "password" ? true : false,
      notification: event.target.id === "notification" ? true : false,
      membership: event.target.id === "membership" ? true : false,
    })
  }

  handleEdit = (e) => {
    this.setState({ [e.target.name]: !this.state[e.target.name] })
  }

  handleCancel = (e) => {
    this.setState({ [e.target.name]: false, userImg: "" })
    if (e.target.name === "passwordEdit") {
      this.setState({ currentPassword: "", newPassword: "", confirmPassword: "" })
    } else {
      this.props
        .getSettingUserDetailsForFreelancer(
          this.props.currentUser.uuid || this.props.currentUser.user_id 
        )
        .then((details) => {
          this.setState({
            username: details.user_name,
            firstName: details.first_name,
            lastName: details.last_name,
            email: details.email,
            userImg: details.image_url,
            companyName: details.company && details.company.name,
            companyLogo: details.company && details.company.image_url,
            ownerName: details.company && details.company.owner,
            phone: details.company && details.company.phone,
            vatId: details.company && details.company.vat_id,
            companyAddress: details.company && details.company.address,
            timeZone: details.company && details.company.time_zone,
          })
        })
    }
  }



  handleChange = (e) => {
    this.setState({ [e.target.name]: e.target.value })
    if (e.target.value !== "") {
      this.setState({
        [e.target.name + "Error"]: false,
        emailPolicy: true,
        passwordPolicy: true,
        isUsernameTaken: false,
      })
    }
    if (e.target.name === "confirmPassword" && e.target.value === this.state.newPassword) {
      this.setState({ isPassMatch: true })
    }
  }

  hideAlert = () => {
    this.setState({ isUpdated: false, accountEdit: false })
  }

  updateUserDetails = (data) => {

    const { uuid } = this.props.currentUserDetails;
    const { profile_id } = this.props.currentUser;
    const userID = uuid || profile_id

    this.props.updateUser(userID, data).then((res) => {
      if (res.status === 200) {
        window.location.reload()
      } else if (res.response && res.response.status === 422) {
        this.setState({
          isUsernameTaken: true,
          usernameErrorMessage: res.response.data.message[0],
        })
      } else {
        alert("Internal server error, please try again later.")
      }
    })
  }

  updateAccountInfo = () => {
    const { firstName, lastName, email, username, userImgBlob, profileId } = this.state;
    const data = {
      user: {
        first_name: firstName,
        last_name: lastName,
        email: email,
        user_name: username,
        profile_attributes: {
          id: profileId,
          profile_picture: userImgBlob,
        },
      },
    }
    if (
      firstName !== "" &&
      lastName !== "" &&
      email !== "" &&
      !this.state.emailError &&
      email.includes("@") &&
      username !== ""
    ) {
      this.updateUserDetails(data)
    } else {
      this.setState({
        firstNameError: firstName === "",
        lastNameError: lastName === "",
        emailError: email === "",
        emailPolicy: email.includes("@"),
        usernameError: true,
      })
    }
  }

  updatePassword = () => {
    const { currentPassword, newPassword, confirmPassword } = this.state;
    const data = {
      user: {
        current_password: currentPassword,
        password: newPassword,
        password_confirmation: confirmPassword,
      },
    }
    var strongRegex = new RegExp("^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#%])(?=.{8,})")
    if (
      strongRegex.test(newPassword) &&
      currentPassword !== "" &&
      confirmPassword !== "" &&
      newPassword !== "" &&
      newPassword === confirmPassword
    ) {
      this.props.updatePMPassword(this.state.UserUuid, data).then((res) => {
        if (res.status === 200) {
          this.setState({ isUpdated: true, passwordEdit: false })
        } else {
          console.log('11')
        }
      })
      // alert("no error")
    } else {
      this.setState({
        currentPasswordError: currentPassword === "",
        newPasswordError: newPassword === "",
        confirmPasswordError: confirmPassword === "",
        passwordPolicy: strongRegex.test(newPassword),
        isPassMatch: newPassword === confirmPassword,
      })
    }
  }
  fieldError(margin, message) {
    return (
      <p id="firstName" className="error-field">
        {message ? message : "This field can't be blank."}
      </p>
    )
  }

  handleCategoryPopup = () => {
    this.setState({ categoryPopup: !this.state.categoryPopup })
  }

  handleEditCategory = () => {
    this.setState({ isEditCategory: true, categoryPopup: true })
  }

  handleSkillPopup = () => {
    this.setState({ skillPopup: !this.state.skillPopup })
  }

  handleEditSkill = () => {
    this.setState({ isEditSkill: true, skillPopup: true })
  }

  updateProfile = (data, updateType) => {
    const { profile_uuid, profile_id } = this.props.currentUser;
    const userID = profile_uuid || profile_id
    // const update = this.state[updateType]
    if (updateType === "profileUpdate") {
      this.setState({ profileUpdate: true })
    } else if (updateType === "experienceUpdate") {
      this.setState({ experienceUpdate: true })
    } else if (updateType === "categoryUpdate") {
      this.setState({ categoryUpdate: true })
    } else if (updateType === "skillUpdate") {
      this.setState({ skillUpdate: true })
    }

    this.props.submitProfileData(userID, data).then((res) => {
      if (res.status === 200) {
        this.props.getProfile(userID).then((res) => {
          if (res.id) {
            if (updateType === "profileUpdate") {
              this.setState({ profileUpdate: false })
            } else if (updateType === "experienceUpdate") {
              this.setState({ experienceUpdate: false })
            } else if (updateType === "categoryUpdate") {
              this.setState({ categoryUpdate: false })
            } else if (updateType === "skillUpdate") {
              this.setState({ skillUpdate: false })
            }
          }
        })
      } else {
        if (updateType === "profileUpdate") {
          this.setState({ profileUpdate: false })
        } else if (updateType === "experienceUpdate") {
          this.setState({ experienceUpdate: false })
          // alert("Internal server error")
        } else if (updateType === "categoryUpdate") {
          this.setState({ categoryUpdate: false })
        } else if (updateType === "skillUpdate") {
          this.setState({ skillUpdate: false })
        }
      }
    })
    if (data.profile.category) {
      this.handleCategoryPopup()
    }
    if (data.profile.skill) {
      this.handleSkillPopup()
    }
  }

  updateVisibility = (e) => {
    const data = {
      profile: {
        visibility: e.target.value,
      },
    }
    this.updateProfile(data, "profileUpdate")
  }

  updateEarningPrivacy = (e) => {
    const data = {
      profile: {
        earnings_privacy: e.target.checked ? "Public" : "Private",
      },
    }
    this.setState({ earningPrivacy: e.target.checked ? "Public" : "Private" })
    this.updateProfile(data, "profileUpdate")
  }

  updatePreference = (e) => {
    const data = {
      profile: {
        project_preference: e.target.value,
      },
    }
    this.updateProfile(data, "profileUpdate")
  }

  updateExperienceLevel = (e) => {
    const data = {
      profile: {
        experience_level: e.target.value,
      },
    }
    this.setState({ experienceLevel: e.target.value })
    this.updateProfile(data, "experienceUpdate")
  }

  updateSearchEnginePrivacy = (e) => {
    const data = {
      profile: {
        search_engine_privacy: e.target.value,
      },
    }
    this.setState({ searchEnginePrivacy: e.target.value })
    this.updateProfile(data, "profileUpdate")
  }

  openPaymentModals = (e) => {
    this.setState({ [e.target.name]: true })
  }

  closePaymentModals = (name) => {
    this.setState({ [name]: false })
  }

  handlePaymentRemove = (id) => {
    this.setState({ removeModal: true, methodId: id })
  }

  removeAccount = () => {
    this.setState({ removeModal: false })
    this.props.removePayMethod(this.state.methodId).then((res) => {
      if (res.status === 200) {
        this.props.getSettingUserDetails(
          this.props.currentUser.user_id || this.props.currentUser.id
        )
        this.setState({ isAccountRemove: true })
      }
    })
  }

  closeModal = () => {
    this.setState({ removeModal: false })
  }

  hideNewAlert = () => {
    this.setState({ isAuthorized: false })
  }

  hideRemoveAlert = () => {
    this.setState({ isAccountRemove: false })
  }

  handleImage = (e) => {
    const target = e.target.name;
    let file = e.target.files[0];
    let fileName = file.name;
    if (file.type.includes("png") || file.type.includes("jpeg") || file.type.includes("jpg")) {
      let reader = new FileReader()
      reader.readAsDataURL(file)
      reader.onload = (event) => {
        this.setState({
          userImg: "",
          [target]: event.target.result,
          [target + "Error"]: false,
          [target + "Name"]: fileName,
          [target + "TypeError"]: false,
        })
      }
    } else {
      this.setState({ [target + "TypeError"]: true })
    }

    console.log("22222222222 this.state", e.target.name, this.state)
  }

  addImg = (e) => {
    let inputEl = document.getElementById("companyLogo")
    inputEl.click()
  }

  addUserImg = (e) => {
    let inputUser = document.getElementById("user_Logo")
    inputUser.click()
  }

  isSecQueUpdate = () => {
    this.setState({ isSecQuePopup: !this.state.isSecQuePopup })
  }
  render() {
    const {
      // info,
      // billing,
      // taxInfo,
      // myProfile,
      // profilesetting,
      // getPaid,
      // myTerms,
      // password,
      // notification,
      // membership,
      currentPassword,
      confirmPassword,
      newPassword,
      passwordEdit,
      fullName,
      isUpdated,
      accountEdit,
      firstName,
      lastName,
      email,
      username,
      isUsernameTaken,
      usernameErrorMessage,
      searchEnginePrivacy,
      earningPrivacy,
      experienceLevel,
      profileUpdate,
      experienceUpdate,
      categoryUpdate,
      skillUpdate,
      isAuthorized,
      isAccountRemove,
      removeModal,
      userImgBlob,
      userImg,
      userImgTypeError,
      activeTab
    } = this.state;
    const {
      freelancerProfile,
      settingUserDetails,
      settingIsLoading,
      applicationIsLoading,
      ProfileactiveTab
    } = this.props;
    // console.log('freelancerProfile',freelancerProfile)
    const hasPaypal =
      settingUserDetails.payment_methods &&
      settingUserDetails.payment_methods
        .map((method) => method.account_type === "paypal")
        .includes(true)
    const hasSkrill =
      settingUserDetails.payment_methods &&
      settingUserDetails.payment_methods
        .map((method) => method.account_type === "Skrill")
        .includes(true)
    const hasDirectBank =
      settingUserDetails.payment_methods &&
      settingUserDetails.payment_methods
        .map((method) => method.account_type === "Direct to U.S. Bank (USD)")
        .includes(true)
    const hasPayoneer =
      settingUserDetails.payment_methods &&
      settingUserDetails.payment_methods
        .map((method) => method.account_type === "Payoneer")
        .includes(true)

    const BreadCrumbLink = activeTab === "taxInfo" ? "Tax Information" : activeTab === "billing" ? "Billing" : activeTab === 'profilesetting' ? "Profile Settings" : activeTab === 'getPaid' ? "Get Paid"
      : activeTab === 'myTerms' ? "MyTerms" : activeTab === 'passAndSec' ? "Password & Security" : activeTab === 'notification' ? "Notification Settings" : activeTab === 'membership' ? "Membership" : null
    return (
      <div className="" id="project-manager-dashboard-container">
        {!ProfileactiveTab &&
          <>
            <FreelancerHeader history={this.props.history} userImg={userImgBlob} />
            <div id="tf-cloud-expert-dashboard-root">
              <BreadCrumb step5 link={BreadCrumbLink} tab={activeTab === "myTerms" ? "CE" : ""} />

            </div>
          </>
        }
        {this.state.isEditCategory ? (
          <EditCategory
            value={freelancerProfile.category || []}
            lgShow={this.state.categoryPopup}
            updateProfile={this.updateProfile}
            setLgShow={this.handleCategoryPopup}
          />
        ) : null}

        {this.state.isEditSkill ? (
          <EditSkills
            value={freelancerProfile.skill || []}
            lgShow={this.state.skillPopup}
            updateProfile={this.updateProfile}
            setLgShow={this.handleSkillPopup}
          />
        ) : null}

        {isAuthorized && (
          // <div className="app-pro2-swal">
          //   <SweetAlert
          //     success
          //     confirmBtnText="Ok"
          //     confirmBtnBsStyle="success"
          //     onConfirm={this.hideNewAlert}
          //   >
          //     Account Successfully Added .
          //   </SweetAlert>
          // </div>
          <SuccessSweetAlert 
          show={true}
          handleConfirm={this.hideNewAlert}
          message={"Account Successfully Added ."}
          />
        )}

        {isAccountRemove && (
          // <div className="app-pro2-swal">
          //   <SweetAlert
          //     success
          //     confirmBtnText="Ok"
          //     confirmBtnBsStyle="danger"
          //     onConfirm={this.hideRemoveAlert}
          //   >
          //     Account Deleted .
          //   </SweetAlert>
          // </div>
          <ErrorSweetAlert 
          show={true}
          handleConfirm={this.hideRemoveAlert}
          message={" Account Deleted ."}
          />
        )}

        {/* Start Container */}
        <div className={!this.props.loginSteps.showHideSideBar ? "mains" : "main-add"} id="">
          <div className="">
            {!ProfileactiveTab && <div className="col-lg-2 col-md-2 col-sm-2 col-xs-2 p-0">
              <div className="custom_sticky_container">
                <div className="position-sticky">
                  <FreelancerDashboardSideBar history={this.props.history} location={this.props.location} />
                </div>
              </div>
            </div>
            }
            <div className={!ProfileactiveTab ? "col-lg-10 col-md-10 col-sm-10 col-xs-10" : "col-lg-12 col-md-12 col-sm-12 col-xs-12 p-0 mt-20"}>
              <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12">
                <div className="pro-right-content-area">

                  {isUpdated && (
                    // <div className="app-pro2-swal">
                    //   <SweetAlert
                    //     success
                    //     confirmBtnText="Ok"
                    //     confirmBtnBsStyle="success"
                    //     // title="First step is empty!"
                    //     onConfirm={this.hideAlert}
                    //   >
                    //     Account updated successfully.
                    //   </SweetAlert>
                    // </div>
                    <SuccessSweetAlert
                      show={true}
                      handleConfirm={this.hideAlert}
                      message={"Account updated Successfully."}
                    />
                  )}

                  {/* Start Outline */}
                  <div className="empty-outline-box-for-project-manager-dashboard">


                    <div className="">

                      {settingIsLoading || applicationIsLoading ? (
                        <div className="grid-loader">
                          <Loader type="Grid" color="#00BFFF" height="100" width="100" />
                        </div>
                      ) : (
                        ""
                      )}

                      <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12 bhoechie-tab bhoechie-tab-content">
                        {/* <BreadCrumb step5 link={BreadCrumbLink} tab={activeTab === "myTerms" ? "CE" : ""}/> */}
                        {activeTab === 'billing' && (
                          <div>
                            <div className="tf_job_posting tf_bill">
                              <div className="mn_heading pr-4">
                                <h5 className="info_number">Billing Methods</h5>
                                <div className="pull-right">
                                  <a>+ Add Method </a>
                                </div>
                              </div>
                              <div className="clearfix"></div>
                              <div className="col-md-12">
                                <div className="tf_payment_text tf_payment_text2">
                                  <h4>You have not set up any billing methods yet.</h4>
                                  <p>
                                    Your billing method will be charged only when your available balance
                                    from TalFoundry earnings is not sufficient to pay for your monthly
                                    membership.
                                  </p>
                                </div>
                              </div>
                            </div>
                          </div>
                        )}
                        {activeTab === 'taxInfo' && (
                          <div>
                            <div className="tf_job_posting">
                              <div className="mn_heading">
                                <h5 className="info_number">W-8BEN</h5>
                                <div className="pull-right">
                                  <a>
                                    <img src={editImg} alt="" />
                                  </a>
                                </div>
                              </div>
                              <div className="clearfix"></div>
                              <div className="col-md-12">
                                <div className="tf_payment_text">
                                  <p>
                                    <br />
                                    Before withdrawing funds, all non-U.S. persons must provide their W-8BEN
                                    tax information.
                                  </p>
                                  <h4>Legal Name of Business</h4>
                                  <p> Enter your Business Name</p>
                                  <h4>Address</h4>
                                  <p>221B, Baker Street, 5th Avenue, New York City, NY. United States 20</p>
                                  <h4>Federal Tax Classification</h4>
                                  <p>N/A - Non-US</p>
                                </div>
                              </div>
                            </div>
                          </div>
                        )}

                        {activeTab === 'profilesetting' && (
                          <div>
                            <div className="tf_job_posting">
                              <div className="mn_heading">
                                <h5 className="info_number">Profile Settings</h5>
                                {/* <div className="pull-right1">
                                <a href={`/user-profile/${freelancerProfile.uuid}`}>
                                  View my profile as others see it
                                </a>
                              </div> */}
                              </div>
                              <div className="clearfix"></div>
                              {profileUpdate && (
                                <div className="grid-loader col-md-12">
                                  <Loader type="Grid" color="#00BFFF" height={40} width={40} />
                                </div>
                              )}
                              {!profileUpdate && (
                                <div className="col-md-12">
                                  <div className="row d-flex">
                                    <div className="col-md-6 tf_top_2">
                                      <label>Visibility</label>
                                      <div className="input-group tf_loca">
                                        <div className="selectedwrap setting-select-box">
                                          <select
                                            disabled={!this.props.currentUser.account_approved}
                                            className="form-control mn_input mySelectBoxclassName"
                                            onChange={this.updateVisibility}
                                          >
                                            <option
                                              selected={
                                                freelancerProfile && freelancerProfile.visibility === "Public"
                                              }
                                              value="Public"
                                            >
                                              Public
                                            </option>
                                            <option
                                              selected={
                                                freelancerProfile &&
                                                freelancerProfile.visibility === "Talfoundry users only"
                                              }
                                              value="Talfoundry users only"
                                            >
                                              TalFoundry Users only
                                            </option>
                                            <option
                                              selected={
                                                freelancerProfile &&
                                                freelancerProfile.visibility === "Private"
                                              }
                                              value="Private"
                                            >
                                              Private
                                            </option>
                                          </select>
                                        </div>
                                      </div>
                                    </div>
                                    <div className="col-md-6 tf_top_2">
                                      <label>Project Preference</label>
                                      <div className="input-group tf_loca">
                                        <div className="selectedwrap setting-select-box">
                                          <select
                                            className="form-control mn_input mySelectBoxclassName"
                                            onChange={this.updatePreference}
                                          >
                                            <option selected disabled={true}>
                                              Select Preference
                                            </option>
                                            <option
                                              selected={
                                                freelancerProfile.project_preference ===
                                                "Both short-term and long-term projects"
                                              }
                                              value="Both short-term and long-term projects"
                                            >
                                              Both short-term and long-term projects
                                            </option>
                                            <option
                                              selected={
                                                freelancerProfile.project_preference ===
                                                "Long-term projects (more than 3 months)"
                                              }
                                              value="Long-term projects (more than 3 months)"
                                            >
                                              Long-term projects (more than 3 months){" "}
                                            </option>
                                            <option
                                              selected={
                                                freelancerProfile.project_preference ===
                                                "Short-term projects (less than 3 months)"
                                              }
                                              value="Short-term projects (less than 3 months)"
                                            >
                                              Short-term projects (less than 3 months)
                                            </option>
                                          </select>
                                        </div>
                                      </div>
                                    </div>
                                    <div className="col-md-6 tf_top_1 tf_earning m-0">
                                      <label>Experience Level</label>
                                      <div className="input-group tf_loca">
                                        <div className="selectedwrap setting-select-box">
                                          <select className="form-control mn_input mySelectBoxclassName" value={experienceLevel || freelancerProfile.experience_level} onChange={this.updateExperienceLevel}>
                                            <option selected value="Beginner">
                                              Beginner
                                            </option>
                                            <option value="Intermediate">
                                              Intermediate
                                            </option>
                                            <option value="Expert">
                                              Expert
                                            </option>
                                          </select>
                                        </div>
                                      </div>
                                    </div>
                                    <div className="col-md-12 tf_top_1">
                                      <div className="tf_deposit m-0" onChange={this.updateSearchEnginePrivacy}>
                                        <label className="labeltext">Search Engine Privacy</label>
                                        <br />
                                        <div className="form-check-inline">
                                          <label className="customradio m-0" htmlFor="Deposit_1">
                                            <span className="radiotextsty">
                                              Show my full name (e.g. {`${firstName} ${lastName}`})
                                            </span>
                                            <input
                                              type="radio"
                                              value="Show my full name"
                                              checked={
                                                searchEnginePrivacy === "Show my full name" ||
                                                freelancerProfile.search_engine_privacy ===
                                                "Show my full name"
                                              }
                                              name="radio"
                                              id="Deposit_1"
                                            />
                                            <span className="checkmark"></span>
                                          </label>
                                          <label className="customradio" htmlFor="Deposit_2">
                                            <span className="radiotextsty">
                                              Show only my first name and last initial (e.g.{" "}
                                              {`${freelancerProfile.name && freelancerProfile.name.split(" ")[0]
                                                } ${freelancerProfile.name &&
                                                freelancerProfile.name.split(" ")[
                                                freelancerProfile.name.split(" ").length - 1
                                                ][0]
                                                }.`}
                                              )
                                            </span>
                                            <input
                                              type="radio"
                                              value="Show only my first name and last initial"
                                              checked={
                                                searchEnginePrivacy ===
                                                "Show only my first name and last initial" ||
                                                freelancerProfile.search_engine_privacy ===
                                                "Show only my first name and last initial"
                                              }
                                              id="Deposit_2"
                                              name="radio"
                                            />
                                            <span className="checkmark"></span>
                                          </label>
                                        </div>
                                      </div>
                                    </div>
                                  </div>
                                </div>
                              )}
                            </div>
                            {/* <div className="tf_job_posting tf_job_posting_experience tf_top">
                            <div className="mn_heading">
                              <h5 className="info_number">Experience Level</h5>
                            </div>
                            <div className="clearfix"></div>
                            {experienceUpdate && (
                              <div className="grid-loader col-md-12">
                                <Loader type="Grid" color="#00BFFF" height={40} width={40} />
                              </div>
                            )}
                            {!experienceUpdate && (
                              <div className="col-md-12">
                                <div className="btn-group" onChange={this.updateExperienceLevel}>
                                  <div className="switch-field">
                                    <label
                                      htmlFor="Beginner"
                                      className={`btn btn-primary ${freelancerProfile.experience_level === "Beginner" ? "active" : ""
                                        }`}
                                    >
                                      <input
                                        type="radio"
                                        id="Beginner"
                                        name="radio1"
                                        value="Beginner"
                                        checked={
                                          experienceLevel === "Beginner" ||
                                          freelancerProfile.experience_level === "Beginner"
                                        }
                                      />
                                      Beginner
                                    </label>

                                    <label
                                      htmlFor="Intermediate"
                                      className={`btn btn-primary ${freelancerProfile.experience_level === "Intermediate"
                                          ? "active"
                                          : ""
                                        }`}
                                    >
                                      <input
                                        type="radio"
                                        id="Intermediate"
                                        name="radio1"
                                        value="Intermediate"
                                        checked={
                                          experienceLevel === "Intermediate" ||
                                          freelancerProfile.experience_level === "Intermediate"
                                        }
                                      />
                                      Intermediate
                                    </label>

                                    <label
                                      htmlFor="Expert"
                                      className={`btn btn-primary ${freelancerProfile.experience_level === "Expert" ? "active" : ""
                                        }`}
                                    >
                                      <input
                                        type="radio"
                                        id="Expert"
                                        name="radio1"
                                        value="Expert"
                                        checked={
                                          experienceLevel === "Expert" ||
                                          freelancerProfile.experience_level === "Expert"
                                        }
                                      />
                                      Expert
                                    </label>
                                  </div>
                                </div>
                                <div className="clearfix"></div>
                              </div>
                            )}
                          </div> */}

                            <div className="tf_job_posting tf_top">
                              <div className="mn_heading">
                                <h5 className="info_number">Account</h5>
                                <div className="pull-right">
                                  <a onClick={this.handleEdit} name="accountEdit">
                                    <img name="accountEdit" src={editImg} alt="" />
                                  </a>
                                </div>
                              </div>
                              <div className="clearfix"></div>

                              {!accountEdit ? (
                                <div>
                                  <div className="col-md-6">
                                    <div className="row">
                                      <div className="col-md-6">
                                        <div className="tf_payment_info">
                                          <div className="avatar-upload">
                                            <div className="avatar-edit">
                                              <div className="position-relative">
                                                <img src={
                                                  userImgBlob && userImgBlob.length > 0 ? userImgBlob : userImg
                                                }
                                                  className=""
                                                  alt=""
                                                />
                                              </div>
                                            </div>
                                          </div>
                                        </div>
                                      </div>
                                      <div className="col-md-6">
                                        <h4>User Name</h4>
                                        <p>{username}</p>
                                        <h4>Name</h4>
                                        <p>{fullName}</p>
                                        <h4>Email</h4>
                                        <p>{email}</p>
                                      </div>
                                    </div>
                                  </div>
                                </div>
                              ) : (
                                <div className="setting-page-input">
                                  <div className="row">
                                    <div className="col-md-12">
                                      <div className="col-md-3">
                                        <div className="tf_payment_info">
                                          {!userImg ? (
                                            <div className="avatar-upload">
                                              <div className="avatar-edit no_user_img">
                                                <Avatar
                                                  src={
                                                    userImgBlob && userImgBlob.length > 0
                                                      ? userImgBlob
                                                      : faceImg
                                                  }
                                                  color="#FFB4B6"
                                                  round="50px"
                                                />
                                                {accountEdit && (
                                                  <i
                                                    className="fa fa-pencil"
                                                    onClick={this.addUserImg}
                                                    aria-hidden="true"
                                                  ></i>
                                                )}
                                              </div>
                                            </div>
                                          ) : (
                                            <div className="avatar-upload">
                                              <div className="avatar-edit">
                                                <span className="position-relative">
                                                  <img className="img-circle" src={userImg} alt="img" />
                                                  {accountEdit && (
                                                    <i
                                                      className="fa fa-pencil"
                                                      onClick={this.addUserImg}
                                                      aria-hidden="true"
                                                    ></i>
                                                  )}
                                                </span>
                                              </div>
                                            </div>
                                          )}

                                          {accountEdit && (
                                            <span className="supported-file-message">
                                              Supported formats: .jpg, .jpeg, .png
                                            </span>
                                          )}
                                        </div>
                                        <input
                                          type="file"
                                          onChange={this.handleImage}
                                          name="userImgBlob"
                                          id="user_Logo"
                                        />

                                        {userImgTypeError &&
                                          this.fieldError("You must upload an image in the given format.")}
                                      </div>
                                      <div className="col-md-9">
                                        <div className="row">
                                          <div className="col-md-4">
                                            <div className="input-group">
                                              <h4>First Name</h4>
                                              <div className="input-group-addon">
                                                <img src={userLogo} alt="" />
                                              </div>
                                              <input
                                                type="text"
                                                className="form-control mn_input"
                                                ref={this.firstNameRef}
                                                name="firstName"
                                                id="firstName"
                                                placeholder="First Name"
                                                required
                                                value={firstName}
                                                onBlur={this.handleError}
                                                onChange={this.handleChange}
                                              />
                                              {this.state.firstNameError && this.fieldError("180")}
                                            </div>
                                          </div>
                                          <div className="col-md-4">
                                            <div className="input-group mn_top">
                                              <h4>Email</h4>
                                              <div className="input-group-addon">
                                                <img src={emailLogo} alt="" />
                                              </div>
                                              <input
                                                type="email"
                                                className="form-control mn_input"
                                                name="email"
                                                onChange={this.handleChange}
                                                ref={this.emailRef}
                                                id="email"
                                                placeholder="Work Email Address"
                                                required
                                                value={email}
                                                onBlur={this.handleError}
                                              />
                                              {this.state.emailError && this.fieldError("160")
                                                ? this.state.emailError && this.fieldError("160")
                                                : !this.state.emailPolicy &&
                                                this.fieldError("160", "Email must contain '@' character.")}
                                            </div>
                                          </div>
                                          <div className="col-md-4">
                                            <div className="input-group mn_top">
                                              <h4>User Name</h4>
                                              <div className="input-group-addon">
                                                <img src={userLogo} alt="" />
                                              </div>
                                              <input
                                                type="email"
                                                className="form-control mn_input"
                                                name="username"
                                                onChange={this.handleChange}
                                                ref={this.usernameRef}
                                                id="email"
                                                placeholder="UserId"
                                                required
                                                value={username}
                                              />
                                              {/* {this.state.emailError && this.fieldError("160") ? this.state.emailError && this.fieldError("160") : !this.state.emailPolicy && this.fieldError("160", "Email must contain '@' character.")} */}
                                              {this.state.usernameError && this.fieldError("180")}
                                              {isUsernameTaken && this.fieldError("180", usernameErrorMessage)}
                                            </div>
                                          </div>
                                          <div className="col-md-12">
                                            <div className="edit-setting">
                                              <div className="col-md-12 pt-2 pb-2 pl-0">
                                                <Link
                                                  // type="submit"
                                                  // name="submit"
                                                  id="submit"
                                                  onClick={this.updateAccountInfo}
                                                  // value="SAVE"
                                                  className="btn-blue"
                                                >Save</Link>
                                                <Link
                                                  onClick={this.handleCancel}
                                                  name="accountEdit"
                                                  className="btn-black"
                                                >
                                                  CANCEL
                                                </Link>
                                              </div>
                                            </div>
                                          </div>
                                        </div>
                                      </div>
                                    </div>
                                  </div>

                                </div>
                              )}
                              <div className="clearfix"></div>
                            </div>
                            <div className="tf_job_posting">
                              <div className="mn_heading">
                                <h5 className="info_number">Location</h5>
                                <div className="pull-right">
                                  <a>
                                    <img src={editImg} alt="" />
                                  </a>
                                </div>
                              </div>
                              <div className="clearfix"></div>
                              <div className="col-md-12">
                                <div className="tf_payment_text tf_payment_text">
                                  <h4>Time Zone</h4>
                                  <p>UTC+05:30 Mumbai, Kolkata, Chennai, New Delhi</p>
                                </div>
                                <div className="tf_payment_text tf_payment_text">
                                  <h4>Address</h4>
                                  <p>221B, Baker Street, 5th Avenue, New York City, NY. United States 20</p>
                                </div>
                                <div className="tf_payment_text tf_payment_text">
                                  <h4>Phone</h4>
                                  <p>john@doe.com</p>
                                </div>
                              </div>
                            </div>
                            <div className="tf_job_posting">
                              <div className="mn_heading">
                                <h5 className="info_number">Invoice Address (Optional)</h5>
                                <div className="pull-right">
                                  <a>
                                    <img src={editImg} alt="" />
                                  </a>
                                </div>
                              </div>
                              <div className="clearfix"></div>
                              <div className="col-md-12">
                                <div className="tf_payment_text tf_payment_text">
                                  <p>
                                    <br />
                                    This address will be displayed on the invoice sent to clients.
                                  </p>
                                </div>
                                <div className="tf_payment_text tf_payment_text">
                                  <h4>Address</h4>
                                  <p>221B, Baker Street, 5th Avenue, New York City, NY. United States 20</p>
                                </div>
                              </div>
                            </div>



                            <div className="tf_job_posting tf_top">
                              <div className="mn_heading">
                                <h5 className="info_number">Linked accounts</h5>
                              </div>
                              <div className="clearfix"></div>
                              <div className="col-md-12 tf_social nopad linked-accounts">
                                <div className="col-md-6">
                                  <a>
                                    <i className="fa fa-twitter" aria-hidden="true"></i> Twiter
                                  </a>
                                </div>
                                <div className="col-md-6">
                                  <a>
                                    <i className="fa fa-facebook" aria-hidden="true"></i> Facebook
                                  </a>
                                </div>
                                <div className="col-md-6">
                                  <a>
                                    <i className="fa fa-stack-overflow" aria-hidden="true"></i>{" "}
                                    StackOverflow
                                  </a>
                                </div>
                                <div className="col-md-6">
                                  <a>
                                    <i className="fa fa-github" aria-hidden="true"></i> GitHub
                                  </a>
                                </div>
                              </div>
                            </div>
                          </div>
                        )}
                        {activeTab === 'getPaid' && (
                          <div>
                            <div>
                              <div className="tf_balance">
                                <div className="tf_job_posting tf_bill">
                                  <div className="mn_heading">
                                    <h5 className="info_number">Balance Due</h5>
                                  </div>
                                  <div className="clearfix"></div>
                                  <div className="col-md-12">
                                    <div className="tf_payment_text tf_bal">
                                      <p>
                                        Your balance is <span>$100.00</span>
                                      </p>
                                      <a>GET PAID</a>
                                    </div>
                                  </div>

                                  {/* addPaymentModal */}
                                </div>
                                <Modal
                                  isOpen={removeModal}
                                  style={customStyles}
                                  onRequestClose={this.closeModal}
                                >
                                  <div className="modal-dialog" id="remove-payment-method-popup">
                                    <div className="modal-content">
                                      <div className="modal-header">
                                        <button type="button" className="close" onClick={this.closeModal}>
                                          <span aria-hidden="true">Ã—</span>
                                          <span className="sr-only">Close</span>
                                        </button>
                                        <h4 className="modal-title"> Payment Method</h4>
                                      </div>
                                      <div className="modal-body">
                                        <p className="are-you-sure-message">
                                          Are you sure you want to remove this payment method ?
                                        </p>
                                        <div className="yes-no-button-container">
                                          <button
                                            onClick={() => this.removeAccount()}
                                            type="button"
                                            className="btn btn-ban"
                                          >
                                            Yes
                                          </button>
                                          <button
                                            onClick={this.closeModal}
                                            type="button"
                                            className="btn btn-not-ban"
                                          >
                                            No
                                          </button>
                                        </div>
                                      </div>
                                    </div>
                                  </div>
                                </Modal>
                                <div className="tf_job_posting tf_top_2 tf_bill">
                                  <div className="mn_heading pr-4">
                                    <h5 className="info_number">Payment Details</h5>
                                    {!(hasSkrill && hasPayoneer && hasPaypal && hasDirectBank) ? (
                                      <div className="pull-right">
                                        <a name="isAddMethodModal" onClick={this.openPaymentModals}>
                                          + ADD METHOD
                                        </a>
                                      </div>
                                    ) : (
                                      ""
                                    )}
                                  </div>
                                  <AddPaymentModal
                                    onOpen={this.state.isAddMethodModal}
                                    history={this.props.history}
                                    onClose={this.closePaymentModals}
                                    isPaypalAdded={hasPaypal}
                                    isPayoneerAdded={hasPayoneer}
                                    isDirectBankAdded={hasDirectBank}
                                    isSkrillAdded={hasSkrill}
                                  />
                                  <div className="clearfix"></div>
                                  <div className="col-md-12">
                                    <div className="row">
                                      {!isEmpty(settingUserDetails.payment_methods) ? (
                                        settingUserDetails.payment_methods.map((payMethod, idx) => {
                                          return (
                                            <React.Fragment key={idx}>
                                              <div className="col-md-12">
                                                <div className="col-md-3">
                                                  <div className="tf_payment_text tf_payment_text2">
                                                    {payMethod.account_type === "Payoneer" ? (
                                                      <img src={payoneerImg} alt="" />
                                                    ) : payMethod.account_type ===
                                                      "Direct to U.S. Bank (USD)" ? (
                                                      <img src={directBankImg} alt="" />
                                                    ) : payMethod.account_type === "Skrill" ? (
                                                      <img src={skrillImg} alt="" />
                                                    ) : (
                                                      <img src={paypalImg} alt="" />
                                                    )}
                                                  </div>
                                                </div>
                                                <div className="col-md-8 tf_payment_text">
                                                  <p>Email - {payMethod.email}</p>
                                                  <span>Active</span>
                                                </div>
                                                <div className="col-md-1 tf_payment_text7 remove-black-background">
                                                  <i
                                                    className="fa fa-minus-circle remove-pay-method"
                                                    data-toggle="tooltip"
                                                    data-placement="top"
                                                    title="Remove"
                                                    aria-hidden="true"
                                                    onClick={this.handlePaymentRemove.bind(
                                                      this,
                                                      payMethod.account_type
                                                    )}
                                                  ></i>
                                                </div>
                                              </div>

                                              <div className="clearfix"></div>
                                              <hr />
                                            </React.Fragment>
                                          )
                                        })
                                      ) : (
                                        <div className="tf_payment_text tf_payment_text2">
                                          <h4>You have not set up any billing methods yet.</h4>
                                          <p>
                                            Set up your billing methods so you’ll be able to hire right away
                                            when you’re ready.
                                          </p>
                                          <p>A 3% processing fee will be assessed on all payments</p>
                                        </div>
                                      )}
                                    </div>
                                    <div className="tf_continue">
                                      <Link to="/" className="tf_invite_button2">
                                        Skip This Step For Now
                                      </Link>
                                    </div>
                                  </div>
                                </div>
                              </div>
                              <div className="tf_balance_hide">
                                <div className="tf_job_posting tf_bill">

                                  <div
                                    className="modal fade"
                                    id="myModal1"
                                    tabindex="-1"
                                    role="dialog"
                                    aria-labelledby="myModalLabel"
                                    aria-hidden="true"
                                  >
                                    <div className="modal-dialog tf_model1">
                                      <div className="modal-content">
                                        <div className="modal-header">
                                          <button
                                            type="button"
                                            className="close"
                                            data-dismiss="modal"
                                            aria-label="Close"
                                          >
                                            <span aria-hidden="true">Ã—</span>
                                          </button>
                                          <h4 className="modal-title" id="myModalLabel">
                                            Add A Payment Method
                                          </h4>
                                        </div>
                                        <div className="modal-body">
                                          <div className="col-md-12 nopad tf_recommend">
                                            <h4>Recommended for USA</h4>
                                            <div className="col-md-2">
                                              <div className="tf_add_pay">
                                                <img src="images/pay_1.png" alt="" />
                                              </div>
                                            </div>
                                            <div className="col-md-7 nopad">
                                              <div className="tf_add_pay">
                                                <h5>Payoneer</h5>
                                                <p>
                                                  $2 USD per withdrawal. Additional activation ans
                                                  maintenance fees charges by Payoneer.
                                                </p>
                                                <a>Donâ€™t have a Payoneer account?</a>
                                              </div>
                                            </div>
                                            <div className="col-md-3">
                                              <div className="tf_add_pay1">
                                                <a>SET UP</a>
                                              </div>
                                            </div>
                                            <div className="clearfix"></div>
                                            <hr />
                                          </div>
                                          <div className="col-md-12 nopad">
                                            <div className="col-md-2">
                                              <div className="tf_add_pay">
                                                <img src="images/pay_2.png" alt="" />
                                              </div>
                                            </div>
                                            <div className="col-md-7 nopad">
                                              <div className="tf_add_pay">
                                                <h5>Skrill</h5>
                                                <p>
                                                  $1 USD per withdrawal. Additional activation ans
                                                  maintenance fees charges by Skrill.
                                                </p>
                                                <a>Donâ€™t have a Skrill account?</a>
                                              </div>
                                            </div>
                                            <div className="col-md-3">
                                              <div className="tf_add_pay1">
                                                <a>SET UP</a>
                                              </div>
                                            </div>
                                            <div className="clearfix"></div>
                                            <hr />
                                          </div>
                                          <div className="col-md-12 nopad">
                                            <div className="col-md-2">
                                              <div className="tf_add_pay2">
                                                <img src="images/pay_3.png" alt="" />
                                              </div>
                                            </div>
                                            <div className="col-md-7 nopad">
                                              <div className="tf_add_pay">
                                                <h5>Direct to U.S. Bank (USD)</h5>
                                                <p>Free payments to U.S. banks</p>
                                              </div>
                                            </div>
                                            <div className="col-md-3">
                                              <div className="tf_add_pay2">
                                                <a>SET UP</a>
                                              </div>
                                            </div>
                                            <div className="clearfix"></div>
                                            <hr />
                                          </div>

                                          <div className="col-md-12 nopad">
                                            <div className="col-md-2">
                                              <div className="tf_add_pay">
                                                <img src="images/pay_4.png" alt="" />
                                              </div>
                                            </div>
                                            <div className="col-md-7 nopad">
                                              <div className="tf_add_pay">
                                                <h5>Paypal</h5>
                                                <p>
                                                  $1 USD per withdrawal. Additional activation ans
                                                  maintenance fees charges by Paypal.
                                                </p>
                                                <a>Donâ€™t have a Paypal account?</a>
                                              </div>
                                            </div>
                                            <div className="col-md-3">
                                              <div className="tf_add_pay1">
                                                <a>SET UP</a>
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
                        {activeTab === 'myTerms' && (
                          <div>
                            <div className="tf_job_posting">
                              <div className="mn_heading">
                                <h5 className="info_number">Teams</h5>
                              </div>
                              <div className="clearfix"></div>
                              <div className="col-md-12">
                                <div className="tf_currently">
                                  <h4>You currently have no Teams</h4>
                                  <p>
                                    <a>Search for Jobs</a> or{" "}
                                    <a>work on your profile.</a>
                                  </p>
                                </div>
                              </div>
                            </div>
                          </div>
                        )}
                        {activeTab === 'passAndSec' && (
                          <div>
                            <div className="tf_job_posting">
                              <div className="mn_heading">
                                <h5 className="info_number">Password</h5>
                                <div className="pull-right">
                                  <a onClick={this.handleEdit} name="passwordEdit">
                                    <img name="passwordEdit" src={editImg} alt="" />
                                  </a>
                                </div>
                              </div>
                            </div>
                            {passwordEdit ? (
                              <div className="freelancer-forgot-password-edit">
                                <div className="tf-forgot-password">
                                  <div className="edit-password-container">
                                    <div className="col-md-4 bg-color-white">
                                      <div className="input-group resetpassword-first-row">
                                        <h4>Current Password</h4>
                                        <div className="input-group-addon">
                                          <img src={passIcon} alt="password" />
                                        </div>
                                        <input
                                          type="password"
                                          onChange={this.handleChange}
                                          name="currentPassword"
                                          className="form-control mn_input"
                                          id="current_password"
                                          placeholder="Current Password"
                                          value={currentPassword}
                                        />
                                        {this.state.currentPasswordError && this.fieldError("180")}
                                      </div>
                                    </div>
                                    <div className="col-md-4 bg-color-white">
                                      <div className="input-group">
                                        <h4>New Password</h4>
                                        <div className="input-group-addon">
                                          <img src={passIcon} alt="password" />
                                        </div>
                                        <input
                                          type="password"
                                          onChange={this.handleChange}
                                          className="form-control mn_input"
                                          name="newPassword"
                                          id="newPassword"
                                          placeholder="New Password"
                                          value={newPassword}
                                        />
                                        {this.state.newPasswordError
                                          ? this.state.newPasswordError && this.fieldError("180")
                                          : !this.state.passwordPolicy &&
                                          this.fieldError(
                                            "180",
                                            "Make sure it's at least 8 characters including a number, a lowercase & uppercase letter and a special character."
                                          )}
                                      </div>
                                    </div>
                                    <div className="col-md-4 bg-color-white">
                                      <div className="input-group">
                                        <h4>Confirm Password</h4>
                                        <div className="input-group-addon">
                                          <img src={passIcon} alt="password" />
                                        </div>
                                        <input
                                          type="password"
                                          onChange={this.handleChange}
                                          className="form-control mn_input"
                                          name="confirmPassword"
                                          id="confirm_password"
                                          placeholder="Confirm Password"
                                          value={confirmPassword}
                                        />
                                        {this.state.confirmPasswordError && this.fieldError("180")}
                                        {!this.state.isPassMatch &&
                                          this.fieldError("180", "Password does not match.")}
                                      </div>
                                    </div>
                                    <div className="col-md-6 pswdChngeBtnGrup">
                                      <div className="form-group edit-setting">
                                        <div className="col-md-6">
                                          <button
                                            className="btn-primary mn_button editSubmit-button"
                                            onClick={this.updatePassword}
                                          >
                                            SAVE
                                          </button>
                                        </div>
                                        <div className="col-md-6">
                                          <a
                                            onClick={this.handleCancel}
                                            name="passwordEdit"
                                            className="tf_cancel"
                                          >
                                            CANCEL
                                          </a>
                                        </div>
                                      </div>
                                    </div>
                                  </div>
                                </div>
                              </div>
                            ) : (
                              <div className="freelancer-reset-password-before-message">
                                <div className="clearfix"></div>
                                <div className="col-md-12 password-has-been-reset">
                                  <div className="tf_payment_text tf_payment_text3">
                                    <h4>
                                      <i className="fa fa-check-circle" aria-hidden="true"></i> Password has
                                      been set
                                    </h4>
                                    <p>
                                      Choose a strong, unique password that's at least 8 characters long.
                                    </p>
                                  </div>
                                </div>
                              </div>
                            )}
                            <div className="tf_job_posting tf_top">
                              <div className="mn_heading">
                                <h5 className="info_number">Two-Step Verification</h5>
                                <div className="clearfix"></div>
                                <p>Help protect your account by enabling extra layers of security.</p>
                              </div>
                              <div className="clearfix"></div>
                              <div className="col-md-12">
                                <div className="tf_heading1">
                                  <h5 className="info_number">Security Question</h5>
                                  <div className="pull-right">
                                    <a onClick={this.isSecQueUpdate}>
                                      <img src={editImg} alt="" />
                                    </a>
                                    <UpdateSecQus
                                      isOpen={this.state.isSecQuePopup}
                                      onClose={this.isSecQueUpdate}
                                    />
                                  </div>
                                </div>
                                <div className="clearfix"></div>
                                <div className="tf_payment_text tf_payment_text3">
                                  <h4>
                                    <i className="fa fa-check-circle" aria-hidden="true"></i> Security
                                    question has been enabled
                                  </h4>
                                  <p>Confirm your identity with a question only you know the answer to.</p>
                                </div>
                                <div className="clearfix"></div>
                                <hr />
                              </div>
                              <div className="col-md-12">
                                <div className="tf_heading1">
                                  <h5 className="info_number">Security Question</h5>
                                  <div className="pull-right">
                                    <a>
                                      <img src={editImg} alt="" />
                                    </a>
                                  </div>
                                </div>
                                <div className="clearfix"></div>
                                <div className="tf_payment_text tf_payment_text3">
                                  <h4>
                                    <i className="fa fa-check-circle" aria-hidden="true"></i> Phone
                                    verification
                                  </h4>
                                  <p>Receive a unique 6-digit code to enter along with your password.</p>
                                </div>
                              </div>
                            </div>
                          </div>
                        )}
                        {activeTab === 'notification' && (
                          <NotificationSetting
                            location={this.props.location}
                            history={this.props.history}
                            freromParent={true}
                          />
                        )}
                        {activeTab === 'membership' && (
                          <div>
                            <div className="tf_job_posting tf_bill">
                              <div className="mn_heading">
                                <h5 className="info_number">Summary</h5>
                              </div>
                              <div className="clearfix"></div>
                              <div className="col-md-6">
                                <div className="tf_payment_text tf_payment_text2">
                                  <h4>Current Plan</h4>
                                  <p>Cloud Expert Basic</p>
                                </div>
                              </div>
                              <div className="col-md-6">
                                <div className="tf_payment_text tf_payment_text3">
                                  <a>VIEW OR EDIT PLAN</a>
                                </div>
                              </div>
                              <div className="clearfix"></div>
                              <hr />
                              <div className="col-md-12">
                                <div className="tf_payment_text tf_payment_text2">
                                  <h4>Membership Fee</h4>
                                  <p>Free</p>
                                </div>
                              </div>
                              <div className="clearfix"></div>
                              <hr />
                              <div className="col-md-12">
                                <div className="tf_payment_text tf_no_bg">
                                  <h4>Current Billing Cycle</h4>
                                  <p>May 13, 2019 â€” Jun 12, 2019</p>
                                  <a>Learn more</a>
                                </div>
                              </div>
                            </div>
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              </div>

            </div>
            {/* End Outline */}
          </div>
        </div>
        {/* End Container */}
        <div>
          {/* <Footer /> */}
        </div>
      </div>
    )
  }
}

const mapStateToProps = (state) => ({
  ...state,
})

const mapDispatchToProps = (dispatch) => {
  return {
    getCurrentUserDetails: () => dispatch(getCurrentUserDetails()),
    getProfile: (id) => dispatch(getProfileForFreelancer(id)),
    submitProfileData: (id, data) => dispatch(createProfileAction(id, data)),
    updateUser: (id, data) => dispatch(updateUser(id, data)),
    updatePMPassword: (id, data) => dispatch(updatePMPassword(id, data)),
    getSettingUserDetails: (id) => dispatch(getSettingUserDetails(id)),
    getSettingUserDetailsForFreelancer: (id) => dispatch(getSettingUserDetailsForFreelancer(id)),
    removePayMethod: (id) => dispatch(removePayMethod(id)),
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(FreelancerSettingPage)