import React, { Component } from "react";
import ic_notification from "../../static/images/ic_notification.svg";
import { Link } from "react-router-dom";
import { getConversations } from "../../Actions/conversationActions";
import { logOutAction } from "../../Actions/logOutAction";
import {
  getNotificationsForFreelancer,
  updateNotification,
  deleteNotification,
} from "../../Actions/freelancerActions";
import { ActionCableConsumer } from "react-actioncable-provider";
import Cable from "./Cable";
import { connect } from "react-redux";
import { SetSearchVal } from "../../Actions/SearchActions";
import pathImg from "../../static/images/Path_402.svg";
import { getCurrentUserDetails } from "../../Actions/applicationActions";
import { isEmpty } from "lodash";
import msgAudio from "../../static/Audio/sharp.mp3";
import faceImg from "../../static/images/profile-placeholder.png";
import { showHideSideBar } from "../../Actions/loginStepsActions";
import logo_1 from "../../static/images/logo/logo.svg";
import logo_Img from "../../static/images/logo/logo.png";
import '../../../src/static/stylesheets/dropdown.css';
class FreelancerHeader extends Component {
  constructor(props, context) {
    super(props, context);
    this.state = {
      searchType: "jobs",
      searchItem: "",
      isChecked: false,
      conversations: [],
      activeTab: "",
      picture: "",
      showTab: false,
      freelancerNotifications:[]
    }
    this.logOut = this.logOut.bind(this);
  }
  openNav = () => {
    this.setState({
      showTab: !this.state.showTab
    })
    this.props.showHideSideBar(!this.state.showTab)
  }
  componentDidMount() {

    this.props.getNotifications('unread').then((res) => {
      if(res.message === "Request failed with status code 401"){
        this.props.logOut()
        this.props.history.push("/")
      }else{
        this.setState({ freelancerNotifications: res })
      }
    })

    // freelancer image
    this.setState({ picture: this.props.currentUser.profile_picture });

    this.props
      .getConversations()
      .then((res) => {
        if (!res && res.response.status === 401) {
          this.setState({ conversations: [], activeConversation: null });
        } else {
          this.setState({
            conversations: res,
            activeConversation: res ? res[0].id : null,
          });
        }
      })
      .catch((err) => {
       console.log(err ,"--err-header-");
      });

    let path = this.props.history.location.pathname.slice(
      1,
      this.props.history.location.pathname.length
    );
    let newpath = path.split("/");
    if (newpath[0] === 'all-contracts') {
      this.setState({ activeTab: (newpath[0] === "") ? "home" : path })
    } else {
      this.setState({ activeTab: (newpath[0] === "") ? "home" : newpath[0] })
    }

  }


  logOut() {
    this.props.logOut();
    this.props.history.push("/");
    window.location.reload();
  }

  handleSearch = (e) => {
    e.preventDefault();
    const { searchItem } = this.state;
    const { history } = this.props;
    this.props.SetSearchVal(searchItem);

    history.push({
      pathname: "/find-work",
      state: { search: searchItem },
    });
  }

  handleChange = (e) => {
    this.setState({ searchItem: e.target.value });
  }

  handleReceivedConversation = (response) => {
    const { conversation } = response;
    let newState = Object.assign({}, this.state);
    const hasConv = newState.conversations.find(
      (a) => a.id === conversation.id
    );
    if (!hasConv) {
      newState.conversations.push(conversation);
    }
    this.setState(newState);
  }

  handleReceivedMessage = (response) => {
    const { message } = response;
    let newState = Object.assign({}, this.state);

    let conversation = newState.conversations.find(
      (conversation) => conversation.id === message.conversation_id
    );

    if (window.location.pathname !== "/messages") {
      if (
        response.message.user_id !==
        (this.props.currentUser.user_id || this.props.currentUser.id)
      ) {
        var audio = new Audio(msgAudio);
        audio.play();
      }
    }

    if (conversation.messages.find((a) => a.id === message.id)) {
      console.log("duplicate");
    } else {
      conversation.messages = [...conversation.messages, message];
    }

    this.setState(newState);
  }

  searchSelection = (e) => {
    const checkbox = document.getElementById("check01");
    checkbox.checked = false;
    if (e.target.id === "freelancer-search") {
      this.setState({ searchType: "freelancers" });
    } else if (e.target.id === "job-search-new") {
      this.setState({ searchType: "jobs" });
    }
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

        // if ([200, 201].includes(res.status)) {
        //   this.props.getNotifications()
        // }
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
      });
      count = count + unreadMessages;
      return convo
    });
    return count;
  }

  render() {
    const {
      currentUserDetails,
      currentUser
    } = this.props;
    const {
      searchItem,
      // searchType,
      conversations,
      picture,
      activeTab,
      // activePath,
      freelancerNotifications
    } = this.state;

    const userFullname = !isEmpty(currentUserDetails) ? currentUserDetails.full_name : `${currentUser.first_name} ${currentUser.last_name}`

    let findWorkArg = ["cloud-expert-find-work", "my-jobs", "browse-jobs", "profile", "job-details"]
    let myContractArg = ["cloud-expert-my-contracts", "all-contracts/active", "my-proposals", "proposal-details", "invitation-details", "offer-details", "contract-details"]
    let paymentArg = ["cloud-expert-payments", "settings", "transactions", "all-contracts/payment"]

    let subContractArg = ["all-contracts/active", "contract-details"]
    let subArg = ["my-proposals", "offer-details", "invitation-details", "proposal-details"]

    console.log("activeTab",currentUser)
    return (
      <div className="wraper">
        <div className="header_1 cloud-expert-header-as-a-tabs">
          <ActionCableConsumer
            channel={{ channel: "ConversationsChannel" }}
            onReceived={this.handleReceivedConversation}
          />

          {
            this.state.conversations.length ? (
              <Cable
                conversations={conversations}
                handleReceivedMessage={this.handleReceivedMessage}
              />
            )
              :
              null
          }
          <div className={this.props.loginSteps.showHideSideBar ? "navigation CloudExpertPrimaryHead" : "navigation CloudExpertPrimaryHead"}>

            <div className="col-md-12 header-counts">
              <nav className="navbar navbar-findcond-1">
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
                    <ul className="nav navbar-nav tf_nav cloud-expert-after-login-left-menu d-none">

                      <li>
                        <Link
                          to="/"
                          className={
                            activeTab === "home"
                              ? "active"
                              : ""
                          }
                        >
                          Dashboard
                        </Link>
                      </li>
                      <li>
                        <Link
                          to="/cloud-expert-find-work"
                          className={findWorkArg.includes(activeTab) ? "active" : ""}
                        >
                          Find Work
                        </Link>
                      </li>

                      <li>
                        <Link
                          to="/cloud-expert-my-contracts"
                          className={myContractArg.includes(activeTab) ? "active" : ""}
                        >
                          My Contracts
                        </Link>
                      </li>

                      <li>
                        <Link
                          to={"/cloud-expert-payments"}
                          className={paymentArg.includes(activeTab) ? "active" : ""}
                        >
                          Payments
                        </Link>
                      </li>

                    </ul>
                    <ul className="nav navbar-nav project-manager-after-login-right-menu">
                      <li>
                        <div className="manager_logo-container">
                          <Link className="navbar-brand manager_header" to="/">
                            <img src={logo_Img} alt="applogo" />
                          </Link>
                        </div>
                      </li>

                      {(activeTab !== 'browse-jobs' && activeTab !== 'my-jobs') &&

                        <li className="header-search-list-menu">
                          {/* <div className="input-group">
                          <div className="input-group-btn">
                            <button
                              className="btn btn-danger mn_search1 search-drop-css"
                              type="button"
                            >
                              <img src={pathImg} align="" alt="" />
                              <input
                                id="check01"
                                type="checkbox"
                                name="menu"
                                className="search-selection"
                              />
                              <label htmlFor="check01">
                                <i className="fa fa-angle-down"></i>
                              </label>

                            </button>
                          </div>
                          <form onSubmit={this.handleSearch}>
                            <input
                              type="text"
                              className=" search-query1 form-control"
                              onChange={this.handleChange}
                              value={searchItem}
                              placeholder={"Find Jobs....."}
                            />
                          </form>

                        </div> */}
                          <div className="global-header-search-box">
                            <form onSubmit={this.handleSearch}>
                              <div className="input-group">
                                <input type="text" className="form-control search-text-field" placeholder="Find Jobs..." aria-label="Find Jobs" aria-describedby="basic-addon2" onChange={this.handleChange} />
                                <div className="input-group-prepend">
                                  <button className="btn btn-outline-secondary" type="submit"><i className="fa fa-search"></i></button>
                                </div>
                              </div>
                            </form>
                          </div>
                        </li>
                      }
                      {/* <li className="fp_left_resp">
                        <Link to={"#"}>
                          <img src={noun_Question} alt="nounque" />
                        </Link>
                      </li> */}
                      <li className="header-search-list-menu">
                      </li>
                      <li className="fp_left_resp bell-dropdown animate-dropdown dropdown">
                        <Link
                          to={"#"}
                          className="dropdown-toggle"
                          data-toggle="dropdown"
                          role="button"
                          aria-expanded="false"
                        >
                          <i className="fa fa-bell-o" aria-hidden="true"></i>

                          {!isEmpty(freelancerNotifications) && freelancerNotifications.length > 0 &&
                            freelancerNotifications[0].notification_count !==
                            0 && (
                              <span className="notifi-counter">
                                {freelancerNotifications[0].notification_count}
                              </span>
                            )}
                        </Link>
                        <ul className="dropdown-menu flipRd animated">
                          {!isEmpty(freelancerNotifications) ? (
                            freelancerNotifications.length > 0 && freelancerNotifications
                              .slice(0, 6)
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
                                // return notifi
                              })
                          ) : (
                            <li className="no-notifi-msg dropdown-header m-0">No Notifications</li>
                          )}
                          <li className="see-all-notifications-button">
                            <div className="row">
                              <div className="col-md-12 p-0">
                                <Link to={`/notifications`} className='dropdown-item m-0'>
                                  See all Notifications
                                </Link>
                              </div>
                            </div>
                          </li>
                        </ul>
                      </li>
                      <li className="fp_left_resp dropdown animate-dropdown arrow-dropdown" id="user-drop-down">
                        <div>
                          {picture && picture === currentUserDetails?.user_profile?.freelancer_image ? (
                            <Link
                              to={"#"}
                              className="dropdown-toggle"
                              data-toggle="dropdown"
                              role="button"
                              aria-haspopup="true"
                              aria-expanded="false"
                            >
                              <img
                                className="avatar-img"
                                src={picture}
                                alt="User"
                              />
                              <span className="" data-toggle="tooltip" data-placement="bottom" title={userFullname ? userFullname : ''}>
                                {userFullname
                                  ? `${userFullname.substring(
                                    0,
                                    20
                                  )}`
                                  : ""}
                              </span>
                            </Link>
                          ) : (
                            <Link
                              to={"#"}
                              className="dropdown-toggle"
                              data-toggle="dropdown"
                              role="button"
                              aria-haspopup="true"
                              aria-expanded="false"
                            >
                              <img
                                className="avatar-img"
                                src={
                                  currentUserDetails?.user_profile &&
                                    currentUserDetails?.user_profile?.freelancer_image
                                    ? currentUserDetails?.user_profile?.freelancer_image
                                    : faceImg
                                }
                                alt="User"
                              />
                              <span className="" data-toggle="tooltip" data-placement="bottom" title={userFullname ? userFullname : ''}>
                                {userFullname
                                  ? `${userFullname.substring(
                                    0,
                                    20
                                  )}`
                                  : ""}
                              </span>
                            </Link>
                          )}

                          <ul className="dropdown-menu">
                            {/* <li className="dropdown-header">
                              Welcome!
                            </li> */}
                            {/* <li className="freelancer-profile-setting-dropdown-menu-sub-item">
                              <a href="/settings?profilesetting" >
                                <i
                                  className="fa fa-cog"
                                  aria-hidden="true"
                                ></i>{" "}
                                Settings</a>
                            </li> */}
                            <li className="dropdown-item">
                              <Link to="/profile" >
                                <i
                                  className="fa fa-user"
                                  aria-hidden="true"
                                ></i>{" "}
                                My Profile</Link>
                            </li>

                            <li className="dropdown-item" onClick={this.logOut}>
                              <Link to={"#"}>
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
                  </div>
                </div>
              </nav>
            </div>
          </div>

          <div className="clearfix"></div>

          {/* Find Work Sub Menu Start */}
          {
            findWorkArg.includes(activeTab) ? (
              <div id="tf-project-manager-dashboard-secondary-header-container" className="d-none">
                <div className="ProjectManagerSecondaryHead">
                  <div className="">
                    <nav className="navbar">
                      <div className="navbar-header">
                        <button
                          type="button"
                          className="navbar-toggle collapsed"
                          data-toggle="collapse"
                          data-target="#ProjectManagerHire"
                        >
                          <span className="sr-only">Toggle navigation</span>
                          <span className="icon-bar"></span>
                          <span className="icon-bar"></span>
                          <span className="icon-bar"></span>
                        </button>
                      </div>

                      <div className="container">
                        <div id="ProjectManagerHire" className="navbar-collapse collapse">



                          <ul className="nav navbar-nav">
                            <li className="dropdown">
                              <Link to="/my-jobs" className={activeTab === "my-jobs" ? "active" : ""}>
                                <i className="fa fa-list-ul" aria-hidden="true"></i> My Jobs
                              </Link>
                            </li>

                            <li className="dropdown">
                              <Link to="/find-work" className={activeTab === "browse-jobs" ? "active" : ""}>
                                <i className="fa fa-search" aria-hidden="true"></i> Browse Jobs
                              </Link>
                            </li>

                            <li className="dropdown">
                              <Link to="/profile" className={activeTab === "profile" ? "active" : ""}>
                                <i className="fa fa-user" aria-hidden="true"></i> Profile
                              </Link>
                            </li>

                          </ul>
                        </div>
                      </div>
                    </nav>
                  </div>
                </div>
              </div>
            ) : ""
          }
          {/* Find Work Sub Menu Start */}


          {/* My Contracts Sub Menu Start */}
          {
            myContractArg.includes(activeTab) ? (
              <div id="tf-project-manager-dashboard-secondary-header-container" className="d-none">
                <div className="ProjectManagerSecondaryHead">
                  <div className="">
                    <nav className="navbar">
                      <div className="navbar-header">
                        <button
                          type="button"
                          className="navbar-toggle collapsed"
                          data-toggle="collapse"
                          data-target="#ProjectManagerHire"
                        >
                          <span className="sr-only">Toggle navigation</span>
                          <span className="icon-bar"></span>
                          <span className="icon-bar"></span>
                          <span className="icon-bar"></span>
                        </button>
                      </div>

                      <div className="container">
                        <div id="ProjectManagerHire" className="navbar-collapse collapse">

                          <ul className="nav navbar-nav">
                            <li className="dropdown">
                              <Link to="/all-contracts/active" className={subContractArg.includes(activeTab) ? "active" : ""}>
                                <i className="fa fa-address-book" aria-hidden="true"></i> All Contracts
                              </Link>
                            </li>

                            <li className="dropdown">
                              <Link to="/my-proposals" className={subArg.includes(activeTab) ? "active" : ""}>
                                <i className="fa fa-sticky-note" aria-hidden="true"></i> Proposals
                              </Link>
                            </li>

                          </ul>
                        </div>
                      </div>
                    </nav>
                  </div>
                </div>
              </div>
            ) : ""
          }
          {/* My Contracts Sub Menu Start */}

          {/* My Contracts Sub Menu Start */}
          {
            paymentArg.includes(activeTab) ? (
              <div id="tf-project-manager-dashboard-secondary-header-container" className="d-none">
                <div className="ProjectManagerSecondaryHead">
                  <div className="">
                    <nav className="navbar">
                      <div className="navbar-header">
                        <button
                          type="button"
                          className="navbar-toggle collapsed"
                          data-toggle="collapse"
                          data-target="#ProjectManagerHire"
                        >
                          <span className="sr-only">Toggle navigation</span>
                          <span className="icon-bar"></span>
                          <span className="icon-bar"></span>
                          <span className="icon-bar"></span>
                        </button>
                      </div>

                      <div className="container">
                        <div id="ProjectManagerHire" className="navbar-collapse collapse">

                          <ul className="nav navbar-nav">
                            <li className="dropdown">
                              <Link to="/settings" className={activeTab === "settings" ? "active" : ""}>
                                <i className="fa fa-cogs" aria-hidden="true"></i> Payment Methods
                              </Link>
                            </li>

                            <li className="dropdown">
                              <Link to="/transactions" className={activeTab === "transactions" ? "active" : ""}>
                                <i className="fa fa-file-text" aria-hidden="true"></i> Invoices
                              </Link>
                            </li>

                            <li className="dropdown">
                              <Link to="/all-contracts/payment" className={activeTab === "all-contracts/payment" ? "active" : ""}>
                                <i className="fa fa-address-book" aria-hidden="true"></i> Payment Requests
                              </Link>
                            </li>

                          </ul>
                        </div>
                      </div>
                    </nav>
                  </div>
                </div>
              </div>
            ) : ""
          }
          {/* My Contracts Sub Menu Start */}

        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  ...state,
});

const mapDispatchToProps = (dispatch) => {
  return {
    logOut: () => dispatch(logOutAction()),
    showHideSideBar: (status) => dispatch(showHideSideBar(status)),
    SetSearchVal: (value) => dispatch(SetSearchVal(value)),
    getConversations: () => dispatch(getConversations()),
    getCurrentUserDetails: () => dispatch(getCurrentUserDetails()),
    getNotifications: (unread) => dispatch(getNotificationsForFreelancer(unread)),
    updateNotification: (data, id) => dispatch(updateNotification(data, id)),
    deleteNotification: (id) => dispatch(deleteNotification(id)),
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(FreelancerHeader);
