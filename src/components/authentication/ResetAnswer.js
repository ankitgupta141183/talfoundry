import React, { Component } from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import { resetQuestion } from "../../Actions/forgetAndResetPasswordActions";
import ProjectManagerHeader from "../miscellaneous/ProjectManagerHeader";
import FreelancerHeader from "../miscellaneous/FreelancerHeader";
import PMDashboardSideBar from "../projectManager/PMDashboardSideBar";
import BreadCrumb from "../miscellaneous/BreadCrumb";


class ResetAnswer extends Component {
  constructor(props, context) {
    super(props, context);
    this.state = {
      message: null,
      password: "",
      new_answer: "",
      newQuestion: "",
      messageError: null,
      passwordError: "",
      new_answerError: "",
      newQuestionError: "",
      checkBox1: true,
      checkBox2: true,
      checkBox1Error: "",
      checkBox2Error: "",
      errorMessage: "",
    };
  }

  resetValue = () => {
    this.setState({
      message: null,
      password: "",
      new_answer: "",
      newQuestion: "",
      messageError: null,
      passwordError: "",
      new_answerError: "",
      newQuestionError: "",
      checkBox1: true,
      checkBox2: true,
      checkBox1Error: "",
      checkBox2Error: "",
      errorMessage: "",
    });
  };

  handleChange = (e) => {
    this.setState({ [e.target.name]: e.target.value }, () => {
      this.handleErrors();
    });
  };

  handleCheckBox = (e) => {
    console.log("this.state", this.state);
    this.setState({ [e.target.name]: e.target.checked });
  };

  handleErrors = () => {
    let {
      checkBox1,
      checkBox2,
      newQuestion,
      new_answer,
      password,
    } = this.state;
    if (!checkBox1) {
      this.setState({ checkBox1Error: "Please agree" });
    }

    if (!checkBox2) {
      this.setState({ checkBox2Error: "Please agree" });
    }

    if (!newQuestion.length) {
      this.setState({ newQuestionError: "Please enter New Question" });
    }

    if (!new_answer.length) {
      this.setState({ new_answerError: "Please enter answer" });
    }

    if (!password) {
      this.setState({ passwordError: "Please enter password" });
    }

    if (checkBox1) {
      this.setState({ checkBox1Error: "" });
    }

    if (checkBox2) {
      this.setState({ checkBox2Error: "" });
    }

    if (newQuestion.length) {
      this.setState({ newQuestionError: "" });
    }

    if (new_answer.length) {
      this.setState({ new_answerError: "" });
    }

    if (password.length) {
      this.setState({ passwordError: "" });
    }
  };

  handleSave = () => {
    this.handleErrors();
    let {
      checkBox1,
      newQuestion,
      new_answer,
      password,
    } = this.state;
    let data = {
      security_question: {
        password: password,
        question: newQuestion,
        answer: new_answer,
      },
    };

    if (
      checkBox1 &&
      checkBox1 &&
      new_answer.length &&
      password.length &&
      newQuestion.length
    ) {
      this.props.resetQuestion(data).then((res) => {
        if (!res.error) {
          // this.props.history.push(`/auth-question`);
          this.props.history.replace({
            pathname: "/auth-question",
            state: { route: 'info' }
          })
        } else {
          this.setState(
            {
              errorMessage: "Error in sending data",
            },
            () => {
              setTimeout(
                function () {
                  this.setState({ errorMessage: "" });
                }.bind(this),
                3000
              );
            }
          );
        }
      });
    }
  };

  render() {
    const {
      password,
      new_answer,
      newQuestion,
      passwordError,
      new_answerError,
      newQuestionError,
      errorMessage,
    } = this.state;
    return (
      <React.Fragment>
        <div className="">
          {this.props.currentUser.role === "Project Manager" ||
          "Freelancer" ? (
            <ProjectManagerHeader history={this.props.history} />
          ) : (
            <FreelancerHeader history={this.props.history} />
          )}
          
        </div>
        <div id="tf-project-manager-dashboard-root">
            <BreadCrumb step={"step6"} link="Reset Answer" />
        </div>
        {/* <div className="">
            {this.props.currentUser.role === "Project Manager" ||
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
                     {this.props.currentUser.role === "Project Manager" ||
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
                      <h3 className="reset-security-question-title">
                        Reset Security Question
                      </h3>
                      <div className="clearfix"></div>
                      <p className="reset-security-question-description">
                        A security answer is required to access personal
                        information. You could be locked out of your account if
                        you forget your answer, so choose something you will
                        remember!
                        {/* <a href="#">Tips for security question. </a> */}
                      </p>
                    </div>
                  </div>

                  <div className="col-md-12">
                    <p className="error_forgot_answer mb-10 mt-10 ml-40">
                      {" "}
                      {errorMessage}{" "}
                    </p>

                    <div className="form-group">
                      <label>Existing Password</label>
                      <div className="clearfix"></div>
                      <div className="col-md-12 nopad">
                        <div className="input-group tf_loca">
                          <input
                            type="Password"
                            className="form-control mn_input"
                            name="password"
                            value={password}
                            onChange={this.handleChange}
                            placeholder=""
                          />
                        </div>
                      </div>
                    </div>
                    <p className="col-md-8 error_forgot_answer ml-20">
                      {" "}
                      {passwordError}{" "}
                    </p>
                    <div className="clearfix"></div>

                    <hr />
                    <div className="form-group">
                      <label>New Security Question</label>
                      <div className="clearfix"></div>
                      <div className="col-md-12 nopad">
                        <div className="input-group tf_loca">
                          <div className="selectedwrap">
                            <select
                              className="form-control mn_input mySelectBoxClass"
                              name="newQuestion"
                              value={newQuestion}
                              onChange={this.handleChange}
                            >
                              <option value="">Select Security Question</option>
                              <option value="What primary school did you attend?">
                                What primary school did you attend?
                              </option>
                              <option>
                                In what town or city was your first full time job?
                              </option>
                              <option value="In what town or city did you meet your spouse/partner?">
                                In what town or city did you meet your
                                spouse/partner?
                              </option>
                              <option value="What is your spouse or partner's mother's maiden name?">
                                What is your spouse or partner's mother's maiden
                                name?
                              </option>
                              <option value="What time of the day were you born? (hh:mm)">
                                What time of the day were you born? (hh:mm)
                              </option>
                            </select>
                          </div>
                        </div>
                      </div>
                    </div>

                    <p className="col-md-8 error_forgot_answer ml-20">
                      {" "}
                      {newQuestionError}{" "}
                    </p>

                    <div className="clearfix"></div>
                    <div className="form-group">
                      <label>New Answer</label>
                      <div className="clearfix"></div>
                      <div className="col-md-12 nopad">
                        <div className="input-group tf_loca">
                          <input
                            type="text"
                            className="form-control mn_input"
                            name="new_answer"
                            placeholder="Provide Your New Answer Here"
                            onChange={this.handleChange}
                            value={new_answer}
                          />
                        </div>
                      </div>
                    </div>
                    <p className="col-md-8 error_forgot_answer ml-20">
                      {" "}
                      {new_answerError}{" "}
                    </p>

                    <div className="col-md-12">
                      <div className="clearfix"></div>
                      <div className="col-md-12">
                        <div className="tf_stg_btn_pay">
                          <div className="col-md-12">
                            <Link
                              onClick={this.handleSave}
                              style={{ cursor: "pointer" }}
                              className="tf_invite_button add-question-save-btn"
                            >
                              Save
                            </Link>
                            <Link
                              onClick={this.resetValue}
                              style={{ cursor: "pointer" }}
                              className="tf_short_button add-question-canel-btn"
                            >
                              Cancel
                            </Link>
                          </div>
                        </div>
                        <div className="clearfix"></div>
                      </div>
                      <div className="clearfix"></div>
                    </div>
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
    currentUser: state.currentUserDetails,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    resetQuestion: (data) => dispatch(resetQuestion(data)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(ResetAnswer);
