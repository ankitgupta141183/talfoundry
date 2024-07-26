import React, { Component } from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";

import HiringAccount from "../../../src/static/images/work-securly.png";
import FreelancingAccount from "../../../src/static/images/post-jobs – 1@2xlatest.png";


class HowCanHelpYou extends Component {
  constructor(props, context) {
    super(props, context);
    this.state = {
      openSignUpModal: false,
      path : '',
      hire1: false,
      freelancer1: false
    }
  }

  showSection = (type) => {
    // console.log("event.target",type)
    if (type === "hire") {
      this.setState({
        hire1: true,
        freelancer1: false
      })
    }else{
      this.setState({
        hire1: false,
        freelancer1: true
      })
    }
  }

  render() {
    // console.log('=======',this.props.isAuthenticated)
    return (
      <div>


        <div className="clearfix"></div>
        {!(this.props.hire1 || this.props.freelancer1) &&
          <div className="faqSelectAccount">
            <div className="faqSelectAccountBox"  role="tablist">
              <a href="#hiring1"
                aria-controls="hiring1"
                role="tab"
                data-toggle="tab"
                aria-expanded="true"
               onClick={() => this.props.showSection('hire')}>
                <img src={HiringAccount} alt="hire"/>
                <h4>If you’re hiring</h4>
              </a>
              <a href="#freelancing1"
                aria-controls="freelancing1"
                role="tab"
                data-toggle="tab"
                aria-expanded="true"
                onClick={() => this.props.showSection('fhire')}>
              <img src={FreelancingAccount} alt="freelancer"/>
                <h4>If you’re freelancing</h4>
              </a>
            </div>
          </div>
        }

        <div className="clearfix"></div>
        {(this.props.hire1 || this.props.freelancer1)  &&

          <div className="tf_services">

              <div className="tab-content tf_home howCanHelpbody">
                <div role="tabpanel" className={this.props.hire1 ? "tab-pane active" : "tab-pane"} id="hiring1">
                  <div className="container pt-5">
                    <h3>Select a Category</h3>


                    <div className="row">

                      <div className="col-md-4 categoryCard">
                        <h4>About TalFoundry</h4>
                        <Link to={{pathname: `/how-it-works-freelancer`,
                            state: {
                                    hire: true,
                                    mainPMTab: 1,
                                    childPMTab: 1,
                                    subChildPMTab: 1,
                                    freelancer: false,
                                    mainFRTab: 1,
                                    childFRTab: 1,
                                    subChildFRTab: 1
                                  }
                                }} >How it Works,</Link>
                        <Link to={{pathname: `/how-it-works-freelancer`,
                            state: {
                                    hire: true,
                                    mainPMTab: 1,
                                    childPMTab: 2,
                                    subChildPMTab: 1,
                                    freelancer: false,
                                    mainFRTab: 1,
                                    childFRTab: 1,
                                    subChildFRTab: 1
                                  }
                                }}>Cost,</Link>
                        <Link to={{pathname: `/how-it-works-freelancer`,
                            state: {
                                    hire: true,
                                    mainPMTab: 1,
                                    childPMTab: 3,
                                    subChildPMTab: 1,
                                    freelancer: false,
                                    mainFRTab: 1,
                                    childFRTab: 1,
                                    subChildFRTab: 1
                                  }
                                }}>Security</Link>
                      </div>

                      <div className="col-md-4 categoryCard">
                        <h4>Your Account</h4>

                        <Link to={{pathname: `/how-it-works-freelancer`,
                            state: {
                                    hire: true,
                                    mainPMTab: 2,
                                    childPMTab: 1,
                                    subChildPMTab: 1,
                                    freelancer: false,
                                    mainFRTab: 1,
                                    childFRTab: 1,
                                    subChildFRTab: 1
                                  }
                                }}> Create an Account,</Link>
                        <Link to={{pathname: `/how-it-works-freelancer`,
                            state: {
                                    hire: true,
                                    mainPMTab: 2,
                                    childPMTab: 2,
                                    subChildPMTab: 1,
                                    freelancer: false,
                                    mainFRTab: 1,
                                    childFRTab: 1,
                                    subChildFRTab: 1
                                  }
                                }}>Manage Account,</Link>
                      </div>

                      <div className="col-md-4 categoryCard">
                          <h4>Post a Job</h4>
                          <Link to={{pathname: `/how-it-works-freelancer`,
                            state: {
                                    hire: true,
                                    mainPMTab: 3,
                                    childPMTab: 1,
                                    subChildPMTab: 1,
                                    freelancer: false,
                                    mainFRTab: 1,
                                    childFRTab: 1,
                                    subChildFRTab: 1
                                  }
                                }}>How to Post a Job,</Link>
                          <Link to={{pathname: `/how-it-works-freelancer`,
                            state: {
                                    hire: true,
                                    mainPMTab: 3,
                                    childPMTab: 2,
                                    subChildPMTab: 1,
                                    freelancer: false,
                                    mainFRTab: 1,
                                    childFRTab: 1,
                                    subChildFRTab: 1
                                  }
                                }}>Featured Jobs,</Link>
                          <Link to={{pathname: `/how-it-works-freelancer`,
                            state: {
                                    hire: true,
                                    mainPMTab: 3,
                                    childPMTab: 3,
                                    subChildPMTab: 1,
                                    freelancer: false,
                                    mainFRTab: 1,
                                    childFRTab: 1,
                                    subChildFRTab: 1
                                  }
                                }}>Job Status,</Link>
                          <Link to={{pathname: `/how-it-works-freelancer`,
                            state: {
                                    hire: true,
                                    mainPMTab: 3,
                                    childPMTab: 4,
                                    subChildPMTab: 1,
                                    freelancer: false,
                                    mainFRTab: 1,
                                    childFRTab: 1,
                                    subChildFRTab: 1
                                  }
                                }}>Edit/Repost Job,</Link>
                          <Link to={{pathname: `/how-it-works-freelancer`,
                            state: {
                                    hire: true,
                                    mainPMTab: 3,
                                    childPMTab: 5,
                                    subChildPMTab: 1,
                                    freelancer: false,
                                    mainFRTab: 1,
                                    childFRTab: 1,
                                    subChildFRTab: 1
                                  }
                                }}>Stop Receiving Quotes,</Link>
                          <Link to={{pathname: `/how-it-works-freelancer`,
                            state: {
                                    hire: true,
                                    mainPMTab: 3,
                                    childPMTab: 6,
                                    subChildPMTab: 1,
                                    freelancer: false,
                                    mainFRTab: 1,
                                    childFRTab: 1,
                                    subChildFRTab: 1
                                  }
                                }}>Unsupported Jobs</Link>
                      </div>
                      <div className="col-md-4 categoryCard">
                          <h4>Hire Freelancer</h4>
                          <Link to={{pathname: `/how-it-works-freelancer`,
                            state: {
                                    hire: true,
                                    mainPMTab: 4,
                                    childPMTab: 1,
                                    subChildPMTab: 1,
                                    freelancer: false,
                                    mainFRTab: 1,
                                    childFRTab: 1,
                                    subChildFRTab: 1
                                  }
                                }}>About Hire Freelancer,</Link>
                          <Link to={{pathname: `/how-it-works-freelancer`,
                            state: {
                                    hire: true,
                                    mainPMTab: 4,
                                    childPMTab: 2,
                                    subChildPMTab: 1,
                                    freelancer: false,
                                    mainFRTab: 1,
                                    childFRTab: 1,
                                    subChildFRTab: 1
                                  }
                                }}>Find Freelancers,</Link>
                          <Link to={{pathname: `/how-it-works-freelancer`,
                            state: {
                                    hire: true,
                                    mainPMTab: 4,
                                    childPMTab: 3,
                                    subChildPMTab: 1,
                                    freelancer: false,
                                    mainFRTab: 1,
                                    childFRTab: 1,
                                    subChildFRTab: 1
                                  }
                                }}>Review Quotes,</Link>
                          <Link to={{pathname: `/how-it-works-freelancer`,
                            state: {
                                    hire: true,
                                    mainPMTab: 4,
                                    childPMTab: 4,
                                    subChildPMTab: 1,
                                    freelancer: false,
                                    mainFRTab: 1,
                                    childFRTab: 1,
                                    subChildFRTab: 1
                                  }
                                }}>Communicating with Freelancers,</Link>
                          <Link to={{pathname: `/how-it-works-freelancer`,
                            state: {
                                    hire: true,
                                    mainPMTab: 4,
                                    childPMTab: 5,
                                    subChildPMTab: 1,
                                    freelancer: false,
                                    mainFRTab: 1,
                                    childFRTab: 1,
                                    subChildFRTab: 1
                                  }
                                }}>Hiring a Freelancer</Link>
                      </div>
                      <div className="col-md-4 categoryCard">
                          <h4>Managing Your Job</h4>
                          <Link to={{pathname: `/how-it-works-freelancer`,
                            state: {
                                    hire: true,
                                    mainPMTab: 5,
                                    childPMTab: 1,
                                    subChildPMTab: 1,
                                    freelancer: false,
                                    mainFRTab: 1,
                                    childFRTab: 1,
                                    subChildFRTab: 1
                                  }
                                }}> Contract,</Link>
                          <Link to={{pathname: `/how-it-works-freelancer`,
                            state: {
                                    hire: true,
                                    mainPMTab: 5,
                                    childPMTab: 2,
                                    subChildPMTab: 1,
                                    freelancer: false,
                                    mainFRTab: 1,
                                    childFRTab: 1,
                                    subChildFRTab: 1
                                  }
                                }}> End Your Contract</Link>
                      </div>
                      <div className="col-md-4 categoryCard">
                          <h4>Feedback</h4>
                          <Link to={{pathname: `/how-it-works-freelancer`,
                            state: {
                                    hire: true,
                                    mainPMTab: 6,
                                    childPMTab: 1,
                                    subChildPMTab: 1,
                                    freelancer: false,
                                    mainFRTab: 1,
                                    childFRTab: 1,
                                    subChildFRTab: 1
                                  }
                                }}> About Feedback,</Link>
                      </div>
                    </div>
                  </div>
                </div>

                <div role="tabpanel" className={this.props.freelancer1 ? "tab-pane active" : "tab-pane"} id="freelancing1">
                  <div className="container pt-5">
                    <h3>Select a Category</h3>

                    <div className="row">

                      <div className="col-md-4 categoryCard">
                        <h4>About TalFoundry</h4>
                        <Link to={{pathname: `/how-it-works-freelancer`,
                            state: {
                                    hire: false,
                                    mainPMTab: 1,
                                    childPMTab: 1,
                                    subChildPMTab: 1,
                                    freelancer: true,
                                    mainFRTab: 1,
                                    childFRTab: 1,
                                    subChildFRTab: 1
                                  }
                                }}>How it Works,</Link>
                        <Link to={{pathname: `/how-it-works-freelancer`,
                            state: {
                                    hire: false,
                                    mainPMTab: 1,
                                    childPMTab: 1,
                                    subChildPMTab: 1,
                                    freelancer: true,
                                    mainFRTab: 1,
                                    childFRTab: 2,
                                    subChildFRTab: 1
                                  }
                                }}>Fees,</Link>
                        <Link to={{pathname: `/how-it-works-freelancer`,
                            state: {
                                    hire: false,
                                    mainPMTab: 1,
                                    childPMTab: 1,
                                    subChildPMTab: 1,
                                    freelancer: true,
                                    mainFRTab: 1,
                                    childFRTab: 3,
                                    subChildFRTab: 1
                                  }
                                }}>Security</Link>
                      </div>

                      <div className="col-md-4 categoryCard">
                        <h4>Your Account</h4>
                        <Link to={{pathname: `/how-it-works-freelancer`,
                            state: {
                                    hire: false,
                                    mainPMTab: 1,
                                    childPMTab: 1,
                                    subChildPMTab: 1,
                                    freelancer: true,
                                    mainFRTab: 2,
                                    childFRTab: 1,
                                    subChildFRTab: 1
                                  }
                                }}>Create an Account,</Link>
                        <Link to={{pathname: `/how-it-works-freelancer`,
                            state: {
                                    hire: false,
                                    mainPMTab: 1,
                                    childPMTab: 1,
                                    subChildPMTab: 1,
                                    freelancer: true,
                                    mainFRTab: 2,
                                    childFRTab: 2,
                                    subChildFRTab: 1
                                  }
                                }}>Manage Account,</Link>
                      </div>

                      <div className="col-md-4 categoryCard">
                        <h4>Profile</h4>
                        <Link to={{pathname: `/how-it-works-freelancer`,
                            state: {
                                    hire: false,
                                    mainPMTab: 1,
                                    childPMTab: 1,
                                    subChildPMTab: 1,
                                    freelancer: true,
                                    mainFRTab: 3,
                                    childFRTab: 1,
                                    subChildFRTab: 1
                                  }
                                }}>Your Profile,</Link>
                        <Link to={{pathname: `/how-it-works-freelancer`,
                            state: {
                                    hire: false,
                                    mainPMTab: 1,
                                    childPMTab: 1,
                                    subChildPMTab: 1,
                                    freelancer: true,
                                    mainFRTab: 3,
                                    childFRTab: 2,
                                    subChildFRTab: 1
                                  }
                                }}>Building your Profile,</Link>
                        <Link to={{pathname: `/how-it-works-freelancer`,
                            state: {
                                    hire: false,
                                    mainPMTab: 1,
                                    childPMTab: 1,
                                    subChildPMTab: 1,
                                    freelancer: true,
                                    mainFRTab: 3,
                                    childFRTab: 3,
                                    subChildFRTab: 1
                                  }
                                }}> Profile Visibility,</Link>
                      </div>

                      <div className="col-md-4 categoryCard">
                        <h4>Getting Hired</h4>
                        <Link to={{pathname: `/how-it-works-freelancer`,
                            state: {
                                    hire: false,
                                    mainPMTab: 1,
                                    childPMTab: 1,
                                    subChildPMTab: 1,
                                    freelancer: true,
                                    mainFRTab: 4,
                                    childFRTab: 1,
                                    subChildFRTab: 1
                                  }
                                }}>Find Jobs,</Link>
                        <Link to={{pathname: `/how-it-works-freelancer`,
                            state: {
                                    hire: false,
                                    mainPMTab: 1,
                                    childPMTab: 1,
                                    subChildPMTab: 1,
                                    freelancer: true,
                                    mainFRTab: 4,
                                    childFRTab: 2,
                                    subChildFRTab: 1
                                  }
                                }}>Communicating with Employers,</Link>
                        <Link to={{pathname: `/how-it-works-freelancer`,
                            state: {
                                    hire: false,
                                    mainPMTab: 1,
                                    childPMTab: 1,
                                    subChildPMTab: 1,
                                    freelancer: true,
                                    mainFRTab: 4,
                                    childFRTab: 3,
                                    subChildFRTab: 1
                                  }
                                }}>Apply to Jobs,</Link>
                      </div>

                      <div className="col-md-4 categoryCard">
                          <h4>Managing Your Job</h4>

                          <Link to={{pathname: `/how-it-works-freelancer`,
                            state: {
                                    hire: false,
                                    mainPMTab: 1,
                                    childPMTab: 1,
                                    subChildPMTab: 1,
                                    freelancer: true,
                                    mainFRTab: 5,
                                    childFRTab: 1,
                                    subChildFRTab: 1
                                  }
                                }}>Contract,</Link>
                          <Link to={{pathname: `/how-it-works-freelancer`,
                            state: {
                                    hire: false,
                                    mainPMTab: 1,
                                    childPMTab: 1,
                                    subChildPMTab: 1,
                                    freelancer: true,
                                    mainFRTab: 5,
                                    childFRTab: 2,
                                    subChildFRTab: 1
                                  }
                                }}>End a Contract</Link>
                      </div>

                      <div className="col-md-4 categoryCard">
                          <h4>Feedback</h4>
                          <Link to={{pathname: `/how-it-works-freelancer`,
                            state: {
                                    hire: false,
                                    mainPMTab: 1,
                                    childPMTab: 1,
                                    subChildPMTab: 1,
                                    freelancer: true,
                                    mainFRTab: 6,
                                    childFRTab: 1,
                                    subChildFRTab: 1
                                  }
                                }}> About Feedback,</Link>
                      </div>

                  </div>

                  </div>
                </div>


          </div>
          </div>
        }
      </div>
    );
  }
}

const mapStateToProps = state => ({
  ...state
})

export default connect(mapStateToProps)(HowCanHelpYou)