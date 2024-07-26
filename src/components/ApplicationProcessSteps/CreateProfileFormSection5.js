import React, { Component } from "react";
import UserImage from "../../static/images/user.svg";
import Modal from "react-modal";
import closeIcon from "../../static/images/close-icon.png";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import csc from "country-state-city";
import FlashMessage from "react-flash-message";
import CERTIFICATIONS from "../../constants/certifications";
import { Link } from "react-router-dom";


export default class CreateProfileFormSection5 extends Component {
  constructor(props, context) {
    super(props, context);
    this.state = {
      educationModal: false,
      employmentModal: false,
      attendedFrom: new Date(),
      attendedTo: new Date(),
      from_date: new Date(),
      to_date: new Date(),
      country: "United States",
      countryId: "231",
      state: "Alabama",
      stateId: "3919",
      city: "Anchorage",
      educationalDetails: [],
      otherUsers: [],
      employmentDetails: [],
      certificationDetails: [],
      titleError: false,
      overviewError: false,
      hoursAvailableError: false,
      isEdit: false,
      indexOfEdit: "",
      addAndSaveMsgShow: false,
      certificationModal: false,
      certificationStep2: false,
      certificationStep1: true,
      hourlyRate: "",
      monthFrom: new Date().toLocaleString("default", { month: "long" }),
      monthTo: new Date().toLocaleString("default", { month: "long" }),
      yearFrom: new Date().getFullYear(),
      yearTo: new Date().getFullYear(),
      overview: "",
      title: "",
      start_date: new Date(),
      worked_as_freelancer: "",
      experience: "",
      experience_error: false,
      worked_as_freelancer_error: false,
      linkedin_profile: "",
      skype_user_name: "",
      working_hours_talfoundry: "",
      working_hours_talfoundry_error: false,
    };
    this.allCountries = csc.getAllCountries();
  }


  handleCertificationNext = () => {
    if (
      typeof this.state.certificationName === "undefined" ||
      this.state.certificationName === ""
    )
      this.setState({ certificationNameError: true })
    else {
      this.setState({ certificationStep1: false, certificationStep2: true })
    }
  }

  handleRateBlur = (e) => {
    this.setState({
      [e.target.name]: !isNaN(parseFloat(e.target.value).toFixed(2))
        ? parseFloat(e.target.value).toFixed(2)
        : "",
    })
  }

  handleCertificationDetails = (e) => {
    const {
      certificationName,
      certificationLink,
      isEdit,
      indexOfEdit,
      certificateCategory,
    } = this.state
    let allCertificationDetails = this.state.certificationDetails
    let ifAddAndSave = e.target.id !== "saveCertification"
    let certification = {
      certification_name: certificationName,
      certification_link: certificationLink,
      certification_category: certificateCategory,
    }
    if (isEdit) {
      allCertificationDetails[indexOfEdit] = certification
      this.setState({
        certificationDetails: allCertificationDetails,
        certificationModal: ifAddAndSave,
        certificationName: "",
        certificationLink: "",
        isEdit: false,
        addAndSaveMsgShow: ifAddAndSave,
        certificationStep1: true,
        certificationStep2: false,
      })
    } else {
      allCertificationDetails.push(certification)
      this.setState({
        certificationDetails: allCertificationDetails,
        certificationModal: ifAddAndSave,
        certificationName: "",
        certificationLink: "",
        isEdit: false,
        addAndSaveMsgShow: ifAddAndSave,
        certificationStep1: true,
        certificationStep2: false,
      })
    }
  }
  onOpenModal = (e) => {
    e.preventDefault();
    this.setState({
      educationModal: e.target.name === "educationModal",
      employmentModal: e.target.name === "employmentModal",
      certificationModal: e.target.name === "certificationModal",
    })
  }

  handleChange = (e) => {
    this.props.setData(e.target.name,e.target.value)
    this.setState({
      [e.target.name]: e.target.value,
      [e.target.name + "Error"]: false,
      certificationNameError: false,
    })
  }

  handleChangeForLastSection = (e) => {
    const {
      experience,
      worked_as_freelancer,
    } = this.state


    this.props.setData(e.target.name,e.target.value)

    this.setState(
      { [e.target.name]: e.target.value, [e.target.name + "_error"]: false },
      () => {
        if (experience && worked_as_freelancer) {
          this.setState({
            experience_error: "",
            working_hours_talfoundry_error: "",
            worked_as_freelancer_error: "",
          })
        }
      }
    )
  }

  handleRateChange = (e) => {
    this.props.setData(e.target.name,e.target.value)
    if (e.target.value === 0) {
      this.setState({
        [e.target.name]: e.target.value,
        [e.target.name + "Error"]: true,
      })
    } else if (e.target.value > 0) {
      this.setState({
        [e.target.name]: e.target.value,
        [e.target.name + "Error"]: false,
        hourly_rate_error: false,
      })
    } else {
      console.log("result")
    }
  }
  onCloseModal = () => {
    this.setState({
      educationModal: false,
      employmentModal: false,
      isEdit: false,
      certificationStep1: true,
      certificationStep2: false,
      certificationModal: false,
    })
  }

  handleDateChange = (date) => {
    this.setState({
      attendedFrom: date,
    })
  }
  handleEndDateChange = (date) => {
    this.setState({
      attendedTo: date,
    })
  }
  selectCountry = (e) => {
    let countryId = e.target.options[e.target.selectedIndex].id
    this.setState({ country: e.target.value, countryId: countryId })
  }
  selectState = (e) => {
    let stateId = e.target.options[e.target.selectedIndex].id
    this.setState({ state: e.target.value, stateId: stateId })
  }
  selectCity = (e) => {
    this.setState({ city: e.target.value })
  }
  handleEducationalDetails = (e) => {
    const {
      attendedFrom,
      attendedTo,
      school,
      degree,
      areaOfStudy,
      educationDescription,
      isEdit,
      indexOfEdit,
    } = this.state
    let allEducationalDetails = this.state.educationalDetails
    let ifAddAndSave = e.target.id !== "save"
    let educational = {
      school: school,
      from_date: attendedFrom,
      to_date: attendedTo,
      degree: degree,
      area_of_study: areaOfStudy,
      education_description: educationDescription,
    }

    if (isEdit && attendedFrom && attendedTo && school && degree) {
      allEducationalDetails[indexOfEdit] = educational
      this.setState({
        educationalDetails: allEducationalDetails,
        educationModal: ifAddAndSave,
        attendedFrom: new Date(),
        attendedTo: new Date(),
        school: "",
        degree: "",
        areaOfStudy: "",
        educationDescription: "",
        isEdit: false,
        addAndSaveMsgShow: ifAddAndSave,
      })
    } else if (attendedFrom && attendedTo && school && degree) {
      allEducationalDetails.push(educational)
      this.setState({
        educationalDetails: allEducationalDetails,
        educationModal: ifAddAndSave,
        attendedFrom: new Date(),
        attendedTo: new Date(),
        school: "",
        degree: "",
        areaOfStudy: "",
        educationDescription: "",
        isEdit: false,
        addAndSaveMsgShow: ifAddAndSave,
      })
    } else {
      this.setState({
        attendedFromError:
          typeof attendedFrom === "undefined" || attendedFrom === "",
        attendedToError: typeof attendedTo === "undefined" || attendedTo === "",
        schoolError: typeof school === "undefined" || school === "",
        degreeError: typeof degree === "undefined" || degree === "",
      })
    }
    this.props.setData('educationalDetails',allEducationalDetails)
  }
  handleEmploymentDetails = (e) => {
    const {
      companyName,
      country,
      state,
      city,
      from_date,
      to_date,
      roleInCompany,
      companyTitle,
      employmentDescription,
      isEdit,
      indexOfEdit,
    } = this.state
    let allEmploymentDetails = this.state.employmentDetails
    let ifAddAndSave = e.target.id !== "saveEmp"
    let employmentDetails = {
      company_name: companyName,
      country: country,
      state: state,
      city: city,
      title: companyTitle,
      role: roleInCompany,
      from_date: from_date,
      to_date: to_date,
      employment_description: employmentDescription,
    }

    if (
      isEdit &&
      from_date &&
      to_date &&
      companyName &&
      roleInCompany
    ) {
      allEmploymentDetails[indexOfEdit] = employmentDetails
      this.setState({
        employmentDetails: allEmploymentDetails,
        employmentModal: ifAddAndSave,
        companyName: "",
        country: "",
        state: "",
        city: "",
        from_date: "",
        to_date: "",
        roleInCompany: "",
        companyTitle: "",
        employmentDescription: "",
        isEdit: false,
        addAndSaveMsgShow: ifAddAndSave,
      })
    } else if (
      from_date &&
      to_date &&
      companyName &&
      roleInCompany
    ) {
      allEmploymentDetails.push(employmentDetails)
      this.setState(
        {
          employmentDetails: allEmploymentDetails,
          employmentModal: ifAddAndSave,
        },
        () => {
          this.setState({
            companyName: "",
            roleInCompany: "",
            country: "",
            state: "",
            city: "",
            companyTitle: "",
            employmentDescription: "",
            isEdit: false,
            addAndSaveMsgShow: ifAddAndSave,
          })
        }
      )
    } else {
      this.setState({
        companyNameError:
          !companyName || (companyName && companyName.length === 0),
        roleInCompanyError:
          !roleInCompany || (roleInCompany && roleInCompany.length === 0),
      })
    }
    // console.log("allEmploymentDetails",allEmploymentDetails)
    this.props.setData('employmentDetails',allEmploymentDetails)
  }

  handleContinue = (e) => {
    e.preventDefault();
    let {worked_as_freelancer,experience} = this.state


    if(!experience){
      this.setState({
        experience_error: true
      })
    }

    if(!worked_as_freelancer){
      this.setState({
        worked_as_freelancer_error: true
      })
    }

    if (experience && worked_as_freelancer) {
        this.props.handleContinue('step5' , "step6")
      }
  }

  handleEduEdit = (e) => {
    var selectedData = this.state.educationalDetails[e.target.id]
    this.setState({
      attendedFrom: selectedData.from_date,
      attendedTo: selectedData.to_date,
      school: selectedData.school,
      degree: selectedData.degree,
      areaOfStudy: selectedData.area_of_study,
      educationDescription: selectedData.education_description,
      educationModal: true,
      isEdit: true,
      indexOfEdit: e.target.id,
    }, () => {
      this.props.setData('educationalDetails',this.state.educationalDetails)
    })
  }

  handleEmpEdit = (e) => {
    e.preventDefault();
    // const monthNames = [
    //   "January",
    //   "February",
    //   "March",
    //   "April",
    //   "May",
    //   "June",
    //   "July",
    //   "August",
    //   "September",
    //   "October",
    //   "November",
    //   "December",
    // ]
    var selectedData = this.state.employmentDetails[e.target.id]
    this.setState({
      companyName: selectedData.company_name,
      country: selectedData.country,
      state: selectedData.state,
      city: selectedData.city,
      roleInCompany: selectedData.role,
      companyTitle: selectedData.title,
      employmentDescription: selectedData.employment_description,
      employmentModal: true,
      isEdit: true,
      indexOfEdit: e.target.id,
      to_date: selectedData.to_date,
      from_date: selectedData.from_date,
    },() => {
        this.props.setData('employmentDetails',this.state.employmentDetails)
    })
  }


  handleCertifiEdit = (e) => {
    var selectedData = this.state.certificationDetails[e.target.id]
    this.setState({
      certificationName: selectedData.certification_name,
      certificationLink: selectedData.certification_link,
      certificationModal: true,
      isEdit: true,
      indexOfEdit: e.target.id,
    },() => {
        this.props.setData('certificationDetails',this.state.certificationDetails)
    })
  }

  handleEduDelete = (e) => {
    var filteredData = this.state.educationalDetails.filter(
      (el, index) => index !==  parseInt(e.target.id)
    )
    this.setState({ educationalDetails: filteredData },() => {
      this.props.setData(' educationalDetails', this.state.educationalDetails)
    })
  }

  handleEmpDelete = (e) => {
    var filteredData = this.state.employmentDetails.filter(
      (el, index) => index !== parseInt(e.target.id)
    )
    this.setState({ employmentDetails: filteredData }, () => {
      this.props.setData('employmentDetails',this.state.employmentDetails)
    })
  }

  handleCertifiDelete = (e) => {
    var filteredData = this.state.certificationDetails.filter(
      (el, index) => index !== parseInt(e.target.id)
    )
    this.setState({ certificationDetails: filteredData },() => {
      this.props.setData('certificationDetails',this.state.certificationDetails)
    })
  }

  fieldError(message) {
    return (
      <p id="firstName" className="error-field">
        {message ? message : "This field can't be blank."}
      </p>
    );
  }

  handleFromDateChange = (date) => {
    this.setState({
      from_date: date
    })
  }

  renderOtherUsers = () => {
    const { otherUsers } = this.state
    let allUsers = []

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
      )
      return user
    })
    return <React.Fragment>{allUsers}</React.Fragment>
  }

  handleToDateChange = (date) => {
    this.setState({
      to_date: date
    })
  }

  returnSmallString = (data) => {
    let newdata = ""
    if (data.length < 30) {
      newdata = data
    } else {
      newdata = `${data.substring(0, 30)} ...`
    }
    return newdata
  }


  render() {
    // const { applicationIsLoading } = this.props;
    const {
      employmentModal,
      employmentDescription,
      country,
      state,
      city,
      companyName,
      companyTitle,
      employmentDetails,
      roleInCompany,
      addAndSaveMsgShow,
      companyNameError,
      roleInCompanyError,
      from_date,
      to_date,
      worked_as_freelancer,
      worked_as_freelancer_error,
      experience,
      experience_error,
      skype_user_name,
      linkedin_profile,
    } = this.state;

    let certificateOptions = [];

    CERTIFICATIONS.map((el, idx) => {
      certificateOptions.push(<option key={idx}>{el.name}</option>);
        return el
    });

    const allStates = csc.getStatesOfCountry(this.state.countryId);
    const allCities = csc.getCitiesOfState(this.state.stateId);
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
    };

    let month = (f) =>
      Array.from(Array(12), (e, i) =>
        new Date(25e8 * ++i).toLocaleString("en-US", { month: f })
      );
    let months = [];
    for (let index = 0; index <= 11; index++) {
      months.push(month`long`[index]);
    }

    return (
      // <div className="tf_tell step-five">
      //     <div className="">
            <div className="col-md-12 nopad">
              <div className="">
                <div className="tf_profile">
                  <div className="col-md-12">
                        <h4 className="Experience-title">Experience</h4>
                  </div>
                  <div className="clearfix"></div>
                  <hr />

                  <div className="mn_ex">

                      <div className="col-md-12 ">
                        <div className="row form-group every-section-light-blue-color">
                          <label className="col-md-8">How many years of experience do you have?*</label>
                          <div className="col-md-8">
                            <div className="input-group tf_loca">
                              <div className="selectedwrap">
                                <select
                                  style={{
                                    fontSize: "14px",
                                    height: "48px",
                                  }}
                                  name="experience"
                                  onChange={this.handleChangeForLastSection}
                                  defaultValue="Provide Number Of Years"
                                  className="form-control mn_input mySelectBoxClass"
                                >
                                  <option disabled selected={!experience}>
                                    Provide Number Of Years
                                  </option>
                                  <option selected={experience === "0 - 2 years"}>
                                    0 - 2 years
                                  </option>
                                  <option selected={experience === "2 - 4 years"}>
                                    2 - 4 years
                                  </option>
                                  <option
                                    selected={experience === "More than 4 years"}
                                  >
                                    More than 4 years
                                  </option>
                                </select>
                                {experience_error &&
                                  this.fieldError("You need to select experience.")}
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>


                      <div className="clearfix"></div>

                      <div className="col-md-12">
                        <div className="row form-group every-section-light-blue-color">
                          <label className="col-md-8">Have you ever worked as an Expert?*</label>
                          <div className="col-md-8">
                            <div className="input-group tf_loca">
                              <div className="selectedwrap">
                                <select
                                  style={{
                                    fontSize: "14px",
                                    height: "48px",
                                  }}
                                  className="form-control mn_input mySelectBoxClass"
                                  name="worked_as_freelancer"
                                  onChange={this.handleChangeForLastSection}
                                >
                                  <option disabled selected={!worked_as_freelancer}>
                                    Yes/No
                                  </option>
                                  <option
                                    name="true"
                                    value="true"
                                    selected={worked_as_freelancer === "true"}
                                    id="true"
                                  >
                                    {" "}
                                    Yes
                                  </option>
                                  <option
                                    name="false"
                                    value="false"
                                    selected={worked_as_freelancer === "false"}
                                    id="false"
                                  >
                                    {" "}
                                    No
                                  </option>
                                </select>
                                {worked_as_freelancer_error && this.fieldError()}
                              </div>
                            </div>
                          </div>

                          <div className="col-md-3"> </div>
                        </div>
                      </div>


                      <div className="clearfix"></div>


                      <div className="col-md-12">
                        <div className="row form-group every-section-light-blue-color">
                          <label className="col-md-8">Skype (Optional)</label>
                          <div className="col-md-8">
                            <div className="input-group tf_loca">
                              <input
                                type="Full Name"
                                style={{
                                  fontSize: "14px",
                                  height: "45px",
                                }}
                                className="form-control mn_input"
                                name="skype_user_name"
                                placeholder="Provide Your Skype Username"
                                onChange={this.handleChangeForLastSection}
                                value={skype_user_name}
                              />
                            </div>
                          </div>
                          <div className="col-md-2"> </div>
                        </div>
                      </div>


                      <div className="clearfix"></div>

                      <div className="col-md-12 ">
                        <div className="row form-group every-section-light-blue-color">
                          <label className="col-md-8">LinkedIn Profile (Optional)</label>
                          <div className="col-md-8">
                            <div className="input-group tf_loca">
                              <input
                                style={{
                                  fontSize: "14px",
                                  height: "45px",
                                }}
                                type="Full Name"
                                className="form-control mn_input"
                                name="linkedin_profile"
                                placeholder="Provide Your Profile URL"
                                onChange={this.handleChangeForLastSection}
                                value={linkedin_profile}
                              />
                            </div>
                          </div>
                          <div className="col-md-4"> </div>
                        </div>
                      </div>


                  </div>
                </div>

                <div className="tf_profile_ur tf_overview">
                  <div className="col-md-12">
                    <h4 className="">Portfolio</h4>
                  </div>
                  <div className="clearfix"></div>
                  <hr />
                  <div className="clearfix"></div>

                  <div className="col-md-12">
                    <div className="col-md-12 ">
                      <div className="col-md-12 mb-15 every-section-light-blue-color">
                      <div className="col-md-12 nopad">
                        <div className="tf_edu">
                          <p>
                            Add your projects to show examples of your work.
                          </p>
                        </div>
                      </div>
                      <div className="clearfix"></div>
                      <div className="tf_add_box">
                        <Link
                          name="employmentModal"
                          onClick={this.onOpenModal}
                          href="#"
                        >
                          + Add
                        </Link>
                      </div>
                      {employmentDetails &&
                        employmentDetails.length > 0 &&
                        employmentDetails.map((ed, i) => {
                          // console.log("ed",ed)
                          return (
                            <div className="show-education-details">
                              <div>
                                <span>{ed.role}</span>
                                <span data-toggle="tooltip" data-placement="top" title={ed.company_name}>
                                  {this.returnSmallString(ed.company_name)}
                                </span>
                              </div>
                              <p>
                                {ed.from_date.getFullYear()}
                                {" - "}
                                {ed.to_date.getFullYear()}

                              </p>
                              <div className="edit-dlt-sec">
                                <button id={i} onClick={this.handleEmpEdit}>
                                  <i id={i} className="fa fa-edit"></i>{" "}
                                </button>
                                <button id={i} onClick={this.handleEmpDelete}>
                                  <i id={i} className="fa fa-trash"></i>
                                </button>
                              </div>
                              <hr />
                            </div>
                          );
                        })}
                    </div>
                    </div>
                  </div>


                  {!this.props.showStep6 && <div className="tf_continue">
                    <Link onClick={(event) => this.handleContinue(event)}>
                          CONTINUE{" "}
                          <span>
                            <i
                              className="fa fa-angle-right"
                              aria-hidden="true"
                            ></i>
                          </span>
                    </Link>
                    </div>
                    }

                </div>



                <Modal isOpen={employmentModal} style={customStyles}>
                  <div className="" id="addEmployment">
                    {addAndSaveMsgShow && (
                      <FlashMessage duration={5000} persistOnHover={true}>
                        <p className="success-note">
                          Details are saved you can add more.
                        </p>
                      </FlashMessage>
                    )}
                    <div className="modal-header">
                      <button
                        type="button"
                        onClick={this.onCloseModal}
                        className="close"
                        data-dismiss="modal"
                        aria-label="Close"
                      >
                        <img src={closeIcon} alt="close" />
                      </button>
                      <h4 className="modal-title" id="myModalLabel">
                        Add Project
                      </h4>
                    </div>
                    <div className="modal-body">
                      <form>
                        <div className="form-group">
                          <label htmlFor="exampleInputEmail1">Company</label>
                          <input
                            type="text"
                            name="companyName"
                            value={companyName}
                            onChange={this.handleChange}
                            className="form-control"
                          />
                          {companyNameError && (
                            <p id="firstName" className="error-field">
                              This field can't be blank.
                            </p>
                          )}
                        </div>
                        <div className="row">
                          <div className="col-sm-12 nopad">
                            <label>Location</label>
                          </div>

                          <div className="col-sm-4 col-xs-12 no-padding">
                            <div className="form-group">
                              <select
                                style={{
                                  fontSize: "14px",
                                  height: "48px",
                                }}
                                className="form-control"
                                value={country}
                                onChange={this.selectCountry}
                              >
                                {this.allCountries.map((country, index) => {
                                  return (
                                    <option
                                      key={`year${index}`}
                                      id={country.id}
                                      value={country.name}
                                    >
                                      {country.name}
                                    </option>
                                  );
                                })}
                              </select>
                            </div>
                          </div>
                          <div className="col-sm-4 col-xs-12">
                            <div className="form-group">
                              <select
                                style={{
                                  fontSize: "14px",
                                  height: "48px",
                                }}
                                className="form-control"
                                value={state}
                                onChange={this.selectState}
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
                          <div className="col-sm-4 col-xs-12">
                            <div className="form-group">
                              <select
                                style={{
                                  fontSize: "14px",
                                  height: "48px",
                                }}
                                className="form-control"
                                value={city}
                                onChange={this.selectCity}
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
                            </div>
                          </div>
                        </div>
                        <div className="form-group">
                          <label htmlFor="exampleInputEmail1">Title</label>
                          <input
                            type="text"
                            name="companyTitle"
                            value={companyTitle}
                            onChange={this.handleChange}
                            className="form-control"
                          />
                        </div>
                        <div className="row">
                          <div className="col-sm-12 col-md-12 col-xs-12 nopad">
                            <div className="form-group">
                              <label htmlFor="exampleInputEmail1">Role</label>
                                <input
                                  className="form-control"
                                  value={roleInCompany}
                                  name="roleInCompany"
                                  onChange={this.handleChange}
                                 />

                              {roleInCompanyError && (
                                <p id="firstName" className="error-field">
                                  This field can't be blank.
                                </p>
                              )}
                            </div>
                          </div>
                        </div>
                        <div className="row">
                          <div className="col-md-6 nopad-left">
                            <div>
                              <label>Period</label>
                            </div>
                            <div className="col-md-12 nopad">
                              <div className="input-group tf_loca tf-datepicker">
                                <DatePicker
                                  selected={new Date(from_date)}
                                  onChange={this.handleFromDateChange}
                                  className="form-control mn_input"
                                  dateFormat="yyyy-MM-dd"
                                  showMonthDropdown
                                  showYearDropdown
                                  dropdownMode="select"
                                />
                              </div>
                            </div>
                          </div>
                          <div className="col-md-6 nopad-right">
                            <div>
                              <label>through</label>
                            </div>
                            <div className="col-md-12 nopad">
                              <div className="input-group tf_loca tf-datepicker">
                                <DatePicker
                                  selected={new Date(to_date)}
                                  minDate={from_date}
                                  onChange={this.handleToDateChange}
                                  className="form-control mn_input"
                                  dateFormat="yyyy-MM-dd"
                                  showMonthDropdown
                                  showYearDropdown
                                  dropdownMode="select"
                                />
                              </div>
                            </div>
                          </div>
                        </div>
                        <div className="form-group"></div>
                        <div className="form-group">
                          <label htmlFor="exampleInputEmail1">
                            Description (Optional)
                          </label>
                          <textarea
                            name="employmentDescription"
                            value={employmentDescription}
                            onChange={this.handleChange}
                            className="form-control"
                            rows="5"
                          ></textarea>
                        </div>
                      </form>
                    </div>
                    <div className="footer-btn-section">
                      <button
                        onClick={this.onCloseModal}
                        type="button"
                        className="cancel-md-btn"
                        data-dismiss="modal"
                      >
                        Cancel
                      </button>
                      <button
                        type="button"
                        id="saveAndAddEmp"
                        onClick={this.handleEmploymentDetails}
                        className="save-add-md-btn"
                      >
                        Save and Add More
                      </button>
                      <button
                        type="button"
                        id="saveEmp"
                        onClick={this.handleEmploymentDetails}
                        className="save-md-btn"
                      >
                        Save
                      </button>
                    </div>
                  </div>
                </Modal>
              </div>


            </div>

      //     </div>

      // </div>
    );
  }
}

