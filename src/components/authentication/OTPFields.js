import React, {Component} from "react";
import { connect } from "react-redux";
import {setCurrentUser} from '../../Actions/loginActions';
import {submitOTP, sendOTP} from '../../Actions/signUpActions';
import PhoneInput from 'react-phone-number-input'

class OTPFields extends Component {
  constructor(props, context) {
    super(props, context)
    this.state = {}
  }

  handleOPenModal = () => {
    this.setState({openModal: true})
    this.props.closeModal()
  }
  closeModal = () => {
    this.setState({openModal: false})
	}

  fieldError(margin, message) {
    return (<p id = "firstName" className="error-field" >{message ? message : "This field can't be blank."}</p>)
  }

  sendOTP = () => {
    const {currentUser, sendOTP} = this.props;
    const data ={
      phone_number: this.state.phone,
      id: currentUser.id
    }
    sendOTP(data)
    .then((res) => {
      if(res.status===200){
        this.setState({isOTPSent: true})
      }else{
        this.setState({phoneNumberError: true, phoneNumberErrorMessage: res.response.data.message[0]})
      }
    })
  }

  handleOTPChange = (e) => {
    this.setState({OTP: e.target.value, isInvalidOTP: false})
  }

  submitOTP = (e) => {
    e.preventDefault()
    const { password} = this.props.signUpSteps.signUpStep2;
    const {email} = this.props.signUpSteps.signUpStep1;
    const data={
      otp: this.state.OTP,
      phone: this.state.phone
    }
    this.props.submitOTP(data)
    .then((res)=>{
      if(res.status === 200){
        if(res.data.role === "Project Manager"){
          this.props.loginAction({email: email, password: password})
          .then((res)=>{
            if(res.status === 200){
              this.props.history.push('/post-a-job-progress')
              localStorage.setItem('accessToken', res.data.token)
              this.props.isAuthenticated(true)
              this.props.setCurrentUser(res.data.user)
            }else if(res.status === 500) {
              alert("internal server error.")
            }else{
              this.setState({invalidPassword: true, invalidPasswordMessage: res.response.data.message})
            }
          })
        }else{
          this.props.history.push({
            pathname: `/confrim-your-email/${res.data.id}`,
            state: this.props.signUpSteps.signUpStep1.email
          })
        }
      }else{
        this.setState({isInvalidOTP: true, invalidOTPMessage: res.response.data.message[0]})
      }
    })
  }

  handleNumberChange = (e) => {
    console.log(e)
		this.setState({phone: e})
  }

  render() {
    const { isOTPSent, OTP, phone} = this.state
    return (
      <div className="modal-dialog" id="landing-page-login-popup">
          <div className="mn_login mn_border step-two-signup-form">
            <div className="modal-header">
              <div className="col-lg-12 col-md-12">
                <button type="button" className="close" onClick={this.props.closeModal} >
                  <span aria-hidden="true">×</span><span className="sr-only">Close</span>
                </button>
              </div>
              <div className="clearfix"></div>
              <div className="col-md-12">
                <h3 className="popup-heading second-step-main-heading">Please Verify Your Phone Number</h3>
              </div>
            </div>
          <form className="sign-up-popup">
            <div className="input-group">
              <PhoneInput
                country
                placeholder="Phone Number"
                id= "firstName"
                name= "phone"
                value={phone}
                onChange={this.handleNumberChange}
              />
              <a style={{float: "right"}} onClick={this.sendOTP} href={`#`}>Send OTP</a>
            </div>
            {isOTPSent && <div><div className="row">
              <div className="col-md-12">
                <div id="otp-holder">
                  <div id="otp-content">
                    <input id="otp-input" type="tel" maxlength="6" pattern="\d{6}" value={OTP} onChange={this.handleOTPChange} autocomplete="off"/>
                  </div>
                </div>
                {this.state.isInvalidOTP && this.fieldError("180", "Invalid OTP! Please try again")}
              </div>
            </div>
            <div className="row">
              <div className="col-md-12">
                <div className="form-group">
                  <input type="submit" name="submit" id="submit" onClick={this.submitOTP} value="Submit" className="btn btn-primary mn_button" />
                </div>
              </div>
            </div></div>}
          </form>
          <div className="clearfix"></div>
        </div></div>
    )
  }
}

const mapStateToProps = state => {
  return {
    currentUser: state.currentUser
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    submitOTP: (data) => dispatch(submitOTP(data)),
		setCurrentUser: (data) => dispatch(setCurrentUser(data)),
		sendOTP: (data) => dispatch(sendOTP(data))
  }
}


export default connect(mapStateToProps, mapDispatchToProps)(OTPFields)