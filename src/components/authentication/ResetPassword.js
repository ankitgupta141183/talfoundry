import React, { Component } from "react";
import { connect } from "react-redux";
import Header from "../miscellaneous/Header";
import Footer from "../miscellaneous/Footer";
import passwordLogo from "../../static/images/password.svg";
import { resetStep } from "../../Actions/forgetAndResetPasswordActions";
import { resetPasswordAction } from "../../Actions/forgetAndResetPasswordActions";

class ResetPassword extends Component {
  constructor(props, context) {
    super(props, context);
    this.passwordRef = React.createRef();
    this.confirmPasswordRef = React.createRef();
    this.state = {
      isPasswordsMatches: true,
      resetToken: "",
      passwordPolicy: true,
      disableSubmit:false,
    };
    this.handleBlur = this.handleBlur.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }
  componentDidMount() {
    this.setState({ resetToken: this.props.match.params.token });
  }
  handleChange(e) {
    const resetStep = {
      password: this.passwordRef.current.value,
      confirmPassword: this.confirmPasswordRef.current.value,
    };
    this.props.resetStep(resetStep);
    this.setState({ passwordPolicy: true, isPasswordsMatches: true });
  }
  handleBlur(e) {
    var strongRegex = new RegExp("^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#%])(?=.{8,})");

    if(e.target.name === "password" && !strongRegex.test(this.passwordRef.current.value)){
      this.setState({ passwordPolicy: false });
    }

    const {
      password,
      confirmPassword,
    } = this.props.forgetAndPasswordSteps.resetStep;
    if (e.target.name === "confirmPassword" && password !== confirmPassword) {
      this.setState({ isPasswordsMatches: false });
    }
  }
  handleSubmit() {
    const {
      password,
      confirmPassword,
    } = this.props.forgetAndPasswordSteps.resetStep;
    var formData = new FormData();

    formData.append("reset_password_token", this.state.resetToken);
    formData.append("password", password);
    formData.append("password_confirmation", confirmPassword);
    this.setState({disableSubmit:true})
    if (password === confirmPassword) {
    
      this.props.resetPassword(formData).then((res) => {
        if (res.status === 200) {
          this.props.history.push({
            pathname: "/login",
            state: { passwordResetSuccess: res.data.message },
          });
          this.setState({disableSubmit:false})
        } else {
          alert("internal server error.");
          this.setState({disableSubmit:false})
        }
      });
    } else {
      this.setState({disableSubmit:false})
      this.setState({ isPasswordsMatches: false });
    }
  }
  fieldError(message) {
    return (
      <p id="firstName" className="error-field">
        {message ? message : "This field can't be blank."}
      </p>
    );
  }
  render() {
    const {disableSubmit} = this.state
    return (
      <div>
        <div className="wraper" style={{height: '100vh'}}>
          <Header />
          <div className="mn_center h-100">
            <div className="container">
              <div className="centered pt-8">
                <div className="mn_login tf-forgot-password">
                  <h3>Reset your Password?</h3>
                  <div className="form-group">
                    <div className="input-group">
                      <div className="input-group-addon">
                        <img src={passwordLogo} alt="passwordLogo" />
                      </div>
                      <input
                        type="password"
                        onChange={this.handleChange}
                        className="form-control mn_input"
                        name="password"
                        id="password"
                        placeholder="Password"
                        onBlur={this.handleBlur}
                        required
                        ref={this.passwordRef}
                      />
                      {!this.state.passwordPolicy &&
                        this.fieldError(
                          "Make sure it's at least 8 characters including a number, a lowercase & uppercase letter and a special character."
                        )}
                    </div>
                  </div>
                  <div className="form-group">
                    <div className="input-group">
                      <div className="input-group-addon">
                        <img src={passwordLogo} alt="passwordLogo" />
                      </div>
                      <input
                        type="password"
                        onChange={this.handleChange}
                        className="form-control mn_input"
                        ref={this.confirmPasswordRef}
                        name="confirmPassword"
                        id="password"
                        placeholder="Confirm Password"
                        onBlur={this.handleBlur}
                        required
                      />
                      {!this.state.isPasswordsMatches &&
                        this.fieldError("Password does not match")}
                    </div>
                  </div>
                  <div className="form-group text-center">
                    <button
                      disabled={disableSubmit}
                      onClick={!disableSubmit ? this.handleSubmit : null}
                      className="btn btn-primary mn_button mn_top"
                    >
                      Submit
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <Footer />
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    ...state,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    resetStep: (data) => dispatch(resetStep(data)),
    resetPassword: (data) => dispatch(resetPasswordAction(data)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(ResetPassword);
