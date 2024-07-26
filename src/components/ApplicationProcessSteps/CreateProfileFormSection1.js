import React, { Component } from "react";
import UserImage from "../../static/images/user.svg";
import Footer from "../miscellaneous/Footer";
import { logOutAction } from "../../Actions/logOutAction";
import { connect } from "react-redux";
import countryList from "react-select-country-list";
import { CountryDropdown } from "react-country-region-selector";
import "react-tagsinput/react-tagsinput.css";
import _ from "lodash";
import { addAppProcessStep1 } from "../../Actions/appProcessStepsActions";
import { getUserRedirection } from "../../utills/formatting";
import { getCurrentUserDetails } from "../../Actions/applicationActions";
// import { getOtherFreelancers } from "../../Actions/freelancerActions";
import AppProcessHeader from "../miscellaneous/AppProcessHeader";
import Dropzone from "react-dropzone";
import { Link } from "react-router-dom";
import closeIcon from "../../static/images/close-icon.png";
import csc from "country-state-city";
import LANGUAGES from "../../constants/languages";
import fileLogo from "../../static/images/file.png";
import {
  addAppProcessStep2,
  submitAppForCall,
} from "../../Actions/appProcessStepsActions";
import "react-datepicker/dist/react-datepicker.css";
import Loader from "react-loader-spinner";
import CreateProfileFormSection2 from "./CreateProfileFormSection2";
import CreateProfileFormSection3 from "./CreateProfileFormSection3";
import CreateProfileFormSection4 from "./CreateProfileFormSection4";
import CreateProfileFormSection5 from "./CreateProfileFormSection5";
import CreateProfileFormSection6 from "./CreateProfileFormSection6";


const allLanguages = LANGUAGES

class CreateProfileFormSection1 extends Component {
  constructor(props, context) {
    super(props, context);
    this.citizenshipName = !_.isEmpty(props.currentUser)
      ? `${props.currentUser.first_name} ${props.currentUser.last_name}`
      : "";
    this.countries = countryList().getData();
    this.countryRef = React.createRef();
    let { appProcessStep1 } = props.appProcessSteps;
    const current_location_country = appProcessStep1.current_location_country
      ? appProcessStep1.current_location_country
      : !_.isEmpty(props.currentUser)
        ? `${props.currentUser.country}`
        : "United States";
    const countryId = appProcessStep1.countryId
      ? appProcessStep1.countryId
      : !_.isEmpty(props.currentUser)
        ? `${props.currentUser.country_id}`
        : "231";

    this.state = {
      current_company_name: "",
      current_job_title: "",
      about_me: "",
      current_company_name_error: false,
      current_job_title_error: false,
      about_me_error: false,
      profile_picture: "",
      profile_picture_name: "",
      resume_name: "",
      resume: "",
      current_location_country: current_location_country,
      countryId: countryId,
      state:
        appProcessStep1 && appProcessStep1.state
          ? appProcessStep1.state
          : "Alabama",
      stateId:
        appProcessStep1 && appProcessStep1.stateId
          ? appProcessStep1.stateId
          : "3919",
      current_location_city:
        appProcessStep1 && appProcessStep1.current_location_city
          ? appProcessStep1.current_location_city
          : "Anchorage",
      citizenship_country: current_location_country,
      skill: [],
      citizenship_full_name: this.citizenshipName,
      profile_picture_error: false,
      resume_error: false,
      citizenship_country_error: false,
      current_location_city_error: false,
      current_location_country_error: false,
      citizenship_full_name_error: false,
      profile_picture_type_error: false,
      english_proficiency: "English",
      isResumeTypeImage: false,
      resume_type_error: false,
      AddedCertificates: [],
      jobCategory_error: false,
      profileType: "Individual",
      english_proficiency_error: false,
      showStep2: false,
      showStep3: false,
      showStep4: false,
      showStep5: false,
      showStep6: false,
      userDetails: {},
      working_hours_talfoundry: "",
      start_date: new Date(),
      activeStep: "step1",
      jobCategory_api: [],
      showSubmitButton: false,
      hoursAvailable: "",
      hourlyRate: "",
      educationalDetails: [],
      otherUsers: [],
      employmentDetails: [],
      certificationDetails: [],
      sidePosition: 200
    }
    this.handleContinue = this.handleContinue.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.selectCitizenship = this.selectCitizenship.bind(this);
    this.allCountries = csc.getAllCountries();
    this.ScrollRef = React.createRef()
  }

  componentDidMount() {

    window.addEventListener('scroll', this.handleScroll);

    let getStartedClicked =
      this.props.location &&
      this.props.location.state &&
      this.props.location.state.getStartedClicked;
    this.props.getCurrentUserDetails().then((details) => {
      const { hasRedirection, path } = getUserRedirection(details);
      this.setState({ userDetails: details });

      if (!getStartedClicked) {
        if (hasRedirection && !getStartedClicked) {
          this.props.history.push(path);
        }
      }
    });

    // this.props
    //   .getOtherFreelancers()
    //   .then((res) => {
    //     this.setState({ otherUsers: res.data });
    //   })
    //   .catch((err) => {
    //     console.log("res================", err);
    //   });
    this.setState(this.props.appProcessSteps.appProcessStep1);
  }

  UNSAFE_componentWillReceiveProps(nextProps) {
    let { appProcessStep1 } = nextProps.appProcessSteps;
    const current_location_country = appProcessStep1.current_location_country
      ? this.state.current_location_country ||
      appProcessStep1.current_location_country
      : !_.isEmpty(nextProps.currentUserDetails) &&
      nextProps.currentUserDetails.country;
    const countryId = appProcessStep1.countryId
      ? this.state.countryId || appProcessStep1.countryId
      : !_.isEmpty(nextProps.currentUserDetails) &&
      `${nextProps.currentUserDetails.country_id}`;
    this.setState({
      current_location_country: current_location_country,
      countryId: countryId,
    });
  }

  handleProfilePicDrop = (files) => {
    const target = "profile_picture";
    let file = files[0];
    let fileName = files[0].name;
    if (
      file.type.includes("png") ||
      file.type.includes("jpeg") ||
      file.type.includes("jpg")
    ) {
      let reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = (event) => {
        this.setState({
          [target]: event.target.result,
          [target + "_error"]: false,
          profile_picture_name: fileName,
          profile_picture_type_error: false,
        });
      }
    } else {
      this.setState({ profile_picture_type_error: true });
    }
  }

  handleResumeDrop = (files) => {
    const target = "resume";
    let file = files[0];
    let fileName = files[0].name;
    let isResumeTypeImage = file.type.includes("image");
    if (
      fileName.includes(".png") ||
      fileName.includes(".jpeg") ||
      fileName.includes(".jpg") ||
      fileName.includes(".txt") ||
      fileName.includes(".odt") ||
      fileName.includes(".pdf") ||
      fileName.includes(".doc") ||
      fileName.includes(".msword")
    ) {
      let reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = (event) => {
        this.setState({
          [target]: event.target.result,
          [target + "_error"]: false,
          resume_name: fileName,
          resume_type_error: false,
          isResumeTypeImage: isResumeTypeImage,
        });
      }
    } else {
      this.setState({ resume_type_error: true });
    }
  }

  fieldError(message) {
    return (
      <p id="firstName" className="error-field">
        {message ? message : "This field can't be blank."}
      </p>
    );
  }

  handleContinue(step) {
    const {
      resume,
      citizenship_country,
      current_location_city,
      current_location_country,
      citizenship_full_name,
      jobCategory_api,
      about_me,
      current_job_title,
      english_proficiency,
      showStep2
    } = this.state;
    let words = (about_me.match(/\S+/g) || []).length;

    if (!showStep2) {
      this.setState(
        {
          resume_error: resume === "",
          citizenship_country_error: citizenship_country === "",
          current_location_city_error: current_location_city === "",
          current_location_country_error: current_location_country === "",
          citizenship_full_name_error: citizenship_full_name === "",
          jobCategory_error: _.isEmpty(jobCategory_api),
          current_job_title_error: current_job_title === "" && true,
          about_me_error: words < 50 || words > 500,
          english_proficiency_error: english_proficiency === "",
        },
        () => {
          if (
            resume !== "" &&
            citizenship_country !== "" &&
            current_location_city !== "" &&
            current_location_country !== "" &&
            citizenship_full_name !== "" &&
            current_job_title !== "" &&
            english_proficiency !== "" &&
            (words > 25 || words < 500)
          ) {

            this.setState({ showStep2: true });
            this.scrollToMyRef("step2");
          }
        }
      );
    } else if (step === "step3") {
      this.scrollToMyRef("step3");
      this.setState({ showStep3: true , activeStep :"step3"});
    } else if (step === "step4") {
      this.scrollToMyRef("step4");
      this.setState({ showStep4: true });
    } else if (step === "step5") {
      this.scrollToMyRef("step5");
      this.setState({ showStep5: true });
    } else if (step === "step6") {
      this.scrollToMyRef("step6");
      this.setState({ showStep6: true, showSubmitButton: true });
    }

  }

  handleChange(e) {
    this.setState({
      [e.target.name]: e.target.value,
      [e.target.name + "_error"]: false,
    });
  }

  selectCitizenship(val) {
    this.setState({
      citizenship_country: val,
      citizenship_country_error: false,
    });
  }

  selectCurrentCountry = (e) => {
    let countryId = e.target.options[e.target.selectedIndex].id;
    const state = csc.getStatesOfCountry(countryId)[0];
    const city = csc.getCitiesOfState(state.id)[0];
    this.setState({
      current_location_country: e.target.value,
      countryId: countryId,
      current_location_country_error: false,
      current_location_city_error: false,
      state: state.name,
      stateId: state.id,
      current_location_city: city ? city.name : state.name,
    });
  }

  selectCurrentState = (e) => {
    let stateId = e.target.options[e.target.selectedIndex].id;
    const city = csc.getCitiesOfState(stateId)[0];
    const cityName = city ? city.name : "";

    this.setState({
      state: e.target.value,
      stateId: stateId,
      current_location_city_error: cityName ? false : true,
      current_location_city: cityName,
    });
  }

  selectCurrentCity = (e) => {
    this.setState({
      current_location_city: e.target.value,
      current_location_city_error: false,
    });
  }

  removeAttachment = (e) => {
    if (e.target.id === "profile_picture") {
      this.setState({ profile_picture: "", profile_picture_name: "" });
    } else {
      this.setState({ resume: "", resume_name: "" });
    }
  }

  renderOtherUsers = () => {
    const { otherUsers } = this.state;
    let allUsers = [];

    otherUsers.map((user) => {
      allUsers.push(
        <div className="tf_abt_slt">
          <img
            className="sidebar-freelancer-image"
            src={user.user_profile.freelancer_image || UserImage}
            alt="ellipse"
          />
          <h5>
            {user.first_name} {user.last_name}
          </h5>
          <p>{user.current_job_title}</p>
        </div>
      );
      return user
    });
    return <React.Fragment>{allUsers}</React.Fragment>;
  }

  setData = (key, value) => {
    this.setState({ [key]: value });
  }

  setJobCategory = (category) => {
    this.setState({ jobCategory_api: category });
  }

  setSkill = (skills) => {
    this.setState({ skill: skills });
  }

  setEverWorked = (val) => {
    this.setState({ worked_as_freelancer: val });
  }

  setYearsOfExp = (val) => {
    this.setState({ working_hours_talfoundry: val });
  }

  setSkypeName = (val) => {
    this.setState({ skype_user_name: val });
  }

  setLinkedinProfile = (val) => {
    this.setState({ linkedin_profile: val });
  }

  setStartDate = (val) => {
    this.setState({ start_date: val });
  }

  setExperience = (val) => {
    this.setState({ experience: val });
  }

  handleScroll = (event) => {
    if (document.documentElement.scrollTop < 0) {
      this.setState({ sidePosition: 200 })
    }
    if (document.documentElement.scrollTop > 200) {
      console.log('222')
      this.setState({ sidePosition: 100 })
    }
    else {
      this.setState({ sidePosition: 200 })
    }
  }

  handleSideBarClick = (step) => {
    this.setState({
      activeStep: step,
    })
    this.scrollToMyRef(step)
  }

  scrollToMyRef = (refe) => {
    console.log(this.ScrollRef.current?.offsetTop , "this.ScrollRef.current.offsetTop");
    let { employmentDetails } = this.state
    let projectHeight = 0
    projectHeight = employmentDetails ? (employmentDetails.length * 80) : 0
    // console.log(employmentDetails, "projectHeight", projectHeight)
    this.setState({ activeStep: refe }, () => {
      let offsetToScroll;
      if (refe === "step1") {
        offsetToScroll = 0;
      } else if (refe === "step2") {
        offsetToScroll = 1220;
      } else if (refe === "step3") {
        offsetToScroll = 1650;
      } else if (refe === "step4") {
        offsetToScroll = 2110;
      } else if (refe === "step5") {
        offsetToScroll = 2430;
      }
      else if (refe === "step6") {
        offsetToScroll = 3210 + projectHeight;
      }
      window.scrollTo(0, offsetToScroll);
    });
  }

  handleSubmit = () => {
    let {
      hourlyRate,
      hoursAvailable,
      educationalDetails,
      employmentDetails,
      certificationDetails,
      current_location_country,
      english_proficiency,
      linkedin_profile,
      profile_picture,
      resume,
      skill,
      current_job_title,
      current_company_name,
      worked_as_freelancer,
      start_date,
      working_hours_talfoundry,
      profileType,
      citizenship_full_name,
      experience,
      about_me,
      jobCategory_api,
      current_location_city,
      skype_user_name,
      citizenship_country
    } = this.state;

    let that = this;

    const data = {
      profile: {
        hourly_rate: hourlyRate,
        availability: hoursAvailable,
        educations_attributes: educationalDetails,
        employments_attributes: employmentDetails,
        certifications_attributes: certificationDetails,
        citizenship_full_name: citizenship_full_name,
        current_location_city: current_location_city,
        current_location_country: current_location_country,
        english_proficiency: english_proficiency,
        development_experience: experience,
        citizenship_country: citizenship_country,
        linkedin_profile: linkedin_profile,
        profile_picture: profile_picture,
        resume: resume,
        skill: (skill || []).join(", "),
        category: (jobCategory_api || []).join(", "),
        skype_user_name: skype_user_name,
        current_company_name: current_company_name,
        current_job_title: current_job_title,
        about_me: about_me,
        search_engine_privacy: "Show only my first name and last initial",
        worked_as_freelancer: worked_as_freelancer,
        start_date: start_date,
        working_hours_talfoundry: working_hours_talfoundry,
        profile_type: profileType,
      },
    }

    this.props.createProfileApi(data).then((res) => {
      if (res.status === 200) {
        that.props.history.push({
          pathname: "/freelancer-success",
          state: { Profile_created: true },
        });
      } else {
        alert("Internal server error");
      }
    });
  }

  render() {
    const {
      current_location_country,
      current_location_city,
      citizenship_country,
      citizenship_full_name,
      profile_picture,
      resume,
      profile_picture_error,
      resume_error,
      current_location_country_error,
      current_location_city_error,
      citizenship_country_error,
      state,
      citizenship_full_name_error,
      profile_picture_type_error,
      profile_picture_name,
      resume_name,
      isResumeTypeImage,
      resume_type_error,
      current_company_name,
      current_company_name_error,
      current_job_title,
      current_job_title_error,
      about_me,
      about_me_error,
      english_proficiency,
      english_proficiency_error,
      showStep2,
      showStep3,
      showStep4,
      showStep5,
      showStep6,
      showSubmitButton,
    } = this.state;

    const { applicationIsLoading } = this.props;

    const jobAttachment = (file) => {
      return file && file.url
        ? file.url.split("/")[file.url.split("/").length - 1]
        : "";
    }
    const allStates = csc.getStatesOfCountry(this.state.countryId);
    const allCities = csc.getCitiesOfState(this.state.stateId);

    const languages = allLanguages.map((lang) => (
      <option selected={lang === english_proficiency}>{lang}</option>
    ));
    // console.log("this--->>",this.state)
    return (
      <div>
        {this.props.isAuthenticated ? (
          // wraper Start
          <div className="wraper">
            <div className="ce-create-profile-at-signup">
              <AppProcessHeader history={this.props.history} />
              {applicationIsLoading ? (
                <div className="grid-loader my-feed-loader col-md-12">
                  <Loader type="Grid" color="#00BFFF" height={100} width={100} />
                </div>
              ) : (
                // create-profile-ce Start

                <React.Fragment>
                  <div className="cloud-expert-create-profile-progress-bar createProfileFormBody">
                  </div>

                  <div className="tf_tell create-profile-ce">
                    {/* Container Start */}
                    <div className="row custom_row">
                      <div className="col-md-10">
                      

                        {/* tf_profile Start */}
                        <div className="col-md-12">
                          <p className="mn_ex" style={{marginTop : "13px"  , fontSize: "25px"} }>
                        <strong>Application	Process</strong>
                        </p>
                        </div>
                        <div className="col-md-12">
                          
                        <div>
                        <div className="tf_profile">
                          {/* Form Data Start */}
                          <div className="col-md-8">
                            <h4 className="ce-profile-section-heading">Profile Title</h4>
                           
                          </div>
                          {/* <div className="col-md-6">
                          <p  className="ce-profile-section-heading "></p>
                          </div> */}
                          <div className="clearfix"></div>
                          <hr />

                          <div className="col-md-12">
                            <div className="mn_ex">
                              <div className="col-md-12 every-section-light-blue-color">
                                {/* Radio Button Start */}
                                <div className="tf-custom-radio">
                                  <p>
                                    <label>I am*</label>
                                  </p>

                                  <label className="tf-label-radio">
                                    An Individual
                                    <input
                                      type="radio"
                                      name="profileType"
                                      id="sizeSmall"
                                      value="Individual"
                                      checked={
                                        this.state.profileType === "Individual"
                                      }
                                      onChange={this.handleChange}
                                    />
                                    <span className="checkmark"></span>
                                  </label>

                                  <label className="tf-label-radio">
                                    A Company
                                    <input
                                      type="radio"
                                      name="profileType"
                                      id="sizeMed"
                                      value="Company"
                                      checked={this.state.profileType === "Company"}
                                      onChange={this.handleChange}
                                    />
                                    <span className="checkmark"></span>
                                  </label>
                                </div>
                                {/* Radio Button End */}
                              </div>

                              <div className="col-md-12 every-section-light-blue-color">
                                <div className="form-group ">
                                  <div className="clearfix"></div>
                                  <div className="col-md-6 nopad">
                                    <label>Name/Company</label>
                                    <div className="input-group tf_loca">
                                      <input
                                        type="Full Name"
                                        className="form-control mn_input"
                                        name="current_company_name"
                                        style={{
                                          fontSize: "14px",
                                          height: "45px",
                                        }}
                                        placeholder="Name of the Company you currently work for."
                                        onChange={this.handleChange}
                                        value={current_company_name}
                                      />
                                      {current_company_name_error &&
                                        this.fieldError()}
                                    </div>
                                  </div>
                                  <div className="col-md-6 nopad-right">
                                    <label>Contact Name </label>
                                    <div className="input-group tf_loca">
                                      <input
                                        type="Full Name"
                                        style={{
                                          fontSize: "14px",
                                          height: "45px",
                                        }}
                                        className="form-control mn_input"
                                        name="citizenship_full_name"
                                        placeholder="Full Name"
                                        value={citizenship_full_name}
                                        onChange={this.handleChange}
                                      />
                                      {citizenship_full_name_error &&
                                        this.fieldError()}
                                    </div>
                                  </div>
                                </div>
                              </div>

                              <div className="col-md-12 every-section-light-blue-color">
                                <div className="form-group">
                                  <label>Current Title*</label>
                                  <div className="clearfix"></div>
                                  <div className="col-md-12 nopad">
                                    <div className="input-group tf_loca">
                                      <input
                                        type="Full Name"
                                        style={{
                                          fontSize: "14px",
                                          height: "45px",
                                        }}
                                        className="form-control mn_input"
                                        name="current_job_title"
                                        placeholder="Your current job title"
                                        onChange={this.handleChange}
                                        value={current_job_title}
                                      />
                                      {current_job_title_error && this.fieldError()}
                                    </div>
                                  </div>
                                </div>
                              </div>

                              <div className="col-md-12 every-section-light-blue-color">
                                <div className="form-group">
                                  <label>About Me*</label>
                                  <div className="clearfix"></div>
                                  <div className="col-md-12 nopad">
                                    <div className="input-group tf_loca">
                                      <textarea
                                        className="form-control mn_input tf_loca1 about-me-description"
                                        style={{
                                          fontSize: "14px",
                                        }}
                                        placeholder="Description should contain minimum 50 words and maximum 500 words"
                                        value={about_me}
                                        name="about_me"
                                        onChange={this.handleChange}
                                        rows="2"
                                      ></textarea>
                                      {about_me_error &&
                                        this.fieldError(
                                          "Description should be minimum of 50 words and maximum 500 words."
                                        )}
                                    </div>
                                  </div>
                                </div>
                              </div>

                              <div className="col-md-12 every-section-light-blue-color">
                                <div className="mn_drag">
                                  <h5>Profile Photo</h5>
                                  {profile_picture_name && (
                                    <p>
                                      <strong>{profile_picture_name}</strong>
                                    </p>
                                  )}
                                  <div className="tf_drag_form">
                                    {profile_picture !== "" ? (
                                      <img
                                        src={profile_picture}
                                        alt="img"
                                        style={{ height: "50", width: "50" }}
                                      />
                                    ) : (
                                      <Dropzone
                                        onDrop={(acceptedFiles) =>
                                          this.handleProfilePicDrop(acceptedFiles)
                                        }
                                      >
                                        {({ getRootProps, getInputProps }) => (
                                          <section>
                                            <div {...getRootProps()}>
                                              <input {...getInputProps()} />
                                              <p id="profile_picture">
                                                Drag or upload profile photo
                                              </p>
                                            </div>
                                          </section>
                                        )}
                                      </Dropzone>
                                    )}
                                    <p>{jobAttachment(profile_picture)}</p>
                                  </div>
                                  {profile_picture && (
                                    <img
                                      src={closeIcon}
                                      alt="close"
                                      onClick={this.removeAttachment}
                                      id="profile_picture"
                                    />
                                  )}
                                  <div className="support-formats">
                                    <span>You may attach 1 file under 5 MB</span>
                                    <span>Supported formats: .jpg, .jpeg, .png</span>
                                  </div>
                                  {profile_picture_error &&
                                    this.fieldError(
                                      "profile picture must be present."
                                    )}
                                  {profile_picture_type_error &&
                                    this.fieldError(
                                      "You must upload an image in the given format."
                                    )}
                                </div>
                              </div>

                              <div className="col-md-12 every-section-light-blue-color">
                                <div className="mn_drag">
                                  <h5>Resume*</h5>
                                  {resume_name && (
                                    <p>
                                      <strong>{resume_name}</strong>
                                    </p>
                                  )}
                                  <div className="tf_drag_form">
                                    {this.state.resume !== "" ? (
                                      isResumeTypeImage ? (
                                        <img
                                          src={this.state.resume}
                                          alt="img"
                                          style={{ height: "50", width: "50" }}
                                        />
                                      ) : (
                                        <a href={this.state.resume}>
                                          <img
                                            src={fileLogo}
                                            alt="img"
                                            style={{ height: "50", width: "50" }}
                                          />
                                        </a>
                                      )
                                    ) : (
                                      <Dropzone
                                        onDrop={(acceptedFiles) =>
                                          this.handleResumeDrop(acceptedFiles)
                                        }
                                      >
                                        {({ getRootProps, getInputProps }) => (
                                          <section>
                                            <div {...getRootProps()}>
                                              <input {...getInputProps()} />
                                              <p id="resume">
                                                Drag or upload your resume
                                              </p>
                                            </div>
                                          </section>
                                        )}
                                      </Dropzone>
                                    )}
                                  </div>

                                  {resume && (
                                    <img
                                      src={closeIcon}
                                      alt="close"
                                      onClick={this.removeAttachment}
                                      id="resume"
                                    />
                                  )}
                                  <div className="support-formats">
                                    <span>You may attach 1 file under 5 MB</span>
                                    <span>
                                      Supports all popular formats (ppt, word, excel,
                                      pdf etc.....)
                                    </span>
                                  </div>
                                  {resume_error &&
                                    this.fieldError("Resume must be present.")}
                                  {resume_type_error &&
                                    this.fieldError(
                                      "You must upload an document in the given format."
                                    )}
                                </div>
                              </div>

                              <div className="col-md-12 every-section-light-blue-color">
                                <div className="form-group">
                                  <label>Location*</label>
                                  <div className="clearfix"></div>
                                  <div className="col-md-12 nopad">
                                    <div className="col-md-4 col-xs-12 nopad">
                                      <div className="input-group tf_loca">
                                        <div className="selectedwrap">
                                          <select
                                            className="form-control mn_input"
                                            value={current_location_country}
                                            onChange={this.selectCurrentCountry}
                                            style={{
                                              fontSize: "14px",
                                              height: "48px",
                                            }}
                                          >
                                            {this.allCountries.map(
                                              (country, index) => {
                                                return (
                                                  <option
                                                    key={`year${index}`}
                                                    id={country.id}
                                                    value={country.name}
                                                  >
                                                    {country.name}
                                                  </option>
                                                );
                                              }
                                            )}
                                          </select>
                                          {current_location_country_error &&
                                            this.fieldError()}
                                        </div>
                                      </div>
                                    </div>
                                    <div className="col-md-4 col-xs-12 resp_nopad">
                                      <div className="input-group tf_loca">
                                        <div className="selectedwrap">
                                          <select
                                            className="form-control mn_input"
                                            style={{
                                              fontSize: "14px",
                                              height: "48px",
                                            }}
                                            value={state}
                                            onChange={this.selectCurrentState}
                                          >
                                            {allStates.map((state, index) => {
                                              return (
                                                <option
                                                  key={`year${index}`}
                                                  id={state.id}
                                                  value={state.name}
                                                >
                                                  {state.name}
                                                </option>
                                              );
                                            })}
                                          </select>
                                        </div>
                                      </div>
                                    </div>
                                    <div className="col-md-4 col-xs-12 nopad-left nopad-right">
                                      <div className="input-group tf_loca">
                                        <div className="selectedwrap">
                                          <select
                                            className="form-control mn_input"
                                            defaultValue={current_location_city}
                                            onChange={this.selectCurrentCity}
                                            style={{
                                              fontSize: "14px",
                                              height: "48px",
                                            }}
                                          >
                                            {allCities.map((city, index) => {
                                              return (
                                                <option
                                                  key={`year${index}`}
                                                  id={city.id}
                                                  value={city.name}
                                                >
                                                  {city.name}
                                                </option>
                                              );
                                            })}
                                          </select>
                                          {current_location_city_error &&
                                            this.fieldError()}
                                        </div>
                                      </div>
                                    </div>
                                  </div>
                                </div>
                              </div>

                              <div className="col-md-12 every-section-light-blue-color">
                                <div className="form-group">
                                  <div className="clearfix"></div>
                                  <div className="col-md-6 nopad">
                                    <div className="col-md-12 col-xs-12 nopad">
                                      <div className="">
                                        <label>Citizenship*</label>
                                        <div className="input-group tf_loca selectedwrap">
                                          <CountryDropdown
                                            style={{
                                              fontSize: "14px",
                                              height: "48px",
                                            }}
                                            value={citizenship_country}
                                            className="form-control mn_input mySelectBoxClass"
                                            id="citizenship_country"
                                            onChange={(val) =>
                                              this.selectCitizenship(val)
                                            }
                                          />
                                          {citizenship_country_error &&
                                            this.fieldError()}
                                        </div>
                                      </div>
                                    </div>
                                  </div>
                                  <div className="col-md-6 nopad-right">
                                    <div className="">
                                      <div className="form-group">
                                        <label>Language Proficiency</label>
                                        <div className="clearfix"></div>
                                        <div className="col-md-12 nopad">
                                          <div className="input-group tf_loca">
                                            <div className="selectedwrap">
                                              <select
                                                style={{
                                                  fontSize: "14px",
                                                  height: "48px",
                                                }}
                                                onChange={this.handleChange}
                                                defaultValue={english_proficiency}
                                                name="english_proficiency"
                                                className="form-control mn_input mySelectBoxClass"
                                              >
                                                {languages}
                                              </select>
                                              {english_proficiency_error &&
                                                this.fieldError()}
                                            </div>
                                          </div>
                                        </div>
                                      </div>
                                      <div className="clearfix"></div>
                                    </div>
                                  </div>
                                </div>
                              </div>

                            </div>
                          </div>
                          {!showStep2 && !showSubmitButton && (
                            <div className="tf_continue">
                              <Link onClick={(e) => {
                                e.preventDefault();
                                this.handleContinue("step1")
                              }}>
                                CONTINUE{" "}
                                <span>
                                  <i
                                    className="fa fa-angle-right"
                                    aria-hidden="true"
                                  ></i>
                                </span>
                              </Link>
                            </div>
                          )}

                          {/* Form Data End */}
                        </div>
                        
{/* 
                              
                        {showStep2 && (
                          <div ref={this.ScrollRef}>
                            <CreateProfileFormSection2
                              displayStep3={this.displayStep3}
                              showStep2={showStep2}
                              showStep3={showStep3}
                              scrollToMyRef={this.scrollToMyRef}
                              otherUsers={this.state.otherUsers}
                              userDetails={this.state.userDetails}
                              setJobCategory={this.setJobCategory}
                              setSkill={this.setSkill}
                              setData={this.setData}
                              handleContinue={this.handleContinue}
                              history={this.props.history}
                              ScrollRef={this.ScrollRef}
                            />
                          </div>
                        )}

                        {showStep3 && (
                          <div>
                            <CreateProfileFormSection3
                              otherUsers={this.state.otherUsers}
                              userDetails={this.state.userDetails}
                              handleContinue={this.handleContinue}
                              setData={this.setData}
                              showStep4={showStep4}
                              history={this.props.history}
                            />{" "}
                          </div>
                        )}

                        {showStep4 && (
                          <div>
                            <CreateProfileFormSection4
                              handleContinue={this.handleContinue}
                              setData={this.setData}
                              showStep5={showStep5}
                              setStartDate={this.setStartDate}
                              history={this.props.history}
                            />{" "}
                          </div>
                        )}

                        {showStep5 && (
                          <div>
                            <CreateProfileFormSection5
                              handleContinue={this.handleContinue}
                              setData={this.setData}
                              showStep6={showStep6}
                              showSubmitButton={showSubmitButton}
                              handleSubmit={this.handleSubmit}
                              history={this.props.history}
                            />{" "}
                          </div>
                        )}

                        {showStep6 && (
                          <div>
                            <CreateProfileFormSection6
                              handleContinue={this.handleContinue}
                              setData={this.setData}
                              showSubmitButton={showSubmitButton}
                              handleSubmit={this.handleSubmit}
                              history={this.props.history}
                            />{" "}
                          </div>
                        )} */}


                        </div>
                        </div>
                       




                      </div>
                      <div className="col-md-2 col-sm-2 col-xs-2">
                        <div className="custom_sticky_container">
                        {/* Start Section How It Works */}
                        <div className="position-sticky">
                          <div className="fixed-post-a-job-steps app-process-stepper">
                            <div className="row" id="step-wizard-for-post-a-job" style={{ position: 'relative' }}>
                              <div className="steps-container d-flex bg-white mr-15">
                                <div className="col-md-8 m-auto bg-white">
                                  <div className="row bs-wizard">

                                    <div className="bs-wizard-step complete">
                                      <div className="text-center bs-wizard-stepnum">
                                        {/* <i className="fa fa-briefcase" style={{fontSize: '20px'}} aria-hidden="true"> </i> */}
                                      </div>
                                      <Link
                                        data-step="step1"
                                        onClick={(e) => { e.preventDefault(); this.handleSideBarClick('step1') }}>
                                        <h3 style={{ fontSize: '14px', marginTop: '-10px' }}>Profile Title</h3>
                                      </Link>
                                      <Link
                                        data-step="step1"
                                        onClick={(e) => { e.preventDefault(); this.handleSideBarClick('step1') }}
                                        className="bs-wizard-dot active">
                                        {showStep2 ?
                                          <i className="fa fa-check" aria-hidden="true"> </i>
                                          :
                                          <i className="fa fa-briefcase" aria-hidden="true"> </i>
                                        }
                                      </Link>
                                      <div className={showStep2 ? "progress step-done" : "progress"}>
                                        <div className="progress-bar"></div>
                                      </div>
                                    </div>

                                    {/* First Icon Container End */}

                                    <div className={
                                      showStep2 ?
                                        "bs-wizard-step complete"
                                        :
                                        "bs-wizard-step not-visited"
                                    }>
                                      <div className="text-center bs-wizard-stepnum">
                                        {/* <i className="fa fa-file-text" style={{fontSize: '20px'}} aria-hidden="true"> </i> */}
                                      </div>
                                      <Link
                                        data-step="step2"
                                        onClick={showStep2 ? (e) => { e.preventDefault(); this.scrollToMyRef("step2") } : ""}
                                      >
                                        <h3 style={{ fontSize: '14px', marginTop: '-10px' }}>Platform</h3>
                                      </Link>
                                      <Link
                                        data-step="step2"
                                        onClick={showStep2 ? (e) => { e.preventDefault(); this.scrollToMyRef("step2") } : ""}
                                        className="bs-wizard-dot active">
                                        {showStep3 ?
                                          <i className="fa fa-check" aria-hidden="true"> </i>
                                          :
                                          <i className="fa fa-sitemap" aria-hidden="true"> </i>
                                        }
                                      </Link>
                                      <div className={showStep3 ? "progress step-done" : "progress"}>
                                        <div className="progress-bar"></div>
                                      </div>

                                    </div>

                                    <div
                                      className={showStep3 ?
                                        "bs-wizard-step complete"
                                        :
                                        "bs-wizard-step not-visited"
                                      }
                                    >
                                      <div className="text-center bs-wizard-stepnum">
                                        {/* <i className="fa fa-info-circle" style={{fontSize: '20px'}} aria-hidden="true"> </i> */}
                                      </div>
                                      <Link
                                        data-step="step3"
                                        onClick={showStep3 ? (e) => { e.preventDefault(); this.scrollToMyRef("step3") } : ""}
                                      >
                                        <h3 style={{ fontSize: '14px', marginTop: '-10px' }}>Set Hourly Rate</h3>
                                      </Link>
                                      <Link
                                        data-step="step3"
                                        onClick={showStep3 ? (e) => { e.preventDefault(); this.scrollToMyRef("step3") } : ""}
                                        className="bs-wizard-dot">
                                        {showStep4 ?
                                          <i className="fa fa-check" aria-hidden="true"> </i>
                                          :
                                          <i className="fa fa-money" aria-hidden="true"> </i>
                                        }
                                      </Link>
                                      <div className={showStep4 ? "progress step-done" : "progress"}>
                                        <div className="progress-bar"></div>
                                      </div>
                                    </div>


                                    <div
                                      className={showStep4 ?
                                        "bs-wizard-step complete"
                                        :
                                        "bs-wizard-step not-visited"
                                      }
                                    >
                                      <div className="text-center bs-wizard-stepnum">
                                        {/* <i className="fa fa-user-secret" style={{fontSize: '20px'}} aria-hidden="true"> </i> */}
                                      </div>
                                      <Link
                                        data-step="step4"
                                        onClick={showStep4 ? (e) => { e.preventDefault(); this.scrollToMyRef("step4") } : ""}
                                      >
                                        <h3 style={{ fontSize: '14px', marginTop: '-10px' }}>Add Availability</h3>
                                      </Link>
                                      <Link
                                        data-step="step4"
                                        onClick={showStep4 ? (e) => { e.preventDefault(); this.scrollToMyRef("step4") } : ""}
                                        className="bs-wizard-dot">
                                        {showStep5 ?
                                          <i className="fa fa-check" aria-hidden="true"> </i>
                                          :
                                          <i className="fa fa-calendar" aria-hidden="true"> </i>
                                        }

                                      </Link>
                                      <div className={showStep5 ? "progress step-done" : "progress"}>
                                        <div className="progress-bar"></div>
                                      </div>
                                    </div>

                                    <div
                                      className={showStep5 ?
                                        "bs-wizard-step complete"
                                        :
                                        "bs-wizard-step not-visited"
                                      }
                                    >
                                      <div className="text-center bs-wizard-stepnum">
                                        {/* <i className="fa fa-eye" style={{fontSize: '20px'}} aria-hidden="true"> </i> */}
                                      </div>
                                      <Link
                                        data-step="step5"
                                        onClick={showStep5 ? (e) => { e.preventDefault(); this.scrollToMyRef("step5") } : ""}
                                      >
                                        <h3 style={{ fontSize: '14px', marginTop: '-10px' }}>Experience</h3>
                                      </Link>
                                      <Link
                                        data-step="step5"
                                        onClick={showStep5 ? (e) => { e.preventDefault(); this.scrollToMyRef("step5") } : ""}
                                        className="bs-wizard-dot">
                                        {showStep6 ?
                                          <i className="fa fa-check" aria-hidden="true"> </i>
                                          :
                                          <i className="fa fa-address-card" aria-hidden="true"> </i>
                                        }
                                      </Link>
                                      <div className={showStep6 ? "progress step-done" : "progress"}>
                                        <div className="progress-bar"></div>
                                      </div>

                                    </div>

                                    <div
                                      className={showStep6 ?
                                        "bs-wizard-step complete"
                                        :
                                        "bs-wizard-step not-visited"
                                      }
                                    >
                                      <div className="text-center bs-wizard-stepnum">
                                      </div>

                                      <Link onClick={showStep6 ? (e) => { e.preventDefault(); this.scrollToMyRef("step6") } : ""}
                                        data-step="step6">
                                        <h3 style={{ fontSize: '14px', marginTop: '-10px' }}>Education</h3>
                                      </Link>
                                      <Link
                                        data-step="step6"
                                        onClick={showStep6 ? (e) => { e.preventDefault(); this.scrollToMyRef("step6") } : ""}
                                        className="bs-wizard-dot">
                                        <i className="fa fa-book" aria-hidden="true"> </i>
                                      </Link>
                                      {/* <div className={showStep6 ? "progress step-done" : "progress"}>
                                        <div className="progress-bar"></div>
                                      </div> */}

                                    </div>

                                  </div>
                                </div>
                              </div>

                            </div>
                          </div>
                        </div>
                        {/* End Section How It Works */}
                        </div>
                      </div>
                      {/* Right Column End */}
                    </div>
                    {/* Container End */}

                    {/* Continue Button Start */}
                    <div>

                      {showSubmitButton && (
                        <div className="tf_continue">
                          <Link
                            className="submit_btn_profile text-center"
                            onClick={() => this.handleSubmit()}
                          >
                            SUBMIT
                          </Link>
                        </div>
                      )}
                    </div>
                    {/* Continue Button End */}
                  </div>
                </React.Fragment>
              )}
              {/* <Footer /> */}

            </div>
          </div>
        ) : (
          // wraper End

          this.props.history.push("/")
        )}
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
    addAppProcessStep1: (data) => dispatch(addAppProcessStep1(data)),
    getCurrentUserDetails: () => dispatch(getCurrentUserDetails()),
    // getOtherFreelancers: () => dispatch(getOtherFreelancers()),
    addAppProcessStep2: (data) => dispatch(addAppProcessStep2(data)),
    createProfileApi: (data) => dispatch(submitAppForCall(data)),
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(CreateProfileFormSection1);
