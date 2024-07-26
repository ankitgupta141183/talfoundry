import React, { Component } from "react";
import { connect } from "react-redux";
import { Link } from 'react-router-dom';
import { getSettingUserDetails } from '../../Actions/applicationActions';
import { banFreelancer } from '../../Actions/AdminActions';
import AdminHeader from "../miscellaneous/AdminHeader";
import ReadMoreAndLess from 'react-read-more-less';
import Loader from "react-loader-spinner";
import Modal from 'react-modal';
import { isEmpty } from 'lodash';
import faceImg from '../../static/images/profile-placeholder.png';
import Footer from '../miscellaneous/Footer';
import AdminDashboardSidebar from "./AdminDashboardSidebar";
import BreadCrumb from "../miscellaneous/BreadCrumb";
import NewBreadCrumb from "../miscellaneous/BreadCrumb/NewBreadCrumb";
import NoDataFoundMessage from "../Common/NodataFoundMessage/NoDataFoundMessage";


const customStyles = {
  content: {
    top: '50%',
    left: '50%',
    right: 'auto',
    bottom: 'auto',
    marginRight: '-50%',
    transform: 'translate(-50%, -50%)',
    border: 'none',
    background: 'transparent',
    width: '60%'
  }
}
function formatDateToEnglish(date) {
  const monthNames = ["Jan", "Feb", "Mar", "Apr", "May", "Jun",
    "Jul", "Aug", "Sept", "Oct", "Nov", "Dec"
  ];
  var d = new Date(date),
    month = '' + (monthNames[d.getMonth()]),
    day = '' + d.getDate(),
    year = d.getFullYear();

  if (month.length < 2)
    month = '0' + month;
  if (day.length < 2)
    day = '0' + day;
  return [month, year].join(' ');
}

class AdminClientProfile extends Component {
  constructor(props, context) {
    super(props, context)
    this.state = {
      banModal: false,
      updateAlert: false
    }
  }

  componentDidMount() {
    this.props.getClientProfile(this.props.match.params.id)
  }

  componentDidUpdate(prevProps) {
    if (this.props.match.url !== prevProps.match.url) {
      this.props.getClientProfile(this.props.match.params.id)
    }
  }

  handleBan = () => {
    this.setState({ banModal: true })
  }
  closeModal = () => {
    this.setState({ banModal: false })
  }
  banFreelancer = (id) => {
    this.setState({ banModal: false })
    this.props.banFreelancer(id).then((res) => {
      this.props.getClientProfile(this.props.match.params.id)
    })
  }
  returnStars = (value) => {
    let stars = [];
    for (let i = 0; i < 5; i++) {
      stars.push(
        <i
          className="fa fa-star first"
          style={{
            color: i + 1 > value ? "#8080806e" : "#0DA4DE",
            fontSize: "18px"
          }}
        // onClick={() => this.handleStars(i + 1)}
        ></i>
      );
    }
    return stars;
  }

  render() {
    const { clientInfo, isLoading } = this.props;
    const { banModal } = this.state;
    const date = new Date(clientInfo.created_at)

    let today = new Date()
    today.setHours(0, 0, 0, 0)
    return (
      <div className="">
          <AdminHeader history={this.props.history} />
          <div id="tf-project-manager-dashboard-root">
            {/* <BreadCrumb step={"step6"} link="Transaction" /> */}
            <NewBreadCrumb lable={"Admin_client_profile"} />

          </div>

        <div className={!this.props.loginSteps.showHideSideBar ? "mains" : "main-add ce-profile-details"}>
          <div className="">
            <div className="" style={{ minHeight: '100vh' }}>
              <div className="row custom_row">
                <div className="col-lg-2 col-md-2 col-sm-2 col-xs-2 p-0">
                  <div className="custom_sticky_container">
                    <div className="position-sticky">
                      <AdminDashboardSidebar />
                    </div>
                  </div>
                </div>
                <div className="col-lg-10 col-md-10 col-sm-10 col-xs-10">
                  {isLoading && <div className="grid-loader my-feed-loader col-md-12">
                    <Loader type="Grid" color="#00BFFF" height={100} width={100} />
                  </div>}

                  {!isLoading && <div>
                    <div className="col-md-12">
                      <div className="cloud-expert-profile-detail margin-tops">
                        <div className="col-md-12 nopad">
                          <div className="col-md-8 col-sm-8">
                            <div className="tf_free_left">
                              <div className="tf_free_left1">
                                {clientInfo.image_url ?
                                  <img src={clientInfo.image_url} className="img-circle" alt="img" /> :
                                  <img className="img-circle" src={faceImg} alt="User" />
                                }
                              </div>
                              <div className="tf_free_left2 client_pro">
                                <h5 className="full-name">{clientInfo.full_name}</h5>

                                {
                                  (!isEmpty(clientInfo.company) && clientInfo.company.name) && <h5><strong>{clientInfo.company.name}</strong></h5>
                                }
                                <p>Member since {date.getFullYear()}</p>
                              </div>
                            </div>
                          </div>
                          <div className="col-md-4 col-sm-4">
                            <div className="tf_accept2">
                              <h5>{this.returnStars(clientInfo.maximum_rating)} </h5>
                              {(!isEmpty(clientInfo.company) && clientInfo.company.vat_id) && <h6><strong>VAT ID:</strong> {clientInfo.company.vat_id}</h6>}
                            </div>
                          </div>
                          <div className="clearfix"></div>
                          <hr />

                          <div className="col-md-4 col-sm-4">
                            <div className="tf_address">
                              <p><strong>Phone</strong></p>
                              <p>{(!isEmpty(clientInfo) && clientInfo.phone_number) ? clientInfo.phone_number : "Not available"}</p>
                            </div>
                          </div>

                          <div className="col-md-5 col-sm-5">
                            <div className="tf_address">
                              <p><strong>Address</strong></p>
                              <p>{(!isEmpty(clientInfo) && clientInfo.address) ? clientInfo.address : "Not available"}</p>
                            </div>
                          </div>
                          <div className="col-md-3 col-sm-3">
                            <div className="text-center admin-ban-button-container">
                              {/* {clientInfo.account_active ?
                                <Link className="tf_ban_bu" onClick={() => this.handleBan(clientInfo.uuid)}> Ban client</Link>
                                :
                                <button className="btn-ban" disabled>Banned</button>
                              } */}

                            </div>

                          </div>

                          <div className="clearfix"></div>
                          <hr />
                          <div className="col-md-3 col-sm-3">
                            <div className="tf_address">
                              <p><strong>{clientInfo.number_of_jobs_posted}</strong></p>
                              <p>Projects Posted</p>
                            </div>
                          </div>
                          <div className="col-md-3 col-sm-3">
                            <div className="tf_address">
                              <p><strong>{clientInfo.number_of_active_jobs}</strong></p>
                              <p>Projects Active</p>
                            </div>
                          </div>
                          <div className="col-md-3 col-sm-3">
                            <div className="tf_address">
                              <p><strong>{clientInfo.number_of_completed_jobs}</strong></p>
                              <p>Projects Completed</p>
                            </div>
                          </div>
                          <div className="col-md-3 col-sm-3">
                            <div className="tf_address">
                              <p><strong>${clientInfo.amount_spent}</strong></p>
                              <p>Spent on TalFoundry</p>
                            </div>
                          </div>
                        </div>
                      </div>
                      <div className="clearfix"></div>
                      <div className="col-md-12 nopad">
                        <div className="margin-tops mb-15">
                          <div className="tf_freelancer_pro tf_feedback">
                            <div className="col-md-9  col-sm-8 col-xs-8 tf_full_width">
                              <h2 className="box-heading">Work history</h2>
                            </div>
                            <div className="col-md-3  col-sm-4 col-xs-4 tf_full_width">
                              {/*<Link onClick={(e) => e.preventDefault()}>Newest <span className="caret"></span></Link>*/}
                            </div>
                            <div className="clearfix"></div>
                            <hr />
                            {!isEmpty(clientInfo.project_manager_jobs) ? clientInfo.project_manager_jobs.map((job, idx) => {

                              let expDate = new Date(job.job_expiration_date)
                              expDate.setHours(0, 0, 0, 0)

                              return <div key={idx}>
                                <div className="tf_aws_service">
                                  <div className="col-md-9 col-sm-9 col-xs-9 tf_full_width">
                                    <h3>{job.job_title}</h3>
                                    {job.job_description && <ReadMoreAndLess
                                      ref={this.ReadMore}
                                      className="read-more-content"
                                      charLimit={250}
                                      readMoreText="Read more"
                                      readLessText="Read less"
                                    >
                                      {job.job_description}
                                    </ReadMoreAndLess>}
                                  </div>
                                  <div className="col-md-3 col-sm-3  col-xs-3 tf_full_width tf_hours">
                                    <p>
                                      {expDate < today ?
                                        'In Progress'
                                        :
                                        `${formatDateToEnglish(job.created_at)} 
                                           -
                                           ${formatDateToEnglish(job.job_expiration_date)}`
                                      }
                                    </p>
                                  </div>
                                  <div className="clearfix"></div>
                                </div>
                                <div className="clearfix"></div>
                                {/* <hr/> */}
                              </div>
                            }) : <NoDataFoundMessage 
                            
                              message={"No items to display."}/>
                            }
                          </div>
                        </div>
                      </div>
                    </div>


                  </div>}
                </div>
              </div>
            </div>
            <Modal isOpen={banModal} style={customStyles}>
              <div className="modal-body admin-applicant-pop-up">
                <div className="tf_appl_ace">
                  <h4>Applicant Failed</h4>
                  <p>Are you sure you want to ban this client?</p>
                  <button onClick={this.closeModal} type="button" className="btn btn-not-ban">Don't Ban</button>
                  <button onClick={() => this.banFreelancer(clientInfo.uuid)} type="button" className="btn btn-ban">Ban</button>
                </div>
              </div>
            </Modal>
          </div>

          {/* <div className="admin-dashboard-footer">
            <Footer />
          </div> */}
        </div>
      </div>

    )
  }
}
const mapStateToProps = state => {
  return {
    ...state,
    clientInfo: state.settingUserDetails,
    isLoading: state.applicationIsLoading
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    getClientProfile: (id) => dispatch(getSettingUserDetails(id)),
    banFreelancer: (id) => dispatch(banFreelancer(id)),
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(AdminClientProfile)
