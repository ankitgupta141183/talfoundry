import React, { Component } from "react";
import { connect } from "react-redux";
import forgetAnswer from "../../static/images/forget-answer.png";
import {
  verifyCode,
  sendVerificationEmail,
} from "../../Actions/forgetAndResetPasswordActions";
import { forgetStep } from "../../Actions/forgetAndResetPasswordActions";
import ProjectManagerHeader from "../miscellaneous/ProjectManagerHeader";
import FreelancerHeader from "../miscellaneous/FreelancerHeader";
import { Link } from "react-router-dom";
import PMDashboardSideBar from "../projectManager/PMDashboardSideBar";
import BreadCrumb from "../miscellaneous/BreadCrumb";


class ForgetAnswer extends Component {
  constructor(props, context) {
    super(props, context);
    this.state = {
      email: "",
      isInvalidEmail: false,
      errMessage: "",
      isEmailSent: false,
      code: "",
      message: null,
      errorMessage: "",
    };
  }

  componentDidMount() {
    this.props.sendVerificationEmail();
  }

  handleChange = (e) => {
    this.setState({
      [e.target.name]: e.target.value,
      errorMessage: "",
    });
  };

  fieldError(message) {
    return (
      <p id="firstName" className="error-field">
        {message ? message : "This field can't be blank."}
      </p>
    );
  }

  handleContinue = () => {
    this.state.code && this.state.code.length > 5
      ? this.props.verifyCode(this.state.code).then((res) => {
          if (res && res.verified) {
            this.props.history.push("/reset-answer");
          } else {
            this.setState(
              {
                verified: false,
                message: "Wrong code entered , try again",
              },
              () => {
                setTimeout(
                  function () {
                    this.setState({ message: "" });
                  }.bind(this),
                  3000
                );
              }
            );
          }
        })
      : this.setState({ errorMessage: "Code must be of six characters" });
  };

  render() {
    const {
      code,
      message,
      errorMessage,
    } = this.state;
    return (
      <React.Fragment>
        <div className="">
          {this.props.location.state.role === "Project Manager" ||
          "Freelancer" ? (
            <ProjectManagerHeader history={this.props.history} />
          ) : (
            <FreelancerHeader history={this.props.history} />
          )}
        </div>
        <div id="tf-project-manager-dashboard-root">
        {
                this.props.location.state.role === "Project Manager" && <div>
                  <BreadCrumb step={"step6"} link="Forget Answer" />
                </div>
              }
        </div>
        {/* <div className="">
            {this.props.location.state.role === "Project Manager" ||
            "Freelancer" ? (
              <PMDashboardSideBar history={this.props.history}/>
            ) : ''}
            
        </div> */}
        <div className="wraper">
          <div className={!this.props.loginSteps.showHideSideBar ? "mains" : "main-add"}>
            <section id="add-security-question" className="">
              
              <div className="row custom_row">
                <div className="col-md-2 col-sm-2 col-xs-2">
                  <div className="custom_sticky_container">
                  <div className="position-sticky">
                      {this.props.location.state.role === "Project Manager" ||
                      "Freelancer" ? (
                        <PMDashboardSideBar history={this.props.history}/>
                      ) : ''}
                  </div>
                  </div>
                </div>

                <div className="col-md-2 col-sm-1 col-xs-1"></div>

                <div className="col-md-5 col-sm-5 col-xs-5">
                  <div className="tf_profile">
                    <div className="col-md-12">
                      <div className="form-group">
                        <div className="clearfix"></div>
                        <img src={forgetAnswer} className="forget-answer-image" alt=""/>

                        <h3 className="forget-answer-title">
                          Help is on the way!
                        </h3>
                        <div className="clearfix"></div>

                        <p className="forget-answer-description">
                          We sent an email to {this.props.location.state.email}{" "}
                          with a six digit code. To reset your security question,
                          enter the code provided in the box below. The code can
                          only be used once.
                        </p>
                      </div>
                      <div className="clearfix"></div>

                      <div className="form-group">
                        <div className="clearfix"></div>
                        <div className="col-md-12 nopad">
                          <div className="input-group tf_loca">
                            <input
                              type="text"
                              className="form-control mn_input"
                              name="code"
                              onChange={this.handleChange}
                              placeholder="Enter 6-digit code"
                              defaultValue={code}
                            />
                          </div>
                          <p className="error_forgot_answer"> {errorMessage} </p>
                          <p className="error_forgot_answer"> {message} </p>
                          <p className="resend-email-text">
                            Didn't receive your code?
                          </p>
                          <p className="resend-email-text">
                            <Link onClick={(e) => {e.preventDefault(); this.props.sendVerificationEmail()}}>
                              Resend email
                            </Link>
                          </p>
                        </div>
                      </div>
                      <div className="clearfix"></div>
                    </div>

                    <hr />

                    <div className="col-md-12">
                      <div className="col-md-12">
                        <div className="">
                          <div className="col-md-12">
                            <Link onClick={(e) => {e.preventDefault();  this.handleContinue()}}
                              className="forget-answer-continue-button">
                              Continue
                            </Link>
                          </div>
                        </div>
                        <div className="clearfix"></div>
                      </div>

                      <div className="clearfix"></div>
                    </div>
                  </div>
                </div>
                <div className="col-md-3 col-sm-3 col-xs-3"> </div>
              </div>
            </section>
          </div>
        </div>
      </React.Fragment>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    ...state,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    sendVerificationEmail: () => dispatch(sendVerificationEmail()),
    verifyCode: (code) => dispatch(verifyCode(code)),
    forgetStep: (data) => dispatch(forgetStep(data)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(ForgetAnswer);
