import React, { Component } from "react";
import ic_notification from "../../static/images/ic_notification.svg";
import { Link } from "react-router-dom";
import { SetSearchVal } from "../../Actions/SearchActions";
import { getCurrentUserDetails } from "../../Actions/applicationActions";
import {
  getNotificationsForFreelancer,
  updateNotification,
  deleteNotification,
} from "../../Actions/freelancerActions";
import { logOutAction } from "../../Actions/logOutAction";
import { connect } from "react-redux";
import pathImg from "../../static/images/Path_402.svg";
import faceImg from "../../static/images/profile-placeholder.png";
import { isEmpty } from "lodash";
import { ActionCableConsumer } from "react-actioncable-provider";
import { showHideSideBar } from "../../Actions/loginStepsActions";
import msgAudio from "../../static/Audio/sharp.mp3";
import Cable from "./Cable";
import { getConversations } from "../../Actions/conversationActions";
import logo_1 from "../../static/images/logo/logo.svg";
import logo_Img from "../../static/images/logo/logo.png";
import logo_White from "../../static/images/logo_white.png";
import '../../static/stylesheets/dropdown.css';

class ProjectManagerHeader extends Component {
  constructor(props, context) {
    super(props, context)
    this.state = {
      searchType: "jobs",
      searchItem: "",
      isChecked: false,
      conversations: [],
      activeTab: "",
      stateForPath: "",
      freelancerNotifications: [],
      showTab: false
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

    this.props.getCurrentUserDetails()
    this.props.getNotifications('unread').then((res) => {
      if(res.message === "Request failed with status code 401"){
        this.props.logOut()
        this.props.history.push("/")
      }else{
        this.setState({ freelancerNotifications: res })
      }
    })
    this.props
      .getConversations()
      .then((res) => {

        if (!res || (res && res.response && res.response.status === 401)) {
          this.setState({ conversations: [], activeConversation: null })
        } else {
          this.setState({
            conversations: res,
            activeConversation: res ? res[0].id : null,
          })
        }
      })
      .catch((err) => {
        this.props.logOut()
        this.props.history.push("/")
        console.log(err)
      })

    let path = this.props.history.location.pathname.slice(
      1,
      this.props.history.location.pathname.length
    )


    if (path === "find-freelancers2/search" || path === "find-freelancers2/hired") {
      this.setState({ activeTab: (path === "") ? "home" : path })
    } else {
      let res = path.split("/");
      // console.log('res',res[0])
      this.setState({ activeTab: (res[0] === "") ? "home" : res[0] })
    }

  }

  handleDropDown = (path, stateviaPath) => {

    let routes1 = [
      "",
      "all-job-postings",
      "all-contracts",
      "post-a-job-progress",
      "archived",
    ];
    let routes2 = ["find-freelancers", "find-freelancers2"];
    if (routes1.includes(path)) {
      this.setState({
        activeTab: "jobs",
        activePath: path,
      })
    } else if (routes2.includes(path)) {
      this.setState({
        activeTab: "cloudexperts",
        activePath: path,
      })
    }
  }

  logOut() {
    this.props.logOut()
    this.props.history.push("/")
    window.location.reload()
  }
  handleSearch = (e) => {
    this.props.history.push({
      pathname: "/find-freelancers2/search",
      state: { search: this.state.searchItem },
    })
  }

  searchSelection = (e) => {
    if ((e.target.id = "freelancer-search")) {
      this.setState({ searchType: "freelancers" })
    } else {
      this.setState({ searchType: "jobs" })
    }
  }

  handleChange = (e) => {
    this.setState({ searchItem: e.target.value })
    this.props.SetSearchVal(e.target.value)
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

  handleReceivedConversation = (response) => {
    const { conversation } = response;
    let newState = Object.assign({}, this.state)
    const hasConv = newState.conversations.find(
      (a) => a.id === conversation.id
    )
    if (!hasConv) {
      newState.conversations.push(conversation)
    }
    this.setState(newState)
  }

  handleReceivedMessage = (response) => {
    const { message } = response;
    let newState = Object.assign({}, this.state)

    let conversation = newState.conversations.find(
      (conversation) => conversation.id === message.conversation_id
    )

    if (window.location.pathname !== "/messages") {
      if (
        response.message.user_id !==
        (this.props.currentUser.user_id || this.props.currentUser.id)
      ) {
        var audio = new Audio(msgAudio)
        audio.play()
      }
    }

    if (conversation.messages.find((a) => a.id === message.id)) {
      console.log("duplicate")
    } else {
      conversation.messages = [...conversation.messages, message];
    }
    this.setState(newState)
  }

  getUnreadMessageCount = (convos) => {
    let count = 0;
    convos.map((convo) => {
      let unreadMessages = 0;
      convo.messages.map((msg) => {
        if (
          !msg.read_at &&
          msg.user_id !==
          (this.props.currentUser.id || this.props.currentUser.user_id)
        ) {
          unreadMessages = unreadMessages + 1;
        }
        return msg
      })
      count = count + unreadMessages;
      return convo
    })
    return count;
  }

  render() {
    const {
      searchItem,
      conversations,
      activeTab,
      freelancerNotifications
    } = this.state;

    const { currentUserDetails, currentUser } = this.props;
    const userImg = !isEmpty(currentUserDetails) ? currentUserDetails.image_url : currentUser.image_url
    const userFullname = !isEmpty(currentUserDetails) ? currentUserDetails.full_name : `${currentUser.first_name} ${currentUser.last_name}`
    // console.log(userImg , currentUserDetails , "currentUserDetails" );
    return (

      // header_1 project-mng-header project-manager-header-as-a-tabs header_pd
      <div className={this.props.loginSteps.showHideSideBar ? "header_1 project-manager-header-as-a-tabs" : "header_1  project-manager-header-as-a-tabs"}>

        <ActionCableConsumer
          channel={{ channel: "ConversationsChannel" }}
          onReceived={this.handleReceivedConversation}
        />
        {this.state.conversations.length ? (
          <Cable
            conversations={conversations}
            handleReceivedMessage={this.handleReceivedMessage}
          />
        ) : null}
        <div className="navigation ProjectManagerPrimaryHead">

          <div className="col-md-12 header-counts">

            {/* navbar navbar-findcond-1 */}
            <nav className={this.props.loginSteps.showHideSideBar ? "navbar navbar-findcond-1" : "navbar navbar-findcond-1"}>
              <div className="navbar-header">
                <button
                  type="button"
                  className="navbar-toggle collapsed"
                  data-toggle="collapse"
                  data-target="#navbar"
                >
                  <span className="sr-only">Toggle navigation</span>
                  <span className="icon-bar"></span>
                  <span className="icon-bar"></span>
                  <span className="icon-bar"></span>
                </button>

              </div>

              <div className="container-fluid">
                <div id="navbar" className="navbar-collapse collapse">

                  {/* Right menu start */}
                  <ul className="nav navbar-nav project-manager-after-login-right-menu">
                    <li>
                      <div className="manager_logo-container">
                        <Link className="navbar-brand manager_header" to="/">
                          <img src={logo_Img} alt="applogo" />
                        </Link>
                      </div>
                    </li>

                    {(activeTab !== 'find-freelancers2/search' && activeTab !== 'freelancer-search') && !this.props.getActiveJobTab &&
                      <li className="header-search-list-menu">
                        {/* <div className="input-group">
                        <div className="input-group-btn">
                          <span className="btn mn_search1" type="button">
                            <img src={pathImg} alt="" />
                            <button className="search-selection"></button>
                          </span>
                        </div>
                        <form onSubmit={this.handleSearch}>
                          <input
                            type="text"
                            value={searchItem}
                            onChange={this.handleChange}
                            className="search-query1 form-control"
                            placeholder="Find Cloud Experts.."
                          />
                        </form>
                      </div> */}
                        <div className="global-header-search-box">
                          <form onSubmit={this.handleSearch}>
                            <div className="input-group">
                              <div className="input-group-prepend">
                                <button className="btn btn-outline-secondary" type="submit"><i className="fa fa-search"></i></button>
                              </div>
                              <input type="text" className="form-control search-text-field" onChange={this.handleChange} placeholder="Find Cloud Experts..." aria-label="Find Cloud Experts" aria-describedby="basic-addon2" value={searchItem} />
                              {/* <div className="input-group-append">
                                <button className="btn btn-outline-secondary" type="submit"><i className="fa fa-search"></i></button>
                              </div> */}
                            </div>
                          </form>
                        </div>
                      </li>
                    }
                    <li className="header-search-list-menu">

                    </li>
                    <li className="fp_left_resp bell-dropdown dropdown animate-dropdown">
                      <Link to="#" className="dropdown-toggle" data-toggle="dropdown"
                      >

                        {!isEmpty(freelancerNotifications) && freelancerNotifications.length > 0 &&
                          freelancerNotifications[0].notification_count !==
                          0 && (
                            <span className="notifi-counter">
                              {freelancerNotifications[0].notification_count}
                            </span>
                          )}
                        <i className="fa fa-bell-o" aria-hidden="true"></i>
                      </Link>

                      <ul className="dropdown-menu flipRd animated">
                        {!isEmpty(freelancerNotifications) ? (
                          freelancerNotifications.length > 0 && freelancerNotifications.slice(0, 6).map((notifi) => {
                            if (notifi.read_at == null) {
                              return (
                                <li key={notifi.id} className="notifi-li">
                                  <div className="row notification-list-divider">
                                    <div className="col-md-11">
                                      <Link
                                        data-activity={notifi.activity}
                                        data-notifier_uuid={notifi.notifier_uuid}
                                        data-uuid={notifi.uuid}
                                        onClick={this.handleNotification}
                                      >
                                        {notifi.message}
                                      </Link>
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
                          }
                          )
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

                    <li className="dropdown arrow-dropdown animate-dropdown">
                      <div>
                        {/* <Link className="dropdown-toggle fp_left_resp project-manger-main-image" data-toggle="dropdown"> */}
                          {userImg ? (
                            <Link
                              to="#"
                              className="dropdown-toggle"
                              data-toggle="dropdown"
                            >
                              <img
                                className="avatar-img"
                                src={userImg}
                                alt="img"
                              />
                              <span className="">
                                {userFullname}
                              </span>
                            </Link>
                          ) : (
                            <Link
                              to="#"
                              className="dropdown-toggle"
                              data-toggle="dropdown"
                            >
                              <img
                                className="avatar-img"
                                src={faceImg}
                                alt="img"
                              />
                              <span className="">
                                {userFullname}
                              </span>
                            </Link>
                          )}

                        {/* </Link> */}
                        <ul className="dropdown-menu">
                          {/* <li className="dropdown-header">
                            Welcome!
                          </li> */}
                          <li className="dropdown-item">
                            <Link to="/settings?info" >
                              <i
                                className="fa fa-cog"
                                aria-hidden="true"
                              ></i>{" "}
                              Settings</Link>
                          </li>

                          <li className="dropdown-item" onClick={this.logOut}>
                            <Link to={""}>
                              <i
                                className="fa fa-sign-out"
                                aria-hidden="true"
                              ></i>{" "}
                              Logout
                            </Link>
                          </li>
                        </ul>
                      </div>
                    </li>

                  </ul>
                  {/* Right Menu End */}

                </div>
              </div>
            </nav>
            <div className="clearfix"></div>
          </div>
        </div>
        <div className="clearfix"></div>
      </div>
    )
  }
}

const mapStateToProps = (state) => ({
  ...state,
})

const mapDispatchToProps = (dispatch) => {
  return {
    logOut: () => dispatch(logOutAction()),
    showHideSideBar: (status) => dispatch(showHideSideBar(status)),
    SetSearchVal: (value) => dispatch(SetSearchVal(value)),
    getNotifications: (unread) => dispatch(getNotificationsForFreelancer(unread)),
    updateNotification: (data, id) => dispatch(updateNotification(data, id)),
    getConversations: () => dispatch(getConversations()),
    deleteNotification: (id) => dispatch(deleteNotification(id)),
    getCurrentUserDetails: () => dispatch(getCurrentUserDetails()),
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ProjectManagerHeader)
