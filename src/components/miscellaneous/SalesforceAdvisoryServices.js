import React, { Component } from "react";
import LandingPageHeader from '../miscellaneous/LandingPageHeader';
import NewHeader from "./NewHeader";
import Footer from '../miscellaneous/Footer';
import { Link } from "react-router-dom";
import ContactUsPopUp from "../miscellaneous/ContactUsPopUp"
import { isValidPhoneNumber } from 'react-phone-number-input'
import ReCAPTCHA from "react-google-recaptcha";
import { connect } from "react-redux";

import userLogo from '../../static/images/user.svg';
import passwordLogo from '../../static/images/password.svg';
import PhoneInput from 'react-phone-number-input'
import { talkToExpert } from '../../Actions/applicationActions';

import Salesforce_Implementation from "../../../src/static/images/salesforce/1/Salesforce_Implementation.png";
import Force_Com_Development from "../../../src/static/images/salesforce/1/Force_Com_Development.png";
import Analytics from "../../../src/static/images/salesforce/1/Analytics.png";
import Lightning_Experience from "../../../src/static/images/salesforce/1/Lightning_Experience.png";
import Migration from "../../../src/static/images/salesforce/1/Migration.png";
import Salesforce_Automation from "../../../src/static/images/salesforce/1/Salesforce_Automation.png";


import Sales_Service_Cloud from "../../../src/static/images/salesforce/2/Sales_Service_Cloud.png";
import App_Cloud from "../../../src/static/images/salesforce/2/App_Cloud.png";
import Community_Cloud from "../../../src/static/images/salesforce/2/Community_Cloud.png";
import Buildings_Apps_For_AppExchange from "../../../src/static/images/salesforce/2/Buildings_Apps_For_AppExchange.png";
import Einstein_Analytics from "../../../src/static/images/salesforce/2/Einstein_Analytics.png";
import Pardot from "../../../src/static/images/salesforce/2/Pardot.png";


import Ability from "../../../src/static/images/salesforce/3/Ability.png";
import Onsite from "../../../src/static/images/salesforce/3/Onsite.png";
import Salesforce from "../../../src/static/images/salesforce/3/Salesforce.png";
import Experience from "../../../src/static/images/salesforce/3/Experience.png";
import Agite from "../../../src/static/images/salesforce/3/Agite.png";
import Scale from "../../../src/static/images/salesforce/3/Scale.png";

import one from "../../../src/static/images/aws/one.png";
import two from "../../../src/static/images/aws/two.png";
import three from "../../../src/static/images/aws/three.png";
import 'react-phone-number-input/style.css';
import SuccessSweetAlert from "../CommonComponets/SweetAlert/SuccessSweetAlert";

function validateEmail(email) {
  var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  return re.test(String(email).toLowerCase())
}

function only_aplhabet_regex(val) {
  let reg = /^[a-zA-Z]*$/;
  return reg.test(String(val).toLowerCase())
}

class SalesforceAdvisoryServices extends Component {
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


  handleSignUpModal = () => {
    this.setState({ openSignUpModal: true })
  }

  closeSignUpModal = () => {
    this.setState({ openSignUpModal: false })
  }

  componentDidMount() {
    window.addEventListener('scroll', this.handleScroll)
  }

  UNSAFE_componentWillUnmount() {
    window.removeEventListener('scroll', this.handleScroll)
  }
  handleScroll(event) {
    if (window.scrollY <= 0 && this.state.scrolling) {
      this.setState({ scrolling: false })
    }
    else if (window.scrollY >= 0 && !this.state.scrolling) {
      this.setState({ scrolling: true })
    }
  }
  handleNewScroll(event) {
    let obj = document.getElementById('mn_project')
    if (obj) {
      obj.scrollIntoView()
    }
  }

  handleOPenModal = () => {
    this.setState({ openModal: true })
  }
  closeModal = () => {
    this.setState({ openModal: false })
  }

  handleChange = (e) => {
    this.setState({
      [e.target.name]: e.target.value, name_error: false, email_error: false, message_error: false, contact_error: false, companyName_error: false
    })
  }

  handleNumberChange = (e) => {
    console.log(e)
    this.setState({ contact: e, phoneNumberError: false })
  }

  handleSubmit = (e) => {
    e.preventDefault();
    const { name, companyName, message, contact, emailAddress } = this.state
    let words = (message.match(/\S+/g) || []).length
    const data = {
      name: name,
      company: companyName,
      message: message,
      contact: contact,
      email: emailAddress
    }


    if (name && contact && emailAddress && validateEmail(emailAddress) && words >= 5) {
      if (this.state.captchaVerified) {
        this.props.talkToExpert(data).then((res) => {
          // console.log("res",res)
          this.setState({ isApproved: true })
        })
      } else {
        this.setState({ captchaHide: false })
      }
    }
    else {
      const contactError = (contact ? (isValidPhoneNumber(contact) ? undefined : 'Invalid phone number') : '')

      this.setState({
        // captchaError: !this.state.captchaVerified,
        name_error: !name || !only_aplhabet_regex(name),
        contact_error: !contact && !contactError,
        companyName_error: !companyName,
        email_error: !emailAddress || !validateEmail(emailAddress),
        message_error: words < 5
      })
    }
  }

  captchaExpired = () => {
    this.setState({ captchaVerified: false, captchaError: true })
  }

  fieldError(margin, message) {
    // let {emailAddress} = this.state
    if (message === 'name') {
      return (<p className="error-field" >Required Field (chars only)</p>)
    }
    if (message === 'email') {
      return (<p className="error-field" >Enter valid email value</p>)
    }
    else if (message === 'contact') {
      return (<p className="error-field" >Enter valid contact value</p>)
    }
    else {
      return (<p className="error-field" >{message ? message : "This field can't be blank."}</p>)
    }
  }


  onChange = (value) => {
    if (value) {
      this.setState({ captchaVerified: true, captchaError: false })
    } else {
      this.setState({ captchaError: true })
    }
  }
  hideDetails = () => {
    this.setState({ isApproved: false })
    window.location.reload()
  }
  render() {
    const { emailAddress, name, contact, message, name_error, email_error, contact_error, message_error } = this.state;
    return (
      // Root Div start
      <div>
        <LandingPageHeader history={this.props.history} />
        <NewHeader history={this.props.history} />

        <div className="clearfix"></div>
        {this.state.isApproved &&
        
        // <div className="app-pro2-swal">
        //   <SweetAlert
        //     success
        //     title="Email Sent!"
        //     onConfirm={this.hideDetails}
        //   >
        //     We will contact you shortly.
        //   </SweetAlert>
        // </div>
          <SuccessSweetAlert
            show={true}
            handleConfirm={this.hideDetails}
            message={"We will contact you shortly."}
          />
        }

        <div className="salesforec-advisory-services-page page-header-top-margin">
          <div className="container">
            <div className="col-md-6">

              <h1 className="custom-height-for-transform">Leveraging the power of<br /> the Salesforce Platform to <br />transform your business.</h1>
              <div className="clearfix"></div>

              <div className="lets-talk-btn-container">
                <Link
                  onClick={(e) => { e.preventDefault(); this.handleSignUpModal() }}
                  className="">
                  <span className="Lets-talk-button">Let's Talk</span>
                </Link>
              </div>

            </div>
          </div>
        </div>


        <section className="aws-build-your-web-application">
          <div className="container">
            <div className="row">
              <div className="col-md-12">
                <h1 className="mb-15">Salesforce Advisory Services</h1>
              </div>
            </div>

            <div className="row">
              <div className="col-md-6">
                <p>Talfoundry is one of the leading Salesforce consulting companies with experience and expertise to drive Salesforce-powered digital transformation for your enterprise. Our consultants can help clients leverage the Salesforce platform effectively to innovate and create value from customer operations.</p>
              </div>
              <div className="col-md-6">
                <p>We use Salesforce products to transform businesses for the future by connecting disparate systems and taking manual work out of internal processes. Our next-generation strategies improve customer experience and employee productivity. We offer a variety of services and packages from general consulting, to system implementation, custom development and ongoing support.</p>
              </div>
            </div>
          </div>
        </section>

        <section className="getting-started-is-easy-section">
          <div className="container">
            <div className="row">
              <div className="col-md-12 text-center">
                <h1>Getting started is easy</h1>
              </div>
            </div>
            <div className="row">
              <div className="col-md-4 text-center">
                <div className="text-center">
                  <img src={one} className="one-two-three-image" alt="" />
                </div>
                <h3>First, we evaluate</h3>
                <p>We evaluate your Salesforce needs and propose engineers to join your team</p>
              </div>
              <div className="col-md-4 text-center">
                <div className="text-center">
                  <img src={two} className="one-two-three-image" alt="" />
                </div>
                <h3>Second, we onboard</h3>
                <p>We onboard your chosen Talfoundry Salesforce engineers to your team</p>
              </div>
              <div className="col-md-4 text-center">
                <div className="text-center">
                  <img src={three} className="one-two-three-image" alt="" />
                </div>
                <h3>Third, we oversee</h3>
                <p>We oversee your Talfoundry engineers and support you every step of the way</p>
              </div>
            </div>
          </div>
        </section>


        <section className="aws-key-point-section">
          <div className="container">
            {/* Row Start */}

            <ContactUsPopUp isOpen={this.state.openSignUpModal} closeModal={this.closeSignUpModal} history={this.props.history} />
            <div className="row">
              <div className="col-md-4">
                <div className="aws-key-point-section-outer-box">
                  <div className="aws-key-point-section-inner-box">
                    <div className="aws-key-point-left-icon">
                      <div className="aws-key-point-icon-container">
                        <img src={Salesforce_Implementation} className="aws-key-point-icon" alt="" />
                      </div>
                    </div>
                    <div className="aws-key-point-right-title-description">
                      <h3>Salesforce Implementation</h3>
                      <p>Experienced and certified salesforce consultants delivering solutions driving customer and business values.</p>
                      <Link>Learn More</Link>
                    </div>
                  </div>
                </div>
              </div>
              <div className="col-md-4">
                <div className="aws-key-point-section-outer-box">
                  <div className="aws-key-point-section-inner-box">
                    <div className="aws-key-point-left-icon">
                      <div className="aws-key-point-icon-container">
                        <img src={Force_Com_Development} className="aws-key-point-icon" alt="" />
                      </div>
                    </div>
                    <div className="aws-key-point-right-title-description">
                      <h3>Force.com Development</h3>
                      <p>Build apps for all your business divisions with the mobile first salesforce platform.</p>
                      <Link>Learn More</Link>
                    </div>
                  </div>
                </div>
              </div>
              <div className="col-md-4">
                <div className="aws-key-point-section-outer-box">
                  <div className="aws-key-point-section-inner-box">
                    <div className="aws-key-point-left-icon">
                      <div className="aws-key-point-icon-container">
                        <img src={Analytics} className="aws-key-point-icon" alt="" />
                      </div>
                    </div>
                    <div className="aws-key-point-right-title-description">
                      <h3>Analytics</h3>
                      <p>Advanced self-service analytics and reporting using Einstein Analytics Cloud</p>
                      <Link>Learn More</Link>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            {/* End Row */}

            {/* Row Start */}
            <div className="row">
              <div className="col-md-4">
                <div className="aws-key-point-section-outer-box">
                  <div className="aws-key-point-section-inner-box">
                    <div className="aws-key-point-left-icon">
                      <div className="aws-key-point-icon-container">
                        <img src={Lightning_Experience} className="aws-key-point-icon" alt="" />
                      </div>
                    </div>
                    <div className="aws-key-point-right-title-description">
                      <h3>Lightning Experience</h3>
                      <p>Enabling and migrating users to the new Salesforce lightning experience.</p>
                      <Link>Learn More</Link>
                    </div>
                  </div>
                </div>
              </div>
              <div className="col-md-4">
                <div className="aws-key-point-section-outer-box">
                  <div className="aws-key-point-section-inner-box">
                    <div className="aws-key-point-left-icon">
                      <div className="aws-key-point-icon-container">
                        <img src={Migration} className="aws-key-point-icon" alt="" />
                      </div>
                    </div>
                    <div className="aws-key-point-right-title-description">
                      <h3>Migration</h3>
                      <p>Data migration from your legacy on-premise application or cloud based SaaS to Salesforce platform.</p>
                      <Link>Learn More</Link>
                    </div>
                  </div>
                </div>
              </div>
              <div className="col-md-4">
                <div className="aws-key-point-section-outer-box">
                  <div className="aws-key-point-section-inner-box">
                    <div className="aws-key-point-left-icon">
                      <div className="aws-key-point-icon-container">
                        <img src={Salesforce_Automation} className="aws-key-point-icon" alt="" />
                      </div>
                    </div>
                    <div className="aws-key-point-right-title-description">
                      <h3>Salesforce Automation</h3>
                      <p>Enhance business process & improve productivity by complete automation using salesforce platform tools.</p>
                      <Link>Learn More</Link>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            {/* End Row */}

          </div>
        </section>

        <section className="our-salesforce-competencies-section">
          <div className="container">
            <div className="row">
              <div className="col-md-12">
                <h1 className="static-page-section-heading mb-40">Our Salesforce Competencies</h1>
              </div>
            </div>

            {/* Row Start */}
            <div className="row">
              <div className="col-md-4">
                <div className="aws-key-point-section-outer-box">
                  <div className="aws-key-point-section-inner-box">
                    <div className="aws-key-point-left-icon">
                      <div className="aws-key-point-icon-container">
                        <img src={Sales_Service_Cloud} className="aws-key-point-icon" alt="" />
                      </div>
                    </div>
                    <div className="aws-key-point-right-title-description">
                      <h3>Sales & Service Cloud</h3>
                      <p>Consulting & Implementation Administration Customization-Point & click and advanced coding Integration with other business applications</p>
                    </div>
                  </div>
                </div>
              </div>
              <div className="col-md-4">
                <div className="aws-key-point-section-outer-box">
                  <div className="aws-key-point-section-inner-box">
                    <div className="aws-key-point-left-icon">
                      <div className="aws-key-point-icon-container">
                        <img src={App_Cloud} className="aws-key-point-icon" alt="" />
                      </div>
                    </div>
                    <div className="aws-key-point-right-title-description">
                      <h3>App Cloud</h3>
                      <p>Designing custom app for Classic, Lightning and Salesforce) Integrating custom app with other Salesforce apps or externa) apptications.</p>
                    </div>
                  </div>
                </div>
              </div>
              <div className="col-md-4">
                <div className="aws-key-point-section-outer-box">
                  <div className="aws-key-point-section-inner-box">
                    <div className="aws-key-point-left-icon">
                      <div className="aws-key-point-icon-container">
                        <img src={Community_Cloud} className="aws-key-point-icon" alt="" />
                      </div>
                    </div>
                    <div className="aws-key-point-right-title-description">
                      <h3>Community Cloud</h3>
                      <p>Configure, develop, implement and manage your customer, employee & partner communities using community builder</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            {/* End Row */}

            {/* Row Start */}
            <div className="row">
              <div className="col-md-4">
                <div className="aws-key-point-section-outer-box">
                  <div className="aws-key-point-section-inner-box">
                    <div className="aws-key-point-left-icon">
                      <div className="aws-key-point-icon-container">
                        <img src={Buildings_Apps_For_AppExchange} className="aws-key-point-icon" alt="" />
                      </div>
                    </div>
                    <div className="aws-key-point-right-title-description">
                      <h3>Buildings apps for AppExchange</h3>
                      <p>Consulting, design and building apps on Force com while strictly adhering to Salesforce security review guidelines</p>
                    </div>
                  </div>
                </div>
              </div>
              <div className="col-md-4">
                <div className="aws-key-point-section-outer-box">
                  <div className="aws-key-point-section-inner-box">
                    <div className="aws-key-point-left-icon">
                      <div className="aws-key-point-icon-container">
                        <img src={Einstein_Analytics} className="aws-key-point-icon" alt="" />
                      </div>
                    </div>
                    <div className="aws-key-point-right-title-description">
                      <h3>Einstein Analytics</h3>
                      <p>Integrating with extemal data sources Building Datasets Creating customized dashboards</p>
                    </div>
                  </div>
                </div>
              </div>
              <div className="col-md-4">
                <div className="aws-key-point-section-outer-box">
                  <div className="aws-key-point-section-inner-box">
                    <div className="aws-key-point-left-icon">
                      <div className="aws-key-point-icon-container">
                        <img src={Pardot} className="aws-key-point-icon" alt="" />
                      </div>
                    </div>
                    <div className="aws-key-point-right-title-description">
                      <h3>Pardot</h3>
                      <p>Consulting and configuration User training and administration Integration services</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            {/* End Row */}


          </div>
        </section>

        <section className="aws-cloud-adoption-framework-section">
          <div className="container">
            <div className="row">
              <div className="col-md-12">
                <h1 className="static-page-section-heading mb-40 text-center">Why Talfoundry for Salesforce Consulting Services</h1>
              </div>
            </div>


            <div className="row">
              <div className="col-md-6">
                <p>Talfoundry is a Salesforce consulting partner equipped with certified & experienced resources to understand your unique business requirements and advice on best fit Salesforce solutions. We are committed to help you realize the true possibilities offered by Salesforce products and its platform to improve your business operations</p>
                <p>Talfoundry assists organizations to get all the benefits from Salesforce standard functionalities and also develop custom Salesforce applications using Force com to satisfy unique business requirements wherever the standard functionalities are inadequate.</p>
              </div>
              <div className="col-md-6">

                {/* Row Start */}
                <div className="row">
                  <div className="col-md-6">
                    <div className="aws-key-point-section-outer-box">
                      <div className="aws-key-point-section-inner-box">
                        <div className="aws-key-point-left-icon">
                          <div className="aws-key-point-icon-container">
                            <img src={Ability} className="aws-key-point-icon" alt="" />
                          </div>
                        </div>
                        <div className="aws-key-point-right-title-description">
                          <p>Ability to identify your business pain points and develop solutions to drive customer value</p>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="col-md-6">
                    <div className="aws-key-point-section-outer-box">
                      <div className="aws-key-point-section-inner-box">
                        <div className="aws-key-point-left-icon">
                          <div className="aws-key-point-icon-container">
                            <img src={Onsite} className="aws-key-point-icon" alt="" />
                          </div>
                        </div>
                        <div className="aws-key-point-right-title-description">
                          <p>Onsite offshore model offering you the arbitrage advantage, thereby delivering cost-effective solutions</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                {/* End Row */}


                {/* Row Start */}
                <div className="row">
                  <div className="col-md-6">
                    <div className="aws-key-point-section-outer-box">
                      <div className="aws-key-point-section-inner-box">
                        <div className="aws-key-point-left-icon">
                          <div className="aws-key-point-icon-container">
                            <img src={Salesforce} className="aws-key-point-icon" alt="" />
                          </div>
                        </div>
                        <div className="aws-key-point-right-title-description">
                          <p>Salesforce certified consultants and developers</p>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="col-md-6">
                    <div className="aws-key-point-section-outer-box">
                      <div className="aws-key-point-section-inner-box">
                        <div className="aws-key-point-left-icon">
                          <div className="aws-key-point-icon-container">
                            <img src={Experience} className="aws-key-point-icon" alt="" />
                          </div>
                        </div>
                        <div className="aws-key-point-right-title-description">
                          <p>Experience of working with leading and referenceable Salesforce ISVs</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                {/* End Row */}



                {/* Row Start */}
                <div className="row">
                  <div className="col-md-6">
                    <div className="aws-key-point-section-outer-box">
                      <div className="aws-key-point-section-inner-box">
                        <div className="aws-key-point-left-icon">
                          <div className="aws-key-point-icon-container">
                            <img src={Agite} className="aws-key-point-icon" alt="" />
                          </div>
                        </div>
                        <div className="aws-key-point-right-title-description">
                          <p>Agite, iterative, feedback based development to ensure continuous improvement</p>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="col-md-6">
                    <div className="aws-key-point-section-outer-box">
                      <div className="aws-key-point-section-inner-box">
                        <div className="aws-key-point-left-icon">
                          <div className="aws-key-point-icon-container">
                            <img src={Scale} className="aws-key-point-icon" alt="" />
                          </div>
                        </div>
                        <div className="aws-key-point-right-title-description">
                          <p>Scale u pscale down resources to fit your project requirements without any interference to production</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                {/* End Row */}


              </div>
            </div>


          </div>




        </section>

        <section className="aws-call-to-action-section">
          <div className="container">
            <div className="row">
              <div className="col-md-6">
                <h3 className="your-all-in-one">Your All-In-One</h3>
                <h2 className="aws-cloud-technology-partner">Salesforce Cloud Technology Partner</h2>
                <p className="forget-about-complex">Forget about complex Salesforce cloud migration processes and let our experienced team provide end-to-end consulting, guidance and collaboration to make a risk-free Salesforce cloud adoption.</p>
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
                          onChange={this.handleChange} value={name} />
                        {name_error && this.fieldError('0', 'name')}
                      </div>
                    </div>
                    <div className="col-md-6">
                      <div className="input-group">
                        <div className="input-group-addon">
                          <img src={passwordLogo} alt="" />
                        </div>
                        <input className="form-control" type="email" name="emailAddress"
                          placeholder="Work Email Address" onChange={this.handleChange} value={emailAddress} />
                        {email_error && this.fieldError('0', 'email')}

                      </div>
                    </div>

                    <div className="col-md-12">
                      <div className="input-group country-code-dropdown">
                        <PhoneInput
                          // country
                          defaultCountry="US"
                          placeholder="Phone Number"
                          id="firstName"
                          name="contact"
                          value={contact}
                          onChange={this.handleNumberChange}
                        />
                        {contact_error && this.fieldError('0', 'contact')}

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
                    <Link to={'#'} onClick={this.handleSubmit} className="tell-us-about-your-projects-button">Let's Talk</Link>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </section>

        {/* <Footer /> */}
      </div>
      // Root Div End
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

export default connect(mapStateToProps, mapDispatchToProps)(SalesforceAdvisoryServices)
