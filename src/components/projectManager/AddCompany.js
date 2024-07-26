import React, {Component} from "react";
import { connect } from "react-redux";
import Header from '../miscellaneous/Header';
import Footer from '../miscellaneous/Footer';
import companyLogo from '../../static/images/company.svg'
import phoneLogo from '../../static/images/phone.svg';
import {signUpAction} from '../../Actions/signUpActions';
import {loginAction, isAuthenticated, setCurrentUser} from '../../Actions/loginActions';
import Loader from "react-loader-spinner";
import _ from 'lodash';
import {Link} from 'react-router-dom';
class AddCompany extends Component {
  constructor(props, context) {
    super(props, context)
    this.state = {
      companyName: "",
      phoneNumber: "",
      isLoading: false
    }
  }
  componentDidMount(){
    if(_.isEmpty(this.props.signUpSteps.signUpStep1)){
      alert("you need to fill step 1 & step 2")
      this.props.history.push('/user-signup')
    }
  }
  componentWillReceiveProps(nextProps){
    this.setState({isLoading: nextProps && nextProps.applicationIsLoading})
  }
  handleChange = (event) => {
    this.setState({[event.target.name] : event.target.value})
  }
  handleSubmit = (event) => {
    const {country, password, role} = this.props.signUpSteps.signUpStep2;
    const {firstName, lastName, email} = this.props.signUpSteps.signUpStep1;
    const {companyName, phoneNumber} = this.state;
    var formData = new FormData()
    formData.append("first_name", firstName)
    formData.append("last_name", lastName)
    formData.append("email", email)
    formData.append("password", password)
    formData.append("country", country)
    formData.append("role", role)
    if(event.target.id === "submit"){
      formData.append("company_name", companyName)
      formData.append("phone_number", phoneNumber)
      this.props.signUpAction(formData)
      .then((res)=>{
        if(res.status === 201){
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
        }else {alert("server error")}
      })
      .catch((err) => {
        alert("internal server error")
      })
    }else{
      this.props.signUpAction(formData)
      .then((res)=>{
        if(res.status === 201){
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
        }
      })
      .catch((err) => {
        alert("internal server error")
      })
    }
  }
  render() {
    const {companyName, phoneNumber, isLoading} = this.state;
    return (
      <div>
        {isLoading && (
        <div className="grid-loader">
          <Loader type="Grid" color="#00BFFF" height={100} width={100} />
        </div>
        )}
        {!isLoading && <div className="wraper">
          <Header />
          <div className="mn_center">
            <div className="container">
              <div className="centered">
                <div className="mn_login add-company-login">
                  <h3>Tell us about your company</h3>
                  <div className="form-group">
                    <div className="input-group">
                      <div className="input-group-addon"><img src={companyLogo} alt="companyLogo" /></div>
                      <input type="text" className="form-control mn_input" onChange={this.handleChange} name="companyName" placeholder="Company Name" required value={companyName} />
                    </div>
                  </div>
                  <div className="form-group">
                    <div className="input-group">
                      <div className="input-group-addon"><img src={phoneLogo} alt="phoneLogo" /></div>
                      <input type="number" className="form-control mn_input" name="phoneNumber"
                        placeholder="Work Phone Number" onChange={this.handleChange} required value={phoneNumber} />
                    </div>
                  </div>
                  <div className="form-group">
                    <input type="submit" name="submit" id="submit" onClick={this.handleSubmit} value="CONTINUE" className="btn btn-primary mn_button" />
                  </div>

                  <div className="text-center">
                    <Link href="#" id="skip" onClick={this.handleSubmit}>Skip and continue</Link>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <Footer />
        </div>}
      </div>
    )
  }
}
const mapStateToProps = state => ({
  ...state
})

const mapDispatchToProps = (dispatch) => {

  return {
    signUpAction: (data) => dispatch(signUpAction(data)),
    loginAction: (data) => dispatch(loginAction(data)),
		isAuthenticated: (data) => dispatch(isAuthenticated(data)),
		setCurrentUser: (data) => dispatch(setCurrentUser(data))
  }
}
export default connect(mapStateToProps, mapDispatchToProps)(AddCompany)
