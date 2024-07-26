import React, { Component } from "react";
import { Link } from "react-router-dom";
import LoginPopUp from "../miscellaneous/LoginPopUP";
import talfoundry_logo from "../../static/images/logo/logo.svg";
import talfoundry_light_blue from "../../static/images/logo/logo-light-blue.png";
import category_page_description_2 from "../../static/images/new_job_posting_back.png";
import SignUpPopUpNew from "../miscellaneous/SignUpPopUpNew";
import Footer from "../miscellaneous/Footer";
import LandingPageHeader from "../miscellaneous/LandingPageHeader";

export default class LandingPageCategory extends Component {
  constructor(props, context) {
    super(props, context);
    this.state = {
      scrolling: false,
      openModal: false,
      openSignUpModal: false,
      categoryData: {
        category: [],
      },
      category: ''
    };
    this.handleScroll = this.handleScroll.bind(this);
    this.categoryFunction = this.categoryFunction.bind(this);
  }

  componentDidMount() {
    window.addEventListener("scroll", this.handleScroll);
    console.log(this.props.location)
    if (this.props.location.state) {
      this.setState({ category: this.props.location.state.category })
    }
  }

  UNSAFE_componentWillUnmount() {
    window.removeEventListener("scroll", this.handleScroll);
  }

  categoryFunction = (id, event) => {
    let categoryData = this.state.categoryData;
    categoryData["category"].push(id);
    this.setState({ categoryData: categoryData });
    this.props.addDataCategoryDescription(this.state.categoryData);
  };

  handleScroll(event) {
    if (window.scrollY <= 100 && this.state.scrolling) {
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

  handleSignUpModal = () => {
    this.setState({ openSignUpModal: true });
  }

  closeSignUpModal = () => {
    this.setState({ openSignUpModal: false });
  }

  returnLinkTag = (cat, title) => {
    return (
      <Link
        className="category-shadow-list-inner"
        to={{
          pathname: "/job-search",
          state: {
            search: title,
          },
        }}
      >
        <div>
          <span><i class="fa fa-briefcase pr-2"></i></span>
        </div>
        <span>{title}</span>

      </Link>
    )
  }

  render() {
    return (
      <div className="cat-page">
        <div className="wraper">
          <div className="header_top landing-page-not-down-menu">
            {/* <LoginPopUp
              isOpen={this.state.openModal}
              closeModal={this.closeModal}
              history={this.props.history}
            /> */}
            {/* <SignUpPopUpNew
              isOpen={this.state.openSignUpModal}
              closeModal={this.closeSignUpModal}
              history={this.props.history}
            /> */}
            <div className="header trangle_background-category-page">
              <div
                className={`navigation landing-page-transparent-header ${this.state.scrolling ? "scrollFix" : "scrollFix"
                  }`}
                id="scroll-feature"
              >
            <LandingPageHeader 
            history={this.props.history}
            />
              </div>
              <div className="tf_we">
                <div className="container">
                  <div className="mn_welcome category_page_description">
                    <div className="col-xs-12 col-md-6 col-sm-6 nopad">
                      <h2 className="home_page_color_cloud_page_description trangle_background-category-page-left-text">
                        Connect and Hire Independent <span></span>
                      </h2>
                    </div>

                    <div className="col-xs-12 col-md-6 col-sm-6 nopad">
                      <img
                        src={category_page_description_2}
                        alt=""
                        className=""
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="clearfix"></div>

        <div className="clearfix"></div>
        <div className="cloud_expert_home_page ">
          <div className="container">
            <div className="ftr ftr_description">
              <div className="category_page_bg col-md-12">
                <div className="row mb-40">
                  <div className="col-sm-12 tf_ftr_res">
                    <div className={this.state.category === 'aws' ? "mn_ftr_names category_overall_content active" : "mn_ftr_names category_overall_content"} id="category_overall_content">
                      <div className="card-container">
                        <Link
                          to="/category_page_description"
                          className="project_category_name"
                          onClick={() => this.setState({ category: 'aws' })}
                        >
                          Amazon Web Services
                        </Link>
                        <div className="">
                          <div className="card--border"></div>
                        </div>
                      </div>

                      <ul className="category-shadow-list">
                        <li>
                          {this.returnLinkTag("AWS", "AWS Solutions Architect")}
                        </li>
                        <li>
                          {this.returnLinkTag("AWS", "AWS Developer")}
                        </li>
                        <li>
                          {this.returnLinkTag("AWS", "AWS DevOps Engineer")}
                        </li>
                        <li>
                          {this.returnLinkTag("AWS", "AWS Big Data Engineer")}
                        </li>
                        <li>
                          {this.returnLinkTag("AWS", "AWS Infrastructure Architect")}
                        </li>
                        <li>
                          {this.returnLinkTag("AWS", "AWS Security Engineer")}
                        </li>
                      </ul>
                    </div>
                  </div>
                </div>

                <div className="row mb-40 d-flex justify-content-center">
                  <div className="col-sm-12 tf_ftr_res">
                    <div className={this.state.category === 'sales' ? "mn_ftr_names category_overall_content active" : "mn_ftr_names category_overall_content"} id="category_overall_content">
                      <div className="card-container">
                        <Link
                          to="/category_page_description"
                          className="project_category_name"
                          onClick={() => this.setState({ category: 'sales' })}
                        >
                          Salesforce
                        </Link>
                        <div className="">
                          <div className="card--border"></div>
                        </div>
                      </div>

                      <ul className="category-shadow-list">
                        <li>
                          {this.returnLinkTag("Salesforce", "Salesforce Lightning Consultant")}
                        </li>
                        <li>
                          {this.returnLinkTag("Salesforce", "Salesforce Architect")}
                        </li>
                        <li>
                          {this.returnLinkTag("Salesforce", "Salesforce Administrator")}
                        </li>
                        <li>
                          {this.returnLinkTag("Salesforce", "Salesforce Platform Developer")}
                        </li>
                        <li>
                          {this.returnLinkTag("Salesforce", "Salesforce Technical Architect")}
                        </li>
                        <li>
                          {this.returnLinkTag("Salesforce", "Salesforce Systems Architect")}
                        </li>
                      </ul>
                    </div>
                  </div>
                </div>

                <div className="row mb-40 d-flex justify-content-center">
                  <div className="col-sm-12 tf_ftr_res">
                    <div className={this.state.category === 'oracle' ? "mn_ftr_names category_overall_content active" : "mn_ftr_names category_overall_content"} id="category_overall_content">
                      <div className="card-container">
                        <Link
                          to="/category_page_description"
                          className="project_category_name"
                          onClick={() => this.setState({ category: 'oracle' })}
                        >
                          Oracle Cloud
                        </Link>
                        <div className="">
                          <div className="card--border"></div>
                        </div>
                      </div>

                      <ul className="category-shadow-list">
                        <li>
                          {this.returnLinkTag("Oracle", "Oracle Cloud Infrastructure Engineer")}
                        </li>
                        <li>
                          {this.returnLinkTag("Oracle", "Oracle Cloud Financials Architect")}
                        </li>
                        <li>
                          {this.returnLinkTag("Oracle", "Oracle Cloud HCM Architect")}
                        </li>
                        <li>
                          {this.returnLinkTag("Oracle", "Oracle Cloud Supply Chain Architect")}
                        </li>
                        <li>
                          {this.returnLinkTag("Oracle", "Oracle eBusiness Suite Consultant")}
                        </li>
                        <li>
                          {this.returnLinkTag("Oracle", "Oracle Developer")}
                        </li>
                      </ul>
                    </div>
                  </div>
                </div>

                <div className="row mb-40 d-flex justify-content-center">

                  <div className="col-sm-12 tf_ftr_res">
                    <div className={this.state.category === 'ms' ? "mn_ftr_names category_overall_content active" : "mn_ftr_names category_overall_content"} id="category_overall_content">
                      <div className="card-container">
                        <Link
                          to="/category_page_description"
                          className="project_category_name"
                          onClick={() => this.setState({ category: 'ms' })}
                        >
                          MS Azure
                        </Link>
                        <div className="">
                          <div className="card--border"></div>
                        </div>
                      </div>

                      <ul className="category-shadow-list">
                        <li>
                          {this.returnLinkTag("MS Azure", "MS Azure Infrastructure Architect")}
                        </li>
                        <li>
                          {this.returnLinkTag("MS Azure", "MS Azure Professional Cloud Architect")}
                        </li>
                        <li>
                          {this.returnLinkTag("MS Azure", "MS Azure Data Engineer")}
                        </li>
                        <li>
                          {this.returnLinkTag("MS Azure", "MS Azure Cloud Administrator")}
                        </li>
                        <li>
                          {this.returnLinkTag("MS Azure", "MS Azure Cloud Network Architect")}
                        </li>
                        <li>
                          {this.returnLinkTag("MS Azure", "MS Azure DevOps Engineer")}
                        </li>
                      </ul>
                    </div>
                  </div>

                </div>
                <div className="row mb-40 d-flex justify-content-center">
                  <div className="col-sm-12 tf_ftr_res">
                    <div className={this.state.category === 'google' ? "mn_ftr_names category_overall_content active" : "mn_ftr_names category_overall_content"} id="category_overall_content">
                      <div className="card-container">
                        <Link
                          to="/category_page_description"
                          className="project_category_name"
                          onClick={() => this.setState({ category: 'google' })}
                        >
                          Google Cloud
                        </Link>
                        <div className="">
                          <div className="card--border"></div>
                        </div>
                      </div>

                      <ul className="category-shadow-list">
                        <li>
                          {this.returnLinkTag("MS Azure", "Google Cloud Architect"
                            )}
                        </li>
                        <li>
                          {this.returnLinkTag("Google Cloud", "Google Cloud Administrator"
                            )}
                        </li>
                        <li>
                          {this.returnLinkTag("Google Cloud", "Google Cloud Platform Consultant"
                            )}
                        </li>
                        <li>
                          {this.returnLinkTag("Google Cloud", "Google Cloud Network Architect"
                            )}
                        </li>
                        <li>
                          {this.returnLinkTag("Google Cloud", "Google Cloud Developer"
                            )}
                        </li>
                        <li>
                          {this.returnLinkTag("Google Cloud", "Google Cloud DevOps Engineer"
                            )}
                        </li>
                      </ul>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="mn_footer mn_footer_new"></div>
        <div className="">
          <Footer />
        </div>
      </div>
    );
  }
}
