import React, {Component} from "react";
import { connect } from "react-redux";
import {fieldError} from "../../utills/formatting";
import Footer from "../miscellaneous/Footer";
import {getAuthQuestion, checkDeviceAuthorised, SendDeviceAuthorization ,getCurrentUserDetails }
from '../../Actions/applicationActions';
import ProjectManagerHeader from "../miscellaneous/ProjectManagerHeader";
import PMDashboardSideBar from "../projectManager/PMDashboardSideBar";
import { Link } from "react-router-dom";
import BreadCrumb from "../miscellaneous/BreadCrumb";


class AskSecQuestionPM extends Component {
  constructor(props, context) {
    super(props, context)
    this.state = {
      question: null,
      answer: null,
      answerError: false,
      isAnsCorrect: true,
      correctAnswer: "",
      route: 'info'
    }
    this.checkboxRef = React.createRef()
    // this.isUnmounted;
  }

  componentDidMount(){
    this.props.getCurrentUserDetails()

    this.props.getQuestion()
    .then((questions) => {
      if(questions.length > 0){
        let questionAndAns 
        if(questions.length > 1){
           questionAndAns = questions[Math.round(Math.random())];
        }else{
           questionAndAns = questions[0];
        }
        this.setState({
          question: questionAndAns.question,
          correctAnswer: questionAndAns.answer,
        });
      }
    })
    // console.log(this.props.location.state)
    this.setState({route : this.props.location.state.route})
    this.props.checkDeviceAuthorised().then(res => {
      if(res && !res.security_check_required){

        if (this.isUnmounted) {
          return;
        }

        localStorage.security_check_required = res.security_check_required

          this.props.history.replace({
            pathname: "/settings",
            // state: this.props.match.params.type==="profile-settings" ? "freelancerprofile" : null
          })
      }
    })


  }

  UNSAFE_componentWillUnmount() {
    this.isUnmounted = true;
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
            // state: this.props.match.params.type==="profile-settings" ? "freelancerprofile" : null
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
    const {question, answer, answerError, isAnsCorrect} = this.state;
    // const {currentUser} = this.props;
    // console.log(correctAnswer)
    return (
      <React.Fragment>
        <ProjectManagerHeader history={this.props.history}/>
        {/* <div className="">
            <PMDashboardSideBar history={this.props.history}/>
        </div> */}
        <div id="tf-project-manager-dashboard-root">
          <BreadCrumb step5 link="Auth Question" />
        </div>
        <div className={!this.props.loginSteps.showHideSideBar ? "mains" : "main-add"}>
        <div className="clearfix"></div>
          <div className="clearfix"></div>
          
          <section id="add-security-question" className="">
            <div className="row custom_row">
              <div className="col-md-2 col-sm-2 col-xs-2">
                <div className="custom_sticky_container">
                  <div className="position-sticky">
                  <PMDashboardSideBar history={this.props.history}/>
                  </div>
                </div>
              </div>
              <div className="col-md-2 col-sm-1 col-xs-1"></div>
              <div className="col-md-5 col-sm-5 col-xs-5">
                <div className="tf_profile security_container">
                  <div className="">
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
                          pathname: '/forget-answer',
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
                  <div className="">
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
              <div className="col-md-3 col-sm-3 col-xs-3"></div>
            </div>
          </section>
          {/* <Footer /> */}
        </div>  
      </React.Fragment>
    )
  }
}

const mapStateToProps = state => {
  return {
    ...state,
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


export default connect(mapStateToProps, mapDispatchToProps)(AskSecQuestionPM)
