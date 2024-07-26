import React, {Component} from "react";
import { connect } from "react-redux";
import ReCAPTCHA from "react-google-recaptcha";
import Footer from '../miscellaneous/Footer';
import call_to_action from '../../../src/static/images/startup-image-1.jpg';
import complete_product from '../../../src/static/images/startup_product_engineering3.png';
import technology from '../../../src/static/images/startup-image-4new.png';
import vmlinuz from '../../../src/static/images/startup-image-2.png';
// import SignUpPopUpNew from "../miscellaneous/SignUpPopUpNew";
import {Link} from 'react-router-dom';
import { isValidPhoneNumber } from 'react-phone-number-input'
// import LoginPopUp from '../miscellaneous/LoginPopUP';
import PhoneInput from 'react-phone-number-input'
import {talkToExpert} from '../../Actions/applicationActions';
import LandingPageHeader from './LandingPageHeader';
import userLogo from '../../static/images/user.svg';
import passwordLogo from '../../static/images/password.svg';
import SuccessSweetAlert from "../CommonComponets/SweetAlert/SuccessSweetAlert";


function validateEmail(email) {
    var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(String(email).toLowerCase())
}

function only_aplhabet_regex(val){
    let reg = /^[a-zA-Z]*$/;
    return reg.test(String(val).toLowerCase())
}




class  StartupPartnership extends Component {
    constructor(props, context) {
        super(props, context)
        this.state = {
                scrolling: false,
                openModal: false,
                openSignUpModal: false,
                name: '',
                emailAddress: "",
                companyName: "",
                contact: "",
                message: "",
                captchaVerified: false,
                captchaError: false,
                phoneNumberError: false,
                isApproved: false,
                name_error: false,
                message_error: false,
                contact_error: false,
                email_error: false,
                companyName_error: false,
                captchaHide: true
            }
            this.handleScroll = this.handleScroll.bind(this)
        }


    componentDidMount() {
    window.addEventListener('scroll', this.handleScroll)
    }

    UNSAFE_componentWillUnmount() {
    window.removeEventListener('scroll', this.handleScroll)
    }
    handleScroll(event) {
    if (window.scrollY <= 0 && this.state.scrolling) {
        this.setState({scrolling: false})
    }
    else if (window.scrollY >= 0 && !this.state.scrolling) {
        this.setState({scrolling: true})
    }
    }
    handleNewScroll(event) {
    let obj = document.getElementById('mn_project')
    if(obj) {
        obj.scrollIntoView()
    }
    }

    handleOPenModal = () => {
    this.setState({openModal: true})
    }
    closeModal = () => {
    this.setState({openModal: false})
    }

    handleSignUpModal = () => {
    this.setState({openSignUpModal: true})
    }

    closeSignUpModal =() => {
    this.setState({openSignUpModal: false})
    }

    handleChange = (e) => {
    this.setState({
        [e.target.name]: e.target.value, name_error: false, email_error: false, message_error: false, contact_error: false ,companyName_error: false
    })
    }

    handleNumberChange = (e) => {
        console.log(e)
            this.setState({contact: e, phoneNumberError: false})
      }

    handleSubmit = (e) => {
        e.preventDefault();
        const {name, companyName, message, contact, emailAddress} = this.state
        let words = (message.match(/\S+/g) || [] ).length
        const data = {
            name: name,
            company: companyName,
            message: message,
            contact: contact,
            email: emailAddress
        }


        if(name && contact && emailAddress && validateEmail(emailAddress) &&  words >= 5) {
              if(this.state.captchaVerified) {
                this.props.talkToExpert(data).then((res) =>{
                    // console.log("res",res)
                    this.setState({isApproved: true})
                })
              }else{
                this.setState({captchaHide: false})
              }
        }else {
              const contactError = (contact ? (isValidPhoneNumber(contact) ? undefined : 'Invalid phone number') : '')

              this.setState({
                   // captchaError: !this.state.captchaVerified,
                   name_error: !name || !only_aplhabet_regex(name),
                   contact_error: !contact && !contactError,
                   companyName_error: !companyName,
                   email_error: !emailAddress  || !validateEmail(emailAddress),
                   message_error: words < 5
              })
        }
    }

    captchaExpired = () => {
    this.setState({captchaVerified: false, captchaError: true})
    }

    fieldError(margin, message) {
        // let {emailAddress} = this.state
        if(message === 'name'){
                return (<p className="error-field" >Required Field (chars only)</p>)
        }
        if(message === 'email'){
                return (<p className="error-field" >Enter valid email value</p>)
        }
        else if(message === 'contact'){
                return (<p className="error-field" >Enter valid contact value</p>)
        }
        else {
          return (<p className="error-field" >{message ? message : "This field can't be blank."}</p>)
        }
    }


  onChange = (value) => {
    if(value){
      this.setState({captchaVerified: true, captchaError: false})
    }else{
      this.setState({captchaError: true})
    }
  }
  hideDetails = () => {
      this.setState({ isApproved: false })
      window.location.reload()
  }

  render() {
      const {emailAddress, name, contact, message, name_error, email_error, contact_error, message_error} = this.state;
    return (
      <div>
        {this.state.isApproved &&
        //  <div className="app-pro2-swal">
        //                   <SweetAlert
        //                     success
        //                     title="Email Sent!"
        //                     onConfirm={this.hideDetails}
        //                   >
        //                     We will contact you shortly.
        //                   </SweetAlert>
        //                   </div>
                <SuccessSweetAlert
                    show={true}
                    handleConfirm={this.hideDetails}
                    message={"We will contact you shortly."}
                />
                          
                          }

        <LandingPageHeader history={this.props.history} />

                {/* <LoginPopUp isOpen={this.state.openModal} closeModal={this.closeModal} history={this.props.history}/> */}
                {/* <SignUpPopUpNew isOpen={this.state.openSignUpModal} closeModal={this.closeSignUpModal} history={this.props.history}/> */}

                <div className="clearfix"></div>
					<div className="clearfix"></div>

                    <div className="tf-press page-header-top-margin Startup-Partnership-Header-Background">
                        <div className="container">
                            <div className="col-md-12 page-header-top-margin">
                                <h1 className="custom-height-for-transform">Transform your product idea into reality</h1>
                                <h5>Turn your product idea into successful start-up</h5>
                                <div className="clearfix"></div>

                                <Link
                                    to={"#"}
                                    onClick={() => this.handleSignUpModal("")}
                                    style={{ color: "#fff" }}
                                >
                                    <div className="mail-to-container">
                                    <span className="tf-mail-to-button" to={"#"}>
                                        Get Started
                                    </span>
                                    </div>
                                </Link>


                            </div>
                        </div>
                    </div>


                    <div className="startup-partnership-main-container mn_center">

                            <div className="clearfix"></div>

                            <section id="technology-migration">
                                <div className="container">
                                    <div className="row">
                                        <div className="col-md-6">
                                            {/* <div className="vertical-content-center-box"> */}
                                            <h2 className="startup-partnership-page-heading"><span className="focus-keyword">Startup</span> Partnership
                                            </h2>
                                            <p>
                                            We are your one-stop platform that helps startups across the globe bring their products to life. Whether you’re a startup founder or a startup accelerator consultant looking for a trusted technical partner, we’re here for you.
                                                </p>
                                            {/* </div> */}
                                        </div>
                                        <div className="col-md-6">
                                            <img alt="img" className="startup-partnership-block-image startup-partnership-right-image" src={call_to_action}/>
                                        </div>
                                    </div>
                                </div>
                            </section>

                            <div className="clearfix"></div>

                            <section id="startup-offerings">
                                <div className="container">
                                    <div className="clearfix"></div>
                                    <div className="row">
                                        <div className="col-md-6">
                                            <img alt="img" className="startup-partnership-block-image startup-partnership-left-image" src={vmlinuz}/>
                                        </div>
                                        <div className="col-md-6">
                                            <div className="vertical-content-center-box">
                                                <h2><span className="focus-keyword">Product Advisory</span></h2>
                                                <p>Talfoundry offers guidance at every stage to conceptualize, validate and create customized
                                                    solutions according to your startup requirements and within your budgetary framework.</p>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </section>

                            <div className="clearfix"></div>

                            <section id="technology-migration">
                                <div className="container">
                                    <div className="row">
                                        <div className="col-md-6">
                                            <div className="vertical-content-center-box">
                                                <h2><span className="focus-keyword">Technology Migration / Re-engineering</span></h2>
                                                <p>We provide end-to-end solutions for seamless migration right from planning, installation and
                                                    verification, to customization, testing, data migration and support.</p>
                                            </div>
                                        </div>
                                        <div className="col-md-6">
                                            <img alt="img" className="startup-partnership-block-image startup-partnership-right-image" src={technology}/>
                                        </div>
                                    </div>
                                </div>
                            </section>

                            <div className="clearfix"></div>

                            <section id="complete-product-engineering">
                                <div className="container">
                                    <div className="row">
                                        <div className="col-md-6">
                                            <img alt="img" className="startup-partnership-block-image startup-partnership-left-image" src={complete_product}/>
                                        </div>
                                        <div className="col-md-6">
                                            <div className="vertical-content-center-box">
                                                <h2><span className="focus-keyword">Complete Product Engineering</span></h2>
                                                <p>Talfoundry provides complete lifecycle product engineering services for startups to design and
                                                    deploy scalable, maintainable and durable applications.</p>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </section>

                            <div className="clearfix"></div>

                            <section className="aws-call-to-action-section">
                                <div className="container">
                                    <div className="row">
                                        <div className="col-md-6">
                                            <h3 className="your-all-in-one">Your All-In-One</h3>
                                            <h2 className="aws-cloud-technology-partner">AWS Cloud Technology Partner</h2>
                                            <p className="forget-about-complex">Forget about complex AWS cloud migration processes and let our experienced team provide end-to-end consulting, guidance and collaboration to make a risk-free AWS cloud adoption.</p>
                                        </div>
                                        <div className="col-md-6">
                                            <form>

                                                <React.Fragment>
                                                  <div className="col-md-6 nopad-right">
                                                      <div className="input-group">
                                                      <div className="input-group-addon">
                                                          <img src={userLogo} alt="" />
                                                      </div>
                                                      <input className="form-control" type="text" name="name" placeholder="Name"
                                                          onChange={this.handleChange} value={name}/>
                                                      {name_error && this.fieldError('0','name')}
                                                      </div>
                                                  </div>
                                                  <div className="col-md-6">
                                                    <div className="input-group">
                                                      <div className="input-group-addon">
                                                          <img src={passwordLogo} alt="" />
                                                      </div>
                                                        <input className="form-control" type="email" name="emailAddress"
                                                            placeholder="Work Email Address" onChange={this.handleChange} value={emailAddress}/>
                                                        {email_error && this.fieldError('0','email')}

                                                    </div>
                                                  </div>

                                                  <div className="col-md-12">
                                                    <div className="input-group country-code-dropdown">
                                                        <PhoneInput
                                                            // country
                                                            defaultCountry="US"
                                                            placeholder="Phone Number"
                                                            id= "firstName"
                                                            name= "contact"
                                                            value={contact}
                                                            onChange={this.handleNumberChange}
                                                        />
                                                        {contact_error && this.fieldError('0','contact')}

                                                    </div>
                                                  </div>

                                                  <div className="col-md-12">
                                                    <div className="input-group">
                                                      <textarea name="message" value={message} onChange={this.handleChange} className="form-control" rows="4" placeholder="Message"></textarea>
                                                        {message_error && this.fieldError("190", "Please enter minimum 5 words")}

                                                    </div>
                                                  </div>
                                                  <div className="clearfix"></div>
                                                </React.Fragment>
                                              {!this.state.captchaHide &&
                                                <div className="row">
                                                    <div className="col-md-2"></div>
                                                    <div className="col-md-6">
                                                        <div className="recaptcha-container">
                                                        <ReCAPTCHA
                                                            sitekey="6LfwYeQZAAAAAKZQ2zp7wA8o24Wu_3-oa2zQf0PM"
                                                            // sitekey="6Le2cNEUAAAAAKcXPtpRfCCys7gyYDAjXeNbp8Cu"
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
                                                    <div className="col-md-3"></div>
                                                </div>
                                              }
                                                <div className="clearfix"></div>
                                                <div className="col-md-12">
                                                    <Link to={'#'} onClick= {this.handleSubmit} className="tell-us-about-your-projects-button">Let's Talk</Link>
                                                </div>
                                            </form>
                                        </div>
                                    </div>
                                </div>
                            </section>


                    </div>

        <Footer />
    </div>
    )
  }
}
const mapStateToProps = state => ({
    ...state
  })

  const mapDispatchToProps = (dispatch) => {
    return {
        talkToExpert: (data) => dispatch(talkToExpert(data))

    }
  }

export default connect(mapStateToProps, mapDispatchToProps)(StartupPartnership)
