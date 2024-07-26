import React, { Component } from "react";
// import ic_notification from '../../static/images/ic_notification.svg';
import logo_1 from '../../static/images/logo/logo.png';
import { Link } from 'react-router-dom';
import { logOutAction } from '../../Actions/logOutAction';
import { connect } from "react-redux";
import { isEmpty } from "lodash";
import faceImg from '../../static/images/profile-placeholder.png';
// import whiteLogo from '../../static/images/logo/logo-blue-white.png';
import { showHideSideBar } from "../../Actions/loginStepsActions";

import {
  getNotificationsForFreelancer,
  updateNotification,
  deleteNotification,
} from "../../Actions/freelancerActions";


class AdminHeader extends Component {
  constructor(props, context) {
    super(props, context)
    this.state = {
      freelancerNotifications: [],
      NetWorkError : ""
    }
    this.logOut = this.logOut.bind(this)
  }
  openNav = () => {
    this.setState({
      showTab: !this.state.showTab
    })
    this.props.showHideSideBar(!this.state.showTab)
  }

  componentDidMount() {
    // console.log(this.props.currentUser , "gtrfggjhgj");
    this.props.getNotifications('unread').then((res) => {
      // error.toJSON()
 
      if ((res.message === "Request failed with status code 401")) {
        this.props.logOut()
        this.props.history.push('/')
      }else if(res.message === "Network Error"){
        this.setState({NetWorkError : res.message})
      } else {
        this.setState({ freelancerNotifications: res ,NetWorkError : "" })
      }
    })
  }


  logOut() {
    this.props.logOut()
    this.props.history.push('/')
    window.location.reload()
  }

  handleNotification = (e) => {
    e.preventDefault()
    let uuid = e.target.dataset.uuid
    let activity = e.target.dataset.activity
    let notifier_uuid = e.target.dataset.notifier_uuid
    this.setState({ isChecked: !this.state.isChecked })

    this.props
      .updateNotification(uuid)
      .then((res) => {
        this.props.history.push({
          pathname: `/${activity}/${notifier_uuid}`,
          state: "from-notifi"
        })
      })
  }

  deleteNotifi = (id) => {
    let newNotArray = []
    this.state.freelancerNotifications.map(not => {
      if (not.id !== id) {
        newNotArray.push(not)
      }
      return not
    })

    this.setState({
      freelancerNotifications: newNotArray
    })
  }
  render() {
    const { first_name, last_name } = this.props.currentUser
    const { freelancerNotifications } = this.state
    // console.log("freelancerNotifications",freelancerNotifications)
    return (
      <div className='header_1 cloud-expert-header-as-a-tabs'>
        {/* {this.state.NetWorkError} */}
        {/* Start Navigation */}
<p className="header-error-message" >{this.state.NetWorkError}</p>
        <nav className="navbar navbar-findcond-1 admin-header super-administrator-header">
          {/* Start Container */}

          <div className="container-fluid">

            <div className="navbar-header">

              <button type="button" className="navbar-toggle collapsed" data-toggle="collapse" data-target="#navbar">
                <span className="sr-only">Toggle navigation</span>
                <span className="icon-bar"></span>
                <span className="icon-bar"></span>
                <span className="icon-bar"></span>
              </button>

              <div>

                {/* <div>
                  <button id="open_sidebar" className="openbtn" onClick={() => this.openNav()}>
                    <i class="fa fa-long-arrow-left sidebar_toggle" aria-hidden="true"></i>
                  </button>
                  <button id="close_sidebar" className="openbtn" onClick={() => this.openNav()}>
                    <i class="fa fa-long-arrow-left sidebar_toggle" aria-hidden="true"></i>
                  </button>
                </div> */}

              </div>

            </div>
            <div id="navbar" className="navbar-collapse collapse">

              {/* Start Left Menu */}
              <ul className="nav navbar-nav">
                <li>
                  <Link to='/' className="p-0"><img src={logo_1} style={{ width: "200px" }} alt="" /></Link>
                </li>
              </ul>
              {/* End Left Menu */}

              {/* Start Right Menu */}
              <ul className="nav navbar-nav tf_nav admin-menu-header">

                <li className="fp_left_resp dropdown admin-notification-bell-icon animate-dropdown">
                  <Link
                    to={"#"}
                    className="dropdown-toggle"
                    data-toggle="dropdown"
                    role="button"
                    aria-expanded="false"
                  >
                    <i className="fa fa-bell-o" aria-hidden="true"></i>

                    {!isEmpty(freelancerNotifications) && freelancerNotifications.length > 0 &&
                      freelancerNotifications[0].notification_count > 0 && (
                        <span className="notifi-counter">
                          {freelancerNotifications[0].notification_count}
                        </span>
                      )}
                  </Link>
                  <ul className="dropdown-menu admin_notification_position notification-area">
                    {!isEmpty(freelancerNotifications) ? (
                      freelancerNotifications.length > 0 && freelancerNotifications
                        .slice(0, 2)
                        .map((notifi) => {
                          if (notifi.read_at === null) {
                            return (
                              <li key={notifi.id} className="notifi-li">
                                <div className="row notification-list-divider">
                                  <div className="col-md-11">
                                    {notifi.activity ? (
                                      <Link
                                        data-activity={notifi.activity}
                                        data-notifier_uuid={notifi.notifier_uuid}
                                        data-uuid={notifi.uuid}
                                        onClick={this.handleNotification}
                                        to="#"
                                      >
                                        {notifi.message}
                                      </Link>
                                    ) : (
                                      <Link>{notifi.message}</Link>
                                    )}
                                  </div>

                                  <div className="col-md-1">
                                    <button
                                      onClick={() =>
                                        this.deleteNotifi(notifi.id)
                                      }
                                      type="button"
                                      className="close"
                                      data-dismiss="dropdown"
                                      aria-hidden="true"
                                    >
                                      ×
                                    </button>
                                  </div>
                                </div>
                                <div className="clearfix"></div>
                              </li>
                            )
                          }
                          return 
                        })
                    ) : (
                      <li className="no-notifi-msg">No Notifications</li>
                    )}
                    <li className="see-all-notifications-button">
                      <div className="row">
                        <div className="col-md-12">
                          <Link to={`/notifications`}>
                            See all Notifications
                          </Link>
                        </div>
                      </div>
                    </li>
                  </ul>
                </li>

                <li className="admin-profile-image-with-dropdown arrow-dropdown ml-20" id="user-drop-down">
                  {/* <div className="dropdown">
                    <Link to={"#"} className="tf_pad dropdown-toggle" data-toggle="dropdown" role="button" aria-haspopup="true" aria-expanded="false">
                      <img className="avatar-img" src={faceImg} alt="" />
                      <span className="admin-profile-name">{first_name} {last_name}</span>
                    </Link>

                    <ul className="dropdown-menu tf_left super-administrator-profile-setting-dropdown-menu flipRd animated">
                      <li className="dropdown-item"><Link to={"#"}><i className="fa fa-cog" aria-hidden="true"></i> Settings</Link></li>
                      <li className="dropdown-item"><Link to={"#"}><i className="fa fa-question" aria-hidden="true"></i> Help Center</Link></li>
                      <li className="dropdown-item" onClick={this.logOut}><Link to={"#"}><i className="fa fa-sign-out" aria-hidden="true"></i> Logout</Link></li>
                    </ul>
                  </div> */}
                  <div className="dropdown animate-dropdown">
                    <button className="dropdown-toggle" type="button" data-toggle="dropdown"><img className="avatar-img" src={faceImg} alt="" /> {first_name} {last_name}
                    </button>
                    <ul className="dropdown-menu">
                      <li><Link to="/setting"><i className="fa fa-cog" aria-hidden="true"></i> Settings</Link></li>
                      <li><Link to="#"><i className="fa fa-question" aria-hidden="true"></i> Help Center</Link></li>
                      <li><Link to="#" onClick={this.logOut}><i className="fa fa-sign-out" aria-hidden="true"></i> Logout</Link></li>
                    </ul>
                  </div>
                  {/* <div class="dropdown placement-dropdown">
                                                                                                    <button class="dropdown-toggle" type="button" data-toggle="dropdown">:
                                                                                                    </button>
                                                                                                    <ul class="dropdown-menu">
                                                                                                        <li><a href="#">HTML</a></li>
                                                                                                        <li><a href="#">CSS</a></li>
                                                                                                        <li><a href="#">JavaScript</a></li>
                                                                                                    </ul>
                                                                                                </div> */}
                </li>

              </ul>
              {/* End Right Menu */}

            </div>


          </div>
          {/* End Container */}
        </nav>
        {/* End Navigation */}

      </div>

    )
  }
}

const mapStateToProps = state => ({
  ...state
})

const mapDispatchToProps = (dispatch) => {
  return {
    logOut: () => dispatch(logOutAction()),
    showHideSideBar: (status) => dispatch(showHideSideBar(status)),
    getNotifications: (unread) => dispatch(getNotificationsForFreelancer(unread)),
    updateNotification: (data, id) => dispatch(updateNotification(data, id)),
    deleteNotification: (id) => dispatch(deleteNotification(id)),
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(AdminHeader)