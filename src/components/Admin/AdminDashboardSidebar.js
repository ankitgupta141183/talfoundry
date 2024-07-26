import React, { Component } from "react";
import { Link } from 'react-router-dom';
import { connect } from "react-redux";
// import sm_logo from "../../static/images/small-logo.png";
// import logo_1 from "../../static/images/logo/logo.svg";

class AdminDashboardSidebar extends Component {

    render() {
        var firstTab = window.location.href.split('/');
        return (
            <div className="custom_sticky_container">
                <div className="sidebar">
                    {/* {!this.props.loginSteps.showHideSideBar ? "sidebar-add admin-dashboard-sidebar-root" : "sidebar admin-dashboard-sidebar-root"} */}
                    <div className="admin-dashboard-sidebar-box-container" style={{ margin: '12px 25px' }}>
                        <div className="">
                            <div className="">
                                {/* <div>
                                <Link to="/" className="hover_disable" data-parent="#MainMenuProjectManagerSideBar">
                                    <img src={logo_1} alt="applogo" className="logo_dashboard" width="250" />
                                    <img src={sm_logo} alt="applogo" className="logo_dashboard_small" width="32" />
                                </Link>
                            </div> */}
                                <div className="single-box-container">
                                    {/* <Link to="/"> */}
                                    <div className={`card ${(firstTab[3] === "" || window.location.href.includes("freelancer")) && "active-box"}`}>
                                        <div className="">
                                            <Link to={{
                                                pathname: "/",
                                                state: { lable: "Home" }
                                            }}> <i className="fa fa-home" aria-hidden="true"></i>Dashboard</Link>
                                        </div>

                                        <div className="clearfix"></div>

                                        {/* <div className="card-body">
                                            <h2>Cloud Expert</h2>
                                        </div> */}
                                    </div>
                                    {/* </Link> */}
                                </div>
                                <div className="single-box-container">
                                    {/* <Link to="/"> */}
                                    <div className={`card ${(window.location.href.includes("cloud-experts")) && "active-box"}`}>
                                        <div className="">
                                            {/* /cloud-experts */}
                                            <Link to={{
                                                pathname: "/cloud-experts",
                                                state: { lable: "Reports" }
                                            }}> <i className="fa fa-file-text" aria-hidden="true"></i>Cloud Expert</Link>
                                        </div>

                                        <div className="clearfix"></div>

                                        {/* <div className="card-body">
                                            <h2>Cloud Expert</h2>
                                        </div> */}
                                    </div>
                                    {/* </Link> */}
                                </div>

                                <div className="single-box-container">
                                    {/* <Link to="/admin-jobs"> */}
                                    <div className={`card ${window.location.href.includes("admin-jobs") && "active-box"}`}>
                                        <div className="">
                                            {/* /admin-jobs */}
                                            <Link to={{
                                                pathname: "/admin-jobs",
                                                state: { lable: "Reports" }
                                            }}><i className="fa fa-envelope" aria-hidden="true"></i>Job Post</Link>
                                        </div>
                                        <div className="clearfix"></div>
                                        {/* <div className="card-body">
                                            <h2>Job Post</h2>
                                        </div> */}
                                    </div>
                                    {/* </Link> */}
                                </div>

                                <div className="single-box-container">
                                    {/* <Link to="/admin-client-listing"> */}
                                    <div className={`card ${window.location.href.includes("admin-client") && "active-box"}`}>
                                        <div className="">
                                            {/* "/admin-client-listing" */}
                                            <Link to={{
                                                pathname: "/admin-client-listing",
                                                state: { lable: "Reports" }
                                            }}><i className="fa fa-briefcase" aria-hidden="true"></i>Clients</Link>
                                        </div>
                                        <div className="clearfix"></div>
                                        {/* <div className="card-body">
                                            <h2>Clients</h2>
                                        </div> */}
                                    </div>
                                    {/* </Link> */}
                                </div>


                                <div className="single-box-container">
                                    {/* <Link to="/transactions"> */}
                                    <div className={`card ${window.location.href.includes("transactions") && "active-box"}`}>
                                        <div className="">
                                            {/* "/transactions" */}
                                            <Link to={{
                                                pathname: "/transactions",
                                                state: { lable: "Reports" }
                                            }}><i className="fa fa-money" aria-hidden="true"></i>Transaction</Link>
                                        </div>
                                        <div className="clearfix"></div>
                                        {/* <div className="card-body">
                                            <h2>Transaction</h2>
                                        </div> */}
                                    </div>
                                    {/* </Link> */}
                                </div>


                                <div className="single-box-container">
                                    {/* <Link to="/execs"> */}
                                    <div className={`card ${window.location.href.includes("execs") && "active-box"}`}>
                                        <div className="">
                                            <Link to={{
                                                pathname: "/execs",
                                                state: { lable: "Reports" }
                                            }}><i className="fa fa-user" aria-hidden="true"></i>User/Exec</Link>
                                        </div>
                                        <div className="clearfix"></div>
                                        {/* <div className="card-body">
                                            <h2>User/Exec</h2>
                                        </div> */}
                                    </div>
                                    {/* </Link> */}
                                </div>

                                <div className="single-box-container">
                                    <div className={`card ${(window.location.href.includes("platforms")) && "active-box"}`}>
                                        <div className="">
                                            <Link to={{
                                                pathname: "/platforms",
                                                state: { lable: "Settings" }
                                            }} ><i className="fa fa-cogs custom"></i>Platforms</Link>
                                        </div>
                                        <div className="clearfix"></div>
                                    </div>
                                </div>

                                <div className="single-box-container">
                                    <div className={`card ${(window.location.href.includes("reports")) && "active-box"}`}>
                                        <div className="">
                                            <Link to={{
                                                pathname: '/reports',
                                                state: { lable: "Reports" }
                                            }} ><i className="fa fa-bar-chart"></i>Reports</Link>
                                        </div>
                                        <div className="clearfix"></div>
                                    </div>
                                </div>
                                <div className="single-box-container">
                                    <div className={`card ${(window.location.href.includes("roles")) && "active-box"}`}>
                                        <div className="">
                                            <Link to={{
                                                pathname: '/roles',
                                                state: { lable: "Roles" }
                                            }} ><i className="fa fa-users"></i>Roles</Link>
                                        </div>
                                        <div className="clearfix"></div>
                                    </div>
                                </div>

                                <div className="single-box-container">
                                    {/* <Link to="/"> */}
                                    <div className={`card ${(window.location.href.includes("setting")) && "active-box"}`}>
                                        <div className="">

                                            <Link to={{
                                                pathname: "/setting",
                                                state: { lable: "Settings" }
                                            }}  > <i className="fa fa-cog" aria-hidden="true"></i>Settings</Link>
                                        </div>

                                        <div className="clearfix"></div>

                                        {/* <div className="card-body">
                                            <h2>Cloud Expert</h2>
                                        </div> */}
                                    </div>
                                    {/* </Link> */}
                                </div>


                            </div>
                        </div >
                    </div >

                </div >
            </div >

        )
    }
}
const mapStateToProps = (state) => ({
    ...state,
})



export default connect(
    mapStateToProps
)(AdminDashboardSidebar)
