import React, { Component } from "react";
import { connect } from "react-redux";
import AdminHeader from "../miscellaneous/AdminHeader";
import { logOutAction } from '../../Actions/logOutAction';
import ReadMoreAndLess from 'react-read-more-less';
import { fetchFreelancer, banFreelancer, approveFreelancer } from '../../Actions/AdminActions';
import Modal from 'react-modal';
import _ from 'lodash';
// import Footer from '../miscellaneous/Footer';
import faceImg from '../../static/images/user-default-freelancerpublic.png';
import COUNTRIES from '../../constants/countryListWithCodes'
import ReactCountryFlag from "react-country-flag"
import AdminDashboardSidebar from "./AdminDashboardSidebar";
// import BreadCrumb from "../miscellaneous/BreadCrumb";
import '../Admin/PopupModals/PopupModals.css';
import NewBreadCrumb from "../miscellaneous/BreadCrumb/NewBreadCrumb";
import SuccessSweetAlert from "../CommonComponets/SweetAlert/SuccessSweetAlert";



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
class FreelancerDetails extends Component {
  constructor(props, context) {
    super(props, context)
    this.state = {
      time: new Date().toLocaleString('en-US', { hour: 'numeric', minute: 'numeric', hour12: true }),
      freelancer: {},
      banModal: false,
      updateAlert: false
    }
  }
  componentDidMount() {
    this.props.fetchFreelancer(this.props.match.params.id)
    setInterval(
      () => this.tick(),
      1000 * 60
    )
  }

  componentDidUpdate(prevProps) {
    if (this.props.match.url !== prevProps.match.url) {
      this.props.fetchFreelancer(this.props.match.params.id)
      setInterval(
        () => this.tick(),
        1000 * 60
      )
    }
  }

  componentWillReceiveProps(nextProps) {
    this.setState({ freelancer: nextProps.freelancer && nextProps.freelancer })
  }

  tick = () => {
    this.setState({
      time: new Date().toLocaleString('en-US', { hour: 'numeric', minute: 'numeric', hour12: true })
    })
  }
  handleBan = () => {
    this.setState({ banModal: true })
  }
  closeModal = () => {
    this.setState({ banModal: false })
  }
  banFreelancer = (id ,  account_approved) => {
    this.setState({ banModal: false })
    this.props.banFreelancer(id , account_approved)
  }
  handleApprove = (id) => {
    this.props.approveFreelancer(id).then((res) => {

      let freelancer = Object.assign(this.state.freelancer); // Pull the entire freelancer object out. Using object.assign is a good idea for objects.
      freelancer.account_approved = true; // update the freelancer object as needed
      this.setState({ freelancer });

      const getAlert = () => (
        // <div className="app-pro2-swal">
        //   <SweetAlert title="" onConfirm={this.hideJobAlert.bind()} showConfirm={true}>
        //     <img src={this.state.src} alt="" />
        //     <h4>
        //       <strong>
        //         {res.message}
        //       </strong>
        //     </h4>
        //   </SweetAlert>
        // </div>
        <SuccessSweetAlert 
        show={true}
        handleConfirm={this.hideJobAlert.bind()}
        message={res.message}
        
        />
      );

      this.setState({ updateAlert: getAlert() })
    })
  }

  hideJobAlert = () => {
    this.setState({ updateAlert: null })
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
    const { freelancer , banModal } = this.state;
    // const {  } = this.state;
    console.log(freelancer ,"----freelancer----");
    return (
      <div className={!this.props.loginSteps.showHideSideBar ? "mains ce-profile-details" : "main-add ce-profile-details"}>


        <AdminHeader history={this.props.history} />
        <div>
          <NewBreadCrumb  lable="Cloud Expert Profile"/>
          {/* <BreadCrumb step={"step6"} link="Cloud Expert Profile" /> */}
        </div>
        <div className="tf_admin_login tf_superadim">
          <div className="">
            {/* <div className="" id="cloud-expert-profile-details-admin-sidebar">
              <AdminDashboardSidebar />
            </div> */}

            <div className="">
              <div className="row">
                <div className="col-md-2 p-0">
                  <AdminDashboardSidebar />
                </div>
                <div className="col-md-10">

                  {this.state.updateAlert}

                  <div className="row">
                    <div className="cloud-expert-profile-detail-page-admin-side m-0">
                      <div className="col-md-12">
                        <div className="row">
                          <div className="cloud-expert-profile-highlight-box">
                            <div className="col-md-3 cloud-expert-profile-image-column nopad">
                              {/* Start Profile Image */}
                              {
                                (freelancer && freelancer.user_picture) ?
                                  <img className="avatar-img" src={freelancer && freelancer.user_picture} alt="profile_pic" />
                                  :
                                  <img className="avatar-img" src={faceImg} alt="User" />
                              }
                              {/* End Profile Image */}

                              {/* Start Hourly Rate */}
                              {
                                freelancer.profile && freelancer.profile.hourly_rate ?
                                  <p className=""><strong>Hourly Rate:  ${isNaN(freelancer.profile.hourly_rate) ? '00' : parseFloat(freelancer.profile.hourly_rate).toFixed(2)}</strong></p> : ''
                              }

                              {/* End Hourly Rate */}


                            </div>

                            <div className="col-md-9 cloud-expert-profile-details-column">
                              {/* Start Freelancer name  */}
                              <h3>{freelancer.full_name}</h3>
                              {/* End Freelancer Name  */}

                              <div className="clearfix"></div>

                              <div className="col-md-8 nopad">
                                {/* Start job title */}
                                <h5 className="current-job-title"><strong><i className="fa fa-user" aria-hidden="true"></i> {freelancer.profile && freelancer.profile.current_job_title}</strong></h5>
                                {/* End job title */}
                              </div>

                              <div className="col-md-4">
                                <div className="admin-ban-button-container">
                                  <div className="clarfix"></div>

                                  {/* {
                                    freelancer.account_active ?
                                      <div className="">
                                        <button className="btn-danger" onClick={() => this.handleBan(freelancer.uuid)}>Suspend Account</button>
                                      </div>
                                      :
                                      <div className="">
                                        <button className="btn-ban" disabled="disabled">Suspended</button>
                                      </div>
                                  } */}
                                </div>

                              </div>

                              <div className="clearfix"></div>


                              <div className="col-md-8 nopad">
                                {/* Start Country */}
                                <div>
                                  {
                                    freelancer && freelancer.profile &&
                                    freelancer.profile.current_location_country &&
                                    <ReactCountryFlag
                                      countryCode={
                                        COUNTRIES.find(c => c.label === freelancer.profile.current_location_country).value
                                        || 'US'
                                      }
                                      svg
                                      style={{
                                        width: '2em',
                                        height: '1.2em',
                                        float: 'left',
                                        marginLeft: '-2px',
                                        marginRight: '20px'
                                      }}
                                      title={'country'}
                                    />
                                  }
                                  {freelancer && freelancer.profile &&
                                    freelancer.profile
                                      .current_location_country}
                                </div>
                                {/* End Country */}
                              </div>
                              <div className="col-md-4">
                                <div className="admin-ban-button-container">
                                  <div className="clarfix"></div>


                                </div>

                              </div>




                              <div className="clearfix"></div>


                              {/* Start Description */}
                              {
                                freelancer.profile ? freelancer.profile.about_me && <ReadMoreAndLess
                                  ref={this.ReadMore}
                                  className="read-more-content"
                                  charLimit={450}
                                  readMoreText="Read more"
                                  readLessText="Read less"
                                >
                                  {freelancer.profile.about_me}
                                </ReadMoreAndLess>
                                  :
                                  <p></p>
                              }
                              {/* End Description */}



                            </div>
                          </div>
                        </div>

                        <div className="row">

                          <div className="col-md-3 nopad">
                            <p><strong>Rating:</strong>
                              {this.returnStars(
                                freelancer && freelancer.maximum_rating
                              )}
                            </p>
                          </div>
                          <div className="col-md-5">
                            <p><strong>Language Proficiency:</strong> {freelancer.profile && freelancer.profile.english_proficiency}</p>
                          </div>
                          <div className="col-md-4">
                            <p><strong>Availability:</strong> {freelancer.profile && freelancer.profile.availability}</p>
                          </div>


                        </div>
                        <div className="row">
                          <div className="col-md-3">

                          </div>
                          <div className="col-md-3">

                          </div>
                          <div className="col-md-3">

                          </div>
                          <div className="col-md-3">

                          </div>
                        </div>


                      </div>


                      <div className="col-md-12">

                        <div className="row">
                          <div className="approve-ban-button-container">

                          </div>
                        </div>

                        <div className="row">
                          <div className="modal fade" id="myModal" tabindex="-1" role="dialog" aria-labelledby="myModalLabel"
                            aria-hidden="true">
                            <div className="modal-dialog tf_model_di tf_wid">
                              <div className="modal-content">
                                <div className="modal-header">
                                  <button type="button" className="close" data-dismiss="modal" aria-label="Close"><span
                                    aria-hidden="true">×</span></button>
                                </div>
                                <Modal isOpen={banModal} style={customStyles}>
                                  <div className="modal-body admin-applicant-pop-up bg-white">
                                    <div className="tf_appl_ace modal-header-shape modal-shape">
                                      <p>Are you sure you want to suspend this account?</p>
                                      <button onClick={this.closeModal} type="button" className="btn btn-not-ban">Cancel</button>
                                      <button onClick={() => this.banFreelancer(freelancer.uuid , !freelancer.account_active)} type="button" className="btn btn-ban">Suspend</button>
                                    </div>
                                  </div>
                                </Modal>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>


                      <div className="clearfix"></div>
                    </div>
                  </div>

                  <div className="row">

                    <div className="">
                      <div className="tf_freelancer_skills">
                        <div className="col-md-12">
                          <h2>Platform</h2>
                        </div>
                        <div className="clearfix"></div>
                        <div className="freelancer-profile-details-hr" > </div>
                        <div className="col-ms-5 admin-skill">
                          {freelancer.profile && !_.isEmpty(freelancer.profile.category) ? freelancer.profile.category.map((cat, idx) => {
                            return <span data-toggle="tooltip" data-placement="top" title={cat} className="admin_skil_cat" key={idx}>{cat.length > 20 ? `${cat.substring(0, 15)}...` : cat}</span>
                          }) : <p>No items to display</p>}
                        </div>
                      </div>
                    </div>

                    <div className="">
                      <div className="tf_freelancer_skills">
                        <div className="col-md-12">
                          <h2>Speciality</h2>
                        </div>
                        <div className="clearfix"></div>
                        <div className="freelancer-profile-details-hr" ></div>
                        <div className="col-ms-5 admin-skill">
                          {freelancer.profile && !_.isEmpty(freelancer.profile.skill) ? freelancer.profile.skill.map((skill, idx) => {
                            return <span data-toggle="tooltip" data-placement="top" title={skill} className="admin_skil_cat" key={idx}>
                              {skill.length > 20 ? `${skill.substring(0, 15)}...` : skill} </span>
                          }) : <p>No items to display</p>}
                        </div>
                      </div>
                    </div>

                    <div className="">
                      <div className="tf_freelancer_skills">
                        <div className="col-md-12">
                          <h2>Certifications</h2>
                        </div>
                        <div className="clearfix"></div>
                        <div className="freelancer-profile-details-hr" ></div>
                        <div className="col-ms-5">
                          {freelancer.profile && !_.isEmpty(freelancer.profile.user_certification) ? freelancer.profile.user_certification.map((Certificate, idx) => {
                            return <span className="admin_skil_cat" key={idx}>{Certificate.certification_name}</span>
                          }) : <p>No items to display</p>}
                        </div>
                      </div>
                    </div>

                    <div className="">
                      <div className="tf_freelancer_per">

                        <div className="col-md-12">
                          <h2>Portfolio</h2>
                        </div>
                        <div className="clearfix"></div>

                        <div className="freelancer-profile-details-hr" ></div>

                        {

                          freelancer.freelancer_employments && !_.isEmpty(freelancer.freelancer_employments) ? freelancer.freelancer_employments.map((employment, idx) => {
                            return <div key={idx}>
                              <div className="col-md-12">
                                <div className="tf_overflow">
                                  <div className="col-md-6 col-sm-6 nopad">
                                    <h4>{employment.role} | {employment.company_name}</h4>
                                  </div>
                                  <div className="col-md-6 col-sm-6 nopad text-right text-secondary">
                                    <p>{employment.period_month_from} {employment.period_year_from} - {employment.period_month_to} {employment.period_year_to}</p>
                                  </div>
                                  <div className="col-md-12 nopad">
                                    <p>{employment.employment_description ? employment.employment_description : null}</p>
                                  </div>
                                </div>
                              </div>

                              <div className="clearfix"></div>
                              <hr className="freelancer-profile-details-hr" />
                              <div className="clearfix"></div>
                            </div>
                          })

                            :
                            <div className="col-md-12">
                              <p className="">No items to display.</p>
                            </div>
                        }




                      </div>
                    </div>



                    {/*<div className="col-md-4">
                      <div className="tf_video">
                        <p><i className="fa fa-play-circle" aria-hidden="true"></i> Play Video</p>
                      </div>
                    </div>*/}


                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        {/* <Footer /> */}
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
    fetchFreelancer: (id) => dispatch(fetchFreelancer(id)),
    banFreelancer: (id , account_approved) => dispatch(banFreelancer(id , account_approved)),
    approveFreelancer: (id) => dispatch(approveFreelancer(id))
  }
}
export default connect(mapStateToProps, mapDispatchToProps)(FreelancerDetails)
