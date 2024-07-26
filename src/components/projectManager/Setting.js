import React, { Component } from "react";
import ProjectManagerHeader from "../miscellaneous/ProjectManagerHeader";
import editImg from "../../static/images/outline-edit-24px.svg";
import passIcon from "../../static/images/password.svg";
import { connect } from "react-redux";
import userLogo from "../../static/images/user.svg";
import emailLogo from "../../static/images/email.svg";
import Loader from "react-loader-spinner";
import paypalImg from "../../static/images/pay_6.png";
import faceImg from "../../static/images/profile-placeholder.png";
import Avatar from "react-avatar";
import TimezonePicker from "react-timezone";
import { isEmpty } from "lodash";
import { updateUser, updatePMPassword } from "../../Actions/ProjectManagerFreelancerActions";
import { getCurrentUserDetails, getSettingUserDetails } from "../../Actions/applicationActions";
import { removePayMethod } from "../../Actions/ProjectManagerFreelancerActions";
import { Link } from "react-router-dom";
import AddPaymentModal from "../Payment/AddPaymentModal";
import PhoneInput from "react-phone-number-input";
import flags from 'react-phone-number-input/flags'
import 'react-phone-number-input/style.css'
import Modal from "react-modal";
import { getAuthPayPalToken } from "../../Actions/PaymentActions";
import NotificationSettingManager from "../miscellaneous/NotificationSettingManager";
// import Footer from '../miscellaneous/Footer';
import PMDashboardSideBar from "./PMDashboardSideBar";
import BreadCrumb from "../miscellaneous/BreadCrumb";
import SuccessSweetAlert from "../CommonComponets/SweetAlert/SuccessSweetAlert";





const customStylesPayment = {
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
    width: "60%",
  },
}

class Setting extends Component {
  constructor(props, context) {
    super(props, context)
    this.state = {
      showNot: true,
      info: true,
      passAndSec: false,
      billing: false,
      notification: false,
      passwordEdit: false,
      firstName: "",
      lastName: "",
      email: "",
      currentUser: {},
      isUpdated: false,
      emailError: false,
      emailPolicy: true,
      currentPassword: "",
      newPassword: "",
      confirmPassword: "",
      currentPasswordError: false,
      confirmPasswordError: false,
      newPasswordError: false,
      passwordPolicy: true,
      isPassMatch: true,
      companyDetails: {},
      isUsernameTaken: false,
      usernameErrorMessage: "",
      isAddMethodModal: false,
      isLoading: false,
      isAuthorized: false,
      gettingResponse: false,
      isAccountRemove: false,
      removeModal: false,
      modalIsOpen: false,
      notificationFirstTime: true,
      activeTab: 'info',
      isSecQuePopup: false,
      isActive: 'account_details',
      // isArchived: false,
    }

    this.openPaymentModal = this.openPaymentModal.bind(this)
    this.afterOpenPaymentModal = this.afterOpenPaymentModal.bind(this)
    this.closePaymentModal = this.closePaymentModal.bind(this)
  }

  showASectionTab = (event) => {
    // this.setState({
    //   isActive: event.target.id === "account_details" ? true : false,
    //   isArchived: event.target.id === "archive" ? true : false,
    // })
    if (event.target.id === "account_details") { this.setState({ isActive: "account_details" }) }
    else if (event.target.id === "security_details") {
      this.setState({ isActive: "security_details" })
    }
    else {
      this.setState({ isActive: "billing_details" })
    }
  }

  componentDidMount() {
    // console.log('=>>>>>>>>>>',this.props)
    this.props.getSettingUserDetails(this.props.currentUser.uuid || this.props.currentUser.user_id)
    console.log(window.location.href, this.props.location, "window.location.href");
    if (window.location.href.includes("code=")) {
      this.setState({ gettingResponse: true })
      const authToken = window.location.href.includes("code=")
        ? window.location.href.split("code=")[1].split("&")[0]
        : "";
      this.props
        .getToken(authToken, this.props.currentUser.uuid || this.props.currentUser.id)
        .then((res) => {
          if (res && res.status === 200) {
            this.props.history.push("/settings")
            this.setState({
              gettingResponse: false,
              info: false,
              billing: true,
              isAuthorized: true,
              activeTab: 'info',
            })
            this.props.getSettingUserDetails(
              this.props.currentUser.uuid || this.props.currentUser.user_id 
            )
          } else {
            alert("Internal server error, please try again later.")
            this.props.history.push("/settings")
            this.setState({ gettingResponse: false, billing: true, info: false })
          }
        })
    }
    if (this.props.location.state === "jobDetailsPage" || "payMethodPresent") {
      this.setState({ billing: true, info: false, isActive: this.props.location.state ? "billing_details" : "account_details" })
    }
    // console.log(this.props.history.location)
    if (this.props.history.location) {
      let newPath = 'info'
      if (this.props.history.location.search === '') {
        newPath = 'info'
      } else {
        newPath = this.props.history.location.search.slice(
          1,
          this.props.history.location.search.length)
      }
      // console.log('====>>>>>>',this.props.match.params.tab)
      this.setState({ activeTab: newPath })
    }

  }

  componentDidUpdate(prevProps){
    if(prevProps.location.search !== this.props.location.search){
      console.log(this.props.location.search , "this.props.location.search");
        if (this.props.history.location) {
      let newPath = 'info'
      if (this.props.history.location.search === '') {
        newPath = 'info'
      } else {
        newPath = this.props.history.location.search.slice(
          1,
          this.props.history.location.search.length)
      }
      // console.log('====>>>>>>',this.props.match.params.tab)
      this.setState({ activeTab: newPath })
    }
    }
  }

  notificationFirstTimeHandler = (value) => {
    this.setState({ notificationFirstTime: value })
  }

  componentWillReceiveProps(nextProps) {
    console.log(nextProps.settingUserDetails.uuid , "nextProps.currentUser");
    this.setState({
      firstName: nextProps.settingUserDetails.first_name,
      lastName: nextProps.settingUserDetails.last_name,
      email: nextProps.settingUserDetails.email,
      username: nextProps.settingUserDetails.user_name,
      userImg: nextProps.settingUserDetails?.company?.image_url,
      UserUuid: nextProps.settingUserDetails?.uuid || nextProps.currentUser.uuid,
      UserId : nextProps.currentUser.user_id || nextProps.currentUser.id,
      companyDetails: nextProps.settingUserDetails.company,
      companyName:
        nextProps.settingUserDetails.company && nextProps.settingUserDetails.company.name,
      companyLogo:
        nextProps.settingUserDetails.company && nextProps.settingUserDetails.company.image_url,
      ownerName: nextProps.settingUserDetails.company && nextProps.settingUserDetails.company.owner,
      phone: nextProps.settingUserDetails.company && nextProps.settingUserDetails.company.phone,
      vatId: nextProps.settingUserDetails.company && nextProps.settingUserDetails.company.vat_id,
      companyAddress:
        nextProps.settingUserDetails.company && nextProps.settingUserDetails.company.address,
      timeZone:
        nextProps.settingUserDetails.company && nextProps.settingUserDetails.company.time_zone,
    })
  }

  showASection = (event) => {
    this.notificationFirstTimeHandler(true)
    this.setState({
      info: event.target.id === "info" ? true : false,
      passAndSec: event.target.id === "passAndSec" ? true : false,
      billing: event.target.id === "billing" ? true : false,
      notification: event.target.id === "notification" ? true : false,
    })
  }

  handleEdit = (e) => {
    this.setState({ [e.target.name]: !this.state[e.target.name] })
  }

  handleCancel = (e) => {
    this.setState({ [e.target.name]: false })
    if (e.target.name === "passwordEdit") {
      this.setState({ currentPassword: "", newPassword: "", confirmPassword: "" })
    } else {
      this.props
        .getSettingUserDetails(this.props.currentUser.uuid || this.props.currentUser.user_id)
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

  handleNumberChange = (e) => {
    this.setState({ phone: e })
  }

  handleTimeZoneChange = (timeZone) => {
    this.setState({ timeZone: timeZone })
  }

  updateUserDetails = (data) => {
    console.log(data, "----data----");
    this.props.updateUser(this.state.UserUuid, data).then((res) => {
      if (res.status === 200) {
        this.props.getSettingUserDetails(this.state.UserUuid)
        this.props.getCurrentUserDetails()
        this.setState({
          isUpdated: true,
          isUsernameTaken: false,
          accountEdit: false,
          isCompanyDetailsEdit: false,
          isComapnyContractEdit: false,
        })
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
    const { firstName, lastName, email, userImg, username, companyName, ownerName, phone, vatId, companyAddress, timeZone, companyDetails } = this.state;
    const data = {
      user: {
        first_name: firstName,
        last_name: lastName,
        email: email,
        user_name: username,
        image: userImg,
        company_attributes: {
          name: companyName,
          owner: ownerName,
          phone: phone,
          vat_id: vatId,
          time_zone: timeZone,
          address: companyAddress,
          image: userImg,

        },
      },
    }

    if (!isEmpty(companyDetails)) {
      data.user.company_attributes["id"] = companyDetails.id;
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
          this.setState({
            isUpdated: true,
            passwordEdit: false,
            currentPassword: "",
            newPassword: "",
            confirmPassword: "",
          })
        } else {
          alert(res.response.data.message)
        }
      })
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

  updateCompanyDetails = () => {
    const { companyName, companyLogo, companyDetails } = this.state;
    const data = { user: { company_attributes: { name: companyName, image: companyLogo } } }
    if (!isEmpty(companyDetails)) {
      data.user.company_attributes["id"] = companyDetails.id;
    }
    this.updateUserDetails(data)
  }

  updateCompanyContract = () => {
    const { ownerName, phone, vatId, companyAddress, timeZone, companyDetails } = this.state;
    const data = {
      user: {
        company_attributes: {
          owner: ownerName,
          phone: phone,
          vat_id: vatId,
          time_zone: timeZone,
          address: companyAddress,
        },
      },
    }
    if (!isEmpty(companyDetails)) {
      data.user.company_attributes["id"] = companyDetails.id;
    }
    this.updateUserDetails(data)
  }

  openPaymentModals = (e) => {
    this.setState({ [e.target.name]: true })
  }

  closePaymentModals = (name) => {
    this.setState({ [name]: false })
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
          [target]: event.target.result,
          [target + "Error"]: false,
          [target + "Name"]: fileName,
          [target + "TypeError"]: false,
        })
      }
    } else {
      this.setState({ [target + "TypeError"]: true })
    }
  }

  hideAlert = () => {
    this.setState({ isUpdated: false })
  }

  hideNewAlert = () => {
    this.setState({ isAuthorized: false })
  }

  hideRemoveAlert = () => {
    this.setState({ isAccountRemove: false })
  }

  fieldError(margin, message) {
    return (
      <p id="firstName" className="error-field">
        {message ? message : "This field can't be blank."}
      </p>
    )
  }

  addImg = (e) => {
    let inputEl = document.getElementById("companyLogo")
    inputEl.click()
  }

  addUserImg = (e) => {
    let inputUser = document.getElementById("user_Logo")
    inputUser.click()
  }

  handlePaymentRemove = (id) => {
    this.setState({ removeModal: true, methodId: id })
  }
  removeAccount = (id) => {
    this.setState({ removeModal: false })
    this.props.removePayMethod(this.state.methodId).then((res) => {
      if (res.status === 200) {
        this.props.getSettingUserDetails(
          this.props.currentUser.uuid ||  this.props.currentUser.user_id
        )
        this.setState({ isAccountRemove: true })
      }
    })
  }

  closeModal = () => {
    this.setState({ removeModal: false })
  }

  openPaymentModal() {
    this.setState({ modalIsOpen: true })
  }

  afterOpenPaymentModal() {
    this.subtitle.style.color = "#000"
  }

  closePaymentModal() {
    this.setState({ modalIsOpen: false })
  }

  isSecQueUpdate = () => {
    this.setState({ isSecQuePopup: !this.state.isSecQuePopup })
  }

  Back = () => {
    this.props.history.goBack();
  }

  render() {
    const {
      info,
      passAndSec,
      billing,
      notification,
      passwordEdit,
      currentPassword,
      newPassword,
      confirmPassword,
      accountEdit,
      firstName,
      lastName,
      email,
      isUpdated,
      isCompanyDetailsEdit,
      companyName,
      companyLogo,
      isComapnyContractEdit,
      ownerName,
      phone,
      vatId,
      companyAddress,
      timeZone,
      userImg,
      userImgTypeError,
      companyLogoTypeError,
      username,
      isUsernameTaken,
      usernameErrorMessage,
      isAuthorized,
      gettingResponse,
      isAccountRemove,
      activeTab,
      isActive
    } = this.state;

    const FullName = firstName + " " + lastName
    const { settingIsLoading, applicationIsLoading, settingUserDetails } = this.props;
    // console.log('settingUserDetails',settingUserDetails)
    const hasPaypal =
      settingUserDetails.payment_methods &&
      settingUserDetails.payment_methods
        .map((method) => method.account_type === "paypal")
        .includes(true)
    const { removeModal } = this.state;

    // console.log('activeTab',activeTab)
    return (
      <div>
        <div className={!this.props.loginSteps.showHideSideBar ? "mains" : "main-add project-manager-listing-background"}>
          <div className="wraper">
            <ProjectManagerHeader history={this.props.history} />
          </div>
          <div id="tf-project-manager-dashboard-root">
            <BreadCrumb step5 link={this.props.location.search === "?notification" ? "Notification Settings" : "Profile setting"} />

          </div>
          {isUpdated && (
            // <div className="app-pro2-swal">
            //   {/* <SweetAlert
            //     success
            //     confirmBtnText="Ok"
            //     confirmBtnBsStyle="success"
            //     onConfirm={this.hideAlert}
            //   >
            //     Account updated successfully.
            //   </SweetAlert> */}
            //   <SweetAlert title="" onConfirm={() => this.hideAlert()} showConfirm={true}>
            //     <img src={inviteIcon} alt="" />
            //     <h4>
            //       <strong>
            //         Account updated successfully.<br />
            //       </strong>
            //     </h4>

            //   </SweetAlert>
            // </div>
            <SuccessSweetAlert
              handleConfirm={() => this.hideAlert()}
              show={true}
              message={"Account updated successfully."}
            />
          )}
          <div className="mn_center p-0">
            {gettingResponse && (
              <div className="grid-loader">
                <Loader type="Grid" color="#00BFFF" height={100} width={100} />
              </div>
            )}
            {isAuthorized && (
              // <div className="app-pro2-swal">
              //   {/* <SweetAlert
              //     success
              //     confirmBtnText="Ok"
              //     confirmBtnBsStyle="success"
              //     onConfirm={this.hideNewAlert}
              //   >
              //     Account Successfully Authorized .
              //   </SweetAlert> */}
              //   <SweetAlert title="" onConfirm={this.hideNewAlert} showConfirm={true}>
              //     <img src={inviteIcon} alt="" />
              //     <h4>
              //       <strong>
              //         Account Successfully Authorized .<br />
              //       </strong>
              //     </h4>

              //   </SweetAlert>
              // </div>
              <SuccessSweetAlert
                handleConfirm={() => this.hideNewAlert()}
                show={true}
                message={"Account added successfully!"}
              />
            )}
            {isAccountRemove && (
              // <div className="app-pro2-swal">
              //   {/* <SweetAlert
              //     success
              //     confirmBtnText="Ok"
              //     confirmBtnBsStyle="delete"
              //     onConfirm={this.hideRemoveAlert}
              //   >
              //     Account Deleted .
              //   </SweetAlert> */}
              //   <SweetAlert title="" onConfirm={this.hideRemoveAlert} showConfirm={true}>
              //     <img src={inviteIcon} alt="" />
              //     <h4>
              //       <strong>
              //         Account Deleted .<br />
              //       </strong>
              //     </h4>

              //   </SweetAlert>
              // </div>
              <SuccessSweetAlert
                handleConfirm={() => this.hideRemoveAlert()}
                show={true}
                message={"Account deleted."}
              />
            )}

            <Modal isOpen={removeModal} style={customStyles} onRequestClose={this.closeModal}>
              <div className="modal-dialog" id="remove-payment-method-popup">
                <div className="modal-content">
                  <div className="modal-header">
                    <button type="button" className="close" onClick={this.closeModal}>
                      <span aria-hidden="true">×</span>
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
                      <button onClick={this.closeModal} type="button" className="btn btn-not-ban">
                        No
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </Modal>

            <Modal
              isOpen={this.state.modalIsOpen}
              onAfterOpen={this.afterOpenPaymentModal}
              onRequestClose={this.closePaymentModal}
              style={customStylesPayment}
              contentLabel="Example Modal"
            >
              <div className="add-payment-method-popup">
                <div className="modal-header">
                  <button
                    type="button"
                    className="close"
                    onClick={this.closePaymentModal}
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
                        <a
                          onClick={() =>
                            this.setState({ modalIsOpen: false, billing: true, info: false })
                          }
                        >
                          Clicking Here{" "}
                        </a>
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </Modal>
            <div className="">
              <div className="row custom_row">
                <div className="col-lg-2 col-md-2 col-sm-2 col-xs-2 p-0">
                  <div className="custom_sticky_container">
                    <div className="position-sticky">
                      <PMDashboardSideBar history={this.props.history} location={this.props.location} />
                    </div>
                  </div>
                </div>
                <div className="col-lg-10 col-md-10 col-sm-10 col-xs-10">
                  <div className="pro-right-content-area">
                    <div className="project-manager-all-page-equal-top-shifting settingpageBody">
                      <div className="empty-outline-box-for-project-manager-dashboard">
                        {
                          activeTab !== 'notification' && settingUserDetails && settingUserDetails.payment_method &&
                          <div className="col-md-12">
                            <ul style={{ listStyleType: "none" }} className="cloud-expert-dashboard-notification-list">
                              <li style={{ marginBottom: '5px', padding: '10px', background: '#fff' }}>
                                <div className="row ">
                                  <div className="col-md-11">
                                    <Link style={{ color: "red" }}>
                                      <i className="fa fa-bell"></i> Please add a Billing Method
                                    </Link>

                                  </div>
                                </div>
                                <div className="clearfix"></div>
                              </li>
                            </ul>
                          </div>
                        }
                        <div className="col-lg-3 col-md-4 col-sm-4 col-xs-12 bhoechie-tab-menu d-none">
                          <div className="list-group project_manager_setting_left_menu">
                            <Link
                              to={"#"}
                              id="info"
                              onClick={this.showASection}
                              className={`list-group-item ${info ? "active" : ""}`}
                            >
                              <i className="fa fa-info-circle" aria-hidden="true"></i> My Info
                            </Link>
                            <Link
                              to={"#"}
                              id="billing"
                              onClick={this.showASection}
                              className={`list-group-item ${billing ? "active" : ""}`}
                            >
                              <i className="fa fa-credit-card" aria-hidden="true"></i> Billing Method
                            </Link>
                            <Link
                              to={"#"}
                              id="passAndSec"
                              onClick={this.showASection}
                              className={`list-group-item ${passAndSec ? "active" : ""}`}
                            >
                              <i className="fa fa-lock" aria-hidden="true"></i> Password & Security
                            </Link>
                            <Link
                              to={"#"}
                              id="notification"
                              onClick={this.showASection}
                              className={`list-group-item ${notification ? "active" : ""}`}
                            >
                              <i className="fa fa-bell" aria-hidden="true"></i> Notification Settings
                            </Link>
                          </div>
                        </div>
                        {settingIsLoading || applicationIsLoading ? (
                          <div className="grid-loader">
                            <Loader type="Grid" color="#00BFFF" height={100} width={100} />
                          </div>
                        ) : (
                          <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12 bhoechie-tab">
                            {activeTab === "info" &&
                              <div>
                                <ul className="nav tabcustom job-tab" role="tablist">
                                  <li className={isActive == "account_details" ? "active" : ""}>
                                    <a
                                      href="#tab_default_1"
                                      id="account_details"
                                      onClick={this.showASectionTab}
                                      data-toggle="tab"
                                    >
                                      Account Details
                                    </a>
                                  </li>
                                  <li className={isActive == "security_details" ? "active" : ""}>
                                    <a
                                      href="#tab_default_2"
                                      id="security_details"
                                      onClick={this.showASectionTab}
                                      data-toggle="tab"
                                    >
                                      Security
                                    </a>
                                  </li>
                                  <li className={isActive == "billing_details" ? "active" : ""}>
                                    <a
                                      href="#tab_default_3"
                                      id="billing_details"
                                      onClick={this.showASectionTab}
                                      data-toggle="tab"
                                    >
                                      Billing
                                    </a>
                                  </li>
                                </ul>
                                <div className="tab-content">
                                  {isActive == "account_details" && (
                                    <div id="tab_default_1" className="mt-20">
                                      <div className="row">
                                        <div className="">
                                          <div className="tf_job_posting">
                                            <div className="mn_heading">
                                              <h5 className="info_number">Account</h5>
                                              <div className="pull-right">
                                                <Link onClick={this.handleEdit} name="accountEdit">
                                                  <img src={editImg} name="accountEdit" alt="edit" align="" />
                                                </Link>
                                              </div>
                                            </div>
                                            <div className="clearfix"></div>
                                            <div className="col-md-6 col-sm-12 p-0">
                                              <div className="row">
                                                <div className="col-md-6 col-sm-12">
                                                  <div className="tf_payment_info">
                                                    {!userImg ? (
                                                      <div className="avatar-upload">
                                                        <div className="avatar-edit">
                                                          <span><Avatar src={faceImg} color="#FFB4B6" round="50px" />
                                                            {accountEdit && (
                                                              <i
                                                                className="fa fa-pencil"
                                                                onClick={this.addUserImg}
                                                                aria-hidden="true"
                                                              ></i>
                                                            )}</span>

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
                                                  <input type="file" onChange={this.handleImage} name="userImg" id="user_Logo" />

                                                  {userImgTypeError &&
                                                    this.fieldError("You must upload an image in the given format.")}
                                                </div>
                                                <div className="col-md-6 col-sm-12">
                                                  {!accountEdit ? (
                                                    <div className="tf_payment_text px-4">
                                                      <div className="row">
                                                        <div className="col-md-12 col-sm-12">
                                                          <h4>Name</h4>
                                                          <p>
                                                            {firstName} {lastName}
                                                          </p>
                                                        </div>
                                                        <div className="col-md-12 col-sm-12">
                                                          <h4>Email</h4>
                                                          <p>{email}</p>
                                                        </div>
                                                        <div className="col-md-12 col-sm-12">
                                                          <h4>User Name</h4>
                                                          <p>{username}</p>
                                                        </div>
                                                      </div>
                                                    </div>
                                                  ) : (
                                                    <div className="setting-page-input">
                                                      <div className="col-md-12">
                                                        <div className="input-group">
                                                          <h4>Name </h4>
                                                          <div className="input-group-addon">
                                                            <img src={userLogo} alt="" />
                                                          </div>
                                                          <input
                                                            type="text"
                                                            className="form-control mn_input"
                                                            // ref={this.firstNameRef}
                                                            name="firstName"
                                                            id="firstName"
                                                            placeholder="First Name"
                                                            required
                                                            value={FullName}
                                                            // onBlur={this.handleError}
                                                            // onChange={this.handleChange}
                                                            disabled
                                                          />
                                                          {this.state.firstNameError && this.fieldError()}
                                                        </div>
                                                      </div>
                                                      {/* <div className="col-md-6">
                                                    <div className="input-group">
                                                      <h4>Last Name </h4>
                                                      <div className="input-group-addon">
                                                        <img src={userLogo} alt="" />
                                                      </div>
                                                      <input
                                                        type="text"
                                                        className="form-control mn_input"
                                                        ref={this.lastNameRef}
                                                        name="lastName"
                                                        id="lastName"
                                                        placeholder="Last Name"
                                                        onChange={this.handleChange}
                                                        required
                                                        value={lastName}
                                                        onBlur={this.handleError}
                                                      />
                                                      {this.state.lastNameError && this.fieldError()}
                                                    </div>
                                                  </div> */}
                                                      <div className="col-md-12">
                                                        <div className="input-group mn_top">
                                                          <h4>Email </h4>
                                                          <div className="input-group-addon">
                                                            <img src={emailLogo} alt="" />
                                                          </div>
                                                          <input
                                                            type="email"
                                                            className="form-control mn_input"
                                                            name="email"
                                                            // onChange={this.handleChange}
                                                            // ref={this.emailRef}
                                                            id="email"
                                                            placeholder="Work Email Address"
                                                            required
                                                            value={email}
                                                            disabled
                                                          // onBlur={this.handleError}
                                                          />
                                                          {this.state.emailError && this.fieldError("160")
                                                            ? this.state.emailError && this.fieldError("160")
                                                            : !this.state.emailPolicy &&
                                                            this.fieldError("160", "Email must contain '@' character.")}
                                                        </div>
                                                      </div>
                                                      <div className="col-md-12">
                                                        <div className="input-group mn_top">
                                                          <h4>User Name</h4>
                                                          <div className="input-group-addon">
                                                            <img src={userLogo} alt="" />
                                                          </div>
                                                          <input
                                                            type="text"
                                                            className="form-control mn_input"
                                                            name="username"
                                                            onChange={this.handleChange}
                                                            ref={this.usernameRef}
                                                            id="email"
                                                            placeholder="UserId"
                                                            required
                                                            value={username}
                                                          />
                                                          {this.state.usernameError && this.fieldError("180")}
                                                          {isUsernameTaken && this.fieldError("180", usernameErrorMessage)}
                                                        </div>
                                                      </div>

                                                    </div>
                                                  )}
                                                </div>
                                              </div>


                                            </div>

                                            <div className="col-md-6 col-sm-12 p-0">
                                              {!accountEdit ? (
                                                <div className="col-md-12">
                                                  <div className="row">
                                                    <div className="col-md-6 col-sm-12">
                                                      <div className="tf_payment_text tf_payment_text1">
                                                        <h4>Company Name</h4>
                                                        <p>{companyName ? companyName : "No information"}</p>
                                                      </div>
                                                    </div>
                                                    <div className="col-md-6 col-sm-12">
                                                      <div className="tf_payment_text tf_payment_text1">
                                                        <h4>Owner</h4>
                                                        <p>{ownerName ? ownerName : "No information"}</p>
                                                      </div>
                                                    </div>
                                                    <div className="col-md-6 col-sm-12">
                                                      <div className="tf_payment_text tf_payment_text1">
                                                        <h4>Phone</h4>
                                                        <p>{phone ? phone : "No information"}</p>
                                                      </div>
                                                    </div>
                                                    <div className="col-md-6 col-sm-12">
                                                      <div className="tf_payment_text tf_payment_text1">
                                                        <h4>VAT ID</h4>
                                                        <p>{vatId ? vatId : "No information"}</p>
                                                      </div>
                                                    </div>
                                                    <div className="col-md-6 col-sm-12">
                                                      <div className="tf_payment_text tf_payment_text1">
                                                        <h4>Address</h4>
                                                        <p>{companyAddress ? companyAddress : "No information"}</p>
                                                      </div>
                                                    </div>
                                                    <div className="col-md-6 col-sm-12">
                                                      <div className="tf_payment_text tf_payment_text1 ">
                                                        <h4>Time Zone</h4>
                                                        <p>{timeZone ? timeZone : "No information"}</p>
                                                      </div>
                                                    </div>
                                                  </div>

                                                </div>
                                              ) : (
                                                <div>
                                                  <div className="col-md-6">
                                                    <div className="input-group">
                                                      <h4>Company Name</h4>
                                                      <div className="input-group-addon">
                                                        <img src={userLogo} alt="userLogo" />
                                                      </div>
                                                      <input
                                                        type="text"
                                                        className="form-control mn_input"
                                                        name="companyName"
                                                        id="firstName"
                                                        placeholder="Company Name"
                                                        required
                                                        value={companyName}
                                                        onChange={this.handleChange}
                                                      />
                                                    </div>
                                                  </div>
                                                  <div className="col-md-6">
                                                    <div className="input-group">
                                                      <h4>Owner</h4>
                                                      <div className="input-group-addon">
                                                        <img src={userLogo} alt="userLogo" />
                                                      </div>

                                                      <input
                                                        type="text"
                                                        className="form-control mn_input"
                                                        name="ownerName"
                                                        id="firstName"
                                                        placeholder="Owner"
                                                        required
                                                        value={ownerName}
                                                        onChange={this.handleChange}
                                                      />
                                                    </div>
                                                  </div>

                                                  <div className="col-md-6">
                                                    <div className="input-group">
                                                      <h4>Phone</h4>
                                                      <PhoneInput
                                                        country
                                                        flags={flags}
                                                        placeholder="Enter Phone Number"
                                                        id="firstName"
                                                        name="phone"
                                                        value={phone}
                                                        onChange={this.handleNumberChange}
                                                        className="companyNumber"
                                                      />
                                                    </div>
                                                  </div>

                                                  <div className="col-md-6">
                                                    <div className="input-group">
                                                      <h4>VAT ID</h4>
                                                      <div className="input-group-addon">
                                                        <img src={userLogo} alt="userLogo" />
                                                      </div>
                                                      <input
                                                        type="text"
                                                        className="form-control mn_input"
                                                        name="vatId"
                                                        id="firstName"
                                                        placeholder="VAT ID"
                                                        required
                                                        value={vatId}
                                                        onChange={this.handleChange}
                                                      />
                                                    </div>
                                                  </div>

                                                  <div className="col-md-6">
                                                    <div className="input-group">
                                                      <h4>Address</h4>
                                                      <div className="input-group-addon">
                                                        <img src={userLogo} alt="userLogo" />
                                                      </div>
                                                      <input
                                                        type="text"
                                                        className="form-control mn_input"
                                                        name="companyAddress"
                                                        id="firstName"
                                                        placeholder="Address"
                                                        required
                                                        value={companyAddress}
                                                        onChange={this.handleChange}
                                                      />
                                                    </div>
                                                  </div>

                                                  <div className="col-md-6">
                                                    <div className="input-group">
                                                      <h4>Time Zone</h4>
                                                      <div className="input-group-addon">
                                                        <img src={userLogo} alt="userLogo" />
                                                      </div>
                                                      <TimezonePicker
                                                        value={timeZone}
                                                        onChange={this.handleTimeZoneChange}
                                                        inputProps={{
                                                          placeholder: "Timezone",
                                                          name: "timezone",
                                                          className:
                                                            "form-control mn_input project_manager_setting_timezone",
                                                        }}
                                                      />
                                                    </div>
                                                  </div>

                                                  {/* <div className="">
                                                  <div className=" edit-setting">
                                                    <div className="col-md-6">
                                                      <input
                                                        type="submit"
                                                        name="submit"
                                                        id="submit"
                                                        onClick={this.updateCompanyContract}
                                                        value="SAVE"
                                                        className="primary mn_button editSubmit-button"
                                                      />
                                                    </div>
                                                    <div className="col-md-6">
                                                      <Link
                                                        onClick={this.handleCancel}
                                                        name="isComapnyContractEdit"
                                                        className="tf_cancel"
                                                      >
                                                        CANCEL
                                                      </Link>
                                                    </div>
                                                  </div>
                                                </div> */}
                                                </div>
                                              )}
                                            </div>

                                            <div className="clearfix"></div>
                                            <div className="col-md-12 text-center mb-4 mt-2">
                                              {accountEdit &&
                                                <div className="edit-setting">
                                                  <div className="col-md-12">
                                                    {/* <input
                                                          type="submit"
                                                          name="submit"
                                                          id="submit"
                                                          onClick={this.updateAccountInfo}
                                                          value="SAVE"
                                                          className="primary mn_button editSubmit-button"
                                                        /> */}
                                                    <Link
                                                      onClick={this.updateAccountInfo}
                                                      name="submit"
                                                      className="btn-blue"
                                                    >
                                                      SAVE
                                                    </Link>
                                                    <Link
                                                      onClick={this.handleCancel}
                                                      name="accountEdit"
                                                      className="btn-black"
                                                    >
                                                      CANCEL
                                                    </Link>
                                                  </div>
                                                </div>
                                              }
                                            </div>
                                          </div>
                                        </div>

                                      </div>
                                    </div>
                                  )}
                                  {isActive == "security_details" && (
                                    <div id="tab_default_2" className="mt-20">
                                      <div className="">
                                        <div className="tf_job_posting">
                                          <div className="">
                                            <div className="mn_heading">
                                              <h5 className="info_number">
                                                {passwordEdit ? "Reset your password" : "Password"}
                                              </h5>
                                              <div className="pull-right">
                                                <a onClick={this.handleEdit} name="passwordEdit">
                                                  <img name="passwordEdit" src={editImg} alt="edit" align="" />
                                                </a>
                                              </div>
                                            </div>
                                            {passwordEdit ? (
                                              <div>
                                                <div className="tf-forgot-password">
                                                  <div className="col-md-12">
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
                                                      {this.state.currentPasswordError && this.fieldError()}
                                                    </div>
                                                  </div>
                                                  <div className="col-md-12">
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
                                                        ? this.state.newPasswordError && this.fieldError()
                                                        : !this.state.passwordPolicy &&
                                                        this.fieldError(
                                                          "Make sure it's at least 8 characters including a number, a lowercase & uppercase letter and a special character."
                                                        )}
                                                    </div>
                                                  </div>
                                                  <div className="col-md-12">
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
                                                      {this.state.confirmPasswordError && this.fieldError()}
                                                      {!this.state.isPassMatch &&
                                                        this.fieldError("Password does not match.")}
                                                    </div>
                                                  </div>
                                                  <div className="col-md-12 form-group edit-setting">
                                                    <div className="col-md-6">
                                                      <button
                                                        className="primary mn_button editSubmit-button"
                                                        onClick={this.updatePassword}
                                                      >
                                                        Save
                                                      </button>
                                                    </div>
                                                    <div className="col-md-6">
                                                      <a
                                                        onClick={this.handleCancel}
                                                        name="passwordEdit"
                                                        className="tf_cancel"
                                                      >
                                                        Cancel
                                                      </a>
                                                    </div>
                                                  </div>
                                                </div>
                                              </div>
                                            ) : (
                                              <div>
                                                <div className="clearfix"></div>
                                                <div className="col-md-12">
                                                  <div className="tf_payment_text tf_payment_text3">
                                                    <h4>
                                                      <i className="fa fa-check-circle" aria-hidden="true"></i> Password has been set
                                                    </h4>
                                                    <p>
                                                      Choose a strong, unique password that’s at least 8 characters
                                                      long.
                                                    </p>
                                                  </div>
                                                </div>
                                              </div>
                                            )}
                                          </div>
                                          <div className="tf_top">
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

                                                </div>
                                              </div>
                                              <div className="clearfix"></div>
                                              <div className="tf_payment_text tf_payment_text3">
                                                <h4>
                                                  <i className="fa fa-check-circle" aria-hidden="true"></i> Security
                                                  question has been enabled
                                                </h4>
                                                <p>
                                                  Confirm your identity with a question only you know the answer to.
                                                </p>
                                              </div>
                                              <div className="clearfix"></div>
                                              <hr />
                                            </div>
                                            <div className="col-md-12">
                                              <div className="tf_heading1">
                                                <h5 className="info_number">Security Question</h5>
                                                <div className="pull-right">
                                                  <a>
                                                    <img src={editImg} alt="edit" align="" />
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
                                          {/*this.state.isSecQuePopup &&
                                      <UpdateSecQus
                                        isOpen={this.state.isSecQuePopup}
                                        onClose={this.isSecQueUpdate}
                                      />*/}
                                        </div>
                                      </div>
                                    </div>
                                  )}
                                  {isActive == "billing_details" && (
                                    <div id="tab_default_3" className="mt-20">
                                      <div className="">
                                        <div className="tf_job_posting">


                                          <div className="">
                                            <div className="">
                                              <div className="mn_heading">
                                                <h5 className="info_number">Balance Due</h5>
                                              </div>
                                              <div className="clearfix"></div>
                                              <div className="col-md-12">
                                                <div className="tf_payment_text">
                                                  <h5>
                                                    Your balance due is <span>$100.00</span>
                                                  </h5>
                                                  <div className="tf_stg_btn_pay">
                                                    <a to={"#"} className="tf_invite_button2">
                                                      Pay Now
                                                    </a>
                                                  </div>
                                                </div>
                                              </div>
                                            </div>
                                            <div className="tf_bill tf_top">
                                              <div className="mn_heading pr-4">
                                                <h5 className="info_number">Billing Methods</h5>
                                                <div className="pull-right pe-auto">
                                                  <a name="isAddMethodModal" className="curserPointer" onClick={this.openPaymentModals}>
                                                    + Add Method
                                                  </a>
                                                </div>
                                              </div>
                                              <AddPaymentModal
                                                onOpen={this.state.isAddMethodModal}
                                                isPaypalAdded={hasPaypal}
                                                history={this.props.history}
                                                onClose={this.closePaymentModals}
                                              />
                                              <div className="clearfix"></div>
                                              <div className="row">
                                                {!isEmpty(settingUserDetails.payment_methods) ? (
                                                  settingUserDetails.payment_methods.map((payMethod, idx) => {
                                                    return (
                                                      <React.Fragment key={idx}>
                                                        <div className="col-md-12">
                                                          <div className="col-md-3">
                                                            <div className="tf_payment_text tf_payment_text2">
                                                              <img src={paypalImg} alt="" />
                                                            </div>
                                                          </div>
                                                          <div className="col-md-8 tf_payment_text">
                                                            <p>Email - {payMethod.email}</p>
                                                            <span>{payMethod.verified}</span>
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
                                                  <div className="tf_payment_text tf_payment_text2 mn_heading">
                                                    <h4>You have not set up any billing methods yet.</h4>
                                                    <p>
                                                      Set up your billing methods so you’ll be able to hire right away
                                                      when you’re ready.
                                                    </p>
                                                    <p>A 3% processing fee will be assessed on all payments.</p>
                                                  </div>
                                                )}
                                              </div>
                                              <div className="tf_continue">
                                                <Link onClick={this.Back} className="tf_invite_button2">
                                                  Skip This Step For Now
                                                </Link>
                                              </div>
                                            </div>
                                          </div>
                                        </div>
                                      </div>
                                    </div>
                                  )}

                                </div>
                              </div>
                            }
                            {

                              activeTab === 'billing' && (

                                <div className="bhoechie-tab-content active">
                                  <div className="tf_job_posting">
                                    <div className="mn_heading">
                                      <h5 className="info_number">Balance Due</h5>
                                    </div>
                                    <div className="clearfix"></div>
                                    <div className="col-md-12">
                                      <div className="tf_payment_text">
                                        <h5>
                                          Your balance due is <span>$100.00</span>
                                        </h5>
                                        <div className="tf_stg_btn_pay">
                                          <Link to={"#"} className="tf_invite_button2">
                                            Pay Now
                                          </Link>
                                        </div>
                                      </div>
                                    </div>
                                  </div>
                                  <div className="tf_job_posting tf_bill tf_top">
                                    <div className="mn_heading pr-4">
                                      <h5 className="info_number">Billing Methods</h5>
                                      <div className="pull-right">
                                        <Link name="isAddMethodModal" onClick={this.openPaymentModals}>
                                          + Add Method
                                        </Link>
                                      </div>
                                    </div>
                                    <AddPaymentModal
                                      onOpen={this.state.isAddMethodModal}
                                      isPaypalAdded={hasPaypal}
                                      history={this.props.history}
                                      onClose={this.closePaymentModals}
                                    />
                                    <div className="clearfix"></div>
                                    <div className="row">
                                      {!isEmpty(settingUserDetails.payment_methods) ? (
                                        settingUserDetails.payment_methods.map((payMethod, idx) => {
                                          return (
                                            <React.Fragment key={idx}>
                                              <div className="col-md-12">
                                                <div className="col-md-3">
                                                  <div className="tf_payment_text tf_payment_text2">
                                                    <img src={paypalImg} alt="" />
                                                  </div>
                                                </div>
                                                <div className="col-md-8 tf_payment_text">
                                                  <p>Email - {payMethod.email}</p>
                                                  <span>{payMethod.verified}</span>
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
                                        <div className="tf_payment_text tf_payment_text2 mn_heading">
                                          <h4>You have not set up any billing methods yet.</h4>
                                          <p>
                                            Set up your billing methods so you’ll be able to hire right away
                                            when you’re ready.
                                          </p>
                                          <p>A 3% processing fee will be assessed on all payments.</p>
                                        </div>
                                      )}
                                    </div>
                                    <div className="tf_continue">
                                      <Link onClick={this.Back} className="tf_invite_button2">
                                        Skip This Step For Now
                                      </Link>
                                    </div>
                                  </div>
                                </div>

                              )}
                            {activeTab === 'passAndSec' && (
                              <div className="bhoechie-tab-content active">
                                <div className="tf_job_posting">
                                  <div className="mn_heading">
                                    <h5 className="info_number">
                                      {passwordEdit ? "Reset your password" : "Password"}
                                    </h5>
                                    <div className="pull-right">
                                      <Link onClick={this.handleEdit} name="passwordEdit">
                                        <img name="passwordEdit" src={editImg} alt="edit" align="" />
                                      </Link>
                                    </div>
                                  </div>
                                  {passwordEdit ? (
                                    <div>
                                      <div className="tf-forgot-password">
                                        <div className="col-md-12">
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
                                            {this.state.currentPasswordError && this.fieldError()}
                                          </div>
                                        </div>
                                        <div className="col-md-12">
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
                                              ? this.state.newPasswordError && this.fieldError()
                                              : !this.state.passwordPolicy &&
                                              this.fieldError(
                                                "Make sure it's at least 8 characters including a number, a lowercase & uppercase letter and a special character."
                                              )}
                                          </div>
                                        </div>
                                        <div className="col-md-12">
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
                                            {this.state.confirmPasswordError && this.fieldError()}
                                            {!this.state.isPassMatch &&
                                              this.fieldError("Password does not match.")}
                                          </div>
                                        </div>
                                        <div className="col-md-12 form-group edit-setting">
                                          <div className="col-md-6">
                                            <button
                                              className="primary mn_button editSubmit-button"
                                              onClick={this.updatePassword}
                                            >
                                              Save
                                            </button>
                                          </div>
                                          <div className="col-md-6">
                                            <Link
                                              onClick={this.handleCancel}
                                              name="passwordEdit"
                                              className="tf_cancel"
                                            >
                                              Cancel
                                            </Link>
                                          </div>
                                        </div>
                                      </div>
                                    </div>
                                  ) : (
                                    <div>
                                      <div className="clearfix"></div>
                                      <div className="col-md-12">
                                        <div className="tf_payment_text tf_payment_text3">
                                          <h4>
                                            <i className="fa fa-check-circle" aria-hidden="true"></i> Password has been set
                                          </h4>
                                          <p>
                                            Choose a strong, unique password that’s at least 8 characters
                                            long.
                                          </p>
                                        </div>
                                      </div>
                                    </div>
                                  )}
                                </div>
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
                                        <Link onClick={this.isSecQueUpdate}>
                                          <img src={editImg} alt="" />
                                        </Link>

                                      </div>
                                    </div>
                                    <div className="clearfix"></div>
                                    <div className="tf_payment_text tf_payment_text3">
                                      <h4>
                                        <i className="fa fa-check-circle" aria-hidden="true"></i> Security
                                        question has been enabled
                                      </h4>
                                      <p>
                                        Confirm your identity with a question only you know the answer to.
                                      </p>
                                    </div>
                                    <div className="clearfix"></div>
                                    <hr />
                                  </div>
                                  <div className="col-md-12">
                                    <div className="tf_heading1">
                                      <h5 className="info_number">Security Question</h5>
                                      <div className="pull-right">
                                        <Link to={"#"}>
                                          <img src={editImg} alt="edit" align="" />
                                        </Link>
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
                                {/*this.state.isSecQuePopup &&
                                <UpdateSecQus
                                  isOpen={this.state.isSecQuePopup}
                                  onClose={this.isSecQueUpdate}
                                />*/}
                              </div>
                            )}

                            {activeTab === 'notification' && (
                              <NotificationSettingManager
                                location={this.props.location}
                                history={this.props.history}
                                notificationFirstTimeHandler={this.notificationFirstTimeHandler}
                                notificationFirstTime={this.state.notificationFirstTime}
                              />
                            )}


                          </div>
                        )}
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
const mapStateToProps = (state) => ({
  ...state,
})

const mapDispatchToProps = (dispatch) => {
  return {
    getCurrentUserDetails: () => dispatch(getCurrentUserDetails()),
    getSettingUserDetails: (id) => dispatch(getSettingUserDetails(id)),
    updateUser: (id, data) => dispatch(updateUser(id, data)),
    updatePMPassword: (id, data) => dispatch(updatePMPassword(id, data)),
    removePayMethod: (id) => dispatch(removePayMethod(id)),
    getToken: (token, id) => dispatch(getAuthPayPalToken(token, id)),
  }
}
export default connect(mapStateToProps, mapDispatchToProps)(Setting)
