import React, {Component} from "react";
import { connect } from "react-redux";
import Header from '../miscellaneous/Header';
import Footer from '../miscellaneous/Footer';
import emailLogo from '../../static/images/email.svg'
import {sendConfrimationLink} from '../../Actions/forgetAndResetPasswordActions';
import FlashMessage from 'react-flash-message';
import {forgetStep} from '../../Actions/forgetAndResetPasswordActions';

class ForgetPassword extends Component {
  constructor(props, context) {
    super(props, context)
    this.state = {
      email: '',
      isInvalidEmail: false,
      errMessage: "",
      isEmailSent: false
    }
    this.sendLink = this.sendLink.bind(this)
    this.handleChange = this.handleChange.bind(this)
  }
  handleChange(e) {
    this.setState({[e.target.name]: e.target.value})
  }
  sendLink() {
    const emailData = {email: this.state.email}
    this.props.forgetStep(emailData)
    this.props.sendConfrimationLink(this.state)
    .then((res) => {
      if(res.status === 200){
        this.setState({isEmailSent: true})
        setInterval(() => this.props.history.push('/'), 5000)
      }else{
        this.setState({isInvalidEmail: true, errMessage: res.response.data.message})
      }
    })
  }
  fieldError(message) {
    return (<p id = "firstName" className="error-field" >{message ? message : "This field can't be blank."}</p>)
  }
  render() {
    const {isInvalidEmail, errMessage, email, isEmailSent} = this.state;
    return (
      <div>
        <div className="wraper">
          <Header />
          <div className="mn_center">
            <div className="container">
              <div className="centered">
                <div className="mn_login tf-forgot-password">
                  <h3>Forgot Password?</h3>
                  {isEmailSent && <FlashMessage duration={5000} persistOnHover={true}>
                    <span className="success-note">Reset password link is sent to {email} </span>
                  </FlashMessage>}
                  <div className="form-group">
                    <div className="input-group">
                      <div className="input-group-addon"><img src={emailLogo} alt="emailLogo"/></div>
                      <input type="text" value={this.state.email} onChange={this.handleChange} placeholder="enter your email" name="email" className="form-control mn_input" />
                      {isInvalidEmail && this.fieldError(errMessage)}
                    </div>
                  </div>
                  <div className="form-group text-center">
                    <button className="btn btn-primary mn_button mn_top" onClick={this.sendLink}>Send link</button>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <Footer />
        </div>
      </div>
    )
  }
}

const mapStateToProps = state => {
  return {
    ...state
  }
}

const mapDispatchToProps = (dispatch) => {

  return {
    sendConfrimationLink: (data) => dispatch(sendConfrimationLink(data)),
    forgetStep: (data) => dispatch(forgetStep(data))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(ForgetPassword)
