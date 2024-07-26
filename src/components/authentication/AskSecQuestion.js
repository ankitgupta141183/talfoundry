import React, {Component} from "react";
import { connect } from "react-redux";
import {fieldError} from "../../utills/formatting";
import FreelancerHeader from "../miscellaneous/FreelancerHeader";
import Footer from "../miscellaneous/Footer";
import {getAuthQuestion, checkDeviceAuthorised, SendDeviceAuthorization ,getCurrentUserDetails }
from '../../Actions/applicationActions';
import ProjectManagerHeader from "../miscellaneous/ProjectManagerHeader";
import { Link } from "react-router-dom";


class AskSecQuestion extends Component {
  constructor(props, context) {
    super(props, context)
    this.state = {
      question: null,
      answer: null,
      answerError: false,
      isAnsCorrect: true,
      correctAnswer: ""
    }
    this.checkboxRef = React.createRef()
  }

  componentDidMount(){
    this.props.getCurrentUserDetails()

    this.props.getQuestion()
    .then((questions) => {
      const questionAndAns = questions[Math.round(Math.random())]
      if(questionAndAns){
        this.setState({question: questionAndAns.question, correctAnswer: questionAndAns.answer})
      }
    })

    this.props.checkDeviceAuthorised().then(res => {
      if(res && !res.security_check_required){
        localStorage.security_check_required = res.security_check_required
       this.props.history.push({
          pathname: "/settings",
          state: this.props.match.params.type==="profile-settings" ? "freelancerprofile" : null
        })
      }
    })


  }

  handleChange = (e) => {
    this.setState({[e.target.name]: e.target.value, [e.target.name + "Error"]: false})
  }

  onSubmit=() => {
    const {answer, correctAnswer} = this.state;
    if(answer){
      if(correctAnswer === answer){
        this.props.SendDeviceAuthorization()
        .then(() => {
          localStorage.security_check_required = false
          this.props.history.push({
            pathname: "/settings",
            state: this.props.match.params.type==="profile-settings" ? "freelancerprofile" : null
          })
        })
      }else{
        this.setState({isAnsCorrect: false})
      }
    }else{
      this.setState({
        answerError: !answer && true
      })
    }
  }

  render() {
    const {question, answer, answerError, isAnsCorrect, correctAnswer} = this.state;
    const {currentUser} = this.props;
    console.log(correctAnswer)
    return (
      <React.Fragment>
        {currentUser && this.props.currentUser.role === "Project Manager"  ?
        <ProjectManagerHeader history={this.props.history}/>
        :
        <FreelancerHeader history={this.props.history}/>
      }
        <div className="clearfix"></div>
          <div className="clearfix"></div>
          <section id="add-security-question" className="device-authorization-page mt-0">
            <div className="container">
              <div className="col-md-3"></div>
              <div className="col-md-6">
                <div className="tf_profile">
                  <div className="col-md-12">
                    <div className="form-group">
                      <div className="clearfix"></div>
                      <h3>Verify your identity</h3>
                      <div className="clearfix"></div>
                      <p>
                        This device isn't recognized by our system. Please answer your security question to confirm your identity
                        and access your account.
                        {/* <a href={`#`}>Learn More</a> */}
                      </p>
                    </div>
                    <div className="clearfix"></div>
                    <div className="form-group">
                      <label>What are security questions?</label>
                      <div className="clearfix"></div>
                        <div className="col-md-12 nopad">
                          <div className="input-group tf_loca">
                            <p>Security questions help protect your account from unauthorized use. If we need to confirm your identity, your correct answers will help us verify it's you. </p>
                          </div>
                        </div>
                    </div>


                    <div className="clearfix"></div>
                    <div className="form-group">
                      <label>Your Security Question</label>
                      <div className="clearfix"></div>
                      <div className="col-md-12 nopad">
                        <div className="input-group tf_loca">
                          <p>{question}</p>
                        </div>
                      </div>
                    </div>
                    <div className="clearfix"></div>
                    <div className="form-group">
                      <label>Your Answer</label>
                      <div className="clearfix"></div>
                      <div className="col-md-12 nopad">
                        <div className="input-group tf_loca">
                          <input type="text" className="form-control mn_input" name="answer"
                            placeholder="Provide Your Answer Here" onChange={this.handleChange} defaultValue={answer}/>
                           {answerError && fieldError()}
                           {!isAnsCorrect && fieldError("Incorrect answer! Please try again.")}
                        </div>
                        <p>
                        </p>

                        <Link to={{
                          pathname: 'forget-answer',
                          state: {
                            role: this.props.currentUser.role,
                            email: this.props.currentUser.email
                          }
                        }}>
                        Skip security questions and verify by email
                        </Link>

                      </div>
                    </div>
                    <div className="clearfix"></div>
                  </div>
                  <div className="col-md-12">
                    <div className="clearfix"></div>
                    <div className="col-md-12">
                      <div className="tf_stg_btn_pay">
                        <div className="col-md-12">
                          <Link to={`#`} onClick={this.onSubmit} className="tf_invite_button add-question-save-btn">Continue</Link>
                        </div>
                      </div>
                      <div className="clearfix"></div>
                    </div>
                    <div className="clearfix"></div>
                  </div>
                </div>
              </div>
              <div className="col-md-3"></div>
            </div>
          </section>
          {/* <Footer /> */}
      </React.Fragment>
    )
  }
}

const mapStateToProps = state => {
  return {
    currentUser: state.currentUserDetails,
  }
}


const mapDispatchToProps = (dispatch) => {
  return {
    getQuestion: (data) => dispatch(getAuthQuestion(data)),
    checkDeviceAuthorised: () => dispatch(checkDeviceAuthorised()),
    SendDeviceAuthorization: () => dispatch(SendDeviceAuthorization()),
    getCurrentUserDetails: () => dispatch(getCurrentUserDetails()),

  }
}


export default connect(mapStateToProps, mapDispatchToProps)(AskSecQuestion)
