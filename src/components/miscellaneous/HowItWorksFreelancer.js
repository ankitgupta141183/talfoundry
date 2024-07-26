import React, { Component } from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import Header from '../miscellaneous/Header';
import LandingPageHeader from "./LandingPageHeader";
import Footer from "./Footer";
// import LoginPopUp from "./LoginPopUP";
// import SignUpPopUpNew from "./SignUpPopUpNew";

import HowitWorks from "./Pages/Manager/HowitWorks";
import Fees from "./Pages/Manager/Fees";
import UpgradingYourJobPost from "./Pages/Manager/UpgradingYourJobPost";
import AboutSecurity from "./Pages/Manager/AboutSecurity";
import SecurityQuestions from "./Pages/Manager/SecurityQuestions";
import CreateAccount from "./Pages/Manager/CreateAccount";
import ContactInformation from "./Pages/Manager/ContactInformation";
import ScreenName from "./Pages/Manager/ScreenName";
import EmailSettings from "./Pages/Manager/EmailSettings";
import ManageSecurityQuestions from "./Pages/Manager/ManageSecurityQuestions";
import Username from "./Pages/Manager/Username";
import Feedback from "./Pages/Manager/Feedback";
import Password from "./Pages/Manager/Password";
import PaymentMethods from "./Pages/Manager/PaymentMethods";
import BuildingTeam from "./Pages/Manager/BuildingTeam";
import HowtoPostJob from "./Pages/Manager/HowtoPostJob";
import FeaturedJobs from "./Pages/Manager/FeaturedJobs";
import JobStatus from "./Pages/Manager/JobStatus";
import EditJob from "./Pages/Manager/EditJob";
import StopReceivingQuotes from "./Pages/Manager/StopReceivingQuotes";
import UnsupportedJobs from "./Pages/Manager/UnsupportedJobs";
import AboutHireFreelancer from "./Pages/Manager/AboutHireFreelancer";
import SearchForFreelancers from "./Pages/Manager/SearchForFreelancers";
import FavoriteFreelancers from "./Pages/Manager/FavoriteFreelancers";
import GetaQuote from "./Pages/Manager/GetaQuote";
import AboutReviewQuotes from "./Pages/Manager/AboutReviewQuotes";
import ManageQuotes from "./Pages/Manager/ManageQuotes";
import DirectMessages from "./Pages/Manager/DirectMessages";
import JobQA from "./Pages/Manager/JobQA";
import HiringaFreelancer from "./Pages/Manager/HiringaFreelancer";
import Contract from "./Pages/Manager/Contract";
import EndYourContract from "./Pages/Manager/EndYourContract";
import AboutFeedback from "./Pages/Manager/AboutFeedback";

import HowitWorksF from "./Pages/Freelancer/HowitWorks";
import JobScreening from "./Pages/Freelancer/JobScreening";
import CreateAccountF from "./Pages/Freelancer/CreateAccount";
import AboutYourProfile from "./Pages/Freelancer/AboutYourProfile";
import ProfileOverview from "./Pages/Freelancer/ProfileOverview";
import Certifications from "./Pages/Freelancer/Certifications";
import Portfolio from "./Pages/Freelancer/Portfolio";
import ProfileVisibility from "./Pages/Freelancer/ProfileVisibility";
import FindingJobs from "./Pages/Freelancer/FindingJobs";
import AddtoFavorites from "./Pages/Freelancer/AddtoFavorites";
import Messages from "./Pages/Freelancer/Messages";
import Proposals from "./Pages/Freelancer/Proposals";
import SendProposals from "./Pages/Freelancer/SendProposals";


class HowItWorksFreelancer extends Component {
  constructor(props, context) {
    super(props, context);
    this.state = {
      openSignUpModal: false,
      path : '',
      hire: false,
      freelancer: false,
      mainPMTab: 1,
      childPMTab: 1,
      subChildPMTab: 1,
      mainFRTab: 1,
      childFRTab: 1,
      subChildFRTab: 1
    }
  }

  componentDidMount() {
      if(this.props.location.state){
        console.log(this.props.location , "this.props.location");
        this.setState({
            hire: this.props.location.state.hire,
            mainPMTab: this.props.location.state.mainPMTab,
            childPMTab: this.props.location.state.childPMTab,
            subChildPMTab: this.props.location.state.subChildPMTab,
            freelancer: this.props.location.state.freelancer,
            mainFRTab: this.props.location.state.mainFRTab,
            childFRTab: this.props.location.state.childFRTab,
            subChildFRTab: this.props.location.state.subChildFRTab
        })
      }
  }

  handleSignUpModal = () => {
    this.setState({ openSignUpModal: true });
  }

  closeSignUpModal = () => {
    this.setState({ openSignUpModal: false });
  }

  handleOPenModal = () => {
    this.setState({ openModal: true });
  }
  closeModal = () => {
    this.setState({ openModal: false });
  }

  showASection = (type) => {
    // console.log("event.target",type)
    if (type === "hire") {
      this.setState({
        hire: true,
        freelancer: false
      })
    }else{
      this.setState({
        hire: false,
        freelancer: true
      })
    }
  }

  mainPMTabFunc = (value) => {
    // console.log('mainPMTabFunc')
    if(this.state.mainPMTab === value){
      this.setState({mainPMTab: '', childPMTab: 1, subChildPMTab: 1})
    }else{
      this.setState({mainPMTab: value, childPMTab: 1, subChildPMTab: 1})
    }
  }
  childPMTabFunc = (value) => {
    // console.log('childPMTabFunc')
    if(this.state.childPMTab === value){
      this.setState({childPMTab: '', subChildPMTab: 1})
    }else{
      this.setState({childPMTab: value, subChildPMTab: 1})
    }
  }
  subChildPMTabFunc = (value) => {
    // console.log('subChildPMTab')
      this.setState({subChildPMTab: value})
  }

  mainFRTabFunc = (value) => {
    // console.log('mainFRTabFunc')
    if(this.state.mainFRTab === value){
      this.setState({mainFRTab: '', childFRTab: 1, subChildFRTab: 1})
    }else{
      this.setState({mainFRTab: value, childFRTab: 1, subChildFRTab: 1})
    }
  }
  childFRTabFunc = (value) => {
    // console.log('childFRTabFunc')
    if(this.state.childFRTab === value){
      this.setState({childFRTab: '', subChildFRTab: 1})
    }else{
      this.setState({childFRTab: value, subChildFRTab: 1})
    }
  }
  subChildFRTabFunc = (value) => {
    // console.log('subChildFRTab')
      this.setState({subChildFRTab: value})
  }

  render() {
    // console.log('=======',this.state.path)
    const {mainPMTab, childPMTab, subChildPMTab, mainFRTab, childFRTab, subChildFRTab} = this.state
    return (
      <div>
        {/* <LoginPopUp
          isOpen={this.state.openModal}
          closeModal={this.closeModal}
          history={this.props.history}
        /> */}
        {this.props.isAuthenticated ?
          <Header history={this.props.history} />
          :
          <LandingPageHeader history={this.props.history} />
        }
        {/* <SignUpPopUpNew
          isOpen={this.state.openSignUpModal}
          closeModal={this.closeSignUpModal}
          history={this.props.history}
        /> */}

        <div className="clearfix"></div>

        <div className="tf-press page-header-top-margin">
          <div className="container">
            <div className="col-md-12">
              <h1>How It Works </h1>

              <h5>
                A Quick Glimpse of How Hiring and Freelancing Works ongh
                TalFoundry
              </h5>
              <div className="clearfix"></div>

              <Link
                to={"#"}
                onClick={() => !this.props.isAuthenticated && this.handleSignUpModal("")}
                style={{ color: "#fff" }}
              >
                <div className="mail-to-container">
                  <span className="tf-mail-to-button" to={"#"}>
                    Get Started
                  </span>
                </div>
              </Link>

              <div className="clearfix"></div>
            </div>
          </div>
        </div>


        <div className="clearfix"></div>
        
          <div className="tf_services">
            <div className="invite_freelancer white-background-color" id="how-it-works-page">
              <div className="container">
                <ul className="nav nav-tabs" role="tablist" id="manager-freelancer-faq-tabs">
                  <li role="presentation" className={this.state.hire ? "active": ""}>
                    <a
                      href="#hiring"
                      aria-controls="hiring"
                      role="tab"
                      data-toggle="tab"
                      aria-expanded="true"
                      onClick={() => this.showASection('hire')}
                    >
                      If you’re hiring
                    </a>
                  </li>
                  <li role="presentation" className={this.state.freelancer ? "active": ""}>
                    <a
                      href="#freelancing"
                      aria-controls="freelancing"
                      role="tab"
                      data-toggle="tab"
                      aria-expanded="true"
                      onClick={() => this.showASection('freelancer')}
                    >
                      If you’re freelancing
                    </a>
                  </li>
                </ul>
              </div>
            </div>

            
              <div className="tab-content tf_home howCanHelpbody">
                <div role="tabpanel" className={this.state.hire ? "tab-pane active" : "tab-pane"} id="hiring">
                  <div className="container pt-5">
                    
                    
                    <div className="row">
                      
                    <div className="col-md-3 pl-0">
                      <div className="navbar navbar-fixed-left keep-open howCanHelpSideNavBar ">
                        <ul className="nav navbar-nav left_nav">
                          <li className={mainPMTab === 1 ? "open dropdown": "dropdown"} >
                            <a aria-expanded="false" onClick={() => this.mainPMTabFunc(1)}>
                              About TalFoundry <i className={mainPMTab === 1 ? "fa fa-angle-down": "fa fa-angle-right"} aria-hidden="true"></i>
                            </a>
                            <ul className="dropdown-menu" role="menu">
                                <li className={childPMTab === 1 ? "active": ""} >
                                  <a className="active_l" onClick={() => this.childPMTabFunc(1)}>How it Works </a>
                                </li>
                                
                                <li className={childPMTab === 2 ? "active open": ""}>
                                  <a className="" onClick={() => this.childPMTabFunc(2)}>Cost <i className={childPMTab === 2 ? "fa fa-angle-down": "fa fa-angle-right"} aria-hidden="true"></i></a>
                                  <ul className="dropdown-menu" role="menu">
                                    <li className={subChildPMTab === 1 ? "active": ""}><a onClick={() => this.subChildPMTabFunc(1)}>Fees</a></li>
                                    <li className={subChildPMTab === 2 ? "active": ""}><a onClick={() => this.subChildPMTabFunc(2)}>Upgrading your Job Post</a></li>
                                  </ul>
                                </li>
                                <li className={childPMTab === 3 ? "active open": ""}>
                                  <a className="" onClick={() => this.childPMTabFunc(3)}>Security <i className={childPMTab === 3 ? "fa fa-angle-down": "fa fa-angle-right"} aria-hidden="true"></i></a>
                                  <ul className="dropdown-menu" role="menu">
                                    <li className={subChildPMTab === 1 ? "active": ""}><a onClick={() => this.subChildPMTabFunc(1)}>About Security</a></li>
                                    <li className={subChildPMTab === 2 ? "active": ""}><a onClick={() => this.subChildPMTabFunc(2)}>Security Questions</a></li>
                                  </ul>
                                </li>
                            </ul>
                          </li>
                          <li className={mainPMTab === 2 ? "open dropdown": "dropdown"} >
                            <a onClick={() => this.mainPMTabFunc(2)}>
                              Your Account <i className={mainPMTab === 2 ? "fa fa-angle-down": "fa fa-angle-right"} aria-hidden="true"></i>
                            </a>
                            <ul className="dropdown-menu" role="menu">
                              <li className={childPMTab === 1 ? "active": ""}><a onClick={() => this.childPMTabFunc(1)}> Create an Account </a></li>
                              <li className={childPMTab === 2 ? "active open": ""}>
                                <a className="" onClick={() => this.childPMTabFunc(2)}>Manage Account <i className={childPMTab === 2 ? "fa fa-angle-down": "fa fa-angle-right"} aria-hidden="true"></i></a>
                                <ul className="dropdown-menu" role="menu">
                                  <li className={subChildPMTab === 1 ? "active": ""}><a onClick={() => this.subChildPMTabFunc(1)}>Contact Information</a></li>
                                  <li className={subChildPMTab === 2 ? "active": ""}><a onClick={() => this.subChildPMTabFunc(2)}>Screen Name</a></li>
                                  <li className={subChildPMTab === 3 ? "active": ""}><a onClick={() => this.subChildPMTabFunc(3)}>Email Settings</a></li>
                                  <li className={subChildPMTab === 4 ? "active": ""}><a onClick={() => this.subChildPMTabFunc(4)}>Security Questions</a></li>
                                  <li className={subChildPMTab === 5 ? "active": ""}><a onClick={() => this.subChildPMTabFunc(5)}>Username</a></li>
                                  <li className={subChildPMTab === 6 ? "active": ""}><a onClick={() => this.subChildPMTabFunc(6)}>Feedback</a></li>
                                  <li className={subChildPMTab === 7 ? "active": ""}><a onClick={() => this.subChildPMTabFunc(7)}>Password</a></li>
                                </ul>
                              </li>
                            </ul>
                          </li>
                          
                          <li className={mainPMTab === 3 ? "open dropdown": "dropdown"}>
                            <a onClick={() => this.mainPMTabFunc(3)}>
                            Post a Job <i className={mainPMTab === 3 ? "fa fa-angle-down": "fa fa-angle-right"} aria-hidden="true"></i>
                            </a>
                            <ul className="dropdown-menu" role="menu">
                                <li className={childPMTab === 1 ? "active": ""}> <a onClick={() => this.childPMTabFunc(1)}>How to Post a Job</a></li>
                                <li className={childPMTab === 2 ? "active": ""}> <a onClick={() => this.childPMTabFunc(2)}>Featured Jobs</a></li>
                                <li className={childPMTab === 3 ? "active": ""}> <a onClick={() => this.childPMTabFunc(3)}>Job Status</a></li>
                                <li className={childPMTab === 4 ? "active": ""}> <a onClick={() => this.childPMTabFunc(4)}>Edit/Repost Job</a></li>
                                <li className={childPMTab === 5 ? "active": ""}> <a onClick={() => this.childPMTabFunc(5)}>Stop Receiving Quotes</a></li>
                                <li className={childPMTab === 6 ? "active": ""}> <a onClick={() => this.childPMTabFunc(6)}>Unsupported Jobs </a></li>
                            </ul>
                          </li>
                          <li className={mainPMTab === 4 ? "open dropdown": "dropdown"} >
                            <a onClick={() => this.mainPMTabFunc(4)}>
                              Hire Freelancer <i className={mainPMTab === 4 ? "fa fa-angle-down": "fa fa-angle-right"} aria-hidden="true"></i>
                            </a>
                            <ul className="dropdown-menu" role="menu">
                                <li className={childPMTab === 1 ? "active": ""}><a onClick={() => this.childPMTabFunc(1)}>About Hire Freelancer </a></li>
                                <li className={childPMTab === 2 ? "active open": ""}>
                                  <a onClick={() => this.childPMTabFunc(2)}>Find Freelancers <i className={childPMTab === 2 ? "fa fa-angle-down": "fa fa-angle-right"} aria-hidden="true"></i></a>
                                  <ul className="dropdown-menu" role="menu">
                                    <li className={subChildPMTab === 1 ? "active": ""}><a onClick={() => this.subChildPMTabFunc(1)}>Search for Freelancers</a></li>
                                    <li className={subChildPMTab === 2 ? "active": ""}><a onClick={() => this.subChildPMTabFunc(2)}>Favorite Freelancers</a></li>
                                    <li className={subChildPMTab === 3 ? "active": ""}><a onClick={() => this.subChildPMTabFunc(3)}>Get a Quote</a></li>
                                  </ul>
                                </li>
                                <li className={childPMTab === 3 ? "active open": ""}>
                                  <a onClick={() => this.childPMTabFunc(3)}>Review Quotes <i className={childPMTab === 3 ? "fa fa-angle-down": "fa fa-angle-right"} aria-hidden="true"></i></a>
                                  <ul className="dropdown-menu" role="menu">
                                    <li className={subChildPMTab === 1 ? "active": ""}><a onClick={() => this.subChildPMTabFunc(1)}>About Review Quotes</a></li>
                                    <li className={subChildPMTab === 2 ? "active": ""}><a onClick={() => this.subChildPMTabFunc(2)}>Manage Quotes</a></li>
                                  </ul>
                                </li>
                                <li className={childPMTab === 4 ? "active open": ""}>
                                  <a onClick={() => this.childPMTabFunc(4)}>Communicating with Freelancers <i className={childPMTab === 4 ? "fa fa-angle-down": "fa fa-angle-right"} aria-hidden="true"></i></a>
                                  <ul className="dropdown-menu" role="menu">
                                    <li className={subChildPMTab === 1 ? "active": ""}><a onClick={() => this.subChildPMTabFunc(1)}>Direct Messages</a></li>
                                    <li className={subChildPMTab === 2 ? "active": ""}><a onClick={() => this.subChildPMTabFunc(2)}>Job Q&A</a></li>  
                                  </ul>
                                </li>
                                <li className={childPMTab === 5 ? "active": ""}><a onClick={() => this.childPMTabFunc(5)}>Hiring a Freelancer </a></li>
                            </ul>
                          </li>
                          <li className={mainPMTab === 5 ? "open dropdown": "dropdown"} >
                            <a onClick={() => this.mainPMTabFunc(5)}>Managing Your Job <i className={mainPMTab === 5 ? "fa fa-angle-down": "fa fa-angle-right"} aria-hidden="true"></i></a>
                            <ul className="dropdown-menu" role="menu">
                                <li className={childPMTab === 1 ? "active": ""}><a onClick={() => this.childPMTabFunc(1)}>Contract</a></li>
                                <li className={childPMTab === 2 ? "active": ""}><a onClick={() => this.childPMTabFunc(2)}> End your Contract</a></li>
                            </ul>
                          </li>
                          <li className={mainPMTab === 6 ? "open dropdown": "dropdown"} >
                            <a onClick={() => this.mainPMTabFunc(6)}>Feedback <i className={mainPMTab === 6 ? "fa fa-angle-down": "fa fa-angle-right"} aria-hidden="true"></i></a>
                            <ul className="dropdown-menu" role="menu">
                                <li className={childPMTab === 1 ? "active": ""}><a onClick={() => this.childPMTabFunc(1)}>About Feedback </a></li>
                            </ul>
                          </li>
                         </ul>
                      </div>
                        
                      </div>
                      <div className="col-md-9 col-xs-12 bhoechie-tab pr-0">
                          {mainPMTab === 1 &&
                            <React.Fragment>
                              {childPMTab === 1 && <HowitWorks /> }
                              {childPMTab === 2 && 
                                <React.Fragment>
                                  {subChildPMTab === 1 && <Fees /> } 
                                  {subChildPMTab === 2 && <UpgradingYourJobPost /> }
                                </React.Fragment>  
                              }
                              {childPMTab === 3 && 
                                <React.Fragment>
                                  {subChildPMTab === 1 && <AboutSecurity /> } 
                                  {subChildPMTab === 2 && <SecurityQuestions /> } 
                                </React.Fragment>  
                              }
                            </React.Fragment>  
                          }
                          {mainPMTab === 2 &&
                            <React.Fragment>
                              {childPMTab === 1 && <CreateAccount handleSignUpModal= {this.handleSignUpModal}/> }
                              {childPMTab === 2 && 
                                <React.Fragment>
                                  {subChildPMTab === 1 && <ContactInformation /> } 
                                  {subChildPMTab === 2 && <ScreenName /> } 
                                  {subChildPMTab === 3 && <EmailSettings /> } 
                                  {subChildPMTab === 4 && <ManageSecurityQuestions /> }
                                  {subChildPMTab === 5 && <Username /> } 
                                  {subChildPMTab === 6 && <Feedback /> } 
                                  {subChildPMTab === 7 && <Password /> } 
                                </React.Fragment>  
                              }
                              {childPMTab === 3 && <PaymentMethods/> }
                              {childPMTab === 4 && <BuildingTeam/> }
                            </React.Fragment>
                          }
                          {mainPMTab === 3 &&
                            <React.Fragment>
                              {childPMTab === 1 && <HowtoPostJob /> }
                              {childPMTab === 2 && <FeaturedJobs /> }
                              {childPMTab === 3 && <JobStatus /> }
                              {childPMTab === 4 && <EditJob /> }
                              {childPMTab === 5 && <StopReceivingQuotes /> }
                              {childPMTab === 6 && <UnsupportedJobs /> }
                            </React.Fragment>
                          }
                          {mainPMTab === 4 &&
                            <React.Fragment>
                              {childPMTab === 1 && <AboutHireFreelancer /> }
                              {childPMTab === 2 && 
                                <React.Fragment>
                                  {subChildPMTab === 1 && <SearchForFreelancers /> } 
                                  {subChildPMTab === 2 && <FavoriteFreelancers /> } 
                                  {subChildPMTab === 3 && <GetaQuote /> }  
                                </React.Fragment>  
                              }
                              {childPMTab === 3 && 
                                <React.Fragment>
                                  {subChildPMTab === 1 && <AboutReviewQuotes /> } 
                                  {subChildPMTab === 2 && <ManageQuotes /> }
                                </React.Fragment>  
                              }
                              {childPMTab === 4 && 
                                <React.Fragment>
                                  {subChildPMTab === 1 && <DirectMessages /> } 
                                  {subChildPMTab === 2 && <JobQA /> } 
                                </React.Fragment>  
                              }
                              {childPMTab === 5 && <HiringaFreelancer/> }
                            </React.Fragment>
                          }
                          {mainPMTab === 5 &&
                            <React.Fragment>
                              {childPMTab === 1 && <Contract /> }
                              {childPMTab === 2 && <EndYourContract/> }
                            </React.Fragment>
                          }
                          {mainPMTab === 6 &&
                            <React.Fragment>
                              {childPMTab === 1 && <AboutFeedback /> }
                            </React.Fragment>
                          }
                      </div>                   
                    </div>         
                  </div>
                </div>

                <div role="tabpanel" className={this.state.freelancer ? "tab-pane active" : "tab-pane"} id="freelancing">
                  <div className="container pt-5">
                  <div className="row">
                    <div className="col-md-3">
                      <div className="navbar navbar-fixed-left keep-open howCanHelpSideNavBar">
                        <ul className="nav navbar-nav left_nav">
                          <li className={mainFRTab === 1 ? "open dropdown": "dropdown"}>
                            <a onClick={() => this.mainFRTabFunc(1)}>
                              About TalFoundry <i className={mainFRTab === 1 ? "fa fa-angle-down": "fa fa-angle-right"} aria-hidden="true"></i>
                            </a>
                            <ul className="dropdown-menu" role="menu">
                                <li className={childFRTab === 1 ? "active": ""}><a onClick={() => this.childFRTabFunc(1)}>How it Works </a></li>
                                <li className={childFRTab === 2 ? "active": ""}><a onClick={() => this.childFRTabFunc(2)}>Fees </a></li>
                                <li className={childFRTab === 3 ? "active open": ""}>
                                  <a onClick={() => this.childFRTabFunc(3)}>Security <i className={childFRTab === 3 ? "fa fa-angle-down": "fa fa-angle-right"} aria-hidden="true"></i></a>
                                  <ul className="dropdown-menu" role="menu">
                                    <li className={subChildFRTab === 1 ? "active": ""}><a onClick={() => this.subChildFRTabFunc(1)}>About Security</a></li>
                                    <li className={subChildFRTab === 2 ? "active": ""}><a onClick={() => this.subChildFRTabFunc(2)}>Security Questions</a></li>  
                                    <li className={subChildFRTab === 3 ? "active": ""}><a onClick={() => this.subChildFRTabFunc(3)}>Job Screening</a></li>  
                                  </ul>
                                </li>
                            </ul>
                          </li>
                          <li className={mainFRTab === 2 ? "open dropdown": "dropdown"}>
                            <a onClick={() => this.mainFRTabFunc(2)}>
                              Your Account <i className={mainFRTab === 2 ? "fa fa-angle-down": "fa fa-angle-right"} aria-hidden="true"></i>
                            </a>
                            <ul className="dropdown-menu" role="menu">
                                <li className={childFRTab === 1 ? "active": ""}><a onClick={() => this.childFRTabFunc(1)}>Create an Account </a></li>
                                <li className={childFRTab === 2 ? "active open": ""}>
                                  <a onClick={() => this.childFRTabFunc(2)}>Manage Account <i className={childFRTab === 2 ? "fa fa-angle-down": "fa fa-angle-right"} aria-hidden="true"></i></a>
                                  <ul className="dropdown-menu" role="menu">
                                    <li className={subChildFRTab === 1 ? "active": ""}><a onClick={() => this.subChildFRTabFunc(1)}>Contact Information</a></li>
                                    <li className={subChildFRTab === 2 ? "active": ""}><a onClick={() => this.subChildFRTabFunc(2)}>Email Settings</a></li>
                                    <li className={subChildFRTab === 3 ? "active": ""}><a onClick={() => this.subChildFRTabFunc(3)}>Security Questions</a></li>
                                    <li className={subChildFRTab === 4 ? "active": ""}><a onClick={() => this.subChildFRTabFunc(4)}>Username</a></li>
                                    <li className={subChildFRTab === 5 ? "active": ""}><a onClick={() => this.subChildFRTabFunc(5)}>Password</a></li>
                                  </ul>
                                </li>
                            </ul>
                          </li>
                          <li className={mainFRTab === 3 ? "open dropdown": "dropdown"}>
                            <a onClick={() => this.mainFRTabFunc(3)}>
                              Profile <i className={mainFRTab === 3 ? "fa fa-angle-down": "fa fa-angle-right"} aria-hidden="true"></i>
                            </a>
                            <ul className="dropdown-menu" role="menu">
                                <li className={childFRTab === 1 ? "active": ""}><a onClick={() => this.childFRTabFunc(1)}>Your Profile</a></li>
                                <li className={childFRTab === 2 ? "active open": ""}>
                                  <a onClick={() => this.childFRTabFunc(2)}>Building your Profile <i className={childFRTab === 2 ? "fa fa-angle-down": "fa fa-angle-right"} aria-hidden="true"></i></a>
                                  <ul className="dropdown-menu" role="menu">
                                    <li className={subChildFRTab === 1 ? "active": ""}><a onClick={() => this.subChildFRTabFunc(1)}>Profile Overview</a></li>
                                    <li className={subChildFRTab === 2 ? "active": ""}><a onClick={() => this.subChildFRTabFunc(2)}>Certifications</a></li>
                                    <li className={subChildFRTab === 3 ? "active": ""}><a onClick={() => this.subChildFRTabFunc(3)}>Portfolio</a></li>
                                  </ul>
                                </li>
                                <li className={childFRTab === 3 ? "active": ""}><a onClick={() => this.childFRTabFunc(3)}>Profile Visibility</a></li>
                            </ul>
                          </li>
                          <li className={mainFRTab === 4 ? "open dropdown": "dropdown"}>
                            <a onClick={() => this.mainFRTabFunc(4)}>
                              Getting Hired <i className={mainFRTab === 4 ? "fa fa-angle-down": "fa fa-angle-right"} aria-hidden="true"></i></a>
                            <ul className="dropdown-menu" role="menu">
                                <li className={childFRTab === 1 ? "active open": ""}>
                                  <a onClick={() => this.childFRTabFunc(1)}>Find Jobs <i className={childFRTab === 1 ? "fa fa-angle-down": "fa fa-angle-right"} aria-hidden="true"></i></a>
                                  <ul className="dropdown-menu" role="menu">
                                    <li className={subChildFRTab === 1 ? "active": ""}><a onClick={() => this.subChildFRTabFunc(1)}>Finding Jobs</a></li>
                                    <li className={subChildFRTab === 2 ? "active": ""}><a onClick={() => this.subChildFRTabFunc(2)}>Add to Favorites</a></li>
                                  </ul>
                                </li>
                                <li className={childFRTab === 2 ? "active open": ""}>
                                  <a onClick={() => this.childFRTabFunc(2)}>Communicating with Employers <i className={childFRTab === 2 ? "fa fa-angle-down": "fa fa-angle-right"} aria-hidden="true"></i></a>
                                  <ul className="dropdown-menu" role="menu">
                                    <li className={subChildFRTab === 1 ? "active": ""}><a onClick={() => this.subChildFRTabFunc(1)}>Job Q&A</a></li>
                                    <li className={subChildFRTab === 2 ? "active": ""}><a onClick={() => this.subChildFRTabFunc(2)}>Messages</a></li>
                                  </ul>
                                </li>
                                <li className={childFRTab === 3 ? "active open": ""}>
                                  <a onClick={() => this.childFRTabFunc(3)}>Apply to Jobs <i className={childFRTab === 3 ? "fa fa-angle-down": "fa fa-angle-right"} aria-hidden="true"></i></a>
                                  <ul className="dropdown-menu" role="menu">
                                    <li className={subChildFRTab === 1 ? "active": ""}><a onClick={() => this.subChildFRTabFunc(1)}>Proposals</a></li>
                                    <li className={subChildFRTab === 2 ? "active": ""}><a onClick={() => this.subChildFRTabFunc(2)}>Send a Proposal</a></li>
                                  </ul>
                                </li>
                            </ul>
                          </li>
                          <li className={mainFRTab === 5 ? "open dropdown": "dropdown"}>
                            <a onClick={() => this.mainFRTabFunc(5)}>
                              Managing Your Job <i className={mainFRTab === 5 ? "fa fa-angle-down": "fa fa-angle-right"} aria-hidden="true"></i></a>
                            <ul className="dropdown-menu" role="menu">
                                <li className={childFRTab === 1 ? "active": ""}><a onClick={() => this.childFRTabFunc(1)}>Contract </a></li>
                                <li className={childFRTab === 2 ? "active": ""}><a onClick={() => this.childFRTabFunc(2)}>End a Contract </a></li>
                            </ul>
                          </li>
                          <li className={mainFRTab === 6 ? "open dropdown": "dropdown"}>
                            <a onClick={() => this.mainFRTabFunc(6)}>
                              Feedback <i className={mainFRTab === 6 ? "fa fa-angle-down": "fa fa-angle-right"} aria-hidden="true"></i></a>
                            <ul className="dropdown-menu" role="menu">
                                <li className={childFRTab === 1 ? "active": ""}><a onClick={() => this.childFRTabFunc(1)}>About Feedback </a></li>
                            </ul>
                          </li>
                         </ul>
                      </div>
                        
                      </div>
                      <div className="col-md-9">
                          {mainFRTab === 1 &&
                            <React.Fragment>
                              {childFRTab === 1 && <HowitWorksF /> }
                              {childFRTab === 2 && <Fees /> } 
                              {childFRTab === 3 && 
                                <React.Fragment>
                                  {subChildFRTab === 1 && <AboutSecurity /> } 
                                  {subChildFRTab === 2 && <SecurityQuestions /> } 
                                  {subChildFRTab === 3 && <JobScreening /> } 
                                </React.Fragment>  
                              }
                            </React.Fragment>  
                          }
                          {mainFRTab === 2 &&
                            <React.Fragment>
                              {childFRTab === 1 && <CreateAccountF handleSignUpModal= {this.handleSignUpModal}/> }
                              {childFRTab === 2 && 
                                <React.Fragment>
                                  {subChildFRTab === 1 && <ContactInformation /> } 
                                  {subChildFRTab === 2 && <EmailSettings /> } 
                                  {subChildFRTab === 3 && <ManageSecurityQuestions /> }
                                  {subChildFRTab === 4 && <Username /> } 
                                  {subChildFRTab === 5 && <Password /> } 
                                </React.Fragment>  
                              }
                            </React.Fragment>
                          }
                          {mainFRTab === 3 &&
                            <React.Fragment>
                              {childFRTab === 1 && <AboutYourProfile /> }
                              {childFRTab === 2 && 
                                <React.Fragment>
                                  {subChildFRTab === 1 && <ProfileOverview /> } 
                                  {subChildFRTab === 2 && <Certifications /> } 
                                  {subChildFRTab === 3 && <Portfolio /> }
                                </React.Fragment> 
                              }
                              {childFRTab === 3 && <ProfileVisibility /> }
                            </React.Fragment>
                          }
                          {mainFRTab === 4 &&
                            <React.Fragment>
                              {childFRTab === 1 && 
                                <React.Fragment>
                                  {subChildFRTab === 1 && <FindingJobs /> } 
                                  {subChildFRTab === 2 && <AddtoFavorites /> }
                                </React.Fragment>  
                              }
                              {childFRTab === 2 && 
                                <React.Fragment>
                                  {subChildFRTab === 1 && <JobQA /> } 
                                  {subChildFRTab === 2 && <Messages /> }
                                </React.Fragment>  
                              }
                              {childFRTab === 3 && 
                                <React.Fragment>
                                  {subChildFRTab === 1 && <Proposals /> } 
                                  {subChildFRTab === 2 && <SendProposals /> } 
                                </React.Fragment>  
                              }
                              {childFRTab === 5 && <HiringaFreelancer/> }
                            </React.Fragment>
                          }
                          {mainFRTab === 5 &&
                            <React.Fragment>
                              {childFRTab === 1 && <Contract /> }
                              {childFRTab === 2 && <EndYourContract/> }
                            </React.Fragment>
                          }
                          {mainFRTab === 6 &&
                            <React.Fragment>
                              {childFRTab === 1 && <AboutFeedback /> }
                            </React.Fragment>
                          }
                      </div>
                  </div>
                             
                  </div>                
                </div>
              </div>
          </div>
        
        <div className="clearfix"></div>
        <Footer />
      </div>
    );
  }
}




const mapStateToProps = state => ({
  ...state
})

export default connect(mapStateToProps)(HowItWorksFreelancer)
