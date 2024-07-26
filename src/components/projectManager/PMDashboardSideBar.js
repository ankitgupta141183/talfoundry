import React, { Component } from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
// import { isEmpty } from "lodash";
// import logo_1 from "../../static/images/logo/logo.svg";
// import faceImg from "../../static/images/profile-placeholder.png";
import { logOutAction } from "../../Actions/logOutAction";
import { getCurrentUserDetails } from "../../Actions/applicationActions";
// import userImg from "../../static/media/profile-placeholder.6fe67aad.png";
// import sm_logo from "../../static/images/small-logo.png";
// import logo_Img from "../../static/images/logo/logo.png";
import { showHideSideBar } from "../../Actions/loginStepsActions";

class PMDashboardSideBar extends Component {
  constructor(props, context) {
    super(props, context);
    this.state = {
      activeTab: "",
      open1: false,
      open2: false,
      open3: false,
      open4: false,
      open5: false,
      openTab: ""
    };
    this.logOut = this.logOut.bind(this);
    this.currentOpenTab = this.currentOpenTab.bind(this)
  }

  componentDidMount() {
    let path = this.props.history.location.pathname.slice(
      1,
      this.props.history.location.pathname.length
    );

    if (path === "settings") {
      let newPath = "/info";

      if (this.props.history.location.search === "") {
        path = path + "/info";
      } else {
        newPath = this.props.history.location.search.slice(
          1,
          this.props.history.location.search.length
        );
        path = path + "/" + newPath;
      }
      this.currentOpenTab(path)
      // this.setState({ activeTab: path });
    } else if (
      path === "find-freelancers2/search" ||
      path === "find-freelancers2/hired"
    ) {
      this.currentOpenTab(path === "" ? "home" : path)
      // this.setState({ activeTab: path === "" ? "home" : path });
    } else {
      let res = path.split("/");
      this.currentOpenTab(res[0] === "" ? "home" : res[0])
      // this.setState({ activeTab: res[0] === "" ? "home" : res[0] });
    }
  }

  componentDidUpdate(prevProps){
    // console.log(this.props.location?.search , "this.props.location?.search side bar ");
    // console.log(prevProps.location?.search , "this.props.location?.prooroorpoefdjgvkjfgnbfgb ");

    if(prevProps.location?.search !== this.props.location?.search){
      let path = this.props.history.location.pathname.slice(
        1,
        this.props.history.location.pathname.length
      );
      console.log(path , "path   first");
      if (path === "settings") {
        let newPath = "/info";
  
        if (this.props.history.location.search === "") {
          path = path + "/info";
        } else {
          newPath = this.props.history.location.search.slice(
            1,
            this.props.history.location.search.length
          );
          path = path + "/" + newPath;
        }

        console.log(path , "pathpathpathpathpathpathpath");
        this.currentOpenTab(path)
        // this.setState({ activeTab: path });
      }
    }

  }

  currentOpenTab(type) {
    this.setState({ activeTab: type });
    // console.log(type, "CurrentOpenTAb");

    let hireArg = [
      "project-manager-hire-new",
      "post-a-job-progress",
      "invited",
      "find-freelancers2/search",
      "archived",
      "my-jobs",
      "edit-a-job-progress",
      "job",
    ];
    let manageArg = [
      "project-manager-manage-new",
      "find-freelancers2/hired",
      "all-contracts",
      "my-proposals",
      "invitation-details",
      "freelancer-proposal",
    ];
    let paymentArg = [
      "project-manager-payment-new",
      "transactions",
      "settings/billing",
    ];
    let settingArg = [
      "settings/info",
      "settings/passAndSec",
      "settings/notification",
    ];

    if (hireArg.includes(type)) {
      this.setState({ openTab: "Hire" })
    } else if (manageArg.includes(type)) {
      this.setState({ openTab: "Manager" })
    } else if (paymentArg.includes(type)) {
      this.setState({ openTab: "Payment" })
    } else if (settingArg.includes(type)) {
      this.setState({ openTab: "Setting" })
    }
  }



  logOut() {
    this.props.logOut();
    this.props.history.push("/");
    window.location.reload();
  }
  handleMouseEnter() {
    this.props.showHideSideBar(true);
  }
  handleMouseLeave() {
    this.props.showHideSideBar(false);
  }
  // handleActiveLink(hireArg){
  // this.setState({ open2: true })
  // }

  handleActivesideBarTab(openTabName) {
    const { openTab } = this.state;
    openTab === openTabName
      ? this.setState({ openTab: "" })
      : this.setState({ openTab: openTabName });


  }
  render() {
    // console.log(this.props.loginSteps.showHideSideBar);

    // const { currentUserDetails, currentUser } = this.props;
    // const userImg = !isEmpty(currentUserDetails) ? currentUserDetails.image_url : currentUser.image_url
    // const userFullname = !isEmpty(currentUserDetails)
    //   ? currentUserDetails.full_name
    //   : `${currentUser.first_name} ${currentUser.last_name}`;

    const { activeTab, openTab } = this.state;

    let hireArg = [
      "project-manager-hire-new",
      "post-a-job-progress",
      "invited",
      "find-freelancers2/search",
      "archived",
      "my-jobs",
      "edit-a-job-progress",
      "job",
    ];
    let manageArg = [
      "project-manager-manage-new",
      "find-freelancers2/hired",
      "all-contracts",
      "my-proposals",
      "invitation-details",
      "freelancer-proposal",
    ];
    let paymentArg = [
      "project-manager-payment-new",
      "transactions",
      "settings/billing",
    ];
    let settingArg = [
      "settings/info",
      "settings/passAndSec",
      "settings/notification",
    ];
    //
    // console.log(activeTab , "activeTab");
    return (
      <>
        <div className="custom_sticky_container">
          <div
            id="MainMenuProjectManagerSideBar"
            className={
              !this.props.loginSteps.showHideSideBar ? "sidebar" : "sidebar-add"
            }
          >
            <div className="list-group panel">
              {/* Dashboard Link Start */}
              <Link
                to="/"
                className={
                  activeTab === "home"
                    ? "list-group-item active"
                    : "list-group-item"
                }
                data-parent="#MainMenuProjectManagerSideBar"
              >
                <i className="fa fa-home dash_img" aria-hidden="true"></i>{" "}
                Dashboard{" "}
              </Link>
              {/* Dashboard Link End */}

              {/* Hire Link Start */}
              <a
                href="#JobsMenuLeftSide"
                onClick={() => {
                  this.handleActivesideBarTab("Hire")
                }}
                className={
                  hireArg.includes(activeTab)
                    ? "list-group-item active"
                    : "list-group-item"
                }
                data-toggle={openTab !== "Hire" ? "collapse" : ""}
                data-parent="#MainMenuProjectManagerSideBar"
              // aria-expanded="false"
              // aria-controls="JobsMenuLeftSide"
              >
                <i className="fa fa-user dash_img" aria-hidden="true"></i> Hire{" "}
                {openTab === "Hire" ? (
                  <i className="fa fa-angle-down"></i>
                ) : (
                  <i className="fa fa-angle-right"></i>
                )}
              </a>
              <div
                className={
                  openTab === "Hire"
                    ? "collapse in"
                    : "collapse"
                }
                // className="collapse"
                id="JobsMenuLeftSide"
              >
                <Link
                  to="/post-a-job-progress"
                  className={
                    activeTab === "post-a-job-progress"
                      ? "list-group-item sub active"
                      : "list-group-item sub"
                  }
                >
                  <i
                    className="fa fa-paper-plane dash_img-inner golden_clr"
                    aria-hidden="true"
                  ></i>{" "}
                  Post a Job
                </Link>
                <Link
                  to="/my-jobs"
                  className={
                    activeTab === "my-jobs"
                      ? "list-group-item sub active"
                      : "list-group-item sub"
                  }
                >
                  <i
                    className="fa fa-list-ul dash_img-inner golden_clr"
                    aria-hidden="true"
                  ></i>{" "}
                  My Jobs{" "}
                </Link>
                <Link
                  to="/find-freelancers2/search"
                  className={
                    activeTab === "find-freelancers2/search"
                      ? "list-group-item sub active"
                      : "list-group-item sub"
                  }
                >
                  <i
                    className="fa fa-search dash_img-inner golden_clr"
                    aria-hidden="true"
                  ></i>{" "}
                  Cloud Expert
                </Link>
              </div>
              {/* Hire Link End */}

              {/* Manager Link Start */}
              <a
                href="#ManageMenuLeftSide"
                onClick={() => {
                  this.handleActivesideBarTab("Manager")
                }}
                className={
                  manageArg.includes(activeTab)
                    ? "list-group-item active"
                    : "list-group-item"
                }
                data-toggle={openTab !== "Manager" ? "collapse" : ""}
                data-parent="#MainMenuProjectManagerSideBar"
              // aria-expanded="false"
              // aria-controls="ManageMenuLeftSide"
              >
                <i className="fa fa-address-book dash_img" aria-hidden="true"></i>{" "}
                Manage{" "}
                {openTab === "Manager" ? (
                  <i className="fa fa-angle-down"></i>
                ) : (
                  <i className="fa fa-angle-right"></i>
                )}
              </a>
              <div
                className={
                  openTab === "Manager"
                    ? "collapse in"
                    : "collapse"
                }
                // className="collapse"
                id="ManageMenuLeftSide"
              >
                <Link
                  to="/find-freelancers2/hired"
                  className={
                    activeTab === "find-freelancers2/hired"
                      ? "list-group-item sub active"
                      : "list-group-item sub"
                  }
                >
                  <i
                    className="fa fa-user dash_img-inner green_clr"
                    aria-hidden="true"
                  ></i>{" "}
                  My Cloud Experts
                </Link>
                <Link
                  to="/all-contracts"
                  className={
                    activeTab === "all-contracts"
                      ? "list-group-item sub active"
                      : "list-group-item sub"
                  }
                >
                  <i
                    className="fa fa-address-book dash_img-inner green_clr"
                    aria-hidden="true"
                  ></i>
                  All Contracts
                </Link>
                <Link
                  to="/my-proposals"
                  className={
                    activeTab === "my-proposals"
                      ? "list-group-item sub active"
                      : "list-group-item sub"
                  }
                >
                  <i
                    className="fa fa fa-sticky-note dash_img-inner green_clr"
                    aria-hidden="true"
                  ></i>
                  My Proposals
                </Link>
              </div>
              {/* Manager Link End */}

              {/* Payment Link Start */}

              <a
                href="#PaymentMenuLeftSide"
                onClick={() => {
                  this.handleActivesideBarTab("Payment")
                }}
                className={
                  paymentArg.includes(activeTab)
                    ? "list-group-item active"
                    : "list-group-item"
                }
                data-toggle={openTab !== "Payment" ? "collapse" : ""}
                data-parent="#MainMenuProjectManagerSideBar"
              // aria-expanded="false"
              // aria-controls="PaymentMenuLeftSide"
              >
                <i
                  className="fa fa-credit-card-alt dash_img"
                  aria-hidden="true"
                ></i>{" "}
                Payment{" "}
                {openTab === "Payment" ? (
                  <i className="fa fa-angle-down"></i>
                ) : (
                  <i className="fa fa-angle-right"></i>
                )}
              </a>
              <div
                className={
                  openTab === "Payment"
                    ? "collapse in"
                    : "collapse"
                }
                id="PaymentMenuLeftSide"
              >
                <Link
                  to="/transactions"
                  className={
                    activeTab === "transactions"
                      ? "list-group-item sub active"
                      : "list-group-item sub"
                  }
                >
                  <i
                    className="fa fa-file-text dash_img-inner pink_clr"
                    aria-hidden="true"
                  ></i>{" "}
                  Invoices
                </Link>
              </div>
              {/* Payment Link End */}

              {/* Notificatin Link Start */}
              <Link
                to="/notifications"
                className={
                  activeTab === "notifications"
                    ? "list-group-item active"
                    : "list-group-item"
                }
                data-parent="#MainMenuProjectManagerSideBar"
              >
                <i className="fa fa-bell dash_img" aria-hidden="true"></i>{" "}
                Notifications
              </Link>
              {/* Notificatin Link End */}

              {/* Setting Link Start */}

              <a
                href="#SettingMenuLeftSide"
                onClick={() => {
                  this.handleActivesideBarTab("Setting")
                }}
                className={
                  settingArg.includes(activeTab)
                    ? "list-group-item active"
                    : "list-group-item"
                }
                data-toggle={openTab !== "Setting" ? "collapse" : ""}
                data-parent="#MainMenuProjectManagerSideBar"
              >
                <i className="fa fa-cog dash_img" aria-hidden="true"></i> Settings{" "}
                {openTab === "Setting" ? (
                  <i className="fa fa-angle-down"></i>
                ) : (
                  <i className="fa fa-angle-right"></i>
                )}
              </a>
              <div
                className={
                  openTab === "Setting"
                    ? "collapse in"
                    : "collapse"
                }
                id="SettingMenuLeftSide"
              >
                {localStorage.security_check_required &&
                  localStorage.security_check_required === "true" ? (
                  <React.Fragment>
                    <Link
                      to={{
                        pathname: "/auth-question",
                        state: { route: "info" },
                      }}
                      className={
                        activeTab === "settings/info"
                          ? "list-group-item sub active"
                          : "list-group-item sub"
                      }
                    >
                      <i
                        className="fa fa-info dash_img-inner alice_clr"
                        aria-hidden="true"
                      ></i>{" "}
                      Profile Setting
                    </Link>
                    <Link
                      to={{
                        pathname: "/auth-question",
                        state: { route: "notification" },
                      }}
                      className={
                        activeTab === "settings/notification"
                          ? "list-group-item sub active"
                          : "list-group-item sub"
                      }
                    >
                      <i
                        className="fa fa-bell dash_img-inner alice_clr"
                        aria-hidden="true"
                      ></i>{" "}
                      Notification Settings
                    </Link>
                  </React.Fragment>
                ) : (
                  <React.Fragment>
                    <Link
                      to="/settings?info"
                      className={
                        activeTab === "settings/info"
                          ? "list-group-item sub active"
                          : "list-group-item sub"
                      }
                    >
                      <i
                        className="fa fa-info dash_img-inner alice_clr"
                        aria-hidden="true"
                      ></i>{" "}
                      Profile Setting
                    </Link>
                    <Link
                      to={
                        {
                          pathname : "/settings",
                          search : "?notification"
                        }
                      }
                      className={
                        activeTab === "settings/notification"
                          ? "list-group-item sub active"
                          : "list-group-item sub"
                      }
                    >
                      <i
                        className="fa fa-bell dash_img-inner alice_clr"
                        aria-hidden="true"
                      ></i>{" "}
                      Notification Settings
                    </Link>
                  </React.Fragment>
                )}
              </div>
              {/* Setting Link Ens */}



            </div>

          </div>
        </div>

        {/* Old side bar */}
      </>
    );
  }
}

const mapStateToProps = (state) => ({
  ...state,
});

const mapDispatchToProps = (dispatch) => {
  return {
    logOut: () => dispatch(logOutAction()),
    getCurrentUserDetails: () => dispatch(getCurrentUserDetails()),
    showHideSideBar: (status) => dispatch(showHideSideBar(status)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(PMDashboardSideBar);



{/* <div className="custom_sticky_container">
onMouseEnter={() => this.handleMouseEnter()} onMouseLeave={() => this.handleMouseLeave()}
<div
  id="MainMenuProjectManagerSideBar"
  className={
    !this.props.loginSteps.showHideSideBar ? "sidebar" : "sidebar-add"
  }
>
  <Link to="/" className="hover_disable" data-parent="#MainMenuProjectManagerSideBar">
              <img src={logo_Img} alt="applogo" className="logo_dashboard" width="250"/>
              <img src={sm_logo} alt="applogo" className="logo_dashboard_small" width="32"/>
              </Link>
  <div className="list-group panel">
    <>
      <a href="#ProfileMenuLeftSide" onClick={() => this.setState({open1:false})} className={hireArg.includes(activeTab) ? "list-group-item txt_center pb_28 user_sec active" : "list-group-item txt_center pb_28 user_sec"} data-toggle="collapse" data-parent="#MainMenuProjectManagerSideBar"><img
                  className="sidebar_user_img"
                  src={faceImg}
                  alt="img"
                  width="60"



                /> <br /><span>{userFullname} </span></a> 
      <div className="text-center dropdown">
                <a href="#ProfileMenuLeftSide" onClick={() => this.setState({open1:false})} className={hireArg.includes(activeTab) ? "list-group-item txt_center pb_28 user_sec active" : "list-group-item txt_center pb_28 user_sec"} data-toggle="collapse" data-parent="#MainMenuProjectManagerSideBar"><img
                  className="sidebar_user_img"
                  src={faceImg}
                  alt="img"
                  width="60"

                /></a>
                <button className="user_sec_heading dropdown-toggle" data-toggle="dropdown"> {userFullname} <i className="fa fa-caret-down ml-10"></i></button>
                  <ul className="dropdown-menu flipRd animated manager-profile-setting-dropdown-menu pt-2 pl-5 pr-4">
              <li className="disabled">
                <h4 className="user_sub">WELCOME!</h4>
              </li>
              <li className="divider"></li>
              <li className="freelancer-profile-setting-dropdown-menu-sub-item">
                <a href="/settings?info" >
                  <i
                    className="fa fa-cog"
                    aria-hidden="true"
                  ></i>{" "}
                   Settings</a>
              </li>
              <li
                className="manager-profile-setting-dropdown-menu-sub-item"
                onClick={this.logOut}
              >
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
      <div className="new-theme-profile-sec">
    <div className="row">
      <div className="col-md-3">
        <img className="sidebar_user_img m-0" src={userImg} alt="img" width="60" />
      </div>
      <div className="col-md-9">
        <div className="p-2">
          <p className="m-0 p-1">Welcome,</p>
        <h4 className="m-0">{userFullname}</h4>
        </div>
      </div>
    </div>
  </div>
    </>
    <Link
      to="/"
      className={
        activeTab === "home"
          ? "list-group-item active"
          : "list-group-item"
      }
      data-parent="#MainMenuProjectManagerSideBar"
    >
      <i className="fa fa-home dash_img" aria-hidden="true"></i>{" "}
      Dashboard{" "}
    </Link>

    <a
      href="#JobsMenuLeftSide"
      onClick={() => {
        hireArg.includes(activeTab) || open2
          ? this.setState({ open2: false })
          : this.setState({
            open2: true,
            open3: false,
            open4: false,
            open5: false,
          });
      }}
      className={
        hireArg.includes(activeTab)
          ? "list-group-item active"
          : "list-group-item"
      }
      data-toggle="collapse"
      data-parent="#MainMenuProjectManagerSideBar"
    >
      <i className="fa fa-user dash_img" aria-hidden="true"></i> Hire{" "}
      {hireArg.includes(activeTab) || open2 ? (
        <i className="fa fa-angle-down"></i>
      ) : (
        <i className="fa fa-angle-right"></i>
      )}
    </a>
    <div
      className={
        hireArg.includes(activeTab)
          ? "collapse show"
          : open2
            ? "collapse show"
            : "collapse"
      }
      id="JobsMenuLeftSide"
    >
      <Link
        to="/post-a-job-progress"
        className={
          activeTab === "post-a-job-progress"
            ? "list-group-item sub active"
            : "list-group-item sub"
        }
      >
        <i
          className="fa fa-paper-plane dash_img-inner golden_clr"
          aria-hidden="true"
        ></i>{" "}
        Post a Job
      </Link>
      <Link
        to="/my-jobs"
        className={
          activeTab === "my-jobs"
            ? "list-group-item sub active"
            : "list-group-item sub"
        }
      >
        <i
          className="fa fa-list-ul dash_img-inner golden_clr"
          aria-hidden="true"
        ></i>{" "}
        My Jobs{" "}
      </Link>
      <Link
        to="/find-freelancers2/search"
        className={
          activeTab === "find-freelancers2/search"
            ? "list-group-item sub active"
            : "list-group-item sub"
        }
      >
        <i
          className="fa fa-search dash_img-inner golden_clr"
          aria-hidden="true"
        ></i>{" "}
        Cloud Expert
      </Link>
    </div>

    <a
      href="#ManageMenuLeftSide"
      onClick={() => {
        manageArg.includes(activeTab) || open3
          ? this.setState({ open3: false })
          : this.setState({
            open2: false,
            open3: true,
            open4: false,
            open5: false,
          });
      }}
      className={
        manageArg.includes(activeTab)
          ? "list-group-item active"
          : "list-group-item"
      }
      data-toggle="collapse"
      data-parent="#MainMenuProjectManagerSideBar"
    >
      <i className="fa fa-address-book dash_img" aria-hidden="true"></i>{" "}
      Manage{" "}
      {manageArg.includes(activeTab) || open3 ? (
        <i className="fa fa-angle-down"></i>
      ) : (
        <i className="fa fa-angle-right"></i>
      )}
    </a>
    <div
      className={
        manageArg.includes(activeTab)
          ? "collapse show"
          : open3
            ? "collapse show"
            : "collapse"
      }
      id="ManageMenuLeftSide"
    >
      <Link
        to="/find-freelancers2/hired"
        className={
          activeTab === "find-freelancers2/hired"
            ? "list-group-item sub active"
            : "list-group-item sub"
        }
      >
        <i
          className="fa fa-user dash_img-inner green_clr"
          aria-hidden="true"
        ></i>{" "}
        My Cloud Experts
      </Link>
      <Link
        to="/all-contracts"
        className={
          activeTab === "all-contracts"
            ? "list-group-item sub active"
            : "list-group-item sub"
        }
      >
        <i
          className="fa fa-address-book dash_img-inner green_clr"
          aria-hidden="true"
        ></i>
        All Contracts
      </Link>
      <Link
        to="/my-proposals"
        className={
          activeTab === "my-proposals"
            ? "list-group-item sub active"
            : "list-group-item sub"
        }
      >
        <i
          className="fa fa fa-sticky-note dash_img-inner green_clr"
          aria-hidden="true"
        ></i>
        My Proposals
      </Link>
    </div>

    <a
      href="#PaymentMenuLeftSide"
      onClick={() => {
        paymentArg.includes(activeTab) || open4
          ? this.setState({ open4: false, activeTab: "" })
          : this.setState({
            open2: false,
            open3: false,
            open4: true,
            open5: false,
          });
      }}
      className={
        paymentArg.includes(activeTab)
          ? "list-group-item active"
          : "list-group-item"
      }
      data-toggle="collapse"
      data-parent="#MainMenuProjectManagerSideBar"
    >
      <i
        className="fa fa-credit-card-alt dash_img"
        aria-hidden="true"
      ></i>{" "}
      Payment{" "}
      {paymentArg.includes(activeTab) || open4 ? (
        <i className="fa fa-angle-down"></i>
      ) : (
        <i className="fa fa-angle-right"></i>
      )}
    </a>
    <div
      className={
        paymentArg.includes(activeTab)
          ? "collapse show"
          : open4
            ? "collapse show"
            : "collapse"
      }
      id="PaymentMenuLeftSide"
    >
      <Link
        to="/transactions"
        className={
          activeTab === "transactions"
            ? "list-group-item sub active"
            : "list-group-item sub"
        }
      >
        <i
          className="fa fa-file-text dash_img-inner pink_clr"
          aria-hidden="true"
        ></i>{" "}
        Invoices
      </Link>
    </div>

    <Link
    to="/notifications"
    className={
      activeTab === "notifications"
        ? "list-group-item active"
        : "list-group-item"
    }
    data-parent="#MainMenuProjectManagerSideBar"
  >
    <i className="fa fa-bell dash_img" aria-hidden="true"></i>{" "}
    Notifications
  </Link>

    <a
      href="#SettingMenuLeftSide"
      onClick={() => {
        settingArg.includes(activeTab) || open5
          ? this.setState({ open5: false, activeTab: "" })
          : this.setState({ open5: true });
      }}
      className={
        settingArg.includes(activeTab)
          ? "list-group-item active"
          : "list-group-item"
      }
      data-toggle="collapse"
      data-parent="#MainMenuProjectManagerSideBar"
    >
      <i className="fa fa-cog dash_img" aria-hidden="true"></i> Settings{" "}
      {settingArg.includes(activeTab) || open5 ? (
        <i className="fa fa-angle-down"></i>
      ) : (
        <i className="fa fa-angle-right"></i>
      )}
    </a>
    <div
      className={
        settingArg.includes(activeTab)
          ? "collapse show"
          : open5
            ? "collapse show"
            : "collapse"
      }
      id="SettingMenuLeftSide"
    >
      {localStorage.security_check_required &&
        localStorage.security_check_required === "true" ? (
        <React.Fragment>
          <Link
            to={{
              pathname: "/auth-question",
              state: { route: "info" },
            }}
            className={
              activeTab === "settings/info"
                ? "list-group-item sub active"
                : "list-group-item sub"
            }
          >
            <i
              className="fa fa-info dash_img-inner alice_clr"
              aria-hidden="true"
            ></i>{" "}
            Profile Setting
          </Link>
          <Link
            to={{
              pathname: "/auth-question",
              state: { route: "notification" },
            }}
            className={
              activeTab === "settings/notification"
                ? "list-group-item sub active"
                : "list-group-item sub"
            }
          >
            <i
              className="fa fa-bell dash_img-inner alice_clr"
              aria-hidden="true"
            ></i>{" "}
            Notification Settings
          </Link>
        </React.Fragment>
      ) : (
        <React.Fragment>
          <a
            href="/settings?info"
            className={
              activeTab === "settings/info"
                ? "list-group-item sub active"
                : "list-group-item sub"
            }
          >
            <i
              className="fa fa-info dash_img-inner alice_clr"
              aria-hidden="true"
            ></i>{" "}
            Profile Setting
          </a>
          <a
            href="/settings?notification"
            className={
              activeTab === "settings/notification"
                ? "list-group-item sub active"
                : "list-group-item sub"
            }
          >
            <i
              className="fa fa-bell dash_img-inner alice_clr"
              aria-hidden="true"
            ></i>{" "}
            Notification Settings
          </a>
        </React.Fragment>
      )}
    </div>
  </div>
  <Link to="/" className="list-group-item" data-parent="#MainMenuProjectManagerSideBar">About</Link>
              <Link to="/" className="list-group-item" data-parent="#MainMenuProjectManagerSideBar">Services</Link>
              <Link to="/" className="list-group-item" data-parent="#MainMenuProjectManagerSideBar">Client</Link>
              <Link to="/" className="list-group-item" data-parent="#MainMenuProjectManagerSideBar">Contact</Link>

</div>
</div> */}
