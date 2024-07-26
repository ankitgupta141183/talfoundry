import React, { Component } from "react";
import { connect } from "react-redux";
import { LazyLoadImage } from 'react-lazy-load-image-component';
import 'react-lazy-load-image-component/src/effects/blur.css';
import userLogo from '../../static/images/user.svg';

import passwordLogo from '../../static/images/password.svg';
import { loginAction, isAuthenticated, setCurrentUser, socialLoginAction } from '../../Actions/loginActions';
import Modal from 'react-modal';
import PhoneInput from 'react-phone-number-input'
import { isEmpty } from 'lodash';
import ReCAPTCHA from "react-google-recaptcha";
import { submitOTP, sendOTP, signUpAction } from '../../Actions/signUpActions';
import ForgetPopUp from '../miscellaneous/ForgetPopUp'
import loadMoreSrc from "../../static/images/loadMore.gif";
import LoginModelImage from "../../static/images/background/login3.svg";
import { checkDeviceAuthorised } from '../../Actions/applicationActions';
import { getProjectManagerRedirection } from "../../utills/formatting";
import { OldSocialLogin as SocialLogin } from 'react-social-login'
import LandingPageHeader from "./LandingPageHeader";
// import Footer from '../miscellaneous/Footer';


const customStyles = {
  content: {
    top: '50%',
    left: '50%',
    right: 'auto',
    bottom: 'auto',
    marginRight: '-50%',
    transform: 'translate(-50%, -50%)',
    border: 'none',
    padding: '0px',
    borderRadius: "15px",
  }
}

class LoginPopUp extends Component {
  constructor(props, context) {
    super(props, context)
    this.state = this.initialState
  }

  get initialState() {
    return {
      emailError: false,
      invalidEmail: false,
      invalidEmailMessage: "",
      errors: [],
      openModal: false,
      emailConfirmed: false,
      emailConfirmationMessage: "",
      captchaVerified: false,
      captchaError: false,
      step2: false,
      step1: true,
      rememberMe: false,
      showMessage: true,
      loginLoading: false,
      checkType: false,
      role: "Project Manager",
      social: '',
      message: '',
      socialData: '',
      ResetEmailSender :false

    }
  }

  fieldError(margin, message) {
    return (<p className="error-field text-center" >{message ? message : "This field can't be blank."}</p>)
  }

  validateInput = (data) => {
    var filter = /^([\w-\.]+)@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.)|(([\w-]+\.)+))([a-zA-Z]{2,4}|[0-9]{1,3})(\]?)$/;
    let errors = {}
    let { email, password } = data;

    // Basic
    if (isEmpty(email)) {
      errors.email = 'Please enter your Email.';
    }
    if (!filter.test(email)) {
      errors.email = 'Email address is not valid.';
    }
    if (isEmpty(password)) {
      errors.password = 'Please enter your Password.';
    }
    return {
      errors,
      isValid: isEmpty(errors)
    }
  }

  isValid = () => {
    const { errors, isValid } = this.validateInput(this.state)

    if (!isValid) {
      this.setState({ errors })
    }

    return isValid;

  }

  handleError = (event) => {
    if (event.target.value === "") {
      let newState = Object.assign({}, this.state)
      newState.errors[event.target.name] = "This field can't be blank.";
      this.setState(newState)
    }
    this.setState({ [event.target.name]: event.target.value })
  }

  onSubmit = (event) => {
    this.setState({ loginLoading: true })
    event && event.preventDefault()
    if (this.state.captchaVerified) {
      if (this.isValid()) {
        var formData = new FormData()
        let { email, password, rememberMe } = this.state;
        formData.append("email", email)
        formData.append("password", password)
        formData.append("rememberMe", rememberMe)
        this.props.loginAction(formData)
          .then((res) => {
            this.setState({ loginLoading: false })
            if (res.status && res.status === 200) {
              var currentUser = res.data.user;
              currentUser.profile_id = res.data.profile_uuid;
              currentUser.profile_picture = res.data.profile_picture;
              localStorage.setItem('accessToken', res.data.token)
              this.props.isAuthenticated(true)
              this.props.setCurrentUser(currentUser)
              if (res.data.user.role === "Project Manager") {
                this.props.checkDeviceAuthorised().then(res => {
                  if (res) {
                    localStorage.security_check_required = res.security_check_required
                  }
                })
                if (res.data.user_job) {
                  this.props.history.push("/")


                }
                if (this.props.fromHireMe) {
                  this.props.history.push(`/user-profile/${this.props.freelancerId}`)
                }
                else if (!res.data.user_job) {
                  this.props.history.push("/post-a-job-progress")
                }
                else {
                  this.props.history.push("/")
                }
              }
              else if (res.data.user.role === "Freelancer") {
                this.props.checkDeviceAuthorised().then(res => {
                  if (res) {
                    localStorage.security_check_required = res.security_check_required
                  }
                })
                if (this.props.fromJobDetails) {
                  this.props.history.push(`/job-details/${this.props.jobId}`)
                }
                else if (res.data.user.professional_profile_created) {
                  this.props.history.push("/")
                }
                // else if(!res.data.user.professional_profile_created){
                //   this.props.history.push("/create-profile")
                // }
                else {
                  this.props.history.push({
                    pathname: '/get-started',
                    state: email
                  })
                }
              }

              else if (res.data.user.role === "Admin") {
                let wwww = JSON.stringify([{BreadCrumbName : "Home", link :"/"}])
                localStorage.setItem("BreadCrumb", wwww)
                this.props.history.push("/")
              }
              else if (res.data.user.role === "Coordinator" || res.data.user.role === "Support") {
                this.props.history.push("/")
              }


            } else if (res.response && res.response.status === 401) {
              this.setState({ invalidEmail: true, invalidEmailMessage: res.response.data.message, step2: false, step1: true })
            } else if (res.response && res.response.status === 403) {
              this.setState({ isPhoneInvalid: true })
              this.props.setCurrentUser(res.response.data)
              // this.setState({step1: false, step2: true})
              //  for now i have make the step 2 i.e. phone verification popup to not open
              this.setState({ step1: false, step2: false })

              this.props.history.push({
                pathname: `/confrim-your-email/${res.data.id}`,
                state: this.props.signUpSteps.signUpStep1.email
              })

            } else {
              alert("Internal server error, please try again later.")
            }
          })
      }
    } else {
      this.setState({ captchaError: true, loginLoading: false })
    }
  }

  handleChange = (e) => {
    // let val = e.target.value;
    let name = e.target.name;

    if ((e.target && name === "projectManager") || name === "Freelancer") {
      let role = name === "projectManager" ? "Project Manager" : "Freelancer";
      console.log('role', role)
      this.setState({ role: role })
    } else {
      let newState = Object.assign({}, this.state)
      newState.errors[e.target.name] = "";
      newState.invalidEmail = false
      this.setState(newState)
    }
    this.setState({ [e.target.name]: e.target.value })
  }

  handleOPenModal = () => {
    this.setState({ openModal: true })
    // this.props.closeModal()
  }
  closeModal = () => {
    this.setState({ openModal: false })
  }
  ResetPasswordEmailsender = () =>{
    this.setState({ResetEmailSender : true})
    setInterval(() => this.setState({ResetEmailSender : false}), 5000)
  }

  captchaExpired = () => {
    this.setState({ captchaVerified: false, captchaError: true })
  }

  onChange = (value) => {
    if (value) {
      this.setState({ captchaVerified: true, captchaError: false })
    } else {
      this.setState({ captchaError: true })
    }
  }

  sendOTP = () => {
    const { currentUser, sendOTP } = this.props;
    const data = {
      phone_number: this.state.phone,
      id: currentUser.id
    }
    sendOTP(data)
      .then((res) => {
        if (res.status === 200) {
          this.setState({ isOTPSent: true })
        } else {
          this.setState({ phoneNumberError: true, phoneNumberErrorMessage: res.response.data.message })
        }
      })
  }

  handleOTPChange = (e) => {
    this.setState({ OTP: e.target.value, isInvalidOTP: false })
  }

  setRemember = (e) => {
    if (e.target.checked) {
      this.setState({
        rememberMe: true
      })
    }
    else {
      this.setState({
        rememberMe: false
      })
    }
  }

  submitOTP = (e) => {
    e.preventDefault()
    const { email, password, rememberMe } = this.state;

    const data = {
      otp: this.state.OTP,
      phone: this.state.phone
    }
    this.props.submitOTP(data)
      .then((res) => {
        if (res.status === 200) {
          if (res.data.role === "Project Manager") {
            this.props.loginAction2({ email: email, password: password, rememberMe: rememberMe })
              .then((res) => {
                if (res.status === 200) {
                  this.props.history.push('/post-a-job-progress')
                  localStorage.setItem('accessToken', res.data.token)
                  this.props.isAuthenticated(true)
                  this.props.setCurrentUser(res.data.user)
                } else if (res.status === 500) {
                  alert("internal server error.")
                } else {
                  this.setState({ invalidPassword: true, invalidPasswordMessage: res.response.data.message })
                }
              })
          } else {
            this.onSubmit()
          }
        } else {
          this.setState({ isInvalidOTP: true, invalidOTPMessage: res.response.data.message })
        }
      })
  }

  handleNumberChange = (e) => {
    this.setState({ phone: e, phoneNumberError: false })
  }

  componentDidMount() {
    if (JSON.parse(localStorage.getItem('userData')) && JSON.parse(localStorage.getItem('userData')).email && JSON.parse(localStorage.getItem('userData')).email.length > 0) {
      this.setState({
        email: JSON.parse(localStorage.getItem('userData')).email,
        password: JSON.parse(localStorage.getItem('userData')).password,
        rememberMe: true
      })
    }

    setTimeout(
      function () {
        this.setState({ showMessage: false })
      }.bind(this),
      7000
    )

  }

  handleSocialLogin = (user, err) => {

    var userData = {}
    userData = {
      provider: user._provider,
      social_uid: user._profile.id,
      first_name: user._profile.firstName || '',
      last_name: user._profile.lastName || '',
      full_name: user._profile.name || '',
      email: user._profile.email || '',
      password: 'Talfoundry@123',
      role: this.state.role
    }

    this.setState({
      socialData: userData
    })

    this.props.socialLoginAction(userData)
      .then((res) => {
        this.setState({ loginLoading: false })

        if (res.status && res.status === 200) {

          if (res.data.new_user) {
            this.setState({ checkType: true })
            return false
          } else {

            var currentUser = res.data.user;
            currentUser.profile_id = res.data.profile_uuid;
            currentUser.profile_picture = res.data.profile_picture;
            localStorage.setItem('accessToken', res.data.token)
            this.props.isAuthenticated(true)
            this.props.setCurrentUser(currentUser)
            if (res.data.user.role === "Project Manager") {
              this.props.checkDeviceAuthorised().then(res => {
                if (res) {
                  localStorage.security_check_required = res.security_check_required
                }
              })
              if (res.data.user_job) {
                this.props.history.push("/")


              }
              if (this.props.fromHireMe) {
                this.props.history.push(`/user-profile/${this.props.freelancerId}`)
              }
              else if (!res.data.user_job) {
                this.props.history.push("/post-a-job-progress")
              }
              else {
                this.props.history.push("/")
              }
            }
            else if (res.data.user.role === "Freelancer") {
              this.props.checkDeviceAuthorised().then(res => {
                if (res) {
                  localStorage.security_check_required = res.security_check_required
                }
              })
              if (this.props.fromJobDetails) {
                this.props.history.push(`/job-details/${this.props.jobId}`)
              }
              else if (res.data.user.professional_profile_created) {
                this.props.history.push("/")
              }
              // else if(!res.data.user.professional_profile_created){
              //   this.props.history.push("/create-profile")
              // }
              else {
                this.props.history.push({
                  pathname: '/get-started',
                  state: userData.email
                })
              }
            }

            else if (res.data.user.role === "Admin") {
              this.props.history.push("/")
            }
            else if (res.data.user.role === "Coordinator" || res.data.user.role === "Support") {
              this.props.history.push("/")
            }

          }

        } else if (res.response && res.response.status === 401) {
          this.setState({ invalidEmail: true, invalidEmailMessage: res.response.data.message, step2: false, step1: true })
        } else if (res.response && res.response.status === 403) {
          this.setState({ isPhoneInvalid: true })
          this.props.setCurrentUser(res.response.data)
          // this.setState({step1: false, step2: true})
          //  for now i have make the step 2 i.e. phone verification popup to not open
          this.setState({ step1: false, step2: false })

          this.props.history.push({
            pathname: `/confrim-your-email/${res.data.id}`,
            state: this.props.signUpSteps.signUpStep1.email
          })

        } else {
          alert("Internal server error, please try again later.")
        }
      })
    // console.log(err)
  }

  closeSocialModal = () => {
    this.setState({ checkType: false })
  }

  onSocialSubmit = () => {
    // this.setState({checkType: true})
    var userData = {}
    userData = {
      provider: this.state.socialData.provider,
      social_uid: this.state.socialData.social_uid,
      first_name: this.state.socialData.first_name || '',
      last_name: this.state.socialData.last_name || '',
      email: this.state.socialData.email || '',
      password: 'Talfoundry@123',
      role: this.state.role
    }

    console.log("social", userData)
    // return false
    this.props
      .signUpAction(userData)
      .then((res) => {
        if (res.status === 201) {
          this.props.setCurrentUser(res.data)
          // this.setState({step3: true, step2: false})
          // uncomment this line once the phone verification twillio issue is resolved

          // comment below two lines once you have numbers registered on twilio
          this.setState({ step3: false, step2: false, blockSignup: false })

          if (res.data.role !== "Project Manager") {
            this.props.loginAction({ email: res.data.email, password: "Talfoundry@123" })
              .then((res) => {
                this.setState({ loginLoading: false })
                if (res.status && res.status === 200) {
                  var currentUser = res.data.user;
                  currentUser.profile_id = res.data.profile_uuid;
                  currentUser.profile_picture = res.data.profile_picture;
                  localStorage.setItem('accessToken', res.data.token)
                  this.props.isAuthenticated(true)
                  this.props.setCurrentUser(currentUser)

                  if (res.data.user.role === "Freelancer") {
                    this.props.checkDeviceAuthorised().then(res => {
                      if (res) {
                        localStorage.security_check_required = res.security_check_required
                      }
                    })
                    if (this.props.fromJobDetails) {
                      this.props.history.push(`/job-details/${this.props.jobId}`)
                    }
                    else if (res.data.user.professional_profile_created) {
                      this.props.history.push("/")
                    }
                    // else if(!res.data.user.professional_profile_created){
                    //   this.props.history.push("/create-profile")
                    // }
                    else {
                      this.props.history.push({
                        pathname: '/get-started',
                        state: res.data.email
                      })
                    }
                  }


                } else if (res.response && res.response.status === 401) {
                  this.setState({ invalidEmail: true, invalidEmailMessage: res.response.data.message, step2: false, step1: true })
                } else if (res.response && res.response.status === 403) {
                  this.setState({ isPhoneInvalid: true })
                  this.props.setCurrentUser(res.response.data)
                  // this.setState({step1: false, step2: true})
                  //  for now i have make the step 2 i.e. phone verification popup to not open
                  this.setState({ step1: false, step2: false })

                  this.props.history.push({
                    pathname: `/confrim-your-email/${res.data.id}`,
                    state: this.props.signUpSteps.signUpStep1.email
                  })

                } else {
                  alert("Internal server error, please try again later.")
                }
              })
          } else if (res.data.role === "Project Manager") {
            this.props
              .loginAction({ email: res.data.email, password: "Talfoundry@123" })
              .then((res) => {
                if (res.status === 200) {
                  // this.props.history.push("/post-a-job-progress")
                  localStorage.setItem("accessToken", res.data.token)
                  this.props.isAuthenticated(true)
                  this.props.setCurrentUser(res.data.user)

                  const { hasRedirection, path } = getProjectManagerRedirection(res.data.user)
                  if (hasRedirection) {
                    this.props.history.push(path)
                  }
                }
              })
          }
        } else if (res.response.status === 422) {
          alert(res.response.data.message[0])
        } else {
          alert("internal server error.")
        }
      })
      .catch((err) => {
        alert("internal server error")
      })
    // console.log(err)
  }

  render() {
    let { email, password, step1, step2, isOTPSent, OTP, phone,
      rememberMe, showMessage, loginLoading, role, ResetEmailSender } = this.state;
    console.log("social", this.state.social)
    // <LandingPageHeader />

    return (
      <div>
        {
          ResetEmailSender && <div className={`notificationModal bg-message -success`}>
          <div className="dialog">
            <div className="sub-modal">
              <h2 className="success-p">You will receive an email with instructions on how to reset your password in a few minutes.</h2>
            </div>
          </div>
        </div>
        }
        <LandingPageHeader history={this.props.history} />
        <div className="tf_admin_login">
          <ForgetPopUp isOpen={this.state.openModal} closeModal={this.closeModal} ResetPasswordEmailsender= {this.ResetPasswordEmailsender} history={this.props.history} />
          {/* <Modal isOpen={this.props.isOpen} style={customStyles}> */}

          {
            step1 &&
            <div id="landing-page-login-popup" className="pt-70 body_outer-screen">
              <div className="row justify-content-center h-100 vt-center">
                <div className="col-md-6 text-center" >
                  {/* <h1 className="popup-heading_login">Login</h1> */}
                  {showMessage && this.props.emailConfirmed &&
                    <p className="text-center mt-30" style={{ color: 'green' }}> Your email is confirmed </p>}

                  <p className="popup-sub-heading mt-30">Please enter your email and password to login</p>

                  <form name="adminLoginForm" className="w-80 m-auto border-radius-form" onSubmit={this.onSubmit}>
                    <div className="row">
                      <div className="col-md-12">
                        <div className="col-xs-12 col-sm-12 col-md-10 nopad float-none m-auto">
                          <div className="form-group">
                            {this.state.invalidEmail ? this.fieldError("190", this.state.invalidEmailMessage) : null}
                            <div className="input-group">
                              <div className="input-group-addon">
                                <img src={userLogo} alt="" />
                              </div>
                              <input type="email" placeholder="Enter Email" name="email" value={email} onChange={this.handleChange} onBlur={this.handleError} className="form-control" />
                              {(this.state.errors['email'] && this.fieldError("190")) ? this.state.errors['email'] && this.fieldError("190") :
                                null}
                            </div>
                          </div>
                        </div>
                        <div className="col-xs-12 col-sm-12 col-md-10 nopad float-none m-auto">
                          <div className="form-group">
                            <div className="input-group">
                              <div className="input-group-addon">
                                <img src={passwordLogo} alt="" />
                              </div>

                              <input type="password" placeholder="Enter Password" name="password" className="form-control" value={password} onChange={this.handleChange} onBlur={this.handleError} />
                              {(this.state.errors['password'] && this.fieldError("190")) ? this.state.errors['password'] && this.fieldError("190") :
                                null}
                            </div>
                          </div>
                        </div>
                        <div className="col-xs-12 col-sm-12 col-md-10 nopad float-none m-auto">
                          <div className="col-xs-6 col-sm-6 col-md-6 nopad">
                            <div className="remember-me-container">
                              <input className="remember-me-checkbox" defaultChecked={rememberMe} type="checkbox" name="check" onClick={this.setRemember} /> Remember Me
                            </div>
                          </div>
                          <div className="col-xs-6 col-sm-6 col-md-6 nopad">
                            <div className="forgot-password-container">
                              <a href={`#`} onClick={() => this.handleOPenModal("")} >Forgot Password?</a>
                            </div>
                          </div>
                        </div>
                      </div>

                      <div className="col-md-1">

                      </div>
                    </div>

                    <div className="clearfix"></div>
                    <div className="row">
                      <div className="col-md-9 float-none m-auto">
                        <div className="recaptcha-container">
                          <ReCAPTCHA
                            sitekey="6LfwYeQZAAAAAKZQ2zp7wA8o24Wu_3-oa2zQf0PM"
                            onChange={this.onChange}
                            onExpired={this.captchaExpired}
                            type="image"
                            hl="en"
                            tabindex="1"
                            className="recaptcha-inner-container"

                          />
                          {this.state.captchaError && this.fieldError("190", "Please verify the captcha")}
                        </div>
                      </div>
                      <div className="col-md-2"></div>
                    </div>
                    <div className="clearfix"></div>
                    <div className="row">
                      <div className="text-center">
                        <button type="submit" className="btn custom-login-button radius-btn">
                          Login
                        </button>

                        {loginLoading ?
                          <img src={loadMoreSrc} style={{ marginTop: '-120px', marginRight: '-240px' }} alt="" />
                          :
                          ''}
                      </div>

                    </div>
                  </form>
                  <div className="clearfix"></div>
                  <div className="row">
                    <div className="col-md-12">
                      <div className="text-center divider">
                        OR
                      </div>
                    </div>
                    <div className="col-md-12">
                      <div className="d-flex justify-content-center">
                        <SocialLogin
                          provider='facebook'
                          appId='310320523400898'
                          callback={this.handleSocialLogin}
                        >
                          <button className="btn social-login-button"> <i className="fa fa-facebook" aria-hidden="true"></i></button>
                        </SocialLogin>
                        <SocialLogin
                          provider='google'
                          appId='800521809698-a40vmaas2grl8r33nvjl9p9debeb32br.apps.googleusercontent.com'
                          callback={this.handleSocialLogin}
                        >
                          <button className="btn social-login-button google-btn"> <i className="fa fa-google" aria-hidden="true"></i> </button>
                        </SocialLogin>
                      </div>
                      {/* <div className="col-md-6 px-0">
                          <SocialLogin
                              provider='facebook'
                              appId='310320523400898'
                              callback={this.handleSocialLogin}
                            >
                            <button className="btn social-login-button"> <i className="fa fa-facebook" aria-hidden="true"></i></button>
                          </SocialLogin>
                        </div> */}
                      {/* <div className="col-md-6 px-0">
                          <SocialLogin
                            provider='google'
                            appId='800521809698-a40vmaas2grl8r33nvjl9p9debeb32br.apps.googleusercontent.com'
                            callback={this.handleSocialLogin}
                          >
                            <button className="btn social-login-button google-btn"> <i className="fa fa-google" aria-hidden="true"></i> </button>
                          </SocialLogin>
                        </div> */}
                    </div>




                  </div>
                </div>
                <div className="col-md-6 text-center login-right-section">
                  <div className="login-right-inner">
                    <LazyLoadImage
                      alt={"loginImage"}
                      src={LoginModelImage} // use normal <img> attributes as props
                      className='w-80 grey-seperator'
                    />
                  </div>
                </div>
              </div>
            </div>
          }

          {/* {step1 && 
          <div className=" landingPageloginPopupBox" id="">
            <div className="modal-header">
              <button type="button" className="close" onClick={this.props.closeModal} >
                <span aria-hidden="true">×</span><span className="sr-only">Close</span>
              </button>
              <h1 className="popup-heading_login">Login</h1>
            </div>

            <div className="">
              <div className="row d-flex justify-content-center">

                <div className="col-md-6">
                  <h1 className="popup-heading_login">Login</h1>
                  { showMessage && this.props.emailConfirmed &&
                    <p className="text-center mt-30" style={{color: 'green'}}> Your email is confirmed </p> }

                  <p className="popup-sub-heading mt-30">Please enter your email and password to login</p>

                  <form name="adminLoginForm" onSubmit={this.onSubmit}>
                    <div className="row">
                        <div className="col-md-12">
                          <div className="col-xs-12 col-sm-12 col-md-10 nopad float-none m-auto">
                              <div className="form-group">
                                {this.state.invalidEmail ? this.fieldError("190", this.state.invalidEmailMessage) : null}
                                <div className="input-group">
                                  <div className="input-group-addon">
                                    <img src={userLogo} alt="" />
                                  </div>
                                  <input type="email" placeholder="Enter Email" name="email"  value={email} onChange={this.handleChange} onBlur={this.handleError} className="form-control" />
                                  {(this.state.errors['email'] && this.fieldError("190")) ? this.state.errors['email'] && this.fieldError("190") :
                                  null}
                                </div>
                              </div>
                          </div>
                          <div className="col-xs-12 col-sm-12 col-md-10 nopad float-none m-auto">
                              <div className="form-group">
                                <div className="input-group">
                                    <div className="input-group-addon">
                                      <img src={passwordLogo} alt="" />
                                    </div>

                                    <input type="password" placeholder="Enter Password" name="password" className="form-control"  value={password} onChange={this.handleChange} onBlur={this.handleError} />
                                    {(this.state.errors['password'] && this.fieldError("190")) ? this.state.errors['password'] && this.fieldError("190") :
                                    null}
                                </div>
                              </div>
                          </div>
                          <div className="col-xs-12 col-sm-12 col-md-10 nopad float-none m-auto">
                              <div className="col-xs-6 col-sm-6 col-md-6 nopad">
                                  <div className="remember-me-container">
                                    <input className="remember-me-checkbox" defaultChecked ={rememberMe} type="checkbox" name="check" onClick={this.setRemember} /> Remember Me
                                  </div>
                              </div>
                                <div className="col-xs-6 col-sm-6 col-md-6 nopad">
                                  <div className="forgot-password-container">
                                    <a href={`#`} onClick={() => this.handleOPenModal("")} >Forgot Password?</a>
                                  </div>
                              </div>
                          </div>
                        </div>

                        <div className="col-md-1">

                        </div>
                    </div>

                    <div className="clearfix"></div>
                    <div className="row">
                      <div className="col-md-9 float-none m-auto">
                        <div className="recaptcha-container">
                          <ReCAPTCHA
                            sitekey="6LfwYeQZAAAAAKZQ2zp7wA8o24Wu_3-oa2zQf0PM"
                            onChange={this.onChange}
                            onExpired={this.captchaExpired}
                            type="image"
                            hl="en"
                            tabindex="1"
                            className="recaptcha-inner-container"

                          />
                          {this.state.captchaError && this.fieldError("190", "Please verify the captcha")}
                        </div>
                      </div>
                      <div className="col-md-2"></div>
                    </div>
                    <div className="clearfix"></div>
                    <div className="row">
                      <div className="text-center">
                        <button type="submit" className="btn custom-login-button">
                        Login
                        </button>

                        {loginLoading ?
                           <img src={loadMoreSrc} style={{ marginTop: '-120px' , marginRight: '-240px' }} alt=""/>
                          :
                        ''}
                      </div>

                    </div>
                  </form>
                    <div className="clearfix"></div>
                    <div className="row">
                      <div className="col-md-12">
                        <div className="text-center divider">
                          OR
                        </div>
                      </div>
                      <div className="col-md-12">
                        <div className="d-flex justify-content-center">
                           <SocialLogin
                              provider='facebook'
                              appId='310320523400898'
                              callback={this.handleSocialLogin}
                            >
                            <button className="btn social-login-button"> <i className="fa fa-facebook" aria-hidden="true"></i></button>
                          </SocialLogin>
                          <SocialLogin
                            provider='google'
                            appId='800521809698-a40vmaas2grl8r33nvjl9p9debeb32br.apps.googleusercontent.com'
                            callback={this.handleSocialLogin}
                          >
                            <button className="btn social-login-button google-btn"> <i className="fa fa-google" aria-hidden="true"></i> </button>
                          </SocialLogin>
                        </div>
                        <div className="col-md-6 px-0">
                          <SocialLogin
                              provider='facebook'
                              appId='310320523400898'
                              callback={this.handleSocialLogin}
                            >
                            <button className="btn social-login-button"> <i className="fa fa-facebook" aria-hidden="true"></i></button>
                          </SocialLogin>
                        </div>
                        <div className="col-md-6 px-0">
                          <SocialLogin
                            provider='google'
                            appId='800521809698-a40vmaas2grl8r33nvjl9p9debeb32br.apps.googleusercontent.com'
                            callback={this.handleSocialLogin}
                          >
                            <button className="btn social-login-button google-btn"> <i className="fa fa-google" aria-hidden="true"></i> </button>
                          </SocialLogin>
                        </div>
                      </div>
                    </div>

               </div>
               <div className="col-md-6 login-image-section">
                  <LazyLoadImage
                      alt={"loginImage"}
                      src={LoginModelImage} // use normal <img> attributes as props
                    />
               </div>
              </div>
            </div>
          </div>} */}
          {step2 && <div className="modal-dialog" id="landing-page-login-popup">
            <div className="mn_login mn_border step-two-signup-form">
              <div className="modal-header">
                <div className="col-lg-12 col-md-12">
                  <button type="button" className="close" onClick={this.props.closeModal} >
                    <span aria-hidden="true">×</span><span className="sr-only">Close</span>
                  </button>
                </div>
                <div className="clearfix"></div>
                <div className="col-md-12">
                  <h3 className="popup-heading second-step-main-heading">Please Verify Your Phone Number</h3>
                </div>
              </div>
              <form className="sign-up-popup">
                <div className="input-group">
                  <PhoneInput
                    // country
                    defaultCountry="US"
                    placeholder="Phone Number"
                    id="firstName"
                    name="phone"
                    value={phone}
                    onChange={this.handleNumberChange}
                  />
                  <a style={{ float: "right" }} onClick={this.sendOTP} href={`#`}>{isOTPSent ? "Resend OTP" : "Send OTP"}</a>
                  {this.state.phoneNumberError && this.fieldError("180", "Please enter a valid phone number.")}
                </div>
                {isOTPSent && <div><div className="row">
                  <p style={{ color: "#0DA4DE" }}>An OTP has been sent to {phone}</p>
                  <div className="col-md-12">
                    <div id="otp-holder">
                      <div id="otp-content">
                        <input id="otp-input" type="tel" maxlength="6" pattern="\d{6}" value={OTP} onChange={this.handleOTPChange} autocomplete="off" />
                      </div>
                    </div>
                    {this.state.isInvalidOTP && this.fieldError("180", "Invalid OTP! Please try again")}
                  </div>
                </div>
                  <div className="row">
                    <div className="col-md-12">
                      <div className="form-group">
                        <input type="submit" name="submit" id="submit" onClick={this.submitOTP} value="Submit" className="btn btn-primary mn_button" />
                      </div>
                    </div>
                  </div></div>}
              </form>
              <div className="clearfix"></div>
            </div></div>}
          {/* </Modal> */}
          <Modal isOpen={this.state.checkType} style={customStyles}>
            <div className="modal-dialog landingPageloginPopupBox afterLoginPopUp" id="landing-page-login-popup">
              <div className="modal-header mb-30">
                <button type="button" className="close" onClick={this.closeSocialModal} >
                  <span aria-hidden="true">×</span><span className="sr-only">Close</span>
                </button>
                <h1 className="popup-heading_login">Select A Role</h1>
              </div>

              <div className="modal-body">
                <div className="row">

                  <div className="col-md-6 pt-9 mt-40">
                    <h1 className="popup-heading_login"></h1>

                    <form name="adminLoginForm">
                      <div className="row">
                        <div className="col-md-12">
                          <div className="col-xs-12 col-sm-12 nopad float-none m-auto">
                            <div className="form-group mn_top">
                              <p>
                                <strong>I want to become:</strong>
                              </p>
                              <ul className="i-want-to-option-select">
                                <li>
                                  <a
                                    className={
                                      role === "Project Manager" ? "active" : ""
                                    }
                                    id="projectManager"
                                    name="projectManager"
                                    onClick={this.handleChange}
                                  >
                                    Hire for Project
                                  </a>
                                </li>
                                <li>
                                  <a
                                    className={role === "Freelancer" ? "active" : ""}
                                    name="Freelancer"
                                    id="Freelancer"
                                    onClick={this.handleChange}
                                  >
                                    Work as a Cloud Expert
                                  </a>
                                </li>
                              </ul>
                            </div>
                            <div>
                              <div className="text-center">
                                <input value="Submit" type="button" onClick={this.onSocialSubmit} className="btn custom-login-button" />
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </form>
                  </div>
                  <div className="col-md-6 login-image-section">
                    <LazyLoadImage
                      alt={"loginImage"}
                      src={LoginModelImage} // use normal <img> attributes as props
                    />
                  </div>
                </div>
              </div>
            </div>
          </Modal>
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
    loginAction: (data) => dispatch(loginAction(data)),
    socialLoginAction: (data) => dispatch(socialLoginAction(data)),
    signUpAction: (data) => dispatch(signUpAction(data)),
    isAuthenticated: (data) => dispatch(isAuthenticated(data)),
    setCurrentUser: (data) => dispatch(setCurrentUser(data)),
    submitOTP: (data) => dispatch(submitOTP(data)),
    sendOTP: (data) => dispatch(sendOTP(data)),
    checkDeviceAuthorised: () => dispatch(checkDeviceAuthorised()),
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(LoginPopUp)
