import React, { Component } from "react";
import { connect } from "react-redux";
import userLogo from "../../static/images/user.svg";
import passwordLogo from "../../static/images/password.svg";
import {
  adminLoginAction,
  isAuthenticated,
  setCurrentUser,
} from "../../Actions/loginActions";
import { Link } from "react-router-dom";
import { isEmpty } from "lodash";
import logo_1 from "../../static/images/logo/logo.svg";
import bgImg from "../../static/images/bg.png";

class AdminLogin extends Component {
  constructor(props, context) {
    super(props, context);
    this.state = {
      emailError: false,
      invalidEmail: false,
      invalidEmailMessage: "",
      errors: [],
    };
  }

  fieldError(margin, message) {
    return (
      <p className="error-field">
        {message ? message : "This field can't be blank."}
      </p>
    )
  }

  validateInput = (data) => {
    var filter = /^([\w-\.]+)@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.)|(([\w-]+\.)+))([a-zA-Z]{2,4}|[0-9]{1,3})(\]?)$/;
    let errors = {};
    let { email, password } = data;
    if (isEmpty(email)) {
      errors.email = "Please enter your Email.";
    }

    if (!filter.test(email)) {
      errors.email = "Email address is not valid.";
    }

    if (isEmpty(password)) {
      errors.password = "Please enter your Password.";
    }

    return {
      errors,
      isValid: isEmpty(errors),
    };
  };

  isValid = () => {
    const { errors, isValid } = this.validateInput(this.state);

    if (!isValid) {
      this.setState({ errors });
    }

    return isValid;
  };

  handleError = (event) => {
    if (event.target.value === "") {
      let newState = Object.assign({}, this.state);
      newState.errors[event.target.name] = "This field can't be blank.";
      this.setState(newState);
    }
    this.setState({ [event.target.name]: event.target.value });
  };

  onSubmit = (event) => {
    event.preventDefault();
    if (this.isValid()) {
      var formData = new FormData();
      let { email, password } = this.state;
      formData.append("email", email);
      formData.append("password", password);
      this.props.loginAction(formData).then((res) => {
        if (res.status && res.status === 200) {
          var currentUser = res.data.user;
          currentUser.profile_id = res.data.profile_id;
          currentUser.profile_picture = res.data.profile_picture;
          localStorage.setItem("accessToken", res.data.token);
          this.props.isAuthenticated(true);
          this.props.setCurrentUser(currentUser);
          if (res.data.user.role === "Project Manager") {
            this.props.history.push("/post-a-job-progress");
          } else if (res.data.user.role === "Freelancer") {
            if (!res.data.user.profile_created) {
              this.props.history.push({
                pathname: "/get-started",
                state: email,
              });
            } else if (
              res.data.user.account_approved &&
              !res.data.user.professional_profile_created
            ) {
              this.props.history.push("/create-profile");
            } else if (res.data.user.professional_profile_created) {
              {
                this.props.history.push("/");
              }
            }
          } else if (res.data.user.role === "Admin") {
            this.props.history.push("/");
          }
        } else if (res.response.status === 401) {
          this.setState({
            invalidEmail: true,
            invalidEmailMessage: res.response.data.message,
          });
        } else {
          this.setState({
            invalidPassword: true,
            invalidPasswordMessage: res.response.data.message,
          });
        }
      });
    }
  };

  handleChange = (e) => {
    if (e.target.value !== "") {
      let newState = Object.assign({}, this.state);
      newState.errors[e.target.name] = "";
      newState.invalidEmail = false;
      this.setState(newState);
    }
    this.setState({ [e.target.name]: e.target.value });
  };

  render() {
    let { email, password } = this.state;
    return (
      <div className="tf_admin_login">
        <nav className="navbar">
          <div className="container-fluid">
            <div className="navbar-header">
              <button
                type="button"
                className="navbar-toggle"
                data-toggle="collapse"
                data-target="#myNavbar"
              >
                <span className="icon-bar"></span>
                <span className="icon-bar"></span>
                <span className="icon-bar"></span>
              </button>
              <Link className="navbar-brand" href="#">
                <img src={logo_1} alt="" /> administration
              </Link>
            </div>
          </div>
        </nav>
        <div className="col-lg-4 col-md-4 col-sm-6 col-lg-offset-1 col-md-offset-1">
          <div className="logbox">
            <form method="post">
              <h1>Login Area</h1>
              <p>Please enter your email and password to login</p>
              <form name="adminLoginForm" onSubmit={this.onSubmit}>
                <div className="row">
                  <div className="col-xs-12 col-sm-12 col-md-12">
                    <div className="form-group">
                      <div className="input-group">
                        <div className="input-group-addon">
                          <img src={userLogo} alt="" />
                        </div>
                        <input
                          type="text"
                          placeholder="Enter email"
                          name="email"
                          required
                          value={email}
                          onChange={this.handleChange}
                          onBlur={this.handleError}
                          className="form-control"
                        />
                        {this.state.errors["email"] && this.fieldError("190")
                          ? this.state.errors["email"] && this.fieldError("190")
                          : this.state.invalidEmail &&
                            this.fieldError(
                              "190",
                              this.state.invalidEmailMessage
                            )}
                      </div>
                    </div>
                  </div>
                  <div className="col-xs-12 col-sm-12 col-md-12">
                    <div className="form-group">
                      <div className="input-group">
                        <div className="input-group-addon">
                          <img src={passwordLogo} alt="" />
                        </div>

                        <input
                          type="password"
                          placeholder="● ● ● ● ● ● ● ● ●"
                          name="password"
                          className="form-control"
                          required
                          value={password}
                          onChange={this.handleChange}
                          onBlur={this.handleError}
                        />
                        {this.state.errors["password"] && this.fieldError("190")
                          ? this.state.errors["password"] &&
                            this.fieldError("190")
                          : null}
                      </div>
                    </div>
                  </div>
                  <div className="col-xs-12 col-sm-12 col-md-12 nopad">
                    <div className="col-xs-6 col-sm-6 col-md-6 tf_full-width">
                      <div className="form-group">
                        <input type="checkbox" name="check" /> Remember Me
                      </div>
                    </div>
                    <div className="col-xs-6 col-sm-6 col-md-6 tf_full-width">
                      <div className="form-group">
                        <Link to="/forget-password" className="tf_forgot">
                          Forgot Password?
                        </Link>
                      </div>
                    </div>
                  </div>
                  <div className="col-xs-12 col-sm-12 col-md-12">
                    <button
                      type="submit"
                      className="btn btn-success btn-block btn-lg"
                    >
                      {" "}
                      Login{" "}
                    </button>
                  </div>
                </div>
              </form>
            </form>
          </div>
        </div>
        <div className="col-md-6 col-sm-5 nopad pull-right tf_width">
          <div className="tf_login-right">
            <img src={bgImg} alt="" />
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    loginStep1: state.loginSteps.loginStep1,
  };
};
const mapDispatchToProps = (dispatch) => {
  return {
    loginAction: (data) => dispatch(adminLoginAction(data)),
    isAuthenticated: (data) => dispatch(isAuthenticated(data)),
    setCurrentUser: (data) => dispatch(setCurrentUser(data)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(AdminLogin);
