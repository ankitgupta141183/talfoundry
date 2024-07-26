import React, { Component } from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import AppProcessHeader from "../miscellaneous/AppProcessHeader";
import Footer from "../miscellaneous/Footer";
import { getCurrentUserDetails } from "../../Actions/applicationActions";
import {
  fieldError,
  getUserRedirection,
  getProjectManagerRedirection,
} from "../../utills/formatting";
import { submitSecurityQuestions } from "../../Actions/appProcessStepsActions";

class SecurityQuestion extends Component {
  constructor(props, context) {
    super(props, context)
    this.state = {
      question1: null,
      question2: null,
    };
    this.checkboxRef = React.createRef()
  }

  componentDidMount() {
    this.props.getCurrentUserDetails().then((details) => {
      if (details.role === "Project Manager") {
        const { hasRedirection, path } = getProjectManagerRedirection(details)
        if (hasRedirection) {
          this.props.history.push(path)
        }
      } else {
        const { hasRedirection, path } = getUserRedirection(details)
        const fromSuccess =
          this.props.location.state &&
          this.props.location.state.fromFreelancerSuccess;
        if (hasRedirection && !fromSuccess) {
          this.props.history.push(path)
        }
      }
    })
  }

  handleChange = (e) => {
    this.setState({
      [e.target.name]: e.target.value,
      [e.target.name + "Error"]: false,
    })
  };

  submitQuestions = () => {
    console.log(this)
    const { submitSecQuestions, currentUser, history } = this.props;
    const { question1, question2, answer1, answer2 } = this.state;
    if (
      question1 &&
      question2 &&
      answer1 &&
      answer2 &&
      this.checkboxRef.current.checked
    ) {
      const data = {
        user: {
          security_questions_attributes: [
            { question: question1, answer: answer1 },
            { question: question2, answer: answer2 },
          ],
        },
      };
      submitSecQuestions(data).then((res) => {
        if (res.status === 200) {
          history.push(
            currentUser.role === "Project Manager"
              ? !currentUser.number_of_jobs_posted
                ? "/post-a-job-progress"
                : "/"
              : "/"
          )
        }
      })
    } else {
      this.setState({
        question1Error: !question1 && true,
        question2Error: !question2 && true,
        answer1Error: !answer1 && true,
        answer2Error: !answer2 && true,
        checkboxError: !this.checkboxRef.current.checked,
      })
    }
  };

  render() {
    const {
      question1,
      question2,
      answer1,
      answer2,
      answer1Error,
      answer2Error,
      question1Error,
      question2Error,
      checkboxError,
    } = this.state;
    const questions = [
      "What primary school did you attend?",
      "In what town or city was your first full time job?",
      "In what town or city did you meet your spouse/partner?",
      "What is your spouse or partner's mother's maiden name?",
      "What time of the day were you born? (hh:mm)",
    ];
    const getQuestion1Options = questions
      .filter((el) => !el.includes(question2))
      .map((question, idx) => {
        return (
          <option key={idx} selected={question === question1}>
            {question}
          </option>
        )
      })
    const getQuestion2Options = questions
      .filter((el) => !el.includes(question1))
      .map((question, idx) => {
        return (
          <option key={idx} selected={question === question2}>
            {question}
          </option>
        )
      })
    return (
      <div className="add-security-question-page">
        <React.Fragment>
          <AppProcessHeader history={this.props.history} />
          <div className="clearfix"></div>
          <div className="clearfix"></div>
          <div id="add-security-question">
            <div className="d-flex">
              <div className="col-md-6 m-auto">
                <div className="col-md-12 mt-20">
                  <div className="form-group">
                    <h2 className="Add-Security-Question-section-title">Add Security Question</h2>
                  </div>
                </div>

                <div className="col-md-12">

                  <div className="every-section-light-blue-color">

                      <div className="form-group">
                        <label>1. Security Question</label>
                        <div className="clearfix"></div>
                        <div className="col-md-12 nopad">
                          <div className="input-group tf_loca">
                            <div className="selectedwrap">
                              <select
                                className="form-control mn_input mySelectBoxClass"
                                name="question1"
                                defaultValue={question1}
                                onChange={this.handleChange}
                              >
                                <option selected disabled>
                                  Select Security Question
                                </option>
                                {getQuestion1Options}
                              </select>
                              {question1Error && fieldError()}
                            </div>
                          </div>
                        </div>
                      </div>

                      <div className="clearfix"></div>

                      <div className="form-group">
                        <label>Answer</label>
                        <div className="clearfix"></div>
                        <div className="col-md-12 nopad">
                          <div className="input-group tf_loca">
                            <input
                              type="text"
                              className="form-control mn_input"
                              name="answer1"
                              placeholder="Provide Your Answer Here"
                              value={answer1}
                              onChange={this.handleChange}
                            />
                            {answer1Error && fieldError()}
                          </div>
                        </div>
                      </div>

                      <div className="clearfix"></div>

                  </div>
                </div>

                  <hr />

                  <div className="col-md-12">
                      <div className="every-section-light-blue-color">

                        <div className="form-group">
                          <label>2. Security Question</label>
                          <div className="clearfix"></div>

                          <div className="col-md-12 nopad">
                            <div className="input-group tf_loca">
                              <div className="selectedwrap">
                                <select
                                  className="form-control mn_input mySelectBoxClass"
                                  defaultValue={question2}
                                  name="question2"
                                  onChange={this.handleChange}
                                >
                                  <option selected disabled>
                                    Select Security Question
                                  </option>
                                  {getQuestion2Options}
                                </select>
                                {question2Error && fieldError()}
                              </div>
                            </div>
                          </div>
                        </div>

                        <div className="clearfix"></div>

                        <div className="form-group">
                          <label>Answer</label>
                          <div className="clearfix"></div>
                          <div className="col-md-12 nopad">
                            <div className="input-group tf_loca">
                              <input
                                type="text"
                                className="form-control mn_input"
                                name="answer2"
                                placeholder="Provide Your Answer Here"
                                value={answer2}
                                onChange={this.handleChange}
                              />
                              {answer2Error && fieldError()}
                            </div>
                          </div>
                        </div>

                        <div className="clearfix"></div>

                      </div>
                  </div>


                <div className="col-md-12">
                  <div className="form-group">
                    <div className="col-md-12 nopad">
                      <div className="tf_sound tf_sound1">
                        <input
                          type="checkbox"
                          ref={this.checkboxRef}
                          id="job"
                          name="checkbox"
                          onChange={this.handleChange}
                        />
                        <label htmlFor="job">
                          I understand my account will be locked if I am unable
                          to answer this question
                        </label>
                        {checkboxError && fieldError()}
                      </div>
                    </div>
                    <div className="clearfix"></div>
                  </div>
                  <div className="clearfix"></div>
                  <div className="col-md-12">
                    <div className="tf_stg_btn_pay">
                      <div className="col-md-12">
                        <Link
                          className="tf_invite_button add-question-save-btn"
                          onClick={this.submitQuestions}
                        >
                          Save
                        </Link>
                        <Link
                          to={`/`}
                          className="tf_invite_button add-question-save-btn"

                        >
                          Skip for now
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
          {/* <Footer /> */}
        </React.Fragment>
      </div>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    currentUser: state.currentUserDetails,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    getCurrentUserDetails: () => dispatch(getCurrentUserDetails()),
    submitSecQuestions: (data) => dispatch(submitSecurityQuestions(data)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(SecurityQuestion)
