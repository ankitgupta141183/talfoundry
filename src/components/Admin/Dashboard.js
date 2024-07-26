import React, {Component} from "react";
import { connect } from "react-redux";
import {Link} from 'react-router-dom';
import {logOutAction} from '../../Actions/logOutAction';
import logo_1 from '../../static/images/logo/logo.svg';
import ic_notification from '../../static/images/ic_notification.svg';
import {getCurrentUserDetails} from '../../Actions/applicationActions';
import Footer from '../miscellaneous/Footer';
import faceImg from '../../static/images/profile-placeholder.png';

class Dashboard extends Component {
  constructor(props, context) {
    super(props, context)
    this.state = {
    }
  }

  componentDidMount(){
    this.props.getCurrentUserDetails()
  }

  logOut = () => {
    this.props.logOut()
    this.props.history.push('/')
  }

  render() {
    const {full_name} = this.props.currentUserDetails;
    return (
      <div className = "admin-dashboard-images administrator-header ">
        <div className="tf_admin_login dashboard-admin backround-change">

        <div className="header_1 project-mng-header">

            <nav className="navbar navbar-findcond-1">
              <div className="container">
                <div className="tf_hundred">
                  <Link className="navbar-brand" to={"#"}>
                    <img src={logo_1} alt="" />
                  </Link>
                  <div className="container">
                        <ul className="nav navbar-nav navbar-right tf_srong">

                          <li className="fp_left_resp dropdown">
                            <Link to={"#"} className="dropdown-toggle" data-toggle="dropdown" role="button" aria-haspopup="true" aria-expanded="false"><img src={ic_notification} alt=""/></Link>
                          </li>
                          
                          <li className="dropdown fp_left_resp project-manger-main-image" id="user-drop-down">
                              <Link to={"#"} className="dropdown-toggle" data-toggle="dropdown" role="button" aria-haspopup="true" aria-expanded="false">
                                <img className="avatar-img" src={faceImg} alt=""/>
                                <span className="manager-name-in-memu">{full_name}</span>
                              </Link>
                            <ul className="dropdown-menu tf_left administrator-profile-setting-dropdown-menu">
                              <li className="disabled"><h4>Welcome!</h4></li>
                              <li className="administrator-profile-setting-dropdown-menu-sub-item">
                              <Link to={"#"}><i className="fa fa-cog" aria-hidden="true"></i>
                               Settings
                               </Link>
                               </li>
                              <li className="administrator-profile-setting-dropdown-menu-sub-item">
                              <Link to={"#"}><i className="fa fa-question" aria-hidden="true"></i>
                              Help Center
                              </Link>
                              </li>
                              <li className="administrator-profile-setting-dropdown-menu-sub-item" onClick={this.logOut}>
                               <Link to={"#"}><i className="fa fa-sign-out" aria-hidden="true"></i>
                               Logout
                               </Link>
                               </li>
                            </ul>
                          </li>

                        </ul>
                  </div>

                </div>
              </div>
            </nav>
      </div>

	<div className="tf_application new-custom-admin-dashboard">
		<div className="container">
			<div className="col-md-3">



				<div className="tf_tabs">

	            		<div className="">
								<Link to="/cloud-experts-applications">
						    <div className="card">
								<div className="admin-up">
									<i className="fa fa-file-text background-dark-blue" aria-hidden="true"></i>
								</div>

								<div className="clearfix"></div>
								<div className="card-body">
								<h2>Cloud Expert Application</h2>
								</div>
						    </div>
								</Link>
	            		</div>


	            		<div className="">
							 		<Link to="/admin-jobs">
	            			 <div className="card">
								    <div className="admin-up">
										<i className="fa fa-envelope background-light-orange" aria-hidden="true"></i>
									</div>
									<div className="clearfix"></div>
									<div className="card-body">
										<h2>Job Post</h2>
									</div>
						    </div>
									</Link>
	            		</div>

	            		<div className="">
							<Link to="/all-freelancers">
	            			<div className="card">
									<div className="admin-up">
										<i className="fa fa-cloud background-light-blue" aria-hidden="true"></i>
									</div>
									<div className="clearfix"></div>
								    <div className="card-body">
										<h2>Cloud Expert</h2>
								    </div>
						    </div>
									</Link>
	            		</div>


	            		<div className="">
							<Link to="/admin-client-listing">
						    <div className="card">
								<div className="admin-up">

										<i className="fa fa-briefcase background-dark-orange" aria-hidden="true"></i>

								</div>
								<div className="clearfix"></div>
								<div className="card-body">
									<h2>Clients</h2>
								</div>
						    </div>
								</Link>
	            		</div>


	            		<div className="">
							 <Link to={"#"}>
	            			 <div className="card">
								    <div className="admin-up">
										<i className="fa fa-usd background-dark-indigo" aria-hidden="true"></i>
									</div>
									<div className="clearfix"></div>
									<div className="card-body">
										<h2>Transaction</h2>
									</div>
						    </div>
								</Link>
	            		</div>


						<div className="">
							 <Link to="/execs">
	            			 <div className="card">
									<div className="admin-up">
										<i className="fa fa-user background-light-green" aria-hidden="true"></i>
									</div>
									<div className="clearfix"></div>
								    <div className="card-body">
										<h2>User/Exec</h2>
								    </div>
						    </div>
								</Link>
	            		</div>

			    </div>
		    </div>
		</div>
	</div>

        </div>
          <div className = "admin-dashboard-footer mb-40">
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
    logOut: () => dispatch(logOutAction()),
    getCurrentUserDetails: () => dispatch(getCurrentUserDetails()),
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Dashboard)
