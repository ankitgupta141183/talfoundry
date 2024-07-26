import React, { Component } from "react";
import { connect } from "react-redux";
import "../../static/stylesheets/home.css";
import "../../index.css";
import { Link } from "react-router-dom";
// import logo_1 from "../../static/images/logo/logo.svg";
import logo_Img from "../../static/images/logo/logo.png";
// import LoginPopUp from "../miscellaneous/LoginPopUP";
// import SignUpPopUpNew from "../miscellaneous/SignUpPopUpNew";

class LandingPageHeader extends Component {
  constructor(props, context) {
    super(props, context)
    this.state = {
      scrolling: false,
      openModal: false,
      openSignUpModal: false,
    }
    this.handleScroll = this.handleScroll.bind(this)
  }
  componentDidMount() {
    window.addEventListener("scroll", this.handleScroll)
  }

  UNSAFE_componentWillUnmount() {
    window.removeEventListener("scroll", this.handleScroll)
  }
  handleScroll(event) {
    if (window.scrollY <= 0 && this.state.scrolling) {
      this.setState({ scrolling: false })
    } else if (window.scrollY >= 0 && !this.state.scrolling) {
      this.setState({ scrolling: true })
    }
  }
  handleNewScroll(event) {
    let obj = document.getElementById("mn_project")
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

  handleSignUpModal = () => {
    this.setState({ openSignUpModal: true })
  }

  closeSignUpModal = () => {
    this.setState({ openSignUpModal: false })
  }

  render() {
    return (
      <div className="wraper">
        <div className="header_top landing-page-search">
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
          <div className="header">
            <div
              className={`navigation ${
                this.state.scrolling ? "scrollFix" : ""
              }`}
              id="scroll-feature"
            >
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
                    <Link className="navbar-brand" to="/">
                      <img src={logo_Img} alt="logo" />
                    </Link>
                  </div>
                  <div className="collapse navbar-collapse" id="navbar">
                    <ul className="nav navbar-nav navbar-right main-header-all-menu">
                      <li>
                          <Link
                            to="/freelancer-search"
                            className={`mn_black ${
                            window.location.href.includes("freelancer-search") &&
                            "active"
                          }`}
                          >
                            Find Cloud Experts
                          </Link>
                        </li>
                        <li>
                          <Link to="/job-search" className={`mn_black ${
                            window.location.href.includes("job-search") &&
                            "active"
                          }`}>
                            Find Work
                          </Link>
                        </li>
                      {/* <li>
                        <Link
                          to="/job-search1"
                          className={`mn_black ${
                            window.location.href.includes("job-search1") &&
                            "active"
                          }`}
                        >
                          Find Work1
                        </Link>
                      </li> */}
                      <li className="dropdown table-dropdown custom-drop-down-menu-for-tf">
                        <Link
                          to="/advisory-services"
                          className={`mn_black ${
                            window.location.href.includes("advisory-services") &&
                            "active"
                          }`}
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
                          className={`mn_black ${
                            window.location.href.includes("how-it-works") &&
                            "active"
                          }`}
                          to="/how-it-works"
                        >
                          How It Works
                        </Link>
                      </li>
                      {/* <li>
                        <Link to={`#`} onClick={() => this.handleOPenModal("")}>
                          Post a Project
                        </Link>
                      </li> */}
                      <li>
                        <Link to={`/login`} 
                        // onClick={() => this.handleOPenModal("")}
                        className={`mn_black ${
                          window.location.href.includes("login") &&
                          "active"
                        }`}
                        >
                          Login
                        </Link>
                      </li>
                      <li>
                        <Link
                          to={`/sign-up`}
                          className="active"
                          // onClick={() => this.handleSignUpModal("")}
                          style={{background:'rgb(255, 107, 84)'}}
                        >
                          Sign Up for Free
                        </Link>
                      </li>
                    </ul>
                  </div>
                </div>
              </nav>
            </div>
          </div>
        </div>
      </div>
    )
  }
}

const mapStateToProps = (state) => ({
  ...state,
})

export default connect(mapStateToProps)(LandingPageHeader)
