import React, { Component } from "react";
import { Link } from 'react-router-dom';
import { connect } from "react-redux";
// import { isEmpty } from "lodash";
// import logo_1 from "../../static/images/logo/logo.svg";
import { freeLancerSideBar, showHideSideBar } from "../../Actions/loginStepsActions";
import { logOutAction } from "../../Actions/logOutAction";
import { getCurrentUserDetails } from "../../Actions/applicationActions";
// import sm_logo from "../../static/images/small-logo.png";
// import logo_Img from "../../static/images/logo/logo.png";


class FreelancerDashboardSideBar extends Component {
  constructor(props, context) {
    super(props, context)
    this.state = {
      activeTab: "",
      open1: false,
      open2: false,
      open3: false,
      open4: false,
      open5: false,
      openTab: ""
    }
    this.logOut = this.logOut.bind(this);
    this.currentOpenTab = this.currentOpenTab.bind(this)
  }

  componentDidMount() {
    let path = this.props.history.location.pathname.slice(
      1,
      this.props.history.location.pathname.length
    )
    if (path === 'settings') {
      let newPath = '/profilesetting'

      if (this.props.history.location.search === '') {
        path = path + '/profilesetting'
      } else {
        newPath = this.props.history.location.search.slice(
          1,
          this.props.history.location.search.length)
        // console.log('newPath',newPath)
        path = path + '/' + newPath
      }
      this.currentOpenTab(path)
      // this.setState({ activeTab: path })
    } else
      if (path === "all-contracts/active" || path === "all-contracts/payment") {
        this.currentOpenTab((path === "") ? "home" : path)
        // this.setState({ activeTab: (path === "") ? "home" : path })
      } else {
        let res = path.split("/");
        this.currentOpenTab((res[0] === "") ? "home" : res[0])
        // this.setState({ activeTab: (res[0] === "") ? "home" : res[0] })
      }
  }

  componentDidUpdate(prevProps){
    if(prevProps?.location?.search !== this.props?.location?.search){
      console.log(this.props.location?.search , "this.props.location?.searchthis.props.location?.searchthis.props.location?.searchthis.props.location?.search");
      let path = this.props.history.location.pathname.slice(
        1,
        this.props.history.location.pathname.length
      );
    if (path === 'settings') {
      let newPath = '/profilesetting'
      if (this.props.history.location.search === '') {
        path = path + '/profilesetting'
      } else {
        newPath = this.props.history.location.search.slice(
          1,
          this.props.history.location.search.length)
        path = path + '/' + newPath
      }
      this.currentOpenTab(path)
    }
    }

  }


  currentOpenTab(type) {
    this.setState({ activeTab: type });

    let settingArg = ["settings/passAndSec", "settings/notification", "settings/profilesetting", "profile", "settings/getPaid", "settings/membership", "settings/taxInfo"]
    let findWorkArg = ["cloud-expert-find-work", "my-jobs", "browse-jobs", "job-details"]
    let myContractArg = ["settings/myTerms", "cloud-expert-my-contracts", "all-contracts/active", "my-proposals", "proposal-details", "invitation-details", "offer-details", "contract-details"]
    let paymentArg = ["cloud-expert-payments", "settings/billing", "transactions", "all-contracts/payment"]


    if (findWorkArg.includes(type)) {
      this.setState({ openTab: "Find_Work" })
    } else if (myContractArg.includes(type)) {
      this.setState({ openTab: "MyContract" })
    } else if (paymentArg.includes(type)) {
      this.setState({ openTab: "Payment" })
    } else if (settingArg.includes(type)) {
      this.setState({ openTab: "Setting" })
    }
  }

  changeRoute = (route, type) => {
    console.log('route', route)
    this.props.freeLancerSideBar(route)
    // this.props.history.push(route)
    if (type !== 2) {
      this.props.history.push({
        pathname: route
      })
    }
  }

  // componentDidUpdate(prevState, prevProps){
  //     let path = this.props.history.location.search.slice(
  //         1,
  //         this.props.history.location.search.length
  //     )
  //     // console.log('prevState',path,  this.state.activeTab)
  //     if("settings/"+path !== this.state.activeTab){
  //         // console.log("------")
  //         this.setState({activeTab: "settings/"+path})
  //     }
  // }
  logOut() {
    this.props.logOut();
    this.props.history.push("/");
    window.location.reload();
  }
  handleMouseEnter() {
    this.props.showHideSideBar(true)
  }
  handleMouseLeave() {
    this.props.showHideSideBar(false)
  }

  handleActivesideBarTab(openTabName) {
    const { openTab } = this.state;
    openTab === openTabName
      ? this.setState({ openTab: "" })
      : this.setState({ openTab: openTabName });
  }
  render() {
    // const {
    //   currentUserDetails,
    //   currentUser
    // } = this.props;
    // const userFullname = !isEmpty(currentUserDetails) ? currentUserDetails.full_name : `${currentUser.first_name} ${currentUser.last_name}`
    // const userImg = !isEmpty(currentUserDetails) ? currentUserDetails.user_profile &&
    //                                 currentUserDetails.user_profile.freelancer_image
    //                                 && currentUserDetails.user_profile
    //                                   .freelancer_image : currentUser.image_url
    const { activeTab, open1, open2, open3, open4, open5, openTab } = this.state;

    let settingArg = ["settings/passAndSec", "settings/notification", "settings/profilesetting", "profile", "settings/getPaid", "settings/membership", "settings/taxInfo"]
    let findWorkArg = ["cloud-expert-find-work", "my-jobs", "browse-jobs", "job-details"]
    let myContractArg = ["settings/myTerms", "cloud-expert-my-contracts", "all-contracts/active", "my-proposals", "proposal-details", "invitation-details", "offer-details", "contract-details"]
    let paymentArg = ["cloud-expert-payments", "settings/billing", "transactions", "all-contracts/payment"]

    return (
      //  onMouseEnter={()=>this.handleMouseEnter()} onMouseLeave={()=>this.handleMouseLeave()}
      <div className="custom_sticky_container">
        {/* {this.props.loginSteps.showHideSideBar ? "sidebar" : "sidebar-add"} */}
        <div id="MainMenuProjectManagerSideBar"
          className={!this.props.loginSteps.showHideSideBar ? "sidebar" : "sidebar-add"}>
          <div className="list-group panel">
            {/*
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
            </div> */}

            <Link to="/" className={activeTab === "home" ? "list-group-item active" : "list-group-item"} data-parent="#MainMenuProjectManagerSideBar"><i className="fa fa-home dash_img" aria-hidden="true"></i> Dashboard</Link>
            <Link to={"/find-work"}  className={activeTab === "find-work" ? "list-group-item active" : "list-group-item "}><i className="fa fa-search-plus dash_img" aria-hidden="true"></i> Find Work</Link>
            
            <Link to={"/my-jobs"}  className={activeTab === "my-jobs" ? "list-group-item active" : "list-group-item "}><i className="fa fa-briefcase dash_img" aria-hidden="true"></i> My Jobs</Link>

            {/* <a href="#JobsMenuLeftSide"
              onClick={() => {
                this.handleActivesideBarTab("Find_Work")
                // findWorkArg.includes(activeTab) || open2 ?
                //  this.setState({ open2: false, activeTab: "" }) 
                //  : this.setState({ open2: true, open3: false, open4: false, open5: false }) 
              }}
              className={findWorkArg.includes(activeTab) ? "list-group-item active" : "list-group-item"}
              data-toggle={openTab !== "Find_Work" ? "collapse" : ""} data-parent="#MainMenuProjectManagerSideBar">
              <i className="fa fa-user dash_img" aria-hidden="true"></i> Find Work {openTab === "Find_Work" ? <i className="fa fa-angle-down"></i> : <i className="fa fa-angle-right"></i>}
            </a>
            <div className={openTab === "Find_Work" ? "collapse in" : "collapse"} id="JobsMenuLeftSide">
              <Link to={"#"} onClick={() => this.changeRoute("/my-jobs", 1)} className={activeTab === "my-jobs" ? "list-group-item sub active" : "list-group-item sub"}><i className="fa fa-list-ul dash_img" aria-hidden="true"></i> My Jobs</Link>
              <Link to={"#"} onClick={() => this.changeRoute("/browse-jobs", 1)} className={activeTab === "browse-jobs" ? "list-group-item sub active" : "list-group-item sub"}><i className="fa fa-search-plus dash_img" aria-hidden="true"></i> Browse Jobs</Link>
            </div> */}

            <a href="#ManageMenuLeftSide" onClick={() => {
              this.handleActivesideBarTab("MyContract")
              // myContractArg.includes(activeTab) || open3 ? this.setState({ open3: false, activeTab: "" }) : this.setState({ open3: true })

            }}

              className={myContractArg.includes(activeTab) ? "list-group-item active" : "list-group-item"}
              data-toggle={openTab !== "MyContract" ? "collapse" : ""}
              data-parent="#MainMenuProjectManagerSideBar">

              <i className="fa fa-address-book dash_img" aria-hidden="true"></i> My Contracts
              {openTab === "MyContract" ? <i className="fa fa-angle-down"></i> : <i className="fa fa-angle-right"></i>}
            </a>

            <div className={openTab === "MyContract" ? "collapse in" : "collapse"} id="ManageMenuLeftSide">
              <Link to="/all-contracts/active" className={activeTab === "all-contracts/active" ? "list-group-item sub active" : "list-group-item sub"}><i className="fa fa-address-book dash_img" aria-hidden="true"></i> All Contracts</Link>
              <Link to={"#"} onClick={() => this.changeRoute("/my-proposals", 1)} className={activeTab === "my-proposals" ? "list-group-item sub active" : "list-group-item sub"}><i className="fa fa-sticky-note dash_img" aria-hidden="true"></i> My Proposals</Link>
              <Link to="/settings?myTerms" onClick={() => this.changeRoute("/settings/myTerms", 2)} className={activeTab === "settings/myTerms" ? "list-group-item sub active" : "list-group-item sub"}><i className="fa fa-users dash_img" aria-hidden="true"></i> My Teams</Link>
            </div>

            <a href="#PaymentMenuLeftSide" onClick={() => {
              this.handleActivesideBarTab("Payment")
              //  paymentArg.includes(activeTab) || open4 ? this.setState({ open4: false, activeTab: "" }) : this.setState({ open4: true }) 

            }}
              className={paymentArg.includes(activeTab) ? "list-group-item active" : "list-group-item"}
              data-toggle={openTab !== "Payment" ? "collapse" : ""}
              data-parent="#MainMenuProjectManagerSideBar">

              <i className="fa fa-credit-card-alt dash_img" aria-hidden="true"></i> Payment
              {openTab === "Payment" ? <i className="fa fa-angle-down"></i> : <i className="fa fa-angle-right"></i>}
            </a>
            <div className={openTab === "Payment" ? "collapse in" : "collapse"} id="PaymentMenuLeftSide">
              <Link to={"#"} onClick={() => this.changeRoute("/transactions", 1)} className={activeTab === "transactions" ? "list-group-item sub active" : "list-group-item sub"}><i className="fa fa-file-text dash_img" aria-hidden="true"></i> Invoices</Link>
              <Link to="/all-contracts/payment" className={activeTab === "all-contracts/payment" ? "list-group-item sub active" : "list-group-item sub"}><i className="fa fa-credit-card-alt dash_img" aria-hidden="true"></i> Payment Requests</Link>
            </div>

            <Link to="/notifications" className={activeTab === "notifications" ? "list-group-item active" : "list-group-item"} data-parent="#MainMenuProjectManagerSideBar"><i className="fa fa-bell dash_img" aria-hidden="true"></i> Notifications</Link>

            <a href="#SettingMenuLeftSide" onClick={() => {
              this.handleActivesideBarTab("Setting")
              //  settingArg.includes(activeTab) || open5 ? this.setState({ open5: false, activeTab: "" }) : this.setState({ open5: true })
            }}
              className={settingArg.includes(activeTab) ? "list-group-item active" : "list-group-item"}
              data-toggle={openTab !== "Setting" ? "collapse" : ""} data-parent="#MainMenuProjectManagerSideBar">
              <i className="fa fa-cog dash_img" aria-hidden="true"></i>
              Settings
              {openTab === "Setting" ? <i className="fa fa-angle-down"></i> : <i className="fa fa-angle-right"></i>}
            </a>
            <div className={openTab === "Setting" ? "collapse in" : "collapse"} id="SettingMenuLeftSide"

            >
              {
                ((localStorage.security_check_required) && localStorage.security_check_required === 'true') ?
                  (<React.Fragment>

                    <Link to={"#"} onClick={() => this.changeRoute("/profile")} className={activeTab === "profile" ? "list-group-item sub active" : "list-group-item sub"}><i className="fa fa-user-circle dash_img" aria-hidden="true"></i> My Profile</Link>
                    {/* <Link to={{ pathname: "/auth-question", state: { route: 'profilesetting' } }} className={activeTab === "settings/profilesetting" ? "list-group-item sub active" : "list-group-item sub"}><i className="fa fa-cogs dash_img" aria-hidden="true"></i> Profile Settings</Link> */}
                    <Link to={{ pathname: "/auth-question", state: { route: 'passAndSec' } }} className={activeTab === "settings/passAndSec" ? "list-group-item sub active" : "list-group-item sub"}><i className="fa fa-eye dash_img" aria-hidden="true"></i> Password & Security</Link>
                    <Link to={{ pathname: "/auth-question", state: { route: 'getPaid' } }} className={activeTab === "settings/getPaid" ? "list-group-item sub active" : "list-group-item sub"}><i className="fa fa-rupee dash_img" aria-hidden="true"></i> Get Paid</Link>
                    <Link to={{ pathname: "/auth-question", state: { route: 'membership' } }} className={activeTab === "settings/membership" ? "list-group-item sub active" : "list-group-item sub"}><i className="fa fa-address-card dash_img" aria-hidden="true"></i> Membership</Link>
                    <Link to={{ pathname: "/auth-question", state: { route: 'taxInfo' } }} className={activeTab === "settings/taxInfo" ? "list-group-item sub active" : "list-group-item sub"}><i className="fa fa-percent dash_img" aria-hidden="true"></i> Tax Information</Link>
                    <Link to={{ pathname: "/auth-question", state: { route: 'notification' } }} className={activeTab === "settings/notification" ? "list-group-item sub active" : "list-group-item sub"}><i className="fa fa-cog dash_img" aria-hidden="true"></i>Notification Settings</Link>
                  </React.Fragment>)
                  :
                  (<React.Fragment>

                    <Link to={"#"} onClick={() => this.changeRoute("/profile", 1)} className={(activeTab === "profile") ? "list-group-item sub active" : "list-group-item sub"}><i className="fa fa-user-circle dash_img" aria-hidden="true"></i> My Profile</Link>
                    {/* <a href="/settings?profilesetting" onClick={() => this.changeRoute("/settings/profilesetting", 2)} className={(activeTab === "settings/profilesetting") ? "list-group-item sub active" : "list-group-item sub"}><i className="fa fa-cogs dash_img" aria-hidden="true"></i> Profile Settings</a> */}
                    <Link to="/settings?passAndSec" onClick={() => this.changeRoute("/settings/passAndSec", 2)} className={(activeTab === "settings/passAndSec") ? "list-group-item sub active" : "list-group-item sub"}><i className="fa fa-eye dash_img" aria-hidden="true"></i> Password & Security</Link>
                    <Link to="/settings?getPaid" onClick={() => this.changeRoute("/settings/getPaid", 2)} className={(activeTab === "settings/getPaid") ? "list-group-item sub active" : "list-group-item sub"}><i className="fa fa-rupee dash_img" aria-hidden="true"></i> Get Paid</Link>
                    <Link to="/settings?membership" onClick={() => this.changeRoute("/settings/membership", 2)} className={(activeTab === "settings/membership") ? "list-group-item sub active" : "list-group-item sub"}><i className="fa fa-address-card dash_img" aria-hidden="true"></i> Membership</Link>
                    <Link to="/settings?taxInfo" onClick={() => this.changeRoute("/settings/taxInfo", 2)} className={(activeTab === "settings/taxInfo") ? "list-group-item sub active" : "list-group-item sub"}><i className="fa fa-percent dash_img" aria-hidden="true"></i> Tax Information</Link>
                    <Link to="/settings?notification" onClick={() => this.changeRoute("/settings/notification", 2)} className={(activeTab === "settings/notification") ? "list-group-item sub active" : "list-group-item sub"}><i className="fa fa-cog dash_img" aria-hidden="true"></i> Notification Settings</Link>
                  </React.Fragment>)
              }
            </div>

          </div>
        </div>
      </div>

    )
  }
}

const mapStateToProps = (state) => ({
  ...state,
})

const mapDispatchToProps = (dispatch) => {
  return {
    freeLancerSideBar: (route) => dispatch(freeLancerSideBar(route)),
    logOut: () => dispatch(logOutAction()),
    getCurrentUserDetails: () => dispatch(getCurrentUserDetails()),
    showHideSideBar: (status) => dispatch(showHideSideBar(status))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(FreelancerDashboardSideBar);