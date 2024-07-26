import React, { Component, lazy } from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import { LazyLoadImage } from 'react-lazy-load-image-component';
import 'react-lazy-load-image-component/src/effects/blur.css';

// import talfoundry_logo from "../../static/images/logo/logo.svg";
import logo_Img from "../../static/images/logo/logo.png";
// import boxSize from "../../../src/static/images/landing-page-banner-image.svg";
// import Post_A_Job from "../../../src/static/images/hiw/Post_A_Job.svg";
// import We_Find_The_Perfect_Match from "../../../src/static/images/hiw/We_Find_The_Perfect_Match.svg";
// import Get_Work_Done from "../../../src/static/images/hiw/Get_Work_Done.svg";
// import Pay_Securely from "../../../src/static/images/hiw/Pay_Securely.svg";

// import Start_Work from "../../../src/static/images/hiw/start_work.png";
// import CreateProfile from "../../../src/static/images/hiw/create_profile.png";
// import PerfectProjects from "../../../src/static/images/hiw/find_projects.png";
// import Get_pay from "../../../src/static/images/hiw/get_pay.png";

// import Find_expert from "../../../src/static/images/background/find-expert.png";
// import Find_work_frame from "../../../src/static/images/background/find-work-frame.png";
import Find_work_fullframe from "../../../src/static/images/background/find-work-fullframe.png";
// import hiringImg from "../../../src/static/images/hiring.png";
// import hiring2Img from "../../../src/static/images/hiring4.png";
// import hiring3Img from "../../../src/static/images/hiring3.png";

// import ShortTermTask from "../../../src/static/images/background/shortTermProjects.png";
// import FullTimeImg from "../../../src/static/images/background/fullTime.png";
// import Recurring_Projects from "../../../src/static/images/background/Recurring-Projects.png";
// import Footer from "../miscellaneous/Footer";
import { confirmEmailAciton } from '../../Actions/confirmEmailAction';

import Amazon_Web_Services from "../../../src/static/images/category/aws.png";
import Salesforce from "../../../src/static/images/category/salesforce.png";
import Oracle_Cloud from "../../../src/static/images/category/oracle_cloud.png";

import google_cloud from "../../../src/static/images/category/google_cloud.png";
import ms_azure from "../../../src/static/images/category/ms_azure.png";
// import ibm_cloud from "../../../src/static/images/category/ibm_cloud.png";

import pre_vetted_talent from "../../../src/static/images/Flexibility.png";
import quality_talent_on_demand from "../../../src/static/images/shield.png";
import speed_scale from "../../../src/static/images/call-center.png";
// import statementImg from "../../../src/static/images/statement.svg";
import rightJob from "../../../src/static/images/background/right-job.png";
import clientP1 from "../../../src/static/images/background/c1-new2.png";
// import clientP2 from "../../../src/static/images/background/client-p2.png";
import clientP3 from "../../../src/static/images/background/c1-new3.png";
// import clientP3 from "../../../src/static/images/background/client-p3.png";
import clientP4 from "../../../src/static/images/background/c1-new4.png";
// import clientP4 from "../../../src/static/images/background/client-p4.png";
import cloudP1 from "../../../src/static/images/background/cloud-p1.png";
// import cloudP2 from "../../../src/static/images/background/cloud-p2.png";
import cloudP3 from "../../../src/static/images/background/cloud-p3.png";
import cloudP4 from "../../../src/static/images/background/cloud-p4.png";
import whyChoose1 from "../../../src/static/images/background/why-choose1.png";
import whyChoose2 from "../../../src/static/images/background/why-choose2.png";
import whyChoose3 from "../../../src/static/images/background/why-choose3.png";
// import rightarrowSolid from "../../../src/static/images/background/right-solid-arrow.svg";
// import bottomarrowSolid from "../../../src/static/images/background/bottom-solid-arrow.svg";
import connectImg from "../../../src/static/images/background/connect-img.png";
// import qualityImg from "../../../src/static/images/quality.svg";
// import vettingImg from "../../../src/static/images/vetting.svg";
// import secureImg from "../../../src/static/images/secure.svg";

import TECHNOLOGIES from "../../constants/techs"
import JOBTITLES from "../../constants/titles";
import Autosuggest from "react-autosuggest";
import LandingPageHeader from "../miscellaneous/LandingPageHeader";
// import LandingPageHeader from "../miscellaneous/LandingPageHeader";


// const LoginPopUp = lazy(() => import('../miscellaneous/LoginPopUP'));
// const SignUpPopUpNew = lazy(() => import('../miscellaneous/SignUpPopUpNew'));

const getSuggestions = (value, exploreSuggestid) => {
  const inputValue = value.trim().toLowerCase();
  const inputLength = inputValue.length;
  return inputLength === 0 ? []
    : exploreSuggestid === "Explore_by_Role" ? JOBTITLES.filter(tech => tech.toLowerCase().includes(inputValue))
      : TECHNOLOGIES.filter((tech) => tech.name.toLowerCase().includes(inputValue)
      );
};

class HomePage extends Component {
  constructor(props, context) {
    super(props, context);
    this.state = {
      scrolling: false,
      openModal: false,
      openSignUpModal: false,
      emailConfirmed: null,
      activeClass: 'client',
      speciality: [],
      value: "",
      searchItem: "",

      exploreRoll: ["AWS Security Engineer", "AWS Data Scientist", "AWS Consultant", "Salesforce App Builder", "Salesforce Data Analyst", "Salesforce Administrator", "Oracle Associate", "Oracle Professional", "Oracle DB Security", "Google Cloud Engineer", "Google Cloud Architect","Google Cloud Consultant"],
      exploreRollSkill: ["AWS Amplify", "AWS Artifact", "AWS Cloud9", "Salesforce CPQ", "Salesforce Communities", "Salesforce Platform", "Orcale Assets", "Oracle Configurator", "Oracle Engineering", "Google Cloud Blog", "Google Cloud Certifications", "Google Cloud Training"],
      exploreSuggestid: "Explore_by_Role",
      autoSuggestshow: ""
    };
    this.handleScroll = this.handleScroll.bind(this);
  }

  componentDidMount() {
    window.addEventListener("scroll", this.handleScroll);
    let that = this

    setTimeout(
      function () {
        if (that.props.match && that.props.match.params && that.props.match.params.token) {
          const token = that.props.match.params.token
          if (token) {
            that.props.confirmEmail(token)
              .then((res) => {
                if (res.status === 200) {
                  that.setState({
                    emailConfirmed: true,
                    openModal: true
                  })
                }
                else {
                  that.setState({
                    emailConfirmed: false,
                    emailConfirmationMessage: res.response && res.response.data && res.response.data.message && res.response.data.message[0]
                  })
                }
              })
          }
        }
      }.bind(that),
      3000
    )
  }

  UNSAFE_componentWillUnmount() {
    window.removeEventListener("scroll", this.handleScroll);
  }
  handleScroll(event) {
    if (window.scrollY <= 0 && this.state.scrolling) {
      this.setState({ scrolling: false });
    } else if (window.scrollY >= 0 && !this.state.scrolling) {
      this.setState({ scrolling: true });
    }
  }
  handleNewScroll(event) {
    let obj = document.getElementById("mn_project");
    if (obj) {
      obj.scrollIntoView();
    }
  }

  handleOPenModal = () => {
    this.setState({ openModal: true });
  }
  closeModal = () => {
    this.setState({ openModal: false });
  }

  handleSignUpModal = (e) => {
    e.preventDefault();
    this.setState({ openSignUpModal: true });
  }

  closeSignUpModal = () => {
    this.setState({ openSignUpModal: false });
  }

  activeTab = (e) => {
    // console.log(e.target.id)
    this.setState({ activeClass: e.target.id })
  }

  onSuggestionSelected = (event, { suggestionValue }) => {
    event.preventDefault();
    this.setState({ searchItem: suggestionValue })
    // console.log('ping... ', suggestionValue)
  }

  handleChange = (event, { newValue }) => {
    this.setState({ value: newValue });
  };

  onSuggestionsFetchRequested = ({ value }) => {
    this.setState({
      speciality: getSuggestions(value, this.state.exploreSuggestid)
    });
  };

  onSuggestionsClearRequested = () => {
    this.setState({
      speciality: []
    });
  };

  renderSuggestion = suggestion => (
    this.state.exploreSuggestid === "Explore_by_Skill" ? <span> {suggestion.name} </span>
      : <span>{suggestion}</span>
  );

  getSuggestionValue = suggestion => (
    this.state.exploreSuggestid === "Explore_by_Skill" ? suggestion.name : suggestion
  )
  handleAutoSuggest = (e) =>{
    this.setState({autoSuggestshow:e})
  }

  handleExploreSuggest = (e) => {
    if (e.target.id === "Explore_by_Skill") {
      this.setState({ exploreSuggestid: e.target.id, value: "" })
    } else if (e.target.id === "Explore_by_Role") {
      this.setState({ exploreSuggestid: e.target.id, value: "" })
    }
    if (e.target.id === this.state.exploreSuggestid) {
      this.setState({ exploreSuggestid: "", value: "" })
    }
  }
  render() {
    let { speciality, value, searchItem, exploreSuggestid, exploreRoll, exploreRollSkill } = this.state

    const InputProps = () => (
      exploreSuggestid === "Explore_by_Skill" ? {
        placeholder: 'Enter Skill (Ex - AWS Lambda)',
        value: value,
        name: "search",
        onChange: this.handleChange
      }
        : {
          placeholder: 'Enter Role (Ex - AWS Developer)',
          value: value,
          name: "search",
          onChange: this.handleChange
        }
    )

    // const pathName = exploreSuggestid === "Explore_by_Skill" ? "/freelancer-search" : "/job-search"
    return (
      <div className="New_Landing_Page_XD New_Home_Page">
        <div className="wraper">
          <div className="header_top landing-page-not-down-menu">
            <div className="header">
              <div
                className='navigation landing-page-transparent-header'
                id="scroll-feature"
              >
                <LandingPageHeader history={this.props.history}/>
                <nav className="navbar navbar-findcond">
                  <div className="container">
                    <div className="navbar-header">
                      <button
                        type="button"
                        className="navbar-toggle collapsed"
                        data-toggle="collapse"
                        data-target="#navbar"
                      >
                        <span className="sr-only">Toggle navigation</span>
                        <span className="icon-bar"></span>
                        <span className="icon-bar"></span>
                        <span className="icon-bar"></span>
                      </button>
                      <Link to={"#"} className="navbar-brand">
                        <LazyLoadImage
                          alt={"logo"}
                          src={logo_Img}
                        />
                      </Link>
                    </div>
                    <div className="collapse navbar-collapse" id="navbar">
                      <ul className="nav navbar-nav navbar-right main-header-all-menu">
                       <li>
                          <Link
                            to="/freelancer-search"
                            className="mn_black"
                          >
                            Find Cloud Experts
                          </Link>
                        </li>
                        <li>
                          <Link to="/job-search" className="mn_black">
                            Find Work
                          </Link>
                        </li>
                        <li className="dropdown table-dropdown custom-drop-down-menu-for-tf">
                          <Link
                            to="/advisory-services"
                            className={`mn_black`}
                            data-toggle="dropdown"
                            role="button"
                            aria-haspopup="true"
                            aria-expanded="false"
                          >
                            Services
                          </Link>
                          <ul className="dropdown-menu menu-landing servicesDropdown">
                            <li className="dropdown-item">
                              <Link to="/advisory-services/aws-advisory-services">
                                AWS Advisory
                              </Link>
                            </li>
                            <li className="dropdown-item">
                              <Link to="/advisory-services/salesforce-advisory-services">
                                Salesforce Advisory
                              </Link>
                            </li>
                          </ul>
                        </li>
                        <li>
                          <Link
                            className="mn_black"
                            to="/how-it-works"
                          >
                            How It Works
                          </Link>
                        </li>
                        {/* <li>
                          <Link
                            to={"#"}
                            className="mn_black"
                            onClick={() => this.handleOPenModal("")}
                          >
                            Post a Project
                          </Link>
                        </li> */}
                        <li>
                          <Link
                            to={"/login"}
                            className="mn_black"
                            // onClick={() => this.handleOPenModal("")}
                          >
                            Login
                          </Link>
                        </li>
                        <li>
                          
                          <Link
                            to={"/sign-up"}
                            className="mn_black active"
                            // onClick={(e) => this.handleSignUpModal(e)}
                            style={{ background: 'rgb(255, 107, 84)' }}
                          >
                            Sign Up for Free
                          </Link>
                        </li>
                      </ul>
                    </div>
                  </div>
                </nav>
              </div>
              {/* navigation end */}

              <div className="tf_we home-shape-1 home-bg">
                <div className="container">
                  <div className="mn_welcome landing_page_btn home-shape-3">
                    <div className="col-xs-12 col-md-6 col-sm-6 nopad">
                      <h2 className="home_page_color_cloud">
                        Connect and Hire Independent <span className=""></span>
                      </h2>
                      <p className="home_page_subtitle">
                        {/* <h4 className="welcome_text">Welcome to Talfoundry</h4> */}
                        We are your one-stop site to find amazing Cloud Experts !
                      </p>
                      <div className="mn_learnmore home-shape-4">
                        <Link
                        to={{
                            pathname:"/sign-up",
                            state:"Project Manager"
                          }}
                          // onClick={(e) => this.handleSignUpModal(e)}
                          className="btn_2"
                        >
                          Hire Cloud Experts
                        </Link>
                        <Link
                          to={{
                            pathname:"/sign-up",
                            state:"Freelancer"
                          }}
                          // onClick={(e) => this.handleSignUpModal(e)}
                          className="btn_want_to_work"
                        >
                          Work as an Expert
                        </Link>
                      </div>

                    </div>
                    <div className="col-xs-12 col-md-6 col-sm-6 nopad">
                      <LazyLoadImage
                        alt={"connectImg"}
                        src={connectImg}
                        className="landing_page_main"
                        effect="blur"
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>
            {/* header class end */}

          </div>
        </div>
        {/* headet wrapper end */}

        <div className="clearfix"></div>


        <div className="mn_services home-page-cloud-expert-section">

          {/* Start Section Explore the Cloud Experts */}
          <div className="cloud_expert_home_page category_circle">
            <div className="container">
              <div className="row">
                <div className="col-lg-12 ">
                  <h1 className="explore_ces">Explore the Cloud <span className="txt-36-primary">Experts</span> </h1>
                </div>
              </div>
              <div className="row">
                <div className="col-lg-6">
                  <div className="row d-flex justify-content-center home-light-bg">
                    <div className="col-md-4 col-sm-4">

                      <Link
                        to={{
                          pathname: '/category_page_description',
                          state: {
                            category: "aws"
                          }
                        }}
                        className="project_category_name-new"
                      >
                        <div className="landing-page-project-category-box-new">
                          <LazyLoadImage
                            alt={"Amazon_Web_Services"}
                            src={Amazon_Web_Services}
                            className="landing-page-category-image-new"
                          />
                        </div>
                      </Link>
                    </div>
                    <div className="col-md-4 col-sm-4">
                      <Link
                        to={{
                          pathname: '/category_page_description',
                          state: {
                            category: "sales"
                          }
                        }}
                        className="project_category_name-new"
                      >
                        <div className="landing-page-project-category-box-new">
                          <LazyLoadImage
                            alt={"Salesforce"}
                            src={Salesforce}
                            className="landing-page-category-image-new"
                          />
                        </div>

                      </Link>
                    </div>
                    <div className="col-md-4 col-sm-4">
                      <Link
                        to={{
                          pathname: '/category_page_description',
                          state: {
                            category: "oracle"
                          }
                        }}
                        className="project_category_name-new"
                      >
                        <div className="landing-page-project-category-box-new">
                          <LazyLoadImage
                            alt={"Oracle_Cloud"}
                            src={Oracle_Cloud}
                            className="landing-page-category-image-new"
                          />
                        </div>
                      </Link>
                    </div>
                    <div className="col-md-4 col-sm-4">
                      <Link
                        to={{
                          pathname: '/category_page_description',
                          state: {
                            category: "ms"
                          }
                        }}
                        className="project_category_name-new"
                      >
                        <div className="landing-page-project-category-box-new">
                          <LazyLoadImage
                            alt={"ms_azure"}
                            src={ms_azure}
                            className="landing-page-category-image-new"
                          />
                        </div>

                      </Link>
                    </div>
                    <div className="col-md-4 col-sm-4">
                      <Link
                        to={{
                          pathname: '/category_page_description',
                          state: {
                            category: "google"
                          }
                        }}
                        className="project_category_name-new"
                      >
                        <div className="landing-page-project-category-box-new">
                          <LazyLoadImage
                            alt={"google_cloud"}
                            src={google_cloud}
                            className="landing-page-category-image-new"
                          />
                        </div>

                      </Link>
                    </div>
                  </div>
                </div>
                <div className="col-lg-6">
                  <div>
                    <p className="home_page_subtitle txt-18 pl-4 pr-4 ml-40 mr-40">Hire vetted top cloud engineers, architects, developers, etc. across multiple cloud platforms for 200+ cloud skills</p>
                  </div>
                  <div className="text-center mn_learnmore">
                    <button className="btn_want_to_work mr-20 home-explore-by-skill-btn" id="Explore_by_Role" onClick={(e) => this.handleExploreSuggest(e)} >Explore by Role</button>
                    <button className="btn_want_to_work home-explore-by-skill-btn" id="Explore_by_Skill" onClick={(e) => this.handleExploreSuggest(e)} >Explore by Skill</button>
                  </div>
                  <div className="d-flex justify-content-center">
                    {exploreSuggestid === "Explore_by_Skill" &&
                      <>
                      <ul className="shadow-list pl-4 ml-40 mr-40">
                        {exploreRollSkill.map((roll) => (
                          <li>
                            <Link to={{
                              pathname: "/job-search",
                              state: {
                                search: roll
                              },
                            }}>
                              <div>
                                {/* <span><i class="fa fa-briefcase pr-2"></i></span> */}
                              </div>
                              <span>{roll}</span>
                            </Link>

                          </li>
                        ))
                        }

                      </ul>
                      <div className="ml-40 mr-40 w-100">
                        <p className="ml-40 mr-40 link-display" onClick={(e) => this.handleAutoSuggest("autoSuggesttrue")} ><i className="fa fa-plus pr-3"></i>See more Skills</p>
                      </div>
                      <div className={this.state.autoSuggestshow === "autoSuggesttrue" ? "suggest-show" : "suggest-hide" }>
                        <div className="w-75 home-explore-search">
                          <Autosuggest
                            suggestions={speciality}
                            onSuggestionsFetchRequested={this.onSuggestionsFetchRequested}
                            onSuggestionsClearRequested={this.onSuggestionsClearRequested}
                            getSuggestionValue={this.getSuggestionValue}
                            renderSuggestion={(suggestion) => this.renderSuggestion(suggestion)}
                            onSuggestionSelected={this.onSuggestionSelected}
                            // multiSection={false}
                            inputProps={InputProps()}
                          />

                        </div>
                        <div className="w-20">
                          <Link className="btn btn-primary mx-2 home-explore-search-btn" to=
                            {searchItem ? {
                              pathname: "/freelancer-search",
                              state: {
                                search: searchItem
                              },
                            } : "#"} > Search </Link>
                        </div>
                        </div>
                      </>
                    }

                  </div>
                  <div>

                    {exploreSuggestid === "Explore_by_Role" &&
                    <>

                      <ul className="shadow-list pl-4 ml-40 mr-40">
                        {exploreRoll.map((roll) => (
                          <li>
                            <Link to={{
                              pathname: "/job-search",
                              state: {
                                search: roll
                              },
                            }}>
                              <div>
                                {/* <span><i class="fa fa-briefcase pr-2"></i></span> */}
                              </div>
                              <span>{roll}</span>
                            </Link>

                          </li>
                        ))
                        }

                      </ul>
                       <p className="ml-40 mr-40"><a href="/category_page_description" className="ml-40 mr-40"><i className="fa fa-plus pr-3"></i>See more Roles</a></p>
                    </>
                    }

                  </div>

                </div>
              </div>

            </div>
          </div>

          {/* End Section Explore the Cloud Experts */}



          <div className="home-shape-12">
          <div className="cloud_expert_home_page pt-0 home-shape-11">
            {/* Start Section How It Works */}
            <div className="row howItWorksSection-new pt-5" id="mn_project">
              <div className="container">
                <div className="col-md-12">
                  <div className="mn_project">
                    <h3 className="explore_ces How_It_Works_heading">How It Works</h3>
                  </div>
                  <div>
                    <ul className="nav nav-pills">
                      <li className="active"><a data-toggle="tab" onClick={this.activeTab} id="client" href="#home">Client</a></li>
                      <li><a data-toggle="tab" href="#menu1" onClick={this.activeTab} id="ce"> Cloud Expert</a></li>
                    </ul>

                    <div className="tab-content">
                      <div id="home" className="tab-pane fade in active">
                        <div className="row">
                          <div className="col-lg-4 text-center">
                            <h3 className="hire_row"><span className="txt-26-primary hire_count hire_count1">1</span></h3>
                            <br />
                            <div className="bs-wizard-info">
                              Tell us about what you are looking for. We will
                              connect you with top quality Cloud Experts
                              instantly.
                            </div>
                            <div className="how-it-work-step-image">
                              <LazyLoadImage
                                alt={"clientP1"}
                                src={clientP1}
                                className=""
                                effect="blur"
                              />
                            </div>
                          </div>
                          {/* <div className="col-lg-2 text-center">
                            <div className="">
                              <LazyLoadImage
                                alt={"rightarrowSolid"}
                                src={rightarrowSolid}
                                className=""
                                effect="blur"
                              />
                            </div>
                          </div> */}
                          {/* <div className="col-lg-4 text-center">
                            <div className="how-it-work-step-image">
                              <LazyLoadImage
                                alt={"clientP2"}
                                src={clientP2}
                                className=""
                                effect="blur"
                              />
                            </div>
                            <h3><span className="txt-26-primary">2 Find the perfect match</span> </h3>
                            <div className="bs-wizard-info ">
                              Instantly find Cloud Experts with Exceptional
                              Talents, receive and compare the quotes.
                            </div>
                          </div> */}
                           <div className="col-lg-4 text-center">
                             <h3 className="hire_row"><span className="txt-26-primary hire_count hire_count2">2</span> </h3>
                            <br />
                            <div className="bs-wizard-info ">
                              Collaborate and Communicate with your Cloud Experts
                              directly and get your work done faster.
                            </div>
                            <div className="how-it-work-step-image">
                              <LazyLoadImage
                                alt={"clientP3"}
                                src={clientP3}
                                className=""
                                effect="blur"
                              />
                            </div>
                          </div>
                          <div className="col-lg-4 text-center">
                            <h3 className="hire_row"><span className="txt-26-primary hire_count hire_count3">3</span> </h3>
                            <br />
                            <div className="bs-wizard-info ">
                              Pay your Cloud Experts securely as milestones are
                              met for a job well done.
                            </div>
                            <div className="how-it-work-step-image">
                              <LazyLoadImage
                                alt={"clientP4"}
                                src={clientP4}
                                className=""
                                effect="blur"
                              />
                            </div>
                          </div>
                        </div>
                        {/* <div className="row mt-40 mb-40">
                          <div className="col-lg-5 text-center col-sm-6">

                          </div>
                          <div className="col-lg-2">

                          </div>
                          <div className="col-lg-5 text-center col-sm-6">
                            <LazyLoadImage
                              alt={"bottomarrowSolid"}
                              src={bottomarrowSolid}
                              className="h-170"
                              effect="blur"
                            />
                          </div>
                        </div> */}
                        <div className="row vt-center">
                          {/* <div className="col-lg-4 text-center">
                            <div className="how-it-work-step-image">
                              <LazyLoadImage
                                alt={"clientP4"}
                                src={clientP4}
                                className=""
                                effect="blur"
                              />
                            </div>
                            <h3><span className="txt-26-primary">4 Pay securely</span> </h3>
                            <div className="bs-wizard-info ">
                              Pay your Cloud Experts securely as milestones are
                              met for a job well done.
                            </div>
                          </div> */}
                          {/* <div className="col-lg-2">
                            <div>
                              <LazyLoadImage
                                alt={"rightarrowSolid"}
                                src={rightarrowSolid}
                                className="rt-180"
                                effect="blur"
                              />
                            </div>
                          </div> */}
                          {/* <div className="col-lg-5 text-center">
                            <div className="how-it-work-step-image">
                              <LazyLoadImage
                                alt={"clientP3"}
                                src={clientP3}
                                className=""
                                effect="blur"
                              />
                            </div>
                            <h3><span className="txt-26-primary">3 Get work done</span> </h3>
                            <div className="bs-wizard-info ">
                              Collaborate and Communicate with your Cloud Experts
                              directly and get your work done faster.
                            </div>
                          </div> */}
                        </div>

                        <div className="col-md-12">
                          <div className="mn_learnmore">
                            <Link
                              to={"/how-it-works"}
                            >
                              Hire CLOUD EXPERT
                            </Link>
                          </div>
                        </div>
                      </div>
                      <div id="menu1" className="tab-pane fade">

                        <div className="row">
                          <div className="col-lg-4 text-center">
                            <h3 className="hire_row"><span className="txt-26-primary hire_count hire_count1">1</span> </h3>
                            <br />
                            <div className="bs-wizard-info ">
                              Describe your skills and upload portfolio items and fill out your Talfoundry profile with previous job experience.
                            </div>
                            <div className="how-it-work-step-image">
                              <LazyLoadImage
                                alt={"cloudP1"}
                                src={cloudP1}
                                className=""
                                effect="blur"
                              />
                            </div>
                          </div>
                          <div className="col-lg-4 text-center">
                            <h3 className="hire_row"><span className="txt-26-primary hire_count hire_count2">2</span> </h3>
                            <br />
                            <div className="bs-wizard-info ">
                              When the client determines if you are right for the job, you can get hired and start working.
                            </div>
                            <div className="how-it-work-step-image">
                              <LazyLoadImage
                                alt={"cloudP3"}
                                src={cloudP3}
                                className=""
                                effect="blur"
                              />
                            </div>
                          </div>
                          <div className="col-lg-4 text-center">
                             <h3 className="hire_row"><span className="txt-26-primary hire_count hire_count3">3</span> </h3>
                             <br />
                            <div className="bs-wizard-info ">
                              It ensures you get paid for all your completed projects without any hassles through the freelancing website.
                            </div>
                            <div className="how-it-work-step-image">
                              <LazyLoadImage
                                alt={"cloudP4"}
                                src={cloudP4}
                                className=""
                                effect="blur"
                              />
                            </div>
                          </div>
                          {/* <div className="col-lg-2 text-center">
                            <div className="">
                              <LazyLoadImage
                                alt={"rightarrowSolid"}
                                src={rightarrowSolid}
                                className=""
                                effect="blur"
                              />
                            </div>
                          </div> */}
                          {/* <div className="col-lg-4 text-center">
                            <div className="how-it-work-step-image">
                              <LazyLoadImage
                                alt={"cloudP2"}
                                src={cloudP2}
                                className=""
                                effect="blur"
                              />
                            </div>
                            <h3><span className="txt-26-primary">2 Find the projects you like</span> </h3>
                            <div className="bs-wizard-info ">
                              Search through our list of available job offers for projects that fit your skills and compensation requirements.
                            </div>
                          </div> */}
                        </div>
                        {/* <div className="row mt-40 mb-40">
                          <div className="col-lg-5 text-center col-sm-6">

                          </div>
                          <div className="col-lg-2">

                          </div>
                          <div className="col-lg-5 text-center col-sm-6">
                            <LazyLoadImage
                              alt={"bottomarrowSolid"}
                              src={bottomarrowSolid}
                              className="h-170"
                              effect="blur"
                            />
                          </div>
                        </div> */}
                        <div className="row vt-center">
                          {/* <div className="col-lg-5 text-center">
                            <div className="how-it-work-step-image">
                              <LazyLoadImage
                                alt={"cloudP3"}
                                src={cloudP3}
                                className=""
                                effect="blur"
                              />
                            </div>
                            <h3><span className="txt-26-primary">3 Start working</span> </h3>
                            <div className="bs-wizard-info ">
                              When the client determines if you are right for the job, you can get hired and start working.
                            </div>
                          </div> */}
                          {/* <div className="col-lg-2">
                            <div>
                              <LazyLoadImage
                                alt={"rightarrowSolid"}
                                src={rightarrowSolid}
                                className="rt-180"
                                effect="blur"
                              />
                            </div>
                          </div> */}
                          {/* <div className="col-lg-5 text-center">
                            <div className="how-it-work-step-image">
                              <LazyLoadImage
                                alt={"cloudP4"}
                                src={cloudP4}
                                className=""
                                effect="blur"
                              />
                            </div>
                            <h3><span className="txt-26-primary">4 Get paid</span> </h3>
                            <div className="bs-wizard-info ">
                              It ensures you get paid for all your completed projects without any hassles through the freelancing website.
                            </div>
                          </div> */}

                        </div>
                        <div className="col-md-12">
                          <div className="mn_learnmore">
                            <Link
                              to={"/how-it-works"}
                            >
                              I WANT TO WORK
                            </Link>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            {/* End Section How It Works */}

            {/* Start Section call to action */}
            <div className="row text-center find-work-bg home-shape-6">
              <div className="container">
                <div className="col-md-5 px-0">
                  <div className="What_Type_Of_Work_Box text-left pt-3">
                    <h3 className="what-type-of-work-heading "><span className="txt-36-primary">Find the expert</span> you need, right now!</h3>
                    <h4 className="txt-18">Hire qualified and verified cloud expert from all over the world</h4>
                    <h4 className="txt-18">Manage your entire project with TalFoundry. Pay Safely and securely.</h4>
                    <Link
                      to="#"
                      className="project_category_name project_category_name_new_landing"
                      onClick={(e) => this.handleSignUpModal(e)}
                    >
                      Join for free
                    </Link>
                    <span className="no-upfront-payment pl-3">No upfront payment, no hidden fees.</span>
                  </div>
                </div>
                <div className="col-md-7 what-type-of-work-image">
                  <LazyLoadImage
                    alt={"Find_work_fullframe"}
                    src={Find_work_fullframe}
                  />
                </div>
              </div>
            </div>
            {/* End Section call to action */}

            <br />

            {/* Start Section How It Works */}

              <div className="row" id="mn_project">
                <div className="container px-0">
                  <div className="col-md-12 px-0">
                    <div className="mn_project">
                      <h3 className="explore_ces How_It_Works_heading">Why Choose TalFoundry</h3>
                    </div>

                    <div className="home-shape-17">
                      <div className="row">
                        <div className="container">
                          <div className="col-md-4 home-shape-7">
                            <LazyLoadImage
                              alt={"whyChoose1"}
                              src={whyChoose1}
                              className="responsive-image mt-30 how-it-works-page-image"
                              effect="blur"
                            />
                          </div>
                          <div className="col-md-4">
                            <div className="What_Type_Of_Work_Box text-left">
                              <h3 className="explore_ces "><span className="txt-26-primary">Top quality talent on demand</span></h3>
                              <p>Get access to quality Cloud Experts with a wide range of specialized cloud skills on demand. We only let in the top 1% of applicants, so you get access to the best of the best.</p>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="home-shape-16">
                      <div className="row">
                        <div className="container">
                          <div className="col-md-4 col-md-offset-4">
                            <div className="What_Type_Of_Work_Box text-left">
                              <h3 className="explore_ces"><span className="txt-26-primary">Comprehensive vetting process</span></h3>
                              <p>Spend less time screening, more time executing. Every candidate is pre-vetted and tailor matched to you.</p>
                            </div>
                          </div>
                          <div className="col-md-4 home-shape-8">
                            <LazyLoadImage
                              alt={"whyChoose2"}
                              src={whyChoose2}
                              className="responsive-image how-it-works-page-image mt-30"
                              effect="blur"
                            />
                          </div>
                        </div>
                      </div>
                    </div>

                    <div className="row">
                      <div className="container">
                        <div className="col-md-4 home-shape-9">
                          <LazyLoadImage
                            alt={"whyChoose3"}
                            src={whyChoose3}
                            className="responsive-image how-it-works-page-image mt-30"
                            effect="blur"
                          />
                        </div>
                        <div className="col-md-4">
                          <div className="What_Type_Of_Work_Box text-left home-shape-15">
                            <h3 className="explore_ces "><span className="txt-26-primary">Safe & secure</span></h3>
                            <p>We value your safety and trust. We monitor every transaction and procedure in place to protect you from phishing, fraud, and identity theft.</p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="row bs-wizard light-blue-home">
                  <div className="container">
                    <div className="col-md-4 col-sm-4 col-xs-12 text-center">
                      <div className="col-md-12">
                        <LazyLoadImage
                          alt={"quality_talent_on_demand"}
                          src={quality_talent_on_demand}
                          className="how-it-work-step-image"
                          effect="blur"
                        />
                        {/* <div className="arrow-holder d-none d-lg-inline-block"></div> */}

                        <div className="">
                          <div className=""></div>
                        </div>
                        <p href="!#" className=""></p>
                        <h3 className="txt-18 txt-bold text-uppercase">Hassle-free billing</h3>
                        <div className="bs-wizard-info ">
                          <p className="txt-18">Everything in one place. Manage all hours, billing, and future requests from your talfoundry account.</p>
                        </div>
                      </div>
                    </div>

                    <div className="col-md-4 col-sm-4 col-xs-12 text-center">
                      <div className="col-md-12">
                        <LazyLoadImage
                          alt={"pre_vetted_talent"}
                          src={pre_vetted_talent}
                          className="how-it-work-step-image"
                          effect="blur"
                        />
                        {/* <div className="arrow-holder d-none d-lg-inline-block"></div> */}
                        {/* <div className="text-center bs-wizard-stepnum">2</div> */}
                        <div className="">
                          <div className=""></div>
                        </div>
                        <p href="!#" className=""></p>
                        <h3 className="txt-18 txt-bold">FLEXIBILITY & SCALE</h3>
                        <div className="bs-wizard-info ">
                          <p className="txt-18">Tap into top-tier talent and scale your short or long-term projects.</p>
                        </div>
                      </div>
                    </div>


                    <div className="col-md-4 col-sm-4 col-xs-12 text-center">
                      <div className="col-md-12">
                        <LazyLoadImage
                          alt={"speed_scale"}
                          src={speed_scale}
                          className="how-it-work-step-image"
                          effect="blur"
                        />
                        {/* <div className="text-center bs-wizard-stepnum">4</div> */}
                        <div className="">
                          <div className=""></div>
                        </div>
                        <p href="!#" className=""></p>
                        <h3 className="txt-18 txt-bold">Stellar 24/7 Support</h3>
                        <div className="bs-wizard-info ">
                          <p className="txt-18">Our support team is there to help you every step of the way via phone, email, and live chat.</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
            
            </div>
            {/* End Section How It Works */}

            <div className="home-shape-13">
            <div className="right-job-section home-hape-10 ">
              <div className="container">
                <div className="row">
                  <div className="col-md-12 pt-3 pb-3">
                    <div className="mn_project">
                      <h3 className="explore_ces How_It_Works_heading">Choose the <span className="txt-36-primary">right job</span> for you</h3>
                      <div className="row">
                        <div className="col-md-12 m-auto">
                          <p className="text-center txt-18">We're sure you can find the perfect job in our panel below. If you meet the requirements and consider that the benefits are motivational make sure you <Link to="/">apply using the form</Link></p>
                        </div>
                        <div className="text-center">
                          <LazyLoadImage src={rightJob} alt="rightJob" />
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

              </div>
            </div>
            </div>
            <div className="container" id="job_sec">
            </div>

            <div className="short-term-project-sec">
              <div className="row pt-4 mb-40">
                <div className="container gridBox">
                  <div className="col-md-4">
                    <div className="project-boxes">
                      <i className="fa fa-clock-o icon-fill-yellow icon-medium"></i>
                      <h3 className="explore_ces txt-bold">Short Term Projects</h3>
                      <div className="Project_term_box text-left">

                        <p className="txt-18">Find highly specialized Cloud Experts for your short term tasks or large projects. Our Platform is designed to ask all the right questions to help you match you with the right freelance talent.</p>
                      </div>
                    </div>

                  </div>

                  <div className="col-md-4">
                    <div className="project-boxes">
                      <i className="fa fa-stop-circle-o icon-fill-blue icon-medium"></i>
                      <h3 className="explore_ces txt-bold">Full Time</h3>
                      <div className="Project_term_box text-left">

                        <p className="txt-18">Scale your team with a skilled resource, choose from freelancers over 1000 different cloud skill sets who have been pre-vetted and approved. We offer flexible engagements from hourly to full-time.</p>
                      </div>
                    </div>

                  </div>


                  <div className="col-md-4">
                    <div className="project-boxes">
                      <i className="fa fa-exchange icon-fill-orange icon-medium"></i>
                      <h3 className="explore_ces txt-bold">Recurring Projects</h3>
                      <div className="Project_term_box text-left">

                        <p className="txt-18">Build a pool of diverse top developers, engineers, programmers, coders, architects, and consultants for your mission-critical projects. Our talent has proven experience in their domains in delivering complex projects.</p>
                      </div>
                    </div>

                  </div>

                </div>

              </div>
            </div>


            {/* End Section Multiple Project Requirements */}


            {/* </div>
            </div> */}
          </div>
        </div>
        </div>
        <div className="clearfix"></div>



        {/* <Footer /> */}
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  ...state,
});


const mapDispatchToProps = (dispatch) => {
  return {
    confirmEmail: (data) => dispatch(confirmEmailAciton(data))
  }
}
export default connect(mapStateToProps, mapDispatchToProps)(HomePage);
