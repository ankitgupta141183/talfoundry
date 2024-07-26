import React, { Component } from "react";
// import FreelancerHeader from "../miscellaneous/FreelancerHeader";
import outlineEdit from "../../static/images/outline-edit-24px.svg";
import outlineDelete from "../../static/images/outline-delete-24px.svg";
// import Footer from "../miscellaneous/Footer";
import { connect } from "react-redux";
import ReadMoreAndLess from "react-read-more-less";
import {
  getProfileForFreelancer,
  deleteProfileEmployment,
  deleteProfileCertification,
  deleteProfileEducation,
} from "../../Actions/freelancerActions";
import { profileEditModal } from "../../Actions/profileEditActions";
import { getCurrentUserDetails } from "../../Actions/applicationActions";
import { createProfileAction } from "../../Actions/profileCreationActions";
import EditTitle from "../ProfileEditModels/EditTitle";
import EditOverview from "../ProfileEditModels/EditOverview";
import EditHourlyRate from "../ProfileEditModels/EditHourlyRate";
import EditEducation from "../ProfileEditModels/EditEducation";
import EditEmployment from "../ProfileEditModels/EditEmployment";
import ShowCertification from "../ProfileEditModels/ShowCertification";
import EditCertification from "../ProfileEditModels/EditCertification";
import EditCategory from "../ProfileEditModels/EditCategory";
import EditSkills from "../ProfileEditModels/EditSkills";
import AddVideo from "../Freelancer/AddVideoModal";
import EditProfilePic from "../ProfileEditModels/EditProfilePicture";
import Loader from "react-loader-spinner";
import faceImg from "../../static/images/profile-placeholder.png";
import Avatar from "react-avatar";
import { Link } from "react-router-dom";
import { isEmpty } from "lodash";
import EditAvailability from "../ProfileEditModels/EditAvailability";
import EditVisibility from "../ProfileEditModels/EditVisibility";
import EditLanguages from "../ProfileEditModels/EditLanguages";
import COUNTRIES from "../../constants/countryListWithCodes";
import ReactCountryFlag from "react-country-flag";
import certification_required from "../../static/images/certification-required.png";
import Skills from '../Common/Skills'
import FreelancerDashboardSideBar from "./FreelancerDashboardSideBar";
import BreadCrumb from "../miscellaneous/BreadCrumb";
import SuccessSweetAlert from "../CommonComponets/SweetAlert/SuccessSweetAlert";


const editConfigs = {
  editEducation: "educations",
  editCertification: "certifications",
  editEmployment: "employments",
  editCategory: "categories",
  editSkill: "skill",
  editProfilePic: "ProfilePic",
  editAvailability: "editAvailability",
  editVisibility: "editVisibility",
  isLoading: false,
  openCerticateModal: false,
  deleteInProgress: false,
  updateProfileInProgress: false
}

class FreelancerProfile extends Component {
  constructor(props, context) {
    super(props, context);
    this.state = {
      time: new Date().toLocaleString("en-US", {
        hour: "numeric",
        minute: "numeric",
        hour12: true,
      }),
      editType: "",
      selectedRecord: {},
      videoModal: false,
      alert: null,
      isLoading: true,
      copySuccess: false,
      freelancerDataLoading: true,
      freelancerUUID: '',
      profile_cover: ''
    }
  }

  componentDidMount() {
    console.log("this is run Free Lancer Profile");
    this.props.getCurrentUserDetails().then((details) => {
      if (!isEmpty(details)) {
        this.setState({
          freelancerUUID: details.user_profile.freelancer_uuid
        })
        this.props.getProfile(details.user_profile.freelancer_uuid)
          .then((res) => {
            this.setState({ isLoading: false, freelancerDataLoading: false })
          }).catch((err) => {
            this.setState({ isLoading: false, freelancerDataLoading: false })
          })
        this.setState({ profile_uuid: details.user_profile.freelancer_uuid });
      }
    });
    // setInterval(() => this.tick(), 1000);
  }

  setIfAddAndSave = (type) => {
    this.profileEditVisible(type)
    this.setState({ selectedRecord: {} })
  }

  tick = () => {
    this.setState({
      time: new Date().toLocaleString("en-US", {
        hour: "numeric",
        minute: "numeric",
        hour12: true,
      }),
    });
  }

  showAlert = () => {
    const getAlert = () => (
      // <SweetAlert success title="Deleted!" onConfirm={() => this.hideAlert()}>
      //   Record has been deleted successfully.
      // </SweetAlert>
      <SuccessSweetAlert 
      show={true}
      handleConfirm={() => this.hideAlert()}
      message={"Record has been deleted successfully."}
      />
    );
    this.setState({ alert: getAlert() });
  }

  hideAlert = () => {
    this.setState({ alert: null });
  }

  deleteEmployment = (id, event) => {
    event.preventDefault();
    const { profile_uuid } = this.state;
    this.props.deleteEmployment(id, profile_uuid).then((res) => {
      if (res.status === 200) {
        console.log('deleted')
      }
    });
  }

  deleteCertification = (id) => {
    this.setState({ deleteInProgress: true })
    const { profile_uuid } = this.state;
    // console.log('id',id)
    // console.log('profile_uuid',id)

    this.props.deleteCertification(id, profile_uuid).then((res) => {
      if (res.status === 200) {
        this.setState({ deleteInProgress: false })
      }
    });
  }

  deleteEducation = (id, event) => {
    event.preventDefault()
    const { profile_uuid } = this.state;
    this.props.deleteEducation(id, profile_uuid).then((res) => {
      if (res.status === 200) {
        this.showAlert();
      }
    });
  }

  editRecord = (id, type) => {
    // console.log(this, editConfigs);
    let data = this.props.freelancerProfile[editConfigs[type]] || [];
    const record = data.find((record) => record.uuid === id) || {}
    this.setState({ selectedRecord: record });
    this.profileEditVisible(type);
  }

  updateProfile = (data, type) => {
    console.log('updateProfile', data)

    const { profile_uuid } = this.state;
    this.setState({ updateProfileInProgress: true })
    this.props.submitProfileData(profile_uuid, data).then((res) => {
      if (res.status === 200) {
        this.setState({ updateProfileInProgress: false })
        this.props.getProfile(profile_uuid);
        if (type !== 'addNewCertificate') {
          this.profileEditVisible(this.state.editType);
        }
      } else {
        alert("Internal server error");
      }
    });
  }

  profileEditVisible = (type, event) => {
    // console.log('------',type)
    if (event) {
      event.preventDefault();
    }
    const { profileStates } = this.props.profileEditStates;
    let payload = Object.assign({}, profileStates);
    // console.log('payload',payload)
    payload[type] = !payload[type];
    this.setState({ editType: type });
    this.props.modalVisibility(payload);
  }

  addVideo = () => {
    this.setState({ videoModal: true });
  }
  closeVideoModal = () => {
    this.setState({ videoModal: false });
  }

  addUserImg = (e) => {
    let inputUser = document.getElementById("user_Logo");
    inputUser.click();
  }

  handleRateChange = (e) => {
    if (e.target.value === 0) {
      this.setState({
        [e.target.name]: e.target.value,
        [e.target.name + "Error"]: true,
      });
    } else if (e.target.value > 0) {
      this.setState({
        [e.target.name]: e.target.value,
        [e.target.name + "Error"]: false,
        hourly_rate_error: false,
      });
    } else {
      console.log("result");
    }
  }

  handleImage = (e) => {
    const target = e.target.name;
    let file = e.target.files[0];
    if (
      file.type.includes("png") ||
      file.type.includes("jpeg") ||
      file.type.includes("jpg")
    ) {
      let reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = (event) => {
        const data = {
          profile: {
            profile_picture: event.target.result,
          },
        }
        this.updateProfile(data);
        this.setState({
          [target]: event.target.result,
          [target + "Error"]: false,
          [target + "TypeError"]: false,
        });
      }
    } else {
      this.setState({ [target + "TypeError"]: true });
    }
  }

  fieldError(margin, message) {
    return (
      <p id="firstName" className="error-field">
        {message ? message : "This field can't be blank."}
      </p>
    );
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

  onFileChange = (e) => {
    const target = e.target.name;
    let file = e.target.files[0];
    if (
      file.type.includes("png") ||
      file.type.includes("jpeg") ||
      file.type.includes("jpg")
    ) {
      let reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = (event) => {
        const data = {
          profile: {
            profile_cover: event.target.result,
          },
        }
        this.updateProfile(data);
        this.setState({
          [target]: event.target.result,
          [target + "Error"]: false,
          [target + "TypeError"]: false,
        });
      }
    } else {
      this.setState({ [target + "TypeError"]: true });
    }

    this.setState({ profile_cover: e.target.files[0] });

  };

  render() {
    // debugger
    const { freelancerProfile, currentUser } = this.props;
    console.log("under profile : ", freelancerProfile)
    const { selectedRecord, copySuccess, freelancerDataLoading } = this.state;
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
    // console.log("this",this.props.currentUser.account_approved)
    const { profileStates } = this.props.profileEditStates;
    return (
      <div>
        {/* <FreelancerHeader history={this.props.history} /> */}

        <React.Fragment>
          <div className="fp-sl">{this.state.alert}</div>
          {profileStates.editCertification ? (
            <EditCertification
              lgShow={profileStates.editCertification}
              updateProfile={this.updateProfile}
              getData={this.props.getProfile}
              profileUuid={this.state.profile_uuid}
              record={selectedRecord}
              setIfAddAndSave={this.setIfAddAndSave}
              certificationList={freelancerProfile.certifications}
              deleteCertification={this.deleteCertification}
              editRecord={this.editRecord}
              deleteInProgress={this.state.deleteInProgress}
              updateProfileInProgress={this.state.updateProfileInProgress}
              setLgShow={this.profileEditVisible.bind(this, "editCertification")}
            />
          ) : null}

          {profileStates.showCertification ? (
            <ShowCertification
              lgShow={profileStates.showCertification}
              updateProfile={this.updateProfile}
              getData={this.props.getProfile}
              record={selectedRecord}
              profileUuid={this.state.profile_uuid}
              setIfAddAndSave={this.setIfAddAndSave}
              certificationList={freelancerProfile.certifications}
              deleteCertification={this.deleteCertification}
              editRecord={this.editRecord}
              setLgShow={this.profileEditVisible.bind(this, "showCertification")
              }
            />
          ) : null}


          {profileStates.editEmployment ? (
            <EditEmployment
              updateProfile={this.updateProfile}
              getData={this.props.getProfile}
              record={selectedRecord}
              setIfAddAndSave={this.setIfAddAndSave}
              profileUuid={this.state.profile_uuid}
              lgShow={profileStates.editEmployment}
              setLgShow={this.profileEditVisible.bind(this, "editEmployment")}
            />
          ) : null}

          {profileStates.editEducation ? (
            <EditEducation
              updateProfile={this.updateProfile}
              getData={this.props.getProfile}
              record={selectedRecord}
              setIfAddAndSave={this.setIfAddAndSave}
              profileUuid={this.state.profile_uuid}
              lgShow={profileStates.editEducation}
              setLgShow={this.profileEditVisible.bind(this, "editEducation")}
            />
          ) : null}

          {profileStates.editHourlyRate ? (
            <EditHourlyRate
              value={freelancerProfile.hourly_rate}
              lgShow={profileStates.editHourlyRate}
              updateProfile={this.updateProfile}
              setLgShow={this.profileEditVisible.bind(this, "editHourlyRate")}
            />
          ) : null}

          {profileStates.editDesc ? (
            <EditOverview
              value={freelancerProfile.about_me}
              lgShow={profileStates.editDesc}
              updateProfile={this.updateProfile}
              setLgShow={this.profileEditVisible.bind(this, "editDesc")}
            />
          ) : null}

          {profileStates.editTitle ? (
            <EditTitle
              value={freelancerProfile.current_job_title}
              lgShow={profileStates.editTitle}
              updateProfile={this.updateProfile}
              setLgShow={this.profileEditVisible.bind(this, "editTitle")}
            />
          ) : null}

          {profileStates.editAvailability ? (
            <EditAvailability
              value={freelancerProfile.availability}
              lgShow={profileStates.editAvailability}
              updateProfile={this.updateProfile}
              setLgShow={this.profileEditVisible.bind(this, "editAvailability")}
            />
          ) : null}

          {this.props.currentUser.account_approved ? (
            <EditVisibility
              value={freelancerProfile.visibility}
              lgShow={profileStates.editVisibility}
              updateProfile={this.updateProfile}
              setLgShow={this.profileEditVisible.bind(this, "editVisibility")}
            />
          ) : null}

          {profileStates.editLanguages ? (
            <EditLanguages
              value={freelancerProfile.english_proficiency}
              lgShow={profileStates.editLanguages}
              updateProfile={this.updateProfile}
              setLgShow={this.profileEditVisible.bind(this, "editLanguages")}
            />
          ) : null}

          {profileStates.editSkill ? (
            <EditSkills
              value={freelancerProfile.skill}
              lgShow={profileStates.editSkill}
              category={freelancerProfile.category}
              updateProfile={this.updateProfile}
              setLgShow={this.profileEditVisible.bind(this, "editSkill")}
            />
          ) : null}

          {profileStates.editCategory ? (
            <EditCategory
              value={freelancerProfile.category}
              lgShow={profileStates.editCategory}
              updateProfile={this.updateProfile}
              setLgShow={this.profileEditVisible.bind(this, "editCategory")}
            />
          ) : null}

          {profileStates.editProfilePic ? (
            <EditProfilePic
              value={currentUser.profile_picture}
              lgShow={profileStates.editProfilePic}
              updateProfile={this.updateProfile}
              profilePic={freelancerProfile.profile_picture_base64}
              setLgShow={this.profileEditVisible.bind(this, "editProfilePic")}
            />
          ) : null}
          <AddVideo
            value={freelancerProfile.current_job_title}
            lgShow={this.state.videoModal}
            close={this.closeVideoModal}
          />
          <div className="" id="">
            <div className={""} id="project-manager-dashboard-container-">
              <div className="">
                <div className="row">
                  <div className="col-lg-12 p-0 mt-20">
                    <div className="pro-right-content-area">
                      <div className="tf_pad_res freelancer_profile_new">
                        {
                          freelancerDataLoading ? (
                            <div className="grid-loader">
                              <Loader type="Grid" color="#00BFFF" height={100} width={100} />
                            </div>
                          ) : (
                            <div className="">
                              <div className="col-lg-9 col-md-8">
                                <div className="">
                                  <div className="tf_freelancer_pro profile_details_section">
                                    <div className="col-lg-2 col-md-2 col-sm-2 col-xs-2">
                                      <div className="tf_image profile_avatar_img">
                                        {freelancerProfile &&
                                          freelancerProfile.profile_picture ? (
                                          <Avatar
                                            src={freelancerProfile.profile_picture}
                                            size="auto"
                                          />
                                        ) : (
                                          <Avatar src={faceImg} size="auto" />
                                        )}

                                        <div className="tf_edit">
                                          <input
                                            type="file"
                                            onChange={this.handleImage}
                                            name="userImg"
                                            id="user_Logo"
                                          />
                                          {this.state.userImgTypeError &&
                                            this.fieldError(
                                              "You must upload an image in the given format."
                                            )}
                                        </div>
                                      </div>
                                    </div>
                                    {/* Profile image section end */}



                                    <div className="col-lg-10 col-md-10 col-sm-10 col-xs-10">
                                      <div className="tf_free_name m-0">
                                        <h3 className="m-0">
                                          {freelancerProfile && freelancerProfile.name}{" "}
                                          {freelancerProfile.is_certified && (
                                            <img title="Certification Required" src={certification_required} alt="Certified" className="certification-required" />
                                          )}
                                        </h3>
                                      </div>
                                      {/* Name End */}

                                      <div className="ce-job-title">
                                        <h5>
                                          {freelancerProfile.current_job_title}
                                          <Link to={"#"}>
                                            <img
                                              src={outlineEdit}
                                              onClick={this.profileEditVisible.bind(
                                                this,
                                                "editTitle"
                                              )}
                                              alt="edit"
                                            />
                                          </Link>
                                          <span className="job_hour-btn">
                                            Full time
                                          </span>
                                        </h5>
                                      </div>
                                      {/* job Title End */}

                                      <div className="tf_f_content mt-20">
                                        <h5 className="d-flex">
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
                                                        marginRight: "8px",
                                                        float: 'none',
                                                      }}
                                                      title={code && code.value}
                                                    />
                                                    {` ${freelancerProfile.current_location_city}`},
                                                    {freelancerProfile.current_location_country}
                                                  </strong>
                                                </span>
                                              </li>
                                            </ul>
                                          </span>
                                        </h5>
                                      </div>

                                      <div className="proposal_box">
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
                                            </strong> <span>(Per Hour)</span>
                                            <Link
                                              to={"#"}
                                              onClick={this.profileEditVisible.bind(
                                                this,
                                                "editHourlyRate"
                                              )}
                                              className="curserPointer pull-right"
                                            >
                                              <img src={outlineEdit} alt="edit" className="edit-ce-hourly-rate m-0" />
                                            </Link>
                                          </h3>
                                        ) : (
                                          ""
                                        )}
                                      </div>
                                      {/* Location End */}

                                    </div>

                                    <div className="col-md-12 overview-text profile_overview_text">


                                    </div>



                                  </div>
                                </div>
                                {/* <div className="margin-tops tf_freelancer_pro profile_details_section">
                              <div className="col-md-12">
                                <h2 className="category">Overview</h2>
                                <div className="read-more-sec">
                                    <ReadMoreAndLess
                                      ref={this.ReadMore}
                                      className="read-more-content"
                                      charLimit={450}
                                      readMoreText="Read more"
                                      readLessText="Read less"
                                    >
                                      {freelancerProfile.about_me
                                        ? freelancerProfile.about_me
                                        : "test"}
                                    </ReadMoreAndLess>
                                    <img
                                      src={outlineEdit}
                                      onClick={this.profileEditVisible.bind(
                                        this,
                                        "editDesc"
                                      )}
                                      alt="edit"
                                    />
                                  </div>
                              </div>
                            </div> */}
                                <div className="margin-tops">
                                  <div className="tf_freelancer_pro tf_feedback category_height_section">
                                    <div className="col-md-12">
                                      {/* <div className="col-md-10"> */}
                                      <h2 className="category">
                                        Overview
                                        <Link
                                          to={"#"}
                                          onClick={this.profileEditVisible.bind(
                                            this,
                                            "editDesc"
                                          )}
                                          className="edit-icon-skills"
                                        >
                                          <img
                                            src={outlineEdit}
                                            onClick={this.profileEditVisible.bind(
                                              this,
                                              "editDesc"
                                            )}
                                            alt="edit"
                                          />
                                        </Link>

                                      </h2>
                                      {/* </div> */}
                                      {/* <div className="col-md-2">
                                  
                                    </div> */}
                                    </div>
                                    <div className="clearfix"></div>
                                    <div className="category_hr">
                                      <hr />
                                    </div>
                                    <div className="col-md-12 aws_services">
                                      <div className="read-more-sec pt-1 pb-2 tf_skills">
                                        <ReadMoreAndLess
                                          ref={this.ReadMore}
                                          className="read-more-content"
                                          charLimit={450}
                                          readMoreText="Read more"
                                          readLessText="Read less"
                                        >
                                          {freelancerProfile.about_me
                                            ? freelancerProfile.about_me
                                            : "test"}
                                        </ReadMoreAndLess>

                                      </div>
                                    </div>
                                  </div>
                                </div>
                                <div className="margin-tops">
                                  <div className="tf_freelancer_pro tf_feedback category_height_section">
                                    <div className="col-md-12">
                                      <h2 className="category">
                                        Platforms
                                        <Link
                                          to={"#"}
                                          onClick={this.profileEditVisible.bind(
                                            this,
                                            "editCategory"
                                          )}
                                          className="edit-icon-skills"
                                        >
                                          <img src={outlineEdit} alt="edit" />
                                        </Link>
                                      </h2>
                                    </div>
                                    <div className="clearfix"></div>
                                    <div className="category_hr">
                                      <hr />
                                    </div>
                                    <div className="col-md-12 aws_services">
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
                                <div className="clearfix"></div>

                                <div className="margin-tops skils_sets skills_model_edit">
                                  <div className="tf_freelancer_pro tf_feedback skill_height_section">
                                    <div className="col-md-12">
                                      <h2 className="skills_expertise">
                                        Tech Stack
                                        <Link
                                          to={"#"}
                                          onClick={this.profileEditVisible.bind(
                                            this,
                                            "editSkill"
                                          )}
                                          className="edit-icon-skills"
                                        >
                                          <img src={outlineEdit} alt="edit" />
                                        </Link>
                                      </h2>
                                    </div>
                                    <div className="clearfix"></div>
                                    <hr />
                                    <div className="col-md-12">
                                      {freelancerProfile.skill &&
                                        <Skills
                                          skill={freelancerProfile.skill}
                                          to="#"
                                          id={0}
                                          displayCount={freelancerProfile.skill.length}
                                        />
                                      }
                                    </div>
                                  </div>
                                </div>
                                <div className="clearfix"></div>

                                <div className="margin-tops">
                                  <div className="tf_freelancer_pro tf_feedback">
                                    <div className="col-md-12 ">
                                      <h2 className="">
                                        Portfolio{" "}
                                        <Link
                                          to={"#"}
                                          onClick={this.profileEditVisible.bind(
                                            this,
                                            "editEmployment"
                                          )}
                                          className="plus-icon-new"
                                        >
                                          +
                                        </Link>
                                      </h2>
                                    </div>
                                    <div className="clearfix"></div>
                                    <hr />
                                    <div className="col-md-12 employment_history">
                                      {freelancerProfile.employments ? (
                                        freelancerProfile.employments.map((record, idx) => {
                                          return (
                                            <div className="tf_employe1" key={record.id}>
                                              <h5>
                                                {record.role} | {record.company_name}
                                                <Link to={"#"} className="pull-right">
                                                  <img
                                                    onClick={this.deleteEmployment.bind(
                                                      this,
                                                      record.uuid
                                                    )}
                                                    src={outlineDelete}
                                                    alt=""
                                                  />
                                                  <img
                                                    onClick={this.editRecord.bind(
                                                      this,
                                                      record.uuid,
                                                      "editEmployment"
                                                    )}
                                                    src={outlineEdit}
                                                    alt="edit"
                                                  />{" "}
                                                </Link>
                                              </h5>
                                              <p className="text-secondary">
                                                {record.period_month_from}{" "}
                                                {record.period_year_from}{" "}
                                                {record.period_month_to}{" "}
                                                {record.period_year_to}
                                              </p>
                                              <div className="clearfix"></div>
                                              <hr />
                                            </div>
                                          );
                                        })
                                      ) : (
                                        <p className="text-center">No items to display.</p>
                                      )}
                                    </div>
                                  </div>
                                </div>
                                <div className="clearfix"></div>

                                <div className="margin-tops">
                                  <div className="tf_freelancer_pro tf_feedback">
                                    <div className="col-md-12 ">
                                      <h2 className="">
                                        Education{" "}
                                        <Link
                                          to={"#"}
                                          onClick={this.profileEditVisible.bind(
                                            this,
                                            "editEducation"
                                          )}
                                          className="plus-icon-new"
                                        >
                                          +
                                        </Link>
                                      </h2>
                                    </div>
                                    <div className="clearfix"></div>
                                    <hr />
                                    <div className="col-md-12 education_profile">
                                      {freelancerProfile.educations ? (
                                        freelancerProfile.educations.map((record, idx) => {
                                          return (
                                            <div key={idx} className="tf_employe1">
                                              <h5>
                                                {record.degree} | {record.school}
                                                <Link to={"#"} className="pull-right">
                                                  <img
                                                    src={outlineDelete}
                                                    onClick={this.deleteEducation.bind(
                                                      this,
                                                      record.uuid
                                                    )}
                                                    alt=""
                                                  />
                                                  <img
                                                    src={outlineEdit}
                                                    onClick={this.editRecord.bind(
                                                      this,
                                                      record.uuid,
                                                      "editEducation"
                                                    )}
                                                    alt="edit"
                                                  />
                                                </Link>
                                              </h5>
                                              <p>
                                                {getFormattedDate(record.from_date)} -{" "}
                                                {getFormattedDate(record.to_date)}
                                              </p>
                                              <hr />
                                            </div>
                                          );
                                        })
                                      ) : (
                                        <p className="text-center">No items to display.</p>
                                      )}
                                    </div>
                                  </div>
                                </div>
                                <div className="clearfix"></div>
                              </div>


                              <div className="col-lg-3 col-md-4 freelancer_profile_box">
                                {/* <div className="tf_freelancer_pro_right margin-tops">
                              <Link
                                to={"#"}
                                onClick={() => {
                                  this.props.history.push({
                                    pathname: "/auth-question/profile-settings",
                                    state: "freelancerprofile",
                                  });
                                }}
                                className="tf_short_button1"
                              >
                                Profile Settings
                              </Link>
                            </div> */}

                                <div className="clearfix"></div>

                                <div className="tf_freelancer_pro_right margin-tops m-0">
                                  <h5>
                                    Availability
                                    <Link
                                      to={"#"}
                                      onClick={this.profileEditVisible.bind(
                                        this,
                                        "editAvailability"
                                      )}
                                    >
                                      <img src={outlineEdit} alt="edit" />
                                    </Link>
                                  </h5>
                                  <hr className="custom_hr_right-sidebar" />
                                  <p>
                                    {freelancerProfile && freelancerProfile.availability}
                                  </p>
                                </div>
                                <div className="clearfix"></div>

                                <div className="tf_freelancer_pro_right margin-tops">
                                  <h5>
                                    Visibility
                                    <Link
                                      to={"#"}
                                      onClick={this.props.currentUser.account_approved ? this.profileEditVisible.bind(
                                        this,
                                        "editVisibility"
                                      ) : ''}
                                      className={this.props.currentUser.account_approved ? "" : "edit_pencil_disabled"}
                                    >
                                      <img src={outlineEdit} alt="edit" title={this.props.currentUser.account_approved ? "" : "Approval Pending"} />
                                    </Link>
                                  </h5>
                                  <hr className="custom_hr_right-sidebar" />
                                  <p>
                                    {freelancerProfile && freelancerProfile.visibility}
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
                                      defaultValue={freelancerProfile.profile_link || "a"}
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
                                  <h5>
                                    Language Proficiency
                                    <Link
                                      to={"#"}
                                      onClick={this.profileEditVisible.bind(
                                        this,
                                        "editLanguages"
                                      )}
                                    >
                                      <img src={outlineEdit} alt="edit" />
                                    </Link>
                                  </h5>
                                  <hr className="custom_hr_right-sidebar" />
                                  <p> {freelancerProfile.english_proficiency}</p>
                                </div>

                                <div className="tf_freelancer_pro_right margin-tops">
                                  <h5>
                                    Certifications
                                    <Link
                                      to={"#"}
                                      onClick={this.profileEditVisible.bind(
                                        this,
                                        "editCertification"
                                      )}
                                    >
                                      <img src={outlineEdit} alt="edit" title="handle certificates" />
                                    </Link>
                                  </h5>
                                  <hr className="custom_hr_right-sidebar" />

                                  <div style={{ marginLeft: '0px' }}>
                                    {freelancerProfile.certifications && freelancerProfile.certifications[0] ? (
                                      <p>
                                        {freelancerProfile.certifications[0].certification_name}
                                      </p>
                                    ) :
                                      <p className="text-center">No items to display.</p>
                                    }
                                  </div>
                                  <div className="text-center">
                                    <button
                                      className="btn mt-10"
                                      style={{
                                        opacity: '1',
                                        padding: '10px 25px',
                                        borderRadius: '5px',
                                        fontSize: '12px',
                                        background: 'rgb(13, 164, 222)',
                                        color: 'rgba(255, 255, 255, 0.97)',
                                        fontWeight: 600,
                                        border: 'none',
                                        position: 'relative',
                                        boxShadow: "0px 3px 10px rgb(13, 164, 222)"
                                      }}
                                      onClick={this.profileEditVisible.bind(this, "showCertification")}>
                                      Show All Certificates
                                    </button>
                                  </div>
                                  <hr className="custom_hr_right-sidebar" />
                                </div>
                                <div className="clearfix"></div>
                              </div>
                            </div>
                          )
                        }
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              {/* Container End */}
            </div>
          </div>


          {/* <Footer /> */}
        </React.Fragment>
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
    deleteEducation: (id, profileId) =>
      dispatch(deleteProfileEducation(id, profileId)),
    deleteCertification: (id, profileId) =>
      dispatch(deleteProfileCertification(id, profileId)),
    getProfile: (id) => dispatch(getProfileForFreelancer(id)),
    submitProfileData: (id, data) => dispatch(createProfileAction(id, data)),
    modalVisibility: (payload) => dispatch(profileEditModal(payload)),
    getCurrentUserDetails: () => dispatch(getCurrentUserDetails()),
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(FreelancerProfile);
