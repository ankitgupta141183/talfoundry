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

// import key_Migration from "../../../src/static/images/aws/1-folder.png";
// import key_Application_Development from "../../../src/static/images/aws/2-web-design.png";
// import key_Deployment from "../../../src/static/images/aws/3-feature.png";
// import ket_Automation from "../../../src/static/images/aws/4-home.png";
// import key_Big_Data from "../../../src/static/images/aws/5-big-data.png";
// import key_Managed_Services from "../../../src/static/images/aws/6-customer-support-white.png";


import knowledge from "../../../src/static/images/awsms/knowledge.png";
import assistance from "../../../src/static/images/awsms/assistance.png";
import environment from "../../../src/static/images/awsms/environment.png";
import multiple from "../../../src/static/images/awsms/multiple.png";
import optimization from "../../../src/static/images/awsms/optimization.png";
import support from "../../../src/static/images/awsms/support.png";



import Computer from "../../../src/static/images/aws/Computer.png";
import Storage from "../../../src/static/images/aws/Storage.png";
import Dashboard from "../../../src/static/images/aws/Dashboard.png";
import Migration from "../../../src/static/images/aws/Migration.png";
import Networking_Content_Delivery from "../../../src/static/images/aws/Networking_Content_Delivery.png";
import Developer_Tools from "../../../src/static/images/aws/Developer_Tools.png";


import Management_Tools from "../../../src/static/images/aws/Management_Tools.png";
import Media_Services from "../../../src/static/images/aws/Media_Services.png";
import Security_Identity_Compliance from "../../../src/static/images/aws/Security_Identity_Compliance.png";
import Analytics from "../../../src/static/images/aws/Analytics.png";
import Machine_Learning from "../../../src/static/images/aws/Machine_Learning.png";
import Mobile_Services from "../../../src/static/images/aws/Mobile_Services.png";



import AR_VR from "../../../src/static/images/aws/AR_VR.png";
import Application_Integration from "../../../src/static/images/aws/Application_Integration.png";
import Customer_Engagement from "../../../src/static/images/aws/Customer_Engagement.png";
import Business_Productivity from "../../../src/static/images/aws/Business_Productivity.png";
import Desktop_App_Streaming from "../../../src/static/images/aws/Desktop_App_Streaming.png";
import Internet_of_Things from "../../../src/static/images/aws/Internet_of_Things.png";

import one from "../../../src/static/images/aws/one.png";
import two from "../../../src/static/images/aws/two.png";
import three from "../../../src/static/images/aws/three.png";



import cloud from "../../../src/static/images/aws-cloud-migration/1.png";
import code from "../../../src/static/images/aws-cloud-migration/2.png";
import cogs from "../../../src/static/images/aws-cloud-migration/3.png";
import aws from "../../../src/static/images/aws-cloud-migration/4.png";
import awsBanner from "../../../src/static/images/background/advisory-four.png"

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

class AwsAdvisoryServices extends Component {
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
        {/* <LandingPageHeader history={this.props.history} /> */}
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
        }W

        <div className="aws-advisory-services-page page-header-top-margin">
          <div className="container">
            <div className="">

              <h1 className="custom-height-for-transform">Begin your Digital<br /> Transformation moving to<br /> the AWS Cloud!</h1>
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
            <ContactUsPopUp isOpen={this.state.openSignUpModal} closeModal={this.closeSignUpModal} history={this.props.history} />
            <div className="row">
              <div className="col-md-12">
                <h1 className="mb-40">Build your web application with powerful <br />Amazon Web Services (AWS)</h1>
              </div>
            </div>


            <div className="row">
              <div className="col-md-7">
                <p>Talfoundry is a registered AWS Consulting Partner offering AWS consulting services with certified engineers and architects to help you with your migration projects. We help Startups, SMB, and Enterprises to modernize web applications adopting the AWS cloud by re-engineering current infrastructures into highly resilient and cloud-native environments. We embrace cutting-edge AWS Cloud practices including AWS Well-Architected framework, DevOps Agile  initiatives, and PCI/HIPAA Guidelines.</p>
              </div>
              <div className="col-md-5">
                <p>Our certified developers build secure, scalable and high performance applications. We deliver innovative solutions and transform complex experiences into products that customers love. We provide ongoing support to create, deliver strategies and manage solutions to maximize your investment through AWS services.</p>
              </div>
            </div>
          </div>
        </section>



        <section className="amazon-web-services-section">
          <div className="container">
            <div className="col-md-12 text-center">
              <h1><strong>Amazon Web Services (AWS) - our Offerings</strong></h1>
              <p className="empowering-txt mt-30 mb-30">Empowering digital businesses with secure, robust and innovation-led cloud computing solutions through AWS development. Leverage end-to-end cloud platform development services for enhancing productivity</p>
            </div>
            <div className="row">
              <div className="col-md-4">
                <div className="amazon-web-box">
                  <h3 className="mb-15"><strong>AWS Consulting</strong></h3>
                  <p>Comprehensive analysis of on-premise business processes to detect tech-related gaps and understanding risk of migrating existing digital process through amazon web services consulting.</p>
                </div>
              </div>
              <div className="col-md-4">
                <div className="amazon-web-box">
                  <h3 className="mb-15"><strong>AWS App Development</strong></h3>
                  <p>Craft high-performing, enterprise-grade and secure applications using smart AWS app development tools or upscale legacy apps to address business concerns and maximise profitability.</p>
                </div>
              </div>
              <div className="col-md-4">
                <div className="amazon-web-box">
                  <h3 className="mb-15"><strong>AWS Consulting</strong></h3>
                  <p>Migrate your on-premise business process to cloud with our cloud computing team using AWS tech stacks to build agile and secure digital solutions for a seamless transition.</p>
                </div>
              </div>
              <div className="col-md-4">
                <div className="amazon-web-box">
                  <h3 className="mb-15"><strong>Cloud Application Development</strong></h3>
                  <p>Leverage optimised platform solutions built by experience-led cloud app developers for complex businesses to realise the benefits of moving on-premise businesses to cloud.</p>
                </div>
              </div>
              <div className="col-md-4">
                <div className="amazon-web-box">
                  <h3 className="mb-15"><strong>DevOps</strong></h3>
                  <p>Dive into your cloud migration process and harness the power of amazon cloud development with unmatched DevOps skills for continuous delivery and feedback integration.</p>
                </div>
              </div>
              <div className="col-md-4">
                <div className="amazon-web-box">
                  <h3 className="mb-15"><strong>Monitoring, Management and Support</strong></h3>
                  <p>Seamlessly monitor your cloud space; manage workflow, sharing and collaboration with cloud stored data and receive round-the-clock assistance with cloud framework.</p>
                </div>
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
                <p>We evaluate your AWS needs and propose engineers to join your team</p>
              </div>
              <div className="col-md-4 text-center">
                <div className="text-center">
                  <img src={two} className="one-two-three-image" alt="" />
                </div>
                <h3>Second, we onboard</h3>
                <p>We onboard your chosen Talfoundry AWS engineers to your team</p>
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



        <section className="aws-managed-services">
          <div className="container">

            {/* Row Start */}
            <div className="row">
              <div className="col-md-12">
                <h2 className="text-center mb-40">How do we <strong>help</strong> you with our <strong>AWS Managed Services?</strong></h2>
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
                        <img src={knowledge} className="aws-key-point-icon" alt="" />
                      </div>
                    </div>
                    <div className="aws-key-point-right-title-description">
                      <p>We provide you with in-depth knowledge about AWS services, helping you to design, implement, deploy and maintain any application on AWS.</p>
                    </div>
                  </div>
                </div>
              </div>
              <div className="col-md-6">
                <div className="aws-key-point-section-outer-box">
                  <div className="aws-key-point-section-inner-box">
                    <div className="aws-key-point-left-icon">
                      <div className="aws-key-point-icon-container">
                        <img src={assistance} className="aws-key-point-icon" alt="" />
                      </div>
                    </div>
                    <div className="aws-key-point-right-title-description">
                      <p>We provide assistance to migrate and deploy any application on AWS.</p>
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
                        <img src={environment} className="aws-key-point-icon" alt="" />
                      </div>
                    </div>
                    <div className="aws-key-point-right-title-description">
                      <p>We implement AWS best practices for any kind of environment we create.</p>
                    </div>
                  </div>
                </div>
              </div>
              <div className="col-md-6">
                <div className="aws-key-point-section-outer-box">
                  <div className="aws-key-point-section-inner-box">
                    <div className="aws-key-point-left-icon">
                      <div className="aws-key-point-icon-container">
                        <img src={multiple} className="aws-key-point-icon" alt="" />
                      </div>
                    </div>
                    <div className="aws-key-point-right-title-description">
                      <p>We support multiple technology stacks for different applications and also Auto Scaling, Automation and Disaster Recovery. More availability zones and redundancy.</p>
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
                        <img src={optimization} className="aws-key-point-icon" alt="" />
                      </div>
                    </div>
                    <div className="aws-key-point-right-title-description">
                      <p>We follow the best AWS practices for security, optimization and high-availability applications.</p>
                    </div>
                  </div>
                </div>
              </div>
              <div className="col-md-6">
                <div className="aws-key-point-section-outer-box">
                  <div className="aws-key-point-section-inner-box">
                    <div className="aws-key-point-left-icon">
                      <div className="aws-key-point-icon-container">
                        <img src={support} className="aws-key-point-icon" alt="" />
                      </div>
                    </div>
                    <div className="aws-key-point-right-title-description">
                      <p>24/7 World Class Support</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            {/* End Row */}


          </div>
        </section>





        <section className="aws-services-list-section">
          <div className="container">
            <div className="row">
              <div className="col-md-4">
                <h3 className="left-heading">Our AWS Advisory</h3>
                <h3 className="left-heading">Services have experienced</h3>
                <h3 className="left-heading">professionals migrate,</h3>
                <h3 className="left-heading">deploy, monitor and</h3>
                <h3 className="left-heading">optimize AWS services for</h3>
                <h3 className="left-heading">your organization</h3>
              </div>
              <div className="col-md-8" id="services-list-description-divider">
                <div className="row">
                  <div className="col-md-2">
                    <div className="services-icon-container">
                      <img className="service-icon" src={Computer} alt="" />
                      <h3 className="service-name">Computer</h3>
                    </div>
                  </div>
                  <div className="col-md-2">
                    <div className="services-icon-container">
                      <img className="service-icon" src={Storage} alt="" />
                      <h3 className="service-name">Storage</h3>
                    </div>
                  </div>
                  <div className="col-md-2">
                    <div className="services-icon-container">
                      <img className="service-icon" src={Dashboard} alt="" />
                      <h3 className="service-name">Dashboard</h3>
                    </div>
                  </div>
                  <div className="col-md-2">
                    <div className="services-icon-container">
                      <img className="service-icon" src={Migration} alt="" />
                      <h3 className="service-name">Migration</h3>
                    </div>
                  </div>
                  <div className="col-md-2">
                    <div className="services-icon-container">
                      <img className="service-icon" src={Networking_Content_Delivery} alt="" />
                      <h3 className="service-name">Networking & Content Delivery</h3>
                    </div>
                  </div>
                  <div className="col-md-2">
                    <div className="services-icon-container">
                      <img className="service-icon" src={Developer_Tools} alt="" />
                      <h3 className="service-name">Developer Tools</h3>
                    </div>
                  </div>
                </div>

                <div className="row">
                  <div className="col-md-2">
                    <div className="services-icon-container">
                      <img className="service-icon" src={Management_Tools} alt="" />
                      <h3 className="service-name">Management Tools</h3>
                    </div>
                  </div>
                  <div className="col-md-2">
                    <div className="services-icon-container">
                      <img className="service-icon" src={Media_Services} alt="" />
                      <h3 className="service-name">Media Services</h3>
                    </div>
                  </div>
                  <div className="col-md-2">
                    <div className="services-icon-container">
                      <img className="service-icon" src={Security_Identity_Compliance} alt="" />
                      <h3 className="service-name">Security Identity & Compliance</h3>
                    </div>
                  </div>
                  <div className="col-md-2">
                    <div className="services-icon-container">
                      <img className="service-icon" src={Analytics} alt="" />
                      <h3 className="service-name">Analytics</h3>
                    </div>
                  </div>
                  <div className="col-md-2">
                    <div className="services-icon-container">
                      <img className="service-icon" src={Machine_Learning} alt="" />
                      <h3 className="service-name">Machine Learning</h3>
                    </div>
                  </div>
                  <div className="col-md-2">
                    <div className="services-icon-container">
                      <img className="service-icon" src={Mobile_Services} alt="" />
                      <h3 className="service-name">Mobile Services</h3>
                    </div>
                  </div>
                </div>


                <div className="row">
                  <div className="col-md-2">
                    <div className="services-icon-container">
                      <img className="service-icon" src={AR_VR} alt="" />
                      <h3 className="service-name">AR & VR</h3>
                    </div>
                  </div>
                  <div className="col-md-2">
                    <div className="services-icon-container">
                      <img className="service-icon" src={Application_Integration} alt="" />
                      <h3 className="service-name">Application Integration</h3>
                    </div>
                  </div>
                  <div className="col-md-2">
                    <div className="services-icon-container">
                      <img className="service-icon" src={Customer_Engagement} alt="" />
                      <h3 className="service-name">Customer Engagement</h3>
                    </div>
                  </div>
                  <div className="col-md-2">
                    <div className="services-icon-container">
                      <img className="service-icon" src={Business_Productivity} alt="" />
                      <h3 className="service-name">Business Productivity</h3>
                    </div>
                  </div>
                  <div className="col-md-2">
                    <div className="services-icon-container">
                      <img className="service-icon" src={Desktop_App_Streaming} alt="" />
                      <h3 className="service-name">Desktop & App Streaming</h3>
                    </div>
                  </div>
                  <div className="col-md-2">
                    <div className="services-icon-container">
                      <img className="service-icon" src={Internet_of_Things} alt="" />
                      <h3 className="service-name">Internet of Things</h3>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>


        </section>

        <section className="our-aws-cloud-migration-program-section">
          <div className="container">
            <div className="row">
              <div className="col-md-12">
                <h2 className="text-center">Our <strong>AWS</strong> Cloud Migration Program</h2>
                <h3 className="text-center mb-40">Program to <strong>Migrate to AWS</strong> and accelerate your Cloud transformation</h3>
              </div>
            </div>



            <div className="row">
              <div className="col-md-12">
                <ul id="step-bar">
                  <li>
                    <div className="title title-one">
                      <div className="title-text">
                        <span> Assessment <br />& Architecture</span>
                      </div>
                    </div>
                  </li>
                  <li>
                    <div className="title title-two">
                      <div className="title-text">
                        <span>Build Web<br /> Platform</span>
                      </div>
                    </div>
                  </li>
                  <li>
                    <div className="title title-three">
                      <div className="title-text">
                        <span>Innovation & <br />Automation (DevOps)</span>
                      </div>
                    </div>
                  </li>
                  <li>
                    <div className="title title-four">
                      <div className="title-text">
                        <span>AWS Managed <br />Services</span>
                      </div>
                    </div>
                  </li>

                </ul>
              </div>
            </div>

            <div className="row">
              <div className="col-md-3">
                <img src={cloud} alt="" />
                <ul>
                  <li><i className="fa fa-check" aria-hidden="true"></i> Cloud Assessment</li>
                  <li><i className="fa fa-check" aria-hidden="true"></i> AWS Architecture Design</li>
                  <li><i className="fa fa-check" aria-hidden="true"></i> Migration Strategy</li>
                </ul>
              </div>
              <div className="col-md-3">
                <img src={code} alt="" />
                <ul>
                  <li><i className="fa fa-check" aria-hidden="true"></i> Build AWS Infrastructure</li>
                  <li><i className="fa fa-check" aria-hidden="true"></i> Migrate Application Data</li>
                  <li><i className="fa fa-check" aria-hidden="true"></i> Transform your cloud-native application</li>
                  <li><i className="fa fa-check" aria-hidden="true"></i> AWS Well-Architected</li>
                </ul>
              </div>
              <div className="col-md-3">
                <img src={cogs} alt="" />
                <ul>
                  <li><i className="fa fa-check" aria-hidden="true"></i> Implement deployment processes, CI & CD</li>
                  <li><i className="fa fa-check" aria-hidden="true"></i> AWS Auto Scaling & Resiliency</li>
                  <li><i className="fa fa-check" aria-hidden="true"></i> AWS DevOps automated services</li>
                  <li><i className="fa fa-check" aria-hidden="true"></i> Docker & Microservices</li>
                </ul>
              </div>
              <div className="col-md-3">
                <img src={aws} alt="" />
                <ul>
                  <li><i className="fa fa-check" aria-hidden="true"></i> Continuous Security Compliance</li>
                  <li><i className="fa fa-check" aria-hidden="true"></i> Maintain Deployments & Releases</li>
                  <li><i className="fa fa-check" aria-hidden="true"></i> AWS Cost Optimization</li>
                  <li><i className="fa fa-check" aria-hidden="true"></i> AWS Troubleshooting & Support</li>
                </ul>
              </div>
            </div>
          </div>
        </section>

        <section className="aws-cloud-adoption-framework-section">
          <div className="container">
            <div className="row">
              <div className="col-md-12">
                <h1 className="text-center mb-40">The AWS Cloud Adoption Framework</h1>

                <div className="col-md-6">
                  <p>To guide your journey to the cloud, AWS Professional Services developed the AWS Cloud Adoption Framework (AWS CAF). The AWS CAF incorporates best practices and guidance learned through hundreds of in-depth customer engagements into a comprehensive framework for implementing cloud computing across your organization.</p>
                </div>
                <div className="col-md-6">
                  <p>The AWS CAF breaks down the process of planning your cloud migration into six manageable areas of focus called Perspectives. In general, the Business, People, and Governance Perspectives focus on business capabilities, and the Platform, Security, and Operations Perspectives focus on technical capabilities. These Perspectives help you identify gaps in skills, processes, and dependencies, then capture them into templates. The templates are the basis for creating an action plan to help guide change management efforts throughout your journey to the cloud.</p>
                </div>
              </div>
            </div>
          </div>
        </section>

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

export default connect(mapStateToProps, mapDispatchToProps)(AwsAdvisoryServices)
