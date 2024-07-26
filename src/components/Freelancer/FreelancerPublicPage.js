import React, { Component } from "react";
import FreelancerHeader from "../miscellaneous/FreelancerHeader";
import inviteIcon from "../../static/images/invite.png";
import Footer from "../miscellaneous/Footer";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import { addFavourite, removeFavourite } from "../../Actions/AdminActions";
import ReadMoreAndLess from "react-read-more-less";
import { Multiselect } from 'multiselect-react-dropdown';
import {
  getProfileForFreelancer,
  deleteProfileEmployment,
  deleteProfileCertification,
  deleteProfileEducation,
} from "../../Actions/freelancerActions";
import { profileEditModal } from "../../Actions/profileEditActions";
import { inviteToJob } from "../../Actions/programManagerJobsActions";
import { createProfileAction } from "../../Actions/profileCreationActions";
import LandingPageHeader from "../miscellaneous/LandingPageHeader";
import Loader from "react-loader-spinner";
import Modal from "react-modal";
import { isEmpty } from "lodash";
import faceImg from "../../static/images/user-default-freelancerpublic.png";
import ProjectManagerHeader from "../../components/miscellaneous/ProjectManagerHeader";
import email_gray from "../../static/images/email-gray.png";
import email_blue from "../../static/images/email-blue.png";
import call_gray from "../../static/images/call-gray.png";
import call_blue from "../../static/images/call-blue.png";
import ReactCountryFlag from "react-country-flag";
import COUNTRIES from "../../constants/countryListWithCodes";
import SignUpPopUpNew from "../miscellaneous/SignUpPopUpNew";
import certification_required from "../../static/images/certification-required.png";
import PMDashboardSideBar from "../projectManager/PMDashboardSideBar";
import BreadCrumb from "../miscellaneous/BreadCrumb";
import SuccessSweetAlert from "../CommonComponets/SweetAlert/SuccessSweetAlert";


const customStyles = {
  content: {
    top: "50%",
    left: "50%",
    right: "auto",
    bottom: "auto",
    marginRight: "-50%",
    transform: "translate(-50%, -50%)",
    border: "none",
    background: "transparent",
    width: "700px",
  },
}

class FreelancerProfile extends Component {
  constructor(props, context) {
    super(props, context);
    this.state = {
      editType: "",
      selectedRecord: {},
      isInvitationSent: false,
      videoModal: false,
      openInvite: false,
      alert: null,
      errors: {},
      openHire: false,
      hireJobId: "",
      rateType: "hourly",
      hireJobIdError: false,
      copySuccess: false,
      openLoginModal: false,
      freelancerDataLoading: false,
      inviteJobId: ''
    }
  }

  componentDidMount() {
    const profile_id = this.props.match.params.uuid;
    const jobId = this.props.match.params.jobId;

    this.setState({freelancerDataLoading: true})


    if (this.state.isInvitationSent) {
      setTimeout(
        function () {
          this.setState({ isInvitationSent: false });
        }.bind(this),
        5000
      );
    }

    this.props.getProfile(profile_id, jobId, this.props.match.params.isPublic).then(
      () => {
        this.setState({freelancerDataLoading: false})
      }
    )

    // setInterval(() => this.tick(), 1000);
  }


  handleInviteClose = () => {
    this.setState({ openInvite: false, inviteText: "", inviteJobId: "" });
  }

  handleRateType = (e) => {
    this.setState({ rateType: e.target.value });
  }

  goToHiringPage = (e) => {
    if (this.state.hireJobId) {
      this.props.history.push({
        pathname: `/hire-a-freelancer/${this.props.freelancerProfile.user_uuid}/${this.state.hireJobId}`,
        state: { rateType: this.state.rateType },
      });
      this.setState({ openHire: false });
    } else {
      this.setState({ hireJobIdError: true });
    }
  }


  onSelect = (selectedList, selectedItem) => {
    // console.log(selectedList, '-------' ,selectedItem)
    let { errors } = this.state;
    if (!isEmpty(selectedItem)) {
      errors["inviteJobId"] = "";
    }

    this.setState({
      inviteJobId: selectedItem.id,
      errors: errors,
      hireJobId: selectedItem.uuid,
    });
  }

  onInviteTextChange = (e) => {
    this.setState({ inviteText: e.target.value, errors: [] });
  }

  addFavourite = (id) => {
    const jobId = this.props.match.params.jobId;
    const profile_id = this.props.match.params.uuid;
    this.props.addFavourite(id).then((res) => {
      if (res.status === 200) {
        this.props.getProfile(profile_id, jobId);
      }
    });
  }

  copyCodeToClipboard = () => {
    const el = document.getElementById("profileLink");
    el.select();
    document.execCommand("copy");
    this.setState({ copySuccess: true });

    setTimeout(
      function () {
        el.blur();
        this.setState({ copySuccess: false });
      }.bind(this),
      2000
    );
  }

  closeModal = () => {
    this.setState({ openLoginModal: false });
  }


  removeFavourite = (id) => {
    this.props.removeFavourite(id);
  }

  inviteFreelancer = () => {
    this.setState({ openInvite: true, inviteText: "", inviteJobId: "" });
  }

  hireFreelancer = () => {
    this.setState({ openHire: true });
  }

  handleHireClose = () => {
    this.setState({ openHire: false });
  }

  hideInvitationSuccess = () => {
    this.setState({ isInvitationSent: false, Invite: true });
  }

  validateInputInputs = () => {
    let { inviteJobId } = this.state;
    let errors = {}

    if (inviteJobId === '') {
      errors["inviteJobId"] = "Please select job.";
    }
    if (!this.state.inviteText) {
      errors["inviteText"] = "This field can't be blank.";
    }
    if (!isEmpty(errors)) {
      this.setState({ errors: errors });
    }

    return {
      isValid: isEmpty(errors),
    }
  }

  handleSendInvite = (e) => {
    e.preventDefault();
    let { isValid } = this.validateInputInputs();
    if (isValid) {
      let data = {
        job_id: this.state.inviteJobId,
        recipient_id: this.props.freelancerProfile.user_id,
        message: this.state.inviteText,
      }
      this.props
        .inviteToJob(data)
        .then((res) => {
          if (res.status === 200) {
            this.setState({
              openInvite: false,
              inviteText: "",
              inviteJobId: "",
              isInvitationSent: true,
            });
            const profile_id = this.props.match.params.uuid;
            const jobId = this.props.match.params.jobId;
            this.props.getProfile(profile_id, jobId);
          }
        })
        .catch((err) => {
          console.log(err);
        });
    }
  }

  fieldError(message) {
    return (
      <p id="firstName" className="error-field">
        {message ? message : "This field can't be blank."}
      </p>
    );
  }

  handleClickHire = (e) => {
    if(this.props.currentUser.role === "Project Manager"){
        this.props.history.push(`user-profile/${e.target.dataset.uuid}`)
    }
    else {
      this.setState({
        openLoginModal: true,
        currentUserFreelancerId: e.target.dataset.uuid
      })
    }
  }

  render() {
    let { freelancerProfile, currentUser } = this.props;
    let { rateType, hireJobIdError, copySuccess,freelancerDataLoading } = this.state;
    let code = COUNTRIES.find(
      (c) => c.label === freelancerProfile.current_location_country
    );

    const getFormattedDate = (inputDate) => {
      const monthNames = [
        "January",
        "February",
        "March",
        "April",
        "May",
        "June",
        "July",
        "August",
        "September",
        "October",
        "November",
        "December",
      ];
      const date = new Date(inputDate);
      return `${monthNames[date.getMonth()]} ${date.getFullYear()}`;
    }

    let showInvite =
      !isEmpty(currentUser) && currentUser.role === "Project Manager";
    let { errors } = this.state;
    return (
      <div>
        {!isEmpty(this.props.currentUser) ? (
          this.props.currentUser.role === "Project Manager" ? (
            <ProjectManagerHeader history={this.props.history} />
          ) : (
            <FreelancerHeader history={this.props.history} />
          )
        ) : (
          <LandingPageHeader history={this.props.history} />
        )}

          {/* <SignUpPopUpNew
            isOpen={this.state.openLoginModal}
            closeModal={this.closeModal}
            history={this.props.history}
            fromHireMe={true}
            freelancerId={freelancerProfile.uuid}
          /> */}

        <div className="" id="tf-project-manager-dashboard-root">
          {showInvite && <BreadCrumb step={"step6"}  link="User Profile"/> }
          {/* {!this.props.isAuthenticated ? "mains d-flex" : " mains d-flex"} */}
          <div className="">
            {!isEmpty(this.props.currentUser) &&
            this.props.currentUser.role === "Project Manager" &&
              <div className={!this.props.loginSteps.showHideSideBar? "ml-225": "ml-65"}>
                <div className="">
                  {/* <PMDashboardSideBar history={this.props.history}/> */}
                </div>
              </div>
            }
            <div className="row custom_row">
              <div className="col-lg-2 col-md-2 p-0">
                <div className="custom_sticky_container">
                  <div className="position-sticky">
                  <PMDashboardSideBar history={this.props.history}/>
                  </div>
                </div>
            </div>
            <div className="col-md-10 m-auto">
              <div className="tf_pad_res freelancer_public_page ">
                {freelancerDataLoading ? (
                  <div className="grid-loader">
                    <Loader
                      type="Grid"
                      color="#00BFFF"
                      height={100}
                      width={100}
                    />
                  </div>
                ) : (
                  <div className="">
                    <div className="col-lg-9 col-md-8 display-user-public-profile-page">
                      <div className="">
                        <div className="tf_freelancer_pro profile_details_section manager_profile">
                          <div className="col-lg-2 col-md-2 col-sm-2 col-xs-2">
                            <div className="profile_avatar_img">
                            {freelancerProfile.profile_picture ? (
                              <img
                                src={freelancerProfile.profile_picture}
                                alt="img"
                                className="img_for_profile_public_page"
                              />
                            ) : (
                              <div className="mr-20">
                                <img
                                  style={{ background: "#0DA4DE" }}
                                  src={faceImg}
                                  className="img_for_profile_public_page"
                                  alt=""
                                />
                              </div>
                            )}
                            </div>
                            {/* <div className="col-md-12 nopad">
                              <div className="tf_free_name">
                                {freelancerProfile &&
                                freelancerProfile.hourly_rate ? (
                                  <h5 className="freelancer_profile_pay">
                                                        Hourly Rate : $
                                                        <strong>
                                                          {isNaN(freelancerProfile.hourly_rate)
                                                            ? "00"
                                                            : parseFloat(
                                                                freelancerProfile.hourly_rate
                                                              ).toFixed(2)}
                                                        </strong>
                                                      </h5>
                                ) : (
                                  ""
                                )}
                              </div>
                            </div> */}
                          </div>
                          {this.state.isInvitationSent && (
                            // <div className="app-pro2-swal text-center">
                            //   <SweetAlert
                            //     title=""
                            //     confirmBtnText="Ok"
                            //     confirmBtnBsStyle="success"
                            //     onConfirm={this.hideInvitationSuccess}
                            //     showConfirm={true}
                            //   >
                            //     <img src={inviteIcon} alt="search-icon" />
                            //     <h4 className="text-center">
                            //       <strong>
                            //         Invite sent. <br />
                            //         {freelancerProfile.name} will get back to
                            //         you shortly.
                            //       </strong>
                            //     </h4>
                            //   </SweetAlert>
                            // </div>
                            <SuccessSweetAlert 
                            show={true}
                            handleConfirm={this.hideInvitationSuccess}
                            message={`Invite sent.
                                     ${freelancerProfile.name} will get back to you shortly.
                                     `}
                            />
                          )}
                          <div className="col-lg-10 col-md-10 col-sm-10 col-xs-10 tf_full_width">
                            <h3 className="m-0">
                              {freelancerProfile.name}{" "}
                              {freelancerProfile.is_certified && (
                                <img title="Certification Required" src={certification_required} alt="Certified" className="certification-required" />
                              )}
                            </h3>

                            <div className="tf_free_name">
                              <h5>
                                {/* <i
                                  className="fa fa-user mr-30"
                                  style={{ fontSize: "22px" }}
                                  aria-hidden="true"
                                ></i> */}
                                {freelancerProfile.current_job_title}
                                <span className="job_hour-btn">
                                        Full time
                                      </span>
                              </h5>
                            </div>

                            {/* <div className="">
                              <h5>
                                <strong>
                                  <ReactCountryFlag
                                    countryCode={code && code.value}
                                    svg
                                    style={{
                                      width: "2em",
                                      height: "1.2em",
                                      float: "left",
                                      marginLeft: "-2px",
                                      marginRight: "20px",
                                    }}
                                    title={code && code.value}
                                  />
                                  {isEmpty(freelancerProfile)
                                    ? ""
                                    : `${freelancerProfile.current_location_city}`}
                                  , {freelancerProfile.current_location_country}
                                </strong>
                              </h5>
                            </div> */}
                            
                            <div className="tf_f_content mt-20">
                                    <h5 className="d-flex m-0">
                                      <span className="">
                                        <ul className="profile_rating_sec">
                                          <li>
                                            <div className="profile_rating">
                                              <span className="profile_average_rating">5.0 </span>
                                              <i className="fa fa-star"></i>
                                              <i className="fa fa-star"></i>
                                              <i className="fa fa-star"></i>
                                              <i className="fa fa-star"></i>
                                              <i className="fa fa-star"></i>
                                            </div>
                                          </li>
                                          <li>
                                            <strong>Member Since, Aug 5, 2018</strong>
                                          </li>
                                          <li>
                                            <span>
                                              <strong>
                                                <ReactCountryFlag
                                                  countryCode={code && code.value}
                                                  svg
                                                  style={{
                                                    width: "2em",
                                                    height: "1.2em",
                                                    float: "left",
                                                    marginLeft: "-2px",
                                                    marginRight: "20px",
                                                  }}
                                                  title={code && code.value}
                                                />
                                                {isEmpty(freelancerProfile)
                                                  ? ""
                                                  : `${freelancerProfile.current_location_city}`}
                                                , {freelancerProfile.current_location_country}
                                              </strong>
                                            </span>
                                          </li>
                                        </ul>
                                      </span>
                                    </h5>
                                  </div>
                                  <div>
                                     <div className="col-md-12 nopad proposal_box">
                                        <div className="tf_free_name m-0">
                                          {freelancerProfile &&
                                          freelancerProfile.hourly_rate ? (
                                            <h3 className="freelancer_profile_pay">
                                                                   $
                                                                  <strong>
                                                                    {isNaN(freelancerProfile.hourly_rate)
                                                                      ? "00"
                                                                      : parseFloat(
                                                                          freelancerProfile.hourly_rate
                                                                        ).toFixed(2)}
                                                                  </strong>
                                                                  <span>&nbsp;
                                                                    (Per Hour)
                                                                  </span>
                                                                </h3>
                                          ) : (
                                            ""
                                          )}
                                        </div>
                                      </div>
                                  </div>
                          </div>

                          <div className="clearfix"></div>
                        </div>
                      </div>

                      <div className="margin-tops hide">
                        <div className="tf_freelancer_pro tf_feedback">
                          <div className="col-md-9  col-sm-8 col-xs-8 tf_full_width">
                            <h2 className="text">Work history and feedback</h2>
                          </div>
                          <div className="col-md-3  col-sm-4 col-xs-4 tf_full_width">
                            <Link href="#">
                              Newest <span className="caret"></span>
                            </Link>
                          </div>
                          <div className="clearfix"></div>
                          <hr />
                          <div className="tf_aws_service">
                            <div className="col-md-10">
                              <h3>AWS Services</h3>
                              <span>
                                <i className="fa fa-star"></i>
                                <i className="fa fa-star"></i>
                                <i className="fa fa-star"></i>
                                <i className="fa fa-star"></i>
                                <i className="fa fa-star"></i>{" "}
                                <strong>5.00</strong> Apr 2016 - Dec 2018
                              </span>
                            </div>
                            <div className="col-md-2 tf_hours">
                              <p>Private</p>
                              <p>120 hrs</p>
                            </div>
                            <div className="clearfix"></div>
                            <div className="col-md-10">
                              <p>
                                Lorem ipsum dolor sit amet, consetetur
                                sadipscing elitr, sed diam nonumy eirmod tempor
                                invidunt ut labore et dolore magna aliquyam
                                erat, sed diam voluptua. At vero eos et accusam
                                et justo duo dolores et ea rebum. Stet clita
                              </p>
                            </div>
                          </div>
                          <div className="tf_aws_service">
                            <div className="col-md-10">
                              <h3>AWS Services</h3>
                              <span>
                                <i className="fa fa-star"></i>
                                <i className="fa fa-star"></i>
                                <i className="fa fa-star"></i>
                                <i className="fa fa-star"></i>
                                <i className="fa fa-star"></i>{" "}
                                <strong>5.00</strong> Apr 2016 - Dec 2018
                              </span>
                            </div>
                            <div className="col-md-2 tf_hours">
                              <p>Private</p>
                              <p>120 hrs</p>
                            </div>
                            <div className="clearfix"></div>
                            <div className="col-md-10">
                              <p>
                                Lorem ipsum dolor sit amet, consetetur
                                sadipscing elitr, sed diam nonumy eirmod tempor
                                invidunt ut labore et dolore magna aliquyam
                                erat, sed diam voluptua. At vero eos et accusam
                                et justo duo dolores et ea rebum. Stet clita
                              </p>
                            </div>
                          </div>
                          <div className="tf_aws_service">
                            <div className="col-md-10">
                              <h3>AWS Services</h3>
                              <span>
                                <i className="fa fa-star"></i>
                                <i className="fa fa-star"></i>
                                <i className="fa fa-star"></i>
                                <i className="fa fa-star"></i>
                                <i className="fa fa-star"></i>{" "}
                                <strong>5.00</strong> Apr 2016 - Dec 2018
                              </span>
                            </div>
                            <div className="col-md-2 tf_hours">
                              <p>Private</p>
                              <p>120 hrs</p>
                            </div>
                            <div className="clearfix"></div>
                            <div className="col-md-10">
                              <p>
                                Lorem ipsum dolor sit amet, consetetur
                                sadipscing elitr, sed diam nonumy eirmod tempor
                                invidunt ut labore et dolore magna aliquyam
                                erat, sed diam voluptua. At vero eos et accusam
                                et justo duo dolores et ea rebum. Stet clita
                              </p>
                            </div>
                          </div>
                          <div className="tf_aws_service">
                            <div className="col-md-10">
                              <h3>AWS Services</h3>
                              <span>
                                <i className="fa fa-star"></i>
                                <i className="fa fa-star"></i>
                                <i className="fa fa-star"></i>
                                <i className="fa fa-star"></i>
                                <i className="fa fa-star"></i>{" "}
                                <strong>5.00</strong> Apr 2016 - Dec 2018
                              </span>
                            </div>
                            <div className="col-md-2 tf_hours">
                              <p>Private</p>
                              <p>120 hrs</p>
                            </div>
                            <div className="clearfix"></div>
                            <div className="col-md-10">
                              <p>
                                Lorem ipsum dolor sit amet, consetetur
                                sadipscing elitr, sed diam nonumy eirmod tempor
                                invidunt ut labore et dolore magna aliquyam
                                erat, sed diam voluptua. At vero eos et accusam
                                et justo duo dolores et ea rebum. Stet clita
                              </p>
                            </div>
                          </div>
                          <div className="tf_aws_service">
                            <div className="col-md-10">
                              <h3>AWS Services</h3>
                              <span>
                                <i className="fa fa-star"></i>
                                <i className="fa fa-star"></i>
                                <i className="fa fa-star"></i>
                                <i className="fa fa-star"></i>
                                <i className="fa fa-star"></i>{" "}
                                <strong>5.00</strong> Apr 2016 - Dec 2018
                              </span>
                            </div>
                            <div className="col-md-2 tf_hours">
                              <p>Private</p>
                              <p>120 hrs</p>
                            </div>
                            <div className="clearfix"></div>
                            <div className="col-md-10">
                              <p>
                                Lorem ipsum dolor sit amet, consetetur
                                sadipscing elitr, sed diam nonumy eirmod tempor
                                invidunt ut labore et dolore magna aliquyam
                                erat, sed diam voluptua. At vero eos et accusam
                                et justo duo dolores et ea rebum. Stet clita
                              </p>
                            </div>
                          </div>
                          <div className="col-md-12">
                            <div className="tf_aws_service_1">
                              <p>
                                <Link href="#">View More</Link> (10)
                              </p>
                            </div>
                          </div>
                        </div>
                      </div>
                      <div className="margin-tops">
                        <div className="tf_freelancer_pro tf_feedback ">
                          <div className="col-md-12 category_head">
                            <h5 className="text">Overview</h5>
                          </div>
                          <div className="col-md-12">
                          <div className="mt-20">
                                <div className="read-more-sec">
                              <ReadMoreAndLess
                                ref={this.ReadMore}
                                className="read-more-content"
                                charLimit={850}
                                readMoreText="Read more"
                                readLessText="Read less"
                              >
                                {freelancerProfile.about_me
                                  ? freelancerProfile.about_me
                                  : ""}
                              </ReadMoreAndLess>
                            </div>
                                </div>
                          </div>
                        </div>
                      </div>
                      <div className="margin-tops">
                        <div className="tf_freelancer_pro tf_feedback ">
                          <div className="col-md-12 category_head">
                            <h5 className="text">Platform</h5>
                          </div>
                          <div className="col-md-12">
                          <div className="mt-20">
                                {!isEmpty(freelancerProfile.category) ? (
                                  (freelancerProfile.category || []).map(
                                    (category, index) => {
                                      return (
                                        <div className="tf_skills" key={index}>
                                          <h6>{category}</h6>
                                        </div>
                                      );
                                    }
                                  )
                                ) : (
                                  <p> No items to display.</p>
                                )}
                                </div>
                          </div>
                        </div>
                      </div>
                      <div className="margin-tops">
                        <div className="tf_freelancer_pro tf_feedback">
                          <div className="col-md-12 category_head">
                            <h5 className="text">Tech Stack</h5>
                          </div>
                          <div className="col-md-12">
                            <div className="mt-20">
                                {!isEmpty(freelancerProfile.skill) ? (
                                  (freelancerProfile.skill || []).map(
                                    (skill, index) => {
                                      return (
                                        <div className="tf_skills" key={index}>
                                          <h6 data-toggle="tooltip" data-placement="top" title={skill} className="skill_small">
                                            {skill.length > 30
                                              ? `${skill.substring(0, 50)}`
                                              : skill}
                                          </h6>
                                        </div>
                                      );
                                    }
                                  )
                                ) : (
                                  <p> No items to display</p>
                                )}
                            </div>
                          </div>
                        </div>
                      </div>
                      <div className="margin-tops hide">
                        <div className="tf_freelancer_pro tf_feedback">
                          <div className="col-md-12">
                            <h2 className="text">Test</h2>
                          </div>
                          <div className="col-md-12">
                            <table className="table">
                              <thead>
                                <tr>
                                  <th>Name</th>
                                  <th>Score (out of 5)</th>
                                  <th>Time to complete</th>
                                </tr>
                              </thead>
                              <tbody>
                                <tr>
                                  <td>AWS</td>
                                  <td>3.51 (Passed)</td>
                                  <td>10minutes</td>
                                </tr>
                                <tr>
                                  <td>AWS</td>
                                  <td>3.51 (Passed)</td>
                                  <td>10minutes</td>
                                </tr>
                                <tr>
                                  <td>AWS</td>
                                  <td>3.51 (Passed)</td>
                                  <td>10minutes</td>
                                </tr>
                                <tr>
                                  <td>AWS</td>
                                  <td>3.51 (Passed)</td>
                                  <td>10minutes</td>
                                </tr>
                              </tbody>
                            </table>
                          </div>
                        </div>
                      </div>

                      <div className="margin-tops">
                        <div className="tf_freelancer_pro tf_feedback">
                          <div className="col-md-12 category_head">
                            <h5>Portfolio</h5>
                          </div>
                          {!isEmpty(freelancerProfile.employments) ? (
                            (freelancerProfile.employments || []).map(
                              (employement, index) => {
                                return (
                                  <div
                                    className="col-md-12 category_submit"
                                    key={index}
                                  >
                                    <div className="tf_employe">
                                      <h5>
                                        {employement.role} |{" "}
                                        {employement.company_name}
                                      </h5>
                                      <p>
                                        {employement.period_month_from}{" "}
                                        {employement.period_year_from} -{" "}
                                        {employement.period_month_to}{" "}
                                        {employement.period_year_to}
                                      </p>
                                    </div>
                                  </div>
                                );
                              }
                            )
                          ) : (
                            <p className="col-md-12"> No items to display.</p>
                          )}
                        </div>
                      </div>

                      <div className="margin-tops">
                        <div className="tf_freelancer_pro tf_feedback">
                          <div className="col-md-12 category_head">
                            <h5 className="text">Education</h5>
                          </div>
                          {!isEmpty(freelancerProfile.educations) ? (
                            (freelancerProfile.educations || []).map(
                              (record, index) => {
                                return (
                                  <div
                                    className="col-md-12 category_submit"
                                    key={index}
                                  >
                                    <div className="tf_employe">
                                      <h5>
                                        {record.degree} | {record.school}
                                      </h5>
                                      <p>
                                        {getFormattedDate(record.from_date)} -{" "}
                                        {getFormattedDate(record.to_date)}
                                      </p>
                                    </div>
                                  </div>
                                );
                              }
                            )
                          ) : (
                            <p className="col-md-12"> No items to display.</p>
                          )}
                        </div>
                      </div>

                      <div className="margin-tops">
                        <div className="tf_freelancer_pro tf_feedback">
                          <div className="col-md-12">
                            <h5>Certifications</h5>
                          </div>

                          <div className="col-md-12 category_submit">
                            {!isEmpty(freelancerProfile.certifications) ? (
                              (freelancerProfile.certifications || []).map(
                                (certification, index) => {
                                  return (
                                    <div className="tf_skills" key={index}>
                                      <h6 data-toggle="tooltip" data-placement="top" title={certification.certification_name}>
                                        {certification.certification_name
                                          .length > 20
                                          ? `${certification.certification_name.substring(
                                              0,
                                              60
                                            )}`
                                          : certification.certification_name}
                                      </h6>
                                    </div>
                                  );
                                }
                              )
                            ) : (
                              <p> No items to display.</p>
                            )}
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="col-lg-3 col-md-4">
                      {showInvite ? (
                        <div className="tf_freelancer_pro_right m-0 p-0">

                          {!freelancerProfile.contract_id ? (
                            !isEmpty(freelancerProfile.payment_method) ? (
                              <Link
                                href="#"
                                className="tf_hire_button"
                                onClick={this.hireFreelancer}
                              >
                                HIRE {freelancerProfile.name}
                              </Link>
                            ) : (
                              <Link
                                className="tf_hire_button"
                                to={{
                                  pathname: "/settings",
                                  state: "payMethodPresent",
                                }}
                              >
                                HIRE {freelancerProfile.name}
                              </Link>
                            )
                          ) : (
                            <Link
                              href="#"
                              disabled={true}
                              className="tf_short_button_disabled"
                            >
                              HIRED
                            </Link>
                          )}



                          {freelancerProfile.contract_id ? null : !freelancerProfile.invite_id ? (
                            <Link
                              href="#"
                              className="tf_invite_button mb-10"
                              onClick={this.inviteFreelancer}
                            >
                              INVITE TO JOB
                            </Link>
                          ) : (
                            <Link
                              href="#"
                              disabled={true}
                              className="tf_short_button_disabled "
                            >
                              INVITED
                            </Link>
                          )}


                          {!freelancerProfile.favorited_freelancer ? (
                            <Link
                              href="#"
                              onClick={this.addFavourite.bind(
                                this,
                                freelancerProfile.user_id
                              )}
                              className="tf_short_button"
                            >
                              SHORTLIST
                            </Link>
                          ) : (
                            <Link
                              href="#"
                              disabled={true}
                              className="tf_short_button_disabled"
                            >
                              SHORTLISTED
                            </Link>
                          )}
                        </div>
                      ) : null}

                      { !(currentUser.role === "Project Manager") &&
                        <div className="tf_freelancer_pro_right margin-tops">
                           <Link
                            to={`#`}
                            disabled
                            onClick={this.handleClickHire}
                            className={this.props.isAuthenticated ? "tf_invite_button hire_CE tf_invite_disabled": "tf_invite_button hire_CE"}>Hire {freelancerProfile.name}</Link>
                          </div>
                      }
                      <div className="tf_freelancer_pro_right margin-tops">
                        <h5>Availability</h5>
                        <hr className="custom_hr_right-sidebar" />
                        <p>
                          {freelancerProfile.availability == null
                            ? ""
                            : freelancerProfile.availability}
                        </p>
                      </div>
                      <div className="clearfix"></div>

                      <div className="tf_freelancer_pro_right tf_web_link margin-tops">
                        <h5>Profile Link</h5>
                        <hr className="custom_hr_right-sidebar" />

                        {freelancerProfile && (
                          <input
                            type="text"
                            title={freelancerProfile.profile_link}
                            style={{
                              border: "none",
                              background: "transparent",
                              fontSize: "13px",
                            }}
                            value={freelancerProfile.profile_link || "a"}
                            id="profileLink"
                          />
                        )}

                        <i
                          onClick={this.copyCodeToClipboard}
                          className="fa fa-copy"
                          style={{
                            marginTop: "2px",
                            marginLeft: "10px",
                            marginRight: "10px",
                            fontSize: "1.3em",
                          }}
                        ></i>

                        {copySuccess ? (
                          <span style={{ color: "#109FDA" }}> Copied </span>
                        ) : (
                          ""
                        )}
                      </div>

                      <div className="clearfix"></div>

                      <div className="tf_freelancer_pro_right margin-tops">
                        <h5>Language Proficiency</h5>
                        <hr className="custom_hr_right-sidebar" />
                        <p>{freelancerProfile.english_proficiency}</p>
                      </div>
                      <div className="clearfix"></div>

                      <div className="tf_freelancer_pro_right margin-tops">
                        <h5>Verifications</h5>
                        <hr className="custom_hr_right-sidebar" />
                        <table
                          width="100%"
                          className="freelancer-Verifications-status"
                        >
                          {freelancerProfile.user_phone_verified ? (
                            <tr className="Phone-Number-row">
                              <td width="80%">
                                <img
                                  src={call_blue}
                                  alt=""
                                  className="Phone_Number"
                                />{" "}
                                <strong>Phone Number</strong>
                              </td>
                              <td width="20%">
                                <i
                                  className="fa fa-check-circle"
                                  aria-hidden="true"
                                ></i>
                              </td>
                            </tr>
                          ) : (
                            <tr className="Phone-Number-row">
                              <td width="80%">
                                <img
                                  src={call_gray}
                                  alt=""
                                  className="Phone_Number"
                                />{" "}
                                <strong>Phone Number</strong>
                              </td>
                              <td width="20%">
                                <i className="fa fa-minus" aria-hidden="true"></i>
                              </td>
                            </tr>
                          )}

                          {freelancerProfile.user_email_verified &&
                          freelancerProfile.user_email_verified.length > 0 ? (
                            <tr className="Email-Address-row">
                              <td width="80%">
                                <img
                                  src={email_blue}
                                  alt=""
                                  className="Email_Address"
                                />{" "}
                                <strong>Email Address</strong>
                              </td>
                              <td width="20%">
                                <i
                                  className="fa fa-check-circle"
                                  aria-hidden="true"
                                ></i>
                              </td>
                            </tr>
                          ) : (
                            <tr className="Email-Address-row">
                              <td width="80%">
                                <img
                                  src={email_gray}
                                  alt=""
                                  className="Email_Address"
                                />{" "}
                                <strong>Email Address</strong>
                              </td>
                              <td width="20%">
                                <i className="fa fa-minus" aria-hidden="true"></i>
                              </td>
                            </tr>
                          )}
                        </table>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </div>
            </div>
            <Modal
              isOpen={this.state.openInvite}
              style={customStyles}
              onRequestClose={this.handleInviteClose}
            >
              <div className="modal-dialog" role="document">
                <form onSubmit={this.handleSendInvite}>
                  <div className="modal-content tf_float">
                    <div className="modal-header">
                      <button
                        type="button"
                        className="close"
                        onClick={this.handleInviteClose}
                        data-dismiss="modal"
                      >
                        <span aria-hidden="true">×</span>
                        <span className="sr-only">Close</span>
                      </button>
                      <h4 className="modal-title" id="myModalLabel">
                        Invite to Job
                      </h4>
                    </div>
                    <div className="modal-body" align="center">
                      <div className="col-md-2 col-sm-2 col-xs-3 tf_full_width">
                        <div className="tf_image">
                          {freelancerProfile &&
                          freelancerProfile.profile_picture ? (
                            <img
                              src={freelancerProfile.profile_picture}
                              className="img-circle-invite mt-0"
                              alt=""
                            />
                          ) : (
                            <img
                              src={faceImg}
                              className="img-circle-invite mt-0"
                              alt=""
                            />
                          )}
                        </div>
                      </div>
                      <div className="col-md-10 col-sm-8 col-xs-9 tf_full_width">
                        <div className="tf_free_name">
                          <h4>{freelancerProfile.name}</h4>
                        </div>
                        <div className="tf_f_content">
                          <h5>
                            <strong>
                              {isEmpty(freelancerProfile)
                                ? ""
                                : freelancerProfile.current_job_title}
                            </strong>
                          </h5>
                        </div>
                      </div>
                      <div className="clearfix"></div>
                      <div className="col-md-12">
                        <div className="form-group text-left">
                          <div className="input-group">
                            <label>Message</label>
                            <textarea
                              id="status"
                              rows="5"
                              className="form-control"
                              onChange={this.onInviteTextChange}
                              placeholder="Input text"
                            >
                              {this.state.inviteText}
                            </textarea>
                            <p className="form-error">{errors["inviteText"]}</p>
                          </div>
                        </div>
                      </div>
                      <div className="col-md-12">
                        <div className="form-group">
                          <div className="input-group">
                            <label>Choose a job</label>
                            <div className="selectedwrap">
                              <Multiselect
                                options={freelancerProfile.available_jobs}
                                singleSelect
                                displayValue="title"
                                onSelect={this.onSelect}
                                selectedValues={this.state.selectedValue}
                                className="form-control mn_input"
                                placeholder="Select Job."
                              />

                              <p className="form-error">
                                {errors["inviteJobId"]}
                              </p>
                            </div>
                          </div>
                        </div>
                      </div>
                      <div className="clearfix" />
                    </div>
                    <div className="modal-footer tf_model_footer pull-left">
                      <div className="col-md-12">
                        <input
                          type="submit"
                          className="btn btn-fill btn-cyan btn-wd"
                          value="SEND INVITE"
                        />
                      </div>
                    </div>
                  </div>
                </form>
              </div>
            </Modal>
            <Modal
              isOpen={this.state.openHire}
              style={customStyles}
              onRequestClose={this.handleHireClose}
            >
              <div
                className="modal-dialog tf_z_index find-freelancer-popup"
                role="document"
              >
                <div className="modal-content tf_float">
                  <div className="modal-header">
                    <button
                      type="button"
                      className="close"
                      onClick={this.handleHireClose}
                      data-dismiss="modal"
                    >
                      <span aria-hidden="true">×</span>
                      <span className="sr-only">Close</span>
                    </button>
                    <h4 className="modal-title" id="myModalLabel">
                      Hire {freelancerProfile.name}
                    </h4>
                  </div>

                  <div className="modal-body" align="center">
                    <div className="col-md-12">
                      <div className="form-group">
                        <div className="input-group">
                          <label>
                            Link this offer to an open job post
                          </label>
                          <div className="selectedwrap">
                            <Multiselect
                                options={freelancerProfile.available_jobs}
                                singleSelect
                                displayValue="title"
                                onSelect={this.onSelect}
                                selectedValues={this.state.selectedValue}
                                className="form-control mn_input"
                                placeholder="Select Job."
                              />

                            {hireJobIdError &&
                              this.fieldError("Please select a job.")}
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="clearfix"></div>
                    <div className="clearfix"></div>
                    <div className="col-md-12 col-sm-12 col-xs-12">
                      <div className="form-group">
                        <label className="labeltext">Job Type</label>
                        <br />
                        <div
                          className="form-check-inline"
                          onChange={this.handleRateType}
                        >
                          <label className="customradio">
                            <span className="radiotextsty">Hourly</span>
                            <input
                              type="radio"
                              checked={rateType === "hourly"}
                              name="radio"
                              value="hourly"
                            />
                            <span className="checkmark"></span>
                          </label>{" "}
                                 
                          <label className="customradio">
                            <span className="radiotextsty">Fixed - Price</span>
                            <input
                              type="radio"
                              value="fixed price"
                              checked={rateType === "fixed price"}
                              name="radio"
                            />
                            <span className="checkmark"></span>
                          </label>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="clearfix"></div>
                  <div className="modal-footer tf_model_footer1">
                    <div className="col-md-12 nopad">
                      <div className="col-md-3 col-sm-4 col-xs-6">
                        <button
                          onClick={this.goToHiringPage}
                          type="button"
                          className="btn btn-fill btn-cyan btn-wd"
                        >
                          Continue
                        </button>
                      </div>
                      <div className="col-md-3 col-sm-4 col-xs-6">
                        <button
                          onClick={this.handleHireClose}
                          type="button"
                          className="btn btn-fill btn-elegant btn-wd"
                          data-dismiss="modal"
                        >
                          Cancel
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </Modal>
          </div>
        </div>

        {/* <Footer /> */}
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  ...state,
});

const mapDispatchToProps = (dispatch) => {
  return {
    deleteEmployment: (id, profileId) =>
      dispatch(deleteProfileEmployment(id, profileId)),
    inviteToJob: (data) => dispatch(inviteToJob(data)),
    deleteEducation: (id, profileId) =>
      dispatch(deleteProfileEducation(id, profileId)),
    deleteCertification: (id, profileId) =>
      dispatch(deleteProfileCertification(id, profileId)),
    getProfile: (id, jobId, isPublic) =>
      dispatch(getProfileForFreelancer(id, jobId, isPublic)),
    submitProfileData: (id, data) => dispatch(createProfileAction(id, data)),
    modalVisibility: (payload) => dispatch(profileEditModal(payload)),
    addFavourite: (id) => dispatch(addFavourite(id)),
    removeFavourite: (id) => dispatch(removeFavourite(id)),
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(FreelancerProfile);
