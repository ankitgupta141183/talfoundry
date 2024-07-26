import React, { Component } from "react";
import { connect } from "react-redux";
import { LazyLoadImage } from 'react-lazy-load-image-component';
import 'react-lazy-load-image-component/src/effects/blur.css';
import userLogo from "../../static/images/user.svg";
import emailLogo from "../../static/images/email.svg";
// import countryList from "react-select-country-list";
import { addFirstStep, addSecondStep } from "../../Actions/signUpStepsActions";
import {
  loginAction,
  isAuthenticated,
  setCurrentUser,
} from "../../Actions/loginActions";
// import Modal from "react-modal";
import { signUpAction, submitOTP, sendOTP } from "../../Actions/signUpActions";
import csc from "country-state-city";
import earthLogo from "../../static/images/globe-earth.png";
import passwordLogo from "../../static/images/password.svg";
import Loader from "react-loader-spinner";
// import LoginPopUp from "../miscellaneous/LoginPopUP";
import { getProjectManagerRedirection } from "../../utills/formatting";
import LoginModelImage from "../../static/images/background/signUp3.svg";
import { OldSocialLogin as SocialLogin } from 'react-social-login'
import LandingPageHeader from "./LandingPageHeader";
// import Footer from "./Footer";

const customStyles = {
  content: {
    top: "50%",
    left: "50%",
    right: "auto",
    bottom: "auto",
    marginRight: "-50%",
    transform: "translate(-50%, -50%)",
    border: "none",
    // background            : 'transparent',
    // width                 : '60%',
    padding: "0px",
    borderRadius: "15px"
  },
};

const emailRegex = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

class SignUpPopUpNew extends Component {
  constructor(props, context) {
    super(props, context)
    this.state = {
      firstName: "",
      lastName: "",
      email: "",
      role: "Project Manager",
      countryId: "231",
      country: "United States",
      password: "",
      confirmPassword: null,
      passwordError: "",
      countryError: false,
      confirmPasswordError: "",
      firstNameError: false,
      lastNameError: false,
      emailError: false,
      emailPolicy: true,
      step1: true,
      step2: false,
      step3: false,
      freelancer: false,
      passwordPolicy: true,
      isLoading: false,
      step1Error: false,
      checkboxError: false,
      openModal: false,
      termsCheckBox: false,
      blockSignup: false,
      subcribe: false,
      subcribeError: false,
      checkType: false,
      social: '',
      message: '',
      socialData: ''
    }

    // this.countries = countryList().getData()
    this.allCountries = csc.getAllCountries()
  }
  componentDidMount() {
    if (this.props.location && this.props.location.state !== undefined) {
      this.setState({ role: this.props.location.state })
    }
  }

  handleOPenModal = () => {
    this.props.history.push("/login")
    // this.setState({ openModal: true })
    // this.props.closeModal()
  }

  closeModal = () => {
    this.setState({ openModal: false })
  }
  handleBack = (e) => {
    this.setState({ step2: false, step1: true })
  }
  handleNext = (e) => {
    e.preventDefault()
    let { firstName, lastName, email, emailError, emailPolicy } = this.state;

    if (
      firstName !== "" &&
      lastName !== "" &&
      email !== "" &&
      !emailError &&
      emailPolicy
    ) {
      this.setState({ step2: true, step1: false })
    } else {
      this.setState({
        firstNameError: firstName === "",
        lastNameError: lastName === "",
        emailError: email === "",
        emailPolicy: emailRegex.test(email),
      })
    }
  }

  handleCountryChange = (e) => {
    let index = e.target.selectedIndex;
    let optionElement = e.target.childNodes[index]
    this.setState({ countryId: optionElement.id, country: e.target.value })
  }

  handleChange = (e) => {
    let val = e.target.value;
    let name = e.target.name;
    // let { password, confirmPassword } = this.state;

    if ((name === "password" || name === "confirmPassword")) {
      this.handlePassWord()
    }
    if (!(name === "projectManager" || name === "Freelancer") && e.target) {
      this.setState({ [e.target.name]: e.target.value }, () => {
        if (val === "" && val.length === 0) {
          if (name === "firstName") {
            this.setState({
              firstNameError: true
            })
          }
          if (name === "lastName") {
            this.setState({
              lastNameError: true
            })
          }
          if (name === "email") {
            this.setState({
              emailError: true
            })
          }
          // e.target.name = e.target.name + "Error"
          // console.log("this is run " , Error);
          // this.setState({
          //   [e.target.name + 'Error'] : false,
          //   // emailPolicy: true,
          // })
        } else {
          if (name === "firstName") {
            this.setState({
              firstNameError: false
            })
          }
          if (name === "lastName") {
            this.setState({
              lastNameError: false
            })
          }
          if (name === "email") {
            this.setState({
              emailError: false
            })
          }
        }
        if (name === "email") {
          this.setState({ emailPolicy: emailRegex.test(val) })
        }
      })
    } else if ((e.target && name === "projectManager") || name === "Freelancer") {
      let role = name === "projectManager" ? "Project Manager" : "Freelancer";
      this.setState({ role: role }, () => { })
    }
  }

  handlePassWord = () => {
    let { password, confirmPassword } = this.state;

    let strongRegex = new RegExp(
      /^(?=.*[0-9])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{6,16}$/
    )

    if (password && !strongRegex.test(password)) {
      this.setState({ passwordPolicy: false, passwordError: false })
    }

    if (password && strongRegex.test(password)) {
      this.setState({ passwordPolicy: true })
    }

    if (password !== confirmPassword) {
      this.setState({ confirmPasswordError: false })
    }

    if (password === confirmPassword) {
      this.setState({ confirmPasswordError: true })
    }

  }


  handleCheckBox = (e) => {
    console.log("handleCheckBox")
    this.setState({
      termsCheckBox: e.target.checked,
      checkboxError: !e.target.checked,
    })
  }

  handleCheckBox1 = (e) => {
    this.setState({
      subcribe: e.target.checked,
      subcribeError: !e.target.checked,
    })
  }

  handleSubmit = (e) => {
    e.preventDefault()

    let {
      firstName,
      lastName,
      email,
      password,
      confirmPassword,
      role,
      emailError,
      emailPolicy,
      country,
      countryId,
      termsCheckBox,
      passwordError,
      confirmPasswordError,
      checkboxError,
      subcribe
    } = this.state;

    if (
      firstName !== "" &&
      lastName !== "" &&
      email !== "" &&
      !emailError &&
      emailPolicy
    ) {
      this.setState({ step2: true, step1: false })
    } else {
      this.setState({
        firstNameError: firstName === "",
        lastNameError: lastName === "",
        emailError: email === "",
        emailPolicy: emailRegex.test(email),
      })
    }

    if (
      firstName === "" &&
      lastName === "" &&
      email === "" &&
      password === "" &&
      confirmPassword === "" &&
      emailError &&
      emailPolicy
    ) {
      alert("error")
    }
    else {
      let submit = false;
      let strongRegex = new RegExp(
        /^(?=.*[0-9])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{6,16}$/
      )

      if (!termsCheckBox) {
        this.setState({ checkboxError: true })
      }
      if (!subcribe) {
        this.setState({ subcribeError: true })
      }

      if (password !== confirmPassword) {
        this.setState({ confirmPasswordError: true })
      }

      if (password === confirmPassword) {
        this.setState({ confirmPasswordError: false, passwordError: false })
        submit = true;
      }

      if (password === "") {
        this.setState({ passwordError: true })
      }

      if (!strongRegex.test(password)) {
        this.setState({ passwordPolicy: false })
      }

      // console.log('--',subcribe)
      if (submit && !passwordError && !confirmPasswordError && termsCheckBox && subcribe) {
        // console.log("==",subcribe )
        let formData = new FormData()

        formData.append("first_name", firstName)
        formData.append("last_name", lastName)
        formData.append("email", email)
        formData.append("password", password)
        formData.append("country", country)
        formData.append("role", role)
        formData.append("country_id", countryId)

        this.setState({ blockSignup: true })
        this.props
          .signUpAction(formData)
          .then((res) => {
            if (res.status === 201) {
              this.props.setCurrentUser(res.data)
              // this.setState({step3: true, step2: false})
              // uncomment this line once the phone verification twillio issue is resolved

              // comment below two lines once you have numbers registered on twilio
              this.setState({ step3: false, step2: false, blockSignup: false })

              if (res.data.role !== "Project Manager") {
                this.props.history.push({
                  pathname: `/confrim-your-email/${res.data.id}`,
                  state: this.props.signUpSteps.signUpStep1.email,
                })
              } else if (res.data.role === "Project Manager") {
                this.props
                  .loginAction({ email: email, password: password })
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
      }
    }
  }

  fieldError(margin, message) {
    return (
      <p id="firstName" className={`error-field ${message && margin !== "160" && "error-conditions-field"} `}>
        {message ? message : "This field can't be blank."}
      </p>
    )
  }

  selectCurrentCountry = (e) => {
    let countryId = e.target.options[e.target.selectedIndex].id;
    this.setState({
      country: e.target.value,
      countryId: countryId,
      countryError: false,
    })
  }


  sendOTP = () => {
    const { currentUser, sendOTP } = this.props;
    const data = {
      phone_number: this.state.phone,
      id: currentUser.id,
    }
    sendOTP(data).then((res) => {
      if (res.status === 200) {
        this.setState({ isOTPSent: true })
      } else {
        this.setState({
          phoneNumberError: true,
          phoneNumberErrorMessage: res.response.data.message,
        })
      }
    })
  }

  handleOTPChange = (e) => {
    this.setState({ OTP: e.target.value, isInvalidOTP: false })
  }

  submitOTP = (e) => {
    e.preventDefault()
    const { password } = this.props.signUpSteps.signUpStep2;
    const { email } = this.props.signUpSteps.signUpStep1;
    const data = {
      otp: this.state.OTP,
      phone: this.state.phone,
    }
    this.props.submitOTP(data).then((res) => {
      if (res.status === 200) {
        if (res.data.role === "Project Manager") {
          this.props
            .loginAction({ email: email, password: password })
            .then((res) => {
              if (res.status === 200) {
                this.props.history.push("/post-a-job-progress")
                localStorage.setItem("accessToken", res.data.token)
                this.props.isAuthenticated(true)
                this.props.setCurrentUser(res.data.user)
              } else if (res.status === 500) {
                alert("internal server error.")
              } else {
                this.setState({
                  invalidPassword: true,
                  invalidPasswordMessage: res.response.data.message,
                })
              }
            })
        } else {
          this.props.history.push({
            pathname: `/confrim-your-email/${res.data.id}`,
            state: this.props.signUpSteps.signUpStep1.email,
          })
        }
      } else {
        this.setState({
          isInvalidOTP: true,
          invalidOTPMessage: res.response.data.message[0],
        })
      }
    })
  }

  handleNumberChange = (e) => {
    this.setState({ phone: e, phoneNumberError: false })
  };

  handleSocialLogin = (user, err) => {
    // this.setState({checkType: true})

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
    const {
      firstName,
      lastName,
      email,
      country,
      password,
      confirmPassword,
      passwordError,
      confirmPasswordError,
      passwordPolicy,
      checkboxError,
      step2,
      openModal,
      firstNameError,
      lastNameError,
      emailError,
      emailPolicy,
      countryError,
      role,
      blockSignup,
      subcribeError
    } = this.state;
    const { applicationIsLoading, isOpen, history, closeModal } = this.props;
    console.log(this.allCountries , "handleCountryChange");
    return (
      <div>

        <LandingPageHeader history={this.props.history} />
        <div id="main-sign-uo-for-free-popup">
          <div className="pt-70" id="landing-page-login-popup">
            <div className="row d-flex h-100">
              <div className="col-md-6 px-xs-0 m-auto">
                <div className="w-80 m-auto">
                  <div className="h-100">
                    <div className="form-group mn_top px-0 mt-30">
                      <div className="i-want-to-option-select">
                        <div className="row">
                          <div className="col-md-6">
                            <a
                              href={"#"}
                              className={
                                role === "Project Manager" ? "active" : ""
                              }
                              id="projectManager"
                              name="projectManager"
                              onClick={this.handleChange}
                            >
                              Hire for Project
                            </a>

                          </div>
                          <div className="col-md-6">

                            <a
                              href={"#"}
                              className={role === "Freelancer" ? "active" : ""}
                              name="Freelancer"
                              id="Freelancer"
                              onClick={this.handleChange}
                            >
                              Work as a Cloud Expert
                            </a>

                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  <form className="sign-up-popup p-0">
                    <div className="col-md-12">
                      <div className="row">
                        <div className="col-md-6 col-sm-6 small-padding pl-0">
                          <div className="form-group px-0">
                            <div className="input-group">
                              <div className="input-group-addon">
                                <img src={userLogo} alt="" />
                              </div>
                              <input
                                type="text"
                                className="form-control mn_input"
                                name="firstName"
                                id="firstName"
                                placeholder="First Name"
                                required
                                value={firstName}
                                onChange={this.handleChange}
                              />
                              {firstNameError && this.fieldError("180")}
                            </div>
                          </div>
                        </div>
                        <div className="col-md-6 col-sm-6 small-padding pr-0">
                          <div className="form-group px-0">
                            <div className="input-group">
                              <div className="input-group-addon">
                                <img src={userLogo} alt="" />
                              </div>
                              <input
                                type="text"
                                className="form-control mn_input"
                                name="lastName"
                                id="lastName"
                                placeholder="Last Name"
                                onChange={this.handleChange}
                                required
                                value={lastName}
                              />
                              {lastNameError && this.fieldError("180")}
                            </div>
                          </div>
                        </div>
                      </div>
                      <div className="row">
                        <div className="col-md-12 px-0">
                          <div className="form-group px-0">
                            <div className="input-group mn_top">
                              <div className="input-group-addon">
                                <img src={emailLogo} alt="" />
                              </div>
                              <input
                                type="email"
                                className="form-control mn_input"
                                name="email"
                                onChange={this.handleChange}
                                id="email"
                                placeholder="Work Email Address"
                                required
                                value={email}
                              />
                              {emailError && this.fieldError("160")
                                ? emailError && this.fieldError("160")
                                : !emailPolicy &&
                                this.fieldError(
                                  "160",
                                  "Please enter a valid email"
                                )}
                            </div>
                          </div>
                        </div>
                      </div>




                      {/* {!step2 && (
                        <div className="row">
                          <div className="col-md-12">
                            <div className="form-group pb-0">
                              <input
                                type="submit"
                                name="submit"
                                id="submit"
                                onClick={this.handleNext}
                                value="Next"
                                className="btn btn-primary mn_button btn-pd"
                              />
                            </div>
                          </div>
                        </div>
                      )} */}

                    </div>
                    <div className="col-md-1"></div>
                  </form>


                  <div className=" no_shadow mn_border step-two-signup-form">
                    {!applicationIsLoading ? (
                      <form className="sign-up-popup" onSubmit={blockSignup ? '' : this.handleSubmit}>
                        <div className="row">
                          <div className="col-md-12 p-0">
                            <div className="row">
                              <div className="col-md-12 px-0">
                                <div className="form-group px-0">
                                  <div className="input-group">
                                    <div className="input-group-addon">
                                      <img src={earthLogo} alt="earthL" />
                                    </div>
                                    <div className="selectedwrap">
                                      <select
                                        className="form-control mn_input mySelectBoxClass"
                                        value={country.name}
                                        defaultValue={"United States"}
                                        onChange={this.handleCountryChange}
                                      >
                                        {this.allCountries.map((country, index) => {
                                          return (
                                            <option
                                              key={`year${index}`}
                                              id={country.id}
                                              value={country.name}
                                            >
                                              {country.name}
                                            </option>
                                          )
                                        })}
                                      </select>
                                      {countryError && this.fieldError("180")}
                                    </div>
                                  </div>
                                </div>
                              </div>
                              <div className="col-md-12 px-0">
                                <div className="form-group px-0">
                                  <div className="input-group">
                                    <div className="input-group-addon">
                                      <img src={passwordLogo} alt="passL" />
                                    </div>
                                    <input
                                      type="password"
                                      className="form-control mn_input"
                                      name="password"
                                      id="password"
                                      placeholder="● ● ● ● ● ● ● ● ●"
                                      required
                                      value={password}
                                      onChange={this.handleChange}
                                    />
                                    {passwordError && this.fieldError("180")
                                      ? passwordError && this.fieldError("180")
                                      : !passwordPolicy &&
                                      this.fieldError(
                                        "160",
                                        "Make sure it's at least 8 characters including a number, a lowercase & uppercase letter and a special character."
                                      )}
                                  </div>
                                </div>
                              </div>
                              <div className="col-md-12 px-0">
                                <div className="form-group px-0">
                                  <div className="input-group">
                                    <div className="input-group-addon">
                                      <img src={passwordLogo} alt="passL" />
                                    </div>
                                    <input
                                      type="password"
                                      className="form-control mn_input"
                                      id="confirmPassword"
                                      required
                                      name="confirmPassword"
                                      placeholder="Confirm Password"
                                      value={confirmPassword}
                                      onChange={this.handleChange}
                                    />
                                    {confirmPasswordError && <p className="error-field">
                                      Password doesn't match </p>}

                                  </div>
                                </div>
                              </div>
                            </div>

                          </div>



                          <div className="clearfix"></div>
                          <div className=" form-group5">
                            <div className="tf_sound tf_float1 mt-20">
                              <input
                                type="checkbox"
                                className="custom-control-input"
                                id="termsCheckBox"
                                name="termsCheckBox"
                                onChange={this.handleCheckBox}
                              />
                              <label htmlFor="termsCheckBox">
                                By signing up you agree to Talfoundry's{" "}
                                <a href={"/terms-of-Service"} > Terms of Service</a>  & &nbsp;
                                <a href={"/privacy-policy"}>Privacy Policy</a>.
                                Which outline your rights and obligations with respect to your use of the service and processing of your data
                              </label>
                            </div>
                            {checkboxError &&
                              this.fieldError(
                                "180",
                                "You must agree Talfoundry terms & conditions."
                              )}
                          </div>
                          <div className=" form-group5 pb-3">
                            <div className="tf_sound tf_float1 mt-10">
                              <input
                                type="checkbox"
                                className="custom-control-input"
                                id="subcribe"
                                name="subcribe"
                                onChange={this.handleCheckBox1}
                              />
                              <label htmlFor="subcribe">
                                You agree to receive subsequent email and third-party communication, which you may opt out of, or unsubscribe from, at any time.
                              </label>
                            </div>
                            {subcribeError &&
                              this.fieldError(
                                "180",
                                "Please check this checkbox."
                              )}
                          </div>
                          <i> Talfoundry is committed to protecting your data privacy. Permission is part of our continuing compliance efforts.</i>



                          <div className="form-group mb-0">
                            {/* <button className="previous_dark_btn" onClick={this.handleBack}>Previous</button> */}
                            <input
                              type="submit"
                              onClick={this.handleSubmit}
                              name="submit"
                              id="submit"
                              value="Sign Up"
                              className="btn btn-primary mn_button mn_top radius-btn"
                            />
                          </div>
                        </div>
                      </form>
                    ) : (
                      <div className="grid-loader-signup my-feed-loader col-md-12">
                        <Loader
                          type="Grid"
                          color="#00BFFF"
                          height={100}
                          width={100}
                        />
                      </div>
                    )}
                    <div className="clearfix"></div>
                  </div>

                  <div className="row">
                    <div className="col-md-12 divider">
                      <div className="text-center">
                        OR
                      </div>
                    </div>
                    <div className="col-md-12">
                      <div className="col-md-6 col-xs-6 px-0">
                        <button className="btn social-login-button">
                          <SocialLogin
                            provider='facebook'
                            appId='310320523400898'
                            callback={this.handleSocialLogin}
                          >
                            <i className="fa fa-facebook" aria-hidden="true"></i>
                          </SocialLogin>
                        </button>
                      </div>
                      <div className="col-md-6 col-xs-6 px-0">

                        <button className="btn social-login-button google-btn">
                          <SocialLogin
                            provider='google'
                            appId='800521809698-a40vmaas2grl8r33nvjl9p9debeb32br.apps.googleusercontent.com'
                            callback={this.handleSocialLogin}
                          >
                            <i className="fa fa-google" aria-hidden="true"></i>
                          </SocialLogin>
                        </button>
                      </div>
                    </div>
                  </div>
                  <div className="row">
                    <div className="col-md-12">
                      <div className="form-group">
                        Already have an account ? &nbsp;&nbsp;
                        <button
                          href={"#"}
                          onClick={() => this.handleOPenModal("")}
                          className="login_btn_signup"
                        >
                          Login
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="col-md-6 h-100">
                <div className="login-right-inner">
                  <LazyLoadImage
                    alt={"loginImage"}
                    src={LoginModelImage}
                    className='w-80'
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
        {/* </Modal> */}
        {/* <Footer /> */}
      </div>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    signUpStep1: state.signUpSteps.signUpStep1,
    signUpSteps: state.signUpSteps,
    currentUser: state.currentUser,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    signUpAction: (data) => dispatch(signUpAction(data)),
    submitOTP: (data) => dispatch(submitOTP(data)),
    loginAction: (data) => dispatch(loginAction(data)),
    addFirstStep: (data) => dispatch(addFirstStep(data)),
    addSecondStep: (data) => dispatch(addSecondStep(data)),
    isAuthenticated: (data) => dispatch(isAuthenticated(data)),
    setCurrentUser: (data) => dispatch(setCurrentUser(data)),
    sendOTP: (data) => dispatch(sendOTP(data)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(SignUpPopUpNew)
