import React, {Component} from "react";
import { connect } from "react-redux";
import Modal from 'react-modal';
import emailLogo from '../../static/images/email.svg'
import {sendConfrimationLink} from '../../Actions/forgetAndResetPasswordActions';
import FlashMessage from 'react-flash-message';
import {forgetStep} from '../../Actions/forgetAndResetPasswordActions';

const customStyles = {
  content : {
    top                   : '50%',
    left                  : '50%',
    right                 : 'auto',
    bottom                : 'auto',
    marginRight           : '-50%',
    transform             : 'translate(-50%, -50%)',
    border                : 'none',
    padding               :  '0px',
  }
}

class ForgetPopUp extends Component {
  constructor(props, context) {
    super(props, context)
    this.state = {
      email: '',
      isInvalidEmail: false,
      errMessage: "",
      isEmailSent: true,
      disableSubmit:false,

    }
    this.sendLink = this.sendLink.bind(this)
    this.handleChange = this.handleChange.bind(this)
  }

  handleChange(e) {
    this.setState({[e.target.name]: e.target.value})
  }
  sendLink() {
    const emailData = {email: this.state.email}
    this.setState({disableSubmit:true})
    this.props.forgetStep(emailData)
    this.props.sendConfrimationLink(this.state)
    .then((res) => {
      if(res.status === 200){
        this.setState({isEmailSent: true , disableSubmit:false})
        this.props.ResetPasswordEmailsender();
        setInterval(() => this.props.closeModal(), 5000)
      }else{
        // this.setState({disableSubmit:false})
        this.setState({isEmailSent: true , disableSubmit:false})
        this.setState({isInvalidEmail: true, errMessage: res.response.data.message})
      }
    })
  }
  fieldError(message) {
    return (<p id = "firstName" className="error-field" >{message ? message : "This field can't be blank."}</p>)
  }

  render() {
    const {isInvalidEmail, errMessage, email, isEmailSent , disableSubmit} = this.state;
    return (
        <Modal isOpen={this.props.isOpen} style={customStyles} onRequestClose={this.props.closeModal}>
                <div className="modal-dialog forgot-password-popup" id="landing-page-login-popup">
                    <div className="modal-header">
                        <button type="button" className="close" onClick={this.props.closeModal} >
                          <span aria-hidden="true">×</span><span className="sr-only">Close</span>
                        </button>
                        <h1 className="popup-heading">Forgot Password?</h1>
                      {isEmailSent && <FlashMessage duration={5000} persistOnHover={true}>
                        <span className="success-note">Reset password link is sent to {email} </span>
                      </FlashMessage>}
                    </div>


                    <div className="modal-body">

                      <div className="row">
                          <div className="col-md-12">
                              <div className="form-group">
                                <div className="input-group">
                                  <div className="input-group-addon"><img src={emailLogo} alt="emailLogo"/></div>
                                  <input type="text" value={this.state.email} onChange={this.handleChange} placeholder="Enter Your Email" name="email" className="form-control mn_input" />
                                  {isInvalidEmail && this.fieldError(errMessage)}
                                </div>
                              </div>
                          </div>
                      </div>


                      <div className="row">
                          <div className="col-md-12">

                              <div className="form-group text-center">
                                <button className="btn btn-primary mn_button mn_top forgot-password-send-link" disabled={disableSubmit} onClick={!disableSubmit ? this.sendLink : null}>Send Link</button>
                              </div>
                          </div>
                      </div>

                    </div>
                </div>
				</Modal>
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

export default connect(mapStateToProps, mapDispatchToProps)(ForgetPopUp)
