import React, { Component } from "react";
import { connect } from "react-redux";
import { getNotificationsForFreelancerMainPage, deleteNotification, updateNotification } from '../../Actions/freelancerActions';
import { isEmpty } from 'lodash';
import { Link } from 'react-router-dom';
import Loader from "react-loader-spinner";
import loadMoreSrc from "../../static/images/loadMore.gif";
import AdminHeader from "../miscellaneous/AdminHeader";
import Footer from '../miscellaneous/Footer';
import AdminDashboardSidebar from "./AdminDashboardSidebar";
import CommonHeaderSidebar from "./AdminCommanComponents/AdminCommanHearderSideBar";


class AdminNotifications extends Component {
  constructor(props, context) {
    super(props, context)
    this.state = {
      freelancerNotifications: [],
      hideShowMore: false,
      pageNumber: 1,
      isDeleted: false
    }
  }

  componentDidMount() {
    this.props.getNotifications(1).then((res) => {
      if (res && res.length > 0) {
        this.setState({ freelancerNotifications: res })
        if (res.length < 10) {
          this.setState({ hideShowMore: true });
        }
      } else {
        this.setState({ hideShowMore: true });
      }
    })

  }


  deleteNotifi = (id) => {
    let newNotArray = []
    this.props.deleteNotification(id).then((res) => {
      this.state.freelancerNotifications.map(not => {
        if (not.id !== id) {
          newNotArray.push(not)
        }
        return not
      })

      this.setState({
        freelancerNotifications: newNotArray, isDeleted: true
      })
    })
  }

  handleShowMore = () => {
    let { freelancerNotifications } = this.state
    let newFreelancerNotifications = freelancerNotifications
    this.setState({ pageNumber: this.state.pageNumber + 1 })

    this.props.getNotifications(this.state.pageNumber + 1).then((res) => {
      if (res.length > 0) {
        newFreelancerNotifications.push(...res)
        if (res.length < 10) {
          this.setState({
            hideShowMore: true,
            freelancerNotifications: newFreelancerNotifications
          })
        }
        else {
          this.setState({
            freelancerNotifications: newFreelancerNotifications
          })
        }
      }
    })
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

  hideAlert = () => {
    this.setState({ isDeleted: false, msg: "" })
  }

  render() {
    const { applicationIsLoading } = this.props;
    let { freelancerNotifications } = this.state

    // console.log('applicationIsLoading',applicationIsLoading)
    return (
      // <div className="admin-side-list-view-banner">

      //   <div className="tf_admin_login tf_superadim admin_jobs_filters">
      //     <AdminHeader history={this.props.history} />
      //         <div className={!this.props.loginSteps.showHideSideBar ? "main tf_application tf_admin_jobs" : "main-add tf_application tf_admin_jobs"} id="job-list-admin-side">



      //            <div className="">
      //                     <AdminDashboardSidebar />
      //                 </div>


      //           <div className="container">

      //             <div className="row sticky-sidebar-container">



      //                 <div className={"col-md-11"}>
      <CommonHeaderSidebar lable="Notifications" >
        <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12 m-auto">
{/* 
          <div className="col-md-12">
            <div className="tf_back_job">

            </div>
          </div> */}


          <div className="row">
            <div className="col-md-12">
              <div className="tf_custom_notification_landing_page">
                <h2>My Notifications</h2>
                {this.props.applicationIsLoading && <div className="grid-loader my-feed-loader col-md-12">
                  <Loader type="Grid" color="#00BFFF" height={100} width={100} />
                </div>
                }

                {!isEmpty(freelancerNotifications) ? freelancerNotifications.map((notifi) => {
                  const notifiDate = new Date(notifi.created_at)
                  return (
                    <React.Fragment>
                      <div className="tf-notification-title-sec"></div>
                      <div className="tf-notification-edit-dropdown">
                        <Link onClick={() => this.deleteNotifi(notifi.id)} className="tf-notification-more-icon">
                          <i className="fa fa-window-close"></i>
                        </Link>
                        <div className="clearfix"></div>
                        <div className="tf_my_aws job-details-container notifi-div">
                          <div className="col-md-10 col-sm-10 col-xs-10 ">
                            {/* <h4>{notifi.message}</h4> */}
                            {notifi.activity ?
                              <Link
                                data-activity={notifi.activity}
                                data-notifier_uuid={notifi.notifier_uuid}
                                data-uuid={notifi.uuid}
                                onClick={this.handleNotification}
                              >
                                {notifi.message}
                              </Link> :
                              <Link>{notifi.message}
                              </Link>
                            }
                          </div>

                          <div className="col-md-2 col-sm-2 col-xs-2 ">
                            <h4>{`${notifiDate.toLocaleString('default', { month: 'short' })} ${notifiDate.getDate()}`}</h4>
                          </div>
                        </div>
                      </div>
                    </React.Fragment>
                  )
                }) : <li className="no-notifications-found">
                  No Notifications
                </li>}

                {!this.state.hideShowMore && <button
                  className="load_more_btn_find_work mt-20"
                  onClick={this.handleShowMore}
                >
                  Show More
                </button>
                }
                {!isEmpty(freelancerNotifications) && applicationIsLoading &&
                  <img src={loadMoreSrc} alt="loader" />
                }

              </div>
            </div>
          </div>
        </div>
      </ CommonHeaderSidebar >
      //                 </div>
      //             </div>
      //           </div>
      //         </div>
      //       <Footer />
      //   </div>
      // </div>
    )
  }
}

const mapStateToProps = state => ({
  ...state
})

const mapDispatchToProps = (dispatch) => {
  return {
    deleteNotification: (id) => dispatch(deleteNotification(id)),
    getNotifications: (page) => dispatch(getNotificationsForFreelancerMainPage(page)),
    updateNotification: (data, id) => dispatch(updateNotification(data, id))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(AdminNotifications)
