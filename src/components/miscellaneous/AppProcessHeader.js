import React, { Component } from "react";
import ic_notification from '../../static/images/ic_notification.svg';
import logo_1 from '../../static/images/logo/logo.svg';
import logo_Img from "../../static/images/logo/logo.png";
import { Link } from 'react-router-dom';
import { logOutAction } from '../../Actions/logOutAction';
import { getCurrentUserDetails } from '../../Actions/applicationActions';
import { connect } from "react-redux";
import faceImg from '../../static/images/profile-placeholder.png';

class AppProcessStep1 extends Component {
  constructor(props, context) {
    super(props, context)
    this.openDropDown = this.openDropDown.bind(this)
    this.logOut = this.logOut.bind(this)
  }

  componentDidMount() {
    this.props.getCurrentUserDetails()
  }

  openDropDown() {
    const dropElement = document.getElementById('user-drop-down')
    dropElement.classList.toggle("open")
  }

  logOut() {
    this.props.logOut()
    this.props.history.push('/')
  }
  render() {
    const { full_name, user_profile } = this.props.currentUserDetails;
    return (
      <div className="header_1 process-header project-mng-header">
        <div className="navigation">
          <div className="col-md-12 pd_none">
            <nav className="navbar navbar-findcond-1">
              {/* <div className="navbar-header mt_19">
                <button type="button" className="navbar-toggle collapsed" data-toggle="collapse" data-target="#navbar">
                  <span className="sr-only">Toggle navigation</span>
                  <span className="icon-bar"></span>
                  <span className="icon-bar"></span>
                  <span className="icon-bar"></span>
                </button>
                <Link className="navbar-brand help_su" to='/'>
                <img src={logo_Img} alt="logo" /><span>Application	Process</span></Link>
              </div> */}
              <div className="navbar-header">
                <button type="button" className="navbar-toggle collapsed" data-toggle="collapse" data-target="#navbar">
                  <span className="sr-only"></span>
                  <span className="icon-bar"></span>
                  <span className="icon-bar"></span>
                  <span className="icon-bar"></span>
                </button>
              </div>
              <div className="container-fluid">
                <div id="navbar" className="navbar-collapse collapse">
                <ul className="nav app-process-header">
                  {/* <li className="fp_left_resp"><Link href="#"><img src={noun_Question} alt="noun_que" /></Link></li> */}
                  <li>
                    {/* <div className="navbar-header mt_19">
                <button type="button" className="navbar-toggle collapsed" data-toggle="collapse" data-target="#navbar">
                  <span className="sr-only">Toggle navigation</span>
                  <span className="icon-bar"></span>
                  <span className="icon-bar"></span>
                  <span className="icon-bar"></span>
                </button>
                <Link className="navbar-brand help_su" to='/'>
                <img src={logo_Img} alt="logo" /><span>Application	Process</span></Link>
              </div> */}
                    <div className="manager_logo-container">
                      <Link className="navbar-brand manager_header"><img src={logo_Img} alt="" /></Link> &nbsp;
                      {/* <span><strong>Application	Process</strong></span> */}
                    </div>
                  </li>
                  <li className="ml-auto fp_left_resp animate-dropdown" style={{marginLeft: 'auto'}}>
                    <Link href="#" class="dropdown-toggle" type="button" data-toggle="dropdown">
                       <span className="notifi-counter">2</span><i className="fa fa-bell-o"></i></Link>
                  {/* <button class="dropdown-toggle" type="button" data-toggle="dropdown"><img src={ic_notification} alt="ic_notifi" /> 

                    </button> */}
                    <ul class="dropdown-menu">
                      <li className="see-all-notifications-button"><Link to="#"> See All Notifications</Link></li>
                    </ul>
                  </li>
                  <li className="dropdown fp_left_resp animate-dropdown arrow-dropdown" id="user-drop-down" onClick={this.openDropDown}>
                    {/* {user_profile && user_profile.freelancer_image ?
                      <Link href="#" className="dropdown-toggle"
                        role="button"><img className="avatar-img" src={user_profile.freelancer_image} alt="User" />
                      </Link>
                      :
                      <div className="header-avatar"><img className="avatar-img" src={faceImg} alt="User" />
                        <span className="inactive-freelancer-name-in-memu" data-toggle="tooltip" data-placement="top" title={full_name ? full_name : ''}>
                          {
                            full_name ?
                              `${full_name.substring(0, 12)}` : ''
                          }
                        </span>
                      </div>

                    }
                    <ul className="dropdown-menu">
                      <li className="disabled dropdown-header"><h4 className="m-0">Welcome!</h4></li>
                      <li className="inactive-freelancer-profile-setting-dropdown-menu-sub-item" onClick={this.logOut}><Link><i className="fa fa-sign-out" aria-hidden="true"></i> Logout</Link></li>
                    </ul> */}
                    <button class="dropdown-toggle" type="button" data-toggle="dropdown"><img className="avatar-img" src={faceImg} alt="User" />
                        <span className="inactive-freelancer-name-in-memu" data-toggle="tooltip" data-placement="top" title={full_name ? full_name : ''}>
                          {
                            full_name ?
                              `${full_name.substring(0, 12)}` : ''
                          }
                        </span>
                    </button>
                    <ul class="dropdown-menu">
                      <li><Link to="#"><i className="fa fa-user" aria-hidden="true"></i> Welcome!</Link></li>
                      <li><Link to="#" onClick={this.logOut}><i className="fa fa-sign-out" aria-hidden="true"></i> logOut</Link></li>
                    </ul>
                  </li>
                </ul>
              </div>
              </div>

              <div className="container">
              </div>
            </nav>
          </div>
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
    getCurrentUserDetails: () => dispatch(getCurrentUserDetails()),
    logOut: () => dispatch(logOutAction()),
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(AppProcessStep1)