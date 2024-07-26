import React, {Component} from "react";
import { connect } from "react-redux";
import Header from '../miscellaneous/Header';
import Footer from '../miscellaneous/Footer';
import '../../static/stylesheets/home.css'
import {loginAction, isAuthenticated, setCurrentUser} from '../../Actions/loginActions';
import {secondLoginStep} from '../../Actions/loginStepsActions';
import {Link} from 'react-router-dom';
import passwordImg from '../../static/images/password.svg'
import ErrorSweetAlert from "../CommonComponets/SweetAlert/ErrorSweetAlert";

// let passwordForUser = '';

class UserLoginStep2 extends Component {

  constructor(props) {
        super(props)
        this.state = {
            invalidPassword: false,
            invalidPasswordMessage: "",
            isEmail: true,
            passwordForUser: ''
        }

    }

    componentDidMount(){
    const {email} = this.props.loginSteps.loginStep1
      if(email === "" ){
        this.setState({isEmail: false})
      }
    }

    handleChange = (e) => {
        this.setState({passwordForUser: e.target.value})
    }

    handleSubmit = (e) => {

        e.preventDefault()
        const {email} = this.props.loginSteps.loginStep1;
        const {passwordForUser} = this.state
        // const {password} = this.props.loginSteps.loginStep2;

            if(passwordForUser === ""){
              alert("fields can not be empty!")
            }else{
              var formData = new FormData()
              formData.append("email", email)
              formData.append("password", passwordForUser)
              this.props.loginAction(formData)
              .then((res)=>{
                    if(res.status && res.status === 200){
                            var currentUser = res.data.user;
                            currentUser.user_job = res.data.user_job
                            currentUser.profile_id = res.data.profile_id;
                            currentUser.profile_uuid = res.data.profile_uuid;
                            currentUser.profile_picture = res.data.profile_picture;
                            localStorage.setItem('accessToken', res.data.token)
                            this.props.isAuthenticated(true)
                            this.props.setCurrentUser(currentUser)
                            if(res.data.user.role === "Project Manager" && !res.data.user_job){
                                this.props.history.push("/post-a-job-vertical")
                            }else if(res.data.user.role === "Project Manager" && res.data.user_job){
                                this.props.history.push("/")
                            }
                            else if(res.data.user.role === "Freelancer"){
                                // console.log('1111111111111 freelancer is there')
                                if(!res.data.user.profile_created){
                                    this.props.history.push({
                                        pathname: '/get-started',
                                        state: email
                                        })
                                } else if(!res.data.user.professional_profile_created){
                                        this.props.history.push("/create-profile")
                                } else if(res.data.user.professional_profile_created){
                                    this.props.history.push("/get-started")

                                }
                            }
                            else if(res.data.user.role === "Admin"){
                                this.props.history.push("/")
                            }
                        }
                        else if(res.response && res.response.status === 401)
                        {
                            this.setState({invalidPassword: true, invalidPasswordMessage: res.response.data.message})
                        }
                        else {
                            alert("internal server error")
                        }
                    })
    }
    }

  fieldError(margin, message) {
    return (<p className="error-field" >{message ? message : "This field can't be blank."}</p>)
  }
  hideAlert = () => {
        this.setState({isEmail: true})
        this.props.history.push('/login_page')
    }
  render() {
        const {isEmail} = this.state;
    return (
      <div>
                <div className="wraper">
                    <Header />
                    {!isEmail && 
                    
                //     <SweetAlert
                //         warning
                //         confirmBtnText="Go back!"
                //         confirmBtnBsStyle="danger"
                //         // title="Email is Empty!"
                //         onConfirm={this.hideAlert}
                //     >
                //         <div id="EditJobSuccessMessagePopupInnerContent">
                //           <img src={ErrorImg} alt="" id="rightCheckIconImage" />
                //             <h4>
                // Email is Empty!<br />
                //                 <strong>
                //                 You need to enter the email first!
                //                 </strong>
                //             </h4>
                //         </div>

                //     </SweetAlert>
                <ErrorSweetAlert 
                show={true}
                handleConfirm={this.hideAlert}
                message={"You need to enter the email first!"}
                />
                    
                    }
                    <div className="mn_center">
                        <div className="container">
                            <div className="centered">
                                <div className="mn_login">
                                    <h3>Welcome, {this.props.location.state.fullName}<span><Link to="/login_page">Not you?</Link></span></h3>
                                    <form onSubmit={this.handleSubmit}>
                                        <div className="form-group">
                                            <div className="input-group"> <div className="input-group-addon"><img src={passwordImg} alt="passwordimg"/></div>
                                                <input type="password" className="form-control mn_input" onChange={this.handleChange} name="password" id="password" placeholder="● ● ● ● ● ● ● ● ●" required value={this.props.loginSteps.secondLoginStep}/>
                                                {this.state.invalidPassword && this.fieldError("190", this.state.invalidPasswordMessage)}
                                            </div>
                                        </div>
                                        <div className="form-group">
                                            <div className="tf_sound1 ">
                                                <input type="checkbox" id="login"/>
                                                <label htmlFor="login">Keep me logged in</label>
                                            </div>
                                        </div>
                                        <div className="form-group">
                                            <input type="submit" name="submit" id="submit" value="LOGIN" onClick={this.handleSubmit} className="btn btn-primary mn_button mn_top"/>
                                        </div>
                                    </form>
                                    <div className="clearfix"></div>
                                    <div className="form-group_1">
                                        <Link to="/forget-password">Forgot Password?</Link>
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

const mapStateToProps = state => ({
  ...state
})
const mapDispatchToProps = (dispatch) => {
  return {
        loginAction: (data) => dispatch(loginAction(data)),
        secondLoginStep: (data) => dispatch(secondLoginStep(data)),
        isAuthenticated: (data) => dispatch(isAuthenticated(data)),
        setCurrentUser: (data) => dispatch(setCurrentUser(data))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(UserLoginStep2)
