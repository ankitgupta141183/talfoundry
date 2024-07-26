import React, { Component } from "react";
import { connect } from "react-redux";
import Modal from "react-modal";
import ReCAPTCHA from "react-google-recaptcha";
import { isValidPhoneNumber } from 'react-phone-number-input'
import PhoneInput from 'react-phone-number-input'
import {talkToExpert} from '../../Actions/applicationActions';
import userLogo from '../../static/images/user.svg';
import passwordLogo from '../../static/images/password.svg';
import SuccessSweetAlert from "../CommonComponets/SweetAlert/SuccessSweetAlert";



const customStyles = {
  content: {
    top: "50%",
    left: "50%",
    right: "auto",
    bottom: "auto",
    marginRight: "-50%",
    transform: "translate(-50%, -50%)",
    border: "none",
    // background            : 'transparent',
    // width                 : '60%',
    padding: "0px",
    borderRadius:"15px"
  },
};

// import Footer from './Footer'


function validateEmail(email) {
    var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(String(email).toLowerCase())
}

function only_aplhabet_regex(val){
    let reg = /^[a-zA-Z]*$/;
    return reg.test(String(val).toLowerCase())
}


class ContactUsPopUp extends Component {
  constructor(props, context) {
        super(props, context)
        this.state = {
                scrolling: false,
                openModal: false,
                openSignUpModal: false,
                name: '',
                emailAddress: "",
                companyName: "",
                contact: "",
                message: "",
                captchaVerified: false,
                captchaError: false,
                phoneNumberError: false,
                isApproved: false,
                name_error: false,
                message_error: false,
                contact_error: false,
                email_error: false,
                companyName_error: false
            }
            this.handleScroll = this.handleScroll.bind(this)
        }


    componentDidMount() {
    window.addEventListener('scroll', this.handleScroll)
    }

    UNSAFE_componentWillUnmount() {
    window.removeEventListener('scroll', this.handleScroll)
    }
    handleScroll(event) {
    if (window.scrollY <= 0 && this.state.scrolling) {
        this.setState({scrolling: false})
    }
    else if (window.scrollY >= 0 && !this.state.scrolling) {
        this.setState({scrolling: true})
    }
    }
    handleNewScroll(event) {
    let obj = document.getElementById('mn_project')
    if(obj) {
        obj.scrollIntoView()
    }
    }


    handleChange = (e) => {
    this.setState({
        [e.target.name]: e.target.value, name_error: false, email_error: false, message_error: false, contact_error: false ,companyName_error: false
    })
    }

    handleNumberChange = (e) => {
        console.log(e)
            this.setState({contact: e, phoneNumberError: false})
      }

    handleSubmit = (e) => {
        // e.preventDefault();
        const {name, companyName, message, contact, emailAddress} = this.state
        let words = (message.match(/\S+/g) || [] ).length
        const data = {
            name: name,
            company: companyName,
            message: message,
            contact: contact,
            email: emailAddress
        }
        // && only_aplhabet_regex(name)
        if(this.state.captchaVerified && name && contact && emailAddress && validateEmail(emailAddress) &&  words >= 5) {
            this.props.talkToExpert(data).then((res) =>{
                console.log("res",res)
                this.setState({isApproved: true})
            })
        }
        else {
            const contactError = (contact ? (isValidPhoneNumber(contact) ? undefined : 'Invalid phone number') : '')

            this.setState({
                 captchaError: !this.state.captchaVerified,
                 name_error: !name || !only_aplhabet_regex(name),
                 contact_error: !contact && !contactError,
                 companyName_error: !companyName,
                 email_error: !emailAddress  || !validateEmail(emailAddress),
                 message_error: words < 5
            })
        }
    }

    captchaExpired = () => {
    this.setState({captchaVerified: false, captchaError: true})
    }

    fieldError(margin, message) {
        // let {emailAddress} = this.state
        if(message === 'name'){
                return (<p className="error-field" >Required Field (chars only)</p>)
        }
        if(message === 'email'){
                return (<p className="error-field" >Enter valid email value</p>)
        }
        else if(message === 'contact'){
                return (<p className="error-field" >Enter valid contact value</p>)
        }
        else {
          return (<p className="error-field" >{message ? message : "This field can't be blank."}</p>)
        }
    }


    onChange = (value) => {
      if(value){
        this.setState({captchaVerified: true, captchaError: false})
      }else{
        this.setState({captchaError: true})
      }
    }
    hideDetails = () => {
        this.setState({ isApproved: false })
        window.location.reload()
    }

  render() {
    const {emailAddress, name, contact, message, name_error, email_error, contact_error, message_error} = this.state;
    const { isOpen, closeModal } = this.props;
    return (
      <div>
        {this.state.isApproved && 
        // <div className="app-pro2-swal">
        //       <SweetAlert
        //         success
        //         title="Email Sent!"
        //         onConfirm={this.hideDetails}
        //       >
        //         We will contact you shortly.
        //       </SweetAlert>
        //       </div>
        <SuccessSweetAlert 
        show={true}
        handleConfirm={this.hideDetails}
        message={" We will contact you shortly."}
        
        />
               }

        <Modal isOpen={isOpen} style={customStyles}>
          <div className="modal-dialog" id="landing-page-login-popup">
            <div className="signup_modal modal-header">
              <button type="button" className="close" onClick={closeModal}>
                <span aria-hidden="true">×</span>
                <span className="sr-only">Close</span>
              </button>
              <h1 className="popup-heading">Tell us about your Projects</h1>
            </div>
            <form id="Ready-To-Start-popup">
              <div className="col-md-6">
                  <div className="input-group">
                      <div className="input-group-addon">
                                <img src={userLogo} alt="" />
                      </div>
                  <input className="form-control" type="text" name="name" placeholder="Name"
                      onChange={this.handleChange} value={name}/>
                  {name_error && this.fieldError('0','name')}
                  </div>
              </div>
              <div className="col-md-6">
              <div className="input-group">
                <div className="input-group-addon">
                    <img src={passwordLogo} alt="" />
                  </div>
                  <input className="form-control" type="email" name="emailAddress"
                      placeholder="Work Email Address" onChange={this.handleChange} value={emailAddress}/>
                  {email_error && this.fieldError('0','email')}

              </div>
              </div>
              {this.props.notPhone ? '' :
                <div className="col-md-12">
                  <div className="input-group country-code-dropdown">
                      <PhoneInput
                          // country
                          defaultCountry="US"
                          placeholder="Phone Number"
                          id= "firstName"
                          name= "contact"
                          value={contact}
                          onChange={this.handleNumberChange}
                      />
                      {contact_error && this.fieldError('0','contact')}
                  </div>
                </div>
              }

              <div className="col-md-12">
              <div className="input-group">
                <textarea name="message" value={message} onChange={this.handleChange} className="form-control" rows="4" placeholder="Message"></textarea>
                  {message_error && this.fieldError("190", "Please enter minimum 5 words")}

              </div>
              </div>
              <div className="clearfix"></div>

              <div className="row">
                  <div className="col-md-2"></div>
                  <div className="col-md-6">
                      <div className="recaptcha-container">
                      <ReCAPTCHA
                          sitekey="6LfwYeQZAAAAAKZQ2zp7wA8o24Wu_3-oa2zQf0PM"
                          onChange={this.onChange}
                          onExpired={this.captchaExpired}
                          type="image"
                          hl="en"
                          tabindex="1"
                          className="recaptcha-inner-container"

                      />
                      {this.state.captchaError && this.fieldError("190", "Please verify the captcha")}
                      </div>
                  </div>
                  <div className="col-md-3"></div>
              </div>
              <div className="clearfix"></div>
              <div className="col-md-12 mn_learnmore Ready-To-Start-popup-submit-button">
                  <a onClick= {(e) => {e.preventDefault(); this.handleSubmit()}} className="tell-us-about-your-projects-button">Submit</a>
              </div>
            </form>
          </div>
        </Modal>
      </div>
    )
  }
}

const mapStateToProps = state => ({
    ...state
  })

  const mapDispatchToProps = (dispatch) => {
    return {
        talkToExpert: (data) => dispatch(talkToExpert(data))

    }
  }

export default connect(mapStateToProps, mapDispatchToProps)(ContactUsPopUp)

